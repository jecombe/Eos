const Eos = require('eosjs');

let createKeys = function () {
    return Eos.modules.ecc.randomKey().then(private => (({ private, public: Eos.modules.ecc.privateToPublic(private) })));
}
let createAccount = createKeys();

createAccount.then(function (result) {

    const config1 = {
        chainId: "e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473", // 32 byte (64 char) hex string
        keyProvider: ['5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3'], // WIF string or array of keys..
        httpEndpoint: 'http://jungle2.cryptolions.io:80', // jungle testnet
        expireInSeconds: 60,
        broadcast: true,
        verbose: false, // API activity
        sign: true
    };

    options = {
        authorization: 'aqsxcdfreswx@active', 
        broadcast: true,
        sign: true,
    }
    // connects to localhost
    const eos = Eos(config1);

    eos.transaction(tr => {
        tr.newaccount({
            creator: 'aqsxcdfreswx',
            name: 'pockerotoken',
            owner: result.public,
            active: result.public
        })
        tr.buyrambytes({
            payer: 'aqsxcdfreswx',
            receiver: 'pockerotoken',
            bytes: 2996 
        });
    
        tr.delegatebw({
            from: 'aqsxcdfreswx',
            receiver: 'pockerotoken',
            stake_net_quantity: '1.0000 EOS', 
            stake_cpu_quantity: '1.0000 EOS', 
            transfer: 0
        });
    }, options)
});