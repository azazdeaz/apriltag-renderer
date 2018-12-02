import { render } from 'apriltag-renderer'
import * as React from 'react'

export class Tag extends React.Component {
  private canvasRef: React.RefObject<HTMLCanvasElement>
  constructor(props) {
    super(props)
    this.canvasRef = React.createRef()
  }
  public render() {
    return <canvas ref={this.canvasRef} />
  }
  public componentDidMount() {
    this.draw()
  }
  public componentDidUpdate() {
    this.draw()
  }
  private async draw() {
    const canvas = this.canvasRef.current
    if (canvas === null) {
      return
    }
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      if (!ctx) {
        return
      }
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    }
    const image = await render()
    img.src = await image.base64()
  }
}
