/**
 * Common UI & Navigation Translations across all 9 supported languages
 * aifreecalculator.com
 */

import type { Locale } from '../config';

export interface CommonTranslations {
  siteName: string;
  tagline: string;
  nav: {
    home: string;
    categories: string;
    allCalculators: string;
    about: string;
    contact: string;
  };
  search: {
    placeholder: string;
    label: string;
    noResults: string;
    searching: string;
  };
  buttons: {
    calculate: string;
    reset: string;
    share: string;
    copied: string;
    downloadPdf: string;
    viewAll: string;
    readMore: string;
  };
  breadcrumbs: {
    home: string;
  };
  sections: {
    formula: string;
    howItWorks: string;
    example: string;
    faq: string;
    relatedTools: string;
    popularTools: string;
  };
  footer: {
    quickLinks: string;
    categoriesTitle: string;
    legalTitle: string;
    privacy: string;
    terms: string;
    disclaimer: string;
    aboutUs: string;
    contactUs: string;
    allRightsReserved: string;
    freeNotice: string;
  };
}

export const COMMON_TRANSLATIONS: Record<Locale, CommonTranslations> = {
  en: {
    siteName: 'AI Free Calculator',
    tagline: '100% Free Online Calculators for Finance, Construction, Health & Math',
    nav: {
      home: 'Home',
      categories: 'Categories',
      allCalculators: 'All Calculators',
      about: 'About',
      contact: 'Contact',
    },
    search: {
      placeholder: 'Search 60+ calculators...',
      label: 'Search calculators',
      noResults: 'No calculators found matching your search.',
      searching: 'Searching...',
    },
    buttons: {
      calculate: 'Calculate',
      reset: 'Reset',
      share: 'Share Result',
      copied: 'Copied to Clipboard!',
      downloadPdf: 'Download PDF Report',
      viewAll: 'View All Calculators',
      readMore: 'Read More',
    },
    breadcrumbs: {
      home: 'Home',
    },
    sections: {
      formula: 'Formula & Mathematical Method',
      howItWorks: 'How This Calculation Works',
      example: 'Step-by-Step Worked Example',
      faq: 'Frequently Asked Questions',
      relatedTools: 'Related Calculators',
      popularTools: 'Popular Tools',
    },
    footer: {
      quickLinks: 'Quick Links',
      categoriesTitle: 'Categories',
      legalTitle: 'Legal & Privacy',
      privacy: 'Privacy Policy',
      terms: 'Terms of Use',
      disclaimer: 'Disclaimer',
      aboutUs: 'About Us',
      contactUs: 'Contact Support',
      allRightsReserved: 'All rights reserved.',
      freeNotice: 'All calculations run directly in your web browser. Free, unlimited, private.',
    },
  },

  hi: {
    siteName: 'AI Free Calculator',
    tagline: 'वित्त, निर्माण, स्वास्थ्य और गणित के लिए 100% मुफ़्त ऑनलाइन कैलकुलेटर',
    nav: {
      home: 'होम',
      categories: 'श्रेणियाँ',
      allCalculators: 'सभी कैलकुलेटर',
      about: 'हमारे बारे में',
      contact: 'संपर्क',
    },
    search: {
      placeholder: '60+ कैलकुलेटर खोजें...',
      label: 'कैलकुलेटर खोजें',
      noResults: 'आपकी खोज से मेल खाता कोई कैलकुलेटर नहीं मिला।',
      searching: 'खोज रहे हैं...',
    },
    buttons: {
      calculate: 'गणना करें',
      reset: 'रीसेट करें',
      share: 'परिणाम साझा करें',
      copied: 'क्लिपबोर्ड पर कॉपी हो गया!',
      downloadPdf: 'PDF रिपोर्ट डाउनलोड करें',
      viewAll: 'सभी कैलकुलेटर देखें',
      readMore: 'अधिक पढ़ें',
    },
    breadcrumbs: {
      home: 'होम',
    },
    sections: {
      formula: 'सूत्र और गणितीय विधि',
      howItWorks: 'यह गणना कैसे काम करती है',
      example: 'चरण-दर-चरण उदाहरण',
      faq: 'अक्सर पूछे जाने वाले प्रश्न (FAQ)',
      relatedTools: 'संबंधित कैलकुलेटर',
      popularTools: 'लोकप्रिय टूल्स',
    },
    footer: {
      quickLinks: 'त्वरित लिंक',
      categoriesTitle: 'श्रेणियाँ',
      legalTitle: 'कानूनी और गोपनीयता',
      privacy: 'गोपनीयता नीति',
      terms: 'उपयोग की शर्तें',
      disclaimer: 'अस्वीकरण',
      aboutUs: 'हमारे बारे में',
      contactUs: 'सहायता संपर्क',
      allRightsReserved: 'सर्वाधिकार सुरक्षित।',
      freeNotice: 'सभी गणनाएँ सीधे आपके वेब ब्राउज़र में होती हैं। पूरी तरह मुफ़्त, असीमित और सुरक्षित।',
    },
  },

  es: {
    siteName: 'AI Free Calculator',
    tagline: 'Calculadoras en línea 100% gratuitas para finanzas, salud, construcción y matemáticas',
    nav: {
      home: 'Inicio',
      categories: 'Categorías',
      allCalculators: 'Todas las calculadoras',
      about: 'Acerca de',
      contact: 'Contacto',
    },
    search: {
      placeholder: 'Buscar más de 60 calculadoras...',
      label: 'Buscar calculadoras',
      noResults: 'No se encontraron calculadoras que coincidan con su búsqueda.',
      searching: 'Buscando...',
    },
    buttons: {
      calculate: 'Calcular',
      reset: 'Restablecer',
      share: 'Compartir resultado',
      copied: '¡Copiado al portapapeles!',
      downloadPdf: 'Descargar informe en PDF',
      viewAll: 'Ver todas las calculadoras',
      readMore: 'Leer más',
    },
    breadcrumbs: {
      home: 'Inicio',
    },
    sections: {
      formula: 'Fórmula y método matemático',
      howItWorks: 'Cómo funciona este cálculo',
      example: 'Ejemplo resuelto paso a paso',
      faq: 'Preguntas frecuentes (FAQ)',
      relatedTools: 'Calculadoras relacionadas',
      popularTools: 'Herramientas populares',
    },
    footer: {
      quickLinks: 'Enlaces rápidos',
      categoriesTitle: 'Categorías',
      legalTitle: 'Legal y privacidad',
      privacy: 'Política de privacidad',
      terms: 'Términos de uso',
      disclaimer: 'Descargo de responsabilidad',
      aboutUs: 'Acerca de nosotros',
      contactUs: 'Contacto y soporte',
      allRightsReserved: 'Todos los derechos reservados.',
      freeNotice: 'Todos los cálculos se ejecutan en su navegador. Gratuito, ilimitado y privado.',
    },
  },

  ja: {
    siteName: 'AI Free Calculator',
    tagline: '金融、健康、建築、数学のための完全無料オンライン計算ツール',
    nav: {
      home: 'ホーム',
      categories: 'カテゴリー',
      allCalculators: 'すべての計算機',
      about: '概要',
      contact: 'お問い合わせ',
    },
    search: {
      placeholder: '60以上の計算機を検索...',
      label: '計算機を検索',
      noResults: '該当する計算機が見つかりませんでした。',
      searching: '検索中...',
    },
    buttons: {
      calculate: '計算する',
      reset: 'リセット',
      share: '結果を共有',
      copied: 'クリップボードにコピーしました！',
      downloadPdf: 'PDFレポートを保存',
      viewAll: 'すべての計算ツールを見る',
      readMore: '続きを読む',
    },
    breadcrumbs: {
      home: 'ホーム',
    },
    sections: {
      formula: '計算式と数学的根拠',
      howItWorks: '計算の仕組み',
      example: 'ステップごとの計算例',
      faq: 'よくある質問 (FAQ)',
      relatedTools: '関連する計算機',
      popularTools: '人気のツール',
    },
    footer: {
      quickLinks: 'クイックリンク',
      categoriesTitle: 'カテゴリー一覧',
      legalTitle: '利用規約・プライバシー',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      disclaimer: '免責事項',
      aboutUs: 'サイトについて',
      contactUs: 'サポート問い合わせ',
      allRightsReserved: 'All rights reserved.',
      freeNotice: 'すべての計算はブラウザ上で安全に実行されます。完全無料・登録不要。',
    },
  },

  fr: {
    siteName: 'AI Free Calculator',
    tagline: 'Calculatrices en ligne 100% gratuites pour les finances, la santé, le bâtiment et les maths',
    nav: {
      home: 'Accueil',
      categories: 'Catégories',
      allCalculators: 'Toutes les calculatrices',
      about: 'À propos',
      contact: 'Contact',
    },
    search: {
      placeholder: 'Rechercher parmi plus de 60 calculatrices...',
      label: 'Rechercher des calculatrices',
      noResults: 'Aucune calculatrice ne correspond à votre recherche.',
      searching: 'Recherche en cours...',
    },
    buttons: {
      calculate: 'Calculer',
      reset: 'Réinitialiser',
      share: 'Partager le résultat',
      copied: 'Copié dans le presse-papiers !',
      downloadPdf: 'Télécharger le rapport PDF',
      viewAll: 'Voir toutes les calculatrices',
      readMore: 'En savoir plus',
    },
    breadcrumbs: {
      home: 'Accueil',
    },
    sections: {
      formula: 'Formule et méthode de calcul',
      howItWorks: 'Fonctionnement du calcul',
      example: 'Exemple détaillé étape par étape',
      faq: 'Foire aux questions (FAQ)',
      relatedTools: 'Calculatrices similaires',
      popularTools: 'Outils populaires',
    },
    footer: {
      quickLinks: 'Liens rapides',
      categoriesTitle: 'Catégories',
      legalTitle: 'Mentions légales',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d’utilisation',
      disclaimer: 'Avertissement',
      aboutUs: 'À propos de nous',
      contactUs: 'Contact & assistance',
      allRightsReserved: 'Tous droits réservés.',
      freeNotice: 'Tous les calculs s’exécutent directement dans votre navigateur. Gratuit, illimité et confidentiel.',
    },
  },

  de: {
    siteName: 'AI Free Calculator',
    tagline: '100% kostenlose Online-Rechner für Finanzen, Bauwesen, Gesundheit und Mathematik',
    nav: {
      home: 'Startseite',
      categories: 'Kategorien',
      allCalculators: 'Alle Rechner',
      about: 'Über uns',
      contact: 'Kontakt',
    },
    search: {
      placeholder: 'Über 60 Rechner durchsuchen...',
      label: 'Rechner suchen',
      noResults: 'Keine passenden Rechner gefunden.',
      searching: 'Suche läuft...',
    },
    buttons: {
      calculate: 'Berechnen',
      reset: 'Zurücksetzen',
      share: 'Ergebnis teilen',
      copied: 'In die Zwischenablage kopiert!',
      downloadPdf: 'PDF-Bericht herunterladen',
      viewAll: 'Alle Rechner anzeigen',
      readMore: 'Mehr erfahren',
    },
    breadcrumbs: {
      home: 'Startseite',
    },
    sections: {
      formula: 'Formel und mathematische Methode',
      howItWorks: 'So funktioniert die Berechnung',
      example: 'Schritt-für-Schritt-Beispiel',
      faq: 'Häufig gestellte Fragen (FAQ)',
      relatedTools: 'Ähnliche Rechner',
      popularTools: 'Beliebte Rechner',
    },
    footer: {
      quickLinks: 'Schnellzugriff',
      categoriesTitle: 'Kategorien',
      legalTitle: 'Rechtliches & Datenschutz',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
      disclaimer: 'Haftungsausschluss',
      aboutUs: 'Über das Projekt',
      contactUs: 'Support kontaktieren',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      freeNotice: 'Alle Berechnungen laufen direkt in Ihrem Browser. Kostenlos, unbegrenzt und sicher.',
    },
  },

  pt: {
    siteName: 'AI Free Calculator',
    tagline: 'Calculadoras online 100% gratuitas para finanças, construção, saúde e matemática',
    nav: {
      home: 'Início',
      categories: 'Categorias',
      allCalculators: 'Todas as calculadoras',
      about: 'Sobre',
      contact: 'Contato',
    },
    search: {
      placeholder: 'Pesquisar mais de 60 calculadoras...',
      label: 'Pesquisar calculadoras',
      noResults: 'Nenhuma calculadora encontrada para esta busca.',
      searching: 'Pesquisando...',
    },
    buttons: {
      calculate: 'Calcular',
      reset: 'Limpar',
      share: 'Compartilhar resultado',
      copied: 'Copiado para a área de transferência!',
      downloadPdf: 'Baixar relatório em PDF',
      viewAll: 'Ver todas as calculadoras',
      readMore: 'Saiba mais',
    },
    breadcrumbs: {
      home: 'Início',
    },
    sections: {
      formula: 'Fórmula e método matemático',
      howItWorks: 'Como funciona este cálculo',
      example: 'Exemplo prático passo a passo',
      faq: 'Perguntas frequentes (FAQ)',
      relatedTools: 'Calculadoras relacionadas',
      popularTools: 'Ferramentas populares',
    },
    footer: {
      quickLinks: 'Acesso rápido',
      categoriesTitle: 'Categorias',
      legalTitle: 'Legal e privacidade',
      privacy: 'Política de privacidade',
      terms: 'Termos de uso',
      disclaimer: 'Aviso legal',
      aboutUs: 'Sobre nós',
      contactUs: 'Suporte e contato',
      allRightsReserved: 'Todos os direitos reservados.',
      freeNotice: 'Todos os cálculos rodam direto no seu navegador. Gratuito, ilimitado e privado.',
    },
  },

  ko: {
    siteName: 'AI Free Calculator',
    tagline: '금융, 건강, 건축 및 수학을 위한 100% 무료 온라인 계산기',
    nav: {
      home: '홈',
      categories: '카테고리',
      allCalculators: '모든 계산기',
      about: '소개',
      contact: '문의하기',
    },
    search: {
      placeholder: '60개 이상의 계산기 검색...',
      label: '계산기 검색',
      noResults: '검색 결과가 없습니다.',
      searching: '검색 중...',
    },
    buttons: {
      calculate: '계산하기',
      reset: '초기화',
      share: '결과 공유',
      copied: '클립보드에 복사되었습니다!',
      downloadPdf: 'PDF 보고서 저장',
      viewAll: '모든 계산기 보기',
      readMore: '더 알아보기',
    },
    breadcrumbs: {
      home: '홈',
    },
    sections: {
      formula: '공식 및 계산 원리',
      howItWorks: '계산 작동 방식',
      example: '단계별 계산 예시',
      faq: '자주 묻는 질문 (FAQ)',
      relatedTools: '관련 계산기',
      popularTools: '인기 계산 도구',
    },
    footer: {
      quickLinks: '빠른 링크',
      categoriesTitle: '카테고리',
      legalTitle: '법적 고지 및 개인정보',
      privacy: '개인정보 처리방침',
      terms: '이용약관',
      disclaimer: '면책 조항',
      aboutUs: '사이트 소개',
      contactUs: '고객 지원',
      allRightsReserved: 'All rights reserved.',
      freeNotice: '모든 계산은 사용자의 웹 브라우저에서 안전하게 수행됩니다. 완전 무료 및 무제한.',
    },
  },

  it: {
    siteName: 'AI Free Calculator',
    tagline: 'Calcolatori online gratuiti al 100% per finanza, salute, edilizia e matematica',
    nav: {
      home: 'Home',
      categories: 'Categorie',
      allCalculators: 'Tutti i calcolatori',
      about: 'Chi siamo',
      contact: 'Contatti',
    },
    search: {
      placeholder: 'Cerca tra oltre 60 calcolatori...',
      label: 'Cerca calcolatori',
      noResults: 'Nessun calcolatore trovato per questa ricerca.',
      searching: 'Ricerca in corso...',
    },
    buttons: {
      calculate: 'Calcola',
      reset: 'Reimposta',
      share: 'Condividi risultato',
      copied: 'Copiato negli appunti!',
      downloadPdf: 'Scarica report in PDF',
      viewAll: 'Visualizza tutti i calcolatori',
      readMore: 'Scopri di più',
    },
    breadcrumbs: {
      home: 'Home',
    },
    sections: {
      formula: 'Formula e metodo matematico',
      howItWorks: 'Come funziona questo calcolo',
      example: 'Esempio pratico passo dopo passo',
      faq: 'Domande frequenti (FAQ)',
      relatedTools: 'Calcolatori correlati',
      popularTools: 'Strumenti popolari',
    },
    footer: {
      quickLinks: 'Collegamenti rapidi',
      categoriesTitle: 'Categorie',
      legalTitle: 'Note legali e privacy',
      privacy: 'Informativa sulla privacy',
      terms: 'Termini di utilizzo',
      disclaimer: 'Disclaimer',
      aboutUs: 'Informazioni su di noi',
      contactUs: 'Supporto e contatti',
      allRightsReserved: 'Tutti i diritti riservati.',
      freeNotice: 'Tutti i calcoli avvengono direttamente nel tuo browser. Gratuito, illimitato e privato.',
    },
  },
};

export function getCommonTranslations(locale: Locale): CommonTranslations {
  return COMMON_TRANSLATIONS[locale] || COMMON_TRANSLATIONS.en;
}
