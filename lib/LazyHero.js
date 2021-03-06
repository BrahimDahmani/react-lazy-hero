'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n'], ['\n    position: absolute;\n    top: 0;\n    right: 0;\n    bottom: 0;\n    left: 0;\n']),
    _templateObject2 = _taggedTemplateLiteral(['\n    position: relative;\n    min-height: ', ';\n'], ['\n    position: relative;\n    min-height: ', ';\n']),
    _templateObject3 = _taggedTemplateLiteral(['\n    background-attachment: ', ';\n    background-image: url(', ');\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: ', ';\n    opacity: ', ';\n    transition-duration: ', ';\n    transition-property: opacity;\n    transition-timing-function: ', ';\n'], ['\n    background-attachment: ', ';\n    background-image: url(', ');\n    background-position: center;\n    background-repeat: no-repeat;\n    background-size: ', ';\n    opacity: ', ';\n    transition-duration: ', ';\n    transition-property: opacity;\n    transition-timing-function: ', ';\n']),
    _templateObject4 = _taggedTemplateLiteral(['\n    display: flex;\n    justify-content: ', ';\n    align-items: ', ';\n    text-align: ', ';\n    background-color: ', ';\n'], ['\n    display: flex;\n    justify-content: ', ';\n    align-items: ', ';\n    text-align: ', ';\n    background-color: ', ';\n']);

var _color = require('color');

var _color2 = _interopRequireDefault(_color);

var _inViewport = require('in-viewport');

var _inViewport2 = _interopRequireDefault(_inViewport);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _styledComponents = require('styled-components');

var _styledComponents2 = _interopRequireDefault(_styledComponents);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

var Cover = _styledComponents2.default.div(_templateObject);

var Root = _styledComponents2.default.div(_templateObject2, function (props) {
    return props.minHeight;
});

var Img = (0, _styledComponents2.default)(Cover)(_templateObject3, function (props) {
    return props.isFixed ? 'fixed' : 'scroll';
}, function (props) {
    return props.src;
}, function (props) {
    return props.width ? props.width + 'px ' + props.height + 'px' : 'cover';
}, function (props) {
    return props.isVisible ? 1 : 0;
}, function (props) {
    return props.transitionDuration + 'ms';
}, function (props) {
    return props.transitionTimingFunction;
});

var Overlay = (0, _styledComponents2.default)(Cover)(_templateObject4, function (props) {
    return props.isCentered ? 'center' : 'flex-start';
}, function (props) {
    return props.isCentered ? 'center' : 'stretch';
}, function (props) {
    return props.isCentered ? 'center' : 'left';
}, function (props) {
    return (0, _color2.default)(props.color).alpha(props.opacity).rgb().string();
});

