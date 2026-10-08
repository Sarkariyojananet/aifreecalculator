/**
 * Online SQL Editor - Interactive SQLite WebAssembly Client Engine
 * AI Free Calculator
 */

(function () {
  const queryInput = document.getElementById('sql-query-input');
  const runBtn = document.getElementById('sql-run-btn');
  const clearBtn = document.getElementById('sql-clear-btn');
  const copyBtn = document.getElementById('sql-copy-btn');
  const exportCsvBtn = document.getElementById('sql-export-csv-btn');
  const templateSelect = document.getElementById('sql-template-select');
  const tableResultContainer = document.getElementById('sql-table-result');
  const statusBadge = document.getElementById('sql-status-badge');
  const executionTimeEl = document.getElementById('sql-exec-time');
  const rowCountEl = document.getElementById('sql-row-count');

  if (!queryInput || !runBtn) return;

  const TEMPLATES = {
    select_all: `-- Select all employees with department names
SELECT 
    e.id, 
    e.name, 
    e.role, 
    d.department_name, 
    e.salary 
FROM employees e
JOIN departments d ON e.department_id = d.id
ORDER BY e.salary DESC;`,

    aggregates: `-- Department Salary Statistics
SELECT 
    d.department_name,
    COUNT(e.id) AS total_employees,
    AVG(e.salary) AS average_salary,
    MAX(e.salary) AS highest_salary,
    SUM(e.salary) AS total_payroll
FROM departments d
LEFT JOIN employees e ON d.id = e.department_id
GROUP BY d.department_name
ORDER BY total_payroll DESC;`,

    orders: `-- Recent Customer Orders with Item Count
SELECT 
    o.order_id,
    o.customer_name,
    o.order_date,
    o.order_amount,
    o.status
FROM orders o
WHERE o.order_amount > 100.00
ORDER BY o.order_amount DESC;`,

    create_table: `-- Create a new table and insert sample rows
CREATE TABLE IF NOT EXISTS projects (
    project_id INTEGER PRIMARY KEY,
    project_name TEXT NOT NULL,
    budget REAL,
    status TEXT
);

INSERT INTO projects (project_name, budget, status) VALUES
('Mobile App Redesign', 25000.0, 'In Progress'),
('Cloud Migration', 48000.0, 'Planning'),
('Security Audit', 12000.0, 'Completed');

SELECT * FROM projects;`
  };

  // Sample database initialization script
  const SAMPLE_DB_SQL = `
CREATE TABLE IF NOT EXISTS departments (
    id INTEGER PRIMARY KEY,
    department_name TEXT NOT NULL,
    location TEXT
);

INSERT INTO departments VALUES
(1, 'Engineering', 'San Francisco'),
(2, 'Marketing', 'New York'),
(3, 'Product', 'London'),
(4, 'Finance', 'Singapore');

CREATE TABLE IF NOT EXISTS employees (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    salary REAL NOT NULL,
    department_id INTEGER,
    FOREIGN KEY (department_id) REFERENCES departments(id)
);

INSERT INTO employees VALUES
(101, 'Sophia Chen', 'Lead Architect', 145000, 1),
(102, 'Liam Johnson', 'Senior Backend Dev', 128000, 1),
(103, 'Emma Davis', 'Growth Marketing Lead', 98000, 2),
(104, 'Noah Wilson', 'Product Designer', 112000, 3),
(105, 'Olivia Martinez', 'Financial Analyst', 94000, 4),
(106, 'Lucas Brown', 'Frontend Engineer', 105000, 1),
(107, 'Ava Taylor', 'Content Strategist', 82000, 2);

CREATE TABLE IF NOT EXISTS orders (
    order_id INTEGER PRIMARY KEY,
    customer_name TEXT NOT NULL,
    order_date TEXT NOT NULL,
    order_amount REAL NOT NULL,
    status TEXT NOT NULL
);

INSERT INTO orders VALUES
(1001, 'Acme Corp', '2026-03-01', 450.00, 'Delivered'),
(1002, 'Globex Logistics', '2026-03-03', 120.50, 'Shipped'),
(1003, 'Initech Inc', '2026-03-04', 890.00, 'Processing'),
(1004, 'Umbrella Health', '2026-03-05', 45.00, 'Delivered'),
(1005, 'Stark Industries', '2026-03-06', 2340.00, 'Processing');
`;

  let dbInstance = null;
  let lastResultData = null;

  async function initDatabase() {
    if (dbInstance) return dbInstance;

    try {
      if (typeof initSqlJs === 'undefined') {
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/sql-wasm.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
      }

      const SQL = await initSqlJs({
        locateFile: (file) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.11.0/${file}`
      });

      dbInstance = new SQL.Database();
      dbInstance.run(SAMPLE_DB_SQL);
      return dbInstance;
    } catch (err) {
      console.warn('WASM SQLite load fallback:', err);
      throw err;
    }
  }

  if (templateSelect) {
    templateSelect.addEventListener('change', function () {
      const selected = this.value;
      if (TEMPLATES[selected]) {
        queryInput.value = TEMPLATES[selected];
      }
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', function () {
      queryInput.value = '';
      tableResultContainer.innerHTML = '<div class="p-8 text-center text-sm text-slate-500 dark:text-slate-400">Query editor cleared. Type SQL query and click "Run Query" (Ctrl+Enter).</div>';
      statusBadge.textContent = 'Ready';
      statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
      if (executionTimeEl) executionTimeEl.textContent = '0ms';
      if (rowCountEl) rowCountEl.textContent = '0 rows';
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener('click', function () {
      navigator.clipboard.writeText(queryInput.value).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        setTimeout(() => (copyBtn.textContent = originalText), 2000);
      });
    });
  }

  if (exportCsvBtn) {
    exportCsvBtn.addEventListener('click', function () {
      if (!lastResultData || !lastResultData.columns || !lastResultData.values) {
        alert('Please run a SELECT query first before exporting CSV.');
        return;
      }

      const rows = [lastResultData.columns, ...lastResultData.values];
      const csvContent = rows
        .map((r) => r.map((val) => `"${String(val ?? '').replace(/"/g, '""')}"`).join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'query_results.csv';
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  queryInput.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      runBtn.click();
    }
  });

  runBtn.addEventListener('click', async function () {
    const sql = queryInput.value.trim();
    if (!sql) {
      tableResultContainer.innerHTML = '<div class="p-4 text-rose-600 text-sm">Please write an SQL query to execute.</div>';
      return;
    }

    statusBadge.textContent = 'Executing...';
    statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 animate-pulse';
    runBtn.disabled = true;

    const startTime = performance.now();

    try {
      const db = await initDatabase();
      const results = db.exec(sql);

      const elapsed = Math.round(performance.now() - startTime);
      if (executionTimeEl) executionTimeEl.textContent = `${elapsed}ms`;

      if (!results || results.length === 0) {
        tableResultContainer.innerHTML = `
          <div class="p-6 text-emerald-600 dark:text-emerald-400 font-medium text-sm">
            Query executed successfully. Statements (CREATE, INSERT, UPDATE, DELETE) completed with 0 returned rows.
          </div>`;
        if (rowCountEl) rowCountEl.textContent = '0 rows';
        statusBadge.textContent = 'Success';
        statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';
        lastResultData = null;
        return;
      }

      const res = results[0];
      lastResultData = res;

      if (rowCountEl) rowCountEl.textContent = `${res.values.length} rows`;
      statusBadge.textContent = 'Success';
      statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300';

      let html = `<div class="overflow-x-auto"><table class="w-full text-left text-xs border-collapse"><thead><tr class="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">`;
      res.columns.forEach((col) => {
        html += `<th class="p-2.5 font-semibold text-slate-700 dark:text-slate-200">${col}</th>`;
      });
      html += `</tr></thead><tbody class="divide-y divide-slate-200 dark:divide-slate-800">`;

      res.values.forEach((row, idx) => {
        const bg = idx % 2 === 0 ? 'bg-white dark:bg-slate-900' : 'bg-slate-50 dark:bg-slate-900/50';
        html += `<tr class="${bg} hover:bg-blue-50/50 dark:hover:bg-slate-800/60">`;
        row.forEach((val) => {
          html += `<td class="p-2.5 font-mono text-slate-800 dark:text-slate-200">${val !== null ? val : '<span class="text-slate-400 italic">NULL</span>'}</td>`;
        });
        html += `</tr>`;
      });

      html += `</tbody></table></div>`;
      tableResultContainer.innerHTML = html;
    } catch (err) {
      const elapsed = Math.round(performance.now() - startTime);
      if (executionTimeEl) executionTimeEl.textContent = `${elapsed}ms`;
      if (rowCountEl) rowCountEl.textContent = '0 rows';
      tableResultContainer.innerHTML = `
        <div class="p-6 text-rose-600 dark:text-rose-400 font-mono text-xs whitespace-pre-wrap">
          [SQL Syntax Error]: ${err.message || err}
        </div>`;
      statusBadge.textContent = 'Error';
      statusBadge.className = 'text-xs px-2.5 py-1 rounded-full font-medium bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300';
    } finally {
      runBtn.disabled = false;
    }
  });

  // Pre-initialize
  setTimeout(() => initDatabase().catch(() => {}), 500);
})();
