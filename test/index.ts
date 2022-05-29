import { expect } from "chai";
import { ethers } from "hardhat";
import { Signer, Contract } from "ethers";
import * as dotenv from "dotenv";

describe("My1155Contract", function () {

  let my1155Contract: Contract;
  let accounts: Signer[];
  let nft_amount = 5;

  it("Should deploy contract", async function () {
    const My1155Contract = await ethers.getContractFactory("My1155Contract");
    my1155Contract = await My1155Contract.deploy("SuperNFT1155", "SN1155");
    await my1155Contract.deployed();
  });

  it("Test revert of mint function", async function () {
    accounts = await ethers.getSigners();
    await expect(my1155Contract.connect(accounts[2])
    .mint(await accounts[2].getAddress(), 1, nft_amount, "sddd"))
    .to.be.revertedWith("Ownable: caller is not the owner");
  });

  it("Test mint function", async function () {
    await expect(my1155Contract.connect(accounts[0])
    .mint(await accounts[2].getAddress(), 1, nft_amount, "sddd"))
    .to.emit(my1155Contract, "TransferSingle")
    .withArgs(await accounts[0].getAddress(),
              ethers.constants.AddressZero,
              await accounts[2].getAddress(),
              1, 5);
  });

  it("Test change ownership", async function () {
    const contract = my1155Contract.connect(accounts[0]);
    await expect(contract.transferOwnership(await accounts[1].getAddress()))
    .to.emit(my1155Contract, "OwnershipTransferred")
    .withArgs(await accounts[0].getAddress(),
      await accounts[1].getAddress());
  });

});
