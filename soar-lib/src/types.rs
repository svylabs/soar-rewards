use alloy_primitives::U256 as SolU256;
use alloy_sol_types::sol;
use serde::Deserialize;

construct_uint! {
    /// 256-bit unsigned integer.
    #[derive(Deserialize)]
    pub struct U256(4);
}

impl From<U256> for SolU256 {
    fn from(value: U256) -> Self {
        let mut bytes: [u8; 32] = [0; 32];
        let val_bytes = value.to_big_endian();
        bytes[0..4].copy_from_slice(&val_bytes);
        SolU256::from_be_bytes(bytes)
    }
}

pub type Bytes32 = [u8; 32];
pub type Address = [u8; 20];

pub trait Zero {
    fn zero() -> Self;
}

impl Zero for Bytes32 {
    fn zero() -> Self {
        [0; 32]
    }
}

sol! {
    struct PublicValuesStruct {
        address user;
        uint256 total_rewards;
        bytes32 from_reward_event_hash;
        bytes32 to_reward_event_hash;
        bytes32 from_stake_event_hash;
        bytes32 to_stake_event_hash;
        bytes32 from_user_stake_event_hash;
        bytes32 to_user_stake_event_hash;
    }
}
