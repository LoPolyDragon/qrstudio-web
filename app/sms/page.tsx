import { Metadata } from 'next';
import QRStudio from '@/components/QRStudio';

export const metadata: Metadata = {
  title: 'SMS QR Code Generator — QR Studio',
  description: 'Create SMS QR codes with pre-filled messages. Free and customizable.',
};

export default function SMSPage() {
  return <QRStudio initialType="sms" />;
}
