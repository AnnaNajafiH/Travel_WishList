
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import data from './data.js';
import countries from './data.js';

const app= express();
app.use(express.json());    
app.use(cors({origin:'*'}));
dotenv.config();          

app.get('/', (req,res)=>{
  res.json('Hello World');
});


//====================================================================================================
//get all countries
//====================================================================================================
app.get('/api/v1/countries',(req,res)=>{
  let allCountries = data;
  const {sort, visited, limit} = req.query;
  if(sort === 'true') allCountries.sort((a,b)=>(a.name > b.name ? 1:-1));
  if(visited === 'true'){
    const visitedCountries = allCountries.filter((el)=>el.visited === true);
    allCountries = visitedCountries;
if (limit) {
  allCountries = allCountries.slice(0, +limit); 
}
  }
console.log("Final Countries List: ", allCountries); // Check what countries are being sent in the response
  res.json(allCountries);

})


//====================================================================================================
//get one country:
//====================================================================================================

app.get('/api/v1/countries/:code',(req,res)=>{
  const {code}= req.params;
  // code.toUpperCase();
  const country= data.find(
    (e)=>
      e.alpha2Code===code||
      e.alpha3Code===code ||
      e.name.toUpperCase()===code.toUpperCase()
  );
  if(!country){
    return res.status(404).send({msg:'Country not found'});
  }
  res.send(country);
})


//====================================================================================================
//create a country:
//====================================================================================================

app.post ('/api/v1/countries',(req,res)=>{
  const {name, alpha2Code, alpha3Code, visited} = req.body;
  console.log(req.body);

  const countryExists = countries.find(
    (e)=>
      e.name===name
      // e.alpha2Code===alpha2Code||
      // e.alpha3Code===alpha3Code

  );
  if(countryExists){
    return res.status(400).send({msg:'Country already exists'});
  }
  const newCountry = {
    id: countries.length+1,
    name,
    alpha2Code,
    alpha3Code,
    visited:false
  };
  countries.push(newCountry);
  res.send(countries);
});

//====================================================================================================
//update a country:
//====================================================================================================

app.put('/api/v1/countries/:code',(req,res)=>{
  const {code}= req.params;
  const {name, alpha2Code, alpha3Code, visited}= req.body;
  const country = countries.find(
    (e)=>
      e.alpha2Code===code||
      e.alpha3Code===code ||
      e.name.toUpperCase()===code.toUpperCase()
  );
  if(!country){
    return res.status(404).send({msg:'Country not found'});
  }
  country.name=name;
  country.alpha2Code=alpha2Code;
  country.alpha3Code=alpha3Code;
  country.visited=visited;
  res.send(country);
})

//====================================================================================================
//delete a country:
//====================================================================================================

app.delete('/api/v1/countries/:code',(req,res)=>{
  const {code}= req.params;
  const country = countries.find(
    (e)=>
      e.alpha2Code===code||
      e.alpha3Code===code ||
      e.name.toUpperCase()===code.toUpperCase()
  );
  if(!country){
    return res.status(404).send({msg:'Country not found'});
  }
  const index = countries.indexOf(country);
  countries.splice(index,1);
  res.send(countries);
})



app.listen(8000, ()=>console.log('server is running on port 8000'));



