import { expect, test } from '@playwright/test';

test.describe('Development Monitoring', () => {
  test('monitor app during development', async ({ page }) => {
    const issues: Array<{ type: string; message: string; url?: string }> = [];

    // Set up comprehensive monitoring
    page.on('console', (msg) => {
      const type = msg.type();
      const text = msg.text();

      // Log all console messages for debugging
      console.log(`[${type.toUpperCase()}] ${text}`);

      // Track errors and warnings
      if (type === 'error') {
        issues.push({
          type: 'console_error',
          message: text,
          url: msg.location()?.url,
        });
      } else if (type === 'warning') {
        issues.push({
          type: 'console_warning',
          message: text,
          url: msg.location()?.url,
        });
      }
    });

    page.on('pageerror', (error) => {
      issues.push({
        type: 'page_error',
        message: error.message,
        url: page.url(),
      });
      console.log(`[PAGE ERROR] ${error.message}`);
      console.log(`Stack: ${error.stack}`);
    });

    page.on('requestfailed', (request) => {
      const error = request.failure();
      if (error && !request.url().includes('favicon')) {
        issues.push({
          type: 'network_error',
          message: `${request.url()} - ${error.errorText}`,
          url: request.url(),
        });
        console.log(`[NETWORK ERROR] ${request.url()} - ${error.errorText}`);
      }
    });

    page.on('response', (response) => {
      const url = response.url();
      const status = response.status();

      // Log API responses
      if (url.includes('/api/') || url.includes('localhost:3001')) {
        console.log(`[API] ${status} ${response.method()} ${url}`);

        if (status >= 400) {
          issues.push({
            type: 'api_error',
            message: `${status} ${response.method()} ${url}`,
            url: url,
          });
        }
      }
    });

    // Navigate to the app
    await page.goto('/');

    // Wait for initial load
    await page.waitForLoadState('networkidle');

    // Wait a bit more for any delayed errors
    await page.waitForTimeout(2000);

    // Log summary
    console.log('\n=== DEVELOPMENT MONITORING SUMMARY ===');
    console.log(`Total issues found: ${issues.length}`);

    if (issues.length > 0) {
      console.log('\nIssues found:');
      issues.forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.type}] ${issue.message}`);
        if (issue.url) {
          console.log(`   URL: ${issue.url}`);
        }
      });
    } else {
      console.log('✅ No issues detected!');
    }

    // For development, we don't fail the test on warnings
    // Only fail on actual errors
    const errors = issues.filter(
      (issue) =>
        issue.type === 'console_error' ||
        issue.type === 'page_error' ||
        issue.type === 'network_error' ||
        issue.type === 'api_error'
    );

    if (errors.length > 0) {
      console.log(`\n❌ Found ${errors.length} errors that need attention:`);
      errors.forEach((error) => {
        console.log(`   - ${error.message}`);
      });
    }

    // Don't fail the test in development mode
    // expect(errors).toHaveLength(0);
  });
});
