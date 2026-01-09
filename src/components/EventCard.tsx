import React from 'react';
import type { HistoricalEvent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface EventCardProps {
    event: HistoricalEvent;
    onClick: (event: HistoricalEvent) => void;
}

export const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
    const { t } = useLanguage();
    return (
        <div className="event-card" onClick={() => onClick(event)}>
            {event.imageUrl && (
                <div className="event-image-wrapper">
                    <img src={event.imageUrl} alt={event.title} className="event-image" loading="lazy" />
                </div>
            )}
            <div className="event-content">
                <div className="event-year">{event.year}</div>
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
                height: 250px;
            }
            .event-image-wrapper {
                flex: 0 0 300px;
                height: 100%;
            }
            .event-image {
                height: 100%;
                width: 100%;
                object-fit: cover;
            }
        }
        
        .event-image-wrapper {
            width: 100%;
            height: 200px;
            background-color: var(--border-color); /* Placeholder color */
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
        .event-year {
            font-size: 0.9rem;
            color: var(--secondary-color);
            font-weight: 600;
            margin-bottom: var(--spacing-xs);
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
            overflow-y: auto;
        }
        .read-more {
            align-self: flex-start;
            font-weight: 600;
        }
      `}</style>
        </div>
    );
};
