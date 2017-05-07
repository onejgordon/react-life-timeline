# React Life Timeline

[![npm version](https://badge.fury.io/js/react-life-timeline.svg)](https://badge.fury.io/js/react-life-timeline)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://jeremy.mit-license.org)

A life by weeks timeline component for React. Inspired by [this post](http://waitbutwhy.com/2014/05/life-weeks.html) on Wait but Why, and busterbenson.com.

## Demo & Examples

Live demo: [onejgordon.github.io/react-life-timeline](http://onejgordon.github.io/react-life-timeline/)

To build the examples locally, run:

```
npm install
npm start
```

Then open [`localhost:8000`](http://localhost:8000) in a browser.


## Installation

The easiest way to use react-life-timeline is to install it from NPM and include it in your own React build process (using [Browserify](http://browserify.org), [Webpack](http://webpack.github.io/), etc).

You can also use the standalone build by including `dist/react-life-timeline.js` in your page. If you use this, make sure you have already included React, and it is available as a global variable.

```
npm install react-life-timeline --save
```


## Usage

Drop the component in with a get_events method that calls a callback with an array of events from a local or API data source.

Each event object should have:

- title: Title of event
- date_start: Date object
- date_end: Date object (optional)
- color: Hex color (optional)
- ongoing: Boolean (If true, event will be rendered through today, default: false)


```
var ReactLifeTimeline = require('react-life-timeline');

<ReactLifeTimeline get_events={this.fetch_events.bind(this)} birthday={new Date('1985-04-04')}></ReactLifeTimeline>
```

And an example get_events function:

```

fetch_events: function(cb) {
	api.get('/api/your-resource', {id: 1}, (res) => {
		cb(res.events);
	});
}

```

### Properties

Either specify a get_events function, or pass in events as props.

* get_events: `void function(callback)`
* events: Optional list of event objects
* birthday (date object)
* birthday_color (hex string)
* subject_name (string, or null for 'I')
* project_days (int, # of days to project into future)


## Development (`src`, `lib` and the build process)

**NOTE:** The source code for the component is in `src`. A transpiled CommonJS version (generated with Babel) is available in `lib` for use with node.js, browserify and webpack. A UMD bundle is also built to `dist`, which can be included without the need for any build system.

To build, watch and serve the examples (which will also watch the component source), run `npm start`. If you just want to watch changes to `src` and rebuild `lib`, run `npm run watch` (this is useful if you are working with `npm link`).

Thanks to JedWatson's incredibly easy to use: https://github.com/JedWatson/generator-react-component

## License

Copyright (c) 2017 Jeremy Gordon.

