
let EOS = require('eosjs')

eos = EOS({
  chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473",
  keyProvider: ['5Ki85ZCsYnKkprB7CHJGTwMH9ke3CifB1GK1BroeKEckgjZu9GN'],
  httpEndpoint: 'http://jungle2.cryptolions.io:80'
})

eos.contract('vcfgtyhjukin').then((hello) => {
  hello.hi("salut", { authorization: ['vcfgtyhjukin@active'] }).then((res) => {

    var rep = JSON.stringify(res);
    console.log(rep.console);
  })
})