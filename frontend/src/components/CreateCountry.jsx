import React , {useState} from 'react';
import axios from 'axios';

const CreateCountry = () => {
    const [name, setName] = useState('');
    const [Alpha2Code, setAlpha2Code] = useState('');
    const [Alpha3Code, setAlpha3Code] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault ();
        const newCountry = {name, Alpha2Code, Alpha3Code, visited:false};
        try {
            await axios.post('http://localhost:8000/api/v1/countries', newCountry);
            alert('Country Created successfully!');
        }
        catch (error) {
            alert(`Error creating country: ${error.message}`); 
        }
    };

    return(
        <div>
            <h2>Create Country</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" 
                placeholder='Country Name'
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                />
                <input type="text" 
                placeholder='Alpha2Code'
                value={Alpha2Code}
                onChange={(e)=>setAlpha2Code(e.target.value)}
                required
                />
                <input type="text" 
                placeholder='Alpha3Code'
                value={Alpha3Code}
                onChange={(e)=>setAlpha3Code(e.target.value)}
                required
                />
                <button type='submit'>Create Country</button>
            </form>
        </div>

    );
};

export default CreateCountry;