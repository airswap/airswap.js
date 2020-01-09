"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.crawlNFTItem = exports.crawlToken = void 0;

var crawlToken = function crawlToken(address) {
  return {
    type: 'CRAWL_TOKEN',
    address: address
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