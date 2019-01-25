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
	
	handleChange = address => {
		this.props.input.onChange({ name: address });
	 };

	 handleSelect = address => {
		this.props.input.onChange({ name: address });
		this.props.onSelect(address)
	 };

	render() {
		const {input, width, placeholder, options, meta: {touched, error}} = this.props
		const { input: { value }} = this.props;
		// console.log('THIS PROPS', this.props)
		// console.log('value?', value)
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
					value={value ? value.name || value : ''}
					// value={value ? value : ''}
					onChange={this.handleChange}
					onSelect={this.handleSelect}
					styles={styles}
					>
					{({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
						<div>
						  <input
							 {...getInputProps({
								placeholder: 'Search Places ...',
								className: 'location-search-input',
							 })}
						  />
						  <div className="autocomplete-dropdown-container">
							 {loading && <div>Loading...</div>}
							 {suggestions.map(suggestion => {
								const className = suggestion.active
								  ? 'suggestion-item--active'
								  : 'suggestion-item';
								// inline style for demonstration purpose
								const style = suggestion.active
								  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
								  : { backgroundColor: '#ffffff', cursor: 'pointer' };
								return (
								  <div
									 {...getSuggestionItemProps(suggestion, {
										className,
										style,
									 })}
								  >
									 <span>{suggestion.description}</span>
								  </div>
								);
							 })}
						  </div>
						</div>
					 )}
						
				</PlacesAutocomplete>}
				{touched && error && <Label basic color='red'>{error}</Label>}
			</Form.Field>
		);
	}
}

export default PlaceInput;


 
