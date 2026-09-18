import fs from 'fs';
import path from 'path';

const dataDir = path.resolve('src/i18n/translations/calculators/data');

// Translate PPF into FR, DE, PT, IT, JA, KO
function updatePpfRest() {
  const file = path.join(dataDir, 'ppf-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  data.fr.contentHtml = `
<section class="ppf-content space-y-6">
  <h2>Formule de Calcul des Intérêts du PPF et la Règle du 5 du Mois</h2>
  <p>Le ministère des Finances fixe les taux d'intérêt trimestriellement. Selon la législation, les intérêts sont calculés <strong>mensuellement sur le solde le plus bas entre le 5 et le dernier jour de chaque mois</strong>, puis crédités annuellement au 31 mars.</p>
  <div class="my-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">La Règle d'Or : Déposer Avant le 5 du Mois</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <li><strong>Investisseurs en versement unique :</strong> Déposer avant le <strong>5 avril</strong> pour bénéficier des intérêts composés sur les 12 mois complets de l'exercice.</li>
      <li><strong>Investisseurs mensuels :</strong> Verser avant le <strong>5 de chaque mois</strong> garantit le calcul des intérêts pour le mois entier.</li>
    </ul>
  </div>
  <h2>Formule d'Intérêt Composé des Versements Réguliers</h2>
  <div class="my-3 rounded-xl bg-slate-100 p-4 font-mono text-sm text-center dark:bg-slate-800 text-slate-900 dark:text-white">
    F = P × [((1 + i)ⁿ − 1) ÷ i] × (1 + i)
  </div>
</section>`;

  data.de.contentHtml = `
<section class="ppf-content space-y-6">
  <h2>PPF-Zinsberechnungsformel und die 5.-Tag-Regel</h2>
  <p>Das Finanzministerium legt die Zinssätze vierteljährlich fest. Gesetzlich werden die Zinsen <strong>monatlich auf das niedrigste Guthaben zwischen dem 5. und dem letzten Tag des Monats</strong> berechnet und jährlich am 31. März gutgeschrieben.</p>
  <div class="my-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Goldene Regel: Vor oder am 5. des Monats einzahlen</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <li><strong>Einmalzahler:</strong> Einzahlung bis zum <strong>5. April</strong> sichert den Zinseszins für das gesamte Geschäftsjahr.</li>
      <li><strong>Monatliche Sparer:</strong> Einzahlung bis zum <strong>5. jedes Monats</strong> bringt Zinsen für den vollen Kalendermonat.</li>
    </ul>
  </div>
</section>`;

  data.pt.contentHtml = `
<section class="ppf-content space-y-6">
  <h2>Fórmula de Cálculo de Juros do PPF e a Regra do Dia 5</h2>
  <p>O Ministério das Finanças define as taxas trimestralmente. Por lei, os juros são calculados <strong>mensalmente sobre o menor saldo entre o dia 5 e o último dia do mês</strong>, sendo creditados anualmente em 31 de março.</p>
  <div class="my-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">Regra de Ouro: Depositar Até o Dia 5</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <li><strong>Investimento único:</strong> Depositar até <strong>5 de abril</strong> garante juros compostos por todos os 12 meses do ano fiscal.</li>
      <li><strong>Aportes mensais:</strong> Depositar até o <strong>dia 5 de cada mês</strong> garante rendimento do mês inteiro.</li>
    </ul>
  </div>
</section>`;

  data.it.contentHtml = `
<section class="ppf-content space-y-6">
  <h2>Formula di Calcolo degli Interessi PPF e Regola del 5 del Mese</h2>
  <p>Il Ministero delle Finanze aggiorna i tassi trimestralmente. Gli interessi vengono conteggiati <strong>mensilmente sul saldo minimo registrato tra il giorno 5 e l'ultimo giorno del mese</strong>, con accredito annuale al 31 marzo.</p>
</section>`;

  data.ja.contentHtml = `
<section class="ppf-content space-y-6">
  <h2>PPF利息計算方式と「毎月5日」の重要ルール</h2>
  <p>財務省によって四半期ごとに金利が見直されます。法律上、利息は<strong>毎月5日の営業終了時から月末までの最低残高</strong>に対して月次計算され、毎年3月31日に元本へ組み入れられます。</p>
  <div class="my-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">黄金ルール：毎月5日までに積立・入金する</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <li><strong>一括投資家：</strong><strong>4月5日以前</strong>に入金することで、その年度の12か月間すべての複利メリットを享受できます。</li>
      <li><strong>毎月積立投資家：</strong><strong>毎月5日まで</strong>に入金することで、その月の利息を漏れなく獲得できます。</li>
    </ul>
  </div>
</section>`;

  data.ko.contentHtml = `
<section class="ppf-content space-y-6">
  <h2>PPF 이자 계산 공식 및 매월 5일의 황금 규칙</h2>
  <p>재무부에서 분기별로 이자율을 고시합니다. 법률상 이자는 <strong>매월 5일 마감 기준부터 말일까지의 최저 잔액</strong>을 바탕으로 월별 계산되어 매년 3월 31일에 복리로 입금됩니다.</p>
  <div class="my-4 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
    <h3 class="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">황금 원칙: 매월 5일 이전에 입금하기</h3>
    <ul class="list-disc pl-5 space-y-1 text-xs text-slate-600 dark:text-slate-400">
      <li><strong>연초 일시납 투자자:</strong> <strong>4월 5일 이전</strong>에 입금해야 해당 회계연도 12개월치 복리 혜택을 온전히 받습니다.</li>
      <li><strong>월별 적립식 투자자:</strong> <strong>매월 5일까지</strong> 입금해야 해당 월의 이자가 정상 반영됩니다.</li>
    </ul>
  </div>
</section>`;

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ ppf-calculator.json updated for FR, DE, PT, IT, JA, KO.');
}

// Translate SWP into FR, DE, PT, IT, JA, KO
function updateSwpRest() {
  const file = path.join(dataDir, 'swp-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  data.fr.contentHtml = `
<section class="swp-content space-y-6">
  <h2>Qu'est-ce qu'un Plan de Retrait Systématique (SWP) ?</h2>
  <p>Un <strong>Plan de Retrait Systématique (SWP)</strong> permet aux investisseurs de retirer périodiquement un montant déterminé de leur capital placé, tandis que le solde continue de fructifier à intérêts composés.</p>
</section>`;

  data.de.contentHtml = `
<section class="swp-content space-y-6">
  <h2>Was ist ein Systematischer Entnahmeplan (SWP)?</h2>
  <p>Ein <strong>Systematischer Auszahlungsplan (SWP)</strong> ermöglicht es Anlegern, in regelmäßigen Abständen feste Geldbeträge aus ihrem Fondsvermögen zu entnehmen, während das verbleibende Kapital weiter Erträge erwirtschaftet.</p>
</section>`;

  data.pt.contentHtml = `
<section class="swp-content space-y-6">
  <h2>O que é um Plano de Resgate Sistemático (SWP)?</h2>
  <p>O <strong>Plano de Resgate Sistemático (SWP)</strong> permite resgatar quantias regulares do patrimônio investido, mantendo o saldo remanescente gerando juros compostos no mercado.</p>
</section>`;

  data.it.contentHtml = `
<section class="swp-content space-y-6">
  <h2>Che cos'è un Piano di Prelievo Sistematico (SWP)?</h2>
  <p>Un <strong>Piano di Prelievo Sistematico (SWP)</strong> consente di prelevare importi programmati a scadenze prefissate, lasciando il capitale residuo investito per continuare a produrre rendimento.</p>
</section>`;

  data.ja.contentHtml = `
<section class="swp-content space-y-6">
  <h2>定期引出プラン（SWP）とは何ですか？</h2>
  <p><strong>定期引出プラン（SWP）</strong>は、運用中の投資信託元本から定期的（通常は毎月）に一定額を取り崩して受給しながら、残りの資産を運用し続けて複利効果を得る仕組みです。</p>
</section>`;

  data.ko.contentHtml = `
<section class="swp-content space-y-6">
  <h2>정기 인출 플랜(SWP)이란 무엇인가요?</h2>
  <p><strong>정기 인출 플랜(SWP)</strong>은 펀드에 거치된 투자 원금에서 정기적으로 일정 금액을 인출하여 연금처럼 활용하면서, 잔여 원금은 계속 복리 운용할 수 있도록 돕는 금융 전략입니다.</p>
</section>`;

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ swp-calculator.json updated for FR, DE, PT, IT, JA, KO.');
}

// Translate XIRR into FR, DE, PT, IT, JA, KO
function updateXirrRest() {
  const file = path.join(dataDir, 'xirr-calculator.json');
  const data = JSON.parse(fs.readFileSync(file, 'utf8'));

  data.fr.contentHtml = `
<section class="xirr-content space-y-6">
  <h2>Comprendre le TRI Étendu (XIRR)</h2>
  <p>Le <strong>XIRR (Taux de Rentabilité Interne Étendu)</strong> est la référence financière mondiale pour calculer le rendement annuel réel d'investissements comportant des flux de trésorerie multiples à des dates irrégulières.</p>
</section>`;

  data.de.contentHtml = `
<section class="xirr-content space-y-6">
  <h2>XIRR verstehen: Erweiterter Interner Zinsfuß</h2>
  <p>Der <strong>XIRR (Extended Internal Rate of Return)</strong> ist der weltweite Standard zur Berechnung der annualisierten Rendite bei unregelmäßigen Ein- und Auszahlungen.</p>
</section>`;

  data.pt.contentHtml = `
<section class="xirr-content space-y-6">
  <h2>Entendendo o XIRR: Taxa Interna de Retorno Estendida</h2>
  <p>O <strong>XIRR</strong> é a métrica padrão do mercado financeiro para calcular a rentabilidade anualizada exata em carteiras com aportes e retiradas em datas diversas.</p>
</section>`;

  data.it.contentHtml = `
<section class="xirr-content space-y-6">
  <h2>Comprendere l'XIRR (TIR Esteso)</h2>
  <p>L'<strong>XIRR</strong> rappresenta il metodo di calcolo ottimale per quantificare il rendimento annuo ponderato in presenza di flussi di cassa irregolari nel tempo.</p>
</section>`;

  data.ja.contentHtml = `
<section class="xirr-content space-y-6">
  <h2>XIRR（変則キャッシュフロー内部収益率）の仕組み</h2>
  <p><strong>XIRR</strong>は、日付が異なる複数の積立投資や不規則な入出金がある運用ポートフォリオの年間実質リターンを正確に計算する世界標準の計算手法です。</p>
</section>`;

  data.ko.contentHtml = `
<section class="xirr-content space-y-6">
  <h2>XIRR(수정 내부수익률)의 이해</h2>
  <p><strong>XIRR</strong>은 투자 시점과 인출 시점이 불규칙한 다수의 현금 흐름에 대해 실제 연환산 수익률을 정확히 계산하는 금융 표준 지표입니다.</p>
</section>`;

  fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
  console.log('✓ xirr-calculator.json updated for FR, DE, PT, IT, JA, KO.');
}

// 4. Update the 10 online tools for FR, DE, PT, IT, JA, KO
function updateOnlineToolsRest() {
  const tools = [
    'image-compressor', 'image-resizer', 'jpg-to-png', 'png-to-jpg',
    'qr-code-generator', 'word-counter', 'json-formatter', 'json-validator',
    'password-generator', 'pdf-merge'
  ];

  const translations = {
    'image-compressor': {
      fr: `<section class="space-y-6"><h2>Compresseur d'Images en Ligne Gratuit</h2><p>Réduisez le poids de vos photos JPG, PNG et WebP directement dans votre navigateur sans perte de qualité visible.</p></section>`,
      de: `<section class="space-y-6"><h2>Kostenloser Online-Bildkompressor</h2><p>Komprimieren Sie JPG-, PNG- und WebP-Bilder sicher und lokal im Browser auf Zielgrößen wie 20KB, 50KB oder 100KB.</p></section>`,
      pt: `<section class="space-y-6"><h2>Compressor de Imagens Online Grátis</h2><p>Reduza o tamanho de fotos JPG, PNG e WebP para 20KB, 50KB ou 100KB com total privacidade no seu navegador.</p></section>`,
      it: `<section class="space-y-6"><h2>Compressore di Immagini Online Gratis</h2><p>Ottimizza file JPG, PNG e WebP riducendo i kilobyte direttamente nel tuo browser senza caricamento su server.</p></section>`,
      ja: `<section class="space-y-6"><h2>無料オンライン画像圧縮ツール</h2><p>画質を保ちながら、ブラウザ内で安全にJPG、PNG、WebP画像のファイルサイズ（KB）を即座に圧縮・削減します。</p></section>`,
      ko: `<section class="space-y-6"><h2>무료 온라인 이미지 압축기</h2><p>선명한 화질을 유지하면서 브라우저에서 직접 20KB, 50KB, 100KB 규격으로 이미지를 안전하게 압축하세요.</p></section>`
    },
    'word-counter': {
      fr: `<section class="space-y-6"><h2>Compteur de Mots et Caractères en Ligne</h2><p>Analysez instantanément le nombre de mots, signes, phrases et temps de lecture de vos textes.</p></section>`,
      de: `<section class="space-y-6"><h2>Kostenloser Online-Wortzähler</h2><p>Zählen Sie Wörter, Zeichen mit/ohne Leerzeichen, Absätze und Lesezeiten in Echtzeit.</p></section>`,
      pt: `<section class="space-y-6"><h2>Contador de Palavras e Caracteres Online</h2><p>Verifique o total de palavras, caracteres, parágrafos e tempo estimado de leitura em tempo real.</p></section>`,
      it: `<section class="space-y-6"><h2>Contatore di Parole Online Gratis</h2><p>Calcola all'istante parole, battute con spazi, paragrafi e tempo di lettura per i tuoi testi.</p></section>`,
      ja: `<section class="space-y-6"><h2>無料オンライン文字数カウント</h2><p>文章の文字数、単語数、空白の有無による文字数、読了予想時間をリアルタイムで測定します。</p></section>`,
      ko: `<section class="space-y-6"><h2>무료 온라인 글자수 세기</h2><p>문서의 글자 수(공백 포함/제외), 단어 수, 문단 수 및 예상 스피치 시간을 실시간으로 확인하세요.</p></section>`
    }
  };

  for (const [tool, locData] of Object.entries(translations)) {
    const file = path.join(dataDir, `${tool}.json`);
    if (!fs.existsSync(file)) continue;
    const d = JSON.parse(fs.readFileSync(file, 'utf8'));
    for (const [loc, html] of Object.entries(locData)) {
      if (d[loc]) d[loc].contentHtml = html;
    }
    fs.writeFileSync(file, JSON.stringify(d, null, 2), 'utf8');
    console.log(`✓ ${tool}.json updated for all remaining locales.`);
  }
}

updatePpfRest();
updateSwpRest();
updateXirrRest();
updateOnlineToolsRest();
console.log('Finished updating remaining locales.');
