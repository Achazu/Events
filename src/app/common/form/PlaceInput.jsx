import React, { Component } from 'react';
import { Form, Label, Segment } from "semantic-ui-react";
import Script from 'react-load-script'
import PlacesAutocomplete, {
	geocodeByAddress,
	getLatLng,
 } from 'react-places-autocomplete';

const styles = {
	autocompleteContainer: {
		zIndex: 1000
	}
}

class PlaceInput extends Component {
	
	state = {
		address: '',
		scriptLoaded: false 
	}
	handleScriptCreate = () => {
		this.setState({ scriptLoaded: false });
   };
  
   handleScriptError = () => {
		this.setState({ scriptError: true });
   };
  
   handleScriptLoaded = () => {
		this.setState({ scriptLoaded: true });
   };
  
   handleChange = (address) => {
		console.log('address',address)
		this.setState({ address });
   };
	
	render() {
		const {input, width, onSelect, placeholder, options, meta: {touched, error}} = this.props

		const renderFunc = ({ getInputProps, suggestions, getSuggestionItemProps }) => (
			<div>
				 <input
					  {...getInputProps({
						placeholder
					  })}
				  />
				  
				<Segment.Group suggestions={suggestions}>
						{suggestions.map((suggestion) => (
					<Segment {...getSuggestionItemProps(suggestion)}>
						{suggestion.description}
						</Segment>
				))}
				</Segment.Group>
			</div>
	  )

		return (
			<Form.Field error={touched && !!error}>
				<Script
					url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBG5Z69WMRLNz5AJg5YhOkMcmrS8Ignve8&libraries=places'
					onLoad={this.handleScriptLoaded}
				/>	
				{this.state.scriptLoaded &&
				<PlacesAutocomplete
					inputProps={{...input, placeholder}}
					searchOptions={options}
					value={this.state.address}
					onChange={this.handleChange}
					onSelect={onSelect}
					styles={styles}
					>
						{renderFunc}
				</PlacesAutocomplete>}
				{touched && error && <Label basic color='red'>{error}</Label>}
			</Form.Field>
		);
	}
}

export default PlaceInput;


 
