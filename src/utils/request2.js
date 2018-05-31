import axios from 'axios';
/**
 * @param
 * @description：使用axio进行ajax请求
 *
 */

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

export default function request(url, data){
      return axios.post(url, data)
                  .then(checkStatus)
                  .then(parseJSON)
                  .catch(function (error) {
                    console.log(error);
                  });
}
