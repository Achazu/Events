// actions and actions creators

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
	return {
		type: CREATE_EVENT,
		payload: {
			event
		}
	};
};

export const updateEvent = (event) => {
	return {
		type: UPDATE_EVENT,
		payload: {
			event
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
