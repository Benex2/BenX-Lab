# BenX Lab

**Premium Dark-Themed Educational Platform with WASSCE Study Tools, AI Hub, Terminal OS, and Smart Dictionary for Android**

## 🎯 Overview

BenX Lab is a React Native/Expo-based mobile application designed for Ghanaian students preparing for WASSCE (West African Senior School Certificate Examination). It provides comprehensive study tools, AI-powered learning assistance, and interactive programming tutorials for tech-focused learners.

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

### 3. **Programming & Coding Hub** ⭐ NEW
- **Interactive Code Editor**
   - Syntax highlighting for multiple languages
   - Live code execution environment
   - Real-time error reporting
   
- **Programming Tracks**
   - **Python Fundamentals** — Variables, loops, functions, and data structures
   - **JavaScript Essentials** — Web development basics and DOM manipulation
   - **Web Development** — HTML, CSS, and responsive design
   - **Mobile App Development** — React Native basics
   - **Data Structures & Algorithms** — Problem-solving techniques
   - **Database Fundamentals** — SQL and NoSQL concepts
   
- **Learning Resources**
   - Step-by-step tutorials with code examples
   - Interactive coding challenges
   - Project-based learning modules
   - Code snippet library with search
   
- **Practice Arena**
   - Coding challenges with difficulty levels (Beginner → Advanced)
   - Automated test cases and instant feedback
   - Leaderboard for competitive learners
   - Solution explanations and best practices
   
- **Code Reference**
   - Language-specific documentation
   - Common patterns and idioms
   - Performance optimization tips

### 4. **Terminal OS**
- Interactive command-line canvas
- Linux terminal-style interface
- System commands: `help`, `status`, `run`, `clear`
- Real-time command processing
- System logs output

### 5. **AI Hub**
- Multi-model gateway with support for:
   - DeepSeek-R1
   - Claude 3.5 Sonnet
   - Gemini 1.5 Flash
   - ChatGPT-4o
- Toggle for "Resident Offline AI" mode
- Markdown code block support
- Interactive chat interface
- Quick-prompt chips
- **AI Code Assistant** — Get help with programming questions

### 6. **Smart Dictionary**
- Academic and English vocabulary search
- Detailed word information:
   - Word title and phonetics
   - Definition and example sentences
   - "WASSCE ESSENTIAL" badge for exam-relevant terms
- Real-time filtering
- Programming terminology support

## 🔧 Technical Stack

- **Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs + Stack)
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Payment Gateway**: Paystack
- **Updates**: Expo Updates
- **UI Components**: React Native core + Expo components
- **Icons**: Expo Vector Icons
- **Code Execution**: Monaco Editor / CodeSandbox API (optional)

## 📦 Project Structure

```
BenX-Lab/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.js
│   │   ├── StudyVaultScreen.js
│   │   ├── ProgrammingHubScreen.js      [NEW]
│   │   ├── CodeEditorScreen.js          [NEW]
│   │   ├── CodingChallengesScreen.js    [NEW]
│   │   ├── TerminalScreen.js
│   │   ├── AIHubScreen.js
│   │   └── DictionaryScreen.js
│   ├── components/
│   │   ├── Icons.js
│   │   ├── CodeEditor.js                [NEW]
│   │   ├── CodeHighlighter.js           [NEW]
│   │   └── ChallengeCard.js             [NEW]
│   ├── context/
│   │   ├── ThemeContext.js
│   │   ├── SubscriptionContext.js
│   │   └── ProgressContext.js           [NEW]
│   ├── services/
│   │   ├── codeExecutor.js              [NEW]
│   │   ├── programmingAPI.js            [NEW]
│   │   └── challengeService.js          [NEW]
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
- **Free**: Ad-supported, limited coding challenges
- **Premium (GH₵ 10)**: Ad-free + offline study materials + 50 coding challenges
- **Pro (GH₵ 30)**: All features + priority AI support + unlimited challenges + code mentorship

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

### ProgressContext [NEW]
- Tracks user coding progress
- Manages challenge completion status
- Stores learning milestones

## 🤝 Contributing

Contributions are welcome! Please follow the established project structure and coding standards.

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and feature requests, please visit the [Issues](https://github.com/Benex2/BenX-Lab/issues) page.

---

**Made with ❤️ for Ghanaian Students**
