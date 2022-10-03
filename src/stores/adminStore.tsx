import { trackPromise } from 'react-promise-tracker'
import { signOut } from 'firebase/auth'
import { getAdminsInfo, getAdminInfo } from '@/services/admin'
import { Admin } from '@/types/admin'
import { auth } from '@/services/firebase'

export type AdminStore = {
  admins: Admin[]
  admin: null | Admin
  getAdmin: (uid: string) => Promise<Admin>
  getAdmins: () => Promise<Admin[]>
  signOut: () => Promise<void>
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
    },

    async signOut () {
      await signOut(auth)
      this.admin = null
    }
  }
  return store
}
