import React, {Component} from 'react';
import {Button, Form, Segment, Grid, Header} from 'semantic-ui-react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form'
import {
	composeValidators,
	combineValidators,
	isRequired,
	hasLengthGreaterThan
 } from 'revalidate';
//  import moment from 'moment'
import cuid from 'cuid';
import {createEvent, updateEvent} from '../eventActions';
import TextInput from '../../../app/common/form/TextInput';
import TextArea from '../../../app/common/form/TextArea';
import SelectInput from '../../../app/common/form/SelectInput';
import DateInput from '../../../app/common/form/DateInput';

const mapState = (state, ownProps) => {
    const eventId = ownProps.match.params.id;

	 let event = {};
	 
    if (eventId && state.events.length > 0) {
        event = state
            .events
            .filter(event => event.id === eventId)[0]
	 }
	 
	// INITIAL VALUES EXPLANATION
	//  What we return from the mapState becomes props on the component.  
	// By setting the initialValues prop here we are able to initialise the form values with the event 
	// and populate the form with the values we retrieve from the redux state.
	// https://redux-form.com/7.2.3/examples/initializefromstate/

    return {
		 initialValues: event
	 }
}

const actions = {
    createEvent,
    updateEvent
}

const category = [
	// {key: 'blank', text: '', value: ''}, 
	{key: 'drinks', text: 'Drinks', value: 'drinks'},
	 {key: 'culture', text: 'Culture', value: 'culture'},
	 {key: 'film', text: 'Film', value: 'film'},
	 {key: 'food', text: 'Food', value: 'food'},
	 {key: 'music', text: 'Music', value: 'music'},
	 {key: 'travel', text: 'Travel', value: 'travel'},
];

const validate = combineValidators({
	title: isRequired({message: 'The event title is required'}),
	category: isRequired({message: 'Please provide a category'}),
	description: composeValidators(
		isRequired({message: 'Please eneter a desctiption'}),
		hasLengthGreaterThan(4)({
			message: 'Description needs to be at least 5 characters'
		}))(),
		city: isRequired('city'),
		venue: isRequired('venue'),
		date: isRequired('date')
})

class EventForm extends Component {

    onFormSubmit = values => {
		 console.log(values);
		 console.log(values.date);
		 
		 values.date = values.date.toISOString();
        // Refs are uncontrolled - legacy way of handlong forms/inputs
        // console.log(this.refs.title.value); // and in input as below <input
        // ref='title' placeholder="Event Title"/>
        if (this.props.initialValues.id) {
            this.props.updateEvent(values);
            this.props.history.goBack();
        } else {
            const newEvent = {
                ...values,
                id: cuid(),
					 hostPhotoURL: '/assets/user.png',
					 hostedBy: 'Bob'
            }
            this
                .props
                .createEvent(newEvent)
            this
                .props
                .history
                .push('/events')
        }
    }
    render() {
		const { invalid, submitting, pristine } = this.props;
		
		return (
            <Grid>
                <Grid.Column width={10}>
						  <Segment>
								  <Header sub color='teal' content='Event details'></Header>
								  {/*this.props.handleSubmit - from redux-form */}
                        <Form onSubmit={this.props.handleSubmit(this.onFormSubmit)}>

                            <Field
                                name='title'
                                type='text'
                                component={TextInput}
                                placeholder='Give your event a name'/>
                            <Field
                                name='category'
                                type='text'
										  component={SelectInput}
										  options={category}
                                placeholder='What is your event about'/>
                            <Field
                                name='description'
										  type='text'
										  rows={3}
                                component={TextArea}
										  placeholder='Tell us about your event'/>
										  <Header sub color='teal' content='Event location details'/>
                            <Field name='city' type='text' component={TextInput} placeholder='Event City'/>
                            <Field
                                name='venue'
                                type='text'
                                component={TextInput}
										  placeholder='Event Venue'/>
										  
									 <Field 
									 		name="date"
									 		type="text"
									 		component={DateInput}
									 		// dateFormat='YYYY-MM-DD HH:mm'
									 		timeFormat='HH:mm'
									 		showTimeSelect
									 		placeholder="Date and time of event"/>

                            <Button disabled={invalid || submitting || pristine} positive type="submit">
                                Submit
                            </Button>
                            <Button onClick={this.props.history.goBack} type="button">Cancel</Button>
                        </Form>
                    </Segment>
                </Grid.Column>
            </Grid>

        );
    }
}

export default connect(mapState, actions)(
	reduxForm({form: 'eventForm', enableReinitialize: true, validate })(EventForm));