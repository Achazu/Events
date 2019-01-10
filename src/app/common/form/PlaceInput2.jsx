import React, { Component } from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form, Label, Segment } from 'semantic-ui-react';
import Script from 'react-load-script'

class PlacesInput extends Component {
 state = {
     address: '',
     scriptLoaded: false
 };
 
 handleScriptCreate = () => {
     this.setState({ scriptLoaded: false });
 };
 
 handleScriptError = () => {
     this.setState({ scriptError: true });
 };
 
 handleScriptLoad = () => {
     this.setState({ scriptLoaded: true });
 };
 
 handleChange = (address) => {
     this.setState({ address });
 };
 
 render() {
     const {
         input,
         width,
         placeholder,
         onSelect,
         meta: { touched, error }
         } = this.props;
     return (
			
		<Form.Field error={touched && !!error} width={width}>

		<script type='text/javascript' src='https://maps.googleapis.com/maps/api/js?key=AIzaSyBG5Z69WMRLNz5AJg5YhOkMcmrS8Ignve8&libraries=places'/>
			{/* <Script
			 		url='https://maps.googleapis.com/maps/api/js?key=AIzaSyBG5Z69WMRLNz5AJg5YhOkMcmrS8Ignve8&libraries=places'
			 		onLoad={this.handleScriptLoad}
			/> */} 
				
             <PlacesAutocomplete
             value={this.state.address}
             onChange={this.handleChange}
             onSelect={onSelect}
             placeholder={placeholder}
              >
     {({ getInputProps, suggestions, getSuggestionItemProps }) => (
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
     )}
     </PlacesAutocomplete>
     {/* {END PLACE COMPONENT} */}
     {this.touched && this.error && ( <Label basic color="red">{this.error}</Label>
 )}
 </Form.Field>
 );
 }
}
export default PlacesInput;