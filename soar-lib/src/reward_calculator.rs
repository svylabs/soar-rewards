use serde::Deserialize;

use crate::reward::RewardChainExtendedEvent;
use crate::stake::StakeChainExtendedEvent;
use crate::types::{Address, Bytes32, Zero, U256};

#[derive(Clone, Debug, Deserialize)]
pub struct RewardClaimParameters {
    pub user: Address,
    pub from_reward_event: RewardChainExtendedEvent,
    pub to_reward_event: RewardChainExtendedEvent,
    pub from_stake_event: StakeChainExtendedEvent,
    pub to_stake_event: StakeChainExtendedEvent,
    pub from_user_stake_event: StakeChainExtendedEvent,
    pub to_user_stake_event: StakeChainExtendedEvent,
}

#[derive(Clone, Debug, Deserialize)]
pub struct RewardCalculator {
    pub user: Address,
    pub stake_events: Vec<StakeChainExtendedEvent>,
    pub reward_events: Vec<RewardChainExtendedEvent>,
    pub claim: RewardClaimParameters,
}

impl From<Vec<u8>> for RewardCalculator {
    fn from(input: Vec<u8>) -> Self {
        serde_json::from_slice(&input).unwrap()
    }
}

impl RewardCalculator {
    pub fn calculate_reward(&mut self) -> U256 {
        // Calculate the total reward for the user based on reward events and stake events.
        let mut total_user_stake = U256::zero();
        if self.claim.from_user_stake_event.hash() != Bytes32::zero() {
            total_user_stake = self.claim.from_user_stake_event.total_user_stake;
        }
        let mut total_stake = U256::zero();
        let mut current_timestamp = U256::zero();
        if self.claim.from_stake_event.hash() != Bytes32::zero() {
            total_stake = self.claim.from_stake_event.total_staked;
        }
        if self.claim.from_reward_event.hash() != Bytes32::zero() {
            // Initialize the current timestamp to the timestamp of the first reward event.
            current_timestamp = self.claim.from_reward_event.timestamp;
        }
        let mut stake_event_index = 0; // Stake index
        let mut reward_event_index = 0; // Reward Index
        let mut total_user_reward = U256::zero();
        let precision = U256::from("1000000000000000000");
        while reward_event_index < self.reward_events.len() {
            while stake_event_index < self.stake_events.len()
                && current_timestamp > self.stake_events[stake_event_index].timestamp
            {
                if self.stake_events[stake_event_index].user == self.user {
                    total_user_stake = self.stake_events[stake_event_index].total_user_stake;
                }
                total_stake = self.stake_events[stake_event_index].total_staked;
                stake_event_index += 1;
                // TODO: Verify stake event hashes
            }
            let reward_event = &self.reward_events[reward_event_index];
            if total_stake != U256::zero() {
                // Calculate the reward for the user at this point.
                let user_reward =
                    (total_user_stake * reward_event.amount * precision) / total_stake;
                total_user_reward += user_reward;
            }
            current_timestamp = reward_event.timestamp;
            reward_event_index += 1;
        }
        total_user_reward /= precision;
        // At each reward event, get the user's total stake at that point.
        total_user_reward
    }
}
