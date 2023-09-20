import { NodeConfig } from '@antv/g6'
export type Side = 'right' | 'left' | undefined
export type NodeData = {
  id: string
  side: Side
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

export default NodeModel
