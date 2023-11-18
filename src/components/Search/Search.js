import React, { useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import { fetchCities } from '../../api/WeatherService';
import { Grid, TextField, Switch } from '@mui/material';

const Search = ({ onSearchChange }) => {
  // State for search input
  const [searchValue, setSearchValue] = useState(null);

  // State for coordinates
  const [coordinate, setCoordinate] = useState({ lat: '', long: '' });

  // State for toggle switch
  const [toggleLatLong, setToggleLatLong] = useState(false);

  // Function to load options for AsyncPaginate
  const loadOptions = async (inputValue) => {
    const citiesList = await fetchCities(inputValue);
    return {
      options: citiesList.data.map((city) => ({
        value: `${city.latitude} ${city.longitude}`,
        label: `${city.name}, ${city.countryCode}`,
      })),
    };
  };

  // Handler for toggle switch
  const toggleHandler = () => {
    let toggle = !toggleLatLong;
    let data = { value: '' + ' ' + '' };

    if (toggle) {
      setSearchValue('');
      onSearchChange(data);
    } else {
      setCoordinate({ lat: '', long: '' });
      onSearchChange(data);
    }

    setToggleLatLong(toggle);
  };

  // Handler for search input change
  const onChangeHandler = (enteredData) => {
    setSearchValue(enteredData);
    onSearchChange(enteredData);
  };

  // Handler for coordinate input change
  const coordinateChangeHandler = (coordinateData) => {
    let { lat, long } = coordinate;

    if (coordinateData.target.name === 'latitude') {
      setCoordinate({ lat: coordinateData.target.value, long: coordinate.long });
      lat = coordinateData.target.value;
    }

    if (coordinateData.target.name === 'longitude') {
      setCoordinate({ lat: coordinate.lat, long: coordinateData.target.value });
      long = coordinateData.target.value;
    }

    if (lat !== '' && long !== '') {
      onSearchChange({ value: lat + ' ' + long });
    }
  };

  return (
    <div>
      <Switch onChange={toggleHandler} />

      {!toggleLatLong ? (
        <AsyncPaginate
          placeholder="Search for cities"
          debounceTimeout={600}
          value={searchValue}
          onChange={onChangeHandler}
          loadOptions={loadOptions}
        />
      ) : (
        <Grid container spacing={2}>
          <Grid item>
            <TextField
              id="lat"
              name="latitude"
              placeholder="Latitude"
              value={coordinate.lat}
              onChange={coordinateChangeHandler}
              variant="outlined"
              className="css-13cymwt-control"
              InputProps={{ style: { maxHeight: '38px' } }}
            />
          </Grid>
          <Grid item>
            <TextField
              id="long"
              name="longitude"
              placeholder="Longitude"
              value={coordinate.long}
              onChange={coordinateChangeHandler}
              variant="outlined"
              className="css-13cymwt-control"
              InputProps={{ style: { maxHeight: '38px' } }}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};

export default Search;