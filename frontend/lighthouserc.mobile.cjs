const { executablePath } = require('puppeteer');
const targetUrl = process.env.LHCI_URL || 'http://localhost:5173/';

module.exports = {
  ci: {
    collect: {
      url: [targetUrl],
      numberOfRuns: 1,
      chromePath: executablePath(),
      chromeFlags: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-gpu',
        '--no-zygote',
        '--disable-features=IsolateOrigins,site-per-process'
      ],
      settings: {
        formFactor: 'mobile',
        disableFullPageScreenshot: true,
        screenEmulation: {
          mobile: true,
          width: 360,
          height: 640,
          deviceScaleFactor: 2,
          disabled: false
        },
        throttling: {
          rttMs: 150,
          throughputKbps: 1600,
          cpuSlowdownMultiplier: 4
        }
      }
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.8 }],
        'categories:accessibility': ['warn', { minScore: 0.9 }],
        'categories:best-practices': ['warn', { minScore: 0.9 }],
        'categories:seo': ['warn', { minScore: 0.85 }]
      }
    },
    upload: {
      target: 'filesystem',
      outputDir: './lighthouse-reports/mobile'
    }
  }
};
