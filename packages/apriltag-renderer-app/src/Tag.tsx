import { render } from 'apriltag-renderer'
import * as React from 'react'
import './App.css'

interface IProps {
  family: string
  value: number
  size: number
  black: string
  white: string
}

interface IState {
  base64: string | null
}

export class Tag extends React.Component<IProps, IState> {
  private pRendering: Promise<void> | null = null
  private rerenderRequested: boolean = false

  constructor(props) {
    super(props)
    this.state = {
      base64: null,
    }
  }
  public componentDidMount() {
    this.updateTag(this.props)
  }
  public componentWillReceiveProps(nextProps) {
    this.updateTag(nextProps)
  }
  public render() {
    const { base64 } = this.state
    const { size } = this.props
    return base64 ? (
      <img src={base64} style={{ width: size, height: size }} />
    ) : null
  }
  private updateTag = (props: IProps) => {
    // make sure that only one render is running at once
    //  (there should be some better utility for this)
    if (this.pRendering) {
      this.rerenderRequested = true
      return this.pRendering
    }
    return (async () => {
      const image = await render(props)
      this.setState({ base64: await image.base64() })
      if (this.rerenderRequested) {
        this.rerenderRequested = false
        this.updateTag(this.props)
      }
    })()
  }
}
