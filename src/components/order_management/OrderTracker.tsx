import { Icon } from "@iconify/react/dist/iconify.js";

const OrderTracker = () => {
  return (
    <div className="bggray-200/30 shadow-md border border-gray-200/30 rounded-md py-4">
      {/* Header */}
      <div className="flex justify-between items-center text-xs text-gray-500 mb-2 px-4">
        <div>
          Return to
          <span className="text-blue-600 font-medium ml-1">Fikri Store</span>
          <span className="inline-flex items-center ml-1">
            <span className="text-xs mr-1">🇺🇸</span> US, United State
          </span>
        </div>
        <div>
          Estimated arrived at
          <span className="font-semibold text-black ml-2">
            1st to 3rd of February
          </span>
        </div>
      </div>

      {/* Step Progress Bar */}
      <div className="flex justify-between  items-center border-t border-gray-200/60 pt-4 gap-3 px-4">
        {["Review order", "Preparing order", "Shipping", "Delivered"].map(
          (step, index) => {
            const isActive = index === 0;

            return (
              <div
                key={index}
                className="flex flex-col flex-1 text-center relative"
              >
                <div
                  className={`text-[13px] capitalize font-[400] flex items-center pb-2 ${
                    isActive ? "text-black" : "text-gray-400"
                  }`}
                >
                  {isActive && (
                    <span className="inline-block animate-spin mr-1">
                      <Icon
                        icon="icon-park-outline:loading-one"
                        className="h-4 w-4"
                      />
                    </span>
                  )}
                  {step}
                </div>
                {/* Progress Line */}
                {index <= 3 && (
                  <div
                    className={` w-full h-1 ${
                      isActive ? "bg-black" : "bg-gray-200"
                    } `}
                  />
                )}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default OrderTracker;
