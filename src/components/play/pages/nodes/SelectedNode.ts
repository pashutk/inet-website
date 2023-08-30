import { NodeDefinition } from '@cicada-lang/inet'
import { RuleEntry } from '@cicada-lang/inet/lib/lang/mod/RuleEntry'
import { NetRendering } from '../../net-rendering/NetRendering'
import { SelectedRule } from './SelectedRule'

export type SelectedNode = {
  name: string
  definition: NodeDefinition
  rendering: NetRendering
  ruleEntries: Array<RuleEntry>
  selectedRule?: SelectedRule
}
