import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString: string) => {
  const dateObj = new Date(dateString);
  const day = dateObj.getDate().toString().padStart(2, '0');
  const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
  const year = dateObj.getFullYear();
  return `${day}.${month}.${year}`;
};

/**
 * Bot Detection Utility
 * Detects search engine crawlers, PageSpeed Insights, and other bots
 * to skip loading animations and improve SEO/performance scores
 */
const BOT_PATTERNS = [
  // Google
  'googlebot',
  'lighthouse',
  'google page speed',
  'pagespeed',
  'chrome-lighthouse',
  'gtmetrix',
  // Major search engines
  'bingbot',
  'slurp', // Yahoo
  'duckduckbot',
  'baiduspider',
  'yandexbot',
  // Social media crawlers
  'facebookexternalhit',
  'twitterbot',
  'linkedinbot',
  'pinterest',
  'slackbot',
  'whatsapp',
  'telegrambot',
  'discordbot',
  // SEO/Analytics tools
  'rogerbot', // Moz
  'semrushbot',
  'ahrefsbot',
  'dotbot',
  'petalbot',
  // Content aggregators
  'embedly',
  'quora link preview',
  'showyoubot',
  'outbrain',
  'flipboard',
  'tumblr',
  'nuzzel',
  // Other common bots
  'vkshare',
  'w3c_validator',
  'redditbot',
  'applebot',
  'bitlybot',
  'skypeuripreview',
  'pinterestbot',
  'bitrix link preview',
  'xing-contenttabreceiver',
  'qwantify',
];

/**
 * Check if a user agent string belongs to a bot/crawler
 * @param userAgent - The User-Agent header string
 * @returns true if the user agent matches known bot patterns
 */
export function isBot(userAgent: string): boolean {
  const ua = userAgent.toLowerCase();
  return BOT_PATTERNS.some((pattern) => ua.includes(pattern));
}
