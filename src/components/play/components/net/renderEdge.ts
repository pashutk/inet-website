import { formatEdge, Port } from '@cicada-lang/inet-cute'
import colors from 'tailwindcss/colors'
import { edgeDistance } from '../../../../utils/geometry/edgeDistance'
import { State } from '../../State'
import { NetRendering } from '../net/NetRendering'

export function renderEdge(
  state: State,
  rendering: NetRendering,
  first: {
    port: Port
    position: [number, number]
  },
  second: {
    port: Port
    position: [number, number]
  },
): void {
  const id = formatEdge({ first: first.port, second: second.port })

  const distance = edgeDistance(
    first.position,
    second.position,
    state.mouse.position,
  )

  rendering.hoverableEdges.set(id, { id, distance, first, second })

  const isHovered = id === rendering.hoveredEdge?.id

  state.ctx.save()

  state.ctx.strokeStyle = state.theme.name === 'dark' ? 'white' : 'black'
  state.ctx.fillStyle = state.theme.name === 'dark' ? 'white' : 'black'
  state.ctx.lineWidth = isHovered ? 3 : 1.3

  if (first.port.isPrincipal && second.port.isPrincipal) {
    if (state.theme.name === 'dark') {
      state.ctx.strokeStyle = colors.rose[400]
    } else {
      state.ctx.strokeStyle = colors.rose[500]
    }

    state.ctx.lineWidth = isHovered ? 6 : 3
  }

  if (first.port.isPrincipal && !second.port.isPrincipal) {
    const gradient = state.ctx.createLinearGradient(
      ...first.position,
      ...second.position,
    )

    if (state.theme.name === 'dark') {
      gradient.addColorStop(0, colors.rose[400])
      gradient.addColorStop(0.4, colors.rose[400])
      gradient.addColorStop(0.6, 'white')
      gradient.addColorStop(1, 'white')
    } else {
      gradient.addColorStop(0, colors.rose[500])
      gradient.addColorStop(0.4, colors.rose[500])
      gradient.addColorStop(0.6, 'black')
      gradient.addColorStop(1, 'black')
    }

    state.ctx.strokeStyle = gradient
    state.ctx.lineWidth = isHovered ? 4 : 1.3
  }

  if (!first.port.isPrincipal && second.port.isPrincipal) {
    const gradient = state.ctx.createLinearGradient(
      ...first.position,
      ...second.position,
    )

    if (state.theme.name === 'dark') {
      gradient.addColorStop(0, 'white')
      gradient.addColorStop(0.4, 'white')
      gradient.addColorStop(0.6, colors.rose[400])
      gradient.addColorStop(1, colors.rose[400])
    } else {
      gradient.addColorStop(0, 'black')
      gradient.addColorStop(0.4, 'black')
      gradient.addColorStop(0.6, colors.rose[500])
      gradient.addColorStop(1, colors.rose[500])
    }

    state.ctx.strokeStyle = gradient
    state.ctx.lineWidth = isHovered ? 4 : 1.3
  }

  state.ctx.beginPath()
  state.ctx.moveTo(first.position[0], first.position[1])
  state.ctx.lineTo(second.position[0], second.position[1])
  state.ctx.stroke()

  state.ctx.restore()
}
