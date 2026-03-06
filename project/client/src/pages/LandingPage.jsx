import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext.jsx'

export default function LandingPage() {
  const navigate = useNavigate()
  const { language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [languageOpen, setLanguageOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'ur', name: 'اردو', flag: '🇵🇰' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { code: 'hi', name: 'हिन्दी', flag: '🇮🇳' },
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
  ]

  const currentLanguage = languages.find(l => l.code === language)

  // Get translations
  const getTranslations = () => {
    const translations = {
      en: {
        logIn: 'Log In',
        connectGrowSucceed: 'Connect. Grow. Succeed.',
        connectGrow: 'Connect. Grow. ',
        succeed: 'Succeed.',
        subtitle: 'CareerBoost helps job seekers and recruiters connect with meaningful opportunities. Find your next role or hire top talent with confidence.',
        getStarted: 'Get Started',
        learnMore: 'Learn More',
        chooseYourPath: 'Choose Your Path',
        pathSubtitle: 'Whether you\'re seeking opportunities or building your team, CareerBoost has everything you need.',
        forJobSeekers: 'For Job Seekers',
        jobSeekersDesc: 'Track applications, manage your profile, and discover opportunities perfectly matched to your skills and career goals.',
        startExploring: 'Start Exploring',
        personalized: 'Personalized job recommendations',
        tracking: 'Application tracking system',
        analytics: 'Profile strength analytics',
        forRecruiters: 'For Recruiters',
        recruitersDesc: 'Post jobs, manage applicants, and build your ideal team with powerful recruitment tools and analytics.',
        startHiring: 'Start Hiring',
        jobPosting: 'Easy job posting',
        screening: 'Candidate screening tools',
        hiring: 'Hiring analytics dashboard',
        trustedBy: 'Trusted by Professionals',
        trustedDesc: 'CareerBoost connects thousands of job seekers and companies every day.',
        activeJobSeekers: 'Active Job Seekers',
        activeJobSeekersDesc: 'Growing community of professionals',
        companiesHiring: 'Companies Hiring',
        companiesHiringDesc: 'From startups to enterprises',
        satisfaction: 'User Satisfaction',
        satisfactionDesc: 'Highly rated by our community',
        product: 'Product',
        forJobSeekersFooter: 'For Job Seekers',
        forRecruitersFooter: 'For Recruiters',
        pricing: 'Pricing',
        company: 'Company',
        about: 'About',
        blog: 'Blog',
        contact: 'Contact',
        legal: 'Legal',
        privacy: 'Privacy',
        terms: 'Terms',
        security: 'Security',
        copyright: '© 2024 CareerBoost. All rights reserved.',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
      ur: {
        logIn: 'لاگ ان',
        connectGrowSucceed: 'جوڑیں۔ بڑھیں۔ کامیاب ہوں۔',
        connectGrow: 'جوڑیں۔ بڑھیں۔ ',
        succeed: 'کامیاب ہوں۔',
        subtitle: 'CareerBoost نوکری کی تلاش کرنے والوں اور ریکروٹرز کو معنی خیز مواقع سے جوڑنے میں مدد کرتا ہے۔',
        getStarted: 'شروع کریں',
        learnMore: 'مزید جانیں',
        chooseYourPath: 'اپنا راستہ منتخب کریں',
        pathSubtitle: 'چاہے آپ مواقع تلاش کر رہے ہوں یا اپنی ٹیم بنا رہے ہوں، CareerBoost میں سب کچھ ہے۔',
        forJobSeekers: 'نوکری تلاش کنندگان کے لیے',
        jobSeekersDesc: 'اپنی درخواستوں کو ٹریک کریں، اپنی پروفائل کو منظم کریں، اور اپنی مہارتوں سے ملنے والے مواقع دریافت کریں۔',
        startExploring: 'دریافت شروع کریں',
        personalized: 'ذاتی نوکری کی تجاویز',
        tracking: 'درخواست کی تازہ کاری کا نظام',
        analytics: 'پروفائل کی طاقت کا تجزیہ',
        forRecruiters: 'ریکروٹرز کے لیے',
        recruitersDesc: 'نوکریاں شائع کریں، درخواست دہندگان کو سنبھالیں، اور اپنی ٹیم بنائیں۔',
        startHiring: 'بھرتی شروع کریں',
        jobPosting: 'آسان نوکری کی شائعات',
        screening: 'امیدوار کی جانچ کے ٹولز',
        hiring: 'بھرتی کے تجزیات ڈیش بورڈ',
        trustedBy: 'پیشہ ور افراد کے ذریعے معتبر',
        trustedDesc: 'CareerBoost ہر دن ہزاروں نوکری تلاش کرنے والوں اور کمپنیوں کو جوڑتا ہے۔',
        activeJobSeekers: 'فعال نوکری تلاش کنندگان',
        activeJobSeekersDesc: 'بڑھتی ہوئی پیشہ ور برادری',
        companiesHiring: 'اعتماد سے تقرری کنندہ کمپنیاں',
        companiesHiringDesc: 'سٹارٹ اپ سے انٹرپرائز تک',
        satisfaction: 'صارف کی تسلی',
        satisfactionDesc: 'ہماری برادری کے ذریعے اعلیٰ درجہ بندی',
        product: 'مصنوعات',
        forJobSeekersFooter: 'نوکری تلاش کنندگان کے لیے',
        forRecruitersFooter: 'ریکروٹرز کے لیے',
        pricing: 'قیمت کاری',
        company: 'کمپنی',
        about: 'ہمارے بارے میں',
        blog: 'بلاگ',
        contact: 'رابطہ',
        legal: 'قانونی',
        privacy: 'نجی',
        terms: 'شرائط',
        security: 'سیکیورٹی',
        copyright: '© 2024 CareerBoost۔ تمام حقوق محفوظ ہیں۔',
        twitter: 'ٹویٹر',
        linkedin: 'لنکڈ ان',
        github: 'گٹ ہب',
      },
      ar: {
        logIn: 'تسجيل دخول',
        connectGrowSucceed: 'تواصل. نما. انجح.',
        connectGrow: 'تواصل. نما. ',
        succeed: 'انجح.',
        subtitle: 'CareerBoost يساعد الباحثين عن عمل والمتخصصين في التوظيف على التواصل مع فرص ذات مغزى.',
        getStarted: 'ابدأ الآن',
        learnMore: 'تعرف على المزيد',
        chooseYourPath: 'اختر مسارك',
        pathSubtitle: 'سواء كنت تبحث عن فرص أو تبني فريقك، CareerBoost لديها كل ما تحتاجه.',
        forJobSeekers: 'للباحثين عن عمل',
        jobSeekersDesc: 'تتبع التطبيقات وإدارة ملفك الشخصي واكتشف الفرص التي تناسب مهاراتك.',
        startExploring: 'ابدأ الاستكشاف',
        personalized: 'توصيات وظائف مخصصة',
        tracking: 'نظام تتبع الطلبات',
        analytics: 'تحليلات قوة الملف الشخصي',
        forRecruiters: 'للمتخصصين في التوظيف',
        recruitersDesc: 'انشر الوظائف وأدر المتقدمين وابنِ فريقك المثالي.',
        startHiring: 'ابدأ التوظيف',
        jobPosting: 'نشر الوظائف بسهولة',
        screening: 'أدوات فحص المتقدمين',
        hiring: 'لوحة معلومات تحليلات التوظيف',
        trustedBy: 'موثوق من قبل المتخصصين',
        trustedDesc: 'يربط CareerBoost آلاف الباحثين عن العمل والشركات كل يوم.',
        activeJobSeekers: 'باحثون نشطون عن عمل',
        activeJobSeekersDesc: 'مجتمع متنام من المتخصصين',
        companiesHiring: 'شركات توظيف',
        companiesHiringDesc: 'من الشركات الناشئة إلى المؤسسات',
        satisfaction: 'رضا المستخدم',
        satisfactionDesc: 'تصنيف عالي من مجتمعنا',
        product: 'المنتج',
        forJobSeekersFooter: 'للباحثين عن عمل',
        forRecruitersFooter: 'للمتخصصين في التوظيف',
        pricing: 'التسعير',
        company: 'الشركة',
        about: 'حول',
        blog: 'مدونة',
        contact: 'اتصل',
        legal: 'قانوني',
        privacy: 'الخصوصية',
        terms: 'الشروط',
        security: 'الأمان',
        copyright: '© 2024 CareerBoost. جميع الحقوق محفوظة.',
        twitter: 'تويتر',
        linkedin: 'لينكد إن',
        github: 'غيت هب',
      },
      fr: {
        logIn: 'Connexion',
        connectGrowSucceed: 'Connectez. Grandir. Réussir.',
        connectGrow: 'Connectez. Grandir. ',
        succeed: 'Réussir.',
        subtitle: 'CareerBoost aide les demandeurs d\'emploi et les recruteurs à se connecter avec des opportunités significatives.',
        getStarted: 'Commencer',
        learnMore: 'En savoir plus',
        chooseYourPath: 'Choisissez votre chemin',
        pathSubtitle: 'Que vous cherchiez des opportunités ou construisiez votre équipe, CareerBoost a tout ce dont vous avez besoin.',
        forJobSeekers: 'Pour les chercheurs d\'emploi',
        jobSeekersDesc: 'Suivez vos candidatures, gérez votre profil et découvrez des opportunités adaptées à vos compétences.',
        startExploring: 'Commencer à explorer',
        personalized: 'Recommandations d\'emploi personnalisées',
        tracking: 'Système de suivi des candidatures',
        analytics: 'Analyses de la force du profil',
        forRecruiters: 'Pour les recruteurs',
        recruitersDesc: 'Publiez des offres d\'emploi, gérez les candidats et construisez votre équipe idéale.',
        startHiring: 'Commencer à embaucher',
        jobPosting: 'Publication facile d\'offres d\'emploi',
        screening: 'Outils de sélection des candidats',
        hiring: 'Tableau de bord analytique d\'embauche',
        trustedBy: 'Approuvé par les professionnels',
        trustedDesc: 'CareerBoost connecte des milliers de chercheurs d\'emploi et d\'entreprises chaque jour.',
        activeJobSeekers: 'Chercheurs d\'emploi actifs',
        activeJobSeekersDesc: 'Communauté croissante de professionnels',
        companiesHiring: 'Entreprises qui embauchent',
        companiesHiringDesc: 'Des startups aux entreprises',
        satisfaction: 'Satisfaction des utilisateurs',
        satisfactionDesc: 'Très bien noté par notre communauté',
        product: 'Produit',
        forJobSeekersFooter: 'Pour les chercheurs d\'emploi',
        forRecruitersFooter: 'Pour les recruteurs',
        pricing: 'Tarification',
        company: 'Entreprise',
        about: 'À propos',
        blog: 'Blog',
        contact: 'Contact',
        legal: 'Juridique',
        privacy: 'Confidentialité',
        terms: 'Conditions',
        security: 'Sécurité',
        copyright: '© 2024 CareerBoost. Tous droits réservés.',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
      de: {
        logIn: 'Anmelden',
        connectGrowSucceed: 'Verbinden. Wachsen. Erfolg.',
        connectGrow: 'Verbinden. Wachsen. ',
        succeed: 'Erfolg.',
        subtitle: 'CareerBoost hilft Jobsuchenden und Personalvermittlern, sich mit sinnvollen Möglichkeiten zu verbinden.',
        getStarted: 'Jetzt beginnen',
        learnMore: 'Mehr erfahren',
        chooseYourPath: 'Wählen Sie Ihren Weg',
        pathSubtitle: 'Ob Sie nach Chancen suchen oder Ihr Team aufbauen, CareerBoost hat alles, was Sie brauchen.',
        forJobSeekers: 'Für Jobsuchende',
        jobSeekersDesc: 'Verfolgen Sie Ihre Bewerbungen, verwalten Sie Ihr Profil und entdecken Sie Möglichkeiten, die Ihren Fähigkeiten entsprechen.',
        startExploring: 'Erkunden beginnen',
        personalized: 'Personalisierte Jobempfehlungen',
        tracking: 'Bewerbungsverfolgungssystem',
        analytics: 'Profilstärkeanalyse',
        forRecruiters: 'Für Personalvermittler',
        recruitersDesc: 'Stellen ausschreiben, Bewerber verwalten und Ihr ideales Team aufbauen.',
        startHiring: 'Einstellung beginnen',
        jobPosting: 'Einfache Stellenausschreibung',
        screening: 'Kandidaten-Screening-Tools',
        hiring: 'Einstellungs-Analyse-Dashboard',
        trustedBy: 'Vertraut von Fachleuten',
        trustedDesc: 'CareerBoost verbindet täglich Tausende von Jobsuchenden und Unternehmen.',
        activeJobSeekers: 'Aktive Jobsuchende',
        activeJobSeekersDesc: 'Wachsende Gemeinschaft von Fachleuten',
        companiesHiring: 'Einstellende Unternehmen',
        companiesHiringDesc: 'Von Startups bis Unternehmen',
        satisfaction: 'Benutzerzufriedenheit',
        satisfactionDesc: 'Hoch bewertet von unserer Gemeinschaft',
        product: 'Produkt',
        forJobSeekersFooter: 'Für Jobsuchende',
        forRecruitersFooter: 'Für Personalvermittler',
        pricing: 'Preisgestaltung',
        company: 'Unternehmen',
        about: 'Über uns',
        blog: 'Blog',
        contact: 'Kontakt',
        legal: 'Rechtliche',
        privacy: 'Datenschutz',
        terms: 'Bedingungen',
        security: 'Sicherheit',
        copyright: '© 2024 CareerBoost. Alle Rechte vorbehalten.',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
      es: {
        logIn: 'Iniciar sesión',
        connectGrowSucceed: 'Conecta. Crece. Triunfa.',
        connectGrow: 'Conecta. Crece. ',
        succeed: 'Triunfa.',
        subtitle: 'CareerBoost ayuda a los buscadores de empleo y reclutadores a conectarse con oportunidades significativas.',
        getStarted: 'Comenzar',
        learnMore: 'Más información',
        chooseYourPath: 'Elige tu camino',
        pathSubtitle: 'Ya sea que busques oportunidades o estés construyendo tu equipo, CareerBoost tiene todo lo que necesitas.',
        forJobSeekers: 'Para buscadores de empleo',
        jobSeekersDesc: 'Realiza un seguimiento de tus solicitudes, gestiona tu perfil y descubre oportunidades que se adapten a tus habilidades.',
        startExploring: 'Comenzar a explorar',
        personalized: 'Recomendaciones de empleo personalizadas',
        tracking: 'Sistema de seguimiento de solicitudes',
        analytics: 'Análisis de fortaleza del perfil',
        forRecruiters: 'Para reclutadores',
        recruitersDesc: 'Publica empleos, gestiona candidatos y construye tu equipo ideal.',
        startHiring: 'Comenzar a contratar',
        jobPosting: 'Publicación fácil de empleos',
        screening: 'Herramientas de selección de candidatos',
        hiring: 'Panel de análisis de contratación',
        trustedBy: 'Confianza de profesionales',
        trustedDesc: 'CareerBoost conecta a miles de buscadores de empleo y empresas cada día.',
        activeJobSeekers: 'Buscadores de empleo activos',
        activeJobSeekersDesc: 'Comunidad creciente de profesionales',
        companiesHiring: 'Empresas que contratan',
        companiesHiringDesc: 'De startups a empresas',
        satisfaction: 'Satisfacción del usuario',
        satisfactionDesc: 'Altamente calificado por nuestra comunidad',
        product: 'Producto',
        forJobSeekersFooter: 'Para buscadores de empleo',
        forRecruitersFooter: 'Para reclutadores',
        pricing: 'Precios',
        company: 'Empresa',
        about: 'Acerca de',
        blog: 'Blog',
        contact: 'Contacto',
        legal: 'Legal',
        privacy: 'Privacidad',
        terms: 'Términos',
        security: 'Seguridad',
        copyright: '© 2024 CareerBoost. Todos los derechos reservados.',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
      zh: {
        logIn: '登入',
        connectGrowSucceed: '连接。成长。成功。',
        connectGrow: '连接。成长。',
        succeed: '成功。',
        subtitle: 'CareerBoost 帮助求职者和招聘人员与有意义的机会相联系。',
        getStarted: '开始',
        learnMore: '了解更多',
        chooseYourPath: '选择你的路径',
        pathSubtitle: '无论你是在寻找机会还是在建立你的团队，CareerBoost 都有你需要的一切。',
        forJobSeekers: '对于求职者',
        jobSeekersDesc: '跟踪您的应用程序，管理您的个人资料，发现与您的技能相匹配的机会。',
        startExploring: '开始探索',
        personalized: '个性化的工作建议',
        tracking: '应用程序跟踪系统',
        analytics: '档案实力分析',
        forRecruiters: '对于招聘人员',
        recruitersDesc: '发布职位、管理申请者并建立您的理想团队。',
        startHiring: '开始招聘',
        jobPosting: '轻松发布职位',
        screening: '候选人筛选工具',
        hiring: '招聘分析仪表板',
        trustedBy: '被专业人士信任',
        trustedDesc: 'CareerBoost 每天连接数千名求职者和公司。',
        activeJobSeekers: '活跃求职者',
        activeJobSeekersDesc: '越来越多的专业人士社区',
        companiesHiring: '招聘公司',
        companiesHiringDesc: '从初创公司到企业',
        satisfaction: '用户满意度',
        satisfactionDesc: '我们社区的高度评价',
        product: '产品',
        forJobSeekersFooter: '对于求职者',
        forRecruitersFooter: '对于招聘人员',
        pricing: '定价',
        company: '公司',
        about: '关于',
        blog: '博客',
        contact: '联系',
        legal: '法律',
        privacy: '隐私',
        terms: '条款',
        security: '安全',
        copyright: '© 2024 CareerBoost。版权所有。',
        twitter: '推特',
        linkedin: '领英',
        github: '自由软件',
      },
      tr: {
        logIn: 'Giriş',
        connectGrowSucceed: 'Bağlan. Büyü. Başarı Sağla.',
        connectGrow: 'Bağlan. Büyü. ',
        succeed: 'Başarı Sağla.',
        subtitle: 'CareerBoost, iş arayanları ve işe alım uzmanlarını anlamlı fırsatlarla bağlamaya yardımcı olur.',
        getStarted: 'Başlayın',
        learnMore: 'Daha Fazla Bilgi',
        chooseYourPath: 'Yolunuzu Seçin',
        pathSubtitle: 'İster fırsatlar arıyor olun ister ekibinizi kuruyor olun, CareerBoost\'un ihtiyacınız olan her şeyi vardır.',
        forJobSeekers: 'İş Arayanlar İçin',
        jobSeekersDesc: 'Başvurularınızı takip edin, profilinizi yönetin ve becerilerinize uygun fırsatları keşfedin.',
        startExploring: 'Keşfetmeye Başlayın',
        personalized: 'Kişiselleştirilmiş iş önerileri',
        tracking: 'Başvuru takip sistemi',
        analytics: 'Profil gücü analizi',
        forRecruiters: 'İşe Alım Uzmanları İçin',
        recruitersDesc: 'İş ilanları yayınlayın, adayları yönetin ve ideal ekibinizi kurun.',
        startHiring: 'İşe Almaya Başlayın',
        jobPosting: 'Kolay iş ilanı',
        screening: 'Aday tarama araçları',
        hiring: 'İşe alım analitik kontrol paneli',
        trustedBy: 'Profesyoneller Tarafından Güvenilir',
        trustedDesc: 'CareerBoost her gün binlerce iş arayan ve şirketi birbirine bağlar.',
        activeJobSeekers: 'Aktif İş Arayanlar',
        activeJobSeekersDesc: 'Büyüyen profesyonel topluluğu',
        companiesHiring: 'İşe Alım Yapan Şirketler',
        companiesHiringDesc: 'Startuplardan kurumsal şirketlere',
        satisfaction: 'Kullanıcı Memnuniyeti',
        satisfactionDesc: 'Topluluğumuz tarafından yüksek oranda derecelendirilmiş',
        product: 'Ürün',
        forJobSeekersFooter: 'İş Arayanlar İçin',
        forRecruitersFooter: 'İşe Alım Uzmanları İçin',
        pricing: 'Fiyatlandırma',
        company: 'Şirket',
        about: 'Hakkında',
        blog: 'Blog',
        contact: 'İletişim',
        legal: 'Yasal',
        privacy: 'Gizlilik',
        terms: 'Şartlar',
        security: 'Güvenlik',
        copyright: '© 2024 CareerBoost. Tüm hakları saklıdır.',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
      hi: {
        logIn: 'लॉगिन',
        connectGrowSucceed: 'जुड़ें। बढ़ें। सफल हों।',
        connectGrow: 'जुड़ें। बढ़ें। ',
        succeed: 'सफल हों।',
        subtitle: 'CareerBoost नौकरी खोजने वालों और भर्तीकर्ताओं को अर्थपूर्ण अवसरों से जोड़ने में मदद करता है।',
        getStarted: 'शुरू करें',
        learnMore: 'अधिक जानें',
        chooseYourPath: 'अपना रास्ता चुनें',
        pathSubtitle: 'चाहे आप अवसर खोज रहे हों या अपनी टीम बना रहे हों, CareerBoost के पास आपकी सब कुछ है।',
        forJobSeekers: 'नौकरी खोजने वालों के लिए',
        jobSeekersDesc: 'अपने आवेदनों को ट्रैक करें, अपनी प्रोफाइल प्रबंधित करें और अपने कौशल के अनुरूप अवसर खोजें।',
        startExploring: 'खोज करना शुरू करें',
        personalized: 'व्यक्तिगत नौकरी की सिफारिशें',
        tracking: 'आवेदन ट्रैकिंग प्रणाली',
        analytics: 'प्रोफाइल शक्ति विश्लेषण',
        forRecruiters: 'भर्तीकर्ताओं के लिए',
        recruitersDesc: 'नौकरियां पोस्ट करें, आवेदकों को प्रबंधित करें और अपनी आदर्श टीम बनाएं।',
        startHiring: 'भर्ती शुरू करें',
        jobPosting: 'आसान नौकरी पोस्टिंग',
        screening: 'उम्मीदवार स्क्रीनिंग उपकरण',
        hiring: 'भर्ती विश्लेषण डैशबोर्ड',
        trustedBy: 'पेशेवरों द्वारा विश्वास',
        trustedDesc: 'CareerBoost हर दिन हजारों नौकरी खोजने वालों और कंपनियों को जोड़ता है।',
        activeJobSeekers: 'सक्रिय नौकरी खोजने वाले',
        activeJobSeekersDesc: 'पेशेवरों का बढ़ता समुदाय',
        companiesHiring: 'भर्ती करने वाली कंपनियां',
        companiesHiringDesc: 'स्टार्टअप से एंटरप्राइज तक',
        satisfaction: 'उपयोगकर्ता संतुष्टि',
        satisfactionDesc: 'हमारे समुदाय द्वारा उच्च रेटेड',
        product: 'उत्पाद',
        forJobSeekersFooter: 'नौकरी खोजने वालों के लिए',
        forRecruitersFooter: 'भर्तीकर्ताओं के लिए',
        pricing: 'मूल्य निर्धारण',
        company: 'कंपनी',
        about: 'हमारे बारे में',
        blog: 'ब्लॉग',
        contact: 'संपर्क',
        legal: 'कानूनी',
        privacy: 'गोपनीयता',
        terms: 'शर्तें',
        security: 'सुरक्षा',
        copyright: '© 2024 CareerBoost। सर्वाधिकार सुरक्षित।',
        twitter: 'ट्विटर',
        linkedin: 'लिंक्डइन',
        github: 'गिटहब',
      },
      pt: {
        logIn: 'Entrar',
        connectGrowSucceed: 'Conecte. Cresça. Tenha Sucesso.',
        connectGrow: 'Conecte. Cresça. ',
        succeed: 'Tenha Sucesso.',
        subtitle: 'CareerBoost ajuda os candidatos a empregos e recrutadores a se conectarem com oportunidades significativas.',
        getStarted: 'Começar',
        learnMore: 'Saiba Mais',
        chooseYourPath: 'Escolha Seu Caminho',
        pathSubtitle: 'Quer você esteja procurando oportunidades ou construindo seu time, CareerBoost tem tudo o que você precisa.',
        forJobSeekers: 'Para Candidatos',
        jobSeekersDesc: 'Acompanhe suas candidaturas, gerencie seu perfil e descubra oportunidades que correspondam às suas habilidades.',
        startExploring: 'Começar a Explorar',
        personalized: 'Recomendações de emprego personalizadas',
        tracking: 'Sistema de rastreamento de candidaturas',
        analytics: 'Análise de força do perfil',
        forRecruiters: 'Para Recrutadores',
        recruitersDesc: 'Publique vagas de emprego, gerencie candidatos e construa seu time ideal.',
        startHiring: 'Começar a Contratar',
        jobPosting: 'Publicação fácil de empregos',
        screening: 'Ferramentas de triagem de candidatos',
        hiring: 'Painel de análise de recrutamento',
        trustedBy: 'Confiável por Profissionais',
        trustedDesc: 'CareerBoost conecta milhares de candidatos e empresas todos os dias.',
        activeJobSeekers: 'Candidatos Ativos',
        activeJobSeekersDesc: 'Comunidade crescente de profissionais',
        companiesHiring: 'Empresas Contratando',
        companiesHiringDesc: 'De startups a empresas',
        satisfaction: 'Satisfação do Usuário',
        satisfactionDesc: 'Altamente classificado por nossa comunidade',
        product: 'Produto',
        forJobSeekersFooter: 'Para Candidatos',
        forRecruitersFooter: 'Para Recrutadores',
        pricing: 'Preços',
        company: 'Empresa',
        about: 'Sobre',
        blog: 'Blog',
        contact: 'Contato',
        legal: 'Legal',
        privacy: 'Privacidade',
        terms: 'Termos',
        security: 'Segurança',
        copyright: '© 2024 CareerBoost. Todos os direitos reservados.',
        twitter: 'Twitter',
        linkedin: 'LinkedIn',
        github: 'GitHub',
      },
    }
    return translations[language] || translations.en
  }

  const t = getTranslations()

    return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/70 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo */}
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

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLanguageOpen(!languageOpen)}
                className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200"
              >
                <span className="text-lg">🌐</span>
                <span>{currentLanguage?.name}</span>
                <svg
                  className={`w-4 h-4 transition-transform duration-200 ${languageOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </button>

              {languageOpen && (
                <div
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50 max-h-64 overflow-y-auto animate-fadeIn"
                  style={{
                    animation: 'fadeIn 0.15s ease-out',
                  }}
                >
                  {languages.map(lang => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code)
                        setLanguageOpen(false)
                      }}
                      className={`w-full text-left px-4 py-3 text-sm transition-colors duration-150 ${
                        language === lang.code
                          ? 'bg-blue-50 text-blue-600 font-semibold'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <span className="text-lg mr-2">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Language Selector */}
            <select
              value={language}
              onChange={(e) => {
                setLanguage(e.target.value)
              }}
              className="sm:hidden px-2 py-2 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 hover:border-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>

            {/* Login Button */}
            <button
              onClick={() => navigate('/login')}
              className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm hover:shadow-md hover:scale-103 active:scale-95"
            >
              <span className="hidden sm:inline">{t.logIn}</span>
              <span className="sm:hidden">Login</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-20 bg-gradient-to-b from-[#f9fbff] to-white min-h-screen flex items-center justify-center">
        {/* Animated Gradient Background */}
        <div className="absolute inset-0 -z-10 pointer-events-none" style={{ top: '64px' }}>
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-10" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-10" style={{ animationDuration: '5s', animationDelay: '0.5s' }}></div>
        </div>

        {/* Content */}
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full space-y-4 md:space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
            Connect. Grow. <span className="bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">Succeed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-500 max-w-xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <button
              onClick={() => navigate('/login')}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold rounded-lg transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
            >
              {t.getStarted}
            </button>
            <button
              className="px-8 py-3 bg-white hover:bg-gray-50 text-gray-900 font-semibold rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 active:scale-95 w-full sm:w-auto"
            >
              {t.learnMore}
            </button>
          </div>
        </div>
      </section>

      

      {/* Trust/Stats Section */}
      <section className="py-20 sm:py-28 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              {t.trustedBy}
            </h2>
            <p className="text-gray-600 text-lg">
              {t.trustedDesc}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {/* Stat 1 */}
            <div className="group">
              <div className="text-center p-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
                  10K+
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  {t.activeJobSeekers}
                </p>
                <p className="text-sm text-gray-600">
                  {t.activeJobSeekersDesc}
                </p>
              </div>
            </div>

            {/* Stat 2 */}
            <div className="group">
              <div className="text-center p-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-green-50/50 to-emerald-50/50 hover:border-green-200 hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
                  500+
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  {t.companiesHiring}
                </p>
                <p className="text-sm text-gray-600">
                  {t.companiesHiringDesc}
                </p>
              </div>
            </div>

            {/* Stat 3 */}
            <div className="group">
              <div className="text-center p-8 rounded-2xl border border-gray-100 bg-gradient-to-br from-purple-50/50 to-pink-50/50 hover:border-purple-200 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 transition-all duration-300">
                <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
                  95%
                </div>
                <p className="text-gray-700 font-semibold mb-2">
                  {t.satisfaction}
                </p>
                <p className="text-sm text-gray-600">
                  {t.satisfactionDesc}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Footer */}
      <footer className="border-t border-gray-200 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="sm:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  ⚡
                </div>
                <div>
                  <span className="font-bold text-lg text-white block">CareerBoost</span>
                </div>
              </div>
              <p className="text-sm text-gray-400 leading-relaxed">
                Connecting top talent with exceptional opportunities.
              </p>
            </div>

            {/* Product */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {t.product}
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.forJobSeekersFooter}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.forRecruitersFooter}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.pricing}</a></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {t.company}
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.about}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.blog}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.contact}</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wide">
                {t.legal}
              </h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.privacy}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.terms}</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-200">{t.security}</a></li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-800 pt-8">
            <p className="text-center text-sm text-gray-500">
              {t.copyright}
            </p>
          </div>
        </div>
      </footer>

      {/* Global Animations */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-4px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.2;
          }
        }
        .hover\:scale-103:hover {
          transform: scale(1.03);
        }
          animation: fadeIn 0.15s ease-out;
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  )
}
