import type { FocusTopic } from '../components/FocusSelector';

// Helper to generate unique event content
export const generateUniqueEventContent = (topic: FocusTopic, language: 'en' | 'he'): { title: string; description: string } => {
    const templates: Record<FocusTopic, { titleEn: string[]; titleHe: string[]; descEn: string[]; descHe: string[] }> = {
        'Science': {
            titleEn: [
                `Scientific Breakthrough`,
                `Revolutionary Discovery`,
                `Major Scientific Advancement`,
                `Groundbreaking Research Published`,
                `Scientific Innovation Unveiled`
            ],
            titleHe: [
                `פריצת דרך מדעית`,
                `גילוי מהפכני`,
                `התקדמות מדעית מרכזית`,
                `מחקר פורץ דרך פורסם`,
                `חידוש מדעי נחשף`
            ],
            descEn: [
                `Researchers made significant progress in understanding fundamental principles, advancing human knowledge.`,
                `A team of scientists unveiled findings that would influence future research and development.`,
                `New methodologies and techniques were developed, opening doors to further exploration.`,
                `Critical observations challenged existing theories and sparked scientific debate.`
            ],
            descHe: [
                `חוקרים עשו התקדמות משמעותית בהבנת עקרונות יסוד, וקידמו את הידע האנושי.`,
                `צוות מדענים חשף ממצאים שישפיעו על מחקר ופיתוח עתידיים.`,
                `מתודולוגיות וטכניקות חדשות פותחו, ופתחו דלתות לחקר נוסף.`,
                `תצפיות קריטיות אתגרו תיאוריות קיימות והציתו ויכוח מדעי.`
            ]
        },
        'War': {
            titleEn: [
                `Military Campaign`,
                `Strategic Battle`,
                `Conflict Resolution`,
                `Treaty Signing`,
                `Military Alliance Formed`
            ],
            titleHe: [
                `מערכה צבאית`,
                `קרב אסטרטגי`,
                `פתרון סכסוך`,
                `חתימת אמנה`,
                `ברית צבאית נוצרה`
            ],
            descEn: [
                `Strategic decisions were made that would affect regional stability and international relations.`,
                `Military forces engaged in operations that reshaped territorial boundaries.`,
                `Diplomatic efforts led to negotiations and agreements between opposing sides.`,
                `Alliances were forged that would define geopolitical dynamics for years to come.`
            ],
            descHe: [
                `החלטות אסטרטגיות התקבלו שישפיעו על היציבות האזורית והיחסים הבינלאומיים.`,
                `כוחות צבאיים עסקו בפעולות שעיצבו מחדש גבולות טריטוריאליים.`,
                `מאמצים דיפלומטיים הובילו למשא ומתן והסכמים בין צדדים מנוגדים.`,
                `בריתות נוצרו שיגדירו את הדינמיקה הגיאופוליטית לשנים רבות.`
            ]
        },
        'Art': {
            titleEn: [
                `Artistic Movement Emerges`,
                `Master Artwork Completed`,
                `Cultural Renaissance`,
                `Architectural Marvel Built`,
                `Literary Masterpiece Published`
            ],
            titleHe: [
                `תנועה אמנותית מתגלה`,
                `יצירת מופת הושלמה`,
                `רנסנס תרבותי`,
                `פלא אדריכלי נבנה`,
                `יצירת מופת ספרותית פורסמה`
            ],
            descEn: [
                `Artists pioneered new styles and techniques that would influence generations of creators.`,
                `Cultural expression reached new heights, reflecting the spirit of the era.`,
                `Monuments and structures were erected that became symbols of human creativity.`,
                `Creative works captured the essence of society and sparked cultural dialogue.`
            ],
            descHe: [
                `אמנים חלצו סגנונות וטכניקות חדשות שישפיעו על דורות של יוצרים.`,
                `ביטוי תרבותי הגיע לגבהים חדשים, ושיקף את רוח התקופה.`,
                `אנדרטאות ומבנים הוקמו שהפכו לסמלים של יצירתיות אנושית.`,
                `יצירות יצירתיות תפסו את מהות החברה והצילו דיאלוג תרבותי.`
            ]
        },
        'Space': {
            titleEn: [
                `Space Mission Launched`,
                `Astronomical Discovery`,
                `Satellite Deployment`,
                `Planetary Observation`,
                `Cosmic Phenomenon Recorded`
            ],
            titleHe: [
                `משימת חלל שוגרה`,
                `גילוי אסטרונומי`,
                `פריסת לוויין`,
                `תצפית פלנטרית`,
                `תופעה קוסמית תועדה`
            ],
            descEn: [
                `Space agencies conducted missions to explore the cosmos and expand our understanding of the universe.`,
                `Telescopes and instruments captured unprecedented views of distant celestial bodies.`,
                `New technologies enabled deeper exploration of our solar system and beyond.`,
                `Observations revealed mysteries of the cosmos and answered long-standing questions.`
            ],
            descHe: [
                `סוכנויות חלל ביצעו משימות לחקור את הקוסמוס ולהרחיב את הבנתנו ביקום.`,
                `טלסקופים ומכשירים תפסו נופים חסרי תקדים של גופים שמימיים רחוקים.`,
                `טכנולוגיות חדשות אפשרו חקר עמוק יותר של מערכת השמש שלנו ומעבר לה.`,
                `תצפיות חשפו מסתורי הקוסמוס וענו על שאלות ארוכות שנים.`
            ]
        },
        'Region': {
            titleEn: [
                `Civilization Flourishes`,
                `Empire Expands`,
                `Cultural Exchange`,
                `Trade Route Established`,
                `Regional Power Rises`
            ],
            titleHe: [
                `ציוויליזציה משגשגת`,
                `אימפריה מתרחבת`,
                `חילופי תרבות`,
                `נתיב סחר הוקם`,
                `כוח אזורי עולה`
            ],
            descEn: [
                `Societies developed complex systems of governance and culture that shaped regional identity.`,
                `Trade and cultural exchange brought prosperity and connected distant lands.`,
                `Empires rose and fell, leaving lasting impacts on the territories they influenced.`,
                `Regional powers asserted influence that would affect the balance of civilizations.`
            ],
            descHe: [
                `חברות פיתחו מערכות מורכבות של ממשל ותרבות שעיצבו זהות אזורית.`,
                `סחר וחילופי תרבות הביאו שגשוג וחיברו ארצות רחוקות.`,
                `אימפריות עלו ונפלו, והשאירו השפעות מתמשכות על הטריטוריות שהשפיעו עליהן.`,
                `כוחות אזוריים הצהירו השפעה שתשפיע על איזון הציוויליזציות.`
            ]
        },
        'Technology': {
            titleEn: [`Technological Innovation`, `New Invention Unveiled`, `Industrial Advancement`, `Engineering Breakthrough`, `Tech Revolution Begins`],
            titleHe: [`חדשנות טכנולוגית`, `המצאה חדשה נחשפה`, `התקדמות תעשייתית`, `פריצת דרך הנדסית`, `מהפכה טכנולוגית מתחילה`],
            descEn: [
                `Inventors and engineers developed new technologies that transformed daily life and industry.`,
                `Breakthroughs in manufacturing and production methods revolutionized economic systems.`,
                `New machines and tools increased efficiency and opened new possibilities for development.`,
                `Technical innovations spread rapidly, changing how people lived and worked.`
            ],
            descHe: [
                `ממציאים ומהנדסים פיתחו טכנולוגיות חדשות ששינו את החיים היומיומיים והתעשייה.`,
                `פריצות דרך בשיטות ייצור וייצור חוללו מהפכה במערכות כלכליות.`,
                `מכונות וכלים חדשים הגבירו את היעילות ופתחו אפשרויות חדשות לפיתוח.`,
                `חידושים טכניים התפשטו במהירות, ושינו את האופן שבו אנשים חיו ועבדו.`
            ]
        },
        'Economy': {
            titleEn: [`Economic Reform`, `Trade Agreement Signed`, `Financial Crisis`, `Market Transformation`, `Currency Innovation`],
            titleHe: [`רפורמה כלכלית`, `הסכם סחר נחתם`, `משבר פיננסי`, `טרנספורמציה בשוק`, `חידוש מטבעי`],
            descEn: [
                `Economic policies and reforms reshaped financial systems and trade relationships.`,
                `Markets evolved as new trading practices and economic theories emerged.`,
                `Financial institutions developed new methods for managing wealth and resources.`,
                `Economic shifts affected social structures and international relations.`
            ],
            descHe: [
                `מדיניות כלכלית ורפורמות עיצבו מחדש מערכות פיננסיות ויחסי סחר.`,
                `שווקים התפתחו כאשר נוהגי מסחר ותיאוריות כלכליות חדשות הופיעו.`,
                `מוסדות פיננסיים פיתחו שיטות חדשות לניהול עושר ומשאבים.`,
                `שינויים כלכליים השפיעו על מבנים חברתיים ויחסים בינלאומיים.`
            ]
        },
        'Religion': {
            titleEn: [`Religious Movement Emerges`, `Sacred Text Written`, `Theological Debate`, `Spiritual Reformation`, `Place of Worship Built`],
            titleHe: [`תנועה דתית מתגלה`, `טקסט קדוש נכתב`, `ויכוח תיאולוגי`, `רפורמציה רוחנית`, `מקום פולחן נבנה`],
            descEn: [
                `Religious leaders and thinkers shaped spiritual practices and belief systems.`,
                `Sacred writings and texts were composed that would guide generations of believers.`,
                `Theological discussions led to new interpretations and religious movements.`,
                `Places of worship became centers of community and spiritual life.`
            ],
            descHe: [
                `מנהיגים דתיים והוגים עיצבו נוהגים רוחניים ומערכות אמונה.`,
                `כתבים וטקסטים קדושים נוצרו שינחו דורות של מאמינים.`,
                `דיונים תיאולוגיים הובילו לפרשנויות חדשות ותנועות דתיות.`,
                ` מקומות פולחן הפכו למרכזים של קהילה וחיים רוחניים.`
            ]
        },
        'Medicine': {
            titleEn: [`Medical Discovery`, `Treatment Method Developed`, `Epidemic Confronted`, `Surgical Technique Invented`, `Health Care Advancement`],
            titleHe: [`גילוי רפואי`, `שיטת טיפול פותחה`, `מגפה הותקפה`, `טכניקה כירורגית המצאה`, `התקדמות בבריאות`],
            descEn: [
                `Medical practitioners made breakthroughs that saved lives and alleviated suffering.`,
                `New treatments and procedures improved patient outcomes and quality of life.`,
                `Public health initiatives addressed diseases and promoted wellness.`,
                `Medical knowledge expanded through observation, research, and experimentation.`
            ],
            descHe: [
                `רופאים עשו פריצות דרך שהצילו חיים והקלו על סבל.`,
                `טיפולים ונהלים חדשים שיפרו את תוצאות החולים ואת איכות החיים.`,
                `יוזמות בריאות ציבור טיפלו במחלות וקידמו בריאות.`,
                `הידע הרפואי התרחב דרך תצפית, מחקר וניסוי.`
            ]
        },
        'Exploration': {
            titleEn: [`New Territory Discovered`, `Expedition Launched`, `Geographic Mapping`, `Navigation Innovation`, `Unknown Lands Explored`],
            titleHe: [`טריטוריה חדשה התגלתה`, `משלחת שוגרה`, `מיפוי גיאוגרפי`, `חידוש ניווט`, `ארצות לא-ידועות נחקרו`],
            descEn: [
                `Explorers ventured into unknown territories, expanding geographical knowledge.`,
                `Expeditions mapped new lands and established contact with distant cultures.`,
                `Navigation techniques improved, enabling longer and safer voyages.`,
                `Discoveries opened trade routes and connected previously isolated regions.`
            ],
            descHe: [
                `חוקרים העזו לטריטוריות לא ידועות, הרחיבו את הידע הגיאוגרפי.`,
                `משלחות מיפו ארצות חדשות והקימו קשר עם תרבויות רחוקות.`,
                `טכניקות ניווט השתפרו, ואיפשרו מסעות ארוכים ובטוחים יותר.`,
                `גילויים פתחו נתיבי סחר וחיברו אזורים מבודדים בעבר.`
            ]
        },
        'All': { titleEn: ['Historical Event'], titleHe: ['אירוע היסטורי'], descEn: ['A significant moment in history'], descHe: ['רגע משמעותי בהיסטוריה'] }
    };

    const template = templates[topic];
    const titleIndex = Math.floor(Math.random() * template.titleEn.length);
    const descIndex = Math.floor(Math.random() * template.descEn.length);

    return {
        title: language === 'he' ? template.titleHe[titleIndex] : template.titleEn[titleIndex],
        description: language === 'he' ? template.descHe[descIndex] : template.descEn[descIndex]
    };
};
