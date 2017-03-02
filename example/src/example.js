var React = require('react');
var ReactDOM = require('react-dom');
var ReactLifeTimeline = require('react-life-timeline');

class App extends React.Component {
	generate_events(cb) {
		let events = [
			{date_start: new Date('1995-01-01'), title: 'Publishes his autobiography "Dreams from my Father"'},
			{date_start: new Date('1997-01-01'), date_end: new Date('2005-01-01'), title: 'Illinois State Senator, representing the 13th District.'},
			{date_start: new Date('1992-01-01'), date_end: new Date('2004-01-01'), title: 'Practices civil rights law and teaches constitutional law at the University of Chicago Law School.'},
			{date_start: new Date('2004-07-27'), title: 'Delivers the keynote address at the Democratic National Convention.'},
			{date_start: new Date('2004-11-02'), title: 'Wins the US Senate race in Illinois, defeating Alan Keyes. It is the first time in history a Senate race is between two African-American candidates.'},
			{date_start: new Date('2006-08-20'), date_end: new Date('2006-09-03'), title: 'Tours five African countries, including a visit to Nyangoma-Kogelo, Kenya, his late father\'s hometown.'},
			{date_start: new Date('2007-02-10'), title: 'Announces his candidacy for president at an event in Springfield, Illinois.'},
			{date_start: new Date('2008-11-04'), title: 'Is elected president of the United States with an estimated 66.7 million popular votes and 365 electoral votes.'},
			{date_start: new Date('2008-12-17'), title: 'Is named Time Magazine\'s "Person of the Year."'},
			{date_start: new Date('2009-01-20'), title: 'Is sworn in as the 44th president of the United States, becoming the first African-American to hold the position.'},
			{date_start: new Date('2009-01-20'), date_end: new Date('2017-01-20'), title: 'POTUS'},
			{date_start: new Date('2017-01-20'), title: 'Leaves the Oval Office after two terms as president.'},
		];
		cb(events);
	}

	render () {
		return (
			<div>
				<h1>Barack Obama</h1>

				<ReactLifeTimeline birthday={new Date("1961-08-04")} get_events={this.generate_events.bind(this)} />

				<small>Source: <a href="http://edition.cnn.com/2012/12/26/us/barack-obama---fast-facts/">CNN</a></small>
			</div>
		);
	}
}

ReactDOM.render(<App />, document.getElementById('app'));
