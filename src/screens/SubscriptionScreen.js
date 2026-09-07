/**
 * Subscription Screen Component
 * Displays subscription plans and handles payment initiation
 */

import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaymentContext } from '../context/PaymentContext';
import { ThemeContext } from '../context/ThemeContext';

const SubscriptionScreen = ({ userId }) => {
  const { colors, spacing } = useContext(ThemeContext);
  const {
    currentPlan,
    isProcessing,
    initiatePayment,
    verifyPaymentTransaction,
    SUBSCRIPTION_PLANS,
  } = useContext(PaymentContext);

  const [showPaymentWebView, setShowPaymentWebView] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState('');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [paymentReference, setPaymentReference] = useState('');

  const handleUpgradePlan = async (planId) => {
    if (currentPlan !== 'free' && currentPlan === planId.toLowerCase()) {
      Alert.alert('Already Subscribed', `You are already on the ${planId} plan.`);
      return;
    }

    setSelectedPlan(planId);

    try {
      const result = await initiatePayment(planId, userId);

      if (result.success) {
        setPaymentUrl(result.authorizationUrl);
        setPaymentReference(result.reference);
        setShowPaymentWebView(true);
      } else {
        Alert.alert('Error', result.error || 'Failed to initiate payment');
      }
    } catch (error) {
      Alert.alert('Error', error.message || 'An error occurred');
    }
  };

  const handlePaymentWebViewNavigationStateChange = async (newNavState) => {
    const { url } = newNavState;

    // Check if payment was successful
    if (url.includes('reference=')) {
      setShowPaymentWebView(false);

      try {
        const result = await verifyPaymentTransaction(
          paymentReference,
          selectedPlan.toLowerCase(),
          userId
        );

        if (result.success) {
          Alert.alert(
            'Success',
            `Subscription to ${selectedPlan} plan activated!`,
            [{ text: 'OK', onPress: () => {} }]
          );
        } else {
          Alert.alert('Payment Failed', result.error || 'Payment verification failed');
        }
      } catch (error) {
        Alert.alert('Error', error.message || 'An error occurred');
      }
    }
  };

  const PlanCard = ({ plan, planKey }) => {
    const isCurrentPlan = currentPlan === planKey.toLowerCase();
    const isPopular = planKey === 'PREMIUM';

    return (
      <View
        style={[
          styles.planCard,
          {
            borderColor: isCurrentPlan ? colors.primary : colors.secondary,
            borderWidth: isCurrentPlan ? 2 : 1,
            backgroundColor: isPopular ? colors.secondary + '15' : colors.cardFill,
          },
        ]}
      >
        {isPopular && (
          <View style={[styles.popularBadge, { backgroundColor: colors.primary }]}>
            <Text style={styles.popularText}>POPULAR</Text>
          </View>
        )}

        <Text style={[styles.planName, { color: colors.text }]}>{plan.name}</Text>

        <View style={styles.priceContainer}>
          <Text style={[styles.price, { color: colors.primary }]}>
            GH₵ {plan.price}
          </Text>
          <Text style={[styles.billingPeriod, { color: colors.textSecondary }]}>
            /month
          </Text>
        </View>

        <View style={styles.featuresContainer}>
          {plan.features.map((feature, index) => (
            <View key={index} style={styles.featureRow}>
              <MaterialCommunityIcons
                name="check-circle"
                size={16}
                color={colors.primary}
                style={styles.featureIcon}
              />
              <Text style={[styles.featureText, { color: colors.text }]}>
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.upgradeButton,
            {
              backgroundColor: isCurrentPlan ? colors.textSecondary : colors.primary,
              opacity: isCurrentPlan ? 0.5 : 1,
            },
          ]}
          onPress={() => handleUpgradePlan(planKey)}
          disabled={isCurrentPlan || isProcessing}
        >
          {isProcessing && selectedPlan === planKey ? (
            <ActivityIndicator color={colors.background} />
          ) : (
            <Text style={[styles.upgradeButtonText, { color: colors.background }]}>
              {isCurrentPlan ? 'Current Plan' : 'Upgrade Now'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>
          Choose Your Plan
        </Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Unlock premium features and enhance your learning experience
        </Text>
      </View>

      {/* Plan Cards */}
      <View style={styles.plansContainer}>
        {Object.entries(SUBSCRIPTION_PLANS).map(([key, plan]) => (
          <PlanCard key={key} plan={plan} planKey={key} />
        ))}
      </View>

      {/* Benefits Section */}
      <View style={styles.benefitsSection}>
        <Text style={[styles.benefitsTitle, { color: colors.text }]}>
          Why Upgrade?
        </Text>

        <View style={styles.benefitItem}>
          <MaterialCommunityIcons
            name="ad-off"
            size={24}
            color={colors.primary}
          />
          <View style={styles.benefitText}>
            <Text style={[styles.benefitTitle, { color: colors.text }]}>
              Ad-Free Experience
            </Text>
            <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
              Focus on learning without interruptions
            </Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <MaterialCommunityIcons
            name="infinity"
            size={24}
            color={colors.primary}
          />
          <View style={styles.benefitText}>
            <Text style={[styles.benefitTitle, { color: colors.text }]}>
              Unlimited Access
            </Text>
            <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
              Access all study materials and coding challenges
            </Text>
          </View>
        </View>

        <View style={styles.benefitItem}>
          <MaterialCommunityIcons
            name="headset"
            size={24}
            color={colors.primary}
          />
          <View style={styles.benefitText}>
            <Text style={[styles.benefitTitle, { color: colors.text }]}>
              Priority Support
            </Text>
            <Text style={[styles.benefitDescription, { color: colors.textSecondary }]}>
              Get help when you need it most
            </Text>
          </View>
        </View>
      </View>

      {/* Payment Methods */}
      <View style={styles.paymentSection}>
        <Text style={[styles.paymentTitle, { color: colors.text }]}>
          Payment Methods
        </Text>
        <View style={[styles.paymentMethod, { backgroundColor: colors.cardFill }]}>
          <MaterialCommunityIcons
            name="wallet"
            size={20}
            color={colors.primary}
          />
          <Text style={[styles.paymentMethodText, { color: colors.text }]}>
            Mobile Money (MTN, Telecel, AT)
          </Text>
        </View>
        <View style={[styles.paymentMethod, { backgroundColor: colors.cardFill }]}>
          <MaterialCommunityIcons
            name="credit-card"
            size={20}
            color={colors.primary}
          />
          <Text style={[styles.paymentMethodText, { color: colors.text }]}>
            Debit/Credit Card
          </Text>
        </View>
      </View>

      {/* FAQ Section */}
      <View style={styles.faqSection}>
        <Text style={[styles.faqTitle, { color: colors.text }]}>
          Frequently Asked Questions
        </Text>

        <View style={styles.faqItem}>
          <Text style={[styles.faqQuestion, { color: colors.text }]}>
            Can I change my plan anytime?
          </Text>
          <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
            Yes, you can upgrade or downgrade your plan at any time. Changes will
            take effect immediately.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={[styles.faqQuestion, { color: colors.text }]}>
            Is there a free trial?
          </Text>
          <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
            The Free plan gives you limited access to explore the platform before
            upgrading.
          </Text>
        </View>

        <View style={styles.faqItem}>
          <Text style={[styles.faqQuestion, { color: colors.text }]}>
            How do I cancel my subscription?
          </Text>
          <Text style={[styles.faqAnswer, { color: colors.textSecondary }]}>
            You can cancel anytime from your account settings. Your access will
            remain until the end of your billing period.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    padding: 16,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  plansContainer: {
    marginBottom: 32,
  },
  planCard: {
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    position: 'relative',
  },
  popularBadge: {
    position: 'absolute',
    top: -10,
    right: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  planName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: 16,
  },
  price: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  billingPeriod: {
    fontSize: 14,
    marginLeft: 4,
  },
  featuresContainer: {
    marginBottom: 20,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureIcon: {
    marginRight: 12,
  },
  featureText: {
    fontSize: 14,
    flex: 1,
  },
  upgradeButton: {
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  upgradeButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  benefitsSection: {
    marginBottom: 32,
  },
  benefitsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  benefitText: {
    marginLeft: 16,
    flex: 1,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  benefitDescription: {
    fontSize: 14,
  },
  paymentSection: {
    marginBottom: 32,
  },
  paymentTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12,
  },
  paymentMethodText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: '500',
  },
  faqSection: {
    marginBottom: 32,
  },
  faqTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  faqItem: {
    marginBottom: 16,
  },
  faqQuestion: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 13,
    lineHeight: 20,
  },
});

export default SubscriptionScreen;
