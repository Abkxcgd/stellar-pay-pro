# Soroban Smart Contracts for StellarPay Pro

## Overview

This directory contains production-ready Soroban smart contracts for the StellarPay Pro application.

### Contracts

#### 1. Payment Contract
- **Purpose**: Handle XLM transfers with optional memo
- **Key Functions**:
  - `transfer()`: Send XLM to any address
  - `balance()`: Check account balance
  - `total_transferred()`: Get total amount transferred

#### 2. Donation Contract
- **Purpose**: Manage charitable donations with tracking
- **Key Functions**:
  - `donate()`: Make a donation to beneficiary
  - `total_donations()`: Get total donations
  - `beneficiary()`: Get beneficiary address

#### 3. Campaign Contract
- **Purpose**: Manage crowdfunding campaigns
- **Key Functions**:
  - `init()`: Initialize campaign with goal
  - `contribute()`: Contribute to campaign
  - `campaign_info()`: Get campaign details

#### 4. Recurring Payment Contract
- **Purpose**: Automated recurring payments
- **Key Functions**:
  - `init()`: Set up recurring payment
  - `execute_payment()`: Execute payment if interval passed
  - `cancel()`: Cancel recurring payment

## Building

```bash
# Build all contracts
bash scripts/build-all.sh

# Build specific contract
cd payment_contract
cargo build --target wasm32-unknown-unknown --release
```

## Deployment

```bash
# Deploy to testnet
bash scripts/deploy-payment.sh
```

## Testing

```bash
# Run tests
cargo test
```
