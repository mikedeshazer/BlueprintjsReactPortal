import axios from 'axios'
import { SIGNUP_URL } from '../apiConstant'
import { HAS_ERROR } from '../types'
export const signupAction = data => {
  return dispatch => {
    return axios
      .post(`${SIGNUP_URL}`, data)
      .then(res => {
        return res.data
      })
      .catch(function(error) {
        dispatch({
          type: HAS_ERROR,
          data: error.response.data,
        })
        return error.response.data
      })
  }
}
