import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_FINISHED, COUNTER_ACTION_STARTED } from './testConstants'

/// ACTIONS. Actions have to have defined 'type' property that indicates the type of action being performed. 
// They should typically be defined as string constants.
// Actions are  are payloads of information that send data from your application to your store. They are the only source of information for the store.

// Action creators are exactly that—functions that create actions.

export const incrementCounter = () => {
	return {
		type: INCREMENT_COUNTER
	}
}

export const decrementCounter = () => {
	return {
		type: DECREMENT_COUNTER
	}
}

export const startCounterAction = () => {
	return {
		type: COUNTER_ACTION_STARTED
	}
}

export const finishCounterAction = () => {
	return {
		type: COUNTER_ACTION_FINISHED
	}
}

// redux thunk allows to send actions that are functions

const delay = (ms) => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

export const incrementAsync = () => {
	return async dispatch => {
		dispatch(startCounterAction())
		await delay(1000)
		// below to ways of invoking actions specified above
		dispatch({type: INCREMENT_COUNTER})
		dispatch(finishCounterAction())
	}
}

export const decrementAsync = () => {
	return async dispatch => {
		dispatch(startCounterAction())
		await delay(1000)
		// below to ways of invoking actions specified above
		dispatch({type: DECREMENT_COUNTER})
		dispatch(finishCounterAction())
	}
}