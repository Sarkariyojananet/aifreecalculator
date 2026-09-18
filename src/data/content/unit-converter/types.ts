export interface FaqItem {
  question: string;
  answer: string;
}

export interface CategoryContentItem {
  id: string;
  name: string;
  desc: string;
  units?: Record<string, string>;
}

export interface PresetItem {
  label: string;
  cat: string;
  from: string;
  to: string;
  val: string;
}

export interface BenchmarkRow {
  condition: string;
  celsius: string;
  fahrenheit: string;
  kelvin: string;
}

export interface UnitConverterContent {
  meta: {
    title: string;
    description: string;
    keywords: string[];
    h1: string;
    intro: string;
  };
  ui: {
    quickConversionsTitle: string;
    fromLabel: string;
    toLabel: string;
    swapButton: string;
    copyButton: string;
    copied: string;
    formulaLabel: string;
    convertedValueHeader: string;
    precisionLabel: string;
    precisionValue: string;
    standardUnitLabel: string;
    equivalentHeader: string;
    enterValuePlaceholder: string;
    resultPlaceholder: string;
    indianLandBannerText: string;
    indianLandBannerBtn: string;
    emptyHeroSub: string;
  };
  categories: CategoryContentItem[];
  presets: PresetItem[];
  article: {
    h2Overview: string;
    pOverview1: string;
    pOverview2: string;

    categoriesHeader: string;
    categoriesList: {
      title: string;
      description: string;
      bulletPoints: string[];
      ruleOfThumb?: string;
    }[];

    comparisonHeader: string;
    comparisonText: string;
    comparisonPoints: string[];

    formulasHeader: string;
    formulasIntro: string;
    benchmarksTitle: string;
    benchmarksHeaders: {
      condition: string;
      celsius: string;
      fahrenheit: string;
      kelvin: string;
    };
    benchmarksRows: BenchmarkRow[];

    useCasesHeader: string;
    useCasesList: {
      title: string;
      description: string;
    }[];

    limitationsHeader: string;
    limitationsList: string[];
  };
  faqs: FaqItem[];
}
