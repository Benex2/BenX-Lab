import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const AIHubScreen = () => {
  const { colors, typography, spacing } = useTheme();
  const [selectedModel, setSelectedModel] = useState('Claude 3.5 Sonnet');
  const [offlineMode, setOfflineMode] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, type: 'system', text: 'AI Hub Ready. Select a model and start chatting.' },
  ]);
  const [input, setInput] = useState('');

  const models = [
    { id: 1, name: 'DeepSeek-R1', icon: '🧠' },
    { id: 2, name: 'Claude 3.5 Sonnet', icon: '✨' },
    { id: 3, name: 'Gemini 1.5 Flash', icon: '⚡' },
    { id: 4, name: 'ChatGPT-4o', icon: '🤖' },
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessages = [
      ...messages,
      { id: messages.length + 1, type: 'user', text: input },
      {
        id: messages.length + 2,
        type: 'ai',
        text: `Response from ${selectedModel}...`,
      },
    ];
    setMessages(newMessages);
    setInput('');
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: spacing.md,
    },
    title: {
      ...typography.h2,
      color: colors.text,
      marginBottom: spacing.md,
    },
    modelSelector: {
      marginBottom: spacing.md,
    },
    modelLabel: {
      ...typography.captionBold,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
    },
    modelGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: spacing.sm,
    },
    modelButton: {
      flex: 1,
      minWidth: '48%',
      backgroundColor: colors.cardFill,
      borderRadius: 8,
      padding: spacing.sm,
      borderWidth: 2,
      alignItems: 'center',
    },
    modelButtonActive: {
      borderColor: colors.primary,
    },
    modelButtonInactive: {
      borderColor: colors.border,
    },
    modelIcon: {
      fontSize: 20,
      marginBottom: spacing.xs,
    },
    modelName: {
      ...typography.caption,
      color: colors.text,
      textAlign: 'center',
    },
    offlineModeSection: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.cardFill,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.md,
      borderColor: colors.border,
      borderWidth: 1,
    },
    offlineModeLabel: {
      ...typography.bodyBold,
      color: colors.text,
    },
    chatContainer: {
      flex: 1,
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
    },
    messageItem: {
      marginBottom: spacing.md,
      maxWidth: '85%',
    },
    messageUser: {
      alignSelf: 'flex-end',
    },
    messageAI: {
      alignSelf: 'flex-start',
    },
    messageBubble: {
      padding: spacing.md,
      borderRadius: 12,
    },
    messageBubbleUser: {
      backgroundColor: colors.primary,
    },
    messageBubbleAI: {
      backgroundColor: colors.cardFill,
      borderColor: colors.border,
      borderWidth: 1,
    },
    messageText: {
      ...typography.body,
      color: colors.text,
    },
    messageTextUser: {
      color: colors.background,
    },
    inputSection: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
      flexDirection: 'row',
      gap: spacing.sm,
    },
    input: {
      flex: 1,
      ...typography.body,
      color: colors.text,
      backgroundColor: colors.cardFill,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
    },
    sendButton: {
      backgroundColor: colors.secondary,
      paddingHorizontal: spacing.md,
      borderRadius: 8,
      justifyContent: 'center',
    },
    sendButtonText: {
      ...typography.captionBold,
      color: colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>AI Hub</Text>

        <View style={styles.modelSelector}>
          <Text style={styles.modelLabel}>SELECT MODEL</Text>
          <View style={styles.modelGrid}>
            {models.map((model) => (
              <TouchableOpacity
                key={model.id}
                style={[
                  styles.modelButton,
                  selectedModel === model.name
                    ? styles.modelButtonActive
                    : styles.modelButtonInactive,
                ]}
                onPress={() => setSelectedModel(model.name)}
              >
                <Text style={styles.modelIcon}>{model.icon}</Text>
                <Text style={styles.modelName}>{model.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.offlineModeSection}>
          <Text style={styles.offlineModeLabel}>Resident Offline AI</Text>
          <Switch
            value={offlineMode}
            onValueChange={setOfflineMode}
            trackColor={{ false: colors.border, true: colors.primary }}
            thumbColor={offlineMode ? colors.background : colors.textTertiary}
          />
        </View>
      </View>

      <ScrollView style={styles.chatContainer}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageItem,
              msg.type === 'user' ? styles.messageUser : styles.messageAI,
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.type === 'user'
                  ? styles.messageBubbleUser
                  : styles.messageBubbleAI,
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.type === 'user' && styles.messageTextUser,
                ]}
              >
                {msg.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholderTextColor={colors.textTertiary}
          placeholder="Ask anything..."
          value={input}
          onChangeText={setInput}
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AIHubScreen;
