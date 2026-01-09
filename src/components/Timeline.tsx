import React from 'react';
import type { HistoricalEvent } from '../types';
import { EventCard } from './EventCard';
import { useLanguage } from '../contexts/LanguageContext';

interface TimelineProps {
    events: HistoricalEvent[];
    loading: boolean;
    onEventClick: (event: HistoricalEvent) => void;
}

export const Timeline: React.FC<TimelineProps> = ({ events, loading, onEventClick }) => {
    const { t } = useLanguage();

    if (loading) {
        return (
            <div className="timeline-loading">
                <div className="spinner"></div>
                <p>{t('loading.title')}</p>
                <style>{`
                .timeline-loading {
                    text-align: center;
                    padding: var(--spacing-2xl);
                }
                .spinner {
                    border: 4px solid var(--border-color);
                    border-top: 4px solid var(--primary-color);
                    border-radius: 50%;
                    width: 40px;
                    height: 40px;
                    animation: spin 1s linear infinite;
                    margin: 0 auto var(--spacing-md);
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            `}</style>
            </div>
        );
    }

    if (events.length === 0) {
        return (
            <div className="timeline-empty">
                <p>{t('empty.title')}</p>
                <p className="hint">{t('empty.hint')}</p>
                <style>{`
                .timeline-empty {
                    text-align: center;
                    padding: var(--spacing-2xl);
                    color: var(--text-color);
                    opacity: 0.7;
                }
                .hint {
                    font-size: 0.9rem;
                    margin-top: var(--spacing-sm);
                }
            `}</style>
            </div>
        );
    }

    return (
        <div className="timeline-container">
            {events.map((event) => (
                <EventCard key={event.id} event={event} onClick={onEventClick} />
            ))}

            <style>{`
        .timeline-container {
            display: flex;
            flex-direction: column;
            gap: var(--spacing-lg);
            padding: var(--spacing-lg) 0;
            max-width: 900px;
            margin: 0 auto;
        }
      `}</style>
        </div>
    );
};
