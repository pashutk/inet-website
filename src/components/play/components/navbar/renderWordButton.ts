import { useGlobalLang } from '../../../lang/useGlobalLang'
import { State } from '../../State'
import { themeFontSize } from '../../theme/themeFontSize'
import { renderButton } from '../button/renderButton'

export function renderWordButton(
  state: State,
  options: {
    height: number
    marginT: number
  },
): void {
  const { height, marginT } = options

  const lang = useGlobalLang()
  const text = lang.isZh() ? `词汇` : `Word`

  const x = state.width
  const y = height * 2 + marginT

  state.ctx.font = state.breakpoints.lg
    ? `${themeFontSize('lg')} monospace`
    : `${themeFontSize('base')} monospace`

  const name = 'word'

  renderButton(state, {
    name,
    text,
    x,
    y,
    height,
    align: 'right',
    isActive: (state) => state.currentRoute.name === name,
    handler: (state) => {
      if (state.currentRoute.name === 'home') {
        state.history.push(state.currentRoute)
      }

      if (state.currentRoute.name !== name) {
        state.currentRoute = { name }
      }
    },
  })
}
