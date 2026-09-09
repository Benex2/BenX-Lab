import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

// Complete list of all MOE subjects by year
const MOE_MATERIALS = {
  year1: {
    title: 'Year 1 Learner Materials',
    subjects: [
      { id: 'y1_math', name: 'Mathematics', url: 'https://curriculumresources.edu.gh/year1_mathematics/' },
      { id: 'y1_english', name: 'English Language', url: 'https://curriculumresources.edu.gh/year1_english/' },
      { id: 'y1_science', name: 'Integrated Science', url: 'https://curriculumresources.edu.gh/year1_science/' },
      { id: 'y1_social', name: 'Social Studies', url: 'https://curriculumresources.edu.gh/year1_social-studies/' },
      { id: 'y1_ict', name: 'ICT', url: 'https://curriculumresources.edu.gh/year1_ict/' },
      { id: 'y1_pe', name: 'Physical Education', url: 'https://curriculumresources.edu.gh/year1_pe/' },
      { id: 'y1_nav', name: 'Numeracy & Vital Values', url: 'https://curriculumresources.edu.gh/year1_nav/' },
      { id: 'y1_tech', name: 'Technology & Design', url: 'https://curriculumresources.edu.gh/year1_tech/' },
      { id: 'y1_music', name: 'Music', url: 'https://curriculumresources.edu.gh/year1_music/' },
      { id: 'y1_visual', name: 'Visual Arts', url: 'https://curriculumresources.edu.gh/year1_visual-arts/' },
      { id: 'y1_akan', name: 'Akan', url: 'https://curriculumresources.edu.gh/year1_akan/' },
      { id: 'y1_ga', name: 'Ga', url: 'https://curriculumresources.edu.gh/year1_ga/' },
      { id: 'y1_ewe', name: 'Ewe', url: 'https://curriculumresources.edu.gh/year1_ewe/' },
      { id: 'y1_dangbe', name: 'Dangbe', url: 'https://curriculumresources.edu.gh/year1_dangbe/' },
    ],
  },
  year2: {
    title: 'Year 2 Learner Materials',
    subjects: [
      { id: 'y2_math', name: 'Mathematics', url: 'https://curriculumresources.edu.gh/year2_mathematics/' },
      { id: 'y2_english', name: 'English Language', url: 'https://curriculumresources.edu.gh/year2_english/' },
      { id: 'y2_science', name: 'Integrated Science', url: 'https://curriculumresources.edu.gh/year2_science/' },
      { id: 'y2_social', name: 'Social Studies', url: 'https://curriculumresources.edu.gh/year2_social-studies/' },
      { id: 'y2_ict', name: 'ICT', url: 'https://curriculumresources.edu.gh/year2_ict/' },
      { id: 'y2_pe', name: 'Physical Education', url: 'https://curriculumresources.edu.gh/year2_pe/' },
      { id: 'y2_nav', name: 'Numeracy & Vital Values', url: 'https://curriculumresources.edu.gh/year2_nav/' },
      { id: 'y2_tech', name: 'Technology & Design', url: 'https://curriculumresources.edu.gh/year2_tech/' },
      { id: 'y2_music', name: 'Music', url: 'https://curriculumresources.edu.gh/year2_music/' },
      { id: 'y2_visual', name: 'Visual Arts', url: 'https://curriculumresources.edu.gh/year2_visual-arts/' },
      { id: 'y2_akan', name: 'Akan', url: 'https://curriculumresources.edu.gh/year2_akan/' },
      { id: 'y2_ga', name: 'Ga', url: 'https://curriculumresources.edu.gh/year2_ga/' },
      { id: 'y2_ewe', name: 'Ewe', url: 'https://curriculumresources.edu.gh/year2_ewe/' },
      { id: 'y2_dangbe', name: 'Dangbe', url: 'https://curriculumresources.edu.gh/year2_dangbe/' },
    ],
  },
  year3: {
    title: 'Year 3 Learner Materials (WASSCE)',
    subjects: [
      { id: 'y3_math', name: 'Core Mathematics', url: 'https://curriculumresources.edu.gh/year3_mathematics/' },
      { id: 'y3_emath', name: 'Elective Mathematics', url: 'https://curriculumresources.edu.gh/year3_elective-mathematics/' },
      { id: 'y3_english', name: 'English Language', url: 'https://curriculumresources.edu.gh/year3_english/' },
      { id: 'y3_science', name: 'Integrated Science', url: 'https://curriculumresources.edu.gh/year3_science/' },
      { id: 'y3_biology', name: 'Biology', url: 'https://curriculumresources.edu.gh/year3_biology/' },
      { id: 'y3_chemistry', name: 'Chemistry', url: 'https://curriculumresources.edu.gh/year3_chemistry/' },
      { id: 'y3_physics', name: 'Physics', url: 'https://curriculumresources.edu.gh/year3_physics/' },
      { id: 'y3_social', name: 'Social Studies', url: 'https://curriculumresources.edu.gh/year3_social-studies/' },
      { id: 'y3_geography', name: 'Geography', url: 'https://curriculumresources.edu.gh/year3_geography/' },
      { id: 'y3_history', name: 'History', url: 'https://curriculumresources.edu.gh/year3_history/' },
      { id: 'y3_ict', name: 'ICT', url: 'https://curriculumresources.edu.gh/year3_ict/' },
      { id: 'y3_business', name: 'Business Management', url: 'https://curriculumresources.edu.gh/year3_business/' },
      { id: 'y3_economics', name: 'Economics', url: 'https://curriculumresources.edu.gh/year3_economics/' },
      { id: 'y3_accounting', name: 'Accounting', url: 'https://curriculumresources.edu.gh/year3_accounting/' },
      { id: 'y3_literature', name: 'Literature in English', url: 'https://curriculumresources.edu.gh/year3_literature/' },
      { id: 'y3_akan', name: 'Akan', url: 'https://curriculumresources.edu.gh/year3_akan/' },
      { id: 'y3_ga', name: 'Ga', url: 'https://curriculumresources.edu.gh/year3_ga/' },
      { id: 'y3_ewe', name: 'Ewe', url: 'https://curriculumresources.edu.gh/year3_ewe/' },
      { id: 'y3_french', name: 'French', url: 'https://curriculumresources.edu.gh/year3_french/' },
      { id: 'y3_arabic', name: 'Arabic', url: 'https://curriculumresources.edu.gh/year3_arabic/' },
    ],
  },
};

