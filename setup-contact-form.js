const { execSync } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

async function setupContactForm() {
  console.log('🚀 Setting up Contact Form for Firebase Functions...\n');

  try {
    // 1. Install Functions dependencies
    console.log('📦 Installing Firebase Functions dependencies...');
    execSync('npm run functions:install', { stdio: 'inherit' });

    // 2. Build Functions
    console.log('\n🔨 Building Firebase Functions...');
    execSync('npm run functions:build', { stdio: 'inherit' });

    // 3. Get email configuration
    console.log('\n📧 Email Configuration Setup');
    console.log('You need to set up Gmail App Password for sending emails.\n');
    console.log('Steps:');
    console.log('1. Go to https://myaccount.google.com/security');
    console.log('2. Enable 2-Factor Authentication if not already enabled');
    console.log('3. Go to "App passwords" and generate a new app password');
    console.log('4. Use your Gmail address and the app password below\n');

    const gmailUser = await question('Enter your Gmail address: ');
    const gmailPassword = await question('Enter your Gmail App Password: ');

    // 4. Set Firebase config
    console.log('\n⚙️ Setting Firebase configuration...');
    execSync(`firebase functions:config:set gmail.user="${gmailUser}"`, { stdio: 'inherit' });
    execSync(`firebase functions:config:set gmail.password="${gmailPassword}"`, { stdio: 'inherit' });

    // 5. Deploy Functions
    console.log('\n🚀 Deploying Firebase Functions...');
    execSync('npm run functions:deploy', { stdio: 'inherit' });

    console.log('\n✅ Contact form setup complete!');
    console.log('\n📋 Next steps:');
    console.log('1. Test the contact form on your website');
    console.log('2. Check your email for test messages');
    console.log('3. Monitor Firebase Functions logs: firebase functions:log');
    console.log('\n🎉 Your contact form is now live!');

  } catch (error) {
    console.error('\n❌ Error setting up contact form:', error.message);
    console.log('\n🔧 Manual setup required:');
    console.log('1. Run: npm run functions:install');
    console.log('2. Run: npm run functions:build');
    console.log('3. Set config: firebase functions:config:set gmail.user="your-email@gmail.com"');
    console.log('4. Set config: firebase functions:config:set gmail.password="your-app-password"');
    console.log('5. Deploy: npm run functions:deploy');
  } finally {
    rl.close();
  }
}

setupContactForm();
