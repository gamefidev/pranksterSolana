import * as anchor from"@project-serum/anchor";
import { Connection, PublicKey } from '@solana/web3.js';
import { Program, Provider, web3, utils } from '@project-serum/anchor';
import idl from './idl.json';
import { sendTransactions } from './connection.tsx';
const { TOKEN_PROGRAM_ID, createAssociatedTokenAccountInstruction, getAssociatedTokenAddress, createInitializeMintInstruction, MINT_SIZE } = require('@solana/spl-token');
const { SystemProgram } = web3;

export const _getState = async (provider, wallet) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	const [userstakingPubkey] =
		await web3.PublicKey.findProgramAddress(
		[wallet.publicKey.toBuffer()],
		program.programId
		);
	const testdata = await program.account.mintingAccount.fetch(stakingPubkey);
	let userdata = [];
	try {
		userdata = await program.account.userMintingAccount.fetch(userstakingPubkey);
	}catch (err) {
		console.log(err);
	}
	console.log("ud:", userdata, testdata);
	const ogList = testdata.ogList;
	const wlList = testdata.wlList;
	const blList = testdata.blList;
	let curStage = testdata.curStage;
	const ogPrice = testdata.ogPrice.div(new anchor.BN(1e6)).toNumber();
	const wlPrice = testdata.wlPrice.div(new anchor.BN(1e6)).toNumber();
	const blPrice = testdata.blPrice.div(new anchor.BN(1e6)).toNumber();
	const ogAmout = testdata.ogMax.toNumber();
	const wlAmout = testdata.wlMax.toNumber();
	const blAmout = testdata.blMax.toNumber();
	const baseUri = testdata.baseUri;

	let isShow = false;
	for(const og of ogList) {
		if(og == wallet.publicKey && curStage == 1) {
			isShow = true;
			break
		}
	}
	for(const og of wlList) {
		if(og == wallet.publicKey && curStage == 2) {
			isShow = true;
			break
		}
	}			
	for(const og of blList) {
		if(og == wallet.publicKey) {
			isShow = false;
			curStage = 4;
			break
		}
	}			
	if(curStage == 3 && isShow == false) isShow = true;
	let price = blPrice;
	if(curStage == 1) price = ogPrice;
	if(curStage == 2) price = wlPrice;
	console.log(isShow, curStage, price, ogPrice, wlPrice, blPrice);
	return {
		show: isShow,
		stage: curStage,
		price: price,
		ogPrice: ogPrice,
		wlPrice: wlPrice,
		blPrice: blPrice,
		ogAmout: ogAmout,
		wlAmout: wlAmout,
		blAmout: blAmout,
		baseUri: baseUri
	};
}

