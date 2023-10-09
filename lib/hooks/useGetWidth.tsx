"use client"
import { useState, useEffect } from 'react';

function getWindowDimensions() {
    if(window){
        const { innerWidth: width, innerHeight: height } = window;
        return {
          width,
          height
        };
        
    }else{
        return {
            width:0,
            height:0
          };
    }
}

export default function useGetWidth() {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
   

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [window]);

  return windowDimensions;
}