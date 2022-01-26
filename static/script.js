window.onload = (event) => {
		var map, csv;
	require([
	"esri/map",
	"esri/layers/CSVLayer",
	"esri/Color",
	"esri/symbols/SimpleMarkerSymbol",
	"esri/renderers/SimpleRenderer",
	"esri/InfoTemplate",
	"esri/config",
	"dojo/domReady!"
	], function(
	Map, CSVLayer, Color, SimpleMarkerSymbol, SimpleRenderer, InfoTemplate, esriConfig
	) {
	// Use CORS
	esriConfig.defaults.io.corsEnabledServers.push("data.gov.lv"); // supports CORS
	// Use proxy if the server doesn't support CORS
	// esriConfig.defaults.io.proxyUrl = "/proxy/";
	map = new Map("map", {
	basemap: "gray",
	center: [ 24.1052,56.9496 ],
	zoom: 8
	});
	
	csv = new CSVLayer("https://data.gov.lv/dati/dataset/66a30fa4-9401-4885-9de0-e2c76dd5f4d4/resource/5947f1ba-7427-4ba7-9983-df543b1b6d3f/download/pppv_zemes-portalam_18072019_lvgmc.csv", {
		copyright: "data.gov.lv",
		latitudeFieldName: "Y koordināta",
		longitudeFieldName: "X koordināta",
		delimiter: ";",
		definitionExpression: "'Vieta' = 'Krustpils'"
	});
	csv.latitudeFieldName = "Y koordināta";
	csv.longitudeFieldName = "X koordināta";
	csv.delimiter = ";";
	var orangeRed = new Color([238, 69, 0, 0.5]); // hex is #ff4500
	var marker = new SimpleMarkerSymbol("solid", 15, null, orangeRed);
	var renderer = new SimpleRenderer(marker);
	csv.setRenderer(renderer);
	var template = new InfoTemplate("${Nosaukums}", "${Adrese}","${Kategorija}");
	csv.setInfoTemplate(template);
	map.addLayer(csv);
	});
}

const puppeteer = require('puppeteer');

async function scrapeProduct(url) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url);

	let texts = await page.evaluate(() => {
		let data = [];		
		var imgRegEx = /<img.*?src="(.*?)"[^>]+>/g;
		let elements = document.getElementsByTagName('tr');
		for (var element of elements)
		{
			if (element.innerHTML.includes('class="msga2 pp0"'))
			{
				imgData = element.innerHTML.match(imgRegEx);
				data.push(imgData);
				createElements();
			}
		}
		return data;
	});
		
	console.log(texts);	
	browser.close();
}

scrapeProduct('https://www.ss.lv/lv/real-estate/flats/rezekne-and-reg/sell/');

function createElements(){
	for (let i = 0; i < data.length; i++) {			
		let element = document.createElement('div');
		element.className = 'galeryItem';
		
		var string1 = String('<img src = ') + String(imgData[1]) + String('class="galery_img">');

		element.innerHTML = string1;
		
		let galleryMain = document.getElementById("mainGallery");
		galleryMain.appendChild(element);
	}
}
window.onload=scrapeProduct(url);