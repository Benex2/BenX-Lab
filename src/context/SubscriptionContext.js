import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [subscription, setSubscription] = useState({
    tier: 'free', // 'free', 'premium', 'pro'
    isActive: false,
    expiresAt: null,
    offlineMode: false,
  });

  const updateSubscription = async (newSubscription) => {
    setSubscription(newSubscription);
    await AsyncStorage.setItem('subscription', JSON.stringify(newSubscription));
  };

  const toggleOfflineMode = async (enabled) => {
    const updated = { ...subscription, offlineMode: enabled };
    await updateSubscription(updated);
  };

  return (
    <SubscriptionContext.Provider
      value={{
        subscription,
        updateSubscription,
        toggleOfflineMode,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);
  if (!context) {
    throw new Error('useSubscription must be used within SubscriptionProvider');
  }
  return context;
};
