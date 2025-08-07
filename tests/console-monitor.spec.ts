import { expect, test } from '@playwright/test';

test.describe('Console and Network Monitoring', () => {
  test('should not have console errors on page load', async ({ page }) => {
    const consoleErrors: string[] = [];
    const networkErrors: string[] = [];

    // Listen to console errors
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.log(`[CONSOLE ERROR] ${msg.text()}`);
        console.log(`Location: ${msg.location()?.url}:${msg.location()?.lineNumber}`);
      }
    });

    // Listen to network errors
    page.on('requestfailed', (request) => {
      const error = request.failure();
      if (error) {
        networkErrors.push(`${request.url()} - ${error.errorText}`);
        console.log(`[NETWORK ERROR] ${request.url()} - ${error.errorText}`);
      }
    });

    // Navigate to the app
    await page.goto('/');

    // Wait for the page to load
    await page.waitForLoadState('networkidle');

    // Check for console errors
    expect(consoleErrors).toHaveLength(0);

    // Check for network errors (excluding expected 404s for missing assets)
    const criticalNetworkErrors = networkErrors.filter(
      (error) => !error.includes('404') && !error.includes('favicon') && !error.includes('manifest')
    );
    expect(criticalNetworkErrors).toHaveLength(0);
  });

  test('should monitor API calls', async ({ page }) => {
    const apiCalls: Array<{ url: string; method: string; status?: number }> = [];

    // Listen to API requests
    page.on('request', (request) => {
      const url = request.url();
      if (url.includes('/api/') || url.includes('localhost:3001')) {
        apiCalls.push({
          url: request.url(),
          method: request.method(),
        });
        console.log(`[API REQUEST] ${request.method()} ${request.url()}`);
      }
    });

    // Listen to API responses
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('/api/') || url.includes('localhost:3001')) {
        const existingCall = apiCalls.find((call) => call.url === url);
        if (existingCall) {
          existingCall.status = response.status();
        }
        console.log(`[API RESPONSE] ${response.status()} ${response.url()}`);

        // Log failed API calls
        if (response.status() >= 400) {
          console.log(`[API ERROR] ${response.status()} ${response.url()}`);
        }
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Log all API calls for debugging
    console.log('API calls made:', apiCalls);
  });

  test('should monitor JavaScript errors', async ({ page }) => {
    const jsErrors: string[] = [];

    // Listen to page errors
    page.on('pageerror', (error) => {
      jsErrors.push(error.message);
      console.log(`[JS ERROR] ${error.message}`);
      console.log(`Stack: ${error.stack}`);
    });

    // Listen to unhandled promise rejections
    page.on('unhandledrejection', (rejection) => {
      jsErrors.push(rejection.reason());
      console.log(`[UNHANDLED REJECTION] ${rejection.reason()}`);
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for JavaScript errors
    expect(jsErrors).toHaveLength(0);
  });
});
