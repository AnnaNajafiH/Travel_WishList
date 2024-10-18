import data from '../data.js';

export const getALlCountries = (req,res)=>{
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
}


export const getOneCountry = (req,res)=>{
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
}


export const createCountry= (req,res)=>{
  const {name, alpha2Code, alpha3Code, visited} = req.body;
  console.log(req.body);

  const countryExists = data.find(
    (e)=>
      e.name===name
      // e.alpha2Code===alpha2Code||
      // e.alpha3Code===alpha3Code
  );
  if(countryExists){
    return res.status(400).send({msg:'Country already exists'});
  }
  const newCountry = {
    id: data.length+1,
    name,
    alpha2Code,
    alpha3Code,
    visited:false
  };
  data.push(newCountry);
  res.send(data);
}

export const updateCountry = (req,res)=>{
  const {code}= req.params;
  const {name, alpha2Code, alpha3Code, visited}= req.body;
  const country = data.find(
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
}


export const deleteCountry = (req,res)=>{
  const {code}= req.params;
  const country = data.find(
    (e)=>
      e.alpha2Code===code||
      e.alpha3Code===code ||
      e.name.toUpperCase()===code.toUpperCase()
  );
  if(!country){
    return res.status(404).send({msg:'Country not found'});
  }
  const index = data.indexOf(country);
  data.splice(index,1);
  res.send(data);
}