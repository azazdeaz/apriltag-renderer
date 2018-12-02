import * as React from 'react'

interface IProps {
  base64: string | null
}

export class Tag extends React.Component<IProps> {
  private canvasRef: React.RefObject<HTMLCanvasElement>
  constructor(props: IProps) {
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
    if (canvas === null || !this.props.base64) {
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
    img.src = this.props.base64
  }
}
