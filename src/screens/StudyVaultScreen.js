import React, { useState } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const StudyVaultScreen = () => {
  const { colors, typography, spacing } = useTheme();
  const [selectedSubject, setSelectedSubject] = useState('Mathematics');

  const subjects = [
    { id: 1, name: 'Elective Mathematics', icon: '∑' },
    { id: 2, name: 'Integrated Science', icon: '🧬' },
    { id: 3, name: 'Physics', icon: '⚛️' },
    { id: 4, name: 'Chemistry', icon: '🧪' },
    { id: 5, name: 'Social Studies', icon: '🌍' },
  ];

  const questions = [
    {
      id: 1,
      year: 2023,
      number: 1,
      text: 'Solve: 2x + 5 = 13',
      subject: 'Elective Mathematics',
    },
    {
      id: 2,
      year: 2022,
      number: 2,
      text: 'What is photosynthesis?',
      subject: 'Integrated Science',
    },
  ];

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
    subjectGrid: {
      paddingHorizontal: spacing.md,
      marginBottom: spacing.lg,
    },
    subjectButton: {
      backgroundColor: colors.cardFill,
      borderRadius: 12,
      padding: spacing.md,
      marginRight: spacing.md,
      borderWidth: 2,
      minWidth: 120,
      alignItems: 'center',
    },
    subjectButtonActive: {
      borderColor: colors.primary,
    },
    subjectButtonInactive: {
      borderColor: colors.border,
    },
    subjectIcon: {
      fontSize: 28,
      marginBottom: spacing.xs,
    },
    subjectName: {
      ...typography.captionBold,
      color: colors.text,
      textAlign: 'center',
    },
    questionsSection: {
      paddingHorizontal: spacing.md,
    },
    sectionTitle: {
      ...typography.h4,
      color: colors.text,
      marginBottom: spacing.md,
    },
    questionCard: {
      backgroundColor: colors.cardFill,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderColor: colors.border,
      borderWidth: 1,
    },
    questionMeta: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: spacing.sm,
    },
    questionYear: {
      ...typography.caption,
      color: colors.secondary,
      backgroundColor: colors.surface,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 4,
    },
    questionNumber: {
      ...typography.captionBold,
      color: colors.textSecondary,
    },
    questionText: {
      ...typography.body,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    viewButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      borderRadius: 8,
      alignSelf: 'flex-start',
    },
    viewButtonText: {
      ...typography.captionBold,
      color: colors.background,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Study Vault</Text>
      </View>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={subjects}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.subjectButton,
              selectedSubject === item.name
                ? styles.subjectButtonActive
                : styles.subjectButtonInactive,
            ]}
            onPress={() => setSelectedSubject(item.name)}
          >
            <Text style={styles.subjectIcon}>{item.icon}</Text>
            <Text style={styles.subjectName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        style={styles.subjectGrid}
      />

      <ScrollView style={styles.questionsSection}>
        <Text style={styles.sectionTitle}>WASSCE Past Questions</Text>
        {questions.map((q) => (
          <View key={q.id} style={styles.questionCard}>
            <View style={styles.questionMeta}>
              <Text style={styles.questionYear}>{q.year}</Text>
              <Text style={styles.questionNumber}>Q{q.number}</Text>
            </View>
            <Text style={styles.questionText}>{q.text}</Text>
            <TouchableOpacity style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Solution →</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default StudyVaultScreen;
