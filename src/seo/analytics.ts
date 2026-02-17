/**
 * Analytics Integration Module
 * 
 * Google Analytics 4 (GA4) tracking implementation with privacy-friendly configuration.
 * Supports pageview tracking, custom event tracking, and respects Do Not Track (DNT).
 * 
 * Requirements: 6.1, 6.2, 6.3
 */

import type { AnalyticsConfig, AnalyticsEvent } from "./types";

/**
 * Check if Do Not Track (DNT) is enabled in the browser
 * Respects user privacy preferences
 */
export function isDNTEnabled(): boolean {
  // Check for Do Not Track header
  // @ts-ignore - navigator.doNotTrack is not in TypeScript types but exists in browsers
  const dnt = navigator.doNotTrack || window.doNotTrack || navigator.msDoNotTrack;
  return dnt === "1" || dnt === "yes";
}

/**
 * Generate Google Analytics 4 initialization script
 * 
 * @param config - Analytics configuration with measurement ID
 * @returns HTML script tags for GA4 initialization
 */
export function generateAnalyticsScript(config: AnalyticsConfig): string {
  // Don't generate script if no measurement ID provided
  if (!config.googleAnalyticsId) {
    return "";
  }

  const measurementId = config.googleAnalyticsId;
  const debugMode = config.enableDebug ? "true" : "false";

  return `<!-- Google Analytics 4 -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${measurementId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  
  // Privacy-friendly configuration
  gtag('config', '${measurementId}', {
    'anonymize_ip': true,
    'cookie_flags': 'SameSite=None;Secure',
    'debug_mode': ${debugMode}
  });
  
  // Respect Do Not Track
  if (navigator.doNotTrack === "1" || window.doNotTrack === "1") {
    window['ga-disable-${measurementId}'] = true;
  }
</script>`;
}

/**
 * Initialize analytics tracking with client-side event listeners
 * This function should be called after the DOM is loaded
 * 
 * @param config - Analytics configuration
 */
export function initializeAnalytics(config: AnalyticsConfig): void {
  // Don't initialize if DNT is enabled or no measurement ID
  if (isDNTEnabled() || !config.googleAnalyticsId) {
    if (config.enableDebug) {
      console.log("[Analytics] Tracking disabled (DNT enabled or no measurement ID)");
    }
    return;
  }

  if (config.enableDebug) {
    console.log("[Analytics] Initializing analytics tracking");
  }

  // Track button clicks
  trackButtonClicks();
  
  // Track section views (scroll tracking)
  trackSectionViews();
  
  // Track external link clicks
  trackExternalLinks();
}

/**
 * Track pageview event
 * 
 * @param path - Page path (e.g., "/", "/about")
 */
export function trackPageView(path: string): void {
  if (isDNTEnabled()) return;
  
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", "page_view", {
      page_path: path,
      page_title: document.title,
      page_location: window.location.href
    });
  }
}

/**
 * Track custom event
 * 
 * @param event - Analytics event data
 */
export function trackEvent(event: AnalyticsEvent): void {
  if (isDNTEnabled()) return;
  
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("event", event.eventName, {
      event_category: event.eventCategory,
      event_label: event.eventLabel,
      value: event.eventValue,
      ...event.customParameters
    });
  }
}

/**
 * Track button clicks (CTA buttons, project links, contact buttons)
 */
function trackButtonClicks(): void {
  // Track primary CTA buttons
  document.querySelectorAll(".btn-primary, .btn-outline, .nav-cta").forEach((button) => {
    button.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      const buttonText = target.textContent?.trim() || "Unknown Button";
      
      trackEvent({
        eventName: "button_click",
        eventCategory: "engagement",
        eventLabel: buttonText
      });
    });
  });

  // Track project card clicks
  document.querySelectorAll(".proj-card, .featured-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      const projectName = target.querySelector("h3")?.textContent?.trim() || "Unknown Project";
      
      trackEvent({
        eventName: "project_view",
        eventCategory: "engagement",
        eventLabel: projectName
      });
    });
  });

  // Track contact card clicks
  document.querySelectorAll(".contact-card").forEach((card) => {
    card.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLElement;
      const contactType = target.textContent?.trim() || "Unknown Contact";
      
      trackEvent({
        eventName: "contact_click",
        eventCategory: "engagement",
        eventLabel: contactType
      });
    });
  });
}

/**
 * Track section views using Intersection Observer
 * Tracks when sections become visible in the viewport
 */
function trackSectionViews(): void {
  const sections = document.querySelectorAll("section[id]");
  const observedSections = new Set<string>();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
          const sectionId = entry.target.id;
          
          // Only track each section once per page load
          if (!observedSections.has(sectionId)) {
            observedSections.add(sectionId);
            
            trackEvent({
              eventName: "section_view",
              eventCategory: "engagement",
              eventLabel: sectionId
            });
          }
        }
      });
    },
    {
      threshold: 0.5 // Section must be 50% visible
    }
  );

  sections.forEach((section) => observer.observe(section));
}

/**
 * Track external link clicks
 * Tracks clicks on links that navigate away from the site
 */
function trackExternalLinks(): void {
  document.querySelectorAll("a[href^='http']").forEach((link) => {
    link.addEventListener("click", (e) => {
      const target = e.currentTarget as HTMLAnchorElement;
      const href = target.href;
      const hostname = new URL(href).hostname;
      
      // Only track if it's an external link (different domain)
      if (hostname !== window.location.hostname) {
        trackEvent({
          eventName: "external_link_click",
          eventCategory: "outbound",
          eventLabel: href
        });
      }
    });
  });
}

/**
 * Client-side initialization code to be included in the page
 * This should be called when the DOM is ready
 */
export function getAnalyticsInitCode(config: AnalyticsConfig): string {
  if (!config.googleAnalyticsId) {
    return "";
  }

  return `<script>
  // Initialize analytics when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      if (typeof initializeAnalytics === 'function') {
        initializeAnalytics(${JSON.stringify(config)});
      }
    });
  } else {
    if (typeof initializeAnalytics === 'function') {
      initializeAnalytics(${JSON.stringify(config)});
    }
  }
</script>`;
}
