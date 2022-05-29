import 'dotenv/config';
import { types } from "hardhat/config";
import { task } from "hardhat/config";

task("approve", "Approve to transfer tokens")
  .addParam("requesting", "ID of accaunt in array in .env")
  .addParam("operator", "The account which was allowed to transfer tokens")
  .addParam("approved", "Approved or disapproved")
  .setAction(async (args, hre) => {
  const accounts = await hre.ethers.getSigners();
  const contract = await hre.ethers.getContractAt("My1155Contract",
  process.env.ERC721_CONTRACT!, accounts[args.requesting]);
  contract.on("ApprovalForAll", (account, operator, approved, event) => {
    console.log({
      account: account,
      spender: operator,
      approved: approved,
      data: event
    });
  });
  const tx = await contract.setApprovalForAll(args.operator, args.approved);
  tx.wait();
  console.log(tx);
});
