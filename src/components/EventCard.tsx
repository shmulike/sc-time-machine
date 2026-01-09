import React, { useState } from 'react';
import type { HistoricalEvent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface EventCardProps {
    event: HistoricalEvent;
    onClick: (event: HistoricalEvent) => void;
    selectedVoice: string;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick, selectedVoice }) => {
    const { t, language } = useLanguage();
    const [isSpeaking, setIsSpeaking] = useState(false);

    const formatYear = (year: number) => {
        if (typeof year !== 'number') return year;
        if (year > 0) return `${year}`;
        return `${Math.abs(year)} BC`;
    };

    const handleSpeak = (e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click event

        // Always stop any ongoing speech first
        window.speechSynthesis.cancel();

        // If this card was speaking, just stop
        if (isSpeaking) {
            setIsSpeaking(false);
            return;
        }

        // Create speech utterance
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = `${event.title}. ${event.description}`;
        utterance.lang = language === 'he' ? 'he-IL' : 'en-US';

        // Use selected voice if available
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.name === selectedVoice);
        if (voice) {
            utterance.voice = voice;
        }

        utterance.rate = 1.0;
        utterance.pitch = 1.0;

        utterance.onstart = () => setIsSpeaking(true);
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);

        window.speechSynthesis.speak(utterance);
    };

    return (
        <div className="event-card" onClick={() => onClick(event)}>
            {event.imageUrl && (
                <div className="event-image-wrapper">
                    <img src={event.imageUrl} alt={event.title} className="event-image" loading="lazy" />
                </div>
            )}
            <div className="event-content">
                <div className="event-header">
                    <div className="event-year">{formatYear(event.year as number)}</div>
                    <button
                        className="tts-button"
                        onClick={handleSpeak}
                        title={t(isSpeaking ? 'tts.stop' : 'tts.listen')}
                        aria-label={t(isSpeaking ? 'tts.stop' : 'tts.listen')}
                    >
                        {isSpeaking ? '⏸' : '🔊'}
                    </button>
                </div>
                <h3 className="event-title">{event.title}</h3>
                <p className="event-description">{event.description}</p>

                {event.sourceUrl && (
                    <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="read-more">
                        {t('read.more')}
                    </a>
                )}
            </div>

            <style>{`
        .event-card {
            display: flex;
            flex-direction: column;
            background: var(--card-bg);
            border-radius: 12px;
            overflow: hidden;
            box-shadow: var(--shadow-md);
            border: 1px solid var(--border-color);
            transition: transform 0.2s, box-shadow 0.2s;
            cursor: pointer;
        }
        .event-card:hover {
            transform: translateY(-4px);
            box-shadow: var(--shadow-lg);
        }
        @media (min-width: 640px) {
            .event-card {
                flex-direction: row;
                height: auto;
                min-height: 250px;
                align-items: stretch;
            }
            .event-image-wrapper {
                flex: 0 0 300px;
                position: relative;
                min-height: 250px;
            }
            .event-image {
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        
        .event-image-wrapper {
            width: 100%;
            height: 200px;
            background-color: var(--border-color);
        }
        .event-image {
             width: 100%;
             height: 100%;
             object-fit: cover;
        }
        .event-content {
            padding: var(--spacing-lg);
            display: flex;
            flex-direction: column;
            flex: 1;
        }
        .event-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: var(--spacing-xs);
        }
        .event-year {
            font-size: 0.9rem;
            color: var(--secondary-color);
            font-weight: 600;
        }
        .tts-button {
            background: transparent;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 6px 10px;
            font-size: 1.2rem;
            cursor: pointer;
            transition: all 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .tts-button:hover {
            background: var(--border-color);
            transform: scale(1.1);
        }
        .event-title {
            font-size: 1.5rem;
            margin-bottom: var(--spacing-sm);
            color: var(--primary-color);
        }
        .event-description {
            flex: 1;
            font-size: 1rem;
            color: var(--text-color);
            line-height: 1.6;
            margin-bottom: var(--spacing-md);
            overflow: hidden;
            display: -webkit-box;
            -webkit-line-clamp: 4;
            -webkit-box-orient: vertical;
        }
        .read-more {
            align-self: flex-start;
            font-weight: 600;
        }
      `}</style>
        </div>
    );
};
