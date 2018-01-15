pragma solidity ^0.4.18;

contract Verifier {
  function hasher(string message) public pure returns(bytes32) {
    return keccak256(message);
  }

  function getAddress(bytes32 hash, uint8 v, bytes32 r, bytes32 s) public pure returns(address) {
    return ecrecover(hash, v, r, s);
  }
}
