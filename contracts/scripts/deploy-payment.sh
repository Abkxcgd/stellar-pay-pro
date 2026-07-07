#!/bin/bash

# Deploy payment contract
echo "Building payment contract..."
cd contracts/payment_contract
cargo build --target wasm32-unknown-unknown --release

echo "Deploying payment contract..."
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/payment_contract.wasm \
  --source-account $STELLAR_ACCOUNT \
  --network testnet

echo "Payment contract deployed successfully!"
