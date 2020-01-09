"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var _require = require('ethers'),
    ethers = _require.ethers;

var _require2 = require('../constants'),
    constantAbis = _require2.abis,
    SWAP_CONTRACT_ADDRESS = _require2.SWAP_CONTRACT_ADDRESS,
    WRAPPER_CONTRACT_ADDRESS = _require2.WRAPPER_CONTRACT_ADDRESS;

var _ = require('lodash');

var BigNumber = require('bignumber.js');

BigNumber.config({
  ERRORS: false
});
BigNumber.config({
  EXPONENTIAL_AT: 1e9
}); //eslint-disable-line

function parseAmount(amount, precision) {
  var num = new BigNumber(Math.max(0, Number(amount)));
  return Number(num.toFixed(precision, BigNumber.ROUND_FLOOR));
}

function formatErrorMessage(error) {
  if (_.isObject(error) && error.message) {
    return error.message.split('\n')[0]; // sometimes metamask returns stacktraces and this removes them
  } else if (_.isString(error)) {
    return error;
  }

  return '';
}

function lowerCaseStringsInObject(obj) {
  return _.mapValues(obj, function (v) {
    return v.toLowerCase ? v.toLowerCase() : v;
  });
}

function stringBNValues(obj) {
  return _.mapValues(obj, function (v) {
    return v && v._ethersType === 'BigNumber' ? v.toString() : v;
  }); // eslint_disable_line
}

function recurseTuple(tuple) {
  if (tuple.components) {
    return _.zipObject(_.map(tuple.components, 'name'), _.map(tuple.components, recurseTuple));
  }

  return tuple.name;
}

function parseSwapParameters(parameters) {
  var order = parameters.order;

  if (!order) {
    return parameters;
  }

  var _order$split = order.split(','),
      _order$split2 = _slicedToArray(_order$split, 23),
      nonce = _order$split2[0],
      expiry = _order$split2[1],
      makerKind = _order$split2[2],
      makerWallet = _order$split2[3],
      makerToken = _order$split2[4],
      makerAmount = _order$split2[5],
      makerId = _order$split2[6],
      takerKind = _order$split2[7],
      takerWallet = _order$split2[8],
      takerToken = _order$split2[9],
      takerAmount = _order$split2[10],
      takerId = _order$split2[11],
      affiliateWallet = _order$split2[12],
      affiliateToken = _order$split2[13],
      affiliateAmount = _order$split2[14],
      affiliateId = _order$split2[15],
      affiliateKind = _order$split2[16],
      signatory = _order$split2[17],
      validator = _order$split2[18],
      version = _order$split2[19],
      v = _order$split2[20],
      r = _order$split2[21],
      s = _order$split2[22];

  return {
    nonce: nonce,
    expiry: expiry,
    makerWallet: makerWallet,
    makerToken: makerToken,
    makerAmount: makerAmount,
    makerId: makerId,
    makerKind: makerKind,
    takerWallet: takerWallet,
    takerToken: takerToken,
    takerAmount: takerAmount,
    takerId: takerId,
    takerKind: takerKind,
    affiliateWallet: affiliateWallet,
    affiliateToken: affiliateToken,
    affiliateAmount: affiliateAmount,
    affiliateId: affiliateId,
    affiliateKind: affiliateKind,
    signatory: signatory,
    validator: validator,
    v: v,
    r: r,
    s: s,
    version: version
  };
}

function getParsedInputFromTransaction(transaction) {
  var abis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : constantAbis;

  if (!(transaction && transaction.to)) {
    return {};
  }

  var to = transaction.to.toLowerCase();
  var abi = abis[to.toLowerCase()];

  if (!abi) {
    return {};
  }

  var contractInterface = new ethers.utils.Interface(abi);
  var data = transaction.data;
  var parsed = contractInterface.parseTransaction({
    data: data
  });
  var name = parsed.name;

  var parameterKeys = _.map(contractInterface.functions[name].inputs, 'name');

  var parameterValues = _.map(parsed.args, function (s) {
    return (s.toString ? s.toString() : s).toLowerCase();
  });

  var parameters = _.zipObject(parameterKeys, parameterValues);

  var value = ethers.utils.formatEther(transaction.value);
  return {
    name: name,
    parameters: to === SWAP_CONTRACT_ADDRESS || to === WRAPPER_CONTRACT_ADDRESS ? parseSwapParameters(parameters) : parameters,
    formattedETHValue: value
  };
}

