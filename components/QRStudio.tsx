'use client';

import { useState, useEffect, useCallback } from 'react';
import type { QRCodeType, QRConfig, ErrorCorrectionLevel } from '@/lib/types';
import {
  generateQRCode,
  generateQRCodeSVG,
  generateWiFiString,
  generateVCardString,
  generateEmailString,
  generatePhoneString,
  generateSMSString,
  downloadQRCode,
  copyQRToClipboard,
} from '@/lib/qr-generator';

interface QRStudioProps {
  initialType?: QRCodeType;
}

export default function QRStudio({ initialType = 'url' }: QRStudioProps) {
  const [activeType, setActiveType] = useState<QRCodeType>(initialType);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');
  const [qrCodeSvg, setQrCodeSvg] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const [config, setConfig] = useState<QRConfig>({
    errorCorrectionLevel: 'M',
    width: 512,
    color: {
      dark: '#000000',
      light: '#FFFFFF',
    },
  });

  const [urlData, setUrlData] = useState({ url: 'https://example.com' });
  const [textData, setTextData] = useState({ text: 'Hello World' });
  const [wifiData, setWifiData] = useState<{
    ssid: string;
    password: string;
    encryption: 'WPA' | 'WEP' | 'nopass';
  }>({
    ssid: '',
    password: '',
    encryption: 'WPA',
  });
  const [vcardData, setVcardData] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
  });
  const [emailData, setEmailData] = useState({
    email: '',
    subject: '',
    body: '',
  });
  const [phoneData, setPhoneData] = useState({ phone: '' });
  const [smsData, setSmsData] = useState({ phone: '', message: '' });

  const generateQR = useCallback(async () => {
    let text = '';

    switch (activeType) {
      case 'url':
        text = urlData.url;
        break;
      case 'text':
        text = textData.text;
        break;
      case 'wifi':
        text = generateWiFiString(wifiData);
        break;
      case 'vcard':
        text = generateVCardString(vcardData);
        break;
      case 'email':
        text = generateEmailString(emailData);
        break;
      case 'phone':
        text = generatePhoneString(phoneData);
        break;
      case 'sms':
        text = generateSMSString(smsData);
        break;
    }

    if (text) {
      try {
        const dataUrl = await generateQRCode(text, config);
        const svg = await generateQRCodeSVG(text, config);
        setQrCodeDataUrl(dataUrl);
        setQrCodeSvg(svg);
      } catch (error) {
        console.error('Failed to generate QR code:', error);
      }
    }
  }, [activeType, urlData, textData, wifiData, vcardData, emailData, phoneData, smsData, config]);

  useEffect(() => {
    generateQR();
  }, [generateQR]);

  const handleDownload = (format: 'png' | 'svg') => {
    const filename = `qr-${activeType}-${Date.now()}`;
    if (format === 'png') {
      downloadQRCode(qrCodeDataUrl, filename, 'png');
    } else {
      const svgBlob = new Blob([qrCodeSvg], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      downloadQRCode(svgUrl, filename, 'svg');
      URL.revokeObjectURL(svgUrl);
    }
  };

  const handleCopy = async () => {
    const success = await copyQRToClipboard(qrCodeDataUrl);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const tabs: { id: QRCodeType; label: string }[] = [
    { id: 'url', label: 'URL' },
    { id: 'text', label: 'Text' },
    { id: 'wifi', label: 'WiFi' },
    { id: 'vcard', label: 'vCard' },
    { id: 'email', label: 'Email' },
    { id: 'phone', label: 'Phone' },
    { id: 'sms', label: 'SMS' },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-2">QR Studio</h1>
        <p className="text-center text-gray-400 mb-8">Free QR Code Generator</p>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveType(tab.id)}
              className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                activeType === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Content</h2>

              {activeType === 'url' && (
                <div>
                  <label className="block text-sm font-medium mb-2">URL</label>
                  <input
                    type="url"
                    value={urlData.url}
                    onChange={(e) => setUrlData({ url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {activeType === 'text' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Text</label>
                  <textarea
                    value={textData.text}
                    onChange={(e) => setTextData({ text: e.target.value })}
                    placeholder="Enter any text"
                    rows={4}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {activeType === 'wifi' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Network Name (SSID)</label>
                    <input
                      type="text"
                      value={wifiData.ssid}
                      onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })}
                      placeholder="My WiFi Network"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Password</label>
                    <input
                      type="text"
                      value={wifiData.password}
                      onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })}
                      placeholder="password123"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Encryption</label>
                    <select
                      value={wifiData.encryption}
                      onChange={(e) =>
                        setWifiData({ ...wifiData, encryption: e.target.value as 'WPA' | 'WEP' | 'nopass' })
                      }
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="WPA">WPA/WPA2</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">No Password</option>
                    </select>
                  </div>
                </div>
              )}

              {activeType === 'vcard' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      value={vcardData.name}
                      onChange={(e) => setVcardData({ ...vcardData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <input
                      type="tel"
                      value={vcardData.phone}
                      onChange={(e) => setVcardData({ ...vcardData, phone: e.target.value })}
                      placeholder="+1234567890"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      value={vcardData.email}
                      onChange={(e) => setVcardData({ ...vcardData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Company</label>
                    <input
                      type="text"
                      value={vcardData.company}
                      onChange={(e) => setVcardData({ ...vcardData, company: e.target.value })}
                      placeholder="Acme Inc."
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}

              {activeType === 'email' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      value={emailData.email}
                      onChange={(e) => setEmailData({ ...emailData, email: e.target.value })}
                      placeholder="contact@example.com"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Subject</label>
                    <input
                      type="text"
                      value={emailData.subject}
                      onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                      placeholder="Hello"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={emailData.body}
                      onChange={(e) => setEmailData({ ...emailData, body: e.target.value })}
                      placeholder="Your message here"
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}

              {activeType === 'phone' && (
                <div>
                  <label className="block text-sm font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    value={phoneData.phone}
                    onChange={(e) => setPhoneData({ phone: e.target.value })}
                    placeholder="+1234567890"
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              )}

              {activeType === 'sms' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={smsData.phone}
                      onChange={(e) => setSmsData({ ...smsData, phone: e.target.value })}
                      placeholder="+1234567890"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Message</label>
                    <textarea
                      value={smsData.message}
                      onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
                      placeholder="Your message here"
                      rows={3}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Customization</h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Foreground Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.color.dark}
                      onChange={(e) =>
                        setConfig({ ...config, color: { ...config.color, dark: e.target.value } })
                      }
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.color.dark}
                      onChange={(e) =>
                        setConfig({ ...config, color: { ...config.color, dark: e.target.value } })
                      }
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Background Color</label>
                  <div className="flex gap-2">
                    <input
                      type="color"
                      value={config.color.light}
                      onChange={(e) =>
                        setConfig({ ...config, color: { ...config.color, light: e.target.value } })
                      }
                      className="h-10 w-20 rounded cursor-pointer"
                    />
                    <input
                      type="text"
                      value={config.color.light}
                      onChange={(e) =>
                        setConfig({ ...config, color: { ...config.color, light: e.target.value } })
                      }
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Size: {config.width}px
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="1024"
                    step="64"
                    value={config.width}
                    onChange={(e) => setConfig({ ...config, width: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Error Correction</label>
                  <select
                    value={config.errorCorrectionLevel}
                    onChange={(e) =>
                      setConfig({ ...config, errorCorrectionLevel: e.target.value as ErrorCorrectionLevel })
                    }
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option value="L">Low (7%)</option>
                    <option value="M">Medium (15%)</option>
                    <option value="Q">Quartile (25%)</option>
                    <option value="H">High (30%)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Preview</h2>
              <div className="flex justify-center items-center bg-white p-8 rounded-lg">
                {qrCodeDataUrl && (
                  <img
                    src={qrCodeDataUrl}
                    alt="QR Code"
                    className="max-w-full h-auto"
                    style={{ width: Math.min(config.width, 400) }}
                  />
                )}
              </div>
            </div>

            <div className="bg-gray-900 p-6 rounded-lg border border-gray-800">
              <h2 className="text-xl font-semibold mb-4">Download</h2>
              <div className="space-y-3">
                <button
                  onClick={() => handleDownload('png')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Download PNG
                </button>
                <button
                  onClick={() => handleDownload('svg')}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  Download SVG
                </button>
                <button
                  onClick={handleCopy}
                  className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy to Clipboard'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
