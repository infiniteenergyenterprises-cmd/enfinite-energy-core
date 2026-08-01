const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.tsx') || file.endsWith('.ts')) results.push(file);
    }
  });
  return results;
}

const files = walk('./src/app');
let fixed = 0;
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  if (content.includes('\'use client\'') || content.includes('\"use client\"')) {
    // Remove export const dynamic and export const revalidate
    content = content.replace(/^export\s+const\s+dynamic\s*=\s*['"]force-dynamic['"];?\s*$/gm, '');
    content = content.replace(/^export\s+const\s+revalidate\s*=\s*0;?\s*$/gm, '');
    
    // Ensure 'use client' is at the top
    if (!content.trim().startsWith('\'use client\'') && !content.trim().startsWith('\"use client\"')) {
      content = content.replace(/^['"]use client['"];?\s*$/gm, '');
      content = '\"use client\";\n' + content.trimStart();
    }
    
    if (content !== original) {
      fs.writeFileSync(file, content);
      console.log('Fixed', file);
      fixed++;
    }
  }
});
console.log('Fixed ' + fixed + ' files.');