function getTransactionDescription(transaction, tokensByAddress, getReadableOrder, getReadableSwapOrder) {
  var abis = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : constantAbis;

  if (!(transaction && transaction.to) || _.isEmpty(tokensByAddress)) {
    return '';
  }

  var to = transaction.to.toLowerCase();
  var contractInterface = new ethers.utils.Interface(abis[to]);
  var data = transaction.data;
  var parsed = contractInterface.parseTransaction({
    data: data
  });
  var name = parsed.name;

  var parameterKeys = _.map(contractInterface.functions[name].inputs, 'name');

  var parameterValues = _.map(parsed.args, function (s) {
    return (s.toString ? s.toString() : s).toLowerCase();
  });

  var parameters = _.zipObject(parameterKeys, parameterValues);

  var value = ethers.utils.formatEther(transaction.value);

  if (name === 'deposit') {
    return "Wrap ".concat(value, " ETH");
  } else if (name === 'withdraw') {
    return "Unwrap ".concat(ethers.utils.formatEther(parameters.amount), " WETH");
  } else if (name === 'approve') {
    var kind = _.get(tokensByAddress, "".concat(to, ".kind"));

    if (kind === 'ERC721') {
      return "Approve ".concat(_.get(tokensByAddress, "".concat(to, ".symbol")), " #").concat(parameters.id, " for trade");
    }

    return "Approve ".concat(_.get(tokensByAddress, "".concat(to, ".symbol")), " for trade");
  } else if (name === 'fill') {
    var order = getReadableOrder(parameters);
    return "Fill order for ".concat(order.tokenAmount, " ").concat(_.get(tokensByAddress, "".concat(order.tokenAddress, ".symbol")));
  } else if (name === 'swap' || name === 'provideOrder') {
    var _order = getReadableSwapOrder(parseSwapParameters(parameters));

    var takerToken = tokensByAddress[_order.takerToken.toLowerCase()];

    var makerToken = tokensByAddress[_order.makerToken.toLowerCase()];

    var takerSide = takerToken.kind === 'ERC721' ? "".concat(takerToken.symbol, " #").concat(_order.takerAmount, " ") : "".concat(_order.takerAmountFormatted, " ").concat(takerToken.symbol);
    var makerSide = takerToken.kind === 'ERC721' ? "".concat(makerToken.symbol, " #").concat(_order.makerAmount, " ") : "".concat(_order.makerAmountFormatted, " ").concat(makerToken.symbol);
    return "Fill order for ".concat(takerSide, " for ").concat(makerSide);
  } else if (name === 'authorizeSender') {
    return "Authorize sender";
  } else if (name === 'authorizedSigner') {
    return "Authorize signer";
  }

  return name;
}

function parseTransactionFailureEventCode(code) {
  switch (code) {
    case 1:
      return 'Invalid Order';

    case 2:
      return 'Expired';

    case 3:
      return 'Already Filled';

    case 4:
      return 'Invalid ETH Amount';

    case 5:
      return 'Invalid ETH Amount';

    case 6:
      return 'Sender is not Taker';

    case 7:
      return 'Order Cancelled';

    default:
      return '';
  }
}

function getTransactionTextStatus(transactionReceipt) {
  var textStatus = '';
  var eventStatus = '';
  var status = Number(_.get(transactionReceipt, 'status'));

  if (status !== 0 && !status) {
    textStatus = 'pending';
    return {
      textStatus: textStatus,
      eventStatus: eventStatus
    };
  }

  var events = _.get(transactionReceipt, 'events', []);

  var failedEvent = _.find(events, {
    event: 'Failed'
  });

  var eventCode = Number(_.get(failedEvent, 'args.code'));

  if (status === 0) {
    textStatus = 'Failed';
  } else if (status === 1 && eventCode) {
    textStatus = 'Failed';
    eventStatus = parseTransactionFailureEventCode(eventCode);
  } else if (status === 1) {
    textStatus = 'Confirmed';
  } else if (status === null) {
    textStatus = 'Pending';
  }

  return {
    textStatus: textStatus,
    eventStatus: eventStatus
  };
}

module.exports = {
  recurseTuple: recurseTuple,
  parseAmount: parseAmount,
  formatErrorMessage: formatErrorMessage,
  lowerCaseStringsInObject: lowerCaseStringsInObject,
  stringBNValues: stringBNValues,
  getParsedInputFromTransaction: getParsedInputFromTransaction,
  getTransactionDescription: getTransactionDescription,
  getTransactionTextStatus: getTransactionTextStatus,
  parseTransactionFailureEventCode: parseTransactionFailureEventCode
};