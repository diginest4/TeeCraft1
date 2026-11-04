import React, { useState } from 'react';
import { PageId, BookEntry, MealPlanDay } from '../../types/planner';
import { Plus, Trash2, Star, CheckSquare, Droplets, Dumbbell, Utensils, BookOpen, Bed, Smile } from 'lucide-react';

interface LifestyleTrackersProps {
  pageId: PageId;
}

export const LifestyleTrackers: React.FC<LifestyleTrackersProps> = ({ pageId }) => {
  // Local state for lifestyle modules
  const [mealDays, setMealDays] = useState<MealPlanDay[]>([
    { day: 'Monday', breakfast: 'Avocado toast & poached egg', lunch: 'Quinoa salmon bowl', dinner: 'Roasted vegetable curry', snack: 'Almonds & berries' },
    { day: 'Tuesday', breakfast: 'Berry chia pudding', lunch: 'Mediterranean wrap', dinner: 'Herb chicken & sweet potato', snack: 'Green tea & dark chocolate' },
    { day: 'Wednesday', breakfast: 'Green smoothie bowl', lunch: 'Lentil soup & salad', dinner: 'Baked cod with asparagus', snack: 'Greek yogurt' },
    { day: 'Thursday', breakfast: 'Oatmeal with honey & walnuts', lunch: 'Turkey avocado salad', dinner: 'Stir-fry tofu & vegetables', snack: 'Apple slices & peanut butter' },
    { day: 'Friday', breakfast: 'Scrambled eggs & greens', lunch: 'Grain bowl with hummus', dinner: 'Homemade sourdough pizza', snack: 'Sparkling citrus water' },
    { day: 'Saturday', breakfast: 'Pancakes with fresh berries', lunch: 'Farmers market picnic', dinner: 'Slow-cooked stew', snack: 'Fresh fruits' },
    { day: 'Sunday', breakfast: 'Weekend brunch', lunch: 'Leftovers & salad', dinner: 'Soup & toasted bread', snack: 'Herbal tea' },
  ]);

  const [groceries, setGroceries] = useState([
    { id: '1', text: 'Avocados & fresh lemons', checked: true },
    { id: '2', text: 'Wild salmon fillets', checked: false },
    { id: '3', text: 'Chia seeds & raw walnuts', checked: true },
    { id: '4', text: 'Organic baby spinach & kale', checked: false },
    { id: '5', text: 'Greek yogurt & honey', checked: false },
  ]);
  const [newGrocery, setNewGrocery] = useState('');

  // Bookshelf / Reading Log
  const [books, setBooks] = useState<BookEntry[]>([
    { id: 'b1', title: 'Atomic Habits', author: 'James Clear', rating: 5, status: 'completed', notes: 'Tiny changes, remarkable results.' },
    { id: 'b2', title: 'The Mountain Is You', author: 'Brianna Wiest', rating: 5, status: 'completed', notes: 'Transforming self-sabotage into self-mastery.' },
    { id: 'b3', title: 'Essentialism', author: 'Greg McKeown', rating: 4, status: 'reading', notes: 'The disciplined pursuit of less.' },
    { id: 'b4', title: 'Slow Living', author: 'Helena Woods', rating: 5, status: 'want_to_read', notes: 'Creating peace in everyday simplicity.' },
  ]);

  // Water Hydration Tracker (8 glasses)
  const [waterGlasses, setWaterGlasses] = useState<boolean[]>(Array(8).fill(false));

  // Mood Tracker Stamp for the day
  const [currentMood, setCurrentMood] = useState<string>('peaceful');
  const [gratitudeNotes, setGratitudeNotes] = useState([
    'Morning quiet moments with tea',
    'Reaching milestones on my goals',
    'A long walk in the crisp afternoon sun',
  ]);

  // Workout Log
  const [workouts, setWorkouts] = useState([
    { id: 'w1', day: 'Monday', activity: 'Morning Pilates & Yoga', duration: '35 min', intensity: 'Gentle' },
    { id: 'w2', day: 'Wednesday', activity: 'Strength & Core workout', duration: '45 min', intensity: 'Moderate' },
    { id: 'w3', day: 'Friday', activity: 'Outdoor brisk walk / run', duration: '40 min', intensity: 'Active' },
  ]);

  if (pageId === 'meals') {
    return (
      <div className="w-full h-full p-4 sm:p-6 flex flex-col justify-between bg-paper-cream select-text">
        <div className="flex items-end justify-between border-b border-[#ded7cc] pb-3 mb-3">
          <div>
            <h1 className="font-serif-title text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#343e37]">
              MENU DE LA SEMAINE · MEAL PLANNER
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-[#887b6e]">
              Weekly Nourishment, Recipes &amp; Market Grocery List
            </p>
          </div>
          <Utensils className="w-5 h-5 text-[#887b6e]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 flex-1 overflow-y-auto">
          {/* Meal Days (8 cols) */}
          <div className="md:col-span-8 space-y-2">
            {mealDays.map((m, idx) => (
              <div key={idx} className="bg-white/80 p-2.5 rounded-xs border border-[#e0d6cb] shadow-2xs">
                <div className="flex items-center justify-between border-b border-[#eee7de] pb-1 mb-1">
                  <span className="font-serif-title text-xs uppercase tracking-wider font-semibold text-[#54473b]">
                    {m.day}
                  </span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-[9px] uppercase text-[#96897b] font-serif-title block">Breakfast:</span>
                    <input
                      type="text"
                      value={m.breakfast}
                      onChange={(e) => {
                        const updated = [...mealDays];
                        updated[idx].breakfast = e.target.value;
                        setMealDays(updated);
                      }}
                      className="w-full font-handwriting text-xs text-[#38312a] bg-transparent border-0 p-0 focus:ring-0"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-[#96897b] font-serif-title block">Lunch:</span>
                    <input
                      type="text"
                      value={m.lunch}
                      onChange={(e) => {
                        const updated = [...mealDays];
                        updated[idx].lunch = e.target.value;
                        setMealDays(updated);
                      }}
                      className="w-full font-handwriting text-xs text-[#38312a] bg-transparent border-0 p-0 focus:ring-0"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-[#96897b] font-serif-title block">Dinner:</span>
                    <input
                      type="text"
                      value={m.dinner}
                      onChange={(e) => {
                        const updated = [...mealDays];
                        updated[idx].dinner = e.target.value;
                        setMealDays(updated);
                      }}
                      className="w-full font-handwriting text-xs text-[#38312a] bg-transparent border-0 p-0 focus:ring-0"
                    />
                  </div>
                  <div>
                    <span className="text-[9px] uppercase text-[#96897b] font-serif-title block">Snack:</span>
                    <input
                      type="text"
                      value={m.snack}
                      onChange={(e) => {
                        const updated = [...mealDays];
                        updated[idx].snack = e.target.value;
                        setMealDays(updated);
                      }}
                      className="w-full font-handwriting text-xs text-[#38312a] bg-transparent border-0 p-0 focus:ring-0"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Grocery Checklist (4 cols) */}
          <div className="md:col-span-4 bg-white/85 p-3 rounded-xs border border-[#ded5c7] shadow-xs flex flex-col">
            <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
              <span className="font-serif-title text-xs uppercase tracking-wider text-[#40352b] font-semibold">
                COURSES · GROCERIES
              </span>
              <CheckSquare className="w-3.5 h-3.5 text-[#857666]" />
            </div>

            <div className="flex items-center gap-1 mb-2">
              <input
                type="text"
                value={newGrocery}
                onChange={(e) => setNewGrocery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && newGrocery.trim()) {
                    setGroceries([...groceries, { id: Date.now().toString(), text: newGrocery.trim(), checked: false }]);
                    setNewGrocery('');
                  }
                }}
                placeholder="Add market item..."
                className="flex-1 text-xs font-handwriting p-1 border-b border-[#ded7cc] bg-transparent focus:outline-hidden"
              />
              <button
                type="button"
                onClick={() => {
                  if (newGrocery.trim()) {
                    setGroceries([...groceries, { id: Date.now().toString(), text: newGrocery.trim(), checked: false }]);
                    setNewGrocery('');
                  }
                }}
                className="p-1 text-[#5c4f42] hover:text-[#2c241c] cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5 flex-1 overflow-y-auto">
              {groceries.map((g) => (
                <div
                  key={g.id}
                  onClick={() =>
                    setGroceries(
                      groceries.map((item) =>
                        item.id === g.id ? { ...item, checked: !item.checked } : item
                      )
                    )
                  }
                  className="flex items-center justify-between gap-1.5 text-xs cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 min-w-0">
                    <div
                      className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center shrink-0 ${
                        g.checked ? 'bg-[#82998b] text-white border-[#6c8576]' : 'border-[#cfc4b6] bg-white'
                      }`}
                    >
                      {g.checked && <span className="text-[8px]">✓</span>}
                    </div>
                    <span className={`font-handwriting text-sm truncate ${g.checked ? 'line-through text-[#9d9082]' : 'text-[#38312a]'}`}>
                      {g.text}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setGroceries(groceries.filter((item) => item.id !== g.id));
                    }}
                    className="opacity-0 group-hover:opacity-100 text-[#aa9b8d] hover:text-red-500 cursor-pointer"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[11px] font-handwriting text-[#736353]">
          <span>Nourish your body with love and mindful intention</span>
          <span className="font-serif-title uppercase text-[10px]">Weekly Menu Planner</span>
        </div>
      </div>
    );
  }

  if (pageId === 'reading') {
    return (
      <div className="w-full h-full p-4 sm:p-6 flex flex-col justify-between bg-paper-cream select-text">
        <div className="flex items-end justify-between border-b border-[#ded7cc] pb-3 mb-3">
          <div>
            <h1 className="font-serif-title text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#343e37]">
              BIBLIOTHÈQUE · READING LOG
            </h1>
            <p className="text-[10px] tracking-widest uppercase text-[#887b6e]">
              Bookshelf, Ratings, Key Lessons &amp; Quotes
            </p>
          </div>
          <BookOpen className="w-5 h-5 text-[#887b6e]" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1 overflow-y-auto">
          {books.map((book) => (
            <div key={book.id} className="bg-white/85 p-3.5 rounded-xs border border-[#e0d6cb] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-2 mb-1">
                  <div>
                    <h3 className="font-serif-title text-base text-[#383028] font-semibold">{book.title}</h3>
                    <p className="text-xs font-handwriting text-[#695d52]">by {book.author}</p>
                  </div>
                  <span className={`text-[9px] uppercase px-2 py-0.5 rounded-xs font-serif-title ${
                    book.status === 'completed' ? 'bg-[#e4ece5] text-[#33593b]' : 'bg-[#f4ebe3] text-[#78513b]'
                  }`}>
                    {book.status.replace('_', ' ')}
                  </span>
                </div>

                <div className="flex items-center gap-1 my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setBooks(
                          books.map((b) => (b.id === book.id ? { ...b, rating: star } : b))
                        )
                      }
                      className="cursor-pointer"
                    >
                      <Star
                        className={`w-3.5 h-3.5 ${
                          star <= book.rating ? 'fill-[#c99f57] text-[#c99f57]' : 'text-[#cfc4b7]'
                        }`}
                      />
                    </button>
                  ))}
                </div>

                <p className="font-handwriting text-sm text-[#4d4237] italic bg-[#faf7f2] p-2 rounded-xs border border-[#eee6dc]">
                  "{book.notes}"
                </p>
              </div>

              <div className="text-right text-[10px] text-[#918375] font-mono mt-2">
                Aura Reading Club
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[11px] font-handwriting text-[#736353]">
          <span>"A reader lives a thousand lives before he dies." — George R.R. Martin</span>
          <span className="font-serif-title uppercase text-[10px]">4 Books Logged</span>
        </div>
      </div>
    );
  }

  // Fallback for Mood, Sleep, Fitness & Water
  return (
    <div className="w-full h-full p-4 sm:p-6 flex flex-col justify-between bg-paper-cream select-text">
      <div className="flex items-end justify-between border-b border-[#ded7cc] pb-3 mb-3">
        <div>
          <h1 className="font-serif-title text-2xl sm:text-3xl tracking-[0.2em] uppercase text-[#343e37]">
            BIEN-ÊTRE · WELLNESS &amp; RHYTHMS
          </h1>
          <p className="text-[10px] tracking-widest uppercase text-[#887b6e]">
            Hydration · Daily Mood &amp; Gratitude · Movement
          </p>
        </div>
        <Smile className="w-5 h-5 text-[#887b6e]" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 overflow-y-auto">
        {/* Hydration tracker */}
        <div className="bg-white/85 p-4 rounded-xs border border-[#e0d6cb] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
              <span className="font-serif-title text-xs uppercase tracking-wider text-[#355269] font-semibold flex items-center gap-1">
                <Droplets className="w-4 h-4 text-[#5c85a6]" /> 8 GLASSES HYDRATION
              </span>
            </div>
            <p className="text-xs font-handwriting text-[#615447] mb-3">
              Click each water glass as you hydrate throughout the day:
            </p>

            <div className="grid grid-cols-4 gap-2 text-center">
              {waterGlasses.map((filled, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    const updated = [...waterGlasses];
                    updated[idx] = !updated[idx];
                    setWaterGlasses(updated);
                  }}
                  className={`p-2 rounded-xs border flex flex-col items-center justify-center transition-all cursor-pointer ${
                    filled
                      ? 'bg-[#d6e5ef] border-[#89b3d1] text-[#2c5373] scale-105 shadow-2xs'
                      : 'bg-white border-[#ded5c7] text-[#9e9182] hover:bg-[#faf7f2]'
                  }`}
                >
                  <Droplets className={`w-5 h-5 mb-1 ${filled ? 'fill-[#5c85a6] text-[#5c85a6]' : ''}`} />
                  <span className="text-[10px] font-mono">250ml</span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-mono text-[#615447] pt-2 border-t border-[#eee7de] text-center">
            {waterGlasses.filter(Boolean).length * 250} ml / 2000 ml reached
          </div>
        </div>

        {/* Mood & Gratitude */}
        <div className="bg-white/85 p-4 rounded-xs border border-[#e0d6cb] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
              <span className="font-serif-title text-xs uppercase tracking-wider text-[#694e35] font-semibold">
                DAILY MOOD &amp; GRATITUDE
              </span>
            </div>

            <div className="flex items-center justify-between gap-1 mb-3">
              {[
                { id: 'radiant', emoji: '✨', label: 'Radiant' },
                { id: 'happy', emoji: '😊', label: 'Happy' },
                { id: 'peaceful', emoji: '🌿', label: 'Peaceful' },
                { id: 'neutral', emoji: '☁️', label: 'Calm' },
                { id: 'tired', emoji: '🌙', label: 'Tired' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setCurrentMood(m.id)}
                  className={`flex-1 p-1.5 text-center rounded-xs border cursor-pointer transition-all ${
                    currentMood === m.id
                      ? 'bg-[#faeee6] border-[#d8b5a0] scale-105 font-bold shadow-2xs'
                      : 'bg-white border-[#eee6dc] text-[#7d7164]'
                  }`}
                >
                  <div className="text-base">{m.emoji}</div>
                  <span className="text-[9px] block font-serif-title uppercase">{m.label}</span>
                </button>
              ))}
            </div>

            <span className="text-[10px] uppercase font-serif-title text-[#786b5d] block mb-1">
              3 Things I am Grateful For:
            </span>
            <div className="space-y-1">
              {gratitudeNotes.map((note, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="text-[10px] text-[#9c8d7e]">♡</span>
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => {
                      const updated = [...gratitudeNotes];
                      updated[idx] = e.target.value;
                      setGratitudeNotes(updated);
                    }}
                    className="flex-1 text-xs font-handwriting text-[#38312a] bg-transparent border-b border-[#eee7de] pb-0.5 focus:outline-hidden"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="text-[11px] font-handwriting text-[#8a7b6c] text-center pt-2">
            Gratitude turns what we have into enough.
          </div>
        </div>

        {/* Movement & Workouts */}
        <div className="bg-white/85 p-4 rounded-xs border border-[#e0d6cb] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-[#ece4d8] pb-1.5 mb-2">
              <span className="font-serif-title text-xs uppercase tracking-wider text-[#355943] font-semibold flex items-center gap-1">
                <Dumbbell className="w-4 h-4 text-[#5c856b]" /> MOVEMENT &amp; WORKOUTS
              </span>
            </div>

            <div className="space-y-2">
              {workouts.map((w) => (
                <div key={w.id} className="p-2 bg-[#faf7f2] border border-[#eee7de] rounded-xs">
                  <div className="flex items-center justify-between text-xs font-semibold text-[#453c33] font-serif-title">
                    <span>{w.day}</span>
                    <span className="font-mono text-[10px] text-[#7d9484]">{w.duration}</span>
                  </div>
                  <p className="font-handwriting text-sm text-[#383027]">{w.activity}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setWorkouts([
                ...workouts,
                { id: `w-${Date.now()}`, day: 'Today', activity: 'Mindful walking & yoga', duration: '30 min', intensity: 'Gentle' },
              ]);
            }}
            className="w-full py-1.5 mt-2 bg-[#425248] text-white text-xs uppercase tracking-wider font-semibold rounded-xs hover:bg-[#344139] cursor-pointer"
          >
            + Log Movement
          </button>
        </div>
      </div>

      <div className="mt-3 pt-2 border-t border-[#ded7cc] flex items-center justify-between text-[11px] font-handwriting text-[#736353]">
        <span>Listen to your body · Move with joy</span>
        <span className="font-serif-title uppercase text-[10px]">Aura Wellness Sanctuary</span>
      </div>
    </div>
  );
};
