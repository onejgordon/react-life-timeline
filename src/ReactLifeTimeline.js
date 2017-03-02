var React = require('react');
import { FontIcon } from 'material-ui';
var util = require('utils/util');
var api = require('utils/api');
var ReactTooltip = require('react-tooltip');

export default class ReactLifeTimeline extends React.Component {
  static defaultProps = {
    birthday: null, // Date object
    project_days: 200, // Days into future to project,
    get_events: (cb) => {
    	// Function to get events (e.g. via API resource)
    	cb([]);
    }
  }

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      lookup: {},
      loaded: false,
      today: new Date()
    };
  }

  componentDidMount() {
    this.props.get_events(this.got_events.bind(this));
  }

  got_events(events) {
  	this.setState({events: events});
  }

  generate_lookup() {
    // Generate lookup (event list for each date, by ISO date)
    let lookup = {};
    this.all_weeks((week_start, week_end) => {
      lookup[util.printDateObj(week_start)] = this.get_events_in_week(week_start, week_end);
    });
    console.log(lookup);
    this.setState({lookup});
  }

  get_events_in_week(week_start, week_end) {
    let {events, today} = this.state;
    let {birthday} = this.props;
    let this_week = today >= week_start && today <= week_end;
    let color = null;
    let single = false; // Has single events
    let _events = events.filter((e) => {
      let estart = new Date(e.date_start);
      let eend = new Date(e.date_end);
      let start_in_week = estart >= week_start && estart <= week_end;
      let end_in_week = eend >= week_start && eend <= week_end;
      let event_spans_week = estart <= week_start && eend >= week_end;
      let in_week = start_in_week || end_in_week || event_spans_week;
      if (in_week) {
        if (e.color) color = e.color;
        if (e.single) single = true;
      }
      return in_week;
    });
    if (birthday) {
      let age = 0;
      let bd_in_week = false;
      let week_isos = [];
      while (week_start < week_end) {
        if (week_start.getMonth() == birthday.getMonth() && week_start.getDate() == birthday.getDate()) {
          bd_in_week = true;
          age = week_start.getFullYear() - birthday.getFullYear();
          break;
        }
        week_start.setDate(week_start.getDate() + 1);
      }
      if (bd_in_week) {
        color = "#F89542";
        let title = age == 0 ? "I am born!" : `I turn ${age} on ${birthday.getMonth()+1}/${birthday.getDate()}`;
        _events.push({title: title, color: color});
      }
    }
    if (this_week) {
      color = 'white';
      _events.push({title: "This week", color: color});
    }
    return {
      events: _events,
      color: color,
      single: single
    }
  }

  all_weeks(fn) {
    let {birthday} = this.props;
    let {today} = this.state;
    let end = new Date(today.getTime());
    end.setDate(end.getDate() + this.props.project_days);
    let cursor = new Date(birthday.getTime());
    let weeks = [];
    while (cursor <= end) {
      let birthday = new Date(cursor.getTime());
      cursor.setDate(cursor.getDate() + 7);
      fn(birthday, new Date(cursor.getTime()));
    }
  }

  render_week(date_start, date_end) {
    let date = util.printDateObj(date_start);
    let {today} = this.state;
    let res = this.state.lookup[date];
    let _single;
    let events = [];
    let color;
    let single = false;
    if (res != null) {
      ({events, color, single} = res);
    }
    let future = date_start > today;
    let st = {};
    if (events.length > 0) st.backgroundColor = color || '#1AA9FF';
    let tips = [date].concat(events.map((e) => {
      return e.title;
    }));
    let cls = 'week';
    if (future) cls += ' future';
    if (single) _single = <span className="singleEvents"></span>;
    return <div className={cls} key={date} style={st} data-tip={tips.join(', ')}>{_single}</div>;
  }

  render_all_weeks() {
    let weeks = [];
    this.all_weeks((start, end) => {
      weeks.push(this.render_week(start, end));
    });
    return weeks;
  }

  render() {
    return (
      <div>
        <ReactTooltip place="top" effect="solid" />
        <div className="LifeTimeline">
          { this.render_all_weeks() }
        </div>
      </div>
    );
  }
}
