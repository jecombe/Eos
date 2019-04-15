#include <eosio/eosio.hpp>

using namespace eosio;

class [[eosio::contract]] hello : public contract {
public:
    using contract::contract;
    
    [[eosio::action]]
    void hi(std::string txt) {
        print( "Hello, ", txt);
    }
};
