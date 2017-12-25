import * as types from './actionTypes';

export function selectGender (gender) {
  return {type: types.calculatorActions.SELECT_GENDER, gender};
}

