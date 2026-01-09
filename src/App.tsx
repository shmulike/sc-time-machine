import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TimeControls } from './components/TimeControls';
import { Timeline } from './components/Timeline';
import { FocusSelector, type FocusTopic } from './components/FocusSelector';
import type { TimeStep, HistoricalEvent } from './types';
import { fetchEvents } from './services/wikiService';

function App() {
  const [selectedStep, setSelectedStep] = useState<TimeStep>('1 year');
  const [sliderValue, setSliderValue] = useState<number>(0);
  const [focus, setFocus] = useState<FocusTopic>('All');
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Theme Toggle Logic
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
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
      <div className="theme-toggle-wrapper">
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
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

        <Timeline events={events} loading={loading} />
      </main>

      <style>{`
        .app-container {
            min-height: 100vh;
            padding: var(--spacing-md);
            max-width: 1200px;
            margin: 0 auto;
        }
        .theme-toggle-wrapper {
            position: absolute;
            top: var(--spacing-md);
            right: var(--spacing-md);
        }
        .theme-toggle {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: 20px;
            color: var(--text-color);
            font-weight: 500;
            box-shadow: var(--shadow-sm);
            transition: all 0.2s;
        }
        .theme-toggle:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
        }
      `}</style>
    </div>
  );
}

export default App;
