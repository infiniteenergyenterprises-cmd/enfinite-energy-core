import Parser from 'rss-parser';

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'media'],
      ['content:encoded', 'contentEncoded']
    ]
  }
});

const RSS_FEEDS = [
  { source: "PV Magazine India", url: "https://www.pv-magazine-india.com/feed" },
  { source: "Mercom India", url: "https://mercomindia.com/feed" }
];

// In-memory cache to prevent spamming the RSS providers
let cachedNews: any[] = [];
let lastFetchTime = 0;
const CACHE_DURATION_MS = 30 * 60 * 1000; // 30 minutes

function extractImage(item: any): string {
  // Try enclosure
  if (item.enclosure && item.enclosure.url) {
    return item.enclosure.url;
  }
  // Try media tag
  if (item.media && item.media.$ && item.media.$.url) {
    return item.media.$.url;
  }
  // Try finding an img tag in the content
  const content = item.contentEncoded || item.content || '';
  // Better regex for finding img src
  const imgMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (imgMatch && imgMatch[1]) {
    return imgMatch[1];
  }
  // Fallback image (local image guaranteed to work)
  return "/17.png";
}

function extractSummary(item: any): string {
  const snippet = item.contentSnippet || item.content || '';
  return snippet.substring(0, 150).replace(/\n/g, ' ') + '...';
}

function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) return `${diffInHours} hours ago`;
  const diffInDays = Math.floor(diffInHours / 24);
  return `${diffInDays} days ago`;
}

export async function fetchLiveNews(forceRefresh = false) {
  const now = Date.now();
  if (!forceRefresh && cachedNews.length > 0 && (now - lastFetchTime) < CACHE_DURATION_MS) {
    console.log("Serving news from cache");
    return cachedNews;
  }

  console.log("Fetching fresh news from RSS feeds...");
  const allNews: any[] = [];

  for (const feed of RSS_FEEDS) {
    try {
      const parsed = await parser.parseURL(feed.url);
      
      // Take top 5 items from each feed
      const topItems = parsed.items.slice(0, 5).map(item => ({
        category: "Industry News",
        source: feed.source,
        time: item.isoDate ? timeAgo(item.isoDate) : "Recent",
        title: item.title || 'No Title',
        summary: extractSummary(item),
        image: extractImage(item),
        link: item.link,
        timestamp: item.isoDate ? new Date(item.isoDate).getTime() : 0,
        views: Math.floor(Math.random() * 500) + 100 + " views"
      }));

      allNews.push(...topItems);
    } catch (error) {
      console.error(`Failed to fetch RSS feed from ${feed.source}:`, error);
    }
  }

  // Sort by newest first
  allNews.sort((a, b) => b.timestamp - a.timestamp);

  // Take top 6 overall
  const finalNews = allNews.slice(0, 6);

  cachedNews = finalNews;
  lastFetchTime = now;

  return finalNews;
}