const STORAGE_KEYS = {
  DOWNLOADED_MATERIALS: 'moe_downloaded_materials',
  DOWNLOAD_PROGRESS: 'moe_download_progress',
  OFFLINE_INDEX: 'moe_offline_index',
};

const MATERIALS_DIR = FileSystem.documentDirectory + 'moe_materials/';

class MOEOfflineService {
  async initializeOfflineStorage() {
    try {
      // Create materials directory if it doesn't exist
      const dirInfo = await FileSystem.getInfoAsync(MATERIALS_DIR);
      if (!dirInfo.exists) {
        await FileSystem.createAsync(MATERIALS_DIR, { intermediates: true });
      }

      // Load existing offline index
      const existingIndex = await AsyncStorage.getItem(STORAGE_KEYS.OFFLINE_INDEX);
      if (!existingIndex) {
        await AsyncStorage.setItem(
          STORAGE_KEYS.OFFLINE_INDEX,
          JSON.stringify(MOE_MATERIALS)
        );
      }
    } catch (error) {
      console.error('Error initializing offline storage:', error);
    }
  }

  async getMaterials() {
    return MOE_MATERIALS;
  }

  async getDownloadedMaterials() {
    try {
      const downloaded = await AsyncStorage.getItem(STORAGE_KEYS.DOWNLOADED_MATERIALS);
      return downloaded ? JSON.parse(downloaded) : {};
    } catch (error) {
      console.error('Error getting downloaded materials:', error);
      return {};
    }
  }

  async downloadSubjectMaterial(year, subject) {
    try {
      const downloaded = await this.getDownloadedMaterials();
      const materialKey = `${year}_${subject.id}`;
      const fileName = `${materialKey}.json`;
      const filePath = MATERIALS_DIR + fileName;

      // Create a mock material object with metadata
      const materialData = {
        id: subject.id,
        name: subject.name,
        year: year,
        url: subject.url,
        downloadedAt: new Date().toISOString(),
        fileSize: Math.floor(Math.random() * 50) + 10, // Mock file size in MB
        status: 'ready',
      };

      // Save material data locally
      await FileSystem.writeAsStringAsync(
        filePath,
        JSON.stringify(materialData)
      );

      // Update downloaded materials index
      downloaded[materialKey] = {
        ...materialData,
        localPath: filePath,
      };

      await AsyncStorage.setItem(
        STORAGE_KEYS.DOWNLOADED_MATERIALS,
        JSON.stringify(downloaded)
      );

      return { success: true, message: 'Material downloaded successfully' };
    } catch (error) {
      console.error('Error downloading material:', error);
      return { success: false, message: 'Download failed' };
    }
  }

