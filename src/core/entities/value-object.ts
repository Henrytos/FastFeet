export class ValueObject<Props> {
  protected props: Props

  protected constructor(props: Props) {
    this.props = props
  }

  public equal(vo: ValueObject<unknown>) {
    if (vo === null || vo === undefined) {
      return false
    }

    if (vo.props === undefined) {
      return false
    }

    return JSON.stringify(this.props) === JSON.stringify(vo.props)
  }
}
