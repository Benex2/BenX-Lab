# Environment Configuration Guide

This document provides instructions for setting up API keys and environment variables for BenX Lab.

## Prerequisites

Before starting, ensure you have:
- Node.js >= 16
- Expo CLI installed
- A text editor for editing files
- API keys from the respective AI model providers

---

## 1. Create Environment Files

### Step 1: Create `.env` file

Create a file named `.env` in the root directory of your project:

```bash
touch .env
```

### Step 2: Create `.env.local` file (for local development)

```bash
touch .env.local
```

### Step 3: Update `.gitignore`

Ensure your `.gitignore` file includes:

```
.env
.env.local
.env.*.local
*.jks
*.keystore
```

---

## 2. Paystack Configuration

### Get Paystack API Keys

1. Visit [Paystack Dashboard](https://dashboard.paystack.com)
2. Sign up or log in to your account
3. Navigate to **Settings → API Keys & Webhooks**
4. Copy your **Public Key** and **Secret Key**

### Add to `.env` file

```env
# Paystack
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
REACT_APP_PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
```

### Create Payment Plans in Paystack

1. Log in to Paystack Dashboard
2. Go to **Products → Plans**
3. Create the following plans:

**Premium Plan:**
- Name: BenX Lab Premium
- Amount: 1000 (GH₵ 10)
- Billing Cycle: Monthly
- Plan Code: `PLN_premium_benx`

**Pro Plan:**
- Name: BenX Lab Pro
- Amount: 3000 (GH₵ 30)
- Billing Cycle: Monthly
- Plan Code: `PLN_pro_benx`

---

## 3. AI Models API Configuration

### A. OpenAI (ChatGPT)

1. Visit [OpenAI Platform](https://platform.openai.com)
2. Sign up or log in
3. Go to **API keys** section
4. Create a new API key
5. Copy the key

Add to `.env`:

```env
# OpenAI / ChatGPT
REACT_APP_OPENAI_API_KEY=sk-xxxxxxxxxxxxx
```

### B. Google Gemini

1. Visit [Google AI Studio](https://aistudio.google.com)
2. Click **Get API key**
3. Create a new API key for your project
4. Copy the key

Add to `.env`:

```env
# Google Gemini
REACT_APP_GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxx
```

### C. Anthropic (Claude)

1. Visit [Anthropic Console](https://console.anthropic.com)
2. Sign up or log in
3. Navigate to **API Keys**
4. Create a new API key
5. Copy the key

Add to `.env`:

```env
# Anthropic Claude
REACT_APP_CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxx
```

### D. xAI (Grok)

1. Visit [xAI Console](https://console.x.ai)
2. Sign up or log in
3. Create an API key in the dashboard
4. Copy the key

Add to `.env`:

```env
# xAI Grok
REACT_APP_GROK_API_KEY=sk_live_xxxxxxxxxxxxx
```

### E. DeepSeek

1. Visit [DeepSeek API](https://platform.deepseek.com)
2. Sign up or log in
3. Go to **API Keys**
4. Create a new API key
5. Copy the key

Add to `.env`:

```env
# DeepSeek
REACT_APP_DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxx
```

---

## 4. Complete `.env` Template

```env
# ==========================================
# PAYMENT CONFIGURATION
# ==========================================
REACT_APP_PAYSTACK_PUBLIC_KEY=pk_test_xxxxxxxxxxxxx
REACT_APP_PAYSTACK_SECRET_KEY=sk_test_xxxxxxxxxxxxx

# ==========================================
# AI MODELS CONFIGURATION
# ==========================================

# OpenAI ChatGPT
REACT_APP_OPENAI_API_KEY=sk-xxxxxxxxxxxxx

# Google Gemini
REACT_APP_GEMINI_API_KEY=AIzaSyxxxxxxxxxxxxx

# Anthropic Claude
REACT_APP_CLAUDE_API_KEY=sk-ant-xxxxxxxxxxxxx

# xAI Grok
REACT_APP_GROK_API_KEY=sk_live_xxxxxxxxxxxxx

# DeepSeek
REACT_APP_DEEPSEEK_API_KEY=sk-xxxxxxxxxxxxx

# ==========================================
# APP CONFIGURATION
# ==========================================
REACT_APP_ENV=development
REACT_APP_API_URL=http://localhost:3000
REACT_APP_DEBUG=true
```

---

## 5. Loading Environment Variables in App

### Update `App.js`

```javascript
import { useEffect } from 'react';
import * as aiModelsService from './src/services/aiModelsService';
import { PaymentProvider } from './src/context/PaymentContext';

export default function App() {
  useEffect(() => {
    // Initialize AI Models with API keys
    aiModelsService.setAIApiKeys({
      grok: process.env.REACT_APP_GROK_API_KEY,
      gemini: process.env.REACT_APP_GEMINI_API_KEY,
      chatgpt: process.env.REACT_APP_OPENAI_API_KEY,
      claude: process.env.REACT_APP_CLAUDE_API_KEY,
      deepseek: process.env.REACT_APP_DEEPSEEK_API_KEY,
    });
  }, []);

  return (
    <PaymentProvider>
      {/* Your app content */}
    </PaymentProvider>
  );
}
```

---

## 6. Running the App

### Development

```bash
npm install
npm start
# or
expo start
```

### Android

```bash
npm run android
# or press 'a' in Expo CLI
```

### Production Build

```bash
npm run build:android
```

---

## 7. Best Practices & Security

### ✅ DO:
- Store API keys in `.env` files
- Add `.env` to `.gitignore`
- Rotate API keys regularly
- Use different keys for dev/staging/production
- Monitor API usage and costs
- Use restricted API key permissions

### ❌ DON'T:
- Commit `.env` files to Git
- Share API keys in chat or emails
- Use the same key for multiple projects
- Expose keys in frontend code
- Push production keys to GitHub

---

## 8. API Cost Estimation

### Monthly Costs (Estimated)

| Service | Free Tier | Paid Tier | Notes |
|---------|-----------|-----------|-------|
| **OpenAI ChatGPT-4o** | $5/month | $0.03-0.15/1K tokens | Most expensive |
| **Google Gemini** | Free | $0.0001-0.0006/1K tokens | Most affordable |
| **Anthropic Claude** | No free tier | $0.003-0.024/1K tokens | Good balance |
| **xAI Grok** | No free tier | $0.02/1K tokens | Reasonable |
| **DeepSeek** | Free | $0.0014-0.0028/1K tokens | Very cheap |

**Recommendation**: Start with free/trial tier, then upgrade based on usage.

---

## 9. Testing API Integration

### Test Script

Create `src/services/testAI.js`:

```javascript
import * as aiModelsService from './aiModelsService';

export const testAllModels = async () => {
  const testMessage = "Explain the concept of variables in programming in one sentence.";
  
  const models = aiModelsService.getConfiguredModels();
  
  for (const model of models) {
    try {
      console.log(`Testing ${model.name}...`);
      const result = await aiModelsService.chatWithAI(
        testMessage,
        model.id
      );
      
      if (result.success) {
        console.log(`✅ ${model.name}: ${result.response.substring(0, 100)}...`);
      } else {
        console.log(`❌ ${model.name}: ${result.error}`);
      }
    } catch (error) {
      console.log(`⚠️ ${model.name}: Error - ${error.message}`);
    }
  }
};
```

---

## 10. Troubleshooting

### Issue: "Invalid API Key"
**Solution**: 
- Verify the key is copied correctly (no extra spaces)
- Check if the key is active in the provider's dashboard
- Ensure you're using the correct key type (public/secret)

### Issue: "Rate limit exceeded"
**Solution**:
- Implement request throttling
- Use caching for repeated queries
- Check provider's pricing tier

### Issue: ".env variables not loading"
**Solution**:
- Restart the Expo server
- Ensure variables start with `REACT_APP_`
- Check file encoding is UTF-8

### Issue: "Module not found" errors
**Solution**:
```bash
npm install
# or
yarn install
expo start --clear
```

---

## 11. Support & Resources

- **Paystack Docs**: https://paystack.com/docs
- **OpenAI API**: https://platform.openai.com/docs
- **Google Gemini**: https://ai.google.dev
- **Anthropic Claude**: https://docs.anthropic.com
- **xAI Grok**: https://docs.x.ai
- **DeepSeek**: https://github.com/deepseek-ai

---

## 12. Next Steps

1. ✅ Create `.env` file with all API keys
2. ✅ Set up Paystack payment plans
3. ✅ Test AI model integrations
4. ✅ Deploy to production with secure key management
5. ✅ Monitor API usage and costs

**Last Updated**: September 2026
