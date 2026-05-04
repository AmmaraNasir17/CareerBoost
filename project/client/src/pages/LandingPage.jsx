import { useNavigate } from 'react-router-dom'
import translations from '../utils/translations.json'


export default function LandingPage() {
  const navigate = useNavigate()

  const t = translations.landingPage

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm">
              ⚡
            </div>
            <div className="flex flex-col">
              <span className="hidden sm:block text-lg font-bold text-gray-900 leading-none">CareerBoost</span>
              <span className="hidden sm:block text-xs text-gray-500 font-medium">Job Platform</span>
            </div>
          </button>

          <button
            onClick={() => navigate('/login')}
            className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-103 active:scale-95"
          >
            {t.logIn}
          </button>
        </div>
      </nav>

      <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-[#f9fbff] to-white min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ top: '64px' }}>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-10"></div>
        </div>

        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full space-y-4 md:space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Connect. Grow. <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Succeed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">{t.subtitle}</p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
            >
              {t.getStarted}
            </button>
            
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">{t.trustedBy}</h2>
            <p className="text-gray-600 text-lg">{t.trustedDesc}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div className="group">
              <div className="text-center p-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">10K+</div>
                <p className="text-gray-700 font-semibold mb-2">{t.activeJobSeekers}</p>
                <p className="text-sm text-gray-600">{t.activeJobSeekersDesc}</p>
              </div>
            </div>

            <div className="group">
              <div className="text-center p-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50/50 to-emerald-50/50 hover:border-green-200 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">500+</div>
                <p className="text-gray-700 font-semibold mb-2">{t.companiesHiring}</p>
                <p className="text-sm text-gray-600">{t.companiesHiringDesc}</p>
              </div>
            </div>

            <div className="group">
              <div className="text-center p-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:border-purple-200 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">95%</div>
                <p className="text-gray-700 font-semibold mb-2">{t.satisfaction}</p>
                <p className="text-sm text-gray-600">{t.satisfactionDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-12 mb-12">
            <div className="sm:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  ⚡
                </div>
                <div>
                  <span className="font-bold text-lg text-white block">CareerBoost</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">Connecting top talent with exceptional opportunities.</p>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">{t.product}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.forJobSeekersFooter}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.forRecruitersFooter}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.pricing}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">{t.company}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.about}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.blog}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.contact}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">{t.legal}</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.privacy}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.terms}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.security}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm text-gray-500">{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  )
}