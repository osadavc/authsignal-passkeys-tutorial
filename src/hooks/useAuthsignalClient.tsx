import { Authsignal } from "@authsignal/browser";
import { useEffect, useState } from "react";

const useAuthsignalClient = () => {
  const [client, setClient] = useState<Authsignal | null>(null);

  useEffect(() => {
    const authsignalClient = new Authsignal({
      tenantId: process.env.NEXT_PUBLIC_AUTHSIGNAL_TENANT_ID!,
      baseUrl: process.env.NEXT_PUBLIC_AUTHSIGNAL_API_BASE_URL!,
    });

    setClient(authsignalClient);
  }, []);

  return client;
};

export default useAuthsignalClient;
