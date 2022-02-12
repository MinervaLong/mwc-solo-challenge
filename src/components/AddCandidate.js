import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { CandidateContext } from "../context/CandidateState";
import axios from 'axios';
import validator from 'validator';


const API_URL_COUNTRIES = 'https://countriesnow.space/api/v0.1/countries/';

export const AddCandidate = () => {
    // Used to get back to Home view when click Cancel
    let navigate = useNavigate();
    // Get the crud action addCandidate & candidates state
    const { addCandidate, candidates} = useContext(CandidateContext);

    // Initialize the value of each field
    const [avatar ] = useState()
    const [name, setName] = useState("");
    const [mail, setMail] = useState("");
    const [description, setDescription] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
 
    
    const onSubmit = (e) => {
    // If the validate function returns true, generate a new candidate & 
    // set this information to addCandidate method, then display it in home view
        e.preventDefault();
        const validForm = validateForm(e)

        if(validForm) {
            const newCandidate = {
                id:candidates.length + 1,
                avatar,
                name,
                mail,
                description,
                country,
                city,
            };
            addCandidate(newCandidate);
            // get back to Home view 
            navigate("/");
        }
       
    };


    // API CALL TO COUNTRIES & CITIES
        // Variables 
    const [countries, setCountries] = useState([]); 
    const [callError, setCallError] = useState(false);
   
        // Call the data at the beginning
    useEffect(() => {
        getCountriesData();
    }, []) 

       // API call to get the data
        const getCountriesData = async() => {
        setCallError(false);
        try {
          const answer = await axios.get(API_URL_COUNTRIES);          
          const result = answer.data.data;       
          const countriesArray = result.map((country, index) => {
            const name = country.country;          
            const indx = index;
            const cities = country.cities
            return { indx, name, cities };
            })
            countriesArray.unshift({indx: countriesArray.length + 1, name: 'Select a country', cities:'Select a city'});
          setCountries(countriesArray);
        }catch(error){
          setCallError(true);
          alert('Is something wrong with API call');
        }
      };        
      
      // Store the countries options in a variable
    const countryOptions = countries.map((option) => {
        return(
        <option key={option.indx} value={option.name}>{option.name}</option>
        )
    }); 

    // Store the cities for each country in a variable
   const citiesOptions = countries.map((option) => {
        const optionCities = option.cities
        const optionName = option.name
        return (            
            optionName === country && optionCities.map((cit, index) => {
                return (
                    <option key={index} value={cit}>{cit}</option>
                )
            })
        )
   })

   // VALLIDATE FORMS
   const [nameError, setNameError] = useState('');
   const [emailError, setEmailError] = useState('');
   const [descriptionError, setDescriptionError] = useState('');

   const validateForm = (e) => {
    let targetValues = e.target;
    const nameInput = targetValues.name.value;
    const emailInput = targetValues.email.value;
    const descriptionInput = targetValues.description.value;
    let validation = true;

    //Check if the name is at least 3 characters, only letters
        if(validator.matches(nameInput, /^[a-zA-Z ]{2,30}$/) && validator.isLength(nameInput,{min:3, max:50})){
            setNameError('Valid name');
        }else{
            setNameError('Only letters and at least 3 characters'); 
            validation = false;     
        }
      
    // Check if the field has a valid email format
        validator.isEmail(emailInput) ? setEmailError('Valid email') : setEmailError('Enter valid Email');      
  
    //Description, check if the name is at least 3 characters
        if(validator.isLength(descriptionInput,{min:10, max:140})){
            setDescriptionError('Valid name');
          }else{
            setDescriptionError('At least 3 characters');
            validation = false;
          }
 
        return validation;
    }

    
  
    return (
        <React.Fragment>
            <div className="w-full max-w-sm container mt-20 mx-auto">
                <form onSubmit={onSubmit}>
                    <div className="w-full mb-5">
                        <label 
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="name">Name
                        </label>
                        <input
                            name='name'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Write your complete name"
                            required
                        />
                        <small className={`${nameError === 'Valid name' ? 'text-green-500' : 'text-red-600'}`}>{nameError}</small>
                    </div>
                    <div className="w-full mb-5">
                        <label 
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="mail">Email
                        </label>
                        <input
                            name='email'
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            type="mail"
                            placeholder="Write your e-mail"
                            required
                        />
                        <small className={`${emailError === 'Valid name' ? 'text-green-500' : 'text-red-600'}`}>{emailError}</small>
                    </div>
                    <div className="w-full mb-5">
                        <label 
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="description">Description
                        </label>
                        <textarea
                            name='description'
                            rows="3"
                            maxLength={140}
                            className="
                            shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Write a brief description about you"
                            required
                        />
                        <small className={`${descriptionError === 'Valid name' ? 'text-green-500' : 'text-red-600'}`}>{descriptionError}</small>
                    </div>
                    <div className="w-full mb-5">
                        <label 
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="country">Select a country
                        
                        </label>
                        <select className="block w-full py-3 pl-4 pr-8 bg-white border border-gray-300 rounded-sm appearance-none cursor-pointer focus:outline-none hover:border-gray-400"
                            id='country'
                            name='country'
                            value={country}
                            onChange={(e)=> setCountry(e.target.value)}
                            required
                        >
                        {countryOptions}
                      </select>
                        <small>{callError}</small>
                    </div>
                    <div className="w-full mb-5">
                        <label 
                            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                            htmlFor="city">Select a city
                        </label>
                        <select
                            name='cities'                            
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:text-gray-600"
                            id='cities'
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            required                            
                        >
                        {citiesOptions}
                        </select>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="mt-5 bg-green-400 w-full hover:bg-green-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                        Add Candidate
                        </button>
                    </div>
                    <div className="text-center mt-4 bg-gray-500 py-2 font-bold text-white">
                        <Link to="/">Cancel</Link>
                    </div>
                </form>
            </div>
        </React.Fragment>
    )
}

