/*
 Highmaps JS v8.0.4 (2020-03-10)

 (c) 2011-2018 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (Z, P) { "object" === typeof module && module.exports ? (P["default"] = P, module.exports = Z.document ? P(Z) : P) : "function" === typeof define && define.amd ? define("highcharts/highmaps", function () { return P(Z) }) : (Z.Highcharts && Z.Highcharts.error(16, !0), Z.Highcharts = P(Z)) })("undefined" !== typeof window ? window : this, function (Z) {
    function P(c, g, E, q) { c.hasOwnProperty(g) || (c[g] = q.apply(null, E)) } var u = {}; P(u, "parts/Globals.js", [], function () {
        var c = "undefined" !== typeof Z ? Z : "undefined" !== typeof window ? window : {}, g = c.document,
        E = c.navigator && c.navigator.userAgent || "", q = g && g.createElementNS && !!g.createElementNS("http://www.w3.org/2000/svg", "svg").createSVGRect, y = /(edge|msie|trident)/i.test(E) && !c.opera, v = -1 !== E.indexOf("Firefox"), N = -1 !== E.indexOf("Chrome"), D = v && 4 > parseInt(E.split("Firefox/")[1], 10); return {
            product: "Highcharts", version: "8.0.4", deg2rad: 2 * Math.PI / 360, doc: g, hasBidiBug: D, hasTouch: !!c.TouchEvent, isMS: y, isWebKit: -1 !== E.indexOf("AppleWebKit"), isFirefox: v, isChrome: N, isSafari: !N && -1 !== E.indexOf("Safari"), isTouchDevice: /(Mobile|Android|Windows Phone)/.test(E),
            SVG_NS: "http://www.w3.org/2000/svg", chartCount: 0, seriesTypes: {}, symbolSizes: {}, svg: q, win: c, marginNames: ["plotTop", "marginRight", "marginBottom", "plotLeft"], noop: function () { }, charts: [], dateFormats: {}
        }
    }); P(u, "parts/Utilities.js", [u["parts/Globals.js"]], function (c) {
        function g() {
            var a, b = arguments, l = {}, e = function (a, b) { "object" !== typeof a && (a = {}); ba(b, function (l, d) { !m(l, !0) || n(l) || L(l) ? a[d] = b[d] : a[d] = e(a[d] || {}, l) }); return a }; !0 === b[0] && (l = b[1], b = Array.prototype.slice.call(b, 2)); var d = b.length; for (a = 0; a <
                d; a++)l = e(l, b[a]); return l
        } function E(b, l, e) { var d; r(l) ? a(e) ? b.setAttribute(l, e) : b && b.getAttribute && ((d = b.getAttribute(l)) || "class" !== l || (d = b.getAttribute(l + "Name"))) : ba(l, function (a, l) { b.setAttribute(l, a) }); return d } function q() { for (var a = arguments, b = a.length, l = 0; l < b; l++) { var e = a[l]; if ("undefined" !== typeof e && null !== e) return e } } function y(a, b) {
            if (!a) return b; var l = a.split(".").reverse(); if (1 === l.length) return b[a]; for (a = l.pop(); "undefined" !== typeof a && "undefined" !== typeof b && null !== b;)b = b[a], a = l.pop();
            return b
        } c.timers = []; var v = c.charts, N = c.doc, D = c.win, F = c.error = function (a, b, l, e) { var d = M(a), B = d ? "Highcharts error #" + a + ": www.highcharts.com/errors/" + a + "/" : a.toString(), f = function () { if (b) throw Error(B); D.console && console.log(B) }; if ("undefined" !== typeof e) { var h = ""; d && (B += "?"); c.objectEach(e, function (a, b) { h += "\n" + b + ": " + a; d && (B += encodeURI(b) + "=" + encodeURI(a)) }); B += h } l ? c.fireEvent(l, "displayError", { code: a, message: B, params: e }, f) : f() }, C = function () {
            function a(a, b, l) {
            this.options = b; this.elem = a; this.prop =
                l
            } a.prototype.dSetter = function () { var a = this.paths[0], b = this.paths[1], l = [], e = this.now, d = a.length; if (1 === e) l = this.toD; else if (d === b.length && 1 > e) for (; d--;) { var B = parseFloat(a[d]); l[d] = isNaN(B) || "A" === b[d - 4] || "A" === b[d - 5] ? b[d] : e * parseFloat("" + (b[d] - B)) + B } else l = b; this.elem.attr("d", l, null, !0) }; a.prototype.update = function () { var a = this.elem, b = this.prop, l = this.now, e = this.options.step; if (this[b + "Setter"]) this[b + "Setter"](); else a.attr ? a.element && a.attr(b, l, null, !0) : a.style[b] = l + this.unit; e && e.call(a, l, this) };
            a.prototype.run = function (a, b, l) {
                var e = this, d = e.options, B = function (a) { return B.stopped ? !1 : e.step(a) }, f = D.requestAnimationFrame || function (a) { setTimeout(a, 13) }, h = function () { for (var a = 0; a < c.timers.length; a++)c.timers[a]() || c.timers.splice(a--, 1); c.timers.length && f(h) }; a !== b || this.elem["forceAnimate:" + this.prop] ? (this.startTime = +new Date, this.start = a, this.end = b, this.unit = l, this.now = this.start, this.pos = 0, B.elem = this.elem, B.prop = this.prop, B() && 1 === c.timers.push(B) && f(h)) : (delete d.curAnim[this.prop], d.complete &&
                    0 === Object.keys(d.curAnim).length && d.complete.call(this.elem))
            }; a.prototype.step = function (a) { var b = +new Date, l = this.options, e = this.elem, d = l.complete, B = l.duration, f = l.curAnim; if (e.attr && !e.element) a = !1; else if (a || b >= B + this.startTime) { this.now = this.end; this.pos = 1; this.update(); var h = f[this.prop] = !0; ba(f, function (a) { !0 !== a && (h = !1) }); h && d && d.call(e); a = !1 } else this.pos = l.easing((b - this.startTime) / B), this.now = this.start + (this.end - this.start) * this.pos, this.update(), a = !0; return a }; a.prototype.initPath = function (a,
                b, l) {
                    function e(a) { for (H = a.length; H--;) { var b = "M" === a[H] || "L" === a[H]; var l = /[a-zA-Z]/.test(a[H + 3]); b && l && a.splice(H + 1, 0, a[H + 1], a[H + 2], a[H + 1], a[H + 2]) } } function d(a, b) { for (; a.length < t;) { a[0] = b[t - a.length]; var l = a.slice(0, A);[].splice.apply(a, [0, 0].concat(l)); O && (l = a.slice(a.length - A), [].splice.apply(a, [a.length, 0].concat(l)), H--) } a[0] = "M" } function B(a, b) {
                        for (var l = (t - a.length) / A; 0 < l && l--;)I = a.slice().splice(a.length / U - A, A * U), I[0] = b[t - A - l * A], p && (I[A - 6] = I[A - 2], I[A - 5] = I[A - 1]), [].splice.apply(a, [a.length /
                            U, 0].concat(I)), O && l--
                    } b = b || ""; var f = a.startX, h = a.endX, p = -1 < b.indexOf("C"), A = p ? 7 : 3, I, H; b = b.split(" "); l = l.slice(); var O = a.isArea, U = O ? 2 : 1; p && (e(b), e(l)); if (f && h) { for (H = 0; H < f.length; H++)if (f[H] === h[0]) { var z = H; break } else if (f[0] === h[h.length - f.length + H]) { z = H; var w = !0; break } else if (f[f.length - 1] === h[h.length - f.length + H]) { z = f.length - H; break } "undefined" === typeof z && (b = []) } if (b.length && M(z)) { var t = l.length + z * U * A; w ? (d(b, l), B(l, b)) : (d(l, b), B(b, l)) } return [b, l]
            }; a.prototype.fillSetter = function () {
                c.Fx.prototype.strokeSetter.apply(this,
                    arguments)
            }; a.prototype.strokeSetter = function () { this.elem.attr(this.prop, c.color(this.start).tweenTo(c.color(this.end), this.pos), null, !0) }; return a
        }(); c.Fx = C; c.merge = g; var k = c.pInt = function (a, b) { return parseInt(a, b || 10) }, r = c.isString = function (a) { return "string" === typeof a }, x = c.isArray = function (a) { a = Object.prototype.toString.call(a); return "[object Array]" === a || "[object Array Iterator]" === a }, m = c.isObject = function (a, b) { return !!a && "object" === typeof a && (!b || !x(a)) }, L = c.isDOMElement = function (a) {
            return m(a) &&
                "number" === typeof a.nodeType
        }, n = c.isClass = function (a) { var b = a && a.constructor; return !(!m(a, !0) || L(a) || !b || !b.name || "Object" === b.name) }, M = c.isNumber = function (a) { return "number" === typeof a && !isNaN(a) && Infinity > a && -Infinity < a }, f = c.erase = function (a, b) { for (var l = a.length; l--;)if (a[l] === b) { a.splice(l, 1); break } }, a = c.defined = function (a) { return "undefined" !== typeof a && null !== a }; c.attr = E; var d = c.splat = function (a) { return x(a) ? a : [a] }, h = c.syncTimeout = function (a, b, l) { if (0 < b) return setTimeout(a, b, l); a.call(0, l); return -1 },
            e = c.clearTimeout = function (b) { a(b) && clearTimeout(b) }, b = c.extend = function (a, b) { var l; a || (a = {}); for (l in b) a[l] = b[l]; return a }; c.pick = q; var p = c.css = function (a, l) { c.isMS && !c.svg && l && "undefined" !== typeof l.opacity && (l.filter = "alpha(opacity=" + 100 * l.opacity + ")"); b(a.style, l) }, z = c.createElement = function (a, l, e, d, B) { a = N.createElement(a); l && b(a, l); B && p(a, { padding: "0", border: "none", margin: "0" }); e && p(a, e); d && d.appendChild(a); return a }, t = c.extendClass = function (a, l) {
                var e = function () { }; e.prototype = new a; b(e.prototype,
                    l); return e
            }, w = c.pad = function (a, b, l) { return Array((b || 2) + 1 - String(a).replace("-", "").length).join(l || "0") + a }, G = c.relativeLength = function (a, b, l) { return /%$/.test(a) ? b * parseFloat(a) / 100 + (l || 0) : parseFloat(a) }, K = c.wrap = function (a, b, l) { var e = a[b]; a[b] = function () { var a = Array.prototype.slice.call(arguments), b = arguments, d = this; d.proceed = function () { e.apply(d, arguments.length ? arguments : b) }; a.unshift(e); a = l.apply(this, a); d.proceed = null; return a } }, Q = c.format = function (a, b, l) {
                var e = "{", d = !1, B = [], f = /f$/, h = /\.([0-9])/,
                p = c.defaultOptions.lang, A = l && l.time || c.time; for (l = l && l.numberFormatter || U; a;) { var I = a.indexOf(e); if (-1 === I) break; var H = a.slice(0, I); if (d) { H = H.split(":"); e = y(H.shift() || "", b); if (H.length && "number" === typeof e) if (H = H.join(":"), f.test(H)) { var O = parseInt((H.match(h) || ["", "-1"])[1], 10); null !== e && (e = l(e, O, p.decimalPoint, -1 < H.indexOf(",") ? p.thousandsSep : "")) } else e = A.dateFormat(H, e); B.push(e) } else B.push(H); a = a.slice(I + 1); e = (d = !d) ? "}" : "{" } B.push(a); return B.join("")
            }, J = c.getMagnitude = function (a) {
                return Math.pow(10,
                    Math.floor(Math.log(a) / Math.LN10))
            }, S = c.normalizeTickInterval = function (a, b, l, e, d) { var B = a; l = q(l, 1); var f = a / l; b || (b = d ? [1, 1.2, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10] : [1, 2, 2.5, 5, 10], !1 === e && (1 === l ? b = b.filter(function (a) { return 0 === a % 1 }) : .1 >= l && (b = [1 / l]))); for (e = 0; e < b.length && !(B = b[e], d && B * l >= a || !d && f <= (b[e] + (b[e + 1] || b[e])) / 2); e++); return B = R(B * l, -Math.round(Math.log(.001) / Math.LN10)) }, A = c.stableSort = function (a, b) {
                var l = a.length, e, d; for (d = 0; d < l; d++)a[d].safeI = d; a.sort(function (a, l) {
                    e = b(a, l); return 0 === e ? a.safeI - l.safeI :
                        e
                }); for (d = 0; d < l; d++)delete a[d].safeI
            }, l = c.arrayMin = function (a) { for (var b = a.length, l = a[0]; b--;)a[b] < l && (l = a[b]); return l }, H = c.arrayMax = function (a) { for (var b = a.length, l = a[0]; b--;)a[b] > l && (l = a[b]); return l }, I = c.destroyObjectProperties = function (a, b) { ba(a, function (l, e) { l && l !== b && l.destroy && l.destroy(); delete a[e] }) }, W = c.discardElement = function (a) { var b = c.garbageBin; b || (b = z("div")); a && b.appendChild(a); b.innerHTML = "" }, R = c.correctFloat = function (a, b) { return parseFloat(a.toPrecision(b || 14)) }, X = c.setAnimation =
                function (a, b) { b.renderer.globalAnimation = q(a, b.options.chart.animation, !0) }, V = c.animObject = function (a) { return m(a) ? g(a) : { duration: a ? 500 : 0 } }, B = c.timeUnits = { millisecond: 1, second: 1E3, minute: 6E4, hour: 36E5, day: 864E5, week: 6048E5, month: 24192E5, year: 314496E5 }, U = c.numberFormat = function (a, b, l, e) {
                    a = +a || 0; b = +b; var d = c.defaultOptions.lang, B = (a.toString().split(".")[1] || "").split("e")[0].length, f = a.toString().split("e"); if (-1 === b) b = Math.min(B, 20); else if (!M(b)) b = 2; else if (b && f[1] && 0 > f[1]) {
                        var h = b + +f[1]; 0 <= h ? (f[0] =
                            (+f[0]).toExponential(h).split("e")[0], b = h) : (f[0] = f[0].split(".")[0] || 0, a = 20 > b ? (f[0] * Math.pow(10, f[1])).toFixed(b) : 0, f[1] = 0)
                    } var p = (Math.abs(f[1] ? f[0] : a) + Math.pow(10, -Math.max(b, B) - 1)).toFixed(b); B = String(k(p)); h = 3 < B.length ? B.length % 3 : 0; l = q(l, d.decimalPoint); e = q(e, d.thousandsSep); a = (0 > a ? "-" : "") + (h ? B.substr(0, h) + e : ""); a += B.substr(h).replace(/(\d{3})(?=\d)/g, "$1" + e); b && (a += l + p.slice(-b)); f[1] && 0 !== +a && (a += "e" + f[1]); return a
                }; Math.easeInOutSine = function (a) { return -.5 * (Math.cos(Math.PI * a) - 1) }; var aa = c.getStyle =
                    function (a, b, l) { if ("width" === b) return b = Math.min(a.offsetWidth, a.scrollWidth), l = a.getBoundingClientRect && a.getBoundingClientRect().width, l < b && l >= b - 1 && (b = Math.floor(l)), Math.max(0, b - c.getStyle(a, "padding-left") - c.getStyle(a, "padding-right")); if ("height" === b) return Math.max(0, Math.min(a.offsetHeight, a.scrollHeight) - c.getStyle(a, "padding-top") - c.getStyle(a, "padding-bottom")); D.getComputedStyle || F(27, !0); if (a = D.getComputedStyle(a, void 0)) a = a.getPropertyValue(b), q(l, "opacity" !== b) && (a = k(a)); return a },
                    Y = c.inArray = function (a, b, l) { return b.indexOf(a, l) }, O = c.find = Array.prototype.find ? function (a, b) { return a.find(b) } : function (a, b) { var l, e = a.length; for (l = 0; l < e; l++)if (b(a[l], l)) return a[l] }; c.keys = Object.keys; var T = c.offset = function (a) { var b = N.documentElement; a = a.parentElement || a.parentNode ? a.getBoundingClientRect() : { top: 0, left: 0 }; return { top: a.top + (D.pageYOffset || b.scrollTop) - (b.clientTop || 0), left: a.left + (D.pageXOffset || b.scrollLeft) - (b.clientLeft || 0) } }, ca = c.stop = function (a, b) {
                        for (var l = c.timers.length; l--;)c.timers[l].elem !==
                            a || b && b !== c.timers[l].prop || (c.timers[l].stopped = !0)
                    }, ba = c.objectEach = function (a, b, l) { for (var e in a) Object.hasOwnProperty.call(a, e) && b.call(l || a[e], a[e], e, a) }; ba({ map: "map", each: "forEach", grep: "filter", reduce: "reduce", some: "some" }, function (a, b) { c[b] = function (b) { return Array.prototype[a].apply(b, [].slice.call(arguments, 1)) } }); var fa = c.addEvent = function (a, b, l, e) {
                    void 0 === e && (e = {}); var d = a.addEventListener || c.addEventListenerPolyfill; var B = "function" === typeof a && a.prototype ? a.prototype.protoEvents =
                        a.prototype.protoEvents || {} : a.hcEvents = a.hcEvents || {}; c.Point && a instanceof c.Point && a.series && a.series.chart && (a.series.chart.runTrackerClick = !0); d && d.call(a, b, l, !1); B[b] || (B[b] = []); B[b].push({ fn: l, order: "number" === typeof e.order ? e.order : Infinity }); B[b].sort(function (a, b) { return a.order - b.order }); return function () { da(a, b, l) }
                    }, da = c.removeEvent = function (a, b, l) {
                        function e(b, l) { var e = a.removeEventListener || c.removeEventListenerPolyfill; e && e.call(a, b, l, !1) } function d(l) {
                            var d; if (a.nodeName) {
                                if (b) {
                                    var B =
                                        {}; B[b] = !0
                                } else B = l; ba(B, function (a, b) { if (l[b]) for (d = l[b].length; d--;)e(b, l[b][d].fn) })
                            }
                        } var B;["protoEvents", "hcEvents"].forEach(function (f, h) { var p = (h = h ? a : a.prototype) && h[f]; p && (b ? (B = p[b] || [], l ? (p[b] = B.filter(function (a) { return l !== a.fn }), e(b, l)) : (d(p), p[b] = [])) : (d(p), h[f] = {})) })
                    }, ha = c.fireEvent = function (a, l, e, d) {
                        var B; e = e || {}; if (N.createEvent && (a.dispatchEvent || a.fireEvent)) { var f = N.createEvent("Events"); f.initEvent(l, !0, !0); b(f, e); a.dispatchEvent ? a.dispatchEvent(f) : a.fireEvent(l, f) } else e.target ||
                            b(e, { preventDefault: function () { e.defaultPrevented = !0 }, target: a, type: l }), function (b, l) { void 0 === b && (b = []); void 0 === l && (l = []); var d = 0, f = 0, h = b.length + l.length; for (B = 0; B < h; B++)!1 === (b[d] ? l[f] ? b[d].order <= l[f].order ? b[d++] : l[f++] : b[d++] : l[f++]).fn.call(a, e) && e.preventDefault() }(a.protoEvents && a.protoEvents[l], a.hcEvents && a.hcEvents[l]); d && !e.defaultPrevented && d.call(a, e)
                    }, ia = c.animate = function (a, b, l) {
                        var e, d = "", B, f; if (!m(l)) { var h = arguments; l = { duration: h[2], easing: h[3], complete: h[4] } } M(l.duration) || (l.duration =
                            400); l.easing = "function" === typeof l.easing ? l.easing : Math[l.easing] || Math.easeInOutSine; l.curAnim = g(b); ba(b, function (h, p) { ca(a, p); f = new C(a, l, p); B = null; "d" === p ? (f.paths = f.initPath(a, a.d, b.d), f.toD = b.d, e = 0, B = 1) : a.attr ? e = a.attr(p) : (e = parseFloat(aa(a, p)) || 0, "opacity" !== p && (d = "px")); B || (B = h); B && B.match && B.match("px") && (B = B.replace(/px/g, "")); f.run(e, B, d) })
                    }, u = c.seriesType = function (a, b, l, e, d) {
                        var B = c.getOptions(), f = c.seriesTypes; B.plotOptions[a] = g(B.plotOptions[b], l); f[a] = t(f[b] || function () { }, e); f[a].prototype.type =
                            a; d && (f[a].prototype.pointClass = t(c.Point, d)); return f[a]
                    }, ea = c.uniqueKey = function () { var a = Math.random().toString(36).substring(2, 9), b = 0; return function () { return "highcharts-" + a + "-" + b++ } }(), ja = c.isFunction = function (a) { return "function" === typeof a }; D.jQuery && (D.jQuery.fn.highcharts = function () { var a = [].slice.call(arguments); if (this[0]) return a[0] ? (new (c[r(a[0]) ? a.shift() : "Chart"])(this[0], a[0], a[1]), this) : v[E(this[0], "data-highcharts-chart")] }); return {
                        Fx: C, addEvent: fa, animate: ia, animObject: V, arrayMax: H,
                        arrayMin: l, attr: E, clamp: function (a, b, l) { return a > b ? a < l ? a : l : b }, clearTimeout: e, correctFloat: R, createElement: z, css: p, defined: a, destroyObjectProperties: I, discardElement: W, erase: f, error: F, extend: b, extendClass: t, find: O, fireEvent: ha, format: Q, getMagnitude: J, getNestedProperty: y, getStyle: aa, inArray: Y, isArray: x, isClass: n, isDOMElement: L, isFunction: ja, isNumber: M, isObject: m, isString: r, merge: g, normalizeTickInterval: S, numberFormat: U, objectEach: ba, offset: T, pad: w, pick: q, pInt: k, relativeLength: G, removeEvent: da, seriesType: u,
                        setAnimation: X, splat: d, stableSort: A, stop: ca, syncTimeout: h, timeUnits: B, uniqueKey: ea, wrap: K
                    }
    }); P(u, "parts/Color.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
        var E = g.isNumber, q = g.merge, y = g.pInt; g = function () {
            function c(g) {
            this.parsers = [{ regex: /rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]?(?:\.[0-9]+)?)\s*\)/, parse: function (c) { return [y(c[1]), y(c[2]), y(c[3]), parseFloat(c[4], 10)] } }, {
                regex: /rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/, parse: function (c) {
                    return [y(c[1]),
                    y(c[2]), y(c[3]), 1]
                }
            }]; this.rgba = []; if (!(this instanceof c)) return new c(g); this.init(g)
            } c.parse = function (g) { return new c(g) }; c.prototype.init = function (g) {
                var q, v; if ((this.input = g = c.names[g && g.toLowerCase ? g.toLowerCase() : ""] || g) && g.stops) this.stops = g.stops.map(function (k) { return new c(k[1]) }); else {
                    if (g && g.charAt && "#" === g.charAt()) { var C = g.length; g = parseInt(g.substr(1), 16); 7 === C ? q = [(g & 16711680) >> 16, (g & 65280) >> 8, g & 255, 1] : 4 === C && (q = [(g & 3840) >> 4 | (g & 3840) >> 8, (g & 240) >> 4 | g & 240, (g & 15) << 4 | g & 15, 1]) } if (!q) for (v =
                        this.parsers.length; v-- && !q;) { var k = this.parsers[v]; (C = k.regex.exec(g)) && (q = k.parse(C)) }
                } this.rgba = q || []
            }; c.prototype.get = function (c) { var g = this.input, v = this.rgba; if ("undefined" !== typeof this.stops) { var C = q(g); C.stops = [].concat(C.stops); this.stops.forEach(function (k, r) { C.stops[r] = [C.stops[r][0], k.get(c)] }) } else C = v && E(v[0]) ? "rgb" === c || !c && 1 === v[3] ? "rgb(" + v[0] + "," + v[1] + "," + v[2] + ")" : "a" === c ? v[3] : "rgba(" + v.join(",") + ")" : g; return C }; c.prototype.brighten = function (c) {
                var g, q = this.rgba; if (this.stops) this.stops.forEach(function (g) { g.brighten(c) });
                else if (E(c) && 0 !== c) for (g = 0; 3 > g; g++)q[g] += y(255 * c), 0 > q[g] && (q[g] = 0), 255 < q[g] && (q[g] = 255); return this
            }; c.prototype.setOpacity = function (c) { this.rgba[3] = c; return this }; c.prototype.tweenTo = function (c, g) { var q = this.rgba, v = c.rgba; v.length && q && q.length ? (c = 1 !== v[3] || 1 !== q[3], g = (c ? "rgba(" : "rgb(") + Math.round(v[0] + (q[0] - v[0]) * (1 - g)) + "," + Math.round(v[1] + (q[1] - v[1]) * (1 - g)) + "," + Math.round(v[2] + (q[2] - v[2]) * (1 - g)) + (c ? "," + (v[3] + (q[3] - v[3]) * (1 - g)) : "") + ")") : g = c.input || "none"; return g }; c.names = { white: "#ffffff", black: "#000000" };
            return c
        }(); c.Color = g; c.color = g.parse; return c.Color
    }); P(u, "parts/SvgRenderer.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Utilities.js"]], function (c, g, E) {
        var q = g.parse, y = E.addEvent, v = E.animate, N = E.animObject, D = E.attr, F = E.createElement, C = E.css, k = E.defined, r = E.destroyObjectProperties, x = E.erase, m = E.extend, L = E.inArray, n = E.isArray, M = E.isNumber, f = E.isObject, a = E.isString, d = E.merge, h = E.objectEach, e = E.pick, b = E.pInt, p = E.removeEvent, z = E.splat, t = E.stop, w = E.uniqueKey, G = c.charts, K = c.deg2rad, Q = c.doc,
        J = c.hasTouch, S = c.isFirefox, A = c.isMS, l = c.isWebKit, H = c.noop, I = c.svg, W = c.SVG_NS, R = c.symbolSizes, X = c.win; var V = c.SVGElement = function () { return this }; m(V.prototype, {
            opacity: 1, SVG_NS: W, textProps: "direction fontSize fontWeight fontFamily fontStyle color lineHeight width textAlign textDecoration textOverflow textOutline cursor".split(" "), init: function (a, b) { this.element = "span" === b ? F(b) : Q.createElementNS(this.SVG_NS, b); this.renderer = a; c.fireEvent(this, "afterInit") }, animate: function (a, b, l) {
                var d = N(e(b, this.renderer.globalAnimation,
                    !0)); e(Q.hidden, Q.msHidden, Q.webkitHidden, !1) && (d.duration = 0); 0 !== d.duration ? (l && (d.complete = l), v(this, a, d)) : (this.attr(a, void 0, l), h(a, function (a, b) { d.step && d.step.call(this, a, { prop: b, pos: 1 }) }, this)); return this
            }, complexColor: function (a, b, l) {
                var e = this.renderer, B, f, p, A, I, H, U, z, t, G, m, L = [], r; c.fireEvent(this.renderer, "complexColor", { args: arguments }, function () {
                    a.radialGradient ? f = "radialGradient" : a.linearGradient && (f = "linearGradient"); f && (p = a[f], I = e.gradients, U = a.stops, G = l.radialReference, n(p) && (a[f] =
                        p = { x1: p[0], y1: p[1], x2: p[2], y2: p[3], gradientUnits: "userSpaceOnUse" }), "radialGradient" === f && G && !k(p.gradientUnits) && (A = p, p = d(p, e.getRadialAttr(G, A), { gradientUnits: "userSpaceOnUse" })), h(p, function (a, b) { "id" !== b && L.push(b, a) }), h(U, function (a) { L.push(a) }), L = L.join(","), I[L] ? m = I[L].attr("id") : (p.id = m = w(), I[L] = H = e.createElement(f).attr(p).add(e.defs), H.radAttr = A, H.stops = [], U.forEach(function (a) {
                            0 === a[1].indexOf("rgba") ? (B = q(a[1]), z = B.get("rgb"), t = B.get("a")) : (z = a[1], t = 1); a = e.createElement("stop").attr({
                                offset: a[0],
                                "stop-color": z, "stop-opacity": t
                            }).add(H); H.stops.push(a)
                        })), r = "url(" + e.url + "#" + m + ")", l.setAttribute(b, r), l.gradient = L, a.toString = function () { return r })
                })
            }, applyTextOutline: function (a) {
                var b = this.element, l; -1 !== a.indexOf("contrast") && (a = a.replace(/contrast/g, this.renderer.getContrast(b.style.fill))); a = a.split(" "); var e = a[a.length - 1]; if ((l = a[0]) && "none" !== l && c.svg) {
                this.fakeTS = !0; a = [].slice.call(b.getElementsByTagName("tspan")); this.ySetter = this.xSetter; l = l.replace(/(^[\d\.]+)(.*?)$/g, function (a, b,
                    l) { return 2 * b + l }); this.removeTextOutline(a); var d = b.textContent ? /^[\u0591-\u065F\u066A-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC]/.test(b.textContent) : !1; var f = b.firstChild; a.forEach(function (a, B) { 0 === B && (a.setAttribute("x", b.getAttribute("x")), B = b.getAttribute("y"), a.setAttribute("y", B || 0), null === B && b.setAttribute("y", 0)); B = a.cloneNode(!0); D(d && !S ? a : B, { "class": "highcharts-text-outline", fill: e, stroke: e, "stroke-width": l, "stroke-linejoin": "round" }); b.insertBefore(B, f) }); d && S && a[0] && (a = a[0].cloneNode(!0), a.textContent =
                        " ", b.insertBefore(a, f))
                }
            }, removeTextOutline: function (a) { for (var b = a.length, l; b--;)l = a[b], "highcharts-text-outline" === l.getAttribute("class") && x(a, this.element.removeChild(l)) }, symbolCustomAttribs: "x y width height r start end innerR anchorX anchorY rounded".split(" "), attr: function (a, b, l, e) {
                var d = this.element, f, B = this, p, A, I = this.symbolCustomAttribs; if ("string" === typeof a && "undefined" !== typeof b) { var H = a; a = {}; a[H] = b } "string" === typeof a ? B = (this[a + "Getter"] || this._defaultGetter).call(this, a, d) : (h(a,
                    function (b, l) { p = !1; e || t(this, l); this.symbolName && -1 !== L(l, I) && (f || (this.symbolAttr(a), f = !0), p = !0); !this.rotation || "x" !== l && "y" !== l || (this.doTransform = !0); p || (A = this[l + "Setter"] || this._defaultSetter, A.call(this, b, l, d), !this.styledMode && this.shadows && /^(width|height|visibility|x|y|d|transform|cx|cy|r)$/.test(l) && this.updateShadows(l, b, A)) }, this), this.afterSetters()); l && l.call(this); return B
            }, afterSetters: function () { this.doTransform && (this.updateTransform(), this.doTransform = !1) }, updateShadows: function (a,
                b, l) { for (var e = this.shadows, d = e.length; d--;)l.call(e[d], "height" === a ? Math.max(b - (e[d].cutHeight || 0), 0) : "d" === a ? this.d : b, a, e[d]) }, addClass: function (a, b) { var l = b ? "" : this.attr("class") || ""; a = (a || "").split(/ /g).reduce(function (a, b) { -1 === l.indexOf(b) && a.push(b); return a }, l ? [l] : []).join(" "); a !== l && this.attr("class", a); return this }, hasClass: function (a) { return -1 !== (this.attr("class") || "").split(" ").indexOf(a) }, removeClass: function (b) {
                    return this.attr("class", (this.attr("class") || "").replace(a(b) ? new RegExp(" ?" +
                        b + " ?") : b, ""))
                }, symbolAttr: function (a) { var b = this; "x y r start end width height innerR anchorX anchorY clockwise".split(" ").forEach(function (l) { b[l] = e(a[l], b[l]) }); b.attr({ d: b.renderer.symbols[b.symbolName](b.x, b.y, b.width, b.height, b) }) }, clip: function (a) { return this.attr("clip-path", a ? "url(" + this.renderer.url + "#" + a.id + ")" : "none") }, crisp: function (a, b) {
                    b = b || a.strokeWidth || 0; var l = Math.round(b) % 2 / 2; a.x = Math.floor(a.x || this.x || 0) + l; a.y = Math.floor(a.y || this.y || 0) + l; a.width = Math.floor((a.width || this.width ||
                        0) - 2 * l); a.height = Math.floor((a.height || this.height || 0) - 2 * l); k(a.strokeWidth) && (a.strokeWidth = b); return a
                }, css: function (a) {
                    var l = this.styles, e = {}, d = this.element, f = "", B = !l, p = ["textOutline", "textOverflow", "width"]; a && a.color && (a.fill = a.color); l && h(a, function (a, b) { a !== l[b] && (e[b] = a, B = !0) }); if (B) {
                        l && (a = m(l, e)); if (a) if (null === a.width || "auto" === a.width) delete this.textWidth; else if ("text" === d.nodeName.toLowerCase() && a.width) var A = this.textWidth = b(a.width); this.styles = a; A && !I && this.renderer.forExport && delete a.width;
                        if (d.namespaceURI === this.SVG_NS) { var H = function (a, b) { return "-" + b.toLowerCase() }; h(a, function (a, b) { -1 === p.indexOf(b) && (f += b.replace(/([A-Z])/g, H) + ":" + a + ";") }); f && D(d, "style", f) } else C(d, a); this.added && ("text" === this.element.nodeName && this.renderer.buildText(this), a && a.textOutline && this.applyTextOutline(a.textOutline))
                    } return this
                }, getStyle: function (a) { return X.getComputedStyle(this.element || this, "").getPropertyValue(a) }, strokeWidth: function () {
                    if (!this.renderer.styledMode) return this["stroke-width"] ||
                        0; var a = this.getStyle("stroke-width"), l = 0; if (a.indexOf("px") === a.length - 2) l = b(a); else if ("" !== a) { var e = Q.createElementNS(W, "rect"); D(e, { width: a, "stroke-width": 0 }); this.element.parentNode.appendChild(e); l = e.getBBox().width; e.parentNode.removeChild(e) } return l
                }, on: function (a, b) {
                    var l, e, d = this.element, f; J && "click" === a ? (d.ontouchstart = function (a) { l = a.touches[0].clientX; e = a.touches[0].clientY }, d.ontouchend = function (a) {
                    l && 4 <= Math.sqrt(Math.pow(l - a.changedTouches[0].clientX, 2) + Math.pow(e - a.changedTouches[0].clientY,
                        2)) || b.call(d, a); f = !0; a.preventDefault()
                    }, d.onclick = function (a) { f || b.call(d, a) }) : d["on" + a] = b; return this
                }, setRadialReference: function (a) { var b = this.renderer.gradients[this.element.gradient]; this.element.radialReference = a; b && b.radAttr && b.animate(this.renderer.getRadialAttr(a, b.radAttr)); return this }, translate: function (a, b) { return this.attr({ translateX: a, translateY: b }) }, invert: function (a) { this.inverted = a; this.updateTransform(); return this }, updateTransform: function () {
                    var a = this.translateX || 0, b = this.translateY ||
                        0, l = this.scaleX, d = this.scaleY, f = this.inverted, h = this.rotation, p = this.matrix, A = this.element; f && (a += this.width, b += this.height); a = ["translate(" + a + "," + b + ")"]; k(p) && a.push("matrix(" + p.join(",") + ")"); f ? a.push("rotate(90) scale(-1,1)") : h && a.push("rotate(" + h + " " + e(this.rotationOriginX, A.getAttribute("x"), 0) + " " + e(this.rotationOriginY, A.getAttribute("y") || 0) + ")"); (k(l) || k(d)) && a.push("scale(" + e(l, 1) + " " + e(d, 1) + ")"); a.length && A.setAttribute("transform", a.join(" "))
                }, toFront: function () {
                    var a = this.element; a.parentNode.appendChild(a);
                    return this
                }, align: function (b, l, d) {
                    var f, h = {}; var p = this.renderer; var B = p.alignedObjects; var A, I; if (b) { if (this.alignOptions = b, this.alignByTranslate = l, !d || a(d)) this.alignTo = f = d || "renderer", x(B, this), B.push(this), d = null } else b = this.alignOptions, l = this.alignByTranslate, f = this.alignTo; d = e(d, p[f], p); f = b.align; p = b.verticalAlign; B = (d.x || 0) + (b.x || 0); var H = (d.y || 0) + (b.y || 0); "right" === f ? A = 1 : "center" === f && (A = 2); A && (B += (d.width - (b.width || 0)) / A); h[l ? "translateX" : "x"] = Math.round(B); "bottom" === p ? I = 1 : "middle" ===
                        p && (I = 2); I && (H += (d.height - (b.height || 0)) / I); h[l ? "translateY" : "y"] = Math.round(H); this[this.placed ? "animate" : "attr"](h); this.placed = !0; this.alignAttr = h; return this
                }, getBBox: function (a, b) {
                    var l, d = this.renderer, f = this.element, h = this.styles, p = this.textStr, B, A = d.cache, I = d.cacheKeys, H = f.namespaceURI === this.SVG_NS; b = e(b, this.rotation, 0); var z = d.styledMode ? f && V.prototype.getStyle.call(f, "font-size") : h && h.fontSize; if (k(p)) {
                        var w = p.toString(); -1 === w.indexOf("<") && (w = w.replace(/[0-9]/g, "0")); w += ["", b, z, this.textWidth,
                            h && h.textOverflow].join()
                    } w && !a && (l = A[w]); if (!l) {
                        if (H || d.forExport) { try { (B = this.fakeTS && function (a) { [].forEach.call(f.querySelectorAll(".highcharts-text-outline"), function (b) { b.style.display = a }) }) && B("none"), l = f.getBBox ? m({}, f.getBBox()) : { width: f.offsetWidth, height: f.offsetHeight }, B && B("") } catch (ea) { "" } if (!l || 0 > l.width) l = { width: 0, height: 0 } } else l = this.htmlGetBBox(); d.isSVG && (a = l.width, d = l.height, H && (l.height = d = { "11px,17": 14, "13px,20": 16 }[h && h.fontSize + "," + Math.round(d)] || d), b && (h = b * K, l.width = Math.abs(d *
                            Math.sin(h)) + Math.abs(a * Math.cos(h)), l.height = Math.abs(d * Math.cos(h)) + Math.abs(a * Math.sin(h)))); if (w && 0 < l.height) { for (; 250 < I.length;)delete A[I.shift()]; A[w] || I.push(w); A[w] = l }
                    } return l
                }, show: function (a) { return this.attr({ visibility: a ? "inherit" : "visible" }) }, hide: function (a) { a ? this.attr({ y: -9999 }) : this.attr({ visibility: "hidden" }); return this }, fadeOut: function (a) { var b = this; b.animate({ opacity: 0 }, { duration: a || 150, complete: function () { b.attr({ y: -9999 }) } }) }, add: function (a) {
                    var b = this.renderer, l = this.element;
                    a && (this.parentGroup = a); this.parentInverted = a && a.inverted; "undefined" !== typeof this.textStr && b.buildText(this); this.added = !0; if (!a || a.handleZ || this.zIndex) var e = this.zIndexSetter(); e || (a ? a.element : b.box).appendChild(l); if (this.onAdd) this.onAdd(); return this
                }, safeRemoveChild: function (a) { var b = a.parentNode; b && b.removeChild(a) }, destroy: function () {
                    var a = this, b = a.element || {}, l = a.renderer, e = l.isSVG && "SPAN" === b.nodeName && a.parentGroup, d = b.ownerSVGElement, f = a.clipPath; b.onclick = b.onmouseout = b.onmouseover =
                        b.onmousemove = b.point = null; t(a); f && d && ([].forEach.call(d.querySelectorAll("[clip-path],[CLIP-PATH]"), function (a) { -1 < a.getAttribute("clip-path").indexOf(f.element.id) && a.removeAttribute("clip-path") }), a.clipPath = f.destroy()); if (a.stops) { for (d = 0; d < a.stops.length; d++)a.stops[d] = a.stops[d].destroy(); a.stops = null } a.safeRemoveChild(b); for (l.styledMode || a.destroyShadows(); e && e.div && 0 === e.div.childNodes.length;)b = e.parentGroup, a.safeRemoveChild(e.div), delete e.div, e = b; a.alignTo && x(l.alignedObjects, a); h(a,
                            function (b, l) { a[l] && a[l].parentGroup === a && a[l].destroy && a[l].destroy(); delete a[l] })
                }, shadow: function (a, b, l) {
                    var d = [], f, h = this.element; if (!a) this.destroyShadows(); else if (!this.shadows) {
                        var p = e(a.width, 3); var A = (a.opacity || .15) / p; var B = this.parentInverted ? "(-1,-1)" : "(" + e(a.offsetX, 1) + ", " + e(a.offsetY, 1) + ")"; for (f = 1; f <= p; f++) {
                            var I = h.cloneNode(0); var H = 2 * p + 1 - 2 * f; D(I, { stroke: a.color || "#000000", "stroke-opacity": A * f, "stroke-width": H, transform: "translate" + B, fill: "none" }); I.setAttribute("class", (I.getAttribute("class") ||
                                "") + " highcharts-shadow"); l && (D(I, "height", Math.max(D(I, "height") - H, 0)), I.cutHeight = H); b ? b.element.appendChild(I) : h.parentNode && h.parentNode.insertBefore(I, h); d.push(I)
                        } this.shadows = d
                    } return this
                }, destroyShadows: function () { (this.shadows || []).forEach(function (a) { this.safeRemoveChild(a) }, this); this.shadows = void 0 }, xGetter: function (a) { "circle" === this.element.nodeName && ("x" === a ? a = "cx" : "y" === a && (a = "cy")); return this._defaultGetter(a) }, _defaultGetter: function (a) {
                    a = e(this[a + "Value"], this[a], this.element ?
                        this.element.getAttribute(a) : null, 0); /^[\-0-9\.]+$/.test(a) && (a = parseFloat(a)); return a
                }, dSetter: function (a, b, l) { a && a.join && (a = a.join(" ")); /(NaN| {2}|^$)/.test(a) && (a = "M 0 0"); this[b] !== a && (l.setAttribute(b, a), this[b] = a) }, dashstyleSetter: function (a) {
                    var l, e = this["stroke-width"]; "inherit" === e && (e = 1); if (a = a && a.toLowerCase()) {
                        a = a.replace("shortdashdotdot", "3,1,1,1,1,1,").replace("shortdashdot", "3,1,1,1").replace("shortdot", "1,1,").replace("shortdash", "3,1,").replace("longdash", "8,3,").replace(/dot/g,
                            "1,3,").replace("dash", "4,3,").replace(/,$/, "").split(","); for (l = a.length; l--;)a[l] = b(a[l]) * e; a = a.join(",").replace(/NaN/g, "none"); this.element.setAttribute("stroke-dasharray", a)
                    }
                }, alignSetter: function (a) { var b = { left: "start", center: "middle", right: "end" }; b[a] && (this.alignValue = a, this.element.setAttribute("text-anchor", b[a])) }, opacitySetter: function (a, b, l) { this[b] = a; l.setAttribute(b, a) }, titleSetter: function (a) {
                    var b = this.element.getElementsByTagName("title")[0]; b || (b = Q.createElementNS(this.SVG_NS, "title"),
                        this.element.appendChild(b)); b.firstChild && b.removeChild(b.firstChild); b.appendChild(Q.createTextNode(String(e(a, "")).replace(/<[^>]*>/g, "").replace(/&lt;/g, "<").replace(/&gt;/g, ">")))
                }, textSetter: function (a) { a !== this.textStr && (delete this.bBox, delete this.textPxLength, this.textStr = a, this.added && this.renderer.buildText(this)) }, setTextPath: function (a, b) {
                    var l = this.element, e = { textAnchor: "text-anchor" }, f = !1, p = this.textPathWrapper, A = !p; b = d(!0, { enabled: !0, attributes: { dy: -5, startOffset: "50%", textAnchor: "middle" } },
                        b); var I = b.attributes; if (a && b && b.enabled) {
                            p && null === p.element.parentNode ? (A = !0, p = p.destroy()) : p && this.removeTextOutline.call(p.parentGroup, [].slice.call(l.getElementsByTagName("tspan"))); this.options && this.options.padding && (I.dx = -this.options.padding); p || (this.textPathWrapper = p = this.renderer.createElement("textPath"), f = !0); var B = p.element; (b = a.element.getAttribute("id")) || a.element.setAttribute("id", b = w()); if (A) for (a = l.getElementsByTagName("tspan"); a.length;)a[0].setAttribute("y", 0), M(I.dx) && a[0].setAttribute("x",
                                -I.dx), B.appendChild(a[0]); f && p.add({ element: this.text ? this.text.element : l }); B.setAttributeNS("http://www.w3.org/1999/xlink", "href", this.renderer.url + "#" + b); k(I.dy) && (B.parentNode.setAttribute("dy", I.dy), delete I.dy); k(I.dx) && (B.parentNode.setAttribute("dx", I.dx), delete I.dx); h(I, function (a, b) { B.setAttribute(e[b] || b, a) }); l.removeAttribute("transform"); this.removeTextOutline.call(p, [].slice.call(l.getElementsByTagName("tspan"))); this.text && !this.renderer.styledMode && this.attr({ fill: "none", "stroke-width": 0 });
                            this.applyTextOutline = this.updateTransform = H
                        } else p && (delete this.updateTransform, delete this.applyTextOutline, this.destroyTextPath(l, a), this.updateTransform(), this.options.rotation && this.applyTextOutline(this.options.style.textOutline)); return this
                }, destroyTextPath: function (a, b) {
                    var l = a.getElementsByTagName("text")[0]; if (l) {
                        if (l.removeAttribute("dx"), l.removeAttribute("dy"), b.element.setAttribute("id", ""), l.getElementsByTagName("textPath").length) {
                            for (a = this.textPathWrapper.element.childNodes; a.length;)l.appendChild(a[0]);
                            l.removeChild(this.textPathWrapper.element)
                        }
                    } else if (a.getAttribute("dx") || a.getAttribute("dy")) a.removeAttribute("dx"), a.removeAttribute("dy"); this.textPathWrapper = this.textPathWrapper.destroy()
                }, fillSetter: function (a, b, l) { "string" === typeof a ? l.setAttribute(b, a) : a && this.complexColor(a, b, l) }, visibilitySetter: function (a, b, l) { "inherit" === a ? l.removeAttribute(b) : this[b] !== a && l.setAttribute(b, a); this[b] = a }, zIndexSetter: function (a, l) {
                    var e = this.renderer, d = this.parentGroup, f = (d || e).element || e.box, h = this.element,
                    p = !1; e = f === e.box; var A = this.added; var I; k(a) ? (h.setAttribute("data-z-index", a), a = +a, this[l] === a && (A = !1)) : k(this[l]) && h.removeAttribute("data-z-index"); this[l] = a; if (A) { (a = this.zIndex) && d && (d.handleZ = !0); l = f.childNodes; for (I = l.length - 1; 0 <= I && !p; I--) { d = l[I]; A = d.getAttribute("data-z-index"); var H = !k(A); if (d !== h) if (0 > a && H && !e && !I) f.insertBefore(h, l[I]), p = !0; else if (b(A) <= a || H && (!k(a) || 0 <= a)) f.insertBefore(h, l[I + 1] || null), p = !0 } p || (f.insertBefore(h, l[e ? 3 : 0] || null), p = !0) } return p
                }, _defaultSetter: function (a,
                    b, l) { l.setAttribute(b, a) }
        }); V.prototype.yGetter = V.prototype.xGetter; V.prototype.translateXSetter = V.prototype.translateYSetter = V.prototype.rotationSetter = V.prototype.verticalAlignSetter = V.prototype.rotationOriginXSetter = V.prototype.rotationOriginYSetter = V.prototype.scaleXSetter = V.prototype.scaleYSetter = V.prototype.matrixSetter = function (a, b) { this[b] = a; this.doTransform = !0 }; V.prototype["stroke-widthSetter"] = V.prototype.strokeSetter = function (a, b, l) {
        this[b] = a; this.stroke && this["stroke-width"] ? (V.prototype.fillSetter.call(this,
            this.stroke, "stroke", l), l.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0) : "stroke-width" === b && 0 === a && this.hasStroke ? (l.removeAttribute("stroke"), this.hasStroke = !1) : this.renderer.styledMode && this["stroke-width"] && (l.setAttribute("stroke-width", this["stroke-width"]), this.hasStroke = !0)
        }; g = c.SVGRenderer = function () { this.init.apply(this, arguments) }; m(g.prototype, {
            Element: V, SVG_NS: W, init: function (a, b, e, d, f, h, p) {
                var A = this.createElement("svg").attr({ version: "1.1", "class": "highcharts-root" });
                p || A.css(this.getStyle(d)); d = A.element; a.appendChild(d); D(a, "dir", "ltr"); -1 === a.innerHTML.indexOf("xmlns") && D(d, "xmlns", this.SVG_NS); this.isSVG = !0; this.box = d; this.boxWrapper = A; this.alignedObjects = []; this.url = (S || l) && Q.getElementsByTagName("base").length ? X.location.href.split("#")[0].replace(/<[^>]*>/g, "").replace(/([\('\)])/g, "\\$1").replace(/ /g, "%20") : ""; this.createElement("desc").add().element.appendChild(Q.createTextNode("Created with Highcharts 8.0.4")); this.defs = this.createElement("defs").add();
                this.allowHTML = h; this.forExport = f; this.styledMode = p; this.gradients = {}; this.cache = {}; this.cacheKeys = []; this.imgCount = 0; this.setSize(b, e, !1); var I; S && a.getBoundingClientRect && (b = function () { C(a, { left: 0, top: 0 }); I = a.getBoundingClientRect(); C(a, { left: Math.ceil(I.left) - I.left + "px", top: Math.ceil(I.top) - I.top + "px" }) }, b(), this.unSubPixelFix = y(X, "resize", b))
            }, definition: function (a) {
                function b(a, e) {
                    var d; z(a).forEach(function (a) {
                        var f = l.createElement(a.tagName), p = {}; h(a, function (a, b) {
                        "tagName" !== b && "children" !==
                            b && "textContent" !== b && (p[b] = a)
                        }); f.attr(p); f.add(e || l.defs); a.textContent && f.element.appendChild(Q.createTextNode(a.textContent)); b(a.children || [], f); d = f
                    }); return d
                } var l = this; return b(a)
            }, getStyle: function (a) { return this.style = m({ fontFamily: '"Lucida Grande", "Lucida Sans Unicode", Arial, Helvetica, sans-serif', fontSize: "12px" }, a) }, setStyle: function (a) { this.boxWrapper.css(this.getStyle(a)) }, isHidden: function () { return !this.boxWrapper.getBBox().width }, destroy: function () {
                var a = this.defs; this.box = null;
                this.boxWrapper = this.boxWrapper.destroy(); r(this.gradients || {}); this.gradients = null; a && (this.defs = a.destroy()); this.unSubPixelFix && this.unSubPixelFix(); return this.alignedObjects = null
            }, createElement: function (a) { var b = new this.Element; b.init(this, a); return b }, draw: H, getRadialAttr: function (a, b) { return { cx: a[0] - a[2] / 2 + b.cx * a[2], cy: a[1] - a[2] / 2 + b.cy * a[2], r: b.r * a[2] } }, truncate: function (a, b, l, e, d, f, h) {
                var p = this, A = a.rotation, I, H = e ? 1 : 0, z = (l || e).length, w = z, B = [], t = function (a) {
                b.firstChild && b.removeChild(b.firstChild);
                    a && b.appendChild(Q.createTextNode(a))
                }, O = function (f, A) { A = A || f; if ("undefined" === typeof B[A]) if (b.getSubStringLength) try { B[A] = d + b.getSubStringLength(0, e ? A + 1 : A) } catch (ka) { "" } else p.getSpanWidth && (t(h(l || e, f)), B[A] = d + p.getSpanWidth(a, b)); return B[A] }, n; a.rotation = 0; var c = O(b.textContent.length); if (n = d + c > f) { for (; H <= z;)w = Math.ceil((H + z) / 2), e && (I = h(e, w)), c = O(w, I && I.length - 1), H === z ? H = z + 1 : c > f ? z = w - 1 : H = w; 0 === z ? t("") : l && z === l.length - 1 || t(I || h(l || e, w)) } e && e.splice(0, w); a.actualWidth = c; a.rotation = A; return n
            }, escapes: {
                "&": "&amp;",
                "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
            }, buildText: function (a) {
                var l = a.element, d = this, f = d.forExport, p = e(a.textStr, "").toString(), A = -1 !== p.indexOf("<"), H = l.childNodes, z, w = D(l, "x"), B = a.styles, t = a.textWidth, n = B && B.lineHeight, c = B && B.textOutline, k = B && "ellipsis" === B.textOverflow, G = B && "nowrap" === B.whiteSpace, m = B && B.fontSize, L, r = H.length; B = t && !a.added && this.box; var R = function (a) {
                    var e; d.styledMode || (e = /(px|em)$/.test(a && a.style.fontSize) ? a.style.fontSize : m || d.style.fontSize || 12); return n ? b(n) : d.fontMetrics(e,
                        a.getAttribute("style") ? a : l).h
                }, K = function (a, b) { h(d.escapes, function (l, e) { b && -1 !== b.indexOf(l) || (a = a.toString().replace(new RegExp(l, "g"), e)) }); return a }, M = function (a, b) { var l = a.indexOf("<"); a = a.substring(l, a.indexOf(">") - l); l = a.indexOf(b + "="); if (-1 !== l && (l = l + b.length + 1, b = a.charAt(l), '"' === b || "'" === b)) return a = a.substring(l + 1), a.substring(0, a.indexOf(b)) }, g = /<br.*?>/g; var X = [p, k, G, n, c, m, t].join(); if (X !== a.textCache) {
                    for (a.textCache = X; r--;)l.removeChild(H[r]); A || c || k || t || -1 !== p.indexOf(" ") && (!G ||
                        g.test(p)) ? (B && B.appendChild(l), A ? (p = d.styledMode ? p.replace(/<(b|strong)>/g, '<span class="highcharts-strong">').replace(/<(i|em)>/g, '<span class="highcharts-emphasized">') : p.replace(/<(b|strong)>/g, '<span style="font-weight:bolder">').replace(/<(i|em)>/g, '<span style="font-style:italic">'), p = p.replace(/<a/g, "<span").replace(/<\/(b|strong|i|em|a)>/g, "</span>").split(g)) : p = [p], p = p.filter(function (a) { return "" !== a }), p.forEach(function (b, e) {
                            var h = 0, p = 0; b = b.replace(/^\s+|\s+$/g, "").replace(/<span/g, "|||<span").replace(/<\/span>/g,
                                "</span>|||"); var A = b.split("|||"); A.forEach(function (b) {
                                    if ("" !== b || 1 === A.length) {
                                        var H = {}, B = Q.createElementNS(d.SVG_NS, "tspan"), n, O; (n = M(b, "class")) && D(B, "class", n); if (n = M(b, "style")) n = n.replace(/(;| |^)color([ :])/, "$1fill$2"), D(B, "style", n); (O = M(b, "href")) && !f && (D(B, "onclick", 'location.href="' + O + '"'), D(B, "class", "highcharts-anchor"), d.styledMode || C(B, { cursor: "pointer" })); b = K(b.replace(/<[a-zA-Z\/](.|\n)*?>/g, "") || " "); if (" " !== b) {
                                            B.appendChild(Q.createTextNode(b)); h ? H.dx = 0 : e && null !== w && (H.x = w);
                                            D(B, H); l.appendChild(B); !h && L && (!I && f && C(B, { display: "block" }), D(B, "dy", R(B))); if (t) {
                                                var c = b.replace(/([^\^])-/g, "$1- ").split(" "); H = !G && (1 < A.length || e || 1 < c.length); O = 0; var r = R(B); if (k) z = d.truncate(a, B, b, void 0, 0, Math.max(0, t - parseInt(m || 12, 10)), function (a, b) { return a.substring(0, b) + "\u2026" }); else if (H) for (; c.length;)c.length && !G && 0 < O && (B = Q.createElementNS(W, "tspan"), D(B, { dy: r, x: w }), n && D(B, "style", n), B.appendChild(Q.createTextNode(c.join(" ").replace(/- /g, "-"))), l.appendChild(B)), d.truncate(a, B,
                                                    null, c, 0 === O ? p : 0, t, function (a, b) { return c.slice(0, b).join(" ").replace(/- /g, "-") }), p = a.actualWidth, O++
                                            } h++
                                        }
                                    }
                                }); L = L || l.childNodes.length
                        }), k && z && a.attr("title", K(a.textStr, ["&lt;", "&gt;"])), B && B.removeChild(l), c && a.applyTextOutline && a.applyTextOutline(c)) : l.appendChild(Q.createTextNode(K(p)))
                }
            }, getContrast: function (a) { a = q(a).rgba; a[0] *= 1; a[1] *= 1.2; a[2] *= .5; return 459 < a[0] + a[1] + a[2] ? "#000000" : "#FFFFFF" }, button: function (a, b, l, e, f, h, p, I, H, z) {
                var w = this.label(a, b, l, H, null, null, z, null, "button"), B = 0, t =
                    this.styledMode; w.attr(d({ padding: 8, r: 2 }, f)); if (!t) { f = d({ fill: "#f7f7f7", stroke: "#cccccc", "stroke-width": 1, style: { color: "#333333", cursor: "pointer", fontWeight: "normal" } }, f); var n = f.style; delete f.style; h = d(f, { fill: "#e6e6e6" }, h); var c = h.style; delete h.style; p = d(f, { fill: "#e6ebf5", style: { color: "#000000", fontWeight: "bold" } }, p); var O = p.style; delete p.style; I = d(f, { style: { color: "#cccccc" } }, I); var k = I.style; delete I.style } y(w.element, A ? "mouseover" : "mouseenter", function () { 3 !== B && w.setState(1) }); y(w.element,
                        A ? "mouseout" : "mouseleave", function () { 3 !== B && w.setState(B) }); w.setState = function (a) { 1 !== a && (w.state = B = a); w.removeClass(/highcharts-button-(normal|hover|pressed|disabled)/).addClass("highcharts-button-" + ["normal", "hover", "pressed", "disabled"][a || 0]); t || w.attr([f, h, p, I][a || 0]).css([n, c, O, k][a || 0]) }; t || w.attr(f).css(m({ cursor: "default" }, n)); return w.on("click", function (a) { 3 !== B && e.call(w, a) })
            }, crispLine: function (a, b) {
            a[1] === a[4] && (a[1] = a[4] = Math.round(a[1]) - b % 2 / 2); a[2] === a[5] && (a[2] = a[5] = Math.round(a[2]) +
                b % 2 / 2); return a
            }, path: function (a) { var b = this.styledMode ? {} : { fill: "none" }; n(a) ? b.d = a : f(a) && m(b, a); return this.createElement("path").attr(b) }, circle: function (a, b, l) { a = f(a) ? a : "undefined" === typeof a ? {} : { x: a, y: b, r: l }; b = this.createElement("circle"); b.xSetter = b.ySetter = function (a, b, l) { l.setAttribute("c" + b, a) }; return b.attr(a) }, arc: function (a, b, l, e, d, h) { f(a) ? (e = a, b = e.y, l = e.r, a = e.x) : e = { innerR: e, start: d, end: h }; a = this.symbol("arc", a, b, l, l, e); a.r = l; return a }, rect: function (a, b, l, e, d, h) {
                d = f(a) ? a.r : d; var p = this.createElement("rect");
                a = f(a) ? a : "undefined" === typeof a ? {} : { x: a, y: b, width: Math.max(l, 0), height: Math.max(e, 0) }; this.styledMode || ("undefined" !== typeof h && (a.strokeWidth = h, a = p.crisp(a)), a.fill = "none"); d && (a.r = d); p.rSetter = function (a, b, l) { p.r = a; D(l, { rx: a, ry: a }) }; p.rGetter = function () { return p.r }; return p.attr(a)
            }, setSize: function (a, b, l) {
                var d = this.alignedObjects, f = d.length; this.width = a; this.height = b; for (this.boxWrapper.animate({ width: a, height: b }, {
                    step: function () { this.attr({ viewBox: "0 0 " + this.attr("width") + " " + this.attr("height") }) },
                    duration: e(l, !0) ? void 0 : 0
                }); f--;)d[f].align()
            }, g: function (a) { var b = this.createElement("g"); return a ? b.attr({ "class": "highcharts-" + a }) : b }, image: function (a, b, l, e, d, f) {
                var h = { preserveAspectRatio: "none" }, p = function (a, b) { a.setAttributeNS ? a.setAttributeNS("http://www.w3.org/1999/xlink", "href", b) : a.setAttribute("hc-svg-href", b) }, A = function (b) { p(I.element, a); f.call(I, b) }; 1 < arguments.length && m(h, { x: b, y: l, width: e, height: d }); var I = this.createElement("image").attr(h); f ? (p(I.element, "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                    h = new X.Image, y(h, "load", A), h.src = a, h.complete && A({})) : p(I.element, a); return I
            }, symbol: function (a, b, l, d, f, h) {
                var p = this, A = /^url\((.*?)\)$/, I = A.test(a), H = !I && (this.symbols[a] ? a : "circle"), z = H && this.symbols[H], w = k(b) && z && z.call(this.symbols, Math.round(b), Math.round(l), d, f, h); if (z) { var t = this.path(w); p.styledMode || t.attr("fill", "none"); m(t, { symbolName: H, x: b, y: l, width: d, height: f }); h && m(t, h) } else if (I) {
                    var n = a.match(A)[1]; t = this.image(n); t.imgwidth = e(R[n] && R[n].width, h && h.width); t.imgheight = e(R[n] && R[n].height,
                        h && h.height); var c = function () { t.attr({ width: t.width, height: t.height }) };["width", "height"].forEach(function (a) { t[a + "Setter"] = function (a, b) { var l = {}, e = this["img" + b], d = "width" === b ? "translateX" : "translateY"; this[b] = a; k(e) && (h && "within" === h.backgroundSize && this.width && this.height && (e = Math.round(e * Math.min(this.width / this.imgwidth, this.height / this.imgheight))), this.element && this.element.setAttribute(b, e), this.alignByTranslate || (l[d] = ((this[b] || 0) - e) / 2, this.attr(l))) } }); k(b) && t.attr({ x: b, y: l }); t.isImg = !0;
                    k(t.imgwidth) && k(t.imgheight) ? c() : (t.attr({ width: 0, height: 0 }), F("img", { onload: function () { var a = G[p.chartIndex]; 0 === this.width && (C(this, { position: "absolute", top: "-999em" }), Q.body.appendChild(this)); R[n] = { width: this.width, height: this.height }; t.imgwidth = this.width; t.imgheight = this.height; t.element && c(); this.parentNode && this.parentNode.removeChild(this); p.imgCount--; if (!p.imgCount && a && !a.hasLoaded) a.onload() }, src: n }), this.imgCount++)
                } return t
            }, symbols: {
                circle: function (a, b, l, e) {
                    return this.arc(a + l / 2, b +
                        e / 2, l / 2, e / 2, { start: .5 * Math.PI, end: 2.5 * Math.PI, open: !1 })
                }, square: function (a, b, l, e) { return ["M", a, b, "L", a + l, b, a + l, b + e, a, b + e, "Z"] }, triangle: function (a, b, l, e) { return ["M", a + l / 2, b, "L", a + l, b + e, a, b + e, "Z"] }, "triangle-down": function (a, b, l, e) { return ["M", a, b, "L", a + l, b, a + l / 2, b + e, "Z"] }, diamond: function (a, b, l, e) { return ["M", a + l / 2, b, "L", a + l, b + e / 2, a + l / 2, b + e, a, b + e / 2, "Z"] }, arc: function (a, b, l, d, f) {
                    var h = f.start, p = f.r || l, A = f.r || d || l, I = f.end - .001; l = f.innerR; d = e(f.open, .001 > Math.abs(f.end - f.start - 2 * Math.PI)); var H = Math.cos(h),
                        z = Math.sin(h), w = Math.cos(I); I = Math.sin(I); h = e(f.longArc, .001 > f.end - h - Math.PI ? 0 : 1); p = ["M", a + p * H, b + A * z, "A", p, A, 0, h, e(f.clockwise, 1), a + p * w, b + A * I]; k(l) && p.push(d ? "M" : "L", a + l * w, b + l * I, "A", l, l, 0, h, k(f.clockwise) ? 1 - f.clockwise : 0, a + l * H, b + l * z); p.push(d ? "" : "Z"); return p
                }, callout: function (a, b, l, e, d) {
                    var f = Math.min(d && d.r || 0, l, e), h = f + 6, p = d && d.anchorX; d = d && d.anchorY; var A = ["M", a + f, b, "L", a + l - f, b, "C", a + l, b, a + l, b, a + l, b + f, "L", a + l, b + e - f, "C", a + l, b + e, a + l, b + e, a + l - f, b + e, "L", a + f, b + e, "C", a, b + e, a, b + e, a, b + e - f, "L", a, b + f, "C",
                        a, b, a, b, a + f, b]; p && p > l ? d > b + h && d < b + e - h ? A.splice(13, 3, "L", a + l, d - 6, a + l + 6, d, a + l, d + 6, a + l, b + e - f) : A.splice(13, 3, "L", a + l, e / 2, p, d, a + l, e / 2, a + l, b + e - f) : p && 0 > p ? d > b + h && d < b + e - h ? A.splice(33, 3, "L", a, d + 6, a - 6, d, a, d - 6, a, b + f) : A.splice(33, 3, "L", a, e / 2, p, d, a, e / 2, a, b + f) : d && d > e && p > a + h && p < a + l - h ? A.splice(23, 3, "L", p + 6, b + e, p, b + e + 6, p - 6, b + e, a + f, b + e) : d && 0 > d && p > a + h && p < a + l - h && A.splice(3, 3, "L", p - 6, b, p, b - 6, p + 6, b, l - f, b); return A
                }
            }, clipRect: function (a, b, l, e) {
                var d = w() + "-", f = this.createElement("clipPath").attr({ id: d }).add(this.defs); a = this.rect(a,
                    b, l, e, 0).add(f); a.id = d; a.clipPath = f; a.count = 0; return a
            }, text: function (a, b, l, e) { var d = {}; if (e && (this.allowHTML || !this.forExport)) return this.html(a, b, l); d.x = Math.round(b || 0); l && (d.y = Math.round(l)); k(a) && (d.text = a); a = this.createElement("text").attr(d); e || (a.xSetter = function (a, b, l) { var e = l.getElementsByTagName("tspan"), d = l.getAttribute(b), f; for (f = 0; f < e.length; f++) { var h = e[f]; h.getAttribute(b) === d && h.setAttribute(b, a) } l.setAttribute(b, a) }); return a }, fontMetrics: function (a, l) {
                a = !this.styledMode && /px/.test(a) ||
                    !X.getComputedStyle ? a || l && l.style && l.style.fontSize || this.style && this.style.fontSize : l && V.prototype.getStyle.call(l, "font-size"); a = /px/.test(a) ? b(a) : 12; l = 24 > a ? a + 3 : Math.round(1.2 * a); return { h: l, b: Math.round(.8 * l), f: a }
            }, rotCorr: function (a, b, l) { var e = a; b && l && (e = Math.max(e * Math.cos(b * K), 4)); return { x: -a / 3 * Math.sin(b * K), y: e } }, label: function (a, b, l, e, f, h, A, I, H) {
                var z = this, w = z.styledMode, t = z.g("button" !== H && "label"), n = t.text = z.text("", 0, 0, A).attr({ zIndex: 1 }), c, G, L = 0, O = 3, r = 0, R, W, B, K, g, X = {}, T, J, x = /^url\((.*?)\)$/.test(e),
                Q = w || x, S = function () { return w ? c.strokeWidth() % 2 / 2 : (T ? parseInt(T, 10) : 0) % 2 / 2 }; H && t.addClass("highcharts-" + H); var q = function () {
                    var a = n.element.style, b = {}; G = ("undefined" === typeof R || "undefined" === typeof W || g) && k(n.textStr) && n.getBBox(); t.width = (R || G.width || 0) + 2 * O + r; t.height = (W || G.height || 0) + 2 * O; J = O + Math.min(z.fontMetrics(a && a.fontSize, n).b, G ? G.height : Infinity); Q && (c || (t.box = c = z.symbols[e] || x ? z.symbol(e) : z.rect(), c.addClass(("button" === H ? "" : "highcharts-label-box") + (H ? " highcharts-" + H + "-box" : "")), c.add(t),
                        a = S(), b.x = a, b.y = (I ? -J : 0) + a), b.width = Math.round(t.width), b.height = Math.round(t.height), c.attr(m(b, X)), X = {})
                }; var v = function () { var a = r + O; var b = I ? 0 : J; k(R) && G && ("center" === g || "right" === g) && (a += { center: .5, right: 1 }[g] * (R - G.width)); if (a !== n.x || b !== n.y) n.attr("x", a), n.hasBoxWidthChanged && (G = n.getBBox(!0), q()), "undefined" !== typeof b && n.attr("y", b); n.x = a; n.y = b }; var U = function (a, b) { c ? c.attr(a, b) : X[a] = b }; t.onAdd = function () { n.add(t); t.attr({ text: a || 0 === a ? a : "", x: b, y: l }); c && k(f) && t.attr({ anchorX: f, anchorY: h }) };
                t.widthSetter = function (a) { R = M(a) ? a : null }; t.heightSetter = function (a) { W = a }; t["text-alignSetter"] = function (a) { g = a }; t.paddingSetter = function (a) { k(a) && a !== O && (O = t.padding = a, v()) }; t.paddingLeftSetter = function (a) { k(a) && a !== r && (r = a, v()) }; t.alignSetter = function (a) { a = { left: 0, center: .5, right: 1 }[a]; a !== L && (L = a, G && t.attr({ x: B })) }; t.textSetter = function (a) { "undefined" !== typeof a && n.attr({ text: a }); q(); v() }; t["stroke-widthSetter"] = function (a, b) { a && (Q = !0); T = this["stroke-width"] = a; U(b, a) }; w ? t.rSetter = function (a, b) {
                    U(b,
                        a)
                } : t.strokeSetter = t.fillSetter = t.rSetter = function (a, b) { "r" !== b && ("fill" === b && a && (Q = !0), t[b] = a); U(b, a) }; t.anchorXSetter = function (a, b) { f = t.anchorX = a; U(b, Math.round(a) - S() - B) }; t.anchorYSetter = function (a, b) { h = t.anchorY = a; U(b, a - K) }; t.xSetter = function (a) { t.x = a; L && (a -= L * ((R || G.width) + 2 * O), t["forceAnimate:x"] = !0); B = Math.round(a); t.attr("translateX", B) }; t.ySetter = function (a) { K = t.y = Math.round(a); t.attr("translateY", K) }; var C = t.css; A = {
                    css: function (a) {
                        if (a) {
                            var b = {}; a = d(a); t.textProps.forEach(function (l) {
                            "undefined" !==
                                typeof a[l] && (b[l] = a[l], delete a[l])
                            }); n.css(b); "width" in b && q(); "fontSize" in b && (q(), v())
                        } return C.call(t, a)
                    }, getBBox: function () { return { width: G.width + 2 * O, height: G.height + 2 * O, x: G.x - O, y: G.y - O } }, destroy: function () { p(t.element, "mouseenter"); p(t.element, "mouseleave"); n && (n = n.destroy()); c && (c = c.destroy()); V.prototype.destroy.call(t); t = z = q = v = U = null }
                }; w || (A.shadow = function (a) { a && (q(), c && c.shadow(a)); return t }); return m(t, A)
            }
        }); c.Renderer = g
    }); P(u, "parts/Html.js", [u["parts/Globals.js"], u["parts/Utilities.js"]],
        function (c, g) {
            var E = g.attr, q = g.createElement, y = g.css, v = g.defined, N = g.extend, D = g.pick, F = g.pInt, C = c.isFirefox, k = c.isMS, r = c.isWebKit, x = c.SVGElement; g = c.SVGRenderer; var m = c.win; N(x.prototype, {
                htmlCss: function (c) { var n = "SPAN" === this.element.tagName && c && "width" in c, k = D(n && c.width, void 0); if (n) { delete c.width; this.textWidth = k; var f = !0 } c && "ellipsis" === c.textOverflow && (c.whiteSpace = "nowrap", c.overflow = "hidden"); this.styles = N(this.styles, c); y(this.element, c); f && this.htmlUpdateTransform(); return this }, htmlGetBBox: function () {
                    var c =
                        this.element; return { x: c.offsetLeft, y: c.offsetTop, width: c.offsetWidth, height: c.offsetHeight }
                }, htmlUpdateTransform: function () {
                    if (this.added) {
                        var c = this.renderer, n = this.element, k = this.translateX || 0, f = this.translateY || 0, a = this.x || 0, d = this.y || 0, h = this.textAlign || "left", e = { left: 0, center: .5, right: 1 }[h], b = this.styles, p = b && b.whiteSpace; y(n, { marginLeft: k, marginTop: f }); !c.styledMode && this.shadows && this.shadows.forEach(function (a) { y(a, { marginLeft: k + 1, marginTop: f + 1 }) }); this.inverted && [].forEach.call(n.childNodes,
                            function (a) { c.invertChild(a, n) }); if ("SPAN" === n.tagName) {
                                b = this.rotation; var z = this.textWidth && F(this.textWidth), t = [b, h, n.innerHTML, this.textWidth, this.textAlign].join(), w; (w = z !== this.oldTextWidth) && !(w = z > this.oldTextWidth) && ((w = this.textPxLength) || (y(n, { width: "", whiteSpace: p || "nowrap" }), w = n.offsetWidth), w = w > z); w && (/[ \-]/.test(n.textContent || n.innerText) || "ellipsis" === n.style.textOverflow) ? (y(n, { width: z + "px", display: "block", whiteSpace: p || "normal" }), this.oldTextWidth = z, this.hasBoxWidthChanged = !0) :
                                    this.hasBoxWidthChanged = !1; t !== this.cTT && (p = c.fontMetrics(n.style.fontSize, n).b, !v(b) || b === (this.oldRotation || 0) && h === this.oldAlign || this.setSpanRotation(b, e, p), this.getSpanCorrection(!v(b) && this.textPxLength || n.offsetWidth, p, e, b, h)); y(n, { left: a + (this.xCorr || 0) + "px", top: d + (this.yCorr || 0) + "px" }); this.cTT = t; this.oldRotation = b; this.oldAlign = h
                            }
                    } else this.alignOnAdd = !0
                }, setSpanRotation: function (c, n, k) {
                    var f = {}, a = this.renderer.getTransformKey(); f[a] = f.transform = "rotate(" + c + "deg)"; f[a + (C ? "Origin" : "-origin")] =
                        f.transformOrigin = 100 * n + "% " + k + "px"; y(this.element, f)
                }, getSpanCorrection: function (c, n, k) { this.xCorr = -c * k; this.yCorr = -n }
            }); N(g.prototype, {
                getTransformKey: function () { return k && !/Edge/.test(m.navigator.userAgent) ? "-ms-transform" : r ? "-webkit-transform" : C ? "MozTransform" : m.opera ? "-o-transform" : "" }, html: function (c, n, k) {
                    var f = this.createElement("span"), a = f.element, d = f.renderer, h = d.isSVG, e = function (a, e) {
                        ["opacity", "visibility"].forEach(function (b) {
                        a[b + "Setter"] = function (d, f, h) {
                            var p = a.div ? a.div.style : e; x.prototype[b +
                                "Setter"].call(this, d, f, h); p && (p[f] = d)
                        }
                        }); a.addedSetters = !0
                    }; f.textSetter = function (b) { b !== a.innerHTML && (delete this.bBox, delete this.oldTextWidth); this.textStr = b; a.innerHTML = D(b, ""); f.doTransform = !0 }; h && e(f, f.element.style); f.xSetter = f.ySetter = f.alignSetter = f.rotationSetter = function (a, e) { "align" === e && (e = "textAlign"); f[e] = a; f.doTransform = !0 }; f.afterSetters = function () { this.doTransform && (this.htmlUpdateTransform(), this.doTransform = !1) }; f.attr({ text: c, x: Math.round(n), y: Math.round(k) }).css({ position: "absolute" });
                    d.styledMode || f.css({ fontFamily: this.style.fontFamily, fontSize: this.style.fontSize }); a.style.whiteSpace = "nowrap"; f.css = f.htmlCss; h && (f.add = function (b) {
                        var h = d.box.parentNode, z = []; if (this.parentGroup = b) {
                            var t = b.div; if (!t) {
                                for (; b;)z.push(b), b = b.parentGroup; z.reverse().forEach(function (a) {
                                    function b(b, e) { a[e] = b; "translateX" === e ? p.left = b + "px" : p.top = b + "px"; a.doTransform = !0 } var d = E(a.element, "class"); t = a.div = a.div || q("div", d ? { className: d } : void 0, {
                                        position: "absolute", left: (a.translateX || 0) + "px", top: (a.translateY ||
                                            0) + "px", display: a.display, opacity: a.opacity, pointerEvents: a.styles && a.styles.pointerEvents
                                    }, t || h); var p = t.style; N(a, { classSetter: function (a) { return function (b) { this.element.setAttribute("class", b); a.className = b } }(t), on: function () { z[0].div && f.on.apply({ element: z[0].div }, arguments); return a }, translateXSetter: b, translateYSetter: b }); a.addedSetters || e(a)
                                })
                            }
                        } else t = h; t.appendChild(a); f.added = !0; f.alignOnAdd && f.htmlUpdateTransform(); return f
                    }); return f
                }
            })
        }); P(u, "parts/Tick.js", [u["parts/Globals.js"], u["parts/Utilities.js"]],
            function (c, g) {
                var E = g.clamp, q = g.correctFloat, y = g.defined, v = g.destroyObjectProperties, N = g.extend, D = g.isNumber, F = g.merge, C = g.objectEach, k = g.pick, r = c.fireEvent, x = c.deg2rad; g = function () {
                    function m(c, n, k, f, a) { this.isNewLabel = this.isNew = !0; this.axis = c; this.pos = n; this.type = k || ""; this.parameters = a || {}; this.tickmarkOffset = this.parameters.tickmarkOffset; this.options = this.parameters.options; k || f || this.addLabel() } m.prototype.addLabel = function () {
                        var c = this, n = c.axis, m = n.options, f = n.chart, a = n.categories, d = n.names,
                        h = c.pos, e = k(c.options && c.options.labels, m.labels), b = n.tickPositions, p = h === b[0], z = h === b[b.length - 1]; d = this.parameters.category || (a ? k(a[h], d[h], h) : h); var t = c.label; a = (!e.step || 1 === e.step) && 1 === n.tickInterval; b = b.info; var w, G; if (n.isDatetimeAxis && b) { var r = f.time.resolveDTLFormat(m.dateTimeLabelFormats[!m.grid && b.higherRanks[h] || b.unitName]); var g = r.main } c.isFirst = p; c.isLast = z; c.formatCtx = { axis: n, chart: f, isFirst: p, isLast: z, dateTimeLabelFormat: g, tickPositionInfo: b, value: n.isLog ? q(n.lin2log(d)) : d, pos: h };
                        m = n.labelFormatter.call(c.formatCtx, this.formatCtx); if (G = r && r.list) c.shortenLabel = function () { for (w = 0; w < G.length; w++)if (t.attr({ text: n.labelFormatter.call(N(c.formatCtx, { dateTimeLabelFormat: G[w] })) }), t.getBBox().width < n.getSlotWidth(c) - 2 * k(e.padding, 5)) return; t.attr({ text: "" }) }; a && n._addedPlotLB && n.isXAxis && c.moveLabel(m, e); y(t) || c.movedLabel ? t && t.textStr !== m && !a && (!t.textWidth || e.style && e.style.width || t.styles.width || t.css({ width: null }), t.attr({ text: m }), t.textPxLength = t.getBBox().width) : (c.label =
                            t = c.createLabel({ x: 0, y: 0 }, m, e), c.rotation = 0)
                    }; m.prototype.createLabel = function (c, n, k) { var f = this.axis, a = f.chart; if (c = y(n) && k.enabled ? a.renderer.text(n, c.x, c.y, k.useHTML).add(f.labelGroup) : null) a.styledMode || c.css(F(k.style)), c.textPxLength = c.getBBox().width; return c }; m.prototype.destroy = function () { v(this, this.axis) }; m.prototype.getPosition = function (c, n, k, f) {
                        var a = this.axis, d = a.chart, h = f && d.oldChartHeight || d.chartHeight; c = {
                            x: c ? q(a.translate(n + k, null, null, f) + a.transB) : a.left + a.offset + (a.opposite ? (f &&
                                d.oldChartWidth || d.chartWidth) - a.right - a.left : 0), y: c ? h - a.bottom + a.offset - (a.opposite ? a.height : 0) : q(h - a.translate(n + k, null, null, f) - a.transB)
                        }; c.y = E(c.y, -1E5, 1E5); r(this, "afterGetPosition", { pos: c }); return c
                    }; m.prototype.getLabelPosition = function (c, n, k, f, a, d, h, e) {
                        var b = this.axis, p = b.transA, z = b.isLinked && b.linkedParent ? b.linkedParent.reversed : b.reversed, t = b.staggerLines, w = b.tickRotCorr || { x: 0, y: 0 }, G = a.y, m = f || b.reserveSpaceDefault ? 0 : -b.labelOffset * ("center" === b.labelAlign ? .5 : 1), L = {}; y(G) || (G = 0 === b.side ?
                            k.rotation ? -8 : -k.getBBox().height : 2 === b.side ? w.y + 8 : Math.cos(k.rotation * x) * (w.y - k.getBBox(!1, 0).height / 2)); c = c + a.x + m + w.x - (d && f ? d * p * (z ? -1 : 1) : 0); n = n + G - (d && !f ? d * p * (z ? 1 : -1) : 0); t && (k = h / (e || 1) % t, b.opposite && (k = t - k - 1), n += b.labelOffset / t * k); L.x = c; L.y = Math.round(n); r(this, "afterGetLabelPosition", { pos: L, tickmarkOffset: d, index: h }); return L
                    }; m.prototype.getLabelSize = function () { return this.label ? this.label.getBBox()[this.axis.horiz ? "height" : "width"] : 0 }; m.prototype.getMarkPath = function (c, n, k, f, a, d) {
                        return d.crispLine(["M",
                            c, n, "L", c + (a ? 0 : -k), n + (a ? k : 0)], f)
                    }; m.prototype.handleOverflow = function (c) {
                        var n = this.axis, m = n.options.labels, f = c.x, a = n.chart.chartWidth, d = n.chart.spacing, h = k(n.labelLeft, Math.min(n.pos, d[3])); d = k(n.labelRight, Math.max(n.isRadial ? 0 : n.pos + n.len, a - d[1])); var e = this.label, b = this.rotation, p = { left: 0, center: .5, right: 1 }[n.labelAlign || e.attr("align")], z = e.getBBox().width, t = n.getSlotWidth(this), w = t, G = 1, r, g = {}; if (b || "justify" !== k(m.overflow, "justify")) 0 > b && f - p * z < h ? r = Math.round(f / Math.cos(b * x) - h) : 0 < b && f + p * z > d &&
                            (r = Math.round((a - f) / Math.cos(b * x))); else if (a = f + (1 - p) * z, f - p * z < h ? w = c.x + w * (1 - p) - h : a > d && (w = d - c.x + w * p, G = -1), w = Math.min(t, w), w < t && "center" === n.labelAlign && (c.x += G * (t - w - p * (t - Math.min(z, w)))), z > w || n.autoRotation && (e.styles || {}).width) r = w; r && (this.shortenLabel ? this.shortenLabel() : (g.width = Math.floor(r), (m.style || {}).textOverflow || (g.textOverflow = "ellipsis"), e.css(g)))
                    }; m.prototype.moveLabel = function (c, n) {
                        var k = this, f = k.label, a = !1, d = k.axis, h = d.reversed, e = d.chart.inverted; f && f.textStr === c ? (k.movedLabel = f, a =
                            !0, delete k.label) : C(d.ticks, function (b) { a || b.isNew || b === k || !b.label || b.label.textStr !== c || (k.movedLabel = b.label, a = !0, b.labelPos = k.movedLabel.xy, delete b.label) }); if (!a && (k.labelPos || f)) { var b = k.labelPos || f.xy; f = e ? b.x : h ? 0 : d.width + d.left; d = e ? h ? d.width + d.left : 0 : b.y; k.movedLabel = k.createLabel({ x: f, y: d }, c, n); k.movedLabel && k.movedLabel.attr({ opacity: 0 }) }
                    }; m.prototype.render = function (m, n, r) {
                        var f = this.axis, a = f.horiz, d = this.pos, h = k(this.tickmarkOffset, f.tickmarkOffset); d = this.getPosition(a, d, h, n); h = d.x;
                        var e = d.y; f = a && h === f.pos + f.len || !a && e === f.pos ? -1 : 1; r = k(r, 1); this.isActive = !0; this.renderGridLine(n, r, f); this.renderMark(d, r, f); this.renderLabel(d, n, r, m); this.isNew = !1; c.fireEvent(this, "afterRender")
                    }; m.prototype.renderGridLine = function (c, n, m) {
                        var f = this.axis, a = f.options, d = this.gridLine, h = {}, e = this.pos, b = this.type, p = k(this.tickmarkOffset, f.tickmarkOffset), z = f.chart.renderer, t = b ? b + "Grid" : "grid", w = a[t + "LineWidth"], G = a[t + "LineColor"]; a = a[t + "LineDashStyle"]; d || (f.chart.styledMode || (h.stroke = G, h["stroke-width"] =
                            w, a && (h.dashstyle = a)), b || (h.zIndex = 1), c && (n = 0), this.gridLine = d = z.path().attr(h).addClass("highcharts-" + (b ? b + "-" : "") + "grid-line").add(f.gridGroup)); if (d && (m = f.getPlotLinePath({ value: e + p, lineWidth: d.strokeWidth() * m, force: "pass", old: c }))) d[c || this.isNew ? "attr" : "animate"]({ d: m, opacity: n })
                    }; m.prototype.renderMark = function (c, n, m) {
                        var f = this.axis, a = f.options, d = f.chart.renderer, h = this.type, e = h ? h + "Tick" : "tick", b = f.tickSize(e), p = this.mark, z = !p, t = c.x; c = c.y; var w = k(a[e + "Width"], !h && f.isXAxis ? 1 : 0); a = a[e + "Color"];
                        b && (f.opposite && (b[0] = -b[0]), z && (this.mark = p = d.path().addClass("highcharts-" + (h ? h + "-" : "") + "tick").add(f.axisGroup), f.chart.styledMode || p.attr({ stroke: a, "stroke-width": w })), p[z ? "attr" : "animate"]({ d: this.getMarkPath(t, c, b[0], p.strokeWidth() * m, f.horiz, d), opacity: n }))
                    }; m.prototype.renderLabel = function (c, n, m, f) {
                        var a = this.axis, d = a.horiz, h = a.options, e = this.label, b = h.labels, p = b.step; a = k(this.tickmarkOffset, a.tickmarkOffset); var z = !0, t = c.x; c = c.y; e && D(t) && (e.xy = c = this.getLabelPosition(t, c, e, d, b, a, f, p), this.isFirst &&
                            !this.isLast && !k(h.showFirstLabel, 1) || this.isLast && !this.isFirst && !k(h.showLastLabel, 1) ? z = !1 : !d || b.step || b.rotation || n || 0 === m || this.handleOverflow(c), p && f % p && (z = !1), z && D(c.y) ? (c.opacity = m, e[this.isNewLabel ? "attr" : "animate"](c), this.isNewLabel = !1) : (e.attr("y", -9999), this.isNewLabel = !0))
                    }; m.prototype.replaceMovedLabel = function () {
                        var c = this.label, n = this.axis, k = n.reversed, f = this.axis.chart.inverted; if (c && !this.isNew) {
                            var a = f ? c.xy.x : k ? n.left : n.width + n.left; k = f ? k ? n.width + n.top : n.top : c.xy.y; c.animate({
                                x: a,
                                y: k, opacity: 0
                            }, void 0, c.destroy); delete this.label
                        } n.isDirty = !0; this.label = this.movedLabel; delete this.movedLabel
                    }; return m
                }(); c.Tick = g; return c.Tick
            }); P(u, "parts/Time.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                var E = g.defined, q = g.error, y = g.extend, v = g.isObject, N = g.merge, D = g.objectEach, F = g.pad, C = g.pick, k = g.splat, r = g.timeUnits, x = c.win; g = function () {
                    function m(c) {
                    this.options = {}; this.variableTimezone = this.useUTC = !1; this.Date = x.Date; this.getTimezoneOffset = this.timezoneOffsetFunction();
                        this.update(c)
                    } m.prototype.get = function (c, n) { if (this.variableTimezone || this.timezoneOffset) { var k = n.getTime(), f = k - this.getTimezoneOffset(n); n.setTime(f); c = n["getUTC" + c](); n.setTime(k); return c } return this.useUTC ? n["getUTC" + c]() : n["get" + c]() }; m.prototype.set = function (c, n, k) {
                        if (this.variableTimezone || this.timezoneOffset) {
                            if ("Milliseconds" === c || "Seconds" === c || "Minutes" === c) return n["setUTC" + c](k); var f = this.getTimezoneOffset(n); f = n.getTime() - f; n.setTime(f); n["setUTC" + c](k); c = this.getTimezoneOffset(n);
                            f = n.getTime() + c; return n.setTime(f)
                        } return this.useUTC ? n["setUTC" + c](k) : n["set" + c](k)
                    }; m.prototype.update = function (c) { var n = C(c && c.useUTC, !0); this.options = c = N(!0, this.options || {}, c); this.Date = c.Date || x.Date || Date; this.timezoneOffset = (this.useUTC = n) && c.timezoneOffset; this.getTimezoneOffset = this.timezoneOffsetFunction(); this.variableTimezone = !(n && !c.getTimezoneOffset && !c.timezone) }; m.prototype.makeTime = function (k, n, m, f, a, d) {
                        if (this.useUTC) {
                            var h = this.Date.UTC.apply(0, arguments); var e = this.getTimezoneOffset(h);
                            h += e; var b = this.getTimezoneOffset(h); e !== b ? h += b - e : e - 36E5 !== this.getTimezoneOffset(h - 36E5) || c.isSafari || (h -= 36E5)
                        } else h = (new this.Date(k, n, C(m, 1), C(f, 0), C(a, 0), C(d, 0))).getTime(); return h
                    }; m.prototype.timezoneOffsetFunction = function () {
                        var c = this, n = this.options, k = x.moment; if (!this.useUTC) return function (f) { return 6E4 * (new Date(f.toString())).getTimezoneOffset() }; if (n.timezone) { if (k) return function (f) { return 6E4 * -k.tz(f, n.timezone).utcOffset() }; q(25) } return this.useUTC && n.getTimezoneOffset ? function (f) {
                            return 6E4 *
                                n.getTimezoneOffset(f.valueOf())
                        } : function () { return 6E4 * (c.timezoneOffset || 0) }
                    }; m.prototype.dateFormat = function (k, n, m) {
                        var f; if (!E(n) || isNaN(n)) return (null === (f = c.defaultOptions.lang) || void 0 === f ? void 0 : f.invalidDate) || ""; k = C(k, "%Y-%m-%d %H:%M:%S"); var a = this; f = new this.Date(n); var d = this.get("Hours", f), h = this.get("Day", f), e = this.get("Date", f), b = this.get("Month", f), p = this.get("FullYear", f), z = c.defaultOptions.lang, t = null === z || void 0 === z ? void 0 : z.weekdays, w = null === z || void 0 === z ? void 0 : z.shortWeekdays;
                        f = y({ a: w ? w[h] : t[h].substr(0, 3), A: t[h], d: F(e), e: F(e, 2, " "), w: h, b: z.shortMonths[b], B: z.months[b], m: F(b + 1), o: b + 1, y: p.toString().substr(2, 2), Y: p, H: F(d), k: d, I: F(d % 12 || 12), l: d % 12 || 12, M: F(this.get("Minutes", f)), p: 12 > d ? "AM" : "PM", P: 12 > d ? "am" : "pm", S: F(f.getSeconds()), L: F(Math.floor(n % 1E3), 3) }, c.dateFormats); D(f, function (b, e) { for (; -1 !== k.indexOf("%" + e);)k = k.replace("%" + e, "function" === typeof b ? b.call(a, n) : b) }); return m ? k.substr(0, 1).toUpperCase() + k.substr(1) : k
                    }; m.prototype.resolveDTLFormat = function (c) {
                        return v(c,
                            !0) ? c : (c = k(c), { main: c[0], from: c[1], to: c[2] })
                    }; m.prototype.getTimeTicks = function (c, n, k, f) {
                        var a = this, d = [], h = {}; var e = new a.Date(n); var b = c.unitRange, p = c.count || 1, z; f = C(f, 1); if (E(n)) {
                            a.set("Milliseconds", e, b >= r.second ? 0 : p * Math.floor(a.get("Milliseconds", e) / p)); b >= r.second && a.set("Seconds", e, b >= r.minute ? 0 : p * Math.floor(a.get("Seconds", e) / p)); b >= r.minute && a.set("Minutes", e, b >= r.hour ? 0 : p * Math.floor(a.get("Minutes", e) / p)); b >= r.hour && a.set("Hours", e, b >= r.day ? 0 : p * Math.floor(a.get("Hours", e) / p)); b >= r.day &&
                                a.set("Date", e, b >= r.month ? 1 : Math.max(1, p * Math.floor(a.get("Date", e) / p))); if (b >= r.month) { a.set("Month", e, b >= r.year ? 0 : p * Math.floor(a.get("Month", e) / p)); var t = a.get("FullYear", e) } b >= r.year && a.set("FullYear", e, t - t % p); b === r.week && (t = a.get("Day", e), a.set("Date", e, a.get("Date", e) - t + f + (t < f ? -7 : 0))); t = a.get("FullYear", e); f = a.get("Month", e); var w = a.get("Date", e), m = a.get("Hours", e); n = e.getTime(); a.variableTimezone && (z = k - n > 4 * r.month || a.getTimezoneOffset(n) !== a.getTimezoneOffset(k)); n = e.getTime(); for (e = 1; n < k;)d.push(n),
                                    n = b === r.year ? a.makeTime(t + e * p, 0) : b === r.month ? a.makeTime(t, f + e * p) : !z || b !== r.day && b !== r.week ? z && b === r.hour && 1 < p ? a.makeTime(t, f, w, m + e * p) : n + b * p : a.makeTime(t, f, w + e * p * (b === r.day ? 1 : 7)), e++; d.push(n); b <= r.hour && 1E4 > d.length && d.forEach(function (b) { 0 === b % 18E5 && "000000000" === a.dateFormat("%H%M%S%L", b) && (h[b] = "day") })
                        } d.info = y(c, { higherRanks: h, totalRange: b * p }); return d
                    }; m.defaultOptions = { Date: void 0, getTimezoneOffset: void 0, timezone: void 0, timezoneOffset: 0, useUTC: !0 }; return m
                }(); c.Time = g; return c.Time
            }); P(u,
                "parts/Options.js", [u["parts/Globals.js"], u["parts/Time.js"], u["parts/Color.js"], u["parts/Utilities.js"]], function (c, g, E, q) {
                    E = E.parse; var y = q.merge; c.defaultOptions = {
                        colors: "#7cb5ec #434348 #90ed7d #f7a35c #8085e9 #f15c80 #e4d354 #2b908f #f45b5b #91e8e1".split(" "), symbols: ["circle", "diamond", "square", "triangle", "triangle-down"], lang: {
                            loading: "Loading...", months: "January February March April May June July August September October November December".split(" "), shortMonths: "Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec".split(" "),
                            weekdays: "Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "), decimalPoint: ".", numericSymbols: "kMGTPE".split(""), resetZoom: "Reset zoom", resetZoomTitle: "Reset zoom level 1:1", thousandsSep: " "
                        }, global: {}, time: g.defaultOptions, chart: {
                            styledMode: !1, borderRadius: 0, colorCount: 10, defaultSeriesType: "line", ignoreHiddenSeries: !0, spacing: [10, 10, 15, 10], resetZoomButton: { theme: { zIndex: 6 }, position: { align: "right", x: -10, y: 10 } }, width: null, height: null, borderColor: "#335cad", backgroundColor: "#39495e",
                            plotBorderColor: "#cccccc"
                        }, title: { text: "Chart title", align: "center", margin: 15, widthAdjust: -44 }, subtitle: { text: "", align: "center", widthAdjust: -44 }, caption: { margin: 15, text: "", align: "left", verticalAlign: "bottom" }, plotOptions: {}, labels: { style: { position: "absolute", color: "white" } }, legend: {
                            enabled: !0, align: "center", alignColumns: !0, layout: "horizontal", labelFormatter: function () { return this.name }, borderColor: "#999999", borderRadius: 0, navigation: { activeColor: "#003399", inactiveColor: "#cccccc" }, itemStyle: {
                                color: "#333333",
                                cursor: "pointer", fontSize: "12px", fontWeight: "bolder", textOverflow: "ellipsis"
                            }, itemHoverStyle: { color: "#000000" }, itemHiddenStyle: { color: "#cccccc" }, shadow: !1, itemCheckboxStyle: { position: "absolute", width: "13px", height: "13px" }, squareSymbol: !0, symbolPadding: 5, verticalAlign: "bottom", x: 0, y: 0, title: { style: { fontWeight: "bolder" } }
                        }, loading: { labelStyle: { fontWeight: "bolder", position: "relative", top: "45%" }, style: { position: "absolute", backgroundColor: "#ffffff", opacity: .5, textAlign: "center" } }, tooltip: {
                            enabled: !0, animation: c.svg,
                            borderRadius: 3, dateTimeLabelFormats: { millisecond: "%A, %b %e, %H:%M:%S.%L", second: "%A, %b %e, %H:%M:%S", minute: "%A, %b %e, %H:%M", hour: "%A, %b %e, %H:%M", day: "%A, %b %e, %Y", week: "Week from %A, %b %e, %Y", month: "%B %Y", year: "%Y" }, footerFormat: "", padding: 8, snap: c.isTouchDevice ? 25 : 10, headerFormat: '<span style="font-size: 10px">{point.key}</span><br/>', pointFormat: '<span style="color:{point.color}">\u25cf</span> {series.name}: <b>{point.y}</b><br/>', backgroundColor: E("#f7f7f7").setOpacity(.85).get(),
                            borderWidth: 1, shadow: !0, style: { color: "#333333", cursor: "default", fontSize: "12px", whiteSpace: "nowrap" }
                        }, credits: { enabled: !0, href: "https://www.highcharts.com?credits", position: { align: "right", x: -10, verticalAlign: "bottom", y: -5 }, style: { cursor: "pointer", color: "#999999", fontSize: "9px" }, text: "Highcharts.com" }
                    }; c.setOptions = function (g) { c.defaultOptions = y(!0, c.defaultOptions, g); (g.time || g.global) && c.time.update(y(c.defaultOptions.global, c.defaultOptions.time, g.global, g.time)); return c.defaultOptions }; c.getOptions =
                        function () { return c.defaultOptions }; c.defaultPlotOptions = c.defaultOptions.plotOptions; c.time = new g(y(c.defaultOptions.global, c.defaultOptions.time)); c.dateFormat = function (g, q, y) { return c.time.dateFormat(g, q, y) }; ""
                }); P(u, "parts/Axis.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Tick.js"], u["parts/Utilities.js"]], function (c, g, E, q) {
                    var y = g.parse, v = q.addEvent, N = q.animObject, D = q.arrayMax, F = q.arrayMin, C = q.clamp, k = q.correctFloat, r = q.defined, x = q.destroyObjectProperties, m = q.error, L = q.extend, n = q.fireEvent,
                    M = q.format, f = q.getMagnitude, a = q.isArray, d = q.isFunction, h = q.isNumber, e = q.isString, b = q.merge, p = q.normalizeTickInterval, z = q.objectEach, t = q.pick, w = q.relativeLength, G = q.removeEvent, K = q.splat, Q = q.syncTimeout, J = c.defaultOptions, S = c.deg2rad; g = function () { this.init.apply(this, arguments) }; L(g.prototype, {
                        defaultOptions: {
                            dateTimeLabelFormats: {
                                millisecond: { main: "%H:%M:%S.%L", range: !1 }, second: { main: "%H:%M:%S", range: !1 }, minute: { main: "%H:%M", range: !1 }, hour: { main: "%H:%M", range: !1 }, day: { main: "%e. %b" }, week: { main: "%e. %b" },
                                month: { main: "%b '%y" }, year: { main: "%Y" }
                            }, endOnTick: !1, labels: { enabled: !0, indentation: 10, x: 0, style: { color: "white", cursor: "default", fontSize: "11px" } }, maxPadding: .01, minorTickLength: 2, minorTickPosition: "outside", minPadding: .01, showEmpty: !0, startOfWeek: 1, startOnTick: !1, tickLength: 10, tickPixelInterval: 100, tickmarkPlacement: "between", tickPosition: "outside", title: { align: "middle", style: { color: "white" } }, type: "linear", minorGridLineColor: "#f2f2f2", minorGridLineWidth: 1, minorTickColor: "#999999", lineColor: "#ccd6eb",
                            lineWidth: 1, gridLineColor: "#e6e6e6", tickColor: "#ccd6eb"
                        }, defaultYAxisOptions: { endOnTick: !0, maxPadding: .05, minPadding: .05, tickPixelInterval: 72, showLastLabel: !0, labels: { x: -8 }, startOnTick: !0, title: { rotation: 270, text: "Values" }, stackLabels: { allowOverlap: !1, enabled: !1, crop: !0, overflow: "justify", formatter: function () { var a = this.axis.chart.numberFormatter; return a(this.total, -1) }, style: { color: "#000000", fontSize: "11px", fontWeight: "bold", textOutline: "1px contrast" } }, gridLineWidth: 1, lineWidth: 0 }, defaultLeftAxisOptions: {
                            labels: { x: -15 },
                            title: { rotation: 270 }
                        }, defaultRightAxisOptions: { labels: { x: 15 }, title: { rotation: 90 } }, defaultBottomAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } }, defaultTopAxisOptions: { labels: { autoRotation: [-45], x: 0 }, margin: 15, title: { rotation: 0 } }, init: function (a, b) {
                            var l = b.isX, e = this; e.chart = a; e.horiz = a.inverted && !e.isZAxis ? !l : l; e.isXAxis = l; e.coll = e.coll || (l ? "xAxis" : "yAxis"); n(this, "init", { userOptions: b }); e.opposite = b.opposite; e.side = b.side || (e.horiz ? e.opposite ? 0 : 2 : e.opposite ? 1 : 3); e.setOptions(b);
                            var f = this.options, h = f.type; e.labelFormatter = f.labels.formatter || e.defaultLabelFormatter; e.userOptions = b; e.minPixelPadding = 0; e.reversed = f.reversed; e.visible = !1 !== f.visible; e.zoomEnabled = !1 !== f.zoomEnabled; e.hasNames = "category" === h || !0 === f.categories; e.categories = f.categories || e.hasNames; e.names || (e.names = [], e.names.keys = {}); e.plotLinesAndBandsGroups = {}; e.isLog = "logarithmic" === h; e.isDatetimeAxis = "datetime" === h; e.positiveValuesOnly = e.isLog && !e.allowNegativeLog; e.isLinked = r(f.linkedTo); e.ticks = {}; e.labelEdge =
                                []; e.minorTicks = {}; e.plotLinesAndBands = []; e.alternateBands = {}; e.len = 0; e.minRange = e.userMinRange = f.minRange || f.maxZoom; e.range = f.range; e.offset = f.offset || 0; e.stacks = {}; e.oldStacks = {}; e.stacksTouched = 0; e.max = null; e.min = null; e.crosshair = t(f.crosshair, K(a.options.tooltip.crosshairs)[l ? 0 : 1], !1); b = e.options.events; -1 === a.axes.indexOf(e) && (l ? a.axes.splice(a.xAxis.length, 0, e) : a.axes.push(e), a[e.coll].push(e)); e.series = e.series || []; a.inverted && !e.isZAxis && l && "undefined" === typeof e.reversed && (e.reversed = !0);
                            z(b, function (a, b) { d(a) && v(e, b, a) }); e.lin2log = f.linearToLogConverter || e.lin2log; e.isLog && (e.val2lin = e.log2lin, e.lin2val = e.lin2log); n(this, "afterInit")
                        }, setOptions: function (a) { this.options = b(this.defaultOptions, "yAxis" === this.coll && this.defaultYAxisOptions, [this.defaultTopAxisOptions, this.defaultRightAxisOptions, this.defaultBottomAxisOptions, this.defaultLeftAxisOptions][this.side], b(J[this.coll], a)); n(this, "afterSetOptions", { userOptions: a }) }, defaultLabelFormatter: function () {
                            var a = this.axis, b = this.value,
                            e = a.chart.time, d = a.categories, f = this.dateTimeLabelFormat, h = J.lang, p = h.numericSymbols; h = h.numericSymbolMagnitude || 1E3; var c = p && p.length, z = a.options.labels.format; a = a.isLog ? Math.abs(b) : a.tickInterval; var t = this.chart, w = t.numberFormatter; if (z) var n = M(z, this, t); else if (d) n = b; else if (f) n = e.dateFormat(f, b); else if (c && 1E3 <= a) for (; c-- && "undefined" === typeof n;)e = Math.pow(h, c + 1), a >= e && 0 === 10 * b % e && null !== p[c] && 0 !== b && (n = w(b / e, -1) + p[c]); "undefined" === typeof n && (n = 1E4 <= Math.abs(b) ? w(b, -1) : w(b, -1, void 0, "")); return n
                        },
                        getSeriesExtremes: function () {
                            var a = this, b = a.chart, e; n(this, "getSeriesExtremes", null, function () {
                            a.hasVisibleSeries = !1; a.dataMin = a.dataMax = a.threshold = null; a.softThreshold = !a.isXAxis; a.buildStacks && a.buildStacks(); a.series.forEach(function (l) {
                                if (l.visible || !b.options.chart.ignoreHiddenSeries) {
                                    var d = l.options, f = d.threshold; a.hasVisibleSeries = !0; a.positiveValuesOnly && 0 >= f && (f = null); if (a.isXAxis) {
                                        if (d = l.xData, d.length) {
                                            e = l.getXExtremes(d); var p = e.min; var A = e.max; h(p) || p instanceof Date || (d = d.filter(h),
                                                e = l.getXExtremes(d), p = e.min, A = e.max); d.length && (a.dataMin = Math.min(t(a.dataMin, p), p), a.dataMax = Math.max(t(a.dataMax, A), A))
                                        }
                                    } else if (l.getExtremes(), A = l.dataMax, p = l.dataMin, r(p) && r(A) && (a.dataMin = Math.min(t(a.dataMin, p), p), a.dataMax = Math.max(t(a.dataMax, A), A)), r(f) && (a.threshold = f), !d.softThreshold || a.positiveValuesOnly) a.softThreshold = !1
                                }
                            })
                            }); n(this, "afterGetSeriesExtremes")
                        }, translate: function (a, b, e, d, f, p) {
                            var l = this.linkedParent || this, A = 1, c = 0, H = d ? l.oldTransA : l.transA; d = d ? l.oldMin : l.min; var I = l.minPixelPadding;
                            f = (l.isOrdinal || l.isBroken || l.isLog && f) && l.lin2val; H || (H = l.transA); e && (A *= -1, c = l.len); l.reversed && (A *= -1, c -= A * (l.sector || l.len)); b ? (a = (a * A + c - I) / H + d, f && (a = l.lin2val(a))) : (f && (a = l.val2lin(a)), a = h(d) ? A * (a - d) * H + c + A * I + (h(p) ? H * p : 0) : void 0); return a
                        }, toPixels: function (a, b) { return this.translate(a, !1, !this.horiz, null, !0) + (b ? 0 : this.pos) }, toValue: function (a, b) { return this.translate(a - (b ? 0 : this.pos), !0, !this.horiz, null, !0) }, getPlotLinePath: function (a) {
                            var b = this, e = b.chart, d = b.left, f = b.top, p = a.old, A = a.value,
                            c = a.translatedValue, z = a.lineWidth, w = a.force, k, m, G, r, g = p && e.oldChartHeight || e.chartHeight, K = p && e.oldChartWidth || e.chartWidth, J, x = b.transB, q = function (a, b, l) { if ("pass" !== w && a < b || a > l) w ? a = C(a, b, l) : J = !0; return a }; a = { value: A, lineWidth: z, old: p, force: w, acrossPanes: a.acrossPanes, translatedValue: c }; n(this, "getPlotLinePath", a, function (a) {
                                c = t(c, b.translate(A, null, null, p)); c = C(c, -1E5, 1E5); k = G = Math.round(c + x); m = r = Math.round(g - c - x); h(c) ? b.horiz ? (m = f, r = g - b.bottom, k = G = q(k, d, d + b.width)) : (k = d, G = K - b.right, m = r = q(m, f, f +
                                    b.height)) : (J = !0, w = !1); a.path = J && !w ? null : e.renderer.crispLine(["M", k, m, "L", G, r], z || 1)
                            }); return a.path
                        }, getLinearTickPositions: function (a, b, e) { var l = k(Math.floor(b / a) * a); e = k(Math.ceil(e / a) * a); var d = [], f; k(l + a) === l && (f = 20); if (this.single) return [b]; for (b = l; b <= e;) { d.push(b); b = k(b + a, f); if (b === h) break; var h = b } return d }, getMinorTickInterval: function () { var a = this.options; return !0 === a.minorTicks ? t(a.minorTickInterval, "auto") : !1 === a.minorTicks ? null : a.minorTickInterval }, getMinorTickPositions: function () {
                            var a =
                                this, b = a.options, e = a.tickPositions, d = a.minorTickInterval, f = [], h = a.pointRangePadding || 0, p = a.min - h; h = a.max + h; var c = h - p; if (c && c / d < a.len / 3) if (a.isLog) this.paddedTicks.forEach(function (b, l, e) { l && f.push.apply(f, a.getLogTickPositions(d, e[l - 1], e[l], !0)) }); else if (a.isDatetimeAxis && "auto" === this.getMinorTickInterval()) f = f.concat(a.getTimeTicks(a.normalizeTimeTickInterval(d), p, h, b.startOfWeek)); else for (b = p + (e[0] - p) % d; b <= h && b !== f[0]; b += d)f.push(b); 0 !== f.length && a.trimTicks(f); return f
                        }, adjustForMinRange: function () {
                            var a =
                                this.options, b = this.min, e = this.max, d, f, h, p, c; this.isXAxis && "undefined" === typeof this.minRange && !this.isLog && (r(a.min) || r(a.max) ? this.minRange = null : (this.series.forEach(function (a) { p = a.xData; for (f = c = a.xIncrement ? 1 : p.length - 1; 0 < f; f--)if (h = p[f] - p[f - 1], "undefined" === typeof d || h < d) d = h }), this.minRange = Math.min(5 * d, this.dataMax - this.dataMin))); if (e - b < this.minRange) {
                                    var z = this.dataMax - this.dataMin >= this.minRange; var w = this.minRange; var n = (w - e + b) / 2; n = [b - n, t(a.min, b - n)]; z && (n[2] = this.isLog ? this.log2lin(this.dataMin) :
                                        this.dataMin); b = D(n); e = [b + w, t(a.max, b + w)]; z && (e[2] = this.isLog ? this.log2lin(this.dataMax) : this.dataMax); e = F(e); e - b < w && (n[0] = e - w, n[1] = t(a.min, e - w), b = D(n))
                                } this.min = b; this.max = e
                        }, getClosest: function () { var a; this.categories ? a = 1 : this.series.forEach(function (b) { var l = b.closestPointRange, e = b.visible || !b.chart.options.chart.ignoreHiddenSeries; !b.noSharedTooltip && r(l) && e && (a = r(a) ? Math.min(a, l) : l) }); return a }, nameToX: function (b) {
                            var l = a(this.categories), e = l ? this.categories : this.names, d = b.options.x; b.series.requireSorting =
                                !1; r(d) || (d = !1 === this.options.uniqueNames ? b.series.autoIncrement() : l ? e.indexOf(b.name) : t(e.keys[b.name], -1)); if (-1 === d) { if (!l) var f = e.length } else f = d; "undefined" !== typeof f && (this.names[f] = b.name, this.names.keys[b.name] = f); return f
                        }, updateNames: function () {
                            var a = this, b = this.names; 0 < b.length && (Object.keys(b.keys).forEach(function (a) { delete b.keys[a] }), b.length = 0, this.minRange = this.userMinRange, (this.series || []).forEach(function (b) {
                            b.xIncrement = null; if (!b.points || b.isDirtyData) a.max = Math.max(a.max, b.xData.length -
                                1), b.processData(), b.generatePoints(); b.data.forEach(function (l, e) { if (l && l.options && "undefined" !== typeof l.name) { var d = a.nameToX(l); "undefined" !== typeof d && d !== l.x && (l.x = d, b.xData[e] = d) } })
                            }))
                        }, setAxisTranslation: function (a) {
                            var b = this, d = b.max - b.min, f = b.axisPointRange || 0, h = 0, p = 0, c = b.linkedParent, A = !!b.categories, z = b.transA, w = b.isXAxis; if (w || A || f) {
                                var k = b.getClosest(); c ? (h = c.minPointOffset, p = c.pointRangePadding) : b.series.forEach(function (a) {
                                    var l = A ? 1 : w ? t(a.options.pointRange, k, 0) : b.axisPointRange ||
                                        0, d = a.options.pointPlacement; f = Math.max(f, l); if (!b.single || A) a = a.is("xrange") ? !w : w, h = Math.max(h, a && e(d) ? 0 : l / 2), p = Math.max(p, a && "on" === d ? 0 : l)
                                }); c = b.ordinalSlope && k ? b.ordinalSlope / k : 1; b.minPointOffset = h *= c; b.pointRangePadding = p *= c; b.pointRange = Math.min(f, b.single && A ? 1 : d); w && (b.closestPointRange = k)
                            } a && (b.oldTransA = z); b.translationSlope = b.transA = z = b.staticScale || b.len / (d + p || 1); b.transB = b.horiz ? b.left : b.bottom; b.minPixelPadding = z * h; n(this, "afterSetAxisTranslation")
                        }, minFromRange: function () {
                            return this.max -
                                this.range
                        }, setTickInterval: function (a) {
                            var b = this, e = b.chart, d = b.options, c = b.isLog, A = b.isDatetimeAxis, z = b.isXAxis, w = b.isLinked, G = d.maxPadding, g = d.minPadding, K = d.tickInterval, J = d.tickPixelInterval, O = b.categories, T = h(b.threshold) ? b.threshold : null, x = b.softThreshold; A || O || w || this.getTickAmount(); var q = t(b.userMin, d.min); var S = t(b.userMax, d.max); if (w) {
                            b.linkedParent = e[b.coll][d.linkedTo]; var Q = b.linkedParent.getExtremes(); b.min = t(Q.min, Q.dataMin); b.max = t(Q.max, Q.dataMax); d.type !== b.linkedParent.options.type &&
                                m(11, 1, e)
                            } else { if (!x && r(T)) if (b.dataMin >= T) Q = T, g = 0; else if (b.dataMax <= T) { var v = T; G = 0 } b.min = t(q, Q, b.dataMin); b.max = t(S, v, b.dataMax) } c && (b.positiveValuesOnly && !a && 0 >= Math.min(b.min, t(b.dataMin, b.min)) && m(10, 1, e), b.min = k(b.log2lin(b.min), 16), b.max = k(b.log2lin(b.max), 16)); b.range && r(b.max) && (b.userMin = b.min = q = Math.max(b.dataMin, b.minFromRange()), b.userMax = S = b.max, b.range = null); n(b, "foundExtremes"); b.beforePadding && b.beforePadding(); b.adjustForMinRange(); !(O || b.axisPointRange || b.usePercentage || w) && r(b.min) &&
                                r(b.max) && (e = b.max - b.min) && (!r(q) && g && (b.min -= e * g), !r(S) && G && (b.max += e * G)); h(b.userMin) || (h(d.softMin) && d.softMin < b.min && (b.min = q = d.softMin), h(d.floor) && (b.min = Math.max(b.min, d.floor))); h(b.userMax) || (h(d.softMax) && d.softMax > b.max && (b.max = S = d.softMax), h(d.ceiling) && (b.max = Math.min(b.max, d.ceiling))); x && r(b.dataMin) && (T = T || 0, !r(q) && b.min < T && b.dataMin >= T ? b.min = b.options.minRange ? Math.min(T, b.max - b.minRange) : T : !r(S) && b.max > T && b.dataMax <= T && (b.max = b.options.minRange ? Math.max(T, b.min + b.minRange) : T)); b.tickInterval =
                                    b.min === b.max || "undefined" === typeof b.min || "undefined" === typeof b.max ? 1 : w && !K && J === b.linkedParent.options.tickPixelInterval ? K = b.linkedParent.tickInterval : t(K, this.tickAmount ? (b.max - b.min) / Math.max(this.tickAmount - 1, 1) : void 0, O ? 1 : (b.max - b.min) * J / Math.max(b.len, J)); z && !a && b.series.forEach(function (a) { a.processData(b.min !== b.oldMin || b.max !== b.oldMax) }); b.setAxisTranslation(!0); b.beforeSetTickPositions && b.beforeSetTickPositions(); b.postProcessTickInterval && (b.tickInterval = b.postProcessTickInterval(b.tickInterval));
                            b.pointRange && !K && (b.tickInterval = Math.max(b.pointRange, b.tickInterval)); a = t(d.minTickInterval, b.isDatetimeAxis && b.closestPointRange); !K && b.tickInterval < a && (b.tickInterval = a); A || c || K || (b.tickInterval = p(b.tickInterval, null, f(b.tickInterval), t(d.allowDecimals, !(.5 < b.tickInterval && 5 > b.tickInterval && 1E3 < b.max && 9999 > b.max)), !!this.tickAmount)); this.tickAmount || (b.tickInterval = b.unsquish()); this.setTickPositions()
                        }, setTickPositions: function () {
                            var a = this.options, b = a.tickPositions; var e = this.getMinorTickInterval();
                            var d = a.tickPositioner, f = a.startOnTick, h = a.endOnTick; this.tickmarkOffset = this.categories && "between" === a.tickmarkPlacement && 1 === this.tickInterval ? .5 : 0; this.minorTickInterval = "auto" === e && this.tickInterval ? this.tickInterval / 5 : e; this.single = this.min === this.max && r(this.min) && !this.tickAmount && (parseInt(this.min, 10) === this.min || !1 !== a.allowDecimals); this.tickPositions = e = b && b.slice(); !e && (!this.ordinalPositions && (this.max - this.min) / this.tickInterval > Math.max(2 * this.len, 200) ? (e = [this.min, this.max], m(19, !1,
                                this.chart)) : e = this.isDatetimeAxis ? this.getTimeTicks(this.normalizeTimeTickInterval(this.tickInterval, a.units), this.min, this.max, a.startOfWeek, this.ordinalPositions, this.closestPointRange, !0) : this.isLog ? this.getLogTickPositions(this.tickInterval, this.min, this.max) : this.getLinearTickPositions(this.tickInterval, this.min, this.max), e.length > this.len && (e = [e[0], e.pop()], e[0] === e[1] && (e.length = 1)), this.tickPositions = e, d && (d = d.apply(this, [this.min, this.max]))) && (this.tickPositions = e = d); this.paddedTicks = e.slice(0);
                            this.trimTicks(e, f, h); this.isLinked || (this.single && 2 > e.length && !this.categories && !this.series.some(function (a) { return a.is("heatmap") && "between" === a.options.pointPlacement }) && (this.min -= .5, this.max += .5), b || d || this.adjustTickAmount()); n(this, "afterSetTickPositions")
                        }, trimTicks: function (a, b, e) {
                            var l = a[0], d = a[a.length - 1], f = !this.isOrdinal && this.minPointOffset || 0; n(this, "trimTicks"); if (!this.isLinked) {
                                if (b && -Infinity !== l) this.min = l; else for (; this.min - f > a[0];)a.shift(); if (e) this.max = d; else for (; this.max +
                                    f < a[a.length - 1];)a.pop(); 0 === a.length && r(l) && !this.options.tickPositions && a.push((d + l) / 2)
                            }
                        }, alignToOthers: function () { var a = {}, b, e = this.options; !1 === this.chart.options.chart.alignTicks || !1 === e.alignTicks || !1 === e.startOnTick || !1 === e.endOnTick || this.isLog || this.chart[this.coll].forEach(function (e) { var l = e.options; l = [e.horiz ? l.left : l.top, l.width, l.height, l.pane].join(); e.series.length && (a[l] ? b = !0 : a[l] = 1) }); return b }, getTickAmount: function () {
                            var a = this.options, b = a.tickAmount, e = a.tickPixelInterval; !r(a.tickInterval) &&
                                this.len < e && !this.isRadial && !this.isLog && a.startOnTick && a.endOnTick && (b = 2); !b && this.alignToOthers() && (b = Math.ceil(this.len / e) + 1); 4 > b && (this.finalTickAmt = b, b = 5); this.tickAmount = b
                        }, adjustTickAmount: function () {
                            var a = this.options, b = this.tickInterval, e = this.tickPositions, d = this.tickAmount, f = this.finalTickAmt, h = e && e.length, p = t(this.threshold, this.softThreshold ? 0 : null), c; if (this.hasData()) {
                                if (h < d) {
                                    for (c = this.min; e.length < d;)e.length % 2 || c === p ? e.push(k(e[e.length - 1] + b)) : e.unshift(k(e[0] - b)); this.transA *= (h -
                                        1) / (d - 1); this.min = a.startOnTick ? e[0] : Math.min(this.min, e[0]); this.max = a.endOnTick ? e[e.length - 1] : Math.max(this.max, e[e.length - 1])
                                } else h > d && (this.tickInterval *= 2, this.setTickPositions()); if (r(f)) { for (b = a = e.length; b--;)(3 === f && 1 === b % 2 || 2 >= f && 0 < b && b < a - 1) && e.splice(b, 1); this.finalTickAmt = void 0 }
                            }
                        }, setScale: function () {
                            var a = this.series.some(function (a) { return a.isDirtyData || a.isDirty || a.xAxis && a.xAxis.isDirty }), b; this.oldMin = this.min; this.oldMax = this.max; this.oldAxisLength = this.len; this.setAxisSize();
                            (b = this.len !== this.oldAxisLength) || a || this.isLinked || this.forceRedraw || this.userMin !== this.oldUserMin || this.userMax !== this.oldUserMax || this.alignToOthers() ? (this.resetStacks && this.resetStacks(), this.forceRedraw = !1, this.getSeriesExtremes(), this.setTickInterval(), this.oldUserMin = this.userMin, this.oldUserMax = this.userMax, this.isDirty || (this.isDirty = b || this.min !== this.oldMin || this.max !== this.oldMax)) : this.cleanStacks && this.cleanStacks(); n(this, "afterSetScale")
                        }, setExtremes: function (a, b, e, d, f) {
                            var l = this,
                            h = l.chart; e = t(e, !0); l.series.forEach(function (a) { delete a.kdTree }); f = L(f, { min: a, max: b }); n(l, "setExtremes", f, function () { l.userMin = a; l.userMax = b; l.eventArgs = f; e && h.redraw(d) })
                        }, zoom: function (a, b) {
                            var e = this.dataMin, l = this.dataMax, d = this.options, f = Math.min(e, t(d.min, e)), h = Math.max(l, t(d.max, l)); a = { newMin: a, newMax: b }; n(this, "zoom", a, function (a) {
                                var b = a.newMin, d = a.newMax; if (b !== this.min || d !== this.max) this.allowZoomOutside || (r(e) && (b < f && (b = f), b > h && (b = h)), r(l) && (d < f && (d = f), d > h && (d = h))), this.displayBtn = "undefined" !==
                                    typeof b || "undefined" !== typeof d, this.setExtremes(b, d, !1, void 0, { trigger: "zoom" }); a.zoomed = !0
                            }); return a.zoomed
                        }, setAxisSize: function () {
                            var a = this.chart, b = this.options, e = b.offsets || [0, 0, 0, 0], d = this.horiz, f = this.width = Math.round(w(t(b.width, a.plotWidth - e[3] + e[1]), a.plotWidth)), h = this.height = Math.round(w(t(b.height, a.plotHeight - e[0] + e[2]), a.plotHeight)), p = this.top = Math.round(w(t(b.top, a.plotTop + e[0]), a.plotHeight, a.plotTop)); b = this.left = Math.round(w(t(b.left, a.plotLeft + e[3]), a.plotWidth, a.plotLeft));
                            this.bottom = a.chartHeight - h - p; this.right = a.chartWidth - f - b; this.len = Math.max(d ? f : h, 0); this.pos = d ? b : p
                        }, getExtremes: function () { var a = this.isLog; return { min: a ? k(this.lin2log(this.min)) : this.min, max: a ? k(this.lin2log(this.max)) : this.max, dataMin: this.dataMin, dataMax: this.dataMax, userMin: this.userMin, userMax: this.userMax } }, getThreshold: function (a) {
                            var b = this.isLog, e = b ? this.lin2log(this.min) : this.min; b = b ? this.lin2log(this.max) : this.max; null === a || -Infinity === a ? a = e : Infinity === a ? a = b : e > a ? a = e : b < a && (a = b); return this.translate(a,
                                0, 1, 0, 1)
                        }, autoLabelAlign: function (a) { var b = (t(a, 0) - 90 * this.side + 720) % 360; a = { align: "center" }; n(this, "autoLabelAlign", a, function (a) { 15 < b && 165 > b ? a.align = "right" : 195 < b && 345 > b && (a.align = "left") }); return a.align }, tickSize: function (a) { var b = this.options, e = b[a + "Length"], d = t(b[a + "Width"], "tick" === a && this.isXAxis && !this.categories ? 1 : 0); if (d && e) { "inside" === b[a + "Position"] && (e = -e); var f = [e, d] } a = { tickSize: f }; n(this, "afterTickSize", a); return a.tickSize }, labelMetrics: function () {
                            var a = this.tickPositions && this.tickPositions[0] ||
                                0; return this.chart.renderer.fontMetrics(this.options.labels.style && this.options.labels.style.fontSize, this.ticks[a] && this.ticks[a].label)
                        }, unsquish: function () {
                            var a = this.options.labels, b = this.horiz, e = this.tickInterval, d = e, f = this.len / (((this.categories ? 1 : 0) + this.max - this.min) / e), h, p = a.rotation, c = this.labelMetrics(), z, w = Number.MAX_VALUE, n, m = this.max - this.min, G = function (a) { var b = a / (f || 1); b = 1 < b ? Math.ceil(b) : 1; b * e > m && Infinity !== a && Infinity !== f && m && (b = Math.ceil(m / e)); return k(b * e) }; b ? (n = !a.staggerLines &&
                                !a.step && (r(p) ? [p] : f < t(a.autoRotationLimit, 80) && a.autoRotation)) && n.forEach(function (a) { if (a === p || a && -90 <= a && 90 >= a) { z = G(Math.abs(c.h / Math.sin(S * a))); var b = z + Math.abs(a / 360); b < w && (w = b, h = a, d = z) } }) : a.step || (d = G(c.h)); this.autoRotation = n; this.labelRotation = t(h, p); return d
                        }, getSlotWidth: function (a) {
                            var b = this.chart, e = this.horiz, d = this.options.labels, f = Math.max(this.tickPositions.length - (this.categories ? 0 : 1), 1), h = b.margin[3]; return a && a.slotWidth || e && 2 > (d.step || 0) && !d.rotation && (this.staggerLines || 1) * this.len /
                                f || !e && (d.style && parseInt(d.style.width, 10) || h && h - b.spacing[3] || .33 * b.chartWidth)
                        }, renderUnsquish: function () {
                            var a = this.chart, b = a.renderer, d = this.tickPositions, f = this.ticks, h = this.options.labels, p = h && h.style || {}, c = this.horiz, z = this.getSlotWidth(), t = Math.max(1, Math.round(z - 2 * (h.padding || 5))), w = {}, n = this.labelMetrics(), k = h.style && h.style.textOverflow, m = 0; e(h.rotation) || (w.rotation = h.rotation || 0); d.forEach(function (a) {
                                a = f[a]; a.movedLabel && a.replaceMovedLabel(); a && a.label && a.label.textPxLength > m && (m =
                                    a.label.textPxLength)
                            }); this.maxLabelLength = m; if (this.autoRotation) m > t && m > n.h ? w.rotation = this.labelRotation : this.labelRotation = 0; else if (z) { var G = t; if (!k) { var r = "clip"; for (t = d.length; !c && t--;) { var K = d[t]; if (K = f[K].label) K.styles && "ellipsis" === K.styles.textOverflow ? K.css({ textOverflow: "clip" }) : K.textPxLength > z && K.css({ width: z + "px" }), K.getBBox().height > this.len / d.length - (n.h - n.f) && (K.specificTextOverflow = "ellipsis") } } } w.rotation && (G = m > .5 * a.chartHeight ? .33 * a.chartHeight : m, k || (r = "ellipsis")); if (this.labelAlign =
                                h.align || this.autoLabelAlign(this.labelRotation)) w.align = this.labelAlign; d.forEach(function (a) { var b = (a = f[a]) && a.label, e = p.width, d = {}; b && (b.attr(w), a.shortenLabel ? a.shortenLabel() : G && !e && "nowrap" !== p.whiteSpace && (G < b.textPxLength || "SPAN" === b.element.tagName) ? (d.width = G, k || (d.textOverflow = b.specificTextOverflow || r), b.css(d)) : b.styles && b.styles.width && !d.width && !e && b.css({ width: null }), delete b.specificTextOverflow, a.rotation = w.rotation) }, this); this.tickRotCorr = b.rotCorr(n.b, this.labelRotation || 0, 0 !==
                                    this.side)
                        }, hasData: function () { return this.series.some(function (a) { return a.hasData() }) || this.options.showEmpty && r(this.min) && r(this.max) }, addTitle: function (a) {
                            var e = this.chart.renderer, d = this.horiz, f = this.opposite, h = this.options.title, p, c = this.chart.styledMode; this.axisTitle || ((p = h.textAlign) || (p = (d ? { low: "left", middle: "center", high: "right" } : { low: f ? "right" : "left", middle: "center", high: f ? "left" : "right" })[h.align]), this.axisTitle = e.text(h.text, 0, 0, h.useHTML).attr({ zIndex: 7, rotation: h.rotation || 0, align: p }).addClass("highcharts-axis-title"),
                                c || this.axisTitle.css(b(h.style)), this.axisTitle.add(this.axisGroup), this.axisTitle.isNew = !0); c || h.style.width || this.isRadial || this.axisTitle.css({ width: this.len }); this.axisTitle[a ? "show" : "hide"](a)
                        }, generateTick: function (a) { var b = this.ticks; b[a] ? b[a].addLabel() : b[a] = new E(this, a) }, getOffset: function () {
                            var a = this, b = a.chart, e = b.renderer, d = a.options, f = a.tickPositions, h = a.ticks, p = a.horiz, c = a.side, w = b.inverted && !a.isZAxis ? [1, 0, 3, 2][c] : c, k, m = 0, G = 0, O = d.title, K = d.labels, g = 0, J = b.axisOffset; b = b.clipOffset;
                            var x = [-1, 1, 1, -1][c], q = d.className, S = a.axisParent; var Q = a.hasData(); a.showAxis = k = Q || t(d.showEmpty, !0); a.staggerLines = a.horiz && K.staggerLines; a.axisGroup || (a.gridGroup = e.g("grid").attr({ zIndex: d.gridZIndex || 1 }).addClass("highcharts-" + this.coll.toLowerCase() + "-grid " + (q || "")).add(S), a.axisGroup = e.g("axis").attr({ zIndex: d.zIndex || 2 }).addClass("highcharts-" + this.coll.toLowerCase() + " " + (q || "")).add(S), a.labelGroup = e.g("axis-labels").attr({ zIndex: K.zIndex || 7 }).addClass("highcharts-" + a.coll.toLowerCase() +
                                "-labels " + (q || "")).add(S)); Q || a.isLinked ? (f.forEach(function (b, e) { a.generateTick(b, e) }), a.renderUnsquish(), a.reserveSpaceDefault = 0 === c || 2 === c || { 1: "left", 3: "right" }[c] === a.labelAlign, t(K.reserveSpace, "center" === a.labelAlign ? !0 : null, a.reserveSpaceDefault) && f.forEach(function (a) { g = Math.max(h[a].getLabelSize(), g) }), a.staggerLines && (g *= a.staggerLines), a.labelOffset = g * (a.opposite ? -1 : 1)) : z(h, function (a, b) { a.destroy(); delete h[b] }); if (O && O.text && !1 !== O.enabled && (a.addTitle(k), k && !1 !== O.reserveSpace)) {
                                a.titleOffset =
                                    m = a.axisTitle.getBBox()[p ? "height" : "width"]; var v = O.offset; G = r(v) ? 0 : t(O.margin, p ? 5 : 10)
                                } a.renderLine(); a.offset = x * t(d.offset, J[c] ? J[c] + (d.margin || 0) : 0); a.tickRotCorr = a.tickRotCorr || { x: 0, y: 0 }; e = 0 === c ? -a.labelMetrics().h : 2 === c ? a.tickRotCorr.y : 0; G = Math.abs(g) + G; g && (G = G - e + x * (p ? t(K.y, a.tickRotCorr.y + 8 * x) : K.x)); a.axisTitleMargin = t(v, G); a.getMaxLabelDimensions && (a.maxLabelDimensions = a.getMaxLabelDimensions(h, f)); p = this.tickSize("tick"); J[c] = Math.max(J[c], a.axisTitleMargin + m + x * a.offset, G, f && f.length && p ? p[0] +
                                    x * a.offset : 0); d = d.offset ? 0 : 2 * Math.floor(a.axisLine.strokeWidth() / 2); b[w] = Math.max(b[w], d); n(this, "afterGetOffset")
                        }, getLinePath: function (a) { var b = this.chart, e = this.opposite, d = this.offset, f = this.horiz, h = this.left + (e ? this.width : 0) + d; d = b.chartHeight - this.bottom - (e ? this.height : 0) + d; e && (a *= -1); return b.renderer.crispLine(["M", f ? this.left : h, f ? d : this.top, "L", f ? b.chartWidth - this.right : h, f ? d : b.chartHeight - this.bottom], a) }, renderLine: function () {
                        this.axisLine || (this.axisLine = this.chart.renderer.path().addClass("highcharts-axis-line").add(this.axisGroup),
                            this.chart.styledMode || this.axisLine.attr({ stroke: this.options.lineColor, "stroke-width": this.options.lineWidth, zIndex: 7 }))
                        }, getTitlePosition: function () {
                            var a = this.horiz, b = this.left, e = this.top, d = this.len, f = this.options.title, h = a ? b : e, p = this.opposite, c = this.offset, z = f.x || 0, w = f.y || 0, t = this.axisTitle, k = this.chart.renderer.fontMetrics(f.style && f.style.fontSize, t); t = Math.max(t.getBBox(null, 0).height - k.h - 1, 0); d = { low: h + (a ? 0 : d), middle: h + d / 2, high: h + (a ? d : 0) }[f.align]; b = (a ? e + this.height : b) + (a ? 1 : -1) * (p ? -1 : 1) * this.axisTitleMargin +
                                [-t, t, k.f, -t][this.side]; a = { x: a ? d + z : b + (p ? this.width : 0) + c + z, y: a ? b + w - (p ? this.height : 0) + c : d + w }; n(this, "afterGetTitlePosition", { titlePosition: a }); return a
                        }, renderMinorTick: function (a) { var b = this.chart.hasRendered && h(this.oldMin), e = this.minorTicks; e[a] || (e[a] = new E(this, a, "minor")); b && e[a].isNew && e[a].render(null, !0); e[a].render(null, !1, 1) }, renderTick: function (a, b) {
                            var e = this.isLinked, d = this.ticks, l = this.chart.hasRendered && h(this.oldMin); if (!e || a >= this.min && a <= this.max) d[a] || (d[a] = new E(this, a)), l && d[a].isNew &&
                                d[a].render(b, !0, -1), d[a].render(b)
                        }, render: function () {
                            var a = this, b = a.chart, e = a.options, d = a.isLog, f = a.isLinked, p = a.tickPositions, t = a.axisTitle, w = a.ticks, k = a.minorTicks, m = a.alternateBands, G = e.stackLabels, r = e.alternateGridColor, O = a.tickmarkOffset, K = a.axisLine, g = a.showAxis, J = N(b.renderer.globalAnimation), x, q; a.labelEdge.length = 0; a.overlap = !1;[w, k, m].forEach(function (a) { z(a, function (a) { a.isActive = !1 }) }); if (a.hasData() || f) a.minorTickInterval && !a.categories && a.getMinorTickPositions().forEach(function (b) { a.renderMinorTick(b) }),
                                p.length && (p.forEach(function (b, e) { a.renderTick(b, e) }), O && (0 === a.min || a.single) && (w[-1] || (w[-1] = new E(a, -1, null, !0)), w[-1].render(-1))), r && p.forEach(function (e, l) { q = "undefined" !== typeof p[l + 1] ? p[l + 1] + O : a.max - O; 0 === l % 2 && e < a.max && q <= a.max + (b.polar ? -O : O) && (m[e] || (m[e] = new c.PlotLineOrBand(a)), x = e + O, m[e].options = { from: d ? a.lin2log(x) : x, to: d ? a.lin2log(q) : q, color: r }, m[e].render(), m[e].isActive = !0) }), a._addedPlotLB || ((e.plotLines || []).concat(e.plotBands || []).forEach(function (b) { a.addPlotBandOrLine(b) }), a._addedPlotLB =
                                    !0);[w, k, m].forEach(function (a) { var e, d = [], l = J.duration; z(a, function (a, b) { a.isActive || (a.render(b, !1, 0), a.isActive = !1, d.push(b)) }); Q(function () { for (e = d.length; e--;)a[d[e]] && !a[d[e]].isActive && (a[d[e]].destroy(), delete a[d[e]]) }, a !== m && b.hasRendered && l ? l : 0) }); K && (K[K.isPlaced ? "animate" : "attr"]({ d: this.getLinePath(K.strokeWidth()) }), K.isPlaced = !0, K[g ? "show" : "hide"](g)); t && g && (e = a.getTitlePosition(), h(e.y) ? (t[t.isNew ? "attr" : "animate"](e), t.isNew = !1) : (t.attr("y", -9999), t.isNew = !0)); G && G.enabled && a.renderStackTotals();
                            a.isDirty = !1; n(this, "afterRender")
                        }, redraw: function () { this.visible && (this.render(), this.plotLinesAndBands.forEach(function (a) { a.render() })); this.series.forEach(function (a) { a.isDirty = !0 }) }, keepProps: "extKey hcEvents names series userMax userMin".split(" "), destroy: function (a) {
                            var b = this, e = b.stacks, d = b.plotLinesAndBands, f; n(this, "destroy", { keepEvents: a }); a || G(b); z(e, function (a, b) { x(a); e[b] = null });[b.ticks, b.minorTicks, b.alternateBands].forEach(function (a) { x(a) }); if (d) for (a = d.length; a--;)d[a].destroy();
                            "stackTotalGroup axisLine axisTitle axisGroup gridGroup labelGroup cross scrollbar".split(" ").forEach(function (a) { b[a] && (b[a] = b[a].destroy()) }); for (f in b.plotLinesAndBandsGroups) b.plotLinesAndBandsGroups[f] = b.plotLinesAndBandsGroups[f].destroy(); z(b, function (a, e) { -1 === b.keepProps.indexOf(e) && delete b[e] })
                        }, drawCrosshair: function (a, b) {
                            var e = this.crosshair, d = t(e.snap, !0), l, f = this.cross, h = this.chart; n(this, "drawCrosshair", { e: a, point: b }); a || (a = this.cross && this.cross.e); if (this.crosshair && !1 !== (r(b) ||
                                !d)) {
                                    d ? r(b) && (l = t("colorAxis" !== this.coll ? b.crosshairPos : null, this.isXAxis ? b.plotX : this.len - b.plotY)) : l = a && (this.horiz ? a.chartX - this.pos : this.len - a.chartY + this.pos); if (r(l)) { var p = { value: b && (this.isXAxis ? b.x : t(b.stackY, b.y)), translatedValue: l }; h.polar && L(p, { isCrosshair: !0, chartX: a && a.chartX, chartY: a && a.chartY, point: b }); p = this.getPlotLinePath(p) || null } if (!r(p)) { this.hideCrosshair(); return } d = this.categories && !this.isRadial; f || (this.cross = f = h.renderer.path().addClass("highcharts-crosshair highcharts-crosshair-" +
                                        (d ? "category " : "thin ") + e.className).attr({ zIndex: t(e.zIndex, 2) }).add(), h.styledMode || (f.attr({ stroke: e.color || (d ? y("#ccd6eb").setOpacity(.25).get() : "#cccccc"), "stroke-width": t(e.width, 1) }).css({ "pointer-events": "none" }), e.dashStyle && f.attr({ dashstyle: e.dashStyle }))); f.show().attr({ d: p }); d && !e.width && f.attr({ "stroke-width": this.transA }); this.cross.e = a
                            } else this.hideCrosshair(); n(this, "afterDrawCrosshair", { e: a, point: b })
                        }, hideCrosshair: function () { this.cross && this.cross.hide(); n(this, "afterHideCrosshair") }
                    });
                    return c.Axis = g
                }); P(u, "parts/DateTimeAxis.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    var E = g.getMagnitude, q = g.normalizeTickInterval, y = g.timeUnits; c = c.Axis; c.prototype.getTimeTicks = function () { return this.chart.time.getTimeTicks.apply(this.chart.time, arguments) }; c.prototype.normalizeTimeTickInterval = function (c, g) {
                        var v = g || [["millisecond", [1, 2, 5, 10, 20, 25, 50, 100, 200, 500]], ["second", [1, 2, 5, 10, 15, 30]], ["minute", [1, 2, 5, 10, 15, 30]], ["hour", [1, 2, 3, 4, 6, 8, 12]], ["day", [1, 2]], ["week", [1,
                            2]], ["month", [1, 2, 3, 4, 6]], ["year", null]]; g = v[v.length - 1]; var F = y[g[0]], C = g[1], k; for (k = 0; k < v.length && !(g = v[k], F = y[g[0]], C = g[1], v[k + 1] && c <= (F * C[C.length - 1] + y[v[k + 1][0]]) / 2); k++); F === y.year && c < 5 * F && (C = [1, 2, 5]); c = q(c / F, C, "year" === g[0] ? Math.max(E(c / F), 1) : 1); return { unitRange: F, count: c, unitName: g[0] }
                    }
                }); P(u, "parts/LogarithmicAxis.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    var E = g.getMagnitude, q = g.normalizeTickInterval, y = g.pick; c = c.Axis; c.prototype.getLogTickPositions = function (c, g,
                        D, F) {
                            var v = this.options, k = this.len, r = []; F || (this._minorAutoInterval = null); if (.5 <= c) c = Math.round(c), r = this.getLinearTickPositions(c, g, D); else if (.08 <= c) { k = Math.floor(g); var x, m; for (v = .3 < c ? [1, 2, 4] : .15 < c ? [1, 2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 9]; k < D + 1 && !m; k++) { var L = v.length; for (x = 0; x < L && !m; x++) { var n = this.log2lin(this.lin2log(k) * v[x]); n > g && (!F || M <= D) && "undefined" !== typeof M && r.push(M); M > D && (m = !0); var M = n } } } else g = this.lin2log(g), D = this.lin2log(D), c = F ? this.getMinorTickInterval() : v.tickInterval, c = y("auto" === c ?
                                null : c, this._minorAutoInterval, v.tickPixelInterval / (F ? 5 : 1) * (D - g) / ((F ? k / this.tickPositions.length : k) || 1)), c = q(c, null, E(c)), r = this.getLinearTickPositions(c, g, D).map(this.log2lin), F || (this._minorAutoInterval = c / 5); F || (this.tickInterval = c); return r
                    }; c.prototype.log2lin = function (c) { return Math.log(c) / Math.LN10 }; c.prototype.lin2log = function (c) { return Math.pow(10, c) }
                }); P(u, "parts/PlotLineOrBand.js", [u["parts/Globals.js"], u["parts/Axis.js"], u["parts/Utilities.js"]], function (c, g, E) {
                    var q = E.arrayMax, y = E.arrayMin,
                    v = E.defined, N = E.destroyObjectProperties, D = E.erase, F = E.extend, C = E.merge, k = E.objectEach, r = E.pick, x = function () {
                        function m(c, n) { this.axis = c; n && (this.options = n, this.id = n.id) } m.prototype.render = function () {
                            c.fireEvent(this, "render"); var m = this, n = m.axis, g = n.horiz, f = m.options, a = f.label, d = m.label, h = f.to, e = f.from, b = f.value, p = v(e) && v(h), z = v(b), t = m.svgElem, w = !t, G = [], K = f.color, x = r(f.zIndex, 0), J = f.events; G = { "class": "highcharts-plot-" + (p ? "band " : "line ") + (f.className || "") }; var q = {}, A = n.chart.renderer, l = p ? "bands" :
                                "lines"; n.isLog && (e = n.log2lin(e), h = n.log2lin(h), b = n.log2lin(b)); n.chart.styledMode || (z ? (G.stroke = K || "#999999", G["stroke-width"] = r(f.width, 1), f.dashStyle && (G.dashstyle = f.dashStyle)) : p && (G.fill = K || "#e6ebf5", f.borderWidth && (G.stroke = f.borderColor, G["stroke-width"] = f.borderWidth))); q.zIndex = x; l += "-" + x; (K = n.plotLinesAndBandsGroups[l]) || (n.plotLinesAndBandsGroups[l] = K = A.g("plot-" + l).attr(q).add()); w && (m.svgElem = t = A.path().attr(G).add(K)); if (z) G = n.getPlotLinePath({ value: b, lineWidth: t.strokeWidth(), acrossPanes: f.acrossPanes });
                            else if (p) G = n.getPlotBandPath(e, h, f); else return; (w || !t.d) && G && G.length ? (t.attr({ d: G }), J && k(J, function (a, b) { t.on(b, function (a) { J[b].apply(m, [a]) }) })) : t && (G ? (t.show(!0), t.animate({ d: G })) : t.d && (t.hide(), d && (m.label = d = d.destroy()))); a && (v(a.text) || v(a.formatter)) && G && G.length && 0 < n.width && 0 < n.height && !G.isFlat ? (a = C({ align: g && p && "center", x: g ? !p && 4 : 10, verticalAlign: !g && p && "middle", y: g ? p ? 16 : 10 : p ? 6 : -4, rotation: g && !p && 90 }, a), this.renderLabel(a, G, p, x)) : d && d.hide(); return m
                        }; m.prototype.renderLabel = function (c,
                            n, k, f) { var a = this.label, d = this.axis.chart.renderer; a || (a = { align: c.textAlign || c.align, rotation: c.rotation, "class": "highcharts-plot-" + (k ? "band" : "line") + "-label " + (c.className || "") }, a.zIndex = f, f = this.getLabelText(c), this.label = a = d.text(f, 0, 0, c.useHTML).attr(a).add(), this.axis.chart.styledMode || a.css(c.style)); d = n.xBounds || [n[1], n[4], k ? n[6] : n[1]]; n = n.yBounds || [n[2], n[5], k ? n[7] : n[2]]; k = y(d); f = y(n); a.align(c, !1, { x: k, y: f, width: q(d) - k, height: q(n) - f }); a.show(!0) }; m.prototype.getLabelText = function (c) {
                                return v(c.formatter) ?
                                    c.formatter.call(this) : c.text
                            }; m.prototype.destroy = function () { D(this.axis.plotLinesAndBands, this); delete this.axis; N(this) }; return m
                    }(); F(g.prototype, {
                        getPlotBandPath: function (c, k) {
                            var n = this.getPlotLinePath({ value: k, force: !0, acrossPanes: this.options.acrossPanes }), m = this.getPlotLinePath({ value: c, force: !0, acrossPanes: this.options.acrossPanes }), f = [], a = this.horiz, d = 1; c = c < this.min && k < this.min || c > this.max && k > this.max; if (m && n) {
                                if (c) { var h = m.toString() === n.toString(); d = 0 } for (c = 0; c < m.length; c += 6)a && n[c + 1] ===
                                    m[c + 1] ? (n[c + 1] += d, n[c + 4] += d) : a || n[c + 2] !== m[c + 2] || (n[c + 2] += d, n[c + 5] += d), f.push("M", m[c + 1], m[c + 2], "L", m[c + 4], m[c + 5], n[c + 4], n[c + 5], n[c + 1], n[c + 2], "z"), f.isFlat = h
                            } return f
                        }, addPlotBand: function (c) { return this.addPlotBandOrLine(c, "plotBands") }, addPlotLine: function (c) { return this.addPlotBandOrLine(c, "plotLines") }, addPlotBandOrLine: function (c, k) { var n = (new x(this, c)).render(), m = this.userOptions; if (n) { if (k) { var f = m[k] || []; f.push(c); m[k] = f } this.plotLinesAndBands.push(n) } return n }, removePlotBandOrLine: function (c) {
                            for (var k =
                                this.plotLinesAndBands, n = this.options, m = this.userOptions, f = k.length; f--;)k[f].id === c && k[f].destroy();[n.plotLines || [], m.plotLines || [], n.plotBands || [], m.plotBands || []].forEach(function (a) { for (f = a.length; f--;)a[f].id === c && D(a, a[f]) })
                        }, removePlotBand: function (c) { this.removePlotBandOrLine(c) }, removePlotLine: function (c) { this.removePlotBandOrLine(c) }
                    }); c.PlotLineOrBand = x; return c.PlotLineOrBand
                }); P(u, "parts/Tooltip.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    var E = g.clamp, q = g.css,
                    y = g.defined, v = g.discardElement, N = g.extend, D = g.format, F = g.isNumber, C = g.isString, k = g.merge, r = g.pick, x = g.splat, m = g.syncTimeout, L = g.timeUnits; ""; var n = c.doc, M = function () {
                        function f(a, d) { this.crosshairs = []; this.distance = 0; this.isHidden = !0; this.isSticky = !1; this.now = {}; this.options = {}; this.outside = !1; this.chart = a; this.init(a, d) } f.prototype.applyFilter = function () {
                            var a = this.chart; a.renderer.definition({
                                tagName: "filter", id: "drop-shadow-" + a.index, opacity: .5, children: [{
                                    tagName: "feGaussianBlur", "in": "SourceAlpha",
                                    stdDeviation: 1
                                }, { tagName: "feOffset", dx: 1, dy: 1 }, { tagName: "feComponentTransfer", children: [{ tagName: "feFuncA", type: "linear", slope: .3 }] }, { tagName: "feMerge", children: [{ tagName: "feMergeNode" }, { tagName: "feMergeNode", "in": "SourceGraphic" }] }]
                            }); a.renderer.definition({ tagName: "style", textContent: ".highcharts-tooltip-" + a.index + "{filter:url(#drop-shadow-" + a.index + ")}" })
                        }; f.prototype.bodyFormatter = function (a) {
                            return a.map(function (a) {
                                var d = a.series.tooltipOptions; return (d[(a.point.formatPrefix || "point") + "Formatter"] ||
                                    a.point.tooltipFormatter).call(a.point, d[(a.point.formatPrefix || "point") + "Format"] || "")
                            })
                        }; f.prototype.cleanSplit = function (a) { this.chart.series.forEach(function (d) { var f = d && d.tt; f && (!f.isActive || a ? d.tt = f.destroy() : f.isActive = !1) }) }; f.prototype.defaultFormatter = function (a) { var d = this.points || x(this); var f = [a.tooltipFooterHeaderFormatter(d[0])]; f = f.concat(a.bodyFormatter(d)); f.push(a.tooltipFooterHeaderFormatter(d[0], !0)); return f }; f.prototype.destroy = function () {
                        this.label && (this.label = this.label.destroy());
                            this.split && this.tt && (this.cleanSplit(this.chart, !0), this.tt = this.tt.destroy()); this.renderer && (this.renderer = this.renderer.destroy(), v(this.container)); g.clearTimeout(this.hideTimer); g.clearTimeout(this.tooltipTimeout)
                        }; f.prototype.getAnchor = function (a, d) {
                            var f = this.chart, e = f.pointer, b = f.inverted, p = f.plotTop, c = f.plotLeft, t = 0, w = 0, k, n; a = x(a); this.followPointer && d ? ("undefined" === typeof d.chartX && (d = e.normalize(d)), a = [d.chartX - c, d.chartY - p]) : a[0].tooltipPos ? a = a[0].tooltipPos : (a.forEach(function (a) {
                                k =
                                a.series.yAxis; n = a.series.xAxis; t += a.plotX + (!b && n ? n.left - c : 0); w += (a.plotLow ? (a.plotLow + a.plotHigh) / 2 : a.plotY) + (!b && k ? k.top - p : 0)
                            }), t /= a.length, w /= a.length, a = [b ? f.plotWidth - w : t, this.shared && !b && 1 < a.length && d ? d.chartY - p : b ? f.plotHeight - t : w]); return a.map(Math.round)
                        }; f.prototype.getDateFormat = function (a, d, f, e) {
                            var b = this.chart.time, h = b.dateFormat("%m-%d %H:%M:%S.%L", d), c = { millisecond: 15, second: 12, minute: 9, hour: 6, day: 3 }, t = "millisecond"; for (w in L) {
                                if (a === L.week && +b.dateFormat("%w", d) === f && "00:00:00.000" ===
                                    h.substr(6)) { var w = "week"; break } if (L[w] > a) { w = t; break } if (c[w] && h.substr(c[w]) !== "01-01 00:00:00.000".substr(c[w])) break; "week" !== w && (t = w)
                            } if (w) var k = b.resolveDTLFormat(e[w]).main; return k
                        }; f.prototype.getLabel = function () {
                            var a, d = this, f = this.chart.renderer, e = this.chart.styledMode, b = this.options, p = "tooltip" + (y(b.className) ? " " + b.className : ""), z = (null === (a = b.style) || void 0 === a ? void 0 : a.pointerEvents) || (!this.followPointer && b.stickOnContact ? "auto" : "none"), t; a = function () { d.inContact = !0 }; var w = function () {
                                var a =
                                    d.chart.hoverSeries; d.inContact = !1; if (a && a.onMouseOut) a.onMouseOut()
                            }; if (!this.label) {
                            this.outside && (this.container = t = c.doc.createElement("div"), t.className = "highcharts-tooltip-container", q(t, { position: "absolute", top: "1px", pointerEvents: z, zIndex: 3 }), c.doc.body.appendChild(t), this.renderer = f = new c.Renderer(t, 0, 0, {}, void 0, void 0, f.styledMode)); this.split ? this.label = f.g(p) : (this.label = f.label("", 0, 0, b.shape || "callout", null, null, b.useHTML, null, p).attr({ padding: b.padding, r: b.borderRadius }), e || this.label.attr({
                                fill: b.backgroundColor,
                                "stroke-width": b.borderWidth
                            }).css(b.style).css({ pointerEvents: z }).shadow(b.shadow)); e && (this.applyFilter(), this.label.addClass("highcharts-tooltip-" + this.chart.index)); if (d.outside && !d.split) { var k = { x: this.label.xSetter, y: this.label.ySetter }; this.label.xSetter = function (a, b) { k[b].call(this.label, d.distance); t.style.left = a + "px" }; this.label.ySetter = function (a, b) { k[b].call(this.label, d.distance); t.style.top = a + "px" } } this.label.on("mouseenter", a).on("mouseleave", w).attr({ zIndex: 8 }).add()
                            } return this.label
                        };
                        f.prototype.getPosition = function (a, d, f) {
                            var e = this.chart, b = this.distance, p = {}, h = e.inverted && f.h || 0, c, w = this.outside, k = w ? n.documentElement.clientWidth - 2 * b : e.chartWidth, m = w ? Math.max(n.body.scrollHeight, n.documentElement.scrollHeight, n.body.offsetHeight, n.documentElement.offsetHeight, n.documentElement.clientHeight) : e.chartHeight, g = e.pointer.getChartPosition(), J = e.containerScaling, x = function (a) { return J ? a * J.scaleX : a }, A = function (a) { return J ? a * J.scaleY : a }, l = function (l) {
                                var h = "x" === l; return [l, h ? k : m, h ? a :
                                    d].concat(w ? [h ? x(a) : A(d), h ? g.left - b + x(f.plotX + e.plotLeft) : g.top - b + A(f.plotY + e.plotTop), 0, h ? k : m] : [h ? a : d, h ? f.plotX + e.plotLeft : f.plotY + e.plotTop, h ? e.plotLeft : e.plotTop, h ? e.plotLeft + e.plotWidth : e.plotTop + e.plotHeight])
                            }, H = l("y"), I = l("x"), q = !this.followPointer && r(f.ttBelow, !e.inverted === !!f.negative), R = function (a, e, d, f, l, c, w) {
                                var t = "y" === a ? A(b) : x(b), z = (d - f) / 2, k = f < l - b, n = l + b + f < e, m = l - t - d + z; l = l + t - z; if (q && n) p[a] = l; else if (!q && k) p[a] = m; else if (k) p[a] = Math.min(w - f, 0 > m - h ? m : m - h); else if (n) p[a] = Math.max(c, l + h + d >
                                    e ? l : l + h); else return !1
                            }, v = function (a, e, d, f, l) { var h; l < b || l > e - b ? h = !1 : p[a] = l < d / 2 ? 1 : l > e - f / 2 ? e - f - 2 : l - d / 2; return h }, M = function (a) { var b = H; H = I; I = b; c = a }, B = function () { !1 !== R.apply(0, H) ? !1 !== v.apply(0, I) || c || (M(!0), B()) : c ? p.x = p.y = 0 : (M(!0), B()) }; (e.inverted || 1 < this.len) && M(); B(); return p
                        }; f.prototype.getXDateFormat = function (a, d, f) { d = d.dateTimeLabelFormats; var e = f && f.closestPointRange; return (e ? this.getDateFormat(e, a.x, f.options.startOfWeek, d) : d.day) || d.year }; f.prototype.hide = function (a) {
                            var d = this; g.clearTimeout(this.hideTimer);
                            a = r(a, this.options.hideDelay, 500); this.isHidden || (this.hideTimer = m(function () { d.getLabel()[a ? "fadeOut" : "hide"](); d.isHidden = !0 }, a))
                        }; f.prototype.init = function (a, d) { this.chart = a; this.options = d; this.crosshairs = []; this.now = { x: 0, y: 0 }; this.isHidden = !0; this.split = d.split && !a.inverted && !a.polar; this.shared = d.shared || this.split; this.outside = r(d.outside, !(!a.scrollablePixelsX && !a.scrollablePixelsY)) }; f.prototype.isStickyOnContact = function () { return !(this.followPointer || !this.options.stickOnContact || !this.inContact) };
                        f.prototype.move = function (a, d, f, e) { var b = this, h = b.now, c = !1 !== b.options.animation && !b.isHidden && (1 < Math.abs(a - h.x) || 1 < Math.abs(d - h.y)), t = b.followPointer || 1 < b.len; N(h, { x: c ? (2 * h.x + a) / 3 : a, y: c ? (h.y + d) / 2 : d, anchorX: t ? void 0 : c ? (2 * h.anchorX + f) / 3 : f, anchorY: t ? void 0 : c ? (h.anchorY + e) / 2 : e }); b.getLabel().attr(h); b.drawTracker(); c && (g.clearTimeout(this.tooltipTimeout), this.tooltipTimeout = setTimeout(function () { b && b.move(a, d, f, e) }, 32)) }; f.prototype.refresh = function (a, d) {
                            var f = this.chart, e = this.options, b = a, p = {}, z = [],
                            t = e.formatter || this.defaultFormatter; p = this.shared; var w = f.styledMode; if (e.enabled) {
                                g.clearTimeout(this.hideTimer); this.followPointer = x(b)[0].series.tooltipOptions.followPointer; var k = this.getAnchor(b, d); d = k[0]; var n = k[1]; !p || b.series && b.series.noSharedTooltip ? p = b.getLabelConfig() : (f.pointer.applyInactiveState(b), b.forEach(function (a) { a.setState("hover"); z.push(a.getLabelConfig()) }), p = { x: b[0].category, y: b[0].y }, p.points = z, b = b[0]); this.len = z.length; f = t.call(p, this); t = b.series; this.distance = r(t.tooltipOptions.distance,
                                    16); !1 === f ? this.hide() : (this.split ? this.renderSplit(f, x(a)) : (a = this.getLabel(), e.style.width && !w || a.css({ width: this.chart.spacingBox.width }), a.attr({ text: f && f.join ? f.join("") : f }), a.removeClass(/highcharts-color-[\d]+/g).addClass("highcharts-color-" + r(b.colorIndex, t.colorIndex)), w || a.attr({ stroke: e.borderColor || b.color || t.color || "#666666" }), this.updatePosition({ plotX: d, plotY: n, negative: b.negative, ttBelow: b.ttBelow, h: k[2] || 0 })), this.isHidden && this.label && this.label.attr({ opacity: 1 }).show(), this.isHidden =
                                        !1); c.fireEvent(this, "refresh")
                            }
                        }; f.prototype.renderSplit = function (a, d) {
                            function f(a, b, e, d, f) { void 0 === f && (f = !0); e ? (b = M ? 0 : y, a = E(a - d / 2, R.left, R.right - d)) : (b -= B, a = f ? a - d - H : a + H, a = E(a, f ? a : R.left, R.right)); return { x: a, y: b } } var e = this, b = e.chart, p = e.chart, z = p.plotHeight, t = p.plotLeft, w = p.plotTop, k = p.pointer, n = p.renderer, m = p.scrollablePixelsY, g = void 0 === m ? 0 : m; m = p.scrollingContainer; m = void 0 === m ? { scrollLeft: 0, scrollTop: 0 } : m; var x = m.scrollLeft, A = m.scrollTop, l = p.styledMode, H = e.distance, I = e.options, q = e.options.positioner,
                                R = { left: x, right: x + p.chartWidth, top: A, bottom: A + p.chartHeight }, v = e.getLabel(), M = !(!b.xAxis[0] || !b.xAxis[0].opposite), B = w + A, L = 0, y = z - g; C(a) && (a = [!1, a]); a = a.slice(0, d.length + 1).reduce(function (a, b, h) {
                                    if (!1 !== b && "" !== b) {
                                        h = d[h - 1] || { isHeader: !0, plotX: d[0].plotX, plotY: z, series: {} }; var p = h.isHeader, c = p ? e : h.series, k = c.tt, m = h.isHeader; var G = h.series; var O = "highcharts-color-" + r(h.colorIndex, G.colorIndex, "none"); k || (k = { padding: I.padding, r: I.borderRadius }, l || (k.fill = I.backgroundColor, k["stroke-width"] = I.borderWidth),
                                            k = n.label("", 0, 0, I[m ? "headerShape" : "shape"] || "callout", void 0, void 0, I.useHTML).addClass((m ? "highcharts-tooltip-header " : "") + "highcharts-tooltip-box " + O).attr(k).add(v)); k.isActive = !0; k.attr({ text: b }); l || k.css(I.style).shadow(I.shadow).attr({ stroke: I.borderColor || h.color || G.color || "#333333" }); b = c.tt = k; m = b.getBBox(); c = m.width + b.strokeWidth(); p && (L = m.height, y += L, M && (B -= L)); G = h.plotX; G = void 0 === G ? 0 : G; O = h.plotY; O = void 0 === O ? 0 : O; var K = h.series; if (h.isHeader) { G = t + G; var x = w + z / 2 } else k = K.xAxis, K = K.yAxis,
                                                G = k.pos + E(G, -H, k.len + H), K.pos + O >= A + w && K.pos + O <= A + w + z - g && (x = K.pos + O); G = E(G, R.left - H, R.right + H); "number" === typeof x ? (m = m.height + 1, O = q ? q.call(e, c, m, h) : f(G, x, p, c), a.push({ align: q ? 0 : void 0, anchorX: G, anchorY: x, boxWidth: c, point: h, rank: r(O.rank, p ? 1 : 0), size: m, target: O.y, tt: b, x: O.x })) : b.isActive = !1
                                    } return a
                                }, []); !q && a.some(function (a) { return a.x < R.left }) && (a = a.map(function (a) { var b = f(a.anchorX, a.anchorY, a.point.isHeader, a.boxWidth, !1); return N(a, { target: b.y, x: b.x }) })); e.cleanSplit(); c.distribute(a, y); a.forEach(function (a) {
                                    var b =
                                        a.pos; a.tt.attr({ visibility: "undefined" === typeof b ? "hidden" : "inherit", x: a.x, y: b + B, anchorX: a.anchorX, anchorY: a.anchorY })
                                }); a = e.container; b = e.renderer; e.outside && a && b && (p = v.getBBox(), b.setSize(p.width + p.x, p.height + p.y, !1), k = k.getChartPosition(), a.style.left = k.left + "px", a.style.top = k.top + "px")
                        }; f.prototype.drawTracker = function () {
                            if (this.followPointer || !this.options.stickOnContact) this.tracker && this.tracker.destroy(); else {
                                var a = this.chart, d = this.label, f = a.hoverPoint; if (d && f) {
                                    var e = { x: 0, y: 0, width: 0, height: 0 };
                                    f = this.getAnchor(f); var b = d.getBBox(); f[0] += a.plotLeft - d.translateX; f[1] += a.plotTop - d.translateY; e.x = Math.min(0, f[0]); e.y = Math.min(0, f[1]); e.width = 0 > f[0] ? Math.max(Math.abs(f[0]), b.width - f[0]) : Math.max(Math.abs(f[0]), b.width); e.height = 0 > f[1] ? Math.max(Math.abs(f[1]), b.height - Math.abs(f[1])) : Math.max(Math.abs(f[1]), b.height); this.tracker ? this.tracker.attr(e) : (this.tracker = d.renderer.rect(e).addClass("highcharts-tracker").add(d), a.styledMode || this.tracker.attr({ fill: "rgba(0,0,0,0)" }))
                                }
                            }
                        }; f.prototype.styledModeFormat =
                            function (a) { return a.replace('style="font-size: 10px"', 'class="highcharts-header"').replace(/style="color:{(point|series)\.color}"/g, 'class="highcharts-color-{$1.colorIndex}"') }; f.prototype.tooltipFooterHeaderFormatter = function (a, d) {
                                var f = d ? "footer" : "header", e = a.series, b = e.tooltipOptions, p = b.xDateFormat, k = e.xAxis, t = k && "datetime" === k.options.type && F(a.key), w = b[f + "Format"]; d = { isFooter: d, labelConfig: a }; c.fireEvent(this, "headerFormatter", d, function (d) {
                                t && !p && (p = this.getXDateFormat(a, b, k)); t && p && (a.point &&
                                    a.point.tooltipDateKeys || ["key"]).forEach(function (a) { w = w.replace("{point." + a + "}", "{point." + a + ":" + p + "}") }); e.chart.styledMode && (w = this.styledModeFormat(w)); d.text = D(w, { point: a, series: e }, this.chart)
                                }); return d.text
                            }; f.prototype.update = function (a) { this.destroy(); k(!0, this.chart.options.tooltip.userOptions, a); this.init(this.chart, k(!0, this.options, a)) }; f.prototype.updatePosition = function (a) {
                                var d = this.chart, f = d.pointer, e = this.getLabel(), b = a.plotX + d.plotLeft, p = a.plotY + d.plotTop; f = f.getChartPosition();
                                a = (this.options.positioner || this.getPosition).call(this, e.width, e.height, a); if (this.outside) { var c = (this.options.borderWidth || 0) + 2 * this.distance; this.renderer.setSize(e.width + c, e.height + c, !1); if (d = d.containerScaling) q(this.container, { transform: "scale(" + d.scaleX + ", " + d.scaleY + ")" }), b *= d.scaleX, p *= d.scaleY; b += f.left - a.x; p += f.top - a.y } this.move(Math.round(a.x), Math.round(a.y || 0), b, p)
                            }; return f
                    }(); c.Tooltip = M; return c.Tooltip
                }); P(u, "parts/Pointer.js", [u["parts/Globals.js"], u["parts/Utilities.js"], u["parts/Tooltip.js"],
                u["parts/Color.js"]], function (c, g, E, q) {
                    var y = g.addEvent, v = g.attr, N = g.css, D = g.defined, F = g.extend, C = g.find, k = g.fireEvent, r = g.isNumber, x = g.isObject, m = g.objectEach, L = g.offset, n = g.pick, M = g.splat, f = q.parse, a = c.charts, d = c.noop; g = function () {
                        function h(a, b) { this.lastValidTouch = {}; this.pinchDown = []; this.runChartClick = !1; this.chart = a; this.hasDragged = !1; this.options = b; this.unbindContainerMouseLeave = function () { }; this.init(a, b) } h.prototype.applyInactiveState = function (a) {
                            var b = [], e; (a || []).forEach(function (a) {
                                e =
                                a.series; b.push(e); e.linkedParent && b.push(e.linkedParent); e.linkedSeries && (b = b.concat(e.linkedSeries)); e.navigatorSeries && b.push(e.navigatorSeries)
                            }); this.chart.series.forEach(function (a) { -1 === b.indexOf(a) ? a.setState("inactive", !0) : a.options.inactiveOtherPoints && a.setAllPointsToState("inactive") })
                        }; h.prototype.destroy = function () {
                            var a = this; "undefined" !== typeof a.unDocMouseMove && a.unDocMouseMove(); this.unbindContainerMouseLeave(); c.chartCount || (c.unbindDocumentMouseUp && (c.unbindDocumentMouseUp = c.unbindDocumentMouseUp()),
                                c.unbindDocumentTouchEnd && (c.unbindDocumentTouchEnd = c.unbindDocumentTouchEnd())); clearInterval(a.tooltipTimeout); m(a, function (b, e) { a[e] = null })
                        }; h.prototype.drag = function (a) {
                            var b = this.chart, e = b.options.chart, d = a.chartX, h = a.chartY, c = this.zoomHor, k = this.zoomVert, n = b.plotLeft, m = b.plotTop, r = b.plotWidth, g = b.plotHeight, A = this.selectionMarker, l = this.mouseDownX || 0, H = this.mouseDownY || 0, I = x(e.panning) ? e.panning && e.panning.enabled : e.panning, q = e.panKey && a[e.panKey + "Key"]; if (!A || !A.touch) if (d < n ? d = n : d > n + r && (d =
                                n + r), h < m ? h = m : h > m + g && (h = m + g), this.hasDragged = Math.sqrt(Math.pow(l - d, 2) + Math.pow(H - h, 2)), 10 < this.hasDragged) {
                                    var R = b.isInsidePlot(l - n, H - m); b.hasCartesianSeries && (this.zoomX || this.zoomY) && R && !q && !A && (this.selectionMarker = A = b.renderer.rect(n, m, c ? 1 : r, k ? 1 : g, 0).attr({ "class": "highcharts-selection-marker", zIndex: 7 }).add(), b.styledMode || A.attr({ fill: e.selectionMarkerFill || f("#335cad").setOpacity(.25).get() })); A && c && (d -= l, A.attr({ width: Math.abs(d), x: (0 < d ? 0 : d) + l })); A && k && (d = h - H, A.attr({
                                        height: Math.abs(d), y: (0 <
                                            d ? 0 : d) + H
                                    })); R && !A && I && b.pan(a, e.panning)
                            }
                        }; h.prototype.dragStart = function (a) { var b = this.chart; b.mouseIsDown = a.type; b.cancelClick = !1; b.mouseDownX = this.mouseDownX = a.chartX; b.mouseDownY = this.mouseDownY = a.chartY }; h.prototype.drop = function (a) {
                            var b = this, e = this.chart, d = this.hasPinched; if (this.selectionMarker) {
                                var f = { originalEvent: a, xAxis: [], yAxis: [] }, h = this.selectionMarker, c = h.attr ? h.attr("x") : h.x, n = h.attr ? h.attr("y") : h.y, m = h.attr ? h.attr("width") : h.width, g = h.attr ? h.attr("height") : h.height, x; if (this.hasDragged ||
                                    d) e.axes.forEach(function (e) { if (e.zoomEnabled && D(e.min) && (d || b[{ xAxis: "zoomX", yAxis: "zoomY" }[e.coll]])) { var l = e.horiz, h = "touchend" === a.type ? e.minPixelPadding : 0, p = e.toValue((l ? c : n) + h); l = e.toValue((l ? c + m : n + g) - h); f[e.coll].push({ axis: e, min: Math.min(p, l), max: Math.max(p, l) }); x = !0 } }), x && k(e, "selection", f, function (a) { e.zoom(F(a, d ? { animation: !1 } : null)) }); r(e.index) && (this.selectionMarker = this.selectionMarker.destroy()); d && this.scaleGroups()
                            } e && r(e.index) && (N(e.container, { cursor: e._cursor }), e.cancelClick =
                                10 < this.hasDragged, e.mouseIsDown = this.hasDragged = this.hasPinched = !1, this.pinchDown = [])
                        }; h.prototype.findNearestKDPoint = function (a, b, d) {
                            var e = this.chart, f = e.hoverPoint; e = e.tooltip; if (f && e && e.isStickyOnContact()) return f; var h; a.forEach(function (a) {
                                var e = !(a.noSharedTooltip && b) && 0 > a.options.findNearestPointBy.indexOf("y"); a = a.searchPoint(d, e); if ((e = x(a, !0)) && !(e = !x(h, !0))) {
                                    e = h.distX - a.distX; var f = h.dist - a.dist, p = (a.series.group && a.series.group.zIndex) - (h.series.group && h.series.group.zIndex); e = 0 < (0 !==
                                        e && b ? e : 0 !== f ? f : 0 !== p ? p : h.series.index > a.series.index ? -1 : 1)
                                } e && (h = a)
                            }); return h
                        }; h.prototype.getChartCoordinatesFromPoint = function (a, b) { var e = a.series, d = e.xAxis; e = e.yAxis; var f = n(a.clientX, a.plotX), h = a.shapeArgs; if (d && e) return b ? { chartX: d.len + d.pos - f, chartY: e.len + e.pos - a.plotY } : { chartX: f + d.pos, chartY: a.plotY + e.pos }; if (h && h.x && h.y) return { chartX: h.x, chartY: h.y } }; h.prototype.getChartPosition = function () { return this.chartPosition || (this.chartPosition = L(this.chart.container)) }; h.prototype.getCoordinates =
                            function (a) { var b = { xAxis: [], yAxis: [] }; this.chart.axes.forEach(function (e) { b[e.isXAxis ? "xAxis" : "yAxis"].push({ axis: e, value: e.toValue(a[e.horiz ? "chartX" : "chartY"]) }) }); return b }; h.prototype.getHoverData = function (a, b, d, f, h, c) {
                                var e, p = []; f = !(!f || !a); var t = b && !b.stickyTracking, w = { chartX: c ? c.chartX : void 0, chartY: c ? c.chartY : void 0, shared: h }; k(this, "beforeGetHoverData", w); t = t ? [b] : d.filter(function (a) { return w.filter ? w.filter(a) : a.visible && !(!h && a.directTouch) && n(a.options.enableMouseTracking, !0) && a.stickyTracking });
                                b = (e = f || !c ? a : this.findNearestKDPoint(t, h, c)) && e.series; e && (h && !b.noSharedTooltip ? (t = d.filter(function (a) { return w.filter ? w.filter(a) : a.visible && !(!h && a.directTouch) && n(a.options.enableMouseTracking, !0) && !a.noSharedTooltip }), t.forEach(function (a) { var b = C(a.points, function (a) { return a.x === e.x && !a.isNull }); x(b) && (a.chart.isBoosting && (b = a.getPoint(b)), p.push(b)) })) : p.push(e)); w = { hoverPoint: e }; k(this, "afterGetHoverData", w); return { hoverPoint: w.hoverPoint, hoverSeries: b, hoverPoints: p }
                            }; h.prototype.getPointFromEvent =
                                function (a) { a = a.target; for (var b; a && !b;)b = a.point, a = a.parentNode; return b }; h.prototype.onTrackerMouseOut = function (a) { var b = this.chart.hoverSeries; a = a.relatedTarget || a.toElement; this.isDirectTouch = !1; if (!(!b || !a || b.stickyTracking || this.inClass(a, "highcharts-tooltip") || this.inClass(a, "highcharts-series-" + b.index) && this.inClass(a, "highcharts-tracker"))) b.onMouseOut() }; h.prototype.inClass = function (a, b) {
                                    for (var e; a;) {
                                        if (e = v(a, "class")) { if (-1 !== e.indexOf(b)) return !0; if (-1 !== e.indexOf("highcharts-container")) return !1 } a =
                                            a.parentNode
                                    }
                                }; h.prototype.init = function (a, b) { this.options = b; this.chart = a; this.runChartClick = b.chart.events && !!b.chart.events.click; this.pinchDown = []; this.lastValidTouch = {}; E && (a.tooltip = new E(a, b.tooltip), this.followTouchMove = n(b.tooltip.followTouchMove, !0)); this.setDOMEvents() }; h.prototype.normalize = function (a, b) {
                                    var e = a.touches, d = e ? e.length ? e.item(0) : e.changedTouches[0] : a; b || (b = this.getChartPosition()); e = d.pageX - b.left; b = d.pageY - b.top; if (d = this.chart.containerScaling) e /= d.scaleX, b /= d.scaleY; return F(a,
                                        { chartX: Math.round(e), chartY: Math.round(b) })
                                }; h.prototype.onContainerClick = function (a) { var b = this.chart, e = b.hoverPoint, d = b.plotLeft, f = b.plotTop; a = this.normalize(a); b.cancelClick || (e && this.inClass(a.target, "highcharts-tracker") ? (k(e.series, "click", F(a, { point: e })), b.hoverPoint && e.firePointEvent("click", a)) : (F(a, this.getCoordinates(a)), b.isInsidePlot(a.chartX - d, a.chartY - f) && k(b, "click", a))) }; h.prototype.onContainerMouseDown = function (a) {
                                    a = this.normalize(a); 2 !== a.button && (this.zoomOption(a), a.preventDefault &&
                                        a.preventDefault(), this.dragStart(a))
                                }; h.prototype.onContainerMouseLeave = function (e) { var b = a[c.hoverChartIndex]; b && (e.relatedTarget || e.toElement) && (b.pointer.reset(), b.pointer.chartPosition = void 0) }; h.prototype.onContainerMouseMove = function (e) {
                                    var b = this.chart; D(c.hoverChartIndex) && a[c.hoverChartIndex] && a[c.hoverChartIndex].mouseIsDown || (c.hoverChartIndex = b.index); e = this.normalize(e); e.preventDefault || (e.returnValue = !1); "mousedown" === b.mouseIsDown && this.drag(e); b.openMenu || !this.inClass(e.target,
                                        "highcharts-tracker") && !b.isInsidePlot(e.chartX - b.plotLeft, e.chartY - b.plotTop) || this.runPointActions(e)
                                }; h.prototype.onDocumentTouchEnd = function (e) { a[c.hoverChartIndex] && a[c.hoverChartIndex].pointer.drop(e) }; h.prototype.onContainerTouchMove = function (a) { this.touch(a) }; h.prototype.onContainerTouchStart = function (a) { this.zoomOption(a); this.touch(a, !0) }; h.prototype.onDocumentMouseMove = function (a) {
                                    var b = this.chart, e = this.chartPosition, d = b.tooltip; a = this.normalize(a, e); !e || d && d.isStickyOnContact() || b.isInsidePlot(a.chartX -
                                        b.plotLeft, a.chartY - b.plotTop) || this.inClass(a.target, "highcharts-tracker") || this.reset()
                                }; h.prototype.onDocumentMouseUp = function (e) { a[c.hoverChartIndex] && a[c.hoverChartIndex].pointer.drop(e) }; h.prototype.pinch = function (a) {
                                    var b = this, e = b.chart, f = b.pinchDown, h = a.touches || [], c = h.length, k = b.lastValidTouch, m = b.hasZoom, r = b.selectionMarker, g = {}, x = 1 === c && (b.inClass(a.target, "highcharts-tracker") && e.runTrackerClick || b.runChartClick), A = {}; 1 < c && (b.initiated = !0); m && b.initiated && !x && a.preventDefault();[].map.call(h,
                                        function (a) { return b.normalize(a) }); "touchstart" === a.type ? ([].forEach.call(h, function (a, b) { f[b] = { chartX: a.chartX, chartY: a.chartY } }), k.x = [f[0].chartX, f[1] && f[1].chartX], k.y = [f[0].chartY, f[1] && f[1].chartY], e.axes.forEach(function (a) {
                                            if (a.zoomEnabled) {
                                                var b = e.bounds[a.horiz ? "h" : "v"], d = a.minPixelPadding, f = a.toPixels(Math.min(n(a.options.min, a.dataMin), a.dataMin)), l = a.toPixels(Math.max(n(a.options.max, a.dataMax), a.dataMax)), h = Math.max(f, l); b.min = Math.min(a.pos, Math.min(f, l) - d); b.max = Math.max(a.pos + a.len,
                                                    h + d)
                                            }
                                        }), b.res = !0) : b.followTouchMove && 1 === c ? this.runPointActions(b.normalize(a)) : f.length && (r || (b.selectionMarker = r = F({ destroy: d, touch: !0 }, e.plotBox)), b.pinchTranslate(f, h, g, r, A, k), b.hasPinched = m, b.scaleGroups(g, A), b.res && (b.res = !1, this.reset(!1, 0)))
                                }; h.prototype.pinchTranslate = function (a, b, d, f, h, c) { this.zoomHor && this.pinchTranslateDirection(!0, a, b, d, f, h, c); this.zoomVert && this.pinchTranslateDirection(!1, a, b, d, f, h, c) }; h.prototype.pinchTranslateDirection = function (a, b, d, f, h, c, k, n) {
                                    var e = this.chart, p =
                                        a ? "x" : "y", t = a ? "X" : "Y", w = "chart" + t, l = a ? "width" : "height", z = e["plot" + (a ? "Left" : "Top")], m, r, g = n || 1, G = e.inverted, K = e.bounds[a ? "h" : "v"], B = 1 === b.length, x = b[0][w], q = d[0][w], v = !B && b[1][w], O = !B && d[1][w]; d = function () { "number" === typeof O && 20 < Math.abs(x - v) && (g = n || Math.abs(q - O) / Math.abs(x - v)); r = (z - q) / g + x; m = e["plot" + (a ? "Width" : "Height")] / g }; d(); b = r; if (b < K.min) { b = K.min; var T = !0 } else b + m > K.max && (b = K.max - m, T = !0); T ? (q -= .8 * (q - k[p][0]), "number" === typeof O && (O -= .8 * (O - k[p][1])), d()) : k[p] = [q, O]; G || (c[p] = r - z, c[l] = m); c = G ?
                                            1 / g : g; h[l] = m; h[p] = b; f[G ? a ? "scaleY" : "scaleX" : "scale" + t] = g; f["translate" + t] = c * z + (q - c * x)
                                }; h.prototype.reset = function (a, b) {
                                    var e = this.chart, d = e.hoverSeries, f = e.hoverPoint, h = e.hoverPoints, c = e.tooltip, k = c && c.shared ? h : f; a && k && M(k).forEach(function (b) { b.series.isCartesian && "undefined" === typeof b.plotX && (a = !1) }); if (a) c && k && M(k).length && (c.refresh(k), c.shared && h ? h.forEach(function (a) {
                                        a.setState(a.state, !0); a.series.isCartesian && (a.series.xAxis.crosshair && a.series.xAxis.drawCrosshair(null, a), a.series.yAxis.crosshair &&
                                            a.series.yAxis.drawCrosshair(null, a))
                                    }) : f && (f.setState(f.state, !0), e.axes.forEach(function (a) { a.crosshair && f.series[a.coll] === a && a.drawCrosshair(null, f) }))); else { if (f) f.onMouseOut(); h && h.forEach(function (a) { a.setState() }); if (d) d.onMouseOut(); c && c.hide(b); this.unDocMouseMove && (this.unDocMouseMove = this.unDocMouseMove()); e.axes.forEach(function (a) { a.hideCrosshair() }); this.hoverX = e.hoverPoints = e.hoverPoint = null }
                                }; h.prototype.runPointActions = function (e, b) {
                                    var d = this.chart, f = d.tooltip && d.tooltip.options.enabled ?
                                        d.tooltip : void 0, h = f ? f.shared : !1, k = b || d.hoverPoint, m = k && k.series || d.hoverSeries; m = this.getHoverData(k, m, d.series, (!e || "touchmove" !== e.type) && (!!b || m && m.directTouch && this.isDirectTouch), h, e); k = m.hoverPoint; var r = m.hoverPoints; b = (m = m.hoverSeries) && m.tooltipOptions.followPointer; h = h && m && !m.noSharedTooltip; if (k && (k !== d.hoverPoint || f && f.isHidden)) {
                                            (d.hoverPoints || []).forEach(function (a) { -1 === r.indexOf(a) && a.setState() }); if (d.hoverSeries !== m) m.onMouseOver(); this.applyInactiveState(r); (r || []).forEach(function (a) { a.setState("hover") });
                                            d.hoverPoint && d.hoverPoint.firePointEvent("mouseOut"); if (!k.series) return; k.firePointEvent("mouseOver"); d.hoverPoints = r; d.hoverPoint = k; f && f.refresh(h ? r : k, e)
                                        } else b && f && !f.isHidden && (k = f.getAnchor([{}], e), f.updatePosition({ plotX: k[0], plotY: k[1] })); this.unDocMouseMove || (this.unDocMouseMove = y(d.container.ownerDocument, "mousemove", function (b) { var e = a[c.hoverChartIndex]; if (e) e.pointer.onDocumentMouseMove(b) })); d.axes.forEach(function (a) {
                                            var b = n(a.crosshair.snap, !0), d = b ? C(r, function (b) {
                                                return b.series[a.coll] ===
                                                    a
                                            }) : void 0; d || !b ? a.drawCrosshair(e, d) : a.hideCrosshair()
                                        })
                                }; h.prototype.scaleGroups = function (a, b) { var e = this.chart, d; e.series.forEach(function (f) { d = a || f.getPlotBox(); f.xAxis && f.xAxis.zoomEnabled && f.group && (f.group.attr(d), f.markerGroup && (f.markerGroup.attr(d), f.markerGroup.clip(b ? e.clipRect : null)), f.dataLabelsGroup && f.dataLabelsGroup.attr(d)) }); e.clipRect.attr(b || e.clipBox) }; h.prototype.setDOMEvents = function () {
                                    var a = this, b = a.chart.container, d = b.ownerDocument; b.onmousedown = function (b) { a.onContainerMouseDown(b) };
                                    b.onmousemove = function (b) { a.onContainerMouseMove(b) }; b.onclick = function (b) { a.onContainerClick(b) }; this.unbindContainerMouseLeave = y(b, "mouseleave", a.onContainerMouseLeave); c.unbindDocumentMouseUp || (c.unbindDocumentMouseUp = y(d, "mouseup", a.onDocumentMouseUp)); c.hasTouch && (y(b, "touchstart", function (b) { a.onContainerTouchStart(b) }), y(b, "touchmove", function (b) { a.onContainerTouchMove(b) }), c.unbindDocumentTouchEnd || (c.unbindDocumentTouchEnd = y(d, "touchend", a.onDocumentTouchEnd)))
                                }; h.prototype.touch = function (a,
                                    b) { var e = this.chart, d; if (e.index !== c.hoverChartIndex) this.onContainerMouseLeave({ relatedTarget: !0 }); c.hoverChartIndex = e.index; if (1 === a.touches.length) if (a = this.normalize(a), (d = e.isInsidePlot(a.chartX - e.plotLeft, a.chartY - e.plotTop)) && !e.openMenu) { b && this.runPointActions(a); if ("touchmove" === a.type) { b = this.pinchDown; var f = b[0] ? 4 <= Math.sqrt(Math.pow(b[0].chartX - a.chartX, 2) + Math.pow(b[0].chartY - a.chartY, 2)) : !1 } n(f, !0) && this.pinch(a) } else b && this.reset(); else 2 === a.touches.length && this.pinch(a) }; h.prototype.zoomOption =
                                        function (a) { var b = this.chart, e = b.options.chart, d = e.zoomType || ""; b = b.inverted; /touch/.test(a.type) && (d = n(e.pinchType, d)); this.zoomX = a = /x/.test(d); this.zoomY = d = /y/.test(d); this.zoomHor = a && !b || d && b; this.zoomVert = d && !b || a && b; this.hasZoom = a || d }; return h
                    }(); c.Pointer = g; return c.Pointer
                }); P(u, "parts/MSPointer.js", [u["parts/Globals.js"], u["parts/Pointer.js"], u["parts/Utilities.js"]], function (c, g, E) {
                    function q() {
                        var c = []; c.item = function (c) { return this[c] }; F(m, function (k) {
                            c.push({
                                pageX: k.pageX, pageY: k.pageY,
                                target: k.target
                            })
                        }); return c
                    } function y(n, m, f, a) { "touch" !== n.pointerType && n.pointerType !== n.MSPOINTER_TYPE_TOUCH || !k[c.hoverChartIndex] || (a(n), a = k[c.hoverChartIndex].pointer, a[m]({ type: f, target: n.currentTarget, preventDefault: x, touches: q() })) } var v = this && this.__extends || function () {
                        var c = function (k, f) { c = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function (a, d) { a.__proto__ = d } || function (a, d) { for (var f in d) d.hasOwnProperty(f) && (a[f] = d[f]) }; return c(k, f) }; return function (k, f) {
                            function a() {
                            this.constructor =
                                k
                            } c(k, f); k.prototype = null === f ? Object.create(f) : (a.prototype = f.prototype, new a)
                        }
                    }(), N = E.addEvent, D = E.css, F = E.objectEach, C = E.removeEvent, k = c.charts, r = c.doc, x = c.noop, m = {}, L = !!c.win.PointerEvent; return function (c) {
                        function k() { return null !== c && c.apply(this, arguments) || this } v(k, c); k.prototype.batchMSEvents = function (f) {
                            f(this.chart.container, L ? "pointerdown" : "MSPointerDown", this.onContainerPointerDown); f(this.chart.container, L ? "pointermove" : "MSPointerMove", this.onContainerPointerMove); f(r, L ? "pointerup" :
                                "MSPointerUp", this.onDocumentPointerUp)
                        }; k.prototype.destroy = function () { this.batchMSEvents(C); c.prototype.destroy.call(this) }; k.prototype.init = function (f, a) { c.prototype.init.call(this, f, a); this.hasZoom && D(f.container, { "-ms-touch-action": "none", "touch-action": "none" }) }; k.prototype.onContainerPointerDown = function (f) { y(f, "onContainerTouchStart", "touchstart", function (a) { m[a.pointerId] = { pageX: a.pageX, pageY: a.pageY, target: a.currentTarget } }) }; k.prototype.onContainerPointerMove = function (f) {
                            y(f, "onContainerTouchMove",
                                "touchmove", function (a) { m[a.pointerId] = { pageX: a.pageX, pageY: a.pageY }; m[a.pointerId].target || (m[a.pointerId].target = a.currentTarget) })
                        }; k.prototype.onDocumentPointerUp = function (f) { y(f, "onDocumentTouchEnd", "touchend", function (a) { delete m[a.pointerId] }) }; k.prototype.setDOMEvents = function () { c.prototype.setDOMEvents.call(this); (this.hasZoom || this.followTouchMove) && this.batchMSEvents(N) }; return k
                    }(g)
                }); P(u, "parts/Legend.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    var E = g.addEvent,
                    q = g.css, y = g.defined, v = g.discardElement, N = g.find, D = g.fireEvent, F = g.format, C = g.isNumber, k = g.merge, r = g.pick, x = g.relativeLength, m = g.setAnimation, L = g.stableSort, n = g.syncTimeout; g = g.wrap; var M = c.isFirefox, f = c.marginNames, a = c.win, d = function () {
                        function a(a, b) {
                        this.allItems = []; this.contentGroup = this.box = void 0; this.display = !1; this.group = void 0; this.offsetWidth = this.maxLegendWidth = this.maxItemWidth = this.legendWidth = this.legendHeight = this.lastLineHeight = this.lastItemY = this.itemY = this.itemX = this.itemMarginTop =
                            this.itemMarginBottom = this.itemHeight = this.initialItemY = 0; this.options = {}; this.padding = 0; this.pages = []; this.proximate = !1; this.scrollGroup = void 0; this.widthOption = this.totalItemWidth = this.titleHeight = this.symbolWidth = this.symbolHeight = 0; this.chart = a; this.init(a, b)
                        } a.prototype.init = function (a, b) {
                        this.chart = a; this.setOptions(b); b.enabled && (this.render(), E(this.chart, "endResize", function () { this.legend.positionCheckboxes() }), this.proximate ? this.unchartrender = E(this.chart, "render", function () {
                            this.legend.proximatePositions();
                            this.legend.positionItems()
                        }) : this.unchartrender && this.unchartrender())
                        }; a.prototype.setOptions = function (a) { var b = r(a.padding, 8); this.options = a; this.chart.styledMode || (this.itemStyle = a.itemStyle, this.itemHiddenStyle = k(this.itemStyle, a.itemHiddenStyle)); this.itemMarginTop = a.itemMarginTop || 0; this.itemMarginBottom = a.itemMarginBottom || 0; this.padding = b; this.initialItemY = b - 5; this.symbolWidth = r(a.symbolWidth, 16); this.pages = []; this.proximate = "proximate" === a.layout && !this.chart.inverted; this.baseline = void 0 };
                        a.prototype.update = function (a, b) { var e = this.chart; this.setOptions(k(!0, this.options, a)); this.destroy(); e.isDirtyLegend = e.isDirtyBox = !0; r(b, !0) && e.redraw(); D(this, "afterUpdate") }; a.prototype.colorizeItem = function (a, b) {
                        a.legendGroup[b ? "removeClass" : "addClass"]("highcharts-legend-item-hidden"); if (!this.chart.styledMode) {
                            var e = this.options, d = a.legendItem, f = a.legendLine, h = a.legendSymbol, c = this.itemHiddenStyle.color; e = b ? e.itemStyle.color : c; var k = b ? a.color || c : c, n = a.options && a.options.marker, m = { fill: k }; d &&
                                d.css({ fill: e, color: e }); f && f.attr({ stroke: k }); h && (n && h.isMarker && (m = a.pointAttribs(), b || (m.stroke = m.fill = c)), h.attr(m))
                        } D(this, "afterColorizeItem", { item: a, visible: b })
                        }; a.prototype.positionItems = function () { this.allItems.forEach(this.positionItem, this); this.chart.isResizing || this.positionCheckboxes() }; a.prototype.positionItem = function (a) {
                            var b = this.options, e = b.symbolPadding; b = !b.rtl; var d = a._legendItemPos, f = d[0]; d = d[1]; var h = a.checkbox; if ((a = a.legendGroup) && a.element) a[y(a.translateY) ? "animate" : "attr"]({
                                translateX: b ?
                                    f : this.legendWidth - f - 2 * e - 4, translateY: d
                            }); h && (h.x = f, h.y = d)
                        }; a.prototype.destroyItem = function (a) { var b = a.checkbox;["legendItem", "legendLine", "legendSymbol", "legendGroup"].forEach(function (b) { a[b] && (a[b] = a[b].destroy()) }); b && v(a.checkbox) }; a.prototype.destroy = function () { function a(a) { this[a] && (this[a] = this[a].destroy()) } this.getAllItems().forEach(function (b) { ["legendItem", "legendGroup"].forEach(a, b) }); "clipRect up down pager nav box title group".split(" ").forEach(a, this); this.display = null }; a.prototype.positionCheckboxes =
                            function () { var a = this.group && this.group.alignAttr, b = this.clipHeight || this.legendHeight, d = this.titleHeight; if (a) { var f = a.translateY; this.allItems.forEach(function (e) { var h = e.checkbox; if (h) { var c = f + d + h.y + (this.scrollOffset || 0) + 3; q(h, { left: a.translateX + e.checkboxOffset + h.x - 20 + "px", top: c + "px", display: this.proximate || c > f - 6 && c < f + b - 6 ? "" : "none" }) } }, this) } }; a.prototype.renderTitle = function () {
                                var a = this.options, b = this.padding, d = a.title, f = 0; d.text && (this.title || (this.title = this.chart.renderer.label(d.text, b -
                                    3, b - 4, null, null, null, a.useHTML, null, "legend-title").attr({ zIndex: 1 }), this.chart.styledMode || this.title.css(d.style), this.title.add(this.group)), d.width || this.title.css({ width: this.maxLegendWidth + "px" }), a = this.title.getBBox(), f = a.height, this.offsetWidth = a.width, this.contentGroup.attr({ translateY: f })); this.titleHeight = f
                            }; a.prototype.setText = function (a) { var b = this.options; a.legendItem.attr({ text: b.labelFormat ? F(b.labelFormat, a, this.chart) : b.labelFormatter.call(a) }) }; a.prototype.renderItem = function (a) {
                                var b =
                                    this.chart, d = b.renderer, e = this.options, f = this.symbolWidth, h = e.symbolPadding, c = this.itemStyle, n = this.itemHiddenStyle, m = "horizontal" === e.layout ? r(e.itemDistance, 20) : 0, g = !e.rtl, x = a.legendItem, A = !a.series, l = !A && a.series.drawLegendSymbol ? a.series : a, H = l.options; H = this.createCheckboxForItem && H && H.showCheckbox; m = f + h + m + (H ? 20 : 0); var I = e.useHTML, q = a.options.className; x || (a.legendGroup = d.g("legend-item").addClass("highcharts-" + l.type + "-series highcharts-color-" + a.colorIndex + (q ? " " + q : "") + (A ? " highcharts-series-" +
                                        a.index : "")).attr({ zIndex: 1 }).add(this.scrollGroup), a.legendItem = x = d.text("", g ? f + h : -h, this.baseline || 0, I), b.styledMode || x.css(k(a.visible ? c : n)), x.attr({ align: g ? "left" : "right", zIndex: 2 }).add(a.legendGroup), this.baseline || (this.fontMetrics = d.fontMetrics(b.styledMode ? 12 : c.fontSize, x), this.baseline = this.fontMetrics.f + 3 + this.itemMarginTop, x.attr("y", this.baseline)), this.symbolHeight = e.symbolHeight || this.fontMetrics.f, l.drawLegendSymbol(this, a), this.setItemEvents && this.setItemEvents(a, x, I)); H && !a.checkbox &&
                                            this.createCheckboxForItem && this.createCheckboxForItem(a); this.colorizeItem(a, a.visible); !b.styledMode && c.width || x.css({ width: (e.itemWidth || this.widthOption || b.spacingBox.width) - m }); this.setText(a); b = x.getBBox(); a.itemWidth = a.checkboxOffset = e.itemWidth || a.legendItemWidth || b.width + m; this.maxItemWidth = Math.max(this.maxItemWidth, a.itemWidth); this.totalItemWidth += a.itemWidth; this.itemHeight = a.itemHeight = Math.round(a.legendItemHeight || b.height || this.symbolHeight)
                            }; a.prototype.layoutItem = function (a) {
                                var b =
                                    this.options, d = this.padding, e = "horizontal" === b.layout, f = a.itemHeight, h = this.itemMarginBottom, c = this.itemMarginTop, k = e ? r(b.itemDistance, 20) : 0, n = this.maxLegendWidth; b = b.alignColumns && this.totalItemWidth > n ? this.maxItemWidth : a.itemWidth; e && this.itemX - d + b > n && (this.itemX = d, this.lastLineHeight && (this.itemY += c + this.lastLineHeight + h), this.lastLineHeight = 0); this.lastItemY = c + this.itemY + h; this.lastLineHeight = Math.max(f, this.lastLineHeight); a._legendItemPos = [this.itemX, this.itemY]; e ? this.itemX += b : (this.itemY +=
                                        c + f + h, this.lastLineHeight = f); this.offsetWidth = this.widthOption || Math.max((e ? this.itemX - d - (a.checkbox ? 0 : k) : b) + d, this.offsetWidth)
                            }; a.prototype.getAllItems = function () { var a = []; this.chart.series.forEach(function (b) { var d = b && b.options; b && r(d.showInLegend, y(d.linkedTo) ? !1 : void 0, !0) && (a = a.concat(b.legendItems || ("point" === d.legendType ? b.data : b))) }); D(this, "afterGetAllItems", { allItems: a }); return a }; a.prototype.getAlignment = function () {
                                var a = this.options; return this.proximate ? a.align.charAt(0) + "tv" : a.floating ?
                                    "" : a.align.charAt(0) + a.verticalAlign.charAt(0) + a.layout.charAt(0)
                            }; a.prototype.adjustMargins = function (a, b) { var d = this.chart, e = this.options, h = this.getAlignment(); h && [/(lth|ct|rth)/, /(rtv|rm|rbv)/, /(rbh|cb|lbh)/, /(lbv|lm|ltv)/].forEach(function (c, p) { c.test(h) && !y(a[p]) && (d[f[p]] = Math.max(d[f[p]], d.legend[(p + 1) % 2 ? "legendHeight" : "legendWidth"] + [1, -1, -1, 1][p] * e[p % 2 ? "x" : "y"] + r(e.margin, 12) + b[p] + (d.titleOffset[p] || 0))) }) }; a.prototype.proximatePositions = function () {
                                var a = this.chart, b = [], d = "left" === this.options.align;
                                this.allItems.forEach(function (e) { var f = d; if (e.yAxis && e.points) { e.xAxis.options.reversed && (f = !f); var h = N(f ? e.points : e.points.slice(0).reverse(), function (a) { return C(a.plotY) }); f = this.itemMarginTop + e.legendItem.getBBox().height + this.itemMarginBottom; var c = e.yAxis.top - a.plotTop; e.visible ? (h = h ? h.plotY : e.yAxis.height, h += c - .3 * f) : h = c + e.yAxis.height; b.push({ target: h, size: f, item: e }) } }, this); c.distribute(b, a.plotHeight); b.forEach(function (b) { b.item._legendItemPos[1] = a.plotTop - a.spacing[0] + b.pos })
                            }; a.prototype.render =
                                function () {
                                    var a = this.chart, b = a.renderer, d = this.group, f, h = this.box, c = this.options, n = this.padding; this.itemX = n; this.itemY = this.initialItemY; this.lastItemY = this.offsetWidth = 0; this.widthOption = x(c.width, a.spacingBox.width - n); var m = a.spacingBox.width - 2 * n - c.x; -1 < ["rm", "lm"].indexOf(this.getAlignment().substring(0, 2)) && (m /= 2); this.maxLegendWidth = this.widthOption || m; d || (this.group = d = b.g("legend").attr({ zIndex: 7 }).add(), this.contentGroup = b.g().attr({ zIndex: 1 }).add(d), this.scrollGroup = b.g().add(this.contentGroup));
                                    this.renderTitle(); m = this.getAllItems(); L(m, function (a, b) { return (a.options && a.options.legendIndex || 0) - (b.options && b.options.legendIndex || 0) }); c.reversed && m.reverse(); this.allItems = m; this.display = f = !!m.length; this.itemHeight = this.totalItemWidth = this.maxItemWidth = this.lastLineHeight = 0; m.forEach(this.renderItem, this); m.forEach(this.layoutItem, this); m = (this.widthOption || this.offsetWidth) + n; var r = this.lastItemY + this.lastLineHeight + this.titleHeight; r = this.handleOverflow(r); r += n; h || (this.box = h = b.rect().addClass("highcharts-legend-box").attr({ r: c.borderRadius }).add(d),
                                        h.isNew = !0); a.styledMode || h.attr({ stroke: c.borderColor, "stroke-width": c.borderWidth || 0, fill: c.backgroundColor || "none" }).shadow(c.shadow); 0 < m && 0 < r && (h[h.isNew ? "attr" : "animate"](h.crisp.call({}, { x: 0, y: 0, width: m, height: r }, h.strokeWidth())), h.isNew = !1); h[f ? "show" : "hide"](); a.styledMode && "none" === d.getStyle("display") && (m = r = 0); this.legendWidth = m; this.legendHeight = r; f && (b = a.spacingBox, h = b.y, /(lth|ct|rth)/.test(this.getAlignment()) && 0 < a.titleOffset[0] ? h += a.titleOffset[0] : /(lbh|cb|rbh)/.test(this.getAlignment()) &&
                                            0 < a.titleOffset[2] && (h -= a.titleOffset[2]), h !== b.y && (b = k(b, { y: h })), d.align(k(c, { width: m, height: r, verticalAlign: this.proximate ? "top" : c.verticalAlign }), !0, b)); this.proximate || this.positionItems(); D(this, "afterRender")
                                }; a.prototype.handleOverflow = function (a) {
                                    var b = this, d = this.chart, e = d.renderer, f = this.options, h = f.y, c = this.padding; h = d.spacingBox.height + ("top" === f.verticalAlign ? -h : h) - c; var k = f.maxHeight, n, m = this.clipRect, g = f.navigation, x = r(g.animation, !0), l = g.arrowSize || 12, H = this.nav, I = this.pages, q, R = this.allItems,
                                        v = function (a) { "number" === typeof a ? m.attr({ height: a }) : m && (b.clipRect = m.destroy(), b.contentGroup.clip()); b.contentGroup.div && (b.contentGroup.div.style.clip = a ? "rect(" + c + "px,9999px," + (c + a) + "px,0)" : "auto") }, L = function (a) { b[a] = e.circle(0, 0, 1.3 * l).translate(l / 2, l / 2).add(H); d.styledMode || b[a].attr("fill", "rgba(0,0,0,0.0001)"); return b[a] }; "horizontal" !== f.layout || "middle" === f.verticalAlign || f.floating || (h /= 2); k && (h = Math.min(h, k)); I.length = 0; a > h && !1 !== g.enabled ? (this.clipHeight = n = Math.max(h - 20 - this.titleHeight -
                                            c, 0), this.currentPage = r(this.currentPage, 1), this.fullHeight = a, R.forEach(function (a, b) { var d = a._legendItemPos[1], e = Math.round(a.legendItem.getBBox().height), f = I.length; if (!f || d - I[f - 1] > n && (q || d) !== I[f - 1]) I.push(q || d), f++; a.pageIx = f - 1; q && (R[b - 1].pageIx = f - 1); b === R.length - 1 && d + e - I[f - 1] > n && d !== q && (I.push(d), a.pageIx = f); d !== q && (q = d) }), m || (m = b.clipRect = e.clipRect(0, c, 9999, 0), b.contentGroup.clip(m)), v(n), H || (this.nav = H = e.g().attr({ zIndex: 1 }).add(this.group), this.up = e.symbol("triangle", 0, 0, l, l).add(H), L("upTracker").on("click",
                                                function () { b.scroll(-1, x) }), this.pager = e.text("", 15, 10).addClass("highcharts-legend-navigation"), d.styledMode || this.pager.css(g.style), this.pager.add(H), this.down = e.symbol("triangle-down", 0, 0, l, l).add(H), L("downTracker").on("click", function () { b.scroll(1, x) })), b.scroll(0), a = h) : H && (v(), this.nav = H.destroy(), this.scrollGroup.attr({ translateY: 1 }), this.clipHeight = 0); return a
                                }; a.prototype.scroll = function (a, b) {
                                    var d = this, e = this.chart, f = this.pages, h = f.length, k = this.currentPage + a; a = this.clipHeight; var g = this.options.navigation,
                                        x = this.pager, q = this.padding; k > h && (k = h); 0 < k && ("undefined" !== typeof b && m(b, e), this.nav.attr({ translateX: q, translateY: a + this.padding + 7 + this.titleHeight, visibility: "visible" }), [this.up, this.upTracker].forEach(function (a) { a.attr({ "class": 1 === k ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }), x.attr({ text: k + "/" + h }), [this.down, this.downTracker].forEach(function (a) { a.attr({ x: 18 + this.pager.getBBox().width, "class": k === h ? "highcharts-legend-nav-inactive" : "highcharts-legend-nav-active" }) }, this),
                                            e.styledMode || (this.up.attr({ fill: 1 === k ? g.inactiveColor : g.activeColor }), this.upTracker.css({ cursor: 1 === k ? "default" : "pointer" }), this.down.attr({ fill: k === h ? g.inactiveColor : g.activeColor }), this.downTracker.css({ cursor: k === h ? "default" : "pointer" })), this.scrollOffset = -f[k - 1] + this.initialItemY, this.scrollGroup.animate({ translateY: this.scrollOffset }), this.currentPage = k, this.positionCheckboxes(), b = c.animObject(r(b, e.renderer.globalAnimation, !0)), n(function () { D(d, "afterScroll", { currentPage: k }) }, b.duration ||
                                                0))
                                }; return a
                    }(); (/Trident\/7\.0/.test(a.navigator && a.navigator.userAgent) || M) && g(d.prototype, "positionItem", function (a, d) { var b = this, e = function () { d._legendItemPos && a.call(b, d) }; e(); b.bubbleLegend || setTimeout(e) }); c.Legend = d; return c.Legend
                }); P(u, "parts/Chart.js", [u["parts/Globals.js"], u["parts/Legend.js"], u["parts/MSPointer.js"], u["parts/Pointer.js"], u["parts/Time.js"], u["parts/Utilities.js"]], function (c, g, E, q, y, v) {
                    var N = v.addEvent, D = v.animate, F = v.animObject, C = v.attr, k = v.createElement, r = v.css, x =
                        v.defined, m = v.discardElement, L = v.erase, n = v.error, M = v.extend, f = v.find, a = v.fireEvent, d = v.getStyle, h = v.isArray, e = v.isFunction, b = v.isNumber, p = v.isObject, z = v.isString, t = v.merge, w = v.numberFormat, G = v.objectEach, K = v.pick, Q = v.pInt, J = v.relativeLength, S = v.removeEvent, A = v.setAnimation, l = v.splat, H = v.syncTimeout, I = v.uniqueKey, W = c.doc, R = c.Axis, X = c.defaultOptions, u = c.charts, B = c.marginNames, U = c.seriesTypes, aa = c.win, Y = c.Chart = function () { this.getArgs.apply(this, arguments) }; c.chart = function (a, b, d) { return new Y(a, b, d) };
                    M(Y.prototype, {
                        callbacks: [], getArgs: function () { var a = [].slice.call(arguments); if (z(a[0]) || a[0].nodeName) this.renderTo = a.shift(); this.init(a[0], a[1]) }, init: function (b, d) {
                            var f, l = b.series, h = b.plotOptions || {}; a(this, "init", { args: arguments }, function () {
                            b.series = null; f = t(X, b); G(f.plotOptions, function (a, b) { p(a) && (a.tooltip = h[b] && t(h[b].tooltip) || void 0) }); f.tooltip.userOptions = b.chart && b.chart.forExport && b.tooltip.userOptions || b.tooltip; f.series = b.series = l; this.userOptions = b; var k = f.chart, n = k.events; this.margin =
                                []; this.spacing = []; this.bounds = { h: {}, v: {} }; this.labelCollectors = []; this.callback = d; this.isResizing = 0; this.options = f; this.axes = []; this.series = []; this.time = b.time && Object.keys(b.time).length ? new y(b.time) : c.time; this.numberFormatter = k.numberFormatter || w; this.styledMode = k.styledMode; this.hasCartesianSeries = k.showAxes; var m = this; m.index = u.length; u.push(m); c.chartCount++; n && G(n, function (a, b) { e(a) && N(m, b, a) }); m.xAxis = []; m.yAxis = []; m.pointCount = m.colorCounter = m.symbolCounter = 0; a(m, "afterInit"); m.firstRender()
                            })
                        },
                        initSeries: function (a) { var b = this.options.chart; b = a.type || b.type || b.defaultSeriesType; var d = U[b]; d || n(17, !0, this, { missingModuleFor: b }); b = new d; b.init(this, a); return b }, setSeriesData: function () { this.getSeriesOrderByLinks().forEach(function (a) { a.points || a.data || !a.enabledDataSorting || a.setData(a.options.data, !1) }) }, getSeriesOrderByLinks: function () { return this.series.concat().sort(function (a, b) { return a.linkedSeries.length || b.linkedSeries.length ? b.linkedSeries.length - a.linkedSeries.length : 0 }) }, orderSeries: function (a) {
                            var b =
                                this.series; for (a = a || 0; a < b.length; a++)b[a] && (b[a].index = a, b[a].name = b[a].getName())
                        }, isInsidePlot: function (b, d, e) { var f = e ? d : b; b = e ? b : d; f = { x: f, y: b, isInsidePlot: 0 <= f && f <= this.plotWidth && 0 <= b && b <= this.plotHeight }; a(this, "afterIsInsidePlot", f); return f.isInsidePlot }, redraw: function (b) {
                            a(this, "beforeRedraw"); var d = this.axes, e = this.series, f = this.pointer, l = this.legend, h = this.userOptions.legend, c = this.isDirtyLegend, p = this.hasCartesianSeries, k = this.isDirtyBox, n = this.renderer, m = n.isHidden(), t = []; this.setResponsive &&
                                this.setResponsive(!1); A(this.hasRendered ? b : !1, this); m && this.temporaryDisplay(); this.layOutTitles(); for (b = e.length; b--;) { var w = e[b]; if (w.options.stacking) { var r = !0; if (w.isDirty) { var I = !0; break } } } if (I) for (b = e.length; b--;)w = e[b], w.options.stacking && (w.isDirty = !0); e.forEach(function (b) { b.isDirty && ("point" === b.options.legendType ? (b.updateTotals && b.updateTotals(), c = !0) : h && (h.labelFormatter || h.labelFormat) && (c = !0)); b.isDirtyData && a(b, "updatedData") }); c && l && l.options.enabled && (l.render(), this.isDirtyLegend =
                                    !1); r && this.getStacks(); p && d.forEach(function (a) { a.updateNames(); a.setScale() }); this.getMargins(); p && (d.forEach(function (a) { a.isDirty && (k = !0) }), d.forEach(function (b) { var d = b.min + "," + b.max; b.extKey !== d && (b.extKey = d, t.push(function () { a(b, "afterSetExtremes", M(b.eventArgs, b.getExtremes())); delete b.eventArgs })); (k || r) && b.redraw() })); k && this.drawChartBox(); a(this, "predraw"); e.forEach(function (a) { (k || a.isDirty) && a.visible && a.redraw(); a.isDirtyData = !1 }); f && f.reset(!0); n.draw(); a(this, "redraw"); a(this, "render");
                            m && this.temporaryDisplay(!0); t.forEach(function (a) { a.call() })
                        }, get: function (a) { function b(b) { return b.id === a || b.options && b.options.id === a } var d = this.series, e; var l = f(this.axes, b) || f(this.series, b); for (e = 0; !l && e < d.length; e++)l = f(d[e].points || [], b); return l }, getAxes: function () {
                            var b = this, d = this.options, e = d.xAxis = l(d.xAxis || {}); d = d.yAxis = l(d.yAxis || {}); a(this, "getAxes"); e.forEach(function (a, b) { a.index = b; a.isX = !0 }); d.forEach(function (a, b) { a.index = b }); e.concat(d).forEach(function (a) { new R(b, a) }); a(this,
                                "afterGetAxes")
                        }, getSelectedPoints: function () { var a = []; this.series.forEach(function (b) { a = a.concat(b.getPointsCollection().filter(function (a) { return K(a.selectedStaging, a.selected) })) }); return a }, getSelectedSeries: function () { return this.series.filter(function (a) { return a.selected }) }, setTitle: function (a, b, d) { this.applyDescription("title", a); this.applyDescription("subtitle", b); this.applyDescription("caption", void 0); this.layOutTitles(d) }, applyDescription: function (a, b) {
                            var d = this, e = "title" === a ? {
                                color: "white",
                                fontSize: this.options.isStock ? "16px" : "30px",
                                fontWeight: "bolder"
                                
                            } : { color: "#666666" }; e = this.options[a] = t(!this.styledMode && { style: e }, this.options[a], b); var f = this[a]; f && b && (this[a] = f = f.destroy()); e && !f && (f = this.renderer.text(e.text, 0, 0, e.useHTML).attr({ align: e.align, "class": "highcharts-" + a, zIndex: e.zIndex || 4 }).add(), f.update = function (b) { d[{ title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }[a]](b) }, this.styledMode || f.css(e.style), this[a] = f)
                        }, layOutTitles: function (b) {
                            var d = [0, 0, 0], e = this.renderer, f = this.spacingBox;
                            ["title", "subtitle", "caption"].forEach(function (a) { var b = this[a], l = this.options[a], h = l.verticalAlign || "top"; a = "title" === a ? -3 : "top" === h ? d[0] + 2 : 0; if (b) { if (!this.styledMode) var c = l.style.fontSize; c = e.fontMetrics(c, b).b; b.css({ width: (l.width || f.width + (l.widthAdjust || 0)) + "px" }); var p = Math.round(b.getBBox(l.useHTML).height); b.align(M({ y: "bottom" === h ? c : a + c, height: p }, l), !1, "spacingBox"); l.floating || ("top" === h ? d[0] = Math.ceil(d[0] + p) : "bottom" === h && (d[2] = Math.ceil(d[2] + p))) } }, this); d[0] && "top" === (this.options.title.verticalAlign ||
                                "top") && (d[0] += this.options.title.margin); d[2] && "bottom" === this.options.caption.verticalAlign && (d[2] += this.options.caption.margin); var l = !this.titleOffset || this.titleOffset.join(",") !== d.join(","); this.titleOffset = d; a(this, "afterLayOutTitles"); !this.isDirtyBox && l && (this.isDirtyBox = this.isDirtyLegend = l, this.hasRendered && K(b, !0) && this.isDirtyBox && this.redraw())
                        }, getChartSize: function () {
                            var a = this.options.chart, b = a.width; a = a.height; var e = this.renderTo; x(b) || (this.containerWidth = d(e, "width")); x(a) || (this.containerHeight =
                                d(e, "height")); this.chartWidth = Math.max(0, b || this.containerWidth || 600); this.chartHeight = Math.max(0, J(a, this.chartWidth) || (1 < this.containerHeight ? this.containerHeight : 400))
                        }, temporaryDisplay: function (a) {
                            var b = this.renderTo; if (a) for (; b && b.style;)b.hcOrigStyle && (r(b, b.hcOrigStyle), delete b.hcOrigStyle), b.hcOrigDetached && (W.body.removeChild(b), b.hcOrigDetached = !1), b = b.parentNode; else for (; b && b.style;) {
                                W.body.contains(b) || b.parentNode || (b.hcOrigDetached = !0, W.body.appendChild(b)); if ("none" === d(b, "display",
                                    !1) || b.hcOricDetached) b.hcOrigStyle = { display: b.style.display, height: b.style.height, overflow: b.style.overflow }, a = { display: "block", overflow: "hidden" }, b !== this.renderTo && (a.height = 0), r(b, a), b.offsetWidth || b.style.setProperty("display", "block", "important"); b = b.parentNode; if (b === W.body) break
                            }
                        }, setClassName: function (a) { this.container.className = "highcharts-container " + (a || "") }, getContainer: function () {
                            var d = this.options, e = d.chart; var f = this.renderTo; var l = I(), h, p; f || (this.renderTo = f = e.renderTo); z(f) && (this.renderTo =
                                f = W.getElementById(f)); f || n(13, !0, this); var m = Q(C(f, "data-highcharts-chart")); b(m) && u[m] && u[m].hasRendered && u[m].destroy(); C(f, "data-highcharts-chart", this.index); f.innerHTML = ""; e.skipClone || f.offsetWidth || this.temporaryDisplay(); this.getChartSize(); m = this.chartWidth; var t = this.chartHeight; r(f, { overflow: "hidden" }); this.styledMode || (h = M({ position: "relative", overflow: "hidden", width: m + "px", height: t + "px", textAlign: "left", lineHeight: "normal", zIndex: 0, "-webkit-tap-highlight-color": "rgba(0,0,0,0)" }, e.style));
                            this.container = f = k("div", { id: l }, h, f); this._cursor = f.style.cursor; this.renderer = new (c[e.renderer] || c.Renderer)(f, m, t, null, e.forExport, d.exporting && d.exporting.allowHTML, this.styledMode); A(void 0, this); this.setClassName(e.className); if (this.styledMode) for (p in d.defs) this.renderer.definition(d.defs[p]); else this.renderer.setStyle(e.style); this.renderer.chartIndex = this.index; a(this, "afterGetContainer")
                        }, getMargins: function (b) {
                            var d = this.spacing, e = this.margin, f = this.titleOffset; this.resetMargins(); f[0] &&
                                !x(e[0]) && (this.plotTop = Math.max(this.plotTop, f[0] + d[0])); f[2] && !x(e[2]) && (this.marginBottom = Math.max(this.marginBottom, f[2] + d[2])); this.legend && this.legend.display && this.legend.adjustMargins(e, d); a(this, "getMargins"); b || this.getAxisMargins()
                        }, getAxisMargins: function () { var a = this, b = a.axisOffset = [0, 0, 0, 0], d = a.colorAxis, e = a.margin, f = function (a) { a.forEach(function (a) { a.visible && a.getOffset() }) }; a.hasCartesianSeries ? f(a.axes) : d && d.length && f(d); B.forEach(function (d, f) { x(e[f]) || (a[d] += b[f]) }); a.setChartSize() },
                        reflow: function (a) { var b = this, e = b.options.chart, f = b.renderTo, l = x(e.width) && x(e.height), h = e.width || d(f, "width"); e = e.height || d(f, "height"); f = a ? a.target : aa; if (!l && !b.isPrinting && h && e && (f === aa || f === W)) { if (h !== b.containerWidth || e !== b.containerHeight) v.clearTimeout(b.reflowTimeout), b.reflowTimeout = H(function () { b.container && b.setSize(void 0, void 0, !1) }, a ? 100 : 0); b.containerWidth = h; b.containerHeight = e } }, setReflow: function (a) {
                            var b = this; !1 === a || this.unbindReflow ? !1 === a && this.unbindReflow && (this.unbindReflow =
                                this.unbindReflow()) : (this.unbindReflow = N(aa, "resize", function (a) { b.options && b.reflow(a) }), N(this, "destroy", this.unbindReflow))
                        }, setSize: function (b, d, e) {
                            var f = this, l = f.renderer; f.isResizing += 1; A(e, f); e = l.globalAnimation; f.oldChartHeight = f.chartHeight; f.oldChartWidth = f.chartWidth; "undefined" !== typeof b && (f.options.chart.width = b); "undefined" !== typeof d && (f.options.chart.height = d); f.getChartSize(); f.styledMode || (e ? D : r)(f.container, { width: f.chartWidth + "px", height: f.chartHeight + "px" }, e); f.setChartSize(!0);
                            l.setSize(f.chartWidth, f.chartHeight, e); f.axes.forEach(function (a) { a.isDirty = !0; a.setScale() }); f.isDirtyLegend = !0; f.isDirtyBox = !0; f.layOutTitles(); f.getMargins(); f.redraw(e); f.oldChartHeight = null; a(f, "resize"); H(function () { f && a(f, "endResize", null, function () { --f.isResizing }) }, F(e).duration || 0)
                        }, setChartSize: function (b) {
                            var d = this.inverted, f = this.renderer, e = this.chartWidth, l = this.chartHeight, h = this.options.chart, c = this.spacing, p = this.clipOffset, k, m, n, t; this.plotLeft = k = Math.round(this.plotLeft); this.plotTop =
                                m = Math.round(this.plotTop); this.plotWidth = n = Math.max(0, Math.round(e - k - this.marginRight)); this.plotHeight = t = Math.max(0, Math.round(l - m - this.marginBottom)); this.plotSizeX = d ? t : n; this.plotSizeY = d ? n : t; this.plotBorderWidth = h.plotBorderWidth || 0; this.spacingBox = f.spacingBox = { x: c[3], y: c[0], width: e - c[3] - c[1], height: l - c[0] - c[2] }; this.plotBox = f.plotBox = { x: k, y: m, width: n, height: t }; e = 2 * Math.floor(this.plotBorderWidth / 2); d = Math.ceil(Math.max(e, p[3]) / 2); f = Math.ceil(Math.max(e, p[0]) / 2); this.clipBox = {
                                    x: d, y: f, width: Math.floor(this.plotSizeX -
                                        Math.max(e, p[1]) / 2 - d), height: Math.max(0, Math.floor(this.plotSizeY - Math.max(e, p[2]) / 2 - f))
                                }; b || this.axes.forEach(function (a) { a.setAxisSize(); a.setAxisTranslation() }); a(this, "afterSetChartSize", { skipAxes: b })
                        }, resetMargins: function () {
                            a(this, "resetMargins"); var b = this, d = b.options.chart;["margin", "spacing"].forEach(function (a) { var f = d[a], e = p(f) ? f : [f, f, f, f];["Top", "Right", "Bottom", "Left"].forEach(function (f, l) { b[a][l] = K(d[a + f], e[l]) }) }); B.forEach(function (a, d) { b[a] = K(b.margin[d], b.spacing[d]) }); b.axisOffset =
                                [0, 0, 0, 0]; b.clipOffset = [0, 0, 0, 0]
                        }, drawChartBox: function () {
                            var b = this.options.chart, d = this.renderer, f = this.chartWidth, e = this.chartHeight, l = this.chartBackground, h = this.plotBackground, c = this.plotBorder, p = this.styledMode, k = this.plotBGImage, m = b.backgroundColor, n = b.plotBackgroundColor, t = b.plotBackgroundImage, w, r = this.plotLeft, I = this.plotTop, g = this.plotWidth, H = this.plotHeight, z = this.plotBox, x = this.clipRect, G = this.clipBox, q = "animate"; l || (this.chartBackground = l = d.rect().addClass("highcharts-background").add(),
                                q = "attr"); if (p) var A = w = l.strokeWidth(); else { A = b.borderWidth || 0; w = A + (b.shadow ? 8 : 0); m = { fill: m || "none" }; if (A || l["stroke-width"]) m.stroke = b.borderColor, m["stroke-width"] = A; l.attr(m).shadow(b.shadow) } l[q]({ x: w / 2, y: w / 2, width: f - w - A % 2, height: e - w - A % 2, r: b.borderRadius }); q = "animate"; h || (q = "attr", this.plotBackground = h = d.rect().addClass("highcharts-plot-background").add()); h[q](z); p || (h.attr({ fill: n || "none" }).shadow(b.plotShadow), t && (k ? (t !== k.attr("href") && k.attr("href", t), k.animate(z)) : this.plotBGImage = d.image(t,
                                    r, I, g, H).add())); x ? x.animate({ width: G.width, height: G.height }) : this.clipRect = d.clipRect(G); q = "animate"; c || (q = "attr", this.plotBorder = c = d.rect().addClass("highcharts-plot-border").attr({ zIndex: 1 }).add()); p || c.attr({ stroke: b.plotBorderColor, "stroke-width": b.plotBorderWidth || 0, fill: "none" }); c[q](c.crisp({ x: r, y: I, width: g, height: H }, -c.strokeWidth())); this.isDirtyBox = !1; a(this, "afterDrawChartBox")
                        }, propFromSeries: function () {
                            var a = this, b = a.options.chart, d, f = a.options.series, e, l;["inverted", "angular", "polar"].forEach(function (h) {
                                d =
                                U[b.type || b.defaultSeriesType]; l = b[h] || d && d.prototype[h]; for (e = f && f.length; !l && e--;)(d = U[f[e].type]) && d.prototype[h] && (l = !0); a[h] = l
                            })
                        }, linkSeries: function () {
                            var b = this, d = b.series; d.forEach(function (a) { a.linkedSeries.length = 0 }); d.forEach(function (a) { var d = a.options.linkedTo; z(d) && (d = ":previous" === d ? b.series[a.index - 1] : b.get(d)) && d.linkedParent !== a && (d.linkedSeries.push(a), a.linkedParent = d, d.enabledDataSorting && a.setDataSortingOptions(), a.visible = K(a.options.visible, d.options.visible, a.visible)) });
                            a(this, "afterLinkSeries")
                        }, renderSeries: function () { this.series.forEach(function (a) { a.translate(); a.render() }) }, renderLabels: function () { var a = this, b = a.options.labels; b.items && b.items.forEach(function (d) { var f = M(b.style, d.style), e = Q(f.left) + a.plotLeft, l = Q(f.top) + a.plotTop + 12; delete f.left; delete f.top; a.renderer.text(d.html, e, l).attr({ zIndex: 2 }).css(f).add() }) }, render: function () {
                            var a = this.axes, b = this.colorAxis, d = this.renderer, f = this.options, e = 0, l = function (a) { a.forEach(function (a) { a.visible && a.render() }) };
                            this.setTitle(); this.legend = new g(this, f.legend); this.getStacks && this.getStacks(); this.getMargins(!0); this.setChartSize(); f = this.plotWidth; a.some(function (a) { if (a.horiz && a.visible && a.options.labels.enabled && a.series.length) return e = 21, !0 }); var h = this.plotHeight = Math.max(this.plotHeight - e, 0); a.forEach(function (a) { a.setScale() }); this.getAxisMargins(); var c = 1.1 < f / this.plotWidth; var p = 1.05 < h / this.plotHeight; if (c || p) a.forEach(function (a) { (a.horiz && c || !a.horiz && p) && a.setTickInterval(!0) }), this.getMargins();
                            this.drawChartBox(); this.hasCartesianSeries ? l(a) : b && b.length && l(b); this.seriesGroup || (this.seriesGroup = d.g("series-group").attr({ zIndex: 3 }).add()); this.renderSeries(); this.renderLabels(); this.addCredits(); this.setResponsive && this.setResponsive(); this.updateContainerScaling(); this.hasRendered = !0
                        }, addCredits: function (a) {
                            var b = this; a = t(!0, this.options.credits, a); a.enabled && !this.credits && (this.credits = this.renderer.text(a.text + (this.mapCredits || ""), 0, 0).addClass("highcharts-credits").on("click", function () {
                            a.href &&
                                (aa.location.href = a.href)
                            }).attr({ align: a.position.align, zIndex: 8 }), b.styledMode || this.credits.css(a.style), this.credits.add().align(a.position), this.credits.update = function (a) { b.credits = b.credits.destroy(); b.addCredits(a) })
                        }, updateContainerScaling: function () { var a = this.container; if (a.offsetWidth && a.offsetHeight && a.getBoundingClientRect) { var b = a.getBoundingClientRect(), d = b.width / a.offsetWidth; a = b.height / a.offsetHeight; 1 !== d || 1 !== a ? this.containerScaling = { scaleX: d, scaleY: a } : delete this.containerScaling } },
                        destroy: function () {
                            var b = this, d = b.axes, f = b.series, e = b.container, l, h = e && e.parentNode; a(b, "destroy"); b.renderer.forExport ? L(u, b) : u[b.index] = void 0; c.chartCount--; b.renderTo.removeAttribute("data-highcharts-chart"); S(b); for (l = d.length; l--;)d[l] = d[l].destroy(); this.scroller && this.scroller.destroy && this.scroller.destroy(); for (l = f.length; l--;)f[l] = f[l].destroy(); "title subtitle chartBackground plotBackground plotBGImage plotBorder seriesGroup clipRect credits pointer rangeSelector legend resetZoomButton tooltip renderer".split(" ").forEach(function (a) {
                                var d =
                                    b[a]; d && d.destroy && (b[a] = d.destroy())
                            }); e && (e.innerHTML = "", S(e), h && m(e)); G(b, function (a, d) { delete b[d] })
                        }, firstRender: function () {
                            var b = this, d = b.options; if (!b.isReadyToRender || b.isReadyToRender()) {
                                b.getContainer(); b.resetMargins(); b.setChartSize(); b.propFromSeries(); b.getAxes(); (h(d.series) ? d.series : []).forEach(function (a) { b.initSeries(a) }); b.linkSeries(); b.setSeriesData(); a(b, "beforeRender"); q && (b.pointer = c.hasTouch || !aa.PointerEvent && !aa.MSPointerEvent ? new q(b, d) : new E(b, d)); b.render(); if (!b.renderer.imgCount &&
                                    !b.hasLoaded) b.onload(); b.temporaryDisplay(!0)
                            }
                        }, onload: function () { this.callbacks.concat([this.callback]).forEach(function (a) { a && "undefined" !== typeof this.index && a.apply(this, [this]) }, this); a(this, "load"); a(this, "render"); x(this.index) && this.setReflow(this.options.chart.reflow); this.hasLoaded = !0 }
                    })
                }); P(u, "parts/ScrollablePlotArea.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    var u = g.addEvent, q = g.createElement, y = g.pick, v = g.stop; g = c.Chart; ""; u(g, "afterSetChartSize", function (g) {
                        var q =
                            this.options.chart.scrollablePlotArea, v = q && q.minWidth; q = q && q.minHeight; if (!this.renderer.forExport) {
                                if (v) { if (this.scrollablePixelsX = v = Math.max(0, v - this.chartWidth)) { this.plotWidth += v; this.inverted ? (this.clipBox.height += v, this.plotBox.height += v) : (this.clipBox.width += v, this.plotBox.width += v); var C = { 1: { name: "right", value: v } } } } else q && (this.scrollablePixelsY = v = Math.max(0, q - this.chartHeight)) && (this.plotHeight += v, this.inverted ? (this.clipBox.width += v, this.plotBox.width += v) : (this.clipBox.height += v, this.plotBox.height +=
                                    v), C = { 2: { name: "bottom", value: v } }); C && !g.skipAxes && this.axes.forEach(function (k) { C[k.side] ? k.getPlotLinePath = function () { var r = C[k.side].name, g = this[r]; this[r] = g - C[k.side].value; var m = c.Axis.prototype.getPlotLinePath.apply(this, arguments); this[r] = g; return m } : (k.setAxisSize(), k.setAxisTranslation()) })
                            }
                    }); u(g, "render", function () { this.scrollablePixelsX || this.scrollablePixelsY ? (this.setUpScrolling && this.setUpScrolling(), this.applyFixed()) : this.fixedDiv && this.applyFixed() }); g.prototype.setUpScrolling = function () {
                        var c =
                            this, g = { WebkitOverflowScrolling: "touch", overflowX: "hidden", overflowY: "hidden" }; this.scrollablePixelsX && (g.overflowX = "auto"); this.scrollablePixelsY && (g.overflowY = "auto"); this.scrollingContainer = q("div", { className: "highcharts-scrolling" }, g, this.renderTo); u(this.scrollingContainer, "scroll", function () { c.pointer && delete c.pointer.chartPosition }); this.innerContainer = q("div", { className: "highcharts-inner-container" }, null, this.scrollingContainer); this.innerContainer.appendChild(this.container); this.setUpScrolling =
                                null
                    }; g.prototype.moveFixedElements = function () {
                        var c = this.container, g = this.fixedRenderer, q = ".highcharts-contextbutton .highcharts-credits .highcharts-legend .highcharts-legend-checkbox .highcharts-navigator-series .highcharts-navigator-xaxis .highcharts-navigator-yaxis .highcharts-navigator .highcharts-reset-zoom .highcharts-scrollbar .highcharts-subtitle .highcharts-title".split(" "), v; this.scrollablePixelsX && !this.inverted ? v = ".highcharts-yaxis" : this.scrollablePixelsX && this.inverted ? v = ".highcharts-xaxis" :
                            this.scrollablePixelsY && !this.inverted ? v = ".highcharts-xaxis" : this.scrollablePixelsY && this.inverted && (v = ".highcharts-yaxis"); q.push(v, v + "-labels"); q.forEach(function (k) { [].forEach.call(c.querySelectorAll(k), function (c) { (c.namespaceURI === g.SVG_NS ? g.box : g.box.parentNode).appendChild(c); c.style.pointerEvents = "auto" }) })
                    }; g.prototype.applyFixed = function () {
                        var g, D = !this.fixedDiv, F = this.options.chart.scrollablePlotArea; D ? (this.fixedDiv = q("div", { className: "highcharts-fixed" }, {
                            position: "absolute", overflow: "hidden",
                            pointerEvents: "none", zIndex: 2
                        }, null, !0), this.renderTo.insertBefore(this.fixedDiv, this.renderTo.firstChild), this.renderTo.style.overflow = "visible", this.fixedRenderer = g = new c.Renderer(this.fixedDiv, this.chartWidth, this.chartHeight), this.scrollableMask = g.path().attr({ fill: this.options.chart.backgroundColor || "#fff", "fill-opacity": y(F.opacity, .85), zIndex: -1 }).addClass("highcharts-scrollable-mask").add(), this.moveFixedElements(), u(this, "afterShowResetZoom", this.moveFixedElements), u(this, "afterLayOutTitles",
                            this.moveFixedElements)) : this.fixedRenderer.setSize(this.chartWidth, this.chartHeight); g = this.chartWidth + (this.scrollablePixelsX || 0); var C = this.chartHeight + (this.scrollablePixelsY || 0); v(this.container); this.container.style.width = g + "px"; this.container.style.height = C + "px"; this.renderer.boxWrapper.attr({ width: g, height: C, viewBox: [0, 0, g, C].join(" ") }); this.chartBackground.attr({ width: g, height: C }); this.scrollablePixelsY && (this.scrollingContainer.style.height = this.chartHeight + "px"); D && (F.scrollPositionX &&
                                (this.scrollingContainer.scrollLeft = this.scrollablePixelsX * F.scrollPositionX), F.scrollPositionY && (this.scrollingContainer.scrollTop = this.scrollablePixelsY * F.scrollPositionY)); C = this.axisOffset; D = this.plotTop - C[0] - 1; F = this.plotLeft - C[3] - 1; g = this.plotTop + this.plotHeight + C[2] + 1; C = this.plotLeft + this.plotWidth + C[1] + 1; var k = this.plotLeft + this.plotWidth - (this.scrollablePixelsX || 0), r = this.plotTop + this.plotHeight - (this.scrollablePixelsY || 0); D = this.scrollablePixelsX ? ["M", 0, D, "L", this.plotLeft - 1, D, "L", this.plotLeft -
                                    1, g, "L", 0, g, "Z", "M", k, D, "L", this.chartWidth, D, "L", this.chartWidth, g, "L", k, g, "Z"] : this.scrollablePixelsY ? ["M", F, 0, "L", F, this.plotTop - 1, "L", C, this.plotTop - 1, "L", C, 0, "Z", "M", F, r, "L", F, this.chartHeight, "L", C, this.chartHeight, "L", C, r, "Z"] : ["M", 0, 0]; "adjustHeight" !== this.redrawTrigger && this.scrollableMask.attr({ d: D })
                    }
                }); P(u, "mixins/legend-symbol.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    var u = g.merge, q = g.pick; c.LegendSymbolMixin = {
                        drawRectangle: function (c, g) {
                            var v = c.symbolHeight,
                            y = c.options.squareSymbol; g.legendSymbol = this.chart.renderer.rect(y ? (c.symbolWidth - v) / 2 : 0, c.baseline - v + 1, y ? v : c.symbolWidth, v, q(c.options.symbolRadius, v / 2)).addClass("highcharts-point").attr({ zIndex: 3 }).add(g.legendGroup)
                        }, drawLineMarker: function (c) {
                            var g = this.options, y = g.marker, D = c.symbolWidth, F = c.symbolHeight, C = F / 2, k = this.chart.renderer, r = this.legendGroup; c = c.baseline - Math.round(.3 * c.fontMetrics.b); var x = {}; this.chart.styledMode || (x = { "stroke-width": g.lineWidth || 0 }, g.dashStyle && (x.dashstyle = g.dashStyle));
                            this.legendLine = k.path(["M", 0, c, "L", D, c]).addClass("highcharts-graph").attr(x).add(r); y && !1 !== y.enabled && D && (g = Math.min(q(y.radius, C), C), 0 === this.symbol.indexOf("url") && (y = u(y, { width: F, height: F }), g = 0), this.legendSymbol = y = k.symbol(this.symbol, D / 2 - g, c - g, 2 * g, 2 * g, y).addClass("highcharts-point").add(r), y.isMarker = !0)
                        }
                    }; return c.LegendSymbolMixin
                }); P(u, "parts/Point.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    ""; var u = g.animObject, q = g.defined, y = g.erase, v = g.extend, N = g.format, D = g.getNestedProperty,
                        F = g.isArray, C = g.isNumber, k = g.isObject, r = g.syncTimeout, x = g.pick, m = g.removeEvent, L = g.uniqueKey, n = c.fireEvent; g = function () {
                            function c() { this.colorIndex = this.category = void 0; this.formatPrefix = "point"; this.id = void 0; this.isNull = !1; this.percentage = this.options = this.name = void 0; this.selected = !1; this.total = this.series = void 0; this.visible = !0; this.x = void 0 } c.prototype.animateBeforeDestroy = function () {
                                var f = this, a = { x: f.startXPos, opacity: 0 }, d, h = f.getGraphicalProps(); h.singular.forEach(function (e) {
                                    d = "dataLabel" ===
                                    e; f[e] = f[e].animate(d ? { x: f[e].startXPos, y: f[e].startYPos, opacity: 0 } : a)
                                }); h.plural.forEach(function (a) { f[a].forEach(function (a) { a.element && a.animate(v({ x: f.startXPos }, a.startYPos ? { x: a.startXPos, y: a.startYPos } : {})) }) })
                            }; c.prototype.applyOptions = function (f, a) {
                                var d = this.series, h = d.options.pointValKey || d.pointValKey; f = c.prototype.optionsToObject.call(this, f); v(this, f); this.options = this.options ? v(this.options, f) : f; f.group && delete this.group; f.dataLabels && delete this.dataLabels; h && (this.y = c.prototype.getNestedProperty.call(this,
                                    h)); this.formatPrefix = (this.isNull = x(this.isValid && !this.isValid(), null === this.x || !C(this.y))) ? "null" : "point"; this.selected && (this.state = "select"); "name" in this && "undefined" === typeof a && d.xAxis && d.xAxis.hasNames && (this.x = d.xAxis.nameToX(this)); "undefined" === typeof this.x && d && (this.x = "undefined" === typeof a ? d.autoIncrement(this) : a); return this
                            }; c.prototype.destroy = function () {
                                function f() { if (a.graphic || a.dataLabel || a.dataLabels) m(a), a.destroyElements(); for (c in a) a[c] = null } var a = this, d = a.series, h = d.chart;
                                d = d.options.dataSorting; var e = h.hoverPoints, b = u(a.series.chart.renderer.globalAnimation), c; a.legendItem && h.legend.destroyItem(a); e && (a.setState(), y(e, a), e.length || (h.hoverPoints = null)); if (a === h.hoverPoint) a.onMouseOut(); d && d.enabled ? (this.animateBeforeDestroy(), r(f, b.duration)) : f(); h.pointCount--
                            }; c.prototype.destroyElements = function (f) {
                                var a = this; f = a.getGraphicalProps(f); f.singular.forEach(function (d) { a[d] = a[d].destroy() }); f.plural.forEach(function (d) {
                                    a[d].forEach(function (a) { a.element && a.destroy() });
                                    delete a[d]
                                })
                            }; c.prototype.firePointEvent = function (f, a, d) { var h = this, e = this.series.options; (e.point.events[f] || h.options && h.options.events && h.options.events[f]) && h.importEvents(); "click" === f && e.allowPointSelect && (d = function (a) { h.select && h.select(null, a.ctrlKey || a.metaKey || a.shiftKey) }); n(h, f, a, d) }; c.prototype.getClassName = function () {
                                return "highcharts-point" + (this.selected ? " highcharts-point-select" : "") + (this.negative ? " highcharts-negative" : "") + (this.isNull ? " highcharts-null-point" : "") + ("undefined" !==
                                    typeof this.colorIndex ? " highcharts-color-" + this.colorIndex : "") + (this.options.className ? " " + this.options.className : "") + (this.zone && this.zone.className ? " " + this.zone.className.replace("highcharts-negative", "") : "")
                            }; c.prototype.getGraphicalProps = function (f) {
                                var a = this, d = [], h, e = { singular: [], plural: [] }; f = f || { graphic: 1, dataLabel: 1 }; f.graphic && d.push("graphic", "shadowGroup"); f.dataLabel && d.push("dataLabel", "dataLabelUpper", "connector"); for (h = d.length; h--;) { var b = d[h]; a[b] && e.singular.push(b) } ["dataLabel",
                                    "connector"].forEach(function (b) { var d = b + "s"; f[b] && a[d] && e.plural.push(d) }); return e
                            }; c.prototype.getLabelConfig = function () { return { x: this.category, y: this.y, color: this.color, colorIndex: this.colorIndex, key: this.name || this.category, series: this.series, point: this, percentage: this.percentage, total: this.total || this.stackTotal } }; c.prototype.getNestedProperty = function (f) { if (f) return 0 === f.indexOf("custom.") ? D(f, this.options) : this[f] }; c.prototype.getZone = function () {
                                var f = this.series, a = f.zones; f = f.zoneAxis ||
                                    "y"; var d = 0, h; for (h = a[d]; this[f] >= h.value;)h = a[++d]; this.nonZonedColor || (this.nonZonedColor = this.color); this.color = h && h.color && !this.options.color ? h.color : this.nonZonedColor; return h
                            }; c.prototype.hasNewShapeType = function () { return (this.graphic && (this.graphic.symbolName || this.graphic.element.nodeName)) !== this.shapeType }; c.prototype.init = function (f, a, d) { this.series = f; this.applyOptions(a, d); this.id = q(this.id) ? this.id : L(); this.resolveColor(); f.chart.pointCount++; n(this, "afterInit"); return this }; c.prototype.optionsToObject =
                                function (f) { var a = {}, d = this.series, h = d.options.keys, e = h || d.pointArrayMap || ["y"], b = e.length, p = 0, k = 0; if (C(f) || null === f) a[e[0]] = f; else if (F(f)) for (!h && f.length > b && (d = typeof f[0], "string" === d ? a.name = f[0] : "number" === d && (a.x = f[0]), p++); k < b;)h && "undefined" === typeof f[p] || (0 < e[k].indexOf(".") ? c.prototype.setNestedProperty(a, f[p], e[k]) : a[e[k]] = f[p]), p++, k++; else "object" === typeof f && (a = f, f.dataLabels && (d._hasPointLabels = !0), f.marker && (d._hasPointMarkers = !0)); return a }; c.prototype.resolveColor = function () {
                                    var f =
                                        this.series; var a = f.chart.options.chart.colorCount; var d = f.chart.styledMode; d || this.options.color || (this.color = f.color); f.options.colorByPoint ? (d || (a = f.options.colors || f.chart.options.colors, this.color = this.color || a[f.colorCounter], a = a.length), d = f.colorCounter, f.colorCounter++, f.colorCounter === a && (f.colorCounter = 0)) : d = f.colorIndex; this.colorIndex = x(this.colorIndex, d)
                                }; c.prototype.setNestedProperty = function (f, a, d) {
                                    d.split(".").reduce(function (d, f, b, c) { d[f] = c.length - 1 === b ? a : k(d[f], !0) ? d[f] : {}; return d[f] },
                                        f); return f
                                }; c.prototype.tooltipFormatter = function (f) { var a = this.series, d = a.tooltipOptions, h = x(d.valueDecimals, ""), e = d.valuePrefix || "", b = d.valueSuffix || ""; a.chart.styledMode && (f = a.chart.tooltip.styledModeFormat(f)); (a.pointArrayMap || ["y"]).forEach(function (a) { a = "{point." + a; if (e || b) f = f.replace(RegExp(a + "}", "g"), e + a + "}" + b); f = f.replace(RegExp(a + "}", "g"), a + ":,." + h + "f}") }); return N(f, { point: this, series: this.series }, a.chart) }; return c
                        }(); c.Point = g; return c.Point
                }); P(u, "parts/Series.js", [u["parts/Globals.js"],
                u["mixins/legend-symbol.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function (c, g, u, q) {
                    ""; var y = q.addEvent, v = q.animObject, E = q.arrayMax, D = q.arrayMin, F = q.clamp, C = q.correctFloat, k = q.defined, r = q.erase, x = q.error, m = q.extend, L = q.find, n = q.fireEvent, M = q.getNestedProperty, f = q.isArray, a = q.isFunction, d = q.isNumber, h = q.isString, e = q.merge, b = q.objectEach, p = q.pick, z = q.removeEvent, t = q.seriesType, w = q.splat, G = q.syncTimeout, K = c.defaultOptions, Q = c.defaultPlotOptions, J = c.seriesTypes, S = c.SVGElement, A = c.win; c.Series =
                        t("line", null, {
                            lineWidth: 2, allowPointSelect: !1, showCheckbox: !1, animation: { duration: 1E3 }, events: {}, marker: { enabledThreshold: 2, lineColor: "#ffffff", lineWidth: 0, radius: 4, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, enabled: !0, radiusPlus: 2, lineWidthPlus: 1 }, select: { fillColor: "#cccccc", lineColor: "#000000", lineWidth: 2 } } }, point: { events: {} }, dataLabels: {
                                align: "center", formatter: function () { var a = this.series.chart.numberFormatter; return "number" !== typeof this.y ? "" : a(this.y, -1) }, padding: 5, style: {
                                    fontSize: "11px",
                                    fontWeight: "bolder", color: "contrast", textOutline: "1px contrast"
                                }, verticalAlign: "bottom", x: 0, y: 0
                            }, cropThreshold: 300, opacity: 1, pointRange: 0, softThreshold: !0, states: { normal: { animation: !0 }, hover: { animation: { duration: 50 }, lineWidthPlus: 1, marker: {}, halo: { size: 10, opacity: .25 } }, select: { animation: { duration: 0 } }, inactive: { animation: { duration: 50 }, opacity: .2 } }, stickyTracking: !0, turboThreshold: 1E3, findNearestPointBy: "x"
                        }, {
                            axisTypes: ["xAxis", "yAxis"], coll: "series", colorCounter: 0, cropShoulder: 1, directTouch: !1, eventsToUnbind: [],
                            isCartesian: !0, parallelArrays: ["x", "y"], pointClass: u, requireSorting: !0, sorted: !0, init: function (d, f) {
                                n(this, "init", { options: f }); var e = this, l = d.series, h; this.eventOptions = this.eventOptions || {}; e.chart = d; e.options = f = e.setOptions(f); e.linkedSeries = []; e.bindAxes(); m(e, { name: f.name, state: "", visible: !1 !== f.visible, selected: !0 === f.selected }); var c = f.events; b(c, function (b, d) { a(b) && e.eventOptions[d] !== b && (a(e.eventOptions[d]) && z(e, d, e.eventOptions[d]), e.eventOptions[d] = b, y(e, d, b)) }); if (c && c.click || f.point &&
                                    f.point.events && f.point.events.click || f.allowPointSelect) d.runTrackerClick = !0; e.getColor(); e.getSymbol(); e.parallelArrays.forEach(function (a) { e[a + "Data"] || (e[a + "Data"] = []) }); e.isCartesian && (d.hasCartesianSeries = !0); l.length && (h = l[l.length - 1]); e._i = p(h && h._i, -1) + 1; d.orderSeries(this.insert(l)); f.dataSorting && f.dataSorting.enabled ? e.setDataSortingOptions() : e.points || e.data || e.setData(f.data, !1); n(this, "afterInit")
                            }, is: function (a) { return J[a] && this instanceof J[a] }, insert: function (a) {
                                var b = this.options.index,
                                f; if (d(b)) { for (f = a.length; f--;)if (b >= p(a[f].options.index, a[f]._i)) { a.splice(f + 1, 0, this); break } -1 === f && a.unshift(this); f += 1 } else a.push(this); return p(f, a.length - 1)
                            }, bindAxes: function () {
                                var a = this, b = a.options, d = a.chart, f; n(this, "bindAxes", null, function () {
                                    (a.axisTypes || []).forEach(function (e) {
                                        d[e].forEach(function (d) { f = d.options; if (b[e] === f.index || "undefined" !== typeof b[e] && b[e] === f.id || "undefined" === typeof b[e] && 0 === f.index) a.insert(d.series), a[e] = d, d.isDirty = !0 }); a[e] || a.optionalAxis === e || x(18, !0,
                                            d)
                                    })
                                }); n(this, "afterBindAxes")
                            }, updateParallelArrays: function (a, b) { var f = a.series, e = arguments, l = d(b) ? function (d) { var e = "y" === d && f.toYData ? f.toYData(a) : a[d]; f[d + "Data"][b] = e } : function (a) { Array.prototype[b].apply(f[a + "Data"], Array.prototype.slice.call(e, 2)) }; f.parallelArrays.forEach(l) }, hasData: function () { return this.visible && "undefined" !== typeof this.dataMax && "undefined" !== typeof this.dataMin || this.visible && this.yData && 0 < this.yData.length }, autoIncrement: function () {
                                var a = this.options, b = this.xIncrement,
                                d, f = a.pointIntervalUnit, e = this.chart.time; b = p(b, a.pointStart, 0); this.pointInterval = d = p(this.pointInterval, a.pointInterval, 1); f && (a = new e.Date(b), "day" === f ? e.set("Date", a, e.get("Date", a) + d) : "month" === f ? e.set("Month", a, e.get("Month", a) + d) : "year" === f && e.set("FullYear", a, e.get("FullYear", a) + d), d = a.getTime() - b); this.xIncrement = b + d; return b
                            }, setDataSortingOptions: function () { var a = this.options; m(this, { requireSorting: !1, sorted: !1, enabledDataSorting: !0, allowDG: !1 }); k(a.pointRange) || (a.pointRange = 1) }, setOptions: function (a) {
                                var b =
                                    this.chart, d = b.options, f = d.plotOptions, l = b.userOptions || {}; a = e(a); b = b.styledMode; var h = { plotOptions: f, userOptions: a }; n(this, "setOptions", h); var c = h.plotOptions[this.type], m = l.plotOptions || {}; this.userOptions = h.userOptions; l = e(c, f.series, l.plotOptions && l.plotOptions[this.type], a); this.tooltipOptions = e(K.tooltip, K.plotOptions.series && K.plotOptions.series.tooltip, K.plotOptions[this.type].tooltip, d.tooltip.userOptions, f.series && f.series.tooltip, f[this.type].tooltip, a.tooltip); this.stickyTracking = p(a.stickyTracking,
                                        m[this.type] && m[this.type].stickyTracking, m.series && m.series.stickyTracking, this.tooltipOptions.shared && !this.noSharedTooltip ? !0 : l.stickyTracking); null === c.marker && delete l.marker; this.zoneAxis = l.zoneAxis; d = this.zones = (l.zones || []).slice(); !l.negativeColor && !l.negativeFillColor || l.zones || (f = { value: l[this.zoneAxis + "Threshold"] || l.threshold || 0, className: "highcharts-negative" }, b || (f.color = l.negativeColor, f.fillColor = l.negativeFillColor), d.push(f)); d.length && k(d[d.length - 1].value) && d.push(b ? {} : {
                                            color: this.color,
                                            fillColor: this.fillColor
                                        }); n(this, "afterSetOptions", { options: l }); return l
                            }, getName: function () { return p(this.options.name, "Series " + (this.index + 1)) }, getCyclic: function (a, b, d) { var f = this.chart, e = this.userOptions, l = a + "Index", h = a + "Counter", c = d ? d.length : p(f.options.chart[a + "Count"], f[a + "Count"]); if (!b) { var m = p(e[l], e["_" + l]); k(m) || (f.series.length || (f[h] = 0), e["_" + l] = m = f[h] % c, f[h] += 1); d && (b = d[m]) } "undefined" !== typeof m && (this[l] = m); this[a] = b }, getColor: function () {
                                this.chart.styledMode ? this.getCyclic("color") :
                                this.options.colorByPoint ? this.options.color = null : this.getCyclic("color", this.options.color || Q[this.type].color, this.chart.options.colors)
                            }, getPointsCollection: function () { return (this.hasGroupedData ? this.points : this.data) || [] }, getSymbol: function () { this.getCyclic("symbol", this.options.marker.symbol, this.chart.options.symbols) }, findPointIndex: function (a, b) {
                                var f = a.id, e = a.x, l = this.points, h, c = this.options.dataSorting; if (f) var p = this.chart.get(f); else if (this.linkedParent || this.enabledDataSorting) {
                                    var k =
                                        c && c.matchByName ? "name" : "index"; p = L(l, function (b) { return !b.touched && b[k] === a[k] }); if (!p) return
                                } if (p) { var m = p && p.index; "undefined" !== typeof m && (h = !0) } "undefined" === typeof m && d(e) && (m = this.xData.indexOf(e, b)); -1 !== m && "undefined" !== typeof m && this.cropped && (m = m >= this.cropStart ? m - this.cropStart : m); !h && l[m] && l[m].touched && (m = void 0); return m
                            }, drawLegendSymbol: g.drawLineMarker, updateData: function (a, b) {
                                var f = this.options, e = f.dataSorting, l = this.points, h = [], c, p, m, n = this.requireSorting, t = a.length === l.length,
                                w = !0; this.xIncrement = null; a.forEach(function (a, b) { var p = k(a) && this.pointClass.prototype.optionsToObject.call({ series: this }, a) || {}; var w = p.x; if (p.id || d(w)) { if (w = this.findPointIndex(p, m), -1 === w || "undefined" === typeof w ? h.push(a) : l[w] && a !== f.data[w] ? (l[w].update(a, !1, null, !1), l[w].touched = !0, n && (m = w + 1)) : l[w] && (l[w].touched = !0), !t || b !== w || e && e.enabled || this.hasDerivedData) c = !0 } else h.push(a) }, this); if (c) for (a = l.length; a--;)(p = l[a]) && !p.touched && p.remove && p.remove(!1, b); else !t || e && e.enabled ? w = !1 : (a.forEach(function (a,
                                    b) { l[b].update && a !== l[b].y && l[b].update(a, !1, null, !1) }), h.length = 0); l.forEach(function (a) { a && (a.touched = !1) }); if (!w) return !1; h.forEach(function (a) { this.addPoint(a, !1, null, null, !1) }, this); null === this.xIncrement && this.xData && this.xData.length && (this.xIncrement = E(this.xData), this.autoIncrement()); return !0
                            }, setData: function (a, b, e, c) {
                                var l = this, k = l.points, m = k && k.length || 0, n, w = l.options, t = l.chart, g = w.dataSorting, r = null, z = l.xAxis; r = w.turboThreshold; var H = this.xData, q = this.yData, I = (n = l.pointArrayMap) && n.length,
                                    G = w.keys, A = 0, K = 1, v; a = a || []; n = a.length; b = p(b, !0); g && g.enabled && (a = this.sortData(a)); !1 !== c && n && m && !l.cropped && !l.hasGroupedData && l.visible && !l.isSeriesBoosting && (v = this.updateData(a, e)); if (!v) {
                                    l.xIncrement = null; l.colorCounter = 0; this.parallelArrays.forEach(function (a) { l[a + "Data"].length = 0 }); if (r && n > r) if (r = l.getFirstValidPoint(a), d(r)) for (e = 0; e < n; e++)H[e] = this.autoIncrement(), q[e] = a[e]; else if (f(r)) if (I) for (e = 0; e < n; e++)c = a[e], H[e] = c[0], q[e] = c.slice(1, I + 1); else for (G && (A = G.indexOf("x"), K = G.indexOf("y"),
                                        A = 0 <= A ? A : 0, K = 0 <= K ? K : 1), e = 0; e < n; e++)c = a[e], H[e] = c[A], q[e] = c[K]; else x(12, !1, t); else for (e = 0; e < n; e++)"undefined" !== typeof a[e] && (c = { series: l }, l.pointClass.prototype.applyOptions.apply(c, [a[e]]), l.updateParallelArrays(c, e)); q && h(q[0]) && x(14, !0, t); l.data = []; l.options.data = l.userOptions.data = a; for (e = m; e--;)k[e] && k[e].destroy && k[e].destroy(); z && (z.minRange = z.userMinRange); l.isDirty = t.isDirtyBox = !0; l.isDirtyData = !!k; e = !1
                                    } "point" === w.legendType && (this.processData(), this.generatePoints()); b && t.redraw(e)
                            },
                            sortData: function (a) {
                                var b = this, d = b.options.dataSorting.sortKey || "y", e = function (a, b) { return k(b) && a.pointClass.prototype.optionsToObject.call({ series: a }, b) || {} }; a.forEach(function (d, f) { a[f] = e(b, d); a[f].index = f }, this); a.concat().sort(function (a, b) { a = M(d, a); b = M(d, b); return b < a ? -1 : b > a ? 1 : 0 }).forEach(function (a, b) { a.x = b }, this); b.linkedSeries && b.linkedSeries.forEach(function (b) {
                                    var d = b.options, f = d.data; d.dataSorting && d.dataSorting.enabled || !f || (f.forEach(function (d, l) {
                                    f[l] = e(b, d); a[l] && (f[l].x = a[l].x, f[l].index =
                                        l)
                                    }), b.setData(f, !1))
                                }); return a
                            }, processData: function (a) {
                                var b = this.xData, d = this.yData, f = b.length; var e = 0; var l = this.xAxis, h = this.options; var c = h.cropThreshold; var p = this.getExtremesFromAll || h.getExtremesFromAll, k = this.isCartesian; h = l && l.val2lin; var m = l && l.isLog, n = this.requireSorting; if (k && !this.isDirty && !l.isDirty && !this.yAxis.isDirty && !a) return !1; if (l) { a = l.getExtremes(); var w = a.min; var t = a.max } if (k && this.sorted && !p && (!c || f > c || this.forceCrop)) if (b[f - 1] < w || b[0] > t) b = [], d = []; else if (this.yData && (b[0] <
                                    w || b[f - 1] > t)) { e = this.cropData(this.xData, this.yData, w, t); b = e.xData; d = e.yData; e = e.start; var g = !0 } for (c = b.length || 1; --c;)if (f = m ? h(b[c]) - h(b[c - 1]) : b[c] - b[c - 1], 0 < f && ("undefined" === typeof r || f < r)) var r = f; else 0 > f && n && (x(15, !1, this.chart), n = !1); this.cropped = g; this.cropStart = e; this.processedXData = b; this.processedYData = d; this.closestPointRange = this.basePointRange = r
                            }, cropData: function (a, b, d, f, e) {
                                var l = a.length, h = 0, c = l, k; e = p(e, this.cropShoulder); for (k = 0; k < l; k++)if (a[k] >= d) { h = Math.max(0, k - e); break } for (d = k; d <
                                    l; d++)if (a[d] > f) { c = d + e; break } return { xData: a.slice(h, c), yData: b.slice(h, c), start: h, end: c }
                            }, generatePoints: function () {
                                var a = this.options, b = a.data, d = this.data, f, e = this.processedXData, h = this.processedYData, c = this.pointClass, p = e.length, k = this.cropStart || 0, t = this.hasGroupedData; a = a.keys; var g = [], r; d || t || (d = [], d.length = b.length, d = this.data = d); a && t && (this.options.keys = !1); for (r = 0; r < p; r++) {
                                    var z = k + r; if (t) {
                                        var q = (new c).init(this, [e[r]].concat(w(h[r]))); q.dataGroup = this.groupMap[r]; q.dataGroup.options && (q.options =
                                            q.dataGroup.options, m(q, q.dataGroup.options), delete q.dataLabels)
                                    } else (q = d[z]) || "undefined" === typeof b[z] || (d[z] = q = (new c).init(this, b[z], e[r])); q && (q.index = z, g[r] = q)
                                } this.options.keys = a; if (d && (p !== (f = d.length) || t)) for (r = 0; r < f; r++)r !== k || t || (r += p), d[r] && (d[r].destroyElements(), d[r].plotX = void 0); this.data = d; this.points = g; n(this, "afterGeneratePoints")
                            }, getXExtremes: function (a) { return { min: D(a), max: E(a) } }, getExtremes: function (a) {
                                var b = this.xAxis, e = this.yAxis, l = this.processedXData || this.xData, h = [], c =
                                    0, p = 0; var k = 0; var m = this.requireSorting ? this.cropShoulder : 0, t = e ? e.positiveValuesOnly : !1, w; a = a || this.stackedYData || this.processedYData || []; e = a.length; b && (k = b.getExtremes(), p = k.min, k = k.max); for (w = 0; w < e; w++) { var r = l[w]; var g = a[w]; var z = (d(g) || f(g)) && (g.length || 0 < g || !t); r = this.getExtremesFromAll || this.options.getExtremesFromAll || this.cropped || !b || (l[w + m] || r) >= p && (l[w - m] || r) <= k; if (z && r) if (z = g.length) for (; z--;)d(g[z]) && (h[c++] = g[z]); else h[c++] = g } this.dataMin = D(h); this.dataMax = E(h); n(this, "afterGetExtremes")
                            },
                            getFirstValidPoint: function (a) { for (var b = null, d = a.length, e = 0; null === b && e < d;)b = a[e], e++; return b }, translate: function () {
                            this.processedXData || this.processData(); this.generatePoints(); var a = this.options, b = a.stacking, e = this.xAxis, h = e.categories, c = this.enabledDataSorting, m = this.yAxis, w = this.points, t = w.length, r = !!this.modifyValue, g, z = this.pointPlacementToXValue(), q = !!z, x = a.threshold, G = a.startFromThreshold ? x : 0, A, K = this.zoneAxis || "y", v = Number.MAX_VALUE; for (g = 0; g < t; g++) {
                                var J = w[g], L = J.x, S = J.y, y = J.low, M = b &&
                                    m.stacks[(this.negStacks && S < (G ? 0 : x) ? "-" : "") + this.stackKey]; m.positiveValuesOnly && null !== S && 0 >= S && (J.isNull = !0); J.plotX = A = C(F(e.translate(L, 0, 0, 0, 1, z, "flags" === this.type), -1E5, 1E5)); if (b && this.visible && M && M[L]) { var u = this.getStackIndicator(u, L, this.index); if (!J.isNull) { var D = M[L]; var Q = D.points[u.key] } } f(Q) && (y = Q[0], S = Q[1], y === G && u.key === M[L].base && (y = p(d(x) && x, m.min)), m.positiveValuesOnly && 0 >= y && (y = null), J.total = J.stackTotal = D.total, J.percentage = D.total && J.y / D.total * 100, J.stackY = S, this.irregularWidths ||
                                        D.setOffset(this.pointXOffset || 0, this.barW || 0)); J.yBottom = k(y) ? F(m.translate(y, 0, 1, 0, 1), -1E5, 1E5) : null; r && (S = this.modifyValue(S, J)); J.plotY = "number" === typeof S && Infinity !== S ? F(m.translate(S, 0, 1, 0, 1), -1E5, 1E5) : void 0; J.isInside = this.isPointInside(J); J.clientX = q ? C(e.translate(L, 0, 0, 0, 1, z)) : A; J.negative = J[K] < (a[K + "Threshold"] || x || 0); J.category = h && "undefined" !== typeof h[J.x] ? h[J.x] : J.x; if (!J.isNull && !1 !== J.visible) { "undefined" !== typeof E && (v = Math.min(v, Math.abs(A - E))); var E = A } J.zone = this.zones.length &&
                                            J.getZone(); !J.graphic && this.group && c && (J.isNew = !0)
                            } this.closestPointRangePx = v; n(this, "afterTranslate")
                            }, getValidPoints: function (a, b, d) { var e = this.chart; return (a || this.points || []).filter(function (a) { return b && !e.isInsidePlot(a.plotX, a.plotY, e.inverted) ? !1 : !1 !== a.visible && (d || !a.isNull) }) }, getClipBox: function (a, b) {
                                var d = this.options, e = this.chart, f = e.inverted, l = this.xAxis, h = l && this.yAxis; a && !1 === d.clip && h ? a = f ? {
                                    y: -e.chartWidth + h.len + h.pos, height: e.chartWidth, width: e.chartHeight, x: -e.chartHeight + l.len +
                                        l.pos
                                } : { y: -h.pos, height: e.chartHeight, width: e.chartWidth, x: -l.pos } : (a = this.clipBox || e.clipBox, b && (a.width = e.plotSizeX, a.x = 0)); return b ? { width: a.width, x: a.x } : a
                            }, setClip: function (a) {
                                var b = this.chart, d = this.options, e = b.renderer, f = b.inverted, l = this.clipBox, h = this.getClipBox(a), c = this.sharedClipKey || ["_sharedClip", a && a.duration, a && a.easing, h.height, d.xAxis, d.yAxis].join(), p = b[c], k = b[c + "m"]; a && (h.width = 0, f && (h.x = b.plotHeight + (!1 !== d.clip ? 0 : b.plotTop))); p ? b.hasLoaded || p.attr(h) : (a && (b[c + "m"] = k = e.clipRect(f ?
                                    b.plotSizeX + 99 : -99, f ? -b.plotLeft : -b.plotTop, 99, f ? b.chartWidth : b.chartHeight)), b[c] = p = e.clipRect(h), p.count = { length: 0 }); a && !p.count[this.index] && (p.count[this.index] = !0, p.count.length += 1); if (!1 !== d.clip || a) this.group.clip(a || l ? p : b.clipRect), this.markerGroup.clip(k), this.sharedClipKey = c; a || (p.count[this.index] && (delete p.count[this.index], --p.count.length), 0 === p.count.length && c && b[c] && (l || (b[c] = b[c].destroy()), b[c + "m"] && (b[c + "m"] = b[c + "m"].destroy())))
                            }, animate: function (a) {
                                var b = this.chart, d = v(this.options.animation);
                                if (!b.hasRendered) if (a) this.setClip(d); else { var e = this.sharedClipKey; a = b[e]; var f = this.getClipBox(d, !0); a && a.animate(f, d); b[e + "m"] && b[e + "m"].animate({ width: f.width + 99, x: f.x - (b.inverted ? 0 : 99) }, d) }
                            }, afterAnimate: function () { this.setClip(); n(this, "afterAnimate"); this.finishedAnimating = !0 }, drawPoints: function () {
                                var a = this.points, b = this.chart, d, e, f = this.options.marker, h = this[this.specialGroup] || this.markerGroup, c = this.xAxis, k = p(f.enabled, !c || c.isRadial ? !0 : null, this.closestPointRangePx >= f.enabledThreshold *
                                    f.radius); if (!1 !== f.enabled || this._hasPointMarkers) for (d = 0; d < a.length; d++) {
                                        var m = a[d]; var n = (e = m.graphic) ? "animate" : "attr"; var w = m.marker || {}; var t = !!m.marker; if ((k && "undefined" === typeof w.enabled || w.enabled) && !m.isNull && !1 !== m.visible) {
                                            var r = p(w.symbol, this.symbol); var g = this.markerAttribs(m, m.selected && "select"); this.enabledDataSorting && (m.startXPos = c.reversed ? -g.width : c.width); var z = !1 !== m.isInside; e ? e[z ? "show" : "hide"](z).animate(g) : z && (0 < g.width || m.hasImage) && (m.graphic = e = b.renderer.symbol(r,
                                                g.x, g.y, g.width, g.height, t ? w : f).add(h), this.enabledDataSorting && b.hasRendered && (e.attr({ x: m.startXPos }), n = "animate")); e && "animate" === n && e[z ? "show" : "hide"](z).animate(g); if (e && !b.styledMode) e[n](this.pointAttribs(m, m.selected && "select")); e && e.addClass(m.getClassName(), !0)
                                        } else e && (m.graphic = e.destroy())
                                    }
                            }, markerAttribs: function (a, b) {
                                var d = this.options.marker, e = a.marker || {}, f = e.symbol || d.symbol, h = p(e.radius, d.radius); b && (d = d.states[b], b = e.states && e.states[b], h = p(b && b.radius, d && d.radius, h + (d && d.radiusPlus ||
                                    0))); a.hasImage = f && 0 === f.indexOf("url"); a.hasImage && (h = 0); a = { x: Math.floor(a.plotX) - h, y: a.plotY - h }; h && (a.width = a.height = 2 * h); return a
                            }, pointAttribs: function (a, b) {
                                var d = this.options.marker, e = a && a.options, f = e && e.marker || {}, h = this.color, c = e && e.color, l = a && a.color; e = p(f.lineWidth, d.lineWidth); var k = a && a.zone && a.zone.color; a = 1; h = c || k || l || h; c = f.fillColor || d.fillColor || h; h = f.lineColor || d.lineColor || h; b = b || "normal"; d = d.states[b]; b = f.states && f.states[b] || {}; e = p(b.lineWidth, d.lineWidth, e + p(b.lineWidthPlus, d.lineWidthPlus,
                                    0)); c = b.fillColor || d.fillColor || c; h = b.lineColor || d.lineColor || h; a = p(b.opacity, d.opacity, a); return { stroke: h, "stroke-width": e, fill: c, opacity: a }
                            }, destroy: function (a) {
                                var d = this, e = d.chart, f = /AppleWebKit\/533/.test(A.navigator.userAgent), h, c, l = d.data || [], p, k; n(d, "destroy"); this.removeEvents(a); (d.axisTypes || []).forEach(function (a) { (k = d[a]) && k.series && (r(k.series, d), k.isDirty = k.forceRedraw = !0) }); d.legendItem && d.chart.legend.destroyItem(d); for (c = l.length; c--;)(p = l[c]) && p.destroy && p.destroy(); d.points = null;
                                q.clearTimeout(d.animationTimeout); b(d, function (a, b) { a instanceof S && !a.survive && (h = f && "group" === b ? "hide" : "destroy", a[h]()) }); e.hoverSeries === d && (e.hoverSeries = null); r(e.series, d); e.orderSeries(); b(d, function (b, e) { a && "hcEvents" === e || delete d[e] })
                            }, getGraphPath: function (a, b, d) {
                                var e = this, f = e.options, h = f.step, c, l = [], p = [], m; a = a || e.points; (c = a.reversed) && a.reverse(); (h = { right: 1, center: 2 }[h] || h && 3) && c && (h = 4 - h); a = this.getValidPoints(a, !1, !(f.connectNulls && !b && !d)); a.forEach(function (c, n) {
                                    var w = c.plotX,
                                    t = c.plotY, g = a[n - 1]; (c.leftCliff || g && g.rightCliff) && !d && (m = !0); c.isNull && !k(b) && 0 < n ? m = !f.connectNulls : c.isNull && !b ? m = !0 : (0 === n || m ? n = ["M", c.plotX, c.plotY] : e.getPointSpline ? n = e.getPointSpline(a, c, n) : h ? (n = 1 === h ? ["L", g.plotX, t] : 2 === h ? ["L", (g.plotX + w) / 2, g.plotY, "L", (g.plotX + w) / 2, t] : ["L", w, g.plotY], n.push("L", w, t)) : n = ["L", w, t], p.push(c.x), h && (p.push(c.x), 2 === h && p.push(c.x)), l.push.apply(l, n), m = !1)
                                }); l.xMap = p; return e.graphPath = l
                            }, drawGraph: function () {
                                var a = this, b = this.options, d = (this.gappedPath || this.getGraphPath).call(this),
                                e = this.chart.styledMode, f = [["graph", "highcharts-graph"]]; e || f[0].push(b.lineColor || this.color || "#cccccc", b.dashStyle); f = a.getZonesGraphs(f); f.forEach(function (f, h) {
                                    var c = f[0], l = a[c], p = l ? "animate" : "attr"; l ? (l.endX = a.preventGraphAnimation ? null : d.xMap, l.animate({ d: d })) : d.length && (a[c] = l = a.chart.renderer.path(d).addClass(f[1]).attr({ zIndex: 1 }).add(a.group)); l && !e && (c = { stroke: f[2], "stroke-width": b.lineWidth, fill: a.fillGraph && a.color || "none" }, f[3] ? c.dashstyle = f[3] : "square" !== b.linecap && (c["stroke-linecap"] =
                                        c["stroke-linejoin"] = "round"), l[p](c).shadow(2 > h && b.shadow)); l && (l.startX = d.xMap, l.isArea = d.isArea)
                                })
                            }, getZonesGraphs: function (a) { this.zones.forEach(function (b, d) { d = ["zone-graph-" + d, "highcharts-graph highcharts-zone-graph-" + d + " " + (b.className || "")]; this.chart.styledMode || d.push(b.color || this.color, b.dashStyle || this.options.dashStyle); a.push(d) }, this); return a }, applyZones: function () {
                                var a = this, b = this.chart, d = b.renderer, e = this.zones, f, h, c = this.clips || [], k, m = this.graph, n = this.area, w = Math.max(b.chartWidth,
                                    b.chartHeight), t = this[(this.zoneAxis || "y") + "Axis"], g = b.inverted, r, z, q, x = !1; if (e.length && (m || n) && t && "undefined" !== typeof t.min) {
                                        var G = t.reversed; var A = t.horiz; m && !this.showLine && m.hide(); n && n.hide(); var K = t.getExtremes(); e.forEach(function (e, l) {
                                            f = G ? A ? b.plotWidth : 0 : A ? 0 : t.toPixels(K.min) || 0; f = F(p(h, f), 0, w); h = F(Math.round(t.toPixels(p(e.value, K.max), !0) || 0), 0, w); x && (f = h = t.toPixels(K.max)); r = Math.abs(f - h); z = Math.min(f, h); q = Math.max(f, h); t.isXAxis ? (k = { x: g ? q : z, y: 0, width: r, height: w }, A || (k.x = b.plotHeight -
                                                k.x)) : (k = { x: 0, y: g ? q : z, width: w, height: r }, A && (k.y = b.plotWidth - k.y)); g && d.isVML && (k = t.isXAxis ? { x: 0, y: G ? z : q, height: k.width, width: b.chartWidth } : { x: k.y - b.plotLeft - b.spacingBox.x, y: 0, width: k.height, height: b.chartHeight }); c[l] ? c[l].animate(k) : c[l] = d.clipRect(k); m && a["zone-graph-" + l].clip(c[l]); n && a["zone-area-" + l].clip(c[l]); x = e.value > K.max; a.resetZones && 0 === h && (h = void 0)
                                        }); this.clips = c
                                    } else a.visible && (m && m.show(!0), n && n.show(!0))
                            }, invertGroups: function (a) {
                                function b() {
                                    ["group", "markerGroup"].forEach(function (b) {
                                    d[b] &&
                                        (e.renderer.isVML && d[b].attr({ width: d.yAxis.len, height: d.xAxis.len }), d[b].width = d.yAxis.len, d[b].height = d.xAxis.len, d[b].invert(d.isRadialSeries ? !1 : a))
                                    })
                                } var d = this, e = d.chart; d.xAxis && (d.eventsToUnbind.push(y(e, "resize", b)), b(), d.invertGroups = b)
                            }, plotGroup: function (a, b, d, e, f) {
                                var h = this[a], c = !h; c && (this[a] = h = this.chart.renderer.g().attr({ zIndex: e || .1 }).add(f)); h.addClass("highcharts-" + b + " highcharts-series-" + this.index + " highcharts-" + this.type + "-series " + (k(this.colorIndex) ? "highcharts-color-" + this.colorIndex +
                                    " " : "") + (this.options.className || "") + (h.hasClass("highcharts-tracker") ? " highcharts-tracker" : ""), !0); h.attr({ visibility: d })[c ? "attr" : "animate"](this.getPlotBox()); return h
                            }, getPlotBox: function () { var a = this.chart, b = this.xAxis, d = this.yAxis; a.inverted && (b = d, d = this.xAxis); return { translateX: b ? b.left : a.plotLeft, translateY: d ? d.top : a.plotTop, scaleX: 1, scaleY: 1 } }, removeEvents: function (a) { a ? this.eventsToUnbind.length && (this.eventsToUnbind.forEach(function (a) { a() }), this.eventsToUnbind.length = 0) : z(this) }, render: function () {
                                var a =
                                    this, b = a.chart, d = a.options, e = !a.finishedAnimating && b.renderer.isSVG && v(d.animation).duration, f = a.visible ? "inherit" : "hidden", h = d.zIndex, c = a.hasRendered, p = b.seriesGroup, k = b.inverted; n(this, "render"); var m = a.plotGroup("group", "series", f, h, p); a.markerGroup = a.plotGroup("markerGroup", "markers", f, h, p); e && a.animate && a.animate(!0); m.inverted = a.isCartesian || a.invertable ? k : !1; a.drawGraph && (a.drawGraph(), a.applyZones()); a.visible && a.drawPoints(); a.drawDataLabels && a.drawDataLabels(); a.redrawPoints && a.redrawPoints();
                                a.drawTracker && !1 !== a.options.enableMouseTracking && a.drawTracker(); a.invertGroups(k); !1 === d.clip || a.sharedClipKey || c || m.clip(b.clipRect); e && a.animate && a.animate(); c || (a.animationTimeout = G(function () { a.afterAnimate() }, e || 0)); a.isDirty = !1; a.hasRendered = !0; n(a, "afterRender")
                            }, redraw: function () {
                                var a = this.chart, b = this.isDirty || this.isDirtyData, d = this.group, e = this.xAxis, f = this.yAxis; d && (a.inverted && d.attr({ width: a.plotWidth, height: a.plotHeight }), d.animate({
                                    translateX: p(e && e.left, a.plotLeft), translateY: p(f &&
                                        f.top, a.plotTop)
                                })); this.translate(); this.render(); b && delete this.kdTree
                            }, kdAxisArray: ["clientX", "plotY"], searchPoint: function (a, b) { var d = this.xAxis, e = this.yAxis, f = this.chart.inverted; return this.searchKDTree({ clientX: f ? d.len - a.chartY + d.pos : a.chartX - d.pos, plotY: f ? e.len - a.chartX + e.pos : a.chartY - e.pos }, b, a) }, buildKDTree: function (a) {
                                function b(a, e, f) {
                                    var h; if (h = a && a.length) {
                                        var c = d.kdAxisArray[e % f]; a.sort(function (a, b) { return a[c] - b[c] }); h = Math.floor(h / 2); return {
                                            point: a[h], left: b(a.slice(0, h), e + 1, f),
                                            right: b(a.slice(h + 1), e + 1, f)
                                        }
                                    }
                                } this.buildingKdTree = !0; var d = this, e = -1 < d.options.findNearestPointBy.indexOf("y") ? 2 : 1; delete d.kdTree; G(function () { d.kdTree = b(d.getValidPoints(null, !d.directTouch), e, e); d.buildingKdTree = !1 }, d.options.kdNow || a && "touchstart" === a.type ? 0 : 1)
                            }, searchKDTree: function (a, b, d) {
                                function e(a, b, d, p) {
                                    var m = b.point, n = f.kdAxisArray[d % p], w = m; var t = k(a[h]) && k(m[h]) ? Math.pow(a[h] - m[h], 2) : null; var g = k(a[c]) && k(m[c]) ? Math.pow(a[c] - m[c], 2) : null; g = (t || 0) + (g || 0); m.dist = k(g) ? Math.sqrt(g) : Number.MAX_VALUE;
                                    m.distX = k(t) ? Math.sqrt(t) : Number.MAX_VALUE; n = a[n] - m[n]; g = 0 > n ? "left" : "right"; t = 0 > n ? "right" : "left"; b[g] && (g = e(a, b[g], d + 1, p), w = g[l] < w[l] ? g : m); b[t] && Math.sqrt(n * n) < w[l] && (a = e(a, b[t], d + 1, p), w = a[l] < w[l] ? a : w); return w
                                } var f = this, h = this.kdAxisArray[0], c = this.kdAxisArray[1], l = b ? "distX" : "dist"; b = -1 < f.options.findNearestPointBy.indexOf("y") ? 2 : 1; this.kdTree || this.buildingKdTree || this.buildKDTree(d); if (this.kdTree) return e(a, this.kdTree, b, b)
                            }, pointPlacementToXValue: function () {
                                var a = this.options, b = a.pointRange,
                                e = this.xAxis; a = a.pointPlacement; "between" === a && (a = e.reversed ? -.5 : .5); return d(a) ? a * p(b, e.pointRange) : 0
                            }, isPointInside: function (a) { return "undefined" !== typeof a.plotY && "undefined" !== typeof a.plotX && 0 <= a.plotY && a.plotY <= this.yAxis.len && 0 <= a.plotX && a.plotX <= this.xAxis.len }
                        }); ""
                }); P(u, "parts/Stacking.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    var u = g.correctFloat, q = g.defined, y = g.destroyObjectProperties, v = g.format, N = g.objectEach, D = g.pick; g = c.Axis; var F = c.Chart, C = c.Series; c.StackItem =
                        function (c, g, q, m, v) { var k = c.chart.inverted; this.axis = c; this.isNegative = q; this.options = g = g || {}; this.x = m; this.total = null; this.points = {}; this.stack = v; this.rightCliff = this.leftCliff = 0; this.alignOptions = { align: g.align || (k ? q ? "left" : "right" : "center"), verticalAlign: g.verticalAlign || (k ? "middle" : q ? "bottom" : "top"), y: g.y, x: g.x }; this.textAlign = g.textAlign || (k ? q ? "right" : "left" : "center") }; c.StackItem.prototype = {
                            destroy: function () { y(this, this.axis) }, render: function (c) {
                                var k = this.axis.chart, g = this.options, m = g.format;
                                m = m ? v(m, this, k) : g.formatter.call(this); this.label ? this.label.attr({ text: m, visibility: "hidden" }) : (this.label = k.renderer.label(m, null, null, g.shape, null, null, g.useHTML, !1, "stack-labels"), m = { text: m, rotation: g.rotation, padding: D(g.padding, 5), visibility: "hidden" }, this.label.attr(m), k.styledMode || this.label.css(g.style), this.label.added || this.label.add(c)); this.label.labelrank = k.plotHeight
                            }, setOffset: function (c, g, x, m, v) {
                                var k = this.axis, r = k.chart; m = k.translate(k.usePercentage ? 100 : m ? m : this.total, 0, 0, 0, 1);
                                x = k.translate(x ? x : 0); x = q(m) && Math.abs(m - x); c = D(v, r.xAxis[0].translate(this.x)) + c; k = q(m) && this.getStackBox(r, this, c, m, g, x, k); g = this.label; x = this.isNegative; c = "justify" === D(this.options.overflow, "justify"); var f = this.textAlign; g && k && (v = g.getBBox(), m = g.padding, f = "left" === f ? r.inverted ? -m : m : "right" === f ? v.width : r.inverted && "center" === f ? v.width / 2 : r.inverted ? x ? v.width + m : -m : v.width / 2, x = r.inverted ? v.height / 2 : x ? -m : v.height, this.alignOptions.x = D(this.options.x, 0), this.alignOptions.y = D(this.options.y, 0), k.x -=
                                    f, k.y -= x, g.align(this.alignOptions, null, k), r.isInsidePlot(g.alignAttr.x + f - this.alignOptions.x, g.alignAttr.y + x - this.alignOptions.y) ? g.show() : (g.alignAttr.y = -9999, c = !1), c && C.prototype.justifyDataLabel.call(this.axis, g, this.alignOptions, g.alignAttr, v, k), g.attr({ x: g.alignAttr.x, y: g.alignAttr.y }), D(!c && this.options.crop, !0) && ((r = r.isInsidePlot(g.x - m + g.width, g.y) && r.isInsidePlot(g.x + m, g.y)) || g.hide()))
                            }, getStackBox: function (c, g, q, m, v, n, y) {
                                var f = g.axis.reversed, a = c.inverted; c = y.height + y.pos - (a ? c.plotLeft :
                                    c.plotTop); g = g.isNegative && !f || !g.isNegative && f; return { x: a ? g ? m : m - n : q, y: a ? c - q - v : g ? c - m - n : c - m, width: a ? n : v, height: a ? v : n }
                            }
                        }; F.prototype.getStacks = function () { var c = this, g = c.inverted; c.yAxis.forEach(function (c) { c.stacks && c.hasVisibleSeries && (c.oldStacks = c.stacks) }); c.series.forEach(function (k) { var m = k.xAxis && k.xAxis.options || {}; !k.options.stacking || !0 !== k.visible && !1 !== c.options.chart.ignoreHiddenSeries || (k.stackKey = [k.type, D(k.options.stack, ""), g ? m.top : m.left, g ? m.height : m.width].join()) }) }; g.prototype.buildStacks =
                            function () { var k = this.series, g = D(this.options.reversedStacks, !0), q = k.length, m; if (!this.isXAxis) { this.usePercentage = !1; for (m = q; m--;) { var v = k[g ? m : q - m - 1]; v.setStackedPoints() } for (m = 0; m < q; m++)k[m].modifyStacks(); c.fireEvent(this, "afterBuildStacks") } }; g.prototype.renderStackTotals = function () {
                                var c = this.chart, g = c.renderer, q = this.stacks, m = this.stackTotalGroup; m || (this.stackTotalGroup = m = g.g("stack-labels").attr({ visibility: "visible", zIndex: 6 }).add()); m.translate(c.plotLeft, c.plotTop); N(q, function (c) {
                                    N(c,
                                        function (c) { c.render(m) })
                                })
                            }; g.prototype.resetStacks = function () { var c = this, g = c.stacks; c.isXAxis || N(g, function (k) { N(k, function (m, g) { m.touched < c.stacksTouched ? (m.destroy(), delete k[g]) : (m.total = null, m.cumulative = null) }) }) }; g.prototype.cleanStacks = function () { if (!this.isXAxis) { if (this.oldStacks) var c = this.stacks = this.oldStacks; N(c, function (c) { N(c, function (c) { c.cumulative = c.total }) }) } }; C.prototype.setStackedPoints = function () {
                                if (this.options.stacking && (!0 === this.visible || !1 === this.chart.options.chart.ignoreHiddenSeries)) {
                                    var k =
                                        this.processedXData, g = this.processedYData, x = [], m = g.length, v = this.options, n = v.threshold, y = D(v.startFromThreshold && n, 0), f = v.stack; v = v.stacking; var a = this.stackKey, d = "-" + a, h = this.negStacks, e = this.yAxis, b = e.stacks, p = e.oldStacks, z, t; e.stacksTouched += 1; for (t = 0; t < m; t++) {
                                            var w = k[t]; var G = g[t]; var K = this.getStackIndicator(K, w, this.index); var C = K.key; var J = (z = h && G < (y ? 0 : n)) ? d : a; b[J] || (b[J] = {}); b[J][w] || (p[J] && p[J][w] ? (b[J][w] = p[J][w], b[J][w].total = null) : b[J][w] = new c.StackItem(e, e.options.stackLabels, z, w, f));
                                            J = b[J][w]; null !== G ? (J.points[C] = J.points[this.index] = [D(J.cumulative, y)], q(J.cumulative) || (J.base = C), J.touched = e.stacksTouched, 0 < K.index && !1 === this.singleStacks && (J.points[C][0] = J.points[this.index + "," + w + ",0"][0])) : J.points[C] = J.points[this.index] = null; "percent" === v ? (z = z ? a : d, h && b[z] && b[z][w] ? (z = b[z][w], J.total = z.total = Math.max(z.total, J.total) + Math.abs(G) || 0) : J.total = u(J.total + (Math.abs(G) || 0))) : J.total = u(J.total + (G || 0)); J.cumulative = D(J.cumulative, y) + (G || 0); null !== G && (J.points[C].push(J.cumulative),
                                                x[t] = J.cumulative)
                                        } "percent" === v && (e.usePercentage = !0); this.stackedYData = x; e.oldStacks = {}
                                }
                            }; C.prototype.modifyStacks = function () { var c = this, g = c.stackKey, q = c.yAxis.stacks, m = c.processedXData, v, n = c.options.stacking; c[n + "Stacker"] && [g, "-" + g].forEach(function (k) { for (var f = m.length, a, d; f--;)if (a = m[f], v = c.getStackIndicator(v, a, c.index, k), d = (a = q[k] && q[k][a]) && a.points[v.key]) c[n + "Stacker"](d, a, f) }) }; C.prototype.percentStacker = function (c, g, q) {
                                g = g.total ? 100 / g.total : 0; c[0] = u(c[0] * g); c[1] = u(c[1] * g); this.stackedYData[q] =
                                    c[1]
                            }; C.prototype.getStackIndicator = function (c, g, x, m) { !q(c) || c.x !== g || m && c.key !== m ? c = { x: g, index: 0, key: m } : c.index++; c.key = [x, g, c.index].join(); return c }
                }); P(u, "parts/Dynamics.js", [u["parts/Globals.js"], u["parts/Point.js"], u["parts/Time.js"], u["parts/Utilities.js"]], function (c, g, u, q) {
                    var y = q.addEvent, v = q.animate, E = q.createElement, D = q.css, F = q.defined, C = q.erase, k = q.error, r = q.extend, x = q.fireEvent, m = q.isArray, L = q.isNumber, n = q.isObject, M = q.isString, f = q.merge, a = q.objectEach, d = q.pick, h = q.relativeLength, e =
                        q.setAnimation, b = q.splat, p = c.Axis; q = c.Chart; var z = c.Series, t = c.seriesTypes; c.cleanRecursively = function (b, d) { var e = {}; a(b, function (a, f) { if (n(b[f], !0) && !b.nodeType && d[f]) a = c.cleanRecursively(b[f], d[f]), Object.keys(a).length && (e[f] = a); else if (n(b[f]) || b[f] !== d[f]) e[f] = b[f] }); return e }; r(q.prototype, {
                            addSeries: function (a, b, e) {
                                var f, c = this; a && (b = d(b, !0), x(c, "addSeries", { options: a }, function () {
                                    f = c.initSeries(a); c.isDirtyLegend = !0; c.linkSeries(); f.enabledDataSorting && f.setData(a.data, !1); x(c, "afterAddSeries",
                                        { series: f }); b && c.redraw(e)
                                })); return f
                            }, addAxis: function (a, b, d, e) { return this.createAxis(b ? "xAxis" : "yAxis", { axis: a, redraw: d, animation: e }) }, addColorAxis: function (a, b, d) { return this.createAxis("colorAxis", { axis: a, redraw: b, animation: d }) }, createAxis: function (a, e) {
                                var h = this.options, k = "colorAxis" === a, m = e.redraw, n = e.animation; e = f(e.axis, { index: this[a].length, isX: "xAxis" === a }); var g = k ? new c.ColorAxis(this, e) : new p(this, e); h[a] = b(h[a] || {}); h[a].push(e); k && (this.isDirtyLegend = !0, this.axes.forEach(function (a) {
                                a.series =
                                    []
                                }), this.series.forEach(function (a) { a.bindAxes(); a.isDirtyData = !0 })); d(m, !0) && this.redraw(n); return g
                            }, showLoading: function (a) {
                                var b = this, e = b.options, f = b.loadingDiv, c = e.loading, h = function () { f && D(f, { left: b.plotLeft + "px", top: b.plotTop + "px", width: b.plotWidth + "px", height: b.plotHeight + "px" }) }; f || (b.loadingDiv = f = E("div", { className: "highcharts-loading highcharts-loading-hidden" }, null, b.container), b.loadingSpan = E("span", { className: "highcharts-loading-inner" }, null, f), y(b, "redraw", h)); f.className = "highcharts-loading";
                                b.loadingSpan.innerHTML = d(a, e.lang.loading, ""); b.styledMode || (D(f, r(c.style, { zIndex: 10 })), D(b.loadingSpan, c.labelStyle), b.loadingShown || (D(f, { opacity: 0, display: "" }), v(f, { opacity: c.style.opacity || .5 }, { duration: c.showDuration || 0 }))); b.loadingShown = !0; h()
                            }, hideLoading: function () {
                                var a = this.options, b = this.loadingDiv; b && (b.className = "highcharts-loading highcharts-loading-hidden", this.styledMode || v(b, { opacity: 0 }, { duration: a.loading.hideDuration || 100, complete: function () { D(b, { display: "none" }) } })); this.loadingShown =
                                    !1
                            }, propsRequireDirtyBox: "backgroundColor borderColor borderWidth borderRadius plotBackgroundColor plotBackgroundImage plotBorderColor plotBorderWidth plotShadow shadow".split(" "), propsRequireReflow: "margin marginTop marginRight marginBottom marginLeft spacing spacingTop spacingRight spacingBottom spacingLeft".split(" "), propsRequireUpdateSeries: "chart.inverted chart.polar chart.ignoreHiddenSeries chart.type colors plotOptions time tooltip".split(" "), collectionsWithUpdate: ["xAxis", "yAxis", "zAxis",
                                "series"], update: function (e, p, k, m) {
                                    var n = this, g = { credits: "addCredits", title: "setTitle", subtitle: "setSubtitle", caption: "setCaption" }, t, l, w, r = e.isResponsiveOptions, z = []; x(n, "update", { options: e }); r || n.setResponsive(!1, !0); e = c.cleanRecursively(e, n.options); f(!0, n.userOptions, e); if (t = e.chart) {
                                        f(!0, n.options.chart, t); "className" in t && n.setClassName(t.className); "reflow" in t && n.setReflow(t.reflow); if ("inverted" in t || "polar" in t || "type" in t) { n.propFromSeries(); var q = !0 } "alignTicks" in t && (q = !0); a(t, function (a,
                                            b) { -1 !== n.propsRequireUpdateSeries.indexOf("chart." + b) && (l = !0); -1 !== n.propsRequireDirtyBox.indexOf(b) && (n.isDirtyBox = !0); r || -1 === n.propsRequireReflow.indexOf(b) || (w = !0) }); !n.styledMode && "style" in t && n.renderer.setStyle(t.style)
                                    } !n.styledMode && e.colors && (this.options.colors = e.colors); e.plotOptions && f(!0, this.options.plotOptions, e.plotOptions); e.time && this.time === c.time && (this.time = new u(e.time)); a(e, function (a, b) {
                                        if (n[b] && "function" === typeof n[b].update) n[b].update(a, !1); else if ("function" === typeof n[g[b]]) n[g[b]](a);
                                        "chart" !== b && -1 !== n.propsRequireUpdateSeries.indexOf(b) && (l = !0)
                                    }); this.collectionsWithUpdate.forEach(function (a) {
                                        if (e[a]) {
                                            if ("series" === a) { var f = []; n[a].forEach(function (a, b) { a.options.isInternal || f.push(d(a.options.index, b)) }) } b(e[a]).forEach(function (b, d) { (d = F(b.id) && n.get(b.id) || n[a][f ? f[d] : d]) && d.coll === a && (d.update(b, !1), k && (d.touched = !0)); !d && k && n.collectionsWithInit[a] && (n.collectionsWithInit[a][0].apply(n, [b].concat(n.collectionsWithInit[a][1] || []).concat([!1])).touched = !0) }); k && n[a].forEach(function (a) {
                                            a.touched ||
                                                a.options.isInternal ? delete a.touched : z.push(a)
                                            })
                                        }
                                    }); z.forEach(function (a) { a.remove && a.remove(!1) }); q && n.axes.forEach(function (a) { a.update({}, !1) }); l && n.getSeriesOrderByLinks().forEach(function (a) { a.chart && a.update({}, !1) }, this); e.loading && f(!0, n.options.loading, e.loading); q = t && t.width; t = t && t.height; M(t) && (t = h(t, q || n.chartWidth)); w || L(q) && q !== n.chartWidth || L(t) && t !== n.chartHeight ? n.setSize(q, t, m) : d(p, !0) && n.redraw(m); x(n, "afterUpdate", { options: e, redraw: p, animation: m })
                                }, setSubtitle: function (a, b) {
                                    this.applyDescription("subtitle",
                                        a); this.layOutTitles(b)
                                }, setCaption: function (a, b) { this.applyDescription("caption", a); this.layOutTitles(b) }
                        }); q.prototype.collectionsWithInit = { xAxis: [q.prototype.addAxis, [!0]], yAxis: [q.prototype.addAxis, [!1]], series: [q.prototype.addSeries] }; r(g.prototype, {
                            update: function (a, b, e, f) {
                                function c() {
                                    h.applyOptions(a); var f = l && h.hasDummyGraphic; f = null === h.y ? !f : f; l && f && (h.graphic = l.destroy(), delete h.hasDummyGraphic); n(a, !0) && (l && l.element && a && a.marker && "undefined" !== typeof a.marker.symbol && (h.graphic = l.destroy()),
                                        a && a.dataLabels && h.dataLabel && (h.dataLabel = h.dataLabel.destroy()), h.connector && (h.connector = h.connector.destroy())); k = h.index; p.updateParallelArrays(h, k); g.data[k] = n(g.data[k], !0) || n(a, !0) ? h.options : d(a, g.data[k]); p.isDirty = p.isDirtyData = !0; !p.fixedBox && p.hasCartesianSeries && (m.isDirtyBox = !0); "point" === g.legendType && (m.isDirtyLegend = !0); b && m.redraw(e)
                                } var h = this, p = h.series, l = h.graphic, k, m = p.chart, g = p.options; b = d(b, !0); !1 === f ? c() : h.firePointEvent("update", { options: a }, c)
                            }, remove: function (a, b) {
                                this.series.removePoint(this.series.data.indexOf(this),
                                    a, b)
                            }
                        }); r(z.prototype, {
                            addPoint: function (a, b, e, f, c) {
                                var h = this.options, p = this.data, l = this.chart, k = this.xAxis; k = k && k.hasNames && k.names; var m = h.data, n = this.xData, g; b = d(b, !0); var t = { series: this }; this.pointClass.prototype.applyOptions.apply(t, [a]); var w = t.x; var r = n.length; if (this.requireSorting && w < n[r - 1]) for (g = !0; r && n[r - 1] > w;)r--; this.updateParallelArrays(t, "splice", r, 0, 0); this.updateParallelArrays(t, r); k && t.name && (k[w] = t.name); m.splice(r, 0, a); g && (this.data.splice(r, 0, null), this.processData()); "point" ===
                                    h.legendType && this.generatePoints(); e && (p[0] && p[0].remove ? p[0].remove(!1) : (p.shift(), this.updateParallelArrays(t, "shift"), m.shift())); !1 !== c && x(this, "addPoint", { point: t }); this.isDirtyData = this.isDirty = !0; b && l.redraw(f)
                            }, removePoint: function (a, b, f) {
                                var c = this, h = c.data, p = h[a], k = c.points, l = c.chart, m = function () { k && k.length === h.length && k.splice(a, 1); h.splice(a, 1); c.options.data.splice(a, 1); c.updateParallelArrays(p || { series: c }, "splice", a, 1); p && p.destroy(); c.isDirty = !0; c.isDirtyData = !0; b && l.redraw() }; e(f,
                                    l); b = d(b, !0); p ? p.firePointEvent("remove", null, m) : m()
                            }, remove: function (a, b, e, f) { function c() { h.destroy(f); h.remove = null; p.isDirtyLegend = p.isDirtyBox = !0; p.linkSeries(); d(a, !0) && p.redraw(b) } var h = this, p = h.chart; !1 !== e ? x(h, "remove", null, c) : c() }, update: function (a, b) {
                                a = c.cleanRecursively(a, this.userOptions); x(this, "update", { options: a }); var e = this, h = e.chart, p = e.userOptions, m = e.initialType || e.type, n = a.type || p.type || h.options.chart.type, l = !(this.hasDerivedData || a.dataGrouping || n && n !== this.type || "undefined" !==
                                    typeof a.pointStart || a.pointInterval || a.pointIntervalUnit || a.keys), g = t[m].prototype, w, z = ["group", "markerGroup", "dataLabelsGroup", "transformGroup"], q = ["eventOptions", "navigatorSeries", "baseSeries"], v = e.finishedAnimating && { animation: !1 }, G = {}; l && (q.push("data", "isDirtyData", "points", "processedXData", "processedYData", "xIncrement", "_hasPointMarkers", "_hasPointLabels", "mapMap", "mapData", "minY", "maxY", "minX", "maxX"), !1 !== a.visible && q.push("area", "graph"), e.parallelArrays.forEach(function (a) { q.push(a + "Data") }),
                                        a.data && (a.dataSorting && r(e.options.dataSorting, a.dataSorting), this.setData(a.data, !1))); a = f(p, v, { index: "undefined" === typeof p.index ? e.index : p.index, pointStart: d(p.pointStart, e.xData[0]) }, !l && { data: e.options.data }, a); l && a.data && (a.data = e.options.data); q = z.concat(q); q.forEach(function (a) { q[a] = e[a]; delete e[a] }); e.remove(!1, null, !1, !0); for (w in g) e[w] = void 0; t[n || m] ? r(e, t[n || m].prototype) : k(17, !0, h, { missingModuleFor: n || m }); q.forEach(function (a) { e[a] = q[a] }); e.init(h, a); if (l && this.points) {
                                            var y = e.options;
                                            !1 === y.visible ? (G.graphic = 1, G.dataLabel = 1) : e._hasPointLabels || (n = y.marker, g = y.dataLabels, n && (!1 === n.enabled || "symbol" in n) && (G.graphic = 1), g && !1 === g.enabled && (G.dataLabel = 1)); this.points.forEach(function (a) { a && a.series && (a.resolveColor(), Object.keys(G).length && a.destroyElements(G), !1 === y.showInLegend && a.legendItem && h.legend.destroyItem(a)) }, this)
                                        } a.zIndex !== p.zIndex && z.forEach(function (b) { e[b] && e[b].attr({ zIndex: a.zIndex }) }); e.initialType = m; h.linkSeries(); x(this, "afterUpdate"); d(b, !0) && h.redraw(l ?
                                            void 0 : !1)
                            }, setName: function (a) { this.name = this.options.name = this.userOptions.name = a; this.chart.isDirtyLegend = !0 }
                        }); r(p.prototype, {
                            update: function (b, e) { var c = this.chart, h = b && b.events || {}; b = f(this.userOptions, b); c.options[this.coll].indexOf && (c.options[this.coll][c.options[this.coll].indexOf(this.userOptions)] = b); a(c.options[this.coll].events, function (a, b) { "undefined" === typeof h[b] && (h[b] = void 0) }); this.destroy(!0); this.init(c, r(b, { events: h })); c.isDirtyBox = !0; d(e, !0) && c.redraw() }, remove: function (a) {
                                for (var b =
                                    this.chart, e = this.coll, f = this.series, c = f.length; c--;)f[c] && f[c].remove(!1); C(b.axes, this); C(b[e], this); m(b.options[e]) ? b.options[e].splice(this.options.index, 1) : delete b.options[e]; b[e].forEach(function (a, b) { a.options.index = a.userOptions.index = b }); this.destroy(); b.isDirtyBox = !0; d(a, !0) && b.redraw()
                            }, setTitle: function (a, b) { this.update({ title: a }, b) }, setCategories: function (a, b) { this.update({ categories: a }, b) }
                        })
                }); P(u, "parts/AreaSeries.js", [u["parts/Globals.js"], u["parts/Color.js"], u["mixins/legend-symbol.js"],
                u["parts/Utilities.js"]], function (c, g, u, q) {
                    var y = g.parse, v = q.objectEach, E = q.pick; g = q.seriesType; var D = c.Series; g("area", "line", { softThreshold: !1, threshold: 0 }, {
                        singleStacks: !1, getStackPoints: function (c) {
                            var g = [], k = [], r = this.xAxis, q = this.yAxis, m = q.stacks[this.stackKey], y = {}, n = this.index, u = q.series, f = u.length, a = E(q.options.reversedStacks, !0) ? 1 : -1, d; c = c || this.points; if (this.options.stacking) {
                                for (d = 0; d < c.length; d++)c[d].leftNull = c[d].rightNull = void 0, y[c[d].x] = c[d]; v(m, function (a, b) { null !== a.total && k.push(b) });
                                k.sort(function (a, b) { return a - b }); var h = u.map(function (a) { return a.visible }); k.forEach(function (e, b) {
                                    var c = 0, z, t; if (y[e] && !y[e].isNull) g.push(y[e]), [-1, 1].forEach(function (c) { var p = 1 === c ? "rightNull" : "leftNull", g = 0, r = m[k[b + c]]; if (r) for (d = n; 0 <= d && d < f;)z = r.points[d], z || (d === n ? y[e][p] = !0 : h[d] && (t = m[e].points[d]) && (g -= t[1] - t[0])), d += a; y[e][1 === c ? "rightCliff" : "leftCliff"] = g }); else {
                                        for (d = n; 0 <= d && d < f;) { if (z = m[e].points[d]) { c = z[1]; break } d += a } c = q.translate(c, 0, 1, 0, 1); g.push({
                                            isNull: !0, plotX: r.translate(e, 0,
                                                0, 0, 1), x: e, plotY: c, yBottom: c
                                        })
                                    }
                                })
                            } return g
                        }, getGraphPath: function (c) {
                            var g = D.prototype.getGraphPath, k = this.options, r = k.stacking, q = this.yAxis, m, v = [], n = [], y = this.index, f = q.stacks[this.stackKey], a = k.threshold, d = Math.round(q.getThreshold(k.threshold)); k = E(k.connectNulls, "percent" === r); var h = function (e, h, p) {
                                var k = c[e]; e = r && f[k.x].points[y]; var m = k[p + "Null"] || 0; p = k[p + "Cliff"] || 0; k = !0; if (p || m) { var g = (m ? e[0] : e[1]) + p; var t = e[0] + p; k = !!m } else !r && c[h] && c[h].isNull && (g = t = a); "undefined" !== typeof g && (n.push({
                                    plotX: b,
                                    plotY: null === g ? d : q.getThreshold(g), isNull: k, isCliff: !0
                                }), v.push({ plotX: b, plotY: null === t ? d : q.getThreshold(t), doCurve: !1 }))
                            }; c = c || this.points; r && (c = this.getStackPoints(c)); for (m = 0; m < c.length; m++) { r || (c[m].leftCliff = c[m].rightCliff = c[m].leftNull = c[m].rightNull = void 0); var e = c[m].isNull; var b = E(c[m].rectPlotX, c[m].plotX); var p = E(c[m].yBottom, d); if (!e || k) k || h(m, m - 1, "left"), e && !r && k || (n.push(c[m]), v.push({ x: m, plotX: b, plotY: p })), k || h(m, m + 1, "right") } m = g.call(this, n, !0, !0); v.reversed = !0; e = g.call(this, v, !0,
                                !0); e.length && (e[0] = "L"); e = m.concat(e); g = g.call(this, n, !1, k); e.xMap = m.xMap; this.areaPath = e; return g
                        }, drawGraph: function () {
                        this.areaPath = []; D.prototype.drawGraph.apply(this); var c = this, g = this.areaPath, k = this.options, r = [["area", "highcharts-area", this.color, k.fillColor]]; this.zones.forEach(function (g, m) { r.push(["zone-area-" + m, "highcharts-area highcharts-zone-area-" + m + " " + g.className, g.color || c.color, g.fillColor || k.fillColor]) }); r.forEach(function (r) {
                            var m = r[0], q = c[m], n = q ? "animate" : "attr", v = {}; q ? (q.endX =
                                c.preventGraphAnimation ? null : g.xMap, q.animate({ d: g })) : (v.zIndex = 0, q = c[m] = c.chart.renderer.path(g).addClass(r[1]).add(c.group), q.isArea = !0); c.chart.styledMode || (v.fill = E(r[3], y(r[2]).setOpacity(E(k.fillOpacity, .75)).get())); q[n](v); q.startX = g.xMap; q.shiftUnit = k.step ? 2 : 1
                        })
                        }, drawLegendSymbol: u.drawRectangle
                    }); ""
                }); P(u, "parts/SplineSeries.js", [u["parts/Utilities.js"]], function (c) {
                    var g = c.pick; c = c.seriesType; c("spline", "line", {}, {
                        getPointSpline: function (c, q, y) {
                            var v = q.plotX, u = q.plotY, D = c[y - 1]; y = c[y + 1];
                            if (D && !D.isNull && !1 !== D.doCurve && !q.isCliff && y && !y.isNull && !1 !== y.doCurve && !q.isCliff) { c = D.plotY; var E = y.plotX; y = y.plotY; var C = 0; var k = (1.5 * v + D.plotX) / 2.5; var r = (1.5 * u + c) / 2.5; E = (1.5 * v + E) / 2.5; var x = (1.5 * u + y) / 2.5; E !== k && (C = (x - r) * (E - v) / (E - k) + u - x); r += C; x += C; r > c && r > u ? (r = Math.max(c, u), x = 2 * u - r) : r < c && r < u && (r = Math.min(c, u), x = 2 * u - r); x > y && x > u ? (x = Math.max(y, u), r = 2 * u - x) : x < y && x < u && (x = Math.min(y, u), r = 2 * u - x); q.rightContX = E; q.rightContY = x } q = ["C", g(D.rightContX, D.plotX), g(D.rightContY, D.plotY), g(k, v), g(r, u), v, u]; D.rightContX =
                                D.rightContY = null; return q
                        }
                    }); ""
                }); P(u, "parts/AreaSplineSeries.js", [u["parts/Globals.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]], function (c, g, u) { u = u.seriesType; var q = c.seriesTypes.area.prototype; u("areaspline", "spline", c.defaultPlotOptions.area, { getStackPoints: q.getStackPoints, getGraphPath: q.getGraphPath, drawGraph: q.drawGraph, drawLegendSymbol: g.drawRectangle }); "" }); P(u, "parts/ColumnSeries.js", [u["parts/Globals.js"], u["parts/Color.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]],
                    function (c, g, u, q) {
                        ""; var y = g.parse, v = q.animObject, E = q.clamp, D = q.defined, F = q.extend, C = q.isNumber, k = q.merge, r = q.pick; g = q.seriesType; var x = c.Series; g("column", "line", {
                            borderRadius: 0, crisp: !0, groupPadding: .2, marker: null, pointPadding: .1, minPointLength: 0, cropThreshold: 50, pointRange: null, states: { hover: { halo: !1, brightness: .1 }, select: { color: "#cccccc", borderColor: "#000000" } }, dataLabels: { align: null, verticalAlign: null, y: null }, softThreshold: !1, startFromThreshold: !0, stickyTracking: !1, tooltip: { distance: 6 }, threshold: 0,
                            borderColor: "#ffffff"
                        }, {
                            cropShoulder: 0, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], negStacks: !0, init: function () { x.prototype.init.apply(this, arguments); var c = this, k = c.chart; k.hasRendered && k.series.forEach(function (k) { k.type === c.type && (k.isDirty = !0) }) }, getColumnMetrics: function () {
                                var c = this, k = c.options, n = c.xAxis, g = c.yAxis, f = n.options.reversedStacks; f = n.reversed && !f || !n.reversed && f; var a, d = {}, h = 0; !1 === k.grouping ? h = 1 : c.chart.series.forEach(function (b) {
                                    var e = b.yAxis, f = b.options; if (b.type ===
                                        c.type && (b.visible || !c.chart.options.chart.ignoreHiddenSeries) && g.len === e.len && g.pos === e.pos) { if (f.stacking) { a = b.stackKey; "undefined" === typeof d[a] && (d[a] = h++); var p = d[a] } else !1 !== f.grouping && (p = h++); b.columnIndex = p }
                                }); var e = Math.min(Math.abs(n.transA) * (n.ordinalSlope || k.pointRange || n.closestPointRange || n.tickInterval || 1), n.len), b = e * k.groupPadding, p = (e - 2 * b) / (h || 1); k = Math.min(k.maxPointWidth || n.len, r(k.pointWidth, p * (1 - 2 * k.pointPadding))); c.columnMetrics = {
                                    width: k, offset: (p - k) / 2 + (b + ((c.columnIndex ||
                                        0) + (f ? 1 : 0)) * p - e / 2) * (f ? -1 : 1)
                                }; return c.columnMetrics
                            }, crispCol: function (c, k, n, g) { var f = this.chart, a = this.borderWidth, d = -(a % 2 ? .5 : 0); a = a % 2 ? .5 : 1; f.inverted && f.renderer.isVML && (a += 1); this.options.crisp && (n = Math.round(c + n) + d, c = Math.round(c) + d, n -= c); g = Math.round(k + g) + a; d = .5 >= Math.abs(k) && .5 < g; k = Math.round(k) + a; g -= k; d && g && (--k, g += 1); return { x: c, y: k, width: n, height: g } }, translate: function () {
                                var c = this, k = c.chart, n = c.options, g = c.dense = 2 > c.closestPointRange * c.xAxis.transA; g = c.borderWidth = r(n.borderWidth, g ? 0 : 1);
                                var f = c.xAxis, a = c.yAxis, d = n.threshold, h = c.translatedThreshold = a.getThreshold(d), e = r(n.minPointLength, 5), b = c.getColumnMetrics(), p = b.width, q = c.barW = Math.max(p, 1 + 2 * g), t = c.pointXOffset = b.offset, w = c.dataMin, v = c.dataMax; k.inverted && (h -= .5); n.pointPadding && (q = Math.ceil(q)); x.prototype.translate.apply(c); c.points.forEach(function (b) {
                                    var g = r(b.yBottom, h), m = 999 + Math.abs(g), n = p, z = b.plotX; m = E(b.plotY, -m, a.len + m); var l = b.plotX + t, x = q, G = Math.min(m, g), y = Math.max(m, g) - G; if (e && Math.abs(y) < e) {
                                        y = e; var K = !a.reversed &&
                                            !b.negative || a.reversed && b.negative; b.y === d && c.dataMax <= d && a.min < d && w !== v && (K = !K); G = Math.abs(G - h) > e ? g - e : h - (K ? e : 0)
                                    } D(b.options.pointWidth) && (n = x = Math.ceil(b.options.pointWidth), l -= Math.round((n - p) / 2)); b.barX = l; b.pointWidth = n; b.tooltipPos = k.inverted ? [a.len + a.pos - k.plotLeft - m, f.len + f.pos - k.plotTop - (z || 0) - t - x / 2, y] : [l + x / 2, m + a.pos - k.plotTop, y]; b.shapeType = c.pointClass.prototype.shapeType || "rect"; b.shapeArgs = c.crispCol.apply(c, b.isNull ? [l, h, x, 0] : [l, G, x, y])
                                })
                            }, getSymbol: c.noop, drawLegendSymbol: u.drawRectangle,
                            drawGraph: function () { this.group[this.dense ? "addClass" : "removeClass"]("highcharts-dense-data") }, pointAttribs: function (c, g) {
                                var n = this.options, m = this.pointAttrToOptions || {}; var f = m.stroke || "borderColor"; var a = m["stroke-width"] || "borderWidth", d = c && c.color || this.color, h = c && c[f] || n[f] || this.color || d, e = c && c[a] || n[a] || this[a] || 0; m = c && c.options.dashStyle || n.dashStyle; var b = r(c && c.opacity, n.opacity, 1); if (c && this.zones.length) {
                                    var p = c.getZone(); d = c.options.color || p && (p.color || c.nonZonedColor) || this.color; p &&
                                        (h = p.borderColor || h, m = p.dashStyle || m, e = p.borderWidth || e)
                                } g && c && (c = k(n.states[g], c.options.states && c.options.states[g] || {}), g = c.brightness, d = c.color || "undefined" !== typeof g && y(d).brighten(c.brightness).get() || d, h = c[f] || h, e = c[a] || e, m = c.dashStyle || m, b = r(c.opacity, b)); f = { fill: d, stroke: h, "stroke-width": e, opacity: b }; m && (f.dashstyle = m); return f
                            }, drawPoints: function () {
                                var c = this, g = this.chart, n = c.options, r = g.renderer, f = n.animationLimit || 250, a; c.points.forEach(function (d) {
                                    var h = d.graphic, e = !!h, b = h && g.pointCount <
                                        f ? "animate" : "attr"; if (C(d.plotY) && null !== d.y) {
                                            a = d.shapeArgs; h && d.hasNewShapeType() && (h = h.destroy()); c.enabledDataSorting && (d.startXPos = c.xAxis.reversed ? -(a ? a.width : 0) : c.xAxis.width); h || (d.graphic = h = r[d.shapeType](a).add(d.group || c.group)) && c.enabledDataSorting && g.hasRendered && g.pointCount < f && (h.attr({ x: d.startXPos }), e = !0, b = "animate"); if (h && e) h[b](k(a)); if (n.borderRadius) h[b]({ r: n.borderRadius }); g.styledMode || h[b](c.pointAttribs(d, d.selected && "select")).shadow(!1 !== d.allowShadow && n.shadow, null, n.stacking &&
                                                !n.borderRadius); h.addClass(d.getClassName(), !0)
                                        } else h && (d.graphic = h.destroy())
                                })
                            }, animate: function (c) { var k = this, g = this.yAxis, m = k.options, f = this.chart.inverted, a = {}, d = f ? "translateX" : "translateY"; if (c) a.scaleY = .001, c = E(g.toPixels(m.threshold), g.pos, g.pos + g.len), f ? a.translateX = c - g.len : a.translateY = c, k.clipBox && k.setClip(), k.group.attr(a); else { var h = k.group.attr(d); k.group.animate({ scaleY: 1 }, F(v(k.options.animation), { step: function (e, b) { k.group && (a[d] = h + b.pos * (g.pos - h), k.group.attr(a)) } })) } }, remove: function () {
                                var c =
                                    this, k = c.chart; k.hasRendered && k.series.forEach(function (k) { k.type === c.type && (k.isDirty = !0) }); x.prototype.remove.apply(c, arguments)
                            }
                        }); ""
                    }); P(u, "parts/BarSeries.js", [u["parts/Utilities.js"]], function (c) { c = c.seriesType; c("bar", "column", null, { inverted: !0 }); "" }); P(u, "parts/ScatterSeries.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                        var u = g.addEvent; g = g.seriesType; var q = c.Series; g("scatter", "line", {
                            lineWidth: 0, findNearestPointBy: "xy", jitter: { x: 0, y: 0 }, marker: { enabled: !0 }, tooltip: {
                                headerFormat: '<span style="color:{point.color}">\u25cf</span> <span style="font-size: 10px"> {series.name}</span><br/>',
                                pointFormat: "x: <b>{point.x}</b><br/>y: <b>{point.y}</b><br/>"
                            }
                        }, {
                            sorted: !1, requireSorting: !1, noSharedTooltip: !0, trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], takeOrdinalPosition: !1, drawGraph: function () { this.options.lineWidth && q.prototype.drawGraph.call(this) }, applyJitter: function () {
                                var c = this, g = this.options.jitter, q = this.points.length; g && this.points.forEach(function (v, y) {
                                    ["x", "y"].forEach(function (u, k) {
                                        var r = "plot" + u.toUpperCase(); if (g[u] && !v.isNull) {
                                            var x = c[u + "Axis"]; var m = g[u] * x.transA;
                                            if (x && !x.isLog) { var C = Math.max(0, v[r] - m); x = Math.min(x.len, v[r] + m); k = 1E4 * Math.sin(y + k * q); v[r] = C + (x - C) * (k - Math.floor(k)); "x" === u && (v.clientX = v.plotX) }
                                        }
                                    })
                                })
                            }
                        }); u(q, "afterTranslate", function () { this.applyJitter && this.applyJitter() }); ""
                    }); P(u, "mixins/centered-series.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                        var u = g.isNumber, q = g.pick, y = g.relativeLength, v = c.deg2rad; c.CenteredSeriesMixin = {
                            getCenter: function () {
                                var c = this.options, g = this.chart, v = 2 * (c.slicedOffset || 0), u = g.plotWidth - 2 * v,
                                k = g.plotHeight - 2 * v, r = c.center, x = Math.min(u, k), m = c.size, E = c.innerSize || 0; "string" === typeof m && (m = parseFloat(m)); "string" === typeof E && (E = parseFloat(E)); c = [q(r[0], "50%"), q(r[1], "50%"), q(m && 0 > m ? void 0 : c.size, "100%"), q(E && 0 > E ? void 0 : c.innerSize || 0, "0%")]; g.angular && (c[3] = 0); for (r = 0; 4 > r; ++r)m = c[r], g = 2 > r || 2 === r && /%$/.test(m), c[r] = y(m, [u, k, x, c[2]][r]) + (g ? v : 0); c[3] > c[2] && (c[3] = c[2]); return c
                            }, getStartAndEndRadians: function (c, g) { c = u(c) ? c : 0; g = u(g) && g > c && 360 > g - c ? g : c + 360; return { start: v * (c + -90), end: v * (g + -90) } }
                        }
                    });
    P(u, "parts/PieSeries.js", [u["parts/Globals.js"], u["mixins/legend-symbol.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function (c, g, u, q) {
        var y = q.addEvent, v = q.clamp, E = q.defined, D = q.fireEvent, F = q.isNumber, C = q.merge, k = q.pick, r = q.relativeLength, x = q.seriesType, m = q.setAnimation; q = c.CenteredSeriesMixin; var L = q.getStartAndEndRadians, n = c.noop, M = c.Series; x("pie", "line", {
            center: [null, null], clip: !1, colorByPoint: !0, dataLabels: {
                allowOverlap: !0, connectorPadding: 5, connectorShape: "fixedOffset", crookDistance: "70%",
                distance: 30, enabled: !0, formatter: function () { return this.point.isNull ? void 0 : this.point.name }, softConnector: !0, x: 0
            }, fillColor: void 0, ignoreHiddenPoint: !0, inactiveOtherPoints: !0, legendType: "point", marker: null, size: null, showInLegend: !1, slicedOffset: 10, stickyTracking: !1, tooltip: { followPointer: !0 }, borderColor: "#ffffff", borderWidth: 1, lineWidth: void 0, states: { hover: { brightness: .1 } }
        }, {
            isCartesian: !1, requireSorting: !1, directTouch: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], axisTypes: [],
            pointAttribs: c.seriesTypes.column.prototype.pointAttribs, animate: function (f) { var a = this, d = a.points, c = a.startAngleRad; f || d.forEach(function (d) { var b = d.graphic, e = d.shapeArgs; b && e && (b.attr({ r: k(d.startR, a.center && a.center[3] / 2), start: c, end: c }), b.animate({ r: e.r, start: e.start, end: e.end }, a.options.animation)) }) }, hasData: function () { return !!this.processedXData.length }, updateTotals: function () {
                var f, a = 0, d = this.points, c = d.length, e = this.options.ignoreHiddenPoint; for (f = 0; f < c; f++) {
                    var b = d[f]; a += e && !b.visible ? 0 :
                        b.isNull ? 0 : b.y
                } this.total = a; for (f = 0; f < c; f++)b = d[f], b.percentage = 0 < a && (b.visible || !e) ? b.y / a * 100 : 0, b.total = a
            }, generatePoints: function () { M.prototype.generatePoints.call(this); this.updateTotals() }, getX: function (f, a, d) { var c = this.center, e = this.radii ? this.radii[d.index] : c[2] / 2; f = Math.asin(v((f - c[1]) / (e + d.labelDistance), -1, 1)); return c[0] + (a ? -1 : 1) * Math.cos(f) * (e + d.labelDistance) + (0 < d.labelDistance ? (a ? -1 : 1) * this.options.dataLabels.padding : 0) }, translate: function (f) {
                this.generatePoints(); var a = 0, d = this.options,
                    c = d.slicedOffset, e = c + (d.borderWidth || 0), b = L(d.startAngle, d.endAngle), p = this.startAngleRad = b.start; b = (this.endAngleRad = b.end) - p; var g = this.points, n = d.dataLabels.distance; d = d.ignoreHiddenPoint; var m, q = g.length; f || (this.center = f = this.getCenter()); for (m = 0; m < q; m++) {
                        var v = g[m]; var x = p + a * b; if (!d || v.visible) a += v.percentage / 100; var u = p + a * b; v.shapeType = "arc"; v.shapeArgs = { x: f[0], y: f[1], r: f[2] / 2, innerR: f[3] / 2, start: Math.round(1E3 * x) / 1E3, end: Math.round(1E3 * u) / 1E3 }; v.labelDistance = k(v.options.dataLabels && v.options.dataLabels.distance,
                            n); v.labelDistance = r(v.labelDistance, v.shapeArgs.r); this.maxLabelDistance = Math.max(this.maxLabelDistance || 0, v.labelDistance); u = (u + x) / 2; u > 1.5 * Math.PI ? u -= 2 * Math.PI : u < -Math.PI / 2 && (u += 2 * Math.PI); v.slicedTranslation = { translateX: Math.round(Math.cos(u) * c), translateY: Math.round(Math.sin(u) * c) }; var y = Math.cos(u) * f[2] / 2; var A = Math.sin(u) * f[2] / 2; v.tooltipPos = [f[0] + .7 * y, f[1] + .7 * A]; v.half = u < -Math.PI / 2 || u > Math.PI / 2 ? 1 : 0; v.angle = u; x = Math.min(e, v.labelDistance / 5); v.labelPosition = {
                                natural: {
                                    x: f[0] + y + Math.cos(u) * v.labelDistance,
                                    y: f[1] + A + Math.sin(u) * v.labelDistance
                                }, "final": {}, alignment: 0 > v.labelDistance ? "center" : v.half ? "right" : "left", connectorPosition: { breakAt: { x: f[0] + y + Math.cos(u) * x, y: f[1] + A + Math.sin(u) * x }, touchingSliceAt: { x: f[0] + y, y: f[1] + A } }
                            }
                    } D(this, "afterTranslate")
            }, drawEmpty: function () {
                var f = this.options; if (0 === this.total) {
                    var a = this.center[0]; var d = this.center[1]; this.graph || (this.graph = this.chart.renderer.circle(a, d, 0).addClass("highcharts-graph").add(this.group)); this.graph.animate({
                        "stroke-width": f.borderWidth,
                        cx: a, cy: d, r: this.center[2] / 2, fill: f.fillColor || "none", stroke: f.color || "#cccccc"
                    }, this.options.animation)
                } else this.graph && (this.graph = this.graph.destroy())
            }, redrawPoints: function () {
                var f = this, a = f.chart, d = a.renderer, c, e, b, p, k = f.options.shadow; this.drawEmpty(); !k || f.shadowGroup || a.styledMode || (f.shadowGroup = d.g("shadow").attr({ zIndex: -1 }).add(f.group)); f.points.forEach(function (h) {
                    var g = {}; e = h.graphic; if (!h.isNull && e) {
                        p = h.shapeArgs; c = h.getTranslate(); if (!a.styledMode) {
                            var n = h.shadowGroup; k && !n && (n =
                                h.shadowGroup = d.g("shadow").add(f.shadowGroup)); n && n.attr(c); b = f.pointAttribs(h, h.selected && "select")
                        } h.delayedRendering ? (e.setRadialReference(f.center).attr(p).attr(c), a.styledMode || e.attr(b).attr({ "stroke-linejoin": "round" }).shadow(k, n), h.delayedRendering = !1) : (e.setRadialReference(f.center), a.styledMode || C(!0, g, b), C(!0, g, p, c), e.animate(g)); e.attr({ visibility: h.visible ? "inherit" : "hidden" }); e.addClass(h.getClassName())
                    } else e && (h.graphic = e.destroy())
                })
            }, drawPoints: function () {
                var f = this.chart.renderer;
                this.points.forEach(function (a) { a.graphic && a.hasNewShapeType() && (a.graphic = a.graphic.destroy()); a.graphic || (a.graphic = f[a.shapeType](a.shapeArgs).add(a.series.group), a.delayedRendering = !0) })
            }, searchPoint: n, sortByAngle: function (f, a) { f.sort(function (d, f) { return "undefined" !== typeof d.angle && (f.angle - d.angle) * a }) }, drawLegendSymbol: g.drawRectangle, getCenter: q.getCenter, getSymbol: n, drawGraph: null
        }, {
            init: function () {
                u.prototype.init.apply(this, arguments); var f = this; f.name = k(f.name, "Slice"); var a = function (a) {
                    f.slice("select" ===
                        a.type)
                }; y(f, "select", a); y(f, "unselect", a); return f
            }, isValid: function () { return F(this.y) && 0 <= this.y }, setVisible: function (f, a) {
                var d = this, c = d.series, e = c.chart, b = c.options.ignoreHiddenPoint; a = k(a, b); f !== d.visible && (d.visible = d.options.visible = f = "undefined" === typeof f ? !d.visible : f, c.options.data[c.data.indexOf(d)] = d.options, ["graphic", "dataLabel", "connector", "shadowGroup"].forEach(function (a) { if (d[a]) d[a][f ? "show" : "hide"](!0) }), d.legendItem && e.legend.colorizeItem(d, f), f || "hover" !== d.state || d.setState(""),
                    b && (c.isDirty = !0), a && e.redraw())
            }, slice: function (f, a, d) { var c = this.series; m(d, c.chart); k(a, !0); this.sliced = this.options.sliced = E(f) ? f : !this.sliced; c.options.data[c.data.indexOf(this)] = this.options; this.graphic.animate(this.getTranslate()); this.shadowGroup && this.shadowGroup.animate(this.getTranslate()) }, getTranslate: function () { return this.sliced ? this.slicedTranslation : { translateX: 0, translateY: 0 } }, haloPath: function (f) {
                var a = this.shapeArgs; return this.sliced || !this.visible ? [] : this.series.chart.renderer.symbols.arc(a.x,
                    a.y, a.r + f, a.r + f, { innerR: a.r - 1, start: a.start, end: a.end })
            }, connectorShapes: {
                fixedOffset: function (f, a, d) { var c = a.breakAt; a = a.touchingSliceAt; return ["M", f.x, f.y].concat(d.softConnector ? ["C", f.x + ("left" === f.alignment ? -5 : 5), f.y, 2 * c.x - a.x, 2 * c.y - a.y, c.x, c.y] : ["L", c.x, c.y]).concat(["L", a.x, a.y]) }, straight: function (f, a) { a = a.touchingSliceAt; return ["M", f.x, f.y, "L", a.x, a.y] }, crookedLine: function (f, a, d) {
                    a = a.touchingSliceAt; var c = this.series, e = c.center[0], b = c.chart.plotWidth, k = c.chart.plotLeft; c = f.alignment; var g =
                        this.shapeArgs.r; d = r(d.crookDistance, 1); d = "left" === c ? e + g + (b + k - e - g) * (1 - d) : k + (e - g) * d; e = ["L", d, f.y]; if ("left" === c ? d > f.x || d < a.x : d < f.x || d > a.x) e = []; return ["M", f.x, f.y].concat(e).concat(["L", a.x, a.y])
                }
            }, getConnectorPath: function () { var f = this.labelPosition, a = this.series.options.dataLabels, d = a.connectorShape, c = this.connectorShapes; c[d] && (d = c[d]); return d.call(this, { x: f.final.x, y: f.final.y, alignment: f.alignment }, f.connectorPosition, a) }
        }); ""
    }); P(u, "parts/DataLabels.js", [u["parts/Globals.js"], u["parts/Utilities.js"]],
        function (c, g) {
            var u = g.animObject, q = g.arrayMax, y = g.clamp, v = g.defined, N = g.extend, D = g.format, F = g.isArray, C = g.merge, k = g.objectEach, r = g.pick, x = g.relativeLength, m = g.splat, L = g.stableSort; g = c.noop; var n = c.Series, M = c.seriesTypes; c.distribute = function (f, a, d) {
                function h(a, b) { return a.target - b.target } var e, b = !0, k = f, g = []; var n = 0; var m = k.reducedLen || a; for (e = f.length; e--;)n += f[e].size; if (n > m) { L(f, function (a, b) { return (b.rank || 0) - (a.rank || 0) }); for (n = e = 0; n <= m;)n += f[e].size, e++; g = f.splice(e - 1, f.length) } L(f, h); for (f =
                    f.map(function (a) { return { size: a.size, targets: [a.target], align: r(a.align, .5) } }); b;) { for (e = f.length; e--;)b = f[e], n = (Math.min.apply(0, b.targets) + Math.max.apply(0, b.targets)) / 2, b.pos = y(n - b.size * b.align, 0, a - b.size); e = f.length; for (b = !1; e--;)0 < e && f[e - 1].pos + f[e - 1].size > f[e].pos && (f[e - 1].size += f[e].size, f[e - 1].targets = f[e - 1].targets.concat(f[e].targets), f[e - 1].align = .5, f[e - 1].pos + f[e - 1].size > a && (f[e - 1].pos = a - f[e - 1].size), f.splice(e, 1), b = !0) } k.push.apply(k, g); e = 0; f.some(function (b) {
                        var f = 0; if (b.targets.some(function () {
                            k[e].pos =
                            b.pos + f; if ("undefined" !== typeof d && Math.abs(k[e].pos - k[e].target) > d) return k.slice(0, e + 1).forEach(function (a) { delete a.pos }), k.reducedLen = (k.reducedLen || a) - .1 * a, k.reducedLen > .1 * a && c.distribute(k, a, d), !0; f += k[e].size; e++
                        })) return !0
                    }); L(k, h)
            }; n.prototype.drawDataLabels = function () {
                function f(a, b) { var d = b.filter; return d ? (b = d.operator, a = a[d.property], d = d.value, ">" === b && a > d || "<" === b && a < d || ">=" === b && a >= d || "<=" === b && a <= d || "==" === b && a == d || "===" === b && a === d ? !0 : !1) : !0 } function a(a, b) {
                    var d = [], e; if (F(a) && !F(b)) d =
                        a.map(function (a) { return C(a, b) }); else if (F(b) && !F(a)) d = b.map(function (b) { return C(a, b) }); else if (F(a) || F(b)) for (e = Math.max(a.length, b.length); e--;)d[e] = C(a[e], b[e]); else d = C(a, b); return d
                } var d = this, h = d.chart, e = d.options, b = e.dataLabels, p = d.points, g, n = d.hasRendered || 0, q = u(e.animation).duration, x = Math.min(q, 200), y = !h.renderer.forExport && r(b.defer, 0 < x), E = h.renderer; b = a(a(h.options.plotOptions && h.options.plotOptions.series && h.options.plotOptions.series.dataLabels, h.options.plotOptions && h.options.plotOptions[d.type] &&
                    h.options.plotOptions[d.type].dataLabels), b); c.fireEvent(this, "drawDataLabels"); if (F(b) || b.enabled || d._hasPointLabels) {
                        var J = d.plotGroup("dataLabelsGroup", "data-labels", y && !n ? "hidden" : "inherit", b.zIndex || 6); y && (J.attr({ opacity: +n }), n || setTimeout(function () { var a = d.dataLabelsGroup; a && (d.visible && J.show(!0), a[e.animation ? "animate" : "attr"]({ opacity: 1 }, { duration: x })) }, q - x)); p.forEach(function (c) {
                            g = m(a(b, c.dlOptions || c.options && c.options.dataLabels)); g.forEach(function (a, b) {
                                var l = a.enabled && (!c.isNull ||
                                    c.dataLabelOnNull) && f(c, a), p = c.dataLabels ? c.dataLabels[b] : c.dataLabel, g = c.connectors ? c.connectors[b] : c.connector, n = r(a.distance, c.labelDistance), m = !p; if (l) {
                                        var t = c.getLabelConfig(); var q = r(a[c.formatPrefix + "Format"], a.format); t = v(q) ? D(q, t, h) : (a[c.formatPrefix + "Formatter"] || a.formatter).call(t, a); q = a.style; var w = a.rotation; h.styledMode || (q.color = r(a.color, q.color, d.color, "#000000"), "contrast" === q.color ? (c.contrastColor = E.getContrast(c.color || d.color), q.color = !v(n) && a.inside || 0 > n || e.stacking ? c.contrastColor :
                                            "#000000") : delete c.contrastColor, e.cursor && (q.cursor = e.cursor)); var z = { r: a.borderRadius || 0, rotation: w, padding: a.padding, zIndex: 1 }; h.styledMode || (z.fill = a.backgroundColor, z.stroke = a.borderColor, z["stroke-width"] = a.borderWidth); k(z, function (a, b) { "undefined" === typeof a && delete z[b] })
                                    } !p || l && v(t) ? l && v(t) && (p ? z.text = t : (c.dataLabels = c.dataLabels || [], p = c.dataLabels[b] = w ? E.text(t, 0, -9999, a.useHTML).addClass("highcharts-data-label") : E.label(t, 0, -9999, a.shape, null, null, a.useHTML, null, "data-label"), b || (c.dataLabel =
                                        p), p.addClass(" highcharts-data-label-color-" + c.colorIndex + " " + (a.className || "") + (a.useHTML ? " highcharts-tracker" : ""))), p.options = a, p.attr(z), h.styledMode || p.css(q).shadow(a.shadow), p.added || p.add(J), a.textPath && !a.useHTML && (p.setTextPath(c.getDataLabelPath && c.getDataLabelPath(p) || c.graphic, a.textPath), c.dataLabelPath && !a.textPath.enabled && (c.dataLabelPath = c.dataLabelPath.destroy())), d.alignDataLabel(c, p, a, null, m)) : (c.dataLabel = c.dataLabel && c.dataLabel.destroy(), c.dataLabels && (1 === c.dataLabels.length ?
                                            delete c.dataLabels : delete c.dataLabels[b]), b || delete c.dataLabel, g && (c.connector = c.connector.destroy(), c.connectors && (1 === c.connectors.length ? delete c.connectors : delete c.connectors[b])))
                            })
                        })
                    } c.fireEvent(this, "afterDrawDataLabels")
            }; n.prototype.alignDataLabel = function (f, a, d, c, e) {
                var b = this, h = this.chart, k = this.isCartesian && h.inverted, g = this.enabledDataSorting, n = r(f.dlBox && f.dlBox.centerX, f.plotX, -9999), m = r(f.plotY, -9999), q = a.getBBox(), v = d.rotation, x = d.align, u = h.isInsidePlot(n, Math.round(m), k), y = "justify" ===
                    r(d.overflow, g ? "none" : "justify"), l = this.visible && !1 !== f.visible && (f.series.forceDL || g && !y || u || d.inside && c && h.isInsidePlot(n, k ? c.x + 1 : c.y + c.height - 1, k)); var C = function (d) { g && b.xAxis && !y && b.setDataLabelStartPos(f, a, e, u, d) }; if (l) {
                        var E = h.renderer.fontMetrics(h.styledMode ? void 0 : d.style.fontSize, a).b; c = N({ x: k ? this.yAxis.len - m : n, y: Math.round(k ? this.xAxis.len - n : m), width: 0, height: 0 }, c); N(d, { width: q.width, height: q.height }); v ? (y = !1, n = h.renderer.rotCorr(E, v), n = {
                            x: c.x + d.x + c.width / 2 + n.x, y: c.y + d.y + {
                                top: 0, middle: .5,
                                bottom: 1
                            }[d.verticalAlign] * c.height
                        }, C(n), a[e ? "attr" : "animate"](n).attr({ align: x }), C = (v + 720) % 360, C = 180 < C && 360 > C, "left" === x ? n.y -= C ? q.height : 0 : "center" === x ? (n.x -= q.width / 2, n.y -= q.height / 2) : "right" === x && (n.x -= q.width, n.y -= C ? 0 : q.height), a.placed = !0, a.alignAttr = n) : (C(c), a.align(d, null, c), n = a.alignAttr); y && 0 <= c.height ? this.justifyDataLabel(a, d, n, q, c, e) : r(d.crop, !0) && (l = h.isInsidePlot(n.x, n.y) && h.isInsidePlot(n.x + q.width, n.y + q.height)); if (d.shape && !v) a[e ? "attr" : "animate"]({
                            anchorX: k ? h.plotWidth - f.plotY :
                                f.plotX, anchorY: k ? h.plotHeight - f.plotX : f.plotY
                        })
                    } e && g && (a.placed = !1); l || g && !y || (a.hide(!0), a.placed = !1)
            }; n.prototype.setDataLabelStartPos = function (f, a, d, c, e) {
                var b = this.chart, h = b.inverted, k = this.xAxis, g = k.reversed, n = h ? a.height / 2 : a.width / 2; f = (f = f.pointWidth) ? f / 2 : 0; k = h ? e.x : g ? -n - f : k.width - n + f; e = h ? g ? this.yAxis.height - n + f : -n - f : e.y; a.startXPos = k; a.startYPos = e; c ? "hidden" === a.visibility && (a.show(), a.attr({ opacity: 0 }).animate({ opacity: 1 })) : a.attr({ opacity: 1 }).animate({ opacity: 0 }, void 0, a.hide); b.hasRendered &&
                    (d && a.attr({ x: a.startXPos, y: a.startYPos }), a.placed = !0)
            }; n.prototype.justifyDataLabel = function (f, a, d, c, e, b) {
                var h = this.chart, k = a.align, g = a.verticalAlign, n = f.box ? 0 : f.padding || 0; var m = d.x + n; if (0 > m) { "right" === k ? (a.align = "left", a.inside = !0) : a.x = -m; var q = !0 } m = d.x + c.width - n; m > h.plotWidth && ("left" === k ? (a.align = "right", a.inside = !0) : a.x = h.plotWidth - m, q = !0); m = d.y + n; 0 > m && ("bottom" === g ? (a.verticalAlign = "top", a.inside = !0) : a.y = -m, q = !0); m = d.y + c.height - n; m > h.plotHeight && ("top" === g ? (a.verticalAlign = "bottom", a.inside =
                    !0) : a.y = h.plotHeight - m, q = !0); q && (f.placed = !b, f.align(a, null, e)); return q
            }; M.pie && (M.pie.prototype.dataLabelPositioners = {
                radialDistributionY: function (f) { return f.top + f.distributeBox.pos }, radialDistributionX: function (f, a, d, c) { return f.getX(d < a.top + 2 || d > a.bottom - 2 ? c : d, a.half, a) }, justify: function (f, a, d) { return d[0] + (f.half ? -1 : 1) * (a + f.labelDistance) }, alignToPlotEdges: function (f, a, d, c) { f = f.getBBox().width; return a ? f + c : d - f - c }, alignToConnectors: function (f, a, d, c) {
                    var e = 0, b; f.forEach(function (a) {
                        b = a.dataLabel.getBBox().width;
                        b > e && (e = b)
                    }); return a ? e + c : d - e - c
                }
            }, M.pie.prototype.drawDataLabels = function () {
                var f = this, a = f.data, d, h = f.chart, e = f.options.dataLabels || {}, b = e.connectorPadding, k, g = h.plotWidth, m = h.plotHeight, w = h.plotLeft, x = Math.round(h.chartWidth / 3), u, y = f.center, J = y[2] / 2, E = y[1], A, l, H, I, D = [[], []], M, F, L, B, N = [0, 0, 0, 0], P = f.dataLabelPositioners, Y; f.visible && (e.enabled || f._hasPointLabels) && (a.forEach(function (a) {
                a.dataLabel && a.visible && a.dataLabel.shortened && (a.dataLabel.attr({ width: "auto" }).css({ width: "auto", textOverflow: "clip" }),
                    a.dataLabel.shortened = !1)
                }), n.prototype.drawDataLabels.apply(f), a.forEach(function (a) { a.dataLabel && (a.visible ? (D[a.half].push(a), a.dataLabel._pos = null, !v(e.style.width) && !v(a.options.dataLabels && a.options.dataLabels.style && a.options.dataLabels.style.width) && a.dataLabel.getBBox().width > x && (a.dataLabel.css({ width: .7 * x }), a.dataLabel.shortened = !0)) : (a.dataLabel = a.dataLabel.destroy(), a.dataLabels && 1 === a.dataLabels.length && delete a.dataLabels)) }), D.forEach(function (a, k) {
                    var p = a.length, n = [], t; if (p) {
                        f.sortByAngle(a,
                            k - .5); if (0 < f.maxLabelDistance) { var q = Math.max(0, E - J - f.maxLabelDistance); var z = Math.min(E + J + f.maxLabelDistance, h.plotHeight); a.forEach(function (a) { 0 < a.labelDistance && a.dataLabel && (a.top = Math.max(0, E - J - a.labelDistance), a.bottom = Math.min(E + J + a.labelDistance, h.plotHeight), t = a.dataLabel.getBBox().height || 21, a.distributeBox = { target: a.labelPosition.natural.y - a.top + t / 2, size: t, rank: a.y }, n.push(a.distributeBox)) }); q = z + t - q; c.distribute(n, q, q / 5) } for (B = 0; B < p; B++) {
                                d = a[B]; H = d.labelPosition; A = d.dataLabel; L = !1 ===
                                    d.visible ? "hidden" : "inherit"; F = q = H.natural.y; n && v(d.distributeBox) && ("undefined" === typeof d.distributeBox.pos ? L = "hidden" : (I = d.distributeBox.size, F = P.radialDistributionY(d))); delete d.positionIndex; if (e.justify) M = P.justify(d, J, y); else switch (e.alignTo) { case "connectors": M = P.alignToConnectors(a, k, g, w); break; case "plotEdges": M = P.alignToPlotEdges(A, k, g, w); break; default: M = P.radialDistributionX(f, d, F, q) }A._attr = { visibility: L, align: H.alignment }; Y = d.options.dataLabels || {}; A._pos = {
                                        x: M + r(Y.x, e.x) + ({
                                            left: b,
                                            right: -b
                                        }[H.alignment] || 0), y: F + r(Y.y, e.y) - 10
                                    }; H.final.x = M; H.final.y = F; r(e.crop, !0) && (l = A.getBBox().width, q = null, M - l < b && 1 === k ? (q = Math.round(l - M + b), N[3] = Math.max(q, N[3])) : M + l > g - b && 0 === k && (q = Math.round(M + l - g + b), N[1] = Math.max(q, N[1])), 0 > F - I / 2 ? N[0] = Math.max(Math.round(-F + I / 2), N[0]) : F + I / 2 > m && (N[2] = Math.max(Math.round(F + I / 2 - m), N[2])), A.sideOverflow = q)
                            }
                    }
                }), 0 === q(N) || this.verifyDataLabelOverflow(N)) && (this.placeDataLabels(), this.points.forEach(function (a) {
                    Y = C(e, a.options.dataLabels); if (k = r(Y.connectorWidth,
                        1)) { var b; u = a.connector; if ((A = a.dataLabel) && A._pos && a.visible && 0 < a.labelDistance) { L = A._attr.visibility; if (b = !u) a.connector = u = h.renderer.path().addClass("highcharts-data-label-connector  highcharts-color-" + a.colorIndex + (a.className ? " " + a.className : "")).add(f.dataLabelsGroup), h.styledMode || u.attr({ "stroke-width": k, stroke: Y.connectorColor || a.color || "#666666" }); u[b ? "attr" : "animate"]({ d: a.getConnectorPath() }); u.attr("visibility", L) } else u && (a.connector = u.destroy()) }
                }))
            }, M.pie.prototype.placeDataLabels =
                function () { this.points.forEach(function (f) { var a = f.dataLabel, d; a && f.visible && ((d = a._pos) ? (a.sideOverflow && (a._attr.width = Math.max(a.getBBox().width - a.sideOverflow, 0), a.css({ width: a._attr.width + "px", textOverflow: (this.options.dataLabels.style || {}).textOverflow || "ellipsis" }), a.shortened = !0), a.attr(a._attr), a[a.moved ? "animate" : "attr"](d), a.moved = !0) : a && a.attr({ y: -9999 })); delete f.distributeBox }, this) }, M.pie.prototype.alignDataLabel = g, M.pie.prototype.verifyDataLabelOverflow = function (f) {
                    var a = this.center,
                    d = this.options, c = d.center, e = d.minSize || 80, b = null !== d.size; if (!b) { if (null !== c[0]) var k = Math.max(a[2] - Math.max(f[1], f[3]), e); else k = Math.max(a[2] - f[1] - f[3], e), a[0] += (f[3] - f[1]) / 2; null !== c[1] ? k = y(k, e, a[2] - Math.max(f[0], f[2])) : (k = y(k, e, a[2] - f[0] - f[2]), a[1] += (f[0] - f[2]) / 2); k < a[2] ? (a[2] = k, a[3] = Math.min(x(d.innerSize || 0, k), k), this.translate(a), this.drawDataLabels && this.drawDataLabels()) : b = !0 } return b
                }); M.column && (M.column.prototype.alignDataLabel = function (f, a, d, c, e) {
                    var b = this.chart.inverted, h = f.series,
                    k = f.dlBox || f.shapeArgs, g = r(f.below, f.plotY > r(this.translatedThreshold, h.yAxis.len)), m = r(d.inside, !!this.options.stacking); k && (c = C(k), 0 > c.y && (c.height += c.y, c.y = 0), k = c.y + c.height - h.yAxis.len, 0 < k && k < c.height && (c.height -= k), b && (c = { x: h.yAxis.len - c.y - c.height, y: h.xAxis.len - c.x - c.width, width: c.height, height: c.width }), m || (b ? (c.x += g ? 0 : c.width, c.width = 0) : (c.y += g ? c.height : 0, c.height = 0))); d.align = r(d.align, !b || m ? "center" : g ? "right" : "left"); d.verticalAlign = r(d.verticalAlign, b || m ? "middle" : g ? "top" : "bottom"); n.prototype.alignDataLabel.call(this,
                        f, a, d, c, e); d.inside && f.contrastColor && a.css({ color: f.contrastColor })
                })
        }); P(u, "modules/overlapping-datalabels.src.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
            var u = g.addEvent, q = g.fireEvent, y = g.isArray, v = g.objectEach, N = g.pick; c = c.Chart; u(c, "render", function () {
                var c = []; (this.labelCollectors || []).forEach(function (g) { c = c.concat(g()) }); (this.yAxis || []).forEach(function (g) { g.options.stackLabels && !g.options.stackLabels.allowOverlap && v(g.stacks, function (g) { v(g, function (k) { c.push(k.label) }) }) });
                (this.series || []).forEach(function (g) { var q = g.options.dataLabels; g.visible && (!1 !== q.enabled || g._hasPointLabels) && (g.nodes || g.points).forEach(function (k) { k.visible && (y(k.dataLabels) ? k.dataLabels : k.dataLabel ? [k.dataLabel] : []).forEach(function (g) { var q = g.options; g.labelrank = N(q.labelrank, k.labelrank, k.shapeArgs && k.shapeArgs.height); q.allowOverlap || c.push(g) }) }) }); this.hideOverlappingLabels(c)
            }); c.prototype.hideOverlappingLabels = function (c) {
                var g = this, v = c.length, k = g.renderer, r, x, m, u = !1; var n = function (a) {
                    var d =
                        a.box ? 0 : a.padding || 0; var f = 0; if (a && (!a.alignAttr || a.placed)) { var e = a.alignAttr || { x: a.attr("x"), y: a.attr("y") }; var b = a.parentGroup; a.width || (f = a.getBBox(), a.width = f.width, a.height = f.height, f = k.fontMetrics(null, a.element).h); return { x: e.x + (b.translateX || 0) + d, y: e.y + (b.translateY || 0) + d - f, width: a.width - 2 * d, height: a.height - 2 * d } }
                }; for (x = 0; x < v; x++)if (r = c[x]) r.oldOpacity = r.opacity, r.newOpacity = 1, r.absoluteBox = n(r); c.sort(function (a, d) { return (d.labelrank || 0) - (a.labelrank || 0) }); for (x = 0; x < v; x++) {
                    var y = (n = c[x]) &&
                        n.absoluteBox; for (r = x + 1; r < v; ++r) { var f = (m = c[r]) && m.absoluteBox; !y || !f || n === m || 0 === n.newOpacity || 0 === m.newOpacity || f.x > y.x + y.width || f.x + f.width < y.x || f.y > y.y + y.height || f.y + f.height < y.y || ((n.labelrank < m.labelrank ? n : m).newOpacity = 0) }
                } c.forEach(function (a) {
                    var d; if (a) {
                        var f = a.newOpacity; a.oldOpacity !== f && (a.alignAttr && a.placed ? (f ? a.show(!0) : d = function () { a.hide(!0); a.placed = !1 }, u = !0, a.alignAttr.opacity = f, a[a.isOld ? "animate" : "attr"](a.alignAttr, null, d), q(g, "afterHideOverlappingLabel")) : a.attr({ opacity: f }));
                        a.isOld = !0
                    }
                }); u && q(g, "afterHideAllOverlappingLabels")
            }
        }); P(u, "parts/Interaction.js", [u["parts/Globals.js"], u["parts/Legend.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function (c, g, u, q) {
            var y = q.addEvent, v = q.createElement, E = q.css, D = q.defined, F = q.extend, C = q.fireEvent, k = q.isArray, r = q.isFunction, x = q.isObject, m = q.merge, L = q.objectEach, n = q.pick; q = c.Chart; var M = c.defaultOptions, f = c.defaultPlotOptions, a = c.hasTouch, d = c.Series, h = c.seriesTypes, e = c.svg; c = c.TrackerMixin = {
                drawTrackerPoint: function () {
                    var b =
                        this, d = b.chart, e = d.pointer, f = function (a) { var b = e.getPointFromEvent(a); "undefined" !== typeof b && (e.isDirectTouch = !0, b.onMouseOver(a)) }, c; b.points.forEach(function (a) { c = k(a.dataLabels) ? a.dataLabels : a.dataLabel ? [a.dataLabel] : []; a.graphic && (a.graphic.element.point = a); c.forEach(function (b) { b.div ? b.div.point = a : b.element.point = a }) }); b._hasTracking || (b.trackerGroups.forEach(function (c) {
                            if (b[c]) {
                                b[c].addClass("highcharts-tracker").on("mouseover", f).on("mouseout", function (a) { e.onTrackerMouseOut(a) }); if (a) b[c].on("touchstart",
                                    f); !d.styledMode && b.options.cursor && b[c].css(E).css({ cursor: b.options.cursor })
                            }
                        }), b._hasTracking = !0); C(this, "afterDrawTracker")
                }, drawTrackerGraph: function () {
                    var b = this, d = b.options, f = d.trackByArea, c = [].concat(f ? b.areaPath : b.graphPath), h = c.length, k = b.chart, g = k.pointer, n = k.renderer, m = k.options.tooltip.snap, q = b.tracker, r, l = function () { if (k.hoverSeries !== b) b.onMouseOver() }, v = "rgba(192,192,192," + (e ? .0001 : .002) + ")"; if (h && !f) for (r = h + 1; r--;)"M" === c[r] && c.splice(r + 1, 0, c[r + 1] - m, c[r + 2], "L"), (r && "M" === c[r] || r ===
                        h) && c.splice(r, 0, "L", c[r - 2] + m, c[r - 1]); q ? q.attr({ d: c }) : b.graph && (b.tracker = n.path(c).attr({ visibility: b.visible ? "visible" : "hidden", zIndex: 2 }).addClass(f ? "highcharts-tracker-area" : "highcharts-tracker-line").add(b.group), k.styledMode || b.tracker.attr({ "stroke-linejoin": "round", stroke: v, fill: f ? v : "none", "stroke-width": b.graph.strokeWidth() + (f ? 0 : 2 * m) }), [b.tracker, b.markerGroup].forEach(function (b) {
                            b.addClass("highcharts-tracker").on("mouseover", l).on("mouseout", function (a) { g.onTrackerMouseOut(a) }); d.cursor &&
                                !k.styledMode && b.css({ cursor: d.cursor }); if (a) b.on("touchstart", l)
                        })); C(this, "afterDrawTracker")
                }
            }; h.column && (h.column.prototype.drawTracker = c.drawTrackerPoint); h.pie && (h.pie.prototype.drawTracker = c.drawTrackerPoint); h.scatter && (h.scatter.prototype.drawTracker = c.drawTrackerPoint); F(g.prototype, {
                setItemEvents: function (a, d, e) {
                    var b = this, f = b.chart.renderer.boxWrapper, c = a instanceof u, h = "highcharts-legend-" + (c ? "point" : "series") + "-active", k = b.chart.styledMode; (e ? [d, a.legendSymbol] : [a.legendGroup]).forEach(function (e) {
                        if (e) e.on("mouseover",
                            function () { a.visible && b.allItems.forEach(function (b) { a !== b && b.setState("inactive", !c) }); a.setState("hover"); a.visible && f.addClass(h); k || d.css(b.options.itemHoverStyle) }).on("mouseout", function () { b.chart.styledMode || d.css(m(a.visible ? b.itemStyle : b.itemHiddenStyle)); b.allItems.forEach(function (b) { a !== b && b.setState("", !c) }); f.removeClass(h); a.setState() }).on("click", function (d) {
                                var e = function () { a.setVisible && a.setVisible(); b.allItems.forEach(function (b) { a !== b && b.setState(a.visible ? "inactive" : "", !c) }) };
                                f.removeClass(h); d = { browserEvent: d }; a.firePointEvent ? a.firePointEvent("legendItemClick", d, e) : C(a, "legendItemClick", d, e)
                            })
                    })
                }, createCheckboxForItem: function (a) { a.checkbox = v("input", { type: "checkbox", className: "highcharts-legend-checkbox", checked: a.selected, defaultChecked: a.selected }, this.options.itemCheckboxStyle, this.chart.container); y(a.checkbox, "click", function (b) { C(a.series || a, "checkboxClick", { checked: b.target.checked, item: a }, function () { a.select() }) }) }
            }); F(q.prototype, {
                showResetZoom: function () {
                    function a() { d.zoomOut() }
                    var d = this, e = M.lang, f = d.options.chart.resetZoomButton, c = f.theme, h = c.states, k = "chart" === f.relativeTo || "spaceBox" === f.relativeTo ? null : "plotBox"; C(this, "beforeShowResetZoom", null, function () { d.resetZoomButton = d.renderer.button(e.resetZoom, null, null, a, c, h && h.hover).attr({ align: f.position.align, title: e.resetZoomTitle }).addClass("highcharts-reset-zoom").add().align(f.position, !1, k) }); C(this, "afterShowResetZoom")
                }, zoomOut: function () { C(this, "selection", { resetSelection: !0 }, this.zoom) }, zoom: function (a) {
                    var b =
                        this, d, e = b.pointer, f = !1, c = b.inverted ? e.mouseDownX : e.mouseDownY; !a || a.resetSelection ? (b.axes.forEach(function (a) { d = a.zoom() }), e.initiated = !1) : a.xAxis.concat(a.yAxis).forEach(function (a) { var h = a.axis, k = b.inverted ? h.left : h.top, g = b.inverted ? k + h.width : k + h.height, l = h.isXAxis, p = !1; if (!l && c >= k && c <= g || l || !D(c)) p = !0; e[l ? "zoomX" : "zoomY"] && p && (d = h.zoom(a.min, a.max), h.displayBtn && (f = !0)) }); var h = b.resetZoomButton; f && !h ? b.showResetZoom() : !f && x(h) && (b.resetZoomButton = h.destroy()); d && b.redraw(n(b.options.chart.animation,
                            a && a.animation, 100 > b.pointCount))
                }, pan: function (a, d) {
                    var b = this, e = b.hoverPoints, f = b.options.chart, c; d = "object" === typeof d ? d : { enabled: d, type: "x" }; f && f.panning && (f.panning = d); var h = d.type; C(this, "pan", { originalEvent: a }, function () {
                        e && e.forEach(function (a) { a.setState() }); var d = [1]; "xy" === h ? d = [1, 0] : "y" === h && (d = [0]); d.forEach(function (d) {
                            var e = b[d ? "xAxis" : "yAxis"][0], f = e.options, h = e.horiz, k = a[h ? "chartX" : "chartY"]; h = h ? "mouseDownX" : "mouseDownY"; var g = b[h], p = (e.pointRange || 0) / 2, n = e.reversed && !b.inverted ||
                                !e.reversed && b.inverted ? -1 : 1, m = e.getExtremes(), t = e.toValue(g - k, !0) + p * n; n = e.toValue(g + e.len - k, !0) - p * n; var q = n < t; g = q ? n : t; t = q ? t : n; n = Math.min(m.dataMin, p ? m.min : e.toValue(e.toPixels(m.min) - e.minPixelPadding)); p = Math.max(m.dataMax, p ? m.max : e.toValue(e.toPixels(m.max) + e.minPixelPadding)); if (!f.ordinal) {
                                    d && (f = n - g, 0 < f && (t += f, g = n), f = t - p, 0 < f && (t = p, g -= f)); if (e.series.length && g !== m.min && t !== m.max && d || e.panningState && g >= e.panningState.startMin && t <= e.panningState.startMax) e.setExtremes(g, t, !1, !1, { trigger: "pan" }),
                                        c = !0; b[h] = k
                                }
                        }); c && b.redraw(!1); E(b.container, { cursor: "move" })
                    })
                }
            }); F(u.prototype, {
                select: function (a, d) {
                    var b = this, e = b.series, f = e.chart; this.selectedStaging = a = n(a, !b.selected); b.firePointEvent(a ? "select" : "unselect", { accumulate: d }, function () {
                    b.selected = b.options.selected = a; e.options.data[e.data.indexOf(b)] = b.options; b.setState(a && "select"); d || f.getSelectedPoints().forEach(function (a) {
                        var d = a.series; a.selected && a !== b && (a.selected = a.options.selected = !1, d.options.data[d.data.indexOf(a)] = a.options, a.setState(f.hoverPoints &&
                            d.options.inactiveOtherPoints ? "inactive" : ""), a.firePointEvent("unselect"))
                    })
                    }); delete this.selectedStaging
                }, onMouseOver: function (a) { var b = this.series.chart, d = b.pointer; a = a ? d.normalize(a) : d.getChartCoordinatesFromPoint(this, b.inverted); d.runPointActions(a, this) }, onMouseOut: function () { var a = this.series.chart; this.firePointEvent("mouseOut"); this.series.options.inactiveOtherPoints || (a.hoverPoints || []).forEach(function (a) { a.setState() }); a.hoverPoints = a.hoverPoint = null }, importEvents: function () {
                    if (!this.hasImportedEvents) {
                        var a =
                            this, d = m(a.series.options.point, a.options).events; a.events = d; L(d, function (b, d) { r(b) && y(a, d, b) }); this.hasImportedEvents = !0
                    }
                }, setState: function (a, d) {
                    var b = this.series, e = this.state, c = b.options.states[a || "normal"] || {}, h = f[b.type].marker && b.options.marker, k = h && !1 === h.enabled, g = h && h.states && h.states[a || "normal"] || {}, p = !1 === g.enabled, m = b.stateMarkerGraphic, q = this.marker || {}, l = b.chart, r = b.halo, v, x = h && b.markerAttribs; a = a || ""; if (!(a === this.state && !d || this.selected && "select" !== a || !1 === c.enabled || a && (p || k && !1 ===
                        g.enabled) || a && q.states && q.states[a] && !1 === q.states[a].enabled)) {
                        this.state = a; x && (v = b.markerAttribs(this, a)); if (this.graphic) {
                            e && this.graphic.removeClass("highcharts-point-" + e); a && this.graphic.addClass("highcharts-point-" + a); if (!l.styledMode) {
                                var u = b.pointAttribs(this, a); var y = n(l.options.chart.animation, c.animation); b.options.inactiveOtherPoints && ((this.dataLabels || []).forEach(function (a) { a && a.animate({ opacity: u.opacity }, y) }), this.connector && this.connector.animate({ opacity: u.opacity }, y)); this.graphic.animate(u,
                                    y)
                            } v && this.graphic.animate(v, n(l.options.chart.animation, g.animation, h.animation)); m && m.hide()
                        } else { if (a && g) { e = q.symbol || b.symbol; m && m.currentSymbol !== e && (m = m.destroy()); if (v) if (m) m[d ? "animate" : "attr"]({ x: v.x, y: v.y }); else e && (b.stateMarkerGraphic = m = l.renderer.symbol(e, v.x, v.y, v.width, v.height).add(b.markerGroup), m.currentSymbol = e); !l.styledMode && m && m.attr(b.pointAttribs(this, a)) } m && (m[a && this.isInside ? "show" : "hide"](), m.element.point = this) } a = c.halo; c = (m = this.graphic || m) && m.visibility || "inherit"; a &&
                            a.size && m && "hidden" !== c && !this.isCluster ? (r || (b.halo = r = l.renderer.path().add(m.parentGroup)), r.show()[d ? "animate" : "attr"]({ d: this.haloPath(a.size) }), r.attr({ "class": "highcharts-halo highcharts-color-" + n(this.colorIndex, b.colorIndex) + (this.className ? " " + this.className : ""), visibility: c, zIndex: -1 }), r.point = this, l.styledMode || r.attr(F({ fill: this.color || b.color, "fill-opacity": a.opacity }, a.attributes))) : r && r.point && r.point.haloPath && r.animate({ d: r.point.haloPath(0) }, null, r.hide); C(this, "afterSetState")
                    }
                },
                haloPath: function (a) { return this.series.chart.renderer.symbols.circle(Math.floor(this.plotX) - a, this.plotY - a, 2 * a, 2 * a) }
            }); F(d.prototype, {
                onMouseOver: function () { var a = this.chart, d = a.hoverSeries; if (d && d !== this) d.onMouseOut(); this.options.events.mouseOver && C(this, "mouseOver"); this.setState("hover"); a.hoverSeries = this }, onMouseOut: function () {
                    var a = this.options, d = this.chart, e = d.tooltip, f = d.hoverPoint; d.hoverSeries = null; if (f) f.onMouseOut(); this && a.events.mouseOut && C(this, "mouseOut"); !e || this.stickyTracking ||
                        e.shared && !this.noSharedTooltip || e.hide(); d.series.forEach(function (a) { a.setState("", !0) })
                }, setState: function (a, d) {
                    var b = this, e = b.options, f = b.graph, c = e.inactiveOtherPoints, h = e.states, k = e.lineWidth, g = e.opacity, p = n(h[a || "normal"] && h[a || "normal"].animation, b.chart.options.chart.animation); e = 0; a = a || ""; if (b.state !== a && ([b.group, b.markerGroup, b.dataLabelsGroup].forEach(function (d) { d && (b.state && d.removeClass("highcharts-series-" + b.state), a && d.addClass("highcharts-series-" + a)) }), b.state = a, !b.chart.styledMode)) {
                        if (h[a] &&
                            !1 === h[a].enabled) return; a && (k = h[a].lineWidth || k + (h[a].lineWidthPlus || 0), g = n(h[a].opacity, g)); if (f && !f.dashstyle) for (h = { "stroke-width": k }, f.animate(h, p); b["zone-graph-" + e];)b["zone-graph-" + e].attr(h), e += 1; c || [b.group, b.markerGroup, b.dataLabelsGroup, b.labelBySeries].forEach(function (a) { a && a.animate({ opacity: g }, p) })
                    } d && c && b.points && b.setAllPointsToState(a)
                }, setAllPointsToState: function (a) { this.points.forEach(function (b) { b.setState && b.setState(a) }) }, setVisible: function (a, d) {
                    var b = this, e = b.chart, f = b.legendItem,
                    c = e.options.chart.ignoreHiddenSeries, h = b.visible; var k = (b.visible = a = b.options.visible = b.userOptions.visible = "undefined" === typeof a ? !h : a) ? "show" : "hide";["group", "dataLabelsGroup", "markerGroup", "tracker", "tt"].forEach(function (a) { if (b[a]) b[a][k]() }); if (e.hoverSeries === b || (e.hoverPoint && e.hoverPoint.series) === b) b.onMouseOut(); f && e.legend.colorizeItem(b, a); b.isDirty = !0; b.options.stacking && e.series.forEach(function (a) { a.options.stacking && a.visible && (a.isDirty = !0) }); b.linkedSeries.forEach(function (b) {
                        b.setVisible(a,
                            !1)
                    }); c && (e.isDirtyBox = !0); C(b, k); !1 !== d && e.redraw()
                }, show: function () { this.setVisible(!0) }, hide: function () { this.setVisible(!1) }, select: function (a) { this.selected = a = this.options.selected = "undefined" === typeof a ? !this.selected : a; this.checkbox && (this.checkbox.checked = a); C(this, a ? "select" : "unselect") }, drawTracker: c.drawTrackerGraph
            })
        }); P(u, "parts/Responsive.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
            var u = g.find, q = g.isArray, y = g.isObject, v = g.merge, N = g.objectEach, D = g.pick, F = g.splat,
            C = g.uniqueKey; c = c.Chart; c.prototype.setResponsive = function (c, g) {
                var k = this.options.responsive, m = [], q = this.currentResponsive; !g && k && k.rules && k.rules.forEach(function (c) { "undefined" === typeof c._id && (c._id = C()); this.matchResponsiveRule(c, m) }, this); g = v.apply(0, m.map(function (c) { return u(k.rules, function (k) { return k._id === c }).chartOptions })); g.isResponsiveOptions = !0; m = m.toString() || void 0; m !== (q && q.ruleIds) && (q && this.update(q.undoOptions, c, !0), m ? (q = this.currentOptions(g), q.isResponsiveOptions = !0, this.currentResponsive =
                    { ruleIds: m, mergedOptions: g, undoOptions: q }, this.update(g, c, !0)) : this.currentResponsive = void 0)
            }; c.prototype.matchResponsiveRule = function (c, g) { var k = c.condition; (k.callback || function () { return this.chartWidth <= D(k.maxWidth, Number.MAX_VALUE) && this.chartHeight <= D(k.maxHeight, Number.MAX_VALUE) && this.chartWidth >= D(k.minWidth, 0) && this.chartHeight >= D(k.minHeight, 0) }).call(this) && g.push(c._id) }; c.prototype.currentOptions = function (c) {
                function k(c, n, m, f) {
                    var a; N(c, function (d, c) {
                        if (!f && -1 < g.collectionsWithUpdate.indexOf(c)) for (d =
                            F(d), m[c] = [], a = 0; a < d.length; a++)n[c][a] && (m[c][a] = {}, k(d[a], n[c][a], m[c][a], f + 1)); else y(d) ? (m[c] = q(d) ? [] : {}, k(d, n[c] || {}, m[c], f + 1)) : m[c] = "undefined" === typeof n[c] ? null : n[c]
                    })
                } var g = this, m = {}; k(c, this.options, m, 0); return m
            }
        }); P(u, "masters/highcharts.src.js", [u["parts/Globals.js"]], function (c) { return c }); P(u, "parts-map/MapAxis.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
            var u = g.addEvent, q = g.pick; c = c.Axis; u(c, "getSeriesExtremes", function () {
                var c = []; this.isXAxis && (this.series.forEach(function (g,
                    q) { g.useMapGeometry && (c[q] = g.xData, g.xData = []) }), this.seriesXData = c)
            }); u(c, "afterGetSeriesExtremes", function () { var c = this.seriesXData, g; if (this.isXAxis) { var u = q(this.dataMin, Number.MAX_VALUE); var E = q(this.dataMax, -Number.MAX_VALUE); this.series.forEach(function (v, y) { v.useMapGeometry && (u = Math.min(u, q(v.minX, u)), E = Math.max(E, q(v.maxX, E)), v.xData = c[y], g = !0) }); g && (this.dataMin = u, this.dataMax = E); delete this.seriesXData } }); u(c, "afterSetAxisTranslation", function () {
                var c = this.chart; var g = c.plotWidth / c.plotHeight;
                c = c.xAxis[0]; var q; "yAxis" === this.coll && "undefined" !== typeof c.transA && this.series.forEach(function (c) { c.preserveAspectRatio && (q = !0) }); if (q && (this.transA = c.transA = Math.min(this.transA, c.transA), g /= (c.max - c.min) / (this.max - this.min), g = 1 > g ? this : c, c = (g.max - g.min) * g.transA, g.pixelPadding = g.len - c, g.minPixelPadding = g.pixelPadding / 2, c = g.fixTo)) { c = c[1] - g.toValue(c[0], !0); c *= g.transA; if (Math.abs(c) > g.minPixelPadding || g.min === g.dataMin && g.max === g.dataMax) c = 0; g.minPixelPadding -= c }
            }); u(c, "render", function () {
            this.fixTo =
                null
            })
        }); P(u, "parts-map/ColorSeriesMixin.js", [u["parts/Globals.js"]], function (c) {
        c.colorPointMixin = { setVisible: function (c) { var g = this, q = c ? "show" : "hide"; g.visible = g.options.visible = !!c;["graphic", "dataLabel"].forEach(function (c) { if (g[c]) g[c][q]() }) } }; c.colorSeriesMixin = {
            optionalAxis: "colorAxis", colorAxis: 0, translateColors: function () {
                var c = this, u = this.options.nullColor, q = this.colorAxis, y = this.colorKey; (this.data.length ? this.data : this.points).forEach(function (g) {
                    var v = g.getNestedProperty(y); if (v = g.options.color ||
                        (g.isNull ? u : q && "undefined" !== typeof v ? q.toColor(v, g) : g.color || c.color)) g.color = v
                })
            }
        }
        }); P(u, "parts-map/ColorAxis.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Point.js"], u["parts/Legend.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]], function (c, g, u, q, y, v) {
            ""; var E = g.parse; g = v.addEvent; var D = v.erase, F = v.extend, C = v.isNumber, k = v.merge, r = v.pick, x = v.splat, m = c.Axis; v = c.Chart; var L = c.Series, n = c.colorPointMixin, M = c.noop; F(L.prototype, c.colorSeriesMixin); F(u.prototype, n); v.prototype.collectionsWithUpdate.push("colorAxis");
            v.prototype.collectionsWithInit.colorAxis = [v.prototype.addColorAxis]; var f = c.ColorAxis = function () { this.init.apply(this, arguments) }; F(f.prototype, m.prototype); F(f.prototype, {
                defaultColorAxisOptions: { lineWidth: 0, minPadding: 0, maxPadding: 0, gridLineWidth: 1, tickPixelInterval: 72, startOnTick: !0, endOnTick: !0, offset: 0, marker: { animation: { duration: 50 }, width: .01, color: "#999999" }, labels: { overflow: "justify", rotation: 0 }, minColor: "#f5a9a9", maxColor: "#ff0303", tickLength: 5, showInLegend: !0 }, keepProps: ["legendGroup",
                    "legendItemHeight", "legendItemWidth", "legendItem", "legendSymbol"].concat(m.prototype.keepProps), init: function (a, d) { this.coll = "colorAxis"; var f = this.buildOptions.call(a, this.defaultColorAxisOptions, d); m.prototype.init.call(this, a, f); d.dataClasses && this.initDataClasses(d); this.initStops(); this.horiz = !f.opposite; this.zoomEnabled = !1; this.defaultLegendLength = 200 }, initDataClasses: function (a) {
                        var d = this.chart, f, e = 0, b = d.options.chart.colorCount, c = this.options, g = a.dataClasses.length; this.dataClasses = f = [];
                        this.legendItems = []; a.dataClasses.forEach(function (a, h) { a = k(a); f.push(a); if (d.styledMode || !a.color) "category" === c.dataClassColor ? (d.styledMode || (h = d.options.colors, b = h.length, a.color = h[e]), a.colorIndex = e, e++, e === b && (e = 0)) : a.color = E(c.minColor).tweenTo(E(c.maxColor), 2 > g ? .5 : h / (g - 1)) })
                    }, hasData: function () { return !(!this.tickPositions || !this.tickPositions.length) }, setTickPositions: function () { if (!this.dataClasses) return m.prototype.setTickPositions.call(this) }, initStops: function () {
                    this.stops = this.options.stops ||
                        [[0, this.options.minColor], [1, this.options.maxColor]]; this.stops.forEach(function (a) { a.color = E(a[1]) })
                    }, buildOptions: function (a, d) { var f = this.options.legend, e = d.layout ? "vertical" !== d.layout : "vertical" !== f.layout; return k(a, { side: e ? 2 : 1, reversed: !e }, d, { opposite: !e, showEmpty: !1, title: null, visible: f.enabled && (d ? !1 !== d.visible : !0) }) }, setOptions: function (a) { m.prototype.setOptions.call(this, a); this.options.crosshair = this.options.marker }, setAxisSize: function () {
                        var a = this.legendSymbol, d = this.chart, f = d.options.legend ||
                            {}, e, b; a ? (this.left = f = a.attr("x"), this.top = e = a.attr("y"), this.width = b = a.attr("width"), this.height = a = a.attr("height"), this.right = d.chartWidth - f - b, this.bottom = d.chartHeight - e - a, this.len = this.horiz ? b : a, this.pos = this.horiz ? f : e) : this.len = (this.horiz ? f.symbolWidth : f.symbolHeight) || this.defaultLegendLength
                    }, normalizedValue: function (a) { this.isLog && (a = this.val2lin(a)); return 1 - (this.max - a) / (this.max - this.min || 1) }, toColor: function (a, d) {
                        var f = this.stops, e = this.dataClasses, b; if (e) for (b = e.length; b--;) {
                            var c = e[b];
                            var k = c.from; f = c.to; if (("undefined" === typeof k || a >= k) && ("undefined" === typeof f || a <= f)) { var g = c.color; d && (d.dataClass = b, d.colorIndex = c.colorIndex); break }
                        } else { a = this.normalizedValue(a); for (b = f.length; b-- && !(a > f[b][0]);); k = f[b] || f[b + 1]; f = f[b + 1] || k; a = 1 - (f[0] - a) / (f[0] - k[0] || 1); g = k.color.tweenTo(f.color, a) } return g
                    }, getOffset: function () {
                        var a = this.legendGroup, d = this.chart.axisOffset[this.side]; a && (this.axisParent = a, m.prototype.getOffset.call(this), this.added || (this.added = !0, this.labelLeft = 0, this.labelRight =
                            this.width), this.chart.axisOffset[this.side] = d)
                    }, setLegendColor: function () { var a = this.reversed; var d = a ? 1 : 0; a = a ? 0 : 1; d = this.horiz ? [d, 0, a, 0] : [0, a, 0, d]; this.legendColor = { linearGradient: { x1: d[0], y1: d[1], x2: d[2], y2: d[3] }, stops: this.stops } }, drawLegendSymbol: function (a, d) {
                        var f = a.padding, e = a.options, b = this.horiz, c = r(e.symbolWidth, b ? this.defaultLegendLength : 12), k = r(e.symbolHeight, b ? 12 : this.defaultLegendLength), g = r(e.labelPadding, b ? 16 : 30); e = r(e.itemDistance, 10); this.setLegendColor(); d.legendSymbol = this.chart.renderer.rect(0,
                            a.baseline - 11, c, k).attr({ zIndex: 1 }).add(d.legendGroup); this.legendItemWidth = c + f + (b ? e : g); this.legendItemHeight = k + f + (b ? g : 0)
                    }, setState: function (a) { this.series.forEach(function (d) { d.setState(a) }) }, visible: !0, setVisible: M, getSeriesExtremes: function () {
                        var a = this.series, d = a.length, f; this.dataMin = Infinity; for (this.dataMax = -Infinity; d--;) {
                            var e = a[d]; var b = e.colorKey = r(e.options.colorKey, e.colorKey, e.pointValKey, e.zoneAxis, "y"); var c = e.pointArrayMap; var k = e[b + "Min"] && e[b + "Max"]; if (e[b + "Data"]) var g = e[b + "Data"];
                            else if (c) { g = []; c = c.indexOf(b); var n = e.yData; if (0 <= c && n) for (f = 0; f < n.length; f++)g.push(r(n[f][c], n[f])) } else g = e.yData; k ? (e.minColorValue = e[b + "Min"], e.maxColorValue = e[b + "Max"]) : (L.prototype.getExtremes.call(e, g), e.minColorValue = e.dataMin, e.maxColorValue = e.dataMax); "undefined" !== typeof e.minColorValue && (this.dataMin = Math.min(this.dataMin, e.minColorValue), this.dataMax = Math.max(this.dataMax, e.maxColorValue)); k || L.prototype.getExtremes.call(e)
                        }
                    }, drawCrosshair: function (a, d) {
                        var f = d && d.plotX, e = d && d.plotY,
                        b = this.pos, c = this.len; if (d) { var k = this.toPixels(d.getNestedProperty(d.series.colorKey)); k < b ? k = b - 2 : k > b + c && (k = b + c + 2); d.plotX = k; d.plotY = this.len - k; m.prototype.drawCrosshair.call(this, a, d); d.plotX = f; d.plotY = e; this.cross && !this.cross.addedToColorAxis && this.legendGroup && (this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup), this.cross.addedToColorAxis = !0, this.chart.styledMode || this.cross.attr({ fill: this.crosshair.color })) }
                    }, getPlotLinePath: function (a) {
                        var d = a.translatedValue; return C(d) ?
                            this.horiz ? ["M", d - 4, this.top - 6, "L", d + 4, this.top - 6, d, this.top, "Z"] : ["M", this.left, d, "L", this.left - 6, d + 6, this.left - 6, d - 6, "Z"] : m.prototype.getPlotLinePath.apply(this, arguments)
                    }, update: function (a, d) {
                        var f = this.chart, e = f.legend, b = this.buildOptions.call(f, {}, a); this.series.forEach(function (a) { a.isDirtyData = !0 }); (a.dataClasses && e.allItems || this.dataClasses) && this.destroyItems(); f.options[this.coll] = k(this.userOptions, b); m.prototype.update.call(this, b, d); this.legendItem && (this.setLegendColor(), e.colorizeItem(this,
                            !0))
                    }, destroyItems: function () { var a = this.chart; this.legendItem ? a.legend.destroyItem(this) : this.legendItems && this.legendItems.forEach(function (d) { a.legend.destroyItem(d) }); a.isDirtyLegend = !0 }, remove: function (a) { this.destroyItems(); m.prototype.remove.call(this, a) }, getDataClassLegendSymbols: function () {
                        var a = this, d = this.chart, f = this.legendItems, e = d.options.legend, b = e.valueDecimals, c = e.valueSuffix || "", k; f.length || this.dataClasses.forEach(function (e, h) {
                            var g = !0, n = e.from, m = e.to, p = d.numberFormatter; k = "";
                            "undefined" === typeof n ? k = "< " : "undefined" === typeof m && (k = "> "); "undefined" !== typeof n && (k += p(n, b) + c); "undefined" !== typeof n && "undefined" !== typeof m && (k += " - "); "undefined" !== typeof m && (k += p(m, b) + c); f.push(F({ chart: d, name: k, options: {}, drawLegendSymbol: y.drawRectangle, visible: !0, setState: M, isDataClass: !0, setVisible: function () { g = this.visible = !g; a.series.forEach(function (a) { a.points.forEach(function (a) { a.dataClass === h && a.setVisible(g) }) }); d.legend.colorizeItem(this, g) } }, e))
                        }); return f
                    }, beforePadding: !1,
                name: ""
            });["fill", "stroke"].forEach(function (a) { c.Fx.prototype[a + "Setter"] = function () { this.elem.attr(a, E(this.start).tweenTo(E(this.end), this.pos), null, !0) } }); g(v, "afterGetAxes", function () { var a = this, d = a.options; this.colorAxis = []; d.colorAxis && (d.colorAxis = x(d.colorAxis), d.colorAxis.forEach(function (d, e) { d.index = e; new f(a, d) })) }); g(L, "bindAxes", function () { var a = this.axisTypes; a ? -1 === a.indexOf("colorAxis") && a.push("colorAxis") : this.axisTypes = ["colorAxis"] }); g(q, "afterGetAllItems", function (a) {
                var d =
                    [], f, e; (this.chart.colorAxis || []).forEach(function (b) { (f = b.options) && f.showInLegend && (f.dataClasses && f.visible ? d = d.concat(b.getDataClassLegendSymbols()) : f.visible && d.push(b), b.series.forEach(function (b) { if (!b.options.showInLegend || f.dataClasses) "point" === b.options.legendType ? b.points.forEach(function (b) { D(a.allItems, b) }) : D(a.allItems, b) })) }); for (e = d.length; e--;)a.allItems.unshift(d[e])
            }); g(q, "afterColorizeItem", function (a) { a.visible && a.item.legendColor && a.item.legendSymbol.attr({ fill: a.item.legendColor }) });
            g(q, "afterUpdate", function () { var a = this.chart.colorAxis; a && a.forEach(function (a, f, e) { a.update({}, e) }) }); g(L, "afterTranslate", function () { (this.chart.colorAxis && this.chart.colorAxis.length || this.colorAttribs) && this.translateColors() })
        }); P(u, "parts-map/ColorMapSeriesMixin.js", [u["parts/Globals.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function (c, g, u) {
            var q = u.defined; u = c.noop; var y = c.seriesTypes; c.colorMapPointMixin = {
                dataLabelOnNull: !0, isValid: function () {
                    return null !== this.value && Infinity !== this.value &&
                        -Infinity !== this.value
                }, setState: function (c) { g.prototype.setState.call(this, c); this.graphic && this.graphic.attr({ zIndex: "hover" === c ? 1 : 0 }) }
            }; c.colorMapSeriesMixin = { pointArrayMap: ["value"], axisTypes: ["xAxis", "yAxis", "colorAxis"], trackerGroups: ["group", "markerGroup", "dataLabelsGroup"], getSymbol: u, parallelArrays: ["x", "y", "value"], colorKey: "value", pointAttribs: y.column.prototype.pointAttribs, colorAttribs: function (c) { var g = {}; q(c.color) && (g[this.colorProp || "fill"] = c.color); return g } }
        }); P(u, "parts-map/MapNavigation.js",
            [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                function u(c) { c && (c.preventDefault && c.preventDefault(), c.stopPropagation && c.stopPropagation(), c.cancelBubble = !0) } function q(c) { this.init(c) } var y = g.addEvent, v = g.extend, N = g.merge, D = g.objectEach, F = g.pick; g = c.Chart; var C = c.doc; q.prototype.init = function (c) { this.chart = c; c.mapNavButtons = [] }; q.prototype.update = function (c) {
                    var k = this.chart, g = k.options.mapNavigation, m, q, n, C, f, a = function (a) { this.handler.call(k, a); u(a) }, d = k.mapNavButtons; c && (g = k.options.mapNavigation =
                        N(k.options.mapNavigation, c)); for (; d.length;)d.pop().destroy(); F(g.enableButtons, g.enabled) && !k.renderer.forExport && D(g.buttons, function (c, e) {
                            m = N(g.buttonOptions, c); k.styledMode || (q = m.theme, q.style = N(m.theme.style, m.style), C = (n = q.states) && n.hover, f = n && n.select); c = k.renderer.button(m.text, 0, 0, a, q, C, f, 0, "zoomIn" === e ? "topbutton" : "bottombutton").addClass("highcharts-map-navigation highcharts-" + { zoomIn: "zoom-in", zoomOut: "zoom-out" }[e]).attr({
                                width: m.width, height: m.height, title: k.options.lang[e], padding: m.padding,
                                zIndex: 5
                            }).add(); c.handler = m.onclick; y(c.element, "dblclick", u); d.push(c); var b = m, h = y(k, "load", function () { c.align(v(b, { width: c.width, height: 2 * c.height }), null, b.alignTo); h() })
                        }); this.updateEvents(g)
                }; q.prototype.updateEvents = function (c) {
                    var k = this.chart; F(c.enableDoubleClickZoom, c.enabled) || c.enableDoubleClickZoomTo ? this.unbindDblClick = this.unbindDblClick || y(k.container, "dblclick", function (c) { k.pointer.onContainerDblClick(c) }) : this.unbindDblClick && (this.unbindDblClick = this.unbindDblClick()); F(c.enableMouseWheelZoom,
                        c.enabled) ? this.unbindMouseWheel = this.unbindMouseWheel || y(k.container, "undefined" === typeof C.onmousewheel ? "DOMMouseScroll" : "mousewheel", function (c) { k.pointer.onContainerMouseWheel(c); u(c); return !1 }) : this.unbindMouseWheel && (this.unbindMouseWheel = this.unbindMouseWheel())
                }; v(g.prototype, {
                    fitToBox: function (c, g) {
                        [["x", "width"], ["y", "height"]].forEach(function (k) { var m = k[0]; k = k[1]; c[m] + c[k] > g[m] + g[k] && (c[k] > g[k] ? (c[k] = g[k], c[m] = g[m]) : c[m] = g[m] + g[k] - c[k]); c[k] > g[k] && (c[k] = g[k]); c[m] < g[m] && (c[m] = g[m]) });
                        return c
                    }, mapZoom: function (c, g, q, m, v) {
                        var k = this.xAxis[0], r = k.max - k.min, f = F(g, k.min + r / 2), a = r * c; r = this.yAxis[0]; var d = r.max - r.min, h = F(q, r.min + d / 2); d *= c; f = this.fitToBox({ x: f - a * (m ? (m - k.pos) / k.len : .5), y: h - d * (v ? (v - r.pos) / r.len : .5), width: a, height: d }, { x: k.dataMin, y: r.dataMin, width: k.dataMax - k.dataMin, height: r.dataMax - r.dataMin }); a = f.x <= k.dataMin && f.width >= k.dataMax - k.dataMin && f.y <= r.dataMin && f.height >= r.dataMax - r.dataMin; m && (k.fixTo = [m - k.pos, g]); v && (r.fixTo = [v - r.pos, q]); "undefined" === typeof c || a ? (k.setExtremes(void 0,
                            void 0, !1), r.setExtremes(void 0, void 0, !1)) : (k.setExtremes(f.x, f.x + f.width, !1), r.setExtremes(f.y, f.y + f.height, !1)); this.redraw()
                    }
                }); y(g, "beforeRender", function () { this.mapNavigation = new q(this); this.mapNavigation.update() }); c.MapNavigation = q
            }); P(u, "parts-map/MapPointer.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                var u = g.extend, q = g.pick; g = g.wrap; c = c.Pointer; u(c.prototype, {
                    onContainerDblClick: function (c) {
                        var g = this.chart; c = this.normalize(c); g.options.mapNavigation.enableDoubleClickZoomTo ?
                            g.pointer.inClass(c.target, "highcharts-tracker") && g.hoverPoint && g.hoverPoint.zoomTo() : g.isInsidePlot(c.chartX - g.plotLeft, c.chartY - g.plotTop) && g.mapZoom(.5, g.xAxis[0].toValue(c.chartX), g.yAxis[0].toValue(c.chartY), c.chartX, c.chartY)
                    }, onContainerMouseWheel: function (c) {
                        var g = this.chart; c = this.normalize(c); var q = c.detail || -(c.wheelDelta / 120); g.isInsidePlot(c.chartX - g.plotLeft, c.chartY - g.plotTop) && g.mapZoom(Math.pow(g.options.mapNavigation.mouseWheelSensitivity, q), g.xAxis[0].toValue(c.chartX), g.yAxis[0].toValue(c.chartY),
                            c.chartX, c.chartY)
                    }
                }); g(c.prototype, "zoomOption", function (c) { var g = this.chart.options.mapNavigation; q(g.enableTouchZoom, g.enabled) && (this.chart.options.chart.pinchType = "xy"); c.apply(this, [].slice.call(arguments, 1)) }); g(c.prototype, "pinchTranslate", function (c, g, q, u, E, C, k) { c.call(this, g, q, u, E, C, k); "map" === this.chart.options.chart.type && this.hasZoom && (c = u.scaleX > u.scaleY, this.pinchTranslateDirection(!c, g, q, u, E, C, k, c ? u.scaleX : u.scaleY)) })
            }); P(u, "parts-map/MapSeries.js", [u["parts/Globals.js"], u["mixins/legend-symbol.js"],
            u["parts/Point.js"], u["parts/Utilities.js"]], function (c, g, u, q) {
                var y = q.extend, v = q.fireEvent, E = q.getNestedProperty, D = q.isArray, F = q.isNumber, C = q.merge, k = q.objectEach, r = q.pick, x = q.seriesType, m = q.splat, L = c.colorMapPointMixin, n = c.noop, M = c.Series, f = c.seriesTypes; x("map", "scatter", {
                    animation: !1, dataLabels: { crop: !1, formatter: function () { return this.point.value }, inside: !0, overflow: !1, padding: 0, verticalAlign: "middle" }, marker: null, nullColor: "#f7f7f7", stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "{point.name}: {point.value}<br/>" },
                    turboThreshold: 0, allAreas: !0, borderColor: "#cccccc", borderWidth: 1, joinBy: "hc-key", states: { hover: { halo: null, brightness: .2 }, normal: { animation: !0 }, select: { color: "#cccccc" }, inactive: { opacity: 1 } }
                }, C(c.colorMapSeriesMixin, {
                    type: "map", getExtremesFromAll: !0, useMapGeometry: !0, forceDL: !0, searchPoint: n, directTouch: !0, preserveAspectRatio: !0, pointArrayMap: ["value"], setOptions: function (a) { a = M.prototype.setOptions.call(this, a); var d = a.joinBy; null === d && (d = "_i"); d = this.joinBy = m(d); d[1] || (d[1] = d[0]); return a }, getBox: function (a) {
                        var d =
                            Number.MAX_VALUE, f = -d, e = d, b = -d, k = d, g = d, n = this.xAxis, m = this.yAxis, q; (a || []).forEach(function (a) {
                                if (a.path) {
                                "string" === typeof a.path && (a.path = c.splitPath(a.path)); var h = a.path || [], n = h.length, m = !1, p = -d, l = d, t = -d, w = d, v = a.properties; if (!a._foundBox) {
                                    for (; n--;)F(h[n]) && (m ? (p = Math.max(p, h[n]), l = Math.min(l, h[n])) : (t = Math.max(t, h[n]), w = Math.min(w, h[n])), m = !m); a._midX = l + (p - l) * r(a.middleX, v && v["hc-middle-x"], .5); a._midY = w + (t - w) * r(a.middleY, v && v["hc-middle-y"], .5); a._maxX = p; a._minX = l; a._maxY = t; a._minY = w; a.labelrank =
                                        r(a.labelrank, (p - l) * (t - w)); a._foundBox = !0
                                } f = Math.max(f, a._maxX); e = Math.min(e, a._minX); b = Math.max(b, a._maxY); k = Math.min(k, a._minY); g = Math.min(a._maxX - a._minX, a._maxY - a._minY, g); q = !0
                                }
                            }); q && (this.minY = Math.min(k, r(this.minY, d)), this.maxY = Math.max(b, r(this.maxY, -d)), this.minX = Math.min(e, r(this.minX, d)), this.maxX = Math.max(f, r(this.maxX, -d)), n && "undefined" === typeof n.options.minRange && (n.minRange = Math.min(5 * g, (this.maxX - this.minX) / 5, n.minRange || d)), m && "undefined" === typeof m.options.minRange && (m.minRange =
                                Math.min(5 * g, (this.maxY - this.minY) / 5, m.minRange || d)))
                    }, hasData: function () { return !!this.processedXData.length }, getExtremes: function () { M.prototype.getExtremes.call(this, this.valueData); this.chart.hasRendered && this.isDirtyData && this.getBox(this.options.data); this.valueMin = this.dataMin; this.valueMax = this.dataMax; this.dataMin = this.minY; this.dataMax = this.maxY }, translatePath: function (a) {
                        var d = !1, c = this.xAxis, e = this.yAxis, b = c.min, f = c.transA; c = c.minPixelPadding; var k = e.min, g = e.transA; e = e.minPixelPadding; var n,
                            m = []; if (a) for (n = a.length; n--;)F(a[n]) ? (m[n] = d ? (a[n] - b) * f + c : (a[n] - k) * g + e, d = !d) : m[n] = a[n]; return m
                    }, setData: function (a, d, f, e) {
                        var b = this.options, h = this.chart.options.chart, g = h && h.map, n = b.mapData, m = this.joinBy, q = b.keys || this.pointArrayMap, r = [], v = {}, x = this.chart.mapTransforms; !n && g && (n = "string" === typeof g ? c.maps[g] : g); a && a.forEach(function (d, c) {
                            var e = 0; if (F(d)) a[c] = { value: d }; else if (D(d)) {
                            a[c] = {}; !b.keys && d.length > q.length && "string" === typeof d[0] && (a[c]["hc-key"] = d[0], ++e); for (var f = 0; f < q.length; ++f,
                                ++e)q[f] && "undefined" !== typeof d[e] && (0 < q[f].indexOf(".") ? u.prototype.setNestedProperty(a[c], d[e], q[f]) : a[c][q[f]] = d[e])
                            } m && "_i" === m[0] && (a[c]._i = c)
                        }); this.getBox(a); (this.chart.mapTransforms = x = h && h.mapTransforms || n && n["hc-transform"] || x) && k(x, function (a) { a.rotation && (a.cosAngle = Math.cos(a.rotation), a.sinAngle = Math.sin(a.rotation)) }); if (n) {
                        "FeatureCollection" === n.type && (this.mapTitle = n.title, n = c.geojson(n, this.type, this)); this.mapData = n; this.mapMap = {}; for (x = 0; x < n.length; x++)h = n[x], g = h.properties,
                            h._i = x, m[0] && g && g[m[0]] && (h[m[0]] = g[m[0]]), v[h[m[0]]] = h; this.mapMap = v; if (a && m[1]) { var y = m[1]; a.forEach(function (a) { a = E(y, a); v[a] && r.push(v[a]) }) } if (b.allAreas) { this.getBox(n); a = a || []; if (m[1]) { var A = m[1]; a.forEach(function (a) { r.push(E(A, a)) }) } r = "|" + r.map(function (a) { return a && a[m[0]] }).join("|") + "|"; n.forEach(function (b) { m[0] && -1 !== r.indexOf("|" + b[m[0]] + "|") || (a.push(C(b, { value: null })), e = !1) }) } else this.getBox(r)
                        } M.prototype.setData.call(this, a, d, f, e)
                    }, drawGraph: n, drawDataLabels: n, doFullTranslate: function () {
                        return this.isDirtyData ||
                            this.chart.isResizing || this.chart.renderer.isVML || !this.baseTrans
                    }, translate: function () { var a = this, d = a.xAxis, c = a.yAxis, e = a.doFullTranslate(); a.generatePoints(); a.data.forEach(function (b) { F(b._midX) && F(b._midY) && (b.plotX = d.toPixels(b._midX, !0), b.plotY = c.toPixels(b._midY, !0)); e && (b.shapeType = "path", b.shapeArgs = { d: a.translatePath(b.path) }) }); v(a, "afterTranslate") }, pointAttribs: function (a, d) {
                        d = a.series.chart.styledMode ? this.colorAttribs(a) : f.column.prototype.pointAttribs.call(this, a, d); d["stroke-width"] =
                            r(a.options[this.pointAttrToOptions && this.pointAttrToOptions["stroke-width"] || "borderWidth"], "inherit"); return d
                    }, drawPoints: function () {
                        var a = this, d = a.xAxis, c = a.yAxis, e = a.group, b = a.chart, k = b.renderer, g = this.baseTrans; a.transformGroup || (a.transformGroup = k.g().attr({ scaleX: 1, scaleY: 1 }).add(e), a.transformGroup.survive = !0); if (a.doFullTranslate()) b.hasRendered && !b.styledMode && a.points.forEach(function (b) { b.shapeArgs && (b.shapeArgs.fill = a.pointAttribs(b, b.state).fill) }), a.group = a.transformGroup, f.column.prototype.drawPoints.apply(a),
                            a.group = e, a.points.forEach(function (d) { if (d.graphic) { var c = ""; d.name && (c += "highcharts-name-" + d.name.replace(/ /g, "-").toLowerCase()); d.properties && d.properties["hc-key"] && (c += " highcharts-key-" + d.properties["hc-key"].toLowerCase()); c && d.graphic.addClass(c); b.styledMode && d.graphic.css(a.pointAttribs(d, d.selected && "select" || void 0)) } }), this.baseTrans = { originX: d.min - d.minPixelPadding / d.transA, originY: c.min - c.minPixelPadding / c.transA + (c.reversed ? 0 : c.len / c.transA), transAX: d.transA, transAY: c.transA }, this.transformGroup.animate({
                                translateX: 0,
                                translateY: 0, scaleX: 1, scaleY: 1
                            }); else {
                                var n = d.transA / g.transAX; var m = c.transA / g.transAY; var q = d.toPixels(g.originX, !0); var v = c.toPixels(g.originY, !0); .99 < n && 1.01 > n && .99 < m && 1.01 > m && (m = n = 1, q = Math.round(q), v = Math.round(v)); var u = this.transformGroup; if (b.renderer.globalAnimation) {
                                    var x = u.attr("translateX"); var y = u.attr("translateY"); var C = u.attr("scaleX"); var l = u.attr("scaleY"); u.attr({ animator: 0 }).animate({ animator: 1 }, {
                                        step: function (a, b) {
                                            u.attr({
                                                translateX: x + (q - x) * b.pos, translateY: y + (v - y) * b.pos, scaleX: C +
                                                    (n - C) * b.pos, scaleY: l + (m - l) * b.pos
                                            })
                                        }
                                    })
                                } else u.attr({ translateX: q, translateY: v, scaleX: n, scaleY: m })
                        } b.styledMode || e.element.setAttribute("stroke-width", r(a.options[a.pointAttrToOptions && a.pointAttrToOptions["stroke-width"] || "borderWidth"], 1) / (n || 1)); this.drawMapDataLabels()
                    }, drawMapDataLabels: function () { M.prototype.drawDataLabels.call(this); this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect) }, render: function () {
                        var a = this, d = M.prototype.render; a.chart.renderer.isVML && 3E3 < a.data.length ?
                            setTimeout(function () { d.call(a) }) : d.call(a)
                    }, animate: function (a) { var d = this.options.animation, c = this.group, e = this.xAxis, b = this.yAxis, f = e.pos, k = b.pos; this.chart.renderer.isSVG && (!0 === d && (d = { duration: 1E3 }), a ? c.attr({ translateX: f + e.len / 2, translateY: k + b.len / 2, scaleX: .001, scaleY: .001 }) : c.animate({ translateX: f, translateY: k, scaleX: 1, scaleY: 1 }, d)) }, animateDrilldown: function (a) {
                        var d = this.chart.plotBox, c = this.chart.drilldownLevels[this.chart.drilldownLevels.length - 1], e = c.bBox, b = this.chart.options.drilldown.animation;
                        a || (a = Math.min(e.width / d.width, e.height / d.height), c.shapeArgs = { scaleX: a, scaleY: a, translateX: e.x, translateY: e.y }, this.points.forEach(function (a) { a.graphic && a.graphic.attr(c.shapeArgs).animate({ scaleX: 1, scaleY: 1, translateX: 0, translateY: 0 }, b) }))
                    }, drawLegendSymbol: g.drawRectangle, animateDrillupFrom: function (a) { f.column.prototype.animateDrillupFrom.call(this, a) }, animateDrillupTo: function (a) { f.column.prototype.animateDrillupTo.call(this, a) }
                }), y({
                    applyOptions: function (a, d) {
                        var c = this.series; a = u.prototype.applyOptions.call(this,
                            a, d); d = c.joinBy; c.mapData && c.mapMap && (d = u.prototype.getNestedProperty.call(a, d[1]), (d = "undefined" !== typeof d && c.mapMap[d]) ? (c.xyFromShape && (a.x = d._midX, a.y = d._midY), y(a, d)) : a.value = a.value || null); return a
                    }, onMouseOver: function (a) { q.clearTimeout(this.colorInterval); if (null !== this.value || this.series.options.nullInteraction) u.prototype.onMouseOver.call(this, a); else this.series.onMouseOut(a) }, zoomTo: function () {
                        var a = this.series; a.xAxis.setExtremes(this._minX, this._maxX, !1); a.yAxis.setExtremes(this._minY,
                            this._maxY, !1); a.chart.redraw()
                    }
                }, L)); ""
            }); P(u, "parts-map/MapLineSeries.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) { g = g.seriesType; var u = c.seriesTypes; g("mapline", "map", { lineWidth: 1, fillColor: "none" }, { type: "mapline", colorProp: "stroke", pointAttrToOptions: { stroke: "color", "stroke-width": "lineWidth" }, pointAttribs: function (c, g) { c = u.map.prototype.pointAttribs.call(this, c, g); c.fill = this.options.fillColor; return c }, drawLegendSymbol: u.line.prototype.drawLegendSymbol }); "" }); P(u, "parts-map/MapPointSeries.js",
                [u["parts/Globals.js"]], function (c) {
                    var g = c.merge, u = c.Point, q = c.Series; c = c.seriesType; c("mappoint", "scatter", { dataLabels: { crop: !1, defer: !1, enabled: !0, formatter: function () { return this.point.name }, overflow: !1, style: { color: "#000000" } } }, { type: "mappoint", forceDL: !0, drawDataLabels: function () { q.prototype.drawDataLabels.call(this); this.dataLabelsGroup && this.dataLabelsGroup.clip(this.chart.clipRect) } }, {
                        applyOptions: function (c, q) {
                            c = "undefined" !== typeof c.lat && "undefined" !== typeof c.lon ? g(c, this.series.chart.fromLatLonToPoint(c)) :
                                c; return u.prototype.applyOptions.call(this, c, q)
                        }
                    }); ""
                }); P(u, "parts-more/BubbleLegend.js", [u["parts/Globals.js"], u["parts/Color.js"], u["parts/Legend.js"], u["parts/Utilities.js"]], function (c, g, u, q) {
                    ""; var y = g.parse; g = q.addEvent; var v = q.arrayMax, E = q.arrayMin, D = q.isNumber, F = q.merge, C = q.objectEach, k = q.pick, r = q.stableSort, x = q.wrap, m = c.Series, L = c.Chart, n = c.noop, M = c.setOptions; M({
                        legend: {
                            bubbleLegend: {
                                borderColor: void 0, borderWidth: 2, className: void 0, color: void 0, connectorClassName: void 0, connectorColor: void 0,
                                connectorDistance: 60, connectorWidth: 1, enabled: !1, labels: { className: void 0, allowOverlap: !1, format: "", formatter: void 0, align: "right", style: { fontSize: 10, color: void 0 }, x: 0, y: 0 }, maxSize: 60, minSize: 10, legendIndex: 0, ranges: { value: void 0, borderColor: void 0, color: void 0, connectorColor: void 0 }, sizeBy: "area", sizeByAbsoluteValue: !1, zIndex: 1, zThreshold: 0
                            }
                        }
                    }); M = function () {
                        function c(a, d) {
                        this.options = this.symbols = this.visible = this.ranges = this.movementX = this.maxLabel = this.legendSymbol = this.legendItemWidth = this.legendItemHeight =
                            this.legendItem = this.legendGroup = this.legend = this.fontMetrics = this.chart = void 0; this.setState = n; this.init(a, d)
                        } c.prototype.init = function (a, d) { this.options = a; this.visible = !0; this.chart = d.chart; this.legend = d }; c.prototype.addToLegend = function (a) { a.splice(this.options.legendIndex, 0, this) }; c.prototype.drawLegendSymbol = function (a) {
                            var d = this.chart, c = this.options, e = k(a.options.itemDistance, 20), b = c.ranges; var f = c.connectorDistance; this.fontMetrics = d.renderer.fontMetrics(c.labels.style.fontSize.toString() +
                                "px"); b && b.length && D(b[0].value) ? (r(b, function (a, b) { return b.value - a.value }), this.ranges = b, this.setOptions(), this.render(), d = this.getMaxLabelSize(), b = this.ranges[0].radius, a = 2 * b, f = f - b + d.width, f = 0 < f ? f : 0, this.maxLabel = d, this.movementX = "left" === c.labels.align ? f : 0, this.legendItemWidth = a + f + e, this.legendItemHeight = a + this.fontMetrics.h / 2) : a.options.bubbleLegend.autoRanges = !0
                        }; c.prototype.setOptions = function () {
                            var a = this.ranges, d = this.options, c = this.chart.series[d.seriesIndex], e = this.legend.baseline, b = {
                                "z-index": d.zIndex,
                                "stroke-width": d.borderWidth
                            }, f = { "z-index": d.zIndex, "stroke-width": d.connectorWidth }, g = this.getLabelStyles(), n = c.options.marker.fillOpacity, m = this.chart.styledMode; a.forEach(function (h, p) {
                                m || (b.stroke = k(h.borderColor, d.borderColor, c.color), b.fill = k(h.color, d.color, 1 !== n ? y(c.color).setOpacity(n).get("rgba") : c.color), f.stroke = k(h.connectorColor, d.connectorColor, c.color)); a[p].radius = this.getRangeRadius(h.value); a[p] = F(a[p], { center: a[0].radius - a[p].radius + e }); m || F(!0, a[p], {
                                    bubbleStyle: F(!1, b), connectorStyle: F(!1,
                                        f), labelStyle: g
                                })
                            }, this)
                        }; c.prototype.getLabelStyles = function () { var a = this.options, d = {}, c = "left" === a.labels.align, e = this.legend.options.rtl; C(a.labels.style, function (a, c) { "color" !== c && "fontSize" !== c && "z-index" !== c && (d[c] = a) }); return F(!1, d, { "font-size": a.labels.style.fontSize, fill: k(a.labels.style.color, "#000000"), "z-index": a.zIndex, align: e || c ? "right" : "left" }) }; c.prototype.getRangeRadius = function (a) {
                            var c = this.options; return this.chart.series[this.options.seriesIndex].getRadius.call(this, c.ranges[c.ranges.length -
                                1].value, c.ranges[0].value, c.minSize, c.maxSize, a)
                        }; c.prototype.render = function () { var a = this.chart.renderer, c = this.options.zThreshold; this.symbols || (this.symbols = { connectors: [], bubbleItems: [], labels: [] }); this.legendSymbol = a.g("bubble-legend"); this.legendItem = a.g("bubble-legend-item"); this.legendSymbol.translateX = 0; this.legendSymbol.translateY = 0; this.ranges.forEach(function (a) { a.value >= c && this.renderRange(a) }, this); this.legendSymbol.add(this.legendItem); this.legendItem.add(this.legendGroup); this.hideOverlappingLabels() };
                        c.prototype.renderRange = function (a) {
                            var c = this.options, f = c.labels, e = this.chart.renderer, b = this.symbols, k = b.labels, g = a.center, n = Math.abs(a.radius), m = c.connectorDistance, q = f.align, r = f.style.fontSize; m = this.legend.options.rtl || "left" === q ? -m : m; f = c.connectorWidth; var u = this.ranges[0].radius, v = g - n - c.borderWidth / 2 + f / 2; r = r / 2 - (this.fontMetrics.h - r) / 2; var x = e.styledMode; "center" === q && (m = 0, c.connectorDistance = 0, a.labelStyle.align = "center"); q = v + c.labels.y; var y = u + m + c.labels.x; b.bubbleItems.push(e.circle(u, g +
                                ((v % 1 ? 1 : .5) - (f % 2 ? 0 : .5)), n).attr(x ? {} : a.bubbleStyle).addClass((x ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-symbol " + (c.className || "")).add(this.legendSymbol)); b.connectors.push(e.path(e.crispLine(["M", u, v, "L", u + m, v], c.connectorWidth)).attr(x ? {} : a.connectorStyle).addClass((x ? "highcharts-color-" + this.options.seriesIndex + " " : "") + "highcharts-bubble-legend-connectors " + (c.connectorClassName || "")).add(this.legendSymbol)); a = e.text(this.formatLabel(a), y, q + r).attr(x ? {} :
                                    a.labelStyle).addClass("highcharts-bubble-legend-labels " + (c.labels.className || "")).add(this.legendSymbol); k.push(a); a.placed = !0; a.alignAttr = { x: y, y: q + r }
                        }; c.prototype.getMaxLabelSize = function () { var a, c; this.symbols.labels.forEach(function (d) { c = d.getBBox(!0); a = a ? c.width > a.width ? c : a : c }); return a || {} }; c.prototype.formatLabel = function (a) { var c = this.options, f = c.labels.formatter; c = c.labels.format; var e = this.chart.numberFormatter; return c ? q.format(c, a) : f ? f.call(a) : e(a.value, 1) }; c.prototype.hideOverlappingLabels =
                            function () { var a = this.chart, c = this.symbols; !this.options.labels.allowOverlap && c && (a.hideOverlappingLabels(c.labels), c.labels.forEach(function (a, d) { a.newOpacity ? a.newOpacity !== a.oldOpacity && c.connectors[d].show() : c.connectors[d].hide() })) }; c.prototype.getRanges = function () {
                                var a = this.legend.bubbleLegend, c = a.options.ranges, f, e = Number.MAX_VALUE, b = -Number.MAX_VALUE; a.chart.series.forEach(function (a) {
                                a.isBubble && !a.ignoreSeries && (f = a.zData.filter(D), f.length && (e = k(a.options.zMin, Math.min(e, Math.max(E(f),
                                    !1 === a.options.displayNegative ? a.options.zThreshold : -Number.MAX_VALUE))), b = k(a.options.zMax, Math.max(b, v(f)))))
                                }); var g = e === b ? [{ value: b }] : [{ value: e }, { value: (e + b) / 2 }, { value: b, autoRanges: !0 }]; c.length && c[0].radius && g.reverse(); g.forEach(function (a, b) { c && c[b] && (g[b] = F(!1, c[b], a)) }); return g
                            }; c.prototype.predictBubbleSizes = function () {
                                var a = this.chart, c = this.fontMetrics, f = a.legend.options, e = "horizontal" === f.layout, b = e ? a.legend.lastLineHeight : 0, k = a.plotSizeX, g = a.plotSizeY, n = a.series[this.options.seriesIndex];
                                a = Math.ceil(n.minPxSize); var m = Math.ceil(n.maxPxSize); n = n.options.maxSize; var q = Math.min(g, k); if (f.floating || !/%$/.test(n)) c = m; else if (n = parseFloat(n), c = (q + b - c.h / 2) * n / 100 / (n / 100 + 1), e && g - c >= k || !e && k - c >= g) c = m; return [a, Math.ceil(c)]
                            }; c.prototype.updateRanges = function (a, c) { var d = this.legend.options.bubbleLegend; d.minSize = a; d.maxSize = c; d.ranges = this.getRanges() }; c.prototype.correctSizes = function () {
                                var a = this.legend, c = this.chart.series[this.options.seriesIndex]; 1 < Math.abs(Math.ceil(c.maxPxSize) - this.options.maxSize) &&
                                    (this.updateRanges(this.options.minSize, c.maxPxSize), a.render())
                            }; return c
                    }(); g(u, "afterGetAllItems", function (f) { var a = this.bubbleLegend, d = this.options, h = d.bubbleLegend, e = this.chart.getVisibleBubbleSeriesIndex(); a && a.ranges && a.ranges.length && (h.ranges.length && (h.autoRanges = !!h.ranges[0].autoRanges), this.destroyItem(a)); 0 <= e && d.enabled && h.enabled && (h.seriesIndex = e, this.bubbleLegend = new c.BubbleLegend(h, this), this.bubbleLegend.addToLegend(f.allItems)) }); L.prototype.getVisibleBubbleSeriesIndex = function () {
                        for (var c =
                            this.series, a = 0; a < c.length;) { if (c[a] && c[a].isBubble && c[a].visible && c[a].zData.length) return a; a++ } return -1
                    }; u.prototype.getLinesHeights = function () { var c = this.allItems, a = [], d = c.length, h, e = 0; for (h = 0; h < d; h++)if (c[h].legendItemHeight && (c[h].itemHeight = c[h].legendItemHeight), c[h] === c[d - 1] || c[h + 1] && c[h]._legendItemPos[1] !== c[h + 1]._legendItemPos[1]) { a.push({ height: 0 }); var b = a[a.length - 1]; for (e; e <= h; e++)c[e].itemHeight > b.height && (b.height = c[e].itemHeight); b.step = h } return a }; u.prototype.retranslateItems = function (c) {
                        var a,
                        d, f, e = this.options.rtl, b = 0; this.allItems.forEach(function (h, k) { a = h.legendGroup.translateX; d = h._legendItemPos[1]; if ((f = h.movementX) || e && h.ranges) f = e ? a - h.options.maxSize / 2 : a + f, h.legendGroup.attr({ translateX: f }); k > c[b].step && b++; h.legendGroup.attr({ translateY: Math.round(d + c[b].height / 2) }); h._legendItemPos[1] = d + c[b].height / 2 })
                    }; g(m, "legendItemClick", function () {
                        var c = this.chart, a = this.visible, d = this.chart.legend; d && d.bubbleLegend && (this.visible = !a, this.ignoreSeries = a, c = 0 <= c.getVisibleBubbleSeriesIndex(),
                            d.bubbleLegend.visible !== c && (d.update({ bubbleLegend: { enabled: c } }), d.bubbleLegend.visible = c), this.visible = a)
                    }); x(L.prototype, "drawChartBox", function (c, a, d) {
                        var f = this.legend, e = 0 <= this.getVisibleBubbleSeriesIndex(); if (f && f.options.enabled && f.bubbleLegend && f.options.bubbleLegend.autoRanges && e) {
                            var b = f.bubbleLegend.options; e = f.bubbleLegend.predictBubbleSizes(); f.bubbleLegend.updateRanges(e[0], e[1]); b.placed || (f.group.placed = !1, f.allItems.forEach(function (a) { a.legendGroup.translateY = null })); f.render();
                            this.getMargins(); this.axes.forEach(function (a) { a.visible && a.render(); b.placed || (a.setScale(), a.updateNames(), C(a.ticks, function (a) { a.isNew = !0; a.isNewLabel = !0 })) }); b.placed = !0; this.getMargins(); c.call(this, a, d); f.bubbleLegend.correctSizes(); f.retranslateItems(f.getLinesHeights())
                        } else c.call(this, a, d), f && f.options.enabled && f.bubbleLegend && (f.render(), f.retranslateItems(f.getLinesHeights()))
                    }); c.BubbleLegend = M; return c.BubbleLegend
                }); P(u, "parts-more/BubbleSeries.js", [u["parts/Globals.js"], u["parts/Color.js"],
                u["parts/Point.js"], u["parts/Utilities.js"]], function (c, g, u, q) {
                    var y = g.parse, v = q.arrayMax, E = q.arrayMin, D = q.clamp, F = q.extend, C = q.isNumber, k = q.pick, r = q.pInt; g = q.seriesType; q = c.Axis; var x = c.noop, m = c.Series, L = c.seriesTypes; g("bubble", "scatter", {
                        dataLabels: { formatter: function () { return this.point.z }, inside: !0, verticalAlign: "middle" }, animationLimit: 250, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } },
                        tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
                    }, {
                        pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", bubblePadding: !0, zoneAxis: "z", directTouch: !0, isBubble: !0, pointAttribs: function (c, k) { var f = this.options.marker.fillOpacity; c = m.prototype.pointAttribs.call(this, c, k); 1 !== f && (c.fill = y(c.fill).setOpacity(f).get("rgba")); return c }, getRadii: function (c, k, f) {
                            var a = this.zData, d = this.yData,
                            h = f.minPxSize, e = f.maxPxSize, b = []; var g = 0; for (f = a.length; g < f; g++) { var n = a[g]; b.push(this.getRadius(c, k, h, e, n, d[g])) } this.radii = b
                        }, getRadius: function (c, k, f, a, d, h) { var e = this.options, b = "width" !== e.sizeBy, g = e.zThreshold, n = k - c, m = .5; if (null === h || null === d) return null; if (C(d)) { e.sizeByAbsoluteValue && (d = Math.abs(d - g), n = Math.max(k - g, Math.abs(c - g)), c = 0); if (d < c) return f / 2 - 1; 0 < n && (m = (d - c) / n) } b && 0 <= m && (m = Math.sqrt(m)); return Math.ceil(f + m * (a - f)) / 2 }, animate: function (c) {
                        !c && this.points.length < this.options.animationLimit &&
                            this.points.forEach(function (c) { var f = c.graphic; if (f && f.width) { var a = { x: f.x, y: f.y, width: f.width, height: f.height }; f.attr({ x: c.plotX, y: c.plotY, width: 1, height: 1 }); f.animate(a, this.options.animation) } }, this)
                        }, hasData: function () { return !!this.processedXData.length }, translate: function () {
                            var c, k = this.data, f = this.radii; L.scatter.prototype.translate.call(this); for (c = k.length; c--;) {
                                var a = k[c]; var d = f ? f[c] : 0; C(d) && d >= this.minPxSize / 2 ? (a.marker = F(a.marker, { radius: d, width: 2 * d, height: 2 * d }), a.dlBox = {
                                    x: a.plotX - d,
                                    y: a.plotY - d, width: 2 * d, height: 2 * d
                                }) : a.shapeArgs = a.plotY = a.dlBox = void 0
                            }
                        }, alignDataLabel: L.column.prototype.alignDataLabel, buildKDTree: x, applyZones: x
                    }, { haloPath: function (c) { return u.prototype.haloPath.call(this, 0 === c ? 0 : (this.marker ? this.marker.radius || 0 : 0) + c) }, ttBelow: !1 }); q.prototype.beforePadding = function () {
                        var c = this, g = this.len, f = this.chart, a = 0, d = g, h = this.isXAxis, e = h ? "xData" : "yData", b = this.min, m = {}, q = Math.min(f.plotWidth, f.plotHeight), t = Number.MAX_VALUE, u = -Number.MAX_VALUE, x = this.max - b, y = g / x, F = [];
                        this.series.forEach(function (a) { var b = a.options; !a.bubblePadding || !a.visible && f.options.chart.ignoreHiddenSeries || (c.allowZoomOutside = !0, F.push(a), h && (["minSize", "maxSize"].forEach(function (a) { var c = b[a], d = /%$/.test(c); c = r(c); m[a] = d ? q * c / 100 : c }), a.minPxSize = m.minSize, a.maxPxSize = Math.max(m.maxSize, m.minSize), a = a.zData.filter(C), a.length && (t = k(b.zMin, D(E(a), !1 === b.displayNegative ? b.zThreshold : -Number.MAX_VALUE, t)), u = k(b.zMax, Math.max(u, v(a)))))) }); F.forEach(function (f) {
                            var k = f[e], g = k.length; h && f.getRadii(t,
                                u, f); if (0 < x) for (; g--;)if (C(k[g]) && c.dataMin <= k[g] && k[g] <= c.max) { var l = f.radii ? f.radii[g] : 0; a = Math.min((k[g] - b) * y - l, a); d = Math.max((k[g] - b) * y + l, d) }
                        }); F.length && 0 < x && !this.isLog && (d -= g, y *= (g + Math.max(0, a) - Math.min(d, g)) / g, [["min", "userMin", a], ["max", "userMax", d]].forEach(function (a) { "undefined" === typeof k(c.options[a[0]], c[a[1]]) && (c[a[0]] += a[2] / y) }))
                    }; ""
                }); P(u, "parts-map/MapBubbleSeries.js", [u["parts/Globals.js"], u["parts/Point.js"], u["parts/Utilities.js"]], function (c, g, u) {
                    var q = u.merge; u = u.seriesType;
                    var y = c.seriesTypes; y.bubble && u("mapbubble", "bubble", { animationLimit: 500, tooltip: { pointFormat: "{point.name}: {point.z}" } }, { xyFromShape: !0, type: "mapbubble", pointArrayMap: ["z"], getMapData: y.map.prototype.getMapData, getBox: y.map.prototype.getBox, setData: y.map.prototype.setData, setOptions: y.map.prototype.setOptions }, {
                        applyOptions: function (c, u) {
                            return c && "undefined" !== typeof c.lat && "undefined" !== typeof c.lon ? g.prototype.applyOptions.call(this, q(c, this.series.chart.fromLatLonToPoint(c)), u) : y.map.prototype.pointClass.prototype.applyOptions.call(this,
                                c, u)
                        }, isValid: function () { return "number" === typeof this.z }, ttBelow: !1
                    }); ""
                }); P(u, "parts-map/HeatmapSeries.js", [u["parts/Globals.js"], u["mixins/legend-symbol.js"], u["parts/Utilities.js"]], function (c, g, u) {
                    var q = u.clamp, y = u.extend, v = u.fireEvent, E = u.merge, D = u.pick; u = u.seriesType; var F = c.colorMapPointMixin, C = c.noop, k = c.Series, r = c.seriesTypes; u("heatmap", "scatter", {
                        animation: !1, borderWidth: 0, nullColor: "#f7f7f7", dataLabels: {
                            formatter: function () { return this.point.value }, inside: !0, verticalAlign: "middle", crop: !1,
                            overflow: !1, padding: 0
                        }, marker: null, pointRange: null, tooltip: { pointFormat: "{point.x}, {point.y}: {point.value}<br/>" }, states: { hover: { halo: !1, brightness: .2 } }
                    }, E(c.colorMapSeriesMixin, {
                        pointArrayMap: ["y", "value"], hasPointSpecificOptions: !0, getExtremesFromAll: !0, directTouch: !0, init: function () { r.scatter.prototype.init.apply(this, arguments); var c = this.options; c.pointRange = D(c.pointRange, c.colsize || 1); this.yAxis.axisPointRange = c.rowsize || 1 }, translate: function () {
                            this.generatePoints(); var c = this.options, k =
                                c.colsize, g = c.pointPadding, n = void 0 === g ? 0 : g; c = c.rowsize; g = this.points; var r = this.xAxis, f = this.yAxis, a = (void 0 === k ? 1 : k) / 2, d = (void 0 === c ? 1 : c) / 2, h = this.pointPlacementToXValue(), e = function (a) { return Math.round(q(r.translate(a, !1, !1, !1, !0, h), 0, r.len)) }; g.forEach(function (b) {
                                    var c = e(b.x - a), h = e(b.x + a), k = Math.round(q(f.translate(b.y - d, !1, !0, !1, !0), 0, f.len)), g = Math.round(q(f.translate(b.y + d, !1, !0, !1, !0), 0, f.len)), m = D(b.pointPadding, n); b.plotX = b.clientX = (c + h) / 2; b.plotY = (k + g) / 2; b.shapeType = "rect"; b.shapeArgs =
                                        { x: Math.min(c, h) + m, y: Math.min(k, g) + m, width: Math.max(Math.abs(h - c) - 2 * m, 0), height: Math.max(Math.abs(g - k) - 2 * m, 0) }
                                }); v(this, "afterTranslate")
                        }, drawPoints: function () { var c = this.chart.styledMode ? "css" : "animate"; r.column.prototype.drawPoints.call(this); this.points.forEach(function (k) { k.graphic[c](this.colorAttribs(k)) }, this) }, hasData: function () { return !!this.processedXData.length }, getValidPoints: function (c, g) { return k.prototype.getValidPoints.call(this, c, g, !0) }, animate: C, getBox: C, drawLegendSymbol: g.drawRectangle,
                        alignDataLabel: r.column.prototype.alignDataLabel, getExtremes: function () { k.prototype.getExtremes.call(this, this.valueData); this.valueMin = this.dataMin; this.valueMax = this.dataMax; k.prototype.getExtremes.call(this) }
                    }), y({ haloPath: function (c) { if (!c) return []; var k = this.shapeArgs; return ["M", k.x - c, k.y - c, "L", k.x - c, k.y + k.height + c, k.x + k.width + c, k.y + k.height + c, k.x + k.width + c, k.y - c, "Z"] } }, F)); ""
                }); P(u, "parts-map/GeoJSON.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    function u(c, k) {
                        var g, q = !1,
                        m = c.x, u = c.y; c = 0; for (g = k.length - 1; c < k.length; g = c++) { var n = k[c][1] > u; var v = k[g][1] > u; n !== v && m < (k[g][0] - k[c][0]) * (u - k[c][1]) / (k[g][1] - k[c][1]) + k[c][0] && (q = !q) } return q
                    } var q = g.error, y = g.extend, v = g.format, N = g.merge; g = g.wrap; var D = c.Chart, F = c.win; D.prototype.transformFromLatLon = function (c, k) {
                        var g, u = (null === (g = this.userOptions.chart) || void 0 === g ? void 0 : g.proj4) || F.proj4; if (!u) return q(21, !1, this), { x: 0, y: null }; c = u(k.crs, [c.lon, c.lat]); g = k.cosAngle || k.rotation && Math.cos(k.rotation); u = k.sinAngle || k.rotation &&
                            Math.sin(k.rotation); c = k.rotation ? [c[0] * g + c[1] * u, -c[0] * u + c[1] * g] : c; return { x: ((c[0] - (k.xoffset || 0)) * (k.scale || 1) + (k.xpan || 0)) * (k.jsonres || 1) + (k.jsonmarginX || 0), y: (((k.yoffset || 0) - c[1]) * (k.scale || 1) + (k.ypan || 0)) * (k.jsonres || 1) - (k.jsonmarginY || 0) }
                    }; D.prototype.transformToLatLon = function (c, k) {
                        if ("undefined" === typeof F.proj4) q(21, !1, this); else {
                            c = {
                                x: ((c.x - (k.jsonmarginX || 0)) / (k.jsonres || 1) - (k.xpan || 0)) / (k.scale || 1) + (k.xoffset || 0), y: ((-c.y - (k.jsonmarginY || 0)) / (k.jsonres || 1) + (k.ypan || 0)) / (k.scale || 1) + (k.yoffset ||
                                    0)
                            }; var g = k.cosAngle || k.rotation && Math.cos(k.rotation), u = k.sinAngle || k.rotation && Math.sin(k.rotation); k = F.proj4(k.crs, "WGS84", k.rotation ? { x: c.x * g + c.y * -u, y: c.x * u + c.y * g } : c); return { lat: k.y, lon: k.x }
                        }
                    }; D.prototype.fromPointToLatLon = function (c) { var k = this.mapTransforms, g; if (k) { for (g in k) if (Object.hasOwnProperty.call(k, g) && k[g].hitZone && u({ x: c.x, y: -c.y }, k[g].hitZone.coordinates[0])) return this.transformToLatLon(c, k[g]); return this.transformToLatLon(c, k["default"]) } q(22, !1, this) }; D.prototype.fromLatLonToPoint =
                        function (c) { var k = this.mapTransforms, g; if (!k) return q(22, !1, this), { x: 0, y: null }; for (g in k) if (Object.hasOwnProperty.call(k, g) && k[g].hitZone) { var v = this.transformFromLatLon(c, k[g]); if (u({ x: v.x, y: -v.y }, k[g].hitZone.coordinates[0])) return v } return this.transformFromLatLon(c, k["default"]) }; c.geojson = function (c, g, q) {
                            var k = [], m = [], r = function (c) { var g, f = c.length; m.push("M"); for (g = 0; g < f; g++)1 === g && m.push("L"), m.push(c[g][0], -c[g][1]) }; g = g || "map"; c.features.forEach(function (c) {
                                var n = c.geometry, f = n.type; n = n.coordinates;
                                c = c.properties; var a; m = []; "map" === g || "mapbubble" === g ? ("Polygon" === f ? (n.forEach(r), m.push("Z")) : "MultiPolygon" === f && (n.forEach(function (a) { a.forEach(r) }), m.push("Z")), m.length && (a = { path: m })) : "mapline" === g ? ("LineString" === f ? r(n) : "MultiLineString" === f && n.forEach(r), m.length && (a = { path: m })) : "mappoint" === g && "Point" === f && (a = { x: n[0], y: -n[1] }); a && k.push(y(a, { name: c.name || c.NAME, properties: c }))
                            }); q && c.copyrightShort && (q.chart.mapCredits = v(q.chart.options.credits.mapText, { geojson: c }), q.chart.mapCreditsFull =
                                v(q.chart.options.credits.mapTextFull, { geojson: c })); return k
                        }; g(D.prototype, "addCredits", function (c, g) { g = N(!0, this.options.credits, g); this.mapCredits && (g.href = null); c.call(this, g); this.credits && this.mapCreditsFull && this.credits.attr({ title: this.mapCreditsFull }) })
                }); P(u, "parts-map/Map.js", [u["parts/Globals.js"], u["parts/Utilities.js"]], function (c, g) {
                    function u(c, g, q, m, u, n, v, f) {
                        return ["M", c + u, g, "L", c + q - n, g, "C", c + q - n / 2, g, c + q, g + n / 2, c + q, g + n, "L", c + q, g + m - v, "C", c + q, g + m - v / 2, c + q - v / 2, g + m, c + q - v, g + m, "L", c + f, g +
                            m, "C", c + f / 2, g + m, c, g + m - f / 2, c, g + m - f, "L", c, g + u, "C", c, g + u / 2, c + u / 2, g, c + u, g, "Z"]
                    } var q = g.extend, y = g.merge, v = g.pick, N = c.Chart; g = c.defaultOptions; var D = c.Renderer, F = c.SVGRenderer, C = c.VMLRenderer; q(g.lang, { zoomIn: "Zoom in", zoomOut: "Zoom out" }); g.mapNavigation = {
                        buttonOptions: { alignTo: "plotBox", align: "left", verticalAlign: "top", x: 0, width: 18, height: 18, padding: 5, style: { fontSize: "15px", fontWeight: "bolder" }, theme: { "stroke-width": 1, "text-align": "center" } }, buttons: {
                            zoomIn: {
                                onclick: function () { this.mapZoom(.5) }, text: "+",
                                y: 0
                            }, zoomOut: { onclick: function () { this.mapZoom(2) }, text: "-", y: 28 }
                        }, mouseWheelSensitivity: 1.1
                    }; c.splitPath = function (c) { var g; c = c.replace(/([A-Za-z])/g, " $1 "); c = c.replace(/^\s*/, "").replace(/\s*$/, ""); c = c.split(/[ ,]+/); for (g = 0; g < c.length; g++)/[a-zA-Z]/.test(c[g]) || (c[g] = parseFloat(c[g])); return c }; c.maps = {}; F.prototype.symbols.topbutton = function (c, g, q, m, v) { return u(c - 1, g - 1, q, m, v.r, v.r, 0, 0) }; F.prototype.symbols.bottombutton = function (c, g, q, m, v) { return u(c - 1, g - 1, q, m, 0, 0, v.r, v.r) }; D === C && ["topbutton",
                        "bottombutton"].forEach(function (c) { C.prototype.symbols[c] = F.prototype.symbols[c] }); c.Map = c.mapChart = function (g, q, u) {
                            var k = "string" === typeof g || g.nodeName, r = arguments[k ? 1 : 0], n = r, x = { endOnTick: !1, visible: !1, minPadding: 0, maxPadding: 0, startOnTick: !1 }, f = c.getOptions().credits; var a = r.series; r.series = null; r = y({
                                chart: { panning: "xy", type: "map" }, credits: { mapText: v(f.mapText, ' \u00a9 <a href="{geojson.copyrightUrl}">{geojson.copyrightShort}</a>'), mapTextFull: v(f.mapTextFull, "{geojson.copyright}") }, tooltip: { followTouchMove: !1 },
                                xAxis: x, yAxis: y(x, { reversed: !0 })
                            }, r, { chart: { inverted: !1, alignTicks: !1 } }); r.series = n.series = a; return k ? new N(g, r, u) : new N(r, q)
                        }
                }); P(u, "masters/modules/map.src.js", [], function () { }); P(u, "masters/highmaps.src.js", [u["masters/highcharts.src.js"]], function (c) { c.product = "Highmaps"; return c }); u["masters/highmaps.src.js"]._modules = u; return u["masters/highmaps.src.js"]
});
//# sourceMappingURL=highmaps.js.map