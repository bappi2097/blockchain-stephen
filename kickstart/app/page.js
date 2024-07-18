"use client"
import useFactory from "../ethereum/factory";
import { useEffect, useState } from "react";

export default function Home() {
  const factory = useFactory()
  const [campaigns, setCampaigns] = useState()
  const fetchCampaigns = async () => {
    const response = await factory.methods.getDeployedCampaigns().call()
    setCampaigns(response)
  }

  useEffect(() => {
    if(factory){
      fetchCampaigns()
    }
  }, [factory])

  console.log(campaigns)
  
  return (
    <div>
      Campaign list
    </div>
  );
}
