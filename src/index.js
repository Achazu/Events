import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import App from './app/layouts/App';
import * as serviceWorker from './serviceWorker';
import { configureStore } from './app/store/configureStore';
import ScrollToTop from "./app/common/util/ScrollToTop";

const store = configureStore();

const rootEl = document.getElementById('root');
let render = () => {
	ReactDOM.render(
			<Provider store={store}>
			<BrowserRouter>
				<ScrollToTop>	
					<App />	
				</ScrollToTop>
			</BrowserRouter>, 
			</Provider>,
			rootEl)
};

if(module.hot) {
	module.hot.accept('./app/layouts/App', () => {
		setTimeout(render)
	})
}

render();

serviceWorker.unregister();


// google maps js key
// AIzaSyBG5Z69WMRLNz5AJg5YhOkMcmrS8Ignve8