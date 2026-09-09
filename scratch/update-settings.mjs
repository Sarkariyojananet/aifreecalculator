import fs from 'node:fs';
import path from 'node:path';

const filePath = path.join(process.cwd(), '.site-settings.json');
let data = {};
if (fs.existsSync(filePath)) {
  data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const currentConfig = data['adsense_config'] ? JSON.parse(data['adsense_config']) : {};

// Get config from running dev server
fetch('http://localhost:4321/api/adsense-config/')
  .then(r => r.json())
  .then(cfg => {
    cfg.testMode = true;
    cfg.slots.sidebar.enabled = true;
    data['adsense_config'] = JSON.stringify(cfg);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    console.log('Successfully wrote updated adsense_config with sidebar.enabled=true to .site-settings.json');
  })
  .catch(err => {
    console.error('Error:', err);
  });
