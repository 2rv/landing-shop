import {BACK_END_IP} from "../constants";

export function request(URL, method, data) {

  if(method === "HEAD" || method === "GET") {
    return fetch(BACK_END_IP+URL)
      .then(response => response.json())
      .then(response => {
        console.log(response, "Response");
        return response;
      });
  }

  else {
    return fetch(BACK_END_IP+URL,{
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({...data})
    })
      .then(response => response.json())
      .then(response => {
        console.log(response, "Response");
        return response;
      });
  }
}

// function handleResponse(response) {
//   return response.text().then(text => {
//     if (!response.ok) {
//       const error = response.statusText;
//       return Promise.reject(error);
//     } else {
//       return text && JSON.parse(text);
//     }
//   });
// }
