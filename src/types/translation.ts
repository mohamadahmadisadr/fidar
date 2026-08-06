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
    subtitle: string;
    menuLabel: string;
  };
  quoteModal: {
    successTitle: string;
    successMessage: string;
    close: string;
    name: string;
    namePlaceholder: string;
    email: string;
    emailPlaceholder: string;
    phone: string;
    company: string;
    companyPlaceholder: string;
    service: string;
    message: string;
    messagePlaceholder: string;
    directInquiry: string;
    submit: string;
    submitting: string;
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
    imageAlt: string;
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
    ui: {
      title: string;
      activeSubtitle: string;
      chooseCategorySubtitle: string;
      loading: string;
      noCategories: string;
      productSingular: string;
      productPlural: string;
      backToCategoriesAria: string;
      categories: string;
      switchCategory: string;
      noProducts: string;
      allCategories: string;
      details: string;
      inquire: string;
      notFoundPrompt: string;
      browseOther: string;
      specifications: string;
      close: string;
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
    headingPrefix: string;
    imageAlt: string;
  };
  contact: {
    tag: string;
    title: string;
    subtitle: string;
    form: {
      name: string;
      namePlaceholder: string;
      email: string;
      emailPlaceholder: string;
      phone: string;
      service: string;
      message: string;
      messagePlaceholder: string;
      inquiryTitle: string;
      successTitle: string;
      retry: string;
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
      mapTitle: string;
    };
  };
  legal: {
    impressum: {
      title: string;
      subtitle: string;
      ownerTitle: string;
      businessSubjectLabel: string;
      businessSubject: string;
      foundingYearLabel: string;
      foundingYear: string;
      contactPersonLabel: string;
      contactTitle: string;
      phoneLabel: string;
      emailLabel: string;
      websiteLabel: string;
      disclaimerTitle: string;
      disclaimerText: string;
    };
    privacy: {
      title: string;
      subtitle: string;
      sections: Array<{ title: string; body: string }>;
    };
    close: string;
  };
  footer: {
    description: string;
    quickLinks: string;
    servicesTitle: string;
    legalTitle: string;
    rights: string;
    copyright: string;
    companyTitle: string;
    backToTop: string;
  };
}
