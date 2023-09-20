import G6, { IG6GraphEvent } from '@antv/g6'
import NodeModel from '../type'

export type MenuOption = {
  label: string
  icon?: string
  show?: (model: NodeModel) => boolean
  onClick?: (model: NodeModel) => void
}

const getMenuHtml = (options: MenuOption[], cfg: NodeModel, html = '') => {
  cfg.menuClicks = []
  options.forEach((option, index) => {
    if (option.show && !option.show(cfg)) return
    const icon = option.icon ? `<img src=${option.icon} />` : ''
    cfg.menuClicks[index] = option.onClick
    html = html + `<li>${icon}<label>${option.label}</label><i click-index=${index}></i></li>`
  })
  return `<ul>${html}</ul>`
}

const getMenu = (options?: MenuOption[]) => {
  if (!options) return
  const menu = new G6.Menu({
    className: 'context-menu-container',
    offsetX: 6,
    offsetY: 6,
    itemTypes: ['node'],
    getContent(e?: IG6GraphEvent) {
      const div = document.createElement('div')
      div.style.width = 'fit-content'
      const model = e?.item?.getModel() as NodeModel
      div.innerHTML = getMenuHtml(options, model)
      return div
    },
    handleMenuClick(target, item) {
      const model = item.getModel() as NodeModel
      const menuClicks = model.menuClicks as MenuOption['onClick'][]
      const index = target.getAttribute('click-index')
      if (menuClicks && index) {
        menuClicks[Number(index)] && menuClicks[Number(index)]!(model)
      }
    },
    shouldBegin(e: any) {
      const names = e.target.get('names')
      if (!names) return false
      return names.includes('address-node')
    },
  })

  return menu
}

export default getMenu
