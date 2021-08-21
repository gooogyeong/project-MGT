export const widthMobileScreen = '600px'

const size = {
  widthMobileScreen,
  fontSizeMobile: '1.7rem'
}

const color = {
  turquoiseLight: '#D4F9F9',
  beigeLight: '#FAF4D3'
}

const zIndex = {
  zIndexMobileNavBar: 10,
  zIndexToolBar: 15,
  zIndexModal: 20,
  zIndexLoading: 30
}

export const theme = Object.assign({}, size, color, zIndex)
