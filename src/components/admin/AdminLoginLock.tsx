import React from 'react';
import { Lock, AlertCircle, Loader2 } from 'lucide-react';

interface AdminLoginLockProps {
  isLoggingIn: boolean;
  loginError: string | null;
  onGoogleLogin: () => void;
  onReturnToSite: () => void;
}

export const AdminLoginLock: React.FC<AdminLoginLockProps> = ({
  isLoggingIn,
  loginError,
  onGoogleLogin,
  onReturnToSite,
}) => {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 selection:bg-[#FDB813] selection:text-[#002B66]">
      <div className="bg-white rounded-3xl border border-slate-800 shadow-2xl p-8 max-w-md w-full space-y-6 text-center animate-in fade-in">
        <div className="w-16 h-16 bg-[#002B66] text-[#FDB813] rounded-2xl flex items-center justify-center mx-auto shadow-lg">
          <Lock className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className="text-[11px] font-black text-[#002B66] uppercase tracking-widest bg-[#FDB813]/20 px-3 py-1 rounded-full border border-[#FDB813]">
            Route /admin
          </span>
          <h1 className="text-2xl font-black text-[#1A1A1A] pt-2">FIDAR Admin Studio</h1>
          <p className="text-xs text-slate-500 font-medium">Sign in with your authorized Google account to manage site content</p>
        </div>

        {loginError && (
          <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in text-left">
            <AlertCircle className="w-5 h-5 shrink-0 text-red-600" />
            <span>{loginError}</span>
          </div>
        )}

        <div className="pt-2 space-y-3">
          <button
            onClick={onGoogleLogin}
            disabled={isLoggingIn}
            className="w-full py-4 px-6 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-200 hover:border-slate-300 font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-3 cursor-pointer active:scale-95 disabled:opacity-60"
          >
            {isLoggingIn ? (
              <Loader2 className="w-5 h-5 animate-spin text-[#002B66]" />
            ) : (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <span>{isLoggingIn ? 'Connecting to Google...' : 'Sign in with Google'}</span>
          </button>
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
          <button
            onClick={onReturnToSite}
            className="hover:text-[#002B66] flex items-center gap-1 transition-colors"
          >
            <span>← Return to Public Website</span>
          </button>
          <span>Fidar BestSupplier GmbH</span>
        </div>
      </div>
    </div>
  );
};
