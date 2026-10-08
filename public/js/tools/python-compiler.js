/**
 * Online Python Compiler - Interactive Browser Client Engine
 * AI Free Calculator
 */

(function () {
  const codeEditor = document.getElementById('python-code-input');
  const stdinInput = document.getElementById('python-stdin-input');
  const runBtn = document.getElementById('python-run-btn');
  const clearBtn = document.getElementById('python-clear-btn');
  const copyBtn = document.getElementById('python-copy-btn');
  const downloadBtn = document.getElementById('python-download-btn');
  const templateSelect = document.getElementById('python-template-select');
  const outputConsole = document.getElementById('python-output-console');
  const statusBadge = document.getElementById('python-status-badge');
  const executionTimeEl = document.getElementById('python-exec-time');

  if (!codeEditor || !runBtn) return;

  const TEMPLATES = {
    hello: `# Python 3 - Hello World
print("Hello, World!")
name = "Developer"
print(f"Welcome to AI Free Calculator Python Compiler, {name}!")
`,
    math: `# Mathematical Calculations & Statistics
import math

numbers = [12, 45, 78, 23, 56, 89, 90, 34]
print(f"Dataset: {numbers}")
print(f"Count: {len(numbers)}")
print(f"Sum: {sum(numbers)}")
print(f"Average: {sum(numbers)/len(numbers):.2f}")
print(f"Max: {max(numbers)}, Min: {min(numbers)}")
print(f"Square root of 144: {math.isqrt(144)}")
print(f"Factorial of 6: {math.factorial(6)}")
`,
    fibonacci: `# Fibonacci Sequence Generator
def fibonacci(n):
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence[:n]

n = 15
result = fibonacci(n)
print(f"First {n} Fibonacci numbers:")
for idx, val in enumerate(result, 1):
    print(f"F({idx}): {val}")
`,
    sorting: `# Bubble Sort Algorithm Implementation
def bubble_sort(arr):
    n = len(arr)
    data = arr.copy()
    for i in range(n):
        for j in range(0, n - i - 1):
            if data[j] > data[j + 1]:
                data[j], data[j + 1] = data[j + 1], data[j]
    return data

sample = [64, 34, 25, 12, 22, 11, 90, 5]
print("Original Array:", sample)
sorted_array = bubble_sort(sample)
print("Sorted Array:  ", sorted_array)
`,
    oop: `# Object-Oriented Programming (Classes & Inheritance)
class BankAccount:
    def __init__(self, owner, balance=0.0):
        self.owner = owner
        self.balance = balance

    def deposit(self, amount):
        if amount > 0:
            self.balance += amount
            print(f"Deposited \${amount:.2f}. New Balance: \${self.balance:.2f}")

    def withdraw(self, amount):
        if 0 < amount <= self.balance:
            self.balance -= amount
            print(f"Withdrew \${amount:.2f}. Remaining Balance: \${self.balance:.2f}")
        else:
            print("Insufficient funds or invalid amount!")

account = BankAccount("Alex", 500.0)
account.deposit(250.0)
account.withdraw(120.0)
`
  };

  // Support Tab key in editor
  codeEditor.addEventListener('keydown', function (e) {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = this.selectionStart;
      const end = this.selectionEnd;
      this.value = this.value.substring(0, start) + '    ' + this.value.substring(end);
      this.selectionStart = this.selectionEnd = start + 4;
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
      const blob = new Blob([codeEditor.value], { type: 'text/x-python' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'main.py';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  let pyodideInstance = null;
  let isPyodideLoading = false;

  async function loadPyodideEngine() {
    if (pyodideInstance) return pyodideInstance;
    if (isPyodideLoading) {
      while (isPyodideLoading) {
        await new Promise((r) => setTimeout(r, 100));
      }
      return pyodideInstance;
    }

    isPyodideLoading = true;
    statusBadge.textContent = 'Loading Python runtime...';
    statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';

    try {
      if (typeof loadPyodide === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      pyodideInstance = await loadPyodide({
        stdout: (text) => {
          outputConsole.textContent += text + '\n';
        },
        stderr: (text) => {
          outputConsole.textContent += text + '\n';
        }
      });
      isPyodideLoading = false;
      return pyodideInstance;
    } catch (err) {
      isPyodideLoading = false;
      throw err;
    }
  }

  runBtn.addEventListener('click', async function () {
    const code = codeEditor.value.trim();
    if (!code) {
      outputConsole.textContent = 'No code to execute. Please enter Python code above.';
      return;
    }

    outputConsole.textContent = '';
    statusBadge.textContent = 'Running...';
    statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 animate-pulse';
    runBtn.disabled = true;

    const startTime = performance.now();

    try {
      const pyodide = await loadPyodideEngine();
      
      // Redirect stdout buffer
      await pyodide.runPythonAsync(`
import sys
from io import StringIO
sys.stdout = StringIO()
sys.stderr = StringIO()
`);

      await pyodide.runPythonAsync(code);

      const stdout = await pyodide.runPythonAsync(`sys.stdout.getvalue()`);
      const stderr = await pyodide.runPythonAsync(`sys.stderr.getvalue()`);

      const elapsed = Math.round(performance.now() - startTime);
      if (executionTimeEl) executionTimeEl.textContent = `${elapsed}ms`;

      let output = '';
      if (stdout) output += stdout;
      if (stderr) output += '\n[Standard Error]:\n' + stderr;

      outputConsole.textContent = output || 'Program finished with return code 0 (no output produced).';
      statusBadge.textContent = 'Success (0)';
      statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      if (executionTimeEl) executionTimeEl.textContent = `${elapsed}ms`;
      outputConsole.textContent = String(err.message || err);
      statusBadge.textContent = 'Error';
      statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
    } finally {
      runBtn.disabled = false;
    }
  });
})();
