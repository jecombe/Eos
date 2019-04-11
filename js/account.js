const Eos = require('eosjs');

let createKeys = function () {
    return Eos.modules.ecc.randomKey().then(private => (({ public: Eos.modules.ecc.privateToPublic(private) })));
}
let createAccount = createKeys();

createAccount.then(function (result) {

    const config1 = {
        chainId: "", // 32 byte (64 char) hex string
        keyProvider: [''], // WIF string or array of keys..
        httpEndpoint: '', // jungle testnet
        expireInSeconds: 60,
        broadcast: true,
        verbose: false, // API activity
        sign: true
    };

    options = {
        authorization: '@active', 
        broadcast: true,
        sign: true,
    }
    // connects to localhost
    const eos = Eos(config1);


    eos.transaction(tr => {
        tr.newaccount({
            creator: '',
            name: '',
            owner: result.public,
            active: result.public
        })
        tr.buyrambytes({
            payer: '',
            receiver: '',
            bytes: 2996 
        });
    
        tr.delegatebw({
            from: '',
            receiver: '',
            stake_net_quantity: '1.0000 EOS', 
            stake_cpu_quantity: '1.0000 EOS', 
            transfer: 0
        });
    }, options)
});