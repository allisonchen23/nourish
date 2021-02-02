const API_KEY = 'pXggN0NWEeqL49apXBpvix2U0vAy4kKcGtJhi2Py';

const foodSearchBody = {
  query: "banana blueberries broccoli",
  dataType: [
    "Foundation",
    "SR Legacy"
  ],
  pageSize: 25,
  pageNumber: 1,
  // sortBy: "foodNutrients.nutrientName.keyword",
};
/*
  sortBy options:
    - "fdcId"
    - "lowercaseDescription.keyword"
    - "dataType.keyword"
    - ""
*/
async function hitDB(query_string) {
  // let data = foodSearchBody;
  // data["query"] = query_string;
  // console.log(data);
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

  // let url = `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${API_KEY}`;
  // data = {
  //   query: 'ice cream'
  // }
}

export default hitDB;
