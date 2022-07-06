const fs = require('fs');
const idl = require('./metaplex_anchor_nft.json');

fs.writeFileSync('./src/idl.json', JSON.stringify(idl));