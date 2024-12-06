! function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e(e.toString()).default : "object" == typeof exports ? exports.Quagga = e(e.toString()).default : t.Quagga = e(e.toString()).default
}(this, function (t) {
    return function (t) {
        function e(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                i: r,
                l: !1,
                exports: {}
            };
            return t[r].call(o.exports, o, o.exports, e), o.l = !0, o.exports
        }
        var n = {};
        return e.m = t, e.c = n, e.i = function (t) {
            return t
        }, e.d = function (t, n, r) {
            e.o(t, n) || Object.defineProperty(t, n, {
                configurable: !1,
                enumerable: !0,
                get: r
            })
        }, e.n = function (t) {
            var n = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "/", e(e.s = 166)
    }([function (t, e) {
        function n(t) {
            var e = typeof t;
            return null != t && ("object" == e || "function" == e)
        }
        t.exports = n
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            return this._row = [], this.config = t || {}, this.supplements = e, this
        }
        var o = n(3);
        r.prototype._nextUnset = function (t, e) {
            var n;
            for (void 0 === e && (e = 0), n = e; n < t.length; n++)
                if (!t[n]) return n;
            return t.length
        }, r.prototype._matchPattern = function (t, e, n) {
            var r, o, i, a, u = 0,
                c = 0,
                s = 0,
                f = 0;
            for (n = n || this.SINGLE_CODE_ERROR || 1, r = 0; r < t.length; r++) s += t[r], f += e[r];
            if (s < f) return Number.MAX_VALUE;
            for (o = s / f, n *= o, r = 0; r < t.length; r++) {
                if (i = t[r], a = e[r] * o, (c = Math.abs(i - a) / a) > n) return Number.MAX_VALUE;
                u += c
            }
            return u / f
        }, r.prototype._nextSet = function (t, e) {
            var n;
            for (e = e || 0, n = e; n < t.length; n++)
                if (t[n]) return n;
            return t.length
        }, r.prototype._correctBars = function (t, e, n) {
            for (var r = n.length, o = 0; r--;)(o = t[n[r]] * (1 - (1 - e) / 2)) > 1 && (t[n[r]] = o)
        }, r.prototype._matchTrace = function (t, e) {
            var n, r, o = [],
                i = this,
                a = i._nextSet(i._row),
                u = !i._row[a],
                c = 0,
                s = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: 0
                };
            if (t) {
                for (n = 0; n < t.length; n++) o.push(0);
                for (n = a; n < i._row.length; n++)
                    if (i._row[n] ^ u) o[c]++;
                    else {
                        if (c === o.length - 1) return r = i._matchPattern(o, t), r < e ? (s.start = n - a, s.end = n, s.counter = o, s) : null;
                        c++, o[c] = 1, u = !u
                    }
            } else
                for (o.push(0), n = a; n < i._row.length; n++) i._row[n] ^ u ? o[c]++ : (c++, o.push(0), o[c] = 1, u = !u);
            return s.start = a, s.end = i._row.length - 1, s.counter = o, s
        }, r.prototype.decodePattern = function (t) {
            var e, n = this;
            return n._row = t, e = n._decode(), null === e ? (n._row.reverse(), (e = n._decode()) && (e.direction = r.DIRECTION.REVERSE, e.start = n._row.length - e.start, e.end = n._row.length - e.end)) : e.direction = r.DIRECTION.FORWARD, e && (e.format = n.FORMAT), e
        }, r.prototype._matchRange = function (t, e, n) {
            var r;
            for (t = t < 0 ? 0 : t, r = t; r < e; r++)
                if (this._row[r] !== n) return !1;
            return !0
        }, r.prototype._fillCounters = function (t, e, n) {
            var r, o = this,
                i = 0,
                a = [];
            for (n = void 0 === n || n, t = void 0 !== t ? t : o._nextUnset(o._row), e = e || o._row.length, a[i] = 0, r = t; r < e; r++) o._row[r] ^ n ? a[i]++ : (i++, a[i] = 1, n = !n);
            return a
        }, r.prototype._toCounters = function (t, e) {
            var n, r = this,
                i = e.length,
                a = r._row.length,
                u = !r._row[t],
                c = 0;
            for (o.a.init(e, 0), n = t; n < a; n++)
                if (r._row[n] ^ u) e[c]++;
                else {
                    if (++c === i) break;
                    e[c] = 1, u = !u
                } return e
        }, Object.defineProperty(r.prototype, "FORMAT", {
            value: "unknown",
            writeable: !1
        }), r.DIRECTION = {
            FORWARD: 1,
            REVERSE: -1
        }, r.Exception = {
            StartNotFoundException: "Start-Info was not found!",
            CodeNotFoundException: "Code could not be found!",
            PatternNotFoundException: "Pattern could not be found!"
        }, r.CONFIG_KEYS = {}, e.a = r
    }, function (t, e) {
        var n = Array.isArray;
        t.exports = n
    }, function (t, e, n) {
        "use strict";
        e.a = {
            init: function (t, e) {
                for (var n = t.length; n--;) t[n] = e
            },
            shuffle: function (t) {
                var e, n, r = t.length - 1;
                for (r; r >= 0; r--) e = Math.floor(Math.random() * r), n = t[r], t[r] = t[e], t[e] = n;
                return t
            },
            toPointList: function (t) {
                var e, n, r = [],
                    o = [];
                for (e = 0; e < t.length; e++) {
                    for (r = [], n = 0; n < t[e].length; n++) r[n] = t[e][n];
                    o[e] = "[" + r.join(",") + "]"
                }
                return "[" + o.join(",\r\n") + "]"
            },
            threshold: function (t, e, n) {
                var r, o = [];
                for (r = 0; r < t.length; r++) n.apply(t, [t[r]]) >= e && o.push(t[r]);
                return o
            },
            maxIndex: function (t) {
                var e, n = 0;
                for (e = 0; e < t.length; e++) t[e] > t[n] && (n = e);
                return n
            },
            max: function t(e) {
                var n, t = 0;
                for (n = 0; n < e.length; n++) e[n] > t && (t = e[n]);
                return t
            },
            sum: function t(e) {
                for (var n = e.length, t = 0; n--;) t += e[n];
                return t
            }
        }
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            t = a()(o(), t), u.a.call(this, t, e)
        }

        function o() {
            var t = {};
            return Object.keys(r.CONFIG_KEYS).forEach(function (e) {
                t[e] = r.CONFIG_KEYS[e].default
            }), t
        }
        var i = n(28),
            a = n.n(i),
            u = n(1),
            c = Object.assign || function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            s = {
                CODE_L_START: {
                    value: 0
                },
                CODE_G_START: {
                    value: 10
                },
                START_PATTERN: {
                    value: [1, 1, 1]
                },
                STOP_PATTERN: {
                    value: [1, 1, 1]
                },
                MIDDLE_PATTERN: {
                    value: [1, 1, 1, 1, 1]
                },
                EXTENSION_START_PATTERN: {
                    value: [1, 1, 2]
                },
                CODE_PATTERN: {
                    value: [
                        [3, 2, 1, 1],
                        [2, 2, 2, 1],
                        [2, 1, 2, 2],
                        [1, 4, 1, 1],
                        [1, 1, 3, 2],
                        [1, 2, 3, 1],
                        [1, 1, 1, 4],
                        [1, 3, 1, 2],
                        [1, 2, 1, 3],
                        [3, 1, 1, 2],
                        [1, 1, 2, 3],
                        [1, 2, 2, 2],
                        [2, 2, 1, 2],
                        [1, 1, 4, 1],
                        [2, 3, 1, 1],
                        [1, 3, 2, 1],
                        [4, 1, 1, 1],
                        [2, 1, 3, 1],
                        [3, 1, 2, 1],
                        [2, 1, 1, 3]
                    ]
                },
                CODE_FREQUENCY: {
                    value: [0, 11, 13, 14, 19, 25, 28, 21, 22, 26]
                },
                SINGLE_CODE_ERROR: {
                    value: .7
                },
                AVG_CODE_ERROR: {
                    value: .48
                },
                FORMAT: {
                    value: "ean_13",
                    writeable: !1
                }
            };
        r.prototype = Object.create(u.a.prototype, s), r.prototype.constructor = r, r.prototype._decodeCode = function (t, e) {
            var n, r, o, i = [0, 0, 0, 0],
                a = this,
                u = t,
                c = !a._row[u],
                s = 0,
                f = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: t,
                    end: t
                };
            for (e || (e = a.CODE_PATTERN.length), n = u; n < a._row.length; n++)
                if (a._row[n] ^ c) i[s]++;
                else {
                    if (s === i.length - 1) {
                        for (r = 0; r < e; r++)(o = a._matchPattern(i, a.CODE_PATTERN[r])) < f.error && (f.code = r, f.error = o);
                        return f.end = n, f.error > a.AVG_CODE_ERROR ? null : f
                    }
                    s++, i[s] = 1, c = !c
                } return null
        }, r.prototype._findPattern = function (t, e, n, r, o) {
            var i, a, u, c, s = [],
                f = this,
                l = 0,
                d = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: 0,
                    end: 0
                };
            for (e || (e = f._nextSet(f._row)), void 0 === n && (n = !1), void 0 === r && (r = !0), void 0 === o && (o = f.AVG_CODE_ERROR), i = 0; i < t.length; i++) s[i] = 0;
            for (i = e; i < f._row.length; i++)
                if (f._row[i] ^ n) s[l]++;
                else {
                    if (l === s.length - 1) {
                        for (c = 0, u = 0; u < s.length; u++) c += s[u];
                        if ((a = f._matchPattern(s, t)) < o) return d.error = a, d.start = i - c, d.end = i, d;
                        if (!r) return null;
                        for (u = 0; u < s.length - 2; u++) s[u] = s[u + 2];
                        s[s.length - 2] = 0, s[s.length - 1] = 0, l--
                    } else l++;
                    s[l] = 1, n = !n
                } return null
        }, r.prototype._findStart = function () {
            for (var t, e, n = this, r = n._nextSet(n._row); !e;) {
                if (!(e = n._findPattern(n.START_PATTERN, r))) return null;
                if ((t = e.start - (e.end - e.start)) >= 0 && n._matchRange(t, e.start, 0)) return e;
                r = e.end, e = null
            }
        }, r.prototype._verifyTrailingWhitespace = function (t) {
            var e, n = this;
            return e = t.end + (t.end - t.start), e < n._row.length && n._matchRange(t.end, e, 0) ? t : null
        }, r.prototype._findEnd = function (t, e) {
            var n = this,
                r = n._findPattern(n.STOP_PATTERN, t, e, !1);
            return null !== r ? n._verifyTrailingWhitespace(r) : null
        }, r.prototype._calculateFirstDigit = function (t) {
            var e, n = this;
            for (e = 0; e < n.CODE_FREQUENCY.length; e++)
                if (t === n.CODE_FREQUENCY[e]) return e;
            return null
        }, r.prototype._decodePayload = function (t, e, n) {
            var r, o, i = this,
                a = 0;
            for (r = 0; r < 6; r++) {
                if (!(t = i._decodeCode(t.end))) return null;
                t.code >= i.CODE_G_START ? (t.code = t.code - i.CODE_G_START, a |= 1 << 5 - r) : a |= 0 << 5 - r, e.push(t.code), n.push(t)
            }
            if (null === (o = i._calculateFirstDigit(a))) return null;
            if (e.unshift(o), null === (t = i._findPattern(i.MIDDLE_PATTERN, t.end, !0, !1))) return null;
            for (n.push(t), r = 0; r < 6; r++) {
                if (!(t = i._decodeCode(t.end, i.CODE_G_START))) return null;
                n.push(t), e.push(t.code)
            }
            return t
        }, r.prototype._decode = function () {
            var t, e, n = this,
                r = [],
                o = [],
                i = {};
            if (!(t = n._findStart())) return null;
            if (e = {
                    code: t.code,
                    start: t.start,
                    end: t.end
                }, o.push(e), !(e = n._decodePayload(e, r, o))) return null;
            if (!(e = n._findEnd(e.end, !1))) return null;
            if (o.push(e), !n._checksum(r)) return null;
            if (this.supplements.length > 0) {
                var a = this._decodeExtensions(e.end);
                if (!a) return null;
                var u = a.decodedCodes[a.decodedCodes.length - 1],
                    s = {
                        start: u.start + ((u.end - u.start) / 2 | 0),
                        end: u.end
                    };
                if (!n._verifyTrailingWhitespace(s)) return null;
                i = {
                    supplement: a,
                    code: r.join("") + a.code
                }
            }
            return c({
                code: r.join(""),
                start: t.start,
                end: e.end,
                codeset: "",
                startInfo: t,
                decodedCodes: o
            }, i)
        }, r.prototype._decodeExtensions = function (t) {
            var e, n, r = this._nextSet(this._row, t),
                o = this._findPattern(this.EXTENSION_START_PATTERN, r, !1, !1);
            if (null === o) return null;
            for (e = 0; e < this.supplements.length; e++)
                if (null !== (n = this.supplements[e].decode(this._row, o.end))) return {
                    code: n.code,
                    start: r,
                    startInfo: o,
                    end: n.end,
                    codeset: "",
                    decodedCodes: n.decodedCodes
                };
            return null
        }, r.prototype._checksum = function (t) {
            var e, n = 0;
            for (e = t.length - 2; e >= 0; e -= 2) n += t[e];
            for (n *= 3, e = t.length - 1; e >= 0; e -= 2) n += t[e];
            return n % 10 == 0
        }, r.CONFIG_KEYS = {
            supplements: {
                type: "arrayOf(string)",
                default: [],
                description: "Allowed extensions to be decoded (2 and/or 5)"
            }
        }, e.a = r
    }, function (t, e, n) {
        var r = n(38),
            o = "object" == typeof self && self && self.Object === Object && self,
            i = r || o || Function("return this")();
        t.exports = i
    }, function (t, e) {
        function n(t) {
            return null != t && "object" == typeof t
        }
        t.exports = n
    }, function (t, e) {
        function n(t) {
            var e = new Float32Array(2);
            return e[0] = t[0], e[1] = t[1], e
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            return null == t ? void 0 === t ? c : u : s && s in Object(t) ? i(t) : a(t)
        }
        var o = n(11),
            i = n(119),
            a = n(146),
            u = "[object Null]",
            c = "[object Undefined]",
            s = o ? o.toStringTag : void 0;
        t.exports = r
    }, function (t, e, n) {
        "use strict";
        e.a = {
            drawRect: function (t, e, n, r) {
                n.strokeStyle = r.color, n.fillStyle = r.color, n.lineWidth = 1, n.beginPath(), n.strokeRect(t.x, t.y, e.x, e.y)
            },
            drawPath: function (t, e, n, r) {
                n.strokeStyle = r.color, n.fillStyle = r.color, n.lineWidth = r.lineWidth, n.beginPath(), n.moveTo(t[0][e.x], t[0][e.y]);
                for (var o = 1; o < t.length; o++) n.lineTo(t[o][e.x], t[o][e.y]);
                n.closePath(), n.stroke()
            },
            drawImage: function (t, e, n) {
                var r, o = n.getImageData(0, 0, e.x, e.y),
                    i = o.data,
                    a = t.length,
                    u = i.length;
                if (u / a != 4) return !1;
                for (; a--;) r = t[a], i[--u] = 255, i[--u] = r, i[--u] = r, i[--u] = r;
                return n.putImageData(o, 0, 0), !0
            }
        }
    }, function (t, e, n) {
        function r(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var r = t[e];
                this.set(r[0], r[1])
            }
        }
        var o = n(133),
            i = n(134),
            a = n(135),
            u = n(136),
            c = n(137);
        r.prototype.clear = o, r.prototype.delete = i, r.prototype.get = a, r.prototype.has = u, r.prototype.set = c, t.exports = r
    }, function (t, e, n) {
        var r = n(5),
            o = r.Symbol;
        t.exports = o
    }, function (t, e, n) {
        function r(t, e) {
            for (var n = t.length; n--;)
                if (o(t[n][0], e)) return n;
            return -1
        }
        var o = n(17);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            return o(t) ? t : i(t, e) ? [t] : a(u(t))
        }
        var o = n(2),
            i = n(130),
            a = n(154),
            u = n(165);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            var n = t.__data__;
            return o(e) ? n["string" == typeof e ? "string" : "hash"] : n.map
        }
        var o = n(131);
        t.exports = r
    }, function (t, e) {
        function n(t, e) {
            return !!(e = null == e ? r : e) && ("number" == typeof t || o.test(t)) && t > -1 && t % 1 == 0 && t < e
        }
        var r = 9007199254740991,
            o = /^(?:0|[1-9]\d*)$/;
        t.exports = n
    }, function (t, e, n) {
        var r = n(22),
            o = r(Object, "create");
        t.exports = o
    }, function (t, e) {
        function n(t, e) {
            return t === e || t !== t && e !== e
        }
        t.exports = n
    }, function (t, e, n) {
        var r = n(96),
            o = n(6),
            i = Object.prototype,
            a = i.hasOwnProperty,
            u = i.propertyIsEnumerable,
            c = r(function () {
                return arguments
            }()) ? r : function (t) {
                return o(t) && a.call(t, "callee") && !u.call(t, "callee")
            };
        t.exports = c
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            return {
                x: t,
                y: e,
                toVec2: function () {
                    return b.clone([this.x, this.y])
                },
                toVec3: function () {
                    return E.clone([this.x, this.y, 1])
                },
                round: function () {
                    return this.x = this.x > 0 ? Math.floor(this.x + .5) : Math.floor(this.x - .5), this.y = this.y > 0 ? Math.floor(this.y + .5) : Math.floor(this.y - .5), this
                }
            }
        }

        function o(t, e, n) {
            n || (n = t);
            for (var r = t.data, o = r.length, i = n.data; o--;) i[o] = r[o] < e ? 1 : 0
        }

        function i(t, e) {
            e || (e = 8);
            for (var n = t.data, r = n.length, o = 8 - e, i = 1 << e, a = new Int32Array(i); r--;) a[n[r] >> o]++;
            return a
        }

        function a(t, e) {
            function n(t, e) {
                var n, r = 0;
                for (n = t; n <= e; n++) r += a[n];
                return r
            }

            function r(t, e) {
                var n, r = 0;
                for (n = t; n <= e; n++) r += n * a[n];
                return r
            }

            function o() {
                var o, u, c, s, f, l, d, h = [0],
                    p = (1 << e) - 1;
                for (a = i(t, e), s = 1; s < p; s++) o = n(0, s), u = n(s + 1, p), c = o * u, 0 === c && (c = 1), f = r(0, s) * u, l = r(s + 1, p) * o, d = f - l, h[s] = d * d / c;
                return x.a.maxIndex(h)
            }
            e || (e = 8);
            var a, u = 8 - e;
            return o() << u
        }

        function u(t, e) {
            var n = a(t);
            return o(t, n, e), n
        }

        function c(t, e, n) {
            function r(t) {
                var e = !1;
                for (i = 0; i < c.length; i++) a = c[i], a.fits(t) && (a.add(t), e = !0);
                return e
            }
            var o, i, a, u, c = [];
            for (n || (n = "rad"), o = 0; o < t.length; o++) u = m.a.createPoint(t[o], o, n), r(u) || c.push(m.a.create(u, e));
            return c
        }

        function s(t, e, n) {
            var r, o, i, a, u = 0,
                c = 0,
                s = [];
            for (r = 0; r < e; r++) s[r] = {
                score: 0,
                item: null
            };
            for (r = 0; r < t.length; r++)
                if ((o = n.apply(this, [t[r]])) > c)
                    for (i = s[u], i.score = o, i.item = t[r], c = Number.MAX_VALUE, a = 0; a < e; a++) s[a].score < c && (c = s[a].score, u = a);
            return s
        }

        function f(t, e, n) {
            for (var r, o = 0, i = e.x, a = Math.floor(t.length / 4), u = e.x / 2, c = 0, s = e.x; i < a;) {
                for (r = 0; r < u; r++) n[c] = (.299 * t[4 * o + 0] + .587 * t[4 * o + 1] + .114 * t[4 * o + 2] + (.299 * t[4 * (o + 1) + 0] + .587 * t[4 * (o + 1) + 1] + .114 * t[4 * (o + 1) + 2]) + (.299 * t[4 * i + 0] + .587 * t[4 * i + 1] + .114 * t[4 * i + 2]) + (.299 * t[4 * (i + 1) + 0] + .587 * t[4 * (i + 1) + 1] + .114 * t[4 * (i + 1) + 2])) / 4, c++, o += 2, i += 2;
                o += s, i += s
            }
        }

        function l(t, e, n) {
            var r, o = t.length / 4 | 0;
            if (n && n.singleChannel === !0)
                for (r = 0; r < o; r++) e[r] = t[4 * r + 0];
            else
                for (r = 0; r < o; r++) e[r] = .299 * t[4 * r + 0] + .587 * t[4 * r + 1] + .114 * t[4 * r + 2]
        }

        function d(t, e) {
            for (var n = t.data, r = t.size.x, o = e.data, i = 0, a = r, u = n.length, c = r / 2, s = 0; a < u;) {
                for (var f = 0; f < c; f++) o[s] = Math.floor((n[i] + n[i + 1] + n[a] + n[a + 1]) / 4), s++, i += 2, a += 2;
                i += r, a += r
            }
        }

        function h(t, e) {
            var n = t[0],
                r = t[1],
                o = t[2],
                i = o * r,
                a = i * (1 - Math.abs(n / 60 % 2 - 1)),
                u = o - i,
                c = 0,
                s = 0,
                f = 0;
            return e = e || [0, 0, 0], n < 60 ? (c = i, s = a) : n < 120 ? (c = a, s = i) : n < 180 ? (s = i, f = a) : n < 240 ? (s = a, f = i) : n < 300 ? (c = a, f = i) : n < 360 && (c = i, f = a), e[0] = 255 * (c + u) | 0, e[1] = 255 * (s + u) | 0, e[2] = 255 * (f + u) | 0, e
        }

        function p(t) {
            var e, n = [],
                r = [];
            for (e = 1; e < Math.sqrt(t) + 1; e++) t % e == 0 && (r.push(e), e !== t / e && n.unshift(Math.floor(t / e)));
            return r.concat(n)
        }

        function v(t, e) {
            for (var n = 0, r = 0, o = []; n < t.length && r < e.length;) t[n] === e[r] ? (o.push(t[n]), n++, r++) : t[n] > e[r] ? r++ : n++;
            return o
        }

        function _(t, e) {
            function n(t) {
                for (var e = 0, n = t[Math.floor(t.length / 2)]; e < t.length - 1 && t[e] < d;) e++;
                return e > 0 && (n = Math.abs(t[e] - d) > Math.abs(t[e - 1] - d) ? t[e - 1] : t[e]), d / n < c[f + 1] / c[f] && d / n > c[f - 1] / c[f] ? {
                    x: n,
                    y: n
                } : null
            }
            var r, o = p(e.x),
                i = p(e.y),
                a = Math.max(e.x, e.y),
                u = v(o, i),
                c = [8, 10, 15, 20, 32, 60, 80],
                s = {
                    "x-small": 5,
                    small: 4,
                    medium: 3,
                    large: 2,
                    "x-large": 1
                },
                f = s[t] || s.medium,
                l = c[f],
                d = Math.floor(a / l);
            return r = n(u), r || (r = n(p(a))) || (r = n(p(d * l))), r
        }

        function g(t) {
            return {
                value: parseFloat(t),
                unit: (t.indexOf("%"), t.length, "%")
            }
        }

        function y(t, e, n) {
            var r = {
                    width: t,
                    height: e
                },
                o = Object.keys(n).reduce(function (t, e) {
                    var o = n[e],
                        i = g(o),
                        a = C[e](i, r);
                    return t[e] = a, t
                }, {});
            return {
                sx: o.left,
                sy: o.top,
                sw: o.right - o.left,
                sh: o.bottom - o.top
            }
        }
        var m = n(50),
            x = n(3);
        e.b = r, e.f = u, e.g = c, e.h = s, e.c = f, e.d = l, e.i = d, e.a = h, e.e = _, e.j = y;
        var b = {
                clone: n(7)
            },
            E = {
                clone: n(83)
            },
            C = {
                top: function (t, e) {
                    if ("%" === t.unit) return Math.floor(e.height * (t.value / 100))
                },
                right: function (t, e) {
                    if ("%" === t.unit) return Math.floor(e.width - e.width * (t.value / 100))
                },
                bottom: function (t, e) {
                    if ("%" === t.unit) return Math.floor(e.height - e.height * (t.value / 100))
                },
                left: function (t, e) {
                    if ("%" === t.unit) return Math.floor(e.width * (t.value / 100))
                }
            }
    }, function (t, e, n) {
        "use strict";

        function r(t, e, n, r) {
            e ? this.data = e : n ? (this.data = new n(t.x * t.y), n === Array && r && a.a.init(this.data, 0)) : (this.data = new Uint8Array(t.x * t.y), Uint8Array === Array && r && a.a.init(this.data, 0)), this.size = t
        }
        var o = n(53),
            i = n(19),
            a = n(3),
            u = {
                clone: n(7)
            };
        r.prototype.inImageWithBorder = function (t, e) {
            return t.x >= e && t.y >= e && t.x < this.size.x - e && t.y < this.size.y - e
        }, r.sample = function (t, e, n) {
            var r = Math.floor(e),
                o = Math.floor(n),
                i = t.size.x,
                a = o * t.size.x + r,
                u = t.data[a + 0],
                c = t.data[a + 1],
                s = t.data[a + i],
                f = t.data[a + i + 1],
                l = u - c;
            return e -= r, n -= o, Math.floor(e * (n * (l - s + f) - l) + n * (s - u) + u)
        }, r.clearArray = function (t) {
            for (var e = t.length; e--;) t[e] = 0
        }, r.prototype.subImage = function (t, e) {
            return new o.a(t, e, this)
        }, r.prototype.subImageAsCopy = function (t, e) {
            var n, r, o = t.size.y,
                i = t.size.x;
            for (n = 0; n < i; n++)
                for (r = 0; r < o; r++) t.data[r * i + n] = this.data[(e.y + r) * this.size.x + e.x + n]
        }, r.prototype.copyTo = function (t) {
            for (var e = this.data.length, n = this.data, r = t.data; e--;) r[e] = n[e]
        }, r.prototype.get = function (t, e) {
            return this.data[e * this.size.x + t]
        }, r.prototype.getSafe = function (t, e) {
            var n;
            if (!this.indexMapping) {
                for (this.indexMapping = {
                        x: [],
                        y: []
                    }, n = 0; n < this.size.x; n++) this.indexMapping.x[n] = n, this.indexMapping.x[n + this.size.x] = n;
                for (n = 0; n < this.size.y; n++) this.indexMapping.y[n] = n, this.indexMapping.y[n + this.size.y] = n
            }
            return this.data[this.indexMapping.y[e + this.size.y] * this.size.x + this.indexMapping.x[t + this.size.x]]
        }, r.prototype.set = function (t, e, n) {
            return this.data[e * this.size.x + t] = n, this
        }, r.prototype.zeroBorder = function () {
            var t, e = this.size.x,
                n = this.size.y,
                r = this.data;
            for (t = 0; t < e; t++) r[t] = r[(n - 1) * e + t] = 0;
            for (t = 1; t < n - 1; t++) r[t * e] = r[t * e + (e - 1)] = 0
        }, r.prototype.invert = function () {
            for (var t = this.data, e = t.length; e--;) t[e] = t[e] ? 0 : 1
        }, r.prototype.convolve = function (t) {
            var e, n, r, o, i = t.length / 2 | 0,
                a = 0;
            for (n = 0; n < this.size.y; n++)
                for (e = 0; e < this.size.x; e++) {
                    for (a = 0, o = -i; o <= i; o++)
                        for (r = -i; r <= i; r++) a += t[o + i][r + i] * this.getSafe(e + r, n + o);
                    this.data[n * this.size.x + e] = a
                }
        }, r.prototype.moments = function (t) {
            var e, n, r, o, i, a, c, s, f, l, d, h, p = this.data,
                v = this.size.y,
                _ = this.size.x,
                g = [],
                y = [],
                m = Math.PI,
                x = m / 4;
            if (t <= 0) return y;
            for (i = 0; i < t; i++) g[i] = {
                m00: 0,
                m01: 0,
                m10: 0,
                m11: 0,
                m02: 0,
                m20: 0,
                theta: 0,
                rad: 0
            };
            for (n = 0; n < v; n++)
                for (o = n * n, e = 0; e < _; e++)(r = p[n * _ + e]) > 0 && (a = g[r - 1], a.m00 += 1, a.m01 += n, a.m10 += e, a.m11 += e * n, a.m02 += o, a.m20 += e * e);
            for (i = 0; i < t; i++) a = g[i], isNaN(a.m00) || 0 === a.m00 || (l = a.m10 / a.m00, d = a.m01 / a.m00, c = a.m11 / a.m00 - l * d, s = a.m02 / a.m00 - d * d, f = a.m20 / a.m00 - l * l, h = (s - f) / (2 * c), h = .5 * Math.atan(h) + (c >= 0 ? x : -x) + m, a.theta = (180 * h / m + 90) % 180 - 90, a.theta < 0 && (a.theta += 180), a.rad = h > m ? h - m : h, a.vec = u.clone([Math.cos(h), Math.sin(h)]), y.push(a));
            return y
        }, r.prototype.show = function (t, e) {
            var n, r, o, i, a, u, c;
            for (e || (e = 1), n = t.getContext("2d"), t.width = this.size.x, t.height = this.size.y, r = n.getImageData(0, 0, t.width, t.height), o = r.data, i = 0, c = 0; c < this.size.y; c++)
                for (u = 0; u < this.size.x; u++) a = c * this.size.x + u, i = this.get(u, c) * e, o[4 * a + 0] = i, o[4 * a + 1] = i, o[4 * a + 2] = i, o[4 * a + 3] = 255;
            n.putImageData(r, 0, 0)
        }, r.prototype.overlay = function (t, e, r) {
            (!e || e < 0 || e > 360) && (e = 360);
            for (var o = [0, 1, 1], a = [0, 0, 0], u = [255, 255, 255], c = [0, 0, 0], s = [], f = t.getContext("2d"), l = f.getImageData(r.x, r.y, this.size.x, this.size.y), d = l.data, h = this.data.length; h--;) o[0] = this.data[h] * e, s = o[0] <= 0 ? u : o[0] >= 360 ? c : n.i(i.a)(o, a), d[4 * h + 0] = s[0], d[4 * h + 1] = s[1], d[4 * h + 2] = s[2], d[4 * h + 3] = 255;
            f.putImageData(l, r.x, r.y)
        }, e.a = r
    }, function (t, e, n) {
        function r(t, e, n) {
            "__proto__" == e && o ? o(t, e, {
                configurable: !0,
                enumerable: !0,
                value: n,
                writable: !0
            }) : t[e] = n
        }
        var o = n(37);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            var n = i(t, e);
            return o(n) ? n : void 0
        }
        var o = n(97),
            i = n(120);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            if ("string" == typeof t || o(t)) return t;
            var e = t + "";
            return "0" == e && 1 / t == -i ? "-0" : e
        }
        var o = n(27),
            i = 1 / 0;
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return null != t && i(t.length) && !o(t)
        }
        var o = n(25),
            i = n(26);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            if (!i(t)) return !1;
            var e = o(t);
            return e == u || e == c || e == a || e == s
        }
        var o = n(8),
            i = n(0),
            a = "[object AsyncFunction]",
            u = "[object Function]",
            c = "[object GeneratorFunction]",
            s = "[object Proxy]";
        t.exports = r
    }, function (t, e) {
        function n(t) {
            return "number" == typeof t && t > -1 && t % 1 == 0 && t <= r
        }
        var r = 9007199254740991;
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            return "symbol" == typeof t || i(t) && o(t) == a
        }
        var o = n(8),
            i = n(6),
            a = "[object Symbol]";
        t.exports = r
    }, function (t, e, n) {
        var r = n(100),
            o = n(116),
            i = o(function (t, e, n) {
                r(t, e, n)
            });
        t.exports = i
    }, function (t, e) {
        t.exports = function (t) {
            return t.webpackPolyfill || (t.deprecate = function () {}, t.paths = [], t.children || (t.children = []), Object.defineProperty(t, "loaded", {
                enumerable: !0,
                get: function () {
                    return t.l
                }
            }), Object.defineProperty(t, "id", {
                enumerable: !0,
                get: function () {
                    return t.i
                }
            }), t.webpackPolyfill = 1), t
        }
    }, function (t, e, n) {
        "use strict";
        var r = {
            searchDirections: [
                [0, 1],
                [1, 1],
                [1, 0],
                [1, -1],
                [0, -1],
                [-1, -1],
                [-1, 0],
                [-1, 1]
            ],
            create: function (t, e) {
                function n(t, e, n, r) {
                    var o, f, l;
                    for (o = 0; o < 7; o++) {
                        if (f = t.cy + c[t.dir][0], l = t.cx + c[t.dir][1], i = f * s + l, a[i] === e && (0 === u[i] || u[i] === n)) return u[i] = n, t.cy = f, t.cx = l, !0;
                        0 === u[i] && (u[i] = r), t.dir = (t.dir + 1) % 8
                    }
                    return !1
                }

                function r(t, e, n) {
                    return {
                        dir: n,
                        x: t,
                        y: e,
                        next: null,
                        prev: null
                    }
                }

                function o(t, e, o, i, a) {
                    var u, c, s, f = null,
                        l = {
                            cx: e,
                            cy: t,
                            dir: 0
                        };
                    if (n(l, i, o, a)) {
                        f = r(e, t, l.dir), u = f, s = l.dir, c = r(l.cx, l.cy, 0), c.prev = u, u.next = c, c.next = null, u = c;
                        do l.dir = (l.dir + 6) % 8, n(l, i, o, a), s !== l.dir ? (u.dir = l.dir, c = r(l.cx, l.cy, 0), c.prev = u, u.next = c, c.next = null, u = c) : (u.dir = s, u.x = l.cx, u.y = l.cy), s = l.dir; while (l.cx !== e || l.cy !== t);
                        f.prev = u.prev, u.prev.next = f
                    }
                    return f
                }
                var i, a = t.data,
                    u = e.data,
                    c = this.searchDirections,
                    s = t.size.x;
                return {
                    trace: function (t, e, r, o) {
                        return n(t, e, r, o)
                    },
                    contourTracing: function (t, e, n, r, i) {
                        return o(t, e, n, r, i)
                    }
                }
            }
        };
        e.a = r
    }, function (t, e, n) {
        "use strict";

        function r() {
            o.a.call(this)
        }
        var o = n(1),
            i = n(3),
            a = {
                ALPHABETH_STRING: {
                    value: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. *$/+%"
                },
                ALPHABET: {
                    value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 45, 46, 32, 42, 36, 47, 43, 37]
                },
                CHARACTER_ENCODINGS: {
                    value: [52, 289, 97, 352, 49, 304, 112, 37, 292, 100, 265, 73, 328, 25, 280, 88, 13, 268, 76, 28, 259, 67, 322, 19, 274, 82, 7, 262, 70, 22, 385, 193, 448, 145, 400, 208, 133, 388, 196, 148, 168, 162, 138, 42]
                },
                ASTERISK: {
                    value: 148
                },
                FORMAT: {
                    value: "code_39",
                    writeable: !1
                }
            };
        r.prototype = Object.create(o.a.prototype, a), r.prototype.constructor = r, r.prototype._decode = function () {
            var t, e, n, r, o = this,
                a = [0, 0, 0, 0, 0, 0, 0, 0, 0],
                u = [],
                c = o._findStart();
            if (!c) return null;
            r = o._nextSet(o._row, c.end);
            do {
                if (a = o._toCounters(r, a), (n = o._toPattern(a)) < 0) return null;
                if ((t = o._patternToChar(n)) < 0) return null;
                u.push(t), e = r, r += i.a.sum(a), r = o._nextSet(o._row, r)
            } while ("*" !== t);
            return u.pop(), u.length && o._verifyTrailingWhitespace(e, r, a) ? {
                code: u.join(""),
                start: c.start,
                end: r,
                startInfo: c,
                decodedCodes: u
            } : null
        }, r.prototype._verifyTrailingWhitespace = function (t, e, n) {
            var r = i.a.sum(n);
            return 3 * (e - t - r) >= r
        }, r.prototype._patternToChar = function (t) {
            var e, n = this;
            for (e = 0; e < n.CHARACTER_ENCODINGS.length; e++)
                if (n.CHARACTER_ENCODINGS[e] === t) return String.fromCharCode(n.ALPHABET[e]);
            return -1
        }, r.prototype._findNextWidth = function (t, e) {
            var n, r = Number.MAX_VALUE;
            for (n = 0; n < t.length; n++) t[n] < r && t[n] > e && (r = t[n]);
            return r
        }, r.prototype._toPattern = function (t) {
            for (var e, n, r = t.length, o = 0, i = r, a = 0, u = this; i > 3;) {
                for (o = u._findNextWidth(t, o), i = 0, e = 0, n = 0; n < r; n++) t[n] > o && (e |= 1 << r - 1 - n, i++, a += t[n]);
                if (3 === i) {
                    for (n = 0; n < r && i > 0; n++)
                        if (t[n] > o && (i--, 2 * t[n] >= a)) return -1;
                    return e
                }
            }
            return -1
        }, r.prototype._findStart = function () {
            var t, e, n, r = this,
                o = r._nextSet(r._row),
                i = o,
                a = [0, 0, 0, 0, 0, 0, 0, 0, 0],
                u = 0,
                c = !1;
            for (t = o; t < r._row.length; t++)
                if (r._row[t] ^ c) a[u]++;
                else {
                    if (u === a.length - 1) {
                        if (r._toPattern(a) === r.ASTERISK && (n = Math.floor(Math.max(0, i - (t - i) / 4)), r._matchRange(n, i, 0))) return {
                            start: i,
                            end: t
                        };
                        for (i += a[0] + a[1], e = 0; e < 7; e++) a[e] = a[e + 2];
                        a[7] = 0, a[8] = 0, u--
                    } else u++;
                    a[u] = 1, c = !c
                } return null
        }, e.a = r
    }, function (t, e) {
        function n(t, e) {
            return t[0] * e[0] + t[1] * e[1]
        }
        t.exports = n
    }, function (t, e, n) {
        var r = n(22),
            o = n(5),
            i = r(o, "Map");
        t.exports = i
    }, function (t, e, n) {
        function r(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var r = t[e];
                this.set(r[0], r[1])
            }
        }
        var o = n(138),
            i = n(139),
            a = n(140),
            u = n(141),
            c = n(142);
        r.prototype.clear = o, r.prototype.delete = i, r.prototype.get = a, r.prototype.has = u, r.prototype.set = c, t.exports = r
    }, function (t, e, n) {
        function r(t, e, n) {
            (void 0 === n || i(t[e], n)) && (void 0 !== n || e in t) || o(t, e, n)
        }
        var o = n(21),
            i = n(17);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e, n) {
            var r = t[e];
            u.call(t, e) && i(r, n) && (void 0 !== n || e in t) || o(t, e, n)
        }
        var o = n(21),
            i = n(17),
            a = Object.prototype,
            u = a.hasOwnProperty;
        t.exports = r
    }, function (t, e, n) {
        var r = n(22),
            o = function () {
                try {
                    var t = r(Object, "defineProperty");
                    return t({}, "", {}), t
                } catch (t) {}
            }();
        t.exports = o
    }, function (t, e, n) {
        (function (e) {
            var n = "object" == typeof e && e && e.Object === Object && e;
            t.exports = n
        }).call(e, n(47))
    }, function (t, e, n) {
        var r = n(147),
            o = r(Object.getPrototypeOf, Object);
        t.exports = o
    }, function (t, e) {
        function n(t) {
            var e = t && t.constructor;
            return t === ("function" == typeof e && e.prototype || r)
        }
        var r = Object.prototype;
        t.exports = n
    }, function (t, e, n) {
        function r(t, e, n) {
            return e = i(void 0 === e ? t.length - 1 : e, 0),
                function () {
                    for (var r = arguments, a = -1, u = i(r.length - e, 0), c = Array(u); ++a < u;) c[a] = r[e + a];
                    a = -1;
                    for (var s = Array(e + 1); ++a < e;) s[a] = r[a];
                    return s[e] = n(c), o(t, this, s)
                }
        }
        var o = n(87),
            i = Math.max;
        t.exports = r
    }, function (t, e, n) {
        var r = n(106),
            o = n(148),
            i = o(r);
        t.exports = i
    }, function (t, e) {
        function n(t) {
            return t
        }
        t.exports = n
    }, function (t, e, n) {
        (function (t) {
            var r = n(5),
                o = n(163),
                i = "object" == typeof e && e && !e.nodeType && e,
                a = i && "object" == typeof t && t && !t.nodeType && t,
                u = a && a.exports === i,
                c = u ? r.Buffer : void 0,
                s = c ? c.isBuffer : void 0,
                f = s || o;
            t.exports = f
        }).call(e, n(29)(t))
    }, function (t, e, n) {
        var r = n(98),
            o = n(109),
            i = n(145),
            a = i && i.isTypedArray,
            u = a ? o(a) : r;
        t.exports = u
    }, function (t, e, n) {
        function r(t) {
            return a(t) ? o(t, !0) : i(t)
        }
        var o = n(88),
            i = n(99),
            a = n(24);
        t.exports = r
    }, function (t, e) {
        var n;
        n = function () {
            return this
        }();
        try {
            n = n || Function("return this")() || (0, eval)("this")
        } catch (t) {
            "object" == typeof window && (n = window)
        }
        t.exports = n
    }, function (e, n, r) {
        "use strict";

        function o(t) {
            f(t), P = k.a.create($.decoder, S)
        }

        function i(t) {
            var e;
            if ("VideoStream" === $.inputStream.type) e = document.createElement("video"), A = H.a.createVideoStream(e);
            else if ("ImageStream" === $.inputStream.type) A = H.a.createImageStream();
            else if ("LiveStream" === $.inputStream.type) {
                var n = a();
                n && ((e = n.querySelector("video")) || (e = document.createElement("video"), n.appendChild(e))), A = H.a.createLiveStream(e), F.a.request(e, $.inputStream.constraints).then(function () {
                    A.trigger("canrecord")
                }).catch(function (e) {
                    return t(e)
                })
            }
            A.setAttribute("preload", "auto"), A.setInputStream($.inputStream), A.addEventListener("canrecord", u.bind(void 0, t))
        }

        function a() {
            var t = $.inputStream.target;
            if (t && t.nodeName && 1 === t.nodeType) return t;
            var e = "string" == typeof t ? t : "#interactive.viewport";
            return document.querySelector(e)
        }

        function u(t) {
            U.a.checkImageConstraints(A, $.locator), s($), w = V.a.create(A, K.dom.image), R($.numOfWorkers, function () {
                0 === $.numOfWorkers && o(), c(t)
            })
        }

        function c(t) {
            A.play(), t()
        }

        function s() {
            if ("undefined" != typeof document) {
                var t = a();
                if (K.dom.image = document.querySelector("canvas.imgBuffer"), K.dom.image || (K.dom.image = document.createElement("canvas"), K.dom.image.className = "imgBuffer", t && "ImageStream" === $.inputStream.type && t.appendChild(K.dom.image)), K.ctx.image = K.dom.image.getContext("2d"), K.dom.image.width = A.getCanvasSize().x, K.dom.image.height = A.getCanvasSize().y, K.dom.overlay = document.querySelector("canvas.drawingBuffer"), !K.dom.overlay) {
                    K.dom.overlay = document.createElement("canvas"), K.dom.overlay.className = "drawingBuffer", t && t.appendChild(K.dom.overlay);
                    var e = document.createElement("br");
                    e.setAttribute("clear", "all"), t && t.appendChild(e)
                }
                K.ctx.overlay = K.dom.overlay.getContext("2d"), K.dom.overlay.width = A.getCanvasSize().x, K.dom.overlay.height = A.getCanvasSize().y
            }
        }

        function f(t) {
            S = t ? t : new j.a({
                x: A.getWidth(),
                y: A.getHeight()
            }), D = [q.clone([0, 0]), q.clone([0, S.size.y]), q.clone([S.size.x, S.size.y]), q.clone([S.size.x, 0])], U.a.init(S, $.locator)
        }

        function l() {
            return $.locate ? U.a.locate() : [
                [q.clone(D[0]), q.clone(D[1]), q.clone(D[2]), q.clone(D[3])]
            ]
        }

        function d(t) {
            function e(t) {
                for (var e = t.length; e--;) t[e][0] += i, t[e][1] += a
            }

            function n(t) {
                t[0].x += i, t[0].y += a, t[1].x += i, t[1].y += a
            }
            var r, o = A.getTopRight(),
                i = o.x,
                a = o.y;
            if (0 !== i || 0 !== a) {
                if (t.barcodes)
                    for (r = 0; r < t.barcodes.length; r++) d(t.barcodes[r]);
                if (t.line && 2 === t.line.length && n(t.line), t.box && e(t.box), t.boxes && t.boxes.length > 0)
                    for (r = 0; r < t.boxes.length; r++) e(t.boxes[r])
            }
        }

        function h(t, e) {
            e && I && (t.barcodes ? t.barcodes.filter(function (t) {
                return t.codeResult
            }).forEach(function (t) {
                return h(t, e)
            }) : t.codeResult && I.addResult(e, A.getCanvasSize(), t.codeResult))
        }

        function p(t) {
            return t && (t.barcodes ? t.barcodes.some(function (t) {
                return t.codeResult
            }) : t.codeResult)
        }

        function v(t, e) {
            var n = t;
            t && Q && (d(t), h(t, e), n = t.barcodes || t), L.a.publish("processed", n), p(t) && L.a.publish("detected", n)
        }

        function _() {
            var t, e;
            e = l(), e ? (t = P.decodeFromBoundingBoxes(e), t = t || {}, t.boxes = e, v(t, S.data)) : v()
        }

        function g() {
            var t;
            if (Q) {
                if (Y.length > 0) {
                    if (!(t = Y.filter(function (t) {
                            return !t.busy
                        })[0])) return;
                    w.attachData(t.imageData)
                } else w.attachData(S.data);
                w.grab() && (t ? (t.busy = !0, t.worker.postMessage({
                    cmd: "process",
                    imageData: t.imageData
                }, [t.imageData.buffer])) : _())
            } else _()
        }

        function y() {
            var t = null,
                e = 1e3 / ($.frequency || 60);
            T = !1,
                function n(r) {
                    t = t || r, T || (r >= t && (t += e, g()), window.requestAnimFrame(n))
                }(performance.now())
        }

        function m() {
            Q && "LiveStream" === $.inputStream.type ? y() : g()
        }

        function x(t) {
            var e, n = {
                worker: void 0,
                imageData: new Uint8Array(A.getWidth() * A.getHeight()),
                busy: !0
            };
            e = C(), n.worker = new Worker(e), n.worker.onmessage = function (r) {
                if ("initialized" === r.data.event) return URL.revokeObjectURL(e), n.busy = !1, n.imageData = new Uint8Array(r.data.imageData), t(n);
                "processed" === r.data.event ? (n.imageData = new Uint8Array(r.data.imageData), n.busy = !1, v(r.data.result, n.imageData)) : r.data.event
            }, n.worker.postMessage({
                cmd: "init",
                size: {
                    x: A.getWidth(),
                    y: A.getHeight()
                },
                imageData: n.imageData,
                config: b($)
            }, [n.imageData.buffer])
        }

        function b(t) {
            return X({}, t, {
                inputStream: X({}, t.inputStream, {
                    target: null
                })
            })
        }

        function E(t) {
            function e(t) {
                self.postMessage({
                    event: "processed",
                    imageData: o.data,
                    result: t
                }, [o.data.buffer])
            }

            function n() {
                self.postMessage({
                    event: "initialized",
                    imageData: o.data
                }, [o.data.buffer])
            }
            if (t) {
                var r = t().default;
                if (!r) return void self.postMessage({
                    event: "error",
                    message: "Quagga could not be created"
                })
            }
            var o;
            self.onmessage = function (t) {
                if ("init" === t.data.cmd) {
                    var i = t.data.config;
                    i.numOfWorkers = 0, o = new r.ImageWrapper({
                        x: t.data.size.x,
                        y: t.data.size.y
                    }, new Uint8Array(t.data.imageData)), r.init(i, n, o), r.onProcessed(e)
                } else "process" === t.data.cmd ? (o.data = new Uint8Array(t.data.imageData), r.start()) : "setReaders" === t.data.cmd && r.setReaders(t.data.readers)
            }
        }

        function C() {
            var e, n;
            return void 0 !== t && (n = t), e = new Blob(["(" + E.toString() + ")(" + n + ");"], {
                type: "text/javascript"
            }), window.URL.createObjectURL(e)
        }

        function O(t) {
            P ? P.setReaders(t) : Q && Y.length > 0 && Y.forEach(function (e) {
                e.worker.postMessage({
                    cmd: "setReaders",
                    readers: t
                })
            })
        }

        function R(t, e) {
            var n = t - Y.length;
            if (0 === n) return e && e();
            if (n < 0) {
                return Y.slice(n).forEach(function (t) {
                    t.worker.terminate()
                }), Y = Y.slice(0, n), e && e()
            }
            for (var r = function (n) {
                    Y.push(n), Y.length >= t && e && e()
                }, o = 0; o < n; o++) x(r)
        }
        Object.defineProperty(n, "__esModule", {
            value: !0
        });
        var A, w, T, S, D, P, I, M = r(28),
            N = r.n(M),
            z = r(54),
            j = (r.n(z), r(20)),
            U = r(64),
            k = r(57),
            L = r(51),
            F = r(59),
            W = r(9),
            B = r(49),
            G = r(55),
            H = r(63),
            V = r(61),
            X = Object.assign || function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r])
                }
                return t
            },
            q = {
                clone: r(7)
            },
            K = {
                ctx: {
                    image: null,
                    overlay: null
                },
                dom: {
                    image: null,
                    overlay: null
                }
            },
            Y = [],
            Q = !0,
            $ = {};
        n.default = {
            init: function (t, e, n) {
                if ($ = N()({}, G.a, t), n) return Q = !1, o(n), e();
                i(e)
            },
            start: function () {
                m()
            },
            stop: function () {
                T = !0, R(0), "LiveStream" === $.inputStream.type && (F.a.release(), A.clearEventHandlers())
            },
            pause: function () {
                T = !0
            },
            onDetected: function (t) {
                L.a.subscribe("detected", t)
            },
            offDetected: function (t) {
                L.a.unsubscribe("detected", t)
            },
            onProcessed: function (t) {
                L.a.subscribe("processed", t)
            },
            offProcessed: function (t) {
                L.a.unsubscribe("processed", t)
            },
            setReaders: function (t) {
                O(t)
            },
            registerResultCollector: function (t) {
                t && "function" == typeof t.addResult && (I = t)
            },
            canvas: K,
            decodeSingle: function (t, e) {
                var n = this;
                t = N()({
                    inputStream: {
                        type: "ImageStream",
                        sequence: !1,
                        size: 800,
                        src: t.src
                    },
                    numOfWorkers: 1,
                    locator: {
                        halfSample: !1
                    }
                }, t), this.init(t, function () {
                    L.a.once("processed", function (t) {
                        n.stop(), e.call(null, t)
                    }, !0), m()
                })
            },
            ImageWrapper: j.a,
            ImageDebug: W.a,
            ResultCollector: B.a,
            CameraAccess: F.a
        }
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            return !!e && e.some(function (e) {
                return Object.keys(e).every(function (n) {
                    return e[n] === t[n]
                })
            })
        }

        function o(t, e) {
            return "function" != typeof e || e(t)
        }
        var i = n(9);
        e.a = {
            create: function (t) {
                function e(e) {
                    return c && e && !r(e, t.blacklist) && o(e, t.filter)
                }
                var n = document.createElement("canvas"),
                    a = n.getContext("2d"),
                    u = [],
                    c = t.capacity || 20,
                    s = t.capture === !0;
                return {
                    addResult: function (t, r, o) {
                        var f = {};
                        e(o) && (c--, f.codeResult = o, s && (n.width = r.x, n.height = r.y, i.a.drawImage(t, r, a), f.frame = n.toDataURL()), u.push(f))
                    },
                    getResults: function () {
                        return u
                    }
                }
            }
        }
    }, function (t, e, n) {
        "use strict";
        var r = {
            clone: n(7),
            dot: n(32)
        };
        e.a = {
            create: function (t, e) {
                function n() {
                    o(t), i()
                }

                function o(t) {
                    c[t.id] = t, a.push(t)
                }

                function i() {
                    var t, e = 0;
                    for (t = 0; t < a.length; t++) e += a[t].rad;
                    u.rad = e / a.length, u.vec = r.clone([Math.cos(u.rad), Math.sin(u.rad)])
                }
                var a = [],
                    u = {
                        rad: 0,
                        vec: r.clone([0, 0])
                    },
                    c = {};
                return n(), {
                    add: function (t) {
                        c[t.id] || (o(t), i())
                    },
                    fits: function (t) {
                        return Math.abs(r.dot(t.point.vec, u.vec)) > e
                    },
                    getPoints: function () {
                        return a
                    },
                    getCenter: function () {
                        return u
                    }
                }
            },
            createPoint: function (t, e, n) {
                return {
                    rad: t[n],
                    point: t,
                    id: e
                }
            }
        }
    }, function (t, e, n) {
        "use strict";
        e.a = function () {
            function t(t) {
                return o[t] || (o[t] = {
                    subscribers: []
                }), o[t]
            }

            function e() {
                o = {}
            }

            function n(t, e) {
                t.async ? setTimeout(function () {
                    t.callback(e)
                }, 4) : t.callback(e)
            }

            function r(e, n, r) {
                var o;
                if ("function" == typeof n) o = {
                    callback: n,
                    async: r
                };
                else if (o = n, !o.callback) throw "Callback was not specified on options";
                t(e).subscribers.push(o)
            }
            var o = {};
            return {
                subscribe: function (t, e, n) {
                    return r(t, e, n)
                },
                publish: function (e, r) {
                    var o = t(e),
                        i = o.subscribers;
                    i.filter(function (t) {
                        return !!t.once
                    }).forEach(function (t) {
                        n(t, r)
                    }), o.subscribers = i.filter(function (t) {
                        return !t.once
                    }), o.subscribers.forEach(function (t) {
                        n(t, r)
                    })
                },
                once: function (t, e, n) {
                    r(t, {
                        callback: e,
                        async: n,
                        once: !0
                    })
                },
                unsubscribe: function (n, r) {
                    var o;
                    n ? (o = t(n), o.subscribers = o && r ? o.subscribers.filter(function (t) {
                        return t.callback !== r
                    }) : []) : e()
                }
            }
        }()
    }, function (t, e, n) {
        "use strict";

        function r() {
            return navigator.mediaDevices && "function" == typeof navigator.mediaDevices.enumerateDevices ? navigator.mediaDevices.enumerateDevices() : Promise.reject(new Error("enumerateDevices is not defined"))
        }

        function o(t) {
            return navigator.mediaDevices && "function" == typeof navigator.mediaDevices.getUserMedia ? navigator.mediaDevices.getUserMedia(t) : Promise.reject(new Error("getUserMedia is not defined"))
        }
        e.b = r, e.a = o
    }, function (t, e, n) {
        "use strict";

        function r(t, e, n) {
            n || (n = {
                data: null,
                size: e
            }), this.data = n.data, this.originalSize = n.size, this.I = n, this.from = t, this.size = e
        }
        r.prototype.show = function (t, e) {
            var n, r, o, i, a, u, c;
            for (e || (e = 1), n = t.getContext("2d"), t.width = this.size.x, t.height = this.size.y, r = n.getImageData(0, 0, t.width, t.height), o = r.data, i = 0, a = 0; a < this.size.y; a++)
                for (u = 0; u < this.size.x; u++) c = a * this.size.x + u, i = this.get(u, a) * e, o[4 * c + 0] = i, o[4 * c + 1] = i, o[4 * c + 2] = i, o[4 * c + 3] = 255;
            r.data = o, n.putImageData(r, 0, 0)
        }, r.prototype.get = function (t, e) {
            return this.data[(this.from.y + e) * this.originalSize.x + this.from.x + t]
        }, r.prototype.updateData = function (t) {
            this.originalSize = t.size, this.data = t.data
        }, r.prototype.updateFrom = function (t) {
            return this.from = t, this
        }, e.a = r
    }, function (t, e) {
        "undefined" != typeof window && (window.requestAnimFrame = function () {
            return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (t) {
                window.setTimeout(t, 1e3 / 60)
            }
        }()), Math.imul = Math.imul || function (t, e) {
            var n = t >>> 16 & 65535,
                r = 65535 & t,
                o = e >>> 16 & 65535,
                i = 65535 & e;
            return r * i + (n * i + r * o << 16 >>> 0) | 0
        }, "function" != typeof Object.assign && (Object.assign = function (t) {
            "use strict";
            if (null === t) throw new TypeError("Cannot convert undefined or null to object");
            for (var e = Object(t), n = 1; n < arguments.length; n++) {
                var r = arguments[n];
                if (null !== r)
                    for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        })
    }, function (t, e, n) {
        "use strict";
        var r = void 0;
        r = n(56), e.a = r
    }, function (t, e) {
        t.exports = {
            inputStream: {
                name: "Live",
                type: "LiveStream",
                constraints: {
                    width: 640,
                    height: 480,
                    facingMode: "environment"
                },
                area: {
                    top: "0%",
                    right: "0%",
                    left: "0%",
                    bottom: "0%"
                },
                singleChannel: !1
            },
            locate: !0,
            numOfWorkers: 4,
            decoder: {
                readers: ["code_128_reader"]
            },
            locator: {
                halfSample: !0,
                patchSize: "medium"
            }
        }
    }, function (t, e, n) {
        "use strict";
        var r = n(58),
            o = (n(9), n(69)),
            i = n(4),
            a = n(31),
            u = n(70),
            c = n(68),
            s = n(77),
            f = n(74),
            l = n(72),
            d = n(73),
            h = n(76),
            p = n(75),
            v = n(67),
            _ = n(71),
            g = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            },
            y = {
                code_128_reader: o.a,
                ean_reader: i.a,
                ean_5_reader: d.a,
                ean_2_reader: l.a,
                ean_8_reader: f.a,
                code_39_reader: a.a,
                code_39_vin_reader: u.a,
                codabar_reader: c.a,
                upc_reader: s.a,
                upc_e_reader: h.a,
                i2of5_reader: p.a,
                "2of5_reader": v.a,
                code_93_reader: _.a
            };
        e.a = {
            create: function (t, e) {
                function n() {}

                function o() {
                    t.readers.forEach(function (t) {
                        var e, n = {},
                            r = [];
                        "object" === (void 0 === t ? "undefined" : g(t)) ? (e = t.format, n = t.config) : "string" == typeof t && (e = t), n.supplements && (r = n.supplements.map(function (t) {
                            return new y[t]
                        })), h.push(new y[e](n, r))
                    })
                }

                function i() {}

                function a(t, n, r) {
                    function o(e) {
                        var r = {
                            y: e * Math.sin(n),
                            x: e * Math.cos(n)
                        };
                        t[0].y -= r.y, t[0].x -= r.x, t[1].y += r.y, t[1].x += r.x
                    }
                    for (o(r); r > 1 && (!e.inImageWithBorder(t[0], 0) || !e.inImageWithBorder(t[1], 0));) r -= Math.ceil(r / 2), o(-r);
                    return t
                }

                function u(t) {
                    return [{
                        x: (t[1][0] - t[0][0]) / 2 + t[0][0],
                        y: (t[1][1] - t[0][1]) / 2 + t[0][1]
                    }, {
                        x: (t[3][0] - t[2][0]) / 2 + t[2][0],
                        y: (t[3][1] - t[2][1]) / 2 + t[2][1]
                    }]
                }

                function c(t) {
                    var n, o = null,
                        i = r.a.getBarcodeLine(e, t[0], t[1]);
                    for (r.a.toBinaryLine(i), n = 0; n < h.length && null === o; n++) o = h[n].decodePattern(i.line);
                    return null === o ? null : {
                        codeResult: o,
                        barcodeLine: i
                    }
                }

                function s(t, e, n) {
                    var r, o, i, a = Math.sqrt(Math.pow(t[1][0] - t[0][0], 2) + Math.pow(t[1][1] - t[0][1], 2)),
                        u = 16,
                        s = null,
                        f = Math.sin(n),
                        l = Math.cos(n);
                    for (r = 1; r < u && null === s; r++) o = a / u * r * (r % 2 == 0 ? -1 : 1), i = {
                        y: o * f,
                        x: o * l
                    }, e[0].y += i.x, e[0].x -= i.y, e[1].y += i.x, e[1].x -= i.y, s = c(e);
                    return s
                }

                function f(t) {
                    return Math.sqrt(Math.pow(Math.abs(t[1].y - t[0].y), 2) + Math.pow(Math.abs(t[1].x - t[0].x), 2))
                }

                function l(t) {
                    var e, n, r, o;
                    d.ctx.overlay;
                    return e = u(t), o = f(e), n = Math.atan2(e[1].y - e[0].y, e[1].x - e[0].x), null === (e = a(e, n, Math.floor(.1 * o))) ? null : (r = c(e), null === r && (r = s(t, e, n)), null === r ? null : {
                        codeResult: r.codeResult,
                        line: e,
                        angle: n,
                        pattern: r.barcodeLine.line,
                        threshold: r.barcodeLine.threshold
                    })
                }
                var d = {
                        ctx: {
                            frequency: null,
                            pattern: null,
                            overlay: null
                        },
                        dom: {
                            frequency: null,
                            pattern: null,
                            overlay: null
                        }
                    },
                    h = [];
                return n(), o(), i(), {
                    decodeFromBoundingBox: function (t) {
                        return l(t)
                    },
                    decodeFromBoundingBoxes: function (e) {
                        var n, r, o = [],
                            i = t.multiple;
                        for (n = 0; n < e.length; n++) {
                            var a = e[n];
                            if (r = l(a) || {}, r.box = a, i) o.push(r);
                            else if (r.codeResult) return r
                        }
                        if (i) return {
                            barcodes: o
                        }
                    },
                    setReaders: function (e) {
                        t.readers = e, h.length = 0, o()
                    }
                }
            }
        }
    }, function (t, e, n) {
        "use strict";
        var r = (n(20), {}),
            o = {
                DIR: {
                    UP: 1,
                    DOWN: -1
                }
            };
        r.getBarcodeLine = function (t, e, n) {
            function r(t, e) {
                l = y[e * m + t], x += l, b = l < b ? l : b, E = l > E ? l : E, g.push(l)
            }
            var o, i, a, u, c, s, f, l, d = 0 | e.x,
                h = 0 | e.y,
                p = 0 | n.x,
                v = 0 | n.y,
                _ = Math.abs(v - h) > Math.abs(p - d),
                g = [],
                y = t.data,
                m = t.size.x,
                x = 0,
                b = 255,
                E = 0;
            for (_ && (s = d, d = h, h = s, s = p, p = v, v = s), d > p && (s = d, d = p, p = s, s = h, h = v, v = s), o = p - d, i = Math.abs(v - h), a = o / 2 | 0, c = h, u = h < v ? 1 : -1, f = d; f < p; f++) _ ? r(c, f) : r(f, c), (a -= i) < 0 && (c += u, a += o);
            return {
                line: g,
                min: b,
                max: E
            }
        }, r.toBinaryLine = function (t) {
            var e, n, r, i, a, u, c = t.min,
                s = t.max,
                f = t.line,
                l = c + (s - c) / 2,
                d = [],
                h = (s - c) / 12,
                p = -h;
            for (r = f[0] > l ? o.DIR.UP : o.DIR.DOWN, d.push({
                    pos: 0,
                    val: f[0]
                }), a = 0; a < f.length - 2; a++) e = f[a + 1] - f[a], n = f[a + 2] - f[a + 1], i = e + n < p && f[a + 1] < 1.5 * l ? o.DIR.DOWN : e + n > h && f[a + 1] > .5 * l ? o.DIR.UP : r, r !== i && (d.push({
                pos: a,
                val: f[a]
            }), r = i);
            for (d.push({
                    pos: f.length,
                    val: f[f.length - 1]
                }), u = d[0].pos; u < d[1].pos; u++) f[u] = f[u] > l ? 0 : 1;
            for (a = 1; a < d.length - 1; a++)
                for (h = d[a + 1].val > d[a].val ? d[a].val + (d[a + 1].val - d[a].val) / 3 * 2 | 0 : d[a + 1].val + (d[a].val - d[a + 1].val) / 3 | 0, u = d[a].pos; u < d[a + 1].pos; u++) f[u] = f[u] > h ? 0 : 1;
            return {
                line: f,
                threshold: h
            }
        }, r.debug = {
            printFrequency: function (t, e) {
                var n, r = e.getContext("2d");
                for (e.width = t.length, e.height = 256, r.beginPath(), r.strokeStyle = "blue", n = 0; n < t.length; n++) r.moveTo(n, 255), r.lineTo(n, 255 - t[n]);
                r.stroke(), r.closePath()
            },
            printPattern: function (t, e) {
                var n, r = e.getContext("2d");
                for (e.width = t.length, r.fillColor = "black", n = 0; n < t.length; n++) 1 === t[n] && r.fillRect(n, 0, 1, 100)
            }
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            return new Promise(function (e, n) {
                function r() {
                    o > 0 ? t.videoWidth > 10 && t.videoHeight > 10 ? e() : window.setTimeout(r, 500) : n("Unable to play video stream. Is webcam working?"), o--
                }
                var o = 10;
                r()
            })
        }

        function o(t, e) {
            return n.i(d.a)(e).then(function (e) {
                return new Promise(function (n) {
                    s = e, t.setAttribute("autoplay", "true"), t.srcObject = e, t.addEventListener("loadedmetadata", function () {
                        t.play(), n()
                    })
                })
            }).then(r.bind(null, t))
        }

        function i(t) {
            var e = l()(t, ["width", "height", "facingMode", "aspectRatio", "deviceId"]);
            return void 0 !== t.minAspectRatio && t.minAspectRatio > 0 && (e.aspectRatio = t.minAspectRatio, console.log("WARNING: Constraint 'minAspectRatio' is deprecated; Use 'aspectRatio' instead")), void 0 !== t.facing && (e.facingMode = t.facing, console.log("WARNING: Constraint 'facing' is deprecated. Use 'facingMode' instead'")), e
        }

        function a(t) {
            var e = {
                audio: !1,
                video: i(t)
            };
            return e.video.deviceId && e.video.facingMode && delete e.video.facingMode, Promise.resolve(e)
        }

        function u() {
            return n.i(d.b)().then(function (t) {
                return t.filter(function (t) {
                    return "videoinput" === t.kind
                })
            })
        }

        function c() {
            if (s) {
                var t = s.getVideoTracks();
                if (t && t.length) return t[0]
            }
        }
        var s, f = n(162),
            l = n.n(f),
            d = n(52);
        e.a = {
            request: function (t, e) {
                return a(e).then(o.bind(null, t))
            },
            release: function () {
                var t = s && s.getVideoTracks();
                t && t.length && t[0].stop(), s = null
            },
            enumerateVideoDevices: u,
            getActiveStreamLabel: function () {
                var t = c();
                return t ? t.label : ""
            },
            getActiveTrack: c
        }
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d;
            return /^blob\:/i.test(t) ? i(t).then(o).then(function (t) {
                return a(t, e)
            }) : Promise.resolve(null)
        }

        function o(t) {
            return new Promise(function (e) {
                var n = new FileReader;
                n.onload = function (t) {
                    return e(t.target.result)
                }, n.readAsArrayBuffer(t)
            })
        }

        function i(t) {
            return new Promise(function (e, n) {
                var r = new XMLHttpRequest;
                r.open("GET", t, !0), r.responseType = "blob", r.onreadystatechange = function () {
                    r.readyState !== XMLHttpRequest.DONE || 200 !== r.status && 0 !== r.status || e(this.response)
                }, r.onerror = n, r.send()
            })
        }

        function a(t) {
            var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : d,
                n = new DataView(t),
                r = t.byteLength,
                o = e.reduce(function (t, e) {
                    var n = Object.keys(l).filter(function (t) {
                        return l[t] === e
                    })[0];
                    return n && (t[n] = e), t
                }, {}),
                i = 2;
            if (255 !== n.getUint8(0) || 216 !== n.getUint8(1)) return !1;
            for (; i < r;) {
                if (255 !== n.getUint8(i)) return !1;
                if (225 === n.getUint8(i + 1)) return u(n, i + 4, o);
                i += 2 + n.getUint16(i + 2)
            }
        }

        function u(t, e, n) {
            if ("Exif" !== f(t, e, 4)) return !1;
            var r = e + 6,
                o = void 0;
            if (18761 === t.getUint16(r)) o = !1;
            else {
                if (19789 !== t.getUint16(r)) return !1;
                o = !0
            }
            if (42 !== t.getUint16(r + 2, !o)) return !1;
            var i = t.getUint32(r + 4, !o);
            return !(i < 8) && c(t, r, r + i, n, o)
        }

        function c(t, e, n, r, o) {
            for (var i = t.getUint16(n, !o), a = {}, u = 0; u < i; u++) {
                var c = n + 12 * u + 2,
                    f = r[t.getUint16(c, !o)];
                f && (a[f] = s(t, c, e, n, o))
            }
            return a
        }

        function s(t, e, n, r, o) {
            var i = t.getUint16(e + 2, !o),
                a = t.getUint32(e + 4, !o);
            switch (i) {
                case 3:
                    if (1 === a) return t.getUint16(e + 8, !o)
            }
        }

        function f(t, e, n) {
            for (var r = "", o = e; o < e + n; o++) r += String.fromCharCode(t.getUint8(o));
            return r
        }
        e.a = r;
        var l = {
                274: "orientation"
            },
            d = Object.keys(l).map(function (t) {
                return l[t]
            })
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            t.width !== e.x && (t.width = e.x), t.height !== e.y && (t.height = e.y)
        }
        var o = n(19),
            i = Math.PI / 180,
            a = {};
        a.create = function (t, e) {
            var a, u = {},
                c = t.getConfig(),
                s = (n.i(o.b)(t.getRealWidth(), t.getRealHeight()), t.getCanvasSize()),
                f = n.i(o.b)(t.getWidth(), t.getHeight()),
                l = t.getTopRight(),
                d = l.x,
                h = l.y,
                p = null,
                v = null;
            return a = e ? e : document.createElement("canvas"), a.width = s.x, a.height = s.y, p = a.getContext("2d"), v = new Uint8Array(f.x * f.y), u.attachData = function (t) {
                v = t
            }, u.getData = function () {
                return v
            }, u.grab = function () {
                var e, u = c.halfSample,
                    l = t.getFrame(),
                    _ = l,
                    g = 0;
                if (_) {
                    if (r(a, s), "ImageStream" === c.type && (_ = l.img, l.tags && l.tags.orientation)) switch (l.tags.orientation) {
                        case 6:
                            g = 90 * i;
                            break;
                        case 8:
                            g = -90 * i
                    }
                    return 0 !== g ? (p.translate(s.x / 2, s.y / 2), p.rotate(g), p.drawImage(_, -s.y / 2, -s.x / 2, s.y, s.x), p.rotate(-g), p.translate(-s.x / 2, -s.y / 2)) : p.drawImage(_, 0, 0, s.x, s.y), e = p.getImageData(d, h, f.x, f.y).data, u ? n.i(o.c)(e, f, v) : n.i(o.d)(e, v, c), !0
                }
                return !1
            }, u.getSize = function () {
                return f
            }, u
        }, e.a = a
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            t.onload = function () {
                e.loaded(this)
            }
        }
        var o = n(60),
            i = {};
        i.load = function (t, e, i, a, u) {
            var c, s, f, l = new Array(a),
                d = new Array(l.length);
            if (u === !1) l[0] = t;
            else
                for (c = 0; c < l.length; c++) f = i + c, l[c] = t + "image-" + ("00" + f).slice(-3) + ".jpg";
            for (d.notLoaded = [], d.addImage = function (t) {
                    d.notLoaded.push(t)
                }, d.loaded = function (r) {
                    for (var i = d.notLoaded, a = 0; a < i.length; a++)
                        if (i[a] === r) {
                            i.splice(a, 1);
                            for (var c = 0; c < l.length; c++) {
                                var s = l[c].substr(l[c].lastIndexOf("/"));
                                if (r.src.lastIndexOf(s) !== -1) {
                                    d[c] = {
                                        img: r
                                    };
                                    break
                                }
                            }
                            break
                        } 0 === i.length && (u === !1 ? n.i(o.a)(t, ["orientation"]).then(function (t) {
                        d[0].tags = t, e(d)
                    }).catch(function (t) {
                        console.log(t), e(d)
                    }) : e(d))
                }, c = 0; c < l.length; c++) s = new Image, d.addImage(s), r(s, d), s.src = l[c]
        }, e.a = i
    }, function (t, e, n) {
        "use strict";
        var r = n(62),
            o = {};
        o.createVideoStream = function (t) {
            function e() {
                var e = t.videoWidth,
                    o = t.videoHeight;
                n = i.size ? e / o > 1 ? i.size : Math.floor(e / o * i.size) : e, r = i.size ? e / o > 1 ? Math.floor(o / e * i.size) : i.size : o, s.x = n, s.y = r
            }
            var n, r, o = {},
                i = null,
                a = ["canrecord", "ended"],
                u = {},
                c = {
                    x: 0,
                    y: 0
                },
                s = {
                    x: 0,
                    y: 0
                };
            return o.getRealWidth = function () {
                return t.videoWidth
            }, o.getRealHeight = function () {
                return t.videoHeight
            }, o.getWidth = function () {
                return n
            }, o.getHeight = function () {
                return r
            }, o.setWidth = function (t) {
                n = t
            }, o.setHeight = function (t) {
                r = t
            }, o.setInputStream = function (e) {
                i = e, t.src = void 0 !== e.src ? e.src : ""
            }, o.ended = function () {
                return t.ended
            }, o.getConfig = function () {
                return i
            }, o.setAttribute = function (e, n) {
                t.setAttribute(e, n)
            }, o.pause = function () {
                t.pause()
            }, o.play = function () {
                t.play()
            }, o.setCurrentTime = function (e) {
                "LiveStream" !== i.type && (t.currentTime = e)
            }, o.addEventListener = function (e, n, r) {
                a.indexOf(e) !== -1 ? (u[e] || (u[e] = []), u[e].push(n)) : t.addEventListener(e, n, r)
            }, o.clearEventHandlers = function () {
                a.forEach(function (e) {
                    var n = u[e];
                    n && n.length > 0 && n.forEach(function (n) {
                        t.removeEventListener(e, n)
                    })
                })
            }, o.trigger = function (t, n) {
                var r, i = u[t];
                if ("canrecord" === t && e(), i && i.length > 0)
                    for (r = 0; r < i.length; r++) i[r].apply(o, n)
            }, o.setTopRight = function (t) {
                c.x = t.x, c.y = t.y
            }, o.getTopRight = function () {
                return c
            }, o.setCanvasSize = function (t) {
                s.x = t.x, s.y = t.y
            }, o.getCanvasSize = function () {
                return s
            }, o.getFrame = function () {
                return t
            }, o
        }, o.createLiveStream = function (t) {
            t.setAttribute("autoplay", !0);
            var e = o.createVideoStream(t);
            return e.ended = function () {
                return !1
            }, e
        }, o.createImageStream = function () {
            function t() {
                l = !1, r.a.load(v, function (t) {
                    if (d = t, t[0].tags && t[0].tags.orientation) switch (t[0].tags.orientation) {
                        case 6:
                        case 8:
                            u = t[0].img.height, c = t[0].img.width;
                            break;
                        default:
                            u = t[0].img.width, c = t[0].img.height
                    } else u = t[0].img.width, c = t[0].img.height;
                    n = a.size ? u / c > 1 ? a.size : Math.floor(u / c * a.size) : u, o = a.size ? u / c > 1 ? Math.floor(c / u * a.size) : a.size : c, x.x = n, x.y = o, l = !0, s = 0, setTimeout(function () {
                        e("canrecord", [])
                    }, 0)
                }, p, h, a.sequence)
            }

            function e(t, e) {
                var n, r = y[t];
                if (r && r.length > 0)
                    for (n = 0; n < r.length; n++) r[n].apply(i, e)
            }
            var n, o, i = {},
                a = null,
                u = 0,
                c = 0,
                s = 0,
                f = !0,
                l = !1,
                d = null,
                h = 0,
                p = 1,
                v = null,
                _ = !1,
                g = ["canrecord", "ended"],
                y = {},
                m = {
                    x: 0,
                    y: 0
                },
                x = {
                    x: 0,
                    y: 0
                };
            return i.trigger = e, i.getWidth = function () {
                return n
            }, i.getHeight = function () {
                return o
            }, i.setWidth = function (t) {
                n = t
            }, i.setHeight = function (t) {
                o = t
            }, i.getRealWidth = function () {
                return u
            }, i.getRealHeight = function () {
                return c
            }, i.setInputStream = function (e) {
                a = e, e.sequence === !1 ? (v = e.src, h = 1) : (v = e.src, h = e.length), t()
            }, i.ended = function () {
                return _
            }, i.setAttribute = function () {}, i.getConfig = function () {
                return a
            }, i.pause = function () {
                f = !0
            }, i.play = function () {
                f = !1
            }, i.setCurrentTime = function (t) {
                s = t
            }, i.addEventListener = function (t, e) {
                g.indexOf(t) !== -1 && (y[t] || (y[t] = []), y[t].push(e))
            }, i.setTopRight = function (t) {
                m.x = t.x, m.y = t.y
            }, i.getTopRight = function () {
                return m
            }, i.setCanvasSize = function (t) {
                x.x = t.x, x.y = t.y
            }, i.getCanvasSize = function () {
                return x
            }, i.getFrame = function () {
                var t;
                return l ? (f || (t = d[s], s < h - 1 ? s++ : setTimeout(function () {
                    _ = !0, e("ended", [])
                }, 0)), t) : null
            }, i
        }, e.a = o
    }, function (t, e, n) {
        "use strict";
        (function (t) {
            function r() {
                var e;
                v = p.halfSample ? new A.a({
                    x: O.size.x / 2 | 0,
                    y: O.size.y / 2 | 0
                }) : O, C = n.i(w.e)(p.patchSize, v.size), z.x = v.size.x / C.x | 0, z.y = v.size.y / C.y | 0, E = new A.a(v.size, void 0, Uint8Array, !1), y = new A.a(C, void 0, Array, !0), e = new ArrayBuffer(65536), g = new A.a(C, new Uint8Array(e, 0, C.x * C.y)), _ = new A.a(C, new Uint8Array(e, C.x * C.y * 3, C.x * C.y), void 0, !0), R = n.i(P.a)("undefined" != typeof window ? window : "undefined" != typeof self ? self : t, {
                    size: C.x
                }, e), b = new A.a({
                    x: v.size.x / g.size.x | 0,
                    y: v.size.y / g.size.y | 0
                }, void 0, Array, !0), m = new A.a(b.size, void 0, void 0, !0), x = new A.a(b.size, void 0, Int32Array, !0)
            }

            function o() {
                p.useWorker || "undefined" == typeof document || (N.dom.binary = document.createElement("canvas"), N.dom.binary.className = "binaryBuffer", N.ctx.binary = N.dom.binary.getContext("2d"), N.dom.binary.width = E.size.x, N.dom.binary.height = E.size.y)
            }

            function i(t) {
                var e, n, r, o, i, a, u, c = E.size.x,
                    s = E.size.y,
                    f = -E.size.x,
                    l = -E.size.y;
                for (e = 0, n = 0; n < t.length; n++) o = t[n], e += o.rad;
                for (e /= t.length, e = (180 * e / Math.PI + 90) % 180 - 90, e < 0 && (e += 180), e = (180 - e) * Math.PI / 180, i = M.copy(M.create(), [Math.cos(e), Math.sin(e), -Math.sin(e), Math.cos(e)]), n = 0; n < t.length; n++)
                    for (o = t[n], r = 0; r < 4; r++) I.transformMat2(o.box[r], o.box[r], i);
                for (n = 0; n < t.length; n++)
                    for (o = t[n], r = 0; r < 4; r++) o.box[r][0] < c && (c = o.box[r][0]), o.box[r][0] > f && (f = o.box[r][0]), o.box[r][1] < s && (s = o.box[r][1]), o.box[r][1] > l && (l = o.box[r][1]);
                for (a = [
                        [c, s],
                        [f, s],
                        [f, l],
                        [c, l]
                    ], u = p.halfSample ? 2 : 1, i = M.invert(i, i), r = 0; r < 4; r++) I.transformMat2(a[r], a[r], i);
                for (r = 0; r < 4; r++) I.scale(a[r], a[r], u);
                return a
            }

            function a() {
                n.i(w.f)(v, E), E.zeroBorder()
            }

            function u() {
                var t, e, n, r, o, i, a, u = [];
                for (t = 0; t < z.x; t++)
                    for (e = 0; e < z.y; e++) n = g.size.x * t, r = g.size.y * e, l(n, r), _.zeroBorder(), T.a.init(y.data, 0), i = S.a.create(_, y), a = i.rasterize(0), o = y.moments(a.count), u = u.concat(d(o, [t, e], n, r));
                return u
            }

            function c(t) {
                var e, n, r = [];
                for (e = 0; e < t; e++) r.push(0);
                for (n = x.data.length; n--;) x.data[n] > 0 && r[x.data[n] - 1]++;
                return r = r.map(function (t, e) {
                    return {
                        val: t,
                        label: e + 1
                    }
                }), r.sort(function (t, e) {
                    return e.val - t.val
                }), r.filter(function (t) {
                    return t.val >= 5
                })
            }

            function s(t, e) {
                var n, r, o, a, u = [],
                    c = [];
                for (n = 0; n < t.length; n++) {
                    for (r = x.data.length, u.length = 0; r--;) x.data[r] === t[n].label && (o = b.data[r], u.push(o));
                    a = i(u), a && c.push(a)
                }
                return c
            }

            function f(t) {
                var e = n.i(w.g)(t, .9),
                    r = n.i(w.h)(e, 1, function (t) {
                        return t.getPoints().length
                    }),
                    o = [],
                    i = [];
                if (1 === r.length) {
                    o = r[0].item.getPoints();
                    for (var a = 0; a < o.length; a++) i.push(o[a].point)
                }
                return i
            }

            function l(t, e) {
                E.subImageAsCopy(g, n.i(w.b)(t, e)), R.skeletonize()
            }

            function d(t, e, n, r) {
                var o, i, a, u, c = [],
                    s = [],
                    l = Math.ceil(C.x / 3);
                if (t.length >= 2) {
                    for (o = 0; o < t.length; o++) t[o].m00 > l && c.push(t[o]);
                    if (c.length >= 2) {
                        for (a = f(c), i = 0, o = 0; o < a.length; o++) i += a[o].rad;
                        a.length > 1 && a.length >= c.length / 4 * 3 && a.length > t.length / 4 && (i /= a.length, u = {
                            index: e[1] * z.x + e[0],
                            pos: {
                                x: n,
                                y: r
                            },
                            box: [I.clone([n, r]), I.clone([n + g.size.x, r]), I.clone([n + g.size.x, r + g.size.y]), I.clone([n, r + g.size.y])],
                            moments: a,
                            rad: i,
                            vec: I.clone([Math.cos(i), Math.sin(i)])
                        }, s.push(u))
                    }
                }
                return s
            }

            function h(t) {
                function e() {
                    var t;
                    for (t = 0; t < x.data.length; t++)
                        if (0 === x.data[t] && 1 === m.data[t]) return t;
                    return x.length
                }

                function n(t) {
                    var e, r, o, u, c, s = {
                        x: t % x.size.x,
                        y: t / x.size.x | 0
                    };
                    if (t < x.data.length)
                        for (o = b.data[t], x.data[t] = i, c = 0; c < D.a.searchDirections.length; c++) r = s.y + D.a.searchDirections[c][0], e = s.x + D.a.searchDirections[c][1], u = r * x.size.x + e, 0 !== m.data[u] ? 0 === x.data[u] && Math.abs(I.dot(b.data[u].vec, o.vec)) > a && n(u) : x.data[u] = Number.MAX_VALUE
                }
                var r, o, i = 0,
                    a = .95,
                    u = 0;
                for (T.a.init(m.data, 0), T.a.init(x.data, 0), T.a.init(b.data, null), r = 0; r < t.length; r++) o = t[r], b.data[o.index] = o, m.data[o.index] = 1;
                for (m.zeroBorder();
                    (u = e()) < x.data.length;) i++, n(u);
                return i
            }
            var p, v, _, g, y, m, x, b, E, C, O, R, A = n(20),
                w = n(19),
                T = n(3),
                S = (n(9), n(65)),
                D = n(30),
                P = n(66),
                I = {
                    clone: n(7),
                    dot: n(32),
                    scale: n(81),
                    transformMat2: n(82)
                },
                M = {
                    copy: n(78),
                    create: n(79),
                    invert: n(80)
                },
                N = {
                    ctx: {
                        binary: null
                    },
                    dom: {
                        binary: null
                    }
                },
                z = {
                    x: 0,
                    y: 0
                };
            e.a = {
                init: function (t, e) {
                    p = e, O = t, r(), o()
                },
                locate: function () {
                    var t, e;
                    if (p.halfSample && n.i(w.i)(O, v), a(), t = u(), t.length < z.x * z.y * .05) return null;
                    var r = h(t);
                    return r < 1 ? null : (e = c(r), 0 === e.length ? null : s(e, r))
                },
                checkImageConstraints: function (t, e) {
                    var r, o, i, a = t.getWidth(),
                        u = t.getHeight(),
                        c = e.halfSample ? .5 : 1;
                    if (t.getConfig().area && (i = n.i(w.j)(a, u, t.getConfig().area), t.setTopRight({
                            x: i.sx,
                            y: i.sy
                        }), t.setCanvasSize({
                            x: a,
                            y: u
                        }), a = i.sw, u = i.sh), o = {
                            x: Math.floor(a * c),
                            y: Math.floor(u * c)
                        }, r = n.i(w.e)(e.patchSize, o), t.setWidth(Math.floor(Math.floor(o.x / r.x) * (1 / c) * r.x)), t.setHeight(Math.floor(Math.floor(o.y / r.y) * (1 / c) * r.y)), t.getWidth() % r.x == 0 && t.getHeight() % r.y == 0) return !0;
                    throw new Error("Image dimensions do not comply with the current settings: Width (" + a + " )and height (" + u + ") must a multiple of " + r.x)
                }
            }
        }).call(e, n(47))
    }, function (t, e, n) {
        "use strict";
        var r = n(30),
            o = {
                createContour2D: function () {
                    return {
                        dir: null,
                        index: null,
                        firstVertex: null,
                        insideContours: null,
                        nextpeer: null,
                        prevpeer: null
                    }
                },
                CONTOUR_DIR: {
                    CW_DIR: 0,
                    CCW_DIR: 1,
                    UNKNOWN_DIR: 2
                },
                DIR: {
                    OUTSIDE_EDGE: -32767,
                    INSIDE_EDGE: -32766
                },
                create: function (t, e) {
                    var n = t.data,
                        i = e.data,
                        a = t.size.x,
                        u = t.size.y,
                        c = r.a.create(t, e);
                    return {
                        rasterize: function (t) {
                            var e, r, s, f, l, d, h, p, v, _, g, y, m = [],
                                x = 0;
                            for (y = 0; y < 400; y++) m[y] = 0;
                            for (m[0] = n[0], v = null, d = 1; d < u - 1; d++)
                                for (f = 0, r = m[0], l = 1; l < a - 1; l++)
                                    if (g = d * a + l, 0 === i[g])
                                        if ((e = n[g]) !== r) {
                                            if (0 === f) s = x + 1, m[s] = e, r = e, null !== (h = c.contourTracing(d, l, s, e, o.DIR.OUTSIDE_EDGE)) && (x++, f = s, p = o.createContour2D(), p.dir = o.CONTOUR_DIR.CW_DIR, p.index = f, p.firstVertex = h, p.nextpeer = v, p.insideContours = null, null !== v && (v.prevpeer = p), v = p);
                                            else if (null !== (h = c.contourTracing(d, l, o.DIR.INSIDE_EDGE, e, f))) {
                                                for (p = o.createContour2D(), p.firstVertex = h, p.insideContours = null, p.dir = 0 === t ? o.CONTOUR_DIR.CCW_DIR : o.CONTOUR_DIR.CW_DIR, p.index = t, _ = v; null !== _ && _.index !== f;) _ = _.nextpeer;
                                                null !== _ && (p.nextpeer = _.insideContours, null !== _.insideContours && (_.insideContours.prevpeer = p), _.insideContours = p)
                                            }
                                        } else i[g] = f;
                            else i[g] === o.DIR.OUTSIDE_EDGE || i[g] === o.DIR.INSIDE_EDGE ? (f = 0, r = i[g] === o.DIR.INSIDE_EDGE ? n[g] : m[0]) : (f = i[g], r = m[f]);
                            for (_ = v; null !== _;) _.index = t, _ = _.nextpeer;
                            return {
                                cc: v,
                                count: x
                            }
                        },
                        debug: {
                            drawContour: function (t, e) {
                                var n, r, i, a = t.getContext("2d"),
                                    u = e;
                                for (a.strokeStyle = "red", a.fillStyle = "red", a.lineWidth = 1, n = null !== u ? u.insideContours : null; null !== u;) {
                                    switch (null !== n ? (r = n, n = n.nextpeer) : (r = u, u = u.nextpeer, n = null !== u ? u.insideContours : null), r.dir) {
                                        case o.CONTOUR_DIR.CW_DIR:
                                            a.strokeStyle = "red";
                                            break;
                                        case o.CONTOUR_DIR.CCW_DIR:
                                            a.strokeStyle = "blue";
                                            break;
                                        case o.CONTOUR_DIR.UNKNOWN_DIR:
                                            a.strokeStyle = "green"
                                    }
                                    i = r.firstVertex, a.beginPath(), a.moveTo(i.x, i.y);
                                    do i = i.next, a.lineTo(i.x, i.y); while (i !== r.firstVertex);
                                    a.stroke()
                                }
                            }
                        }
                    }
                }
            };
        e.a = o
    }, function (module, __webpack_exports__, __webpack_require__) {
        "use strict";

        function Skeletonizer(stdlib, foreign, buffer) {
            "use asm";
            var images = new stdlib.Uint8Array(buffer),
                size = foreign.size | 0,
                imul = stdlib.Math.imul;

            function erode(inImagePtr, outImagePtr) {
                inImagePtr = inImagePtr | 0;
                outImagePtr = outImagePtr | 0;
                var v = 0,
                    u = 0,
                    sum = 0,
                    yStart1 = 0,
                    yStart2 = 0,
                    xStart1 = 0,
                    xStart2 = 0,
                    offset = 0;
                for (v = 1;
                    (v | 0) < (size - 1 | 0); v = v + 1 | 0) {
                    offset = offset + size | 0;
                    for (u = 1;
                        (u | 0) < (size - 1 | 0); u = u + 1 | 0) {
                        yStart1 = offset - size | 0;
                        yStart2 = offset + size | 0;
                        xStart1 = u - 1 | 0;
                        xStart2 = u + 1 | 0;
                        sum = (images[inImagePtr + yStart1 + xStart1 | 0] | 0) + (images[inImagePtr + yStart1 + xStart2 | 0] | 0) + (images[inImagePtr + offset + u | 0] | 0) + (images[inImagePtr + yStart2 + xStart1 | 0] | 0) + (images[inImagePtr + yStart2 + xStart2 | 0] | 0) | 0;
                        if ((sum | 0) == (5 | 0)) {
                            images[outImagePtr + offset + u | 0] = 1;
                        } else {
                            images[outImagePtr + offset + u | 0] = 0;
                        }
                    }
                }
                return;
            }

            function subtract(aImagePtr, bImagePtr, outImagePtr) {
                aImagePtr = aImagePtr | 0;
                bImagePtr = bImagePtr | 0;
                outImagePtr = outImagePtr | 0;
                var length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                    length = length - 1 | 0;
                    images[outImagePtr + length | 0] = (images[aImagePtr + length | 0] | 0) - (images[bImagePtr + length | 0] | 0) | 0;
                }
            }

            function bitwiseOr(aImagePtr, bImagePtr, outImagePtr) {
                aImagePtr = aImagePtr | 0;
                bImagePtr = bImagePtr | 0;
                outImagePtr = outImagePtr | 0;
                var length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                    length = length - 1 | 0;
                    images[outImagePtr + length | 0] = images[aImagePtr + length | 0] | 0 | (images[bImagePtr + length | 0] | 0) | 0;
                }
            }

            function countNonZero(imagePtr) {
                imagePtr = imagePtr | 0;
                var sum = 0,
                    length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                    length = length - 1 | 0;
                    sum = (sum | 0) + (images[imagePtr + length | 0] | 0) | 0;
                }
                return sum | 0;
            }

            function init(imagePtr, value) {
                imagePtr = imagePtr | 0;
                value = value | 0;
                var length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                    length = length - 1 | 0;
                    images[imagePtr + length | 0] = value;
                }
            }

            function dilate(inImagePtr, outImagePtr) {
                inImagePtr = inImagePtr | 0;
                outImagePtr = outImagePtr | 0;
                var v = 0,
                    u = 0,
                    sum = 0,
                    yStart1 = 0,
                    yStart2 = 0,
                    xStart1 = 0,
                    xStart2 = 0,
                    offset = 0;
                for (v = 1;
                    (v | 0) < (size - 1 | 0); v = v + 1 | 0) {
                    offset = offset + size | 0;
                    for (u = 1;
                        (u | 0) < (size - 1 | 0); u = u + 1 | 0) {
                        yStart1 = offset - size | 0;
                        yStart2 = offset + size | 0;
                        xStart1 = u - 1 | 0;
                        xStart2 = u + 1 | 0;
                        sum = (images[inImagePtr + yStart1 + xStart1 | 0] | 0) + (images[inImagePtr + yStart1 + xStart2 | 0] | 0) + (images[inImagePtr + offset + u | 0] | 0) + (images[inImagePtr + yStart2 + xStart1 | 0] | 0) + (images[inImagePtr + yStart2 + xStart2 | 0] | 0) | 0;
                        if ((sum | 0) > (0 | 0)) {
                            images[outImagePtr + offset + u | 0] = 1;
                        } else {
                            images[outImagePtr + offset + u | 0] = 0;
                        }
                    }
                }
                return;
            }

            function memcpy(srcImagePtr, dstImagePtr) {
                srcImagePtr = srcImagePtr | 0;
                dstImagePtr = dstImagePtr | 0;
                var length = 0;
                length = imul(size, size) | 0;
                while ((length | 0) > 0) {
                    length = length - 1 | 0;
                    images[dstImagePtr + length | 0] = images[srcImagePtr + length | 0] | 0;
                }
            }

            function zeroBorder(imagePtr) {
                imagePtr = imagePtr | 0;
                var x = 0,
                    y = 0;
                for (x = 0;
                    (x | 0) < (size - 1 | 0); x = x + 1 | 0) {
                    images[imagePtr + x | 0] = 0;
                    images[imagePtr + y | 0] = 0;
                    y = y + size - 1 | 0;
                    images[imagePtr + y | 0] = 0;
                    y = y + 1 | 0;
                }
                for (x = 0;
                    (x | 0) < (size | 0); x = x + 1 | 0) {
                    images[imagePtr + y | 0] = 0;
                    y = y + 1 | 0;
                }
            }

            function skeletonize() {
                var subImagePtr = 0,
                    erodedImagePtr = 0,
                    tempImagePtr = 0,
                    skelImagePtr = 0,
                    sum = 0,
                    done = 0;
                erodedImagePtr = imul(size, size) | 0;
                tempImagePtr = erodedImagePtr + erodedImagePtr | 0;
                skelImagePtr = tempImagePtr + erodedImagePtr | 0;
                init(skelImagePtr, 0);
                zeroBorder(subImagePtr);
                do {
                    erode(subImagePtr, erodedImagePtr);
                    dilate(erodedImagePtr, tempImagePtr);
                    subtract(subImagePtr, tempImagePtr, tempImagePtr);
                    bitwiseOr(skelImagePtr, tempImagePtr, skelImagePtr);
                    memcpy(erodedImagePtr, subImagePtr);
                    sum = countNonZero(subImagePtr) | 0;
                    done = (sum | 0) == 0 | 0;
                } while (!done);
            }
            return {
                skeletonize: skeletonize
            };
        }
        __webpack_exports__["a"] = Skeletonizer;
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            o.a.call(this, t), this.barSpaceRatio = [1, 1]
        }
        var o = n(1),
            i = 1,
            a = 3,
            u = {
                START_PATTERN: {
                    value: [a, i, a, i, i, i]
                },
                STOP_PATTERN: {
                    value: [a, i, i, i, a]
                },
                CODE_PATTERN: {
                    value: [
                        [i, i, a, a, i],
                        [a, i, i, i, a],
                        [i, a, i, i, a],
                        [a, a, i, i, i],
                        [i, i, a, i, a],
                        [a, i, a, i, i],
                        [i, a, a, i, i],
                        [i, i, i, a, a],
                        [a, i, i, a, i],
                        [i, a, i, a, i]
                    ]
                },
                SINGLE_CODE_ERROR: {
                    value: .78,
                    writable: !0
                },
                AVG_CODE_ERROR: {
                    value: .3,
                    writable: !0
                },
                FORMAT: {
                    value: "2of5"
                }
            },
            c = u.START_PATTERN.value.reduce(function (t, e) {
                return t + e
            }, 0);
        r.prototype = Object.create(o.a.prototype, u), r.prototype.constructor = r, r.prototype._findPattern = function (t, e, n, r) {
            var o, i, a, u, c = [],
                s = this,
                f = 0,
                l = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: 0,
                    end: 0
                },
                d = s.AVG_CODE_ERROR;
            for (n = n || !1, r = r || !1, e || (e = s._nextSet(s._row)), o = 0; o < t.length; o++) c[o] = 0;
            for (o = e; o < s._row.length; o++)
                if (s._row[o] ^ n) c[f]++;
                else {
                    if (f === c.length - 1) {
                        for (u = 0, a = 0; a < c.length; a++) u += c[a];
                        if ((i = s._matchPattern(c, t)) < d) return l.error = i, l.start = o - u, l.end = o, l;
                        if (!r) return null;
                        for (a = 0; a < c.length - 2; a++) c[a] = c[a + 2];
                        c[c.length - 2] = 0, c[c.length - 1] = 0, f--
                    } else f++;
                    c[f] = 1, n = !n
                } return null
        }, r.prototype._findStart = function () {
            for (var t, e, n = this, r = n._nextSet(n._row), o = 1; !e;) {
                if (!(e = n._findPattern(n.START_PATTERN, r, !1, !0))) return null;
                if (o = Math.floor((e.end - e.start) / c), (t = e.start - 5 * o) >= 0 && n._matchRange(t, e.start, 0)) return e;
                r = e.end, e = null
            }
        }, r.prototype._verifyTrailingWhitespace = function (t) {
            var e, n = this;
            return e = t.end + (t.end - t.start) / 2, e < n._row.length && n._matchRange(t.end, e, 0) ? t : null
        }, r.prototype._findEnd = function () {
            var t, e, n, r = this;
            return r._row.reverse(), n = r._nextSet(r._row), t = r._findPattern(r.STOP_PATTERN, n, !1, !0), r._row.reverse(), null === t ? null : (e = t.start, t.start = r._row.length - t.end, t.end = r._row.length - e, null !== t ? r._verifyTrailingWhitespace(t) : null)
        }, r.prototype._decodeCode = function (t) {
            var e, n, r, o = this,
                i = 0,
                a = o.AVG_CODE_ERROR,
                u = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: 0,
                    end: 0
                };
            for (e = 0; e < t.length; e++) i += t[e];
            for (r = 0; r < o.CODE_PATTERN.length; r++)(n = o._matchPattern(t, o.CODE_PATTERN[r])) < u.error && (u.code = r, u.error = n);
            if (u.error < a) return u
        }, r.prototype._decodePayload = function (t, e, n) {
            for (var r, o, i = this, a = 0, u = t.length, c = [0, 0, 0, 0, 0]; a < u;) {
                for (r = 0; r < 5; r++) c[r] = t[a] * this.barSpaceRatio[0], a += 2;
                if (!(o = i._decodeCode(c))) return null;
                e.push(o.code + ""), n.push(o)
            }
            return o
        }, r.prototype._verifyCounterLength = function (t) {
            return t.length % 10 == 0
        }, r.prototype._decode = function () {
            var t, e, n, r = this,
                o = [],
                i = [];
            return (t = r._findStart()) ? (i.push(t), (e = r._findEnd()) ? (n = r._fillCounters(t.end, e.start, !1), r._verifyCounterLength(n) && r._decodePayload(n, o, i) ? o.length < 5 ? null : (i.push(e), {
                code: o.join(""),
                start: t.start,
                end: e.end,
                startInfo: t,
                decodedCodes: i
            }) : null) : null) : null
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r() {
            o.a.call(this), this._counters = []
        }
        var o = n(1),
            i = {
                ALPHABETH_STRING: {
                    value: "0123456789-$:/.+ABCD"
                },
                ALPHABET: {
                    value: [48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 45, 36, 58, 47, 46, 43, 65, 66, 67, 68]
                },
                CHARACTER_ENCODINGS: {
                    value: [3, 6, 9, 96, 18, 66, 33, 36, 48, 72, 12, 24, 69, 81, 84, 21, 26, 41, 11, 14]
                },
                START_END: {
                    value: [26, 41, 11, 14]
                },
                MIN_ENCODED_CHARS: {
                    value: 4
                },
                MAX_ACCEPTABLE: {
                    value: 2
                },
                PADDING: {
                    value: 1.5
                },
                FORMAT: {
                    value: "codabar",
                    writeable: !1
                }
            };
        r.prototype = Object.create(o.a.prototype, i), r.prototype.constructor = r, r.prototype._decode = function () {
            var t, e, n, r, o, i = this,
                a = [];
            if (this._counters = i._fillCounters(), !(t = i._findStart())) return null;
            r = t.startCounter;
            do {
                if ((n = i._toPattern(r)) < 0) return null;
                if ((e = i._patternToChar(n)) < 0) return null;
                if (a.push(e), r += 8, a.length > 1 && i._isStartEnd(n)) break
            } while (r < i._counters.length);
            return a.length - 2 < i.MIN_ENCODED_CHARS || !i._isStartEnd(n) ? null : i._verifyWhitespace(t.startCounter, r - 8) && i._validateResult(a, t.startCounter) ? (r = r > i._counters.length ? i._counters.length : r, o = t.start + i._sumCounters(t.startCounter, r - 8), {
                code: a.join(""),
                start: t.start,
                end: o,
                startInfo: t,
                decodedCodes: a
            }) : null
        }, r.prototype._verifyWhitespace = function (t, e) {
            return (t - 1 <= 0 || this._counters[t - 1] >= this._calculatePatternLength(t) / 2) && (e + 8 >= this._counters.length || this._counters[e + 7] >= this._calculatePatternLength(e) / 2)
        }, r.prototype._calculatePatternLength = function (t) {
            var e, n = 0;
            for (e = t; e < t + 7; e++) n += this._counters[e];
            return n
        }, r.prototype._thresholdResultPattern = function (t, e) {
            var n, r, o, i, a, u = this,
                c = {
                    space: {
                        narrow: {
                            size: 0,
                            counts: 0,
                            min: 0,
                            max: Number.MAX_VALUE
                        },
                        wide: {
                            size: 0,
                            counts: 0,
                            min: 0,
                            max: Number.MAX_VALUE
                        }
                    },
                    bar: {
                        narrow: {
                            size: 0,
                            counts: 0,
                            min: 0,
                            max: Number.MAX_VALUE
                        },
                        wide: {
                            size: 0,
                            counts: 0,
                            min: 0,
                            max: Number.MAX_VALUE
                        }
                    }
                },
                s = e;
            for (o = 0; o < t.length; o++) {
                for (a = u._charToPattern(t[o]), i = 6; i >= 0; i--) n = 2 == (1 & i) ? c.bar : c.space, r = 1 == (1 & a) ? n.wide : n.narrow, r.size += u._counters[s + i], r.counts++, a >>= 1;
                s += 8
            }
            return ["space", "bar"].forEach(function (t) {
                var e = c[t];
                e.wide.min = Math.floor((e.narrow.size / e.narrow.counts + e.wide.size / e.wide.counts) / 2), e.narrow.max = Math.ceil(e.wide.min), e.wide.max = Math.ceil((e.wide.size * u.MAX_ACCEPTABLE + u.PADDING) / e.wide.counts)
            }), c
        }, r.prototype._charToPattern = function (t) {
            var e, n = this,
                r = t.charCodeAt(0);
            for (e = 0; e < n.ALPHABET.length; e++)
                if (n.ALPHABET[e] === r) return n.CHARACTER_ENCODINGS[e];
            return 0
        }, r.prototype._validateResult = function (t, e) {
            var n, r, o, i, a, u, c = this,
                s = c._thresholdResultPattern(t, e),
                f = e;
            for (n = 0; n < t.length; n++) {
                for (u = c._charToPattern(t[n]), r = 6; r >= 0; r--) {
                    if (o = 0 == (1 & r) ? s.bar : s.space, i = 1 == (1 & u) ? o.wide : o.narrow, (a = c._counters[f + r]) < i.min || a > i.max) return !1;
                    u >>= 1
                }
                f += 8
            }
            return !0
        }, r.prototype._patternToChar = function (t) {
            var e, n = this;
            for (e = 0; e < n.CHARACTER_ENCODINGS.length; e++)
                if (n.CHARACTER_ENCODINGS[e] === t) return String.fromCharCode(n.ALPHABET[e]);
            return -1
        }, r.prototype._computeAlternatingThreshold = function (t, e) {
            var n, r, o = Number.MAX_VALUE,
                i = 0;
            for (n = t; n < e; n += 2) r = this._counters[n], r > i && (i = r), r < o && (o = r);
            return (o + i) / 2 | 0
        }, r.prototype._toPattern = function (t) {
            var e, n, r, o, i = 7,
                a = t + i,
                u = 1 << i - 1,
                c = 0;
            if (a > this._counters.length) return -1;
            for (e = this._computeAlternatingThreshold(t, a), n = this._computeAlternatingThreshold(t + 1, a), r = 0; r < i; r++) o = 0 == (1 & r) ? e : n, this._counters[t + r] > o && (c |= u), u >>= 1;
            return c
        }, r.prototype._isStartEnd = function (t) {
            var e;
            for (e = 0; e < this.START_END.length; e++)
                if (this.START_END[e] === t) return !0;
            return !1
        }, r.prototype._sumCounters = function (t, e) {
            var n, r = 0;
            for (n = t; n < e; n++) r += this._counters[n];
            return r
        }, r.prototype._findStart = function () {
            var t, e, n, r = this,
                o = r._nextUnset(r._row);
            for (t = 1; t < this._counters.length; t++)
                if ((e = r._toPattern(t)) !== -1 && r._isStartEnd(e)) return o += r._sumCounters(0, t), n = o + r._sumCounters(t, t + 8), {
                    start: o,
                    end: n,
                    startCounter: t,
                    endCounter: t + 8
                }
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r() {
            i.a.call(this)
        }

        function o(t, e, n) {
            for (var r = n.length, o = 0, i = 0; r--;) i += t[n[r]], o += e[n[r]];
            return i / o
        }
        var i = n(1),
            a = {
                CODE_SHIFT: {
                    value: 98
                },
                CODE_C: {
                    value: 99
                },
                CODE_B: {
                    value: 100
                },
                CODE_A: {
                    value: 101
                },
                START_CODE_A: {
                    value: 103
                },
                START_CODE_B: {
                    value: 104
                },
                START_CODE_C: {
                    value: 105
                },
                STOP_CODE: {
                    value: 106
                },
                CODE_PATTERN: {
                    value: [
                        [2, 1, 2, 2, 2, 2],
                        [2, 2, 2, 1, 2, 2],
                        [2, 2, 2, 2, 2, 1],
                        [1, 2, 1, 2, 2, 3],
                        [1, 2, 1, 3, 2, 2],
                        [1, 3, 1, 2, 2, 2],
                        [1, 2, 2, 2, 1, 3],
                        [1, 2, 2, 3, 1, 2],
                        [1, 3, 2, 2, 1, 2],
                        [2, 2, 1, 2, 1, 3],
                        [2, 2, 1, 3, 1, 2],
                        [2, 3, 1, 2, 1, 2],
                        [1, 1, 2, 2, 3, 2],
                        [1, 2, 2, 1, 3, 2],
                        [1, 2, 2, 2, 3, 1],
                        [1, 1, 3, 2, 2, 2],
                        [1, 2, 3, 1, 2, 2],
                        [1, 2, 3, 2, 2, 1],
                        [2, 2, 3, 2, 1, 1],
                        [2, 2, 1, 1, 3, 2],
                        [2, 2, 1, 2, 3, 1],
                        [2, 1, 3, 2, 1, 2],
                        [2, 2, 3, 1, 1, 2],
                        [3, 1, 2, 1, 3, 1],
                        [3, 1, 1, 2, 2, 2],
                        [3, 2, 1, 1, 2, 2],
                        [3, 2, 1, 2, 2, 1],
                        [3, 1, 2, 2, 1, 2],
                        [3, 2, 2, 1, 1, 2],
                        [3, 2, 2, 2, 1, 1],
                        [2, 1, 2, 1, 2, 3],
                        [2, 1, 2, 3, 2, 1],
                        [2, 3, 2, 1, 2, 1],
                        [1, 1, 1, 3, 2, 3],
                        [1, 3, 1, 1, 2, 3],
                        [1, 3, 1, 3, 2, 1],
                        [1, 1, 2, 3, 1, 3],
                        [1, 3, 2, 1, 1, 3],
                        [1, 3, 2, 3, 1, 1],
                        [2, 1, 1, 3, 1, 3],
                        [2, 3, 1, 1, 1, 3],
                        [2, 3, 1, 3, 1, 1],
                        [1, 1, 2, 1, 3, 3],
                        [1, 1, 2, 3, 3, 1],
                        [1, 3, 2, 1, 3, 1],
                        [1, 1, 3, 1, 2, 3],
                        [1, 1, 3, 3, 2, 1],
                        [1, 3, 3, 1, 2, 1],
                        [3, 1, 3, 1, 2, 1],
                        [2, 1, 1, 3, 3, 1],
                        [2, 3, 1, 1, 3, 1],
                        [2, 1, 3, 1, 1, 3],
                        [2, 1, 3, 3, 1, 1],
                        [2, 1, 3, 1, 3, 1],
                        [3, 1, 1, 1, 2, 3],
                        [3, 1, 1, 3, 2, 1],
                        [3, 3, 1, 1, 2, 1],
                        [3, 1, 2, 1, 1, 3],
                        [3, 1, 2, 3, 1, 1],
                        [3, 3, 2, 1, 1, 1],
                        [3, 1, 4, 1, 1, 1],
                        [2, 2, 1, 4, 1, 1],
                        [4, 3, 1, 1, 1, 1],
                        [1, 1, 1, 2, 2, 4],
                        [1, 1, 1, 4, 2, 2],
                        [1, 2, 1, 1, 2, 4],
                        [1, 2, 1, 4, 2, 1],
                        [1, 4, 1, 1, 2, 2],
                        [1, 4, 1, 2, 2, 1],
                        [1, 1, 2, 2, 1, 4],
                        [1, 1, 2, 4, 1, 2],
                        [1, 2, 2, 1, 1, 4],
                        [1, 2, 2, 4, 1, 1],
                        [1, 4, 2, 1, 1, 2],
                        [1, 4, 2, 2, 1, 1],
                        [2, 4, 1, 2, 1, 1],
                        [2, 2, 1, 1, 1, 4],
                        [4, 1, 3, 1, 1, 1],
                        [2, 4, 1, 1, 1, 2],
                        [1, 3, 4, 1, 1, 1],
                        [1, 1, 1, 2, 4, 2],
                        [1, 2, 1, 1, 4, 2],
                        [1, 2, 1, 2, 4, 1],
                        [1, 1, 4, 2, 1, 2],
                        [1, 2, 4, 1, 1, 2],
                        [1, 2, 4, 2, 1, 1],
                        [4, 1, 1, 2, 1, 2],
                        [4, 2, 1, 1, 1, 2],
                        [4, 2, 1, 2, 1, 1],
                        [2, 1, 2, 1, 4, 1],
                        [2, 1, 4, 1, 2, 1],
                        [4, 1, 2, 1, 2, 1],
                        [1, 1, 1, 1, 4, 3],
                        [1, 1, 1, 3, 4, 1],
                        [1, 3, 1, 1, 4, 1],
                        [1, 1, 4, 1, 1, 3],
                        [1, 1, 4, 3, 1, 1],
                        [4, 1, 1, 1, 1, 3],
                        [4, 1, 1, 3, 1, 1],
                        [1, 1, 3, 1, 4, 1],
                        [1, 1, 4, 1, 3, 1],
                        [3, 1, 1, 1, 4, 1],
                        [4, 1, 1, 1, 3, 1],
                        [2, 1, 1, 4, 1, 2],
                        [2, 1, 1, 2, 1, 4],
                        [2, 1, 1, 2, 3, 2],
                        [2, 3, 3, 1, 1, 1, 2]
                    ]
                },
                SINGLE_CODE_ERROR: {
                    value: .64
                },
                AVG_CODE_ERROR: {
                    value: .3
                },
                FORMAT: {
                    value: "code_128",
                    writeable: !1
                },
                MODULE_INDICES: {
                    value: {
                        bar: [0, 2, 4],
                        space: [1, 3, 5]
                    }
                }
            };
        r.prototype = Object.create(i.a.prototype, a), r.prototype.constructor = r, r.prototype._decodeCode = function (t, e) {
            var n, r, i, a = [0, 0, 0, 0, 0, 0],
                u = this,
                c = t,
                s = !u._row[c],
                f = 0,
                l = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: t,
                    end: t,
                    correction: {
                        bar: 1,
                        space: 1
                    }
                };
            for (n = c; n < u._row.length; n++)
                if (u._row[n] ^ s) a[f]++;
                else {
                    if (f === a.length - 1) {
                        for (e && u._correct(a, e), r = 0; r < u.CODE_PATTERN.length; r++)(i = u._matchPattern(a, u.CODE_PATTERN[r])) < l.error && (l.code = r, l.error = i);
                        return l.end = n, l.code === -1 || l.error > u.AVG_CODE_ERROR ? null : (u.CODE_PATTERN[l.code] && (l.correction.bar = o(u.CODE_PATTERN[l.code], a, this.MODULE_INDICES.bar), l.correction.space = o(u.CODE_PATTERN[l.code], a, this.MODULE_INDICES.space)), l)
                    }
                    f++, a[f] = 1, s = !s
                } return null
        }, r.prototype._correct = function (t, e) {
            this._correctBars(t, e.bar, this.MODULE_INDICES.bar), this._correctBars(t, e.space, this.MODULE_INDICES.space)
        }, r.prototype._findStart = function () {
            var t, e, n, r, i, a = [0, 0, 0, 0, 0, 0],
                u = this,
                c = u._nextSet(u._row),
                s = !1,
                f = 0,
                l = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: 0,
                    end: 0,
                    correction: {
                        bar: 1,
                        space: 1
                    }
                };
            for (t = c; t < u._row.length; t++)
                if (u._row[t] ^ s) a[f]++;
                else {
                    if (f === a.length - 1) {
                        for (i = 0, r = 0; r < a.length; r++) i += a[r];
                        for (e = u.START_CODE_A; e <= u.START_CODE_C; e++)(n = u._matchPattern(a, u.CODE_PATTERN[e])) < l.error && (l.code = e, l.error = n);
                        if (l.error < u.AVG_CODE_ERROR) return l.start = t - i, l.end = t, l.correction.bar = o(u.CODE_PATTERN[l.code], a, this.MODULE_INDICES.bar), l.correction.space = o(u.CODE_PATTERN[l.code], a, this.MODULE_INDICES.space), l;
                        for (r = 0; r < 4; r++) a[r] = a[r + 2];
                        a[4] = 0, a[5] = 0, f--
                    } else f++;
                    a[f] = 1, s = !s
                } return null
        }, r.prototype._decode = function () {
            var t, e, n = this,
                r = n._findStart(),
                o = null,
                i = !1,
                a = [],
                u = 0,
                c = 0,
                s = [],
                f = [],
                l = !1,
                d = !0;
            if (null === r) return null;
            switch (o = {
                code: r.code,
                start: r.start,
                end: r.end,
                correction: {
                    bar: r.correction.bar,
                    space: r.correction.space
                }
            }, f.push(o), c = o.code, o.code) {
                case n.START_CODE_A:
                    t = n.CODE_A;
                    break;
                case n.START_CODE_B:
                    t = n.CODE_B;
                    break;
                case n.START_CODE_C:
                    t = n.CODE_C;
                    break;
                default:
                    return null
            }
            for (; !i;) {
                if (e = l, l = !1, null !== (o = n._decodeCode(o.end, o.correction))) switch (o.code !== n.STOP_CODE && (d = !0), o.code !== n.STOP_CODE && (s.push(o.code), u++, c += u * o.code), f.push(o), t) {
                    case n.CODE_A:
                        if (o.code < 64) a.push(String.fromCharCode(32 + o.code));
                        else if (o.code < 96) a.push(String.fromCharCode(o.code - 64));
                        else switch (o.code !== n.STOP_CODE && (d = !1), o.code) {
                            case n.CODE_SHIFT:
                                l = !0, t = n.CODE_B;
                                break;
                            case n.CODE_B:
                                t = n.CODE_B;
                                break;
                            case n.CODE_C:
                                t = n.CODE_C;
                                break;
                            case n.STOP_CODE:
                                i = !0
                        }
                        break;
                    case n.CODE_B:
                        if (o.code < 96) a.push(String.fromCharCode(32 + o.code));
                        else switch (o.code !== n.STOP_CODE && (d = !1), o.code) {
                            case n.CODE_SHIFT:
                                l = !0, t = n.CODE_A;
                                break;
                            case n.CODE_A:
                                t = n.CODE_A;
                                break;
                            case n.CODE_C:
                                t = n.CODE_C;
                                break;
                            case n.STOP_CODE:
                                i = !0
                        }
                        break;
                    case n.CODE_C:
                        if (o.code < 100) a.push(o.code < 10 ? "0" + o.code : o.code);
                        else switch (o.code !== n.STOP_CODE && (d = !1), o.code) {
                            case n.CODE_A:
                                t = n.CODE_A;
                                break;
                            case n.CODE_B:
                                t = n.CODE_B;
                                break;
                            case n.STOP_CODE:
                                i = !0
                        }
                } else i = !0;
                e && (t = t === n.CODE_A ? n.CODE_B : n.CODE_A)
            }
            return null === o ? null : (o.end = n._nextUnset(n._row, o.end), n._verifyTrailingWhitespace(o) ? (c -= u * s[s.length - 1]) % 103 !== s[s.length - 1] ? null : a.length ? (d && a.splice(a.length - 1, 1), {
                code: a.join(""),
                start: r.start,
                end: o.end,
                codeset: t,
                startInfo: r,
                decodedCodes: f,
                endInfo: o
            }) : null : null)
        }, i.a.prototype._verifyTrailingWhitespace = function (t) {
            var e, n = this;
            return e = t.end + (t.end - t.start) / 2, e < n._row.length && n._matchRange(t.end, e, 0) ? t : null
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r() {
            o.a.call(this)
        }
        var o = n(31),
            i = {
                IOQ: /[IOQ]/g,
                AZ09: /[A-Z0-9]{17}/
            };
        r.prototype = Object.create(o.a.prototype), r.prototype.constructor = r, r.prototype._decode = function () {
            var t = o.a.prototype._decode.apply(this);
            if (!t) return null;
            var e = t.code;
            return e ? (e = e.replace(i.IOQ, ""), e.match(i.AZ09) && this._checkChecksum(e) ? (t.code = e, t) : null) : null
        }, r.prototype._checkChecksum = function (t) {
            return !!t
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r() {
            o.a.call(this)
        }
        var o = n(1),
            i = n(3),
            a = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%abcd*",
            u = {
                ALPHABETH_STRING: {
                    value: a
                },
                ALPHABET: {
                    value: a.split("").map(function (t) {
                        return t.charCodeAt(0)
                    })
                },
                CHARACTER_ENCODINGS: {
                    value: [276, 328, 324, 322, 296, 292, 290, 336, 274, 266, 424, 420, 418, 404, 402, 394, 360, 356, 354, 308, 282, 344, 332, 326, 300, 278, 436, 434, 428, 422, 406, 410, 364, 358, 310, 314, 302, 468, 466, 458, 366, 374, 430, 294, 474, 470, 306, 350]
                },
                ASTERISK: {
                    value: 350
                },
                FORMAT: {
                    value: "code_93",
                    writeable: !1
                }
            };
        r.prototype = Object.create(o.a.prototype, u), r.prototype.constructor = r, r.prototype._decode = function () {
            var t, e, n, r, o = this,
                a = [0, 0, 0, 0, 0, 0],
                u = [],
                c = o._findStart();
            if (!c) return null;
            r = o._nextSet(o._row, c.end);
            do {
                if (a = o._toCounters(r, a), (n = o._toPattern(a)) < 0) return null;
                if ((t = o._patternToChar(n)) < 0) return null;
                u.push(t), e = r, r += i.a.sum(a), r = o._nextSet(o._row, r)
            } while ("*" !== t);
            return u.pop(), u.length && o._verifyEnd(e, r, a) && o._verifyChecksums(u) ? (u = u.slice(0, u.length - 2), null === (u = o._decodeExtended(u)) ? null : {
                code: u.join(""),
                start: c.start,
                end: r,
                startInfo: c,
                decodedCodes: u
            }) : null
        }, r.prototype._verifyEnd = function (t, e) {
            return !(t === e || !this._row[e])
        }, r.prototype._patternToChar = function (t) {
            var e, n = this;
            for (e = 0; e < n.CHARACTER_ENCODINGS.length; e++)
                if (n.CHARACTER_ENCODINGS[e] === t) return String.fromCharCode(n.ALPHABET[e]);
            return -1
        }, r.prototype._toPattern = function (t) {
            for (var e = t.length, n = 0, r = 0, o = 0; o < e; o++) r += t[o];
            for (var i = 0; i < e; i++) {
                var a = Math.round(9 * t[i] / r);
                if (a < 1 || a > 4) return -1;
                if (0 == (1 & i))
                    for (var u = 0; u < a; u++) n = n << 1 | 1;
                else n <<= a
            }
            return n
        }, r.prototype._findStart = function () {
            var t, e, n, r = this,
                o = r._nextSet(r._row),
                i = o,
                a = [0, 0, 0, 0, 0, 0],
                u = 0,
                c = !1;
            for (t = o; t < r._row.length; t++)
                if (r._row[t] ^ c) a[u]++;
                else {
                    if (u === a.length - 1) {
                        if (r._toPattern(a) === r.ASTERISK && (n = Math.floor(Math.max(0, i - (t - i) / 4)), r._matchRange(n, i, 0))) return {
                            start: i,
                            end: t
                        };
                        for (i += a[0] + a[1], e = 0; e < 4; e++) a[e] = a[e + 2];
                        a[4] = 0, a[5] = 0, u--
                    } else u++;
                    a[u] = 1, c = !c
                } return null
        }, r.prototype._decodeExtended = function (t) {
            for (var e = t.length, n = [], r = 0; r < e; r++) {
                var o = t[r];
                if (o >= "a" && o <= "d") {
                    if (r > e - 2) return null;
                    var i = t[++r],
                        a = i.charCodeAt(0),
                        u = void 0;
                    switch (o) {
                        case "a":
                            if (!(i >= "A" && i <= "Z")) return null;
                            u = String.fromCharCode(a - 64);
                            break;
                        case "b":
                            if (i >= "A" && i <= "E") u = String.fromCharCode(a - 38);
                            else if (i >= "F" && i <= "J") u = String.fromCharCode(a - 11);
                            else if (i >= "K" && i <= "O") u = String.fromCharCode(a + 16);
                            else if (i >= "P" && i <= "S") u = String.fromCharCode(a + 43);
                            else {
                                if (!(i >= "T" && i <= "Z")) return null;
                                u = String.fromCharCode(127)
                            }
                            break;
                        case "c":
                            if (i >= "A" && i <= "O") u = String.fromCharCode(a - 32);
                            else {
                                if ("Z" !== i) return null;
                                u = ":"
                            }
                            break;
                        case "d":
                            if (!(i >= "A" && i <= "Z")) return null;
                            u = String.fromCharCode(a + 32)
                    }
                    n.push(u)
                } else n.push(o)
            }
            return n
        }, r.prototype._verifyChecksums = function (t) {
            return this._matchCheckChar(t, t.length - 2, 20) && this._matchCheckChar(t, t.length - 1, 15)
        }, r.prototype._matchCheckChar = function (t, e, n) {
            var r = this,
                o = t.slice(0, e),
                i = o.length,
                a = o.reduce(function (t, e, o) {
                    return t + ((o * -1 + (i - 1)) % n + 1) * r.ALPHABET.indexOf(e.charCodeAt(0))
                }, 0);
            return this.ALPHABET[a % 47] === t[e].charCodeAt(0)
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r() {
            o.a.call(this)
        }
        var o = n(4),
            i = {
                FORMAT: {
                    value: "ean_2",
                    writeable: !1
                }
            };
        r.prototype = Object.create(o.a.prototype, i), r.prototype.constructor = r, r.prototype.decode = function (t, e) {
            this._row = t;
            var n, r = 0,
                o = 0,
                i = e,
                a = this._row.length,
                u = [],
                c = [];
            for (o = 0; o < 2 && i < a; o++) {
                if (!(n = this._decodeCode(i))) return null;
                c.push(n), u.push(n.code % 10), n.code >= this.CODE_G_START && (r |= 1 << 1 - o), 1 != o && (i = this._nextSet(this._row, n.end), i = this._nextUnset(this._row, i))
            }
            return 2 != u.length || parseInt(u.join("")) % 4 !== r ? null : {
                code: u.join(""),
                decodedCodes: c,
                end: n.end
            }
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r() {
            a.a.call(this)
        }

        function o(t) {
            var e;
            for (e = 0; e < 10; e++)
                if (t === c[e]) return e;
            return null
        }

        function i(t) {
            var e, n = t.length,
                r = 0;
            for (e = n - 2; e >= 0; e -= 2) r += t[e];
            for (r *= 3, e = n - 1; e >= 0; e -= 2) r += t[e];
            return (r *= 3) % 10
        }
        var a = n(4),
            u = {
                FORMAT: {
                    value: "ean_5",
                    writeable: !1
                }
            },
            c = [24, 20, 18, 17, 12, 6, 3, 10, 9, 5];
        r.prototype = Object.create(a.a.prototype, u), r.prototype.constructor = r, r.prototype.decode = function (t, e) {
            this._row = t;
            var n, r = 0,
                a = 0,
                u = e,
                c = this._row.length,
                s = [],
                f = [];
            for (a = 0; a < 5 && u < c; a++) {
                if (!(n = this._decodeCode(u))) return null;
                f.push(n), s.push(n.code % 10), n.code >= this.CODE_G_START && (r |= 1 << 4 - a), 4 != a && (u = this._nextSet(this._row, n.end), u = this._nextUnset(this._row, u))
            }
            return 5 != s.length ? null : i(s) !== o(r) ? null : {
                code: s.join(""),
                decodedCodes: f,
                end: n.end
            }
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.a.call(this, t, e)
        }
        var o = n(4),
            i = {
                FORMAT: {
                    value: "ean_8",
                    writeable: !1
                }
            };
        r.prototype = Object.create(o.a.prototype, i), r.prototype.constructor = r, r.prototype._decodePayload = function (t, e, n) {
            var r, o = this;
            for (r = 0; r < 4; r++) {
                if (!(t = o._decodeCode(t.end, o.CODE_G_START))) return null;
                e.push(t.code), n.push(t)
            }
            if (null === (t = o._findPattern(o.MIDDLE_PATTERN, t.end, !0, !1))) return null;
            for (n.push(t), r = 0; r < 4; r++) {
                if (!(t = o._decodeCode(t.end, o.CODE_G_START))) return null;
                n.push(t), e.push(t.code)
            }
            return t
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r(t) {
            t = a()(o(), t), u.a.call(this, t), this.barSpaceRatio = [1, 1], t.normalizeBarSpaceWidth && (this.SINGLE_CODE_ERROR = .38, this.AVG_CODE_ERROR = .09)
        }

        function o() {
            var t = {};
            return Object.keys(r.CONFIG_KEYS).forEach(function (e) {
                t[e] = r.CONFIG_KEYS[e].default
            }), t
        }
        var i = n(28),
            a = n.n(i),
            u = n(1),
            c = 1,
            s = 3,
            f = {
                START_PATTERN: {
                    value: [c, c, c, c]
                },
                STOP_PATTERN: {
                    value: [c, c, s]
                },
                CODE_PATTERN: {
                    value: [
                        [c, c, s, s, c],
                        [s, c, c, c, s],
                        [c, s, c, c, s],
                        [s, s, c, c, c],
                        [c, c, s, c, s],
                        [s, c, s, c, c],
                        [c, s, s, c, c],
                        [c, c, c, s, s],
                        [s, c, c, s, c],
                        [c, s, c, s, c]
                    ]
                },
                SINGLE_CODE_ERROR: {
                    value: .78,
                    writable: !0
                },
                AVG_CODE_ERROR: {
                    value: .38,
                    writable: !0
                },
                MAX_CORRECTION_FACTOR: {
                    value: 5
                },
                FORMAT: {
                    value: "i2of5"
                }
            };
        r.prototype = Object.create(u.a.prototype, f), r.prototype.constructor = r, r.prototype._matchPattern = function (t, e) {
            if (this.config.normalizeBarSpaceWidth) {
                var n, r = [0, 0],
                    o = [0, 0],
                    i = [0, 0],
                    a = this.MAX_CORRECTION_FACTOR,
                    c = 1 / a;
                for (n = 0; n < t.length; n++) r[n % 2] += t[n], o[n % 2] += e[n];
                for (i[0] = o[0] / r[0], i[1] = o[1] / r[1], i[0] = Math.max(Math.min(i[0], a), c), i[1] = Math.max(Math.min(i[1], a), c), this.barSpaceRatio = i, n = 0; n < t.length; n++) t[n] *= this.barSpaceRatio[n % 2]
            }
            return u.a.prototype._matchPattern.call(this, t, e)
        }, r.prototype._findPattern = function (t, e, n, r) {
            var o, i, a, u, c = [],
                s = this,
                f = 0,
                l = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: 0,
                    end: 0
                },
                d = s.AVG_CODE_ERROR;
            for (n = n || !1, r = r || !1, e || (e = s._nextSet(s._row)), o = 0; o < t.length; o++) c[o] = 0;
            for (o = e; o < s._row.length; o++)
                if (s._row[o] ^ n) c[f]++;
                else {
                    if (f === c.length - 1) {
                        for (u = 0, a = 0; a < c.length; a++) u += c[a];
                        if ((i = s._matchPattern(c, t)) < d) return l.error = i, l.start = o - u, l.end = o, l;
                        if (!r) return null;
                        for (a = 0; a < c.length - 2; a++) c[a] = c[a + 2];
                        c[c.length - 2] = 0, c[c.length - 1] = 0, f--
                    } else f++;
                    c[f] = 1, n = !n
                } return null
        }, r.prototype._findStart = function () {
            for (var t, e, n = this, r = n._nextSet(n._row), o = 1; !e;) {
                if (!(e = n._findPattern(n.START_PATTERN, r, !1, !0))) return null;
                if (o = Math.floor((e.end - e.start) / 4), (t = e.start - 10 * o) >= 0 && n._matchRange(t, e.start, 0)) return e;
                r = e.end, e = null
            }
        }, r.prototype._verifyTrailingWhitespace = function (t) {
            var e, n = this;
            return e = t.end + (t.end - t.start) / 2, e < n._row.length && n._matchRange(t.end, e, 0) ? t : null
        }, r.prototype._findEnd = function () {
            var t, e, n = this;
            return n._row.reverse(), t = n._findPattern(n.STOP_PATTERN), n._row.reverse(), null === t ? null : (e = t.start, t.start = n._row.length - t.end, t.end = n._row.length - e, null !== t ? n._verifyTrailingWhitespace(t) : null)
        }, r.prototype._decodePair = function (t) {
            var e, n, r = [],
                o = this;
            for (e = 0; e < t.length; e++) {
                if (!(n = o._decodeCode(t[e]))) return null;
                r.push(n)
            }
            return r
        }, r.prototype._decodeCode = function (t) {
            var e, n, r, o = this,
                i = 0,
                a = o.AVG_CODE_ERROR,
                u = {
                    error: Number.MAX_VALUE,
                    code: -1,
                    start: 0,
                    end: 0
                };
            for (e = 0; e < t.length; e++) i += t[e];
            for (r = 0; r < o.CODE_PATTERN.length; r++)(n = o._matchPattern(t, o.CODE_PATTERN[r])) < u.error && (u.code = r, u.error = n);
            if (u.error < a) return u
        }, r.prototype._decodePayload = function (t, e, n) {
            for (var r, o, i = this, a = 0, u = t.length, c = [
                    [0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0]
                ]; a < u;) {
                for (r = 0; r < 5; r++) c[0][r] = t[a] * this.barSpaceRatio[0], c[1][r] = t[a + 1] * this.barSpaceRatio[1], a += 2;
                if (!(o = i._decodePair(c))) return null;
                for (r = 0; r < o.length; r++) e.push(o[r].code + ""), n.push(o[r])
            }
            return o
        }, r.prototype._verifyCounterLength = function (t) {
            return t.length % 10 == 0
        }, r.prototype._decode = function () {
            var t, e, n, r = this,
                o = [],
                i = [];
            return (t = r._findStart()) ? (i.push(t), (e = r._findEnd()) ? (n = r._fillCounters(t.end, e.start, !1), r._verifyCounterLength(n) && r._decodePayload(n, o, i) ? o.length % 2 != 0 || o.length < 6 ? null : (i.push(e), {
                code: o.join(""),
                start: t.start,
                end: e.end,
                startInfo: t,
                decodedCodes: i
            }) : null) : null) : null
        }, r.CONFIG_KEYS = {
            normalizeBarSpaceWidth: {
                type: "boolean",
                default: !1,
                description: "If true, the reader tries to normalize thewidth-difference between bars and spaces"
            }
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.a.call(this, t, e)
        }
        var o = n(4),
            i = {
                CODE_FREQUENCY: {
                    value: [
                        [56, 52, 50, 49, 44, 38, 35, 42, 41, 37],
                        [7, 11, 13, 14, 19, 25, 28, 21, 22, 26]
                    ]
                },
                STOP_PATTERN: {
                    value: [1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7, 1 / 6 * 7]
                },
                FORMAT: {
                    value: "upc_e",
                    writeable: !1
                }
            };
        r.prototype = Object.create(o.a.prototype, i), r.prototype.constructor = r, r.prototype._decodePayload = function (t, e, n) {
            var r, o = this,
                i = 0;
            for (r = 0; r < 6; r++) {
                if (!(t = o._decodeCode(t.end))) return null;
                t.code >= o.CODE_G_START && (t.code = t.code - o.CODE_G_START, i |= 1 << 5 - r), e.push(t.code), n.push(t)
            }
            return o._determineParity(i, e) ? t : null
        }, r.prototype._determineParity = function (t, e) {
            var n, r;
            for (r = 0; r < this.CODE_FREQUENCY.length; r++)
                for (n = 0; n < this.CODE_FREQUENCY[r].length; n++)
                    if (t === this.CODE_FREQUENCY[r][n]) return e.unshift(r), e.push(n), !0;
            return !1
        }, r.prototype._convertToUPCA = function (t) {
            var e = [t[0]],
                n = t[t.length - 2];
            return e = n <= 2 ? e.concat(t.slice(1, 3)).concat([n, 0, 0, 0, 0]).concat(t.slice(3, 6)) : 3 === n ? e.concat(t.slice(1, 4)).concat([0, 0, 0, 0, 0]).concat(t.slice(4, 6)) : 4 === n ? e.concat(t.slice(1, 5)).concat([0, 0, 0, 0, 0, t[5]]) : e.concat(t.slice(1, 6)).concat([0, 0, 0, 0, n]), e.push(t[t.length - 1]), e
        }, r.prototype._checksum = function (t) {
            return o.a.prototype._checksum.call(this, this._convertToUPCA(t))
        }, r.prototype._findEnd = function (t, e) {
            return e = !0, o.a.prototype._findEnd.call(this, t, e)
        }, r.prototype._verifyTrailingWhitespace = function (t) {
            var e, n = this;
            if ((e = t.end + (t.end - t.start) / 2) < n._row.length && n._matchRange(t.end, e, 0)) return t
        }, e.a = r
    }, function (t, e, n) {
        "use strict";

        function r(t, e) {
            o.a.call(this, t, e)
        }
        var o = n(4),
            i = {
                FORMAT: {
                    value: "upc_a",
                    writeable: !1
                }
            };
        r.prototype = Object.create(o.a.prototype, i), r.prototype.constructor = r, r.prototype._decode = function () {
            var t = o.a.prototype._decode.call(this);
            return t && t.code && 13 === t.code.length && "0" === t.code.charAt(0) ? (t.code = t.code.substring(1), t) : null
        }, e.a = r
    }, function (t, e) {
        function n(t, e) {
            return t[0] = e[0], t[1] = e[1], t[2] = e[2], t[3] = e[3], t
        }
        t.exports = n
    }, function (t, e) {
        function n() {
            var t = new Float32Array(4);
            return t[0] = 1, t[1] = 0, t[2] = 0, t[3] = 1, t
        }
        t.exports = n
    }, function (t, e) {
        function n(t, e) {
            var n = e[0],
                r = e[1],
                o = e[2],
                i = e[3],
                a = n * i - o * r;
            return a ? (a = 1 / a, t[0] = i * a, t[1] = -r * a, t[2] = -o * a, t[3] = n * a, t) : null
        }
        t.exports = n
    }, function (t, e) {
        function n(t, e, n) {
            return t[0] = e[0] * n, t[1] = e[1] * n, t
        }
        t.exports = n
    }, function (t, e) {
        function n(t, e, n) {
            var r = e[0],
                o = e[1];
            return t[0] = n[0] * r + n[2] * o, t[1] = n[1] * r + n[3] * o, t
        }
        t.exports = n
    }, function (t, e) {
        function n(t) {
            var e = new Float32Array(3);
            return e[0] = t[0], e[1] = t[1], e[2] = t[2], e
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            var e = -1,
                n = null == t ? 0 : t.length;
            for (this.clear(); ++e < n;) {
                var r = t[e];
                this.set(r[0], r[1])
            }
        }
        var o = n(122),
            i = n(123),
            a = n(124),
            u = n(125),
            c = n(126);
        r.prototype.clear = o, r.prototype.delete = i, r.prototype.get = a, r.prototype.has = u, r.prototype.set = c, t.exports = r
    }, function (t, e, n) {
        function r(t) {
            var e = this.__data__ = new o(t);
            this.size = e.size
        }
        var o = n(10),
            i = n(149),
            a = n(150),
            u = n(151),
            c = n(152),
            s = n(153);
        r.prototype.clear = i, r.prototype.delete = a, r.prototype.get = u, r.prototype.has = c, r.prototype.set = s, t.exports = r
    }, function (t, e, n) {
        var r = n(5),
            o = r.Uint8Array;
        t.exports = o
    }, function (t, e) {
        function n(t, e, n) {
            switch (n.length) {
                case 0:
                    return t.call(e);
                case 1:
                    return t.call(e, n[0]);
                case 2:
                    return t.call(e, n[0], n[1]);
                case 3:
                    return t.call(e, n[0], n[1], n[2])
            }
            return t.apply(e, n)
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t, e) {
            var n = a(t),
                r = !n && i(t),
                f = !n && !r && u(t),
                d = !n && !r && !f && s(t),
                h = n || r || f || d,
                p = h ? o(t.length, String) : [],
                v = p.length;
            for (var _ in t) !e && !l.call(t, _) || h && ("length" == _ || f && ("offset" == _ || "parent" == _) || d && ("buffer" == _ || "byteLength" == _ || "byteOffset" == _) || c(_, v)) || p.push(_);
            return p
        }
        var o = n(107),
            i = n(18),
            a = n(2),
            u = n(44),
            c = n(15),
            s = n(45),
            f = Object.prototype,
            l = f.hasOwnProperty;
        t.exports = r
    }, function (t, e) {
        function n(t, e) {
            for (var n = -1, r = null == t ? 0 : t.length, o = Array(r); ++n < r;) o[n] = e(t[n], n, t);
            return o
        }
        t.exports = n
    }, function (t, e) {
        function n(t, e) {
            for (var n = -1, r = e.length, o = t.length; ++n < r;) t[o + n] = e[n];
            return t
        }
        t.exports = n
    }, function (t, e, n) {
        var r = n(0),
            o = Object.create,
            i = function () {
                function t() {}
                return function (e) {
                    if (!r(e)) return {};
                    if (o) return o(e);
                    t.prototype = e;
                    var n = new t;
                    return t.prototype = void 0, n
                }
            }();
        t.exports = i
    }, function (t, e, n) {
        function r(t, e, n, a, u) {
            var c = -1,
                s = t.length;
            for (n || (n = i), u || (u = []); ++c < s;) {
                var f = t[c];
                e > 0 && n(f) ? e > 1 ? r(f, e - 1, n, a, u) : o(u, f) : a || (u[u.length] = f)
            }
            return u
        }
        var o = n(90),
            i = n(128);
        t.exports = r
    }, function (t, e, n) {
        var r = n(117),
            o = r();
        t.exports = o
    }, function (t, e, n) {
        function r(t, e) {
            e = o(e, t);
            for (var n = 0, r = e.length; null != t && n < r;) t = t[i(e[n++])];
            return n && n == r ? t : void 0
        }
        var o = n(13),
            i = n(23);
        t.exports = r
    }, function (t, e) {
        function n(t, e) {
            return null != t && e in Object(t)
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            return i(t) && o(t) == a
        }
        var o = n(8),
            i = n(6),
            a = "[object Arguments]";
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return !(!a(t) || i(t)) && (o(t) ? p : s).test(u(t))
        }
        var o = n(25),
            i = n(132),
            a = n(0),
            u = n(155),
            c = /[\\^$.*+?()[\]{}|]/g,
            s = /^\[object .+?Constructor\]$/,
            f = Function.prototype,
            l = Object.prototype,
            d = f.toString,
            h = l.hasOwnProperty,
            p = RegExp("^" + d.call(h).replace(c, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$");
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return a(t) && i(t.length) && !!u[o(t)]
        }
        var o = n(8),
            i = n(26),
            a = n(6),
            u = {};
        u["[object Float32Array]"] = u["[object Float64Array]"] = u["[object Int8Array]"] = u["[object Int16Array]"] = u["[object Int32Array]"] = u["[object Uint8Array]"] = u["[object Uint8ClampedArray]"] = u["[object Uint16Array]"] = u["[object Uint32Array]"] = !0, u["[object Arguments]"] = u["[object Array]"] = u["[object ArrayBuffer]"] = u["[object Boolean]"] = u["[object DataView]"] = u["[object Date]"] = u["[object Error]"] = u["[object Function]"] = u["[object Map]"] = u["[object Number]"] = u["[object Object]"] = u["[object RegExp]"] = u["[object Set]"] = u["[object String]"] = u["[object WeakMap]"] = !1, t.exports = r
    }, function (t, e, n) {
        function r(t) {
            if (!o(t)) return a(t);
            var e = i(t),
                n = [];
            for (var r in t)("constructor" != r || !e && c.call(t, r)) && n.push(r);
            return n
        }
        var o = n(0),
            i = n(40),
            a = n(144),
            u = Object.prototype,
            c = u.hasOwnProperty;
        t.exports = r
    }, function (t, e, n) {
        function r(t, e, n, f, l) {
            t !== e && a(e, function (a, s) {
                if (c(a)) l || (l = new o), u(t, e, s, n, r, f, l);
                else {
                    var d = f ? f(t[s], a, s + "", t, e, l) : void 0;
                    void 0 === d && (d = a), i(t, s, d)
                }
            }, s)
        }
        var o = n(85),
            i = n(35),
            a = n(93),
            u = n(101),
            c = n(0),
            s = n(46);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e, n, r, y, m, x) {
            var b = t[n],
                E = e[n],
                C = x.get(E);
            if (C) return void o(t, n, C);
            var O = m ? m(b, E, n + "", t, e, x) : void 0,
                R = void 0 === O;
            if (R) {
                var A = f(E),
                    w = !A && d(E),
                    T = !A && !w && _(E);
                O = E, A || w || T ? f(b) ? O = b : l(b) ? O = u(b) : w ? (R = !1, O = i(E, !0)) : T ? (R = !1, O = a(E, !0)) : O = [] : v(E) || s(E) ? (O = b, s(b) ? O = g(b) : (!p(b) || r && h(b)) && (O = c(E))) : R = !1
            }
            R && (x.set(E, O), y(O, E, r, m, x), x.delete(E)), o(t, n, O)
        }
        var o = n(35),
            i = n(111),
            a = n(112),
            u = n(113),
            c = n(127),
            s = n(18),
            f = n(2),
            l = n(159),
            d = n(44),
            h = n(25),
            p = n(0),
            v = n(160),
            _ = n(45),
            g = n(164);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            return o(t, e, function (e, n) {
                return i(t, n)
            })
        }
        var o = n(103),
            i = n(158);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e, n) {
            for (var r = -1, u = e.length, c = {}; ++r < u;) {
                var s = e[r],
                    f = o(t, s);
                n(f, s) && i(c, a(s, t), f)
            }
            return c
        }
        var o = n(94),
            i = n(105),
            a = n(13);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            return a(i(t, e, o), t + "")
        }
        var o = n(43),
            i = n(41),
            a = n(42);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e, n, r) {
            if (!u(t)) return t;
            e = i(e, t);
            for (var s = -1, f = e.length, l = f - 1, d = t; null != d && ++s < f;) {
                var h = c(e[s]),
                    p = n;
                if (s != l) {
                    var v = d[h];
                    p = r ? r(v, h, d) : void 0, void 0 === p && (p = u(v) ? v : a(e[s + 1]) ? [] : {})
                }
                o(d, h, p), d = d[h]
            }
            return t
        }
        var o = n(36),
            i = n(13),
            a = n(15),
            u = n(0),
            c = n(23);
        t.exports = r
    }, function (t, e, n) {
        var r = n(156),
            o = n(37),
            i = n(43),
            a = o ? function (t, e) {
                return o(t, "toString", {
                    configurable: !0,
                    enumerable: !1,
                    value: r(e),
                    writable: !0
                })
            } : i;
        t.exports = a
    }, function (t, e) {
        function n(t, e) {
            for (var n = -1, r = Array(t); ++n < t;) r[n] = e(n);
            return r
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            if ("string" == typeof t) return t;
            if (a(t)) return i(t, r) + "";
            if (u(t)) return f ? f.call(t) : "";
            var e = t + "";
            return "0" == e && 1 / t == -c ? "-0" : e
        }
        var o = n(11),
            i = n(89),
            a = n(2),
            u = n(27),
            c = 1 / 0,
            s = o ? o.prototype : void 0,
            f = s ? s.toString : void 0;
        t.exports = r
    }, function (t, e) {
        function n(t) {
            return function (e) {
                return t(e)
            }
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            var e = new t.constructor(t.byteLength);
            return new o(e).set(new o(t)), e
        }
        var o = n(86);
        t.exports = r
    }, function (t, e, n) {
        (function (t) {
            function r(t, e) {
                if (e) return t.slice();
                var n = t.length,
                    r = s ? s(n) : new t.constructor(n);
                return t.copy(r), r
            }
            var o = n(5),
                i = "object" == typeof e && e && !e.nodeType && e,
                a = i && "object" == typeof t && t && !t.nodeType && t,
                u = a && a.exports === i,
                c = u ? o.Buffer : void 0,
                s = c ? c.allocUnsafe : void 0;
            t.exports = r
        }).call(e, n(29)(t))
    }, function (t, e, n) {
        function r(t, e) {
            var n = e ? o(t.buffer) : t.buffer;
            return new t.constructor(n, t.byteOffset, t.length)
        }
        var o = n(110);
        t.exports = r
    }, function (t, e) {
        function n(t, e) {
            var n = -1,
                r = t.length;
            for (e || (e = Array(r)); ++n < r;) e[n] = t[n];
            return e
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t, e, n, r) {
            var a = !n;
            n || (n = {});
            for (var u = -1, c = e.length; ++u < c;) {
                var s = e[u],
                    f = r ? r(n[s], t[s], s, n, t) : void 0;
                void 0 === f && (f = t[s]), a ? i(n, s, f) : o(n, s, f)
            }
            return n
        }
        var o = n(36),
            i = n(21);
        t.exports = r
    }, function (t, e, n) {
        var r = n(5),
            o = r["__core-js_shared__"];
        t.exports = o
    }, function (t, e, n) {
        function r(t) {
            return o(function (e, n) {
                var r = -1,
                    o = n.length,
                    a = o > 1 ? n[o - 1] : void 0,
                    u = o > 2 ? n[2] : void 0;
                for (a = t.length > 3 && "function" == typeof a ? (o--, a) : void 0, u && i(n[0], n[1], u) && (a = o < 3 ? void 0 : a, o = 1), e = Object(e); ++r < o;) {
                    var c = n[r];
                    c && t(e, c, r, a)
                }
                return e
            })
        }
        var o = n(104),
            i = n(129);
        t.exports = r
    }, function (t, e) {
        function n(t) {
            return function (e, n, r) {
                for (var o = -1, i = Object(e), a = r(e), u = a.length; u--;) {
                    var c = a[t ? u : ++o];
                    if (n(i[c], c, i) === !1) break
                }
                return e
            }
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            return a(i(t, void 0, o), t + "")
        }
        var o = n(157),
            i = n(41),
            a = n(42);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            var e = a.call(t, c),
                n = t[c];
            try {
                t[c] = void 0;
                var r = !0
            } catch (t) {}
            var o = u.call(t);
            return r && (e ? t[c] = n : delete t[c]), o
        }
        var o = n(11),
            i = Object.prototype,
            a = i.hasOwnProperty,
            u = i.toString,
            c = o ? o.toStringTag : void 0;
        t.exports = r
    }, function (t, e) {
        function n(t, e) {
            return null == t ? void 0 : t[e]
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t, e, n) {
            e = o(e, t);
            for (var r = -1, f = e.length, l = !1; ++r < f;) {
                var d = s(e[r]);
                if (!(l = null != t && n(t, d))) break;
                t = t[d]
            }
            return l || ++r != f ? l : !!(f = null == t ? 0 : t.length) && c(f) && u(d, f) && (a(t) || i(t))
        }
        var o = n(13),
            i = n(18),
            a = n(2),
            u = n(15),
            c = n(26),
            s = n(23);
        t.exports = r
    }, function (t, e, n) {
        function r() {
            this.__data__ = o ? o(null) : {}, this.size = 0
        }
        var o = n(16);
        t.exports = r
    }, function (t, e) {
        function n(t) {
            var e = this.has(t) && delete this.__data__[t];
            return this.size -= e ? 1 : 0, e
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            var e = this.__data__;
            if (o) {
                var n = e[t];
                return n === i ? void 0 : n
            }
            return u.call(e, t) ? e[t] : void 0
        }
        var o = n(16),
            i = "__lodash_hash_undefined__",
            a = Object.prototype,
            u = a.hasOwnProperty;
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            var e = this.__data__;
            return o ? void 0 !== e[t] : a.call(e, t)
        }
        var o = n(16),
            i = Object.prototype,
            a = i.hasOwnProperty;
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            var n = this.__data__;
            return this.size += this.has(t) ? 0 : 1, n[t] = o && void 0 === e ? i : e, this
        }
        var o = n(16),
            i = "__lodash_hash_undefined__";
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return "function" != typeof t.constructor || a(t) ? {} : o(i(t))
        }
        var o = n(91),
            i = n(39),
            a = n(40);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return a(t) || i(t) || !!(u && t && t[u])
        }
        var o = n(11),
            i = n(18),
            a = n(2),
            u = o ? o.isConcatSpreadable : void 0;
        t.exports = r
    }, function (t, e, n) {
        function r(t, e, n) {
            if (!u(n)) return !1;
            var r = typeof e;
            return !!("number" == r ? i(n) && a(e, n.length) : "string" == r && e in n) && o(n[e], t)
        }
        var o = n(17),
            i = n(24),
            a = n(15),
            u = n(0);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            if (o(t)) return !1;
            var n = typeof t;
            return !("number" != n && "symbol" != n && "boolean" != n && null != t && !i(t)) || (u.test(t) || !a.test(t) || null != e && t in Object(e))
        }
        var o = n(2),
            i = n(27),
            a = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
            u = /^\w*$/;
        t.exports = r
    }, function (t, e) {
        function n(t) {
            var e = typeof t;
            return "string" == e || "number" == e || "symbol" == e || "boolean" == e ? "__proto__" !== t : null === t
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            return !!i && i in t
        }
        var o = n(115),
            i = function () {
                var t = /[^.]+$/.exec(o && o.keys && o.keys.IE_PROTO || "");
                return t ? "Symbol(src)_1." + t : ""
            }();
        t.exports = r
    }, function (t, e) {
        function n() {
            this.__data__ = [], this.size = 0
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            var e = this.__data__,
                n = o(e, t);
            return !(n < 0) && (n == e.length - 1 ? e.pop() : a.call(e, n, 1), --this.size, !0)
        }
        var o = n(12),
            i = Array.prototype,
            a = i.splice;
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            var e = this.__data__,
                n = o(e, t);
            return n < 0 ? void 0 : e[n][1]
        }
        var o = n(12);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return o(this.__data__, t) > -1
        }
        var o = n(12);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            var n = this.__data__,
                r = o(n, t);
            return r < 0 ? (++this.size, n.push([t, e])) : n[r][1] = e, this
        }
        var o = n(12);
        t.exports = r
    }, function (t, e, n) {
        function r() {
            this.size = 0, this.__data__ = {
                hash: new o,
                map: new(a || i),
                string: new o
            }
        }
        var o = n(84),
            i = n(10),
            a = n(33);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            var e = o(this, t).delete(t);
            return this.size -= e ? 1 : 0, e
        }
        var o = n(14);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return o(this, t).get(t)
        }
        var o = n(14);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return o(this, t).has(t)
        }
        var o = n(14);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            var n = o(this, t),
                r = n.size;
            return n.set(t, e), this.size += n.size == r ? 0 : 1, this
        }
        var o = n(14);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            var e = o(t, function (t) {
                    return n.size === i && n.clear(), t
                }),
                n = e.cache;
            return e
        }
        var o = n(161),
            i = 500;
        t.exports = r
    }, function (t, e) {
        function n(t) {
            var e = [];
            if (null != t)
                for (var n in Object(t)) e.push(n);
            return e
        }
        t.exports = n
    }, function (t, e, n) {
        (function (t) {
            var r = n(38),
                o = "object" == typeof e && e && !e.nodeType && e,
                i = o && "object" == typeof t && t && !t.nodeType && t,
                a = i && i.exports === o,
                u = a && r.process,
                c = function () {
                    try {
                        return u && u.binding && u.binding("util")
                    } catch (t) {}
                }();
            t.exports = c
        }).call(e, n(29)(t))
    }, function (t, e) {
        function n(t) {
            return o.call(t)
        }
        var r = Object.prototype,
            o = r.toString;
        t.exports = n
    }, function (t, e) {
        function n(t, e) {
            return function (n) {
                return t(e(n))
            }
        }
        t.exports = n
    }, function (t, e) {
        function n(t) {
            var e = 0,
                n = 0;
            return function () {
                var a = i(),
                    u = o - (a - n);
                if (n = a, u > 0) {
                    if (++e >= r) return arguments[0]
                } else e = 0;
                return t.apply(void 0, arguments)
            }
        }
        var r = 800,
            o = 16,
            i = Date.now;
        t.exports = n
    }, function (t, e, n) {
        function r() {
            this.__data__ = new o, this.size = 0
        }
        var o = n(10);
        t.exports = r
    }, function (t, e) {
        function n(t) {
            var e = this.__data__,
                n = e.delete(t);
            return this.size = e.size, n
        }
        t.exports = n
    }, function (t, e) {
        function n(t) {
            return this.__data__.get(t)
        }
        t.exports = n
    }, function (t, e) {
        function n(t) {
            return this.__data__.has(t)
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t, e) {
            var n = this.__data__;
            if (n instanceof o) {
                var r = n.__data__;
                if (!i || r.length < u - 1) return r.push([t, e]), this.size = ++n.size, this;
                n = this.__data__ = new a(r)
            }
            return n.set(t, e), this.size = n.size, this
        }
        var o = n(10),
            i = n(33),
            a = n(34),
            u = 200;
        t.exports = r
    }, function (t, e, n) {
        var r = n(143),
            o = /^\./,
            i = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,
            a = /\\(\\)?/g,
            u = r(function (t) {
                var e = [];
                return o.test(t) && e.push(""), t.replace(i, function (t, n, r, o) {
                    e.push(r ? o.replace(a, "$1") : n || t)
                }), e
            });
        t.exports = u
    }, function (t, e) {
        function n(t) {
            if (null != t) {
                try {
                    return o.call(t)
                } catch (t) {}
                try {
                    return t + ""
                } catch (t) {}
            }
            return ""
        }
        var r = Function.prototype,
            o = r.toString;
        t.exports = n
    }, function (t, e) {
        function n(t) {
            return function () {
                return t
            }
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            return (null == t ? 0 : t.length) ? o(t, 1) : []
        }
        var o = n(92);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            return null != t && i(t, e, o)
        }
        var o = n(95),
            i = n(121);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return i(t) && o(t)
        }
        var o = n(24),
            i = n(6);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            if (!a(t) || o(t) != u) return !1;
            var e = i(t);
            if (null === e) return !0;
            var n = l.call(e, "constructor") && e.constructor;
            return "function" == typeof n && n instanceof n && f.call(n) == d
        }
        var o = n(8),
            i = n(39),
            a = n(6),
            u = "[object Object]",
            c = Function.prototype,
            s = Object.prototype,
            f = c.toString,
            l = s.hasOwnProperty,
            d = f.call(Object);
        t.exports = r
    }, function (t, e, n) {
        function r(t, e) {
            if ("function" != typeof t || null != e && "function" != typeof e) throw new TypeError(i);
            var n = function () {
                var r = arguments,
                    o = e ? e.apply(this, r) : r[0],
                    i = n.cache;
                if (i.has(o)) return i.get(o);
                var a = t.apply(this, r);
                return n.cache = i.set(o, a) || i, a
            };
            return n.cache = new(r.Cache || o), n
        }
        var o = n(34),
            i = "Expected a function";
        r.Cache = o, t.exports = r
    }, function (t, e, n) {
        var r = n(102),
            o = n(118),
            i = o(function (t, e) {
                return null == t ? {} : r(t, e)
            });
        t.exports = i
    }, function (t, e) {
        function n() {
            return !1
        }
        t.exports = n
    }, function (t, e, n) {
        function r(t) {
            return o(t, i(t))
        }
        var o = n(114),
            i = n(46);
        t.exports = r
    }, function (t, e, n) {
        function r(t) {
            return null == t ? "" : o(t)
        }
        var o = n(108);
        t.exports = r
    }, function (t, e, n) {
        t.exports = n(48)
    }])
});