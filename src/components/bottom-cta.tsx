import React, { ReactElement, useState } from "react";

const BottomCta = (): ReactElement => {

  const [hasClosedCta, setHasClosedCta] = useState(false);

  if (hasClosedCta) return <></>;

  return (
    <div className="fixed bg-gray-900 bottom-0 w-full block pointer-events-none">
      <div className="p-2 max-w-3xl mx-auto shadow-lg pointer-events-auto">
        <strong className="font-semibold text-white text-lg ">
          Find the site helpful?
        </strong>
        <span className="block sm:inline text-gray-200 md:mx-2">
          Contribute to the developer, or share it around!
        </span>
        <div className="py-2 md:inline-block">
          <a
            className="bg-white hover:bg-gray-200 text-gray-800 py-1 px-4 rounded md:-mt-1 cursor-pointer"
            href="https://masjidwaktanjong.give.asia/campaign/kita-care-3219#/"
            target="_blank"
            rel="noopener"
          >
            Contribute
          </a>
          <a
            className="bg-white hover:bg-gray-200 text-gray-800 py-1 px-4 rounded md:-mt-1 ml-2 cursor-pointer"
            href="https://masjidwaktanjong.give.asia/campaign/kita-care-3219#/"
            target="_blank"
            rel="noopener"
          >
            Share
          </a>
            

        </div>
      </div>
    </div>
  );
};

export default BottomCta;
