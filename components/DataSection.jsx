import React from "react";

const DataSection = ({
  fusnBalance,
  daiBalance,
  earnedTokens,
  lendingBalance,
  borrowBalance,
  collateralBalance,
}) => {
  return (
    <div className="flex gap-6">
      <div className="flex flex-row w-1/2 p-4 bg-gray-900 rounded-lg justify-evenly gap-y-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-x-3 gap-y-3">
            <div className="text-xs font-medium text-secondary ">Lending</div>
            <span className="text-xs font-medium text-white">{collateralBalance}% APY</span>
          </div>
          <div className="text-xl font-semibold text-white">
            {earnedTokens} PPT
          </div>
          <div className="text-sm tracking-wide text-gray-500">
            {lendingBalance} PPP
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex items-center gap-x-3 gap-y-3">
            <div className="text-xs font-medium text-primary ">Borrowing</div>
            <span className="text-xs font-medium text-white">0.3% fee</span>
          </div>
          <div className="text-xl font-semibold text-white">
            {borrowBalance} PPP
          </div>
          <div className="text-sm tracking-wide text-gray-500">
            {collateralBalance} Ξ
          </div>
        </div>
      </div>

      <div className="flex flex-row w-1/2 p-4 bg-gray-900 rounded-lg justify-evenly gap-y-3">
        <div className="flex flex-col justify-around">
          <div className="flex items-center gap-x-3 gap-y-3">
            <div className="text-xs font-medium text-primary ">
              PPT Wallet Balance
            </div>
          </div>
          <div className="text-xl font-semibold text-white">
            {fusnBalance} PPT
          </div>
        </div>
        <div className="flex flex-col justify-around">
          <div className="flex items-center gap-x-3 gap-y-3">
            <div className="text-xs font-medium text-secondary ">
              PPP Wallet Balance
            </div>
          </div>
          <div className="text-xl font-semibold text-white">
            {daiBalance} PPP
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSection;
