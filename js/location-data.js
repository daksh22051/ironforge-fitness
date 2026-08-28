/**
 * IRONFORGE FITNESS — Flagship Location & Facility Dataset
 * Single source of truth for address, hours, peak times, commute guide, and visitor policies.
 */

const LOCATION_CONFIG = {
  facilityName: 'IRONFORGE FITNESS AHMEDABAD',
  tagline: 'FLAGSHIP STRENGTH & CONDITIONING ARENA',
  city: 'Ahmedabad, Gujarat, India',
  fullAddress: 'Plot 42, Westgate Boulevard, Near SG Highway, Ahmedabad, Gujarat 380054',
  landmark: 'Adjacent to YMCA Club • 5 Mins from Sindhu Bhavan Road',
  phone: '+91 98765 43210',
  email: 'hello@ironforgefitness.demo',
  mapsUrl: 'https://maps.google.com/?q=Ahmedabad,+Gujarat,+India',
  
  hours: {
    weekdays: '6:00 AM – 10:00 PM',
    weekends: '7:00 AM – 9:00 PM',
    holidays: '8:00 AM – 6:00 PM (Select Festive Days)'
  },

  peakHours: [
    { time: '6:00 AM – 8:30 AM', label: 'Morning Peak', intensity: 'Medium', desc: 'High energy compound lifters & early conditioning.' },
    { time: '8:30 AM – 12:00 PM', label: 'Quiet Flow', intensity: 'Low', desc: 'Open racks, zero waiting time, highly focused atmosphere.' },
    { time: '12:00 PM – 4:30 PM', label: 'Midday Focused', intensity: 'Low', desc: 'Ideal for uninterrupted workouts and coach 1-on-1s.' },
    { time: '5:30 PM – 8:30 PM', label: 'Evening Prime', intensity: 'High', desc: 'Peak gym energy, group MetCon sessions, and master trainers on floor.' },
    { time: '8:30 PM – 10:00 PM', label: 'Late Night Flow', intensity: 'Medium', desc: 'Calm ambient lighting, ideal for heavy power sets.' }
  ],

  commuteDistances: [
    { hub: 'SG Highway', time: '2 Mins', dist: '0.8 km' },
    { hub: 'Sindhu Bhavan Road', time: '5 Mins', dist: '2.2 km' },
    { hub: 'Prahlad Nagar', time: '8 Mins', dist: '3.8 km' },
    { hub: 'Bopal & South Bopal', time: '10 Mins', dist: '4.5 km' },
    { hub: 'Vastrapur / IIM-A', time: '12 Mins', dist: '5.6 km' }
  ],

  parkingAmenities: [
    { title: '50+ Member Car Bays', desc: 'Spacious dedicated parking with 24/7 security & CCTV monitoring.' },
    { title: 'Basement Two-Wheeler Lot', desc: 'Covered, secure bike parking with direct elevator access to gym floor.' },
    { title: 'EV Fast Charging', desc: 'Dual Level-2 EV vehicle charging points available on site.' },
    { title: 'Valet Assistance', desc: 'Complimentary valet support during peak evening hours (6 PM – 9 PM).' }
  ],

  dropInPasses: [
    {
      name: '7-DAY ALL-ACCESS PASS',
      price: 'FREE',
      period: 'FOR FIRST-TIME VISITORS',
      desc: 'Experience full floor access, 1-on-1 coach assessment, and recovery amenities.',
      cta: 'CLAIM FREE PASS →',
      link: '/#contact'
    },
    {
      name: 'SINGLE DAY DROP-IN PASS',
      price: '₹200',
      period: 'PER SESSION',
      desc: 'Ideal for traveling athletes, out-of-town lifters, or single workout sessions.',
      cta: 'BUY DAY PASS →',
      link: '/membership'
    }
  ],

  faqs: [
    {
      q: 'Do I need to book an appointment before visiting for the first time?',
      a: 'Walk-ins are always welcome during our operating hours! However, if you would like a dedicated coach to conduct a complimentary 1-on-1 movement screen and tour, we recommend reserving your 7-Day Free Trial pass online.'
    },
    {
      q: 'Is there parking available on-site?',
      a: 'Yes! We offer 50+ private surface and basement parking spaces reserved strictly for Ironforge members and registered trial guests, secured with 24/7 CCTV surveillance.'
    },
    {
      q: 'What should I bring on my first workout session?',
      a: 'Just bring your athletic training shoes, workout attire, and a water bottle. We provide keyless RFID lockers, private hot rain showers, fresh gym towels, and chilled hydration stations.'
    },
    {
      q: 'Can I purchase a Single Day Pass if I am visiting Ahmedabad temporarily?',
      a: 'Yes, we offer Single Day Drop-In Passes for ₹200 which grant full access to the strength floor, 30m turf track, and locker room facilities.'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { LOCATION_CONFIG };
}
