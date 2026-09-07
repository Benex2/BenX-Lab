/**
 * Payment Context
 * Manages payment state, subscription status, and payment processing
 */

import React, { createContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as paystackService from '../services/paystackService';

export const PaymentContext = createContext();

export const PaymentProvider = ({ children }) => {
  const [currentPlan, setCurrentPlan] = useState('free');
  const [subscription, setSubscription] = useState(null);
  const [paymentHistory, setPaymentHistory] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState(null);
  const [userEmail, setUserEmail] = useState('');

  // Load payment data on app start
  useEffect(() => {
    loadPaymentData();
  }, []);

  const loadPaymentData = async () => {
    try {
      const savedPlan = await AsyncStorage.getItem('currentPlan');
      const savedSubscription = await AsyncStorage.getItem('subscription');
      const savedEmail = await AsyncStorage.getItem('userEmail');

      if (savedPlan) setCurrentPlan(savedPlan);
      if (savedSubscription) setSubscription(JSON.parse(savedSubscription));
      if (savedEmail) setUserEmail(savedEmail);
    } catch (error) {
      console.error('Failed to load payment data:', error);
    }
  };

  /**
   * Initialize one-time payment
   */
  const initiatePayment = useCallback(
    async (planId, userId) => {
      setIsProcessing(true);
      setPaymentError(null);

      try {
        if (!userEmail) {
          throw new Error('Email not found. Please update your profile.');
        }

        const plan = paystackService.SUBSCRIPTION_PLANS[planId.toUpperCase()];
        if (!plan) {
          throw new Error('Invalid plan selected');
        }

        const reference = paystackService.generatePaymentReference();

        const result = await paystackService.initializePayment({
          email: userEmail,
          amount: plan.amount,
          reference,
          metadata: {
            userId,
            planType: planId,
            phoneNumber: '', // Can be added from user profile
          },
        });

        if (result.success) {
          // Return the authorization URL to open in browser/WebView
          return {
            success: true,
            authorizationUrl: result.data.authorizationUrl,
            reference: result.data.reference,
          };
        } else {
          throw new Error(result.error);
        }
      } catch (error) {
        const errorMessage = error.message || 'Payment initialization failed';
        setPaymentError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsProcessing(false);
      }
    },
    [userEmail]
  );

  /**
   * Verify payment after transaction
   */
  const verifyPaymentTransaction = useCallback(
    async (reference, planId, userId) => {
      setIsProcessing(true);
      setPaymentError(null);

      try {
        const result = await paystackService.verifyPayment(reference);

        if (result.success && result.data.status === 'success') {
          // Update subscription
          const subscription = {
            planId,
            status: 'active',
            startDate: new Date(),
            reference: reference,
            amount: result.data.amount,
            renewalDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          };

          // Save to storage
          await AsyncStorage.setItem('currentPlan', planId);
          await AsyncStorage.setItem('subscription', JSON.stringify(subscription));

          setCurrentPlan(planId);
          setSubscription(subscription);

          // Add to payment history
          const newTransaction = {
            id: reference,
            amount: result.data.amount,
            date: new Date().toISOString(),
            status: 'successful',
            plan: planId,
          };

          setPaymentHistory([...paymentHistory, newTransaction]);
          await AsyncStorage.setItem(
            'paymentHistory',
            JSON.stringify([...paymentHistory, newTransaction])
          );

          return { success: true, subscription };
        } else {
          throw new Error(result.error || 'Payment verification failed');
        }
      } catch (error) {
        const errorMessage = error.message || 'Payment verification failed';
        setPaymentError(errorMessage);
        return { success: false, error: errorMessage };
      } finally {
        setIsProcessing(false);
      }
    },
    [paymentHistory]
  );

  /**
   * Cancel subscription
   */
  const cancelSubscription = useCallback(async () => {
    setIsProcessing(true);
    setPaymentError(null);

    try {
      if (!subscription) {
        throw new Error('No active subscription to cancel');
      }

      // Clear subscription
      setCurrentPlan('free');
      setSubscription(null);

      await AsyncStorage.setItem('currentPlan', 'free');
      await AsyncStorage.removeItem('subscription');

      return { success: true };
    } catch (error) {
      const errorMessage = error.message || 'Failed to cancel subscription';
      setPaymentError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsProcessing(false);
    }
  }, [subscription]);

  /**
   * Set user email
   */
  const setUserPaymentEmail = useCallback(async (email) => {
    try {
      setUserEmail(email);
      await AsyncStorage.setItem('userEmail', email);
    } catch (error) {
      console.error('Failed to save email:', error);
    }
  }, []);

  const value = {
    currentPlan,
    subscription,
    paymentHistory,
    isProcessing,
    paymentError,
    userEmail,
    initiatePayment,
    verifyPaymentTransaction,
    cancelSubscription,
    setUserPaymentEmail,
    SUBSCRIPTION_PLANS: paystackService.SUBSCRIPTION_PLANS,
  };

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

export default PaymentContext;
