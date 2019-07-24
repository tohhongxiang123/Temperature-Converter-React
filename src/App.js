import React from 'react';
import './App.css';

function Header(props){
  return (
      <div className="header">
        <h1> Temperature Converter </h1>
        <p> Convert between Celsius, Fahrenheit and Kelvin </p>
      </div>
    )
}

class TemperatureInput extends React.Component { //functional compenents use props (pass in props as an argument). class componenets use this.props
  handleChange = (e) => {
    this.props.onTemperatureChange(e.target.value, this.props.scale);
  }

    render() {
      return (
        <div className="temperatureContainer">
          <input type="text" scale={this.props.scale} onChange={this.handleChange} value={this.props.temperature}/> <label htmlFor={this.props.scale}>{this.props.scale.toUpperCase()}</label>
        </div>
      );
    }
}

function toCelsius(temp, scale){
  console.log(temp, scale);
  if (scale === "f"){
    return (temp-32)*5/9;
  } else if (scale === "k") {
    return temp - 273.15;
  }
  
}

function toFahrenheit(temp, scale){
  if (scale === "c"){
    return (temp / 5 * 9) + 32;
  } else if (scale === "k") {
    return temp*9/5 - 459.67
  }
  
}

function toKelvin(temp, scale){
  if (scale==="c"){
    return temp+273;
  } else if (scale==="f"){
    return (temp+459.67)*5/9;
  }
  
}

function tryConvert(temp, convert, scale){
  const input = parseFloat(temp);
  if (Number.isNaN(input)){
    return "";
  } else {
    return (Math.round(convert(input, scale)*100)/100).toString(); // math.round returns nearest integer, so multiplying like this rounds to 2dp
  }
}

class TemperatureBoard extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      temperature: "",
      scale: "c",
    };
    this.handleCelsiusChange = this.handleCelsiusChange.bind(this);
    this.handleFahrenheitChange = this.handleFahrenheitChange.bind(this);
    this.handleKelvinChange = this.handleKelvinChange.bind(this);
  }

  handleCelsiusChange(temperature){
    this.setState({scale:"c", temperature});
  }

  handleFahrenheitChange(temperature){
    this.setState({scale:"f", temperature});
  }

  handleKelvinChange(temperature){
    this.setState({scale:"k", temperature});
  }

  handleChange = (e) => {
    console.log(e.target.value);
  };

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale !== "c" ? tryConvert(temperature, toCelsius, scale) : temperature;
    const fahrenheit = scale !== "f" ? tryConvert(temperature, toFahrenheit, scale) : temperature;
    const kelvin = scale !== "k" ? tryConvert(temperature, toKelvin, scale) : temperature;
    return (
      <div className="temperatureBoard">
        <TemperatureInput scale="c" temperature={celsius} onTemperatureChange={this.handleCelsiusChange}/>
        <TemperatureInput scale="f" temperature={fahrenheit} onTemperatureChange={this.handleFahrenheitChange}/>
        <TemperatureInput scale="k" temperature={kelvin} onTemperatureChange={this.handleKelvinChange}/>
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <TemperatureBoard />
      </div>
      );
  }
}

export default App;
