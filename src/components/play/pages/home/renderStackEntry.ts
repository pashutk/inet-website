import { Value, formatValue } from '@cicada-lang/inet'
import { State } from '../../State'
import { renderButton } from '../../components/button/renderButton'
import { createSelectedValue } from '../../components/env/createSelectedValue'
import { themeFontSize } from '../../theme/themeFontSize'

export function renderStackEntry(
  state: State,
  i: number,
  value: Value,
  options: {
    height: number
    marginL: number
  },
): void {
  const { height, marginL } = options

  const text = formatValue(value)
  const x = marginL
  const y = state.height - height * (i + 1)

  state.ctx.font = state.breakpoints.lg
    ? `${themeFontSize('lg')} monospace`
    : `${themeFontSize('base')} monospace`

  renderButton(state, {
    name: `stack[${i}]`,
    text,
    x,
    y,
    height,
    isDisabled: (state) => i === state.homeState.envRendering.stackInViewIndex,
    isActive: (state) => i === state.homeState.envRendering.stackInViewIndex,
    handler: (state) => {
      state.homeState.envRendering.selectedValue = createSelectedValue(
        state.homeState.envRendering,
        value,
      )
      state.homeState.envRendering.stackInViewIndex = i
      state.homeState.envRendering.localName = undefined
    },
  })
}
