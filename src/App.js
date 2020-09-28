import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import theme from './theme'
import GlobalStyles from './GlobalStyles'
import { FormControl, MenuItem, Select } from '@material-ui/core'

const AppWrapper = styled.div``
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;

  .title {
    font-size: 40px;
  }
`

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)
  }
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <HeaderWrapper>
          <div className="title">Coronga Tracker</div>
          <FormControl className="app__dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <StatsWrapper></StatsWrapper>
        </HeaderWrapper>

        {/* <InfoBox /> */}
        {/* <InfoBox /> */}
        {/* <InfoBox /> */}

        {/* <Table /> */}
        {/* <Graph /> */}

        {/* <Map /> */}
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
