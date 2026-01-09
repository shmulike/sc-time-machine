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
  const [sliderValue, setSliderValue] = useState<number>(1);
  const [focus, setFocus] = useState<FocusTopic[]>([]);
  const [events, setEvents] = useState<HistoricalEvent[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedEvent, setSelectedEvent] = useState<HistoricalEvent | null>(null);
  const [eventLimit, setEventLimit] = useState<number>(5);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<string>('');

  // Theme Toggle Logic
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const { t, setLanguage, language } = useLanguage();

  // Load available voices
  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      setAvailableVoices(voices);
      // Auto-select the first voice matching the current language
      if (voices.length > 0 && !selectedVoice) {
        const langCode = language === 'he' ? 'he' : 'en';
        const matchingVoice = voices.find(v => v.lang.startsWith(langCode));
        setSelectedVoice(matchingVoice?.name || voices[0].name);
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;
  }, [language, selectedVoice]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'he' : 'en');
  };

  const loadMore = () => {
    setEventLimit(prev => prev + 10);
  };

  // Fetch data when slider stops or step changes
  useEffect(() => {
    const fetchData = async () => {
      // Save current scroll position
      const scrollY = window.scrollY;

      setLoading(true);
      try {
        const currentDate = new Date();
        const newEvents = await fetchEvents(currentDate, selectedStep, sliderValue, focus, language, eventLimit);
        setEvents(newEvents);
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);

        // Restore scroll position after content loads
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollY);
        });
      }
    };

    const timeoutId = setTimeout(fetchData, 500); // 500ms debounce
    return () => clearTimeout(timeoutId);
  }, [sliderValue, selectedStep, focus, language, eventLimit]);

  // Reset slider when step changes to avoid confusion
  const handleStepChange = (newStep: TimeStep) => {
    setSelectedStep(newStep);
    setSliderValue(1);
    setEventLimit(5);
    setEvents([]);
  };

  return (
    <div className="app-container">
      <div className="top-right-controls">
        <button onClick={toggleLanguage} className="control-btn">
          {language === 'en' ? '🇮🇱 Hebrew' : '🇺🇸 English'}
        </button>
        <select
          value={selectedVoice}
          onChange={(e) => setSelectedVoice(e.target.value)}
          className="control-select"
          title={t('voice.select')}
        >
          {availableVoices
            .filter(v => v.lang.startsWith(language === 'he' ? 'he' : 'en'))
            .map(voice => (
              <option key={voice.name} value={voice.name}>
                {voice.name.split(' ').slice(0, 2).join(' ')}
              </option>
            ))}
        </select>
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
          onSliderChange={(val) => {
            setSliderValue(val);
            setEventLimit(5); // Reset limit when slider changes
          }}
          currentDate={new Date()}
        />

        <FocusSelector selectedFocus={focus} onFocusChange={(newFocus) => {
          setFocus(newFocus);
          setEventLimit(5); // Reset limit when focus changes
        }} />

        <Timeline
          events={events}
          loading={loading}
          onEventClick={setSelectedEvent}
          onLoadMore={loadMore}
          hasMore={events.length >= eventLimit}
          selectedVoice={selectedVoice}
        />
      </main>

      <footer>
        <div className="footer-content">
          {t('app.footer')}
        </div>
      </footer>

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
            display: flex;
            flex-direction: column;
        }
        main {
            flex: 1;
        }
        .top-right-controls {
            position: fixed;
            top: var(--spacing-md);
            right: var(--spacing-md);
            display: flex;
            gap: var(--spacing-sm);
            z-index: 1000;
        }
        /* Override RTL for these buttons to keep them top-right */
        [dir="rtl"] .top-right-controls {
            right: var(--spacing-md) !important;
            left: auto !important;
            flex-direction: row-reverse;
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
            backdrop-filter: blur(8px);
        }
        .control-btn:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
            background: var(--border-color);
        }
        .control-select {
            background: var(--card-bg);
            border: 1px solid var(--border-color);
            padding: var(--spacing-sm) var(--spacing-md);
            border-radius: 20px;
            color: var(--text-color);
            font-weight: 500;
            box-shadow: var(--shadow-sm);
            transition: all 0.2s;
            backdrop-filter: blur(8px);
            cursor: pointer;
            max-width: 150px;
        }
        .control-select:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-md);
            background: var(--border-color);
        }
        footer {
            padding: var(--spacing-xl) 0;
            text-align: center;
            border-top: 1px solid var(--border-color);
            margin-top: var(--spacing-2xl);
            opacity: 0.6;
            font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

export default App;
