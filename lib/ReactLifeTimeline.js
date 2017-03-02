'use strict';

Object.defineProperty(exports, '__esModule', {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactTooltip = require('react-tooltip');

var ReactLifeTimeline = (function (_React$Component) {
	_inherits(ReactLifeTimeline, _React$Component);

	function ReactLifeTimeline(props) {
		_classCallCheck(this, ReactLifeTimeline);

		_get(Object.getPrototypeOf(ReactLifeTimeline.prototype), 'constructor', this).call(this, props);
		this.state = {
			events: [],
			lookup: {},
			loaded: false,
			today: new Date()
		};
	}

	_createClass(ReactLifeTimeline, [{
		key: 'componentDidMount',
		value: function componentDidMount() {
			this.props.get_events(this.got_events.bind(this));
		}
	}, {
		key: 'got_events',
		value: function got_events(events) {
			this.setState({ events: events, loaded: true }, this.generate_lookup.bind(this));
		}
	}, {
		key: 'print_date',
		value: function print_date(date) {
			var d = date.getDate();
			var month = date.getMonth() + 1;
			var day = d < 10 ? '0' + d : '' + d;
			if (month < 10) month = '0' + month;
			return date.getFullYear() + "-" + month + "-" + day;
		}
	}, {
		key: 'generate_lookup',
		value: function generate_lookup() {
			var _this = this;

			// Generate lookup (event list for each date, by ISO date)
			var lookup = {};
			this.all_weeks(function (week_start, week_end) {
				lookup[_this.print_date(week_start)] = _this.get_events_in_week(week_start, week_end);
			});
			this.setState({ lookup: lookup });
		}
	}, {
		key: 'single_event',
		value: function single_event(e) {
			return e.single || !e.date_end || e.date_start == e.date_end;
		}
	}, {
		key: 'get_events_in_week',
		value: function get_events_in_week(week_start, week_end) {
			var _this2 = this;

			var _state = this.state;
			var events = _state.events;
			var today = _state.today;
			var _props = this.props;
			var birthday = _props.birthday;
			var subject_name = _props.subject_name;

			var this_week = today >= week_start && today <= week_end;
			var color = null;
			var single = false; // Has single events
			var _events = events.filter(function (e) {
				var estart = new Date(e.date_start);
				var eend = new Date(e.date_end);
				var start_in_week = estart >= week_start && estart <= week_end;
				var end_in_week = eend >= week_start && eend <= week_end;
				var event_spans_week = estart <= week_start && eend >= week_end;
				var in_week = start_in_week || end_in_week || event_spans_week;
				if (in_week) {
					if (e.color) color = e.color;
					if (_this2.single_event(e)) single = true;
				}
				return in_week;
			});
			if (birthday) {
				var age = 0;
				var bd_in_week = false;
				var week_isos = [];
				while (week_start < week_end) {
					if (week_start.getMonth() == birthday.getMonth() && week_start.getDate() == birthday.getDate()) {
						bd_in_week = true;
						age = week_start.getFullYear() - birthday.getFullYear();
						break;
					}
					week_start.setDate(week_start.getDate() + 1);
				}
				if (bd_in_week) {
					color = this.props.birthday_color;
					var me = subject_name == null;

					var title = undefined;
					var subj = me ? 'I' : subject_name;
					if (age == 0) {
						var verb = me ? 'am' : 'is';
						title = subj + ' ' + verb + ' born!';
					} else {
						var verb = me ? 'turn' : 'turns';
						title = subj + ' ' + verb + ' ' + age + ' on ' + (birthday.getMonth() + 1) + '/' + birthday.getDate();
					}
					_events.push({ title: title, color: color });
				}
			}
			if (this_week) {
				color = 'white';
				_events.push({ title: 'This week', color: color });
			}
			return {
				events: _events,
				color: color,
				single: single
			};
		}
	}, {
		key: 'all_weeks',
		value: function all_weeks(fn) {
			var birthday = this.props.birthday;
			var today = this.state.today;

			var end = new Date(today.getTime());
			end.setDate(end.getDate() + this.props.project_days);
			var cursor = new Date(birthday.getTime());
			var weeks = [];
			while (cursor <= end) {
				var _birthday = new Date(cursor.getTime());
				cursor.setDate(cursor.getDate() + 7);
				fn(_birthday, new Date(cursor.getTime()));
			}
		}
	}, {
		key: 'render_week',
		value: function render_week(date_start, date_end) {
			var date = this.print_date(date_start);
			var today = this.state.today;

			var res = this.state.lookup[date];
			var _single = undefined;
			var events = [];
			var color = undefined;
			var single = false;
			if (res != null) {
				events = res.events;
				color = res.color;
				single = res.single;
			}
			var future = date_start > today;
			var st = {};
			if (events.length > 0) st.backgroundColor = color || '#1AA9FF';
			var tips = [date].concat(events.map(function (e) {
				return e.title;
			}));
			var cls = 'week';
			if (future) cls += ' future';
			if (single) _single = React.createElement('span', { className: 'singleEvents' });
			return React.createElement(
				'div',
				{ className: cls, key: date, style: st, 'data-tip': tips.join(', ') },
				_single
			);
		}
	}, {
		key: 'render_all_weeks',
		value: function render_all_weeks() {
			var _this3 = this;

			var weeks = [];
			this.all_weeks(function (start, end) {
				weeks.push(_this3.render_week(start, end));
			});
			return weeks;
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(ReactTooltip, { place: 'top', effect: 'solid' }),
				React.createElement(
					'div',
					{ className: 'LifeTimeline' },
					this.render_all_weeks()
				)
			);
		}
	}]);

	return ReactLifeTimeline;
})(React.Component);

exports['default'] = ReactLifeTimeline;

ReactLifeTimeline.defaultProps = {
	birthday: null, // Date object
	birthday_color: '#F89542',
	project_days: 200, // Days into future to project,
	subject_name: null, // Person's name (otherwise 'I')
	get_events: function get_events(cb) {
		// Function to get events (e.g. via API resource)
		cb([]);
	}
};
module.exports = exports['default'];