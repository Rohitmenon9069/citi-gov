/* ============================================================
   CitiGov — i18n.js
   Lightweight translation engine + dictionary
   ============================================================ */

'use strict';

/* ── Translation dictionary ─────────────────────────────────
   Keys match data-i18n attributes in index.html.
   Add more keys/languages here as needed.
─────────────────────────────────────────────────────────── */
const DICT = {
  EN: {
    'nav.dashboard'   : 'Dashboard',
    'nav.pillars'     : 'Trust Pillars',
    'nav.gap'         : 'Reality Gap',
    'nav.barriers'    : 'Barriers',
    'nav.simulator'   : 'Simulator',
    'nav.cases'       : 'Case Studies',
    'nav.action'      : 'Action Plan',
    'nav.build'       : 'Behind the Build',
    'about.badge'     : 'What is CitiGov?',
    'about.title'     : 'Rebuilding trust between 1.4 Billion citizens and their government',
    'about.lead'      : "CitiGov is India's first open Digital Trust Analytics Dashboard — a real-time platform that measures, visualises, and helps improve citizen confidence in India's digital government services including Aadhaar, DigiLocker, UMANG, UPI, CoWIN, and 1,700+ other e-governance platforms.",
    'about.p1.title'  : 'Measure',
    'about.p1.desc'   : 'Track trust scores across 28 states using real survey data from 42,000+ Indian citizens',
    'about.p2.title'  : 'Analyse',
    'about.p2.desc'   : 'Identify the exact barriers — security fears, UX complexity, literacy gaps — holding adoption back',
    'about.p3.title'  : 'Simulate',
    'about.p3.desc'   : 'Model how reforms like unified portals or stronger data laws change adoption outcomes',
    'about.p4.title'  : 'Act',
    'about.p4.desc'   : 'Turn insights into a personalised strategic action plan with drag-and-drop prioritisation',
    'hero.badge'      : 'Live Trust Monitor · Updated March 2025 · India Focus',
    'hero.title'      : 'India Digital Trust Scorecard',
    'hero.subtitle'   : "Real-time citizen trust index across India's digital government services — Aadhaar, DigiLocker, UMANG & beyond",
    'pillars.badge'   : 'Trust Pillars',
    'pillars.title'   : 'India Trust Factor Breakdown',
    'pillars.subtitle': "Four core pillars determining citizen confidence in India's Digital Public Infrastructure (DPI)",
    'gap.badge'       : 'Reality Gap',
    'gap.title'       : "India's Digital Service Reality Gap",
    'gap.subtitle'    : "Where 1.4 billion citizens' expectations diverge from actual digital service delivery",
    'barriers.badge'  : 'Analysis',
    'barriers.title'  : 'India E-Gov Barrier Matrix',
    'barriers.subtitle': 'Interactive quadrant analysis of India-specific digital trust barriers and recommended solutions',
    'sim.badge'       : 'Interactive',
    'sim.title'       : 'India Adoption Impact Simulator',
    'sim.subtitle'    : 'Adjust India-specific trust levers to see projected impact on digital government adoption rates',
    'cases.badge'     : 'Case Studies',
    'cases.title'     : 'India Digital Gov Success Stories',
    'cases.subtitle'  : "India's landmark e-governance transformations that rebuilt citizen trust at scale",
    'action.badge'    : 'Strategy',
    'action.title'    : 'India Digital Trust Action Planner',
    'btb.badge'       : 'Behind the Build',
    'btb.title'       : 'How CitiGov Was Built',
    'btb.subtitle'    : "A look inside the design decisions, features, and technology that power India's Digital Trust Analytics Dashboard",
  },

  HI: {
    'nav.dashboard'   : 'डैशबोर्ड',
    'nav.pillars'     : 'विश्वास स्तंभ',
    'nav.gap'         : 'वास्तविकता अंतर',
    'nav.barriers'    : 'बाधाएं',
    'nav.simulator'   : 'सिम्युलेटर',
    'nav.cases'       : 'केस स्टडी',
    'nav.action'      : 'कार्य योजना',
    'nav.build'       : 'निर्माण के पीछे',
    'about.badge'     : 'CitiGov क्या है?',
    'about.title'     : '1.4 अरब नागरिकों और उनकी सरकार के बीच विश्वास पुनः स्थापित करना',
    'about.lead'      : 'CitiGov भारत का पहला खुला डिजिटल ट्रस्ट एनालिटिक्स डैशबोर्ड है — एक रियल-टाइम प्लेटफ़ॉर्म जो आधार, डिजीलॉकर, उमंग, UPI, CoWIN सहित 1,700+ ई-गवर्नेंस प्लेटफ़ॉर्म में नागरिकों के विश्वास को मापता और बेहतर बनाता है।',
    'about.p1.title'  : 'मापना',
    'about.p1.desc'   : '42,000+ नागरिकों के सर्वेक्षण डेटा का उपयोग करके 28 राज्यों में विश्वास स्कोर ट्रैक करें',
    'about.p2.title'  : 'विश्लेषण',
    'about.p2.desc'   : 'सुरक्षा भय, UX जटिलता, साक्षरता अंतराल — डिजिटल अपनाने में बाधाओं की पहचान करें',
    'about.p3.title'  : 'अनुकरण',
    'about.p3.desc'   : 'एकीकृत पोर्टल या मजबूत डेटा कानूनों जैसे सुधारों के प्रभाव का अनुकरण करें',
    'about.p4.title'  : 'कार्य करें',
    'about.p4.desc'   : 'अंतर्दृष्टि को व्यक्तिगत रणनीतिक कार्य योजना में बदलें',
    'hero.badge'      : 'लाइव ट्रस्ट मॉनिटर · मार्च 2025 अपडेट · भारत फोकस',
    'hero.title'      : 'भारत डिजिटल विश्वास स्कोरकार्ड',
    'hero.subtitle'   : 'भारत की डिजिटल सरकारी सेवाओं — आधार, डिजीलॉकर, उमंग में नागरिक विश्वास सूचकांक',
    'pillars.badge'   : 'विश्वास स्तंभ',
    'pillars.title'   : 'भारत विश्वास कारक विश्लेषण',
    'pillars.subtitle': "भारत के डिजिटल सार्वजनिक बुनियादी ढांचे (DPI) में नागरिक विश्वास निर्धारित करने वाले चार मुख्य स्तंभ",
    'gap.badge'       : 'वास्तविकता अंतर',
    'gap.title'       : 'भारत की डिजिटल सेवा वास्तविकता अंतर',
    'gap.subtitle'    : '1.4 अरब नागरिकों की अपेक्षाएं और वास्तविक सेवा वितरण के बीच का अंतर',
    'barriers.badge'  : 'विश्लेषण',
    'barriers.title'  : 'भारत ई-गव बाधा मैट्रिक्स',
    'barriers.subtitle': 'डिजिटल विश्वास बाधाओं और समाधानों का इंटरेक्टिव विश्लेषण',
    'sim.badge'       : 'इंटरेक्टिव',
    'sim.title'       : 'भारत अपनाने का प्रभाव सिम्युलेटर',
    'sim.subtitle'    : 'डिजिटल सरकारी अपनाने की दर पर प्रक्षेपित प्रभाव देखने के लिए लीवर समायोजित करें',
    'cases.badge'     : 'केस स्टडी',
    'cases.title'     : 'भारत डिजिटल गव सफलता की कहानियां',
    'cases.subtitle'  : 'भारत के ई-गवर्नेंस परिवर्तन जिन्होंने नागरिक विश्वास को पुनः स्थापित किया',
    'action.badge'    : 'रणनीति',
    'action.title'    : 'भारत डिजिटल विश्वास कार्य योजनाकार',
    'btb.badge'       : 'निर्माण के पीछे',
    'btb.title'       : 'CitiGov कैसे बनाया गया',
    'btb.subtitle'    : 'डिज़ाइन निर्णयों, सुविधाओं और प्रौद्योगिकी पर एक नज़र',
  },

  BN: {
    'about.badge'  : 'CitiGov কী?',
    'about.title'  : '১.৪ বিলিয়ন নাগরিক ও তাদের সরকারের মধ্যে আস্থা পুনর্গঠন',
    'about.lead'   : 'CitiGov হল ভারতের প্রথম উন্মুক্ত ডিজিটাল ট্রাস্ট অ্যানালিটিক্স ড্যাশবোর্ড।',
    'hero.title'   : 'ভারত ডিজিটাল বিশ্বাস স্কোরকার্ড',
    'pillars.title': 'ভারত বিশ্বাস ফ্যাক্টর বিশ্লেষণ',
    'btb.title'    : 'CitiGov কীভাবে তৈরি হয়েছিল',
  },

  TA: {
    'about.badge'  : 'CitiGov என்றால் என்ன?',
    'about.title'  : '1.4 பில்லியன் குடிமக்கள் மற்றும் அவர்களது அரசாங்கத்திற்கு இடையில் நம்பிக்கையை மீண்டும் கட்டியெழுப்புதல்',
    'about.lead'   : 'CitiGov இந்தியாவின் முதல் திறந்த டிஜிட்டல் நம்பிக்கை பகுப்பாய்வு டாஷ்போர்டு ஆகும்.',
    'hero.title'   : 'இந்தியா டிஜிட்டல் நம்பிக்கை ஸ்கோர்கார்டு',
    'pillars.title': 'இந்தியா நம்பிக்கை காரணி பகுப்பாய்வு',
    'btb.title'    : 'CitiGov எவ்வாறு உருவாக்கப்பட்டது',
  },

  TE: {
    'about.badge'  : 'CitiGov అంటే ఏమిటి?',
    'about.title'  : '1.4 బిలియన్ పౌరులు మరియు వారి ప్రభుత్వం మధ్య విశ్వాసాన్ని పునర్నిర్మించడం',
    'about.lead'   : 'CitiGov భారతదేశం యొక్క మొదటి బహిరంగ డిజిటల్ ట్రస్ట్ అనలిటిక్స్ డాష్‌బోర్డ్.',
    'hero.title'   : 'భారతదేశ డిజిటల్ విశ్వాస స్కోర్‌కార్డ్',
    'pillars.title': 'భారతదేశ విశ్వాస కారకాల విశ్లేషణ',
    'btb.title'    : 'CitiGov ఎలా నిర్మించబడింది',
  },

  MR: {
    'about.badge'  : 'CitiGov म्हणजे काय?',
    'about.title'  : '1.4 अब्ज नागरिक आणि त्यांच्या सरकारमधील विश्वास पुनर्स्थापित करणे',
    'about.lead'   : 'CitiGov हे भारताचे पहिले खुले डिजिटल ट्रस्ट अॅनालिटिक्स डॅशबोर्ड आहे.',
    'hero.title'   : 'भारत डिजिटल विश्वास स्कोअरकार्ड',
    'pillars.title': 'भारत विश्वास घटक विश्लेषण',
    'btb.title'    : 'CitiGov कसे बनवले गेले',
  },

  GU: {
    'about.badge'  : 'CitiGov શું છે?',
    'about.title'  : '1.4 અબજ નાગરિકો અને તેમની સરકાર વચ્ચે વિશ્વાસ ફરીથી સ્થાપિત કરવો',
    'about.lead'   : 'CitiGov ભારતનું પ્રથમ ઓપન ડિજિટલ ટ્રસ્ટ એનાલિટિક્સ ડેશબોર્ડ છે.',
    'hero.title'   : 'ભારત ડિજિટલ વિશ્વાસ સ્કોરકાર્ડ',
    'pillars.title': 'ભારત વિશ્વાસ પરિબળ વિભાજન',
    'btb.title'    : 'CitiGov કેવી રીતે બનાવવામાં આવ્યું',
  },

  KN: {
    'about.badge'  : 'CitiGov ಎಂದರೇನು?',
    'about.title'  : '1.4 ಶತಕೋಟಿ ನಾಗರಿಕರು ಮತ್ತು ಅವರ ಸರ್ಕಾರದ ನಡುವೆ ವಿಶ್ವಾಸ ಮರುನಿರ್ಮಾಣ',
    'about.lead'   : 'CitiGov ಭಾರತದ ಮೊದಲ ತೆರೆದ ಡಿಜಿಟಲ್ ಟ್ರಸ್ಟ್ ಅನಾಲಿಟಿಕ್ಸ್ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್.',
    'hero.title'   : 'ಭಾರತ ಡಿಜಿಟಲ್ ವಿಶ್ವಾಸ ಸ್ಕೋರ್‌ಕಾರ್ಡ್',
    'pillars.title': 'ಭಾರತ ವಿಶ್ವಾಸ ಅಂಶ ವಿಶ್ಲೇಷಣೆ',
    'btb.title'    : 'CitiGov ಅನ್ನು ಹೇಗೆ ನಿರ್ಮಿಸಲಾಯಿತು',
  },

  ML: {
    'about.badge'  : 'CitiGov എന്താണ്?',
    'about.title'  : '1.4 ബില്ല്യൺ പൗരന്മാരും ഗവൺമെന്റും തമ്മിലുള്ള വിശ്വാസം പുനർനിർമ്മിക്കുക',
    'about.lead'   : 'CitiGov ഇന്ത്യയുടെ ആദ്യ ഡിജിറ്റൽ ട്രസ്റ്റ് അനലിറ്റിക്സ് ഡാഷ്ബോർഡ് ആണ്.',
    'hero.title'   : 'ഇന്ത്യ ഡിജിറ്റൽ ട്രസ്റ്റ് സ്കോർകാർഡ്',
    'pillars.title': 'ഇന്ത്യ വിശ്വാസ ഘടക വിശകലനം',
    'btb.title'    : 'CitiGov എങ്ങനെ നിർമ്മിച്ചു',
  },

  PA: {
    'about.badge'  : 'CitiGov ਕੀ ਹੈ?',
    'about.title'  : '1.4 ਅਰਬ ਨਾਗਰਿਕਾਂ ਅਤੇ ਉਨ੍ਹਾਂ ਦੀ ਸਰਕਾਰ ਵਿਚਕਾਰ ਭਰੋਸਾ ਮੁੜ ਸਥਾਪਿਤ ਕਰਨਾ',
    'about.lead'   : 'CitiGov ਭਾਰਤ ਦਾ ਪਹਿਲਾ ਖੁੱਲਾ ਡਿਜੀਟਲ ਟਰੱਸਟ ਐਨਾਲਿਟਿਕਸ ਡੈਸ਼ਬੋਰਡ ਹੈ।',
    'hero.title'   : 'ਭਾਰਤ ਡਿਜੀਟਲ ਭਰੋਸਾ ਸਕੋਰਕਾਰਡ',
    'pillars.title': 'ਭਾਰਤ ਭਰੋਸਾ ਕਾਰਕ ਵਿਸ਼ਲੇਸ਼ਣ',
    'btb.title'    : 'CitiGov ਕਿਵੇਂ ਬਣਾਇਆ ਗਿਆ',
  },

  OR: {
    'about.badge'  : 'CitiGov କ\'ଣ?',
    'about.title'  : '1.4 ଶତ କୋଟି ନାଗରିକ ଓ ସେମାନଙ୍କ ସରକାର ମଧ୍ୟରେ ବିଶ୍ୱାସ ପୁନଃ ସ୍ଥାପିତ',
    'about.lead'   : 'CitiGov ଭାରତର ପ୍ରଥମ ଖୋଲା ଡିଜିଟାଲ ଟ୍ରଷ୍ଟ ଆନାଲିଟିକ୍ସ ଡ୍ୟାଶ୍‌ବୋର୍ଡ।',
    'hero.title'   : 'ଭାରତ ଡିଜିଟାଲ ବିଶ୍ୱାସ ସ୍କୋରକାର୍ଡ',
    'pillars.title': 'ଭାରତ ବିଶ୍ୱାସ ବିଶ୍ଳେଷଣ',
    'btb.title'    : 'CitiGov କିଭଳି ତିଆରି ହୋଇଛି',
  },

  UR: {
    'about.badge'  : 'CitiGov کیا ہے؟',
    'about.title'  : '1.4 ارب شہریوں اور ان کی حکومت کے درمیان اعتماد کی بحالی',
    'about.lead'   : 'CitiGov ہندوستان کا پہلا کھلا ڈیجیٹل ٹرسٹ اینالیٹکس ڈیش بورڈ ہے۔',
    'hero.title'   : 'بھارت ڈیجیٹل اعتماد سکور کارڈ',
    'pillars.title': 'بھارت اعتماد عوامل کا تجزیہ',
    'btb.title'    : 'CitiGov کیسے بنایا گیا',
  },

  ZH: {
    'about.badge'  : 'CitiGov是什么？',
    'about.title'  : '重建14亿公民与政府之间的信任',
    'about.lead'   : 'CitiGov是印度首个数字信任分析仪表板，实时测量并帮助提升公民对数字政务服务的信心。',
    'hero.title'   : '印度数字信任评分卡',
    'pillars.title': '印度信任因素分析',
    'btb.title'    : 'CitiGov如何构建',
  },

  AR: {
    'about.badge'  : 'ما هو CitiGov؟',
    'about.title'  : 'إعادة بناء الثقة بين 1.4 مليار مواطن وحكومتهم',
    'about.lead'   : 'CitiGov هو أول لوحة تحكم مفتوحة لتحليلات الثقة الرقمية في الهند.',
    'hero.title'   : 'بطاقة نقاط الثقة الرقمية الهندية',
    'pillars.title': 'تحليل عوامل الثقة في الهند',
    'btb.title'    : 'كيف تم بناء CitiGov',
  },

  ES: {
    'about.badge'  : '¿Qué es CitiGov?',
    'about.title'  : 'Reconstruyendo la confianza entre 1,400 millones de ciudadanos y su gobierno',
    'about.lead'   : 'CitiGov es el primer panel abierto de análisis de confianza digital de India.',
    'hero.title'   : 'Tarjeta de puntuación de confianza digital de India',
    'pillars.title': 'Análisis de factores de confianza en India',
    'btb.title'    : 'Cómo se construyó CitiGov',
  },

  FR: {
    'about.badge'  : "Qu'est-ce que CitiGov ?",
    'about.title'  : 'Reconstruire la confiance entre 1,4 milliard de citoyens et leur gouvernement',
    'about.lead'   : "CitiGov est le premier tableau de bord ouvert d'analyse de la confiance numérique de l'Inde.",
    'hero.title'   : 'Tableau de bord de confiance numérique de l\'Inde',
    'pillars.title': 'Analyse des facteurs de confiance en Inde',
    'btb.title'    : 'Comment CitiGov a été construit',
  },

  PT: {
    'about.badge'  : 'O que é CitiGov?',
    'about.title'  : 'Reconstruindo a confiança entre 1,4 bilhão de cidadãos e seu governo',
    'about.lead'   : 'CitiGov é o primeiro painel aberto de análise de confiança digital da Índia.',
    'hero.title'   : 'Painel de Confiança Digital da Índia',
    'pillars.title': 'Análise de Fatores de Confiança da Índia',
    'btb.title'    : 'Como o CitiGov foi construído',
  },

  DE: {
    'about.badge'  : 'Was ist CitiGov?',
    'about.title'  : 'Vertrauen zwischen 1,4 Milliarden Bürgern und ihrer Regierung wiederherstellen',
    'about.lead'   : 'CitiGov ist Indiens erstes offenes Digital-Trust-Analytics-Dashboard.',
    'hero.title'   : 'Indiens digitales Vertrauens-Scorecard',
    'pillars.title': 'Analyse der Vertrauensfaktoren in Indien',
    'btb.title'    : 'Wie CitiGov gebaut wurde',
  },

  KO: {
    'about.badge'  : 'CitiGov란 무엇인가요?',
    'about.title'  : '14억 시민과 정부 간의 신뢰 재구축',
    'about.lead'   : 'CitiGov는 인도 최초의 개방형 디지털 신뢰 분석 대시보드입니다.',
    'hero.title'   : '인도 디지털 신뢰 스코어카드',
    'pillars.title': '인도 신뢰 요인 분석',
    'btb.title'    : 'CitiGov는 어떻게 만들어졌나요',
  },

  JA: {
    'about.badge'  : 'CitiGovとは？',
    'about.title'  : '14億人の市民と政府の間の信頼を再構築する',
    'about.lead'   : 'CitiGovはインド初のオープンなデジタル信頼分析ダッシュボードです。',
    'hero.title'   : 'インドデジタル信頼スコアカード',
    'pillars.title': 'インド信頼因子分析',
    'btb.title'    : 'CitiGovの構築方法',
  },
};

