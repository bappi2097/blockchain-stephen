import useWeb3 from "./web3";
import { useEffect, useState } from "react";
import CampaignFactory from "./build/CampaignFactory.json";


const useFactory = () => {
    const web3 = useWeb3()
    const [instance, setInstance] = useState()
    
    useEffect(() => {
        if(web3){
            setInstance(new web3.eth.Contract(
                JSON.parse(CampaignFactory.interface),
                process.env.NEXT_PUBLIC_ADDRESS
            ))
        }
    }, [web3])

    return instance;
}

export default useFactory;