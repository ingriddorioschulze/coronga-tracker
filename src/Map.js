import React from 'react'
import styled from 'styled-components'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import { showDataOnMap } from './utils'

const MapWrapper = styled.div`
  height: 500px;
  background-color: white;
  padding: 1rem;
  border-radius: 20px;
  margin-top: 16px;
  margin-bottom: 16px;
  box-shadow: 0 0 8px -4px rgba(0, 0, 0, 0.5);

  .leaflet-container {
    height: 100%;
  }
`

function Map({ countries, casesType, center, zoom }) {
  return (
    <MapWrapper>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        {showDataOnMap(countries, casesType)}
      </LeafletMap>
    </MapWrapper>
  )
}

export default Map
