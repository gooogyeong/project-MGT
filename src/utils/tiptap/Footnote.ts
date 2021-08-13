import { Node } from '@tiptap/core'
import FootnoteHelperComponent from '@/components/shared/FootnoteHelper'
import { Command as TipTapCommand } from '@tiptap/core/dist/packages/core/src/types'

export interface FootnoteOptions {
  HTMLAttributes: {
    [key: string]: any
  },
}

// TODO: 개선
let id = ''

declare module '@tiptap/core' {
  interface Commands {
    footnoteComponent: {
      setFootnoteComponent: (options: {
        id: string,
      }) => TipTapCommand,
    }
  }
}

const Footnote = Node.create({
  name: 'footnote',
  group: 'inline',
  content: 'inline*',
  inline: true,
  atom: true,
  defaultOptions: {
    HTMLAttributes: {
      class: 'footnote--label'
    }
  } as FootnoteOptions,

  addNodeView () {
    return () => {
      return new FootnoteHelperComponent(id)
    }
  },

  toDOM: () => {
    return ['footnote', 0]
  },

  parseDOM: [{ tag: 'footnote' }],

  addAttributes () {
    return {
      class: {
        default: 'footnote--label'
      }
    }
  },

  parseHTML () {
    return [{
      tag: 'footnote'
    }]
  },

  renderHTML () {
    return ['footnote', { className: 'footnote--label' }]
  },

  addCommands () {
    return {
      setFootnoteComponent: (options: { id: string }) => ({ tr, dispatch, commands }) => {
        const { selection } = tr
        id = options.id
        const node = this.type.create({ id: options.id })

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      }
    }
  }
})

export default Footnote
