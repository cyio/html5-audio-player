define("pages/music_player.js", [], function(t) {
    "use strict";
    function o(t) {
        this._o = {
            type: 0,
            src: "",
            mid: "",
            songId: "",
            autoPlay: !1,
            duration: 0,
            debug: !1,
            needVioceMutex: !0,
            appPlay: !0,
            title: "",
            singer: "",
            epname: "",
            coverImgUrl: "",
            webUrl: "",
            onStatusChange: function() {},
            onTimeupdate: function() {},
            onError: function() {}
        },
        this._extend(t),
        this._status = -1,
        this._g = {},
        0 !== l.surportType && (this._o.needVioceMutex && l.mutexPlayers.push(this),
        this._o.autoPlay && this.play());
    }
    function i(t) {
        _.invoke("musicPlay", {
            app_id: "a",
            title: "微信公众平台",
            singer: "微信公众平台",
            epname: "微信公众平台",
            coverImgUrl: "http://res.wx.qq.com/mpres/htmledition/images/favicon.ico",
            dataUrl: l.ev,
            lowbandUrl: l.ev,
            webUrl: "http://mp.weixin.qq.com/s?"
        }, function(o) {
            "function" == typeof t && t(o);
        }
        );
    }
    function e(t) {
        for (var o = 0, i = l.mutexPlayers.length; i > o; o++) {
            var e = l.mutexPlayers[o];
            e && "function" == typeof e._onPause && e != t && (e._h5Audio && "function" == typeof e._h5Audio.pause ? e._h5Audio.pause() : 1 == e.getSurportType() && e._pauseJsapiPlay(!1));
        }
    }
    function n() {
        return l.surportType;
    }
    function s(t) {
        return new o(t);
    }
    function a() {
        l.surportType > 0 && l.isAndroidLow && window.addEventListener("canplay", function(t) {
            t.target && "function" == typeof t.target.play && t.target.play();
        }
        , !0);
    }
    function u() {
        for (var t = 0, o = l.keyConf.length; o > t; t++) {
            var i = l.keyConf[t];
            l.reportData[i] = {
                key: t,
                count: 0
            };
        }
        h.on(window, "unload", r);
    }
    function r() {
        for (var t = 0, o = l.mutexPlayers.length; o > t; t++) {
            var i = l.mutexPlayers[t];
            if (i && 1 == i._status && 1 == i._surportType) {
                d(i._o.type, "unload_wx_pv", 1);
                break;
            }
        }
        p();
    }
    function p() {
        var t = l.reportId;
        if (1 == parseInt(10 * Math.random()) || l.debug) {
            for (var o in l.reportData) {
                var i = l.reportData[o];
                i.count > 0 && y.setSum(t, i.key, i.count);
            }
            y.send();
        }
    }
    function d(t, o, i) {
        0 == t || 1 == t ? o = "m_" + o : (2 == t || 3 == t) && (o = "v_" + o),
        l.reportData[o] && (i = i || 1,
        l.reportData[o].count += i,
        l.debug && console.log("addpv:" + o + " count:" + l.reportData[o].count));
    }
    var h = t("biz_common/dom/event.js")
      , _ = t("biz_wap/jsapi/core.js")
      , c = t("pages/version4video.js")
      , y = t("biz_common/utils/monitor.js")
      , l = {
        hasCheckJsapi: !1,
        ev: window._empty_v,
        isAndroidLow: /android\s2\.3/i.test(navigator.userAgent),
        surportType: "addEventListener" in window ? 2 : 0,
        mutexPlayers: [],
        reportId: "28306",
        keyConf: ["m_pv", "m_wx_pv", "m_h5_pv", "m_unload_wx_pv", "v_pv", "v_wx_pv", "v_h5_pv", "v_unload_wx_pv", "no_copyright", "copyright_cgi_err", "copyright_net_err", "copyright_timeout", "copyright_other_err"],
        reportData: {},
        debug: -1 != location.href.indexOf("&_debug=1") ? !0 : !1
    };
    return u(),
    a(),
    o.prototype._createAutoAndPlay = function() {
        if (this._h5Audio = document.createElement("audio"),
        this._H5bindEvent(),
        this._h5Audio.setAttribute("style", "height:0;width:0;display:none"),
        this._h5Audio.setAttribute("autoplay", ""),
        this._status = 0,
        l.isAndroidLow)
            this._h5Audio.src = this._o.src,
            document.body.appendChild(this._h5Audio),
            this._h5Audio.load();
        else {
            document.body.appendChild(this._h5Audio);
            var t = this;
            setTimeout(function() {
                t._h5Audio.src = t._o.src,
                t._h5Audio.play();
            }
            , 0);
        }
        this._surportType = 2;
    }
    ,
    o.prototype._destoryH5Audio = function() {
        this._h5Audio && "function" == typeof this._h5Audio.pause && (this._h5Audio.pause(),
        document.body.removeChild(this._h5Audio),
        this._h5Audio = null ,
        this._status = -1,
        this._surportType = 0);
    }
    ,
    o.prototype._createApp = function(t) {
        this._h5Audio && this._destoryH5Audio();
        var o = this
          , i = this._o;
        _.invoke("musicPlay", {
            app_id: "a",
            title: i.title,
            singer: i.singer,
            epname: i.epname,
            coverImgUrl: i.coverImgUrl,
            dataUrl: i.src,
            lowbandUrl: i.src,
            webUrl: i.webUrl
        }, function(e) {
            o._g.checkJsapiTimeoutId && clearTimeout(o._g.checkJsapiTimeoutId),
            e.err_msg.indexOf("ok") >= 0 ? (d(o._o.type, "wx_pv", 1),
            o._surportType = 1,
            l.surportType = 1,
            o.jsApiData && o.jsApiData.updateTimeoutId && clearTimeout(o.jsApiData.updateTimeoutId),
            o.jsApiData = {
                starTime: +new Date,
                curTime: 0,
                updateTimeoutId: null ,
                duration: i.duration || void 0
            },
            o._onPlay(),
            "undefined" != typeof i.duration && 1 * i.duration > 0 && o._analogUpdateTime()) : 2 === l.surportType ? o._h5Play(t) : o._onError({}, 15);
        }
        );
    }
    ,
    o.prototype._analogUpdateTime = function() {
        function t() {
            return i.curTime = 1 * ((+new Date - i.starTime) / 1e3).toFixed(2),
            i.curTime >= i.duration ? void o._stopJsapiPlay(!1) : (o._onTimeupdate(null , i.curTime),
            void (i.updateTimeoutId = setTimeout(function() {
                t();
            }
            , 1e3)));
        }
        var o = this
          , i = o.jsApiData;
        t();
    }
    ,
    o.prototype._onPlay = function(t) {
        this._status = 1;
        try {
            e(this);
        } catch (t) {}
        "function" == typeof this._o.onStatusChange && this._o.onStatusChange.call(this, t || {}, this._status);
    }
    ,
    o.prototype._onPause = function(t) {
        this._status = 2,
        "function" == typeof this._o.onStatusChange && this._o.onStatusChange.call(this, t || {}, this._status);
    }
    ,
    o.prototype._onEnd = function(t) {
        this._status = 3,
        "function" == typeof this._o.onStatusChange && this._o.onStatusChange.call(this, t || {}, this._status);
    }
    ,
    o.prototype._onLoadedmetadata = function(t) {
        "function" == typeof this._o.onLoadedmetadata && this._o.onLoadedmetadata.call(this, t || {});
    }
    ,
    o.prototype._onTimeupdate = function(t, o) {
        "function" == typeof this._o.onTimeupdate && this._o.onTimeupdate.call(this, t || {}, o);
    }
    ,
    o.prototype._onError = function(t, o) {
        this._status = -1,
        "function" == typeof this._o.onError && this._o.onError.call(this, t || {}, o);
    }
    ,
    o.prototype._H5bindEvent = function() {
        var t = this;
        this._h5Audio.addEventListener("play", function(o) {
            t._onPlay(o);
        }
        , !1),
        this._h5Audio.addEventListener("ended", function(o) {
            t._onEnd(o);
        }
        , !1),
        this._h5Audio.addEventListener("pause", function(o) {
            t._onPause(o);
        }
        , !1),
        this._h5Audio.addEventListener("error", function(o) {
            var i = o.target.error.code;
            (1 > i || i > 5) && (i = 5),
            t._onError(o, i);
        }
        , !1),
        "function" == typeof this._o.onTimeupdate && this._h5Audio.addEventListener("timeupdate", function(o) {
            t._onTimeupdate(o, t._h5Audio.currentTime);
        }
        , !1),
        "function" == typeof this._o.onLoadedmetadata && this._h5Audio.addEventListener("loadedmetadata", function(o) {
            t._onLoadedmetadata(o);
        }
        , !1);
    }
    ,
    o.prototype._extend = function(t) {
        for (var o in t)
            this._o[o] = t[o];
    }
    ,
    o.prototype._pauseJsapiPlay = function(t) {
        this._stopJsapiPlay(t);
    }
    ,
    o.prototype._stopJsapiPlay = function(t) {
        function o() {
            n.updateTimeoutId && clearTimeout(n.updateTimeoutId),
            n.updateTimeoutId = null ,
            n.curTime = 0,
            e._onTimeupdate(null , 0),
            e._onEnd();
        }
        var e = this
          , n = e.jsApiData;
        t ? i(function() {
            o();
        }
        ) : o();
    }
    ,
    o.prototype._h5Play = function(t) {
        (2 === l.surportType || !this._o.appPlay && 1 === l.surportType) && (d(this._o.type, "h5_pv", 1),
        this._h5Audio ? (this._h5Audio.ended || this._h5Audio.paused) && (this._h5Audio.ended && (this._h5Audio.currentTime = 0),
        "undefined" != typeof t ? (this._h5Audio.currentTime = t,
        this._h5Audio.play()) : this._h5Audio.play()) : this._createAutoAndPlay());
    }
    ,
    o.prototype.getSurportType = function() {
        return this._surportType || 0;
    }
    ,
    o.prototype.getPlayStatus = function() {
        return this._status;
    }
    ,
    o.prototype.getCurTime = function() {
        return 1 == this._surportType && this.jsApiData ? this.jsApiData.curTime || 0 : this._h5Audio ? this._h5Audio.currentTime : 0;
    }
    ,
    o.prototype.getDuration = function() {
        return 1 == this._surportType && this.jsApiData ? this.jsApiData.duration || void 0 : this._h5Audio ? this._h5Audio.duration || this._o.duration : void 0;
    }
    ,
    o.prototype.pause = function() {
        1 == this._surportType ? this._pauseJsapiPlay(!0) : 2 == this._surportType && this._h5Audio && "function" == typeof this._h5Audio.pause && this._h5Audio.pause();
    }
    ,
    o.prototype.stop = function() {
        2 == this._surportType && this._h5Audio ? (this._h5Audio.pause(),
        this._h5Audio.currentTime = 0,
        this._onEnd()) : 1 == this._surportType && this._stopJsapiPlay(!0);
    }
    ,
    o.prototype.play = function(t) {
        var o = this
          , i = this._g;
        d(this._o.type, "pv", 1),
        i.checkJsapiTimeoutId && clearTimeout(i.checkJsapiTimeoutId),
        c.device.inWechat && this._o.appPlay ? 1 != this._status && (this._createApp(t),
        i.checkJsapiTimeoutId = setTimeout(function() {
            o._h5Play(t);
        }
        , 1e3)) : this._h5Play(t);
    }
    ,
    o.prototype.monitor = function(t, o) {
        d(-1, t, o);
    }
    ,
    {
        init: s,
        getSurportType: n
    };
}
)
//# sourceURL=pages/music_player.js
