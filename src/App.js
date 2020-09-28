import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'

import theme from './theme'
import GlobalStyles from './GlobalStyles'
import { FormControl, MenuItem, Select } from '@material-ui/core'
import InfoBox from './InfoBox'
import Map from './Map'

//#region styles
const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
`
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;

  .title {
    font-size: 40px;
  }
`
const StatsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`
//#endregion

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
        </HeaderWrapper>
        <StatsWrapper>
          <InfoBox title="Coronavirus Cases" total={3000} cases={1234} />
          <InfoBox title="Recovered" total={7000} cases={5678} />
          <InfoBox title="Deaths" total={9000} cases={9078} />
        </StatsWrapper>
        <Map />

        {/* <Table /> */}
        {/* <Graph /> */}

        {/* <Map /> */}
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
