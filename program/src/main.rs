//! A simple program that takes a number `n` as input, and writes the `n-1`th and `n`th fibonacci
//! number as an output.

// These two lines are necessary for the program to properly compile.
//
// Under the hood, we wrap your main function with some extra code so that it behaves properly
// inside the zkVM.
#![no_main]
sp1_zkvm::entrypoint!(main);

use alloy_sol_types::SolType;
//use fibonacci_lib::{fibonacci, PublicValuesStruct};
use soar_lib::{reward, reward_calculator::RewardCalculator, types::PublicValuesStruct};

pub fn main() {
    // Read an input to the program.
    //
    // Behind the scenes, this compiles down to a custom system call which handles reading inputs
    // from the prover.
    let data = sp1_zkvm::io::read_vec();
    let mut reward_calculator = RewardCalculator::from(data);

    // Compute the n'th fibonacci number using a function from the workspace lib crate.
    let total_rewards = reward_calculator.calculate_reward();

    // Encode the output of the program.
    let pub_vals = PublicValuesStruct {
        user: reward_calculator.user.into(),
        total_rewards: total_rewards.into(),
        from_reward_event_hash: reward_calculator.claim.from_reward_event.hash().into(),
        to_reward_event_hash: reward_calculator.claim.to_reward_event.hash().into(),
        from_stake_event_hash: reward_calculator.claim.from_stake_event.hash().into(),
        to_stake_event_hash: reward_calculator.claim.to_stake_event.hash().into(),
        from_user_stake_event_hash: reward_calculator.claim.from_user_stake_event.hash().into(),
        to_user_stake_event_hash: reward_calculator.claim.to_user_stake_event.hash().into(),
    };

    // Encode the public values of the program.
    let bytes = PublicValuesStruct::abi_encode(&pub_vals);

    // Commit to the public values of the program. The final proof will have a commitment to all the
    // bytes that were committed to.
    sp1_zkvm::io::commit_slice(&bytes);
}
