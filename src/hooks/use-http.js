import { useState,useCallback} from "react";
const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(null);

  const  sentRequest = useCallback (async (requestConfig,dataHandler) => {
    setIsLoading(true);
    setHasError(null);

    try {
      const respone = await fetch(
        
            requestConfig.url, {
            method: requestConfig.method ? requestConfig.method : "GET",
            headers: requestConfig.headers ? requestConfig.headers : {},
            body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
          }
      );

      if (!respone.ok) {
       
        throw new Error('request fail');
      }

      const data = await respone.json();
      
      dataHandler(data);
    } catch (err) {
      setHasError(err.message || "Something went wrong");
      
    }
    setIsLoading(false);
  },[]);
  
  return {
    isLoading,
    hasError,
    sentRequest,
  };
};

export default useHttp;
