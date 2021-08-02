import { combineReducers } from 'redux';
import dataReducer from './dataReducer';
import matching from './matching';

const rootReducer = combineReducers({
    dataReducer,
    matching
  });
  
  export default rootReducer;