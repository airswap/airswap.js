export const crawlToken = (address, forceUIApproval = false) => ({
  type: 'CRAWL_TOKEN',
  address,
  forceUIApproval,
})

export const crawlNFTItem = (address, id) => ({
  type: 'CRAWL_NFT_ITEM',
  address,
  id,
})
