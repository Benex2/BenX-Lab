/**
 * AI Hub Screen Component
 * Displays all AI models and handles chat interactions
 */

import React, { useContext, useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import * as aiModelsService from '../services/aiModelsService';

const AIHubScreen = () => {
  const { colors, spacing } = useContext(ThemeContext);
  const [selectedModel, setSelectedModel] = useState('chatgpt');
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [availableModels, setAvailableModels] = useState([]);
  const scrollViewRef = useRef();

  useEffect(() => {
    // Load available models on component mount
    const models = aiModelsService.getAvailableModels();
    setAvailableModels(models);

    // Add welcome message
    setMessages([
      {
        id: '0',
        type: 'assistant',
        content: `Welcome to AI Hub! 🤖\n\nYou can chat with multiple AI models:\n• ChatGPT (OpenAI)\n• Gemini (Google)\n• Claude (Anthropic)\n• Grok (xAI)\n• DeepSeek\n\nSelect a model and start asking questions!`,
        timestamp: new Date(),
      },
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const result = await aiModelsService.chatWithAI(
        inputText,
        selectedModel,
        messages.map((msg) => ({
          role: msg.type === 'user' ? 'user' : 'assistant',
          content: msg.content,
        }))
      );

      if (result.success) {
        const assistantMessage = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: result.response,
          model: result.model,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        const errorMessage = {
          id: (Date.now() + 1).toString(),
          type: 'error',
          content: `Error: ${result.error}`,
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage = {
        id: (Date.now() + 1).toString(),
        type: 'error',
        content: `Error: ${error.message}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessageBubble = ({ item }) => {
    const isUser = item.type === 'user';
    const isError = item.type === 'error';

    return (
      <View
        style={[
          styles.messageBubble,
          isUser && styles.userMessage,
          isError && styles.errorMessage,
        ]}
      >
        <Text
          style={[
            styles.messageText,
            {
              color: isUser ? colors.background : isError ? '#ff6b6b' : colors.text,
            },
          ]}
        >
          {item.content}
        </Text>
        {item.model && (
          <Text style={[styles.modelTag, { color: colors.textSecondary }]}>
            via {item.model.toUpperCase()}
          </Text>
        )}
      </View>
    );
  };

  const ModelSelector = () => (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.modelSelector}
      contentContainerStyle={styles.modelSelectorContent}
    >
      {availableModels.map((model) => (
        <TouchableOpacity
          key={model.id}
          style={[
            styles.modelButton,
            {
              backgroundColor:
                selectedModel === model.id ? colors.primary : colors.cardFill,
              borderColor:
                selectedModel === model.id ? colors.primary : colors.textSecondary,
            },
          ]}
          onPress={() => setSelectedModel(model.id)}
        >
          <MaterialCommunityIcons
            name="robot"
            size={16}
            color={selectedModel === model.id ? colors.background : colors.text}
          />
          <Text
            style={[
              styles.modelButtonText,
              {
                color:
                  selectedModel === model.id ? colors.background : colors.text,
              },
            ]}
          >
            {model.name}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const ModelInfo = () => {
    const model = aiModelsService.getModelInfo(selectedModel.toUpperCase());
    if (!model) return null;

    return (
      <View style={[styles.modelInfo, { backgroundColor: colors.cardFill }]}>
        <View style={styles.modelInfoRow}>
          <Text style={[styles.modelInfoLabel, { color: colors.textSecondary }]}>
            Model:
          </Text>
          <Text style={[styles.modelInfoValue, { color: colors.text }]}>
            {model.model}
          </Text>
        </View>
        <View style={styles.modelInfoRow}>
          <Text style={[styles.modelInfoLabel, { color: colors.textSecondary }]}>
            Provider:
          </Text>
          <Text style={[styles.modelInfoValue, { color: colors.text }]}>
            {model.provider}
          </Text>
        </View>
        <View style={styles.modelInfoRow}>
          <Text style={[styles.modelInfoLabel, { color: colors.textSecondary }]}>
            Max Tokens:
          </Text>
          <Text style={[styles.modelInfoValue, { color: colors.text }]}>
            {model.maxTokens}
          </Text>
        </View>
        <Text style={[styles.modelDescription, { color: colors.textSecondary }]}>
          {model.description}
        </Text>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <View style={styles.header}>
        <MaterialCommunityIcons name="brain" size={24} color={colors.primary} />
        <Text style={[styles.title, { color: colors.text }]}>AI Hub</Text>
      </View>

      <ModelSelector />
      <ModelInfo />

      <FlatList
        ref={scrollViewRef}
        data={messages}
        renderItem={renderMessageBubble}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesContainer}
        onContentSizeChange={() => scrollViewRef.current?.scrollToEnd()}
      />

      <View
        style={[
          styles.inputContainer,
          { backgroundColor: colors.cardFill, borderTopColor: colors.textSecondary },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            { color: colors.text, borderColor: colors.textSecondary },
          ]}
          placeholder="Ask me anything..."
          placeholderTextColor={colors.textSecondary}
          value={inputText}
          onChangeText={setInputText}
          multiline
          maxHeight={100}
          editable={!isLoading}
        />
        <TouchableOpacity
          style={[
            styles.sendButton,
            { backgroundColor: colors.primary, opacity: isLoading ? 0.5 : 1 },
          ]}
          onPress={handleSendMessage}
          disabled={isLoading || !inputText.trim()}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.background} size="small" />
          ) : (
            <MaterialCommunityIcons
              name="send"
              size={20}
              color={colors.background}
            />
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1b1e',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  modelSelector: {
    maxHeight: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#1a1b1e',
  },
  modelSelectorContent: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  modelButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  modelButtonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 6,
  },
  modelInfo: {
    margin: 12,
    padding: 12,
    borderRadius: 8,
  },
  modelInfoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  modelInfoLabel: {
    fontSize: 12,
    fontWeight: '600',
    width: '30%',
  },
  modelInfoValue: {
    fontSize: 12,
    fontWeight: '500',
  },
  modelDescription: {
    fontSize: 12,
    marginTop: 8,
    fontStyle: 'italic',
  },
  messagesContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  messageBubble: {
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#1a1b1e',
    maxWidth: '85%',
  },
  userMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#00E676',
  },
  errorMessage: {
    backgroundColor: '#ff6b6b',
    opacity: 0.8,
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
  },
  modelTag: {
    fontSize: 10,
    marginTop: 6,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    maxHeight: 100,
    marginRight: 8,
    fontSize: 14,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AIHubScreen;
