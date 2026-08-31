import { CheckCircle2, LayoutDashboard, Loader2, XCircle, Mail } from 'lucide-react';
import { useEffect, useState } from 'react';
import Logo from './Logo';
import { useModal } from '../context/ModalContext';

/**
 * Landing page for the trial verification email link.
 *
 * The URL is expected to look like:  /?verify=1&token=...
 *
 * When a backend verify endpoint is available (VITE_VERIFY_API_URL), the token
 * is sent to it and the returned session token is stored before redirecting.
 * Until then, visitors are redirected to the trial app on success.
 */
function getQueryParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    token: params.get('token'),
    email: params.get('email'),
    isVerify: params.get('verify') === '1',
  };
}

export default function TrialVerifyPage() {
  const { goHome, goTrialDemo } = useModal();
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    const { token } = getQueryParams();

    async function verify() {
      const verifyApi = import.meta.env.VITE_VERIFY_API_URL;
      if (!verifyApi) {
        setStatus('success');
        setMessage(
          token
            ? 'Your trial request has been received and your workspace is being set up. We will email you a verification link shortly.'
            : 'Your free trial workspace is being set up. Please check your inbox — we will send you a link to get started.'
        );
        return;
      }

      try {
        const res = await fetch(`${verifyApi}?token=${encodeURIComponent(token)}`, { method: 'GET' });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.message || 'Verification failed. The link may be invalid or expired.');
        }
        const data = await res.json();
        if (data.sessionToken) {
          localStorage.setItem('ghris-session', data.sessionToken);
        }
        setStatus('success');
        setMessage('Your email is verified and your trial workspace is ready.');
      } catch (err) {
        setStatus('error');
        setMessage(err?.message || 'We could not verify your request. Please contact sales@globalhris.com.');
      }
    }

    verify();
  }, []);

  const { isVerify } = getQueryParams();

  return (
    <div className="min-h-screen grid-pattern flex items-center justify-center px-4 py-16 bg-white dark:bg-navy-950 transition-colors duration-500">
      <div className="relative w-full max-w-md glass-strong rounded-3xl p-8 sm:p-10 text-center">
        <div className="relative">
          <Logo />

          <div className="mt-10">
            {status === 'loading' && (
              <>
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-electric-500/10 text-electric-500 mb-5">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </span>
                <h1 className="font-display text-xl font-bold text-navy-900 dark:text-white">Verifying your email…</h1>
                <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">Please wait a moment while we confirm your request.</p>
              </>
            )}

            {status === 'success' && (
              <>
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400/20 to-electric-500/20 text-cyan-500 dark:text-cyan-300 mb-5">
                  {isVerify ? <CheckCircle2 className="h-8 w-8" /> : <Mail className="h-8 w-8" />}
                </span>
                <h1 className="font-display text-xl font-bold text-navy-900 dark:text-white">
                  {isVerify ? 'Verified!' : 'Your free trial is on its way'}
                </h1>
                <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">{message}</p>

                {!isVerify ? (
                  <button type="button" onClick={goTrialDemo} className="btn-primary mt-7 w-full">
                    <LayoutDashboard className="h-4 w-4" /> Explore a trial preview
                  </button>
                ) : null}

                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); goHome(); }}
                  className="mt-3 inline-block text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-navy-900 dark:hover:text-white transition-colors"
                >
                  Back to home
                </a>
              </>
            )}

            {status === 'error' && (
              <>
                <span className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 mb-5">
                  <XCircle className="h-8 w-8" />
                </span>
                <h1 className="font-display text-xl font-bold text-navy-900 dark:text-white">We couldn't verify your request</h1>
                <p className="mt-2.5 text-sm text-slate-500 dark:text-slate-400">{message}</p>
                <a href="mailto:sales@globalhris.com" className="btn-primary mt-7 w-full">
                  Contact our team
                </a>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
