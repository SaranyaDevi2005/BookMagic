import React, { useState } from 'react';
import Select from 'react-select';
import { Country, State, City } from 'country-state-city';

const LocationSelector = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setSelectedState(null);
    setSelectedCity(null);
  };

  const handleStateChange = (state) => {
    setSelectedState(state);
    setSelectedCity(null);
  };

  const handleCityChange = (city) => {
    setSelectedCity(city);
  };

  const countryOptions = Country.getAllCountries().map((country) => ({
    value: country.isoCode,
    label: country.name,
  }));

  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
        value: state.isoCode,
        label: state.name,
      }))
    : [];

  const cityOptions = selectedState
    ? City.getCitiesOfState(selectedCountry.value, selectedState.value).map(
        (city) => ({
          value: city.name,
          label: city.name,
        })
      )
    : [];

  return (
    <div>
      <h2>Select Your Location</h2>
      
      <div>
        <label>Select Country</label>
        <Select
          options={countryOptions}
          value={selectedCountry}
          onChange={handleCountryChange}
          placeholder="Select Country"
        />
      </div>

      <div>
        <label>Select State</label>
        <Select
          options={stateOptions}
          value={selectedState}
          onChange={handleStateChange}
          placeholder="Select State"
          isDisabled={!selectedCountry}
        />
      </div>

      <div>
        <label>Select City</label>
        <Select
          options={cityOptions}
          value={selectedCity}
          onChange={handleCityChange}
          placeholder="Select City"
          isDisabled={!selectedState}
        />
      </div>
    </div>
  );
};

export default LocationSelector;
