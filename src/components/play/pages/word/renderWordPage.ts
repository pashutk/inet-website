import { State } from '../../State'
import { renderSelectedValue } from '../../components/env/renderSelectedValue'
import { renderStack } from '../../components/env/renderStack'
import { renderBackButton } from '../../components/navbar/renderBackButton'
import { renderNavbar } from '../../components/navbar/renderNavbar'
import { evolveNet } from '../../components/net/evolveNet'
import { RenderOptions } from '../../route/Route'

import { renderWordList } from './renderWordList'
import { selectFirstWord } from './selectFirstWord'

export function renderWordPage(state: State, options: RenderOptions): void {
  state.ctx.clearRect(0, 0, state.width, state.height)

  if (state.wordState.selectedWord === undefined) {
    selectFirstWord(state)
  }

  if (state.wordState.selectedWord) {
    const { envRendering } = state.wordState.selectedWord

    if (envRendering.selectedValue) {
      renderSelectedValue(state, envRendering.selectedValue)

      if (envRendering.selectedValue['@kind'] === 'SelectedValuePort') {
        evolveNet(state, envRendering.selectedValue.netRendering)
      }
    }

    if (!state.isHidingUI) {
      renderStack(state, envRendering)
    }
  }

  if (!state.isHidingUI) {
    renderWordList(state)
    renderNavbar(state)
    if (state.history.length > 0) renderBackButton(state)
  }
}
