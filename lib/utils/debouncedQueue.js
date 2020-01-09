"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var _ = require('lodash');

var DebouncedQueue =
/*#__PURE__*/
function () {
  function DebouncedQueue(processQueue) {
    var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 250;

    _classCallCheck(this, DebouncedQueue);

    this.queue = [];
    this.processQueue = processQueue;
    this.debouncedProcessAndEmptyQueue = _.debounce(this.processAndEmptyQueue.bind(this), delay, {
      leading: true,
      trailing: true
    });
  }

  _createClass(DebouncedQueue, [{
    key: "push",
    value: function push(item) {
      if (_.isArray(item)) {
        this.queue = [].concat(_toConsumableArray(item), _toConsumableArray(this.queue));
      } else {
        this.queue = [item].concat(_toConsumableArray(this.queue));
      }

      this.debouncedProcessAndEmptyQueue();
    }
  }, {
    key: "processAndEmptyQueue",
    value: function processAndEmptyQueue() {
      this.processQueue(this.queue);
      this.queue = [];
    }
  }]);

  return DebouncedQueue;
}();

module.exports = DebouncedQueue;