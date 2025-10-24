/**
 * reCAPTCHA v3 utilities for client and server-side verification
 */

// Client-side: Load the reCAPTCHA script
export function loadRecaptchaScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('loadRecaptchaScript can only be called on the client'));
      return;
    }

    // Check if script is already loaded
    if (typeof window.grecaptcha !== 'undefined') {
      resolve();
      return;
    }

    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey) {
      reject(new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured'));
      return;
    }

    // Check if script is already in DOM
    const existingScript = document.querySelector(
      'script[src*="recaptcha"]'
    );
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve());
      existingScript.addEventListener('error', () =>
        reject(new Error('Failed to load reCAPTCHA script'))
      );
      return;
    }

    // Create and load the script
    const script = document.createElement('script');
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;

    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load reCAPTCHA script'));

    document.head.appendChild(script);
  });
}

// Client-side: Execute reCAPTCHA and get token
export async function executeRecaptcha(action: string): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('executeRecaptcha can only be called on the client');
  }

  const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    throw new Error('NEXT_PUBLIC_RECAPTCHA_SITE_KEY is not configured');
  }

  // Load script if not already loaded
  await loadRecaptchaScript();

  // Wait for grecaptcha to be ready
  return new Promise((resolve, reject) => {
    window.grecaptcha.ready(async () => {
      try {
        const token = await window.grecaptcha.execute(siteKey, { action });
        resolve(token);
      } catch (error) {
        reject(error);
      }
    });
  });
}

// Server-side: Verify reCAPTCHA token with Google API
export async function verifyRecaptchaToken(
  token: string
): Promise<{ success: boolean; score?: number; error?: string }> {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;

  if (!secretKey) {
    console.error('RECAPTCHA_SECRET_KEY is not configured');
    return {
      success: false,
      error: 'reCAPTCHA secret key not configured',
    };
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          secret: secretKey,
          response: token,
        }),
      }
    );

    if (!response.ok) {
      return {
        success: false,
        error: `reCAPTCHA verification request failed: ${response.statusText}`,
      };
    }

    const data = await response.json();

    // Check if verification was successful
    if (!data.success) {
      return {
        success: false,
        error: `reCAPTCHA verification failed: ${data['error-codes']?.join(', ') || 'Unknown error'}`,
      };
    }

    // Check score (v3 returns a score between 0.0 and 1.0)
    // Score >= 0.5 is generally considered legitimate
    const score = data.score ?? 1.0;
    if (score < 0.5) {
      return {
        success: false,
        score,
        error: `Low reCAPTCHA score: ${score}`,
      };
    }

    return {
      success: true,
      score,
    };
  } catch (error) {
    console.error('reCAPTCHA verification error:', error);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : 'Unknown verification error',
    };
  }
}

// TypeScript declarations for grecaptcha
declare global {
  interface Window {
    grecaptcha: {
      ready: (callback: () => void) => void;
      execute: (siteKey: string, options: { action: string }) => Promise<string>;
    };
  }
}
