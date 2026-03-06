import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';

export default function Login() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Translation objects for 10 languages
  const translations = {
    en: {
      loginTitle: 'Welcome Back',
      loginSubtitle: 'Sign in to your account to access your dashboard',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot password?',
      signingIn: 'Signing in...',
      signInButton: 'Sign In',
      or: 'Or',
      continueWithGoogle: 'Continue with Google',
      withApple: 'Sign in with Apple',
      continueWithMicrosoft: 'Continue with Microsoft',
      trustLine: 'Secure login with industry-standard encryption',
      newToCareerBoost: 'New to CareerBoost?',
      createAccountLink: 'Create Your Account',
      loginError: 'Invalid email or password',
    },
    ur: {
      loginTitle: 'خوش آمدید',
      loginSubtitle: 'اپنے اکاؤنٹ میں سائن ان کریں',
      emailLabel: 'ای میل ایڈریس',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'پاس ورڈ',
      passwordPlaceholder: 'اپنا پاس ورڈ درج کریں',
      rememberMe: 'مجھ کو یاد رکھیں',
      forgotPassword: 'پاس ورڈ بھول گئے؟',
      signingIn: 'سائن ان میں...',
      signInButton: 'سائن ان کریں',
      or: 'یا',
      continueWithGoogle: 'Google کے ساتھ جاری رکھیں',
      withApple: 'Apple کے ساتھ سائن ان کریں',
      continueWithMicrosoft: 'Microsoft کے ساتھ جاری رکھیں',
      trustLine: 'براہ راست لاگ ان انکریپشن کے ساتھ',
      newToCareerBoost: 'CareerBoost میں نیا؟',
      createAccountLink: 'اپنا اکاؤنٹ بنائیں',
      loginError: 'غلط ای میل یا پاس ورڈ',
    },
    ar: {
      loginTitle: 'أهلا وسهلا',
      loginSubtitle: 'سجل الدخول إلى حسابك',
      emailLabel: 'عنوان البريد الإلكتروني',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور الخاصة بك',
      rememberMe: 'تذكرني',
      forgotPassword: 'هل نسيت كلمة المرور؟',
      signingIn: 'جارٍ تسجيل الدخول...',
      signInButton: 'تسجيل دخول',
      or: 'أو',
      continueWithGoogle: 'المتابعة مع Google',
      withApple: 'تسجيل الدخول مع Apple',
      continueWithMicrosoft: 'المتابعة مع Microsoft',
      trustLine: 'تسجيل دخول آمن بتشفير معياري في الصناعة ',
      newToCareerBoost: 'جديد في CareerBoost؟',
      createAccountLink: 'أنشئ حسابك',
      loginError: 'بريد إلكتروني أو كلمة مرور غير صحيحة',
    },
    fr: {
      loginTitle: 'Bienvenue',
      loginSubtitle: 'Connectez-vous à votre compte',
      emailLabel: 'Adresse e-mail',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      rememberMe: 'Se souvenir de moi',
      forgotPassword: 'Mot de passe oublié?',
      signingIn: 'Connexion en cours...',
      signInButton: 'Se connecter',
      or: 'Ou',
      continueWithGoogle: 'Continuer avec Google',
      withApple: 'Se connecter avec Apple',
      continueWithMicrosoft: 'Continuer avec Microsoft',
      trustLine: 'Connexion sécurisée avec chiffrement standard',
      newToCareerBoost: 'Nouveau chez CareerBoost?',
      createAccountLink: 'Créer un compte',
      loginError: 'Email ou mot de passe invalide',
    },
    de: {
      loginTitle: 'Willkommen zurück',
      loginSubtitle: 'Melden Sie sich bei Ihrem Konto an',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'Passwort',
      passwordPlaceholder: 'Passwort eingeben',
      rememberMe: 'Mergen Sie mich',
      forgotPassword: 'Passwort vergessen?',
      signingIn: 'Anmeldung...',
      signInButton: 'Anmelden',
      or: 'Oder',
      continueWithGoogle: 'Mit Google fortfahren',
      withApple: 'Mit Apple anmelden',
      continueWithMicrosoft: 'Mit Microsoft fortfahren',
      trustLine: 'Sichere Anmeldungen mit branchenstandardiger Verschlüsselung',
      newToCareerBoost: 'Neu bei CareerBoost?',
      createAccountLink: 'Konto erstellen',
      loginError: 'Ungültige E-Mail oder Passwort',
    },
    es: {
      loginTitle: 'Bienvenido',
      loginSubtitle: 'Inicia sesión en tu cuenta',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      rememberMe: 'Recuérdame',
      forgotPassword: '¿Olvidaste tu contraseña?',
      signingIn: 'Iniciando sesión...',
      signInButton: 'Iniciar Sesión',
      or: 'O',
      continueWithGoogle: 'Continuar con Google',
      withApple: 'Iniciar sesión con Apple',
      continueWithMicrosoft: 'Continuar con Microsoft',
      trustLine: 'Inicio de sesión seguro con encriptación estándar',
      newToCareerBoost: '¿Nuevo en CareerBoost?',
      createAccountLink: 'Crear tu Cuenta',
      loginError: 'Correo electrónico o contraseña inválidos',
    },
    zh: {
      loginTitle: '欢迎回来',
      loginSubtitle: '登录您的帐户',
      emailLabel: '电子邮件地址',
      emailPlaceholder: 'name@company.com',
      passwordLabel: '密码',
      passwordPlaceholder: '输入您的密码',
      rememberMe: '记住我',
      forgotPassword: '忘记密码?',
      signingIn: '登录中...',
      signInButton: '登录',
      or: '或',
      continueWithGoogle: '使用 Google 继续',
      withApple: '使用 Apple 登录',
      continueWithMicrosoft: '使用 Microsoft 继续',
      trustLine: '使用行业标准加密的安全登录',
      newToCareerBoost: 'CareerBoost 新手?',
      createAccountLink: '创建您的帐户',
      loginError: '无效的电子邮件或密码',
    },
    tr: {
      loginTitle: 'Hoşgeldiniz',
      loginSubtitle: 'Hesabınıza giriş yapın',
      emailLabel: 'E-posta Adresi',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'Şifre',
      passwordPlaceholder: 'Şifrenizi girin',
      rememberMe: 'Beni Hatırla',
      forgotPassword: 'Şifreni mi unuttun?',
      signingIn: 'Giriş yapılıyor...',
      signInButton: 'Giriş Yap',
      or: 'Veya',
      continueWithGoogle: 'Google ile Devam Et',
      withApple: 'Apple ile Oturum Aç',
      continueWithMicrosoft: 'Microsoft ile Devam Et',
      trustLine: 'Sektör standardı şifreleme ile güvenli giriş',
      newToCareerBoost: 'CareerBoost\'ta yeni misiniz?',
      createAccountLink: 'Hesap Oluştur',
      loginError: 'Geçersiz email veya şifre',
    },
    hi: {
      loginTitle: 'स्वागत है',
      loginSubtitle: 'अपने खाते में साइन इन करें',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      rememberMe: 'मुझे याद रखें',
      forgotPassword: 'पासवर्ड भूल गए?',
      signingIn: 'साइन इन जारी है...',
      signInButton: 'साइन इन करें',
      or: 'या',
      continueWithGoogle: 'Google के साथ जारी रखें',
      withApple: 'Apple के साथ साइन इन करें',
      continueWithMicrosoft: 'Microsoft के साथ जारी रखें',
      trustLine: 'उद्योग-मानक एन्क्रिप्शन के साथ सुरक्षित लॉगिन',
      newToCareerBoost: 'CareerBoost के लिए नए?',
      createAccountLink: 'खाता बनाएं',
      loginError: 'अमान्य ईमेल या पासवर्ड',
    },
    pt: {
      loginTitle: 'Bem-vindo',
      loginSubtitle: 'Faça login em sua conta',
      emailLabel: 'Endereço de E-mail',
      emailPlaceholder: 'name@company.com',
      passwordLabel: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
      rememberMe: 'Lembre-se de mim',
      forgotPassword: 'Esqueceu sua senha?',
      signingIn: 'Fazendo login...',
      signInButton: 'Fazer Login',
      or: 'Ou',
      continueWithGoogle: 'Continuar com Google',
      withApple: 'Faça login com Apple',
      continueWithMicrosoft: 'Continuar com Microsoft',
      trustLine: 'Login seguro com criptografia padrão da indústria',
      newToCareerBoost: 'Novo no CareerBoost?',
      createAccountLink: 'Crie sua Conta',
      loginError: 'Email ou senha inválidos',
    },
  }

  const t = translations[language] || translations.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      const { token, role } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);

      if (role === 'applier') {
        navigate('/applier');
      } else if (role === 'recruiter') {
        navigate('/recruiter');
      }
    } catch (err) {
      setError(err.response?.data?.error || t.loginError);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">{t.loginTitle}</h2>
          <p className="text-gray-600 text-sm font-normal">{t.loginSubtitle}</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              {t.emailLabel}
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              required
              className="corporate-input"
            />
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              {t.passwordLabel}
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              required
              className="corporate-input"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-3 text-sm text-red-700 font-medium animate-subtle-slide">
              {error}
            </div>
          )}

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              <input
                id="remember"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="corporate-checkbox"
              />
              <label htmlFor="remember" className="text-sm text-gray-600 cursor-pointer select-none font-normal">
                {t.rememberMe}
              </label>
            </div>
            <a href="#" className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors duration-150">
              {t.forgotPassword}
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="corporate-button mt-7"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></span>
                {t.signingIn}
              </span>
            ) : (
              t.signInButton
            )}
          </button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-3 bg-white text-gray-500 font-medium">{t.or}</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className="space-y-3 pt-1">
            {/* Google */}
            <button
              type="button"
              className="corporate-social-button"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <span className="flex-1 text-center text-sm font-normal">{t.continueWithGoogle}</span>
            </button>

            {/* Apple */}
            <button
              type="button"
              className="corporate-social-button-dark"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="white">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.17-.93 3.53-1.02 1.9-.15 3.37.97 3.82 2.94-.75.44-1.44 1.05-1.75 1.85-.51 1.62.3 3.16 1.3 4.1-.59 1.71-1.51 2.89-2.98 3.8zm-4.04-14.33c-.03-1.88 1.33-3.46 3.2-3.72.15 1.98-1.36 3.52-3.2 3.72z"/>
              </svg>
              <span className="flex-1 text-center text-sm font-normal">{t.withApple}</span>
            </button>

            {/* Microsoft */}
            <button
              type="button"
              className="corporate-social-button"
            >
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.4 24H0V12.6h11.4V24zM24 24H12.6V12.6H24V24zM11.4 11.4H0V0h11.4v11.4zm12.6 0H12.6V0H24v11.4z"/>
              </svg>
              <span className="flex-1 text-center text-sm font-normal">{t.continueWithMicrosoft}</span>
            </button>
          </div>

          {/* Trust Line */}
          <p className="text-center text-xs text-gray-500 font-normal">{t.trustLine}</p>
        </form>

        {/* Divider for Register Link */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500 font-medium">{t.newToCareerBoost}</span>
          </div>
        </div>

        {/* Register Link */}
        <button
          onClick={() => navigate('/register')}
          className="corporate-secondary-button"
        >
          {t.createAccountLink}
        </button>
      </div>
    </AuthLayout>
  );
}
