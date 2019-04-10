
function createKeys(){

const Eos = require("eosjs");
Eos.modules.ecc.randomKey().then(private =>
  console.log({ private, public: Eos.modules.ecc.privateToPublic(private) }))
}

createKeys();