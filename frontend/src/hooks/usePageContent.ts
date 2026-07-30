"use client";
import { useState, useEffect, createContext, useContext } from 'react';

export interface PageContentData {
  imageUrl?: string;
  title?: string;
  description?: string;
}

export const ContentContext = createContext<any>(null);

// ── Global in-memory cache with timestamp ────────────────────────────────────
let globalCache: Record<string, any> | null = null;
let fetchPromise: Promise<void> | null = null;
let cacheTimestamp = 0;
const CACHE_TTL_MS = 30_000; // 30 seconds max cache lifetime
let listeners: Array<() => void> = [];

function notifyListeners() {
  listeners.forEach(fn => fn());
}

async function fetchFresh() {
  const ts = Date.now();
  fetchPromise = fetch((process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api') + '/content?t=' + ts, { cache: 'no-store' })
    .then(r => r.json())
    .then(data => {
      if (data.status === 'success') {
        globalCache = data.map;
      } else {
        globalCache = {};
      }
      cacheTimestamp = Date.now();
      fetchPromise = null;
      notifyListeners();
    })
    .catch(() => {
      globalCache = {};
      cacheTimestamp = Date.now();
      fetchPromise = null;
    });
  return fetchPromise;
}

async function ensureLoaded(force = false) {
  const isStale = Date.now() - cacheTimestamp > CACHE_TTL_MS;
  if (!force && globalCache && !isStale) return; // Fresh cache — use it
  if (fetchPromise) return fetchPromise;          // Already fetching
  return fetchFresh();
}

// Pre-load on module import (fires once)
if (typeof window !== 'undefined') {
  ensureLoaded();
}

export function usePageContent(sectionKey: string, fallback: PageContentData): PageContentData {
  const serverData = useContext(ContentContext);
  const serverFallback = serverData?.[sectionKey];

  const [content, setContent] = useState<PageContentData>(() => {
    // If SSR context provided the data, use it synchronously to avoid flash
    if (serverFallback) {
      return {
        imageUrl: serverFallback.imageUrl ?? fallback.imageUrl,
        title: serverFallback.title ?? fallback.title,
        description: serverFallback.description ?? fallback.description,
      };
    }
    return fallback;
  });

  useEffect(() => {
    let cancelled = false;

    async function load(force = false) {
      // If we already have serverData, we don't strictly need to fetch immediately, but we can update in background
      await ensureLoaded(force);
      if (cancelled) return;

      const fetched = globalCache?.[sectionKey];
      if (fetched) {
        setContent({
          imageUrl:    fetched.imageUrl    ?? fallback.imageUrl,
          title:       fetched.title       ?? fallback.title,
          description: fetched.description ?? fallback.description,
        });
      } else {
        setContent(fallback);
      }
    }

    // Initial load
    load();

    // Listen for cache-invalidation events (fired by admin panel after save)
    const onUpdate = () => load(true);
    window.addEventListener('content-updated', onUpdate);
    listeners.push(onUpdate);

    return () => {
      cancelled = true;
      window.removeEventListener('content-updated', onUpdate);
      listeners = listeners.filter(fn => fn !== onUpdate);
    };
  }, [sectionKey]);

  return content;
}

// Call this after saving content in admin so all components re-fetch fresh data
export function invalidateContentCache() {
  globalCache = null;
  fetchPromise = null;
  cacheTimestamp = 0;
  // Broadcast to all tabs/windows via BroadcastChannel if available
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('content-updated'));
    try {
      const bc = new BroadcastChannel('solar-cms');
      bc.postMessage('content-updated');
      bc.close();
    } catch (_) {}
  }
}

// Listen for cross-tab broadcasts
if (typeof window !== 'undefined') {
  try {
    const bc = new BroadcastChannel('solar-cms');
    bc.onmessage = (e) => {
      if (e.data === 'content-updated') {
        globalCache = null;
        fetchPromise = null;
        cacheTimestamp = 0;
        window.dispatchEvent(new Event('content-updated'));
      }
    };
  } catch (_) {}
}
