/**
 * IRONFORGE FITNESS - Centralized Single Source of Truth for Pricing
 */
const PRICING_CONFIG = {
  currency: 'INR',
  symbol: '₹',
  plans: {
    basic: {
      tier: 'BASIC',
      monthlyPrice: 3500,
      annualPricePerMonth: 2800,
      annualBilledTotal: 33600
    },
    performance: {
      tier: 'PERFORMANCE',
      monthlyPrice: 5500,
      annualPricePerMonth: 4400,
      annualBilledTotal: 52800
    },
    elite: {
      tier: 'ELITE VIP',
      monthlyPrice: 8500,
      annualPricePerMonth: 6800,
      annualBilledTotal: 81600
    }
  },
  dayPasses: {
    single: { price: 500, unit: 'PER DAY' },
    pack: { price: 3500, unit: 'VALID FOR 90 DAYS' }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PRICING_CONFIG;
}
if (typeof window !== 'undefined') {
  window.PRICING_CONFIG = PRICING_CONFIG;
}
