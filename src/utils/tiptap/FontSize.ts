import { Command, Extension } from '@tiptap/core'
import '@tiptap/extension-text-style'

type FontSizeOptions = {
  types: string[],
}

declare module '@tiptap/core' {
  interface Commands {
    fontSize: {
      /**
       * Set font size
       */
      setFontSize: (fontSize: string) => Command,
      /**
       * Unset font size
       */
      unsetFontSize: () => Command,
    }
  }
}

export const FontSize = Extension.create<FontSizeOptions>({
  name: 'fontSize',

  defaultOptions: {
    types: ['textStyle'],
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }

              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
            parseHTML: element => ({
              fontSize: element.style.fontSize.replace(/['"]+/g, ''),
            }),
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: fontSize => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
})
