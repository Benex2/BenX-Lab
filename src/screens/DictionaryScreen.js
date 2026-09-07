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

const DictionaryScreen = () => {
  const { colors, typography, spacing } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWord, setSelectedWord] = useState(null);

  const vocabulary = [
    {
      id: 1,
      word: 'Photosynthesis',
      phonetics: '/ˌfoʊ.toʊˈsɪn.θə.sɪs/',
      definition: 'The process by which plants use sunlight, water, and carbon dioxide to produce oxygen and energy.',
      example: 'Photosynthesis occurs in the chloroplasts of plant cells.',
      wassce: true,
    },
    {
      id: 2,
      word: 'Mitochondria',
      phonetics: '/ˌmaɪ.toʊˈkɑːn.dri.ə/',
      definition: 'The powerhouse of the cell; organelle responsible for producing energy.',
      example: 'Mitochondria generate ATP through cellular respiration.',
      wassce: true,
    },
    {
      id: 3,
      word: 'Osmosis',
      phonetics: '/ɑːzˈmoʊ.sɪs/',
      definition: 'The movement of water molecules across a semipermeable membrane.',
      example: 'Osmosis allows cells to regulate their water content.',
      wassce: true,
    },
  ];

  const filteredVocab = vocabulary.filter((v) =>
    v.word.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    searchBar: {
      ...typography.body,
      color: colors.text,
      backgroundColor: colors.cardFill,
      borderColor: colors.border,
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm,
      marginBottom: spacing.md,
    },
    vocabList: {
      paddingHorizontal: spacing.md,
    },
    vocabItem: {
      backgroundColor: colors.cardFill,
      borderRadius: 8,
      padding: spacing.md,
      marginBottom: spacing.md,
      borderColor: colors.border,
      borderWidth: 1,
    },
    vocabItemActive: {
      borderColor: colors.primary,
    },
    vocabWord: {
      ...typography.h4,
      color: colors.text,
      marginBottom: spacing.xs,
    },
    vocabPhonetics: {
      ...typography.caption,
      color: colors.secondary,
      marginBottom: spacing.sm,
      fontStyle: 'italic',
    },
    vocabDefinition: {
      ...typography.body,
      color: colors.textSecondary,
      marginBottom: spacing.sm,
    },
    vocabExample: {
      ...typography.body,
      color: colors.textTertiary,
      fontStyle: 'italic',
      marginBottom: spacing.sm,
      paddingLeft: spacing.md,
      borderLeftColor: colors.secondary,
      borderLeftWidth: 2,
    },
    wassceBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: spacing.sm,
      paddingVertical: spacing.xs,
      borderRadius: 4,
      alignSelf: 'flex-start',
    },
    wassceBadgeText: {
      ...typography.captionBold,
      color: colors.background,
    },
    detailsContainer: {
      paddingHorizontal: spacing.md,
      paddingBottom: spacing.md,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Smart Dictionary</Text>
      </View>

      <View style={styles.header}>
        <TextInput
          style={styles.searchBar}
          placeholderTextColor={colors.textTertiary}
          placeholder="Search vocabulary..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <ScrollView style={styles.vocabList}>
        {filteredVocab.length > 0 ? (
          filteredVocab.map((vocab) => (
            <TouchableOpacity
              key={vocab.id}
              style={[
                styles.vocabItem,
                selectedWord?.id === vocab.id && styles.vocabItemActive,
              ]}
              onPress={() => setSelectedWord(vocab)}
            >
              <Text style={styles.vocabWord}>{vocab.word}</Text>
              <Text style={styles.vocabPhonetics}>{vocab.phonetics}</Text>
              <Text style={styles.vocabDefinition}>{vocab.definition}</Text>
              <Text style={styles.vocabExample}>Example: {vocab.example}</Text>
              {vocab.wassce && (
                <View style={styles.wassceBadge}>
                  <Text style={styles.wassceBadgeText}>WASSCE ESSENTIAL</Text>
                </View>
              )}
            </TouchableOpacity>
          ))
        ) : (
          <Text style={[styles.vocabWord, { textAlign: 'center', marginTop: spacing.lg }]}>
            No results found
          </Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DictionaryScreen;
