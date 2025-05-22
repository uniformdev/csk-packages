'use server';

import puppeteer from 'puppeteer';
import puppeteerCore from 'puppeteer-core';
import chromium from '@sparticuz/chromium-min';

const CHROMIUM_EXECUTABLE_PATH =
  'https://github.com/Sparticuz/chromium/releases/download/v133.0.0/chromium-v133.0.0-pack.tar';
const VIEWPORT = { width: 1440, height: 900 };
const SCREENSHOT_WAIT_TIME = 5000;

const captureScreenshotVercel = async (url: string) => {
  const executablePath = await chromium.executablePath(CHROMIUM_EXECUTABLE_PATH);
  const browser = await puppeteerCore.launch({
    executablePath,
    args: [...chromium.args, '--disable-dev-shm-usage', '--disable-gpu'],
    headless: chromium.headless,
    defaultViewport: VIEWPORT,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    page.setDefaultNavigationTimeout(60000);

    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, SCREENSHOT_WAIT_TIME));

    await page.evaluate(() => {
      const scrollStep = Math.floor(window.innerHeight / 2);
      const scrollHeight = document.body.scrollHeight;

      return new Promise(resolve => {
        let currentPosition = 0;

        const scrollDown = () => {
          if (currentPosition < scrollHeight) {
            window.scrollTo(0, currentPosition);
            currentPosition += scrollStep;
            setTimeout(scrollDown, 100);
          } else {
            currentPosition = scrollHeight;
            window.scrollTo(0, currentPosition);
            setTimeout(scrollUp, 500);
          }
        };

        const scrollUp = () => {
          if (currentPosition > 0) {
            currentPosition -= scrollStep;
            window.scrollTo(0, currentPosition);
            setTimeout(scrollUp, 100);
          } else {
            window.scrollTo(0, 0);
            setTimeout(resolve, 500);
          }
        };

        scrollDown();
      });
    });

    await page.waitForFunction(() => document.readyState === 'complete', { timeout: 15000 });

    try {
      const loadingIndicators = ['.loading', '.spinner', '[data-loading="true"]'];
      for (const selector of loadingIndicators) {
        const loadingElement = await page.$(selector);
        if (loadingElement) {
          await page
            .waitForSelector(selector, { hidden: true, timeout: 10000 })
            .catch(() => console.info(`Waiting for ${selector} to hide timed out`));
        }
      }
    } catch (e) {
      console.info('No loading indicators found or timeout occurred', e);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    return await page.screenshot({ fullPage: true, type: 'png' });
  } finally {
    await browser.close();
  }
};

const captureScreenshotLocal = async (url: string) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu'],
    defaultViewport: VIEWPORT,
  });

  try {
    const page = await browser.newPage();
    await page.setViewport(VIEWPORT);
    page.setDefaultNavigationTimeout(60000);

    await page.goto(url, { waitUntil: 'networkidle2' });
    await new Promise(resolve => setTimeout(resolve, SCREENSHOT_WAIT_TIME));

    await page.evaluate(() => {
      const scrollStep = Math.floor(window.innerHeight / 2);
      const scrollHeight = document.body.scrollHeight;

      return new Promise(resolve => {
        let currentPosition = 0;

        const scrollDown = () => {
          if (currentPosition < scrollHeight) {
            window.scrollTo(0, currentPosition);
            currentPosition += scrollStep;
            setTimeout(scrollDown, 100);
          } else {
            currentPosition = scrollHeight;
            window.scrollTo(0, currentPosition);
            setTimeout(scrollUp, 500);
          }
        };

        const scrollUp = () => {
          if (currentPosition > 0) {
            currentPosition -= scrollStep;
            window.scrollTo(0, currentPosition);
            setTimeout(scrollUp, 100);
          } else {
            window.scrollTo(0, 0);
            setTimeout(resolve, 500);
          }
        };

        scrollDown();
      });
    });

    await page.waitForFunction(() => document.readyState === 'complete', { timeout: 15000 });

    try {
      const loadingIndicators = ['.loading', '.spinner', '[data-loading="true"]'];
      for (const selector of loadingIndicators) {
        const loadingElement = await page.$(selector);
        if (loadingElement) {
          await page
            .waitForSelector(selector, { hidden: true, timeout: 10000 })
            .catch(() => console.info(`Waiting for ${selector} to hide timed out`));
        }
      }
    } catch (e) {
      console.info('No loading indicators found or timeout occurred', e);
    }

    await new Promise(resolve => setTimeout(resolve, 500));
    return await page.screenshot({ fullPage: true, type: 'png' });
  } finally {
    await browser.close();
  }
};

const takeScreenshots = async (latestVersionPreviewUrl: string, latestPublishedVersionPreviewUrl: string) => {
  try {
    const captureScreenshot = process.env.VERCEL ? captureScreenshotVercel : captureScreenshotLocal;

    console.info(`Capturing screenshot for latest version: ${latestVersionPreviewUrl}`);
    const latestVersionScreenshot = await captureScreenshot(latestVersionPreviewUrl);

    console.info(`Capturing screenshot for published version: ${latestPublishedVersionPreviewUrl}`);
    const latestPublishedVersionScreenshot = await captureScreenshot(latestPublishedVersionPreviewUrl);

    return { latestVersionScreenshot, latestPublishedVersionScreenshot };
  } catch (error) {
    console.error('Error taking screenshots:', error);
    throw error;
  }
};

export default takeScreenshots;
