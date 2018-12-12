import { families } from 'apriltag-renderer'
import { Button, GUI, Number, Select, Text } from 'dis-gui'
import * as React from 'react'
import './App.css'
import { GithubRibbon } from './GithubRibbon'
import { Tag } from './Tag'
import FileSaver from 'file-saver'

const familyNames = families.map(family => family.name)

interface IState {
  family: string
  value: number
  size: number
  black: string
  white: string
}

const guiStyle = {
  backgroundColor: '#171219',
  highlight: '#FFB20E',
  label: {
    fontColor: '#FFB20E',
    fontWeight: 'normal',
  },
  lowlight: '#636564',
  lowlighterr: '#FBB',
  paddingX: 3,
  paddingY: 3,
  separator: '1px solid #171219',
}

class App extends React.Component<{}, IState> {
  constructor(props) {
    super(props)
    this.state = {
      black: '#000000',
      family: 'tag36h11',
      size: 300,
      value: 0,
      white: '#FFFFFF',
    }
  }
  public render() {
    const { black, family, size, value, white } = this.state
    return (
      <div className="App">
        <GithubRibbon />
        <GUI style={guiStyle}>
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
          <Button label="Download" onClick={this.downloadImage} />
        </GUI>
        <header className="App-header">
          <h1 className="App-title">AprilTag Renderer</h1>
        </header>
        <pre className="App-intro">
          {`--family ${family} --value ${value} --size ${size} --black "${black}" --white "${white}"`}
        </pre>
        <Tag {...this.state} />
      </div>
    )
  }
  private getMaxValue = (family?: string) => {
    family = family || this.state.family
    const info = families.find(({ name }) => name === family)
    return info ? info.values - 1 : 0
  }
  private updateOptions = (options: Partial<IState>) => {
    if ('family' in options) {
      // make sure that the value is in the boundaries of the new family
      const maxValue = this.getMaxValue(options.family)
      options.value = Math.max(
        0,
        Math.min(options.value || this.state.value, maxValue)
      )
    }

    this.setState(options as IState)
  }
  private setFamily = (family: string) => this.updateOptions({ family })
  private setValue = (value: number) => this.updateOptions({ value })
  private setSize = (size: number) => this.updateOptions({ size })
  private setBlack = (black: string) => this.updateOptions({ black })
  private setWhite = (white: string) => this.updateOptions({ white })
  private downloadImage = async () => {
    const { base64 } = this.state
    const res = await fetch(url)
    const blob = res.blob()
    FileSaver.saveAs(blob, "hello world.txt")
  }
}

export default App
