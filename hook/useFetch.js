// Fetching data about popular jobs through API
import {useState, useEffect } from 'react';
import axios from 'axios';

//import {Rapid_Api_Key} from '@env';
//const rapidApiKey = Rapid_Api_Key;

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        headers: {
            'X-RapidAPI-Key': '9c3d7b78e0msh1f1a4a0b85a6330p143721jsnc4e362fe747c',
            'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        },
        params: {...query },
    };

    const fetchData = async () => {
            setIsLoading(true);
            try {
                const response = await axios.request(options);
                setData(response.data.data);
                setIsLoading(false);
            } catch (error) {
                setError(error);
                alert('There is an error in fetching data from JSearch API. Maybe you have' +
                    ' used monthly limit')
            } finally {
                setIsLoading(false);
            }
    }

    useEffect(() =>{
        fetchData();

    }, []);

    const refetch = () => {
        setIsLoading(true);
        fetchData();
    }

    return {data, isLoading, error, refetch};
}

export default useFetch;
