// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MedicalRecords {

    mapping(bytes32 => bool) private hashes;

    event HashStored(bytes32 indexed documentHash);

    function storeHash(bytes32 documentHash) public {
        hashes[documentHash] = true;

        emit HashStored(documentHash);
    }

    function verifyHash(bytes32 documentHash) public view returns (bool) {
        return hashes[documentHash];
    }
}