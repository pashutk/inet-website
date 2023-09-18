import { Fetcher, Loader } from '@cicada-lang/inet-cute'
import { State } from './State'

export type StateOptions = {
  text: string
}

export async function loadState(options: StateOptions): Promise<State> {
  const { text } = options

  const fetcher = new Fetcher()
  const loader = new Loader({ fetcher })
  const url = new URL(window.location.href)

  const mod = await loader.load(url, { text })

  return {
    text,
    mod,
  }
}
