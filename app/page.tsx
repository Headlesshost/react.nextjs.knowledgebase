import { redirect } from "next/navigation";
import { ProductionSlug } from "@/app/lib/types";

export default async function Home() {
  redirect(ProductionSlug);
}
