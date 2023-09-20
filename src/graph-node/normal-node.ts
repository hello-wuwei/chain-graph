import NodeModel from '@/packages/type'
import { INodeGroup } from '@/packages/with-base-config'
import createNode from './create-node'
export const levelMap = {
  severe: '#F45A4D',
  high: '#FFAC3E',
  medium: '#5733FF',
  low: '#65C9AB',
}

export type Level = keyof typeof levelMap

const r = 26
const config = {
  r,
  draw(cfg: NodeModel, group: INodeGroup) {
    const keyShape = createNode(cfg, group, {
      text: cfg.label as string,
      attrs: { fill: levelMap[cfg.level as Level] || '#F0F3F7' },
    })
    return keyShape
  },
}

export default config
