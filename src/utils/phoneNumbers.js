export function normalizePhone(phone) {
  let digits = phone.replace(/\D/g, '');

  if (digits.startsWith('0')) {
    digits = `255${digits.slice(1)}`;
  } else if (!digits.startsWith('255')) {
    digits = `255${digits}`;
  }

  return digits;
}

export function parsePhoneNumbers(input) {
  return [...new Set(
    input
      .split(/[,;\n]+/)
      .map((value) => value.trim())
      .filter(Boolean)
      .map(normalizePhone)
  )];
}
