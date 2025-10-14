#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Portfolio Website for local development...\n');

// Check if Node.js is installed
try {
  const nodeVersion = execSync('node --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Node.js version: ${nodeVersion}`);
} catch (error) {
  console.error('❌ Node.js is not installed. Please install Node.js v14 or higher.');
  process.exit(1);
}

// Check if npm is available
try {
  const npmVersion = execSync('npm --version', { encoding: 'utf8' }).trim();
  console.log(`✅ npm version: ${npmVersion}`);
} catch (error) {
  console.error('❌ npm is not available. Please install npm.');
  process.exit(1);
}

// Install dependencies
console.log('\n📦 Installing dependencies...');
try {
  execSync('npm install', { stdio: 'inherit' });
  console.log('✅ Dependencies installed successfully');
} catch (error) {
  console.error('❌ Failed to install dependencies');
  process.exit(1);
}

// Check if Firebase CLI is installed
console.log('\n🔥 Checking Firebase CLI...');
try {
  const firebaseVersion = execSync('firebase --version', { encoding: 'utf8' }).trim();
  console.log(`✅ Firebase CLI version: ${firebaseVersion}`);
} catch (error) {
  console.log('⚠️  Firebase CLI not found. Installing globally...');
  try {
    execSync('npm install -g firebase-tools', { stdio: 'inherit' });
    console.log('✅ Firebase CLI installed successfully');
  } catch (installError) {
    console.error('❌ Failed to install Firebase CLI. Please install it manually: npm install -g firebase-tools');
  }
}

// Create a simple test script
const testScript = `
// Simple test to verify the website loads
console.log('🧪 Running basic tests...');

// Test if the main HTML file exists
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const requiredFiles = ['index.html', 'index.js', 'style.css'];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const filePath = path.join(publicDir, file);
  if (fs.existsSync(filePath)) {
    console.log(\`✅ \${file} exists\`);
  } else {
    console.log(\`❌ \${file} is missing\`);
    allFilesExist = false;
  }
});

if (allFilesExist) {
  console.log('✅ All required files are present');
  console.log('🎉 Setup complete! You can now run: npm run dev');
} else {
  console.log('❌ Some required files are missing');
  process.exit(1);
}
`;

fs.writeFileSync('test-setup.js', testScript);

// Run the test
console.log('\n🧪 Running setup verification...');
try {
  execSync('node test-setup.js', { stdio: 'inherit' });
  fs.unlinkSync('test-setup.js'); // Clean up
} catch (error) {
  console.error('❌ Setup verification failed');
  process.exit(1);
}

console.log('\n🎉 Development environment setup complete!');
console.log('\n📋 Next steps:');
console.log('1. Run "npm run dev" to start the development server');
console.log('2. Open http://localhost:3000 in your browser');
console.log('3. Start coding! 🚀');
console.log('\n💡 Other useful commands:');
console.log('- npm run firebase:emulators (test with Firebase emulators)');
console.log('- npm run build (deploy to Firebase)');
console.log('- npm run firebase:serve (serve with Firebase CLI)');
