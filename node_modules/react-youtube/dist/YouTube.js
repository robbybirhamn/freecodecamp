'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * Module dependencies
                                                                                                                                                                                                                                                                   */

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _uniqueId = require('lodash/uniqueId');

var _uniqueId2 = _interopRequireDefault(_uniqueId);

var _isEqual = require('lodash/isEqual');

var _isEqual2 = _interopRequireDefault(_isEqual);

var _youtubePlayer = require('youtube-player');

var _youtubePlayer2 = _interopRequireDefault(_youtubePlayer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Check whether a `props` change should result in the video being updated.
 *
 * @param {Object} prevProps
 * @param {Object} props
 */

function shouldUpdateVideo(prevProps, props) {
  // A changing video should always trigger an update
  if (prevProps.videoId !== props.videoId) {
    return true;
  }

  // Otherwise, a change in the start/end time playerVars also requires a player
  // update.
  var prevVars = prevProps.opts.playerVars || {};
  var vars = props.opts.playerVars || {};

  return prevVars.start !== vars.start || prevVars.end !== vars.end;
}

/**
 * Neutralise API options that only require a video update, leaving only options
 * that require a player reset. The results can then be compared to see if a
 * player reset is necessary.
 *
 * @param {Object} opts
 */

function filterResetOptions(opts) {
  return _extends({}, opts, {
    playerVars: _extends({}, opts.playerVars, {
      start: 0,
      end: 0
    })
  });
}

/**
 * Check whether a `props` change should result in the player being reset.
 * The player is reset when the `props.opts` change, except if the only change
 * is in the `start` and `end` playerVars, because a video update can deal with
 * those.
 *
 * @param {Object} prevProps
 * @param {Object} props
 */

function shouldResetPlayer(prevProps, props) {
  return !(0, _isEqual2.default)(filterResetOptions(prevProps.opts), filterResetOptions(props.opts));
}

/**
 * Create a new `YouTube` component.
 */

var YouTube = function (_React$Component) {
  _inherits(YouTube, _React$Component);

  /**
   * @param {Object} props
   */

  function YouTube(props) {
    _classCallCheck(this, YouTube);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YouTube).call(this, props));

    _this._containerId = props.id || (0, _uniqueId2.default)('player_');
    _this._internalPlayer = null;
    return _this;
  }

  _createClass(YouTube, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.createPlayer();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (shouldResetPlayer(prevProps, this.props)) {
        this.resetPlayer();
      }

      if (shouldUpdateVideo(prevProps, this.props)) {
        this.updateVideo();
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.destroyPlayer();
    }

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onReady
     *
     * @param {Object} event
     *   @param {Object} target - player object
     */

  }, {
    key: 'onPlayerReady',
    value: function onPlayerReady(event) {
      this.props.onReady(event);
    }

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onError
     *
     * @param {Object} event
     *   @param {Integer} data  - error type
     *   @param {Object} target - player object
     */

  }, {
    key: 'onPlayerError',
    value: function onPlayerError(event) {
      this.props.onError(event);
    }

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onStateChange
     *
     * @param {Object} event
     *   @param {Integer} data  - status change type
     *   @param {Object} target - actual YT player
     */

  }, {
    key: 'onPlayerStateChange',
    value: function onPlayerStateChange(event) {
      this.props.onStateChange(event);
      switch (event.data) {

        case window.YT.PlayerState.ENDED:
          this.props.onEnd(event);
          break;

        case window.YT.PlayerState.PLAYING:
          this.props.onPlay(event);
          break;

        case window.YT.PlayerState.PAUSED:
          this.props.onPause(event);
          break;

        default:
          return;
      }
    }

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onPlaybackRateChange
     *
     * @param {Object} event
     *   @param {Float} data    - playback rate
     *   @param {Object} target - actual YT player
     */

  }, {
    key: 'onPlayerPlaybackRateChange',
    value: function onPlayerPlaybackRateChange(event) {
      this.props.onPlaybackRateChange(event);
    }

    /**
     * https://developers.google.com/youtube/iframe_api_reference#onPlaybackQualityChange
     *
     * @param {Object} event
     *   @param {String} data   - playback quality
     *   @param {Object} target - actual YT player
     */

  }, {
    key: 'onPlayerPlaybackQualityChange',
    value: function onPlayerPlaybackQualityChange(event) {
      this.props.onPlaybackQualityChange(event);
    }
  }, {
    key: 'createPlayer',
    value: function createPlayer() {
      // do not attempt to create a player server-side, it won't work
      if (typeof document === 'undefined') return;
      // create player
      var playerOpts = _extends({}, this.props.opts, {
        // preload the `videoId` video if one is already given
        videoId: this.props.videoId
      });
      this._internalPlayer = (0, _youtubePlayer2.default)(this._containerId, playerOpts);
      // attach event handlers
      this._internalPlayer.on('ready', this.onPlayerReady.bind(this));
      this._internalPlayer.on('error', this.onPlayerError.bind(this));
      this._internalPlayer.on('stateChange', this.onPlayerStateChange.bind(this));
      this._internalPlayer.on('playbackRateChange', this.onPlayerPlaybackRateChange.bind(this));
      this._internalPlayer.on('playbackQualityChange', this.onPlayerPlaybackQualityChange.bind(this));
    }
  }, {
    key: 'destroyPlayer',
    value: function destroyPlayer() {
      return this._internalPlayer.destroy();
    }
  }, {
    key: 'resetPlayer',
    value: function resetPlayer() {
      this.destroyPlayer().then(this.createPlayer.bind(this));
    }
  }, {
    key: 'updateVideo',
    value: function updateVideo() {
      if (typeof this.props.videoId === 'undefined' || this.props.videoId === null) {
        this._internalPlayer.stopVideo();
        return;
      }

      // set queueing options
      var autoplay = false;
      var opts = {
        videoId: this.props.videoId
      };
      if ('playerVars' in this.props.opts) {
        autoplay = this.props.opts.playerVars.autoplay === 1;
        if ('start' in this.props.opts.playerVars) {
          opts.startSeconds = this.props.opts.playerVars.start;
        }
        if ('end' in this.props.opts.playerVars) {
          opts.endSeconds = this.props.opts.playerVars.end;
        }
      }

      // if autoplay is enabled loadVideoById
      if (autoplay) {
        this._internalPlayer.loadVideoById(opts);
        return;
      }
      // default behaviour just cues the video
      this._internalPlayer.cueVideoById(opts);
    }

    /**
     * @returns Object
     */

  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement('div', { id: this._containerId, className: this.props.className });
    }
  }]);

  return YouTube;
}(_react2.default.Component);

