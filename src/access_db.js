const API_KEY = 'pXggN0NWEeqL49apXBpvix2U0vAy4kKcGtJhi2Py';

async function hitDB() {
    let xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        let results = JSON.parse(xhr.responseText);
        console.log(results);
    })

    // xhr.open('GET', 'https://developer.nrel.gov/api/alt-fuel-stations/v1.json?limit=1&api_key=' + API_KEY)
    xhr.open('GET', "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=pXggN0NWEeqL49apXBpvix2U0vAy4kKcGtJhi2Py&query=cheddar%20cheese");
    xhr.send();
    console.log('HI')
}

export default hitDB;

// curl -X GET "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=pXggN0NWEeqL49apXBpvix2U0vAy4kKcGtJhi2Py&query=cheddar%20cheese" -H "accept: application/json"