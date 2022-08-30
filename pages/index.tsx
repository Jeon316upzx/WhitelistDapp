import type { NextPage } from "next";
import { useWeb3React } from "@web3-react/core";
import { ImGift } from "react-icons/im";
import { ABI, CONTRACT_ADDRESS } from "../constants/Abi";
import { ethers } from "ethers";

import { useEffect, useState } from "react";

declare let window: any;

const Home: NextPage = () => {
  const { account } = useWeb3React();
  const [signer, setSigner] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [text, setText] = useState<string>("Claim Spot")
  const [total, setTotal] = useState<any>()
  const [claim, setClaimed] = useState<any>()

  useEffect(() => {
    const p = new ethers.providers.Web3Provider(window.ethereum);
    const s = p.getSigner();
    setSigner(s);
    totalCapacity()
    getNumOfWhiteListed()
  }, []);

  const claimSpot = async () => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      setLoading(true);
      await contract.addToWhiteList();
      setLoading(false)
      setText('Congratulations!!!')
    } catch (e) {
      setLoading(false);
    }
  };

  const getNumOfWhiteListed = async () => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      let data = await contract.addressesWhiteListed.call();
      setClaimed(data)
      console.log(data, "CLAIMED");
    } catch (e) {
      console.log(e);
    }
  };


  const totalCapacity = async ()=>{
    try{
      const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
      let data = await contract.numOfAddressToWhiteList.call();
      setTotal(data)
      console.log(data,"TOTAL")
    }catch(e){
       console.log(e)
    }
    
  }

  return (
    <div className="min-h-[85vh] mx-10">
      <div className="top">
        <div className="mission-statement">
          <span className="opacity-90">
            {!account
              ? "Get early access to our Flappy bird NFTs."
              : "Claim your spot to stand a chance for our NFT discount"}
          </span>
          <br />
          <span className="text-2xl opacity-40 flex items-center">
            {" "}
            Bonus discounts are available for whitelisted accounts.{" "}
            <ImGift size={20} />{" "} 
          </span>

          {account && (
            <button
              className="rounded-full bg-pink-400 px-8 py-2 text-lg"
              onClick={() => {
                claimSpot();
              }}
            >
              {loading ? "Claiming Spot ..." : text}
            </button>
          )}
          <br/>
          {
            account && <span className="text-sm"> {claim } of {total}  spots claimed.</span>
          }
        </div>
        <div className="flex justify-center items-center">
          {account ? (
            <img
              src="/imgs/bf1.png"
              alt={"background"}
              height={600}
              width={600}
            />
          ) : (
            <img
              src="/imgs/bt2.png"
              alt={"background"}
              height={600}
              width={600}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
