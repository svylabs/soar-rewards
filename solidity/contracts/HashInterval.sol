library Utils {
    struct HashInterval {
        bytes32 start; // exclusive, because start can be initialized with 0
        bytes32 end; // inclusive
    }
}
