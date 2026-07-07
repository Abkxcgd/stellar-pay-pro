#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, token, Address, Env, Symbol, Vec};

#[derive(Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
#[repr(u32)]
pub enum DataKey {
    Total = 0,
    Balance = 1,
}

#[contract]
pub struct PaymentContract;

#[contractimpl]
impl PaymentContract {
    /// Initialize the contract with token and admin
    pub fn init(env: Env, token: Address, admin: Address) {
        let key = symbol_short!("init");
        if env.storage().instance().has(&key) {
            panic!("Contract already initialized");
        }
        env.storage().instance().set(&key, &admin);
        env.storage().instance().set(&symbol_short!("token"), &token);
    }

    /// Get contract admin
    pub fn admin(env: Env) -> Address {
        env.storage()
            .instance()
            .get(&symbol_short!("admin"))
            .unwrap_or_else(|| panic!("Admin not set"))
    }

    /// Transfer tokens from sender to recipient
    pub fn transfer(
        env: Env,
        from: Address,
        to: Address,
        amount: i128,
        memo: Option<Symbol>,
    ) -> bool {
        from.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        let token_address: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("token"))
            .unwrap_or_else(|| panic!("Token not set"));

        let token = token::Client::new(&env, &token_address);
        token.transfer(&from, &to, &amount);

        env.events().publish(
            (symbol_short!("transfer"),),
            (from, to, amount, memo),
        );

        true
    }

    /// Get total transferred amount
    pub fn total_transferred(env: Env) -> i128 {
        env.storage()
            .instance()
            .get(&symbol_short!("total"))
            .unwrap_or(0)
    }

    /// Get balance of an address
    pub fn balance(env: Env, account: Address) -> i128 {
        env.storage()
            .persistent()
            .get(&(DataKey::Balance, account))
            .unwrap_or(0)
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use soroban_sdk::testutils::{Address as TestAddress, MockAuthInvoke};

    #[test]
    fn test_init() {
        let env = soroban_sdk::Env::default();
        let contract_id = env.register_contract(None, PaymentContract);
        let admin = TestAddress::random(&env);
        let token = TestAddress::random(&env);

        let client = soroban_sdk::contractclient::Client::new(&env, &contract_id);
        // client.init(&admin, &token);
    }
}
