import React from 'react'
import styled from 'styled-components'
import numeral from 'numeral'

const TableWrapper = styled.div`
  margin-top: 20px;
  overflow: scroll;
  height: 400px;
  background-color: white;
  color: #6a5d5d;

  tr {
    display: flex;
    justify-content: space-between;
  }

  td {
    padding: 0.5rem;
  }

  tr:nth-of-type(odd) {
    background-color: #f3f2f8;
  }
`

function Table({ countries }) {
  return (
    <TableWrapper>
      {countries.map(({ country, cases }) => (
        <tr>
          <td>{country}</td>
          <td>
            <strong>{numeral(cases).format('0,0')}</strong>
          </td>
        </tr>
      ))}
    </TableWrapper>
  )
}

export default Table
