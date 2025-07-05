import { auth } from "@/server/auth";
import { HydrateClient } from "@/trpc/server";
import { redirect } from "next/navigation";
import ProductPage from "@/app/(home)/components/product-page";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return redirect("/login");
  }

  return (
    <HydrateClient>
      <ProductPage />
    </HydrateClient>
  );
}
