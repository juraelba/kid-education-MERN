import { reduxConstant } from '../constant';
var data = require('../services/data.json');

export const fetchData = (isStart) => {
    return dispatch => {
        dispatch({ data: data, isStart, type: reduxConstant.FETCH_DATA_SUCCESS });
    }
  
}