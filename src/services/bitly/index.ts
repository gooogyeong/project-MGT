import { BitlyClient } from 'bitly-react'
import config from '../../../env.json'
export const bitly = new BitlyClient(config.bitlyAPIKey, {})