/* RTL languages */
const RTL_LANGS = new Set(['AR', 'UR']);

/* Nav link key map [data-section → key] */
const NAV_MAP = {
  scorecard       : 'nav.dashboard',
  'trust-factors' : 'nav.pillars',
  'reality-gap'   : 'nav.gap',
  barriers        : 'nav.barriers',
  simulator       : 'nav.simulator',
  'success-stories': 'nav.cases',
  'action-planner': 'nav.action',
  'behind-build'  : 'nav.build',
};

/* ── Apply translations ────────────────────────────────────── */
function applyLang(code) {
  const lang  = DICT[code] || DICT['EN'];
  const fallb = DICT['EN'];

  /* data-i18n elements */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const txt = lang[key] || fallb[key];
    if (txt) el.textContent = txt;
  });

  /* Nav links */
  document.querySelectorAll('.nav-link[data-section]').forEach(el => {
    const key = NAV_MAP[el.dataset.section];
    if (key) {
      const txt = lang[key] || fallb[key];
      if (txt) el.textContent = txt;
    }
  });

  /* RTL support */
  document.documentElement.setAttribute('lang', code.toLowerCase());
  document.documentElement.setAttribute('dir', RTL_LANGS.has(code) ? 'rtl' : 'ltr');

  /* Persist */
  try { localStorage.setItem('citigov_lang', code); } catch {}
}

/* ── Init ──────────────────────────────────────────────────── */
function initI18n() {
  /* Restore last saved language */
  const saved = (() => { try { return localStorage.getItem('citigov_lang'); } catch { return null; } })();
  if (saved && DICT[saved]) applyLang(saved);

  /* Mark saved lang button active */
  if (saved) {
    document.querySelectorAll('.lang-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.lang === saved);
      b.setAttribute('aria-selected', b.dataset.lang === saved ? 'true' : 'false');
    });
    const lbl = document.getElementById('langLabel');
    if (lbl) lbl.textContent = saved;
  }
}

window._applyLang = applyLang;
window._initI18n  = initI18n;
