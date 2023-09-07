import { State } from '../State'
import { runGivenEdge } from '../components/net/runGivenEdge'
import { withinRect } from '../components/rect/withinRect'

export function handleClick(state: State, event: MouseEvent): void {
  for (const button of state.buttons.values()) {
    if (withinRect(button.rect, state.mouse.position)) {
      if (!button.isDisabled?.(state)) {
        button.onClick(state, event)
      }
    }
  }

  for (const clickableRect of state.clickableRects.values()) {
    if (withinRect(clickableRect.rect, state.mouse.position)) {
      if (!clickableRect.isDisabled?.(state)) {
        clickableRect.onClick(state, event)
      }
    }
  }

  for (const rendering of state.netRenderings.values()) {
    if (rendering.hoveredEdge) {
      const { first, second } = rendering.hoveredEdge
      if (first.port.isPrincipal && second.port.isPrincipal) {
        runGivenEdge(state, rendering, {
          first: first.port,
          second: second.port,
        })
      }
    }
  }
}
