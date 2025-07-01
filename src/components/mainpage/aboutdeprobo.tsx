import Image from "next/image";

export default function AboutDeprobo() {
  return (
    <section className=" bg-bg pt-16  lg:pt-[100px] border-b-border border-b-4 flex items-center justify-around flex-col lg:flex-row">
      <div className="flex flex-col items-center justify-center lg:w-[60%] w-[90%] lg:ml-16 lg:mb-24 gap-4">
        <h2 className="text-5xl font-black mb-4">
          <div className="text-center">
            Don’t
            <span className="font-black text-red-400"> worry!</span>
            <span className="font-black text-white [text-shadow:_-1.75px_-1.75px_0_#000,_1.75px_-1.75px_0_#000,_-1.75px_1.75px_0_#000,_1.75px_1.75px_0_#000]">
              We’ve got you covered.
            </span>
          </div>
        </h2>
        <div className="mx-auto grid w-container max-w-full grid-cols-1 gap-5 px-5 lg:grid-cols-2 ">
          <div className="border-border shadow-shadow flex flex-col gap-3 rounded-base border-2 bg-white p-4 text-black">
            <div className="flex items-center space-x-2">
              {/* Keep your existing SVG */}
              <svg
                width="45"
                height="45"
                viewBox="0 0 365 406"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M224.67 202.625C479.97 202.625 331.07 -55.275 203.37 165.825C330.97 -55.275 33.1696 -55.275 160.87 165.825C33.2696 -55.275 -115.63 202.625 139.57 202.625C-115.73 202.625 33.1696 460.525 160.87 239.425C33.2696 460.525 331.07 460.525 203.37 239.425C330.97 460.625 479.87 202.625 224.67 202.625Z"
                  fill="black"
                />
              </svg>
              <h4 className="text-3xl font-heading">Secure Earnings</h4>
            </div>
            <p>Grow your holdings securely with blockchain-backed returns.</p>
          </div>

          <div className="border-border shadow-shadow flex flex-col gap-3 rounded-base border-2 bg-white p-4 text-black">
            <div className="flex items-center space-x-2">
              {/* Keep your existing SVG */}
              <svg
                width="45"
                height="45"
                viewBox="0 0 380 380"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M344.612 236.706C319.612 239.706 294.612 241.706 269.612 234.706C301.612 232.706 332.612 219.706 355.612 196.706C362.612 188.706 368.612 180.706 372.612 170.706C376.612 158.706 379.612 145.706 379.612 132.706C378.612 116.706 371.612 94.7062 352.612 97.7062C343.612 98.7062 336.612 104.706 331.612 112.706C325.612 122.706 319.612 129.706 312.612 137.706C301.612 148.706 289.612 159.706 274.612 165.706C298.612 141.706 311.612 105.706 310.612 71.7062C309.612 53.7062 301.612 37.7062 290.612 22.7062C279.612 9.70624 262.612 -3.29376 245.612 2.70624C229.612 7.70624 233.612 29.7062 236.612 43.7062C238.612 60.7062 239.612 76.7062 236.612 94.7062C235.612 99.7062 235.612 104.706 232.612 108.706C229.612 66.7062 208.612 23.7062 168.612 7.70624C150.612 -0.293763 129.612 -3.29376 110.612 4.70624C103.612 7.70624 95.6123 11.7062 94.6123 20.7062C92.6123 35.7062 106.612 45.7062 118.612 52.7062C121.612 55.7062 124.612 57.7062 128.612 60.7062C143.612 72.7062 155.612 87.7062 164.612 104.706C142.612 83.7062 113.612 72.7062 83.6123 69.7062C58.6123 67.7062 33.6123 77.7062 15.6123 96.7062C5.61234 107.706 -3.38766 121.706 1.61234 137.706C11.6123 151.706 30.6123 147.706 45.6123 144.706C66.6123 140.706 86.6123 142.706 106.612 147.706C87.6123 148.706 68.6123 155.706 51.6123 164.706C36.6123 173.706 23.6123 182.706 14.6123 197.706C1.61234 218.706 -4.38766 243.706 3.61234 266.706C7.61234 276.706 14.6123 286.706 25.6123 286.706C32.6123 285.706 38.6123 281.706 43.6123 275.706C59.6123 253.706 75.6123 232.706 98.6123 219.706C81.6123 240.706 72.6123 265.706 68.6123 292.706C66.6123 309.706 70.6123 325.706 78.6123 340.706C82.6123 347.706 86.6123 353.706 91.6123 359.706C95.6123 363.706 99.6123 366.706 104.612 370.706C113.612 376.706 123.612 380.706 133.612 377.706C147.612 371.706 146.612 354.706 144.612 341.706C139.612 317.706 140.612 294.706 145.612 271.706C148.612 301.706 159.612 329.706 179.612 351.706C203.612 376.706 244.612 389.706 276.612 369.706C284.612 364.706 285.612 355.706 282.612 347.706C281.612 346.706 280.612 344.706 279.612 342.706C275.612 337.706 271.612 333.706 265.612 330.706L264.612 328.706C245.612 316.706 229.612 300.706 218.612 281.706C239.612 298.706 264.612 308.706 291.612 311.706C325.612 314.706 360.612 297.706 375.612 266.706C379.612 258.706 379.612 248.706 373.612 241.706C365.612 234.706 354.612 234.706 344.612 236.706Z"
                  fill="black"
                />
              </svg>
              <h4 className="text-3xl font-heading">Flexible Withdrawals</h4>
            </div>
            <p>Access your funds anytime without lock-ins or penalties.</p>
          </div>

          <div className="border-border shadow-shadow flex flex-col gap-3 rounded-base border-2 bg-white p-4 text-black">
            <div className="flex items-center space-x-2">
              {/* Keep your existing SVG */}
              <svg
                width="45"
                height="45"
                viewBox="0 0 376 376"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M326.5 132.4C342.3 110.6 340.4 79.9 320.8 60.3C299.6 39.1 265.6 38.5 243.7 58.6V55.8C243.7 25 218.7 0 187.9 0C157.1 0 132.1 25 132.1 55.8V58.6C110.2 38.6 76.2 39.1 55 60.3C35.3 80 33.4 110.6 49.3 132.4C21.6 135.6 0 159.2 0 187.8C0 218.6 25 243.6 55.8 243.6H58.6L55.1 247.1C33.3 268.9 33.3 304.2 55.1 326C76.4 347.3 110.8 347.8 132.6 327.2C136.2 354.5 159.6 375.7 187.9 375.7C216.2 375.7 239.6 354.6 243.2 327.2C265.1 347.7 299.4 347.3 320.7 326C342.5 304.2 342.5 268.9 320.7 247.1L317.2 243.6H320C350.8 243.6 375.8 218.6 375.8 187.8C375.7 159.2 354.2 135.6 326.5 132.4Z"
                  fill="black"
                />
              </svg>
              <h4 className="text-3xl font-heading">Daily Rewards</h4>
            </div>
            <p>Receive your earnings daily with no delays.</p>
          </div>

          <div className="border-border shadow-shadow flex flex-col gap-3 rounded-base border-2 bg-white p-4 text-black">
            <div className="flex items-center space-x-2">
              {/* Keep your existing SVG */}
              <svg
                width="45"
                height="45"
                viewBox="0 0 398 387"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M225.913 187.575C388.413 -62.525 9.21326 -62.525 171.713 187.575C9.21326 -62.525 -107.987 298.175 155.013 239.075C-107.987 298.075 198.813 520.975 198.813 270.875C198.813 520.975 505.613 298.075 242.613 239.075C505.613 298.175 388.413 -62.525 225.913 187.575Z"
                  fill="black"
                />
              </svg>
              <h4 className="text-3xl font-heading">Zero Hidden Fees</h4>
            </div>
            <p>Enjoy full transparency with no surprise charges.</p>
          </div>
        </div>
      </div>

      <div className="flex items-end justify-center lg:w-[30%] w-[90%] lg:mt-0 mt-16">
        <Image alt="logo" width="3000" height="3000" src="/mobile.png" />
      </div>
    </section>
  );
}