export const addOgList = async (provider, wallet, newLists) => {
	console.log(newLists);
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.addOgList(
		stakingBump,
		newLists,
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const addWlList = async (provider, wallet, newLists) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.addWlList(
		stakingBump,
		newLists,
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const addBlList = async (provider, wallet, newLists) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.addBlList(
		stakingBump,
		newLists,
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const removeOgList = async (provider, wallet, newLists) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.removeOgList(
		stakingBump,
		newLists,
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const removeWlList = async (provider, wallet, newLists) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.removeWlList(
		stakingBump,
		newLists,
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const removeBlList = async (provider, wallet, newLists) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.removeBlList(
		stakingBump,
		newLists,
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const updatePrice = async (provider, wallet, ogPrice, wlPrice, blPrice) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.updatePrice(
		stakingBump,
		new anchor.BN(ogPrice).mul(new anchor.BN(1e6)),
		new anchor.BN(wlPrice).mul(new anchor.BN(1e6)),
		new anchor.BN(blPrice).mul(new anchor.BN(1e6)),
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const updateAmount = async (provider, wallet, ogPrice, wlPrice, blPrice) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.updateAmount(
		stakingBump,
		new anchor.BN(ogPrice),
		new anchor.BN(wlPrice),
		new anchor.BN(blPrice),
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const setStage = async (provider, wallet, newStage) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.setStage(
		stakingBump,
		newStage,
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const setUri = async (provider, wallet, newUri) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.setUri(
		stakingBump,
		newUri,
		{
			accounts: {
				mintingAccount: stakingPubkey,
				admin: wallet.publicKey
			}
		}
	);
}

export const initialize = async (provider, wallet) => {
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	await program.rpc.initialize(
		stakingBump,
		wallet.publicKey,
		new anchor.BN(9999),
		new anchor.BN(20),
		new anchor.BN(20),
		new anchor.BN(20),
		new anchor.BN(15e8),
		new anchor.BN(2e9),
		new anchor.BN(2e9),
		new anchor.BN(0),
		1,
		{
		accounts: {
		mintingAccount: stakingPubkey,
		initializer: wallet.publicKey,
		systemProgram: SystemProgram.programId,
		tokenProgram: TOKEN_PROGRAM_ID,
		rent: anchor.web3.SYSVAR_RENT_PUBKEY,
		},
	});

}

export const mintLootBox = async (provider, wallet, metadataUrl, _price, count) => {
	_price = _price * 1000;
	const { SystemProgram, Keypair } = web3;
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	const [userMintingPubkey, userMintingBump] =
		await web3.PublicKey.findProgramAddress(
		[wallet.publicKey.toBuffer()],
		program.programId
		);
	const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
	let lamports = await program.provider.connection.getMinimumBalanceForRentExemption(
		MINT_SIZE
	);
	// lamports = new anchor.BN(lamports).add(new anchor.BN(1e6).mul(new anchor.BN(_price)));
	const pp = new anchor.BN(1e6).mul(new anchor.BN(_price));
		console.log(lamports, ":ram");
	const getMetadata = async (
		mint
		) => {
		return (
			await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				mint.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM_ID
			)
		)[0];
		};
	const getMasterEdition = async (
		mint
		) => {
		return (
			await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				mint.toBuffer(),
				Buffer.from("edition"),
			],
			TOKEN_METADATA_PROGRAM_ID
			)
		)[0];
		};
	const owner = new PublicKey("FgXexHGzVMt6JTPamAXSa3EJKPPxxWKL5wivYVGWuGLe");
	const mint_tx = new anchor.web3.Transaction();
	const mintKey = anchor.web3.Keypair.generate();
	const NftTokenAccount = await getAssociatedTokenAddress(
		mintKey.publicKey,
		provider.wallet.publicKey
	);
	mint_tx.add(
		anchor.web3.SystemProgram.createAccount({
			fromPubkey: wallet.publicKey,
			newAccountPubkey: mintKey.publicKey,
			space: MINT_SIZE,
			programId: TOKEN_PROGRAM_ID,
			lamports,
		}),
		createInitializeMintInstruction(
			mintKey.publicKey,
			0,
			wallet.publicKey,
			wallet.publicKey
		),
		createAssociatedTokenAccountInstruction(
			wallet.publicKey,
			NftTokenAccount,
			wallet.publicKey,
			mintKey.publicKey
		),

		SystemProgram.transfer({
			fromPubkey: provider.wallet.publicKey,
			toPubkey: owner,
			lamports: pp,
			})
		);		
	const res = await program.provider.send(mint_tx, [mintKey]);
	console.log("Account: ", res);
	const metadataAddress = await getMetadata(mintKey.publicKey);
	const masterEdition = await getMasterEdition(mintKey.publicKey);
	// get data from url
	const response = await fetch(metadataUrl);
	const data = await response.json();
	const tx = await program.methods.mintNft(
		mintKey.publicKey,
		metadataUrl,
		data.name,
		stakingBump,
		userMintingBump,
		)
		.accounts({
			mintAuthority: wallet.publicKey,
			mint: mintKey.publicKey,
			tokenProgram: TOKEN_PROGRAM_ID,
			metadata: metadataAddress,
			tokenAccount: NftTokenAccount,
			tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
			payer: wallet.publicKey,
			owner: owner,
			mintingAccount:stakingPubkey,
			userMintingCounterAccount: userMintingPubkey,
			systemProgram: SystemProgram.programId,
			rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			masterEdition: masterEdition,
		},
		)
		.rpc();
		return tx;
}

export const multiMint = async (provider, wallet, _price, count) => {
	_price = _price * 1000;
	const { SystemProgram, Keypair } = web3;
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const [stakingPubkey, stakingBump] =
		await web3.PublicKey.findProgramAddress(
		[Buffer.from(utils.bytes.utf8.encode('teacher_minting'))],
		program.programId
		);
	const [userMintingPubkey, userMintingBump] =
		await web3.PublicKey.findProgramAddress(
		[wallet.publicKey.toBuffer()],
		program.programId
		);
	const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
	let lamports = await program.provider.connection.getMinimumBalanceForRentExemption(
		MINT_SIZE
	);
	const pp = new anchor.BN(1e6).mul(new anchor.BN(_price));
	const owner = new PublicKey("FgXexHGzVMt6JTPamAXSa3EJKPPxxWKL5wivYVGWuGLe");
	const getMetadata = async (
		mint
		) => {
		return (
			await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				mint.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM_ID
			)
		)[0];
		};
	const getMasterEdition = async (
		mint
		) => {
		return (
			await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				mint.toBuffer(),
				Buffer.from("edition"),
			],
			TOKEN_METADATA_PROGRAM_ID
			)
		)[0];
		};

	const signersMatrix = [];
  	const instructionsMatrix = [];
	for (let index = 0; index < count; index++) {
		const mintKey = anchor.web3.Keypair.generate();
		const NftTokenAccount = await getAssociatedTokenAddress(
			mintKey.publicKey,
			provider.wallet.publicKey
		);
		const signers = [mintKey];
      	const cleanupInstructions = [];
		const instructions = [
			anchor.web3.SystemProgram.createAccount({
				fromPubkey: wallet.publicKey,
				newAccountPubkey: mintKey.publicKey,
				space: MINT_SIZE,
				programId: TOKEN_PROGRAM_ID,
				lamports,
			}),
			createInitializeMintInstruction(
				mintKey.publicKey,
				0,
				wallet.publicKey,
				wallet.publicKey
			),
			createAssociatedTokenAccountInstruction(
				wallet.publicKey,
				NftTokenAccount,
				wallet.publicKey,
				mintKey.publicKey
			),
			SystemProgram.transfer({
				fromPubkey: provider.wallet.publicKey,
				toPubkey: owner,
				lamports: pp,
			  })
		];		
		const metadataAddress = await getMetadata(mintKey.publicKey);
		const masterEdition = await getMasterEdition(mintKey.publicKey);
		instructions.push(
			await program.instruction.mintNft(
				mintKey.publicKey,
				"Tnft",
				{
					accounts: {
						mintAuthority: wallet.publicKey,
						mint: mintKey.publicKey,
						tokenProgram: TOKEN_PROGRAM_ID,
						metadata: metadataAddress,
						tokenAccount: NftTokenAccount,
						tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
						payer: wallet.publicKey,
						owner: owner,
						mintingAccount: stakingPubkey,
						userMintingCounterAccount: userMintingPubkey,
						systemProgram: SystemProgram.programId,
						rent: anchor.web3.SYSVAR_RENT_PUBKEY,
						masterEdition: masterEdition,
					}
				}),
		);
		signersMatrix.push(signers);
		instructionsMatrix.push(instructions);
		if (cleanupInstructions.length > 0) {
			instructionsMatrix.push(cleanupInstructions);
			signersMatrix.push([]);
		}
	}
	try {
		return (
		  await sendTransactions(
			provider.connection,
			provider.wallet,
			instructionsMatrix,
			signersMatrix
		  )
		).txs.map(t => t.txid);
	  } catch (e) {
		console.log(e);
	  }
	
	return [];
}

export const openLootBox = async (provider, wallet, name, symbol) => {
	const { SystemProgram, Keypair } = web3;
	const programID = new PublicKey(idl.metadata.address);
	const program = new Program(idl, programID, provider);
	const TOKEN_METADATA_PROGRAM_ID = new anchor.web3.PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");
	const lamports = await program.provider.connection.getMinimumBalanceForRentExemption(
		MINT_SIZE
	);

	const getMetadata = async (
		mint
		) => {
		return (
			await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				mint.toBuffer(),
			],
			TOKEN_METADATA_PROGRAM_ID
			)
		)[0];
		};
		const getMasterEdition = async (
		mint
		) => {
		return (
			await anchor.web3.PublicKey.findProgramAddress(
			[
				Buffer.from("metadata"),
				TOKEN_METADATA_PROGRAM_ID.toBuffer(),
				mint.toBuffer(),
				Buffer.from("edition"),
			],
			TOKEN_METADATA_PROGRAM_ID
			)
		)[0];
		};
	const mintKey = anchor.web3.Keypair.generate();
	// console.log(mintKey.publicKey + "");
	const NftTokenAccount = await getAssociatedTokenAddress(
		mintKey.publicKey,
		provider.wallet.publicKey
		);
		console.log("NFT Account: ", NftTokenAccount.toBase58());

		const mint_tx = new anchor.web3.Transaction().add(
		anchor.web3.SystemProgram.createAccount({
			fromPubkey: wallet.publicKey,
			newAccountPubkey: mintKey.publicKey,
			space: MINT_SIZE,
			programId: TOKEN_PROGRAM_ID,
			lamports,
		}),
		createInitializeMintInstruction(
			mintKey.publicKey,
			0,
			wallet.publicKey,
			wallet.publicKey
		),
		createAssociatedTokenAccountInstruction(
			wallet.publicKey,
			NftTokenAccount,
			wallet.publicKey,
			mintKey.publicKey
		)
		);
	const res = await program.provider.send(mint_tx, [mintKey]);
	console.log(
		await program.provider.connection.getParsedAccountInfo(mintKey.publicKey)
	);
	console.log("Account: ", res);
	console.log("Mint key: ", mintKey.publicKey.toString());
	console.log("User: ", program.provider.wallet.publicKey.toString());
	const metadataAddress = await getMetadata(mintKey.publicKey);
	const masterEdition = await getMasterEdition(mintKey.publicKey);
	console.log("Metadata address: ", metadataAddress.toBase58());
	console.log("MasterEdition: ", masterEdition.toBase58());
	console.log(SystemProgram.programId + "")
	
	const tx = await program.methods.openLootbox(
		mintKey.publicKey,
		// "https://arweave.net/Isuue2pI2LM3gGozamGPX2YHNRFlLHXWFc60otl8WnY",
		name,
		symbol
		)
		.accounts({
			mintAuthority: wallet.publicKey,
			mint: mintKey.publicKey,
			tokenAccount: NftTokenAccount,
			tokenProgram: TOKEN_PROGRAM_ID,
			metadata: metadataAddress,
			tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
			payer: wallet.publicKey,
			systemProgram: SystemProgram.programId,
			rent: anchor.web3.SYSVAR_RENT_PUBKEY,
			masterEdition: masterEdition,
		},
		)
		.rpc();
		return tx;
}

export const getProvider = async (wallet) => {
	const network = "https://metaplex.devnet.rpcpool.com";
	const connection = new Connection(network, 'processed');

	const provider = new Provider(
		connection, wallet, 'processed',
	);
	return provider;
}