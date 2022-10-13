const puppeteer = require('puppeteer');


(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();

    const locationPopUpCloseSelector = "#header > div > div.utility-nav.bg-jet > div > wainclude > div > div.dropdown-menu.mt-0 > div > div > div > div:nth-child(2) > button";
    const menuHoverSelector = "#mainNavbar > div > ul > li:nth-child(4) > button";
    const categorySelector = "#bath-bombs";
    const bathBombPopUpCloseSelector = "#email-signup-modal > div > div > div > div.subscription-modal-header.border-0.mx-4.pull-right > button";
    const bathBomb1 = "#product-search-results > div > div.col-sm-12.col-md-8.col-lg-9 > div.row.product-grid > div:nth-child(1) > div > div > div.product-tile-body.d-flex.flex-column.position-relative.w-100.h-100.text-center > div.product-tile-buy-row > div.cart-and-ipay > button";
    const bathBomb2 = "#product-search-results > div > div.col-sm-12.col-md-8.col-lg-9 > div.row.product-grid > div:nth-child(2) > div > div > div.product-tile-body.d-flex.flex-column.position-relative.w-100.h-100.text-center > div.product-tile-buy-row > div.cart-and-ipay > button";
    
    await page.setViewport({
        width: 1920,
        height: 1080
    })

    page.on('dialog', async dialog => {
        console.log(dialog.message());
        await dialog.dismiss();
    });

    await page.goto('https://www.lush.ca', { waitUntil: 'networkidle0' });


    try {
        await page.waitForSelector(locationPopUpCloseSelector);
        await page.click((locationPopUpCloseSelector));
    } catch (error) {
        console.log("Unable to close location pop-up window");
    }

    await page.hover(menuHoverSelector);

    try {
        await page.waitForSelector(categorySelector);
        await page.click((categorySelector));
        await page.waitForNavigation();
    } catch (error) {
        console.log("Unable to open menu category");
    };
    

    try {
        await page.waitForSelector(bathBombPopUpCloseSelector);
        await page.click((bathBombPopUpCloseSelector));
        await page.waitForNavigation();
    } catch (error) {
        console.log("Unable to close pop-up in bath bomb window");
    }

    try {
        await page.waitForSelector(bathBomb1);
        await page.click((bathBomb1));
        await page.waitForNavigation();
    } catch (error) {
        console.log("Unable to add first item");
    };

    try {
        await page.waitForSelector("#add-to-cart-modal > div > div > div.d-flex > button");
        await page.click("#add-to-cart-modal > div > div > div.d-flex > button");
        await page.waitForNavigation();
    } catch (error) {
        console.log("Unable to close mini window");
    };
  
    try {

        await page.waitForSelector(bathBomb2);
        await page.click((bathBomb2));
        await page.waitForNavigation();
    } catch (error) {
        console.log("Unable to add second item");
    };

    try {

        await page.waitForSelector( "#add-to-cart-modal > div > div > div.minicart-footer.mt-2.mx-3.mx-md-0 > div:nth-child(3) > div > div > button");
        await page.click( "  #add-to-cart-modal > div > div > div.minicart-footer.mt-2.mx-3.mx-md-0 > div:nth-child(3) > div > div > button");
        await page.waitForNavigation();
    } catch (error) {
        console.log("Unable to go to cart");
    };

    await page.screenshot({ path: "TestResults/AutomationResult.png" });
    await browser.close();
})();