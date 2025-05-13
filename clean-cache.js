// Este script limpa o cache do TypeScript e do Next.js
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Limpar diretório .next se existir
const nextDir = path.resolve('.next');
if (fs.existsSync(nextDir)) {
  console.log('Removendo diretório .next...');
  if (process.platform === 'win32') {
    try {
      execSync('rmdir /s /q .next', { stdio: 'inherit' });
    } catch (e) {
      console.log('Erro ao remover .next, tentando método alternativo...');
      fs.rmSync(nextDir, { recursive: true, force: true });
    }
  } else {
    fs.rmSync(nextDir, { recursive: true, force: true });
  }
}

// Remover arquivos tsbuildinfo
const tsBuildInfoFiles = [
  path.resolve('tsconfig.tsbuildinfo'),
  path.resolve('.tsbuildinfo'),
];

tsBuildInfoFiles.forEach(file => {
  if (fs.existsSync(file)) {
    console.log(`Removendo ${file}...`);
    fs.unlinkSync(file);
  }
});

console.log('Cache limpo. Execute "npm run build" para compilar o projeto novamente.'); 