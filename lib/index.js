var R = Object.defineProperty;
var H = (r, i, n) => i in r ? R(r, i, { enumerable: !0, configurable: !0, writable: !0, value: n }) : r[i] = n;
var x = (r, i, n) => (H(r, typeof i != "symbol" ? i + "" : i, n), n);
import C from "@antv/g6";
const I = (r, i) => {
  if (!r || !i)
    return { innerPoint3: { x: 0, y: 0 }, xDist: 0 };
  const n = i.x - r.x, t = n * 0.5, e = {
    x: r.x + n * 0.3,
    y: r.y
  }, s = {
    x: i.x - t - n * 0.16,
    y: i.y
  }, d = {
    x: i.x - t,
    y: i.y
  }, c = [e, s, d];
  let o = [r, { x: r.x + n * 0.05, y: r.y }];
  return c && (o = o.concat(c)), o.push(i), { path: [
    ["M", o[0].x, o[0].y],
    ["L", o[1].x, o[1].y],
    ["C", o[2].x, o[2].y, o[3].x, o[3].y, o[4].x, o[4].y],
    ["L", o[4].x, o[4].y],
    ["L", o[5].x, o[5].y]
  ], innerPoint3: d, xDist: n };
}, D = (r, i) => {
  const n = {
    startArrow: {
      path: i !== "BACK" ? C.Arrow.triangle(10, 10, 0) : !1,
      fill: r.stroke
    },
    endArrow: {
      path: i === "BACK" ? C.Arrow.triangle(10, 10, 0) : !1,
      fill: "#CCD0D9"
    }
  };
  return {
    default: {
      line: {
        stroke: r.stroke,
        ...n
      },
      text: { fill: "#000000" }
    },
    hover: {
      line: {
        stroke: r.stroke,
        ...n
      },
      text: { fill: "#7033FF" }
    },
    selected: {}
  };
}, O = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAA+NJREFUeF7tmluoDlEUx38nlyKUS/JCJJEi5c4DSiFFlEu5X4pcS5RL7rfcSoQIEeUWUZS88EKRXJMUD3jwQvFESfSvfTTt9nzfnplzPnvMrDqdvpk1e6//f9bae+21po6CS13B8VMSUHpAwRkoQ6DgDlAugmUIlCFQcAbKEMiBA0wBhgJDzP97wH3gCXAtq/0he8BUYAUwvAJIEXEIuJyWiFAJOA/MSADqHDA7gf5f1RAJEHARkFQmAdeTPpSGgPbAcWAg0BZ4DhxIM7nD2HbAA6CndW8vcAV4DXQCtC7stnReACOAr0lISEPARmCbY5LtwKYkkzt0FfeXrOtngHkx4/62ri8CTiSxIQ0BGn8NoLdiizxhdRIDLN0NwI7ItTvAmArjbQE2R+4rdGYlmT8tAZpjGXDYMdkxYEkSIyK6F4Fpkd8aXztBnPQHHkduvge6Jpk7CwGaZwFw0jHhWWBuEkOM7lVgcp4IkK1xq7YWLW1NPxIQoRBalZcQiOLSW1My0sQCewuYA3zxJEFbmZ3dBbkIuvCMMyS0sm7eNSR89CRB2d0wSzeobbASjlGGhA6W0kNDwpsqJLQBvnkSZavVLBGqZp8OLQqHzpbiS0PC05gBegOvqg0ecz+4VLifIaGHZfA7Q4LcPCra6287wEm/ewVSgj4MKZ2VJ/S1AHwyW6SSHInSWtdpTknOVmAmoAyvi/nL1XFYRgvcYIsExbnyhGZVwKeMCP/HsiZCPjN1NPn9SEv5pyHAHkPp8C6fgRtCpxYEyM7W5k2PrWK00usjDQHMd4xaESB7mhoStF25RIeYNHUAX6xOvVoS0NwQMLGIBKhwosVwdBFDQAmRwCtBiooSoz4OQv6rRbCXAW8DVWqsbXC6VdCo56M+B8gU3z4PN+YaMMCA72YZosORwH8w11XREWBbcp0IqTgpt1cOEJWbpr732boeR0IuU+HxBnxLC6QI0Zv/HuOaKqOlzQGCOQy5qrrCW6moEeVjAnDDJ3YdOv/8ODwfOOUw7Ciw1BNUC1PXV84QleALIstNj87Gud+U0D3xsxNYbykHXxJbF3N4UfMkWrP3IUHb46CIYtB9AdmpJoYSF1vWAnt8EFs6Kp6qPVYvQfcFDgIrHSDVyHA1THz4eGtVgIIlQM0QNUVsWRizEPqAl466SotDD4ELJoWNglJHVvu47mURNUFPh74Iqki5z9TufwGPTO3uWRbk5tlctMcbAGfFIYL/QKKxCdD4hf5Epp7gQn8kFfWywn4mV4tQK78Wb8yKUE3eYNZJSgKyMpj350sPyPsbzGp/6QFZGcz786UH5P0NZrW/8B7wBwBEzkFeAV/JAAAAAElFTkSuQmCC", M = (r, { x: i, y: n = 0, customNames: t, contentRender: e }) => {
  const s = () => {
    if (u === "image")
      return;
    l.attr({ stroke: "#7033FF" });
    const h = a.attr("text");
    a.attr(h ? { fill: "#7033FF" } : { stroke: "#7033FF", fill: "#7033FF" });
  }, d = () => {
    if (u === "image")
      return;
    l.attr({ stroke: "#CCD0D9" });
    const h = a.attr("text");
    a.attr(h ? { fill: "#000000" } : { stroke: "#000000", fill: "#000000" });
  }, c = r.addGroup({
    name: "action",
    setText: (h) => (a.attr({ text: h, stroke: null }), c),
    setHover: s,
    clearHover: d
  }), o = ["action", ...t], l = c.addShape("circle", {
    attrs: {
      x: i,
      y: n,
      r: 9,
      fill: "#FAFBFD",
      cursor: "pointer",
      stroke: "#CCD0D9"
    },
    zIndex: 1
  }), a = e(c);
  a.set("zIndex", 2);
  const u = a.get("type"), A = {
    attrs: {
      ...l.attr(),
      fillOpacity: 0,
      strokeOpacity: 0
    },
    names: o,
    type: "button",
    zIndex: 10,
    setHover: s,
    clearHover: d
  };
  return c.addShape("circle", A), c.sort(), c;
}, W = (r, { x: i, y: n, r: t = 9 }) => M(r, { x: i, y: n, customNames: ["clip"], contentRender: (s) => s.addShape("image", {
  attrs: {
    x: i - t,
    y: n - t,
    img: O,
    width: t * 2,
    height: t * 2,
    cursor: "pointer"
  },
  names: ["clip"],
  draggable: !0,
  crossorigin: "*"
}) }), L = ({ edgeLabelRender: r, hideClip: i = () => !1, getEdgeOptions: n }) => ({
  itemType: "edge",
  draw: (t, e) => {
    if (!t || !e)
      return;
    const s = t.startPoint, d = t.endPoint;
    if (!s || !d)
      return;
    const { path: c, innerPoint3: o, xDist: l = 0 } = I(s, d);
    if (!t.targetNode || !t.sourceNode)
      return;
    const a = t.targetNode.getModel(), u = t.sourceNode.getModel(), A = a.direction, h = n ? n({ targetModel: a, sourceModel: u }) : { type: "solid", stroke: "#CCD0D9" }, B = h.type === "dashed" ? [10, 2] : void 0, f = D(h, A), g = e.addShape("path", {
      attrs: {
        path: c,
        stroke: h.stroke,
        opacity: 0.3,
        lineWidth: 6,
        lineDash: B
      },
      names: ["edge-line"]
    }).hide(), m = e.addShape("path", {
      attrs: {
        path: c,
        lineWidth: 2,
        lineAppendWidth: 15,
        lineDash: B,
        ...f.default.line
      },
      names: ["edge-line"]
    });
    if (Math.abs(l) < 200)
      return m;
    const w = l > 0 ? o.x + 12 : d.x + 14;
    let y;
    if (r) {
      const S = r({ targetModel: a, sourceModel: u });
      y = e.addShape("text", {
        attrs: {
          text: S,
          x: w,
          y: d.y - 20,
          fontSize: 12,
          textAlign: "left",
          textBaseline: "middle",
          ...f.default.text,
          shapeKey: "path-text",
          cursor: "pointer"
        },
        names: ["edge-line"]
      });
    }
    if (e.cfg.setState = (S, p) => {
      var N;
      const k = e.cfg;
      if (k.state || (k.state = {}), S === "selected" && (p ? g.show() : g.hide(), k.state.selected = p), S === "hover") {
        if ((N = k.state) != null && N.selected)
          return;
        p ? (y && y.attr(f.hover.text), g.show()) : (y && y.attr(f.default.text), g.hide());
      }
    }, e.sort(), !i({ targetModel: a, sourceModel: u })) {
      const S = W(e, { x: o.x, y: o.y }).hide();
      e.cfg.setClipState = (p) => {
        p ? S.show() : S.hide();
      };
    }
    return e;
  }
}), Q = ({ nodeTooltipRender: r, edgeTooltipRender: i }) => ({
  offsetX: 10,
  offsetY: 10,
  itemTypes: ["node", "edge"],
  className: "tooltip-container",
  getContent: (n) => {
    if (!n)
      return "";
    const e = (() => {
      const o = document.createElement("div");
      return o.style.width = "fit-content", o;
    })(), s = n.item.getModel(), d = n.target.get("names");
    if (!d)
      return "";
    if (d.includes("address-node") && r)
      return e.innerHTML = r(s), e;
    if (d.includes("edge-line") && i) {
      const o = n.item, l = o.getTarget().getModel(), a = o.getSource().getModel();
      return e.innerHTML = i({ targetModel: l, sourceModel: a }), e;
    }
    const c = {
      clip: "Hide Node",
      "extend-left": "Extend",
      "extend-right": "Extend",
      "show-left": "Show",
      "show-right": "Show",
      "hidden-left": "Hide",
      "hidden-right": "Hide"
    };
    return e.innerHTML = c[d[1]], e;
  },
  shouldBegin: (n) => {
    const t = n.target.get("names");
    return t ? !!(t.includes("address-node") && r || t.includes("edge-line") && i || t.includes("action")) : !1;
  }
}), T = (r, i, n = "") => (i.menuClicks = [], r.forEach((t, e) => {
  if (t.show && !t.show(i))
    return;
  const s = t.icon ? `<img src=${t.icon} />` : "";
  i.menuClicks[e] = t.onClick, n = n + `<li>${s}<label>${t.label}</label><i click-index=${e}></i></li>`;
}), `<ul>${n}</ul>`), G = (r) => r ? new C.Menu({
  className: "context-menu-container",
  offsetX: 6,
  offsetY: 6,
  itemTypes: ["node"],
  getContent(n) {
    var s;
    const t = document.createElement("div");
    t.style.width = "fit-content";
    const e = (s = n == null ? void 0 : n.item) == null ? void 0 : s.getModel();
    return t.innerHTML = T(r, e), t;
  },
  handleMenuClick(n, t) {
    const e = t.getModel(), s = e.menuClicks, d = n.getAttribute("click-index");
    s && d && s[Number(d)] && s[Number(d)](e);
  },
  shouldBegin(n) {
    const t = n.target.get("names");
    return t ? t.includes("address-node") : !1;
  }
}) : void 0, K = (r, {
  el: i,
  defaultNodeType: n,
  layout: t,
  menuOptions: e,
  edgeLabelRender: s,
  nodeTooltipRender: d,
  edgeTooltipRender: c,
  hideClip: o,
  getEdgeOptions: l,
  node: a
}) => {
  const u = i.offsetHeight || 800, A = i.offsetWidth || 1e3;
  C.registerEdge("default-edge", L({ edgeLabelRender: s, hideClip: o, getEdgeOptions: l }));
  const h = new C.Minimap({
    size: [220, 120]
  }), B = new C.Tooltip(Q({ nodeTooltipRender: d, edgeTooltipRender: c })), f = G(e), g = [h, B];
  f && g.push(f);
  const m = new C.TreeGraph({
    container: i,
    width: A,
    height: u,
    animate: !0,
    modes: {
      default: ["drag-canvas", "zoom-canvas"]
    },
    defaultNode: {
      type: n
    },
    defaultEdge: {
      type: "default-edge"
    },
    layout: {
      type: "compactBox",
      direction: "H",
      getHeight: () => 25,
      getWidth: () => 25,
      getVGap: () => 35,
      getHGap: () => 150,
      getSide: (w) => ({
        BACK: "right",
        FRONT: "left"
      })[w.data.direction],
      ...t
    },
    plugins: g
  });
  return m.node((w) => ({
    ...w,
    ...a ? a(w) : void 0
  })), m.data(r), m.render(), m.fitCenter(), m;
}, v = (r, { customNames: i, x: n }) => {
  const t = [
    ["M", n - 5, 0],
    ["L", n + 5, 0],
    ["M", n, -5],
    ["L", n, 5]
  ];
  return M(r, { x: n, contentRender: (s) => s.addShape("path", {
    attrs: {
      path: t,
      cursor: "pointer",
      stroke: "#000000",
      lineWidth: 1,
      lineAppendWidth: 5
    }
  }), customNames: i });
}, E = (r, { customNames: i, x: n }) => {
  const t = [
    ["M", n - 5, 0],
    ["L", n + 5, 0]
  ];
  return M(r, { x: n, contentRender: (s) => s.addShape("path", {
    attrs: {
      path: t,
      cursor: "pointer",
      stroke: "#000000",
      lineWidth: 1,
      lineAppendWidth: 5
    }
  }), customNames: i });
}, F = (r, { customNames: i, x: n, text: t = 0 }) => M(r, { x: n, contentRender: (s) => s.addShape("text", {
  attrs: {
    text: t,
    fill: "#000000",
    x: n,
    y: 0,
    fontWeight: "normal",
    textAlign: "center",
    textBaseline: "middle"
  },
  draggable: !0
}), customNames: i }), b = {
  left: { extend: !1, hidden: !1, show: !1 },
  right: { extend: !1, hidden: !1, show: !1 }
}, z = { r: 26 }, P = (r, i, n = {}) => {
  const { r: t, getBtnOptions: e = () => ({ left: void 0, right: void 0 }) } = {
    ...z,
    ...n
  }, s = 12, d = 34, c = e(r) || {}, o = { ...b.left, ...c.left }, l = { ...b.right, ...c.right }, a = (m) => ({
    "extend-left": u,
    "hidden-left": A,
    "extend-right": B,
    "hidden-right": f,
    "show-left": h,
    "show-right": g
  })[m];
  r.getButton = a;
  const u = o && o.extend && v(i, {
    customNames: ["extend-left"],
    x: -(t + s)
  }), A = o && o.hidden && E(i, {
    customNames: ["hidden-left"],
    x: -(t + d)
  }), h = o && o.show && F(i, { customNames: ["show-left"], x: -(t + s) }).hide(), B = l && l.extend && v(i, {
    customNames: ["extend-right"],
    x: t + s
  }), f = l && l.hidden && E(i, { customNames: ["hidden-right"], x: t + d }), g = l && l.show && F(i, { customNames: ["show-right"], x: t + s }).hide();
}, U = ({ r, ...i }) => ({
  options: i.options,
  draw(n, t) {
    if (!n || !t)
      return;
    P(n, t, {
      getBtnOptions: i.getBtnOptions,
      r
    }), t.addNodeShape = (s, d) => {
      const c = t.addShape(s, d);
      return c.set("names", ["address-node", ...c.get("names") || []]), c;
    };
    const e = i.draw(n, t);
    return t.sort(), e;
  },
  getAnchorPoints: () => [
    [0, 0.5],
    [1, 0.5]
  ]
});
class J {
  constructor(i) {
    x(this, "props");
    x(this, "graph");
    x(this, "selectedItem");
    x(this, "registerNode", (i, n, t = "single-node") => {
      var e;
      C.registerNode(i, U({ ...n, getBtnOptions: (e = this.props) == null ? void 0 : e.getBtnOptions }), t);
    });
    x(this, "createGraph", (i, n) => {
      const { registerNode: t } = this, e = this.props;
      e != null && e.beforeCreate && e.beforeCreate({ registerNode: t }, C);
      const s = K(i, {
        ...n,
        defaultNodeType: e == null ? void 0 : e.defaultNodeType,
        layout: e == null ? void 0 : e.layout,
        menuOptions: e == null ? void 0 : e.menuOptions,
        edgeLabelRender: e == null ? void 0 : e.edgeLabelRender,
        hideClip: e == null ? void 0 : e.hideClip,
        getEdgeOptions: e == null ? void 0 : e.getEdgeOptions,
        nodeTooltipRender: e == null ? void 0 : e.nodeTooltipRender,
        edgeTooltipRender: e == null ? void 0 : e.edgeLabelRender,
        node: e == null ? void 0 : e.node
      });
      return e && this.onEventListener(s, e), this.graph = s, s;
    });
    x(this, "interactive", (i, n, t) => {
      const e = this.props, s = i[1].split("-")[1], d = {
        left: { flow: "FRONT", unFlow: "BACK", cacheChildren: "cacheFrontChildren", hideChildren: "hideFrontChildren" },
        right: { flow: "BACK", unFlow: "FRONT", cacheChildren: "cacheBackChildren", hideChildren: "hideBackChildren" }
      }[s];
      if (i.includes(`extend-${s}`)) {
        if (!(e != null && e.extendMethod))
          return;
        const c = (e == null ? void 0 : e.extendMethod(n, d, i)) || [];
        c instanceof Promise ? c.then((o) => {
          t.updateChildren(o, n.id);
        }) : t.updateChildren(c, n.id);
      }
      if (i.includes(`hidden-${s}`)) {
        n[d.hideChildren] = n.children.filter((o) => o.direction === d.flow);
        const c = n.children.filter((o) => o.direction === d.unFlow);
        t.updateChildren(c, n.id), n.getButton(`extend-${s}`).hide(), n.getButton(`hidden-${s}`).hide(), n.getButton(`show-${s}`).cfg.setText(n[d.hideChildren].length).show();
      }
      if (i.includes(`show-${s}`)) {
        const c = n.children.concat(n[d.hideChildren]);
        n[d.hideChildren] = [], t.updateChildren(c, n.id), n.getButton(`extend-${s}`).show(), n.getButton(`hidden-${s}`).show(), n.getButton(`show-${s}`).hide();
      }
    });
    x(this, "onEventListener", (i, n) => {
      i.on("node:click", (t) => {
        const e = t.target.get("names");
        if (!e)
          return;
        if (e.includes("address-node")) {
          const d = t.item.getModel();
          n.onNodeClick && n.onNodeClick(d, t.item), this.selectedItem && i.clearItemStates(this.selectedItem, "selected"), this.selectedItem = t.item, i.setItemState(t.item, "selected", !0);
          return;
        }
        const s = t.item.getModel();
        this.interactive(e, s, i);
      }), i.on("edge:click", (t) => {
        const e = t.target.get("names"), s = t.item, d = s.getTarget().getModel(), c = s.getSource().getModel();
        if (e.includes("edge-line")) {
          n.onEdgeClick && n.onEdgeClick({ targetModel: d, sourceModel: c }, s);
          const o = s.getKeyShape();
          o.cfg.setState && o.cfg.setState("selected", !o.cfg.state.selected);
          return;
        }
        e.includes("clip") && (i.removeChild(d.id), n.onClipClick && n.onClipClick({ targetModel: d, sourceModel: c }));
      }), i.on("node:mouseenter", (t) => {
        var s;
        const e = t.target.get("names");
        !e || (e.includes("address-node") && ((s = t.item) != null && s.hasState("selected") || i.setItemState(t.item, "hover", !0)), e.includes("action") && t.target.cfg.setHover());
      }), i.on("node:mouseleave", (t) => {
        var s, d;
        const e = (s = t.item) == null ? void 0 : s.getContainer().getChildren();
        e == null || e.forEach((c) => {
          c.cfg.name === "action" && c.cfg.clearHover();
        }), (d = t.item) != null && d.hasState("hover") && i.setItemState(t.item, "hover", !1);
      }), i.on("edge:mouseenter", (t) => {
        if (!t.item)
          return;
        i.setItemState(t.item, "hover", !0);
        const e = t.item.getKeyShape();
        e.cfg.setState && e.cfg.setState("hover", !0), e.cfg.setClipState && e.cfg.setClipState(!0);
      }), i.on("edge:mouseleave", (t) => {
        if (!t.item)
          return;
        const e = t.item.getKeyShape();
        e.cfg.setState && e.cfg.setState("hover", !1), e.cfg.setClipState && e.cfg.setClipState(!1);
      });
    });
    this.props = i, this.graph = null, this.selectedItem = null;
  }
}
export {
  J as default
};
