import QRCode from 'qrcode';
import type { QRConfig, WiFiData, VCardData, EmailData, PhoneData, SMSData } from './types';

export function generateWiFiString(data: WiFiData): string {
  const { ssid, password, encryption, hidden } = data;
  const hiddenFlag = hidden ? 'H:true' : '';
  return `WIFI:T:${encryption};S:${ssid};P:${password};${hiddenFlag};`;
}

export function generateVCardString(data: VCardData): string {
  const lines = [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${data.name}`,
    `TEL:${data.phone}`,
    `EMAIL:${data.email}`,
    `ORG:${data.company}`,
  ];

  if (data.title) lines.push(`TITLE:${data.title}`);
  if (data.url) lines.push(`URL:${data.url}`);

  lines.push('END:VCARD');
  return lines.join('\n');
}

export function generateEmailString(data: EmailData): string {
  return `mailto:${data.email}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(data.body)}`;
}

export function generatePhoneString(data: PhoneData): string {
  return `tel:${data.phone}`;
}

export function generateSMSString(data: SMSData): string {
  return `sms:${data.phone}?body=${encodeURIComponent(data.message)}`;
}

export async function generateQRCode(
  text: string,
  config: QRConfig
): Promise<string> {
  try {
    return await QRCode.toDataURL(text, {
      errorCorrectionLevel: config.errorCorrectionLevel,
      width: config.width,
      color: config.color,
      margin: 2,
    });
  } catch (error) {
    console.error('QR Code generation error:', error);
    throw error;
  }
}

export async function generateQRCodeSVG(
  text: string,
  config: QRConfig
): Promise<string> {
  try {
    return await QRCode.toString(text, {
      type: 'svg',
      errorCorrectionLevel: config.errorCorrectionLevel,
      width: config.width,
      color: config.color,
      margin: 2,
    });
  } catch (error) {
    console.error('QR Code SVG generation error:', error);
    throw error;
  }
}

export function downloadQRCode(dataUrl: string, filename: string, format: 'png' | 'svg') {
  const link = document.createElement('a');
  link.download = `${filename}.${format}`;
  link.href = dataUrl;
  link.click();
}

export async function copyQRToClipboard(dataUrl: string) {
  try {
    const blob = await (await fetch(dataUrl)).blob();
    await navigator.clipboard.write([
      new ClipboardItem({
        [blob.type]: blob,
      }),
    ]);
    return true;
  } catch (error) {
    console.error('Copy to clipboard error:', error);
    return false;
  }
}
