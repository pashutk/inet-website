import { State } from '../../State'
import { renderButtonBack } from '../../nav/renderButtonBack'
import { renderNavbar } from '../../nav/renderNavbar'
import { renderTypeDefinition } from './renderTypeDefinition'
import { renderTypeDefinitionList } from './renderTypeDefinitionList'

export function renderTypes(state: State): void {
  state.ctx.clearRect(0, 0, state.width, state.height)

  state.currentRoute.properties = state.currentRoute.properties || {}
  if (state.currentRoute.properties.name === undefined) {
    for (const [name, definition] of state.mod.definitions) {
      if (definition['@kind'] === 'TypeDefinition') {
        state.currentRoute.properties.name = name
        break
      }
    }
  }

  renderTypeDefinition(state)

  renderNavbar(state)
  if (state.history.length > 0) {
    renderButtonBack(state)
  }

  renderTypeDefinitionList(state)
}
