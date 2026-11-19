export function stripLeadingEmoji(str: string): string {
  return str.replace(/^[\p{Emoji_Presentation}\p{Extended_Pictographic}\s]+/u, '').trim();
}

export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d+]/g, '');
}

export function sanitizeWhatsApp(wa: string): string {
  return wa.replace(/[^\d]/g, '');
}