var LazyHero = function (_Component) {
    _inherits(LazyHero, _Component);

    function LazyHero() {
        _classCallCheck(this, LazyHero);

        var _this = _possibleConstructorReturn(this, (LazyHero.__proto__ || Object.getPrototypeOf(LazyHero)).call(this));

        _this.state = {
            backgroundPositionY: 'center',
            backgroundDimensions: null,
            heroDimensions: null,
            image: null,
            isInViewport: false
        };
        _this.handleResize = _this.handleResize.bind(_this);
        _this.handleScroll = _this.handleScroll.bind(_this);
        _this.updatePosition = _this.updatePosition.bind(_this);
        _this.updateSize = _this.updateSize.bind(_this);
        return _this;
    }

    _createClass(LazyHero, [{
        key: 'componentDidMount',
        value: function componentDidMount() {
            var _this2 = this;

            (0, _inViewport2.default)(this.ref, function () {
                return _this2.setState({ isInViewport: true });
            });

            var image = new Image();
            image.src = this.props.imageSrc;
            image.onload = function () {
                _this2.setState({ image: image });

                if (_this2.props.parallaxOffset > 0) {
                    _this2.updateSize();
                    _this2.updatePosition();
                }
            };

            if (this.props.parallaxOffset > 0) {
                window.addEventListener('scroll', this.handleScroll);
                window.addEventListener('resize', this.handleResize);
            }
        }
    }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
            if (this.props.parallaxOffset > 0) {
                window.removeEventListener('scroll', this.handleScroll);
                window.removeEventListener('resize', this.handleResize);
            }
        }
    }, {
        key: 'handleScroll',
        value: function handleScroll() {
            this.updatePosition();
        }
    }, {
        key: 'handleResize',
        value: function handleResize() {
            this.updateSize();
            this.updatePosition();
        }
    }, {
        key: 'updateSize',
        value: function updateSize() {
            if (!this.state.image) return;

            var heroDimensions = {
                height: this.ref.offsetHeight,
                width: this.ref.offsetWidth
            };

            var imageDimensions = {
                height: this.state.image.height,
                width: this.state.image.width
            };

            var resizedImage = (0, _utils.resizeToCover)(imageDimensions, heroDimensions);
            var initialVisibleImageHeight = resizedImage.height - this.props.parallaxOffset;

            var minHeight = initialVisibleImageHeight < heroDimensions.height ? resizedImage.height + heroDimensions.height - initialVisibleImageHeight : resizedImage.height;

            var finalHeight = minHeight + this.ref.offsetTop * 2;

            var backgroundDimensions = (0, _utils.resizeToCover)(imageDimensions, { height: finalHeight });
            this.setState({ backgroundDimensions: backgroundDimensions, heroDimensions: heroDimensions });
        }
    }, {
        key: 'updatePosition',
        value: function updatePosition() {
            if (!this.state.backgroundDimensions) return;
            var position = 0 + this.ref.offsetTop
            // Center image vertically
            - this.state.backgroundDimensions.height / 2 + this.state.heroDimensions.height / 2 - this.props.parallaxOffset / 2
            // Apply scroll position
            + this.props.parallaxOffset * (0, _utils.scrolledOverPercent)(this.ref);

            this.setState({ backgroundPositionY: Math.round(position) + 'px' });
        }
    }, {
        key: 'render',
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                backgroundDimensions = _state.backgroundDimensions,
                backgroundPositionY = _state.backgroundPositionY;


            return _react2.default.createElement(
                Root,
                {
                    className: this.props.className,
                    innerRef: function innerRef(r) {
                        _this3.ref = r;
                    },
                    minHeight: this.props.minHeight,
                    style: this.props.style
                },
                _react2.default.createElement(Img, {
                    height: backgroundDimensions && backgroundDimensions.height,
                    isVisible: this.state.image && this.state.isInViewport,
                    isFixed: this.props.isFixed || this.props.parallaxOffset > 0,
                    src: this.props.imageSrc,
                    style: { backgroundPositionY: backgroundPositionY },
                    transitionDuration: this.props.transitionDuration,
                    transitionTimingFunction: this.props.transitionTimingFunction,
                    width: backgroundDimensions && backgroundDimensions.width
                }),
                _react2.default.createElement(
                    Overlay,
                    {
                        color: this.props.color,
                        isCentered: this.props.isCentered,
                        opacity: this.props.opacity
                    },
                    this.props.children && _react2.default.createElement(
                        'div',
                        { style: { width: this.props.contentWidth } },
                        this.props.children
                    )
                )
            );
        }
    }]);

    return LazyHero;
}(_react.Component);

LazyHero.defaultProps = {
    children: undefined,
    className: undefined,
    color: '#fff',
    imageSrc: undefined,
    isCentered: true,
    isFixed: false,
    minHeight: '50vh',
    opacity: 0.8,
    parallaxOffset: 0,
    style: undefined,
    transitionDuration: 600,
    transitionTimingFunction: 'ease-in-out'
};

LazyHero.propTypes = {
    children: _propTypes2.default.node,
    className: _propTypes2.default.string,
    color: _propTypes2.default.string,
    imageSrc: _propTypes2.default.string,
    isCentered: _propTypes2.default.bool,
    isFixed: _propTypes2.default.bool,
    minHeight: _propTypes2.default.string,
    opacity: _propTypes2.default.number,
    parallaxOffset: _propTypes2.default.number,
    style: _propTypes2.default.object, // eslint-disable-line react/forbid-prop-types
    transitionDuration: _propTypes2.default.number,
    transitionTimingFunction: _propTypes2.default.string
};

exports.default = LazyHero;