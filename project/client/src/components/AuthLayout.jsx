import React from 'react';
import AuthBranding from './AuthBranding';

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-white">

      {/* Mobile: Stacked Layout */}
      <div className="lg:hidden">
        <AuthBranding />

        {/* Form Section - Mobile */}
        <div className="px-6 py-8" style={{backgroundColor: '#F3F2EF'}}>
          <div className="max-w-md mx-auto bg-white rounded-xl p-6 sm:p-8 space-y-6" style={{boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)'}}>
            {children}
          </div>
        </div>
      </div>

      {/* Desktop/Tablet: Split Layout */}
      <div className="hidden lg:grid lg:grid-cols-2 lg:min-h-screen">
        <AuthBranding />

        {/* Right Side - Form */}
        <div className="flex flex-col items-center justify-center px-8 py-12" style={{backgroundColor: '#F3F2EF'}}>
          <div className="w-full max-w-md bg-white rounded-xl p-8 space-y-6" style={{boxShadow: '0 6px 18px rgba(0, 0, 0, 0.05)'}}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
