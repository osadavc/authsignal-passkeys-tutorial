import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { authsignal } from "@/lib/authsignal";
import jwtDecode from "jwt-decode";
import { VerificationMethod } from "@authsignal/node";
import useAuthsignalClient from "@/hooks/useAuthsignalClient";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies["auth-session"];
  console.log(token);

  if (!token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const decodedToken = jwtDecode<any>(token);
  const userId = decodedToken.sub;

  if (!userId) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const user = await authsignal.getUser({ userId });

  return {
    props: {
      token,
      email: user.email,
      hasEnrolledPasskey: user.enrolledVerificationMethods?.includes(
        "PASSKEY" as VerificationMethod
      )!!,
    },
  };
};

const Dashboard = ({
  email,
  hasEnrolledPasskey,
  token,
}: {
  email: string;
  hasEnrolledPasskey: boolean;
  token: string;
}) => {
  const router = useRouter();

  const logOut = () => {
    document.cookie = `auth-session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
    router.push("/");
  };

  const authSignal = useAuthsignalClient();

  const passkeySignUp = async () => {
    try {
      await authSignal?.passkey.signUp({
        token,
        userName: email,
      });
      location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 font-inter flex flex-col justify-center items-center">
      <h2 className="text-center text-3xl font-bold">
        Next JS + AuthSignal Passkeys Demo
      </h2>

      <div className="border rounded-lg flex flex-col mt-16 w-fit p-16 text-center">
        <h3>You are logged in</h3>
        <p className="mt-2">Your email is {email}</p>

        {!hasEnrolledPasskey && (
          <span
            className="text-blue-600 cursor-pointer mt-5"
            onClick={passkeySignUp}
          >
            Save the passkey
          </span>
        )}

        <button className="border px-6 py-3 mt-10" onClick={logOut}>
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
