import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { HistoricalEvent } from '../types';

interface EventModalProps {
    event: HistoricalEvent | null;
    onClose: () => void;
}

export const EventModal: React.FC<EventModalProps> = ({ event, onClose }) => {
    const { t } = useLanguage();

    if (!event) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>×</button>

                {event.imageUrl && (
                    <div className="modal-image-header">
                        <img src={event.imageUrl} alt={event.title} />
                        <div className="modal-image-overlay"></div>
                    </div>
                )}

                <div className="modal-body">
                    <div className="modal-meta">
                        <span className="modal-year">{event.year}</span>
                        <span className="modal-category">{event.category}</span>
                    </div>

                    <h2 className="modal-title">{event.title}</h2>

                    <div className="modal-section">
                        <h3>{t('modal.summary')}</h3>
                        <p>{event.description}</p>
                    </div>

                    <div className="modal-section">
                        <h3>{t('modal.context')}</h3>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Unique historical context regarding {event.title} would be loaded here from a richer API.
                        </p>
                    </div>

                    <div className="modal-section">
                        <h3>{t('modal.impact')}</h3>
                        <p>
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </p>
                    </div>

                    {event.sourceUrl && (
                        <a href={event.sourceUrl} target="_blank" rel="noopener noreferrer" className="wiki-link">
                            {t('read.more')}
                        </a>
                    )}
                </div>
            </div>

            <style>{`
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.75);
            backdrop-filter: blur(4px);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            animation: fadeIn 0.2s ease-out;
            padding: var(--spacing-md);
        }
        .modal-content {
            background: var(--card-bg);
            width: 100%;
            max-width: 600px;
            max-height: 90vh;
            border-radius: 16px;
            overflow-y: auto;
            position: relative;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
            animation: slideUp 0.3s ease-out;
            border: 1px solid var(--border-color);
        }
        .close-btn {
            position: absolute;
            top: var(--spacing-md);
            right: var(--spacing-md);
            background: rgba(0,0,0,0.5);
            color: white;
            border: none;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            font-size: 1.5rem;
            line-height: 1;
            cursor: pointer;
            z-index: 2;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .modal-image-header {
            width: 100%;
            height: 250px;
            position: relative;
        }
        .modal-image-header img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .modal-body {
            padding: var(--spacing-xl);
        }
        .modal-meta {
            display: flex;
            gap: var(--spacing-md);
            font-size: 0.9rem;
            font-weight: 600;
            color: var(--secondary-color);
            margin-bottom: var(--spacing-sm);
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        .modal-title {
            font-size: 2rem;
            line-height: 1.1;
            margin-bottom: var(--spacing-lg);
            color: var(--primary-color);
        }
        .modal-section {
            margin-bottom: var(--spacing-lg);
        }
        .modal-section h3 {
            font-size: 1.1rem;
            color: var(--text-color);
            margin-bottom: var(--spacing-xs);
            border-bottom: 2px solid var(--border-color);
            padding-bottom: var(--spacing-xs);
            display: inline-block;
        }
        .modal-section p {
            line-height: 1.7;
            color: var(--text-color);
            opacity: 0.9;
        }
        .wiki-link {
            display: inline-block;
            margin-top: var(--spacing-md);
            padding: var(--spacing-sm) var(--spacing-lg);
            background: var(--primary-color);
            color: white;
            border-radius: 8px;
            font-weight: 500;
            text-decoration: none;
            transition: opacity 0.2s;
        }
        .wiki-link:hover {
            opacity: 0.9;
            text-decoration: none;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        @keyframes slideUp {
            from { transform: translateY(20px); opacity: 0; }
            to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
};
