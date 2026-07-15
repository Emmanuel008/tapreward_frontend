import axios from 'axios';
import { getSmsApiUrl } from '../config/app';

export async function sendSms({ senderId, phoneNumbers, message }) {
  const smsApiUrl = getSmsApiUrl();

  if (!smsApiUrl) {
    throw new Error('SMS API URL is not configured.');
  }

  const contacts = (Array.isArray(phoneNumbers) ? phoneNumbers : [phoneNumbers])
    .map(String)
    .filter(Boolean)
    .join(',');

  const payload = {
    senderId,
    contacts,
    message,
  };

  const response = await axios.post(smsApiUrl, payload, {
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = response.data;
  const isSuccess = data?.success ?? data?.sucess;

  if (isSuccess === false) {
    throw new Error(data?.error || data?.message || 'Failed to send SMS.');
  }

  return data;
}

export function getSmsErrorMessage(error) {
  if (axios.isAxiosError(error)) {
    const apiMessage = error.response?.data?.error || error.response?.data?.message;
    if (apiMessage) return String(apiMessage);
    if (error.response?.status) {
      return `Request failed with status ${error.response.status}`;
    }
    if (error.code === 'ERR_NETWORK') {
      return 'Network error. Check your connection or CORS settings.';
    }
    return error.message;
  }

  if (error instanceof Error && error.message) {
    return error.message;
  }

  return 'Failed to send SMS. Please try again.';
}
