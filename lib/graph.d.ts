import G6, {
  Item,
  IEdge,
  NodeConfig,
  TreeGraphData,
  LayoutConfig,
  ModelStyle,
  IGroup,
  IShape,
  TreeGraph,
} from '@antv/g6'

type EdgeOptions = {
  type?: 'solid' | 'dashed'
  stroke?: string
}

export type Direction = 'BACK' | 'FRONT' | 'BOTH'
export type NodeData = {
  id: string
  direction: Direction
  children: NodeData[]
  cacheFrontChildren: NodeData[]
  cacheBackChildren: NodeData[]
  hideFrontChildren: NodeData[]
  hideBackChildren: NodeData[]
  [key: string]: any
}

type NodeModel = NodeConfig & NodeData

export type ButtonName = 'extend-left' | 'hidden-left' | 'extend-right' | 'hidden-right' | 'show-left' | 'show-right'

export type Name = 'address-node' | 'edge-line' | 'action' | 'clip' | ButtonName

export type Names = Name[]

type D = {
  flow: 'FRONT' | 'BACK'
  cacheChildren: 'cacheFrontChildren' | 'cacheBackChildren'
  hideChildren: 'hideFrontChildren' | 'hideBackChildren'
  unFlow: D['flow']
}

type INodeGroup = IGroup & { addNodeShape: (type: string, cfg: any) => IShape }

type GetBtnOptions = (cfg: NodeModel) => {
  left?: { extend?: boolean; hidden?: boolean; show?: boolean }
  right?: { extend?: boolean; hidden?: boolean; show?: boolean }
}

export type CustomConfig = {
  options?: ModelStyle
  draw: (cfg: NodeModel, group: INodeGroup) => void
  getBtnOptions?: GetBtnOptions
  r: number
}

type RegisterNode = (type: string, options: CustomConfig, baseShape?: string) => void

type MenuOption = {
  label: string
  icon?: string
  show?: (model: NodeModel) => boolean
  onClick?: (model: NodeModel) => void
}

type EdgeOptions = {
  type?: 'solid' | 'dashed'
  stroke?: string
}

type Options = {
  /**
   *  默认节点类型，默认circle
   */
  defaultNodeType: string
  /**
   *  布局配置项
   */
  layout: LayoutConfig
  /**
   *  菜单配置
   */
  menuOptions: MenuOption[]
  /**
   *  创建布局之前调用钩子函数，参数为注册节点方法，同G6.registerNode
   */
  beforeCreate?: (options: { registerNode: RegisterNode }, g6: typeof G6) => void
  /**
   *  点击节点触发函数
   */
  onNodeClick: (model: NodeModel, item: Item) => void
  /**
   *  点击线触发函数
   */
  onEdgeClick: (model: { targetModel: NodeModel; sourceModel: NodeModel }, item: IEdge) => void
  /**
   *  扩展方法函数，返回新的子节点数组
   */
  extendMethod: (model: NodeModel, dic: D, names: string[]) => TreeGraphData[] | Promise<TreeGraphData[]>
  /**
   *  线信息渲染函数
   */
  edgeLabelRender: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  /**
   *  点击裁剪按钮触发函数
   */
  onClipClick: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => void
  /**
   *  是否隐藏裁剪按钮函数，返回boolean
   */
  hideClip: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => boolean
  /**
   *  配置线条
   */
  getEdgeOptions: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => EdgeOptions
  /**
   *  节点hover时显示信息
   */
  nodeTooltipRender: (model: NodeModel) => string
  /**
   *  线条hover时显示信息
   */
  edgeTooltipRender: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  /**
   *  节点两侧子节点操作按钮显示逻辑函数
   */
  getBtnOptions: GetBtnOptions
  /*
  * 节点配置遍历（render前调用）
  */
  node: (cfg: NodeConfig) => Partial<NodeConfig>
}

export default class Graph {
  constructor(options: Partial<Options>)
  /**
   * 开始创建树图，返回树图实例
   * @param data 渲染数据
   * @param options 配置项
   */
  createGraph(data: any, options: { el: HTMLDivElement }): TreeGraph
}
