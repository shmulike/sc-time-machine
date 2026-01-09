import React from 'react';
import type { HistoricalEvent } from '../types';
import { EventCard } from './EventCard';

interface TimelineProps {
    events: HistoricalEvent[];
    loading: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ events, loading }) => {
    if (loading) {
        return (
            <div className="timeline-loading">
                <div className="spinner"></div>
                <p>Traveling through time...</p>
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
                <p>No recorded events found for this specific time period.</p>
                <p className="hint">Try adjusting the slider slightly!</p>
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
                <EventCard key={event.id} event={event} />
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
