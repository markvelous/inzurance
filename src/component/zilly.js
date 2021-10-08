import { BN, Long, bytes, units } from "@zilliqa-js/util";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { toBech32Address, getAddressFromPrivateKey } from "@zilliqa-js/crypto";
import { useState } from "react";

const zilliqa = new Zilliqa("https://dev-api.zilliqa.com");

// These are set by the core protocol, and may vary per-chain.
// You can manually pack the bytes according to chain id and msg version.
// For more information: https://apidocs.zilliqa.com/?shell#getnetworkid

const chainId = 333; // chainId of the developer testnet
const msgVersion = 1; // current msgVersion
const VERSION = bytes.pack(chainId, msgVersion);

// Populate the wallet with an account
const privateKey = "cb66fa6fd54d4e8039690d4e78e2651098eafe6de35fac79d331a64f14751a53";
const policyWarehouse = zilliqa.contracts.at("0xbd36faca0c2d1532e35ac18e04b0e8923552b066");
const deployedContract = zilliqa.contracts.at(policyWarehouse.address);

zilliqa.wallet.addByPrivateKey(privateKey);

const address = getAddressFromPrivateKey(privateKey);
console.log(`My account address is: ${address}`);
console.log(`My account bech32 address is: ${toBech32Address(address)}`);

const myGasPrice = units.toQa("2000", units.Units.Li); // Gas Price that will be used by all transactions

//====================================================  Component Starts here  ====================================================//

