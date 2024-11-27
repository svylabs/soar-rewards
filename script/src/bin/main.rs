//! An end-to-end example of using the SP1 SDK to generate a proof of a program that can be executed
//! or have a core proof generated.
//!
//! You can run this script using the following command:
//! ```shell
//! RUST_LOG=info cargo run --release -- --execute
//! ```
//! or
//! ```shell
//! RUST_LOG=info cargo run --release -- --prove
//! ```

use alloy_sol_types::SolType;
use clap::Parser;
use soar_lib::types::PublicValuesStruct;
use sp1_sdk::{include_elf, ProverClient, SP1Stdin};
use std::fs;
use std::io;

/// The ELF (executable and linkable format) file for the Succinct RISC-V zkVM.
pub const SOAR_REWARDS: &[u8] = include_elf!("soar");

/// The arguments for the command.
#[derive(Parser, Debug)]
#[clap(author, version, about, long_about = None)]
struct Args {
    #[clap(long)]
    execute: bool,

    #[clap(long)]
    prove: bool,

    #[clap(long)]
    input_file: String,
}

fn main() {
    // Setup the logger.
    sp1_sdk::utils::setup_logger();

    // Parse the command line arguments.
    let args = Args::parse();

    if args.execute == args.prove {
        eprintln!("Error: You must specify either --execute or --prove");
        std::process::exit(1);
    }

    // Setup the prover client.
    let client = ProverClient::new();

    // Setup the inputs.
    let mut stdin = SP1Stdin::new();
    /*
     * Write the public input values here.
     * user address,
     * StakeChain Events from start to end hash
     * RewardChain Events from start to end hash
     *
     * The program should output the total reward the given user can claim.
     */
    let stake_data = fs::read(args.input_file).unwrap();
    stdin.write_vec(stake_data);

    if args.execute {
        // Execute the program
        let (output, report) = client.execute(SOAR_REWARDS, stdin).run().unwrap();
        println!("Program executed successfully.");

        // Read the output.
        let decoded = PublicValuesStruct::abi_decode(output.as_slice(), true).unwrap();
        println!("Total Rewards: {:?}", decoded.total_rewards);
        println!("To Reward Event Hash: {:?}", decoded.to_reward_event_hash);

        // Record the number of cycles executed.
        println!("Number of cycles: {}", report.total_instruction_count());
    } else {
        // Setup the program for proving.
        let (pk, vk) = client.setup(SOAR_REWARDS);
        println!("Proving key length: {}", pk.elf.len());
        println!("Verifying key length: {}", pk.elf.len());

        // Generate the proof
        let proof = client
            .prove(&pk, stdin)
            .run()
            .expect("failed to generate proof");

        println!("Successfully generated proof!");

        // Verify the proof.
        client.verify(&proof, &vk).expect("failed to verify proof");
        println!("Successfully verified proof!");
    }
}
