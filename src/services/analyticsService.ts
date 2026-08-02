import { doc, getDoc, setDoc, increment } from 'firebase/firestore';
import { getAnalytics, isSupported, logEvent } from 'firebase/analytics';
import app, { db } from './firebaseApp';
import { AnalyticsStats } from '../types/analytics';

let analyticsInstance: any = null;
if (typeof window !== 'undefined') {
  isSupported().then((supported) => {
    if (supported) {
      analyticsInstance = getAnalytics(app);
    }
  });
}

export async function trackPageView(lang: string = 'en'): Promise<void> {
  if (analyticsInstance) {
    try {
      logEvent(analyticsInstance, 'page_view', { page_language: lang });
    } catch (e) {
      // ignore
    }
  }

  if (typeof window === 'undefined') return;

  if (sessionStorage.getItem('fidar_session_tracked') === 'true') {
    return;
  }
  sessionStorage.setItem('fidar_session_tracked', 'true');

  try {
    const todayStr = new Date().toISOString().split('T')[0];
    const monthStr = todayStr.substring(0, 7);

    const statsRef = doc(db, 'analytics', 'stats');
    const snap = await getDoc(statsRef);

    if (!snap.exists()) {
      await setDoc(statsRef, {
        totalVisits: 1,
        todayVisits: 1,
        monthVisits: 1,
        lastVisitedDate: todayStr,
        lastVisitedMonth: monthStr,
        visitsByLang: {
          en: lang === 'en' ? 1 : 0,
          de: lang === 'de' ? 1 : 0,
        },
      });
      return;
    }

    const data = snap.data();
    const isNewDay = data.lastVisitedDate !== todayStr;
    const isNewMonth = data.lastVisitedMonth !== monthStr;

    await setDoc(statsRef, {
      totalVisits: increment(1),
      todayVisits: isNewDay ? 1 : increment(1),
      monthVisits: isNewMonth ? 1 : increment(1),
      lastVisitedDate: todayStr,
      lastVisitedMonth: monthStr,
      [`visitsByLang.${lang}`]: increment(1),
    }, { merge: true });
  } catch (err) {
    console.error('Error tracking page view:', err);
  }
}

export async function fetchAnalyticsStatsFromFirestore(): Promise<AnalyticsStats> {
  try {
    const statsRef = doc(db, 'analytics', 'stats');
    const snap = await getDoc(statsRef);
    if (snap.exists()) {
      const data = snap.data();
      return {
        totalVisits: data.totalVisits || 0,
        todayVisits: data.todayVisits || 0,
        monthVisits: data.monthVisits || 0,
        lastVisitedDate: data.lastVisitedDate || '',
        lastVisitedMonth: data.lastVisitedMonth || '',
        visitsByLang: {
          en: data.visitsByLang?.en || 0,
          de: data.visitsByLang?.de || 0,
        },
      };
    }
  } catch (err) {
    console.error('Error fetching analytics stats:', err);
  }
  return {
    totalVisits: 0,
    todayVisits: 0,
    monthVisits: 0,
    lastVisitedDate: '',
    lastVisitedMonth: '',
    visitsByLang: { en: 0, de: 0 },
  };
}
