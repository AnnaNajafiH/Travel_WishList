import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const UpdateCountry = () => {
    const {code} = useParams();
    const [name, setName] = useState('');
    const [alpha2Code, setAlpha2Code] = useState('');
    const [alpha3Code, setAlpha3Code] = useState('');
    const [visited, setVisited] = useState(false);
    const [country, setCountry] = useState(null);


const fetchCountry = async () => {
    const {data} = await axios.get(`/api/v1/countries/${code}`);
    setCountry(data);
    setName(data.name);
    setAlpha2Code(data.alpha2Code);
    setAlpha3Code(data.alpha3Code);
    setVisited(data.visited);
}

useEffect(()=>{
    fetchCountry();
}
,[code]);


const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedCountry = {name, alpha2Code, alpha3Code, visited};

    try {
        await axios.put(`/api/v1/countries/${code}`, updatedCountry);
        alert('Country updated successfully');
        
    } catch (error) {
      alert('Error updating country: ' + err.message);
    }
};

if(!country){
    return <h1>Country not found</h1>
}



    return(
        <div>
            <h2>Update Country</h2>
            <form onSubmit={handleSubmit}>
                <input 
                type="text"
                placeholder="Country Name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                 />
                <input
                type="text"
                placeholder="Alpha 2 Code"
                value={alpha2Code}
                onChange={(e)=>setAlpha2Code(e.target.value)}
                required
                 /> 
                <input
                type="text"
                placeholder="Alpha 3 Code"
                value={alpha3Code}
                onChange={(e)=>setAlpha3Code(e.target.value)}
                required
                 /> 
                 <label>
                        Visited:
                    <input 
                    type="checkbox"
                    checked={visited}
                    onChange={(e)=>setVisited(e.target.checked)}
                     />
                 </label>
                <button type="submit">Update Country</button>
            </form>
        </div>
    );
};

export default UpdateCountry;