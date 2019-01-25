// actions and actions creators
import { toastr } from 'react-redux-toastr'
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from "./eventConstants";
import { asyncActionsStart, asyncActionsFinish, asyncActionsError } from '../async/asyncActions'
import { fetchSampleData } from '../../app/data/mockApi'

import React from 'react';

export const fetchEvents = (events) => {
	return {
		type: FETCH_EVENTS,
		payload: events
	}
}

export const createEvent = (event) => {
	return async dispatch => {
		try {
			dispatch({
				type: CREATE_EVENT,
				payload: {
					event
				}
			});
			toastr.success('Success', 'Event has been created')
		} catch (error) {
			toastr.error('Noooo', 'Sth went wrong')
		}
	};
};

export const updateEvent = (event) => {
	return async dispatch => {
		try {
			dispatch({
				type: UPDATE_EVENT,
				payload: {
					event
				}
			});
			toastr.success('Success', 'Event has been updated')
		} catch (error) {
			toastr.error('Noooo', 'Sth went wrong')
		}
	};
};

export const deleteEvent = (eventId) => {
	return {
		type: DELETE_EVENT,
		payload: {
			eventId
		}
	};
};

export const loadEvents = () => {
	return async dispatch => {
		try {
			dispatch(asyncActionsStart())
			let events = await fetchSampleData();
			dispatch(fetchEvents(events))
			dispatch(asyncActionsFinish())
		} catch (error) {
			console.log(error)
			dispatch(asyncActionsError())
		}
	}
}
