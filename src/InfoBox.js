import React from 'react'
import styled from 'styled-components'

import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBoxWrapper = styled.div`
  .infoBox {
    flex: 1;
    cursor: pointer;
  }
  .infoBox:not(:last-child) {
    margin-right: 15px;
  }

  .infoBox-title {
  }
  .infoBox-cases {
    color: #cc1034;
    font-weight: 600;
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }
  .infoBox-total {
    color: #6c757d;
    font-weight: 700;
    font-size: 0.8rem;
    margin-top: 15px;
  }
  .infoBox--selected {
    border-top: 5px solid greenyellow;
  }

  .infoBox--red {
    border-color: red;
  }

  .infoBox__cases--green {
    color: lightgreen !important;
  }
`

function InfoBox({ title, cases, isRed, active, total, ...props }) {
  return (
    <InfoBoxWrapper>
      <Card
        onClick={props.onClick}
        className={`infoBox ${active && 'infoBox--selected'} ${
          isRed && 'infoBox--red'
        }`}
      >
        <CardContent>
          <Typography className="infoBox-title" color="textSecondary">
            {title}
          </Typography>
          <h2 className={`infoBox__cases ${!isRed && 'infoBox__cases--green'}`}>
            {cases}
          </h2>
          <Typography className="infoBox_total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </InfoBoxWrapper>
  )
}

export default InfoBox
