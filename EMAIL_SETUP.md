# Contact Form Email Setup

Your contact form now supports SMTP email delivery. When someone submits the "Speak with an Advisor" form, it will:

1. **Try SMTP backend first** (preferred) - Direct email via your SMTP server
2. **Fallback to EmailJS** - If SMTP is unavailable
3. **Fallback to mailto link** - If both services fail

## SMTP Configuration

### Step 1: Create backend/.env file

Copy `backend/.env.example` to `backend/.env` and fill in your SMTP credentials:

```
SMTP_SERVER=smtp.gmail.com
SMTP_PORT=587
SMTP_EMAIL=your_email@gmail.com
SMTP_PASSWORD=your_app_password_or_password
RECIPIENT_EMAIL=your_admin_email@gmail.com
```

### Step 2: Get Gmail App Password (if using Gmail)

1. Enable 2-Factor Authentication on your Google Account
2. Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
3. Select "Mail" and "Windows Computer" (or your device)
4. Copy the generated 16-character password
5. Paste it as `SMTP_PASSWORD` in backend/.env

### Step 3: Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### Step 4: Start Backend

```bash
python app.py
```

## Other Email Providers

### Gmail
- SMTP_SERVER: `smtp.gmail.com`
- SMTP_PORT: `587`

### Outlook/Office 365
- SMTP_SERVER: `smtp.office365.com`
- SMTP_PORT: `587`

### Custom Domain Email
- SMTP_SERVER: Ask your email provider
- SMTP_PORT: Usually `587` or `465`

## Testing

When you submit the contact form:
- Check your `RECIPIENT_EMAIL` inbox
- If SMTP fails, check backend logs
- The form will fall back to EmailJS or mailto link automatically

## Troubleshooting

- **"Email service temporarily unavailable"**: Check that backend is running on port 8000
- **"Connection refused"**: Verify SMTP_SERVER and SMTP_PORT are correct
- **"Authentication failed"**: Check SMTP_EMAIL and SMTP_PASSWORD
- **No email received**: Check RECIPIENT_EMAIL is spelled correctly



cd backend ; python -m uvicorn app:app --reload --port 8000