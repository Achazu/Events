import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'semantic-ui-react'
import Script from 'react-load-script'
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
 } from 'react-places-autocomplete';
import { incrementCounter, decrementCounter } from './testActions';
import { openModal } from '../modals/modalActions'


// test matches to rootReducer.js
const mapState = (state) => ({
	data: state.test.data
});

// dispatch action in reality
const actions = {
	incrementCounter,
	decrementCounter,
	openModal
}



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
	  
		const { incrementCounter, decrementCounter, data, openModal} = this.props;
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
				<Button onClick={() => openModal('TestModal', {data: 43})} color='teal' content='Open modal'/>
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
				
				
		
			 </div>
		);
	}
}

export default connect(mapState, actions)(TestComponent);