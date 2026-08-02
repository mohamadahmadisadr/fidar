import React from 'react';
import { X, ShieldCheck, Scale } from 'lucide-react';
import { TranslationStructure, SiteConfig } from '../../types';

interface LegalModalProps {
  type: 'impressum' | 'privacy' | null;
  onClose: () => void;
  t: TranslationStructure;
  siteConfig?: SiteConfig;
}

export const LegalModal: React.FC<LegalModalProps> = ({ type, onClose, t, siteConfig }) => {
  if (!type) return null;

  const address = siteConfig?.topBar?.addressDe || 'Nordbahnanlage 4 ,Top 16, 1210 Wien, Österreich';
  const phone = siteConfig?.topBar?.phone || '+43-6642466336';
  const email = siteConfig?.topBar?.email || 'info@fidarbs.at';
  const emailSecondary = siteConfig?.topBar?.emailSecondary || 'fidar.bs@gmail.com';
  const contactPerson = siteConfig?.topBar?.contactPerson || 'Reza Jafari';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
      <div className="bg-white border border-[#E5E7EB] rounded-3xl max-w-3xl w-full p-6 sm:p-8 space-y-6 shadow-2xl relative max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-slate-900 hover:bg-slate-200"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'impressum' ? (
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E5E7EB]">
              <Scale className="w-6 h-6 text-[#002B66]" />
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A]">Impressum</h3>
                <p className="text-xs text-slate-500">Offenlegung gemäß § 25 Mediengesetz & § 5 ECG (Österreich)</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#1A1A1A] text-base">Medieninhaber & Dienstanbieter</h4>
              <p className="font-bold text-[#002B66]">Fidar BestSupplier GmbH</p>
              <p className="whitespace-pre-line">{address}</p>
            </div>

            <div className="space-y-1 text-xs">
              <p><span className="font-bold text-[#1A1A1A]">Unternehmensgegenstand:</span> Import & Export von Rohstoffen, Fertigprodukten, Teilen & Ausrüstung (Öl, Gas, Petrochemie, Medizin, Haushaltsgeräte & Elektronik)</p>
              <p><span className="font-bold text-[#1A1A1A]">Gründungsjahr:</span> 2019 in Wien, Österreich</p>
              <p><span className="font-bold text-[#1A1A1A]">Ansprechpartner:</span> {contactPerson}</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB]">
              <h4 className="font-bold text-[#1A1A1A]">Kontakt</h4>
              <p>Telefon: {phone}</p>
              <p>E-Mail: {email} / {emailSecondary}</p>
              <p>Website: https://fidarbs.at</p>
            </div>

            <div className="space-y-2 pt-2 border-t border-[#E5E7EB] text-slate-500 text-xs">
              <h4 className="font-bold text-[#1A1A1A] text-xs">Haftungsausschluss (Disclaimer)</h4>
              <p>
                Die Inhalte dieser Webseite wurden mit größtmöglicher Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte kann jedoch keine Gewähr übernommen werden.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4 text-slate-700 text-xs sm:text-sm leading-relaxed">
            <div className="flex items-center gap-3 pb-3 border-b border-[#E5E7EB]">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
              <div>
                <h3 className="text-xl font-black text-[#1A1A1A]">Datenschutzerklärung (DSGVO)</h3>
                <p className="text-xs text-slate-500">Informationen zur Datenverarbeitung gemäß EU-DSGVO</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#1A1A1A]">1. Verantwortlicher</h4>
              <p>Fidar BestSupplier GmbH, {address} ({email}).</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#1A1A1A]">2. Erhebung und Speicherung personenbezogener Daten</h4>
              <p>
                Wenn Sie unsere Webseite besuchen oder Kontaktformulare zur Anfragen nutzen, verarbeiten wir Ihre eingegebenen Daten (Name, E-Mail, Telefon, Nachrichteninhalt) ausschließlich zur Bearbeitung Ihrer Anfrage auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#1A1A1A]">3. Weitergabe von Daten</h4>
              <p>
                Eine Übermittlung Ihrer persönlichen Daten an Dritte zu anderen als den im Folgenden aufgeführten Zwecken findet nicht statt.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-[#1A1A1A]">4. Ihre Rechte</h4>
              <p>
                Sie haben jederzeit das Recht auf Auskunft, Berichtigung, Löschung oder Einschränkung der Verarbeitung Ihrer gespeicherten Daten sowie das Recht auf Datenübertragbarkeit.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-4 border-t border-[#E5E7EB]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-[#002B66] text-white font-bold text-xs hover:bg-[#001D47]"
          >
            Schließen
          </button>
        </div>
      </div>
    </div>
  );
};
