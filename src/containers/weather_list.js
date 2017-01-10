import React, { Component } from 'react';
import { connect } from 'react-redux';
import Chart from '../components/chart';
import GoogleMap from '../components/google_map';

class WeatherList extends Component {
	renderWeather(cityData) {
		const name = cityData.city.name;
		const { lon, lat } = cityData.city.coord;
		const temps = _.map(cityData.list.map(weather => weather.main.temp), (temp) => temp - 273.15);
		const pressures = cityData.list.map(weather => weather.main.pressure);
		const humidities = cityData.list.map(weather => weather.main.humidity);

		return (
			<tr key={name} >
				<td>
					<GoogleMap lon={lon} lat={lat} />
				</td>
				<td className="td">
					<Chart data={temps} color="blue" units="C" />
				</td>
				<td className="td">
					<Chart data={pressures} color="green" units="hPa" />
				</td>
				<td className="td">
					<Chart data={humidities} color="orange" units="%" />
				</td>
			</tr>
		);
	}

	render() {
		return (
			<table className="table table-hover">
				<thead>
					<tr>
						<th>City</th>
						<th>Themperature (C)</th>
						<th>Pressure (hPa)</th>
						<th>Humidity (%)</th>
					</tr>
				</thead>
				<tbody>
					{this.props.weather.map(this.renderWeather)}
				</tbody>
			</table>
		);
	}
}

function mapStateToProps({ weather }) {
	return { weather }; // => {weather : weather}
}

export default connect(mapStateToProps)(WeatherList);