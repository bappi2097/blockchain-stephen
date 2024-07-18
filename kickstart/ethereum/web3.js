import { useEffect, useState } from "react";
import Web3 from "web3";

const useWeb3 = () => {
    const [web3, setWeb3] = useState()
    useEffect(() => {
        window.ethereum.request({ method: "eth_requestAccounts" });
        setWeb3(new Web3(window.ethereum));
    }, [])
    return web3;
}

export default useWeb3;