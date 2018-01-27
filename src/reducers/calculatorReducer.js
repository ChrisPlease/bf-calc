import { calculatorActions as types } from '../actions/actionTypes';

const { SELECT_GENDER } = types;

const initialState = {
  weight: '',
  age: '',
  gender: 'male'
};

export default function calculatorReducer (state = initialState, action) {

  switch (action.type) {
    case SELECT_GENDER:
      return { ...state, gender: action.gender };
    default:
      return state;
  }

};
