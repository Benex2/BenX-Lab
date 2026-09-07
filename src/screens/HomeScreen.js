import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useSubscription } from '../context/SubscriptionContext';

const HomeScreen = () => {
  const { colors, typography, spacing } = useTheme();
  const { subscription } = useSubscription();
  const [studyStreak, setStudyStreak] = useState(7);
  const [recentScores, setRecentScores] = useState([
    { subject: 'Mathematics', score: 85, date: '2 days ago' },
    { subject: 'Physics', score: 78, date: '4 days ago' },
    { subject: 'Chemistry', score: 92, date: '1 week ago' },
  ]);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      paddingHorizontal: spacing.md,
      paddingTop: spacing.md,
      paddingBottom: spacing.lg,
      backgroundColor: colors.background,
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: spacing.md,
    },
    title: {
      ...typography.h1,
      color: colors.text,
    },
    badge: {
      backgroundColor: colors.cardFill,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 8,
      borderColor: colors.primary,
      borderWidth: 1,
    },
    badgeText: {
      ...typography.captionBold,
      color: colors.primary,
    },
    statusBadge: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.cardFill,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 8,
      borderColor: colors.secondary,
      borderWidth: 1,
    },
    statusDot: {
      width: 6,
      height: 6,
      borderRadius: 3,
      backgroundColor: colors.secondary,
      marginRight: spacing.xs,
    },
    statusText: {
      ...typography.captionBold,
      color: colors.secondary,
    },
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.lg,
    },
    card: {
      backgroundColor: colors.cardFill,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderColor: colors.border,
      borderWidth: 1,
    },
    streakCard: {
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 150,
    },
    streakNumber: {
      ...typography.h2,
      color: colors.primary,
      marginBottom: spacing.sm,
    },
    streakLabel: {
      ...typography.body,
      color: colors.textSecondary,
    },
    sectionTitle: {
      ...typography.h4,
      color: colors.text,
      marginBottom: spacing.md,
    },
    scoreItem: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: spacing.sm,
      borderBottomColor: colors.border,
      borderBottomWidth: 1,
    },
    scoreLeft: {
      flex: 1,
    },
    scoreName: {
      ...typography.bodyBold,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    scoreDate: {
      ...typography.caption,
      color: colors.textTertiary,
    },
    scoreValue: {
      ...typography.h4,
      color: colors.primary,
    },
    actionCard: {
      backgroundColor: colors.cardFill,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderColor: colors.border,
      borderWidth: 1,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 100,
    },
    actionText: {
      ...typography.bodyBold,
      color: colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>BenX Lab</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>GH₵ 10 PREMIUM</Text>
            </View>
            <View style={styles.statusBadge}>
              <View style={styles.statusDot} />
              <Text style={styles.statusText}>Offline Ready</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Study Streak Card */}
        <View style={[styles.card, styles.streakCard]}>
          <Text style={styles.streakNumber}>{studyStreak} 🔥</Text>
          <Text style={styles.streakLabel}>Daily Study Streak</Text>
        </View>

        {/* Recent Scores */}
        <Text style={styles.sectionTitle}>Recent Practice Scores</Text>
        <View style={styles.card}>
          {recentScores.map((item, index) => (
            <View key={index} style={styles.scoreItem}>
              <View style={styles.scoreLeft}>
                <Text style={styles.scoreName}>{item.subject}</Text>
                <Text style={styles.scoreDate}>{item.date}</Text>
              </View>
              <Text style={styles.scoreValue}>{item.score}%</Text>
            </View>
          ))}
        </View>

        {/* Quick Action Cards */}
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionText}>📚 Start Study Session</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionText}>🤖 Ask AI Tutor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionCard}>
          <Text style={styles.actionText}>⚙️ Terminal OS</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
