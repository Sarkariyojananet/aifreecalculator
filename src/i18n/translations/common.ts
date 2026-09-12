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
    calculatorTools: string;
    moreCategoryTools: string;
  };
  directory: {
    filterPlaceholder: string;
    allLabel: string;
    noResultsTitle: string;
    noResultsDesc: string;
    toolsCountBadge: string;
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
      calculatorTools: 'Calculator Tools',
      moreCategoryTools: 'More Tools',
    },
    directory: {
      filterPlaceholder: 'Filter by name or keyword…',
      allLabel: 'All',
      noResultsTitle: 'No calculators found',
      noResultsDesc: 'Try a different search term or select "All" categories.',
      toolsCountBadge: '60+ Free Online Tools',
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
      calculatorTools: 'कैलकुलेटर टूल्स',
      moreCategoryTools: 'के अन्य टूल्स',
    },
    directory: {
      filterPlaceholder: 'नाम या कीवर्ड से खोजें…',
      allLabel: 'सभी',
      noResultsTitle: 'कोई कैलकुलेटर नहीं मिला',
      noResultsDesc: 'कृपया दूसरा कीवर्ड खोजें या "सभी" श्रेणी चुनें।',
      toolsCountBadge: '60+ मुफ़्त ऑनलाइन टूल्स',
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
      calculatorTools: 'Herramientas y Calculadoras',
      moreCategoryTools: 'Otras herramientas',
    },
    directory: {
      filterPlaceholder: 'Filtrar por nombre o palabra clave…',
      allLabel: 'Todas',
      noResultsTitle: 'No se encontraron calculadoras',
      noResultsDesc: 'Pruebe con otro término de búsqueda o seleccione la categoría "Todas".',
      toolsCountBadge: 'Más de 60 herramientas en línea gratuitas',
    },
    footer: {
      quickLinks: 'Enlaces rápidos',
      categoriesTitle: 'Categorías',
      legalTitle: 'Legal y privacidad',
      privacy: 'Política de privacidad',
      terms: 'Términos de uso',
      disclaimer: 'Aviso legal',
      aboutUs: 'Acerca de nosotros',
      contactUs: 'Contacto de soporte',
      allRightsReserved: 'Todos los derechos reservados.',
      freeNotice: 'Todos los cálculos se procesan directamente en su navegador. Totalmente gratis, ilimitado y privado.',
    },
  },

  ja: {
    siteName: 'AI Free Calculator',
    tagline: '金融、建築、健康、数学のための完全無料オンライン計算ツール',
    nav: {
      home: 'ホーム',
      categories: 'カテゴリ',
      allCalculators: 'すべての計算機',
      about: '概要',
      contact: 'お問い合わせ',
    },
    search: {
      placeholder: '60以上の計算機を検索...',
      label: '計算機を検索',
      noResults: '一致する計算機が見つかりませんでした。',
      searching: '検索中...',
    },
    buttons: {
      calculate: '計算する',
      reset: 'リセット',
      share: '結果を共有',
      copied: 'クリップボードにコピーしました！',
      downloadPdf: 'PDFレポートを保存',
      viewAll: 'すべての計算ツールを見る',
      readMore: '詳しく見る',
    },
    breadcrumbs: {
      home: 'ホーム',
    },
    sections: {
      formula: '計算式・数学的根拠',
      howItWorks: '計算の仕組み',
      example: 'ステップ別計算例',
      faq: 'よくある質問 (FAQ)',
      relatedTools: '関連する計算機',
      popularTools: '人気の計算ツール',
      calculatorTools: '計算ツール',
      moreCategoryTools: '関連ツール',
    },
    directory: {
      filterPlaceholder: '名前やキーワードで絞り込み…',
      allLabel: 'すべて',
      noResultsTitle: '計算機が見つかりません',
      noResultsDesc: '別の検索語を入力するか、「すべて」のカテゴリを選択してください。',
      toolsCountBadge: '60以上の無料オンライン計算ツール',
    },
    footer: {
      quickLinks: 'クイックリンク',
      categoriesTitle: 'カテゴリ一覧',
      legalTitle: '法的情報・プライバシー',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      disclaimer: '免責事項',
      aboutUs: '当サイトについて',
      contactUs: 'サポートへのお問い合わせ',
      allRightsReserved: '無断転載を禁じます。',
      freeNotice: 'すべての計算処理はお使いのブラウザ上で安全に完結します。無料・無制限・プライバシー保護。',
    },
  },

  fr: {
    siteName: 'AI Free Calculator',
    tagline: 'Calculateurs 100% gratuits pour la finance, le bâtiment, la santé et les maths',
    nav: {
      home: 'Accueil',
      categories: 'Catégories',
      allCalculators: 'Toutes les calculatrices',
      about: 'À propos',
      contact: 'Contact',
    },
    search: {
      placeholder: 'Rechercher parmi 60+ calculateurs...',
      label: 'Rechercher un calculateur',
      noResults: 'Aucun calculateur ne correspond à votre recherche.',
      searching: 'Recherche...',
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
      formula: 'Formule et méthode mathématique',
      howItWorks: 'Fonctionnement du calcul',
      example: 'Exemple détaillé pas à pas',
      faq: 'Foire aux questions (FAQ)',
      relatedTools: 'Calculateurs associés',
      popularTools: 'Outils populaires',
      calculatorTools: 'Outils et calculatrices',
      moreCategoryTools: 'Autres outils',
    },
    directory: {
      filterPlaceholder: 'Filtrer par nom ou mot-clé…',
      allLabel: 'Toutes',
      noResultsTitle: 'Aucune calculatrice trouvée',
      noResultsDesc: 'Essayez un autre mot-clé ou sélectionnez la catégorie « Toutes ».',
      toolsCountBadge: '60+ outils en ligne gratuits',
    },
    footer: {
      quickLinks: 'Liens rapides',
      categoriesTitle: 'Catégories',
      legalTitle: 'Mentions légales & Confidentialité',
      privacy: 'Politique de confidentialité',
      terms: 'Conditions d’utilisation',
      disclaimer: 'Avertissement',
      aboutUs: 'À propos de nous',
      contactUs: 'Support et contact',
      allRightsReserved: 'Tous droits réservés.',
      freeNotice: 'Tous les calculs sont exécutés directement dans votre navigateur. Gratuit, illimité et confidentiel.',
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
      noResults: 'Keine Rechner passend zu Ihrer Suche gefunden.',
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
      formula: 'Formel & Rechenweg',
      howItWorks: 'Funktionsweise der Berechnung',
      example: 'Schritt-für-Schritt-Beispiel',
      faq: 'Häufig gestellte Fragen (FAQ)',
      relatedTools: 'Ähnliche Rechner',
      popularTools: 'Beliebte Rechner',
      calculatorTools: 'Rechner & Tools',
      moreCategoryTools: 'Weitere Tools',
    },
    directory: {
      filterPlaceholder: 'Nach Name oder Stichwort filtern…',
      allLabel: 'Alle',
      noResultsTitle: 'Keine Rechner gefunden',
      noResultsDesc: 'Versuchen Sie einen anderen Suchbegriff oder wählen Sie "Alle" Kategorien.',
      toolsCountBadge: '60+ kostenlose Online-Tools',
    },
    footer: {
      quickLinks: 'Schnellzugriff',
      categoriesTitle: 'Kategorien',
      legalTitle: 'Rechtliches & Datenschutz',
      privacy: 'Datenschutzerklärung',
      terms: 'Nutzungsbedingungen',
      disclaimer: 'Haftungsausschluss',
      aboutUs: 'Über uns',
      contactUs: 'Support kontaktieren',
      allRightsReserved: 'Alle Rechte vorbehalten.',
      freeNotice: 'Alle Berechnungen laufen direkt in Ihrem Browser. Kostenlos, unbegrenzt und datenschutzkonform.',
    },
  },

  pt: {
    siteName: 'AI Free Calculator',
    tagline: 'Calculadoras online 100% gratuitas de finanças, construção, saúde e matemática',
    nav: {
      home: 'Início',
      categories: 'Categorias',
      allCalculators: 'Todas as calculadoras',
      about: 'Sobre nós',
      contact: 'Contato',
    },
    search: {
      placeholder: 'Pesquisar em mais de 60 calculadoras...',
      label: 'Buscar calculadoras',
      noResults: 'Nenhuma calculadora encontrada correspondente à sua busca.',
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
      howItWorks: 'Como este cálculo funciona',
      example: 'Exemplo prático passo a passo',
      faq: 'Perguntas frequentes (FAQ)',
      relatedTools: 'Calculadoras relacionadas',
      popularTools: 'Ferramentas populares',
      calculatorTools: 'Ferramentas e Calculadoras',
      moreCategoryTools: 'Mais ferramentas',
    },
    directory: {
      filterPlaceholder: 'Filtrar por nome ou palavra-chave…',
      allLabel: 'Todas',
      noResultsTitle: 'Nenhuma calculadora encontrada',
      noResultsDesc: 'Tente outro termo de pesquisa ou selecione a categoria "Todas".',
      toolsCountBadge: 'Mais de 60 ferramentas online gratuitas',
    },
    footer: {
      quickLinks: 'Links rápidos',
      categoriesTitle: 'Categorias',
      legalTitle: 'Avisos legais e privacidade',
      privacy: 'Política de privacidade',
      terms: 'Termos de uso',
      disclaimer: 'Isenção de responsabilidade',
      aboutUs: 'Sobre nós',
      contactUs: 'Fale com o suporte',
      allRightsReserved: 'Todos os direitos reservados.',
      freeNotice: 'Todos os cálculos rodam diretamente no seu navegador. Grátis, ilimitado e privativo.',
    },
  },

  ko: {
    siteName: 'AI Free Calculator',
    tagline: '금융, 건설, 건강, 수학을 위한 100% 무료 온라인 계산기',
    nav: {
      home: '홈',
      categories: '카테고리',
      allCalculators: '전체 계산기',
      about: '소개',
      contact: '문의하기',
    },
    search: {
      placeholder: '60개 이상의 계산기 검색...',
      label: '계산기 검색',
      noResults: '일치하는 계산기를 찾을 수 없습니다.',
      searching: '검색 중...',
    },
    buttons: {
      calculate: '계산하기',
      reset: '초기화',
      share: '결과 공유',
      copied: '클립보드에 복사되었습니다!',
      downloadPdf: 'PDF 리포트 저장',
      viewAll: '모든 계산기 보기',
      readMore: '자세히 보기',
    },
    breadcrumbs: {
      home: '홈',
    },
    sections: {
      formula: '공식 및 계산 원리',
      howItWorks: '계산 방식 안내',
      example: '단계별 계산 예제',
      faq: '자주 묻는 질문 (FAQ)',
      relatedTools: '관련 계산기',
      popularTools: '인기 계산기',
      calculatorTools: '계산기 및 도구',
      moreCategoryTools: '기타 도구',
    },
    directory: {
      filterPlaceholder: '이름 또는 키워드로 검색…',
      allLabel: '전체',
      noResultsTitle: '계산기를 찾을 수 없습니다',
      noResultsDesc: '다른 검색어를 입력하시거나 "전체" 카테고리를 선택해 주세요.',
      toolsCountBadge: '60개 이상의 무료 온라인 계산 도구',
    },
    footer: {
      quickLinks: '빠른 링크',
      categoriesTitle: '카테고리 목록',
      legalTitle: '법적 고지 및 개인정보',
      privacy: '개인정보처리방침',
      terms: '이용약관',
      disclaimer: '면책 조항',
      aboutUs: '서비스 소개',
      contactUs: '고객 지원 문의',
      allRightsReserved: 'All rights reserved.',
      freeNotice: '모든 계산은 사용자의 브라우저에서 안전하게 실행됩니다. 완전 무료, 무제한, 비공개 원칙.',
    },
  },

  it: {
    siteName: 'AI Free Calculator',
    tagline: 'Calcolatori online gratuiti al 100% per finanza, edilizia, salute e matematica',
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
      noResults: 'Nessun calcolatore trovato per la ricerca effettuata.',
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
      calculatorTools: 'Strumenti e Calcolatori',
      moreCategoryTools: 'Altri strumenti',
    },
    directory: {
      filterPlaceholder: 'Filtra per nome o parola chiave…',
      allLabel: 'Tutti',
      noResultsTitle: 'Nessun calcolatore trovato',
      noResultsDesc: 'Prova con un altro termine di ricerca o seleziona la categoria "Tutti".',
      toolsCountBadge: '60+ strumenti online gratuiti',
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

/**
 * Returns strictly localized common translations.
 * Throws an error if translation is missing for the locale (no silent fallback).
 */
export function getCommonTranslations(locale: Locale): CommonTranslations {
  const trans = COMMON_TRANSLATIONS[locale];
  if (!trans) {
    throw new Error(`[i18n] Missing required common translations for locale: "${locale}"`);
  }
  return trans;
}
