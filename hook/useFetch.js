import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetch = (endpoint, query) => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)

    const options = {
        method: 'GET',
        url: `https://jsearch.p.rapidapi.com/${endpoint}`,
        params: {
          ...query
        },
        headers: {
          'X-RapidAPI-Key': 'a4aa88ae83mshb48604a0f10fe48p14abbcjsne6ce2d278dd9',
          'X-RapidAPI-Host': 'jsearch.p.rapidapi.com'
        }
      };
    
      const fetchData = async () => {
        setIsLoading(true)

        try {
            const response = await axios.request(options);
            setData(response.data.data)
            setIsLoading(false)
        } catch (error) {
            setError(error);
            alert("This is an error")
        } finally {
            setIsLoading(false);
        }
      }

      useEffect(() => {
        fetchData();
      }, []);

      const refetch = () => {
        setIsLoading(true);
        fetchData();
      }

      return { data, isLoading, error, refetch }
}

export default useFetch;