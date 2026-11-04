import {
  VisionBoardData,
  MonthData,
  HabitItem,
  FinanceData,
  TodoItem,
  NoteEntry,
  PlacedSticker,
} from '../types/planner';

export const DEFAULT_VISION_BOARD: VisionBoardData = {
  year: '2025',
  travel: {
    text: 'Kyoto bamboo groves & tea houses · Amalfi coast sunset drives · Provence lavender blooms · Scandinavian forest cabin retreat.',
    destinations: ['Japan', 'Italy', 'France', 'Norway'],
  },
  goals: [
    'Cultivate inner peace & mindful daily presence',
    'Grow creative studio & launch digital stationery line',
    'Save 30% of annual income into long-term investments',
    'Read 24 transformative books across philosophy & design',
  ],
  family: 'Weekly Sunday dinners, heartfelt conversations, quality uninterrupted presence with loved ones, celebrating milestones together.',
  career: 'Lead intentional projects with purpose, refine craft in design and writing, build independent financial freedom.',
  health: 'Morning sun & gentle pilates, nourishing Mediterranean foods, 2 liters of water daily, 8 hours of deep restorative sleep.',
  quote: 'Faites plus de ce que vous aimez · Do more of what you love',
  affirmations: ['I am capable, resilient and at peace', 'Everything unfolds in perfect divine timing'],
};

export const DEFAULT_MONTH_DATA: MonthData = {
  year: 2025,
  monthIndex: 0,
  quote: "N'aie pas peur d'avancer lentement. Aie peur de rester immobile.",
  overviewNotes: 'A month of renewal, gentle pacing, and intentional foundation-building for the year ahead.',
  objectives: [
    'Establish consistent morning mindfulness routine',
    'Review annual financial blueprint & automate savings',
    'Complete initial draft of creative project',
  ],
  events: [
    { id: 'ev-1', day: 2, text: 'RDV dentiste', category: 'appointment' },
    { id: 'ev-2', day: 6, text: 'Pilates workshop', category: 'health' },
    { id: 'ev-3', day: 10, text: 'Strategy meeting', category: 'work' },
    { id: 'ev-4', day: 15, text: 'RDV dentiste check', category: 'appointment' },
    { id: 'ev-5', day: 20, text: 'Dinner with Chloe', category: 'celebration' },
    { id: 'ev-6', day: 26, text: 'Weekend getaway', category: 'personal' },
  ],
};

export const DEFAULT_HABITS: HabitItem[] = [
  {
    id: 'h1',
    name: '2L Water Hydration',
    category: 'Health',
    targetDays: 30,
    daysCompleted: [true, true, true, true, false, true, true, true, true, true, true, false, true, true, true, true, true, false, true, true, true, true, false, true, true, true, true, true, true, true, true],
  },
  {
    id: 'h2',
    name: 'Morning Movement & Stretch',
    category: 'Health',
    targetDays: 25,
    daysCompleted: [true, true, true, false, true, true, false, true, true, true, false, true, true, true, false, true, true, true, false, true, true, true, false, true, true, false, true, true, true, true, false],
  },
  {
    id: 'h3',
    name: '20 Min Mindful Reading',
    category: 'Growth',
    targetDays: 28,
    daysCompleted: [true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true, false, true, true, true],
  },
  {
    id: 'h4',
    name: 'Daily Gratitude Journaling',
    category: 'Mindset',
    targetDays: 30,
    daysCompleted: [true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, false, true, true, true, true, true, true, true, true, true],
  },
  {
    id: 'h5',
    name: 'No Screen 45m Before Sleep',
    category: 'Sleep',
    targetDays: 22,
    daysCompleted: [true, false, true, true, false, false, true, true, true, false, true, true, false, false, true, true, true, false, true, true, false, false, true, true, true, false, true, true, true, false, true],
  },
  {
    id: 'h6',
    name: 'Healthy Homecooked Meal',
    category: 'Nourishment',
    targetDays: 26,
    daysCompleted: [true, true, true, true, false, true, true, true, true, true, false, true, true, true, true, false, true, true, true, true, true, false, true, true, true, true, false, true, true, true, true],
  },
];

export const DEFAULT_FINANCE: FinanceData = {
  incomeItems: [
    { id: 'in-1', name: 'Primary Consulting / Salary', budgeted: 5000, actual: 5200 },
    { id: 'in-2', name: 'Digital Stationery Products', budgeted: 800, actual: 1150 },
    { id: 'in-3', name: 'Dividends & Investments', budgeted: 250, actual: 290 },
  ],
  fixedExpenses: [
    { id: 'fx-1', name: 'Studio & Living Rent', budgeted: 1800, actual: 1800 },
    { id: 'fx-2', name: 'Utilities, High-Speed Wifi', budgeted: 180, actual: 175 },
    { id: 'fx-3', name: 'Creative Subscriptions & Cloud', budgeted: 90, actual: 85 },
    { id: 'fx-4', name: 'Health & Wellness Membership', budgeted: 120, actual: 120 },
  ],
  variableExpenses: [
    { id: 'vx-1', name: 'Organic Grocery Market', budgeted: 600, actual: 580 },
    { id: 'vx-2', name: 'Coffee, Matcha & Dining Out', budgeted: 350, actual: 390 },
    { id: 'vx-3', name: 'Books, Art Supplies & Flora', budgeted: 150, actual: 135 },
    { id: 'vx-4', name: 'Personal Care & Skincare', budgeted: 120, actual: 110 },
  ],
  savingsGoal: {
    targetName: 'Japan & Kyoto Autumn Journey',
    targetAmount: 5500,
    currentAmount: 4150,
  },
  notes: 'Consistently allocating 35% of monthly net income to high-yield investment fund.',
};

