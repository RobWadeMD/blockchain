const SHA256 = require('crypto-js/sha256');

    class Block {
        constructor(index, timestamp, data, previousHash = '') {
            this.index = index;
            this.timestamp = timestamp;
            this.data = data;
            this.previousHash = previousHash;
            this.hash = '';
            this.nonce = 0;
        }

        calculateHash() {
            return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
        }

        mineBlock(difficulty) {
            while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
                this.nonce++;
                this.hash = this.calculateHash();
            }
            console.log("Congrats! You mined a RobCoin. " + "\nHash: " + this.hash + "\nAmount: " + this.data.amount + "\n");
        }
    }

    class Blockchain {
        constructor() {
            this.chain = [this.createGenesisBlock()];
            this.difficulty = 4;
        }

        createGenesisBlock() {
            return new Block(0, '04/12/2017', "Genesis Block", "0");
        }

        getLatestBlock() {
            return this.chain[this.chain.length - 1];
        }

        addBlock(newBlock) {
            newBlock.previousHash = this.getLatestBlock().hash;
            newBlock.mineBlock(this.difficulty);
            this.chain.push(newBlock);
        }

        isChainValid() {
            for (let i = 1; i < this.chain.length - 1; i++) {
                const currentBlock = this.chain[i];
                const previousBlock = this.chain[i - 1];

                if (currentBlock.hash !== currentBlock.calculateHash()) {
                    return false;
                }
                if (currentBlock.previousHash !== previousBlock.hash) {
                    return false;
                }
                return true;
            }
        }
    }

    let robCoin = new Blockchain();
    console.log("Mining Block 1 ....");
    for (i = 1; i < 10; i++) {
        time = new Date();
        robCoin.addBlock(new Block(1, time, {
            amount: 1
        }));
        console.log("Mining Block " + (i + 1) + " ....");
    }

    //Get Blockchain History
    console.log(JSON.stringify(robCoin, null, 4))

    //Check if Blockchain is still valid
    console.log(robCoin.isChainValid());

    // robCoin.addBlock(new Block(1, '05/12/2017', {amount: 4}));
    // console.log("Mining Block 2 ....");
    // robCoin.addBlock(new Block(1, '06/12/2017', {amount: 2}));
    // console.log("Mining Block 3 ....");
    // robCoin.addBlock(new Block(1, '08/12/2017', {amount: 7}));
    // console.log("Mining Block 4 ....");
    // robCoin.addBlock(new Block(1, '10/12/2017', {amount: 2}));
    // console.log("Mining Block 5 ....");
    // robCoin.addBlock(new Block(1, '12/12/2017', {amount: 100}));

    // trying to manipulate the blockchain by changining the value of the amout from
    // the first transaction will result in an unvalid Chain
    // robCoin.chain[1].data = {amount : 10000};

    // validate Blockchain
    // console.log(robCoin.isChainValid(robCoin));
    // console.log(JSON.stringify(robCoin, null, 4));
