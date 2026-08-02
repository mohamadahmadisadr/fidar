export interface AnalyticsStats {
  totalVisits: number;
  todayVisits: number;
  monthVisits: number;
  lastVisitedDate: string;
  lastVisitedMonth: string;
  visitsByLang: {
    en: number;
    de: number;
  };
}