export const DEFAULT_TODOS: TodoItem[] = [
  { id: 'td-1', text: 'Finalize 2025 Vision Board & Quarterly Goals', completed: true, priority: 'daily_top3' },
  { id: 'td-2', text: 'Schedule dentist appointment checkup', completed: true, priority: 'daily_top3' },
  { id: 'td-3', text: 'Automate monthly savings transfer', completed: false, priority: 'daily_top3' },
  { id: 'td-4', text: 'Submit quarterly design deliverables', completed: false, priority: 'urgent_important' },
  { id: 'td-5', text: 'Deep work: Write creative studio manifesto', completed: false, priority: 'important_not_urgent' },
  { id: 'td-6', text: 'Pick up fresh flowers from Saturday market', completed: true, priority: 'general' },
  { id: 'td-7', text: 'Restock botanical teas & organic matcha', completed: false, priority: 'general' },
];

export const DEFAULT_NOTE: NoteEntry = {
  id: 'note-1',
  title: 'Reflections on Intentional Pacing & Slowness',
  date: 'November 2026',
  paperStyle: 'lined',
  fontStyle: 'handwriting',
  content: `There is a profound beauty in choosing slowness over hurried urgency. When we allow our days to unfold with quiet presence, space opens up for real clarity.

Key intentions for this season:
1. Protect mornings: No email or notifications for the first 45 minutes.
2. Honor rituals: The morning brew, lighting a candle, writing three lines of gratitude.
3. Quality over quantity in every piece of work I put into the world.

"N'aie pas peur d'avancer lentement. Aie peur de rester immobile."
Step by step, habit by habit, a life is built.`,
};

export const DEFAULT_STICKERS: PlacedSticker[] = [
  // On Month Jan spread:
  {
    id: 'st-1',
    pageId: 'month_jan',
    type: 'quote',
    content: 'Je suis prête à réussir',
    x: 22,
    y: 35,
    width: 120,
    rotation: -4,
    zIndex: 10,
    bgColor: '#fdf7f2',
    textColor: '#4a3b32',
  },
  {
    id: 'st-2',
    pageId: 'month_jan',
    type: 'quote',
    content: 'Je suis résiliente et fière',
    x: 72,
    y: 36,
    width: 125,
    rotation: 2,
    zIndex: 11,
    bgColor: '#f5f9f6',
    textColor: '#364d3e',
  },
  {
    id: 'st-3',
    pageId: 'month_jan',
    type: 'badge',
    content: 'POLAROID_MEMORIES',
    x: 67,
    y: 54,
    width: 85,
    rotation: -3,
    zIndex: 12,
  },
  {
    id: 'st-4',
    pageId: 'month_jan',
    type: 'badge',
    content: 'POLAROID_CELEBRATE',
    x: 78,
    y: 68,
    width: 80,
    rotation: 4,
    zIndex: 13,
  },
  {
    id: 'st-5',
    pageId: 'month_jan',
    type: 'washi',
    content: '♥   ♥   ♥',
    x: 23,
    y: 69,
    width: 90,
    rotation: 0,
    zIndex: 14,
    bgColor: '#f7d6d0',
    textColor: '#ffffff',
  },
  {
    id: 'st-6',
    pageId: 'month_jan',
    type: 'quote',
    content: 'Je trouve l’amour',
    x: 85,
    y: 69,
    width: 95,
    rotation: -2,
    zIndex: 15,
    bgColor: '#fdf2f4',
    textColor: '#8e4b5d',
  },
  {
    id: 'st-7',
    pageId: 'month_jan',
    type: 'quote',
    content: 'Je vis des possibilités ✨',
    x: 87,
    y: 37,
    width: 110,
    rotation: 5,
    zIndex: 16,
    bgColor: '#faf6eb',
    textColor: '#63532c',
  },

  // On Vision board spread:
  {
    id: 'st-8',
    pageId: 'vision',
    type: 'flower',
    content: 'daisy',
    x: 88,
    y: 22,
    width: 50,
    rotation: 12,
    zIndex: 10,
  },
  {
    id: 'st-9',
    pageId: 'vision',
    type: 'flower',
    content: 'eucalyptus',
    x: 37,
    y: 48,
    width: 45,
    rotation: -15,
    zIndex: 10,
  },
  {
    id: 'st-10',
    pageId: 'vision',
    type: 'washi',
    content: '🌿   🌿   🌿',
    x: 52,
    y: 86,
    width: 100,
    rotation: 4,
    zIndex: 11,
    bgColor: '#f1ede4',
    textColor: '#5a685e',
  },
];
