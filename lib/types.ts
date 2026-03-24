export type QRCodeType = 'url' | 'text' | 'wifi' | 'vcard' | 'email' | 'phone' | 'sms';

export type ErrorCorrectionLevel = 'L' | 'M' | 'Q' | 'H';

export interface QRConfig {
  errorCorrectionLevel: ErrorCorrectionLevel;
  width: number;
  color: {
    dark: string;
    light: string;
  };
}

export interface URLData {
  url: string;
}

export interface TextData {
  text: string;
}

export interface WiFiData {
  ssid: string;
  password: string;
  encryption: 'WPA' | 'WEP' | 'nopass';
  hidden?: boolean;
}

export interface VCardData {
  name: string;
  phone: string;
  email: string;
  company: string;
  title?: string;
  url?: string;
}

export interface EmailData {
  email: string;
  subject: string;
  body: string;
}

export interface PhoneData {
  phone: string;
}

export interface SMSData {
  phone: string;
  message: string;
}

export type QRData = URLData | TextData | WiFiData | VCardData | EmailData | PhoneData | SMSData;
