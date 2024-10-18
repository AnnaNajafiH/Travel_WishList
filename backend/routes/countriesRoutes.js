import express from 'express';
import {getALlCountries,getOneCountry,createCountry, updateCountry, deleteCountry} from '../controllers/countriesControllers.js';


const Router = express.Router();

//====================================================================================================
//for post and get all countries:
//====================================================================================================
Router.route('/')
.get(getALlCountries) 
.post(createCountry)

//====================================================================================================
//for delete, put and get one country:
//====================================================================================================
Router.route('/:code')
.get (getOneCountry)
.put (updateCountry)
.delete (deleteCountry)

export default Router;