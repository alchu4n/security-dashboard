import { SecurityEventDetail } from "@/components/security-events/security-event-detail"

export default function SecurityEventDetailPage({ params }: { params: { id: string } }) {
  return <SecurityEventDetail id={params.id} />
}
