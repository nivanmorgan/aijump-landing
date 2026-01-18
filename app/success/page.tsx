'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [license, setLicense] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sessionId) {
      // Fetch license key from API
      fetch(`/api/license?session_id=${sessionId}`)
        .then((res) => res.json())
        .then((data) => {
          setLicense(data.license_key);
          setEmail(data.email);
        })
        .catch((error) => {
          console.error('Failed to fetch license:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [sessionId]);

  const copyToClipboard = () => {
    if (license) {
      navigator.clipboard.writeText(license);
      alert('License key copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        <div className="bg-gray-800 rounded-lg p-8 border border-green-500">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-4xl font-bold mb-2">Welcome to AiJump Pro!</h1>
            <p className="text-gray-400">Your 7-day free trial has started</p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
              <p className="mt-4 text-gray-400">Loading your license key...</p>
            </div>
          ) : license ? (
            <div>
              <div className="bg-gray-900 rounded-lg p-6 mb-6">
                <label className="block text-sm font-semibold mb-2 text-gray-400">
                  Your License Key
                </label>
                <div className="flex items-center gap-2">
                  <code className="flex-1 bg-gray-950 px-4 py-3 rounded text-sm font-mono break-all">
                    {license}
                  </code>
                  <button
                    onClick={copyToClipboard}
                    className="bg-blue-600 hover:bg-blue-700 px-4 py-3 rounded font-semibold whitespace-nowrap transition"
                  >
                    Copy
                  </button>
                </div>
                {email && (
                  <p className="mt-2 text-sm text-gray-500">
                    A copy has been sent to {email}
                  </p>
                )}
              </div>

              <div className="space-y-4 mb-8">
                <h2 className="text-xl font-bold">Next Steps:</h2>
                <ol className="list-decimal list-inside space-y-2 text-gray-300">
                  <li>Open VSCode</li>
                  <li>Open Settings (⌘+, or Ctrl+,)</li>
                  <li>Search for "AiJump"</li>
                  <li>
                    Paste your license key into <strong>AiJump: License Key</strong>
                  </li>
                  <li>Start using pro commands: AiBuild, AiBaseline, AiPublish!</li>
                </ol>
              </div>

              <div className="bg-blue-900/30 border border-blue-500 rounded-lg p-4 mb-6">
                <p className="text-sm">
                  <strong>💡 Reminder:</strong> Your trial is free for 7 days. You won't be
                  charged until the trial ends. Cancel anytime from your Stripe customer portal.
                </p>
              </div>

              <div className="flex gap-4">
                <a
                  href="https://marketplace.visualstudio.com/items?itemName=purfectlabs.aijump-extension"
                  className="flex-1 text-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Get Extension
                </a>
                <a
                  href="/"
                  className="flex-1 text-center bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-lg font-semibold transition"
                >
                  Back to Home
                </a>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-red-400 mb-4">Failed to load license key</p>
              <p className="text-gray-400 text-sm mb-6">
                Don't worry! Check your email for your license key, or contact support.
              </p>
              <a
                href="mailto:hello@purfectlabs.com"
                className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                Contact Support
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Success() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
