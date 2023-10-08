import { BN } from "bn.js";
import { publicKey } from "@project-serum/anchor/dist/cjs/utils";
const { PublicKey } = require("@solana/web3.js");
const assert = require('assert')
const anchor = require('@project-serum/anchor')
const {SystemProgram} = anchor.web3

describe("certiguard", () => {
  const provider = anchor.AnchorProvider.env()
  anchor.setProvider(provider)
  const certificate_acc = anchor.web3.Keypair.generate()
  const program = anchor.workspace.Certiguard;
  const HASH = "asjdaksdjalskdj"
  const ID = 27348
  const valid_issuers = [
    new PublicKey("7gpTx2raFYzEe8xENqxjmkf8NWAiewS1u7AByAcKmyYS")
  ]
  let certificatePDA = publicKey;
  before(async () => {

    [certificatePDA] = await anchor.web3.PublicKey.findProgramAddress([
      new BN(ID).toBuffer('le', 8),
      provider.wallet.publicKey.toBuffer(), 
    ],
    program.programId
    );
    console.log(certificatePDA);
  });

  it("Registering a certificate", async () => {
    
    const tx =  await program.methods.uploadCertificate(new BN(ID),valid_issuers,HASH)
    .accounts({
           certificate : certificatePDA,
           issuer : provider.wallet.publicKey,
           systemProgram: SystemProgram.programID
    })
    .rpc();

    const account = await program.account.certificate.fetch(certificatePDA);
    console.log(account.issuer.toBase58())
    console.log(provider.wallet.publicKey.toBase58())
    console.log("Your account hash is ",account.certificate_hash)
    console.log("Your transaction signature", tx);

  });




});
