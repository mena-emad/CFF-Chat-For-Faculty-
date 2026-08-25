import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      brand: { name: 'CollegeAI', tagline: 'Your academic co-pilot' },
      nav: { newChat: 'New conversation', recent: 'Recent conversations', menu: 'Open navigation', close: 'Close navigation', search: 'Search conversations', settings: 'Settings', conversationSettings: 'Conversation settings' },
      chat: {
        eyebrow: 'CFF / COLLEGE ADVISOR',
        title: 'Make your next academic move clearer.',
        description: 'Ask CollegeAI about universities, admissions, academic paths, or the career you want to build.',
        promptLabel: 'Your question',
        placeholder: 'Ask about a faculty, admission path, or career…',
        send: 'Send question',
        stop: 'Stop generating',
        assistant: 'CollegeAI',
        you: 'You',
        welcome: 'What would you like to explore?',
        responseNote: 'AI guidance for education and career planning',
        examples: ['Compare Computer Science and Information Systems', 'How do I choose the right faculty?', 'Build me a roadmap for a career in AI'],
        today: 'Today',
        empty: 'Start with a question and your conversation will appear here.',
      },
      profile: { name: 'Mariam Hassan', role: 'Student account', initials: 'MH' },
      controls: { language: 'العربية', languageLabel: 'Change language', themeLight: 'Switch to light mode', themeDark: 'Switch to dark mode' },
      errors: { empty: 'Please write a question first.', generic: 'Something went wrong. Please try again.' },
    },
  },
  ar: {
    translation: {
      brand: { name: 'CollegeAI', tagline: 'مساعدك الأكاديمي' },
      nav: { newChat: 'محادثة جديدة', recent: 'المحادثات الأخيرة', menu: 'فتح القائمة', close: 'إغلاق القائمة', search: 'بحث في المحادثات', settings: 'الإعدادات', conversationSettings: 'إعدادات المحادثة' },
      chat: {
        eyebrow: 'CFF / مستشار الكلية',
        title: 'خلّي خطوتك الأكاديمية الجاية أوضح.',
        description: 'اسأل CollegeAI عن الجامعات، التنسيق، المسارات الدراسية، أو المجال المهني اللي عايز تبنيه.',
        promptLabel: 'سؤالك',
        placeholder: 'اسأل عن كلية أو مسار قبول أو مجال مهني…',
        send: 'إرسال السؤال',
        stop: 'إيقاف التوليد',
        assistant: 'CollegeAI',
        you: 'أنت',
        welcome: 'حابب تستكشف إيه؟',
        responseNote: 'إرشاد بالذكاء الاصطناعي للتخطيط الدراسي والمهني',
        examples: ['قارن بين علوم الحاسب ونظم المعلومات', 'إزاي أختار الكلية المناسبة؟', 'اعمل لي خطة لمجال الذكاء الاصطناعي'],
        today: 'اليوم',
        empty: 'ابدأ بسؤال، وهتظهر محادثتك هنا.',
      },
      profile: { name: 'مريم حسن', role: 'حساب طالبة', initials: 'MH' },
      controls: { language: 'English', languageLabel: 'تغيير اللغة', themeLight: 'تفعيل الوضع الفاتح', themeDark: 'تفعيل الوضع الداكن' },
      errors: { empty: 'اكتب سؤالك الأول.', generic: 'حصل خطأ. حاول مرة تانية.' },
    },
  },
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
})

export default i18n
