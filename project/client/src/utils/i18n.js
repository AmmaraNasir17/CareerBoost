import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import or define translation resources
const resources = {
  en: {
    translation: {
      // Navigation & General
      LANGUAGE: 'Language',
      ENGLISH: 'English',
      URDU: 'اردو',

      // Login Page
      LOGIN_TITLE: 'Welcome Back',
      LOGIN_SUBTITLE: 'Sign in to your CareerBoost account',
      EMAIL_LABEL: 'Email Address',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: 'Password',
      PASSWORD_PLACEHOLDER: '••••••••',
      REMEMBER_ME: 'Remember me',
      FORGOT_PASSWORD: 'Forgot password?',
      SIGN_IN_BUTTON: 'Sign In',
      SIGNING_IN: 'Signing In...',
      NEW_TO_CAREERBOOST: 'New to CareerBoost?',
      CREATE_ACCOUNT_LINK: 'Create an account',
      LOGIN_ERROR: 'Login failed. Please try again.',
      LOGIN_ERROR_INVALID: 'Invalid email or password.',
      OR: 'OR',
      CONTINUE_WITH_GOOGLE: 'Continue with Google',
      SIGN_IN_WITH_APPLE: 'Sign in with Apple',
      CONTINUE_WITH_MICROSOFT: 'Continue with Microsoft',
      TRUST_LINE: 'Secure login • Trusted by 50,000+ professionals',

      // Register Page
      REGISTER_TITLE: 'Create Account',
      REGISTER_SUBTITLE: 'Join CareerBoost and build your future',
      ROLE_LABEL: 'I am a...',
      JOB_SEEKER: 'Job Seeker',
      RECRUITER: 'Recruiter',
      CONFIRM_PASSWORD_LABEL: 'Confirm Password',
      CONFIRM_PASSWORD_PLACEHOLDER: '••••••••',
      CREATE_ACCOUNT_BUTTON: 'Create Account',
      CREATING_ACCOUNT: 'Creating Account...',
      ALREADY_HAVE_ACCOUNT: 'Already have an account?',
      SIGN_IN_LINK: 'Sign in instead',
      REGISTER_ERROR: 'Registration failed. Please try again.',
      PASSWORD_MISMATCH: 'Passwords do not match',
      PASSWORD_MIN_LENGTH: 'Password must be at least 6 characters',

      // Branding (AuthLayout)
      CAREERBOOST: 'CareerBoost',
      TAGLINE: 'Grow your career with smarter connections. Connect with opportunities, build meaningful networks, and advance your professional journey.',
      TRUSTED_PROFESSIONALS: 'Trusted by professionals',
      TRUSTED_USERS: 'Join 50,000+ users worldwide',
      ENTERPRISE_SECURITY: 'Enterprise security',
      DATA_PROTECTED: 'Your data is protected',
      SUPPORT_24_7: '24/7 support',
      WE_ARE_HERE: 'We\'re here to help',

      // Role Selector
      CHOOSE_ROLE: 'Choose Your Role',
      ROLE_DESCRIPTION: 'Select the account type that fits you best',
      JOB_SEEKER_TITLE: 'Job Seeker',
      JOB_SEEKER_DESC: 'Find your next opportunity and grow your career',
      RECRUITER_TITLE: 'Recruiter',
      RECRUITER_DESC: 'Find top talent and build your team',
      CONTINUE: 'Continue',
    }
  },
  ur: {
    translation: {
      // Navigation & General
      LANGUAGE: 'زبان',
      ENGLISH: 'English',
      URDU: 'اردو',

      // Login Page
      LOGIN_TITLE: 'خوش آمدید',
      LOGIN_SUBTITLE: 'اپنے CareerBoost اکاؤنٹ میں سائن ان کریں',
      EMAIL_LABEL: 'ای میل ایڈریس',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: 'پاس ورڈ',
      PASSWORD_PLACEHOLDER: '••••••••',
      REMEMBER_ME: 'مجھے یاد رکھیں',
      FORGOT_PASSWORD: 'پاس ورڈ بھول گئے؟',
      SIGN_IN_BUTTON: 'سائن ان کریں',
      SIGNING_IN: 'سائن ان کر رہے ہیں...',
      NEW_TO_CAREERBOOST: 'کیا CareerBoost میں نئے ہیں؟',
      CREATE_ACCOUNT_LINK: 'اکاؤنٹ بنائیں',
      LOGIN_ERROR: 'لاگ ان ناکام رہا۔ براہ کرم دوبارہ کوشش کریں۔',
      LOGIN_ERROR_INVALID: 'غلط ای میل یا پاس ورڈ۔',
      OR: 'یا',
      CONTINUE_WITH_GOOGLE: 'Google کے ساتھ جاری رکھیں',
      SIGN_IN_WITH_APPLE: 'Apple کے ساتھ سائن ان کریں',
      CONTINUE_WITH_MICROSOFT: 'Microsoft کے ساتھ جاری رکھیں',
      TRUST_LINE: 'محفوظ لاگ ان • 50,000+ پیشہ وروں کے ذریعے معتمد',

      // Register Page
      REGISTER_TITLE: 'اکاؤنٹ بنائیں',
      REGISTER_SUBTITLE: 'CareerBoost میں شامل ہوں اور اپنا مستقبل بنائیں',
      ROLE_LABEL: 'میں ہوں...',
      JOB_SEEKER: 'ملازم تلاش کار',
      RECRUITER: 'بھرتی کار',
      CONFIRM_PASSWORD_LABEL: 'پاس ورڈ کی تصدیق کریں',
      CONFIRM_PASSWORD_PLACEHOLDER: '••••••••',
      CREATE_ACCOUNT_BUTTON: 'اکاؤنٹ بنائیں',
      CREATING_ACCOUNT: 'اکاؤنٹ بنایا جا رہا ہے...',
      ALREADY_HAVE_ACCOUNT: 'کیا آپ کے پاس پہلے سے اکاؤنٹ ہے؟',
      SIGN_IN_LINK: 'اس کی بجائے سائن ان کریں',
      REGISTER_ERROR: 'رجسٹریشن ناکام رہی۔ براہ کرم دوبارہ کوشش کریں۔',
      PASSWORD_MISMATCH: 'پاس ورڈز مماثل نہیں ہیں',
      PASSWORD_MIN_LENGTH: 'پاس ورڈ کم از کم 6 حروف کا ہونا چاہیے',

      // Branding (AuthLayout)
      CAREERBOOST: 'CareerBoost',
      TAGLINE: 'اپنے کریئر کو ذہین رابطوں سے بڑھائیں۔ مواقع سے جڑیں، معنی خیز نیٹ ورک بنائیں، اور اپنے پیشہ ورانہ سفر کو آگے بڑھائیں۔',
      TRUSTED_PROFESSIONALS: 'پیشہ وروں کے ذریعے معتمد',
      TRUSTED_USERS: '50,000+ صارفین میں شامل ہوں',
      ENTERPRISE_SECURITY: 'انٹرپرائز سیکیورٹی',
      DATA_PROTECTED: 'آپ کا ڈیٹا محفوظ ہے',
      SUPPORT_24_7: '24/7 معاونت',
      WE_ARE_HERE: 'ہم یہاں مدد کے لیے ہیں',

      // Role Selector
      CHOOSE_ROLE: 'اپنا کردار منتخب کریں',
      ROLE_DESCRIPTION: 'وہ اکاؤنٹ کی قسم منتخب کریں جو آپ کے لیے بہترین ہو',
      JOB_SEEKER_TITLE: 'ملازم تلاش کار',
      JOB_SEEKER_DESC: 'اپنا اگلا موقع تلاش کریں اور اپنے کریئر کو بڑھائیں',
      RECRUITER_TITLE: 'بھرتی کار',
      RECRUITER_DESC: 'بہترین مواہب تلاش کریں اور اپنی ٹیم بنائیں',
      CONTINUE: 'جاری رکھیں',
    }
  },
  es: {
    translation: {
      LANGUAGE: 'Idioma',
      ENGLISH: 'English',
      LOGIN_TITLE: 'Bienvenido de Nuevo',
      LOGIN_SUBTITLE: 'Inicia sesión en tu cuenta de CareerBoost',
      EMAIL_LABEL: 'Correo Electrónico',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: 'Contraseña',
      PASSWORD_PLACEHOLDER: '••••••••',
      SIGN_IN_BUTTON: 'Iniciar Sesión',
      OR: 'O',
      CONTINUE_WITH_GOOGLE: 'Continuar con Google',
      SIGN_IN_WITH_APPLE: 'Iniciar sesión con Apple',
      CONTINUE_WITH_MICROSOFT: 'Continuar con Microsoft',
      TRUST_LINE: 'Inicio seguro • Confiado por 50,000+ profesionales',
    }
  },
  fr: {
    translation: {
      LANGUAGE: 'Langue',
      ENGLISH: 'English',
      LOGIN_TITLE: 'Bienvenue',
      LOGIN_SUBTITLE: 'Connectez-vous à votre compte CareerBoost',
      EMAIL_LABEL: 'Adresse Email',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: 'Mot de Passe',
      PASSWORD_PLACEHOLDER: '••••••••',
      SIGN_IN_BUTTON: 'Connexion',
      OR: 'OU',
      CONTINUE_WITH_GOOGLE: 'Continuer avec Google',
      SIGN_IN_WITH_APPLE: 'S\'identifier avec Apple',
      CONTINUE_WITH_MICROSOFT: 'Continuer avec Microsoft',
      TRUST_LINE: 'Connexion sécurisée • Approuvé par 50,000+ professionnels',
    }
  },
  de: {
    translation: {
      LANGUAGE: 'Sprache',
      ENGLISH: 'English',
      LOGIN_TITLE: 'Willkommen Zurück',
      LOGIN_SUBTITLE: 'Melden Sie sich bei Ihrem CareerBoost-Konto an',
      EMAIL_LABEL: 'E-Mail-Adresse',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: 'Passwort',
      PASSWORD_PLACEHOLDER: '••••••••',
      SIGN_IN_BUTTON: 'Anmelden',
      OR: 'ODER',
      CONTINUE_WITH_GOOGLE: 'Mit Google fortfahren',
      SIGN_IN_WITH_APPLE: 'Mit Apple anmelden',
      CONTINUE_WITH_MICROSOFT: 'Mit Microsoft fortfahren',
      TRUST_LINE: 'Sichere Anmeldung • Von 50.000+ Fachleuten vertraut',
    }
  },
  it: {
    translation: {
      LANGUAGE: 'Lingua',
      ENGLISH: 'English',
      LOGIN_TITLE: 'Bentornato',
      LOGIN_SUBTITLE: 'Accedi al tuo account CareerBoost',
      EMAIL_LABEL: 'Indirizzo Email',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: 'Password',
      PASSWORD_PLACEHOLDER: '••••••••',
      SIGN_IN_BUTTON: 'Accedi',
      OR: 'O',
      CONTINUE_WITH_GOOGLE: 'Continua con Google',
      SIGN_IN_WITH_APPLE: 'Accedi con Apple',
      CONTINUE_WITH_MICROSOFT: 'Continua con Microsoft',
      TRUST_LINE: 'Accesso sicuro • Trusted da 50.000+ professionisti',
    }
  },
  pt: {
    translation: {
      LANGUAGE: 'Idioma',
      ENGLISH: 'English',
      LOGIN_TITLE: 'Bem-vindo de Volta',
      LOGIN_SUBTITLE: 'Faça login em sua conta CareerBoost',
      EMAIL_LABEL: 'Endereço de Email',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: 'Senha',
      PASSWORD_PLACEHOLDER: '••••••••',
      SIGN_IN_BUTTON: 'Entrar',
      OR: 'OU',
      CONTINUE_WITH_GOOGLE: 'Google で続ける',
      CONTINUE_WITH_LINKEDIN: 'LinkedIn で続ける',
      CONTINUE_WITH_MICROSOFT: 'Microsoft で続ける',
      TRUST_LINE: 'Entrada segura • Confiado por 50.000+ profissionais',
    }
  },
  ja: {
    translation: {
      LANGUAGE: '言語',
      ENGLISH: 'English',
      LOGIN_TITLE: 'おかえりなさい',
      LOGIN_SUBTITLE: 'CareerBoostアカウントにサインイン',
      EMAIL_LABEL: 'メールアドレス',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: 'パスワード',
      PASSWORD_PLACEHOLDER: '••••••••',
      SIGN_IN_BUTTON: 'サインイン',
      OR: 'または',
      CONTINUE_WITH_GOOGLE: 'Google で続ける',
      SIGN_IN_WITH_APPLE: 'Apple でサインイン',
      CONTINUE_WITH_MICROSOFT: 'Microsoft で続ける',
      TRUST_LINE: '安全なログイン • 50,000+ の専門家から信頼されています',
    }
  },
  zh: {
    translation: {
      LANGUAGE: '语言',
      ENGLISH: 'English',
      LOGIN_TITLE: '欢迎回来',
      LOGIN_SUBTITLE: '登录到您的CareerBoost帐户',
      EMAIL_LABEL: '电子邮件地址',
      EMAIL_PLACEHOLDER: 'you@example.com',
      PASSWORD_LABEL: '密码',
      PASSWORD_PLACEHOLDER: '••••••••',
      SIGN_IN_BUTTON: '登录',
      OR: '或',
      CONTINUE_WITH_GOOGLE: '使用 Google 继续',
      SIGN_IN_WITH_APPLE: '使用 Apple 登录',
      CONTINUE_WITH_MICROSOFT: '使用 Microsoft 继续',
      TRUST_LINE: '安全登录 • 受 50,000+ 专业人士信任',
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false // React already escapes values
    }
  });

export default i18n;
