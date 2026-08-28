/**
 * IRONFORGE FITNESS - Centralized Programs Data Architecture
 * Single source of truth for all 4 signature training programs
 * Enhanced with Rich Exercise Splits, Physiological Impact Metrics & Coach Cues
 */

const PROGRAMS_DATA = {
  'strength-power': {
    id: 'strength-power',
    slug: 'strength-power',
    number: '01',
    category: 'STRENGTH & POWER',
    heroCategory: 'STRENGTH & POWER',
    name: 'STRENGTH & POWER',
    headline: 'BUILD RAW STRENGTH. MOVE WITH PURPOSE.',
    tagline: 'Progressive barbell and compound movement training designed around measurable performance, technical precision, and unbreakable foundations.',
    heroImage: '/assets/images/program-strength.jpg',
    badge: 'ATHLETIC PEAK',
    metaTitle: 'IRONFORGE FITNESS | Strength & Power',
    metaDescription: 'Master the barbell lifts with our periodized Strength & Power program at IRONFORGE FITNESS. Squat, bench, deadlift, and explosive power training in Ahmedabad.',
    stats: [
      { label: 'PROGRAM LENGTH', val: '12 WEEKS' },
      { label: 'TRAINING', val: '3–4 DAYS / WEEK' },
      { label: 'SESSION TIME', val: '70–75 MIN' },
      { label: 'EXPERIENCE LEVEL', val: 'ALL LEVELS' }
    ],
    metrics: [
      { label: 'Raw Strength & 1RM Output', pct: 96, desc: 'Maximum motor unit recruitment & progressive overload loading schemas' },
      { label: 'Neuromuscular Rate of Force (RFD)', pct: 94, desc: 'Dynamic explosive speed and kinetic chain power development' },
      { label: 'Tendon, Joint & Bone Density', pct: 92, desc: 'Heavy compressive bone loading with joint-sparing assistance work' },
      { label: 'Lean Mass & Muscular Density', pct: 88, desc: 'High mechanical tension on primary posterior chain and upper musculature' }
    ],
    overview: {
      heading: 'WHAT THIS PROGRAM IS',
      lead: 'The definitive barbell training system for progressive strength, bone density, and technical mastery.',
      p1: 'Ironforge’s Strength & Power program is the bedrock of our training philosophy. Built around primary compound barbell disciplines—the squat, bench press, deadlift, and overhead press—this program prioritizes progressive mechanical tension, neuro-muscular efficiency, and disciplined technical execution.',
      p2: 'Whether your goal is hitting personal records or building a powerful, resilient body, our periodized cycles systematically build foundational strength while safeguarding joint longevity.',
      benefits: [
        {
          title: 'Progressive Overload Blueprint',
          desc: 'Methodical weight and volume increases week over week using calibrated loading charts.'
        },
        {
          title: 'Compound Movement Mastery',
          desc: 'Heavy focus on primary multi-joint lifts that recruit maximum motor units and power.'
        },
        {
          title: 'Technical Video Cueing',
          desc: 'Real-time form correction, bar path alignment, and bracing protocols on every set.'
        },
        {
          title: 'Auto-Regulation (RPE)',
          desc: 'Training intensity calibrated to your daily physical readiness to prevent burnout.'
        }
      ]
    },
    whoItsFor: {
      heading: 'IS THIS PROGRAM RIGHT FOR YOU?',
      ideal: [
        {
          title: 'Beginners & Fundamentals',
          desc: 'Members looking to learn foundational barbell technique safely under direct coach supervision.'
        },
        {
          title: 'Intermediate Lifters',
          desc: 'Trainees experiencing plateaus in the squat, bench, or deadlift who need periodized load regulation.'
        },
        {
          title: 'Athletes & Strength Seekers',
          desc: 'Individuals who want measurable physical power, improved bone density, and functional strength.'
        },
        {
          title: 'Lifters Wanting Joint Longevity',
          desc: 'Athletes wanting structured lifting with proper warmup schemas and joint-friendly assistance work.'
        }
      ],
      notIdeal: {
        title: 'NOT IDEAL FOR',
        desc: 'Trainees seeking purely cardio-based training with zero barbell or heavy resistance work.'
      }
    },
    trainingPillars: [
      {
        name: 'BARBELL COMPOUND LIFTS',
        tag: 'PILLAR 01',
        desc: 'Squat, Bench Press, Deadlift, and Overhead Press executed with calibrated competition barbells.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14M18 5v14M2 9h4M2 15h4M18 9h4M18 15h4M6 12h12"/></svg>'
      },
      {
        name: 'STRUCTURAL ACCESSORIES',
        tag: 'PILLAR 02',
        desc: 'Unilateral split squats, heavy rows, and posterior chain work that fix asymmetries and protect joints.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>'
      },
      {
        name: 'NEUROMUSCULAR POWER',
        tag: 'PILLAR 03',
        desc: 'Explosive dynamic effort work and plyometrics that enhance rate of force development (RFD).',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
      },
      {
        name: 'POSTURAL INTEGRITY',
        tag: 'PILLAR 04',
        desc: 'Diaphragmatic core bracing, thoracic extension, and hip stability protocols under heavy loads.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>'
      }
    ],
    sampleWeek: [
      {
        day: 'MONDAY',
        type: 'SQUAT & LOWER BODY STRENGTH',
        focus: 'Back Squat (Heavy Sets), Bulgarian Split Squats, RDLs & Core Bracing',
        duration: '70 MIN',
        intensity: 'HIGH (85% 1RM)',
        exercises: [
          'Competition Barbell Back Squat — 4 sets × 5 reps @ RPE 8',
          'Bulgarian Dumbbell Split Squats — 3 sets × 8 reps / leg',
          'Romanian Deadlift (RDL) — 3 sets × 10 reps (3-sec eccentric)',
          'Hanging Leg Raises & Standing Calf Raises — 3 sets × 15 reps'
        ],
        coachTip: 'Maintain intra-abdominal pressure (Valsalva) throughout the descent. Drive through the full foot on the ascent.'
      },
      {
        day: 'TUESDAY',
        type: 'RECOVERY & MOBILITY FLOW',
        focus: 'Hip Flow, Ankle Dorsiflexion, Banded Upper Back Work & 20 min Light Aerobic',
        duration: '40 MIN',
        intensity: 'LOW / RESTORATIVE',
        exercises: [
          '90/90 Hip Flow & Frog Stretch — 3 rounds × 60 sec',
          'Thoracic Spine Foam Rolling & Cat-Cow — 3 sets × 10 reps',
          'Banded Face Pulls & Rotator Cuff External Rotations — 3 sets × 20 reps',
          'Nasal Breathing Incline Treadmill Walk — 20 minutes (Zone 2)'
        ],
        coachTip: 'Keep your heart rate strictly below 130 BPM. Today is dedicated to flushing lactic acid and restoring joint mobility.'
      },
      {
        day: 'WEDNESDAY',
        type: 'BENCH PRESS & UPPER STRENGTH',
        focus: 'Competition Bench Press, Pendlay Rows, Overhead Press & Dips',
        duration: '70 MIN',
        intensity: 'HIGH (85% 1RM)',
        exercises: [
          'Competition Flat Barbell Bench Press — 4 sets × 5 reps @ RPE 8',
          'Strict Standing Overhead Press (OHP) — 3 sets × 6 reps',
          'Pendlay Barbell Rows (Dead-stop) — 4 sets × 8 reps',
          'Weighted Tricep Dips & Face Pulls — 3 sets × 12 reps'
        ],
        coachTip: 'Keep your shoulder blades retracted and depressed into the bench. Maintain tight leg drive throughout each repetition.'
      },
      {
        day: 'THURSDAY',
        type: 'ACTIVE REST & DECOMPRESSION',
        focus: 'Parasympathetic Restoration, Tissue Hydration & Mobility Drills',
        duration: 'REST',
        intensity: 'RECOVERY',
        exercises: [
          'Spinal Decompression (Passive Dead Hangs) — 3 sets × 45 sec',
          'Diaphragmatic Box Breathing (4-4-4-4) — 10 minutes',
          'Full Body Foam Rolling & Soft Tissue Work — 15 minutes',
          'Targeted 8,000 Step Daily Walk Outdoors'
        ],
        coachTip: 'Focus on sleep hygiene and protein distribution today. Central nervous system recovery is where strength solidifies.'
      },
      {
        day: 'FRIDAY',
        type: 'DEADLIFT & POSTERIOR CHAIN',
        focus: 'Conventional/Sumo Deadlift, Front Squats, Hamstring Curls & Farmer Carries',
        duration: '75 MIN',
        intensity: 'MAX (90% 1RM)',
        exercises: [
          'Conventional Barbell Deadlift — 3 sets × 4 reps @ RPE 8.5',
          'Barbell Front Squats (Quad Focus) — 3 sets × 6 reps',
          'Lying Hamstring Leg Curls (Plate-Loaded) — 4 sets × 10 reps',
          'Heavy Trap Bar Farmer Carries — 4 sets × 40 meters'
        ],
        coachTip: 'Take the slack out of the barbell before breaking the floor. Wedge your hips and pull through your lats and glutes.'
      },
      {
        day: 'SATURDAY',
        type: 'DYNAMIC POWER & ACCESSORIES',
        focus: 'Speed Bench, Trap Bar Jumps, Face Pulls, Biceps & Triceps Work',
        duration: '60 MIN',
        intensity: 'MODERATE (SPEED)',
        exercises: [
          'Speed Dynamic Bench Press — 6 sets × 3 reps @ 65% 1RM (Max Acceleration)',
          'Trap Bar Explosive Jumps — 4 sets × 4 reps',
          'Incline Dumbbell Bicep Curls — 3 sets × 12 reps',
          'Overhead Rope Tricep Extensions & Lateral Raises — 3 sets × 15 reps'
        ],
        coachTip: 'Move the barbell with maximum velocity on every single rep. Speed creates neuromuscular recruitment.'
      },
      {
        day: 'SUNDAY',
        type: 'FULL RECOVERY & PROTOCOL CHECK',
        focus: 'Nutritional Loading, Sleep Optimization & Next Week Load Preparation',
        duration: 'REST',
        intensity: 'RECOVERY',
        exercises: [
          'Complete Rest — Zero Heavy Loading',
          'Weekly Training Log & 1RM Progression Review with Coach',
          'Hydration Loading (3.5L Water + Electrolytes)',
          '8+ Hours Uninterrupted Sleep Cycle'
        ],
        coachTip: 'Review your weekly tonnage numbers in the training log and prepare your mindset for next week’s progression schema.'
      }
    ],
    progressTracking: [
      {
        title: 'ESTIMATED 1RM BENCHMARKS',
        desc: 'Calculated 1-rep maximum equations tracked weekly without testing risky maximal singles every workout.'
      },
      {
        title: 'VOLUME LOAD PROGRESSION',
        desc: 'Tracking total tonnage lifted (Sets x Reps x Weight) to verify progressive overload over each 4-week block.'
      },
      {
        title: 'BAR SPEED & VELOCITY',
        desc: 'Coach monitoring of barbell speed and technical smoothness to identify readiness and fatigue.'
      },
      {
        title: 'FORM VIDEO ARCHIVE',
        desc: 'Side-by-side video analysis comparing your setup, bar path, and joint angles over time.'
      },
      {
        title: 'JOINT & RECOVERY FEEDBACK',
        desc: 'Weekly readiness scores assessing joint comfort, CNS recovery, and sleep quality.'
      }
    ],
    included: [
      'Complete 12-Week Periodized Barbell Strength Blueprint',
      'Coach Form Correction & Cueing on Every Single Working Set',
      'Customized 1RM Target Calculations & Warmup Schemas',
      'Full Access to Rogue Monster Power Racks & Competition Plates',
      'Bi-Weekly Technique Video Review with Senior Coaches',
      'Spinal Decompression & Postural Recovery Protocol'
    ],
    inclusionsCombined: [
      {
        title: '12-WEEK PERIODIZED STRENGTH BLUEPRINT',
        desc: 'Methodical linear and undulating periodization cycles targeting the squat, bench, deadlift, and overhead press.'
      },
      {
        title: 'REAL-TIME FORM & BAR PATH CUEING',
        desc: 'Dedicated coach oversight on every primary set to ensure optimal bracing, joint alignment, and safety.'
      },
      {
        title: 'CALIBRATED 1RM ESTIMATIONS & LOAD LOGS',
        desc: 'Weekly tracking of working volume and estimated 1-rep maxes without risky maximal testing every session.'
      },
      {
        title: 'ROGUE MONSTER RACKS & ELEIKO ACCESS',
        desc: 'Unrestricted access to calibrated steel plates, Olympic lifting platforms, and competition-grade power racks.'
      },
      {
        title: 'BI-WEEKLY VIDEO TECHNIQUE REVIEWS',
        desc: 'Side-by-side video analysis comparing your setup, bar speed, and movement mechanics over time.'
      },
      {
        title: 'POSTURAL INTEGRITY & RECOVERY PROTOCOL',
        desc: 'Pre-workout dynamic warmups, intra-abdominal bracing guides, and restorative decompression routines.'
      }
    ],
    coach: {
      name: 'ALEX RIVERA',
      role: 'Head of Strength & Power',
      image: '/assets/images/trainer-alex.jpg',
      bio: 'Certified CSCS coach with 12+ years experience coaching competitive powerlifters and strength athletes.',
      quote: 'Strength is the foundational physical quality that makes everything else in life easier and safer.'
    }
  },

  'muscle-building': {
    id: 'muscle-building',
    slug: 'muscle-building',
    number: '02',
    category: 'MUSCLE BUILDING',
    heroCategory: 'MUSCLE BUILDING',
    name: 'MUSCLE BUILDING',
    headline: 'SCULPT LEAN MUSCLE. OPTIMIZE HYPERTROPHY.',
    tagline: 'Science-backed hypertrophy programming combining mechanical tension, strategic volume management, and targeted muscular isolation for complete physique development.',
    heroImage: '/assets/images/program-hypertrophy.jpg',
    badge: 'HYPERTROPHY',
    metaTitle: 'IRONFORGE FITNESS | Muscle Building',
    metaDescription: 'Maximize muscle hypertrophy with scientific training splits, precision execution, and volume periodization at IRONFORGE FITNESS in Ahmedabad.',
    stats: [
      { label: 'PROGRAM LENGTH', val: '8–16 WEEKS' },
      { label: 'TRAINING', val: '4–5 DAYS / WEEK' },
      { label: 'SESSION TIME', val: '65–70 MIN' },
      { label: 'EXPERIENCE LEVEL', val: 'INTERMEDIATE → ADV' }
    ],
    metrics: [
      { label: 'Target Hypertrophy Volume (Sets)', pct: 98, desc: '10–20 weekly hard sets per muscle group within the 6–15 rep hypertrophy sweet spot' },
      { label: 'Mechanical Tension & Loaded Stretch', pct: 96, desc: 'Controlled 3-second eccentrics prioritizing deep loaded muscle elongation' },
      { label: 'Metabolic Pump & Nutrient Delivery', pct: 94, desc: 'Rest-pause sets, mechanical drop sets, and high-yield cable finishers' },
      { label: 'Joint Longevity & Biomechanics', pct: 92, desc: 'Optimal machine angles and custom cable attachments that protect connective tissue' }
    ],
    overview: {
      heading: 'WHAT THIS PROGRAM IS',
      lead: 'The ultimate hypertrophy curriculum for packing on lean, proportionate muscle tissue safely.',
      p1: 'The Ironforge Muscle Building program is engineered for lifters who want to build dense, proportionate lean muscle mass without unnecessary joint wear. We blend heavy compound movements with high-yield isolation exercises, precision tempo work, and structured volume ramps to stimulate maximal muscle fiber recruitment.',
      p2: 'Designed around optimal stimulus-to-fatigue ratios, every workout is calibrated to target muscles through a full range of motion, controlled eccentrics, and intense metabolic pumps.',
      benefits: [
        {
          title: 'Hypertrophy-Specific Volume',
          desc: 'Targeting 10–20 direct weekly sets per muscle group within the 6–15 rep sweet spot.'
        },
        {
          title: 'Mechanical Tension Focus',
          desc: 'Deep muscular stretch and peak contraction under load for maximum fiber recruitment.'
        },
        {
          title: 'Multi-Angle Isolation',
          desc: 'Utilizing specialized cable attachments, machines, and dumbbells to target all muscle bellies.'
        },
        {
          title: 'Nutritional Strategy',
          desc: 'Evidence-based protein and macronutrient benchmarks to fuel continuous muscular repair.'
        }
      ]
    },
    whoItsFor: {
      heading: 'IS THIS PROGRAM RIGHT FOR YOU?',
      ideal: [
        {
          title: 'Physique & Aesthetics Seekers',
          desc: 'Lifters wanting to build broader shoulders, dense back muscles, and proportionate leg development.'
        },
        {
          title: 'Plateaued Lifters',
          desc: 'Trainees stuck at their current muscular size who need standardized range of motion and novel stimulus.'
        },
        {
          title: 'Joint-Conscious Trainees',
          desc: 'Members seeking high hypertrophy stimulus using biomechanically sound machine angles that protect joints.'
        },
        {
          title: 'Dedicated Gym Enthusiasts',
          desc: 'Lifters who love the pump, love structured training splits, and want noticeable physique changes.'
        }
      ],
      notIdeal: {
        title: 'NOT IDEAL FOR',
        desc: 'Trainees looking exclusively for endurance running or those who do not wish to train with progressive free weights and machines.'
      }
    },
    trainingPillars: [
      {
        name: 'MECHANICAL TENSION',
        tag: 'PILLAR 01',
        desc: 'Heavy compound movements performed with a 3-second controlled eccentric to maximize muscle fiber recruitment.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14M18 5v14M2 9h4M2 15h4M18 9h4M18 15h4M6 12h12"/></svg>'
      },
      {
        name: 'METABOLIC STRESS',
        tag: 'PILLAR 02',
        desc: 'Rest-pause sets, drop sets, and high-rep cable finishers that flood target muscles with blood and nutrients.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>'
      },
      {
        name: 'FULL RANGE OF MOTION',
        tag: 'PILLAR 03',
        desc: 'Deep loaded stretches at the bottom of movements where hypertrophy signaling is proven to be highest.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>'
      },
      {
        name: 'FATIGUE MANAGEMENT',
        tag: 'PILLAR 04',
        desc: 'Structured 4th-week deloads that clear systemic fatigue while consolidating muscle growth adaptations.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
      }
    ],
    sampleWeek: [
      {
        day: 'MONDAY',
        type: 'PUSH (CHEST, SHOULDERS, TRICEPS)',
        focus: 'Incline DB Press, Flat Barbell Bench, Lateral Raises, Overhead Extensions',
        duration: '65 MIN',
        intensity: 'HIGH (RPE 8–9)',
        exercises: [
          '30° Incline Dumbbell Bench Press — 4 sets × 8–10 reps (3-sec eccentric)',
          'Flat Barbell Bench Press (Tension Focus) — 3 sets × 8 reps',
          'Seated Dumbbell Lateral Raises — 4 sets × 12–15 reps + Drop set',
          'Overhead Rope Tricep Extensions & Dips — 3 sets × 12 reps'
        ],
        coachTip: 'Pause for 1 full second at the deep stretch position of the incline press to eliminate momentum and maximize fiber tearing.'
      },
      {
        day: 'TUESDAY',
        type: 'PULL (BACK, REAR DELTS, BICEPS)',
        focus: 'Lat Pulldowns, Chest-Supported T-Bar Rows, Face Pulls, Incline Dumbbell Curls',
        duration: '65 MIN',
        intensity: 'HIGH (RPE 8–9)',
        exercises: [
          'Neutral-Grip Lat Pulldown (Full Stretch) — 4 sets × 10 reps',
          'Chest-Supported T-Bar Row (Upper Back) — 4 sets × 8–10 reps',
          'Cable Face Pulls with External Rotation — 3 sets × 15 reps',
          'Incline Bench Dumbbell Bicep Curls (Supinated) — 3 sets × 10–12 reps'
        ],
        coachTip: 'Initiate every pulling movement with your scapulae before bending the elbows. Squeeze the lats hard at full contraction.'
      },
      {
        day: 'WEDNESDAY',
        type: 'LEGS (QUADRICEPS & CALVES)',
        focus: 'Barbell Squats, Hack Squats, Leg Extensions, Standing Calves Raise',
        duration: '70 MIN',
        intensity: 'MAX (RPE 9)',
        exercises: [
          'High-Bar Barbell Squats (Quad Bias) — 4 sets × 8 reps',
          'Plate-Loaded 45° Hack Squat — 3 sets × 10 reps (Deep knee flexion)',
          'Seated Leg Extensions (Rest-Pause Protocol) — 3 sets × 12 reps',
          'Standing Single-Leg Calf Raises — 4 sets × 15 reps'
        ],
        coachTip: 'Elevate your heels slightly on the hack squat to drive maximum mechanical tension directly through the vastus medialis.'
      },
      {
        day: 'THURSDAY',
        type: 'REST & NUTRITIONAL REFUEL',
        focus: 'Targeted Protein Loading, Hydration, 30 min Gentle Mobility',
        duration: 'REST',
        intensity: 'RECOVERY',
        exercises: [
          'Gentle Dynamic Full-Body Mobility Flow — 20 minutes',
          'Targeted Protein Benchmark (2.2g per kg bodyweight)',
          'Contrast Shower / Sauna Therapy Session — 15 minutes',
          'Hydration Protocol (3–4 Liters with Minerals)'
        ],
        coachTip: 'Muscle is built during recovery, not in the gym. Eat your prescribed calories and let your muscle glycogen stores replenish.'
      },
      {
        day: 'FRIDAY',
        type: 'UPPER BODY HYPERTROPHY',
        focus: 'Dumbbell Shoulder Press, Cable Flyes, Seated Cable Rows, Hammer Curls',
        duration: '65 MIN',
        intensity: 'HIGH (RPE 8–9)',
        exercises: [
          'Seated Dumbbell Shoulder Overhead Press — 4 sets × 8–10 reps',
          'Low-to-High Cable Chest Flyes — 3 sets × 12–15 reps (Peak squeeze)',
          'Single-Arm Cable Lat Rows — 3 sets × 10 reps / side',
          'Standing Dumbbell Hammer Curls & Skullcrushers — 3 sets × 12 reps'
        ],
        coachTip: 'Focus on tempo control. Take 3 seconds to lower the weight on every single rep to stimulate maximal mechanical tension.'
      },
      {
        day: 'SATURDAY',
        type: 'POSTERIOR CHAIN & HAMSTRINGS',
        focus: 'Romanian Deadlifts, Lying Leg Curls, Hip Thrusts, Hanging Knee Raises',
        duration: '60 MIN',
        intensity: 'HIGH (RPE 8–9)',
        exercises: [
          'Dumbbell Romanian Deadlifts (RDLs) — 4 sets × 10 reps (Deep hip hinge)',
          'Lying Leg Curls (Plate-Loaded) — 4 sets × 10–12 reps',
          'Barbell Glute Hip Thrusts — 3 sets × 10 reps (2-sec lock pause)',
          'Hanging Captain’s Chair Knee Raises — 3 sets × 15 reps'
        ],
        coachTip: 'Keep your shins vertical on the RDL and push your hips as far back as possible until your hamstrings are fully loaded.'
      },
      {
        day: 'SUNDAY',
        type: 'COMPLETE RECOVERY',
        focus: 'Deep Muscle Tissue Recovery & Weekly Volume Log Review',
        duration: 'REST',
        intensity: 'RECOVERY',
        exercises: [
          'Complete Neurological & Muscular Rest',
          'Full-Body Foam Rolling & Percussion Massage Gun — 15 min',
          'Review Weekly Workout Volume in Ironforge Log',
          'Target 8+ Hours Sleep'
        ],
        coachTip: 'Log your progress photos and bodyweight metrics today. Set your targets for next week’s progressive overload ramp.'
      }
    ],
    progressTracking: [
      {
        title: 'DIRECT VOLUME TRACKING',
        desc: 'Weekly logging of hard sets (RPE 8+) per muscle group to guarantee optimal stimulus.'
      },
      {
        title: 'PROGRESSIVE OVERLOAD REPS',
        desc: 'Aiming to beat previous weight or rep records on key isolation and compound anchor lifts.'
      },
      {
        title: 'PHYSIQUE PROGRESS PHOTOS',
        desc: 'Standardized monthly lighting and pose assessments to visually monitor muscular symmetry.'
      },
      {
        title: 'PUMP & SORENESS SCORES',
        desc: 'Rating local muscle pump and 48-hour recovery to adjust individual volume tolerance.'
      },
      {
        title: 'NUTRITIONAL MACRO COMPLIANCE',
        desc: 'Tracking daily protein and caloric targets to ensure muscle tissue is being rebuilt.'
      }
    ],
    included: [
      'Comprehensive Hypertrophy Split (Push/Pull/Legs & Upper/Lower)',
      'Form Execution & Mind-Muscle Cueing by Experienced Coaches',
      'Custom Weekly Volume Progression & Fatigue Tracking',
      'Full Access to Heavy Dumbbell Suite (2kg to 60kg)',
      'Advanced Cable Station & Plate-Loaded Machine Access',
      'Nutritional Baseline Protocol & Protein Strategy Guide'
    ],
    inclusionsCombined: [
      {
        title: 'TARGETED HYPERTROPHY SPLIT PROGRAM',
        desc: 'High-yield Push/Pull/Legs and Upper/Lower cycles optimized for mechanical tension and complete muscular development.'
      },
      {
        title: 'MIND-MUSCLE CUEING & TEMPO CONTROL',
        desc: 'Expert coach guidance on eccentric control, peak contraction pauses, and active range-of-motion execution.'
      },
      {
        title: 'VOLUME & FATIGUE OVERLOAD TRACKING',
        desc: 'Weekly logging of hard working sets (RPE 8+) and total tonnage to ensure progressive muscular overload.'
      },
      {
        title: 'EXPANSIVE FREE WEIGHT & MACHINE SUITE',
        desc: 'Full access to dumbbells up to 60kg, specialized cable attachments, and biomechanically aligned plate-loaded machines.'
      },
      {
        title: 'MONTHLY PHYSIQUE & SYMMETRY REVIEWS',
        desc: 'Standardized monthly progress photos and circumference metrics to monitor balanced muscular growth.'
      },
      {
        title: 'PROTEIN & MACRONUTRIENT STRATEGY',
        desc: 'Personalized caloric surplus guidelines and meal timing frameworks designed to optimize muscle protein synthesis.'
      }
    ],
    coach: {
      name: 'SAM VANCE',
      role: 'Director of Hypertrophy & Biomechanics',
      image: '/assets/images/trainer-sam.jpg',
      bio: 'Physique specialist with over 10 years of biomechanics research and competitive bodybuilding coaching.',
      quote: 'Building muscle is not about lifting as heavy as possible with terrible form. It is about applying maximum tension directly to the target muscle.'
    }
  },

  'fat-loss': {
    id: 'fat-loss',
    slug: 'fat-loss',
    number: '03',
    category: 'FAT LOSS',
    heroCategory: 'FAT LOSS',
    name: 'FAT LOSS & CONDITIONING',
    headline: 'SHRED FAT. BUILD ENDURANCE. PRESERVE STRENGTH.',
    tagline: 'High-energy metabolic resistance conditioning engineered to maximize caloric expenditure, accelerate cardiovascular capacity, and maintain lean muscle.',
    heroImage: '/assets/images/program-fatloss.jpg',
    badge: 'CONDITIONING',
    metaTitle: 'IRONFORGE FITNESS | Fat Loss & Conditioning',
    metaDescription: 'Torch body fat and build unmatched stamina at IRONFORGE FITNESS. Metabolic resistance workouts, functional conditioning, and sustainable transformation in Ahmedabad.',
    stats: [
      { label: 'PROGRAM LENGTH', val: '8–12 WEEKS' },
      { label: 'TRAINING', val: '3–5 DAYS / WEEK' },
      { label: 'SESSION TIME', val: '50–60 MIN' },
      { label: 'EXPERIENCE LEVEL', val: 'BEGINNER → ADV' }
    ],
    metrics: [
      { label: 'Metabolic Caloric Burn (EPOC)', pct: 98, desc: 'High-density strength intervals elevating 24-hour post-workout expenditure' },
      { label: 'Cardiovascular VO2 Max Capacity', pct: 96, desc: 'Turf sled sprints, ergometer intervals, and aerobic heart rate zone training' },
      { label: 'Lean Muscle Tissue Preservation', pct: 92, desc: 'Compound resistance lifts signal your body to burn fat while sparing muscle' },
      { label: 'Functional Mobility & Core Bracing', pct: 90, desc: 'Multi-planar dynamic kettlebell circuits and core stabilization complexes' }
    ],
    overview: {
      heading: 'WHAT THIS PROGRAM IS',
      lead: 'A science-backed training system that burns fat while safeguarding hard-earned muscle mass.',
      p1: 'Our Fat Loss & Conditioning program shatters the myth of endless, boring steady-state cardio. Built around metabolic resistance training (MRT), non-competing exercise pairings, and functional interval protocols, this program creates a powerful metabolic afterburn (EPOC) that elevates your calorie expenditure for hours after training.',
      p2: 'By prioritizing heavy compound resistance work alongside high-yield sleds, kettlebells, and cardio intervals, we ensure that every kilogram lost is pure body fat—preserving your metabolism, joint integrity, and athletic strength.',
      benefits: [
        {
          title: 'Metabolic Resistance Training (MRT)',
          desc: 'High-density strength intervals that keep heart rate elevated and burn calories fast.'
        },
        {
          title: 'Lean Muscle Preservation',
          desc: 'Compound resistance lifts ensure your body burns fat while keeping functional muscle.'
        },
        {
          title: 'Cardiovascular Development',
          desc: 'Improves VO2 max, resting heart rate, and aerobic recovery stamina.'
        },
        {
          title: 'Sustainable Progression',
          desc: 'Structured habit guidance and step targets designed for real-world consistency.'
        }
      ]
    },
    whoItsFor: {
      heading: 'IS THIS PROGRAM RIGHT FOR YOU?',
      ideal: [
        {
          title: 'Beginners Wanting Structured Fat Loss',
          desc: 'Learn proper exercise mechanics in an encouraging, coach-guided environment without extreme crash diets.'
        },
        {
          title: 'Members Returning to Consistent Training',
          desc: 'Rebuild your aerobic base, movement quality, and daily energy with scalable, progressive workout blocks.'
        },
        {
          title: 'Athletes Seeking High Conditioning',
          desc: 'Lifters who already have strength but want to shred down, drop body fat, and build unmatched stamina.'
        },
        {
          title: 'Busy Working Professionals',
          desc: 'Maximum calorie-burning efficiency in 50–60 minute high-yield coached sessions that fit your daily schedule.'
        }
      ],
      notIdeal: {
        title: 'NOT IDEAL FOR',
        desc: 'Trainees seeking exclusively 1RM powerlifting specialization without any cardiovascular, conditioning, or high-density metabolic work.'
      }
    },
    trainingPillars: [
      {
        name: 'STRENGTH',
        tag: 'PILLAR 01',
        desc: 'Compound barbell, dumbbell, and trap bar movements that signal your body to preserve muscle tissue during caloric deficits.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 5v14M18 5v14M2 9h4M2 15h4M18 9h4M18 15h4M6 12h12"/></svg>'
      },
      {
        name: 'CONDITIONING',
        tag: 'PILLAR 02',
        desc: 'High-traction indoor turf sled pushes, prowler sprints, and Concept2 rowers that build an unstoppable cardiovascular engine.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
      },
      {
        name: 'METABOLIC WORK',
        tag: 'PILLAR 03',
        desc: 'Short-rest interval circuits, battle ropes, and kettlebell complexes that maximize calorie burn and metabolic efficiency.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>'
      },
      {
        name: 'MOBILITY & RECOVERY',
        tag: 'PILLAR 04',
        desc: 'Guided parasympathetic cool-downs, soft-tissue foam rolling, and joint mobility to accelerate recovery between sessions.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
      }
    ],
    sampleWeek: [
      {
        day: 'MONDAY',
        type: 'LOWER BODY + METCON',
        focus: 'Goblet Squats, Romanian Deadlifts, Sled Pushes & Battle Rope Intervals',
        duration: '55 MIN',
        intensity: 'HIGH (HR 155–170 BPM)',
        exercises: [
          'Dumbbell Goblet Squats — 4 sets × 12 reps (45s rest)',
          'Dumbbell Romanian Deadlifts — 4 sets × 12 reps',
          'Turf Prowler Sled Pushes — 5 rounds × 30 meters (Active recovery)',
          'Battle Rope Alternating Waves — 4 rounds × 30 sec on / 30 sec off'
        ],
        coachTip: 'Keep your transitions between strength movements and turf intervals under 45 seconds to maintain high metabolic output.'
      },
      {
        day: 'TUESDAY',
        type: 'ZONE 2 AEROBIC FLUSH',
        focus: 'Low-Intensity Steady State Cardio, Nasal Breathing & Core Stabilization',
        duration: '45 MIN',
        intensity: 'MODERATE (HR 125–135 BPM)',
        exercises: [
          'Concept2 Indoor Rower — 15 minutes @ steady pace',
          'Incline Treadmill Walk (10% incline, 4.5 km/h) — 20 minutes',
          'Plank Shoulder Taps & Deadbugs — 3 sets × 15 reps',
          'Hip Flexor & Hamstring Banded Stretches — 10 minutes'
        ],
        coachTip: 'Breathe strictly through your nose during this aerobic flush. Zone 2 builds mitochondrial density and burns pure fatty acids.'
      },
      {
        day: 'WEDNESDAY',
        type: 'UPPER BODY + CONDITIONING',
        focus: 'Dumbbell Push Press, Chest-Supported Rows, Incline Push-Ups & SkiErg Sprints',
        duration: '55 MIN',
        intensity: 'HIGH (HR 150–165 BPM)',
        exercises: [
          'Dumbbell Push Press — 4 sets × 10 reps',
          'Chest-Supported Dumbbell Rows — 4 sets × 12 reps',
          'Deficit Push-Ups & Ring Rows — 3 sets × 12 reps',
          'Concept2 SkiErg Intervals — 6 rounds × 250 meters sprint'
        ],
        coachTip: 'Drive through your legs on the push press and lock out with full overhead stability before lowering under control.'
      },
      {
        day: 'THURSDAY',
        type: 'MOBILITY & ACTIVE RECOVERY',
        focus: 'Hip Openers, Thoracic Spine Flow, Soft Tissue Release & 8,000 Step Walk',
        duration: '40 MIN',
        intensity: 'LOW / RESTORATIVE',
        exercises: [
          'Pigeon Stretch & World’s Greatest Stretch — 3 rounds',
          'Full-Body Foam Rolling on IT Bands & Lats — 15 minutes',
          'Gentle 8,000 Step Outdoor Walk',
          'Contrast Hot/Cold Shower Therapy'
        ],
        coachTip: 'Hydrate thoroughly with electrolytes today to replenish minerals lost during metabolic sweat sessions.'
      },
      {
        day: 'FRIDAY',
        type: 'FULL BODY METABOLIC COMPLEX',
        focus: 'Trap Bar Deadlifts, Kettlebell Swings, Box Jumps & Row Sprints',
        duration: '60 MIN',
        intensity: 'MAX (HR 165–180 BPM)',
        exercises: [
          'Trap Bar Deadlifts — 4 sets × 8 reps',
          'Russian Kettlebell Swings (Heavy) — 4 sets × 15 reps',
          'Soft Plyo Box Jumps (Step down) — 3 sets × 10 reps',
          'Concept2 Row Sprints — 5 rounds × 300 meters max effort'
        ],
        coachTip: 'Snap your hips explosively on the kettlebell swing. Do not lift with your arms; let hip extension drive the bell upward.'
      },
      {
        day: 'SATURDAY',
        type: 'TURF SLED & TEAM CIRCUIT',
        focus: 'Prowler Relays, Farmer Walks, Medicine Ball Slams & Core Finisher',
        duration: '50 MIN',
        intensity: 'HIGH (HR 150–170 BPM)',
        exercises: [
          'Prowler Sled Push & Pull Relay — 4 rounds × 40 meters',
          'Heavy Dumbbell Farmer Carries — 4 sets × 40 meters',
          'Overhead Medicine Ball Slams (10kg) — 4 sets × 15 reps',
          'Hanging Knee Tucks & Side Planks — 3 sets × 12 reps'
        ],
        coachTip: 'Maintain a rigid core and tall posture during the farmer carries. Grip hard and do not let your shoulders roll forward.'
      },
      {
        day: 'SUNDAY',
        type: 'COMPLETE REST & RESTORATION',
        focus: 'Full Nervous System Reset, Hydration Loading & Weekly Meal Prep',
        duration: 'REST',
        intensity: 'RECOVERY',
        exercises: [
          'Complete Rest — Zero Structured Exercise',
          'Weekly Body Composition & Weight Review in Ironforge App',
          'Meal Prep & Macronutrient Planning for Upcoming Week',
          '8+ Hours Uninterrupted Sleep Cycle'
        ],
        coachTip: 'Plan your meals for the upcoming week today. Nutrition adherence is 80% of long-term sustainable fat loss.'
      }
    ],
    progressTracking: [
      {
        title: 'BODY COMPOSITION',
        desc: 'Non-invasive monthly body fat and circumferences assessments to track lean mass retention and fat loss objectively.'
      },
      {
        title: 'STRENGTH PERFORMANCE',
        desc: 'Log baseline working weights on key compound lifts to ensure you are gaining strength even in a caloric deficit.'
      },
      {
        title: 'CONDITIONING CAPACITY',
        desc: 'Track timed sled intervals, 500m row splits, and resting heart rate recovery times week over week.'
      },
      {
        title: 'TRAINING CONSISTENCY',
        desc: 'Digital check-in records and weekly attendance logging to keep you accountable and consistent.'
      },
      {
        title: 'WEEKLY HABIT REVIEW',
        desc: 'One-on-one coach check-ins covering sleep quality, daily step counts, hydration, and nutrition adherence.'
      }
    ],
    included: [
      'Complete 8–12 Week Periodized Fat Loss & Conditioning Blueprint',
      'Daily Coached Sessions with Dedicated Form Correction & Cueing',
      'Heart Rate Zone Training Protocols & Work-to-Rest Guidance',
      'Full Access to 30-Meter Turf Track, Sleds & Ergometer Suite',
      'Monthly Body Composition Assessment & Measurement Logs',
      'Sustainable Nutrition & Hydration Baseline Guidelines'
    ],
    inclusionsCombined: [
      {
        title: '8–12 WEEK METABOLIC CONDITIONING BLUEPRINT',
        desc: 'Progressive metabolic resistance training cycles programmed to maximize caloric burn while preserving lean muscle.'
      },
      {
        title: 'COACH-LED SESSIONS & REAL-TIME CUEING',
        desc: 'Direct floor coaching on every set with active feedback on work-to-rest pacing, tempo, and movement mechanics.'
      },
      {
        title: 'MONTHLY INBODY SCANS & CIRCUMFERENCES',
        desc: 'Objective body composition assessments tracking lean mass retention and fat loss progress beyond the bathroom scale.'
      },
      {
        title: '30M SPRINT TURF & ERGOMETER ACCESS',
        desc: 'Unrestricted access to the turf track, Concept2 rowers, SkiErgs, assault bikes, kettlebells, and heavy prowler sleds.'
      },
      {
        title: 'STRENGTH & CAPACITY BENCHMARK LOGGING',
        desc: 'Weekly tracking of working compound loads, timed sled intervals, and resting heart rate recovery trends.'
      },
      {
        title: 'NUTRITION & DAILY HABIT ACCOUNTABILITY',
        desc: 'Sustainable caloric deficit guidance, daily step targets, and weekly coach check-ins for permanent lifestyle transformation.'
      }
    ],
    coach: {
      name: 'MAYA LIN',
      role: 'Head of Conditioning & Metabolic Health',
      image: '/assets/images/trainer-maya.jpg',
      bio: 'Former national track athlete and conditioning specialist focused on high-yield metabolic protocols that safeguard muscle.',
      quote: 'Sustainable fat loss is not about starvation or endless hours on a treadmill. It is about building an unstoppable metabolic engine.'
    }
  },

  'personal-training': {
    id: 'personal-training',
    slug: 'personal-training',
    number: '04',
    category: '1-ON-1 VIP',
    heroCategory: 'PERSONAL TRAINING',
    name: '1-ON-1 PERSONAL TRAINING',
    headline: 'BESPOKE PROGRAMMING. DIRECT COACH MENTORSHIP.',
    tagline: 'Private one-on-one personal training tailored 100% to your individual biomechanics, schedule, injury history, and fitness aspirations.',
    heroImage: '/assets/images/program-coaching.jpg',
    badge: '1-ON-1 VIP',
    metaTitle: 'IRONFORGE FITNESS | Personal Training',
    metaDescription: 'Experience elite 1-on-1 personal coaching with certified trainers at IRONFORGE FITNESS. Bespoke workout programming, nutrition tracking, and guaranteed results in Ahmedabad.',
    stats: [
      { label: 'COACHING FORMAT', val: '1-ON-1 PRIVATE' },
      { label: 'PROGRAM LENGTH', val: 'CUSTOM (8–24 WKS)' },
      { label: 'FREQUENCY', val: '2–5 DAYS / WEEK' },
      { label: 'EXPERIENCE LEVEL', val: 'BEGINNER TO ELITE' }
    ],
    metrics: [
      { label: 'Bespoke Programming Precision', pct: 100, desc: 'Every rep, set, and exercise tailored 100% to your individual biomechanics and schedule' },
      { label: 'Tactile Form Correction & Safety', pct: 98, desc: 'Real-time spotting, joint angle adjustments, and safe progressive overload' },
      { label: 'Dedicated Coach Accountability', pct: 97, desc: '24/7 direct WhatsApp coach access for lifestyle, nutrition, and habit check-ins' },
      { label: 'Injury Pre-hab & Joint Longevity', pct: 96, desc: 'Corrective movement protocols tailored around past injuries and mobility restrictions' }
    ],
    overview: {
      heading: 'WHAT THIS PROGRAM IS',
      lead: 'The ultimate bespoke training experience with dedicated master coach mentorship.',
      p1: 'Ironforge Personal Training delivers the highest level of individualized coaching available in Ahmedabad. From your initial movement screen and joint mobility assessment, your dedicated master coach crafts a fully customized training, nutrition, and lifestyle blueprint tailored around your exact biology and schedule.',
      p2: 'Every private session is executed with real-time tactical cueing, immediate biomechanical corrections, and progressive intensity—ensuring that every single minute you invest in the gym delivers maximum measurable return.',
      benefits: [
        {
          title: 'Movement Screen & Biometric Assessment',
          desc: 'Comprehensive mobility, joint stability, and movement quality analysis before training.'
        },
        {
          title: 'Customized Training Architecture',
          desc: 'Workouts engineered precisely for your body type, injury history, and target outcomes.'
        },
        {
          title: 'Dedicated Form Spotting & Safety',
          desc: 'Continuous real-time cueing ensuring flawless technique and zero wasted reps.'
        },
        {
          title: 'Holistic Lifestyle Mentorship',
          desc: 'Sleep, stress, hydration, and nutrition monitored continuously by your coach.'
        }
      ]
    },
    whoItsFor: {
      heading: 'IS THIS PROGRAM RIGHT FOR YOU?',
      ideal: [
        {
          title: 'Busy Executives & Professionals',
          desc: 'Individuals with demanding schedules who need high-precision, efficient workouts adapted around their exact calendar.'
        },
        {
          title: 'Injury Recovery & Joint Care',
          desc: 'Members managing past injuries or joint limitations requiring customized corrective exercise and careful loading.'
        },
        {
          title: 'Goal-Driven High Achievers',
          desc: 'Lifters seeking elite-level technique breakdown, maximum accountability, and direct coach mentorship.'
        },
        {
          title: 'Total Beginners',
          desc: 'Novices wanting a private, supportive environment to learn perfect gym mechanics without any intimidation.'
        }
      ],
      notIdeal: {
        title: 'NOT IDEAL FOR',
        desc: 'Trainees looking for independent open gym access without any coach interaction or personalized programming.'
      }
    },
    trainingPillars: [
      {
        name: 'INDIVIDUAL ASSESSMENT',
        tag: 'PILLAR 01',
        desc: 'Detailed joint range of motion, postural screen, and movement quality tests before any load is applied.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>'
      },
      {
        name: 'BESPOKE PERIODIZATION',
        tag: 'PILLAR 02',
        desc: 'Workouts custom-tailored to your exact weekly schedule, travel dates, energy levels, and physiological feedback.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>'
      },
      {
        name: 'REAL-TIME CORRECTION',
        tag: 'PILLAR 03',
        desc: 'Continuous tactile cues, tempo control, and immediate safety spotting on every working set.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>'
      },
      {
        name: 'LIFESTYLE ACCOUNTABILITY',
        tag: 'PILLAR 04',
        desc: 'Direct WhatsApp access to your trainer for nutrition questions, restaurant ordering advice, and habit check-ins.',
        icon: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>'
      }
    ],
    sampleWeek: [
      {
        day: 'MONDAY',
        type: '1-ON-1 COACHED SESSION 01',
        focus: 'Biomechanical Movement Prep & Primary Compound Strength Assessment',
        duration: '60 MIN',
        intensity: 'HIGH (COACH SUPERVISED)',
        exercises: [
          'Coach-Guided Joint Mobilization & Active Warmup Schema — 10 min',
          'Primary Compound Lift with Bar Path Video Tracking — 4 sets × 6 reps',
          'Unilateral Corrective Movement (Weak-link Targeting) — 3 sets × 10 reps',
          'Postural Stabilization & Core Bracing Complex — 3 sets × 15 reps'
        ],
        coachTip: 'Your trainer actively adjusts loads in real-time based on bar speed, bracing quality, and facial fatigue cues.'
      },
      {
        day: 'TUESDAY',
        type: 'INDEPENDENT PRESCRIBED RECOVERY',
        focus: 'Trainer-Prescribed Home Mobility, Foam Rolling & 30 min Walk',
        duration: '30 MIN',
        intensity: 'LOW / RESTORATIVE',
        exercises: [
          'Coach-Prescribed Banded Shoulder & Hip Protocol — 15 min',
          'Soft-Tissue Rolling on Calves & Thoracic Spine — 15 min',
          '30-Minute Outdoor Zone 2 Walk (Nasal Breathing)',
          'Daily Nutrition & Water Log Check-in via WhatsApp'
        ],
        coachTip: 'Submit your midday meal photo to your trainer for immediate portion feedback and macro validation.'
      },
      {
        day: 'WEDNESDAY',
        type: '1-ON-1 COACHED SESSION 02',
        focus: '1-on-1 Coached Hypertrophy & Unilateral Symmetry Work',
        duration: '60 MIN',
        intensity: 'HIGH (COACH SUPERVISED)',
        exercises: [
          'Targeted Dynamic Activation & Scapular Setting — 10 min',
          'Upper Body Multi-Angle Hypertrophy Pairing — 4 sets × 8–10 reps',
          'Custom Cable Isolation with Continuous Tactile Spotting — 3 sets × 12 reps',
          'Grip Strength & Core Rotational Stability — 3 sets × 12 reps'
        ],
        coachTip: 'Your coach controls time-under-tension using a stopwatch to ensure strict 3-second eccentric contraction.'
      },
      {
        day: 'THURSDAY',
        type: 'ACTIVE REST & LIFESTYLE CHECK',
        focus: 'Stress Management, Sleep Optimization & Hydration Check-in',
        duration: 'REST',
        intensity: 'RECOVERY',
        exercises: [
          'Complete Neurological Rest Day',
          '10-Minute Evening Box Breathing Meditation',
          'Sleep Environment Optimization (Cold, Dark, 8+ Hours)',
          'Weekly Habit Scoring in Ironforge Client App'
        ],
        coachTip: 'High cortisol impairs fat loss and muscle recovery. Use this day to dial in sleep hygiene and mental relaxation.'
      },
      {
        day: 'FRIDAY',
        type: '1-ON-1 COACHED SESSION 03',
        focus: 'Posterior Chain Power, Conditioning Intervals & Form Review',
        duration: '60 MIN',
        intensity: 'HIGH (COACH SUPERVISED)',
        exercises: [
          'Glute & Hamstring Pre-Activation Drills — 10 min',
          'Heavy Posterior Chain Hinge (Deadlift / RDL) — 4 sets × 6 reps',
          'Conditioning Finisher on Turf / Rower (Heart Rate Monitored) — 15 min',
          'Assisted Passive PNF Stretching by Coach — 10 min'
        ],
        coachTip: 'Your coach performs assisted passive PNF stretches post-workout to enhance joint range of motion and accelerate recovery.'
      },
      {
        day: 'SATURDAY',
        type: 'OPTIONAL CONDITIONING FLOW',
        focus: 'Trainer-Prescribed Active Recovery Circuit or Outdoor Cardio',
        duration: '45 MIN',
        intensity: 'MODERATE (ZONE 2)',
        exercises: [
          'Trainer-Prescribed 45-Minute Cycling or Incline Walk',
          'Rotational Core & Hip Mobility Sequence — 15 min',
          'Weekend Restaurant Dining Nutrition Guidance Review'
        ],
        coachTip: 'Heading out for dinner? Review your coach’s restaurant ordering cheat-sheet to stay within your weekly targets.'
      },
      {
        day: 'SUNDAY',
        type: 'WEEKLY METRIC REVIEW & REFUEL',
        focus: '1-on-1 WhatsApp Progress Review, Biometrics & Next Week Calendar',
        duration: 'REST',
        intensity: 'RECOVERY',
        exercises: [
          'Submit Weekly Bodyweight & Habit Log to Coach',
          'Weekly Video Call or WhatsApp Review of Wins & Challenges',
          'Calendar Alignment for Upcoming Week Training Sessions'
        ],
        coachTip: 'Your coach reviews your data and updates your custom weights and schedule before Monday morning.'
      }
    ],
    progressTracking: [
      {
        title: 'BI-WEEKLY BIOMETRICS',
        desc: 'Detailed measurements, body fat analysis, and posture screen comparisons tracked directly by your coach.'
      },
      {
        title: 'SESSION-BY-SESSION LOAD LOG',
        desc: 'Every set, rep, weight, and RPE documented in your personal digital profile by your trainer.'
      },
      {
        title: 'VIDEO TECHNIQUE LIBRARY',
        desc: 'Private archive of your lifting form with voiceover analysis highlighting your movement evolution.'
      },
      {
        title: 'LIFESTYLE & NUTRITION AUDIT',
        desc: 'Continuous real-time feedback on daily meals, step counts, hydration, and sleep hygiene.'
      },
      {
        title: 'QUARTERLY MILESTONE REVIEW',
        desc: 'Formal 90-day progress presentation measuring total strength gains, body composition shifts, and goals achieved.'
      }
    ],
    included: [
      'Dedicated 1-on-1 Master Coach for Every Single Session',
      'Comprehensive Initial Biometric Screen & Movement Assessment',
      '100% Customized Training, Mobility & Nutrition Protocol',
      'Priority Booking for Peak Gym Hours & Private Training Turf Area',
      '24/7 Direct WhatsApp Access to Your Coach for Lifestyle Guidance',
      'Monthly Progress Reports & Technique Video Archive'
    ],
    inclusionsCombined: [
      {
        title: '1-ON-1 MASTER COACH FOR EVERY SESSION',
        desc: 'Private, dedicated coaching tailored to your biomechanics, injury history, and specific fitness aspirations.'
      },
      {
        title: 'COMPREHENSIVE MOVEMENT & JOINT SCREEN',
        desc: 'In-depth initial joint mobility, posture, and kinetic assessment before writing your personalized training plan.'
      },
      {
        title: '100% CUSTOMIZED WORKOUT & DIET PROTOCOL',
        desc: 'Bespoke periodization dynamically updated each week based on your physical progress and real-world schedule.'
      },
      {
        title: 'PRIORITY RACK & PRIVATE ARENA ACCESS',
        desc: 'Guaranteed equipment reservations during peak hours with private coaching turf space and zero wait times.'
      },
      {
        title: '24/7 DIRECT WHATSAPP COACHING LINE',
        desc: 'Constant direct access to your master coach for meal audits, travel workout plans, and daily lifestyle accountability.'
      },
      {
        title: 'QUARTERLY MILESTONE & VIDEO ARCHIVE',
        desc: 'Formal 90-day progress presentations, detailed body scans, and video archives documenting your physical transformation.'
      }
    ],
    coach: {
      name: 'JORDAN HAYES',
      role: 'Director of Personal Training',
      image: '/assets/images/trainer-jordan.jpg',
      bio: 'Master trainer with 15+ years experience mentoring private clients, executives, and competitive athletes.',
      quote: 'True personal training is not a cookie-cutter workout. It is an individualized blueprint built around your life.'
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PROGRAMS_DATA;
}
