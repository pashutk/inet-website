import { State } from '../../State'
import { renderButton } from '../../button/renderButton'
import { fontSize } from '../../theme/fontSize'
import { selectWord } from './selectWord'

export function renderWordList(state: State): void {
  state.ctx.save()

  const height = 34
  const marginT = height + 15

  state.ctx.font = state.breakpoints.md
    ? `${fontSize('lg')} monospace`
    : `${fontSize('base')} monospace`

  let i = 0
  for (const [name, definition] of state.mod.definitions) {
    if (definition['@kind'] === 'WordDefinition') {
      renderButton(state, name, 0, marginT + height * i, {
        name: `words/${name}`,
        height,
        paddingX: 10,
        isActive: (state) => state.selectedWord?.name === name,
        isDisabled: (state) => state.selectedWord?.name === name,
        activeUnderline: { offset: 8, width: 1.5 },
        handler: (state) => selectWord(state, name),
      })

      i++
    }
  }

  state.ctx.restore()
}
