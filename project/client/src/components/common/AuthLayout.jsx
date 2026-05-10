import AuthBranding from "./AuthBranding";

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="lg:hidden">
        <AuthBranding />
        <div className="px-6 py-8" style={{ backgroundColor: "#F3F2EF" }}>
          <div className="max-w-md mx-auto bg-white rounded-xl p-6 sm:p-8 space-y-6" style={{ boxShadow: "0 6px 18px rgba(0, 0, 0, 0.05)" }}>
            {children}
          </div>
        </div>
      </div>

      <div className="hidden lg:grid lg:grid-cols-2 lg:min-h-screen">
        <AuthBranding />
        <div className="flex flex-col items-center justify-center px-8 py-12" style={{ backgroundColor: "#F3F2EF" }}>
          <div className="w-full max-w-md bg-white rounded-xl p-8 space-y-6" style={{ boxShadow: "0 6px 18px rgba(0, 0, 0, 0.05)" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}