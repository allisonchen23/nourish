import { Component } from 'react';
import Select from 'react-select'
import './css/global.css';
import './css/form.css';
import {API_KEY, FOOD_SEARCH_BODY, CATEGORY_ENUMS, BACKEND_URL} from './assets/constants'
import recs from './final_recs'
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form'
const fs = require('fs')

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
			foods_eaten: null,
			recs: null,//["Tomatoes", "Winged beans", "Nuts"],
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

	renderRecs() {
		let recs = this.state.recs;
		if (recs == null) {
			return(
				<p>No Results</p>
			)
		}
		
		else {
			let items = recs.map((item) => {
				return <li key={item}>{item}</li>
			})
			return(
				<>
					<p>
						Based on the input provided, it would be beneficial to consume more of the following: 
					</p>
					<ul>
						{items}
					</ul>
					<Link to={{pathname: "/twitter",
							   data: this.state.recs}}>
						<div className="center_button">
							<button className="button">
								Take me to Twitter!
							</button>
						</div>
					</Link>
				</>
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
				this.obtainRecs(query_raw_matches);
				this.setState({foods_eaten: query_raw_matches});
			})
			let searchURL = "https://api.nal.usda.gov/fdc/v1/foods/search?api_key=" + API_KEY;
			xhr.open('POST', searchURL);
  
			xhr.setRequestHeader("Content-Type", "application/json");    
			xhr.send(JSON.stringify(data));
		})
	}

	async obtainRecs(foods_eaten) {
		// let foods_eaten = this.state.foods_eaten;
		if (foods_eaten == null) {
			return;
		}
		let foods_eaten_set = new Set();
		for (let idx in foods_eaten) {
			console.log(foods_eaten[idx]['description'])
			foods_eaten_set.add(foods_eaten[idx]['description'])
		}
		let foods_eaten_arr = Array.from(foods_eaten_set);
		console.log(foods_eaten_arr)
		let xhr = new XMLHttpRequest();
		let data = {
			action: "recommendation",
			foods: foods_eaten_arr
		}
		console.log(data)
		xhr.addEventListener('load', () => {
			console.log(xhr.responseText)
			let results_set = new Set(JSON.parse(xhr.responseText));
			let recs = Array.from(results_set);
			this.setState({recs: recs});

		});
		let searchURL = "http://localhost:5000";
		xhr.open('POST', searchURL);
		console.log("hitting flask api with: " + data)
		xhr.setRequestHeader("Content-Type", "application/json");    
		xhr.send(JSON.stringify(data));
	}

	renderForm() {
		return(
			<form className="form">
				<label className="form_item">
					First Name: 
					<input className="form_input" type="text" name="first name" />
					Last Name: 
					<input className="form_input" type="text" name="last name" />
				</label>
				<br/>
				<label className="form_item">
					Sex: 
					<select className="form_input">
						<option>Male</option>
						<option>Female</option>
						<option>Prefer not to say</option>
					</select>
				</label>
				<br/>
				<label className="form_item">
					Weight: 
					<input className="form_input" type="text" name="weight" />
					pounds
				</label>
				<br/>
				<label className="form_item">
					Height: 
					<input type="text" className="form_input" name="height(ft)" />
					feet
					<input type="text" className="form_input" name="height(in)" />
					inches
				</label>
				<br/>
				<a href='#consumption'>
					<button className="button">
						Continue
					</button>
				</a>
			</form>
			
			// <Form>
			// 	<Form.Group controlId="firstName">
			// 		<Form.Label>First name</Form.Label>
			// 		<Form.Control type="first name" placeholder="First Name" />
			// 	</Form.Group>
			// </Form>
		)
	}
	render() {
		return (
			<div className="body">
				<div className='section'>
					<header className="header">
						Basic information:
					</header>
					{this.renderForm()}
					{/* <header className="header">
						Keep scrolling to continue!
					</header> */}
				</div>

				{/* Consumption */}
				<div className='section' id={'consumption'}>
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
					
					{/* Submit button */}
					<div className="center_button">
						<a href="#results">
							<button className="button" onClick={() => {this.search_DB()}}>
								Submit
							</button>
						</a>
					</div>
				</div>

				{/* Results */}
				<div className='section' id={'results'}>
					<header className="header">
						Results
					</header>
					<div>
						{/* <div className="center_button">
							<button className="button" onClick={() => {this.obtainRecs()}}>
								Render Results
							</button>
						</div> */}
						{this.renderRecs(this.state.foods_eaten)}
					</div>
				</div>
			</div>
		)
	}
}

export default Questionnaire;