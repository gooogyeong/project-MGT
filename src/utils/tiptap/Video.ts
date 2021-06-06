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
  defaultOptions: {
    allowFullscreen: true,
    HTMLAttributes: {
      class: 'video-wrapper'
    }
  } as VideoOptions,

  addAttributes () {
    return {
      src: {
        default: null
      },
      /*autoplay: {
        default: false
      },*/
      // loop: {
      //   default: true
      // },
      controls: {
        default: true
      }// ,
      // width: {
      //   default: 500
      // },
      // height: {
      //   default: 300
      // }
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