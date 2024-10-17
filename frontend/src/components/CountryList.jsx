import React, {useState, useEffect} from 'react';
import axios from 'axios';

const countryList = () => {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const {data}=await axios.get(`http://localhost:8000/api/v1/countries`)
                setCountries(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCountries();
    }, []);


    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    const handleClick = async () => {
        try {
            const {data}=await axios.get(`http://localhost:8000/api/v1/countries`)
            setCountries(data);
        } catch (error) {
            setError(error);
        }
    }


    return (
        <div>
            <h2>Countries</h2>
            <button onClick={handleClick}>
                all countries
            </button>
            <br />
            <ul>
                {countries.map((country)=>(
                    <li key={country.id} >
                        {country.name}-{country.alpha2Code}-{country.alpha3Code}-{country.visited}
                    </li>
                ))}
            </ul>
        </div>

    );
};


export default countryList;