  async downloadAllYearMaterials(year) {
    try {
      const yearData = MOE_MATERIALS[year];
      if (!yearData) return { success: false, message: 'Invalid year' };

      const results = [];
      const downloaded = await this.getDownloadedMaterials();

      for (const subject of yearData.subjects) {
        const materialKey = `${year}_${subject.id}`;
        const fileName = `${materialKey}.json`;
        const filePath = MATERIALS_DIR + fileName;

        const materialData = {
          id: subject.id,
          name: subject.name,
          year: year,
          url: subject.url,
          downloadedAt: new Date().toISOString(),
          fileSize: Math.floor(Math.random() * 50) + 10,
          status: 'ready',
        };

        await FileSystem.writeAsStringAsync(
          filePath,
          JSON.stringify(materialData)
        );

        downloaded[materialKey] = {
          ...materialData,
          localPath: filePath,
        };

        results.push(materialKey);
      }

      await AsyncStorage.setItem(
        STORAGE_KEYS.DOWNLOADED_MATERIALS,
        JSON.stringify(downloaded)
      );

      return {
        success: true,
        message: `All ${year} materials downloaded`,
        count: results.length,
      };
    } catch (error) {
      console.error('Error downloading year materials:', error);
      return { success: false, message: 'Download failed' };
    }
  }

  async downloadAllMaterials() {
    try {
      const downloaded = await this.getDownloadedMaterials();
      let totalCount = 0;

      for (const year of Object.keys(MOE_MATERIALS)) {
        const yearData = MOE_MATERIALS[year];

        for (const subject of yearData.subjects) {
          const materialKey = `${year}_${subject.id}`;
          const fileName = `${materialKey}.json`;
          const filePath = MATERIALS_DIR + fileName;

          const materialData = {
            id: subject.id,
            name: subject.name,
            year: year,
            url: subject.url,
            downloadedAt: new Date().toISOString(),
            fileSize: Math.floor(Math.random() * 50) + 10,
            status: 'ready',
          };

          await FileSystem.writeAsStringAsync(
            filePath,
            JSON.stringify(materialData)
          );

          downloaded[materialKey] = {
            ...materialData,
            localPath: filePath,
          };

          totalCount++;
        }
      }

      await AsyncStorage.setItem(
        STORAGE_KEYS.DOWNLOADED_MATERIALS,
        JSON.stringify(downloaded)
      );

      return {
        success: true,
        message: 'All materials downloaded successfully',
        count: totalCount,
      };
    } catch (error) {
      console.error('Error downloading all materials:', error);
      return { success: false, message: 'Download failed' };
    }
  }

  async getMaterialDetails(year, materialId) {
    try {
      const downloaded = await this.getDownloadedMaterials();
      const key = `${year}_${materialId}`;
      return downloaded[key] || null;
    } catch (error) {
      console.error('Error getting material details:', error);
      return null;
    }
  }

  async deleteSubjectMaterial(year, materialId) {
    try {
      const materialKey = `${year}_${materialId}`;
      const fileName = `${materialKey}.json`;
      const filePath = MATERIALS_DIR + fileName;

      await FileSystem.deleteAsync(filePath);

      const downloaded = await this.getDownloadedMaterials();
      delete downloaded[materialKey];
      await AsyncStorage.setItem(
        STORAGE_KEYS.DOWNLOADED_MATERIALS,
        JSON.stringify(downloaded)
      );

      return { success: true, message: 'Material deleted successfully' };
    } catch (error) {
      console.error('Error deleting material:', error);
      return { success: false, message: 'Deletion failed' };
    }
  }

  async deleteAllYearMaterials(year) {
    try {
      const downloaded = await this.getDownloadedMaterials();
      const keysToDelete = Object.keys(downloaded).filter((key) =>
        key.startsWith(year + '_')
      );

      for (const key of keysToDelete) {
        const fileName = `${key}.json`;
        const filePath = MATERIALS_DIR + fileName;
        await FileSystem.deleteAsync(filePath);
        delete downloaded[key];
      }

      await AsyncStorage.setItem(
        STORAGE_KEYS.DOWNLOADED_MATERIALS,
        JSON.stringify(downloaded)
      );

      return {
        success: true,
        message: `All ${year} materials deleted`,
        count: keysToDelete.length,
      };
    } catch (error) {
      console.error('Error deleting year materials:', error);
      return { success: false, message: 'Deletion failed' };
    }
  }

  async getOfflineStorageInfo() {
    try {
      const downloaded = await this.getDownloadedMaterials();
      const materials = await this.getMaterials();

      let totalSize = 0;
      let downloadedCount = 0;
      let totalCount = 0;

      for (const year of Object.keys(materials)) {
        const yearData = materials[year];
        totalCount += yearData.subjects.length;

        for (const subject of yearData.subjects) {
          const key = `${year}_${subject.id}`;
          if (downloaded[key]) {
            downloadedCount++;
            totalSize += downloaded[key].fileSize || 0;
          }
        }
      }

      return {
        totalMaterials: totalCount,
        downloadedMaterials: downloadedCount,
        totalStorageUsed: `${totalSize}MB`,
        percentageDownloaded: Math.round(
          (downloadedCount / totalCount) * 100
        ),
      };
    } catch (error) {
      console.error('Error getting storage info:', error);
      return { error: 'Failed to get storage info' };
    }
  }
}

export default new MOEOfflineService();
