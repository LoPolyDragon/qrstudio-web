import { Metadata } from 'next';
import QRStudio from '@/components/QRStudio';

export const metadata: Metadata = {
  title: 'Text QR Code Generator — QR Studio',
  description: 'Create QR codes for plain text messages. Free and customizable.',
};

export default function TextPage() {
  return <QRStudio initialType="text" />;
}
