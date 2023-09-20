import NodeModel from '@/packages/type'
import { INodeGroup } from '@/packages/with-base-config'
import createNode from './create-node'
import { levelMap, Level } from './normal-node'
const r = 26

const config = {
  r: r + 5,
  options: {
    stateStyles: {
      hover: {
        stroke: 'red',
      },
      selected: {},
      'risk:severe': {
        stroke: levelMap.severe,
        lineWidth: 10,
        strokeOpacity: 0.3,
      },
      'risk:high': {
        stroke: levelMap.high,
      },
      'risk:medium': {
        stroke: levelMap.medium,
      },
      'risk:low': {
        stroke: levelMap.low,
      },
    },
  },
  draw(cfg: NodeModel, group: INodeGroup) {
    createNode(cfg, group, {
      text: cfg.label as string,
      attrs: { fill: levelMap[cfg.level as Level] },
      textAttrs: { fill: '#fff' },
    })
    const keyShape = group.addNodeShape('circle', {
      attrs: {
        r: r + 5,
        lineWidth: 2,
        stroke: '#7033FF',
        cursor: 'pointer',
      },
      names: ['root-node'],
    })
    return keyShape
  },
}
export default config
