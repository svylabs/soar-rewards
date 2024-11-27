# SOAR Staking & Rewards
SOAR; Stake Once; Amplify Rewards is a staking protocol, where users can stake once in mainnet(Ethereum) and are able to permissionlessly claim staking rewards in many chains / L2s, where trustless bridge between that chain and ethereum is available.

# Usecase
Imagine a protocol that is live on Ethereum mainnet, and staking the protocol tokens in mainnet earns fees from the protocol. Now, imagine, that same protocol has to be deployed on other chains like Arbitrum / Starknet / Base / Optimism / etc. The question arises, how would you go about rewarding users? There are a couple of ways to solve this:
1. One way is to issue new tokens on those chains. This obviously have fragmentation of fee revenue across different protocols.
2. Issue LSDs for the staked token on mainnet that can be used across different chains. This again makes it complex when introducing the protocol on new chains resulting in fragmentation again.
3. Revenue from the other deployments are sent to mainnet periodically. This is not straightforward as well, as the revenue can be in a different token that is not known to the mainnet contracts.

Even within a chain, imagine a team developing multiple protocols, and want to divert revenue from all those protocols to the token holders, without implementing a new staking contract each time a new protocol is introduced.

# Solution
SOAR(Stake Once; Amplify Rewards): A unified staking protocol, where users stake in a staking pool once on mainnet, and are able to permissionlessly claim rewards from other chains by presenting a proof that at each reward event on another chain, a user had a particular amount of stake, and their share of revenue at the reward event was a particular value. Finally aggregating the total reward and a proof that this is the aggregated reward claim.

# Pre-requisites
The main pre-requisite for achieving this in a trustless manner is the availability of **a trustless messaging bridge between L1(mainnet) to L2**, like the one available on Starknet / Arbitrum(Inbox) so messages can be sent from L1 contracts to L2 contracts.

# Mechanism

## Staking Contract (Mainnet)

The staking contract in addition to accounting for total stakes per user, also maintains a chain of stake events, and stores the hash of tip of the stake event on chain.

```
  S1 -> S2 -> S3 -> US1 -> S4 -> US2 -> US3 -> ... Tip
```
Where the current event hash in addition to the current stake, timestamp, etc.. also references the previous stake event. The hash of the current stake event is obtained by concatenating the following 

`
        address user,
        bool isStake,
        uint256 amount,
        uint256 totalStaked,
        uint256 totalUserStake,
        uint256 timestamp,
        bytes32 previousHash,
`

## Relay Contract(Mainnet)

Relay Contracts are deployed once per new chain / L2. The main function of relay contract is to trustlessly pass a message to the L2 Reward Contract the latest stake snapshot of the user and the global stake snapshot. So it has only one function

```
    struct Snapshot {
        uint timestamp,
        bytes32 userStakeSnapshot,
        bytes32 globalStakeSnapshot
    }
    constructor(L2Bridge _l2) {
       this.l2 = l2;
    }
    function relay() {
         Snapshot snapshot = constructSnapshot(); // Construct this snapshot by making a function call to the Staking contract
         l2.relay(snapshot)
    }
```

## Reward Contract (Mainnet or L2 or another chain with a bridge)

Similar to L1 staking contract, the reward contract on L2 also maintains a chain of reward events, and stores the hash of the tip of the reward event in the contract

```
   R1 -> R2 -> R3 -> R4 -> .... tip
```

The relay function is called by the trustless bridging mechanism.

```
    struct HashInterval {
       bytes32 from;
       bytes32 to;
    }
    struct Claim {
       HashInterval stakeEventsInterval; // Holds the interval from....to for global stake events
       HashInterval rewardEventsInterval; // Holds the reward event hashes from....to for reward events
       HashInterval userStakeInterval; // Holds users specific hashes from....to for stake events specific to user.
       bool claimed;
       bool stakeSnapshotTime;
       bool rewardSnapshotTime;
    }
    mapping(address => Claim) claims; // Contains all claims for various users.
    function relay(newSnapshot) {
         // When receiving the message from L1, the contract prepares a claim object with the following attributes:
         updateClaim(newSnapshot);
          
    }
```

The rewards can be computed offline along with the proof, and claimed by calling

```
     function claim(proof, publicInputs) {
         // Verify the zero knowledge proofs, publicInputs
         sendRewards(msg.sender)
         claims[msg.sender].claimed = true;
      }
```

Once the rewards have been claimed for a particular claim, the cycle can be repeated as many times as one wants.

# Advantages
1. Protocol tokens can be issued once on mainnet.
2. Reducing the incentive to issue new tokens, backroom dealings and fragmenting rewards.
3. Reducing the implementation effort to distribute rewards when launching the protocol in a new L2.

We are using SP1 prover for this prototype and the following helps with setting up the repo and testing the flow.

# Testing

## Requirements

- [Rust](https://rustup.rs/)
- [SP1](https://docs.succinct.xyz/getting-started/install.html)

## Running the Project

There are four main ways to run this project: build a program, execute a program, generate a core proof, and
generate an EVM-compatible proof.

### Build the Program

To build the program, run the following command:

```sh
cd program
cargo prove build
```

### Execute the Program

To run the program without generating a proof:

```sh
cd script
cargo run --release -- --execute  --input-file ../data/input.json
```

This will execute the program and display the output.

### Generate a Core Proof

To generate a core proof for your program:

```sh
cd script
cargo run --release -- --prove --input-file ../data/input.json
```

### Generate an EVM-Compatible Proof

> [!WARNING]
> You will need at least 128GB RAM to generate a Groth16 or PLONK proof.

To generate a proof that is small enough to be verified on-chain and verifiable by the EVM:

```sh
cd script
cargo run --release --bin evm -- --system groth16
```

this will generate a Groth16 proof. If you want to generate a PLONK proof, run the following command:

```sh
cargo run --release --bin evm -- --system plonk
```

These commands will also generate fixtures that can be used to test the verification of SP1 zkVM proofs
inside Solidity.

### Retrieve the Verification Key

To retrieve your `programVKey` for your on-chain contract, run the following command:

```sh
cargo prove vkey --program fibonacci-program
```

## Using the Prover Network

We highly recommend using the Succinct prover network for any non-trivial programs or benchmarking purposes. For more information, see the [setup guide](https://docs.succinct.xyz/generating-proofs/prover-network.html).

To get started, copy the example environment file:

```sh
cp .env.example .env
```

Then, set the `SP1_PROVER` environment variable to `network` and set the `SP1_PRIVATE_KEY`
environment variable to your whitelisted private key.

For example, to generate an EVM-compatible proof using the prover network, run the following
command:

```sh
SP1_PROVER=network SP1_PRIVATE_KEY=... cargo run --release --bin evm
```
