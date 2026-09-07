import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const TerminalScreen = () => {
  const { colors, typography, spacing } = useTheme();
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { id: 1, type: 'system', text: '> BenX Lab Terminal v1.0.0' },
    { id: 2, type: 'system', text: '> Type "help" for available commands' },
  ]);

  const handleCommand = () => {
    if (!input.trim()) return;

    const newLogs = [
      ...logs,
      { id: logs.length + 1, type: 'input', text: `$ ${input}` },
    ];

    // Simple command processor
    let response = '';
    switch (input.toLowerCase().trim()) {
      case 'help':
        response = `Available commands:
  • status     - Show system status
  • run        - Start a study session
  • clear      - Clear terminal`;
        break;
      case 'status':
        response = `System Status:
  Memory: 512MB / 2GB
  Offline Mode: Ready
  Last Sync: 2 hours ago`;
        break;
      case 'run':
        response = 'Starting study session... ✓';
        break;
      case 'clear':
        setLogs([
          { id: 1, type: 'system', text: '> BenX Lab Terminal v1.0.0' },
        ]);
        setInput('');
        return;
      default:
        response = `Command not found: ${input}`;
    }

    newLogs.push({ id: logs.length + 2, type: 'output', text: response });
    setLogs(newLogs);
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
    },
    terminalBox: {
      flex: 1,
      backgroundColor: colors.cardFill,
      marginHorizontal: spacing.md,
      borderRadius: 8,
      borderColor: colors.primary,
      borderWidth: 1,
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    },
    logContent: {
      flex: 1,
      padding: spacing.md,
    },
    logLine: {
      marginBottom: spacing.sm,
    },
    logInput: {
      ...typography.body,
      color: colors.secondary,
      fontFamily: 'monospace',
    },
    logOutput: {
      ...typography.body,
      color: colors.text,
      fontFamily: 'monospace',
    },
    logSystem: {
      ...typography.body,
      color: colors.textSecondary,
      fontFamily: 'monospace',
    },
    inputSection: {
      flexDirection: 'row',
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
      gap: spacing.sm,
    },
    promptLabel: {
      ...typography.body,
      color: colors.primary,
      fontFamily: 'monospace',
    },
    input: {
      flex: 1,
      ...typography.body,
      color: colors.text,
      fontFamily: 'monospace',
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 4,
    },
    sendButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.xs,
      borderRadius: 4,
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
        <Text style={styles.title}>Terminal OS</Text>
      </View>

      <View style={styles.terminalBox}>
        <ScrollView style={styles.logContent}>
          {logs.map((log) => (
            <View key={log.id} style={styles.logLine}>
              <Text
                style={[
                  log.type === 'input'
                    ? styles.logInput
                    : log.type === 'output'
                    ? styles.logOutput
                    : styles.logSystem,
                ]}
              >
                {log.text}
              </Text>
            </View>
          ))}
        </ScrollView>

        <View style={styles.inputSection}>
          <Text style={styles.promptLabel}>$</Text>
          <TextInput
            style={styles.input}
            placeholderTextColor={colors.textTertiary}
            placeholder="Enter command..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleCommand}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleCommand}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default TerminalScreen;
