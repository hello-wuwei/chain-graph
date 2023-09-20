import G6 from '@antv/g6'
import { Options } from '.'

const getEdgeAttrs = (options: Options) => {
  const arrowFill = options.stroke?.startsWith('l(')
    ? options.stroke.slice(options.stroke.lastIndexOf(':') + 1)
    : options.stroke
  const arrows = {
    startArrow: {
      path: options.arrow?.start ? G6.Arrow.triangle(10, 10, 0) : false,
      fill: arrowFill,
      stroke: arrowFill,
      lineDash: [0, 0],
    },
    endArrow: {
      path: options.arrow?.end ? G6.Arrow.triangle(10, 10, 0) : false,
      fill: arrowFill,
      stroke: arrowFill,
      lineDash: [0, 0],
    },
  }
  const attrs = {
    default: {
      line: {
        stroke: options.stroke,
        ...arrows,
      },
      text: { fill: '#000000' },
    },
    hover: {
      line: {
        stroke: options.stroke,
        ...arrows,
      },
      text: { fill: '#7033FF' },
    },
    selected: {},
  }

  return attrs
}

export default getEdgeAttrs
