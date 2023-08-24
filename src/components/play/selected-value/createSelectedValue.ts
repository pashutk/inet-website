import { Value, copyConnectedComponent, createNet } from '@cicada-lang/inet'
import { State } from '../State'
import { createInitialNetLayout } from '../net-layout/createInitialNetLayout'
import { SelectedValue } from './SelectedValue'

export function createSelectedValue(state: State, value: Value): SelectedValue {
  if (value['@kind'] === 'Port') {
    const net = createNet()
    copyConnectedComponent(state.mod.env.net, net, value.node)
    const layout = createInitialNetLayout(state, net)

    return {
      '@type': 'SelectedValue',
      '@kind': 'SelectedValuePort',
      port: value,
      net,
      layout,
      evolvingStep: 0,
    }
  } else {
    return {
      '@type': 'SelectedValue',
      '@kind': 'SelectedValueGeneric',
      value,
    }
  }
}
