import { getUserInfo } from '@/services/admin'
import { Admin } from '@/types/admin'

export type AdminStore = {
  admin: null | Admin;
  setAdmin: (payload: Admin) => void;
  getAdmin: (uid: string) => Promise<Admin>;
}

export const adminStore = (): AdminStore => {
  const store: AdminStore = {
    admin: null,

    setAdmin (admin: Admin) {
      this.admin = admin
    },

    async getAdmin (uid: string) {
      console.log(uid)
      const admin = await getUserInfo(uid)
      console.log(admin)
      this.setAdmin(admin)
      return admin
    }
  }
  return store
}
