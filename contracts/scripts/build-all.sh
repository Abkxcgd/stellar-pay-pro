#!/bin/bash

# Deploy all contracts
echo "Deploying StellarPay Pro Smart Contracts..."

contracts=("payment_contract" "donation_contract" "campaign_contract" "recurring_payment_contract")

for contract in "${contracts[@]}"; do
  echo ""
  echo "Building $contract..."
  cd contracts/$contract
  cargo build --target wasm32-unknown-unknown --release
  
  if [ $? -eq 0 ]; then
    echo "✓ $contract built successfully"
  else
    echo "✗ Failed to build $contract"
    exit 1
  fi
  cd ../..
done

echo ""
echo "All contracts built successfully!"
echo "Ready for deployment to Stellar testnet"
