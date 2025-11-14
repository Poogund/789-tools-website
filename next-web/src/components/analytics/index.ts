// Re-export analytics components and functions
export { GoogleAnalytics } from './GoogleAnalytics';
export {
  trackEvent,
  trackViewProduct,
  trackAddToCart,
  trackBeginCheckout,
  trackCompleteCheckout,
  trackSubmitLead,
  trackPageView,
} from '@/lib/analytics';
