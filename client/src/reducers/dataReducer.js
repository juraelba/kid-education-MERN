import { reduxConstant } from '../constant';

const initialState = {
    data:{},
    isStart: false,
    source: {}
}

export default (state = initialState, action) => {
    const { type, isStart } = action
    switch (type) {
        case reduxConstant.FETCH_DATA_SUCCESS: 
            return {...state,data: action.data, isStart};
        case reduxConstant.DROP_FINISH: 
            return {...state,data: action.data, isStart};
        case reduxConstant.DATA_SORT_SUCCESS: 
            return {...state,data: action.data};
        case reduxConstant.BEGIN_DRAGGING: 
            return {...state,source: action.source};
    default:
        return initialState;
    }
}
