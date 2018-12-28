import React, {Component} from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';

const emptyEvent = {
	title: '',
	date: '',
	city: '',
	venue: '',
	hostedBy: ''
}
class EventForm extends Component {
	
	state = {
		event: emptyEvent
	}

	componentDidMount(){
		if(this.props.selectedEvent !== null){
			this.setState({
				event: this.props.selectedEvent
			})
		}
	}

	componentWillReceiveProps(nextProps){
		console.log('current', this.props.selectedEvent);
		console.log('next', nextProps);
		console.log('next details', nextProps.selectedEvent);
		if(nextProps.selectedEvent !== this.props.selectedEvent){
			{/* Empty event because create event may be clicked and therefore no selected event will be present. if nextProps.selectedEvent===null then emptyEvent */}
			this.setState({
				event: nextProps.selectedEvent || emptyEvent
			})
		}
	}

	onFormSubmit = (e) => {
		e.preventDefault();
		// Refs are uncontrolled - legacy way of handlong forms/inputs
		// console.log(this.refs.title.value); // and in input as below
		// <input ref='title' placeholder="Event Title"/>
		if(this.state.event.id){
			this.props.updateEvent(this.state.event)
		} else {
			this.props.createEvent(this.state.event)
		}
	}
	
	onInputChange = (e) => {
		const newEvent = this.state.event;
		newEvent[e.target.name] = e.target.value;
		
		this.setState({
			event: newEvent
		})
	}

	render() {
		 const {handleCancel} = this.props;
		 const {event} = this.state;
        return (
            <Segment>
                <Form onSubmit={this.onFormSubmit}>
                    <Form.Field>
                        <label>Event Title</label>
                        <input name='title' onChange={this.onInputChange} value={event.title} placeholder="Event Title"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Event Date</label>
                        <input name='date' onChange={this.onInputChange} value={event.date} type="date" placeholder="Event Date"/>
                    </Form.Field>
                    <Form.Field>
                        <label>City</label>
                        <input name='city' onChange={this.onInputChange} value={event.city} placeholder="City event is taking place"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Venue</label>
                        <input name='venue' onChange={this.onInputChange} value={event.venue} placeholder="Enter the Venue of the event"/>
                    </Form.Field>
                    <Form.Field>
                        <label>Hosted By</label>
                        <input placeholder="Enter the name of person hosting"/>
                    </Form.Field>
                    <Button positive type="submit">
                        Submit
                    </Button>
                    <Button onClick={handleCancel} type="button">Cancel</Button>
                </Form>
            </Segment>
        );
    }
}

export default EventForm;