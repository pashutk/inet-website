import { WordDefinition } from '@cicada-lang/inet'
import { State } from '../../State'
import { renderButton } from '../../components/button/renderButton'
import { themeFontSize } from '../../theme/themeFontSize'
import { selectWord } from './selectWord'

export function renderWordListEntry(
  state: State,
  i: number,
  definition: WordDefinition,
  options: {
    height: number
    marginT: number
  },
): void {
  const { height, marginT } = options

  state.ctx.save()

  state.ctx.font = state.breakpoints.lg
    ? `${themeFontSize('lg')} monospace`
    : `${themeFontSize('base')} monospace`

  renderButton(state, {
    name: `words/${definition.name}`,
    text: definition.name,
    x: 0,
    y: marginT + height * i,
    height,
    isActive: (state) => state.wordState.selectedWord?.name === definition.name,
    isDisabled: (state) =>
      state.wordState.selectedWord?.name === definition.name,
    handler: (state) => selectWord(state, definition.name),
  })

  state.ctx.restore()
}
