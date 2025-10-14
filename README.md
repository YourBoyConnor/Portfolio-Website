# Portfolio-Website
My portfolio website built with HTML, CSS, JavaScript, and Firebase hosting.

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)
- Firebase CLI (for deployment)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YourBoyConnor/Portfolio-Website.git
   cd Portfolio-Website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Firebase CLI globally** (if not already installed)
   ```bash
   npm install -g firebase-tools
   ```

## 🛠️ Development

### Local Development Server
Start a local development server with live reload:
```bash
npm run dev
# or
npm start
```
This will start the server at `http://localhost:3000` and automatically open your browser.

### Firebase Local Emulator
For testing Firebase hosting locally:
```bash
npm run firebase:emulators
```
This starts Firebase emulators at:
- Website: `http://localhost:5000`
- Firebase UI: `http://localhost:4000`

### Firebase Serve (Alternative)
Use Firebase's built-in serve command:
```bash
npm run firebase:serve
```

## 🏗️ Building & Deployment

### Local Build
Since this is a static website, no build step is required. The files in the `public/` directory are ready to serve.

```bash
npm run build:local
```

### Firebase Deployment
Deploy to Firebase hosting:
```bash
npm run build
# or
npm run build:firebase
```

## 📁 Project Structure

```
Portfolio-Website/
├── public/                 # Static website files
│   ├── index.html         # Main HTML file
│   ├── index.js           # JavaScript functionality
│   ├── style.css          # CSS styles
│   ├── Images/            # Image assets
│   └── resume.pdf         # Resume file
├── Libraries/             # Custom JavaScript libraries
│   ├── three.js          # Three.js for 3D graphics
│   ├── ammo.js           # Physics engine
│   ├── physics.js        # Physics implementation
│   └── light.js          # Lighting utilities
├── App.js                # Firebase configuration
├── firebase.json         # Firebase hosting configuration
├── .firebaserc           # Firebase project configuration
└── package.json          # Project dependencies and scripts
```

## 🧪 Testing

Currently, no automated tests are configured. The website can be tested manually by:
1. Running the development server
2. Testing all navigation links
3. Verifying responsive design on different screen sizes
4. Checking browser console for any JavaScript errors

## 📝 Available Scripts

- `npm run dev` - Start development server with live reload
- `npm start` - Alias for dev command
- `npm run build` - Deploy to Firebase hosting
- `npm run build:firebase` - Deploy to Firebase hosting
- `npm run build:local` - Show local build info
- `npm run firebase:emulators` - Start Firebase emulators
- `npm run firebase:serve` - Serve with Firebase CLI
- `npm test` - Run tests (not configured yet)
- `npm run lint` - Run linter (not configured yet)

## 🔧 Configuration

### Firebase Configuration
The Firebase configuration is in `App.js`. Make sure to update the configuration if you're using a different Firebase project.

### Development Server
The development server runs on port 3000 by default. You can change this by modifying the `dev` script in `package.json`.

## 🚀 Deployment

The website is configured for Firebase hosting. To deploy:

1. Make sure you're logged in to Firebase:
   ```bash
   firebase login
   ```

2. Deploy the website:
   ```bash
   npm run build
   ```

## 📱 Features

- Responsive design with mobile hamburger menu
- Intersection Observer API for scroll animations
- Firebase Analytics integration
- Modern CSS with smooth transitions
- SVG logo with PNG fallback

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test locally
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.
