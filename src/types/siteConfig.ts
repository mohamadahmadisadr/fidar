export interface SiteConfig {
  topBar: {
    phone: string;
    email: string;
    emailSecondary: string;
    addressEn: string;
    addressDe: string;
    hoursEn: string;
    hoursDe: string;
    contactPerson: string;
  };
  hero: {
    badgeEn: string;
    badgeDe: string;
    titleEn: string;
    titleDe: string;
    highlightEn: string;
    highlightDe: string;
    subtitleEn: string;
    subtitleDe: string;
  };
  about: {
    tagEn: string;
    tagDe: string;
    titleEn: string;
    titleDe: string;
    subtitleEn: string;
    subtitleDe: string;
    desc1En: string;
    desc1De: string;
    desc2En: string;
    desc2De: string;
    tabs: {
      overviewEn: string;
      overviewDe: string;
      capabilitiesEn: string;
      capabilitiesDe: string;
      orderPolicyEn: string;
      orderPolicyDe: string;
      exportScopeEn: string;
      exportScopeDe: string;
    };
  };
  social: {
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  mapUrl: string;
  adminPinHash?: string;
  adminEmails?: string[];
}
