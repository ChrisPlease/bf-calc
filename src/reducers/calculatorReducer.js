import * as types from '../actions/actionTypes';

const initialState = {
  weight: '',
  age: '',
  gender: 'male'
};

export default function calculatorReducer (state = initialState, action) {

  switch(action.type) {
    case types.calculatorActions.SELECT_GENDER:
      return {
        ...state,
        gender: action.gender
      };
    default:
      return state;
  }

};
