// Analytics utility - placeholder for production analytics integration
export const analytics = {
  track: (event: string, properties?: Record<string, any>) => {
    // Placeholder for analytics tracking
    if (process.env.NODE_ENV === 'development') {
      console.log('Analytics Event:', event, properties)
    }
    // TODO: Integrate with your preferred analytics service
    // Example: Google Analytics, Mixpanel, Amplitude, etc.
  },

  trackPageView: (url: string) => {
    analytics.track('page_view', { url })
  },

  trackGameView: (gameSlug: string) => {
    analytics.track('game_view', { game_slug: gameSlug })
  },

  trackDemoPlay: (gameSlug: string) => {
    analytics.track('demo_play', { game_slug: gameSlug })
  },

  trackContactForm: () => {
    analytics.track('contact_form_submit')
  },

  trackCareerApplication: (position: string) => {
    analytics.track('career_application', { position })
  },
}
