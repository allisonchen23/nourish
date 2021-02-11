// import { API_KEY } from './assets/constants'
// const fs = require('fs')

// const data = {
// 	query: "raw",
// 	dataType: [
// 	  "Foundation",
// 	  "SR Legacy"
// 	],
// 	pageSize: 10000,
// 	sortBy: "fdcId",
//   };

// function filterFruitsVeggies(food_array) {
// let raw_foods = [];
// for (let item of food_array) {
//     if (item.scientificName) {
//         raw_foods.push(item);
//     }
// }
// return raw_foods;
// }

// function create_db () {
//     let xhr = new XMLHttpRequest();
//     xhr.addEventListener('load', () => {
//         let results = JSON.parse(xhr.responseText);
//         results = filterFruitsVeggies(results.foods);
//         console.log(results);
//         fs.writeFile("FoodDB.json", results, function(err) {
//             if (err) {
//                 console.log(err);
//             }
//         })
//     })
//     let searchURL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY;
//     xhr.open('POST', searchURL);

//     xhr.setRequestHeader("Content-Type", "application/json");    
//     xhr.send(JSON.stringify(data));
// }

// create_db();