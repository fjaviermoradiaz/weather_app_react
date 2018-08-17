import React, { Component } from 'react';
import Location from './Location';
import WeatherData from './WeatherData';// encuentra el archivo index de esa carpeta
import transformWeather from '../../services/transformWeather';
import CircularProgress from 'material-ui/CircularProgress';
import PropTypes from 'prop-types';

import './styles.css';
const url = "https://api.openweathermap.org/data/2.5/weather";
const api_key = "57b1e022f886e0d723855fc101373cba";




class WeatherLocation extends Component {

    constructor({ city }) {
        super();
        this.state = {
            city,
            data: null
        }
    }

  
   
    componentWillMount(){
        const { city } = this.state;
        const api_weather = `${url}?q=${city}&appid=${api_key}`;
        fetch(api_weather).then( data => {
            return data.json();
        }).then(weather_data => {
            const data = transformWeather(weather_data);
            this.setState({data}); // = this.setState({data: data}); al ser el mismo nombre de variable
            
        });
    }

    componentDidMount() {
        //console.log("componentDidMount");
    }

    componentWillUpdate() {
        //console.log("componentWillUpdate");
    }

    componentDidUpdate() {
        //console.log("componentDidUpdate");
    }

    render = () => {
        const { onWeatherLocationClick } = this.props;
        const {city, data} = this.state;
        return (
            <div className='weatherLocationCont' onClick={onWeatherLocationClick}>
                <Location city={city}></Location>
                {
                    data ? <WeatherData data={data}></WeatherData> : 
                    <CircularProgress size={60} thickness={7}/>
                 }
            </div>
        );
    };
}

WeatherLocation.propTypes = {
    city: PropTypes.string.isRequired,
    onWeatherLocationClick: PropTypes.func,
}

export default WeatherLocation;