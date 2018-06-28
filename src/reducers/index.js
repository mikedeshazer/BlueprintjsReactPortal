import { combineReducers } from 'redux';
import { routerMiddleware, routerReducer } from 'react-router-redux';

export default combineReducers({
router: routerReducer
});
