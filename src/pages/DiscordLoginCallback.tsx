import useQuery from "../router/useQuery";

export default function DiscordLoginCallback() {
  const code = useQuery().get("code");

  return (
    <div>
      <h1>Discord Login Callback</h1>
      <p>Relax, we're taking care of your Discord connection...</p>
      <p>Code: {code}</p>
    </div>
  );
}