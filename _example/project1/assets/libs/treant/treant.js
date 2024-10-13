!function () { String.prototype.startsWith || (String.prototype.startsWith = function (t, e) { return this.substr(e || 0, t.length) === t }); var s = null, d = { inheritAttrs: function (t, e) { for (var i in e) e.hasOwnProperty(i) && (t[i] instanceof Object && e[i] instanceof Object && "function" != typeof e[i] ? this.inheritAttrs(t[i], e[i]) : t[i] = e[i]); return t }, createMerge: function (t, e) { var i = {}; return t && this.inheritAttrs(i, this.cloneObj(t)), e && this.inheritAttrs(i, e), i }, extend: function () { return s ? (Array.prototype.unshift.apply(arguments, [!0, {}]), s.extend.apply(s, arguments)) : d.createMerge.apply(this, arguments) }, cloneObj: function (t) { if (Object(t) !== t) return t; var e = new t.constructor; for (var i in t) t.hasOwnProperty(i) && (e[i] = this.cloneObj(t[i])); return e }, addEvent: function (t, e, i) { s ? s(t).on(e + ".treant", i) : t.addEventListener ? t.addEventListener(e, i, !1) : t.attachEvent ? t.attachEvent("on" + e, i) : t["on" + e] = i }, findEl: function (t, e, i) { if (i = i || document, s) { var n = s(t, i); return e ? n.get(0) : n } if ("#" === t.charAt(0)) return i.getElementById(t.substring(1)); if ("." === t.charAt(0)) { var r = i.getElementsByClassName(t.substring(1)); return r.length ? r[0] : null } throw new Error("Unknown container element") }, getOuterHeight: function (t) { return "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect().height : s ? Math.ceil(s(t).outerHeight()) + 1 : Math.ceil(t.clientHeight + d.getStyle(t, "border-top-width", !0) + d.getStyle(t, "border-bottom-width", !0) + d.getStyle(t, "padding-top", !0) + d.getStyle(t, "padding-bottom", !0) + 1) }, getOuterWidth: function (t) { return "function" == typeof t.getBoundingClientRect ? t.getBoundingClientRect().width : s ? Math.ceil(s(t).outerWidth()) + 1 : Math.ceil(t.clientWidth + d.getStyle(t, "border-left-width", !0) + d.getStyle(t, "border-right-width", !0) + d.getStyle(t, "padding-left", !0) + d.getStyle(t, "padding-right", !0) + 1) }, getStyle: function (t, e, i) { var n = ""; return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(t, "").getPropertyValue(e) : t.currentStyle && (e = e.replace(/\-(\w)/g, function (t, e) { return e.toUpperCase() }), n = t.currentStyle[e]), i ? parseFloat(n) : n }, addClass: function (t, e) { s ? s(t).addClass(e) : d.hasClass(t, e) || (t.classList ? t.classList.add(e) : t.className += " " + e) }, hasClass: function (t, e) { return -1 < (" " + t.className + " ").replace(/[\n\t]/g, " ").indexOf(" " + e + " ") }, toggleClass: function (t, e, i) { s ? s(t).toggleClass(e, i) : i ? t.classList.add(e) : t.classList.remove(e) }, setDimensions: function (t, e, i) { s ? s(t).width(e).height(i) : (t.style.width = e + "px", t.style.height = i + "px") }, isjQueryAvailable: function () { return void 0 !== s && s } }, i = function () { this.reset() }; i.prototype = { reset: function () { return this.loading = [], this }, processNode: function (t) { for (var e = t.nodeDOM.getElementsByTagName("img"), i = e.length; i--;)this.create(t, e[i]); return this }, removeAll: function (t) { for (var e = this.loading.length; e--;)this.loading[e] === t && this.loading.splice(e, 1); return this }, create: function (t, e) { var i = this, n = e.src; function r() { i.removeAll(n), t.width = t.nodeDOM.offsetWidth, t.height = t.nodeDOM.offsetHeight } if (0 !== e.src.indexOf("data:")) { if (this.loading.push(n), e.complete) return r(); d.addEvent(e, "load", r), d.addEvent(e, "error", r), e.src += (0 < e.src.indexOf("?") ? "&" : "?") + (new Date).getTime() } else r() }, isNotLoading: function () { return 0 === this.loading.length } }; var n = { store: [], createTree: function (t) { var e = this.store.length; return this.store.push(new r(t, e)), this.get(e) }, get: function (t) { return this.store[t] }, destroy: function (t) { var e = this.get(t); if (e) { e._R.remove(); for (var i = e.drawArea; i.firstChild;)i.removeChild(i.firstChild); for (var n = i.className.split(" "), r = [], o = 0; o < n.length; o++) { var s = n[o]; "Treant" !== s && "Treant-loaded" !== s && r.push(s) } i.style.overflowY = "", i.style.overflowX = "", i.className = r.join(" "), this.store[t] = null } return this } }, r = function (t, e) { this.reset = function (t, e) { if (this.initJsonConfig = t, this.initTreeId = e, this.id = e, this.CONFIG = d.extend(r.CONFIG, t.chart), this.drawArea = d.findEl(this.CONFIG.container, !0), !this.drawArea) throw new Error('Failed to find element by selector "' + this.CONFIG.container + '"'); return d.addClass(this.drawArea, "Treant"), this.drawArea.innerHTML = "", this.imageLoader = new i, this.nodeDB = new o(t.nodeStructure, this), this.connectionStore = {}, this.loaded = !1, this._R = new Raphael(this.drawArea, 100, 100), this }, this.reload = function () { return this.reset(this.initJsonConfig, this.initTreeId).redraw(), this }, this.reset(t, e) }; r.prototype = { getNodeDb: function () { return this.nodeDB }, addNode: function (t, e) { this.nodeDB.get(t.id); this.CONFIG.callback.onBeforeAddNode.apply(this, [t, e]); var i = this.nodeDB.createNode(e, t.id, this); return i.createGeometry(this), i.parent().createSwitchGeometry(this), this.positionTree(), this.CONFIG.callback.onAfterAddNode.apply(this, [i, t, e]), i }, redraw: function () { return this.positionTree(), this }, positionTree: function (t) { var e = this; if (this.imageLoader.isNotLoading()) { var i = this.root(); this.CONFIG.rootOrientation; this.resetLevelData(), this.firstWalk(i, 0), this.secondWalk(i, 0, 0, 0), this.positionNodes(), this.CONFIG.animateOnInit && setTimeout(function () { i.toggleCollapse() }, this.CONFIG.animateOnInitDelay), this.loaded || (d.addClass(this.drawArea, "Treant-loaded"), "[object Function]" === Object.prototype.toString.call(t) && t(e), e.CONFIG.callback.onTreeLoaded.apply(e, [i]), this.loaded = !0) } else setTimeout(function () { e.positionTree(t) }, 10); return this }, firstWalk: function (t, e) { t.prelim = null, t.modifier = null, this.setNeighbors(t, e), this.calcLevelDim(t, e); var i = t.leftSibling(); if (0 === t.childrenCount() || e == this.CONFIG.maxDepth) t.prelim = i ? i.prelim + i.size() + this.CONFIG.siblingSeparation : 0; else { for (var n = 0, r = t.childrenCount(); n < r; n++)this.firstWalk(t.childAt(n), e + 1); var o = t.childrenCenter() - t.size() / 2; i ? (t.prelim = i.prelim + i.size() + this.CONFIG.siblingSeparation, t.modifier = t.prelim - o, this.apportion(t, e)) : t.prelim = o, t.stackParent ? t.modifier += this.nodeDB.get(t.stackChildren[0]).size() / 2 + t.connStyle.stackIndent : t.stackParentId && (t.prelim = 0) } return this }, apportion: function (t, e) { for (var i = t.firstChild(), n = i.leftNeighbor(), r = 1, o = this.CONFIG.maxDepth - e; i && n && r <= o;) { for (var s = 0, h = 0, a = n, l = i, d = 0; d < r; d++)a = a.parent(), l = l.parent(), h += a.modifier, s += l.modifier, void 0 !== l.stackParent && (s += l.size() / 2); var c = n.prelim + h + n.size() + this.CONFIG.subTeeSeparation - (i.prelim + s); if (0 < c) { for (var u = t, f = 0; u && u.id !== a.id;)u = u.leftSibling(), f++; if (u) for (var p = t, g = c / f; p.id !== a.id;)p.prelim += c, p.modifier += c, c -= g, p = p.leftSibling() } r++ , (i = 0 === i.childrenCount() ? t.leftMost(0, r) : i = i.firstChild()) && (n = i.leftNeighbor()) } }, secondWalk: function (t, e, i, n) { if (e <= this.CONFIG.maxDepth) { var r, o, s = t.prelim + i, h = n, a = this.CONFIG.nodeAlign, l = this.CONFIG.rootOrientation; if ("NORTH" === l || "SOUTH" === l ? (r = this.levelMaxDim[e].height, o = t.height, t.pseudo && (t.height = r)) : "WEST" !== l && "EAST" !== l || (r = this.levelMaxDim[e].width, o = t.width, t.pseudo && (t.width = r)), t.X = s, t.pseudo ? "NORTH" === l || "WEST" === l ? t.Y = h : "SOUTH" !== l && "EAST" !== l || (t.Y = h + (r - o)) : t.Y = "CENTER" === a ? h + (r - o) / 2 : "TOP" === a ? h + (r - o) : h, "WEST" === l || "EAST" === l) { var d = t.X; t.X = t.Y, t.Y = d } "SOUTH" === l ? t.Y = -t.Y - o : "EAST" === l && (t.X = -t.X - o), 0 !== t.childrenCount() && (0 === t.id && this.CONFIG.hideRootNode ? this.secondWalk(t.firstChild(), e + 1, i + t.modifier, n) : this.secondWalk(t.firstChild(), e + 1, i + t.modifier, n + r + this.CONFIG.levelSeparation)), t.rightSibling() && this.secondWalk(t.rightSibling(), e, i, n) } }, positionNodes: function () { var t = this, e = { x: t.nodeDB.getMinMaxCoord("X", null, null), y: t.nodeDB.getMinMaxCoord("Y", null, null) }, i = e.x.max - e.x.min, n = e.y.max - e.y.min, r = { x: e.x.max - i / 2, y: e.y.max - n / 2 }; this.handleOverflow(i, n); var o, s, h, a = { x: t.drawArea.clientWidth / 2, y: t.drawArea.clientHeight / 2 }, l = a.x - r.x, d = a.y - r.y, c = e.x.min + l <= 0 ? Math.abs(e.x.min) : 0, u = e.y.min + d <= 0 ? Math.abs(e.y.min) : 0; for (o = 0, s = this.nodeDB.db.length; o < s; o++)if (h = this.nodeDB.get(o), t.CONFIG.callback.onBeforePositionNode.apply(t, [h, o, a, r]), 0 === h.id && this.CONFIG.hideRootNode) t.CONFIG.callback.onAfterPositionNode.apply(t, [h, o, a, r]); else { h.X += c + (i < this.drawArea.clientWidth ? l : this.CONFIG.padding), h.Y += u + (n < this.drawArea.clientHeight ? d : this.CONFIG.padding); var f = h.collapsedParent(), p = null; f ? (p = f.connectorPoint(!0), h.hide(p)) : h.positioned ? h.show() : (h.nodeDOM.style.left = h.X + "px", h.nodeDOM.style.top = h.Y + "px", h.positioned = !0), 0 === h.id || 0 === h.parent().id && this.CONFIG.hideRootNode ? !this.CONFIG.hideRootNode && h.drawLineThrough && h.drawLineThroughMe() : this.setConnectionToParent(h, p), t.CONFIG.callback.onAfterPositionNode.apply(t, [h, o, a, r]) } return this }, handleOverflow: function (t, e) { var i = t < this.drawArea.clientWidth ? this.drawArea.clientWidth : t + 2 * this.CONFIG.padding, n = e < this.drawArea.clientHeight ? this.drawArea.clientHeight : e + 2 * this.CONFIG.padding; if (this._R.setSize(i, n), "resize" === this.CONFIG.scrollbar) d.setDimensions(this.drawArea, i, n); else if (d.isjQueryAvailable() && "native" !== this.CONFIG.scrollbar) { if ("fancy" === this.CONFIG.scrollbar) { var r = s(this.drawArea); if (r.hasClass("ps-container")) r.find(".Treant").css({ width: i, height: n }), r.perfectScrollbar("update"); else { var o = r.wrapInner('<div class="Treant"/>'); o.find(".Treant").css({ width: i, height: n }), o.perfectScrollbar() } } } else this.drawArea.clientWidth < t && (this.drawArea.style.overflowX = "auto"), this.drawArea.clientHeight < e && (this.drawArea.style.overflowY = "auto"); return this }, setConnectionToParent: function (t, e) { var i, n = t.stackParentId, r = n ? this.nodeDB.get(n) : t.parent(), o = e ? this.getPointPathString(e) : this.getPathString(r, t, n); return this.connectionStore[t.id] ? (i = this.connectionStore[t.id], this.animatePath(i, o)) : (i = this._R.path(o), this.connectionStore[t.id] = i, t.pseudo && delete r.connStyle.style["arrow-end"], r.pseudo && delete r.connStyle.style["arrow-start"], i.attr(r.connStyle.style), (t.drawLineThrough || t.pseudo) && t.drawLineThroughMe(e)), t.connector = i, this }, getPointPathString: function (t) { return ["_M", t.x, ",", t.y, "L", t.x, ",", t.y, t.x, ",", t.y].join(" ") }, animatePath: function (t, e) { return t.hidden && "_" !== e.charAt(0) && (t.show(), t.hidden = !1), t.animate({ path: "_" === e.charAt(0) ? e.substring(1) : e }, this.CONFIG.animation.connectorsSpeed, this.CONFIG.animation.connectorsAnimation, function () { "_" === e.charAt(0) && (t.hide(), t.hidden = !0) }), this }, getPathString: function (t, e, i) { var n = t.connectorPoint(!0), r = e.connectorPoint(!1), o = this.CONFIG.rootOrientation, s = t.connStyle.type, h = {}, a = {}; "NORTH" === o || "SOUTH" === o ? (h.y = a.y = (n.y + r.y) / 2, h.x = n.x, a.x = r.x) : "EAST" !== o && "WEST" !== o || (h.x = a.x = (n.x + r.x) / 2, h.y = n.y, a.y = r.y); var l, d, c = n.x + "," + n.y, u = h.x + "," + h.y, f = a.x + "," + a.y, p = r.x + "," + r.y, g = (h.x + a.x) / 2 + "," + (h.y + a.y) / 2; if (i) { if (d = "EAST" === o || "WEST" === o ? r.x + "," + n.y : n.x + "," + r.y, "step" === s || "straight" === s) l = ["M", c, "L", d, "L", p]; else if ("curve" === s || "bCurve" === s) { var m, y = t.connStyle.stackIndent; "NORTH" === o ? m = r.x - y + "," + (r.y - y) : "SOUTH" === o ? m = r.x - y + "," + (r.y + y) : "EAST" === o ? m = r.x + y + "," + n.y : "WEST" === o && (m = r.x - y + "," + n.y), l = ["M", c, "L", m, "S", d, p] } } else "step" === s ? l = ["M", c, "L", u, "L", f, "L", p] : "curve" === s ? l = ["M", c, "C", u, f, p] : "bCurve" === s ? l = ["M", c, "Q", u, g, "T", p] : "straight" === s && (l = ["M", c, "L", c, p]); return l.join(" ") }, setNeighbors: function (t, e) { return t.leftNeighborId = this.lastNodeOnLevel[e], t.leftNeighborId && (t.leftNeighbor().rightNeighborId = t.id), this.lastNodeOnLevel[e] = t.id, this }, calcLevelDim: function (t, e) { return this.levelMaxDim[e] = { width: Math.max(this.levelMaxDim[e] ? this.levelMaxDim[e].width : 0, t.width), height: Math.max(this.levelMaxDim[e] ? this.levelMaxDim[e].height : 0, t.height) }, this }, resetLevelData: function () { return this.lastNodeOnLevel = [], this.levelMaxDim = [], this }, root: function () { return this.nodeDB.get(0) } }; var o = function (t, e) { this.reset(t, e) }; o.prototype = { reset: function (t, a) { this.db = []; var l = this; return a.CONFIG.animateOnInit && (t.collapsed = !0), function t(e, i) { var n = l.createNode(e, i, a, null); if (e.children) { if (e.childrenDropLevel && 0 < e.childrenDropLevel) for (; e.childrenDropLevel--;) { var r = d.cloneObj(n.connStyle); (n = l.createNode("pseudo", n.id, a, null)).connStyle = r, n.children = [] } var o = e.stackChildren && !l.hasGrandChildren(e) ? n.id : null; null !== o && (n.stackChildren = []); for (var s = 0, h = e.children.length; s < h; s++)null !== o ? (n = l.createNode(e.children[s], n.id, a, o), s + 1 < h && (n.children = [])) : t(e.children[s], n.id) } }(t, -1), this.createGeometries(a), this }, createGeometries: function (t) { for (var e = this.db.length; e--;)this.get(e).createGeometry(t); return this }, get: function (t) { return this.db[t] }, walk: function (t) { for (var e = this.db.length; e--;)t.apply(this, [this.get(e)]); return this }, createNode: function (t, e, i, n) { var r = new h(t, this.db.length, e, i, n); if (this.db.push(r), 0 <= e) { var o = this.get(e); if (t.position) if ("left" === t.position) o.children.push(r.id); else if ("right" === t.position) o.children.splice(0, 0, r.id); else if ("center" === t.position) o.children.splice(Math.floor(o.children.length / 2), 0, r.id); else { var s = parseInt(t.position); 1 === o.children.length && 0 < s ? o.children.splice(0, 0, r.id) : o.children.splice(Math.max(s, o.children.length - 1), 0, r.id) } else o.children.push(r.id) } return n && (this.get(n).stackParent = !0, this.get(n).stackChildren.push(r.id)), r }, getMinMaxCoord: function (t, e, i) { e = e || this.get(0), i = i || { min: e[t], max: e[t] + ("X" === t ? e.width : e.height) }; for (var n = e.childrenCount(); n--;) { var r = e.childAt(n), o = r[t] + ("X" === t ? r.width : r.height), s = r[t]; o > i.max && (i.max = o), s < i.min && (i.min = s), this.getMinMaxCoord(t, r, i) } return i }, hasGrandChildren: function (t) { for (var e = t.children.length; e--;)if (t.children[e].children) return !0; return !1 } }; var h = function (t, e, i, n, r) { this.reset(t, e, i, n, r) }; h.prototype = { reset: function (t, e, i, n, r) { return this.id = e, this.parentId = i, this.treeId = n.id, this.prelim = 0, this.modifier = 0, this.leftNeighborId = null, this.stackParentId = r, this.pseudo = "pseudo" === t || t.pseudo, this.meta = t.meta || {}, this.image = t.image || null, this.link = d.createMerge(n.CONFIG.node.link, t.link), this.connStyle = d.createMerge(n.CONFIG.connectors, t.connectors), this.connector = null, this.drawLineThrough = !1 !== t.drawLineThrough && (t.drawLineThrough || n.CONFIG.node.drawLineThrough), this.collapsable = !1 !== t.collapsable && (t.collapsable || n.CONFIG.node.collapsable), this.collapsed = t.collapsed, this.text = t.text, this.nodeInnerHTML = t.innerHTML, this.nodeHTMLclass = (n.CONFIG.node.HTMLclass ? n.CONFIG.node.HTMLclass : "") + (t.HTMLclass ? " " + t.HTMLclass : ""), this.nodeHTMLid = t.HTMLid, this.children = [], this }, getTree: function () { return n.get(this.treeId) }, getTreeConfig: function () { return this.getTree().CONFIG }, getTreeNodeDb: function () { return this.getTree().getNodeDb() }, lookupNode: function (t) { return this.getTreeNodeDb().get(t) }, Tree: function () { return n.get(this.treeId) }, dbGet: function (t) { return this.getTreeNodeDb().get(t) }, size: function () { var t = this.getTreeConfig().rootOrientation; return this.pseudo ? -this.getTreeConfig().subTeeSeparation : "NORTH" === t || "SOUTH" === t ? this.width : "WEST" === t || "EAST" === t ? this.height : void 0 }, childrenCount: function () { return this.collapsed || !this.children ? 0 : this.children.length }, childAt: function (t) { return this.dbGet(this.children[t]) }, firstChild: function () { return this.childAt(0) }, lastChild: function () { return this.childAt(this.children.length - 1) }, parent: function () { return this.lookupNode(this.parentId) }, leftNeighbor: function () { if (this.leftNeighborId) return this.lookupNode(this.leftNeighborId) }, rightNeighbor: function () { if (this.rightNeighborId) return this.lookupNode(this.rightNeighborId) }, leftSibling: function () { var t = this.leftNeighbor(); if (t && t.parentId === this.parentId) return t }, rightSibling: function () { var t = this.rightNeighbor(); if (t && t.parentId === this.parentId) return t }, childrenCenter: function () { var t = this.firstChild(), e = this.lastChild(); return t.prelim + (e.prelim - t.prelim + e.size()) / 2 }, collapsedParent: function () { var t = this.parent(); return !!t && (t.collapsed ? t : t.collapsedParent()) }, leftMost: function (t, e) { if (e <= t) return this; if (0 !== this.childrenCount()) for (var i = 0, n = this.childrenCount(); i < n; i++) { var r = this.childAt(i).leftMost(t + 1, e); if (r) return r } }, connectorPoint: function (t) { var e = this.Tree().CONFIG.rootOrientation, i = {}; return this.stackParentId && ("NORTH" === e || "SOUTH" === e ? e = "WEST" : "EAST" !== e && "WEST" !== e || (e = "NORTH")), "NORTH" === e ? (i.x = this.pseudo ? this.X - this.Tree().CONFIG.subTeeSeparation / 2 : this.X + this.width / 2, i.y = t ? this.Y + this.height : this.Y) : "SOUTH" === e ? (i.x = this.pseudo ? this.X - this.Tree().CONFIG.subTeeSeparation / 2 : this.X + this.width / 2, i.y = t ? this.Y : this.Y + this.height) : "EAST" === e ? (i.x = t ? this.X : this.X + this.width, i.y = this.pseudo ? this.Y - this.Tree().CONFIG.subTeeSeparation / 2 : this.Y + this.height / 2) : "WEST" === e && (i.x = t ? this.X + this.width : this.X, i.y = this.pseudo ? this.Y - this.Tree().CONFIG.subTeeSeparation / 2 : this.Y + this.height / 2), i }, pathStringThrough: function () { var t = this.connectorPoint(!0), e = this.connectorPoint(!1); return ["M", t.x + "," + t.y, "L", e.x + "," + e.y].join(" ") }, drawLineThroughMe: function (t) { var e = t ? this.Tree().getPointPathString(t) : this.pathStringThrough(); this.lineThroughMe = this.lineThroughMe || this.Tree()._R.path(e); var i = d.cloneObj(this.connStyle.style); delete i["arrow-start"], delete i["arrow-end"], this.lineThroughMe.attr(i), t && (this.lineThroughMe.hide(), this.lineThroughMe.hidden = !0) }, addSwitchEvent: function (e) { var i = this; d.addEvent(e, "click", function (t) { if (t.preventDefault(), !1 === i.getTreeConfig().callback.onBeforeClickCollapseSwitch.apply(i, [e, t])) return !1; i.toggleCollapse(), i.getTreeConfig().callback.onAfterClickCollapseSwitch.apply(i, [e, t]) }) }, collapse: function () { return this.collapsed || this.toggleCollapse(), this }, expand: function () { return this.collapsed && this.toggleCollapse(), this }, toggleCollapse: function () { var t = this.getTree(); if (!t.inAnimation) { t.inAnimation = !0, this.collapsed = !this.collapsed, d.toggleClass(this.nodeDOM, "collapsed", this.collapsed), t.positionTree(); var e = this; setTimeout(function () { t.inAnimation = !1, t.CONFIG.callback.onToggleCollapseFinished.apply(t, [e, e.collapsed]) }, t.CONFIG.animation.nodeSpeed > t.CONFIG.animation.connectorsSpeed ? t.CONFIG.animation.nodeSpeed : t.CONFIG.animation.connectorsSpeed) } return this }, hide: function (t) { t = t || !1; var e = this.hidden; this.hidden = !0, this.nodeDOM.style.overflow = "hidden"; var i = this.getTree(), n = this.getTreeConfig(), r = { opacity: 0 }; if (t && (r.left = t.x, r.top = t.y), !this.positioned || e ? (this.nodeDOM.style.visibility = "hidden", s ? s(this.nodeDOM).css(r) : (this.nodeDOM.style.left = r.left + "px", this.nodeDOM.style.top = r.top + "px"), this.positioned = !0) : s ? s(this.nodeDOM).animate(r, n.animation.nodeSpeed, n.animation.nodeAnimation, function () { this.style.visibility = "hidden" }) : (this.nodeDOM.style.transition = "all " + n.animation.nodeSpeed + "ms ease", this.nodeDOM.style.transitionProperty = "opacity, left, top", this.nodeDOM.style.opacity = r.opacity, this.nodeDOM.style.left = r.left + "px", this.nodeDOM.style.top = r.top + "px", this.nodeDOM.style.visibility = "hidden"), this.lineThroughMe) { var o = i.getPointPathString(t); e ? this.lineThroughMe.attr({ path: o }) : i.animatePath(this.lineThroughMe, i.getPointPathString(t)) } return this }, hideConnector: function () { var t = this.Tree(), e = t.connectionStore[this.id]; return e && e.animate({ opacity: 0 }, t.CONFIG.animation.connectorsSpeed, t.CONFIG.animation.connectorsAnimation), this }, show: function () { this.hidden; this.hidden = !1, this.nodeDOM.style.visibility = "visible"; this.Tree(); var t = { left: this.X, top: this.Y, opacity: 1 }, e = this.getTreeConfig(); return s ? s(this.nodeDOM).animate(t, e.animation.nodeSpeed, e.animation.nodeAnimation, function () { this.style.overflow = "" }) : (this.nodeDOM.style.transition = "all " + e.animation.nodeSpeed + "ms ease", this.nodeDOM.style.transitionProperty = "opacity, left, top", this.nodeDOM.style.left = t.left + "px", this.nodeDOM.style.top = t.top + "px", this.nodeDOM.style.opacity = t.opacity, this.nodeDOM.style.overflow = ""), this.lineThroughMe && this.getTree().animatePath(this.lineThroughMe, this.pathStringThrough()), this }, showConnector: function () { var t = this.Tree(), e = t.connectionStore[this.id]; return e && e.animate({ opacity: 1 }, t.CONFIG.animation.connectorsSpeed, t.CONFIG.animation.connectorsAnimation), this } }, h.prototype.buildNodeFromText = function (t) { if (this.image && (image = document.createElement("img"), image.src = this.image, t.appendChild(image)), this.text) for (var e in this.text) if (e.startsWith("data-")) t.setAttribute(e, this.text[e]); else { var i = document.createElement(this.text[e].href ? "a" : "p"); this.text[e].href && (i.href = this.text[e].href, this.text[e].target && (i.target = this.text[e].target)), i.className = "node-" + e, i.appendChild(document.createTextNode(this.text[e].val ? this.text[e].val : this.text[e] instanceof Object ? "'val' param missing!" : this.text[e])), t.appendChild(i) } return t }, h.prototype.buildNodeFromHtml = function (t) { if ("#" === this.nodeInnerHTML.charAt(0)) { var e = document.getElementById(this.nodeInnerHTML.substring(1)); e ? ((t = e.cloneNode(!0)).id += "-clone", t.className += " node") : t.innerHTML = "<b> Wrong ID selector </b>" } else t.innerHTML = this.nodeInnerHTML; return t }, h.prototype.createGeometry = function (t) { if (0 === this.id && t.CONFIG.hideRootNode) return this.width = 0, void (this.height = 0); var e = t.drawArea, i = document.createElement(this.link.href ? "a" : "div"); i.className = this.pseudo ? "pseudo" : h.CONFIG.nodeHTMLclass, this.nodeHTMLclass && !this.pseudo && (i.className += " " + this.nodeHTMLclass), this.nodeHTMLid && (i.id = this.nodeHTMLid), this.link.href && (i.href = this.link.href, i.target = this.link.target), s ? s(i).data("treenode", this) : i.data = { treenode: this }, this.pseudo || (i = this.nodeInnerHTML ? this.buildNodeFromHtml(i) : this.buildNodeFromText(i), (this.collapsed || this.collapsable && this.childrenCount() && !this.stackParentId) && this.createSwitchGeometry(t, i)), t.CONFIG.callback.onCreateNode.apply(t, [this, i]), e.appendChild(i), this.width = i.offsetWidth, this.height = i.offsetHeight, this.nodeDOM = i, t.imageLoader.processNode(this) }, h.prototype.createSwitchGeometry = function (t, e) { e = e || this.nodeDOM; var i = d.findEl(".collapse-switch", !0, e); return i || ((i = document.createElement("a")).className = "collapse-switch", e.appendChild(i), this.addSwitchEvent(i), this.collapsed && (e.className += " collapsed"), t.CONFIG.callback.onCreateNodeCollapseSwitch.apply(t, [this, e, i])), i }, r.CONFIG = { maxDepth: 100, rootOrientation: "NORTH", nodeAlign: "CENTER", levelSeparation: 30, siblingSeparation: 30, subTeeSeparation: 30, hideRootNode: !1, animateOnInit: !1, animateOnInitDelay: 500, padding: 15, scrollbar: "native", connectors: { type: "curve", style: { stroke: "black" }, stackIndent: 15 }, node: { link: { target: "_self" } }, animation: { nodeSpeed: 450, nodeAnimation: "linear", connectorsSpeed: 450, connectorsAnimation: "linear" }, callback: { onCreateNode: function (t, e) { }, onCreateNodeCollapseSwitch: function (t, e, i) { }, onAfterAddNode: function (t, e, i) { }, onBeforeAddNode: function (t, e) { }, onAfterPositionNode: function (t, e, i, n) { }, onBeforePositionNode: function (t, e, i, n) { }, onToggleCollapseFinished: function (t, e) { }, onAfterClickCollapseSwitch: function (t, e) { }, onBeforeClickCollapseSwitch: function (t, e) { }, onTreeLoaded: function (t) { } } }, h.CONFIG = { nodeHTMLclass: "node" }; var t, a = { make: function (t) { var e, i = t.length; for (this.jsonStructure = { chart: null, nodeStructure: null }; i--;)(e = t[i]).hasOwnProperty("container") ? this.jsonStructure.chart = e : e.hasOwnProperty("parent") || e.hasOwnProperty("container") || ((this.jsonStructure.nodeStructure = e)._json_id = 0); return this.findChildren(t), this.jsonStructure }, findChildren: function (t) { for (var e = [0]; e.length;) { for (var i = e.pop(), n = this.findNode(this.jsonStructure.nodeStructure, i), r = 0, o = t.length, s = []; r < o; r++) { var h = t[r]; h.parent && h.parent._json_id === i && (h._json_id = this.getID(), delete h.parent, s.push(h), e.push(h._json_id)) } s.length && (n.children = s) } }, findNode: function (t, e) { var i, n; if (t._json_id === e) return t; if (t.children) for (i = t.children.length; i--;)if (n = this.findNode(t.children[i], e)) return n }, getID: (t = 1, function () { return t++ }) }, e = function (t, e, i) { t instanceof Array && (t = a.make(t)), i && (s = i), this.tree = n.createTree(t), this.tree.positionTree(e) }; e.prototype.destroy = function () { n.destroy(this.tree.id) }, window.Treant = e }();