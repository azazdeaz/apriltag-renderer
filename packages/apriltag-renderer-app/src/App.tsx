import { GUI, Text } from 'dis-gui'
import * as React from 'react'
import './App.css'
import { Tag } from './Tag'

import logo from './logo.svg'

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <GUI>
          <Text
            label="Text"
            value="Hello world!"
            onChange={this.onTextChange}
          />
        </GUI>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <Tag/>
      </div>
    )
  }
  private onTextChange = value => {
    throw new Error(value)
  }
}

export default App
