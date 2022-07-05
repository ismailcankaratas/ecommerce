import axios from "axios";
import { useEffect, useState } from "react";
import { getError } from "../utils/error";


const useFetch = (url) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(url);
                setData(data);
                setLoading(false);
            } catch (error) {
                setError(getError(error));
            }
        }
        fetchData();
    }, [url]);

    const reFetch = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(url);
            setData(data);
            setLoading(false);
        } catch (error) {
            setError(getError(error));
        }
    }


    return { data, loading, error, reFetch }
}

export default useFetch;