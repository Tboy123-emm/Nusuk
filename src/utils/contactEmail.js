export const DEFAULT_CONTACT_EMAIL = 'reservation.nusuktours@gmail.com';

export function getContactEmail(env = import.meta?.env ?? {}) {
  const configuredEmail = [
    env.VITE_CONTACT_EMAIL,
    env.VITE_ADVISOR_EMAIL,
    env.VITE_RECIPIENT_EMAIL,
  ]
    .find(Boolean)
    ?.trim();

  return configuredEmail || DEFAULT_CONTACT_EMAIL;
}

export function createMailtoLink(data, env = import.meta?.env ?? {}) {
  const recipientEmail = getContactEmail(env);
  const subject = encodeURIComponent('Private Advisor Inquiry');
  const body = encodeURIComponent(
    `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nJourney Type: ${data.journeyType}\n\nMessage:\n${data.message}`
  );

  return `mailto:${recipientEmail}?subject=${subject}&body=${body}`;
}
