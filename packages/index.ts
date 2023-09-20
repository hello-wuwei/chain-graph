import G6, { TreeGraph, Item, IEdge, TreeGraphData, LayoutConfig, NodeConfig } from '@antv/g6'
import createG6 from './create-g6'
import NodeModel from './type'
import withBaseConfig, { CustomConfig } from './with-base-config'
import { GetBtnOptions } from './action-render'
import { MenuOption } from './menu'
import { Options } from './register-edge'
import './style.scss'

type D = {
  cacheChildren: 'cacheFrontChildren' | 'cacheBackChildren'
  hideChildren: 'hideFrontChildren' | 'hideBackChildren'
}

type Props = {
  defaultNodeType: string
  layout: LayoutConfig
  menuOptions: MenuOption[]
  beforeCreate: (options: { registerNode: RegisterNode }, g6: typeof G6) => void
  onNodeClick: (model: NodeModel, item: Item) => void
  onEdgeClick: (model: { targetModel: NodeModel; sourceModel: NodeModel }, item: IEdge) => void
  extendMethod: (model: NodeModel, side: 'left' | 'right') => TreeGraphData[] | Promise<TreeGraphData[]>
  edgeLabelRender: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  onClipClick: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => void
  hideClip: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => boolean
  getEdgeOptions: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => Options
  nodeTooltipRender: (model: NodeModel) => string
  edgeTooltipRender: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  getBtnOptions: GetBtnOptions
  node: (cfg: NodeConfig) => Partial<NodeConfig>
}

type RegisterNode = (type: string, options: CustomConfig, baseShape?: string) => void

class Graph {
  props?: Partial<Props>
  graph: TreeGraph | null
  selectedItem: Item | null
  constructor(props?: Partial<Props>) {
    this.props = props
    this.graph = null
    this.selectedItem = null
  }

  registerNode = (type: string, options: CustomConfig, baseShape = 'single-node') => {
    G6.registerNode(type, withBaseConfig({ ...options, getBtnOptions: this.props?.getBtnOptions }) as any, baseShape)
  }

  createGraph = (data: any, options: { el: HTMLDivElement }) => {
    const { registerNode } = this
    const props = this.props
    props?.beforeCreate && props.beforeCreate({ registerNode }, G6)
    const graph = createG6(data, {
      ...options,
      defaultNodeType: props?.defaultNodeType,
      layout: props?.layout,
      menuOptions: props?.menuOptions,
      edgeLabelRender: props?.edgeLabelRender,
      hideClip: props?.hideClip,
      getEdgeOptions: props?.getEdgeOptions,
      nodeTooltipRender: props?.nodeTooltipRender,
      edgeTooltipRender: props?.edgeLabelRender,
      node: props?.node,
    })
    props && this.onEventListener(graph, props)
    this.graph = graph
    return graph
  }

  interactive = (names: string[], model: NodeModel, graph: TreeGraph) => {
    const props = this.props
    const direction = names[1].split('-')[1] as 'left' | 'right'

    const dic = {
      left: { cacheChildren: 'cacheFrontChildren', hideChildren: 'hideFrontChildren' },
      right: { cacheChildren: 'cacheBackChildren', hideChildren: 'hideBackChildren' },
    }[direction] as D

    // 判断点击的时哪一个按钮以及方向
    if (names.includes(`extend-${direction}`)) {
      if (!props?.extendMethod) return
      const children = props?.extendMethod(model, direction) || []
      if (children instanceof Promise) {
        children.then((res) => {
          graph.updateChildren(res, model.id)
        })
      } else {
        graph.updateChildren(children, model.id)
      }
    }
    if (names.includes(`hidden-${direction}`)) {
      model[dic.hideChildren] = model.children.filter((item) => item.side === direction) as NodeModel[]
      const children = model.children.filter((item) => item.side !== direction)
      graph.updateChildren(children, model.id)
      model.getButton(`extend-${direction}`).hide()
      model.getButton(`hidden-${direction}`).hide()
      model.getButton(`show-${direction}`).cfg.setText(model[dic.hideChildren].length).show()
    }
    if (names.includes(`show-${direction}`)) {
      const children = model.children.concat(model[dic.hideChildren])
      model[dic.hideChildren] = []
      graph.updateChildren(children, model.id)
      model.getButton(`extend-${direction}`).show()
      model.getButton(`hidden-${direction}`).show()
      model.getButton(`show-${direction}`).hide()
    }
  }

  onEventListener = (graph: TreeGraph, props: Partial<Props>) => {
    graph.on('node:click', (e) => {
      const names = e.target.get('names')
      if (!names) return
      if (names.includes('address-node')) {
        const model = e.item!.getModel() as NodeModel
        props.onNodeClick && props.onNodeClick(model, e.item!)
        this.selectedItem && graph.clearItemStates(this.selectedItem, 'selected')
        this.selectedItem = e.item
        graph.setItemState(e.item!, 'selected', true)
        return
      }
      const model = e.item!.getModel() as NodeModel

      this.interactive(names, model, graph)
    })

    graph.on('edge:click', (e) => {
      const names = e.target.get('names')
      const item = e.item as IEdge
      // 清除线上的效果
      const targetModel = item.getTarget().getModel() as NodeModel
      const sourceModel = item.getSource().getModel() as NodeModel
      if (names.includes('edge-line')) {
        props.onEdgeClick && props.onEdgeClick({ targetModel, sourceModel }, item)
        const group = item.getKeyShape()
        group.cfg.setState && group.cfg.setState('selected', !group.cfg.state.selected)
        return
      }
      if (names.includes('clip')) {
        graph.removeChild(targetModel.id!)
        props.onClipClick && props.onClipClick({ targetModel, sourceModel })
      }
    })

    graph.on('node:mouseenter', (e) => {
      const names = e.target.get('names')
      if (!names) return
      if (names.includes('address-node')) {
        if (!e.item?.hasState('selected')) {
          graph.setItemState(e.item!, 'hover', true)
        }
      }
      if (names.includes('action')) {
        e.target.cfg.setHover!()
      }
    })

    graph.on('node:mouseleave', (e) => {
      const children = e.item?.getContainer().getChildren()
      children?.forEach((shape) => {
        if (shape.cfg.name === 'action') {
          shape.cfg.clearHover()
        }
      })
      if (e.item?.hasState('hover')) {
        graph.setItemState(e.item!, 'hover', false)
      }
    })

    graph.on('edge:mouseenter', (e) => {
      if (!e.item) return
      graph.setItemState(e.item!, 'hover', true)
      const group = e.item.getKeyShape()
      group.cfg.setState && group.cfg.setState('hover', true)
      group.cfg.setClipState && group.cfg.setClipState(true)
    })

    graph.on('edge:mouseleave', (e) => {
      if (!e.item) return
      const group = e.item.getKeyShape()
      group.cfg.setState && group.cfg.setState('hover', false)
      group.cfg.setClipState && group.cfg.setClipState(false)
    })
  }
}

export default Graph
