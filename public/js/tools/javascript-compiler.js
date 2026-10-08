/**
 * Online JavaScript Compiler - Interactive Browser Client Engine
 * AI Free Calculator
 */

(function () {
  const codeEditor = document.getElementById('js-code-input');
  const runBtn = document.getElementById('js-run-btn');
  const clearBtn = document.getElementById('js-clear-btn');
  const copyBtn = document.getElementById('js-copy-btn');
  const downloadBtn = document.getElementById('js-download-btn');
  const templateSelect = document.getElementById('js-template-select');
  const outputConsole = document.getElementById('js-output-console');
  const statusBadge = document.getElementById('js-status-badge');
  const executionTimeEl = document.getElementById('js-exec-time');

  if (!codeEditor || !runBtn) return;

  const TEMPLATES = {
    hello: `// JavaScript ES6+ - Hello World
console.log("Hello, World!");
const developer = {
  name: "Coder",
  platform: "AI Free Calculator",
  skills: ["JavaScript", "HTML", "CSS", "Python"]
};
console.log("Welcome!", developer);
`,
    async: `// Asynchronous Programming (Promises & Async/Await)
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchSimulatedData() {
  console.log("1. Starting async task...");
  await delay(300);
  console.log("2. Fetching records from simulated API...");
  await delay(300);
  const data = [
    { id: 101, name: "Product A", price: 29.99 },
    { id: 102, name: "Product B", price: 49.50 },
    { id: 103, name: "Product C", price: 15.00 }
  ];
  console.log("3. Data received successfully:");
  console.table(data);
  const total = data.reduce((acc, item) => acc + item.price, 0);
  console.log(\`Total Inventory Value: \$\${total.toFixed(2)}\`);
}

fetchSimulatedData();
`,
    algorithms: `// Array Methods & Data Transformations
const users = [
  { name: "Alice", age: 25, role: "Engineer" },
  { name: "Bob", age: 30, role: "Designer" },
  { name: "Charlie", age: 28, role: "Engineer" },
  { name: "Diana", age: 35, role: "Manager" }
];

// 1. Filter engineers
const engineers = users.filter(u => u.role === "Engineer");
console.log("Engineers:", engineers.map(e => e.name));

// 2. Average age
const avgAge = users.reduce((sum, u) => sum + u.age, 0) / users.length;
console.log("Average Team Age:", avgAge.toFixed(1));

// 3. Group by role
const grouped = users.reduce((acc, u) => {
  acc[u.role] = acc[u.role] || [];
  acc[u.role].push(u.name);
  return acc;
}, {});
console.log("Grouped by Role:", grouped);
`,
    math: `// Mathematical Algorithms & Prime Check
function isPrime(num) {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
}

const primes = [];
for (let i = 1; i <= 50; i++) {
  if (isPrime(i)) primes.push(i);
}
console.log("Prime numbers between 1 and 50:");
console.log(primes.join(", "));
console.log(\`Found \${primes.length} primes in range.\`);
`
  };

  // Support Tab key in editor
  codeEditor.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
      this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 2;
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runBtn.click();
    }
  });

  if (templateSelect) {
    templateSelect.addEventListener('change', function () {
      const selected = this.value;
      if (TEMPLATES[selected]) {
        codeEditor.value = TEMPLATES[selected];
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      codeEditor.value = '';
      outputConsole.textContent = 'Code cleared. Press "Run Code" or Ctrl+Enter to execute.';
      statusBadge.textContent = 'Ready';
      statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      if (executionTimeEl) executionTimeEl.textContent = '0ms';
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(codeEditor.value).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = originalText), 2000);
      });
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', function () {
      const blob = new Blob([codeEditor.value], { type: 'text/javascript' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'script.js';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  runBtn.addEventListener('click', async function () {
    const code = codeEditor.value.trim();
    if (!code) {
      outputConsole.textContent = 'No code to execute. Please enter JavaScript code above.';
      return;
    }

    outputConsole.textContent = '';
    statusBadge.textContent = 'Running...';
    statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300';

    const logs = [];
    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalTable = console.table;

    function formatItem(item) {
      if (typeof item === 'object' && item !== null) {
        try {
          return JSON.stringify(item, null, 2);
        } catch {
          return String(item);
        }
      }
      return String(item);
    }

    console.log = (...args) => {
      logs.push(args.map(formatItem).join(' '));
      originalLog.apply(console, args);
    };
    console.warn = (...args) => {
      logs.push('[WARN] ' + args.map(formatItem).join(' '));
      originalWarn.apply(console, args);
    };
    console.error = (...args) => {
      logs.push('[ERROR] ' + args.map(formatItem).join(' '));
      originalError.apply(console, args);
    };
    console.table = (data) => {
      logs.push(formatItem(data));
      originalTable.apply(console, [data]);
    };

    const startTime = performance.now();

    try {
      // Async IIFE wrapper for supporting top-level await
      const wrappedCode = `(async () => {\n${code}\n})()`;
      const result = await eval(wrappedCode);

      const elapsed = Math.round(performance.now() - startTime);
      if (executionTimeEl) executionTimeEl.textContent = `${elapsed}ms`;

      let output = logs.join('\n');
      if (result !== undefined && !output.includes(String(result))) {
        output += (output ? '\n\n' : '') + `[Return Value]: ${formatItem(result)}`;
      }

      outputConsole.textContent = output || 'Code executed successfully (no console output).';
      statusBadge.textContent = 'Success';
      statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      if (executionTimeEl) executionTimeEl.textContent = `${elapsed}ms`;

      let output = logs.length ? logs.join('\n') + '\n\n' : '';
      output += `[Runtime Error]: ${err.message || err}`;
      outputConsole.textContent = output;
      statusBadge.textContent = 'Error';
      statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
    } finally {
      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.table = originalTable;
    }
  });
})();
