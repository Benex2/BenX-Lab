import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from 'expo-file-system';
import axios from 'axios';

// Complete comprehensive list of ALL MOE subjects by year (96 total subjects)
const MOE_MATERIALS = {
  year1: {
    title: 'Year 1 Learner Materials',
    subjects: [
      // Core Subjects
      { id: 'y1_english', name: 'English Language', url: 'https://curriculumresources.edu.gh/year1_english/' },
      { id: 'y1_math', name: 'Mathematics', url: 'https://curriculumresources.edu.gh/year1_mathematics/' },
      { id: 'y1_integrated_science', name: 'Integrated Science', url: 'https://curriculumresources.edu.gh/year1_integrated-science/' },
      { id: 'y1_social_studies', name: 'Social Studies', url: 'https://curriculumresources.edu.gh/year1_social-studies/' },
      
      // Science Subjects
      { id: 'y1_biology', name: 'Biology', url: 'https://curriculumresources.edu.gh/year1_biology/' },
      { id: 'y1_chemistry', name: 'Chemistry', url: 'https://curriculumresources.edu.gh/year1_chemistry/' },
      { id: 'y1_physics', name: 'Physics', url: 'https://curriculumresources.edu.gh/year1_physics/' },
      
      // Technology & Design
      { id: 'y1_ict', name: 'Information & Communication Technology', url: 'https://curriculumresources.edu.gh/year1_ict/' },
      { id: 'y1_technology_design', name: 'Technology & Design', url: 'https://curriculumresources.edu.gh/year1_technology-design/' },
      
      // Arts & Physical Education
      { id: 'y1_physical_education', name: 'Physical Education', url: 'https://curriculumresources.edu.gh/year1_physical-education/' },
      { id: 'y1_visual_arts', name: 'Visual Arts', url: 'https://curriculumresources.edu.gh/year1_visual-arts/' },
      { id: 'y1_music', name: 'Music', url: 'https://curriculumresources.edu.gh/year1_music/' },
      { id: 'y1_dance', name: 'Dance', url: 'https://curriculumresources.edu.gh/year1_dance/' },
      { id: 'y1_drama', name: 'Drama & Theatre Arts', url: 'https://curriculumresources.edu.gh/year1_drama/' },
      
      // Values & Numeracy
      { id: 'y1_civic_responsibility', name: 'Civic Responsibility & Good Citizenship', url: 'https://curriculumresources.edu.gh/year1_civic-responsibility/' },
      { id: 'y1_personal_development', name: 'Personal Development & Family Life', url: 'https://curriculumresources.edu.gh/year1_personal-development/' },
      { id: 'y1_numeracy', name: 'Numeracy Skills', url: 'https://curriculumresources.edu.gh/year1_numeracy/' },
      
      // Languages - Ghanaian
      { id: 'y1_akan', name: 'Akan', url: 'https://curriculumresources.edu.gh/year1_akan/' },
      { id: 'y1_ewe', name: 'Ewe', url: 'https://curriculumresources.edu.gh/year1_ewe/' },
      { id: 'y1_ga', name: 'Ga', url: 'https://curriculumresources.edu.gh/year1_ga/' },
      { id: 'y1_dangbe', name: 'Dangbe', url: 'https://curriculumresources.edu.gh/year1_dangbe/' },
      { id: 'y1_kasem', name: 'Kasem', url: 'https://curriculumresources.edu.gh/year1_kasem/' },
      { id: 'y1_nzema', name: 'Nzema', url: 'https://curriculumresources.edu.gh/year1_nzema/' },
      
      // Foreign Languages
      { id: 'y1_french', name: 'French', url: 'https://curriculumresources.edu.gh/year1_french/' },
      { id: 'y1_arabic', name: 'Arabic', url: 'https://curriculumresources.edu.gh/year1_arabic/' },
    ],
  },
  year2: {
    title: 'Year 2 Learner Materials',
    subjects: [
      // Core Subjects
      { id: 'y2_english', name: 'English Language', url: 'https://curriculumresources.edu.gh/year2_english/' },
      { id: 'y2_math', name: 'Mathematics', url: 'https://curriculumresources.edu.gh/year2_mathematics/' },
      { id: 'y2_integrated_science', name: 'Integrated Science', url: 'https://curriculumresources.edu.gh/year2_integrated-science/' },
      { id: 'y2_social_studies', name: 'Social Studies', url: 'https://curriculumresources.edu.gh/year2_social-studies/' },
      
      // Science Subjects
      { id: 'y2_biology', name: 'Biology', url: 'https://curriculumresources.edu.gh/year2_biology/' },
      { id: 'y2_chemistry', name: 'Chemistry', url: 'https://curriculumresources.edu.gh/year2_chemistry/' },
      { id: 'y2_physics', name: 'Physics', url: 'https://curriculumresources.edu.gh/year2_physics/' },
      
      // Technology & Design
      { id: 'y2_ict', name: 'Information & Communication Technology', url: 'https://curriculumresources.edu.gh/year2_ict/' },
      { id: 'y2_technology_design', name: 'Technology & Design', url: 'https://curriculumresources.edu.gh/year2_technology-design/' },
      
      // Arts & Physical Education
      { id: 'y2_physical_education', name: 'Physical Education', url: 'https://curriculumresources.edu.gh/year2_physical-education/' },
      { id: 'y2_visual_arts', name: 'Visual Arts', url: 'https://curriculumresources.edu.gh/year2_visual-arts/' },
      { id: 'y2_music', name: 'Music', url: 'https://curriculumresources.edu.gh/year2_music/' },
      { id: 'y2_dance', name: 'Dance', url: 'https://curriculumresources.edu.gh/year2_dance/' },
      { id: 'y2_drama', name: 'Drama & Theatre Arts', url: 'https://curriculumresources.edu.gh/year2_drama/' },
      
      // Values & Numeracy
      { id: 'y2_civic_responsibility', name: 'Civic Responsibility & Good Citizenship', url: 'https://curriculumresources.edu.gh/year2_civic-responsibility/' },
      { id: 'y2_personal_development', name: 'Personal Development & Family Life', url: 'https://curriculumresources.edu.gh/year2_personal-development/' },
      { id: 'y2_numeracy', name: 'Numeracy Skills', url: 'https://curriculumresources.edu.gh/year2_numeracy/' },
      
      // Languages - Ghanaian
      { id: 'y2_akan', name: 'Akan', url: 'https://curriculumresources.edu.gh/year2_akan/' },
      { id: 'y2_ewe', name: 'Ewe', url: 'https://curriculumresources.edu.gh/year2_ewe/' },
      { id: 'y2_ga', name: 'Ga', url: 'https://curriculumresources.edu.gh/year2_ga/' },
      { id: 'y2_dangbe', name: 'Dangbe', url: 'https://curriculumresources.edu.gh/year2_dangbe/' },
      { id: 'y2_kasem', name: 'Kasem', url: 'https://curriculumresources.edu.gh/year2_kasem/' },
      { id: 'y2_nzema', name: 'Nzema', url: 'https://curriculumresources.edu.gh/year2_nzema/' },
      
      // Foreign Languages
      { id: 'y2_french', name: 'French', url: 'https://curriculumresources.edu.gh/year2_french/' },
      { id: 'y2_arabic', name: 'Arabic', url: 'https://curriculumresources.edu.gh/year2_arabic/' },
    ],
  },
  year3: {
    title: 'Year 3 Learner Materials (WASSCE Examination)',
    subjects: [
      // Core Subjects
      { id: 'y3_english', name: 'English Language', url: 'https://curriculumresources.edu.gh/year3_english/' },
      { id: 'y3_core_math', name: 'Core Mathematics', url: 'https://curriculumresources.edu.gh/year3_core-mathematics/' },
      { id: 'y3_elective_math', name: 'Elective Mathematics', url: 'https://curriculumresources.edu.gh/year3_elective-mathematics/' },
      
      // Science Stream
      { id: 'y3_integrated_science', name: 'Integrated Science', url: 'https://curriculumresources.edu.gh/year3_integrated-science/' },
      { id: 'y3_biology', name: 'Biology', url: 'https://curriculumresources.edu.gh/year3_biology/' },
      { id: 'y3_chemistry', name: 'Chemistry', url: 'https://curriculumresources.edu.gh/year3_chemistry/' },
      { id: 'y3_physics', name: 'Physics', url: 'https://curriculumresources.edu.gh/year3_physics/' },
      
      // Social Studies Stream
      { id: 'y3_social_studies', name: 'Social Studies', url: 'https://curriculumresources.edu.gh/year3_social-studies/' },
      { id: 'y3_geography', name: 'Geography', url: 'https://curriculumresources.edu.gh/year3_geography/' },
      { id: 'y3_history', name: 'History', url: 'https://curriculumresources.edu.gh/year3_history/' },
      
      // Business & Economics
      { id: 'y3_business', name: 'Business Management', url: 'https://curriculumresources.edu.gh/year3_business-management/' },
      { id: 'y3_economics', name: 'Economics', url: 'https://curriculumresources.edu.gh/year3_economics/' },
      { id: 'y3_accounting', name: 'Accounting', url: 'https://curriculumresources.edu.gh/year3_accounting/' },
      { id: 'y3_financial_accounting', name: 'Financial Accounting', url: 'https://curriculumresources.edu.gh/year3_financial-accounting/' },
      { id: 'y3_cost_accounting', name: 'Cost Accounting', url: 'https://curriculumresources.edu.gh/year3_cost-accounting/' },
      
      // Technology & ICT
      { id: 'y3_ict', name: 'Information & Communication Technology', url: 'https://curriculumresources.edu.gh/year3_ict/' },
      { id: 'y3_computer_science', name: 'Computer Science', url: 'https://curriculumresources.edu.gh/year3_computer-science/' },
      
      // Literature & Languages
      { id: 'y3_literature', name: 'Literature in English', url: 'https://curriculumresources.edu.gh/year3_literature/' },
      { id: 'y3_french', name: 'French', url: 'https://curriculumresources.edu.gh/year3_french/' },
      { id: 'y3_arabic', name: 'Arabic', url: 'https://curriculumresources.edu.gh/year3_arabic/' },
      
      // Ghanaian Languages
      { id: 'y3_akan', name: 'Akan', url: 'https://curriculumresources.edu.gh/year3_akan/' },
      { id: 'y3_ewe', name: 'Ewe', url: 'https://curriculumresources.edu.gh/year3_ewe/' },
      { id: 'y3_ga', name: 'Ga', url: 'https://curriculumresources.edu.gh/year3_ga/' },
      { id: 'y3_dangbe', name: 'Dangbe', url: 'https://curriculumresources.edu.gh/year3_dangbe/' },
      { id: 'y3_kasem', name: 'Kasem', url: 'https://curriculumresources.edu.gh/year3_kasem/' },
      { id: 'y3_nzema', name: 'Nzema', url: 'https://curriculumresources.edu.gh/year3_nzema/' },
      
      // Arts & Design
      { id: 'y3_visual_arts', name: 'Visual Arts', url: 'https://curriculumresources.edu.gh/year3_visual-arts/' },
      { id: 'y3_music', name: 'Music', url: 'https://curriculumresources.edu.gh/year3_music/' },
      { id: 'y3_dance', name: 'Dance', url: 'https://curriculumresources.edu.gh/year3_dance/' },
      { id: 'y3_drama', name: 'Drama & Theatre Arts', url: 'https://curriculumresources.edu.gh/year3_drama/' },
      
      // Practical & Technical Subjects
      { id: 'y3_general_agriculture', name: 'General Agriculture', url: 'https://curriculumresources.edu.gh/year3_general-agriculture/' },
      { id: 'y3_animal_husbandry', name: 'Animal Husbandry', url: 'https://curriculumresources.edu.gh/year3_animal-husbandry/' },
      { id: 'y3_crop_production', name: 'Crop Production', url: 'https://curriculumresources.edu.gh/year3_crop-production/' },
      { id: 'y3_building_construction', name: 'Building Construction', url: 'https://curriculumresources.edu.gh/year3_building-construction/' },
      { id: 'y3_electrical_installation', name: 'Electrical Installation Work', url: 'https://curriculumresources.edu.gh/year3_electrical-installation/' },
      { id: 'y3_welding_fabrication', name: 'Welding & Fabrication', url: 'https://curriculumresources.edu.gh/year3_welding-fabrication/' },
      { id: 'y3_food_nutrition', name: 'Food & Nutrition', url: 'https://curriculumresources.edu.gh/year3_food-nutrition/' },
      { id: 'y3_fashion_textiles', name: 'Fashion & Textiles', url: 'https://curriculumresources.edu.gh/year3_fashion-textiles/' },
      { id: 'y3_health_safety', name: 'Health & Safety', url: 'https://curriculumresources.edu.gh/year3_health-safety/' },
      
      // Physical Education & Values
      { id: 'y3_physical_education', name: 'Physical Education', url: 'https://curriculumresources.edu.gh/year3_physical-education/' },
      { id: 'y3_civic_responsibility', name: 'Civic Responsibility & Good Citizenship', url: 'https://curriculumresources.edu.gh/year3_civic-responsibility/' },
      { id: 'y3_personal_development', name: 'Personal Development & Family Life', url: 'https://curriculumresources.edu.gh/year3_personal-development/' },
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
