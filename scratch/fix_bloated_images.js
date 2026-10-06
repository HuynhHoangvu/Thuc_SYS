const fs = require('fs');
const path = require('path');

const cleanBase64 = fs.readFileSync('public/email/emblem.png').toString('base64');

const files = [
  'email-templates/thong-bao-lich-phong-van.html',
  'email-templates/thu-cam-on-catholic-mta-georgia-italic.html'
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const beforeLen = content.length;
  content = content.replace(/data:image\/png;base64,iVBORw0KGgoAAAANSUhEUgAACAAAAAaq[\s\S]*?(?=")/g, 'data:image/png;base64,' + cleanBase64);
  fs.writeFileSync(file, content);
  console.log(`${file}: ${beforeLen} -> ${content.length} bytes`);
});
