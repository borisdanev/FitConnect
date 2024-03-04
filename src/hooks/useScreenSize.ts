import { useEffect, useState } from "react";
const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<number>(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [window.innerWidth]);
  return screenSize;
};
export default useScreenSize;
