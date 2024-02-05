import { signOut, useSession } from "next-auth/react";
import { ReactNode } from "react";

export function SessionCheckProvider({ children }: { children: ReactNode }) {
  const { data } = useSession();
  if (data?.error === 'invalid_token') signOut();

  return <>{children}</>;
}