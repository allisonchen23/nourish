const API_KEY = 'pXggN0NWEeqL49apXBpvix2U0vAy4kKcGtJhi2Py';
// const foodSearchBody = {
//     "query": "iron",
//     "dataType": [
//         "Foundation",
//         "SR Legacy"
//     ],
//     "pageSize": 50,
//     "sortBy": "description",
//     "sortOrder": "asc",
// };

const foodSearchBody = {
    "query": "Cheddar cheese",
    "dataType": [
      "Foundation",
      "SR Legacy"
    ],
    "pageSize": 25,
    "pageNumber": 2,
    "sortBy": "description",
    "sortOrder": "asc",
    "brandOwner": "Kar Nut Products Company"
  }

async function hitDB() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        let results = JSON.parse(xhr.responseText);
        console.log(results);
    })
    let searchURL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY;
    xhr.open('POST', searchURL);
    
    xhr.setRequestHeader("Content-Type", "application/json");    
    xhr.send(JSON.stringify(foodSearchBody));

    // xhr.open('GET', 'https://api.nal.usda.gov/fdc/v1/foods/search?api_key=' + API_KEY + "&query=iron");
    // xhr.send();
}

export default hitDB;
