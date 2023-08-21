import { copyConnectedComponent } from '@cicada-lang/inet/lib/lang/net/copyConnectedComponent'
import { createNet } from '@cicada-lang/inet/lib/lang/net/createNet'
import { Current } from './Current.ts'
import { State } from './State.ts'
import { createInitialNetLayout } from './createInitialNetLayout.ts'

export function stateCurrent(state: State): Current | undefined {
  const currentValue = state.mod.env.stack[state.mod.env.stack.length - 1]

  if (currentValue === undefined) {
    return undefined
  }

  if (currentValue['@kind'] === 'Port') {
    const net = createNet()
    copyConnectedComponent(state.mod.env.net, net, currentValue.node)
    const layout = createInitialNetLayout(state, net)

    return {
      '@type': 'Current',
      '@kind': 'CurrentPort',
      port: currentValue,
      net,
      layout,
    }
  } else {
    return {
      '@type': 'Current',
      '@kind': 'CurrentValue',
      value: currentValue,
    }
  }
}
