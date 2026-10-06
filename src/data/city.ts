import { ACTIVE_CITY } from '../../city.config.mjs';
import placeholder from './cities/_placeholder.json';
import atlantaGa from './cities/atlanta-ga.json';

export interface City { slug: string; name: string; county: string; title: string; description: string; intro: string; angle: string; caution: string }
export interface Scenario { title: string; intro: string; items: string[]; outro: string }
export interface LoanTerms {
  fundingMax: string; drawTiming: string; closingSpeed: string; feeDisclosure: string;
  structure1ClosingPoints: string; structure1MonthlyInterest: string; structure1BalloonMonths: string; structure1ExtensionPoints: string;
  structure2ClosingPoints: string; structure2MonthlyInterest: string; structure2BalloonMonths: string; structure2ExtensionPoints: string;
  extensionMonths: string;
  exampleLoanAmount: string; exampleHoldMonths: string; exampleAssumption: string;
}
export interface GuideMeta { path: string; title: string; description: string; h1: string; schemaName: string; schemaDescription: string; heroIntro?: string; location?: string }
export interface LegalMeta { path: string; title: string; description: string; h1: string; intro: string }
export interface Site {
  brand: string; brandHeaderHtml: string; domain: string; formName: string; nicheTitle: string; pageCode: string;
  state: string; region: string; metroName: string; homeCityName: string; legalCityName: string; legalLocation: string;
  ga4MeasurementId: string; airchattyTrackingId: string;
  serviceType: string; serviceDescription: string; footerTagline: string;
  guideLinks: { path: string; label: string }[];
  priorityCities: string[]; exampleCitySlug: string;
  sheetUrl: string; fallbackTerms: LoanTerms;
  ui: { exploreTitle: string; exploreIntro: string; workedExampleHeading: string; fundingWorksLinkLabel: string; lenderFootprint: string; faqLenderAnswer: string };
}
export interface Home { title: string; description: string; cityName: string; location: string; intro: string; angle: string; caution: string; faqs: { q: string; a: string }[] }
export interface CityData {
  site: Site; home: Home; cities: City[];
  nearbyAreas: Record<string, string[]>; scenarios: Record<string, Scenario>;
  pages: { fundingWorks: GuideMeta; vsHardMoney: GuideMeta; costs: GuideMeta; privacy: LegalMeta; terms: LegalMeta };
}

const files: Record<string, CityData> = {
  '_placeholder': placeholder as CityData,
  'atlanta-ga': atlantaGa as CityData,
};
const active = files[ACTIVE_CITY];
if (!active) throw new Error(`Unknown ACTIVE_CITY "${ACTIVE_CITY}" in city.config.mjs`);
export const city: CityData = active;

// Named exports matching the original data module, so components change one import line.
export const site = city.site;
export const home = city.home;
export const cities = city.cities;
export const nearbyAreas = city.nearbyAreas;
export const priorityCities = city.site.priorityCities;
export const scenarios = city.scenarios;
export const brand = site.brand;
export const domain = site.domain;
export const formName = site.formName;
