import { Value } from '@cicada-lang/inet'
import { State } from '../State'
import { Rect } from '../button/Rect'
import { createSelectedValue } from '../selected-value/createSelectedValue'

export function renderLocalVariableEntry(
  state: State,
  i: number,
  name: string,
  value: Value,
): void {
  state.ctx.save()

  const nameText = '$' + name
  state.ctx.font = '16px monospace'
  const nameTextMetrics = state.ctx.measureText(nameText)
  const xPadding = 10
  const width = nameTextMetrics.width + xPadding * 2
  const height = 34
  const x = 0
  const y = 0 + height * i

  state.ctx.beginPath()
  const rect: Rect = [x, y, width, height]
  state.ctx.clearRect(...rect)
  state.ctx.strokeStyle = 'black'
  state.ctx.lineWidth = 1
  // state.ctx.strokeRect(...rect)
  state.ctx.fillText(nameText, x + xPadding, y + height - 12)

  if (name === state.selectedLocalName) {
    state.ctx.beginPath()
    state.ctx.lineWidth = 1.3
    state.ctx.moveTo(x + xPadding, y + height - 5)
    state.ctx.lineTo(x + width - xPadding, y + height - 5)
    state.ctx.stroke()
  }

  state.buttons.set(`locals.${name}`, {
    rect,
    handler: (state) => {
      state.selectedValue = createSelectedValue(state, value)
      state.selectedLocalName = name
    },
  })

  state.ctx.restore()
}
