import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Linking,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useOfflineMaterials } from '../context/OfflineMaterialsContext';

const LearnerMaterialsScreen = () => {
  const { colors, typography, spacing } = useTheme();
  const {
    materials,
    downloadedMaterials,
    storageInfo,
    loading,
    downloadMaterial,
    downloadYearMaterials,
    downloadAllMaterials,
    deleteMaterial,
    deleteYearMaterials,
    isMaterialDownloaded,
  } = useOfflineMaterials();

  const [expandedYear, setExpandedYear] = useState(null);

  const handleDownloadYearMaterials = async (year) => {
    Alert.alert(
      `Download ${year} Materials?`,
      `This will download all subjects for ${year}. Continue?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Download',
          onPress: async () => {
            const result = await downloadYearMaterials(year);
            Alert.alert(
              result.success ? 'Success' : 'Error',
              result.message
            );
          },
        },
      ]
    );
  };

  const handleDeleteYearMaterials = async (year) => {
    Alert.alert(
      `Delete ${year} Materials?`,
      `This will remove all offline ${year} materials. Continue?`,
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            const result = await deleteYearMaterials(year);
            Alert.alert(
              result.success ? 'Success' : 'Error',
              result.message
            );
          },
          style: 'destructive',
        },
      ]
    );
  };

  const handleDownloadAllMaterials = async () => {
    Alert.alert(
      'Download All Materials?',
      'This will download all subjects for Year 1, 2, and 3. This may take some time.',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Download',
          onPress: async () => {
            const result = await downloadAllMaterials();
            Alert.alert(
              result.success ? 'Success' : 'Error',
              result.message
            );
          },
        },
      ]
    );
  };

  const handleSubjectAction = async (year, subject) => {
    const isDownloaded = isMaterialDownloaded(year, subject.id);

    if (isDownloaded) {
      Alert.alert(
        'Material Downloaded',
        `${subject.name} is available offline. What would you like to do?`,
        [
          {
            text: 'View Offline',
            onPress: () => {
              // Open from local storage
              Alert.alert('Offline Material', `Viewing ${subject.name} offline.`);
            },
          },
          {
            text: 'Delete',
            onPress: async () => {
              const result = await deleteMaterial(year, subject.id);
              Alert.alert(
                result.success ? 'Success' : 'Error',
                result.message
              );
            },
            style: 'destructive',
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    } else {
      Alert.alert(
        'Download Material?',
        `Download ${subject.name} for offline viewing?`,
        [
          {
            text: 'Download',
            onPress: async () => {
              const result = await downloadMaterial(year, subject);
              Alert.alert(
                result.success ? 'Success' : 'Error',
                result.message
              );
            },
          },
          {
            text: 'Open Online',
            onPress: () => Linking.openURL(subject.url),
          },
          {
            text: 'Cancel',
            style: 'cancel',
          },
        ]
      );
    }
  };

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
    title: {
      ...typography.h1,
      color: colors.text,
      marginBottom: spacing.sm,
    },
    subtitle: {
      ...typography.body,
      color: colors.textSecondary,
    },
    scrollContent: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.lg,
    },
    storageCard: {
      backgroundColor: colors.cardFill,
      borderRadius: 12,
      padding: spacing.md,
      marginBottom: spacing.lg,
      borderColor: colors.secondary,
      borderWidth: 1,
    },
    storageTitle: {
      ...typography.bodyBold,
      color: colors.secondary,
      marginBottom: spacing.sm,
    },
    storageText: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.xs,
    },
    downloadAllBtn: {
      backgroundColor: colors.primary,
      borderRadius: 10,
      padding: spacing.md,
      marginBottom: spacing.lg,
      alignItems: 'center',
    },
    downloadAllBtnText: {
      ...typography.bodyBold,
      color: colors.background,
    },
    yearSection: {
      marginBottom: spacing.lg,
    },
    yearHeader: {
      backgroundColor: colors.cardFill,
      borderRadius: 12,
      padding: spacing.md,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderColor: colors.primary,
      borderWidth: 1,
      marginBottom: spacing.md,
    },
    yearTitle: {
      ...typography.h4,
      color: colors.text,
      flex: 1,
    },
    yearStats: {
      ...typography.caption,
      color: colors.primary,
      marginRight: spacing.sm,
    },
    actionButtonsRow: {
      flexDirection: 'row',
      gap: spacing.sm,
      marginBottom: spacing.md,
    },
    actionButton: {
      flex: 1,
      backgroundColor: colors.cardFill,
      borderRadius: 10,
      padding: spacing.sm,
      borderColor: colors.primary,
      borderWidth: 1,
      alignItems: 'center',
    },
    actionButtonText: {
      ...typography.caption,
      color: colors.primary,
    },
    deleteButton: {
      borderColor: '#FF6B9D',
    },
    deleteButtonText: {
      color: '#FF6B9D',
    },
    subjectGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    subjectCard: {
      backgroundColor: colors.cardFill,
      borderRadius: 10,
      padding: spacing.md,
      marginRight: spacing.sm,
      marginBottom: spacing.sm,
      borderColor: colors.border,
      borderWidth: 1,
      width: '48%',
      alignItems: 'center',
    },
    subjectCardDownloaded: {
      borderColor: colors.primary,
      borderWidth: 2,
      backgroundColor: colors.cardFill,
    },
    subjectName: {
      ...typography.caption,
      color: colors.text,
      textAlign: 'center',
      marginBottom: spacing.xs,
    },
    subjectStatus: {
      ...typography.captionBold,
      color: colors.primary,
      marginBottom: spacing.xs,
    },
    statusBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.xs,
      paddingVertical: 2,
      borderRadius: 4,
    },
    statusBadgeText: {
      ...typography.caption,
      color: colors.background,
      fontSize: 10,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

  if (loading && Object.keys(downloadedMaterials).length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={{ ...typography.body, color: colors.text, marginTop: spacing.md }}>
            Loading materials...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Learner Materials</Text>
        <Text style={styles.subtitle}>Ministry of Education Ghana</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        {/* Storage Info */}
        {storageInfo && (
          <View style={styles.storageCard}>
            <Text style={styles.storageTitle}>📊 Offline Storage</Text>
            <Text style={styles.storageText}>
              Downloaded: {storageInfo.downloadedMaterials} / {storageInfo.totalMaterials}
            </Text>
            <Text style={styles.storageText}>
              Storage Used: {storageInfo.totalStorageUsed}
            </Text>
            <Text style={styles.storageText}>
              Progress: {storageInfo.percentageDownloaded}%
            </Text>
          </View>
        )}

        {/* Download All Button */}
        <TouchableOpacity
          style={styles.downloadAllBtn}
          onPress={handleDownloadAllMaterials}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={styles.downloadAllBtnText}>
              ⬇️ Download All Materials
            </Text>
          )}
        </TouchableOpacity>

        {/* Year Sections */}
        {Object.keys(materials).map((year) => (
          <View key={year} style={styles.yearSection}>
            <TouchableOpacity
              style={styles.yearHeader}
              onPress={() =>
                setExpandedYear(expandedYear === year ? null : year)
              }
            >
              <Text style={styles.yearTitle}>
                {materials[year].title}
              </Text>
              <Text style={styles.yearStats}>
                {Object.keys(downloadedMaterials).filter((key) =>
                  key.startsWith(year + '_')
                ).length} / {materials[year].subjects.length}
              </Text>
              <Text style={{ ...typography.h4, color: colors.primary }}>
                {expandedYear === year ? '▼' : '▶'}
              </Text>
            </TouchableOpacity>

            {expandedYear === year && (
              <>
                <View style={styles.actionButtonsRow}>
                  <TouchableOpacity
                    style={styles.actionButton}
                    onPress={() => handleDownloadYearMaterials(year)}
                  >
                    <Text style={styles.actionButtonText}>⬇️ Download All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.actionButton, styles.deleteButton]}
                    onPress={() => handleDeleteYearMaterials(year)}
                  >
                    <Text style={[styles.actionButtonText, styles.deleteButtonText]}>
                      🗑️ Delete All
                    </Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.subjectGrid}>
                  {materials[year].subjects.map((subject) => {
                    const isDownloaded = isMaterialDownloaded(
                      year,
                      subject.id
                    );
                    return (
                      <TouchableOpacity
                        key={subject.id}
                        style={[
                          styles.subjectCard,
                          isDownloaded && styles.subjectCardDownloaded,
                        ]}
                        onPress={() => handleSubjectAction(year, subject)}
                      >
                        <Text style={styles.subjectName}>
                          {subject.name}
                        </Text>
                        {isDownloaded ? (
                          <View style={styles.statusBadge}>
                            <Text style={styles.statusBadgeText}>
                              ✓ Offline Ready
                            </Text>
                          </View>
                        ) : (
                          <Text style={{ ...typography.caption, color: colors.textSecondary }}>
                            Tap to download
                          </Text>
                        )}
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default LearnerMaterialsScreen;