export const ZILLY = () => {
  const [productName, setProductName] = useState("");
  const [lifeAssuredName, setLifeAssuredName] = useState("");
  const [policyID, setPolicyID] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeAddr, setEmployeeAddr] = useState("");
  const [employeeType, setEmployeeType] = useState("");

  const productNameChangeHandler = (event) => {
    setProductName(event.target.value);
  };
  const lifeAssuredNameChangeHandler = (event) => {
    setLifeAssuredName(event.target.value);
  };
  const policyIDChangeHandler = (event) => {
    setPolicyID(event.target.value);
  };

  const employeeNameChangeHandler = (event) => {
    setEmployeeName(event.target.value);
  };
  const employeeAddrChangeHandler = (event) => {
    setEmployeeAddr(event.target.value);
  };
  const employeeTypeChangeHandler = (event) => {
    setEmployeeType(event.target.value);
  };

  // useEffect(() => {
  //   const getchContract = async () => {
  //     setPolicyWarehouse(await zilliqa.contracts.at("0x1482df8615c003d370c286e694555842edbfb29a"));
  //     setDeployedContract(await zilliqa.contracts.at(policyWarehouse.address));
  //   };
  //   getchContract();
  // });

  const handleAddEmployee = async () => {
    console.log(
      `Calling addEmployee transition with : name = ${employeeName}, addr = ${employeeAddr}, type =${employeeType}`
    );

    const callTx = await policyWarehouse.call(
      "addEmployee",
      [
        {
          vname: "name",
          type: "String",
          value: employeeName,
        },
        {
          vname: "addr",
          type: "ByStr20",
          value: employeeAddr,
        },
        {
          vname: "employeeType",
          type: "Uint32",
          value: employeeType,
        },
      ],
      {
        // amount, gasPrice and gasLimit must be explicitly provided
        version: VERSION,
        amount: new BN(0),
        gasPrice: myGasPrice,
        gasLimit: Long.fromNumber(8000),
      },
      33,
      1000,
      false
    );

    // Retrieving the transaction receipt (See note 2)
    console.log(JSON.stringify(callTx.receipt, null, 4));

    //Get the contract state
    console.log("Getting contract state...");
    const state = await deployedContract.getState();
    console.log("The state of the contract is:");
    console.log(JSON.stringify(state, null, 4));

    setEmployeeName("");
    setEmployeeAddr("");
    setEmployeeType("");
  };

  const handleAddPolicy = async () => {
    console.log(
      `Calling addPolicy transition with : product = ${productName}, life assured = ${lifeAssuredName}, policyID =${policyID}`
    );
    const callTx = await policyWarehouse.call(
      "addPolicy",
      [
        {
          vname: "productName",
          type: "String",
          value: productName,
        },
        {
          vname: "lifeAssuredName",
          type: "String",
          value: lifeAssuredName,
        },
        {
          vname: "policyID",
          type: "Uint32",
          value: policyID,
        },
      ],
      {
        // amount, gasPrice and gasLimit must be explicitly provided
        version: VERSION,
        amount: new BN(0),
        gasPrice: myGasPrice,
        gasLimit: Long.fromNumber(8000),
      },
      33,
      1000,
      false
    );

    // Retrieving the transaction receipt (See note 2)
    console.log(JSON.stringify(callTx.receipt, null, 4));

    //Get the contract state
    console.log("Getting contract state...");
    const state = await deployedContract.getState();
    console.log("The state of the contract is:");
    console.log(JSON.stringify(state, null, 4));

    setProductName("");
    setPolicyID("");
    setLifeAssuredName("");
  };

  const handleRemovePolicy = async () => {
    console.log(
      `Calling removePolicy transition with : ${productName}, life assured = ${lifeAssuredName}, policyID =${policyID}`
    );
    const callTx = await policyWarehouse.call(
      "removePolicy",
      [
        {
          vname: "policyID",
          type: "Uint32",
          value: policyID,
        },
      ],
      {
        // amount, gasPrice and gasLimit must be explicitly provided
        version: VERSION,
        amount: new BN(0),
        gasPrice: myGasPrice,
        gasLimit: Long.fromNumber(8000),
      },
      33,
      1000,
      false
    );

    // Retrieving the transaction receipt (See note 2)
    console.log(JSON.stringify(callTx.receipt, null, 4));

    //Get the contract state
    console.log("Getting contract state...");
    const state = await deployedContract.getState();
    console.log("The state of the contract is:");
    console.log(JSON.stringify(state, null, 4));

    setPolicyID("");
  };

  const handleUpdatePolicy = async () => {
    console.log(`Calling updatePolicy transition with : policyID =${policyID}`);
    const callTx = await policyWarehouse.call(
      "updatePolicy",
      [
        {
          vname: "productName",
          type: "String",
          value: productName,
        },
        {
          vname: "lifeAssuredName",
          type: "String",
          value: lifeAssuredName,
        },
        {
          vname: "policyID",
          type: "Uint32",
          value: policyID,
        },
      ],
      {
        // amount, gasPrice and gasLimit must be explicitly provided
        version: VERSION,
        amount: new BN(0),
        gasPrice: myGasPrice,
        gasLimit: Long.fromNumber(8000),
      },
      33,
      1000,
      false
    );

    // Retrieving the transaction receipt (See note 2)
    console.log(JSON.stringify(callTx.receipt, null, 4));

    //Get the contract state
    console.log("Getting contract state...");
    const state = await deployedContract.getState();
    console.log("The state of the contract is:");
    console.log(JSON.stringify(state, null, 4));

    setProductName("");
    setPolicyID("");
    setLifeAssuredName("");
  };

  return (
    <div className="border-none border-black min-h-screen bg-white"> 

      <div className="border-none bg-gray-50 border-blue-500 text-white text-2xl pb-2 pt-1 text-left h-11 px-32 ">
              
          <div className="h-10 float-left border-none border-green-300 ml-5 mt-1.5">
           
            <div className="mr-3 bg-gray-5002xs:mr-1.5 border-none float-left  text-base rounded-md text-black px-1">
              <div className="float-right font-myUbuntu font-bold text-xl">
              <img src="https://img.icons8.com/office/24/000000/facebook-new.png"/>
              </div>
            </div>
            
            <div className="mr-3 2xs:mr-1.5 border-none float-left  text-base rounded-md text-black px-1">
              <div className="float-right font-myUbuntu font-bold text-xl">
              <img src="https://img.icons8.com/offices/24/000000/twitter.png"/>
              </div>
            </div>

            <div className="border-none mr-3 2xs:mr-0 float-left  text-base text-black rounded-md px-1 ">
              <div className="float-right font-myUbuntu font-bold text-xl">
              <img src="https://img.icons8.com/offices/24/000000/instagram-new.png"/>
              </div>
            </div>

          </div>

          <div className="h-10 float-right border-none border-green-300 ml-5 mt-1 ">
            
            <div className="border-none mr-5 2xs:mr-0 float-left mt-1 text-base text-black rounded-md px-1 ">
              <div className="float-right font-myUbuntu font-bold text-base">
                Make a Claim
              </div>
            </div>

            <div className=" border-none mr-5 2xs:mr-0 float-left mt-1 text-base text-black rounded-md px-1">
              <div className="float-right font-myUbuntu font-bold text-base">
                Services
              </div>
            </div>

            <div className="border-none mr-5 2xs:mr-0 float-left mt-1 text-base text-black rounded-md px-1 ">
              <div className="float-right font-myUbuntu font-bold text-base">
                Solution Center
              </div>
            </div>
          
          </div>
      
      </div>

      <div className="border-none bg-white border-blue-500 text-white text-2xl  pb-2 pt-2  text-left   h-28  px-32 ">
             <div className="h-10 float-left border-none border-green-300 ml-5 mt-1.5">
                <div className="h-12 border-none border-gray-400 2xl:float-left xl:float-left lg:float-left md:float-left sm:float-left  xs:clear-both 2xl:clear-both; xs:w-44 2xl:w-auto xl:w-auto lg:w-auto  2xs:w-44 2xs:mx-auto  ">   
                      <div className="border-none p-3 border-red-500  float-left w-20 h-20 2xl:hidden xl:block lg:block md:block sm:block">
                        <img src="/images/inzurance.png" alt=""></img> 
                      </div>
                      <div className="float-right text-black mt-5"> 
                        Inzurance
                      <div className="clear-both">
                    </div>
                  </div>
                </div>
             </div>
    
             <div className="h-20 float-right border-none border-green-300 ml-5 mt-3">
               
                <div className="border-none mr-10 2xs:mr-0 float-left mt-4 text-base text-black rounded-md px-1 ">
                  <div className="float-right font-myUbuntu font-bold text-base">
                    <div className="float-left font-myUbuntu font-bold text-base mt-2.5 mr-2  rounded-lg">
                      <img src="https://img.icons8.com/offices/20/000000/email.png"/>
                    </div>

                    <div className="float-right"> 
                        contact@inzurance.sg
                      <div className="clear-both">
                        Drop us a line
                      </div>
                    </div>
                  </div>
                </div>
    
                <div className=" border-none mr-10 2xs:mr-0 float-left mt-4 text-base text-black rounded-md px-1">
                  <div className="float-right font-myUbuntu font-bold text-base">
                    <div className="float-left font-myUbuntu font-bold text-base mt-2.5 mr-2  rounded-lg">
                      <img src="https://img.icons8.com/offices/25/000000/phone-disconnected.png"/>
                    </div>
                    <div className="float-right"> 
                      +65 8118 8118
                      <div className="clear-both">
                      Make a call
                      </div>
                    </div>
                  </div>
                </div>
    
                <div className="border-none mr-2 2xs:mr-0 float-left mt-4 text-base text-black rounded-md px-1 ">
                  <div className="float-right font-myUbuntu font-bold text-base bg-gray-100 py-2 px-3 rounded-lg">
                    <div className="float-left font-myUbuntu font-bold text-base bg-gray-100 rounded-lg mr-2 mt-0.5">
                      <img src="https://img.icons8.com/offices/20/000000/gmail-login.png"/>
                    </div>
                    GET A QUOTE
                  </div>
                </div>
              
             </div>
      </div>
    
      <div className="border-none rounded-xl bg-gray-50 border-blue-500 text-white text-2xl  pb-2 pt-1  text-left w-10/12  h-16 mx-auto mb-10 px-7 ">
                
              <div className="h-10 float-left border-none border-green-300 ml-5 mt-3 ">
                    
                <div className="border-none mr-5 2xs:mr-0 float-left mt-1 text-base text-black rounded-md px-1 ">
                  <div className="float-right font-myUbuntu font-bold text-base">
                   HOME
                  </div>
                </div>
    
                <div className=" border-none mr-5 2xs:mr-0 float-left mt-1 text-base text-black rounded-md px-1">
                  <div className="float-right font-myUbuntu font-bold text-base">
                   INSURANCE
                  </div>
                </div>
    
                <div className="border-none mr-5 2xs:mr-0 float-left mt-1 text-base text-black rounded-md px-1 ">
                  <div className="float-right font-myUbuntu font-bold text-base">
                    BLOG
                  </div>
                </div>

                <div className="border-none mr-5 2xs:mr-0 float-left mt-1 text-base text-black rounded-md px-1 ">
                  <div className="float-right font-myUbuntu font-bold text-base">
                   CONTACT
                  </div>
                </div>
              
              </div>

              <div className="h-10 float-right border-none border-green-300 ml-5 mt-2 ">
              
                <div className="border-none shadow-sm mr-5 2xs:mr-0 float-left px-5 py-2 text-base text-black rounded-md bg-white ">
                  <div className="float-left font-myUbuntu font-bold text-base mr-2">
                    <img src="https://img.icons8.com/material-rounded/24/000000/find-and-replace.png"/>
                  </div>
                  <div className="float-right font-myUbuntu font-bold text-base">
                    Search
                  </div>
                </div>
              
              </div>
          
      </div>
  
      <div className="border-none border-green-900 clear-both mt-30 mb-20 text-left w-10/12 mx-auto ">

        <div className="border-none border-yellow-400 mt-5 mb-10 font-myUbuntu font-bold w-11/12 mx-auto h-24">
            <div className="border-b-none border-black text-gray-900 mb-4 w-36">
              ADD EMPLOYEE
            </div>
            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Name of Employee</div>
              <input className="border-2 rounded-md " type="text" onChange={employeeNameChangeHandler}></input>
            </div>

            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Address</div>
              <input type="text" className="border-2 rounded-md" type="text"  onChange={employeeAddrChangeHandler}></input>
            </div>

            <div className="border-none border-red-500 float-left mr-10">
                <div className=" font-myUbuntu clear-both mb-0.5">Employee Type</div>
                <input type="text"  className="border-2 rounded-md" type="text"   onChange={employeeTypeChangeHandler}></input>
            </div>
        
            <div className="border-none border-red-500 float-right mt-2 ">
              <div className="border-none shadow-sm  2xs:mr-0 float-left px-5 py-2 text-base text-black rounded-md bg-gray-100"> 
                <button className="font-myUbuntu font-bold" onClick={handleAddEmployee}>Add</button>
              </div>
            </div>
        </div>

        <div className="border-none border-yellow-400 mt-5 mb-10 font-myUbuntu font-bold h-24 w-11/12 mx-auto">
            <div className="border-b-none border-black text-gray-900 mb-4 w-36">
              ADD POLICY
            </div>
            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Policy ID</div>
              <input type="text"  className="border-2 rounded-md" type="text"   onChange={policyIDChangeHandler}></input>
            </div>

            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Name of Product</div>
              <input className="border-2 rounded-md " type="text" onChange={productNameChangeHandler}></input>
            </div>

            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Policy Holder</div>
              <input type="text" className="border-2 rounded-md" type="text"  onChange={lifeAssuredNameChangeHandler}></input>
            </div>
          
            <div className="border-none border-red-500 float-right mt-2 ">
              <div className="border-none shadow-sm  2xs:mr-0 float-left px-5 py-2 text-base text-black rounded-md bg-gray-100">   
                <button className="font-myUbuntu font-bold" onClick={handleAddPolicy}>Create</button>
              </div>
            </div>
        </div>

        <div className="border-none border-yellow-400 mt-5 mb-10 font-myUbuntu font-bold h-24 w-11/12 mx-auto">
            <div className="border-b-none border-black text-gray-900 mb-4 w-36">
              UPDATE POLICY
            </div>
            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Policy ID</div>
              <input type="text"  className="border-2 rounded-md" type="text"   onChange={policyIDChangeHandler}></input>
            </div>

            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Name of Product</div>
              <input className="border-2 rounded-md " type="text" onChange={productNameChangeHandler}></input>
            </div>

            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Policy Holder</div>
              <input type="text" className="border-2 rounded-md" type="text"  onChange={lifeAssuredNameChangeHandler}></input>
            </div>
          
            <div className="border-none border-red-500 float-right mt-2 ">
              <div className="border-none shadow-sm  2xs:mr-0 float-left px-5 py-2 text-base text-black rounded-md bg-gray-100">    
                <button className="font-myUbuntu font-bold" onClick={handleUpdatePolicy}>Update</button>
              </div>
            </div>
        </div>

        <div className="border-none border-yellow-400 mt-5 mb-10 font-myUbuntu font-bold h-24 w-11/12 mx-auto">
            <div className="border-b-none border-black text-gray-900 mb-4 w-36">
              DELETE POLICY
            </div>
            <div className="border-none border-red-500 float-left mr-10">
              <div className=" font-myUbuntu clear-both mb-0.5">Policy ID</div>
              <input  className="border-2 rounded-md" type="text" onChange={policyIDChangeHandler}></input>
            </div>
            <div className="border-none border-red-500 float-right mt-2  ">
              <div className="border-none shadow-sm  2xs:mr-0 float-left px-5 py-2 text-base text-black rounded-md bg-gray-100"> 
                <button className="font-myUbuntu font-bold" onClick={handleRemovePolicy}>Delete</button>
              </div>
            </div>
        </div>
        
      </div>
    
      <div className="border-none border-black bottom-0 w-full bg-gray-50 ">
          <div className="text-white text-3xl border-none border-gray-100 font-myKuaiLe h-14 pt-1 pl-9 pr-4 border-b-4">
            
            <div className="border-none border-red-500 w-80 h-8 mt-2 float-left font-myUbuntu">
              <div className="border-none  border-red-500  float-left w-8 h-8 2xl:hidden xl:block lg:block md:block sm:block">
                <img src="/images/inzurance.png" alt=""></img> 
              </div>
              <div className="float-left text-base font-bold font-myUbuntu text-black ml-1 mt-0.5">Copyright © 2021 </div>
              <div className="float-left text-base font-bold ml-1 font-myUbuntu text-black mt-0.5">Inzurance</div>
            </div>  

            <div className="border-2 border-none w-64 h-8 mt-3.5 float-right"> 
              <div className="float-left text-sm font-bold font-myUbuntu text-black">Terms & Condition </div>
              <div className="float-left  font-myUbuntu  text-sm font-bold ml-4 text-black">Privacy</div>
              <div className="float-left  font-myUbuntu text-sm font-bold ml-4 text-black">Helps</div>
            </div> 

          </div>   
      </div>
                         
    </div>
  );
};
