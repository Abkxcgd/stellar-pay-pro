#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, token, Address, Env, Symbol};

#[contract]
pub struct RecurringPaymentContract;

#[contractimpl]
impl RecurringPaymentContract {
    /// Initialize recurring payment
    pub fn init(env: Env, token: Address, payer: Address, payee: Address, amount: i128, interval: u64) {
        if amount <= 0 {
            panic!("Amount must be positive");
        }
        if interval == 0 {
            panic!("Interval must be positive");
        }

        env.storage().instance().set(&symbol_short!("token"), &token);
        env.storage().instance().set(&symbol_short!("payer"), &payer);
        env.storage().instance().set(&symbol_short!("payee"), &payee);
        env.storage().instance().set(&symbol_short!("amount"), &amount);
        env.storage().instance().set(&symbol_short!("interval"), &interval);
        env.storage().instance().set(&symbol_short!("last_paid"), &0u64);
        env.storage().instance().set(&symbol_short!("active"), &true);
    }

    /// Execute payment if interval has passed
    pub fn execute_payment(env: Env) -> bool {
        let payer: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("payer"))
            .unwrap_or_else(|| panic!("Payer not set"));

        let payee: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("payee"))
            .unwrap_or_else(|| panic!("Payee not set"));

        let active: bool = env
            .storage()
            .instance()
            .get(&symbol_short!("active"))
            .unwrap_or(false);

        if !active {
            panic!("Payment is not active");
        }

        let last_paid: u64 = env
            .storage()
            .instance()
            .get(&symbol_short!("last_paid"))
            .unwrap_or(0);

        let interval: u64 = env
            .storage()
            .instance()
            .get(&symbol_short!("interval"))
            .unwrap_or_else(|| panic!("Interval not set"));

        let now = env.ledger().timestamp();
        if now < last_paid + interval {
            panic!("Payment interval not yet reached");
        }

        let amount: i128 = env
            .storage()
            .instance()
            .get(&symbol_short!("amount"))
            .unwrap_or_else(|| panic!("Amount not set"));

        let token_address: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("token"))
            .unwrap_or_else(|| panic!("Token not set"));

        let token = token::Client::new(&env, &token_address);
        token.transfer(&payer, &payee, &amount);

        env.storage()
            .instance()
            .set(&symbol_short!("last_paid"), &now);

        env.events().publish(
            (symbol_short!("payment"),),
            (&payer, &payee, &amount),
        );

        true
    }

    /// Cancel recurring payment
    pub fn cancel(env: Env) {
        let payer: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("payer"))
            .unwrap_or_else(|| panic!("Payer not set"));

        payer.require_auth();
        env.storage().instance().set(&symbol_short!("active"), &false);

        env.events().publish((symbol_short!("cancelled"),), &payer);
    }
}
