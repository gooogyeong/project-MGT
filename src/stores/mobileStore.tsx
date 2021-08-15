export type MobileStore = {
  isMobile: boolean;
  setIsMobile: (payload: boolean) => void;
}

export const mobileStore = (): MobileStore => {
  const store: MobileStore = {
    isMobile: false,

    setIsMobile (isMobile) {
      this.isMobile = isMobile
    }
  }
  return store
}
