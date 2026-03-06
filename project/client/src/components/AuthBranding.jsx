import React from 'react';

export default function AuthBranding() {
  return (
    <>
      {/* Mobile: Branding Section */}
      <div className="lg:hidden relative text-white" style={{background: 'linear-gradient(to bottom, #0A66C2, #0A5BA8)'}}>
        <div className="relative max-w-md mx-auto space-y-6 px-6 py-12">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight text-white">CareerBoost</h1>
            <p className="text-blue-50 text-sm leading-relaxed mt-3 font-normal">
              Build meaningful connections and advance your career.
            </p>
          </div>
        </div>
      </div>

      {/* Desktop: Left Branding Section */}
      <div className="hidden lg:flex lg:flex-col lg:justify-start relative text-white px-16 pt-20 pb-12" style={{background: 'linear-gradient(to bottom, #0A66C2, #0A5BA8)'}}>
        <div className="relative max-w-md space-y-12">
          {/* Main heading and description */}
          <div className="space-y-6">
            <h1 className="text-5xl font-semibold tracking-tight text-white">CareerBoost</h1>
            <p className="text-blue-50 text-lg leading-8 font-normal">
              Build meaningful connections and advance your career with smarter, data-driven opportunities.
            </p>
          </div>

          {/* Divider */}
          <div className="h-px opacity-30" style={{backgroundColor: '#5B9BD5'}}></div>

          {/* Features */}
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5" fill="currentColor" style={{color: '#B3D9FF'}} viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Trusted by professionals</p>
                <p className="text-blue-100 text-xs mt-1 font-normal">50,000+ users worldwide</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5" fill="currentColor" style={{color: '#B3D9FF'}} viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium text-sm">Enterprise security</p>
                <p className="text-blue-100 text-xs mt-1 font-normal">Your data is always protected</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <svg className="w-5 h-5" fill="currentColor" style={{color: '#B3D9FF'}} viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <p className="text-white font-medium text-sm">24/7 support</p>
                <p className="text-blue-100 text-xs mt-1 font-normal">We're always here to help</p>
              </div>
            </div>
          </div>

          {/* Trust badge */}
          <p className="text-blue-100 text-xs leading-relaxed font-normal">
            Trusted by talent leaders at Fortune 500 companies.
          </p>
        </div>
      </div>
    </>
  );
}
