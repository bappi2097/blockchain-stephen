
import getFactory from "../ethereum/factory";

export default async function Home() {
  const factory = getFactory()

  const campaigns = await factory.methods.getDeployedCampaigns().call()

  return (
    <div>
      {campaigns?.map((campaign) => (<div key={campaign}>{campaign}</div>))}
    </div>
  );
}
