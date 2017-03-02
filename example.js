require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');
var ReactDOM = require('react-dom');
var ReactLifeTimeline = require('react-life-timeline');

var App = (function (_React$Component) {
	_inherits(App, _React$Component);

	function App() {
		_classCallCheck(this, App);

		_get(Object.getPrototypeOf(App.prototype), 'constructor', this).apply(this, arguments);
	}

	_createClass(App, [{
		key: 'generate_events',
		value: function generate_events(cb) {
			var events = [{ date_start: new Date('1992-01-01'), date_end: new Date('2004-01-01'), title: 'Practices civil rights law and teaches constitutional law at the University of Chicago Law School.', color: '#FC004C' }, { date_start: new Date('1995-01-01'), title: 'Publishes his autobiography "Dreams from my Father"' }, { date_start: new Date('1997-01-01'), date_end: new Date('2005-01-01'), title: 'Illinois State Senator, representing the 13th District.', color: '#95F268' }, { date_start: new Date('2004-07-27'), title: 'Delivers the keynote address at the Democratic National Convention.' }, { date_start: new Date('2004-11-02'), title: 'Wins the US Senate race in Illinois, defeating Alan Keyes. It is the first time in history a Senate race is between two African-American candidates.' }, { date_start: new Date('2006-08-20'), date_end: new Date('2006-09-03'), title: 'Tours five African countries, including a visit to Nyangoma-Kogelo, Kenya, his late father\'s hometown.', color: '#F500F7' }, { date_start: new Date('2007-02-10'), title: 'Announces his candidacy for president at an event in Springfield, Illinois.' }, { date_start: new Date('2008-11-04'), title: 'Is elected president of the United States with an estimated 66.7 million popular votes and 365 electoral votes.' }, { date_start: new Date('2008-12-17'), title: 'Is named Time Magazine\'s "Person of the Year."' }, { date_start: new Date('2009-01-20'), title: 'Is sworn in as the 44th president of the United States, becoming the first African-American to hold the position.' }, { date_start: new Date('2009-01-20'), date_end: new Date('2017-01-20'), title: 'POTUS' }, { date_start: new Date('2017-01-20'), title: 'Leaves the Oval Office after two terms as president.' }];
			cb(events);
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'h1',
					null,
					'Barack Obama - Life by Weeks'
				),
				React.createElement(ReactLifeTimeline, {
					subject_name: 'Barack',
					birthday: new Date("1961-08-04"),
					get_events: this.generate_events.bind(this) }),
				React.createElement(
					'p',
					null,
					React.createElement(
						'small',
						null,
						'Source data: ',
						React.createElement(
							'a',
							{ href: 'http://edition.cnn.com/2012/12/26/us/barack-obama---fast-facts/', target: '_blank' },
							'CNN'
						)
					)
				)
			);
		}
	}]);

	return App;
})(React.Component);

ReactDOM.render(React.createElement(App, null), document.getElementById('app'));

},{"react":undefined,"react-dom":undefined,"react-life-timeline":undefined}]},{},[1]);
