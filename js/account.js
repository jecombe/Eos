const Eos = require('eosjs');

let createKeys = function () {
    return Eos.modules.ecc.randomKey().then(private => (({ private, public: Eos.modules.ecc.privateToPublic(private) })));
}
let createAccount = createKeys();

function randomNameAccount() {
    var chars = "12345abcdefghiklmnopqrstuvwxyz";
    var string_length = 12;
    var randomstring = '';
    for (var i = 0; i < string_length; i++) {
        var rnum = Math.floor(Math.random() * chars.length);
        randomstring += chars.substring(rnum, rnum + 1);
    }
    return (randomstring);
}

createAccount.then(function (result) {

    var nameNewAcct = randomNameAccount();

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
            name: nameNewAcct,
            owner: result.public,
            active: result.public
        })
        tr.buyrambytes({
            payer: 'aqsxcdfreswx',
            receiver: nameNewAcct,
            bytes: 2996
        });

        tr.delegatebw({
            from: 'aqsxcdfreswx',
            receiver: nameNewAcct,
            stake_net_quantity: '1.0000 EOS',
            stake_cpu_quantity: '1.0000 EOS',
            transfer: 0
        });
        console.log("NAME: ", nameNewAcct, "PUBLIC KEY:", result.public, "PRIVATE KEY:", result.private);
    }, options)//.then( (resp) =>{
       //console.log("=====================================> ", resp)});
});