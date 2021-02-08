import { Component } from 'react';
import Select from 'react-select'
import './css/global.css';
import {API_KEY, FOOD_SEARCH_BODY} from './assets/constants'
import query from './access_db';

// import FRUIT_OPTIONS from './assets/constants'

const FRUIT_OPTIONS = [
	{value: 'apples', label: "Apples"},
	{value: 'bananas', label: "Bananas"},
	{value: 'blueberries', label: "Blueberries"},
	{value: 'strawberries', label: "Strawberries"},
	{value: 'ruby red grapefruit', label: "Ruby red grapefruit"},
];



class Questionnaire extends Component {
	constructor() {
		super();

		this.state = {
			name: "",
			age: -1,
			sex: "",
			location: "",
			fruits: [],
			vegetables: {},
			raw_results: null,
		}
	}

	onMultiSelectChange = (opt) => {
		let cur_fruits = [];
		opt.forEach((item) => {
			cur_fruits.push(item.value)
		})
		console.log(cur_fruits)
		// go through opt and see what's not in the fruit set
		this.setState({fruits: cur_fruits})
	}

	findFood(food_array) {
		let raw_foods = [];
		for (let item of food_array) {
			if (item.scientificName) {
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
				return <li>{item.description}</li>
			})
			return(
				<ul>
					{items}
				</ul>
			)
		}

	}
	async search_DB() {
		let fruits = this.state.fruits;
		let query_raw_matches = [];
		fruits.forEach(async (item) => {
			let data = FOOD_SEARCH_BODY;
			data["query"] = item;
			let xhr = new XMLHttpRequest();
			xhr.addEventListener('load', () => {
				let results = JSON.parse(xhr.responseText);
				console.log(results);
				let raw_matches = this.findFood(results.foods);
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
			<div>
				<div className='section'>
					<header className="header">
						Basic information:
					</header>
				</div>

				<div className='section'>
					<header className="header">
						Fruit Consumption:
					</header>
					<p>
						Which of the following do you eat at least once a week?
					</p>
					<Select isMulti options={FRUIT_OPTIONS} onChange={this.onMultiSelectChange} />
					<button onClick={() => {this.search_DB()}}>
						Submit
					</button>
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