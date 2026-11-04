export type PageId =
  | 'home'
  | 'vision'
  | 'habits'
  | 'finance'
  | 'todo'
  | 'notes'
  | 'meals'
  | 'reading'
  | 'sleep'
  | 'mood'
  | 'fitness'
  | 'water'
  | 'routines'
  | 'goals'
  | 'weekly_review'
  | 'month_jan'
  | 'month_feb'
  | 'month_mar'
  | 'month_apr'
  | 'month_may'
  | 'month_jun'
  | 'month_jul'
  | 'month_aug'
  | 'month_sep'
  | 'month_oct'
  | 'month_nov'
  | 'month_dec';

export interface PlacedSticker {
  id: string;
  pageId: PageId;
  type: 'image' | 'quote' | 'washi' | 'badge' | 'custom_text' | 'flower';
  content: string; // URL, SVG markup, or text
  x: number; // percentage or px
  y: number;
  width: number;
  height?: number;
  rotation: number;
  zIndex: number;
  label?: string;
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
  fontFamily?: string;
}

export interface CalendarEvent {
  id: string;
  day: number; // 1 to 31
  text: string;
  time?: string;
  category?: 'appointment' | 'work' | 'personal' | 'health' | 'celebration';
  color?: string;
}

export interface MonthData {
  year: number;
  monthIndex: number; // 0 = Jan, 11 = Dec
  quote: string;
  overviewNotes: string;
  objectives: string[];
  events: CalendarEvent[];
}

export interface HabitItem {
  id: string;
  name: string;
  category: string;
  targetDays: number;
  daysCompleted: boolean[]; // index 0..30 (day 1..31)
}

export interface FinanceCategoryItem {
  id: string;
  name: string;
  budgeted: number;
  actual: number;
}

export interface FinanceData {
  incomeItems: FinanceCategoryItem[];
  fixedExpenses: FinanceCategoryItem[];
  variableExpenses: FinanceCategoryItem[];
  savingsGoal: {
    targetName: string;
    targetAmount: number;
    currentAmount: number;
  };
  notes: string;
}

export interface VisionBoardData {
  year: string;
  travel: {
    text: string;
    destinations: string[];
    imageUrl?: string;
  };
  goals: string[];
  family: string;
  career: string;
  health: string;
  quote: string;
  affirmations: string[];
}

export interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  priority: 'urgent_important' | 'important_not_urgent' | 'daily_top3' | 'general';
}

export interface NoteEntry {
  id: string;
  title: string;
  date: string;
  paperStyle: 'lined' | 'dotted' | 'grid' | 'blank' | 'cornell';
  content: string;
  fontStyle: 'handwriting' | 'sans';
}

export interface BookEntry {
  id: string;
  title: string;
  author: string;
  rating: number; // 1-5
  status: 'reading' | 'completed' | 'want_to_read';
  notes: string;
}

export interface MealPlanDay {
  day: string;
  breakfast: string;
  lunch: string;
  dinner: string;
  snack: string;
}

export interface DailyMoodLog {
  day: number; // 1-31
  mood: 'radiant' | 'happy' | 'peaceful' | 'neutral' | 'tired' | 'stressed' | null;
  gratitude: string;
}
