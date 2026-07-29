const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? 
      walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

const dirsToProcess = [
  path.join(__dirname, 'frontend/src/components/sections'),
  path.join(__dirname, 'frontend/src/app')
];

const replacements = {
  'py-24': 'py-12',
  'py-20': 'py-10',
  'py-16': 'py-8',
  'pt-24': 'pt-12',
  'pt-20': 'pt-10',
  'pt-16': 'pt-8',
  'pb-24': 'pb-12',
  'pb-20': 'pb-10',
  'pb-16': 'pb-8',
  'mt-24': 'mt-12',
  'mt-20': 'mt-10',
  'mt-16': 'mt-8',
  'mb-24': 'mb-12',
  'mb-20': 'mb-10',
  'mb-16': 'mb-8',
};

dirsToProcess.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  walkDir(dir, (filePath) => {
    if (!filePath.endsWith('.tsx') && !filePath.endsWith('.ts')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    let modified = content;
    
    // Replace all occurrences using regex to match exact class names
    Object.keys(replacements).forEach(oldClass => {
      const newClass = replacements[oldClass];
      const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
      modified = modified.replace(regex, newClass);
    });

    if (content !== modified) {
      fs.writeFileSync(filePath, modified, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  });
});

console.log("Gap reduction complete.");
