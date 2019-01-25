import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk'

export const configureStore = (preloadedState) => {
	const middlewares = [thunk];
	const middlewareEnhancer = applyMiddleware(...middlewares);
	const storeEnhancers = [middlewareEnhancer];
	// const composedEnhancer = compose(...storeEnhancers);
	const composedEnhancer = composeWithDevTools(...storeEnhancers);

	const store = createStore(
		rootReducer,
		preloadedState,
		composedEnhancer
	)

	// enabling hot module replacement for redux as well (it was already done for react in app.js or index.js)
	if(process.env.NODE_ENV !=='production'){
		if(module.hot){
			module.hot.accept('../reducers/rootReducer', () => {
				const newRootReducer = require('../reducers/rootReducer').default;
				store.replaceReducer(newRootReducer);
			})
		}
	}

	return store
}