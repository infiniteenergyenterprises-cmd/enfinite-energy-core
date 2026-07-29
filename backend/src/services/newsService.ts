import Parser from 'rss-parser';

const parser = new Parser({
  timeout: 12000,
  headers: { 'User-Agent': 'Mozilla/5.0 (compatible; EnfiniteEnergy/1.0; +https://enfiniteenergy.com)' },
  customFields: {
    item: [
      ['media:content', 'media'],
      ['content:encoded', 'contentEncoded'],
    ],
  },
});

// ─── All RSS Feeds ────────────────────────────────────────────────────────────
export const RSS_FEEDS = [
  // Global Solar News
  { source: 'PV Magazine',           url: 'https://www.pv-magazine.com/feed/',                                       tag: 'Global'  },
  { source: 'Solar Power World',     url: 'https://www.solarpowerworldonline.com/feed/',                             tag: 'Global'  },
  { source: 'Renewable Energy Mag',  url: 'https://www.renewableenergymagazine.com/rss',                             tag: 'Global'  },
  { source: 'CleanTechnica',         url: 'https://cleantechnica.com/category/solar/feed/',                          tag: 'Global'  },
  { source: 'Energy Digital',        url: 'https://energydigital.com/rss',                                          tag: 'Global'  },
  { source: 'Solar Quarter',         url: 'https://solarquarter.com/feed/',                                         tag: 'India'   },
  // India Solar News
  { source: 'Mercom India',          url: 'https://mercomindia.com/feed/',                                          tag: 'India'   },
  { source: 'EQ International',      url: 'https://www.eqmagpro.com/feed/',                                        tag: 'India'   },
  { source: 'Solar Mango',           url: 'https://www.solarmango.com/feed/',                                       tag: 'India'   },
  { source: 'Hindu BusinessLine',    url: 'https://www.thehindubusinessline.com/topic/renewable-energy/rss',        tag: 'India'   },
];

// ─── Cache ────────────────────────────────────────────────────────────────────
let cachedNews: any[] = [];
let lastFetchTime = 0;
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 min

// ─── Helpers ──────────────────────────────────────────────────────────────────
function extractImage(item: any): string {
  if (item.enclosure?.url) return item.enclosure.url;
  if (item.media?.$?.url)  return item.media.$.url;
  const content = item.contentEncoded || item.content || '';
  const m = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (m) return m[1];
  return '/17.png';
}

function extractSummary(item: any): string {
  const raw = item.contentSnippet || item.content || '';
  return raw.replace(/<[^>]*>/g, '').substring(0, 160).trim() + '…';
}

function timeAgo(dateString: string): string {
  const diff = Math.floor((Date.now() - new Date(dateString).getTime()) / 1000);
  if (diff < 60)   return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400)return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}

// ─── Main fetch ───────────────────────────────────────────────────────────────
export async function fetchLiveNews(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedNews.length > 0 && now - lastFetchTime < CACHE_DURATION_MS) {
    console.log('[news] serving from cache');
    return cachedNews;
  }

  console.log('[news] fetching fresh RSS…');
  const allNews: any[] = [];

  // Parallel fetch — skip feeds that timeout/fail
  await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        const items = (parsed.items || []).slice(0, 5).map((item) => ({
          category:  feed.tag === 'India' ? 'India News' : 'Industry News',
          source:    feed.source,
          tag:       feed.tag,
          time:      item.isoDate ? timeAgo(item.isoDate) : 'Recent',
          title:     item.title  || 'No Title',
          summary:   extractSummary(item),
          image:     extractImage(item),
          link:      item.link   || '#',
          timestamp: item.isoDate ? new Date(item.isoDate).getTime() : 0,
          views:     `${Math.floor(Math.random() * 500) + 100} views`,
        }));
        allNews.push(...items);
      } catch (err) {
        console.warn(`[news] skipped ${feed.source}: ${(err as Error).message}`);
      }
    })
  );

  // Newest first, top 12
  allNews.sort((a, b) => b.timestamp - a.timestamp);
  const final = allNews.slice(0, 12);

  cachedNews   = final;
  lastFetchTime = now;
  return final;
}
