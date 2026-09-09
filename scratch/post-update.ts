import { createAdminToken } from '../src/lib/auth.ts';

async function update() {
  const token = await createAdminToken('Manisha', 4);
  const currentRes = await fetch('http://localhost:4321/api/adsense-config/');
  const current = await currentRes.json();
  
  current.testMode = true;
  current.slots.sidebar.enabled = true;

  const saveRes = await fetch('http://localhost:4321/api/adsense-config/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(current)
  });

  const result = await saveRes.json();
  console.log('Save result:', result.success ? 'SUCCESS' : result);
}

update();
