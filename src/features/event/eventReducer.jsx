import { createReducer } from '../../app/common/util/reducerUtil'
import { CREATE_EVENT, DELETE_EVENT, UPDATE_EVENT, FETCH_EVENTS } from './eventConstants'

 const initialState = [];

export const createEvent = (state, payload) => {
	return [...state, Object.assign({}, payload.event)]
}

export const updateEvent = (state, payload) => {
	return [
		...state.filter(event => event.id !== payload.event.id),
		Object.assign({}, payload.event)
	]
}

export const deleteEvent = (state, payload) => {
	console.log('payload', payload);
	console.log('payloadID', payload.eventId);
	return [
		// console.log('delete function', ...state.filter(event => event.id !== payload.event)),
		...state.filter(event => event.id !== payload.eventId)
	]
}

export const fetchEvents = (state, payload) => {
	// console.log('async reducer works')
	return payload.events
}

export default createReducer(initialState, {
	[CREATE_EVENT]: createEvent,
	[UPDATE_EVENT]: updateEvent,
	[DELETE_EVENT]: deleteEvent,
	[FETCH_EVENTS]: fetchEvents
})