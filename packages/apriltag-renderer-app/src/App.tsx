import { families, render } from 'apriltag-renderer'
import { GUI, Number, Select, Text } from 'dis-gui'
import { debounce } from 'lodash'
import * as React from 'react'
import './App.css'
import { GithubRibbon } from './GithubRibbon'
import { Tag } from './Tag'

const familyNames = families.map(family => family.name)

interface IState {
  base64: string | null
  family: string
  value: number
  size: number
  black: string
  white: string
}

class App extends React.Component<{}, IState> {
  private updateTag = debounce(async () => {
    const image = await render(this.state)
    this.setState({ base64: await image.base64() })
  }, 0)

  constructor(props) {
    super(props)
    this.state = {
      base64: null,
      black: '#000000',
      family: 'tag36h11',
      size: 300,
      value: 0,
      white: '#FFFFFF',
    }
  }
  public componentDidMount() {
    this.updateTag()
  }
  public render() {
    const { black, family, size, value, white, base64 } = this.state
    return (
      <div className="App">
        <GithubRibbon />
        <GUI>
          <Select
            label="Family"
            value={family}
            options={familyNames}
            onChange={this.setFamily}
          />
          <Number
            label="Size"
            value={size}
            min={5}
            max={2800}
            step={1}
            onChange={this.setSize}
          />
          <Number
            label="Value"
            value={value}
            min={0}
            max={this.getMaxValue()}
            step={1}
            onChange={this.setValue}
          />
          <Text label="Black" value={black} onChange={this.setBlack} />
          <Text label="White" value={white} onChange={this.setWhite} />
        </GUI>
        <header className="App-header">
          <h1 className="App-title">AprilTag Renderer</h1>
        </header>
        <pre className="App-intro">
          {`--family ${family} --value ${value} --size ${size} --black "${black}" --white "${white}"`}
        </pre>
        <Tag base64={base64} />
      </div>
    )
  }
  private getMaxValue = (family?: string) => {
    family = family || this.state.family
    const info = families.find(({ name }) => name === family)
    return info ? info.values - 1 : 0
  }
  private updateOptions = (options: Partial<IState>) => {
    const newState = { ...options } as IState
    const maxValue = this.getMaxValue(newState.family)
    newState.value = Math.max(0, Math.min(newState.value, maxValue))
    
    this.setState(newState)
    this.updateTag()
  }
  private setFamily = (family: string) => this.updateOptions({ family })
  private setValue = (value: number) => this.updateOptions({ value })
  private setSize = (size: number) => this.updateOptions({ size })
  private setBlack = (black: string) => this.updateOptions({ black })
  private setWhite = (white: string) => this.updateOptions({ white })
}

export default App
