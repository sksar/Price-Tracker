import cheerio from 'cheerio';
import fetch from 'node-fetch';


/*
    amazon.in Price Getter
    <span id="priceblock_ourprice" class="a-size-medium a-color-price priceBlockBuyingPriceString">₹61,990.00</span>
    <span id="priceblock_dealprice" class="a-size-medium a-color-price priceBlockDealPriceString">₹1,39,400.00</span>
*/

export async function amazon(URL) {

    // Get Contents of URL
    const response = await fetch(URL);
    const html = await response.text();
    const $ = cheerio.load(html);

    // Get Data
    const price = $('#priceblock_dealprice').text() || $('#priceblock_ourprice').text();
    const title = $('#productTitle').text().trim();

    // Return Data
    return { title, price };
}