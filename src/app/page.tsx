import HomeClient from "@/components/HomeClient";
import { getGitHubContributions } from "@/lib/github";

export default async function Home() {
  const contributions = await getGitHubContributions();

  return <HomeClient contributions={contributions} />;
}
