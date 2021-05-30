import { Node as TipTapNode, Command as TipTapCommand } from '@tiptap/core'

export interface VideoOptions {
  allowFullscreen: boolean,
  HTMLAttributes: {
    [key: string]: any
  },
}

declare module '@tiptap/core' {
  interface Commands {
    video: {
      /**
       * Add an iframe
       */
      setVideo: (options: { src: string }) => TipTapCommand,
    }
  }
}

export const Video = TipTapNode.create({
  name: 'video',
  group: 'block',
  atom: true,
  defaultOptions: <VideoOptions>{
    allowFullscreen: true,
    HTMLAttributes: {
      class: 'video-wrapper'
    }
  },

  addAttributes () {
    return {
      src: {
        default: null
      },
      loop: {
        default: true
      },
      controls: {
        default: true
      }
    }
  },

  parseHTML () {
    return [{
      tag: 'video'
    }]
  },

  renderHTML ({ HTMLAttributes }) {
    return ['div', this.options.HTMLAttributes, ['video', HTMLAttributes]]
  },

  addCommands () {
    return {
      setVideo: (options: { src: string }) => ({ tr, dispatch }) => {
        const { selection } = tr
        const node = this.type.create(options)

        if (dispatch) {
          tr.replaceRangeWith(selection.from, selection.to, node)
        }

        return true
      }
    }
  }
})
