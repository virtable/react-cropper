'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var React = require('react');
var Cropper = require('cropperjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var Cropper__default = /*#__PURE__*/_interopDefaultLegacy(Cropper);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var REQUIRED_IMAGE_STYLES = { opacity: 0, maxWidth: '100%' };
var applyDefaultOptions = function (cropper, options) {
    if (options === void 0) { options = {}; }
    var _a = options.enable, enable = _a === void 0 ? true : _a, _b = options.scaleX, scaleX = _b === void 0 ? 1 : _b, _c = options.scaleY, scaleY = _c === void 0 ? 1 : _c, _d = options.zoomTo, zoomTo = _d === void 0 ? 0 : _d, rotateTo = options.rotateTo;
    enable ? cropper.enable() : cropper.disable();
    cropper.scaleX(scaleX);
    cropper.scaleY(scaleY);
    rotateTo !== undefined && cropper.rotateTo(rotateTo);
    zoomTo > 0 && cropper.zoomTo(zoomTo);
};
/**
 * sourced from: https://itnext.io/reusing-the-ref-from-forwardref-with-react-hooks-4ce9df693dd
 */
var useCombinedRefs = function () {
    var refs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        refs[_i] = arguments[_i];
    }
    var targetRef = React.useRef(null);
    React__default["default"].useEffect(function () {
        refs.forEach(function (ref) {
            if (!ref)
                return;
            if (typeof ref === 'function') {
                ref(targetRef.current);
            }
            else {
                ref.current = targetRef.current;
            }
        });
    }, [refs]);
    return targetRef;
};
var ReactCropper = React__default["default"].forwardRef(function (_a, ref) {
    var props = __rest(_a, []);
    var _b = props.dragMode, dragMode = _b === void 0 ? 'crop' : _b, src = props.src, style = props.style, className = props.className, crossOrigin = props.crossOrigin, scaleX = props.scaleX, scaleY = props.scaleY, enable = props.enable, zoomTo = props.zoomTo, rotateTo = props.rotateTo, _c = props.alt, alt = _c === void 0 ? 'picture' : _c, ready = props.ready, onInitialized = props.onInitialized, rest = __rest(props, ["dragMode", "src", "style", "className", "crossOrigin", "scaleX", "scaleY", "enable", "zoomTo", "rotateTo", "alt", "ready", "onInitialized"]);
    var defaultOptions = { scaleY: scaleY, scaleX: scaleX, enable: enable, zoomTo: zoomTo, rotateTo: rotateTo };
    var innerRef = React.useRef(null);
    var combinedRef = useCombinedRefs(ref, innerRef);
    /**
     * Invoke zoomTo method when cropper is set and zoomTo prop changes
     */
    React.useEffect(function () {
        var _a;
        if (((_a = combinedRef.current) === null || _a === void 0 ? void 0 : _a.cropper) && typeof zoomTo === 'number') {
            combinedRef.current.cropper.zoomTo(zoomTo);
        }
    }, [props.zoomTo]);
    /**
     * re-render when src changes
     */
    React.useEffect(function () {
        var _a;
        if (((_a = combinedRef.current) === null || _a === void 0 ? void 0 : _a.cropper) && typeof src !== 'undefined') {
            combinedRef.current.cropper.reset().clear().replace(src);
        }
    }, [src]);
    React.useEffect(function () {
        if (combinedRef.current !== null) {
            var cropper = new Cropper__default["default"](combinedRef.current, __assign(__assign({ dragMode: dragMode }, rest), { ready: function (e) {
                    if (e.currentTarget !== null) {
                        applyDefaultOptions(e.currentTarget.cropper, defaultOptions);
                    }
                    ready && ready(e);
                } }));
            onInitialized && onInitialized(cropper);
        }
        /**
         * destroy cropper on un-mount
         */
        return function () {
            var _a, _b;
            (_b = (_a = combinedRef.current) === null || _a === void 0 ? void 0 : _a.cropper) === null || _b === void 0 ? void 0 : _b.destroy();
        };
    }, [combinedRef]);
    var imageProps = React__default["default"].useMemo(function () { return (__assign(__assign({}, rest), { crossOrigin: crossOrigin, src: src, alt: alt })); }, [rest, crossOrigin, src, alt]);
    return (React__default["default"].createElement("div", { style: style, className: className },
        React__default["default"].createElement("img", __assign({}, imageProps, { style: REQUIRED_IMAGE_STYLES, ref: combinedRef }))));
});

exports.Cropper = ReactCropper;
exports["default"] = ReactCropper;
