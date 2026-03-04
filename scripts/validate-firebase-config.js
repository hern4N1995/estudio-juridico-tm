#!/usr/bin/env node

/**
 * Firebase Configuration Validator
 * Verifica que todas las variables de entorno de Firebase estén configuradas
 */

const fs = require('fs');
const path = require('path');

const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n${colors.cyan}${msg}${colors.reset}\n${colors.blue}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`),
};

const REQUIRED_ENV_VARS = [
  'NEXT_PUBLIC_FIREBASE_API_KEY',
  'NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN',
  'NEXT_PUBLIC_FIREBASE_DATABASE_URL',
  'NEXT_PUBLIC_FIREBASE_PROJECT_ID',
  'NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET',
  'NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  'NEXT_PUBLIC_FIREBASE_APP_ID',
];

const OPTIONAL_ENV_VARS = [
  'NEXT_PUBLIC_GOOGLE_CLIENT_ID',
  'NEXT_PUBLIC_FACEBOOK_APP_ID',
];

function validateEnvFile() {
  log.title('Verificando archivo .env.local');

  const envLocalPath = path.join(process.cwd(), '.env.local');
  
  if (!fs.existsSync(envLocalPath)) {
    log.error('.env.local no encontrado');
    log.info('Crear archivo .env.local basado en .env.local.example');
    return false;
  }

  log.success('.env.local encontrado');

  const envContent = fs.readFileSync(envLocalPath, 'utf-8');
  const envVars = {};
  
  envContent.split('\n').forEach((line) => {
    const [key, value] = line.split('=');
    if (key && value && !key.startsWith('#')) {
      envVars[key.trim()] = value.trim();
    }
  });

  let allValid = true;

  log.info('\nVariables REQUERIDAS:');
  REQUIRED_ENV_VARS.forEach((varName) => {
    if (envVars[varName] && envVars[varName] !== 'your_value_here') {
      log.success(`${varName}`);
    } else {
      log.error(`${varName} - No configurada o vacía`);
      allValid = false;
    }
  });

  log.info('\nVariables OPCIONALES (para OAuth):');
  OPTIONAL_ENV_VARS.forEach((varName) => {
    if (envVars[varName]) {
      log.success(`${varName}`);
    } else {
      log.warning(`${varName} - No configurada (OAuth limitado)`);
    }
  });

  return allValid;
}

function validateProjectStructure() {
  log.title('Verificando estructura del proyecto');

  const requiredFiles = [
    'src/lib/firebase.ts',
    'src/lib/firebase-auth.ts',
    'src/lib/firebase-db.ts',
    'src/lib/types.ts',
    'src/components/auth-button.tsx',
    'src/components/testimonial-form.tsx',
    'src/components/testimonials-section.tsx',
    'src/hooks/use-auth.ts',
  ];

  let allExist = true;

  requiredFiles.forEach((file) => {
    const filePath = path.join(process.cwd(), file);
    if (fs.existsSync(filePath)) {
      log.success(file);
    } else {
      log.error(`${file} - No encontrado`);
      allExist = false;
    }
  });

  return allExist;
}

function main() {
  console.clear();
  console.log(`${colors.cyan}
╔═══════════════════════════════════════════════════════════╗
║                                                           ║
║     Firebase Configuration Validator                      ║
║     Sistema Jurídico - Estudio Jurídico                  ║
║                                                           ║
╚═══════════════════════════════════════════════════════════╝
  ${colors.reset}\n`);

  const envValid = validateEnvFile();
  const projectValid = validateProjectStructure();

  log.title('Resultado de Validación');

  if (envValid && projectValid) {
    log.success('¡Toda la configuración está lista!');
    log.info('\nPróximos pasos:');
    log.info('1. Crear proyecto en Firebase Console: https://console.firebase.google.com');
    log.info('2. Completar .env.local con credenciales de Firebase');
    log.info('3. Ejecutar: npm run dev');
    console.log('\n' + colors.green + '✓ El proyecto está listo para usar' + colors.reset + '\n');
    process.exit(0);
  } else {
    log.error('Hay problemas con la configuración');
    if (!envValid) {
      log.info('\n📝 Para configurar .env.local:');
      log.info('1. Copiar .env.local.example a .env.local');
      log.info('2. Llenar con credenciales de Firebase');
      log.info('3. Ver FIREBASE_VISUAL_GUIDE.md para instrucciones paso a paso');
    }
    if (!projectValid) {
      log.error('Algunos archivos del proyecto no existen');
      log.info('Ejecutar: npm install');
    }
    console.log('\n' + colors.red + '✗ Hay configuraciones faltantes' + colors.reset + '\n');
    process.exit(1);
  }
}

main();
