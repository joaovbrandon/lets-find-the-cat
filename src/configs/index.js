export const IS_DEV = process.env.NODE_ENV === 'development';

export const currencySymbol = '€';

export const API = {
  AUTH: 'https://api.github.com/',
  // Just an example
  HOST: 'https://api.letsfindthecat.com/',
};

export const CACHE = {
  PREFIX: IS_DEV ? 'LetsFindTheCat@dev@' : 'LetsFindTheCat@',
  DEFAULT_DURATION: 86400000, // 24h
};

export const socialMediaUrls = {
  /*
    If need hide one social media, just comment or remove the line

    Pre-configured Social Medias:
    - facebook
    - instagram
    - youtube
    - twitter
  */
  facebook: 'https://www.facebook.com/',
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/',
  twitter: 'https://twitter.com/',
};
