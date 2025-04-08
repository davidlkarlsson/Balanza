import { History } from "~/history/History"
import type { Route } from "../+types/root"

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Balanza - Historik" },
    { name: "description", content: "Welcome to our finance app!" },
  ]
}

export default function HistoryPage() {
  return <History />
}
