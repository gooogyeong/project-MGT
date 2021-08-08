export default class FootnoteComponent {
  id: string;
  constructor (id: string) {
    this.id = id
    const footnote = document.createElement('div')
    footnote.className = `footnote__wrapper`
  }

  destroy () {
    try {
      const footnoteContent = document.getElementById(this.id) as HTMLElement
      if (footnoteContent) footnoteContent.remove()
    } catch (error) {
      console.log(error)
    }
  }
}
