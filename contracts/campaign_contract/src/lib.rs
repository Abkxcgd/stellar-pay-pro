#![no_std]
use soroban_sdk::{contract, contractimpl, symbol_short, token, Address, Env, Symbol};

#[derive(Clone, Copy, PartialEq, Eq)]
#[repr(u32)]
pub enum CampaignStatus {
    Active = 0,
    Completed = 1,
    Cancelled = 2,
}

#[contract]
pub struct CampaignContract;

#[contractimpl]
impl CampaignContract {
    /// Initialize campaign
    pub fn init(env: Env, token: Address, creator: Address, goal: i128) {
        if goal <= 0 {
            panic!("Goal must be positive");
        }

        let key = symbol_short!("init");
        if env.storage().instance().has(&key) {
            panic!("Contract already initialized");
        }

        env.storage().instance().set(&symbol_short!("token"), &token);
        env.storage().instance().set(&symbol_short!("creator"), &creator);
        env.storage().instance().set(&symbol_short!("goal"), &goal);
        env.storage().instance().set(&symbol_short!("raised"), &0i128);
        env.storage().instance().set(&symbol_short!("status"), &(CampaignStatus::Active as u32));
    }

    /// Contribute to campaign
    pub fn contribute(env: Env, contributor: Address, amount: i128) -> bool {
        contributor.require_auth();

        if amount <= 0 {
            panic!("Amount must be positive");
        }

        let status: u32 = env
            .storage()
            .instance()
            .get(&symbol_short!("status"))
            .unwrap_or_else(|| panic!("Status not set"));

        if status != CampaignStatus::Active as u32 {
            panic!("Campaign is not active");
        }

        let token_address: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("token"))
            .unwrap_or_else(|| panic!("Token not set"));

        let creator: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("creator"))
            .unwrap_or_else(|| panic!("Creator not set"));

        let token = token::Client::new(&env, &token_address);
        token.transfer(&contributor, &creator, &amount);

        let current_raised: i128 = env
            .storage()
            .instance()
            .get(&symbol_short!("raised"))
            .unwrap_or(0);

        let new_raised = current_raised + amount;
        env.storage()
            .instance()
            .set(&symbol_short!("raised"), &new_raised);

        env.events().publish(
            (symbol_short!("contribute"),),
            (&contributor, &amount),
        );

        true
    }

    /// Get campaign details
    pub fn campaign_info(env: Env) -> (Address, i128, i128, u32) {
        let creator: Address = env
            .storage()
            .instance()
            .get(&symbol_short!("creator"))
            .unwrap_or_else(|| panic!("Creator not set"));
        let goal: i128 = env
            .storage()
            .instance()
            .get(&symbol_short!("goal"))
            .unwrap_or_else(|| panic!("Goal not set"));
        let raised: i128 = env
            .storage()
            .instance()
            .get(&symbol_short!("raised"))
            .unwrap_or(0);
        let status: u32 = env
            .storage()
            .instance()
            .get(&symbol_short!("status"))
            .unwrap_or_else(|| panic!("Status not set"));

        (creator, goal, raised, status)
    }
}
