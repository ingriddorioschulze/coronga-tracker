import React from 'react'
import styled from 'styled-components'

import { Card, CardContent, Typography } from '@material-ui/core'

const InfoBoxWrapper = styled.div``

function InfoBox({ title, cases, total }) {
  return (
    <InfoBoxWrapper>
      <Card className="infoBox">
        <CardContent>
          <Typography className="infoBox__title" color="textSecondary">
            {title}
          </Typography>
          <h2 className="infoBox__cases">{cases}</h2>
          <Typography className="infoBox__total" color="textSecondary">
            {total} Total
          </Typography>
        </CardContent>
      </Card>
    </InfoBoxWrapper>
  )
}

export default InfoBox
