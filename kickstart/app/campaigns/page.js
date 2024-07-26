import factory from "@/ethereum/factory";
import Campaigns from "@/components/CampaignSection/Campaigns";


export default async function CampaignsPage() {
    const campaigns = await factory.methods.getDeployedCampaigns().call()

    return (
        <>
            <h3 className="text-2xl my-2"> Campaigns </h3>
            <Campaigns items={campaigns} />
        </>
    );
}
