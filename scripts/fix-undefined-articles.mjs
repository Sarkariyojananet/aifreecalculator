import fs from 'fs';
import path from 'path';

const dataDir = './src/i18n/translations/calculators/data';
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
const locales = ['hi', 'es', 'fr', 'de', 'pt', 'it', 'ja', 'ko'];

const LABELS = {
  hi: {
    step: 'चरण',
    howItWorks: 'यह गणना कैसे काम करती है (चरण-दर-चरण निर्देश)',
    formulaSection: 'सूत्र और गणितीय विधि (Formula & Methodology)',
    variablesSection: 'सूत्र के चर और संकेत (Variables & Parameters)',
    exampleSection: 'व्यावहारिक गणना उदाहरण (Practical Worked Example)',
    notesSection: 'महत्वपूर्ण सुझाव एवं विचारणीय बिंदु',
    scenario: 'परिदृश्य:',
    calculation: 'गणना विधि:',
    result: 'अंतिम परिणाम:',
    colSymbol: 'प्रतीक',
    colParam: 'पैरामीटर',
    colDesc: 'विवरण',
    colUnit: 'इकाई'
  },
  es: {
    step: 'Paso',
    howItWorks: 'Cómo funciona esta calculadora (Guía paso a paso)',
    formulaSection: 'Fórmula y método matemático',
    variablesSection: 'Variables y parámetros de la fórmula',
    exampleSection: 'Ejemplo práctico resuelto',
    notesSection: 'Consejos clave y consideraciones prácticas',
    scenario: 'Escenario:',
    calculation: 'Cálculo paso a paso:',
    result: 'Resultado final:',
    colSymbol: 'Símbolo',
    colParam: 'Parámetro',
    colDesc: 'Descripción',
    colUnit: 'Unidad'
  },
  fr: {
    step: 'Étape',
    howItWorks: 'Comment fonctionne ce calculateur (Guide étape par étape)',
    formulaSection: 'Formule et méthode mathématique',
    variablesSection: 'Variables et paramètres de la formule',
    exampleSection: 'Exemple pratique de calcul',
    notesSection: 'Conseils clés et considérations pratiques',
    scenario: 'Scénario :',
    calculation: 'Calcul étape par étape :',
    result: 'Résultat final :',
    colSymbol: 'Symbole',
    colParam: 'Paramètre',
    colDesc: 'Description',
    colUnit: 'Unité'
  },
  de: {
    step: 'Schritt',
    howItWorks: 'So funktioniert diese Berechnung (Schritt-für-Schritt-Anleitung)',
    formulaSection: 'Formel & mathematische Methode',
    variablesSection: 'Variablen und Parameter der Formel',
    exampleSection: 'Praktisches Berechnungsbeispiel',
    notesSection: 'Wichtige Hinweise & Praxis-Tipps',
    scenario: 'Szenario:',
    calculation: 'Schrittweise Berechnung:',
    result: 'Endergebnis:',
    colSymbol: 'Symbol',
    colParam: 'Parameter',
    colDesc: 'Beschreibung',
    colUnit: 'Einheit'
  },
  pt: {
    step: 'Passo',
    howItWorks: 'Como funciona esta calculadora (Guia passo a passo)',
    formulaSection: 'Fórmula e método matemático',
    variablesSection: 'Variáveis e parâmetros da fórmula',
    exampleSection: 'Exemplo prático resolvido',
    notesSection: 'Dicas importantes e considerações práticas',
    scenario: 'Cenário:',
    calculation: 'Cálculo passo a passo:',
    result: 'Resultado final:',
    colSymbol: 'Símbolo',
    colParam: 'Parâmetro',
    colDesc: 'Descrição',
    colUnit: 'Unidade'
  },
  it: {
    step: 'Passo',
    howItWorks: 'Come funziona questo calcolatore (Guida passo dopo passo)',
    formulaSection: 'Formula e metodo matematico',
    variablesSection: 'Variabili e parametri della formula',
    exampleSection: 'Esempio pratico svolto',
    notesSection: 'Consigli importanti e considerazioni pratiche',
    scenario: 'Scenario:',
    calculation: 'Calcolo passo dopo passo:',
    result: 'Risultato finale:',
    colSymbol: 'Simbolo',
    colParam: 'Parametro',
    colDesc: 'Descrizione',
    colUnit: 'Unità'
  },
  ja: {
    step: 'ステップ',
    howItWorks: '計算ツールの使い方（ステップ・バイ・ステップ手順）',
    formulaSection: '計算式と数学的手法',
    variablesSection: '計算式の変数と記号',
    exampleSection: '実践的な計算例',
    notesSection: '重要なポイントと実践的な注意事項',
    scenario: '想定シナリオ:',
    calculation: '計算プロセス:',
    result: '最終結果:',
    colSymbol: '記号',
    colParam: 'パラメータ',
    colDesc: '説明',
    colUnit: '単位'
  },
  ko: {
    step: '단계',
    howItWorks: '계산기 사용 방법 (단계별 안내)',
    formulaSection: '수학적 공식 및 계산 방법',
    variablesSection: '공식 변수 및 매개변수 정의',
    exampleSection: '실전 계산 예시',
    notesSection: '주요 고려사항 및 실용 팁',
    scenario: '적용 시나리오:',
    calculation: '단계별 계산 과정:',
    result: '최종 결과:',
    colSymbol: '기호',
    colParam: '매개변수',
    colDesc: '설명',
    colUnit: '단위'
  }
};

