export default function Home() {
  return (
    <>
      <a
        href={`https://github.com/login/oauth/authorize?client_id=${import.meta.env.GITHUB_OAUTH_CLIENT_ID}&scope=user:email`}
      >
        Login with GitHub
      </a>
    </>
  );
}
