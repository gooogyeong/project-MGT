import Paragraph from '@tiptap/extension-paragraph'

const ParagraphExtension = Paragraph.extend({
  // TODO: 꼭 있어야하는건지?
  addKeyboardShortcuts () {
    return {
      Enter: () => {
        return this.editor.commands.setParagraph()
      }
    }
  }
})

export default ParagraphExtension
