import G6, { LayoutConfig, NodeConfig } from '@antv/g6'

import registerEdge, { EdgeOptions } from './register-edge'
import createTooltip, { TooltipOptions } from './create-tooltip'
import getMenu, { MenuOption } from './menu'

export type CreateG6Options = {
  el: HTMLDivElement
  defaultNodeType?: string
  layout?: LayoutConfig
  menuOptions?: MenuOption[]
  edgeLabelRender?: EdgeOptions['edgeLabelRender']
  hideClip?: EdgeOptions['hideClip']
  nodeTooltipRender?: TooltipOptions['nodeTooltipRender']
  edgeTooltipRender?: TooltipOptions['edgeTooltipRender']
  getEdgeOptions?: EdgeOptions['getEdgeOptions']
  node?: (cfg: NodeConfig) => Partial<NodeConfig>
}
const createG6 = (
  data: any,
  {
    el,
    defaultNodeType,
    layout,
    menuOptions,
    edgeLabelRender,
    nodeTooltipRender,
    edgeTooltipRender,
    hideClip,
    getEdgeOptions,
    node,
  }: CreateG6Options
) => {
  const height = el.offsetHeight || 800
  const width = el.offsetWidth || 1000
  // 定制线
  G6.registerEdge('default-edge', registerEdge({ edgeLabelRender, hideClip, getEdgeOptions }) as any)
  // 小地图
  const minimap = new G6.Minimap({
    size: [220, 120],
  })
  // 点提示框交互工具的配置
  const tooltip = new G6.Tooltip(createTooltip({ nodeTooltipRender, edgeTooltipRender }))

  const menu = getMenu(menuOptions)
  const plugins: any[] = [minimap, tooltip]

  if (menu) {
    plugins.push(menu)
  }
  const graph = new G6.TreeGraph({
    container: el,
    width,
    height,
    animate: true,
    modes: {
      default: ['drag-canvas', 'zoom-canvas'],
    },
    defaultNode: {
      type: defaultNodeType,
    },
    defaultEdge: {
      type: 'default-edge',
    },
    layout: {
      type: 'compactBox',
      direction: 'H',
      getHeight: () => {
        return 25
      },
      getWidth: () => {
        return 25
      },
      getVGap: () => {
        return 35
      },
      getHGap: () => {
        return 150
      },
      getSide: (d: any) => {
        // 设置方向
        return d.data.side
      },
      ...layout,
    },
    plugins,
  })

  graph.node((cfg) => {
    return {
      ...cfg,
      ...(node ? node(cfg) : undefined),
    }
  })

  graph.data(data)
  graph.render()

  graph.fitCenter()

  return graph
}

export default createG6
