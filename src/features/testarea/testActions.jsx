import { INCREMENT_COUNTER, DECREMENT_COUNTER } from './testConstants'

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