#!/usr/bin/env node
import { chromium } from 'playwright';

async function monitorApp() {
  console.log('🔍 Starting frontend monitoring...\n');

  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  const issues = [];

  // Set up monitoring
  page.on('console', (msg) => {
    const type = msg.type();
    const text = msg.text();

    if (type === 'error') {
      issues.push({ type: 'console_error', message: text });
      console.log(`❌ [CONSOLE ERROR] ${text}`);
    } else if (type === 'warning') {
      console.log(`⚠️  [WARNING] ${text}`);
    }
  });

  page.on('pageerror', (error) => {
    issues.push({ type: 'page_error', message: error.message });
    console.log(`❌ [PAGE ERROR] ${error.message}`);
  });

  page.on('requestfailed', (request) => {
    const error = request.failure();
    if (error && !request.url().includes('favicon')) {
      issues.push({ type: 'network_error', message: `${request.url()} - ${error.errorText}` });
      console.log(`❌ [NETWORK ERROR] ${request.url()} - ${error.errorText}`);
    }
  });

  page.on('response', (response) => {
    const url = response.url();
    const status = response.status();

    if (url.includes('/api/') || url.includes('localhost:3001')) {
      if (status >= 400) {
        issues.push({ type: 'api_error', message: `${status} ${response.method()} ${url}` });
        console.log(`❌ [API ERROR] ${status} ${response.method()} ${url}`);
      } else {
        console.log(`✅ [API] ${status} ${response.method()} ${url}`);
      }
    }
  });

  try {
    console.log('🌐 Navigating to http://localhost:5173...');
    await page.goto('http://localhost:5173');

    console.log('⏳ Waiting for page to load...');
    await page.waitForLoadState('networkidle');

    console.log('⏳ Waiting additional time for delayed errors...');
    await page.waitForTimeout(3000);

    console.log('\n📊 MONITORING SUMMARY:');
    console.log(`Total issues found: ${issues.length}`);

    if (issues.length === 0) {
      console.log('✅ No issues detected! Your app is running smoothly.');
    } else {
      console.log('\nIssues found:');
      issues.forEach((issue, index) => {
        console.log(`${index + 1}. [${issue.type}] ${issue.message}`);
      });
    }
  } catch (error) {
    console.error('❌ Monitoring failed:', error.message);
  } finally {
    console.log('\n🔍 Monitoring complete. Browser will close in 5 seconds...');
    setTimeout(async () => {
      await browser.close();
      process.exit(0);
    }, 5000);
  }
}

// Run the monitoring
monitorApp().catch(console.error);
