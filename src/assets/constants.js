const COLORS = {
    background: 'white'
};

const FRUIT_OPTIONS = [
    {value: 'apples', label: "Apples"},
    {value: 'bananas', label: "Bananas"},
    {value: 'blueberries', label: "blueberries"},
    {value: 'kiwis', label: "Kiwis"},
    {value: 'ruby red grapefruit', label: "ruby red grapefruit"},
];

const API_KEY = 'pXggN0NWEeqL49apXBpvix2U0vAy4kKcGtJhi2Py';
const FOOD_SEARCH_BODY = {
	query: "banana blueberries broccoli",
	dataType: [
	  "Foundation",
	  "SR Legacy"
	],
	pageSize: 100,
	sortBy: "fdcId",
  };

export { 
    COLORS,
    FRUIT_OPTIONS,
    API_KEY,
    FOOD_SEARCH_BODY
}