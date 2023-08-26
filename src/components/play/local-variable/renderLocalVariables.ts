import { State } from '../State'
import { renderLocalVariableEntry } from './renderLocalVariableEntry'

export function renderLocalVariables(state: State): void {
  state.ctx.save()

  const marginT = 5

  state.ctx.translate(0, marginT)

  let i = 0
  for (const [name, value] of state.mod.env.locals.entries()) {
    renderLocalVariableEntry(state, i, name, value)
    i++
  }

  state.ctx.restore()
}
