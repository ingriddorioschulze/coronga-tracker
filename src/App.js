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
import { sortData, formatDisplayNumbers } from './utils'
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
    font-size: 2rem;
    color: #fc3c3c;
    font-weight: bold;
  }
  .app__dropdown {
    background-color: white;
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
const AppRight = styled.div`
  display: flex;
  flex-direction: column;

  .muiCardContent-root {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
  }

  .app__graph {
    flex-grow: 1;
  }
  .app__graph-title {
    margin-top: 20px;
    margin-bottom: 20px;
  }
`

//#endregion

function App() {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('worldwide')
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3)
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setCasesType] = useState('cases')

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
          setMapCountries(data)
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
            <div className="title">CORONGA-19 TRACKER</div>
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
              onClick={(e) => setCasesType('cases')}
              title="Coronavirus Cases"
              isRed
              active={casesType === 'cases'}
              cases={formatDisplayNumbers(countryInfo.todayCases)}
              total={formatDisplayNumbers(countryInfo.cases)}
            />
            <InfoBox
              onClick={(e) => setCasesType('recovered')}
              title="Recovered"
              active={casesType === 'recovered'}
              cases={formatDisplayNumbers(countryInfo.todayRecovered)}
              total={formatDisplayNumbers(countryInfo.recovered)}
            />
            <InfoBox
              onClick={(e) => setCasesType('deaths')}
              title="Deaths"
              isRed
              active={casesType === 'deaths'}
              cases={formatDisplayNumbers(countryInfo.todayDeaths)}
              total={formatDisplayNumbers(countryInfo.deaths)}
            />
          </StatsWrapper>
          <Map
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />
        </AppLeft>
        <AppRight>
          <Card>
            <CardContent>
              <h3>Live Cases by Country</h3>
              <Table countries={tableData} />
              <h3 className="app__graph-title">Worldwide new {casesType}</h3>
              <LineGraph className="app__graph" casesType={casesType} />
            </CardContent>
          </Card>
        </AppRight>
      </AppWrapper>
    </ThemeProvider>
  )
}

export default App
