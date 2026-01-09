import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TimeControls } from './components/TimeControls';
import { Timeline } from './components/Timeline';
import { FocusSelector, type FocusTopic } from './components/FocusSelector';
import type { TimeStep, HistoricalEvent } from './types';
import { fetchEvents } from './services/wikiService';
import { useLanguage } from './contexts/LanguageContext';
import { EventModal } from './components/EventModal';

function App() {
  const [selectedStep, setSelectedStep] = useState<TimeStep>('1 year');
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [focus, setFocus] = useState<FocusTopic[]>([]);
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);

  // Theme Toggle Logic
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const { t, setLanguage, language } = useLanguage();

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  // Fetch data when slider stops or step changes
  useEffect(() => {
    // Debounce or just fetch if value > 0
    if (sliderValue === 0) {
      setEvents([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const currentDate = new Date();
        const newEvents = await fetchEvents(currentDate, selectedStep, sliderValue, focus);
        setEvents(newEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchData, 500); // 500ms debounce
    return () => clearTimeout(timeoutId);
  }, [sliderValue, selectedStep, focus]);

  // Reset slider when step changes to avoid confusion
  const handleStepChange = (newStep: TimeStep) => {
    setSelectedStep(newStep);
    setSliderValue(0);
    setEvents([]);
  };

  return (
    <div className="app-container">
      <div className="top-controls">
        <button onClick={toggleLanguage} className="control-btn">
          {language === 'en' ? '🇮🇱 Hebrew' : '🇺🇸 English'}
        </button>
        <button onClick={toggleTheme} className="control-btn">
          {t(theme === 'light' ? 'theme.dark' : 'theme.light')}
        </button>
      </div>

      <Header />

      <main>
        <TimeControls
          selectedStep={selectedStep}
          onStepChange={handleStepChange}
          sliderValue={sliderValue}
          onSliderChange={setSliderValue}
          currentDate={new Date()}
        />

        <FocusSelector selectedFocus={focus} onFocusChange={setFocus} />

        <Timeline
          events={events}
          loading={loading}
          onEventClick={setSelectedEvent}
        />
      </main>

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />

      <style>{`
        .app-container {
            min-height: 100vh;
            padding: var(--spacing-md);
            max-width: 1200px;
            margin: 0 auto;
        }
        .top-controls {
            position: absolute;
            top: var(--spacing-md);
            right: var(--spacing-md);
            display: flex;
            gap: var(--spacing-sm);
            z-index: 10;
        }
        [dir="rtl"] .top-controls {
            right: auto;
            left: var(--spacing-md);
        }
        .control-btn {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: 20px;
            color: var(--text-color);
            font-weight: 500;
            box-shadow: var(--shadow-sm);
            transition: all 0.2s;
            display: flex;
            align-items: center;
            gap: 6px;
        }
        .control-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}

export default App;
