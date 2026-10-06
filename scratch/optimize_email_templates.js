const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'email-templates');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
  const filePath = path.join(dir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  const initialLength = content.length;

  // Replace base64 images with clean /email/*.png links
  content = content.replace(/data:image\/[a-zA-Z]+;base64,[A-Za-z0-9+/=]+/g, (match) => {
    // If it's a large logo or emblem image
    if (match.length > 5000) {
      return '/email/logo.png';
    }
    return '/email/emblem.png';
  });

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`${file}: ${initialLength} -> ${content.length} bytes`);
});
