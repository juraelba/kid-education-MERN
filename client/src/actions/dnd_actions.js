import { reduxConstant } from '../constant';

export const drop = (data) => {
    return dispatch => {
        dispatch({ data: data, type: reduxConstant.DROP_FINISH });
    }
  
  }