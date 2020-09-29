import React, { useState, useEffect } from 'react'
import styled, { ThemeProvider } from 'styled-components'
import {
  Card,
  CardContent,
  FormControl,
  MenuItem,
  Select,
} from '@material-ui/core'

import theme from './theme'
import GlobalStyles from './GlobalStyles'
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import { sortData } from './utils'
import LineGraph from './LineGraph'
import 'leaflet/dist/leaflet.css'

//#region styles
const AppWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 20px;

  @media (max-width: 990px) {
    flex-direction: column;
  }
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
  @media (max-width: 350px) {
    flex-direction: column;
  }
`
const AppLeft = styled.div`
  flex: 0.9;
`
const AppRight = styled.div``

//#endregion

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)

  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all ')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data)
      })
  }, [])

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }))
          const sortedData = sortData(data)
          setTableData(sortedData)
          setCountries(countries)
        })
    }
    getCountriesData()
  }, [])

  const onCountryChange = async (event) => {
    const countryCode = event.target.value
    setCountry(countryCode)

    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(4)
      })
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <AppWrapper>
        <AppLeft>
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
            <InfoBox
              title="Coronavirus Cases"
              cases={countryInfo.todayCases}
              total={countryInfo.cases}
            />
            <InfoBox
              title="Recovered"
              cases={countryInfo.todayRecovered}
              total={countryInfo.recovered}
            />
            <InfoBox
              title="Deaths"
              cases={countryInfo.todayDeaths}
              total={countryInfo.deaths}
            />
          </StatsWrapper>
          <Map center={mapCenter} zoom={mapZoom} />
        </AppLeft>
        <AppRight>
          <Card>
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3>Worldwide New Cases</h3>
              <LineGraph></LineGraph>
            </CardContent>
          </Card>
        </AppRight>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
