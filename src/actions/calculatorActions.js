import * as types from './actionTypes';

const { calculatorActions } = types;

export function selectGender (gender) {
  return {type: calculatorActions.SELECT_GENDER, gender};
}

