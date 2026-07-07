#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, token, Address, Env, Symbol, Vec};

#[derive(Clone)]
pub struct Donation {
    pub donor: Address,
    pub amount: i128,
    pub timestamp: u64,
    pub memo: Option<Symbol>,
}

#[contract]
pub struct DonationContract;

#[contractimpl]
impl DonationContract {
    /// Initialize donation contract
    pub fn init(env: Env, token: Address, beneficiary: Address) {
        let key = symbol_short!("init");
        if env.storage().instance().has(&key) {
            panic!("Contract already initialized");
        }
        env.storage().instance().set(&symbol_short!("token"), &token);
        env.storage().instance().set(&symbol_short!("beneficiary"), &beneficiary);
        env.storage().instance().set(&symbol_short!("total"), &0i128);
    }

    /// Make a donation
    pub fn donate(env: Env, donor: Address, amount: i128, memo: Option<Symbol>) -> bool {
        donor.require_auth();

        if amount <= 0 {
            panic!("Donation amount must be positive");
        }

        let token_address: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("token"))
            .unwrap_or_else(|| panic!("Token not set"));

        let beneficiary: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("beneficiary"))
            .unwrap_or_else(|| panic!("Beneficiary not set"));

        let token = token::Client::new(&env, &token_address);
        token.transfer(&donor, &beneficiary, &amount);

        // Update total donations
        let current_total: i128 = env
            .storage()
            .instance()
            .get(&symbol_short!("total"))
            .unwrap_or(0);
        env.storage()
            .instance()
            .set(&symbol_short!("total"), &(current_total + amount));

        env.events().publish(
            (symbol_short!("donation"),),
            (&donor, &amount, &memo),
        );

        true
    }

    /// Get total donations
    pub fn total_donations(env: Env) -> i128 {
        env.storage()
            .instance()
            .get(&symbol_short!("total"))
            .unwrap_or(0)
    }

    /// Get beneficiary address
    pub fn beneficiary(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&symbol_short!("beneficiary"))
            .unwrap_or_else(|| panic!("Beneficiary not set"))
    }
}
