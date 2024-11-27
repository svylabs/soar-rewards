pragma solidity ^0.8.20;

contract RewardChain {
    /**
     * @dev Relay the stakeChainSnapshot and currentStakeChainSnapshot. This messages should come from a trusted / trustless relayer through Rollup inbox.
     *
     * @param user The user address
     * @param userStakeChainSnapshot The userStakeChainSnapshot of the user
     * @param currentStakeChainSnapshot The current StakeChainSnapshot
     */

    struct HashInterval {
        bytes32 start; // exclusive, because start will be initialized with 0 to represent the beginning of the chain
        bytes32 end; // inclusive
    }

    struct StakeRewardClaim {
        HashInterval stakeInterval;
        HashInterval rewardInterval;
        HashInterval userStakeInterval;
        uint256 rewardSnapshotTime;
        uint256 stakeSnapshotTime;
        uint256 rewardBeginTime;
        bool claimed;
    }

    bytes32 public NULL_HASH = bytes32(0x0);
    bytes32 public beginningOfStakeChain = NULL_HASH;
    bytes32 public currentRewardChain = NULL_HASH;

    uint256 public totalRewards;

    uint256 public rewardBeginTime;

    mapping(address => StakeRewardClaim) public rewards;

    event RewardsAdded(
        uint256 amount,
        uint256 totalRewards,
        uint256 timestamp,
        bytes32 previousRewardChain,
        bytes32 currentRewardChain
    );

    constructor(bytes32 startOfStakeChain) {
        // Initialize the beginning of the stake chain
        //beginningOfStakeChain = startOfStakeChain;
    }

    function relay(
        address user,
        bytes32 userStakeChainSnapshot,
        bytes32 currentStakeChainSnapshot,
        uint256 stakeSnapshotTime
    ) external {
        // Should relay the stakeChainSnapshot and currentStakeChainSnapshot
        StakeRewardClaim storage claim = rewards[user];
        if (claim.stakeInterval.start == bytes32(0x0)) {
            claim.stakeInterval = HashInterval({
                start: NULL_HASH,
                end: currentStakeChainSnapshot
            });
            claim.rewardInterval = HashInterval({
                start: NULL_HASH,
                end: currentRewardChain
            });
            claim.userStakeInterval = HashInterval({
                start: NULL_HASH,
                end: userStakeChainSnapshot
            });
            claim.rewardSnapshotTime = block.timestamp;
            claim.stakeSnapshotTime = stakeSnapshotTime;
            claim.rewardBeginTime = rewardBeginTime;
        } else {
            require(
                claim.claimed,
                "There is a pending reward claim for the user"
            );
            claim.stakeInterval.start = claim.stakeInterval.end;
            claim.stakeInterval.end = currentStakeChainSnapshot;
            claim.claimed = false;
            claim.rewardInterval.start = claim.rewardInterval.end;
            claim.rewardInterval.end = currentRewardChain;
            claim.userStakeInterval.start = claim.userStakeInterval.end;
            claim.userStakeInterval.end = userStakeChainSnapshot;
            claim.rewardSnapshotTime = block.timestamp;
            claim.stakeSnapshotTime = stakeSnapshotTime;
        }
    }

    function addRewards(uint256 amount) public {
        // Should add rewards to the contract
        totalRewards += amount;
        bytes memory rewardData = abi.encodePacked(
            amount,
            totalRewards,
            block.timestamp,
            currentRewardChain
        );
        bytes32 previousRewardChain = currentRewardChain;
        currentRewardChain = keccak256(rewardData);
        emit RewardsAdded(
            amount,
            totalRewards,
            block.timestamp,
            previousRewardChain,
            currentRewardChain
        );
        if (rewardBeginTime == 0) {
            rewardBeginTime = block.timestamp;
        }
    }

    /**
     * Users should be able to claim rewards by submitting a proof that the calculated reward values are correct for the user based on the snapshot of the stake chain.
     *
     * The users should be able to prove that between the PreviousStakeChainSnapshot and CurrentStakeChainSnapshot, the user had particular stakes at specific times of reward and the final
     * reward value is the aggregate of all the rewards.
     *
     * BeginningOfStakeChain -> PreviousStakeChainSnapshot -> CurrentStakeChainSnapshot
     *
     * Beginning -> PreviousRewardChainSnapshot -> CurrentRewardChainSnapshot
     */
    function claimRewards(
        uint256 aggregateRewards,
        uint256 totalUserStake,
        uint256 totalStake,
        bytes calldata proof
    ) public {
        // Should verify proof and return the rewards
        StakeRewardClaim storage claim = rewards[msg.sender];
        claim.claimed = true;
    }
}
