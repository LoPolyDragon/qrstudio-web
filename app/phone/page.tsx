import { Metadata } from 'next';
import QRStudio from '@/components/QRStudio';

export const metadata: Metadata = {
  title: 'Phone QR Code Generator — QR Studio',
  description: 'Create phone number QR codes for quick dialing. Free and customizable.',
};

export default function PhonePage() {
  return <QRStudio initialType="phone" />;
}
