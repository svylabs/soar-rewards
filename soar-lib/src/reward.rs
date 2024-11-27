use crate::types::{Bytes32, U256};
use serde::Deserialize;

#[derive(Clone, Debug, Deserialize)]
pub struct RewardChainExtendedEventJSON {
    pub amount: String,
    pub total_reward: String,
    pub timestamp: String,
    pub previous_event_hash: String,
    pub current_event_hash: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct RewardChainExtendedEvent {
    pub amount: U256,
    pub total_reward: U256,
    pub timestamp: U256,
    pub previous_event_hash: Bytes32,
    pub current_event_hash: Bytes32,

    hash: Option<Bytes32>,
}

impl From<RewardChainExtendedEventJSON> for RewardChainExtendedEvent {
    fn from(event: RewardChainExtendedEventJSON) -> Self {
        Self {
            amount: U256::from_dec_str(&event.amount).unwrap(),
            total_reward: U256::from_dec_str(&event.total_reward).unwrap(),
            timestamp: U256::from_dec_str(&event.timestamp).unwrap(),
            previous_event_hash: hex::decode(event.previous_event_hash)
                .unwrap()
                .try_into()
                .unwrap(),
            current_event_hash: hex::decode(event.current_event_hash)
                .unwrap()
                .try_into()
                .unwrap(),
            hash: None,
        }
    }
}

impl RewardChainExtendedEvent {
    pub fn hash(&mut self) -> Bytes32 {
        // TODO: Construct a hash from the event data
        if self.hash.is_none() {
            /*
            let mut hasher = sha3::Keccak256::new();
            hasher.update(&self.amount.to_bytes_be());
            hasher.update(&self.total_reward.to_bytes_be());
            hasher.update(&self.timestamp.to_bytes_be());
            hasher.update(&self.previous_event_hash);
            */
            let result = self.current_event_hash;
            self.hash = Some(result);
        }
        self.hash.unwrap()
    }

    pub fn verify_hash(&mut self, expected: &Bytes32) -> bool {
        // TODO: check if the constructed hash matches the expected
        self.hash() == *expected
    }
}
