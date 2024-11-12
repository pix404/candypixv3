const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    
    // Set viewport to match our desired logo size
    await page.setViewport({
        width: 800,
        height: 200
    });

    // Load our HTML template
    await page.goto(`file://${path.join(__dirname, '../logo-generator.html')}`);

    // Wait for the content to be rendered
    await page.waitForSelector('.logo');

    // Take a screenshot of just the logo element
    const element = await page.$('.logo');
    await element.screenshot({
        path: path.join(__dirname, '../public/logo.png'),
        omitBackground: true
    });

    await browser.close();
    console.log('Logo generated successfully!');
})();
