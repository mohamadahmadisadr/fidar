import { doc, getDocs, setDoc, query, collection, limit } from 'firebase/firestore';
import { db } from './firebaseApp';
import { SiteConfig } from '../types/siteConfig';

export const DEFAULT_ADMIN_EMAILS = [
  'devfa75@gmail.com',
  'fidar.bs@gmail.com',
  'info@fidarbs.at',
];

export const defaultSiteConfig: SiteConfig = {
  adminEmails: DEFAULT_ADMIN_EMAILS,
  adminPinHash: '',
  topBar: {
    phone: '+43-6642466336',
    email: 'info@fidarbs.at',
    emailSecondary: 'fidar.bs@gmail.com',
    addressEn: 'Nordbahnanlage 4 ,Top 16, 1210 Vienna, Austria',
    addressDe: 'Nordbahnanlage 4 ,Top 16, 1210 Wien, Österreich',
    hoursEn: 'Mon-Fri: 09:00 - 18:00 (Online 24/7)',
    hoursDe: 'Mo-Fr: 09:00 - 18:00 Uhr (Online 24/7)',
    contactPerson: 'Reza Jafari',
  },
  hero: {
    badgeEn: 'Vienna, Austria • Established 2019',
    badgeDe: 'Wien, Österreich • Gegründet 2019',
    titleEn: 'About Our',
    titleDe: 'Über unser',
    highlightEn: 'Industrial Company',
    highlightDe: 'Industrie unternehmen',
    subtitleEn: 'Fidar BestSupplier GmbH was established in Vienna in 2019 in order to import and export different products in various fields. This company is capable of providing different raw materials,finished products, parts and equipment which is needed for oil, gas and petrochemical industries, home appliances and electronics. Therefore, contact us in case of any requirements.',
    subtitleDe: 'Die Fidar BestSupplier GmbH wurde 2019 in Wien gegründet, um verschiedene Produkte in verschiedenen Bereichen zu importieren und zu exportieren. Dieses Unternehmen ist in der Lage, verschiedene Rohstoffe, Fertigprodukte, Teile und Ausrüstung bereitzustellen, die für die Öl, Gas und petrochemisch Industrie, Haushaltsgeräte und Elektronik benötigt werden. Kontaktieren Sie uns daher bei abfrage.',
  },
  about: {
    tagEn: 'ABOUT US',
    tagDe: 'ÜBER UNS',
    titleEn: 'Fidar BestSupplier GmbH',
    titleDe: 'Fidar BestSupplier GmbH',
    subtitleEn: 'Fidar BestSupplier GmbH was established in Vienna in 2019 in order to import and export large range of products in various fields.',
    subtitleDe: 'Die Fidar BestSupplier GmbH wurde 2019 in Wien gegründet, um verschiedene Produkte in verschiedenen Bereichen zu importieren und zu exportieren.',
    desc1En: 'This company is capable of providing different raw materials, finished products, parts and equipment which is needed for oil, gas , petrochemical, Medical, home appliances and electronics industries.',
    desc1De: 'Dieses Unternehmen ist in der Lage, verschiedene Rohstoffe, Fertigprodukte, Teile und Ausrüstung bereitzustellen, die für die Öl-, Gas-, Petrochemie-, Medizin-, Haushaltsgeräte- und Elektronikindustrie benötigt werden.',
    desc2En: 'We do not have any minimum order charges and can cater for small precision engineers and larger importers. We export worldwide. Therefore, contact us in case of any requirements.',
    desc2De: 'Wir haben keine Mindestbestellgebühren und können kleine Präzisionstechniker und größere Importeure bedienen. Wir exportieren weltweit. Kontaktieren Sie uns daher bei Abfrage.',
    tabs: {
      overviewEn: 'Fidar BestSupplier GmbH was established in Vienna in 2019 in order to import and export large range of products in various fields.',
      overviewDe: 'Die Fidar BestSupplier GmbH wurde 2019 in Wien gegründet, um verschiedene Produkte in verschiedenen Bereichen zu importieren und zu exportieren.',
      capabilitiesEn: 'Capable of providing different raw materials, finished products, parts and equipment which is needed for oil, gas, petrochemical, Medical, home appliances and electronics industries.',
      capabilitiesDe: 'Bereitstellung verschiedener Rohstoffe, Fertigprodukte, Teile und Ausrüstung für die Öl, Gas und petrochemisch Industrie, Medizintechnik, Haushaltsgeräte und Elektronik.',
      orderPolicyEn: 'We do not have any minimum order charges and can cater for small precision engineers and larger importers.',
      orderPolicyDe: 'Wir haben keine Mindestbestellgebühren und können kleine Präzisionstechniker und größere Importeure bedienen.',
      exportScopeEn: 'We export worldwide. Therefore, contact us in case of any requirements.',
      exportScopeDe: 'Wir exportieren weltweit. Kontaktieren Sie uns daher bei Abfrage.',
    },
  },
  social: {
    facebook: 'https://www.facebook.com/Codevz/',
    linkedin: 'https://www.linkedin.com/',
    twitter: 'https://twitter.com/codevz2',
  },
  mapUrl: 'https://maps.google.com/maps?q=Nordbahnanlage%204%2C%201210%20Wien%2C%20Austria&t=&z=15&ie=UTF8&iwloc=&output=embed',
};

export async function fetchSiteConfigFromFirestore(): Promise<SiteConfig> {
  try {
    const docRef = doc(db, 'site_config', 'general');
    const snap = await getDocs(query(collection(db, 'site_config'), limit(5)));
    let foundConfig: SiteConfig | null = null;

    snap.forEach((d) => {
      if (d.id === 'general') {
        foundConfig = d.data() as SiteConfig;
      }
    });

    if (foundConfig) {
      return {
        ...defaultSiteConfig,
        ...foundConfig,
        adminEmails: (foundConfig as SiteConfig).adminEmails && (foundConfig as SiteConfig).adminEmails!.length > 0 
          ? (foundConfig as SiteConfig).adminEmails 
          : defaultSiteConfig.adminEmails,
        adminPinHash: (foundConfig as SiteConfig).adminPinHash || '',
        topBar: { ...defaultSiteConfig.topBar, ...(foundConfig as SiteConfig).topBar },
        hero: { ...defaultSiteConfig.hero, ...(foundConfig as SiteConfig).hero },
        about: { ...defaultSiteConfig.about, ...(foundConfig as SiteConfig).about },
        social: { ...defaultSiteConfig.social, ...(foundConfig as SiteConfig).social },
      };
    }

    // Seed default if missing
    await setDoc(docRef, defaultSiteConfig);
    return defaultSiteConfig;
  } catch (err) {
    console.error('Error fetching site_config from Firestore:', err);
    return defaultSiteConfig;
  }
}

export async function updateSiteConfigInFirestore(config: SiteConfig): Promise<void> {
  const docRef = doc(db, 'site_config', 'general');
  await setDoc(docRef, config);
}
