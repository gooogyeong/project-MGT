export type PostStore = {

}

export const postStore = (): PostStore => {
  const store: PostStore = {
    tags: []
  }
  return store
}
