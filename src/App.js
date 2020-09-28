import React from 'react'
import styled, { ThemeProvider } from 'styled-components'

import theme from './theme'
import GlobalStyles from './GlobalStyles'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <div className="App">
        <header className="App-header">Coronga Tracker App</header>
      </div>
    </ThemeProvider>
  )
}

export default App
