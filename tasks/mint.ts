import 'dotenv/config';
import { types } from "hardhat/config";
import { task } from "hardhat/config";

task("mint", "Mint tokens")
  .addParam("requesting", "ID of accaunt in array in .env")
  .addParam("account", "The account that recieves token")
  .addParam("tokenid", "The ID of token")
  .addParam("amount", "The amount of tokens to mint")
  .addParam("tokenuri", "URI of tokens")
  .setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("My1155Contract",
  process.env.ERC1155_CONTRACT!, accounts[args.requesting]);
  const tx = await contract.mint(args.account, args.tokenid, args.amount, args.tokenuri);
  tx.wait();
  console.log(tx);
});
