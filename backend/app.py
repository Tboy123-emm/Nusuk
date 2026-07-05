import json
import smtplib
from pathlib import Path
from typing import List, Optional
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from os import getenv
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

BASE_DIR = Path(__file__).resolve().parent
PACKAGES_FILE = BASE_DIR / 'packages.json'
ADMIN_PASSWORD = 'nusuk-admin'


def get_allowed_origins() -> list[str]:
    configured_origins = getenv('CORS_ORIGINS', '')
    if configured_origins:
        return [origin.strip() for origin in configured_origins.split(',') if origin.strip()]

    return [
        'http://localhost:5174',
        'http://127.0.0.1:5174',
        'http://localhost:5173',
        'http://127.0.0.1:5173',
    ]


app = FastAPI(title='Luxury Travel Agency API')
app.add_middleware(
    CORSMiddleware,
    allow_origins=get_allowed_origins(),
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allow_headers=['*'],
)


class Plan(BaseModel):
    name: str
    price: str
    includes: List[str] = []


class PackageItem(BaseModel):
    id: str
    title: str
    subtitle: Optional[str] = None
    tag: Optional[str] = None
    duration: Optional[str] = None
    lodging: Optional[str] = None
    desc: Optional[str] = None
    img: Optional[str] = None
    featured: Optional[bool] = False
    plans: Optional[List[Plan]] = None


class PackagesPayload(BaseModel):
    packages: List[PackageItem]
    admin_password: str


class ContactFormData(BaseModel):
    name: str
    email: str
    phone: str
    journeyType: str
    message: str


def read_packages() -> list:
    if not PACKAGES_FILE.exists():
        return []
    try:
        with open(PACKAGES_FILE, 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error reading packages: {e}")
        return []


def write_packages(packages: list) -> None:
    with open(PACKAGES_FILE, 'w', encoding='utf-8') as f:
        json.dump(packages, f, indent=2, ensure_ascii=False)


@app.get('/packages')
async def get_packages():
    """Fetch all packages"""
    return read_packages()


@app.put('/packages')
async def update_packages(payload: PackagesPayload):
    """Update packages (requires admin password)"""
    if payload.admin_password != ADMIN_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid admin password')
    
    packages_data = [pkg.dict() for pkg in payload.packages]
    write_packages(packages_data)
    return {'status': 'ok', 'message': 'Packages updated'}


@app.post('/packages/reset')
async def reset_packages(payload: dict):
    """Reset packages to defaults (requires admin password)"""
    if payload.get('admin_password') != ADMIN_PASSWORD:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail='Invalid admin password')
    
    default_packages = read_packages()
    write_packages(default_packages)
    return {'status': 'ok', 'message': 'Packages reset'}


def send_contact_email(contact_data: ContactFormData) -> bool:
    """Send contact form email via SMTP"""
    smtp_server = getenv('SMTP_SERVER', 'smtp.gmail.com')
    smtp_port = int(getenv('SMTP_PORT', '587'))
    sender_email = getenv('SMTP_EMAIL')
    sender_password = getenv('SMTP_PASSWORD')
    recipient_email = getenv('RECIPIENT_EMAIL', 'alamuoyetoluwani@gmail.com')

    if not sender_email or not sender_password:
        print("Warning: SMTP credentials not configured")
        with open('email_log.txt', 'a') as log:
            log.write(f"[ERROR] SMTP credentials not configured\n")
        return False

    try:
        # Create message
        msg = MIMEMultipart()
        msg['From'] = sender_email
        msg['To'] = recipient_email
        msg['Subject'] = 'New Advisor Inquiry - Nusuk Tours'

        # Email body
        body = f"""
New Contact Form Submission:

Name: {contact_data.name}
Email: {contact_data.email}
Phone: {contact_data.phone}
Journey Type: {contact_data.journeyType}

Message:
{contact_data.message}

---
This message was sent through the Nusuk Tours website contact form.
        """

        msg.attach(MIMEText(body, 'plain'))

        # Send email
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(msg)

        print(f"✓ Email sent successfully to {recipient_email} from {contact_data.email}")
        with open('email_log.txt', 'a') as log:
            log.write(f"[SUCCESS] Email sent from {contact_data.email} to {recipient_email}\n")
        return True

    except Exception as e:
        print(f"✗ Failed to send SMTP email: {str(e)}")
        with open('email_log.txt', 'a') as log:
            log.write(f"[ERROR] Failed to send email from {contact_data.email}: {str(e)}\n")
        return False


@app.post('/contact')
async def send_contact(contact_data: ContactFormData):
    """Send contact form via SMTP email"""
    print(f"✓ Contact form received: {contact_data.name} ({contact_data.email})")
    try:
        success = send_contact_email(contact_data)
        if success:
            return {'status': 'ok', 'message': 'Contact form sent successfully'}
        else:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail='Email service temporarily unavailable'
            )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f'Failed to send contact form: {str(e)}'
        )



if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='127.0.0.1', port=8000, reload=True)
