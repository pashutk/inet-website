import { vectorDistance } from '../vector'
import { perpendicularFoot } from './perpendicularFoot'

export function edgeDistance(
  [x0, y0]: [number, number],
  [x1, y1]: [number, number],
  [x, y]: [number, number],
): number {
  const [footX, footY] = perpendicularFoot([x0, y0], [x1, y1], [x, y])
  if (x0 < footX && footX < x1) {
    return vectorDistance([footX, footY], [x, y])
  } else {
    return Math.min(
      vectorDistance([x0, y0], [x, y]),
      vectorDistance([x1, y1], [x, y]),
    )
  }
}