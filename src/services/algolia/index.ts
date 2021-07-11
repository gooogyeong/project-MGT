import algoliasearch from 'algoliasearch'
import config from '../../../env.json'

const searchClient = algoliasearch(
  config.algoliaConfig.appId,
  config.algoliaConfig.searchApiKey
)

export const postIndex = searchClient
  .initIndex('post_search')
