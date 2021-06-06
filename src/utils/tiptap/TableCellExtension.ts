import TableCell from '@tiptap/extension-table-cell'

export const TableCellExtension = TableCell.extend({
  addAttributes() {
    return {
      // extend the existing attributes
      ...this.parent?.(),

      // and add a new one
      backgroundColor: {
        default: null,
        parseHTML: element => {
          return {
            backgroundColor: element.getAttribute('data-background-color'),
          }
        },
        renderHTML: attributes => {
          return {
            'data-background-color': attributes.backgroundColor,
            style: `background-color: ${attributes.backgroundColor}`,
          }
        },
      },
    }
  },
})
