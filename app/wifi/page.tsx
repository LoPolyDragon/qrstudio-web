import { Metadata } from 'next';
import QRStudio from '@/components/QRStudio';

export const metadata: Metadata = {
  title: 'WiFi QR Code Generator — QR Studio',
  description: 'Create WiFi QR codes for easy network sharing. Free and customizable.',
};

export default function WiFiPage() {
  return <QRStudio initialType="wifi" />;
}
