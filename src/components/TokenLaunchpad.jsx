
import {createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID} from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, LAMPORTS_PER_SOL, SystemProgram, Transaction } from '@solana/web3.js';


export function TokenLaunchpad() {


    const wallet = useWallet();
    const {connection} = useConnection();

    async function createToken(){

        const name = document.getElementById('name').value;
        const symbol = document.getElementById('symbol').value;
        const image = document.getElementById('image').value;
        const supply = document.getElementById('supply').value;

        // Call your smart contract function here

        console.log({
            name,
            symbol,
            image,
            supply
        })

        const lamports = await getMinimumBalanceForRentExemptMint(connection);
        const keypair =  Keypair.generate();

        const transaction = new Transaction().add(

            SystemProgram.createAccount({
                fromPubkey:wallet.publicKey,
                newAccountPubkey:keypair.publicKey,
                space:MINT_SIZE,
                lamports,
                programId:TOKEN_PROGRAM_ID
            }),

            createInitializeMint2Instruction(keypair.publicKey,6,wallet.publicKey,wallet.publicKey,TOKEN_PROGRAM_ID)
        )

        // createMint();
        transaction.feePayer = wallet.publicKey;
        const recentBlockhash = await connection.getLatestBlockhash();
        transaction.recentBlockhash = recentBlockhash.blockhash;
        transaction.partialSign(keypair);

        const response = await wallet.sendTransaction(transaction,connection);
        console.log("response: ",response);   
    }


    async function sendSOL(){

        const to = document.getElementById('to').value;
        const amount = document.getElementById('amount').value;

        console.log({to,amount});

        const transaction = new Transaction();

        transaction.add(
            SystemProgram.transfer({
                fromPubkey:wallet.publicKey,
                toPubkey:to,
                lamports:amount*LAMPORTS_PER_SOL
            })
        )

        transaction.feePayer = wallet.publicKey;
        const recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
        transaction.recentBlockhash = recentBlockhash;
        
        const response = await wallet.sendTransaction(transaction,connection);
        console.log("response: ",response);

    }

    return  <div style={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'
    }}>
        <h1>Solana Token Launchpad</h1>
        <input id="name" className='inputText' type='text' placeholder='Name'></input> <br />
        <input id="symbol" className='inputText' type='text' placeholder='Symbol'></input> <br />
        <input id="image" className='inputText' type='text' placeholder='Image URL'></input> <br />
        <input id="supply" className='inputText' type='text' placeholder='Initial Supply'></input> <br />


        <input id="to" className='inputText' type='text' placeholder='Recipient Address'></input> <br />
        <input id="amount" className='inputText' type='text' placeholder='Amount to Send'></input> <br />

        

        <button onClick={createToken} className='btn'>Create a token</button>
        <button onClick={sendSOL} className='btn'>Send SOL</button>

    </div>
}