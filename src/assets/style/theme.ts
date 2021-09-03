export const widthMobileScreen = '600px'
export const widthTabletScreen = '1200px'
export const widthTabletSmall = '800px'
export const widthTabletMedium = '980px'

export const turquoiseLighter = '#D4FBF9'

const size = {
  widthMobileScreen,
  widthTabletScreen,
  widthTabletSmall,
  widthTabletMedium,
  fontSizeMobile: '1.7rem'
}

const color = {
  turquoiseLight: '#D4F9F9',
  turquoiseLighter,
  beigeLight: '#FAF4D3'
}

const zIndex = {
  zIndexMobileNavBar: 10,
  zIndexToolBar: 15,
  zIndexModal: 20,
  zIndexLoading: 30
}

export const theme = Object.assign({}, size, color, zIndex)
