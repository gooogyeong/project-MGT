export type MobileStore = {
  isMobile: boolean;
  isTablet: boolean;
  isTabletMedium: boolean;
  setIsMobile: (payload: boolean) => void;
  setIsTablet: (payload: boolean) => void;
  setIsTabletMedium: (payload: boolean) => void;
}

export const mobileStore = (): MobileStore => {
  const store: MobileStore = {
    isMobile: false,
    isTablet: false,
    isTabletMedium: false,

    setIsMobile (isMobile) {
      this.isMobile = isMobile
    },

    setIsTablet (isTablet) {
      this.isTablet = isTablet
    },

    setIsTabletMedium (isTabletMedium) {
      this.isTabletMedium = isTabletMedium
    }
  }
  return store
}
