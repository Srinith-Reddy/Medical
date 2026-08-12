import os

from dotenv import load_dotenv
from web3 import Web3


load_dotenv()


class BlockchainService:

    RPC_URL = os.getenv("POLYGON_AMOY_RPC_URL")
    PRIVATE_KEY = os.getenv("POLYGON_AMOY_PRIVATE_KEY")
    CONTRACT_ADDRESS = os.getenv("MEDICAL_RECORDS_CONTRACT_ADDRESS")

    ABI = [
        {
            "anonymous": False,
            "inputs": [
                {
                    "indexed": True,
                    "internalType": "bytes32",
                    "name": "documentHash",
                    "type": "bytes32"
                }
            ],
            "name": "HashStored",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "documentHash",
                    "type": "bytes32"
                }
            ],
            "name": "storeHash",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "documentHash",
                    "type": "bytes32"
                }
            ],
            "name": "verifyHash",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]

    @staticmethod
    def get_web3():

        if not BlockchainService.RPC_URL:
            raise ValueError("POLYGON_AMOY_RPC_URL is not configured")

        return Web3(
            Web3.HTTPProvider(
                BlockchainService.RPC_URL
            )
        )

    @staticmethod
    def get_contract():

        w3 = BlockchainService.get_web3()

        if not BlockchainService.CONTRACT_ADDRESS:
            raise ValueError(
                "MEDICAL_RECORDS_CONTRACT_ADDRESS is not configured"
            )

        return w3.eth.contract(
            address=Web3.to_checksum_address(
                BlockchainService.CONTRACT_ADDRESS
            ),
            abi=BlockchainService.ABI
        )

    @staticmethod
    def store_hash(file_hash: str) -> str:

        w3 = BlockchainService.get_web3()

        if not BlockchainService.PRIVATE_KEY:
            raise ValueError(
                "POLYGON_AMOY_PRIVATE_KEY is not configured"
            )

        contract = BlockchainService.get_contract()

        # SHA-256 hash -> bytes32
        document_hash = bytes.fromhex(file_hash)

        if len(document_hash) != 32:
            raise ValueError(
                "File hash must be a 64-character SHA-256 hash"
            )

        account = w3.eth.account.from_key(
            BlockchainService.PRIVATE_KEY
        )

        nonce = w3.eth.get_transaction_count(
            account.address
        )

        transaction = contract.functions.storeHash(
            document_hash
        ).build_transaction({
            "from": account.address,
            "nonce": nonce,
            "chainId": 80002,
            "gas": 100000,
            "gasPrice": w3.eth.gas_price
        })

        signed_transaction = w3.eth.account.sign_transaction(
            transaction,
            BlockchainService.PRIVATE_KEY
        )

        tx_hash = w3.eth.send_raw_transaction(
            signed_transaction.raw_transaction
        )

        receipt = w3.eth.wait_for_transaction_receipt(
            tx_hash
        )

        if receipt.status != 1:
            raise ValueError(
                "Blockchain transaction failed"
            )

        return tx_hash.hex()

    @staticmethod
    def verify_hash(file_hash: str) -> bool:

        contract = BlockchainService.get_contract()

        document_hash = bytes.fromhex(file_hash)

        if len(document_hash) != 32:
            raise ValueError(
                "File hash must be a 64-character SHA-256 hash"
            )

        return contract.functions.verifyHash(
            document_hash
        ).call()