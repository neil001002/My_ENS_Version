const main = async () => {
    // The first return is the deployer, the second is a random account
    const [owner, randomPerson] = await hre.ethers.getSigners();
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy();
    await domainContract.deployed();
    console.log("Contract deployed to:", domainContract.address);
    console.log("Contract deployed by:", owner.address);
  
    let txn = await domainContract.register("dev");
    await txn.wait();
  
    const domainAddress = await domainContract.getAddress("dev");
    console.log("Owner of domain dev:", domainAddress);
  
    // Trying to set a record that doesn't belong to me!
    txn = await domainContract.connect(owner).setRecord("dev", "Haha my domain now!");
    await txn.wait();

    //get new records
    const records = await domainContract.getRecord("dev");
    console.log("new record set to :", records)
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();