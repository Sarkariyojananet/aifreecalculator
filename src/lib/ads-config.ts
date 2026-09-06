/**
 * Centralized AdSense & Advertisement Configuration
 * Managed via the Admin Panel (/admin/settings/) and persisted in Cloudflare D1/site_settings.
 */

export type AdSlotKey = 'top' | 'inline' | 'sidebar' | 'footer';

export type AdNetworkType = 'adsense' | 'adx' | 'direct_sponsor' | 'affiliate';

export interface AdSlotConfig {
  slotId: string;
  enabled: boolean;
  format: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  responsive: boolean;
  minHeight: string;
  label: string;
  description: string;
  adNetwork?: AdNetworkType;
  customCode?: string;
  // Direct Sponsor & Affiliate Configuration
  sponsorBannerUrl?: string;
  sponsorTargetUrl?: string;
  sponsorAltText?: string;
  sponsorBadgeText?: string;
  sponsorOpenInNewTab?: boolean;
  sponsorRel?: string;
}

export interface SmartThrottlingConfig {
  enabled: boolean;
  disableOnSlowConnection: boolean;
  lazyLoadWithMargin: boolean;
  lazyLoadMarginPx: number;
  delayUntilInteraction: boolean;
  maxMobileAds: number; // 0 = unlimited, 1 = max 1 ad, 2 = max 2 ads
  preventClsPlaceholders: boolean;
}

export const DEFAULT_SMART_THROTTLING: SmartThrottlingConfig = {
  enabled: true,
  disableOnSlowConnection: true,
  lazyLoadWithMargin: true,
  lazyLoadMarginPx: 300,
  delayUntilInteraction: false,
  maxMobileAds: 2,
  preventClsPlaceholders: true,
};

export interface AdsConfig {
  enabled: boolean;
  clientId: string;
  testMode: boolean;
  autoAds: boolean;
  isConfigured: boolean;
  gaMeasurementId?: string;
  includeGoogleAdsTxt?: boolean;
  thirdPartyAdsTxt?: string;
  customAdsTxt?: string;
  headerScript?: string;
  smartThrottling?: SmartThrottlingConfig;
  slots: Record<AdSlotKey, AdSlotConfig>;
}

const rawClientId = import.meta.env.PUBLIC_ADSENSE_CLIENT_ID || '';
const rawGaId = import.meta.env.PUBLIC_GA_ID || '';
const isConfigured = Boolean(
  rawClientId &&
  rawClientId.startsWith('ca-pub-') &&
  !rawClientId.includes('XXXX') &&
  rawClientId.trim().length > 10
);

export const DEFAULT_ADS_CONFIG: AdsConfig = {
  enabled: isConfigured,
  clientId: rawClientId,
  testMode: false,
  autoAds: false,
  isConfigured,
  gaMeasurementId: rawGaId,
  includeGoogleAdsTxt: true,
  thirdPartyAdsTxt: '',
  customAdsTxt: '',
  headerScript: '',
  smartThrottling: { ...DEFAULT_SMART_THROTTLING },
  slots: {
    top: {
      slotId: '1234567890',
      enabled: true,
      format: 'horizontal',
      responsive: true,
      minHeight: '90px',
      label: 'Top Banner Ad',
      description: 'Appears directly below header on Homepage, Category pages & all 42+ Calculator tools.',
      adNetwork: 'adsense',
      customCode: '',
      sponsorBannerUrl: '',
      sponsorTargetUrl: '',
      sponsorAltText: '',
      sponsorBadgeText: 'Sponsored',
      sponsorOpenInNewTab: true,
      sponsorRel: 'sponsored nofollow noopener',
    },
    inline: {
      slotId: '2345678901',
      enabled: true,
      format: 'rectangle',
      responsive: true,
      minHeight: '250px',
      label: 'In-Content Result Ad',
      description: 'Appears after the calculation widget and result panels inside calculator pages.',
      adNetwork: 'adsense',
      customCode: '',
      sponsorBannerUrl: '',
      sponsorTargetUrl: '',
      sponsorAltText: '',
      sponsorBadgeText: 'Sponsored',
      sponsorOpenInNewTab: true,
      sponsorRel: 'sponsored nofollow noopener',
    },
    sidebar: {
      slotId: '3456789012',
      enabled: true,
      format: 'vertical',
      responsive: true,
      minHeight: '600px',
      label: 'Sticky Sidebar Ad',
      description: 'Appears in desktop right sidebar column next to calculation tools.',
      adNetwork: 'adsense',
      customCode: '',
      sponsorBannerUrl: '',
      sponsorTargetUrl: '',
      sponsorAltText: '',
      sponsorBadgeText: 'Sponsored',
      sponsorOpenInNewTab: true,
      sponsorRel: 'sponsored nofollow noopener',
    },
    footer: {
      slotId: '4567890123',
      enabled: true,
      format: 'horizontal',
      responsive: true,
      minHeight: '90px',
      label: 'Footer Banner Ad',
      description: 'Appears above the website footer across all pages.',
      adNetwork: 'adsense',
      customCode: '',
      sponsorBannerUrl: '',
      sponsorTargetUrl: '',
      sponsorAltText: '',
      sponsorBadgeText: 'Sponsored',
      sponsorOpenInNewTab: true,
      sponsorRel: 'sponsored nofollow noopener',
    },
  },
};

export const ADS_CONFIG: AdsConfig = { ...DEFAULT_ADS_CONFIG };

