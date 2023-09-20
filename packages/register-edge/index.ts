import { IGroup, IShape } from '@antv/g6'
import NodeModel from '../type'
import getEdgePath from './get-edge-path'
import getEdgeAttrs from './get-edge-attrs'
import clipButtonRender from '../button/clip-button-render'

export type Options = {
  type?: 'solid' | 'dashed'
  stroke?: string
  arrow?: { start: boolean; end: boolean }
}

export type EdgeOptions = {
  edgeLabelRender?: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => string
  hideClip?: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => boolean
  getEdgeOptions?: (model: { targetModel: NodeModel; sourceModel: NodeModel }) => Options
}
export default ({ edgeLabelRender, hideClip = () => false, getEdgeOptions }: EdgeOptions) => {
  return {
    itemType: 'edge',
    draw: (cfg: NodeModel, group: IGroup) => {
      if (!cfg || !group) return
      const startPoint = cfg.startPoint
      const endPoint = cfg.endPoint
      if (!startPoint || !endPoint) return
      const { path, innerPoint3, xDist = 0 } = getEdgePath(startPoint, endPoint)
      if (!cfg.targetNode || !cfg.sourceNode) return
      const targetModel = cfg.targetNode.getModel()
      const sourceModel = cfg.sourceNode.getModel()

      const options = getEdgeOptions
        ? getEdgeOptions({ targetModel, sourceModel })
        : ({ type: 'solid', stroke: '#CCD0D9', arrow: { start: false, end: true } } as Options)

      const lineDash = options.type === 'dashed' ? [10, 2] : undefined

      const attrs = getEdgeAttrs(options)
      const hoverBgLine = group
        .addShape('path', {
          attrs: {
            path,
            stroke: options.stroke,
            opacity: 0.3,
            lineWidth: 6,
            lineDash,
          },
          names: ['edge-line'],
        })
        .hide()
      const line = group.addShape('path', {
        attrs: {
          path,
          lineWidth: 2,
          lineAppendWidth: 15,
          lineDash,
          ...attrs.default.line,
        },
        names: ['edge-line'],
      })

      if (Math.abs(xDist) < 200) {
        return line
      }

      const x = xDist > 0 ? innerPoint3.x + 12 : endPoint.x + 14

      let textShape: IShape
      if (edgeLabelRender) {
        const text = edgeLabelRender({ targetModel, sourceModel })
        textShape = group.addShape('text', {
          attrs: {
            text,
            x,
            y: endPoint.y - 18,
            fontSize: 12,
            textAlign: 'left',
            textBaseline: 'middle',
            ...attrs.default.text,
            shapeKey: 'path-text',
            cursor: 'pointer',
          },
          names: ['edge-line'],
        })
      }

      group.cfg.setState = (name: 'hover' | 'selected', value: boolean) => {
        const cfg = group.cfg
        if (!cfg.state) cfg.state = {}
        if (name === 'selected') {
          if (value) {
            hoverBgLine.show()
          } else {
            hoverBgLine.hide()
          }
          cfg.state.selected = value
        }
        if (name === 'hover') {
          if (cfg.state?.selected) return
          if (value) {
            textShape && textShape.attr(attrs.hover.text)
            hoverBgLine.show()
          } else {
            // line.attr(attrs.default.line)
            textShape && textShape.attr(attrs.default.text)
            hoverBgLine.hide()
          }
        }
      }

      group.sort()

      if (!hideClip({ targetModel, sourceModel })) {
        const clipButton = clipButtonRender(group, { x: innerPoint3.x, y: innerPoint3.y }).hide()
        group.cfg.setClipState = (value: boolean) => {
          value ? clipButton.show() : clipButton.hide()
        }
      }
      return group
    },
  }
}
