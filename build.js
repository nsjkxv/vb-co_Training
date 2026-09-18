const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = __dirname;
const appDir = path.join(root, 'app');
const distDir = path.join(root, 'dist');

function copyDir(src, dest) {
    fs.cpSync(src, dest, {
        recursive: true,
        filter: (source) => !source.endsWith('.DS_Store'),
    });
}

fs.rmSync(distDir, { recursive: true, force: true });
fs.mkdirSync(path.join(distDir, 'assets'), { recursive: true });

execSync(
    'npx @tailwindcss/cli -i ./app/src/styles/input.css -o ./dist/assets/main.css --minify',
    { stdio: 'inherit', cwd: root }
);

copyDir(path.join(appDir, 'content'), path.join(distDir, 'content'));
copyDir(path.join(appDir, 'src', 'scripts'), path.join(distDir, 'src', 'scripts'));

fs.mkdirSync(path.join(distDir, 'src', 'styles'), { recursive: true });
fs.copyFileSync(
    path.join(appDir, 'src', 'styles', 'reset.css'),
    path.join(distDir, 'src', 'styles', 'reset.css')
);

let html = fs.readFileSync(path.join(appDir, 'index.html'), 'utf8');
html = html
    .split('/app/assets/main.css').join('/assets/main.css')
    .split('/app/src/').join('/src/');
fs.writeFileSync(path.join(distDir, 'index.html'), html);

console.log('Build complete: ./dist');
