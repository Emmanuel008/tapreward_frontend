export function getSmsApiUrl() {
  return process.env.REACT_APP_SMS_API_URL?.trim() || '';
}

export function getSmsSenderId() {
  return process.env.REACT_APP_SMS_SENDER_ID?.trim() || '';
}

export function getSmsDefaultMessage() {
  return process.env.REACT_APP_SMS_DEFAULT_MESSAGE?.trim() || '';
}
