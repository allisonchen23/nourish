import { Component } from 'react';
import Select from 'react-select'
import './css/global.css';
import {API_KEY, FOOD_SEARCH_BODY, CATEGORY_ENUMS} from './assets/constants'
// import create_db from './create_db';
import query from './access_db';

// import FRUIT_OPTIONS from './assets/constants'

const FRUIT_OPTIONS = [
	{value: 'apples', label: "Apples"},
	{value: 'bananas', label: "Bananas"},
	{value: 'blueberries', label: "Blueberries"},
	{value: 'strawberries', label: "Strawberries"},
	{value: 'grapefruit', label: "Grapefruit"},
];

const VEGE_OPTIONS = [
	{value: 'cauliflower', label: "Cauliflower"},
	{value: 'celery', label: "Celery"},
	{value: 'carrots', label: "Carrots"},
	{value: 'spinach', label: "Spinach"},
	{value: 'radishes', label: "Radishes"},
];

const PROTEIN_OPTIONS = [
	{value: 'chicken', label: "Chicken"},
	{value: 'pork', label: "Pork"},
	{value: 'beef', label: "Beef"},
	{value: 'eggs', label: "Eggs"},
	{value: 'fish', label: "Fish"},
	{value: 'shrimp', label: "Shrimp"},
]

class Questionnaire extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			age: -1,
			sex: "",
			location: "",
			foods: {
				0: [],
				1: [],
				2: [],
			},
			fruits: [],
			vegetables: [],
			protein: [],
			raw_results: null,
		}
	}

	onMultiSelectChange = (opt, category_enum) => {
		let cur_items = [];
		opt.forEach((item) => {
			cur_items.push(item.value)
		})
		console.log(cur_items)
		
		if (category_enum === CATEGORY_ENUMS.fruit) {
			this.setState({fruits: cur_items})
		}

		else if (category_enum === CATEGORY_ENUMS.vegetables) {
			this.setState({vegetables: cur_items})
		}

		else if (category_enum === CATEGORY_ENUMS.protein) {
			this.setState({protein: cur_items})
		}
		
	}

	findFood(food_array, query) {
		let raw_foods = [];
		for (let item of food_array) {
			if (item.scientificName && item.description.toLowerCase().includes(query)) {
				raw_foods.push(item);
			}
		}
		return raw_foods;
	}

	renderRawFoods(raw_foods=null) {
		if (raw_foods == null) {
			return(
				<p>No Results</p>
			)
		}
		else {
			let items = this.state.raw_results.map((item) => {
				return <li key={item.description}>{item.description}</li>
			})
			return(
				<ul>
					{items}
				</ul>
			)
		}

	}
	async search_DB() {
		let items = this.state.fruits.concat(this.state.vegetables);
		items = items.concat(this.state.protein);
		let query_raw_matches = [];
		items.forEach(async (item) => {
			let data = FOOD_SEARCH_BODY;
			data["query"] = item;
			let xhr = new XMLHttpRequest();
			xhr.addEventListener('load', () => {
				let results = JSON.parse(xhr.responseText);
				console.log(results);
				let raw_matches = this.findFood(results.foods, item);
				query_raw_matches = query_raw_matches.concat(raw_matches);
				console.log(query_raw_matches) //check for no scientific name!!
				this.setState({raw_results: query_raw_matches});
			})
			let searchURL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY;
			xhr.open('POST', searchURL);
  
			xhr.setRequestHeader("Content-Type", "application/json");    
			xhr.send(JSON.stringify(data));
		})
	}
	render() {
		return (
			<div className="body">
				<div className='section'>
					<header className="header">
						Basic information:
					</header>
				</div>

				{/* Consumption */}
				<div className='section'>
					{/* Fruit */}
					<header className="header">
						Fruit Consumption:
					</header>
					<p>
						Which of the following do you eat at least once a week?
					</p>
					<Select isMulti options={FRUIT_OPTIONS} onChange={(opt) => this.onMultiSelectChange(opt, CATEGORY_ENUMS.fruit)} />

					{/* Vegetables */}
					<header className="header">
						Vegetable Consumption:
					</header>
					<p>
						Which of the following do you eat at least once a week?
					</p>
					<Select isMulti options={VEGE_OPTIONS} onChange={(opt) => this.onMultiSelectChange(opt, CATEGORY_ENUMS.vegetables)} />
					
					{/* Protein */}
					{/* <header className="header">
						Protein Consumption:
					</header>
					<p>
						Which of the following do you eat at least two to three times a week?
					</p>
					<Select isMulti options={PROTEIN_OPTIONS} onChange={(opt) => this.onMultiSelectChange(opt, CATEGORY_ENUMS.protein)} /> */}

					{/* Submit button */}
					<div className="center_button">
						<button className="button" onClick={() => {this.search_DB()}}>
							Submit
						</button>
					</div>

					<div className="center_button">
						<button className="button" onClick={() => {query("plantain")}}>
							Make Query
						</button>
					</div>
				</div>

				{/* Results */}
				<div className='section'>
					{/* <header className="header">
						Vegetable Consumption:
					</header>
					<p>
						Which of the following do you eat at least once a week?
					</p>
					<Select isMulti options={VEGE_OPTIONS} onChange={(opt) => this.onMultiSelectChange(opt, CATEGORY_ENUMS.vegetables)} />
					<div className="center_button">
						<button className="button" onClick={() => {this.search_DB(CATEGORY_ENUMS.vegetables)}}>
							Submit
						</button>
					</div> */}
					<header className="header">
						Results
					</header>
					<div>
						{this.renderRawFoods(this.state.raw_results)}
					</div>
				</div>
			</div>
		)
	}
}

export default Questionnaire;