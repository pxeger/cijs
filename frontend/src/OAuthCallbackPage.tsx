export default function OAuthCallbackPage({ type }: { type: string }) {
  void type;
  const params = new URL(location.href).searchParams;
  if (!params.has("code")) {
    throw new Error("missing code parameter");
  }
  return <></>;
}
