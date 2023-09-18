import { formatWord } from '@cicada-lang/inet-cute'
import { useGlobalLang } from '../../../lang/useGlobalLang'
import { State } from '../../State'
import { renderText } from '../../components/text/renderText'
import { themeFontSize } from '../../theme/themeFontSize'
import { SelectedType } from './SelectedType'

export function renderSelectedType(
  state: State,
  selectedType: SelectedType,
): void {
  const lang = useGlobalLang()

  state.ctx.save()

  state.ctx.fillStyle = state.theme.name === 'dark' ? 'white' : 'black'

  const x = state.width / 3
  const y = state.height / 2

  state.ctx.font = state.breakpoints.lg
    ? `${themeFontSize('3xl')} monospace`
    : `${themeFontSize('2xl')} monospace`

  renderText(state, {
    text: selectedType.definition.name,
    x,
    y: y - 60,
    lineHeight: 30,
  })

  state.ctx.font = state.breakpoints.lg
    ? `${themeFontSize('2xl')} monospace`
    : `${themeFontSize('xl')} monospace`

  const inputText = selectedType.definition.input.map(formatWord).join(' ')
  const outputText = selectedType.definition.output.map(formatWord).join(' ')

  const text = lang.isZh()
    ? [`输入：${inputText}`, `输出：${outputText}`].join('\n')
    : [`input: ${inputText}`, `output: ${outputText}`].join('\n')

  renderText(state, {
    text,
    x,
    y,
    lineHeight: 30,
  })

  state.ctx.restore()
}
