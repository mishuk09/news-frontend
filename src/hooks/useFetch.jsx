// src/hooks/useFetch.js
import { useState, useEffect } from "react";
import axios from "axios";

export default function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let isMounted = true; // prevent memory leak if component unmounts

        axios
            .get(url)
            .then((response) => {
                if (isMounted) {
                    setData(response.data);
                    setLoading(false);
                }
            })
            .catch((err) => {
                if (isMounted) {
                    setError(err);
                    setLoading(false);
                }
            });

        return () => {
            isMounted = false; // cleanup
        };
    }, [url]);

    return { data, loading, error };
}
