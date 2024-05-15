const BASE_URL = "http://localhost:8086/api/bank"
export const apiRequest = async (method, path, body = null, headers = null) => {
    const url = `${BASE_URL}/${path}`;
  
    const options = {
      method,
      headers: headers ? headers : {
        'Content-Type': 'application/json',
        // You can add additional headers here if needed
      },
      body: body ? JSON.stringify(body) : null,
    };
  
    
      const response = await fetch(url, options);
  
    //   if (!response.ok) {
    //     throw new Error(`Request failed with status ${JSON.stringify(response)}`);
    //   }
  
      return response;
    
  };