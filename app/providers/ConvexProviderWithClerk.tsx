"use client";

import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from "convex/react";

const convexClient = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL || "");

function ConvexClientProviderInner({ children }: { children: React.ReactNode }) {
  const auth = useAuth();

  return (
    <ConvexProviderWithClerk client={convexClient} useAuth={() => auth}>
      {children}
    </ConvexProviderWithClerk>
  );
}

export default function ConvexClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ConvexClientProviderInner>{children}</ConvexClientProviderInner>
    </ClerkProvider>
  );
}
