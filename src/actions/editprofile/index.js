import axios from 'axios'
import { EDIT_URL, UPDATE_PROFILE_URL } from '../apiConstant'
import { HAS_ERROR } from '../types'
export const editProfile = id => {
  return dispatch => {
    return axios
      .get(`${EDIT_URL}?id=`+id, {
         headers: {
           'x-access-token': localStorage.token,
         }
       })
      .then(res => {
        console.log(res.data,3545)
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

export const updateProfile = data => {
  return dispatch => {
    return axios
      .post(`${UPDATE_PROFILE_URL}`, data, {
         headers: {
           'x-access-token': localStorage.token,
         }
       })
      .then(res => {
        console.log(res.data,3545)
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


