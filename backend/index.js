
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import data from './data.js';
import countries from './data.js';

import countriesRoutes from './routes/countriesRoutes.js';

const app= express();
app.use(express.json());    
app.use(cors({origin:'*'}));
dotenv.config();          

app.get('/', (req,res)=>{
  res.json('Hello World');
});


//====================================================================================================
//for post and get all countries, get one country, delete and put:
//====================================================================================================
app.use('/api/v1/countries',countriesRoutes)  




app.listen(8000, ()=>console.log('server is running on port 8000'));