/**
 * Expose `YouTube`
 */

YouTube.propTypes = {
  videoId: _react2.default.PropTypes.string,

  // custom ID for player element
  id: _react2.default.PropTypes.string,

  // custom class name for player element
  className: _react2.default.PropTypes.string,

  // https://developers.google.com/youtube/iframe_api_reference#Loading_a_Video_Player
  opts: _react2.default.PropTypes.object,

  // event subscriptions
  onReady: _react2.default.PropTypes.func,
  onError: _react2.default.PropTypes.func,
  onPlay: _react2.default.PropTypes.func,
  onPause: _react2.default.PropTypes.func,
  onEnd: _react2.default.PropTypes.func,
  onStateChange: _react2.default.PropTypes.func,
  onPlaybackRateChange: _react2.default.PropTypes.func,
  onPlaybackQualityChange: _react2.default.PropTypes.func
};
YouTube.defaultProps = {
  opts: {},
  onReady: function onReady() {},
  onError: function onError() {},
  onPlay: function onPlay() {},
  onPause: function onPause() {},
  onEnd: function onEnd() {},
  onStateChange: function onStateChange() {},
  onPlaybackRateChange: function onPlaybackRateChange() {},
  onPlaybackQualityChange: function onPlaybackQualityChange() {}
};
exports.default = YouTube;