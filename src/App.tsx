import React, { useEffect } from 'react'
import AppRouter from '@/routers'
import { AuthProvider } from '@/components/Auth'
import StoreProvider from '@/stores/context'
import { postIndex } from '@/services/algolia'
import { PostPayloadKey } from '@/types/posts'

function App () {

  // TODO: uncomment
  useEffect(() => {
    const setSearchSetting = async () => {
      try {
  //       // TODO: 얘 어디로 옮겨야 .. ??
        await postIndex.setSettings({
          attributesForFaceting: [
            PostPayloadKey.authorUid,
            PostPayloadKey.categoryId,
            PostPayloadKey.title,
            PostPayloadKey.content,
            PostPayloadKey.tags
          ],
          ranking: [
            `desc(${PostPayloadKey.createdAt})`
          ]
        })
      } catch (error) {
        console.log(error)
      }
    }
    setSearchSetting()
  }, [])

  return (
    <StoreProvider>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </StoreProvider>
  )
}

export default App
