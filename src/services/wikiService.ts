import type { HistoricalEvent, TimeStep } from '../types';

import type { FocusTopic } from '../components/FocusSelector';

// Mock data generator for demonstration
const generateMockEvents = (targetYear: number, _timeStep: TimeStep, focus: FocusTopic): HistoricalEvent[] => {
    const events: HistoricalEvent[] = [];

    // Very basic simulation of event density
    const count = Math.floor(Math.random() * 4) + 2; // 2 to 5 events

    for (let i = 0; i < count; i++) {
        // Randomly assign topics if ALL
        const topics: FocusTopic[] = ['Science', 'War', 'Art', 'Space', 'Region'];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];
        const eventTopic = focus === 'All' ? randomTopic : focus;

        if (focus !== 'All' && focus !== eventTopic) continue;

        events.push({
            id: `evt-${Math.random().toString(36).substr(2, 9)}`,
            year: targetYear - i,
            title: `${eventTopic} Event around ${targetYear - i}`,
            description: `An important ${eventTopic} event occurred during this period. This placeholder demonstrates filtering by ${eventTopic}.`,
            imageUrl: `https://picsum.photos/seed/${targetYear + i + eventTopic}/400/300`,
            sourceUrl: "https://en.wikipedia.org/wiki/Main_Page",
            category: eventTopic
        });
    }

    // Add some specific "Easter eggs"
    if (focus === 'All' || focus === 'Space' || focus === 'Science') {
        if (targetYear >= 1960 && targetYear <= 1970) {
            events.push({
                id: 'moon-landing',
                year: 1969,
                title: 'Apollo 11 Moon Landing',
                description: 'The United States mission Apollo 11 was the first manned mission to land on the Moon.',
                imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/600px-Aldrin_Apollo_11_original.jpg',
                sourceUrl: 'https://en.wikipedia.org/wiki/Apollo_11',
                category: 'Space'
            });
        }
    }

    // Only return if matches focus (Easter egg logic above handles it roughly, but let's ensure)
    return events.filter(e => focus === 'All' || e.category === focus).sort((a, b) => (typeof a.year === 'number' && typeof b.year === 'number' ? b.year - a.year : 0));
};

export const fetchEvents = async (targetDate: Date, step: TimeStep, value: number, focus: FocusTopic = 'All'): Promise<HistoricalEvent[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Calculate approximate year
    let targetYear = targetDate.getFullYear();

    if (step === '1000 years') targetYear -= value * 1000;
    else if (step === '10 years') targetYear -= value * 10;
    else if (step === '100 years') targetYear -= value * 100;
    else if (step === '1 million years') targetYear -= value * 1000000;
    else if (step === '1 year') targetYear -= value;

    return generateMockEvents(targetYear, step, focus);
};