function generateArticleHtml(entry, loc) {
  const lbl = LABELS[loc] || LABELS.es;
  const parts = [];

  // 1. Introduction Section
  const title = entry.h1 || entry.name || 'Calculator';
  const intro = entry.intro || entry.shortDescription || entry.description || '';
  parts.push(`<section class="space-y-4">
  <h2 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">${title}</h2>
  ${intro ? `<p class="text-base text-slate-700 dark:text-slate-300 leading-relaxed">${intro}</p>` : ''}
</section>`);

  // 2. Step-by-Step Instructions
  if (Array.isArray(entry.stepByStep) && entry.stepByStep.length > 0) {
    const stepsHtml = entry.stepByStep.map((s, idx) => {
      if (typeof s === 'string') {
        return `
    <li class="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
      <strong class="font-bold text-slate-900 dark:text-white block mb-1">${lbl.step} ${idx + 1}</strong>
      <span class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">${s}</span>
    </li>`;
      }
      const stepNum = s.stepNumber || (idx + 1);
      const stepTitle = s.title ? `${stepNum}. ${s.title}` : `${lbl.step} ${stepNum}`;
      const instruction = s.instruction || s.text || s.description || '';
      return `
    <li class="rounded-xl border border-slate-200/80 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/40">
      <strong class="font-bold text-slate-900 dark:text-white block mb-1">${stepTitle}</strong>
      ${instruction ? `<span class="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">${instruction}</span>` : ''}
    </li>`;
    }).join('');

    parts.push(`<section class="space-y-4">
  <h3 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">${lbl.howItWorks}</h3>
  <ol class="space-y-3 list-none pl-0">
    ${stepsHtml}
  </ol>
</section>`);
  }

  // 3. Formula & Methodology Section
  if (entry.formulaTitle || entry.formulaEquation || entry.formulaDescription) {
    parts.push(`<section class="space-y-4">
  <h3 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">${entry.formulaTitle || lbl.formulaSection}</h3>
  ${entry.formulaDescription ? `<p class="text-slate-700 dark:text-slate-300 leading-relaxed">${entry.formulaDescription}</p>` : ''}
  ${entry.formulaEquation ? `
  <div class="my-4 rounded-2xl border border-blue-200 bg-blue-50/80 p-5 font-mono text-base font-bold text-blue-900 dark:border-blue-900/60 dark:bg-blue-950/40 dark:text-blue-200 shadow-inner">
    ${entry.formulaEquation}
  </div>` : ''}
</section>`);
  }

  // 4. Variables Table Section
  if (Array.isArray(entry.variables) && entry.variables.length > 0) {
    const rowsHtml = entry.variables.map(v => {
      const symbol = v.symbol || v.key || '';
      const param = v.label || v.name || v.title || symbol || '-';
      const desc = v.description || v.desc || '-';
      const unit = v.unit || '-';
      return `
      <tr class="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition">
        <td class="p-3 font-mono font-bold text-blue-600 dark:text-blue-400 border border-slate-200 dark:border-slate-800">${symbol}</td>
        <td class="p-3 font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800">${param}</td>
        <td class="p-3 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-sm">${desc}</td>
        <td class="p-3 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 text-xs font-mono">${unit}</td>
      </tr>`;
    }).join('');

    parts.push(`<section class="space-y-4">
  <h3 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">${lbl.variablesSection}</h3>
  <div class="overflow-x-auto my-2">
    <table class="w-full text-left border-collapse border border-slate-200 dark:border-slate-800 rounded-xl">
      <thead class="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold text-sm">
        <tr>
          <th class="p-3 border border-slate-200 dark:border-slate-800">${lbl.colSymbol}</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">${lbl.colParam}</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">${lbl.colDesc}</th>
          <th class="p-3 border border-slate-200 dark:border-slate-800">${lbl.colUnit}</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-200 dark:divide-slate-800">
        ${rowsHtml}
      </tbody>
    </table>
  </div>
</section>`);
  }

  // 5. Worked Example Section
  if (entry.workedExample && (entry.workedExample.title || entry.workedExample.scenario || entry.workedExample.calculation || entry.workedExample.result)) {
    const ex = entry.workedExample;
    parts.push(`<section class="space-y-4">
  <h3 class="text-xl font-bold tracking-tight text-slate-900 dark:text-white">${ex.title || lbl.exampleSection}</h3>
  <div class="rounded-2xl border border-slate-200 bg-slate-50/70 p-5 dark:border-slate-800 dark:bg-slate-900/50 space-y-3">
    ${ex.scenario ? `<p class="text-sm text-slate-700 dark:text-slate-300"><strong>${lbl.scenario}</strong> ${ex.scenario}</p>` : ''}
    ${ex.calculation ? `<p class="text-sm font-mono text-blue-800 dark:text-blue-300 bg-white/80 dark:bg-slate-800/80 p-3 rounded-xl border border-slate-200 dark:border-slate-700"><strong>${lbl.calculation}</strong> ${ex.calculation}</p>` : ''}
    ${ex.result ? `<div class="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3.5 text-sm font-bold text-emerald-900 dark:border-emerald-900/60 dark:bg-emerald-950/40 dark:text-emerald-200"><strong>${lbl.result}</strong> ${ex.result}</div>` : ''}
  </div>
</section>`);
  }

  // 6. Practical Notes / Tips
  if (entry.notes && typeof entry.notes === 'string' && entry.notes.trim().length > 0) {
    parts.push(`<section class="space-y-2">
  <h3 class="text-lg font-bold tracking-tight text-slate-900 dark:text-white">${lbl.notesSection}</h3>
  <p class="text-sm text-slate-600 dark:text-slate-400 italic bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 p-4 rounded-xl">
    ${entry.notes}
  </p>
</section>`);
  }

  const res = parts.join('\n\n');
  if (res.includes('>undefined<') || res.includes('undefined')) {
    throw new Error(`CRITICAL: Generated HTML still contains undefined for locale ${loc}`);
  }
  return res;
}

let filesModified = 0;
let articlesRegenerated = 0;

for (const file of files) {
  const filePath = path.join(dataDir, file);
  const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let changed = false;

  for (const loc of locales) {
    const entry = json[loc];
    if (!entry) continue;

    const currentHtml = entry.contentHtml || '';
    const needsRegen = currentHtml.includes('undefined') || currentHtml.trim().length < 500;

    if (needsRegen) {
      const newHtml = generateArticleHtml(entry, loc);
      if (newHtml && newHtml.length > 50) {
        entry.contentHtml = newHtml;
        changed = true;
        articlesRegenerated++;
      }
    }
  }

  if (changed) {
    fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8');
    filesModified++;
  }
}

console.log('=== FIX COMPLETED ===');
console.log('Files modified:', filesModified);
console.log('Articles regenerated:', articlesRegenerated);
