# chain-graph

- 该库作为自定义扩展开发工具，用于链平台追踪的拓扑图树

## Getting started

开发组件库

```
git clone https://github.com/hello-wuwei/chain-graph.git
cd chain-graph
npm install
npm run dev
```

## Install

### 第 1 步

在项目 package.json 文件"dependencies"项中添加依赖声明

```
"chain-graph": "git+ssh://https://github.com/hello-wuwei/chain-graph.git"

```

### 第 2 步

安装

```
npm i
```

### 第 3 步

使用

```javascript
import ChainGraph from 'chain-graph'
const graph = ref<HTMLDivElement>()
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
    registerNode('root-node', rootNode)
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
            stroke: levelMap[model.level as keyof typeof levelMap],
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
    const isFront = cfg?.direction !== 'BACK'
    const isBack = cfg?.direction !== 'FRONT'
    return {
      left: { extend: isFront, hidden: isFront, show: isFront },
      right: { extend: isBack, hidden: isBack, show: isBack },
    }
  },
  extendMethod(model) {
    const items = [1, 2, 3, 4, 5].map((item) => {
      return {
        label: model.label + item.toString(),
        id: item + new Date().getTime().toString(),
        children: [],
        direction: 'FRONT',
        level: 'high',
      }
    })
    const children = model.children.concat(items)
    return children
  },
  getEdgeOptions({ targetModel, sourceModel }) {
    return sourceModel.depth % 2
      ? { stroke: 'l(0) 0:#FFBB61 0.3:#6AD3B3 0.5:#EF5A5A 0.8:#8F60FF 1:#1890ff', type: 'dashed' }
      : { stroke: 'blue' }
  },
})

onMounted(() => {
  createGraph(data, { el: el.value! })
})

```
