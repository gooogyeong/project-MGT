import { getAdminsInfo, getAdminInfo } from '@/services/admin'
import { Admin } from '@/types/admin'
import { trackPromise } from 'react-promise-tracker'

export type AdminStore = {
  admins: Admin[];
  admin: null | Admin;
  getAdmin: (uid: string) => Promise<Admin>;
  getAdmins: () => Promise<Admin[]>;
}

export const adminStore = (): AdminStore => {
  const store: AdminStore = {
    admins: [],
    admin: null,

    async getAdmin (uid: string) {
      const admin = await trackPromise(getAdminInfo(uid))
      this.admin = admin
      return admin
    },

    async getAdmins () {
      const admins = await trackPromise(getAdminsInfo())
      this.admins = admins
      return admins
    }
  }
  return store
}
