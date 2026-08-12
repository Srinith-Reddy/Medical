import { network } from "hardhat";

const { ethers } = await network.connect();

const MedicalRecords = await ethers.getContractFactory("MedicalRecords");

console.log("Deploying MedicalRecords...");

const contract = await MedicalRecords.deploy();

await contract.waitForDeployment();

const address = await contract.getAddress();

console.log("MedicalRecords deployed to:", address);