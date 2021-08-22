import '@tiptap/extension-text-style'
import { Mark } from '@tiptap/core'
import { turquoiseLighter } from '@/assets/style/theme'

type GradientOptions = {
  HTMLAttributes: Record<string, any>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    gradient: {
      setGradient: () => ReturnType,
      toggleGradient: () => ReturnType,
      unsetGradient: () => ReturnType,
    }
  }
}

export const Gradient = Mark.create<GradientOptions>({
  name: 'gradient',

  defaultOptions: {
    HTMLAttributes: {}
  },

  addAttributes () {
    return {
      color: {
        default: null,
        parseHTML: () => {
          return {
            ['background-image']: `linear-gradient(180deg, ${turquoiseLighter} 0%, rgba(212, 251, 249, 0.2) 48.96%, ${turquoiseLighter} 100%)`,
          }
        },
        renderHTML: () => {
          return {
            style: `background-image: linear-gradient(180deg, ${turquoiseLighter} 0%, rgba(212, 251, 249, 0.2) 48.96%, ${turquoiseLighter} 100%); margin: -1.3rem; padding: 0.7rem 1.3rem`
          }
        }
      }
    }
  },

  parseHTML () {
    return [
      {
        tag: 'h3'
      }
    ]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['h3', HTMLAttributes, 0]
  },

  addCommands () {
    return {
      toggleGradient: () => ({ commands }) => {
        return commands.toggleMark('gradient')
      }
    }
  }
})
