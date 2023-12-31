import React from "react";

const PositionSection = ({
  borrowLimit,
  liquidationPoint,
  collateralPrice,
  collateralBalance,
  borrowBalance
}) => {
  let amount = 0 
  if (collateralBalance > 0) {
    amount = (liquidationPoint / collateralBalance / 100).toFixed(4);
  }

  return (
    <div className="flex flex-col p-6 bg-gray-900 rounded-lg gap-y-6">
      <hr className="border-secondary" />
      <div className="flex gap-x-7">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-start gap-x-2">
            <div className="text-sm font-medium text-white">
              Collateral Price:{" "}
            </div>
            <div className="text-sm font-medium text-primary">
              {collateralPrice} USD 
            </div>
          </div>
          <div className="flex items-start gap-x-2">
            <div className="text-sm font-medium text-white">
              Liquidatation Price:{" "}
            </div>
            <div className="text-sm font-medium text-primary">
              {amount} USD 
            </div>
          </div>          
          <div className="flex items-start gap-x-2">
            <div className="text-sm font-medium text-white">Borrow Limit: </div>
            <div className="text-sm font-medium text-primary">
              {borrowLimit} PPP
            </div>
          </div>
          
          <div className="flex items-start gap-x-2">
            <div className="text-sm font-medium text-white">
              Liquidation Point:{" "}
            </div>
            <div className="text-sm font-medium text-primary">
              {liquidationPoint}
            </div>
          </div>
          

        </div>
      </div>
    </div>
  );
};

export default PositionSection;
