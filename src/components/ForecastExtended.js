import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.css';
import ForecastItem from './ForecastItem';
import transformForecast from './../services/transformForecast';

/*const days = ['Lunes','Martes','Miercoles','Jueves','Viernes']

const data = {
    temperature: 10,
    humidity: 10,
    weatherState: 'normal',
    wind: 'normal',
}*/
const url = "https://api.openweathermap.org/data/2.5/forecast";
const api_key = "57b1e022f886e0d723855fc101373cba";

class ForecastExtended extends Component {

    constructor() {
        super();
        this.state = {
            forecastData: null
        }
    }

    componentDidMount(){
        this.updateCity(this.props.city);
    }

    // Se ejecucta cada vez que se realiza una modificación de las propiedades
    // Se ejecuta siempre excepto la primera vez que se crea el componente
    // Por eso el updateCity se ejecuta también en el componentDidMount
    componentWillReceiveProps(nextProps){
        if(nextProps.city !== this.props.city) {
            this.setState({forecastData: null}); // Para que aparezca el indicador de carga
            this.updateCity(nextProps.city);
        }
    }

    updateCity = city => {
        //fetch o axios, axios es mejor para app en producción
        const url_forecast = `${url}?q=${city}&appid=${api_key}`;
        fetch(url_forecast).then(
            data => (data.json())
        ).then(
            weather_data => {
                const forecastData = transformForecast(weather_data);
                //console.log(forecastData);
                this.setState({ forecastData })
            }
        )
    }

    renderForecastItemDays(forecastData) {
        return forecastData.map( forecast => (
        <ForecastItem 
            key={`${forecast.weekDay}${forecast.hour}`}
            weekDay={forecast.weekDay} 
            hour={forecast.hour} 
            data={forecast.data}>
        </ForecastItem>));
    }

    renderProgress() {
        return <h3>Cargando....</h3>
    }

    render() {
        const { city } = this.props;
        const { forecastData } = this.state;
        return(
            <div>
                <h2 className='forecast-title'>Pronóstico exendido para {city}</h2>
                {
                    forecastData ?
                    this.renderForecastItemDays(forecastData): this.renderProgress()}
            </div>
        )
    }
}

ForecastExtended.propTypes = {
    city: PropTypes.string.isRequired,
}
export default ForecastExtended;