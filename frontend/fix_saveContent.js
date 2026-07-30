const fs = require('fs');
const paths = [
  'src/app/admin/pages/page.tsx',
  'src/app/admin/solutions/page.tsx',
  'src/app/admin/our-work/page.tsx',
  'src/app/admin/careers/page.tsx'
];

paths.forEach(p => {
  if (fs.existsSync(p)) {
    let c = fs.readFileSync(p, 'utf8');
    
    // Replace saveContent
    c = c.replace(/async function saveContent\([^)]+\)\s*\{[\s\S]*?await fetch\([\s\S]*?body:\s*JSON\.stringify\(\{(.*?)\}\),?\s*\}\);\s*\}/, (match, bodyContent) => {
      // Extract the arguments
      const argsMatch = match.match(/async function saveContent\(([^)]+)\)/);
      const args = argsMatch ? argsMatch[1] : 'key: string, name: string, title: string, desc: string, img: string';
      
      return \sync function saveContent(\) {
  try {
    const res = await fetch(\\\\/api/content\\\, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({\})
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      alert('Error saving: ' + (err.message || 'Server error'));
      throw new Error('Save failed');
    }
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('content-updated'));
      try { new BroadcastChannel('enfinite-content-sync').postMessage({ type: 'INVALIDATE_CONTENT' }); } catch(e) {}
    }
  } catch (err) {
    console.error(err);
    throw err;
  }
}\;
    });
    
    fs.writeFileSync(p, c);
    console.log('Fixed saveContent in ' + p);
  }
});
