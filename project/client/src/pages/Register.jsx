import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import axios from 'axios';
import AuthLayout from '../components/AuthLayout';

export default function Register() {
  const navigate = useNavigate();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('applier');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Translation objects for 10 languages
  const translations = {
    en: {
      registerTitle: 'Create Your Account',
      registerSubtitle: 'Join CareerBoost and start your career journey',
      emailLabel: 'Email Address',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'I am a',
      jobSeeker: 'Job Seeker',
      recruiter: 'Recruiter',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      passwordMismatch: 'Passwords do not match',
      passwordMinLength: 'Password must be at least 6 characters',
      creatingAccount: 'Creating account...',
      createAccountButton: 'Create Account',
      or: 'Or',
      continueWithGoogle: 'Continue with Google',
      withApple: 'Sign in with Apple',
      continueWithMicrosoft: 'Continue with Microsoft',
      trustLine: 'Secure registration with industry-standard encryption',
      alreadyHaveAccount: 'Already have an account?',
      signInLink: 'Sign In Here',
      registerError: 'Registration failed. Please try again.',
    },
    ur: {
      registerTitle: 'اپنا اکاؤنٹ بنائیں',
      registerSubtitle: 'CareerBoost میں شامل ہوں',
      emailLabel: 'ای میل ایڈریس',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'میں ہوں',
      jobSeeker: 'نوکری تلاش کنندہ',
      recruiter: 'ریکروٹر',
      passwordLabel: 'پاس ورڈ',
      passwordPlaceholder: 'اپنا پاس ورڈ درج کریں',
      confirmPasswordLabel: 'پاس ورڈ کی تصدیق کریں',
      confirmPasswordPlaceholder: 'اپنا پاس ورڈ دوبارہ درج کریں',
      passwordMismatch: 'پاس ورڈ مماثل نہیں ہیں',
      passwordMinLength: 'پاس ورڈ کم از کم 6 حروف ہونا چاہیے',
      creatingAccount: 'اکاؤنٹ بنایا جا رہا ہے...',
      createAccountButton: 'اکاؤنٹ بنائیں',
      or: 'یا',
      continueWithGoogle: 'Google کے ساتھ جاری رکھیں',
      withApple: 'Apple کے ساتھ سائن ان کریں',
      continueWithMicrosoft: 'Microsoft کے ساتھ جاری رکھیں',
      trustLine: 'محفوظ رجسٹریشن',
      alreadyHaveAccount: 'پہلے سے اکاؤنٹ ہے؟',
      signInLink: 'یہاں سائن ان کریں',
      registerError: 'رجسٹریشن ناکام۔ دوبارہ کوشش کریں۔',
    },
    ar: {
      registerTitle: 'إنشاء حسابك',
      registerSubtitle: 'انضم إلى CareerBoost وابدأ رحلة حياتك المهنية',
      emailLabel: 'عنوان البريد الإلكتروني',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'أنا',
      jobSeeker: 'باحث عن عمل',
      recruiter: 'متخصص في التوظيف',
      passwordLabel: 'كلمة المرور',
      passwordPlaceholder: 'أدخل كلمة المرور الخاصة بك',
      confirmPasswordLabel: 'تأكيد كلمة المرور',
      confirmPasswordPlaceholder: 'أكد كلمة المرور الخاصة بك',
      passwordMismatch: 'كلمات المرور غير متطابقة',
      passwordMinLength: 'يجب أن تكون كلمة المرور 6 أحرف على الأقل',
      creatingAccount: 'إنشاء الحساب...',
      createAccountButton: 'إنشاء حساب',
      or: 'أو',
      continueWithGoogle: 'المتابعة مع Google',
      withApple: 'تسجيل الدخول مع Apple',
      continueWithMicrosoft: 'المتابعة مع Microsoft',
      trustLine: 'تسجيل آمن مع تشفير معياري  ',
      alreadyHaveAccount: 'هل لديك حساب بالفعل؟',
      signInLink: 'سجل الدخول هنا',
      registerError: 'فشل التسجيل. حاول مرة أخرى.',
    },
    fr: {
      registerTitle: 'Créer votre compte',
      registerSubtitle: 'Rejoignez CareerBoost et commencez votre carrière',
      emailLabel: 'Adresse e-mail',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'Je suis',
      jobSeeker: 'Chercheur d\'emploi',
      recruiter: 'Recruteur',
      passwordLabel: 'Mot de passe',
      passwordPlaceholder: 'Entrez votre mot de passe',
      confirmPasswordLabel: 'Confirmer le mot de passe',
      confirmPasswordPlaceholder: 'Confirmez votre mot de passe',
      passwordMismatch: 'Les mots de passe ne correspondent pas',
      passwordMinLength: 'Le mot de passe doit contenir au moins 6 caractères',
      creatingAccount: 'Création du compte...',
      createAccountButton: 'Créer un compte',
      or: 'Ou',
      continueWithGoogle: 'Continuer avec Google',
      withApple: 'Se connecter avec Apple',
      continueWithMicrosoft: 'Continuer avec Microsoft',
      trustLine: 'Inscription sécurisée avec chiffrement standard',
      alreadyHaveAccount: 'Vous avez déjà un compte?',
      signInLink: 'Connectez-vous ici',
      registerError: 'Inscription échouée. Veuillez réessayer.',
    },
    de: {
      registerTitle: 'Konto erstellen',
      registerSubtitle: 'Treten Sie CareerBoost bei',
      emailLabel: 'E-Mail-Adresse',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'Ich bin',
      jobSeeker: 'Jobsuchender',
      recruiter: 'Personalvermittler',
      passwordLabel: 'Passwort',
      passwordPlaceholder: 'Passwort eingeben',
      confirmPasswordLabel: 'Passwort bestätigen',
      confirmPasswordPlaceholder: 'Passwort bestätigen',
      passwordMismatch: 'Passwörter stimmen nicht überein',
      passwordMinLength: 'Passwort muss mindestens 6 Zeichen lang sein',
      creatingAccount: 'Konto wird erstellt...',
      createAccountButton: 'Konto erstellen',
      or: 'Oder',
      continueWithGoogle: 'Mit Google fortfahren',
      withApple: 'Mit Apple anmelden',
      continueWithMicrosoft: 'Mit Microsoft fortfahren',
      trustLine: 'Sichere Registrierung mit Verschlüsselung',
      alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
      signInLink: 'Melden Sie sich hier an',
      registerError: 'Registrierung fehlgeschlagen. Bitte versuchen Sie es erneut.',
    },
    es: {
      registerTitle: 'Crea tu Cuenta',
      registerSubtitle: 'Únete a CareerBoost',
      emailLabel: 'Correo Electrónico',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'Soy',
      jobSeeker: 'Buscador de Empleo',
      recruiter: 'Reclutador',
      passwordLabel: 'Contraseña',
      passwordPlaceholder: 'Ingresa tu contraseña',
      confirmPasswordLabel: 'Confirmar Contraseña',
      confirmPasswordPlaceholder: 'Confirma tu contraseña',
      passwordMismatch: 'Las contraseñas no coinciden',
      passwordMinLength: 'La contraseña debe tener al menos 6 caracteres',
      creatingAccount: 'Creando cuenta...',
      createAccountButton: 'Crear Cuenta',
      or: 'O',
      continueWithGoogle: 'Continuar con Google',
      withApple: 'Iniciar sesión con Apple',
      continueWithMicrosoft: 'Continuar con Microsoft',
      trustLine: 'Registro seguro con encriptación',
      alreadyHaveAccount: '¿Ya tienes una cuenta?',
      signInLink: 'Inicia sesión aquí',
      registerError: 'Registro fallido. Por favor intenta de nuevo.',
    },
    zh: {
      registerTitle: '创建您的帐户',
      registerSubtitle: '加入 CareerBoost',
      emailLabel: '电子邮件地址',
      emailPlaceholder: 'name@company.com',
      roleLabel: '我是',
      jobSeeker: '求职者',
      recruiter: '招聘人员',
      passwordLabel: '密码',
      passwordPlaceholder: '输入您的密码',
      confirmPasswordLabel: '确认密码',
      confirmPasswordPlaceholder: '确认您的密码',
      passwordMismatch: '密码不匹配',
      passwordMinLength: '密码至少需要 6 个字符',
      creatingAccount: '正在创建帐户...',
      createAccountButton: '创建帐户',
      or: '或',
      continueWithGoogle: '使用 Google 继续',
      withApple: '使用 Apple 登录',
      continueWithMicrosoft: '使用 Microsoft 继续',
      trustLine: '使用加密进行安全注册',
      alreadyHaveAccount: '已经有帐户？',
      signInLink: '在这里登录',
      registerError: '注册失败。请重试。',
    },
    tr: {
      registerTitle: 'Hesap Oluştur',
      registerSubtitle: 'CareerBoost\'a Katıl',
      emailLabel: 'E-posta Adresi',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'Ben bir',
      jobSeeker: 'İş Arayan',
      recruiter: 'İşe Alım Uzmanı',
      passwordLabel: 'Şifre',
      passwordPlaceholder: 'Şifrenizi girin',
      confirmPasswordLabel: 'Şifreyi Onayla',
      confirmPasswordPlaceholder: 'Şifrenizi onaylayın',
      passwordMismatch: 'Şifreler eşleşmiyor',
      passwordMinLength: 'Şifre en az 6 karakter olmalıdır',
      creatingAccount: 'Hesap oluşturuluyor...',
      createAccountButton: 'Hesap Oluştur',
      or: 'Veya',
      continueWithGoogle: 'Google ile Devam Et',
      withApple: 'Apple ile Oturum Aç',
      continueWithMicrosoft: 'Microsoft ile Devam Et',
      trustLine: 'Şifreleme ile güvenli kayıt',
      alreadyHaveAccount: 'Zaten bir hesabın var mı?',
      signInLink: 'Buradan giriş yap',
      registerError: 'Kayıt başarısız. Lütfen tekrar deneyin.',
    },
    hi: {
      registerTitle: 'अपना खाता बनाएं',
      registerSubtitle: 'CareerBoost में शामिल हों',
      emailLabel: 'ईमेल पता',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'मैं हूँ',
      jobSeeker: 'नौकरी खोजने वाला',
      recruiter: 'भर्तीकर्ता',
      passwordLabel: 'पासवर्ड',
      passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
      confirmPasswordLabel: 'पासवर्ड की पुष्टि करें',
      confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
      passwordMismatch: 'पासवर्ड मेल नहीं खाते',
      passwordMinLength: 'पासवर्ड कम से कम 6 वर्ण होना चाहिए',
      creatingAccount: 'खाता बनाया जा रहा है...',
      createAccountButton: 'खाता बनाएं',
      or: 'या',
      continueWithGoogle: 'Google के साथ जारी रखें',
      withApple: 'Apple के साथ साइन इन करें',
      continueWithMicrosoft: 'Microsoft के साथ जारी रखें',
      trustLine: 'एन्क्रिप्शन के साथ सुरक्षित पंजीकरण',
      alreadyHaveAccount: 'पहले से खाता है?',
      signInLink: 'यहाँ साइन इन करें',
      registerError: 'पंजीकरण विफल। कृपया पुनः प्रयास करें।',
    },
    pt: {
      registerTitle: 'Criar Sua Conta',
      registerSubtitle: 'Junte-se ao CareerBoost',
      emailLabel: 'Endereço de E-mail',
      emailPlaceholder: 'name@company.com',
      roleLabel: 'Sou',
      jobSeeker: 'Candidato de Emprego',
      recruiter: 'Recrutador',
      passwordLabel: 'Senha',
      passwordPlaceholder: 'Digite sua senha',
      confirmPasswordLabel: 'Confirmar Senha',
      confirmPasswordPlaceholder: 'Confirme sua senha',
      passwordMismatch: 'As senhas não correspondem',
      passwordMinLength: 'A senha deve ter pelo menos 6 caracteres',
      creatingAccount: 'Criando conta...',
      createAccountButton: 'Criar Conta',
      or: 'Ou',
      continueWithGoogle: 'Continuar com Google',
      withApple: 'Faça login com Apple',
      continueWithMicrosoft: 'Continuar com Microsoft',
      trustLine: 'Registro seguro com criptografia',
      alreadyHaveAccount: 'Já tem uma conta?',
      signInLink: 'Entre aqui',
      registerError: 'Registro falhou. Por favor tente novamente.',
    },
  }

  const t = translations[language] || translations.en;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    if (password.length < 6) {
      setError(t.passwordMinLength);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://localhost:3000/register', {
        email,
        password,
        role
      });

      const { token } = response.data;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);

      if (role === 'applier') {
        navigate('/applier');
      } else if (role === 'recruiter') {
        navigate('/recruiter');
      }
    } catch (err) {
      setError(err.response?.data?.error || t.registerError);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold text-gray-900">{t.registerTitle}</h2>
          <p className="text-gray-600 text-sm font-normal">{t.registerSubtitle}</p>
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

          {/* Role */}
          <div className="space-y-2">
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
              {t.roleLabel}
            </label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="corporate-input corporate-select"
            >
              <option value="applier">{t.jobSeeker}</option>
              <option value="recruiter">{t.recruiter}</option>
            </select>
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

          {/* Confirm Password */}
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              {t.confirmPasswordLabel}
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={t.confirmPasswordPlaceholder}
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="corporate-button mt-7"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-transparent border-t-white border-r-white rounded-full animate-spin"></span>
                {t.creatingAccount}
              </span>
            ) : (
              t.createAccountButton
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

        {/* Divider for Login Link */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="px-3 bg-white text-gray-500 font-medium">{t.alreadyHaveAccount}</span>
          </div>
        </div>

        {/* Login Link */}
        <button
          onClick={() => navigate('/login')}
          className="corporate-secondary-button"
        >
          {t.signInLink}
        </button>
      </div>
    </AuthLayout>
  );
}
