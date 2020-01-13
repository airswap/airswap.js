"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crawlNFTItem = exports.crawlToken = void 0;

var crawlToken = function crawlToken(address) {
  var forceUIApproval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  return {
    type: 'CRAWL_TOKEN',
    address: address,
    forceUIApproval: forceUIApproval
  };
};

exports.crawlToken = crawlToken;

var crawlNFTItem = function crawlNFTItem(address, id) {
  return {
    type: 'CRAWL_NFT_ITEM',
    address: address,
    id: id
  };
};

exports.crawlNFTItem = crawlNFTItem;