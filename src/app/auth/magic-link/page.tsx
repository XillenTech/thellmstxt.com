"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { useRouter, useSearchParams } from "next/navigation";

export default function MagicLinkPage() {
  const { loginWithMagicLink } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success'>('loading');
  const [message, setMessage] = useState('Verifying your magic link...');
  const [hasVerified, setHasVerified] = useState(false);

  useEffect(() => {
    const token = searchParams.get('token');
    
    if (!token) {
      router.push('/signup');
      return;
    }

    if (hasVerified) return; // Prevent multiple verifications

    const verifyMagicLink = async () => {
      setHasVerified(true);
      try {
        console.log('Starting magic link verification...');
        const result = await loginWithMagicLink(token);
        console.log('Magic link result:', result);
        
        if (result.success) {
          setStatus('success');
          setMessage('Successfully signed in! Redirecting...');
          setTimeout(() => {
            router.push('/');
          }, 1500);
        } else {
          router.push('/signup');
        }
      } catch (error) {
        console.log('Magic link verification error:', error);
        router.push('/signup');
      }
    };

    verifyMagicLink();
  }, [searchParams, loginWithMagicLink, router, hasVerified]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-blue-100 text-center">
        {status === 'loading' && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <h2 className="text-2xl font-bold text-blue-700 mb-2">Verifying Magic Link</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
        
        {status === 'success' && (
          <>
            <div className="text-green-600 text-6xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-green-700 mb-2">Success!</h2>
            <p className="text-gray-600">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}
