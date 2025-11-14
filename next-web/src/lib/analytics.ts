// Analytics helper functions for GA4 event tracking

interface EventParams {
  [key: string]: string | number | boolean | undefined;
}

export function trackEvent(eventName: string, params: EventParams = {}) {
  if (typeof window !== 'undefined' && 'gtag' in window) {
    (window as any).gtag('event', eventName, params);
  }
}

// E-commerce events
export function trackViewProduct(productId: string, productName: string, price: number) {
  trackEvent('view_product', {
    item_id: productId,
    item_name: productName,
    value: price,
    currency: 'THB',
  });
}

export function trackAddToCart(productId: string, productName: string, price: number, quantity: number) {
  trackEvent('add_to_cart', {
    item_id: productId,
    item_name: productName,
    value: price * quantity,
    currency: 'THB',
    quantity: quantity,
  });
}

export function trackBeginCheckout(totalValue: number, itemCount: number) {
  trackEvent('begin_checkout', {
    value: totalValue,
    currency: 'THB',
    items: itemCount,
  });
}

export function trackCompleteCheckout(orderId: string, totalValue: number) {
  trackEvent('complete_checkout', {
    transaction_id: orderId,
    value: totalValue,
    currency: 'THB',
  });
}

// Lead events
export function trackSubmitLead(serviceType?: string) {
  trackEvent('submit_lead', {
    service_type: serviceType,
  });
}

// Page view events (custom tracking if needed)
export function trackPageView(pagePath: string, pageTitle: string) {
  trackEvent('page_view', {
    page_path: pagePath,
    page_title: pageTitle,
  });
}
