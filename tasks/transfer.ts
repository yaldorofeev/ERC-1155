import 'dotenv/config';
import { types } from "hardhat/config";
import { task } from "hardhat/config";

task("transfer", "Transfer tokens")
  .addParam("requesting", "ID of accaunt in array in .env")
  .addParam("from", "The account which transmit tokens")
  .addParam("to", "The account which recieves tokens")
  .addParam("tokenid", "The amount of tokens to transfer")
  .addParam("amount", "The amount of tokens")
  .setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("My1155Contract",
  process.env.ERC1155_CONTRACT!, accounts[args.requesting]);
  contract.on("TransferSingle", (operator, from, to, tokenid, amount, event) => {
    console.log({
      operator: operator,
      from: from,
      to: to,
      tokenid: tokenid,
      amount: tokenid.toNumber(),
      data: event
    });
  });
  // const tx = await contract["safeTransferFrom(address,address,uint256,uint256,bytes memory)"]
  const tx = await contract.safeTransferFrom(args.from, args.to, args.tokenid, args.amount, "");


  tx.wait();
  console.log(tx);
});
