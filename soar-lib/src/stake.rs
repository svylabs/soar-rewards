use serde::Deserialize;

use crate::types::{Address, Bytes32, U256};

#[derive(Clone, Debug, Deserialize)]
pub struct StakeChainExtendedEventJSON {
    pub user: String,
    pub is_stake: bool,
    pub amount: String,
    pub total_staked: String,
    pub total_user_stake: String,
    pub timestamp: String,
    pub previous_event_hash: String,
    pub current_event_hash: String,
}

#[derive(Clone, Debug, Deserialize)]
pub struct StakeChainExtendedEvent {
    pub user: Address,
    pub is_stake: bool,
    pub amount: U256,
    pub total_staked: U256,
    pub total_user_stake: U256,
    pub timestamp: U256,
    pub previous_event_hash: Bytes32,
    pub current_event_hash: Bytes32,

    hash: Option<Bytes32>,
}

impl From<StakeChainExtendedEventJSON> for StakeChainExtendedEvent {
    fn from(event: StakeChainExtendedEventJSON) -> Self {
        Self {
            user: hex::decode(event.user).unwrap().try_into().unwrap(),
            is_stake: event.is_stake,
            amount: U256::from_dec_str(&event.amount).unwrap(),
            total_staked: U256::from_dec_str(&event.total_staked).unwrap(),
            total_user_stake: U256::from_dec_str(&event.total_user_stake).unwrap(),
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

impl StakeChainExtendedEvent {
    pub fn hash(&mut self) -> Bytes32 {
        // TODO: Construct a hash from the event data.
        if self.hash.is_none() {
            /*
            let mut hasher = sha3::Keccak256::new();
            hasher.update(&self.user);
            hasher.update(&self.is_stake.to_bytes_be());
            hasher.update(&self.amount.to_bytes_be());
            hasher.update(&self.total_staked.to_bytes_be());
            hasher.update(&self.total_user_stake.to_bytes_be());
            hasher.update(&self.timestamp.to_bytes_be());
            hasher.update(&self.previous_event_hash);
            let result = hasher.finalize();
            */
            self.hash = Some(self.current_event_hash);
        }
        self.hash.unwrap()
    }

    pub fn verify_hash(&mut self, expected: &Bytes32) -> bool {
        // TODO: check if the constructed hash matches the one in the event.
        self.hash() == *expected
    }
}
