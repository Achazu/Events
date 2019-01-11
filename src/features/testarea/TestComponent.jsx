import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button, Icon } from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
 } from 'react-places-autocomplete';
import { incrementCounter, decrementCounter } from './testActions';
import GoogleMapReact from 'google-map-react';

// test matches to rootReducer.js
const mapState = (state) => ({
	data: state.test.data
});

// dispatch action in reality
const actions = {
	incrementCounter,
	decrementCounter
}

const Marker = () => <Icon name='marker' suze='big' color='red'/>

class TestComponent extends Component {
	static defaultProps = {
		center: {
		  lat: 59.95,
		  lng: 30.33
		},
		zoom: 11
	 };s

	state = { 
		address: '',
		scriptLoaded: false
	};

	handleScriptLoad = () => {
		this.setState({scriptLoaded: true})
	}

	handleScriptCreate() {
		this.setState({ scriptLoaded: false })
	 }
	  
	 handleScriptError() {
		this.setState({ scriptError: true })
	 }

	handleChange = address => {
		this.setState({ address });
	 };

	handleSelect = address => {
		geocodeByAddress(address)
		  .then(results => getLatLng(results[0]))
		  .then(latLng => console.log('Success', latLng))
		  .catch(error => console.error('Error', error));
	 };

	
	render() {

		const renderFunc = ({ getInputProps, getSuggestionItemProps, suggestions }) => (
			<div className="autocomplete-root">
			  <input {...getInputProps()} />
			  <div className="autocomplete-dropdown-container">
				 {suggestions.map(suggestion => (
					<div {...getSuggestionItemProps(suggestion)}>
					  <span>{suggestion.description}</span>
					</div>
				 ))}
			  </div>
			</div>);
	  
		const { incrementCounter, decrementCounter, data} = this.props;
		return (
			<div>
				<Script
					url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBG5Z69WMRLNz5AJg5YhOkMcmrS8Ignve8&libraries=places'
					onLoad={this.handleScriptLoad}
				/>

				<h1>Test area</h1>
				<h3>The answer is: {this.props.data}</h3>
				<Button onClick={incrementCounter} color='green' content='Increment'/>
				<Button onClick={decrementCounter} color='red' content='Decrement'/>
				<br/><br/>

				<form onSubmit={this.handleFormSubmit}>
				{this.state.scriptLoaded &&
					// <PlacesAutocomplete inputProps={inputProps}/>
					<PlacesAutocomplete 	
					value={this.state.address} 
					onChange={this.handleChange} 
					onSelect={this.handleSelect} 
					>{renderFunc}</PlacesAutocomplete>}
					<button type='submit'>Submit</button>
				</form>
				
				
				
				<div style={{ height: '300px', width: '100%' }}>
				
				<GoogleMapReact
				  bootstrapURLKeys={{ key:'AIzaSyBG5Z69WMRLNz5AJg5YhOkMcmrS8Ignve8'}}
				  defaultCenter={this.props.center}
				  defaultZoom={this.props.zoom}
				>
				  <Marker
					 lat={59.955413}
					 lng={30.337844}
					 text="My Marker"
				  />
				</GoogleMapReact>
			 </div>
			</div>
		);
	}
}

export default connect(mapState, actions)(TestComponent);