export type PresenceArticle = {
  id: string;
  title: string;
  publishedAt: string;
  url: string;
  previewTitle?: string;
  previewSource?: string;
  previewExcerpt?: string;
  category: 'media' | 'clinic';
};

export type PlatformStatus = 'active' | 'pending';

export type PresencePlatform = {
  id: string;
  name: string;
  logoText: string;
  defaultUrl: string;
  customUrl?: string | null;
  status: PlatformStatus;
};

export type PresenceData = {
  hasSubscription: boolean;
  mediaArticles: PresenceArticle[];
  clinicArticles: PresenceArticle[];
  platforms: PresencePlatform[];
};