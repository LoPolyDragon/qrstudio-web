import { Metadata } from 'next';
import QRStudio from '@/components/QRStudio';

export const metadata: Metadata = {
  title: 'Email QR Code Generator — QR Studio',
  description: 'Create email QR codes with pre-filled subject and message. Free and customizable.',
};

export default function EmailPage() {
  return <QRStudio initialType="email" />;
}
