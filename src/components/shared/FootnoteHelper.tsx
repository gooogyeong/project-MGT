export default class FootnoteComponent {
  id: string;
  constructor (id: string) {
    this.id = id
    const footnoteCreate = new CustomEvent<string>('footnote-create', { detail: id })
    window.dispatchEvent(footnoteCreate)
  }

  destroy () {
    try {
      const footnoteDelete = new CustomEvent<string>('footnote-delete', { detail: this.id })
      window.dispatchEvent(footnoteDelete)
    } catch (error) {
      console.log(error)
    }
  }
}
