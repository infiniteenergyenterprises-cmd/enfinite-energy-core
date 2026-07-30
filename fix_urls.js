const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const frontendDir = path.join(__dirname, 'frontend', 'src');

walkDir(frontendDir, function(filePath) {
    if (filePath.endsWith('.ts') || filePath.endsWith('.tsx')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;

        // Replace backtick syntax: `http://localhost:5000/api/upload` -> `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/upload`
        content = content.replace(/`http:\/\/localhost:5000\/api/g, "`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}");
        
        // Replace single quote syntax: 'http://localhost:5000/api/auth/login' -> (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/auth/login'
        // Using a regex to capture the rest of the string
        content = content.replace(/'http:\/\/localhost:5000\/api([^']*)'/g, "(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '$1'");
        
        // Replace double quote syntax
        content = content.replace(/"http:\/\/localhost:5000\/api([^"]*)"/g, "(process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + \"$1\"");

        // Replace standalone assignments like: const API = 'http://localhost:5000';
        content = content.replace(/'http:\/\/localhost:5000'/g, "(process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api', '') : 'http://localhost:5000')");

        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log('Updated: ' + filePath);
        }
    }
});
