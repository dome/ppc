import { ethers } from "ethers";
import { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import {
  fusionCoreAddress,
  fusionCoreAbi,
  fusionTokenAddress,
  fusionTokenAbi,
  daiAddress,
  daiAbi,
} from "../constants";

import DataSection from "../components/DataSection.jsx";
import ControlSection from "../components/ControlSection.jsx";
import CollateralSection from "../components/CollateralSection.jsx";
import PositionSection from "../components/PositionSection.jsx";
import ErrorSection from "../components/ErrorSection.jsx";

export default function App() {
  const [pptBalance, setPPTBalance] = useState(0);
  const [daiBalance, setDaiBalance] = useState(0);
  const [earnedTokens, setEarnedTokens] = useState(0);
  const [borrowingYield, setBorrowingYield] = useState(0);
  const [borrowBalance, setBorrowBalance] = useState(0);
  const [collateralBalance, setCollateralBalance] = useState(0);
  const [borrowLimit, setBorrowLimit] = useState(0);
  const [collateralPrice, setcollateralPrice] = useState(0);
  const [liquidationPoint, setLiquidationPoint] = useState(0);

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis();
  const chainId = parseInt(chainIdHex);

  const coreAddress =
    chainId in fusionCoreAddress ? fusionCoreAddress[chainId] : null;
  const tokenAddress =
    chainId in fusionTokenAddress ? fusionTokenAddress[chainId] : null;
  const baseAssetAddress = chainId in daiAddress ? daiAddress[chainId] : null;

  useEffect(() => {
    const getPPTBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const tokenContract = new ethers.Contract(
        tokenAddress,
        fusionTokenAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawBalance = await tokenContract.balanceOf(address);
      const balance = Number.parseFloat(
        ethers.utils.formatEther(rawBalance)
      ).toFixed(5);
      setPPTBalance(balance);
    };
    const getDaiBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const daiContract = new ethers.Contract(baseAssetAddress, daiAbi, signer);
      const address = await signer.getAddress();
      const rawBalance = await daiContract.balanceOf(address);
      const balance = Number.parseFloat(
        ethers.utils.formatEther(rawBalance)
      ).toFixed(3);
      setDaiBalance(balance);
    };
    const getEarnedTokens = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawEarnedAmount = await coreContract.getEarnedPointPlusTokens(
        address
      );
      const earnedAmount = Number.parseFloat(
        ethers.utils.formatEther(rawEarnedAmount)
      ).toFixed(5);
      setEarnedTokens(earnedAmount);
    };
    const getBorrowingYield = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const rawAmount = await coreContract.getYield();
      console.log(rawAmount);
      const amount = Number.parseFloat(
        (rawAmount)
      ).toFixed(2);
      console.log(amount);
      setBorrowingYield(amount);
    };
    const getBorrowBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getBorrowBalance(address);
      const amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      ).toFixed(3);
      setBorrowBalance(amount);
    };
    const getCollateralBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getCollateralBalance(address);
      const amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      ).toFixed(3);
      console.log(amount);
      setCollateralBalance(amount);
    };
    const getBorrowLimit = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getBorrowLimit(address);
      const amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      ).toFixed(3);
      setBorrowLimit(amount);
    };
    const getLiquidationPoint = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getLiquidationPoint(address);
      // console.log(rawAmount);
      const amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      ).toFixed(3);
      setLiquidationPoint(amount);
    };
    const getcollateralPrice = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const coreContract = new ethers.Contract(
        coreAddress,
        fusionCoreAbi,
        signer
      );
      const address = await signer.getAddress();
      const rawAmount = await coreContract.getCollatAssetPrice();
      let amount = Number.parseFloat(
        ethers.utils.formatEther(rawAmount)
      );
      amount = (amount * 1e8).toFixed(4);
      //console.log(amount);
      setcollateralPrice(amount);
    };
    if (isWeb3Enabled && coreAddress) {
      getPPTBalance();
      getDaiBalance();
      getEarnedTokens();
      getBorrowingYield();
      getBorrowBalance();
      getCollateralBalance();
      getBorrowLimit();
      getLiquidationPoint();
      getcollateralPrice();
    }
  }, [isWeb3Enabled, coreAddress, tokenAddress, baseAssetAddress]);

  if (!isWeb3Enabled) {
    return <ErrorSection x={true} />;
  }

  if (!coreAddress) {
    return <ErrorSection x={false} />;
  }

  return (
    <div className="flex w-full min-h-screen font-sans bg-primaryBg">
      <main className="flex flex-col flex-1 gap-6 p-8">
        <header>
          <h1 className="text-3xl font-semibold text-white">Dashboard</h1>
        </header>
        <hr className="border-secondary" />
        <DataSection
          pptBalance={pptBalance}
          daiBalance={daiBalance}
          earnedTokens={earnedTokens}
          borrowingYield={borrowingYield}
          borrowBalance={borrowBalance}
          collateralBalance={collateralBalance}
        />
        <CollateralSection
          collateralBalance={collateralBalance}
          coreAddress={coreAddress}
          coreAbi={fusionCoreAbi}
        />
      </main>
      <aside className="flex flex-col pt-6 pr-6 gap-y-6 w-96">
        <ControlSection
          coreAddress={coreAddress}
          coreAbi={fusionCoreAbi}
          daiAddress={baseAssetAddress}
          daiAbi={daiAbi}
        />
        <PositionSection
          collateralBalance={collateralBalance}
          collateralPrice={collateralPrice}
          borrowLimit={borrowLimit}
          liquidationPoint={liquidationPoint}
          borrowBalance={borrowBalance}
        />
      </aside>
    </div>
  );
}
