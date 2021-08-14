import HardBreak from '@tiptap/extension-hard-break'

const HardBreakExtension = HardBreak.extend({
  addKeyboardShortcuts () {
    return {
      Enter: () => {
        return this.editor.commands.setHardBreak()
      }
    }
  }
})

export default HardBreakExtension
