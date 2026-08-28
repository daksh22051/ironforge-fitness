/**
 * IRONFORGE FITNESS - Centralized Facilities Data Architecture
 * Zones, Equipment Specs, Brand Standards, Amenities, and FAQs
 */

const FACILITIES_DATA = {
  meta: {
    title: 'IRONFORGE FITNESS | World-Class Facility & Equipment',
    description: 'Explore 15,000 sq ft of competition-grade power racks, Olympic platforms, dumbbells up to 60kg, 30m turf sprint lane, and recovery sauna at IRONFORGE FITNESS Ahmedabad.'
  },
  stats: [
    { label: 'FACILITY SPACE', val: '15,000 SQ FT' },
    { label: 'POWER RACKS', val: '8 ROGUE MONSTER' },
    { label: 'TURF TRACK', val: '30 METERS' },
    { label: 'DUMBBELL RANGE', val: '2.5KG – 60KG' }
  ],
  zones: [
    {
      id: 'strength-floor',
      number: '01',
      category: 'STRENGTH & RACKS',
      categoryFilter: 'strength',
      title: 'HEAVY STRENGTH & POWER RACKS',
      tag: 'POWER & BARBELLS',
      image: '/assets/images/facility-strength.jpg',
      headline: 'Rogue Monster Racks & Competition Olympic Platforms.',
      desc: 'Built specifically for heavy compound powerlifting and Olympic weightlifting. Eight dedicated Rogue Monster series power racks with calibrated Eleiko competition bars, cast iron plates, and heavy-duty drop platforms.',
      equipment: [
        '8x Rogue Monster Series Power Racks with Westside Spacing',
        'Eleiko IPF/IWF Certified 20kg Barbells & Safety Squat Bars',
        'Cast Iron calibrated plates + high-density crumb bumper plates',
        'Deadlift jacks, band pegs, and heavy-duty competition bench presses'
      ],
      specs: [
        { label: 'RACKS', val: '8 STATIONS' },
        { label: 'BARBELLS', val: 'ELEIKO & ROGUE' },
        { label: 'FLOORING', val: 'HIGH-IMPACT RUBBER' }
      ]
    },
    {
      id: 'free-weights',
      number: '02',
      category: 'FREE WEIGHTS',
      categoryFilter: 'weights',
      title: 'FREE WEIGHTS & DUMBBELL SUITE',
      tag: 'HYPERTROPHY SUITE',
      image: '/assets/images/facility-weights.jpg',
      headline: 'Dumbbells 2.5kg to 60kg & Heavy Ergonomic Benches.',
      desc: 'Comprehensive dumbbell and selectorized machine suite. High-durability urethane dumbbells in 2.5kg increments up to 60kg, paired with commercial incline, flat, and decline benches with zero wobble.',
      equipment: [
        'Urethane Dumbbell Pairs from 2.5kg to 60kg (Pairs of each)',
        '10x Commercial Heavy Duty Adjustable Incline/Flat Benches',
        'Dual Adjustable Cable Pulleys with full functional grip attachment rack',
        'Preacher curl stations, heavy standing calf machines, and seated rows'
      ],
      specs: [
        { label: 'WEIGHT RANGE', val: '2.5KG – 60KG' },
        { label: 'BENCHES', val: '10 ADJUSTABLE' },
        { label: 'CABLES', val: 'DUAL MULTI-STACK' }
      ]
    },
    {
      id: 'conditioning-zone',
      number: '03',
      category: 'TURF & CARDIO',
      categoryFilter: 'turf',
      title: '30M SPRINT TURF & CONDITIONING',
      tag: 'METCON & SPRINT LANE',
      image: '/assets/images/facility-conditioning.jpg',
      headline: 'Heavy Prowler Sleds, Ergometers & Battle Ropes.',
      desc: 'A dedicated 30-meter high-friction indoor sprint turf designed for sled pushes, speed intervals, and metabolic conditioning without compromising open floor traffic.',
      equipment: [
        '30-Meter High-Traction Shock-Absorbing Indoor Sprint Turf Lane',
        '4x Rogue Dog Sleds and Heavy Prowlers with low & high push handles',
        'Concept2 RowErgs, SkiErgs, and Assault AirBikes for high-intensity intervals',
        '50-Foot Poly-Dacron battle ropes and heavy farmer walk carry handles'
      ],
      specs: [
        { label: 'TRACK LENGTH', val: '30 METERS' },
        { label: 'SLEDS', val: '4 PROWLERS' },
        { label: 'ERGOMETERS', val: 'CONCEPT2 SUITE' }
      ]
    },
    {
      id: 'coaching-suite',
      number: '04',
      category: 'RECOVERY & VIP',
      categoryFilter: 'recovery',
      title: 'PRIVATE 1-ON-1 VIP COACHING ARENA',
      tag: '1-ON-1 COACHING SUITE',
      image: '/assets/images/facility-coaching.jpg',
      headline: 'Individualized Pods with Video Biomechanical Review.',
      desc: 'An exclusive, distraction-free zone reserved for private personal training clients. Equipped with dedicated power racks, video playback screens for form breakdown, and posture grid analysis.',
      equipment: [
        'Dedicated Private Power Rack and Dumbbell station for 1-on-1 sessions',
        'High-Definition Slow-Motion Video Review Screens for form correction',
        'Body composition biometric station with segmental impedance scans',
        'Isolated quiet acoustic environment for focused coaching mentorship'
      ],
      specs: [
        { label: 'ACCESS', val: 'VIP & 1-ON-1' },
        { label: 'SCREENING', val: 'BIOMETRIC SCAN' },
        { label: 'COACHING', val: 'PRIVATE POD' }
      ]
    },
    {
      id: 'performance-area',
      number: '05',
      category: 'TURF & CARDIO',
      categoryFilter: 'turf',
      title: 'ATHLETIC MOVEMENT & AGILITY TURF',
      tag: 'FUNCTIONAL & AGILITY',
      image: '/assets/images/facility-performance.jpg',
      headline: 'Plyo Boxes, Kettlebells & Rotational Power.',
      desc: 'Spacious open-concept functional zone for multi-planar athletic training, dynamic warm-ups, jump mechanics, and rotational kettlebell work.',
      equipment: [
        'Heavy-Duty Foam Safety Plyometric Boxes (12", 18", 24", 30")',
        'Cast Iron Competition Kettlebell bells from 8kg to 48kg',
        'Dynamax Medicine Balls and Kevlar Slam Balls (4kg to 25kg)',
        'Speed agility ladders, resistance sprint parachutes, and power bands'
      ],
      specs: [
        { label: 'SURFACE', val: 'OPEN TURF' },
        { label: 'KETTLEBELLS', val: '8KG – 48KG' },
        { label: 'PLYO BOXES', val: 'SAFETY FOAM' }
      ]
    },
    {
      id: 'recovery-lounge',
      number: '06',
      category: 'RECOVERY & VIP',
      categoryFilter: 'recovery',
      title: 'RECOVERY LOUNGE & INFRARED SAUNA',
      tag: 'MOBILITY & WELLNESS',
      image: '/assets/images/facility-recovery.jpg',
      headline: 'Hyperice Percussion Therapy & Dry Cedar Sauna.',
      desc: 'Accelerate your central nervous system recovery after brutal workouts. Includes a therapeutic dry Finnish sauna, Hypervolt percussion massage guns, and soft-tissue mobility tools.',
      equipment: [
        'Traditional Dry Cedar Wood Finnish Sauna (80°C – 90°C heat therapy)',
        'Hyperice Hypervolt 2 Pro Percussion Therapy Guns & Heated Back Wraps',
        'High-density EVA foam rollers, peanut massage balls, and stretch bands',
        'Pristine private hot showers, luxury grooming vanity, and towel service'
      ],
      specs: [
        { label: 'SAUNA', val: 'FINNISH CEDAR' },
        { label: 'THERAPY', val: 'HYPERICE PRO' },
        { label: 'SHOWERS', val: 'HOT LUXURY' }
      ]
    }
  ],
  brands: [
    { name: 'ROGUE FITNESS', category: 'POWER RACKS & SLEDS', tag: 'USA MADE' },
    { name: 'ELEIKO', category: 'CERTIFIED BARBELLS & PLATES', tag: 'SWEDISH STEEL' },
    { name: 'CONCEPT2', category: 'ROWERS, SKIERGS & BIKES', tag: 'VERIFIED METRICS' },
    { name: 'HAMMER STRENGTH', category: 'SELECTORIZED MACHINES', tag: 'ISO-LATERAL' },
    { name: 'HYPERICE', category: 'PERCUSSION & THERAPY', tag: 'RECOVERY SUITE' }
  ],
  amenities: [
    { icon: '💨', title: 'Hospital-Grade HEPA Air', desc: 'Continuous fresh air exchange system keeping gym crisp, fresh, and free of odors.' },
    { icon: '🚿', title: 'Pristine Showers & Lockers', desc: 'Daily sanitized locker rooms with individual keyless locks and hot power showers.' },
    { icon: '💧', title: 'Chilled Filtered Water', desc: 'Touchless ultra-pure filtered water stations for rapid bottle refills.' },
    { icon: '🚗', title: 'Dedicated Member Parking', desc: 'Spacious, secure on-site parking for two-wheelers and cars with CCTV coverage.' }
  ],
  faqs: [
    {
      q: 'Do I need to book power racks in advance?',
      a: 'During standard hours, power racks operate on a first-come, respectful rotation basis. VIP Elite members can reserve private racks during peak hours.'
    },
    {
      q: 'Are locker facilities and showers included in all memberships?',
      a: 'Yes, all Basic, Performance, and Elite members enjoy complimentary locker access and hot shower facilities every day.'
    },
    {
      q: 'Can I test the equipment before purchasing a membership?',
      a: 'Absolutely! Claim your 7-day all-access free trial pass to test all racks, dumbbells, turf tracks, and sauna amenities.'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = FACILITIES_DATA;
}
