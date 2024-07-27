import { getCampaignSummary } from "@/app/actions"
import CampaignDetails from "@/components/CampaignDetails"
import ContributeForm from "@/components/ContributeForm"

export default async function CampaignPage({ params }) {
    const summary = await getCampaignSummary(params.address)

    return (
        <>
            <h3 className="text-xl font-bold mb-2">Campaign Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-[1fr_250px] gap-4 justify-between">
                <CampaignDetails summary={summary} />
                <ContributeForm address={params.address} />
            </div>
        </>
    )
}
