export const crawlToken = address => ({
  type: 'CRAWL_TOKEN',
  address,
})

export const crawlNFTItem = (address, id) => ({
  type: 'CRAWL_NFT_ITEM',
  address,
  id,
})
