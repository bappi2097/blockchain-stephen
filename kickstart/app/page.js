import { Container } from "semantic-ui-react";
import getFactory from "../ethereum/factory";
import CampaignSection from "@/components/Campaign";

export default async function Home() {
  const factory = getFactory()
  const campaigns = await factory.methods.getDeployedCampaigns().call()

  return (
    <>
      <CampaignSection items={campaigns} />
    </>
  );
}
