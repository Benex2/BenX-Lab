/**
 * Paystack Payment Service
 * Handles all payment transactions, subscriptions, and transaction verification
 */

import axios from 'axios';

// Initialize with your Paystack keys (will be set via environment variables)
const PAYSTACK_SECRET_KEY = process.env.REACT_APP_PAYSTACK_SECRET_KEY || '';
const PAYSTACK_PUBLIC_KEY = process.env.REACT_APP_PAYSTACK_PUBLIC_KEY || '';
const PAYSTACK_API_BASE = 'https://api.paystack.co';

// Create axios instance with Paystack headers
const paystackAPI = axios.create({
  baseURL: PAYSTACK_API_BASE,
  headers: {
    Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    'Content-Type': 'application/json',
  },
});

/**
 * Subscription Plans Configuration
 */
export const SUBSCRIPTION_PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'GHS',
    features: [
      'Ad-supported access',
      'Limited WASSCE practice questions',
      '5 coding challenges/month',
      'Basic dictionary access',
    ],
  },
  PREMIUM: {
    id: 'premium',
    name: 'Premium',
    price: 10, // GH₵ 10
    currency: 'GHS',
    amount: 1000, // Paystack expects amounts in pesewas (multiply by 100)
    plan_code: 'PLN_premium_benx', // Will be created in Paystack dashboard
    interval: 'monthly',
    features: [
      'Ad-free experience',
      'Unlimited WASSCE practice',
      '50 coding challenges/month',
      'Full programming tutorials',
      'Offline study materials',
      'Priority support',
    ],
  },
  PRO: {
    id: 'pro',
    name: 'Pro',
    price: 30, // GH₵ 30
    currency: 'GHS',
    amount: 3000, // Paystack expects amounts in pesewas (multiply by 100)
    plan_code: 'PLN_pro_benx', // Will be created in Paystack dashboard
    interval: 'monthly',
    features: [
      'All Premium features',
      'Unlimited challenges',
      'AI code assistant priority',
      'Personalized learning paths',
      'Code mentorship access',
      '24/7 priority support',
      'Early access to new features',
    ],
  },
};

/**
 * Initialize Payment Transaction
 * @param {Object} data - Payment data
 * @param {string} data.email - Customer email
 * @param {number} data.amount - Amount in pesewas (e.g., 1000 = GH₵ 10)
 * @param {string} data.reference - Unique transaction reference
 * @param {Object} data.metadata - Additional metadata
 * @returns {Promise<Object>} Authorization URL and access code
 */
export const initializePayment = async (data) => {
  try {
    const response = await paystackAPI.post('/transaction/initialize', {
      email: data.email,
      amount: data.amount,
      reference: data.reference,
      metadata: {
        custom_fields: [
          {
            display_name: 'User ID',
            variable_name: 'user_id',
            value: data.metadata?.userId || '',
          },
          {
            display_name: 'Plan Type',
            variable_name: 'plan_type',
            value: data.metadata?.planType || '',
          },
          {
            display_name: 'Phone Number',
            variable_name: 'phone_number',
            value: data.metadata?.phoneNumber || '',
          },
        ],
      },
    });

    return {
      success: true,
      data: {
        authorizationUrl: response.data.data.authorization_url,
        accessCode: response.data.data.access_code,
        reference: response.data.data.reference,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to initialize payment',
    };
  }
};

/**
 * Verify Payment Transaction
 * @param {string} reference - Transaction reference
 * @returns {Promise<Object>} Transaction details and status
 */
export const verifyPayment = async (reference) => {
  try {
    const response = await paystackAPI.get(`/transaction/verify/${reference}`);

    if (response.data.data.status === 'success') {
      return {
        success: true,
        data: {
          status: response.data.data.status,
          reference: response.data.data.reference,
          amount: response.data.data.amount / 100, // Convert from pesewas to GHS
          email: response.data.data.customer.email,
          planType: response.data.data.metadata.custom_fields.find(
            (f) => f.variable_name === 'plan_type'
          )?.value,
          userId: response.data.data.metadata.custom_fields.find(
            (f) => f.variable_name === 'user_id'
          )?.value,
          paidAt: response.data.data.paid_at,
        },
      };
    } else {
      return {
        success: false,
        error: 'Payment verification failed',
      };
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to verify payment',
    };
  }
};

/**
 * Create Subscription Plan
 * @param {Object} plan - Plan details
 * @returns {Promise<Object>} Created plan data
 */
export const createSubscriptionPlan = async (plan) => {
  try {
    const response = await paystackAPI.post('/plan', {
      name: plan.name,
      description: plan.description,
      amount: plan.amount, // in pesewas
      interval: plan.interval, // monthly, yearly, etc.
      plan_code: plan.plan_code,
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create plan',
    };
  }
};

/**
 * Create Subscription for Customer
 * @param {Object} data - Subscription data
 * @param {string} data.email - Customer email
 * @param {string} data.plan - Plan code
 * @param {string} data.authorization - Authorization code (from previous payment)
 * @returns {Promise<Object>} Subscription data
 */
export const createSubscription = async (data) => {
  try {
    const response = await paystackAPI.post('/subscription', {
      customer: data.email,
      plan: data.plan,
      authorization: data.authorization,
      start_date: data.startDate || null,
    });

    return {
      success: true,
      data: {
        subscriptionId: response.data.data.subscription_code,
        customerId: response.data.data.customer,
        plan: response.data.data.plan,
        status: response.data.data.status,
        nextPaymentDate: response.data.data.next_payment_date,
      },
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create subscription',
    };
  }
};

/**
 * Disable Subscription
 * @param {string} code - Subscription code
 * @param {string} token - Subscription token
 * @returns {Promise<Object>} Disable result
 */
export const disableSubscription = async (code, token) => {
  try {
    const response = await paystackAPI.post(`/subscription/disable`, {
      code,
      token,
    });

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to disable subscription',
    };
  }
};

/**
 * Get Customer Transactions
 * @param {string} customerEmail - Customer email
 * @returns {Promise<Object>} List of transactions
 */
export const getCustomerTransactions = async (customerEmail) => {
  try {
    const response = await paystackAPI.get('/transaction', {
      params: {
        customer: customerEmail,
      },
    });

    return {
      success: true,
      data: response.data.data.map((transaction) => ({
        id: transaction.id,
        reference: transaction.reference,
        amount: transaction.amount / 100,
        status: transaction.status,
        date: transaction.created_at,
        plan: transaction.metadata?.custom_fields?.find(
          (f) => f.variable_name === 'plan_type'
        )?.value,
      })),
    };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch transactions',
    };
  }
};

/**
 * Generate Unique Payment Reference
 * @returns {string} Unique reference
 */
export const generatePaymentReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `BENX-${timestamp}-${random}`;
};

/**
 * Format Amount for Display
 * @param {number} amount - Amount in GHS
 * @returns {string} Formatted amount string
 */
export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-GH', {
    style: 'currency',
    currency: 'GHS',
  }).format(amount);
};

export default {
  initializePayment,
  verifyPayment,
  createSubscriptionPlan,
  createSubscription,
  disableSubscription,
  getCustomerTransactions,
  generatePaymentReference,
  formatAmount,
  SUBSCRIPTION_PLANS,
};
