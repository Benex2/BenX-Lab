/**
 * AI Models Service
 * Manages multiple AI model integrations (Grok, Gemini, ChatGPT, Claude, DeepSeek)
 * Handles API requests, streaming responses, and model selection
 */

import axios from 'axios';

// API Configuration
const AI_MODELS = {
  GROK: {
    id: 'grok',
    name: 'Grok',
    provider: 'xAI',
    apiUrl: 'https://api.x.ai/v1/chat/completions',
    model: 'grok-2',
    maxTokens: 8000,
    description: 'Fast and powerful reasoning model by xAI',
  },
  GEMINI: {
    id: 'gemini',
    name: 'Gemini',
    provider: 'Google',
    apiUrl: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    model: 'gemini-pro',
    maxTokens: 2000,
    description: 'Google\'s multimodal AI model',
  },
  CHATGPT: {
    id: 'chatgpt',
    name: 'ChatGPT',
    provider: 'OpenAI',
    apiUrl: 'https://api.openai.com/v1/chat/completions',
    model: 'gpt-4o',
    maxTokens: 2000,
    description: 'Advanced reasoning from OpenAI',
  },
  CLAUDE: {
    id: 'claude',
    name: 'Claude',
    provider: 'Anthropic',
    apiUrl: 'https://api.anthropic.com/v1/messages',
    model: 'claude-3-5-sonnet-20241022',
    maxTokens: 4096,
    description: 'Advanced AI with superior reasoning by Anthropic',
  },
  DEEPSEEK: {
    id: 'deepseek',
    name: 'DeepSeek',
    provider: 'DeepSeek',
    apiUrl: 'https://api.deepseek.com/v1/chat/completions',
    model: 'deepseek-chat',
    maxTokens: 4096,
    description: 'Fast and efficient open-source model',
  },
};

// API Keys (to be set from environment variables or AsyncStorage)
let apiKeys = {
  grok: process.env.REACT_APP_GROK_API_KEY || '',
  gemini: process.env.REACT_APP_GEMINI_API_KEY || '',
  chatgpt: process.env.REACT_APP_OPENAI_API_KEY || '',
  claude: process.env.REACT_APP_CLAUDE_API_KEY || '',
  deepseek: process.env.REACT_APP_DEEPSEEK_API_KEY || '',
};

/**
 * Set API keys (typically called on app initialization)
 */
export const setAIApiKeys = (keys) => {
  apiKeys = { ...apiKeys, ...keys };
};

/**
 * Get available models
 */
export const getAvailableModels = () => {
  return Object.values(AI_MODELS);
};

/**
 * Chat with Grok
 */
const chatWithGrok = async (message, conversationHistory = []) => {
  try {
    const messages = [
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await axios.post(
      AI_MODELS.GROK.apiUrl,
      {
        model: AI_MODELS.GROK.model,
        messages,
        temperature: 0.7,
        max_tokens: AI_MODELS.GROK.maxTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKeys.grok}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      model: 'grok',
      response: response.data.choices[0].message.content,
      usage: response.data.usage,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to get response from Grok',
    };
  }
};

/**
 * Chat with Gemini
 */
const chatWithGemini = async (message, conversationHistory = []) => {
  try {
    const contents = [
      ...conversationHistory.map((msg) => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      })),
      {
        role: 'user',
        parts: [{ text: message }],
      },
    ];

    const response = await axios.post(
      `${AI_MODELS.GEMINI.apiUrl}?key=${apiKeys.gemini}`,
      {
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: AI_MODELS.GEMINI.maxTokens,
        },
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      model: 'gemini',
      response: response.data.candidates[0].content.parts[0].text,
      usage: response.data.usageMetadata,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to get response from Gemini',
    };
  }
};

/**
 * Chat with ChatGPT
 */
