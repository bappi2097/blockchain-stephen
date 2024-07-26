import factory from "@/ethereum/factory"



export default async function CampaignPage({ params }) {


    console.log(params.address)
    const campaigns = await factory.methods.getDeployedCampaigns().call()
    return (
        <>
            <h3 className="text-xl font-bold">Campaign Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] justify-between">
                <div>

                </div>
                <div>
                    <h3 className="text-xl">Contribute to this campaigns!</h3>
                </div>
            </div>
        </>
    )
}
