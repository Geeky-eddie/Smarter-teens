"use client"

import React, { useEffect } from 'react';

const NativeAd: React.FC = () => {
  useEffect(() => {
    // Create a script element for loading the ad asynchronously
    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.dataset.cfasync = "false";
    adScript.src = "//discouragewearinesstourist.com/b641a8b51bb6da2f8c27211f6ce04c73/invoke.js";
    
    // Append the script to the document body
    document.body.appendChild(adScript);
    
    // Clean up function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(adScript);
    };
  }, []);
  
  return <div id="container-b641a8b51bb6da2f8c27211f6ce04c73"></div>;
};

export default NativeAd;