const chatWithChatGPT = async (message, conversationHistory = []) => {
  try {
    const messages = [
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await axios.post(
      AI_MODELS.CHATGPT.apiUrl,
      {
        model: AI_MODELS.CHATGPT.model,
        messages,
        temperature: 0.7,
        max_tokens: AI_MODELS.CHATGPT.maxTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKeys.chatgpt}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      model: 'chatgpt',
      response: response.data.choices[0].message.content,
      usage: response.data.usage,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to get response from ChatGPT',
    };
  }
};

/**
 * Chat with Claude
 */
const chatWithClaude = async (message, conversationHistory = []) => {
  try {
    const messages = [
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await axios.post(
      AI_MODELS.CLAUDE.apiUrl,
      {
        model: AI_MODELS.CLAUDE.model,
        max_tokens: AI_MODELS.CLAUDE.maxTokens,
        messages,
      },
      {
        headers: {
          'x-api-key': apiKeys.claude,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      model: 'claude',
      response: response.data.content[0].text,
      usage: response.data.usage,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to get response from Claude',
    };
  }
};

/**
 * Chat with DeepSeek
 */
const chatWithDeepSeek = async (message, conversationHistory = []) => {
  try {
    const messages = [
      ...conversationHistory.map((msg) => ({
        role: msg.role,
        content: msg.content,
      })),
      { role: 'user', content: message },
    ];

    const response = await axios.post(
      AI_MODELS.DEEPSEEK.apiUrl,
      {
        model: AI_MODELS.DEEPSEEK.model,
        messages,
        temperature: 0.7,
        max_tokens: AI_MODELS.DEEPSEEK.maxTokens,
      },
      {
        headers: {
          Authorization: `Bearer ${apiKeys.deepseek}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return {
      success: true,
      model: 'deepseek',
      response: response.data.choices[0].message.content,
      usage: response.data.usage,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || 'Failed to get response from DeepSeek',
    };
  }
};

/**
 * Main chat function that routes to the appropriate model
 */
export const chatWithAI = async (
  message,
  modelId = 'chatgpt',
  conversationHistory = []
) => {
  if (!message || message.trim().length === 0) {
    return { success: false, error: 'Message cannot be empty' };
  }

  const model = modelId.toLowerCase();

  switch (model) {
    case 'grok':
      return await chatWithGrok(message, conversationHistory);
    case 'gemini':
      return await chatWithGemini(message, conversationHistory);
    case 'chatgpt':
      return await chatWithChatGPT(message, conversationHistory);
    case 'claude':
      return await chatWithClaude(message, conversationHistory);
    case 'deepseek':
      return await chatWithDeepSeek(message, conversationHistory);
    default:
      return { success: false, error: `Unknown model: ${model}` };
  }
};

/**
 * Code assistance - specialized prompt for coding help
 */
export const getCodeHelp = async (codeSnippet, question, modelId = 'claude') => {
  const prompt = `
    You are an expert programming assistant. A student is asking for help with their code.
    
    Code:
    \`\`\`
    ${codeSnippet}
    \`\`\`
    
    Question: ${question}
    
    Please provide:
    1. Explanation of what's wrong or how to improve it
    2. Step-by-step solution
    3. Best practices and tips
    4. Complete corrected code if applicable
  `;

  return await chatWithAI(prompt, modelId);
};

/**
 * Tutoring - specialized prompt for educational content
 */
export const getTutoring = async (topic, level = 'beginner', modelId = 'gemini') => {
  const prompt = `
    You are an experienced tutor. Create a comprehensive lesson on the following topic for a ${level} level student.
    
    Topic: ${topic}
    
    Please provide:
    1. Overview and key concepts
    2. Step-by-step explanation
    3. Real-world examples
    4. Practice exercises
    5. Common mistakes to avoid
    6. Resources for further learning
  `;

  return await chatWithAI(prompt, modelId);
};

/**
 * Coding challenge evaluation
 */
export const evaluateChallenge = async (
  challengeDescription,
  userSolution,
  modelId = 'deepseek'
) => {
  const prompt = `
    You are an expert code reviewer. Evaluate the following coding challenge solution.
    
    Challenge: ${challengeDescription}
    
    User's Solution:
    \`\`\`
    ${userSolution}
    \`\`\`
    
    Please provide:
    1. Correctness assessment (Pass/Fail)
    2. Time and space complexity analysis
    3. Code quality score (1-10)
    4. Improvements and suggestions
    5. Alternative approaches
    6. Detailed feedback
  `;

  return await chatWithAI(prompt, modelId);
};

/**
 * Batch process multiple queries
 */
export const batchChat = async (queries, modelId = 'chatgpt') => {
  const results = [];

  for (const query of queries) {
    const result = await chatWithAI(query, modelId);
    results.push(result);
  }

  return results;
};

/**
 * Get model info
 */
export const getModelInfo = (modelId) => {
  return AI_MODELS[modelId.toUpperCase()] || null;
};

/**
 * Check if API key is set for a model
 */
export const isModelAvailable = (modelId) => {
  return apiKeys[modelId.toLowerCase()] && apiKeys[modelId.toLowerCase()].length > 0;
};

/**
 * Get available models (those with API keys configured)
 */
export const getConfiguredModels = () => {
  return Object.values(AI_MODELS).filter((model) => isModelAvailable(model.id));
};

export default {
  chatWithAI,
  getCodeHelp,
  getTutoring,
  evaluateChallenge,
  batchChat,
  getModelInfo,
  isModelAvailable,
  getConfiguredModels,
  getAvailableModels,
  setAIApiKeys,
  AI_MODELS,
};
