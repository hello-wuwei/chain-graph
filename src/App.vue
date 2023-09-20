<template>
  <div ref="el" style="height: 700px"></div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import ChainGraph from '@/packages'
import normalNode from './graph-node/normal-node'
import clip from './assets/clip.png'

const el = ref<HTMLDivElement>()
const { createGraph } = new ChainGraph({
  defaultNodeType: 'normal-node',
  menuOptions: [
    {
      label: 'Copy Address',
      icon: clip,
      onClick: (model) => {
        console.log(model)
      },
    },
    {
      label: 'Add Tag',
      icon: clip,
    },
    {
      label: 'Hidden Address',
      icon: clip,
    },
    {
      label: 'Add to Monitor',
      icon: clip,
    },
  ],
  beforeCreate({ registerNode }) {
    registerNode('normal-node', normalNode)
  },
  edgeLabelRender() {
    return 'ETH 15345.3\n20.8%'
  },
  node(model) {
    const levelMap = {
      severe: '#F45A4D',
      high: '#FFAC3E',
      medium: '#5733FF',
      low: '#65C9AB',
    }
    return {
      stateStyles: {
        hover: {
          fillOpacity: 0.8,
          'stroke-circle': {
            stroke: levelMap[model.level as keyof typeof levelMap] || '#F0F3F7',
            r: 29,
            lineWidth: 6,
            strokeOpacity: 0.3,
          },
        },
        selected: {
          fillOpacity: 0.8,
          'stroke-circle': {
            stroke: levelMap[model.level as keyof typeof levelMap],
            lineWidth: 4,
            r: 28,
            strokeOpacity: 1,
          },
        },
      },
    }
  },
  getBtnOptions(cfg) {
    // const isFront = cfg?.direction !== 'BACK'
    // const isBack = cfg?.direction !== 'FRONT'
    const isLeft = cfg.side !== 'right'
    const isRight = cfg.side !== 'left'
    return {
      left: { extend: isLeft, hidden: isLeft, show: isLeft },
      right: { extend: isRight, hidden: isRight, show: isRight },
    }
  },
  layout: {
    getSide(d: any) {
      return d.data.side
    },
  },
  extendMethod(model, side) {
    const items = [1, 2, 3, 4, 5].map((item) => {
      return {
        label: model.label + item.toString(),
        id: item + new Date().getTime().toString(),
        children: [],
        side,
      }
    })
    const children = model.children.concat(items as any[])
    return children
  },
  getEdgeOptions({ targetModel, sourceModel }) {
    const arrow = { start: targetModel.side === 'left', end: targetModel.side === 'right' }
    return sourceModel.depth % 2
      ? { stroke: 'l(0) 0:#FFBB61 0.3:#6AD3B3 0.5:#EF5A5A 0.8:#8F60FF 1:#1890ff', type: 'dashed', arrow }
      : { stroke: 'blue', arrow }
  },
})

onMounted(() => {
  createGraph(data, { el: el.value! })
})
const data = {
  label: 'N0',
  id: '000',
  level: 'severe',
  direction: 'BOTH',
  children: [
    {
      label: 'N01',
      id: '111',
      direction: 'FRONT',
      tag: 'Exchange: Binance',
      children: [],
      level: 'severe',
      side: 'left',
    },
    {
      label: 'N02',
      id: '222',
      direction: 'BACK',
      tag: 'Exchange: xxxx',
      children: [],
      level: 'high',
      side: 'left',
    },
    {
      label: 'N03',
      id: '333',
      direction: 'FRONT',
      tag: 'Cash Flow',
      children: [],
      level: 'medium',
      side: 'right',
    },
    {
      label: 'N04',
      id: '444',
      direction: 'FRONT',
      tag: 'Cash Flow',
      children: [],
      level: 'low',
      side: 'left',
    },
    {
      label: 'N05',
      id: '555',
      tag: 'Associated Address Of Sanction:Tornado Cash Withdraw',
      direction: 'FRONT',
      children: [],
      level: 'low',
      side: 'right',
    },
  ],
}
</script>
