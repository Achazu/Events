import { INCREMENT_COUNTER, DECREMENT_COUNTER, COUNTER_ACTION_STARTED, COUNTER_ACTION_FINISHED } from './testConstants';
// import { createReducer } from '../../app/common/util/reducerUtil';

const initialState = {
	data: 42212231313132,
	loading: false
}

// export const incrementCounter = (state, payload) => {
// 	return {...state, data: state.data + 1};
// }

// export const decrementCounter = (state, payload) => {
// 	return {...state, data: state.data - 1};
// }

// export default createReducer(initialState, {
// 	[INCREMENT_COUNTER]: incrementCounter,
// 	[DECREMENT_COUNTER]: decrementCounter
// })

// ABOVE VERSION WITH LESS BOILERPLATE CODE (connected with reducerUtil.js file. Reducing Boilerplace section in the documentation)

const testReducer = (state = initialState, action) => {
	switch (action.type){
		case INCREMENT_COUNTER:
			return {...state, data: state.data + 1};
		case DECREMENT_COUNTER:
			return {...state, data: state.data - 1};
		case COUNTER_ACTION_STARTED:
			return {...state, loading: true};
		case COUNTER_ACTION_FINISHED:
			return {...state, loading: false};
		default: 
			return state;
	}
}

export default testReducer