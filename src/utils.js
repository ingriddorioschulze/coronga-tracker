import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'

const StyledPopup = styled.div`
  width: 150px;

  .info-flag img {
    width: 100px;
    border-radius: 5px;
  }
  .info-flag {
    height: 80px;
    width: 100%;
    background-size: cover;
    border-radius: 8px;
    margin-bottom: 10px;
  }
  .info-name {
    font-size: 20px;
    font-weight: bold;
    color: #555;
  }
  .info-confirmed,
  .info-recovered,
  .info-deaths {
    font-size: 16px;
    margin-top: 5px;
  }
`

const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    rgb: 'rgb(204, 16, 52)',
    half_op: 'rgba(204, 16, 52, 0.5)',
    multiplier: 800,
  },
  recovered: {
    hex: '#7dd71d',
    rgb: 'rgb(125, 215, 29)',
    half_op: 'rgba(125, 215, 29, 0.5)',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    rgb: 'rgb(251, 68, 67)',
    half_op: 'rgba(251, 68, 67, 0.5)',
    multiplier: 2000,
  },
}

export const sortData = (data) => {
  const sortedData = [...data]
  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

export const showDataOnMap = (data, casesType) =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      }
    >
      <Popup>
        <StyledPopup>
          <div
            className="info-flag"
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          />
          <div className="info-name">{country.country}</div>
          <div className="info-confirmed">
            Cases: {numeral(country.cases).format('0,0')}{' '}
          </div>
          <div className="info-recovered">
            Recovered: {numeral(country.recovered).format('0,0')}
          </div>
          <div className="info-deaths">
            Deaths: {numeral(country.deaths).format('0,0')}
          </div>
        </StyledPopup>
      </Popup>
    </Circle>
  ))

export const formatDisplayNumbers = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0'
