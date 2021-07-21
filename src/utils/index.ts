import { RequestOptions } from '@algolia/transporter'
import { SearchOptions } from '@algolia/client-search'
import { PostPayloadKey } from '@/types/posts'
import { SearchRange } from '@/types/posts'

const getFilterStr = (searchOptionFlags: Record<string, string | SearchRange>, isPinnedNotice: boolean) => {
  let filterStr = ''
  if (searchOptionFlags.authorUid) {
    filterStr += `${PostPayloadKey.authorUid}:"${searchOptionFlags.authorUid}"`
  }
  if (searchOptionFlags.categoryId) {
    filterStr += `${filterStr.length ? ' AND ' : ''}${PostPayloadKey.categoryId}:"${searchOptionFlags.categoryId}"`
  }
  if (searchOptionFlags.tagId) {
    // TODO: 언제나 단독조건?
    filterStr += `${filterStr.length ? ' AND ' : ''}${PostPayloadKey.tags}:"${searchOptionFlags.tagId}"`
  }
  if (searchOptionFlags.searchRange) {
    filterStr += `${filterStr.length ? ' AND' : ''} createdAt:${(searchOptionFlags.searchRange as SearchRange).from} TO ${(searchOptionFlags.searchRange as SearchRange).to}`
  }
  // TODO: boolean 타입 처리하는 법 알았으면 좋겠음
  filterStr += `${filterStr.length ? ' AND ' : ''}${isPinnedNotice ? '' : 'NOT '}isPinned=1`
  return filterStr
}

// TODO: 타입 정교화
export const getSearchOptions = (
  searchOptionFlags: Record<PostPayloadKey, string>,
  page: number,
  hitsPerPage: number,
  isPinnedNotice?: boolean
): RequestOptions & SearchOptions => {
  const searchOptions = {
    filters: getFilterStr(searchOptionFlags, !!isPinnedNotice),
    page: page - 1,
    hitsPerPage: !isPinnedNotice ? hitsPerPage : 0
  } as Partial<RequestOptions & SearchOptions>
  Object.keys(searchOptions).forEach((key) => {
    if (key !== 'page' && !searchOptions[key]) delete searchOptions[key]
  })
  return searchOptions
}

export const kebabize = (str: string): string => {
  return str.split('').map((letter, idx) => {
    return letter.toUpperCase() === letter
      ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}`
      : letter
  }).join('')
}
