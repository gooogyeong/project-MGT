export type MobileStore = {
  isMobile: boolean;
  isTablet: boolean;
  setIsMobile: (payload: boolean) => void;
  setIsTablet: (payload: boolean) => void;
}

export const mobileStore = (): MobileStore => {
  const store: MobileStore = {
    isMobile: false,
    isTablet: false,

    setIsMobile (isMobile) {
      this.isMobile = isMobile
    },

    setIsTablet (isTablet) {
      this.isTablet = isTablet
    }
  }
  return store
}
