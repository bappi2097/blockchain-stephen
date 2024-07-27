import { getAllRequestsByAddress } from "@/app/actions"
import RequestSection from "@/components/RequestSection"

export default async function RequestPage({ params }) {
    const response = await getAllRequestsByAddress(params.address)
    return (
        <>
            <h3 className="text-lg font-bold">Request</h3>
            <RequestSection address={response.address} requests={response.requests} approversCount={response.approversCount} />
        </>
    )
}