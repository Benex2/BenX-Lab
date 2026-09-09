import React, { createContext, useContext, useState, useEffect } from 'react';
import MOEOfflineService from '../services/moeOfflineService';

const OfflineMaterialsContext = createContext();

export const OfflineMaterialsProvider = ({ children }) => {
  const [materials, setMaterials] = useState({});
  const [downloadedMaterials, setDownloadedMaterials] = useState({});
  const [storageInfo, setStorageInfo] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    initializeMaterials();
  }, []);

  const initializeMaterials = async () => {
    try {
      await MOEOfflineService.initializeOfflineStorage();
      const allMaterials = await MOEOfflineService.getMaterials();
      const downloaded = await MOEOfflineService.getDownloadedMaterials();
      const info = await MOEOfflineService.getOfflineStorageInfo();

      setMaterials(allMaterials);
      setDownloadedMaterials(downloaded);
      setStorageInfo(info);
    } catch (error) {
      console.error('Error initializing materials:', error);
    }
  };

  const downloadMaterial = async (year, subject) => {
    setLoading(true);
    try {
      const result = await MOEOfflineService.downloadSubjectMaterial(year, subject);
      if (result.success) {
        await initializeMaterials();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const downloadYearMaterials = async (year) => {
    setLoading(true);
    try {
      const result = await MOEOfflineService.downloadAllYearMaterials(year);
      if (result.success) {
        await initializeMaterials();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const downloadAllMaterials = async () => {
    setLoading(true);
    try {
      const result = await MOEOfflineService.downloadAllMaterials();
      if (result.success) {
        await initializeMaterials();
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  const deleteMaterial = async (year, materialId) => {
    try {
      const result = await MOEOfflineService.deleteSubjectMaterial(year, materialId);
      if (result.success) {
        await initializeMaterials();
      }
      return result;
    } catch (error) {
      console.error('Error deleting material:', error);
      return { success: false, message: 'Deletion failed' };
    }
  };

  const deleteYearMaterials = async (year) => {
    try {
      const result = await MOEOfflineService.deleteAllYearMaterials(year);
      if (result.success) {
        await initializeMaterials();
      }
      return result;
    } catch (error) {
      console.error('Error deleting year materials:', error);
      return { success: false, message: 'Deletion failed' };
    }
  };

  const isMaterialDownloaded = (year, materialId) => {
    const key = `${year}_${materialId}`;
    return !!downloadedMaterials[key];
  };

  return (
    <OfflineMaterialsContext.Provider
      value={{
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
        refresh: initializeMaterials,
      }}
    >
      {children}
    </OfflineMaterialsContext.Provider>
  );
};

export const useOfflineMaterials = () => {
  const context = useContext(OfflineMaterialsContext);
  if (!context) {
    throw new Error('useOfflineMaterials must be used within OfflineMaterialsProvider');
  }
  return context;
};
