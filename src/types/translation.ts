export type Language = 'de' | 'en';

export interface TranslationStructure {
  topBar: {
    phone: string;
    email: string;
    emailSecondary: string;
    address: string;
    hours: string;
    getQuote: string;
    contactPerson: string;
  };
  nav: {
    home: string;
    services: string;
    about: string;
    contact: string;
    impressum: string;
    privacy: string;
  };
  hero: {
    badge: string;
    title: string;
    highlight: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stats: {
      experience: string;
      experienceLabel: string;
      projects: string;
      projectsLabel: string;
      countries: string;
      countriesLabel: string;
      satisfaction: string;
      satisfactionLabel: string;
    };
  };
  services: {
    tag: string;
    title: string;
    subtitle: string;
    categories: {
      all: string;
      trade: string;
      construction: string;
      consulting: string;
      technology: string;
      logistics: string;
    };
    items: Array<{
      id: string;
      category: 'trade' | 'construction' | 'consulting' | 'technology' | 'logistics';
      title: string;
      summary: string;
      features: string[];
      details: string;
      icon: string;
    }>;
  };
  about: {
    tag: string;
    title: string;
    subtitle: string;
    description1: string;
    description2: string;
    tabs: {
      overview: string;
      capabilities: string;
      orderPolicy: string;
      exportScope: string;
    };
    overviewContent: string;
    capabilitiesContent: string;
    orderPolicyContent: string;
    exportScopeContent: string;
  };
  contact: {
    tag: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      email: string;
      phone: string;
      service: string;
      message: string;
      fileLabel: string;
      submit: string;
      submitting: string;
      success: string;
    };
    info: {
      addressTitle: string;
      addressValue: string;
      phoneTitle: string;
      phoneValue: string;
      contactPersonTitle: string;
      contactPersonValue: string;
      emailTitle: string;
      emailValue: string;
      hoursTitle: string;
      hoursValue: string;
    };
  };
  footer: {
    description: string;
    quickLinks: string;
    servicesTitle: string;
    legalTitle: string;
    rights: string;
    copyright: string;
  };
}
