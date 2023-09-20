import { useState, useEffect } from "react";

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [failed, setFailed] = useState(null);


    useEffect(() => {
        const abortFetch = new AbortController();
        setTimeout(() => fetch(url, {signal: abortFetch.signal})
            .then(res => {
                // console.log(res);
                if (!res.ok) {
                    throw Error('could not fetch date from ' + url);
                }
                return res.json();
            })
            .then(data => {
                // console.log(data)
                setIsLoading(false);
                setData(data);
                setFailed(null)
            })
            .catch((err) => {
                if( err.name !== 'AbortError') {
                    setIsLoading(false);
                    setFailed(err.message);
                }
                

            }), 500)

        return () => abortFetch.abort();

    }, [url])

    return { data, isLoading, failed }
}

export default useFetch;