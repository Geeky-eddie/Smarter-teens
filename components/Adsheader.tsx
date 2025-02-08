"use client"

import React, { useEffect, useRef } from 'react';

const AdsHeader: React.FC = () => {
  // const adContainerRef = useRef<HTMLDivElement | null>(null);

  // useEffect(() => {
  //   const adOptions = {
  //     key: 'b3706c1d5bc8a351ffd2397063c1a37e',
  //     format: 'iframe',
  //     height: 250,
  //     width: 300,
  //     params: {} as Record<string, unknown>
  //   };

  //   const adScript = document.createElement('script');
  //   adScript.type = 'text/javascript';
  //   adScript.src = `//discouragewearinesstourist.com/${adOptions.key}/invoke.js`;

  //   const adConfigScript = document.createElement('script');
  //   adConfigScript.type = 'text/javascript';
  //   adConfigScript.innerHTML = `atOptions = ${JSON.stringify(adOptions)}`;

  //   // Append the scripts to the document body
  //   document.body.appendChild(adConfigScript);
  //   document.body.appendChild(adScript);

  //   // Clean up function to remove the scripts when the component unmounts
  //   return () => {
  //     document.body.removeChild(adConfigScript);
  //     document.body.removeChild(adScript);
  //   };
  // }, []);

  // return <div ref={adContainerRef}></div>;
};

export default AdsHeader;
