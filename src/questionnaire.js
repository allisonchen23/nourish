import { Component } from 'react';
import Select from 'react-select'
import './css/global.css';
// import FRUIT_OPTIONS from './assets/constants'

const FRUIT_OPTIONS = [
	{value: 'apples', label: "Apples"},
	{value: 'bananas', label: "Bananas"},
	{value: 'blueberries', label: "Blueberries"},
	{value: 'kiwis', label: "Kiwis"},
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
			fruits: new Set(),
			vegetables: {},
		}
	}

	onMultiSelectChange = (opt) => {
		let cur_fruits = this.state.fruits;
		// go through opt and see what's not in the fruit set
		console.log(opt);
		this.setState({fruits: opt})
		console.log(this.state)
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
						Which of the following do you eat regularly?
					</p>
					<Select isMulti options={FRUIT_OPTIONS} onChange={this.onMultiSelectChange} />
				</div>
			</div>
		)
	}
}

export default Questionnaire;