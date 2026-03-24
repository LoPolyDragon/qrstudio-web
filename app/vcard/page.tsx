import { Metadata } from 'next';
import QRStudio from '@/components/QRStudio';

export const metadata: Metadata = {
  title: 'vCard QR Code Generator — QR Studio',
  description: 'Create vCard QR codes for easy contact sharing. Free and customizable.',
};

export default function VCardPage() {
  return <QRStudio initialType="vcard" />;
}
