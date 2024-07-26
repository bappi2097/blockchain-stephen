import factory from "../ethereum/factory";
import CampaignSection from "@/components/CampaignSection";

export default async function Home() {
  const campaigns = await factory.methods.getDeployedCampaigns().call()

  return (
    <>
      <h3 className="text-2xl my-2">Open Campaigns</h3>
      <div className="flex gap-2">
        <CampaignSection items={campaigns} />
      </div>
    </>
  );
}
