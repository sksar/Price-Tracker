/*
    Online Price Tracker
*/

import fs from 'fs';

// Fetcher functions
import { amazon } from './fetchers.js';

// get all products, from file, (each line is a product [URL])
let products = fs.readFileSync('./PRODUCTS.txt', 'utf8').split('\n');

// Make unique / Remove duplicates
products = [...new Set(products)];

// RUN
products.map(async (url) => {

    const ID = Buffer.from(url).toString('base64'); // Base64 encode URL as ID
    const _data = await amazon(url);

    const file = `./data/${ID}.json`;

    // Store data in file
    const DATA = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
    DATA.url = url;
    DATA.title = _data.title;
    DATA.prices = DATA.prices || [];
    DATA.prices.push({ date: Date.now(), price: _data.price });
    while (DATA.prices.length > 1000) DATA.prices.shift(); // Keep only 1000 prices
    fs.writeFileSync(file, JSON.stringify(DATA, null, 2));

    console.log(`${url} - ${_data.price}`);
});