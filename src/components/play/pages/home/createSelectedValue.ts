import { Value, copyConnectedComponent, createNet } from '@cicada-lang/inet'
import { State } from '../../State'
import { createRandomNetLayout } from '../../net-layout/createRandomNetLayout'
import { SelectedValue } from './SelectedValue'

export function createSelectedValue(state: State, value: Value): SelectedValue {
  const stackIndex = state.mod.env.stack.length - 1

  if (value['@kind'] === 'Port') {
    const net = createNet()
    copyConnectedComponent(state.mod.env.net, net, value.node)
    const layout = createRandomNetLayout(
      net,
      state.width / 5,
      state.height / 5,
      (state.width * 3) / 5,
      (state.height * 3) / 5,
    )

    const rendering = { net, layout, step: 0 }

    return {
      '@type': 'SelectedValue',
      '@kind': 'SelectedValuePort',
      port: value,
      rendering,
      stackIndex,
    }
  } else {
    return {
      '@type': 'SelectedValue',
      '@kind': 'SelectedValueGeneric',
      value,
      stackIndex,
    }
  }
}
