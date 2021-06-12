import Image from '@tiptap/extension-image'
import { mergeAttributes } from '@tiptap/core'

type ImageAttribute = {
  size?: string;
  position?: string;
}

export default Image.extend({
  name: 'custom-image',

  defaultOptions: {
    ...Image.options,
    sizes: ['small', 'medium', 'large'],
    positions: ['center', 'flex-start', 'flex-end']
  },

  addAttributes() {
    return {
      // @ts-ignore
      ...Image.config.addAttributes(),
      size: {
        default: '',
        rendered: false
      },
      position: {
        default: '',
        rendered: false
      }
    }
  },

  addCommands() {
    // @ts-ignore
    return {
      // This is unchanged from the original
      // Image setImage function
      // However, if I extended addComands in
      // the same way as addAttributes `this`
      // seemed to lose context, so I've just
      // copied it in here directly
      setImage: (options) => ({ tr, dispatch }) => {
        const { selection } = tr
        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      },
      // @ts-ignore
      setSize: (attributes: ImageAttribute) => ({ tr, dispatch }) => {
        if (attributes.size !== undefined && !this.options.sizes.includes(attributes.size)) {
          return false
        }

        const { selection } = tr

        if (selection.node === undefined) return false

        const options = {
          ...selection.node.attrs,
          ...attributes
        }

        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }
      },
      // @ts-ignore
      setPosition: (attributes: ImageAttribute) => ({ tr, dispatch }) => {
        if (attributes.position !== undefined && !this.options.positions.includes(attributes.position)) {
          return false
        }

        const { selection } = tr

        if (selection.node === undefined) return false

        const options = {
          ...selection.node.attrs,
          ...attributes
        }

        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }
      }
    }
  },

  renderHTML({ node, HTMLAttributes }) {
    const size = getWidth(node.attrs.size) // node.attrs.size
    const position = node.attrs.position

    if (size) HTMLAttributes.style = size

    return ['div', { class: 'img__wrapper', style: `display: flex; justify-content: ${position};` }, [
      'img',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)
    ]]
  }
})

const getWidth = (size: string) => {
  switch (size) {
    case 'small':
      return `width: 300px; height: 250px;`
    case 'medium':
      return `width: 500px; height: 300px`
    default:
      return ''
  }
}
