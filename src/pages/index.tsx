import axios from "axios";
import { useRouter } from "next/router";
import useAuthsignalClient from "@/hooks/useAuthsignalClient";

const HomePage = () => {
  const router = useRouter();
  const authSignal = useAuthsignalClient();

  const signUp = async () => {
    const { data } = await axios.get  ("/api/email");
    window.location.href = data.url;
  };

const passkeyLogin = async () => {
  const {
    data: { token },
  } = await axios.post("/api/passkey");

  const result = await authSignal?.passkey.signIn({
    token,
  });

  if (result) {
    window.location.href = `/api/callback?token=${result}`;
    router.push("/dashboard");
  }
};

  return (
    <div className="p-5 font-inter flex flex-col justify-center items-center">
      <h2 className="text-center text-3xl font-bold">
        Next JS + AuthSignal Passkeys Demo
      </h2>

      <div className="border rounded-lg flex flex-col mt-16 w-fit p-16 min-w-[750px]">
        <button className="border px-6 py-3 mt-2" onClick={signUp}>
          Sign Up / Sign In
        </button>

        <p className="text-center my-5">or</p>

        <button onClick={passkeyLogin}>Sign in with an existing passkey</button>
      </div>
    </div>
  );
};

export default HomePage;
