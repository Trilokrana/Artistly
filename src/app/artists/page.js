import { Suspense } from "react";
import ArtistsClient from "./ArtistClient";

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading...</div>}>
      <ArtistsClient />
    </Suspense>
  );
}
