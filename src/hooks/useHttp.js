import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
    const response = await fetch(url, config);
    const resData = await response.json();

    if(!response.ok) {
        throw new Error(resData.message);
    }
    
    return resData
}

export default function useHttp(url, config) {
    const[data, setData] = useState([]);
    const[error, setError] = useState('');
    const[isLoading, setIsLoading] = useState(false);

    const clearData = () => {
        setData([]);
    }

    const sendRequest = useCallback(async function sendRequest(data) {
        let resData = [];
        setIsLoading(true);
        try {
            if(Object.keys(config).length === 0) {
                resData = await sendHttpRequest(url, config);
            } else {
                resData = await sendHttpRequest(url, { ...config, body: data });
            }
            setData(resData);
        } catch(error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [url, config]); 
    
    useEffect(() => {
        if(config && (config.method === 'GET' || !config.method) || !config) {
            sendRequest();
        }
    }, [sendRequest, config]);

    return {
        data,
        error,
        isLoading,
        clearData,
        sendRequest
    }
}