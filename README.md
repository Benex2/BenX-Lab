# BenX Lab

**Premium Dark-Themed Educational Platform with WASSCE Study Tools, AI Hub, Terminal OS, and Smart Dictionary for Android**

## 🎯 Overview

BenX Lab is a React Native/Expo-based mobile application designed for Ghanaian students preparing for WASSCE (West African Senior School Certificate Examination). It provides comprehensive study tools, AI tutoring, and an innovative offline-capable learning experience.

## 🎨 Design System

### Color Palette
- **Background**: `#0A0B0E` (Deep Command Dark)
- **Card Fill**: `#121318` (Dark Gray)
- **Primary Accent**: `#00E676` (Emerald Green)
- **Secondary Accent**: `#00B0FF` (Electric Cyan)
- **Accent**: `#FF6B9D` (Rose Pink)

### Theme Features
- Modern dark command-center aesthetic
- Accessible contrast ratios
- Consistent spacing and typography system

## 📱 Features

### 1. **Home Dashboard**
- Daily study streak counter
- Recent WASSCE practice scores
- Quick action launch cards
- Subscription status display
- Offline model readiness indicator

### 2. **Study Vault**
- Filterable subject list:
  - Elective Mathematics
  - Integrated Science
  - Physics
  - Chemistry
  - Social Studies
- WASSCE past question repository
- Step-by-step solution logic
- Marking scheme references

### 3. **Terminal OS**
- Interactive command-line canvas
- Linux terminal-style interface
- System commands: `help`, `status`, `run`, `clear`
- Real-time command processing
- System logs output

### 4. **AI Hub**
- Multi-model gateway with support for:
  - DeepSeek-R1
  - Claude 3.5 Sonnet
  - Gemini 1.5 Flash
  - ChatGPT-4o
- Toggle for "Resident Offline AI" mode
- Markdown code block support
- Interactive chat interface
- Quick-prompt chips

### 5. **Smart Dictionary**
- Academic and English vocabulary search
- Detailed word information:
  - Word title and phonetics
  - Definition and example sentences
  - "WASSCE ESSENTIAL" badge for exam-relevant terms
- Real-time filtering

## 🔧 Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Payment Gateway**: Paystack
- **Updates**: Expo Updates
- **UI Components**: React Native core + Expo components
- **Icons**: Expo Vector Icons

## 📦 Project Structure

```
BenX-Lab/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── StudyVaultScreen.js
│   │   ├── TerminalScreen.js
│   │   ├── AIHubScreen.js
│   │   └── DictionaryScreen.js
│   ├── components/
│   │   └── Icons.js
│   ├── context/
│   │   ├── ThemeContext.js
│   │   └── SubscriptionContext.js
│   └── theme/
│       ├── colors.js
│       ├── typography.js
│       └── spacing.js
├── App.js
├── app.json
└── package.json
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16
- Expo CLI: `npm install -g expo-cli`
- Android Studio or Android SDK

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Benex2/BenX-Lab.git
   cd BenX-Lab
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm start
   # or
   expo start
   ```

4. Run on Android:
   ```bash
   npm run android
   # or press 'a' in the Expo CLI
   ```

## 🔨 Build for Production

### Building APK

```bash
npm run build:android
```

### Submitting to Play Store

```bash
npm run submit:android
```

## 💳 Paystack Integration

Paystack payment integration is configured for Ghanaian Mobile Money support:
- MTN MoMo
- Telecel Cash
- AT Money

Subscription tiers:
- **Free**: Ad-supported
- **Premium (GH₵ 10)**: Ad-free + offline study materials
- **Pro (GH₵ 30)**: All features + priority AI support

## 🔄 Auto-Update Handler

The app includes automatic update detection:
- Checks remote `version.json` on startup
- Displays download modal with progress bar
- Triggers package installation flow
- Zero-downtime updates with Expo Updates

## 📚 Context & State Management

### ThemeContext
- Provides centralized theme configuration
- Colors, typography, and spacing scales
- Used throughout all screens

### SubscriptionContext
- Manages user subscription tier
- Handles offline mode toggle
- Persists subscription data to AsyncStorage

## 🤝 Contributing

Contributions are welcome! Please follow the established project structure and coding standards.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and feature requests, please visit the [Issues](https://github.com/Benex2/BenX-Lab/issues) page.

---

**Made with ❤️ for Ghanaian Students**
