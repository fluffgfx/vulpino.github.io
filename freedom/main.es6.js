const TimeWrapper = React.createClass({
	getInitialState() {
		return { time: new Date() }
	},

	componentDidMount() {
		setInterval(this.tick, 1000)
	},

	tick() {
		this.setState({ time: new Date()  })
		setInterval(this.tick, 1000)
	},

	shouldComponentUpdate(nextProps, nextState) {
		return (nextState.time.getDay() !== this.state.time.getDay()) ||
			(nextState.time.getHours() !== this.state.time.getHours()) ||
			(nextState.time.getMinutes() !== this.state.time.getMinutes())
	},

	render() {
		return (
			<div className='dateWrapper'>
				{React.Children.map(this.props.children, (c) => React.cloneElement(c, this.state))}
			</div>
		)
	}
})

const Main = React.createClass({
	getInitialState() {
		return {
			dayString: `${Math.round((this.props.time-this.props.start)/(1000*60*60*24))}th`,
			daysLeft: `${Math.round((this.props.end-this.props.time)/(1000*60*60*24))}`,
			hoursString: `${Math.round((this.props.end-this.props.time)/(1000*60*60)%24)}`,
			minutesString: `${Math.round((this.props.end-this.props.time)/(1000*60)%60)}`
		}
	},

	componentWillReceiveProps(nextProps) {
		this.setState({
			dayString: `${Math.round((nextProps.time-nextProps.start)/(1000*60*60*24))}th`,
			daysLeft: `${Math.round((nextProps.end-nextProps.time)/(1000*60*60*24))}`,
			hoursString: `${Math.round((nextProps.end-nextProps.time)/(1000*60*60)%24)}`,
			minutesString: `${Math.round((nextProps.end-nextProps.time)/(1000*60)%60)}`
		})
	},

	render() {
		return (
			<div className="vao">
				<div className="vai content">
					<h2>Dawn of</h2>
					<h1>The {this.state.dayString} day</h1>
					<br />
					<h3>{this.state.daysLeft} days, {this.state.hoursString} hours, and {this.state.minutesString} minutes remain.</h3>
				</div>
			</div>
		)
	}
})

const start = new Date(2013, 7, 13)
const end = new Date(2017, 5, 2)

ReactDOM.render(<TimeWrapper><Main start={start} end={end} /></TimeWrapper>, document.getElementById('root'))
