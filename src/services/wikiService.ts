import type { HistoricalEvent, TimeStep } from '../types';

import type { FocusTopic } from '../components/FocusSelector';
import type { Language } from '../contexts/LanguageContext';
import { generateUniqueEventContent } from './wikiService_helpers';

const HEBREW_TOPICS: Record<FocusTopic, string> = {
    'All': 'הכל',
    'Science': 'מדע',
    'War': 'מלחמה',
    'Art': 'אמנות',
    'Space': 'חלל',
    'Region': 'אזור',
    'Technology': 'טכנולוגיה',
    'Economy': 'כלכלה',
    'Religion': 'דת',
    'Medicine': 'רפואה',
    'Exploration': 'גילויים'
};

// Real historical events database
interface RealEvent {
    year: number;
    category: FocusTopic;
    title: { en: string; he: string };
    description: { en: string; he: string };
    wikiUrl: { en: string; he: string };
    imageUrl?: string;
}

const REAL_EVENTS: RealEvent[] = [
    // Space Events
    {
        year: 1969,
        category: 'Space',
        title: { en: 'Apollo 11 Moon Landing', he: 'נחיתת אפולו 11 על הירח' },
        description: {
            en: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon, marking one of humanity\'s greatest achievements and fulfilling President Kennedy\'s goal.',
            he: 'ניל ארמסטרונג ובאז אולדרין היו האנשים הראשונים שצעדו על הירח, מה שסימן אחד ההישגים הגדולים של האנושות והגשים את מטרתו של הנשיא קנדי.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Apollo_11', he: 'https://he.wikipedia.org/wiki/אפולו_11' },
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Aldrin_Apollo_11_original.jpg/600px-Aldrin_Apollo_11_original.jpg'
    },
    {
        year: 1957,
        category: 'Space',
        title: { en: 'Sputnik 1 Launch', he: 'שיגור ספוטניק 1' },
        description: {
            en: 'The Soviet Union launched Sputnik 1, the first artificial satellite, initiating the Space Age and intensifying the Space Race between the USSR and USA.',
            he: 'ברית המוע צות שיגרה את ספוטניק 1, הלוויין המלאכותי הראשון, והחלה את עידן החלל והעצימה את המירוץ לחלל בין ברה"מ לארה"ב.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Sputnik_1', he: 'https://he.wikipedia.org/wiki/ספוטניק_1' }
    },
    {
        year: 1961,
        category: 'Space',
        title: { en: 'First Human in Space', he: 'האדם הראשון בחלל' },
        description: {
            en: 'Yuri Gagarin became the first human to journey into outer space aboard Vostok 1, orbiting Earth and opening a new frontier for humanity.',
            he: 'יורי גגרין היה האדם הראשון שנסע לחלל החיצון על סיפון וסטוק 1, הקיף את כדור הארץ ופתח גבול חדש לאנושות.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Yuri_Gagarin', he: 'https://he.wikipedia.org/wiki/יורי_גגרין' }
    },
    {
        year: 1990,
        category: 'Space',
        title: { en: 'Hubble Space Telescope Launch', he: 'שיגור טלסקופ החלל האבל' },
        description: {
            en: 'NASA launched the Hubble Space Telescope, revolutionizing astronomy with unprecedented views of distant galaxies, nebulae, and cosmic phenomena.',
            he: 'נאס"א שיגרה את טלסקופ החלל האבל, שחולל מהפכה באסטרונומיה עם נופים חסרי תקדים של גלקסיות רחוקות, ערפיליות ותופעות קוסמיות.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Hubble_Space_Telescope', he: 'https://he.wikipedia.org/wiki/טלסקופ_החלל_האבל' }
    },

    // War Events
    {
        year: 1945,
        category: 'War',
        title: { en: 'End of World War II', he: 'סיום מלחמת העולם השנייה' },
        description: {
            en: 'World War II concluded with the surrender of Germany and Japan, reshaping global politics and establishing the United Nations to prevent future conflicts.',
            he: 'מלחמת העולם השנייה הסתיימה עם כניעת גרמניה ויפן, עיצבה מחדש את הפוליטיקה העולמית והקימה את האומות המאוחדות למניעת עימותים עתידיים.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/World_War_II', he: 'https://he.wikipedia.org/wiki/מלחמת_העולם_השנייה' },
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/V-J_Day_Times_Square.jpg/600px-V-J_Day_Times_Square.jpg'
    },
    {
        year: 1914,
        category: 'War',
        title: { en: 'Start of World War I', he: 'תחילת מלחמת העולם הראשונה' },
        description: {
            en: 'The assassination of Archduke Franz Ferdinand triggered World War I, a devastating global conflict that would claim millions of lives and redraw national boundaries.',
            he: 'רצח הארכידוכס פרנץ פרדיננד הצית את מלחמת העולם הראשונה, עימות עולמי הרסני שגבה חיים של מיליונים ועיצב מחדש גבולות לאומיים.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/World_War_I', he: 'https://he.wikipedia.org/wiki/מלחמת_העולם_הראשונה' }
    },
    {
        year: 1989,
        category: 'War',
        title: { en: 'Fall of the Berlin Wall', he: 'נפילת חומת ברלין' },
        description: {
            en: 'The Berlin Wall fell, symbolizing the end of the Cold War and the reunification of Germany, marking a pivotal moment in 20th-century history.',
            he: 'חומת ברלין נפלה, מה שסימל את סוף המלחמה הקרה ואיחוד גרמניה, ציון דרך מכריע בהיסטוריה של המאה ה-20.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Berlin_Wall', he: 'https://he.wikipedia.org/wiki/חומת_ברלין' }
    },

    // Science Events
    {
        year: 1953,
        category: 'Science',
        title: { en: 'Discovery of DNA Structure', he: 'גילוי מבנה ה-DNA' },
        description: {
            en: 'James Watson and Francis Crick discovered the double helix structure of DNA, revolutionizing biology and paving the way for modern genetics and medicine.',
            he: 'ג\'יימס ווטסון ופרנסיס קריק גילו את מבנה הסליל הכפול של ה-DNA, חוללו מהפכה בביולוגיה וסללו את הדרך לגנטיקה ורפואה מודרניות.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/DNA', he: 'https://he.wikipedia.org/wiki/DNA' }
    },
    {
        year: 1928,
        category: 'Science',
        title: { en: 'Discovery of Penicillin', he: 'גילוי הפניצילין' },
        description: {
            en: 'Alexander Fleming discovered penicillin, the first widely used antibiotic, saving countless lives and transforming modern medicine forever.',
            he: 'אלכסנדר פלמינג גילה את הפניצילין, האנטיביוטיקה הראשונה בשימוש נרחב, הציל אינספור חיים ושינה את הרפואה המודרנית לעד.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Penicillin', he: 'https://he.wikipedia.org/wiki/פניצילין' }
    },
    {
        year: 1905,
        category: 'Science',
        title: { en: 'Einstein\'s Theory of Relativity', he: 'תורת היחסות של איינשטיין' },
        description: {
            en: 'Albert Einstein published his theory of special relativity, fundamentally changing our understanding of space, time, and energy with the famous equation E=mc².',
            he: 'אלברט איינשטיין פרסם את תורת היחסות הפרטית שלו, שינתה באופן יסודי את הבנתנו של מרחב, זמן ואנרגיה עם המשוואה המפורסמת E=mc².'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Theory_of_relativity', he: 'https://he.wikipedia.org/wiki/תורת_היחסות' }
    },
    {
        year: 1983,
        category: 'Science',
        title: { en: 'Invention of the Internet (TCP/IP)', he: 'המצאת האינטרנט (TCP/IP)' },
        description: {
            en: 'The ARPANET officially adopted TCP/IP protocols, creating the foundation for the modern Internet and revolutionizing global communication.',
            he: 'ARPANET אימצה רשמית את פרוטוקולי TCP/IP, יצרה את הבסיס לאינטרנט המודרני וחוללה מהפכה בתקשורת העולמית.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Internet', he: 'https://he.wikipedia.org/wiki/אינטרנט' }
    },

    // Art Events
    {
        year: 1889,
        category: 'Art',
        title: { en: 'Completion of the Eiffel Tower', he: 'השלמת מגדל אייפל' },
        description: {
            en: 'Gustave Eiffel completed his iconic tower for the Paris World\'s Fair, creating an enduring symbol of France and modern engineering.',
            he: 'גוסטב אייפל השלים את המגדל האיקוני שלו לתערוכה העולמית בפריז, יצר סמל מתמשך לצרפת ולהנדסה מודרנית.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Eiffel_Tower', he: 'https://he.wikipedia.org/wiki/מגדל_אייפל' }
    },
    {
        year: 1503,
        category: 'Art',
        title: { en: 'Mona Lisa Painted', he: 'ציור המונה ליזה' },
        description: {
            en: 'Leonardo da Vinci began painting the Mona Lisa, creating one of the most famous and enigmatic artworks in human history.',
            he: 'לאונרדו דה וינצ\'י החל לצייר את המונה ליזה, יצר את אחד מיצירות האמנות המפורסמות והמסתוריות ביותר בהיסטוריה האנושית.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Mona_Lisa', he: 'https://he.wikipedia.org/wiki/מונה_ליזה' }
    },

    // Ancient/Region Events
    {
        year: -2560,
        category: 'Region',
        title: { en: 'Construction of the Great Pyramid', he: 'בניית הפירמידה הגדולה' },
        description: {
            en: 'The Great Pyramid of Giza was completed under Pharaoh Khufu, standing as the last surviving wonder of the ancient world.',
            he: 'הפירמידה הגדולה בגיזה הושלמה תחת פרעה חופו, ניצבת כפלא האחרון ששרד מהעולם העתיק.'
        },
        wikiUrl: { en: 'https://en.wikipedia.org/wiki/Great_Pyramid_of_Giza', he: 'https://he.wikipedia.org/wiki/הפירמידה_הגדולה_בגיזה' }
    },
    {
        year: -66000000,
        category: 'Science',
        title: { en: 'K-Pg Mass Extinction Event', he: 'הכחדת הדינוזאורים (K-Pg)' },
        description: {
            en: 'A massive asteroid impact caused the extinction of the dinosaurs and many other species, paving the way for the rise of mammals.',
            he: 'פגיעת אסטרואיד ענק גרמה להכחדת הדינוזאורים ומינים רבים אחרים, סללה את הדרך לעליית היונקים.'
        },
        wikiUrl: {
            en: 'https://en.wikipedia.org/wiki/Cretaceous%E2%80%93Paleogene_extinction_event',
            he: 'https://he.wikipedia.org/wiki/הכחדת_קריטיקון-פלאוגן'
        },
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/Chicxulub_impact_De_Esq.jpg/600px-Chicxulub_impact_De_Esq.jpg'
    },
];

// Search for real events near the target year
const findRealEvents = (targetYear: number, focus: FocusTopic[], lang: Language): HistoricalEvent[] => {
    const yearRange = 5; // Look for events within 5 years
    const matchingEvents = REAL_EVENTS.filter(event => {
        const matchesYear = Math.abs(event.year - targetYear) <= yearRange;
        const matchesCategory = focus.length === 0 || focus.includes(event.category);
        return matchesYear && matchesCategory;
    });

    return matchingEvents.map(event => ({
        id: `real-${event.year}-${event.category}`,
        year: event.year,
        title: event.title[lang],
        description: event.description[lang],
        imageUrl: event.imageUrl || `https://picsum.photos/seed/${event.year}-${event.category}/600/400`,
        sourceUrl: event.wikiUrl[lang],
        category: event.category
    }));
};

// Mock data generator for demonstration (fallback)
const generateMockEvents = (targetYear: number, _timeStep: TimeStep, focus: FocusTopic[], lang: Language, minCount: number = 5): HistoricalEvent[] => {
    const events: HistoricalEvent[] = [];

    // First, try to find real events from our database
    const realEvents = findRealEvents(targetYear, focus, lang);
    events.push(...realEvents);

    // If we have enough real events, return them early (but sort them first)
    if (realEvents.length >= minCount) {
        return events.sort((a, b) => (typeof a.year === 'number' && typeof b.year === 'number' ? b.year - a.year : 0));
    }

    // Otherwise, generate some generic events to fill the gaps
    // Ensure we have at least minCount events total, plus a buffer
    const needed = minCount - realEvents.length;
    const count = needed + 2; // Add a small buffer

    for (let i = 0; i < count; i++) {
        // Randomly assign topics if ALL (empty focus array)
        // Ensure we include new topics in the random selection
        const topics: FocusTopic[] = ['Science', 'War', 'Art', 'Space', 'Region', 'Technology', 'Economy', 'Religion', 'Medicine', 'Exploration'];
        const randomTopic = topics[Math.floor(Math.random() * topics.length)];

        // If focus is selected, try to match one of the selected topics
        let eventTopic = randomTopic;
        if (focus.length > 0) {
            // 50% chance to force a relevant topic if filtered, otherwise random
            if (Math.random() > 0.3) {
                eventTopic = focus[Math.floor(Math.random() * focus.length)];
            }
        }

        // Filter out if not in focus (and focus is not empty/All)
        if (focus.length > 0 && !focus.includes(eventTopic)) continue;

        const topicDisplay = lang === 'he' ? HEBREW_TOPICS[eventTopic] : eventTopic;

        // Generate a slightly more specific URL for mock purposes
        const wikiSearchPrefix = lang === 'he' ? 'https://he.wikipedia.org/wiki/' : 'https://en.wikipedia.org/wiki/';
        const specificLink = `${wikiSearchPrefix}${encodeURIComponent(topicDisplay)}`;

        // Generate unique event content
        const uniqueEvent = generateUniqueEventContent(eventTopic, lang, targetYear - i);

        events.push({
            id: `evt-${Math.random().toString(36).substr(2, 9)}`,
            year: targetYear - i,
            title: uniqueEvent.title,
            description: uniqueEvent.description,
            imageUrl: `https://picsum.photos/seed/${targetYear + i + eventTopic}/600/400`,
            sourceUrl: specificLink,
            category: eventTopic
        });
    }

    // Double check filtering and sort by year
    return events.filter(e => focus.length === 0 || focus.includes(e.category as FocusTopic)).sort((a, b) => (typeof a.year === 'number' && typeof b.year === 'number' ? b.year - a.year : 0));
};

export const fetchEvents = async (targetDate: Date, step: TimeStep, value: number, focus: FocusTopic[] = [], lang: Language = 'en', count: number = 5): Promise<HistoricalEvent[]> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Calculate approximate year
    let targetYear = targetDate.getFullYear();

    if (step === '1000 years') targetYear -= value * 1000;
    else if (step === '10 years') targetYear -= value * 10;
    else if (step === '100 years') targetYear -= value * 100;
    else if (step === '1 million years') targetYear -= value * 1000000;
    else if (step === '1 year') targetYear -= value;

    // Generate a pool of events ensuring we have at least 'count' items
    const pool = generateMockEvents(targetYear, step, focus, lang, count);

    // Return only unique events, no duplication
    return pool.slice(0, count);
};
