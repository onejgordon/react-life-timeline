var React = require('react');
var ReactDOM = require('react-dom');
var ReactLifeTimeline = require('react-life-timeline');

class App extends React.Component {

	constructor(props) {
		super(props);
		this.state = {
			events: [],
			lookup: {},
			loaded: false,
			today: new Date(),
			events_added: 0,
			timeout_id: null
		};
		this.EVENTS = [
			{date_start: new Date('1992-01-01'), date_end: new Date('2004-01-01'), title: 'Practices civil rights law and teaches constitutional law at the University of Chicago Law School.', color: '#FC004C'},
			{date_start: new Date('1995-01-01'), title: 'Publishes his autobiography "Dreams from my Father"'},
			{date_start: new Date('1997-01-01'), date_end: new Date('2005-01-01'), title: 'Illinois State Senator, representing the 13th District.', color: '#95F268'},
			{date_start: new Date('2004-07-27'), title: 'Delivers the keynote address at the Democratic National Convention.'},
			{date_start: new Date('2004-11-02'), title: 'Wins the US Senate race in Illinois, defeating Alan Keyes. It is the first time in history a Senate race is between two African-American candidates.'},
			{date_start: new Date('2006-08-20'), date_end: new Date('2006-09-03'), title: 'Tours five African countries, including a visit to Nyangoma-Kogelo, Kenya, his late father\'s hometown.', color: '#F500F7'},
			{date_start: new Date('2007-02-10'), title: 'Announces his candidacy for president at an event in Springfield, Illinois.'},
			{date_start: new Date('2008-11-04'), title: 'Is elected president of the United States with an estimated 66.7 million popular votes and 365 electoral votes.'},
			{date_start: new Date('2008-12-17'), title: 'Is named Time Magazine\'s "Person of the Year."'},
			{date_start: new Date('2009-01-20'), title: 'Is sworn in as the 44th president of the United States, becoming the first African-American to hold the position.'},
			{date_start: new Date('2009-01-20'), date_end: new Date('2017-01-20'), title: 'POTUS'},
			{date_start: new Date('2017-01-20'), title: 'Leaves the Oval Office after two terms as president.'},
		];
	}

	generate_events(cb) {
		cb(this.EVENTS);
	}

	componentDidMount() {
		this.add_incremental_event();
	}

	add_incremental_event(force_index) {
		let {events_added} = this.state;
		let next_index = force_index == null ? events_added+1 : force_index;
		if (next_index < this.EVENTS.length) {
			this.setState({events_added: next_index}, () => {
				let timeout_id = window.setTimeout(this.add_incremental_event.bind(this), 1000);
				this.setState({timeout_id: timeout_id});
			});
		}
	}

	incremental_events() {
		return this.EVENTS.slice(0, this.state.events_added);
	}

	restart_incremental() {
		let {timeout_id} = this.state;
		if (timeout_id != null) window.clearInterval(timeout_id);
		this.add_incremental_event(0);
	}

	render () {
		return (
			<div>
				<h1>Barack Obama - Life by Weeks</h1>

				<ReactLifeTimeline
						subject_name="Barack"
						birthday={new Date("1961-08-04")}
						get_events={this.generate_events.bind(this)} />

				<h2>Adding Incrementally via props</h2>

				<ReactLifeTimeline
						subject_name="Barack"
						birthday={new Date("1961-08-04")}
						events={this.incremental_events()} />
				<p>
					<a href="javascript:void(0)" onClick={this.restart_incremental.bind(this)}>Restart</a>
				</p>

				<p>
					<small>Source data: <a href="http://edition.cnn.com/2012/12/26/us/barack-obama---fast-facts/" target="_blank">CNN</a></small>
				</p>

			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
