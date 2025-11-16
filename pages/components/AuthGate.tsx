import useSession from "../../utils/useSession";
import Loading from "./Loading";
import Login from "./Login";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const { session, loading } = useSession();

  if (loading) return <Loading />;

  if (!session) return <Login />;

  // Logged in → show normal app
  return <>{children}</>;
}
