import axios from 'axios'
import { LOGIN_URL } from '../apiConstant'
import { HAS_ERROR } from '../types'
export const loginAction = data => {
  return dispatch => {
    return axios
      .post(`${LOGIN_URL}`, data)
      .then(res => {
        localStorage.setItem('token',res.data.token)
        localStorage.setItem('user_id',res.data.user_id)
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
