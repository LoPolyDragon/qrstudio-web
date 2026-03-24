import { Metadata } from 'next';
import QRStudio from '@/components/QRStudio';

export const metadata: Metadata = {
  title: 'URL QR Code Generator — QR Studio',
  description: 'Create QR codes for any URL or website link. Free and customizable.',
};

export default function URLPage() {
  return <QRStudio initialType="url" />;
}
