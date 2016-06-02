"use strict";

var TimeWrapper = React.createClass({
	displayName: "TimeWrapper",
	getInitialState: function getInitialState() {
		return { time: new Date() };
	},
	componentDidMount: function componentDidMount() {
		setInterval(this.tick, 1000);
	},
	tick: function tick() {
		this.setState({ time: new Date() });
		setInterval(this.tick, 1000);
	},
	shouldComponentUpdate: function shouldComponentUpdate(nextProps, nextState) {
		return nextState.time.getDay() !== this.state.time.getDay() || nextState.time.getHours() !== this.state.time.getHours() || nextState.time.getMinutes() !== this.state.time.getMinutes();
	},
	render: function render() {
		var _this = this;

		return React.createElement(
			"div",
			{ className: "dateWrapper" },
			React.Children.map(this.props.children, function (c) {
				return React.cloneElement(c, _this.state);
			})
		);
	}
});

var Main = React.createClass({
	displayName: "Main",
	getInitialState: function getInitialState() {
		return {
			dayString: Math.round((this.props.time - this.props.start) / (1000 * 60 * 60 * 24)) + "th",
			daysLeft: "" + Math.round((this.props.end - this.props.time) / (1000 * 60 * 60 * 24)),
			hoursString: "" + Math.round((this.props.end - this.props.time) / (1000 * 60 * 60) % 24),
			minutesString: "" + Math.round((this.props.end - this.props.time) / (1000 * 60) % 60)
		};
	},
	componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
		this.setState({
			dayString: Math.round((nextProps.time - nextProps.start) / (1000 * 60 * 60 * 24)) + "th",
			daysLeft: "" + Math.round((nextProps.end - nextProps.time) / (1000 * 60 * 60 * 24)),
			hoursString: "" + Math.round((nextProps.end - nextProps.time) / (1000 * 60 * 60) % 24),
			minutesString: "" + Math.round((nextProps.end - nextProps.time) / (1000 * 60) % 60)
		});
	},
	render: function render() {
		return React.createElement(
			"div",
			{ className: "vao" },
			React.createElement(
				"div",
				{ className: "vai content" },
				React.createElement(
					"h2",
					null,
					"Dawn of"
				),
				React.createElement(
					"h1",
					null,
					"The ",
					this.state.dayString,
					" day"
				),
				React.createElement("br", null),
				React.createElement(
					"h3",
					null,
					this.state.daysLeft,
					" days, ",
					this.state.hoursString,
					" hours, and ",
					this.state.minutesString,
					" minutes remain."
				)
			)
		);
	}
});

var start = new Date(2013, 7, 13);
var end = new Date(2017, 5, 2);

ReactDOM.render(React.createElement(
	TimeWrapper,
	null,
	React.createElement(Main, { start: start, end: end })
), document.getElementById('root'));
