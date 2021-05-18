const puppeteer = require('puppeteer');
const sites = require('../sites.json');
let setting = require('../config.json')
//i have no idea why this doesnt work
const notify = require('./Notify')
const {ms,s} = require('time-convert')
let timeConverted = 1;
let timeSeconds = 1
console.debug('we got through boys');

//I don't even know what I'm doing
(async () => {
    let launchOptions = { headless: false, args: ['--no-sandbox']};
  
    const browser = await puppeteer.launch(launchOptions);
    const page = await browser.newPage();
    try {
      for (let index = 0; index < sites.length; index += 1) {
        // wait until tab finish
        await checkSite(sites[index],page );
      }
    } finally {
      // close the browser
      await browser.close();
    }
  })();


    //set waiting time
    console.debug('zzzz');
    function sleep(wait) {
        return new Promise((resolve) => setTimeout(resolve, wait * timeConverted));
      }
      
      const isMatch = (actual, expected) => {
        if (Array.isArray(expected)) return expected.includes(actual);
        return actual === expected;
      };
      
      const checkSite = async (site, page) => {
        const {
          url, xPath, expected, wait = timeSeconds, description,
        } = site;
        await page.setUserAgent('Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36');
        console.debug('Browser Agent Set!')
        await page.goto(url);
        console.debug(`Going to ${url}...`)
        await sleep(wait);
        try {
          const elHandle = await page.$x(xPath);
          const text = await page.evaluate((el) => el.textContent, elHandle[0]);
      
          const value = String(text).replace(/^\s+|\s+$/g, '');
          if (!isMatch(value, expected)) {
            await notify.Notify({ site, message: `${description} was expecting "${expected}" but got "${value}"` })
          }
        } catch (e) {
          if (setting && setting.notification.notifyOnNodeNotFound) {
            await notify.Notify({ site, message: `${description}: Listing Missing or Out of Stock!` });
          }
        }
      };
//Still don't but I'm exporting it as a module now 
module.exports= {
    checkSite
}