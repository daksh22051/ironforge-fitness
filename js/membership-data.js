/**
 * IRONFORGE FITNESS - Centralized Membership Data Architecture
 * Plans, Pricing, Feature Matrix, Day Passes, and FAQs
 */

const MEMBERSHIP_DATA = {
  meta: {
    title: 'IRONFORGE FITNESS | Membership Plans & Pricing',
    description: 'Explore transparent gym membership plans at IRONFORGE FITNESS in Ahmedabad. Basic (₹3,500), Performance (₹5,500), and Elite VIP (₹8,500). Flexible monthly and annual plans.'
  },
  plans: [
    {
      id: 'basic',
      tier: 'BASIC',
      badge: 'TIER 01',
      popular: false,
      tagline: 'Essential access for disciplined lifters.',
      monthlyPrice: 3500,
      annualPricePerMonth: 2800,
      annualBilledTotal: 33600,
      features: [
        { text: 'Full gym floor & free weights access', included: true },
        { text: 'Standard cardio & selectorized machine suite', included: true },
        { text: 'Full locker room & hot shower facilities', included: true },
        { text: 'Digital Ironforge mobile workout log', included: true },
        { text: 'Access during standard gym hours', included: true },
        { text: 'Group conditioning & barbell classes', included: false },
        { text: '1-on-1 private coach mentorship', included: false },
        { text: '24/7 WhatsApp coach accountability', included: false }
      ]
    },
    {
      id: 'performance',
      tier: 'PERFORMANCE',
      badge: 'MOST POPULAR',
      popular: true,
      tagline: 'Structured coaching, classes, and complete access.',
      monthlyPrice: 5500,
      annualPricePerMonth: 4400,
      annualBilledTotal: 52800,
      features: [
        { text: '24/7 all-hours unrestricted gym access', included: true },
        { text: 'Full free weights, turf track & Rogue racks', included: true },
        { text: 'Unlimited group conditioning & barbell classes', included: true },
        { text: 'Customized training split & nutrition protocol', included: true },
        { text: 'Monthly body composition & 1RM scans', included: true },
        { text: 'Full locker room, sauna & shower access', included: true },
        { text: '1-on-1 private coach mentorship (2x/mo)', included: false },
        { text: '24/7 direct WhatsApp coach line', included: false }
      ]
    },
    {
      id: 'elite',
      tier: 'ELITE VIP',
      badge: 'ALL-ACCESS VIP',
      popular: false,
      tagline: 'The ultimate 1-on-1 coaching & VIP recovery tier.',
      monthlyPrice: 8500,
      annualPricePerMonth: 6800,
      annualBilledTotal: 81600,
      features: [
        { text: '24/7 VIP unrestricted all-facility access', included: true },
        { text: '2x monthly 1-on-1 private coaching sessions', included: true },
        { text: 'Unlimited all group classes & turf clinics', included: true },
        { text: '24/7 direct WhatsApp master coach access', included: true },
        { text: 'Bi-weekly biometric & video form reviews', included: true },
        { text: 'Priority power rack & private turf bookings', included: true },
        { text: 'Complimentary laundry, towel & recovery lounge', included: true },
        { text: 'Guest day passes (2 free passes / month)', included: true }
      ]
    }
  ],
  dayPasses: [
    {
      name: 'SINGLE DAY PASS',
      price: 500,
      unit: 'PER DAY',
      desc: 'Full 1-day access to all equipment, turf track, and locker facilities. Perfect for travelers or guest workouts.'
    },
    {
      name: '10-SESSION FLEX PACK',
      price: 3500,
      unit: 'VALID FOR 90 DAYS',
      desc: '10 flexible drop-in sessions with zero expiration pressure. Includes all gym equipment and shower amenities.'
    }
  ],
  comparisonMatrix: [
    { category: 'ACCESS & HOURS', features: [
      { name: 'Standard Facility Hours Access', basic: true, performance: true, elite: true },
      { name: '24/7 Unrestricted All-Hours Access', basic: false, performance: true, elite: true },
      { name: '30m Turf Track & Sled Sprint Lane', basic: true, performance: true, elite: true },
      { name: 'Priority Power Rack Booking', basic: false, performance: false, elite: true }
    ]},
    { category: 'COACHING & CLASSES', features: [
      { name: 'On-Floor Form Spotting & Safety', basic: true, performance: true, elite: true },
      { name: 'Unlimited Group Classes (MetCon/Barbell)', basic: false, performance: true, elite: true },
      { name: 'Customized Training Blueprint', basic: false, performance: true, elite: true },
      { name: 'Dedicated 1-on-1 Private Sessions', basic: false, performance: 'Add-on', elite: '2x / Month' },
      { name: '24/7 WhatsApp Coach Line', basic: false, performance: false, elite: true }
    ]},
    { category: 'ASSESSMENTS & RECOVERY', features: [
      { name: 'Initial Movement & Safety Screen', basic: true, performance: true, elite: true },
      { name: 'Monthly Body Composition Scans', basic: false, performance: true, elite: true },
      { name: 'Locker & Hot Shower Facilities', basic: true, performance: true, elite: true },
      { name: 'Sauna & Percussion Recovery Lounge', basic: false, performance: true, elite: true },
      { name: 'Complimentary Towel Service', basic: false, performance: false, elite: true }
    ]}
  ],
  faqs: [
    {
      q: 'Can I switch or upgrade my plan later?',
      a: 'Yes, you can upgrade your plan at any time with immediate effect. Pro-rated adjustments are automatically credited to your account.'
    },
    {
      q: 'Is there a free trial before I commit to a membership?',
      a: 'Yes! We offer a complimentary 7-day all-access trial session so you can experience the gym, meet coaches, and test equipment before choosing a plan.'
    },
    {
      q: 'Can I freeze my membership if I travel or get sick?',
      a: 'Yes, all members can pause their membership for up to 30 days per calendar year with zero fees upon notifying our team.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm), credit/debit cards, NetBanking, and cash at our front desk.'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = MEMBERSHIP_DATA;
}
