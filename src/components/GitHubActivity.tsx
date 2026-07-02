import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Github, Star, BookOpen, Users, ExternalLink } from "lucide-react";

interface GithubStats {
  repos: number;
  followers: number;
  stars: number;
  following: number;
}

const FALLBACK_STATS: GithubStats = {
  repos: 18,
  followers: 12,
  stars: 8,
  following: 20,
};

const USERNAME = "agarwalganesh";

const GitHubActivity = () => {
  const [stats, setStats] = useState<GithubStats>(FALLBACK_STATS);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState<string[]>(["Python", "TypeScript", "JavaScript", "C++"]);
  const [chartError, setChartError] = useState(false);

  useEffect(() => {
    const fetchGithubData = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100`),
        ]);

        if (userRes.ok && reposRes.ok) {
          const userData = await userRes.json();
          const reposData: { stargazers_count: number; language: string | null }[] = await reposRes.json();

          let starsCount = 0;
          const langMap: Record<string, number> = {};

          reposData.forEach((repo) => {
            starsCount += repo.stargazers_count || 0;
            if (repo.language) {
              langMap[repo.language] = (langMap[repo.language] || 0) + 1;
            }
          });

          const sortedLangs = Object.entries(langMap)
            .sort((a, b) => b[1] - a[1])
            .map(([lang]) => lang)
            .slice(0, 4);

          setStats({
            repos: userData.public_repos ?? FALLBACK_STATS.repos,
            followers: userData.followers ?? FALLBACK_STATS.followers,
            following: userData.following ?? FALLBACK_STATS.following,
            stars: starsCount || FALLBACK_STATS.stars,
          });

          if (sortedLangs.length > 0) setLanguages(sortedLangs);
        }
      } catch {
        // silently fall back to default stats
      } finally {
        setLoading(false);
      }
    };

    fetchGithubData();
  }, []);

  const statCards = [
    { label: "Repos", value: stats.repos, icon: <BookOpen className="w-3.5 h-3.5 text-primary" /> },
    { label: "Stars", value: stats.stars, icon: <Star className="w-3.5 h-3.5 text-yellow-400" /> },
    { label: "Followers", value: stats.followers, icon: <Users className="w-3.5 h-3.5 text-cyan-400" /> },
    { label: "Following", value: stats.following, icon: <Github className="w-3.5 h-3.5 text-emerald-400" /> },
  ];

  return (
    <section id="github-activity" className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            GitHub <span className="text-gradient">Contributions</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Live data pulled directly from GitHub — real repos, stars, and contribution history.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Profile Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-1 glass p-6 rounded-2xl border border-primary/20 flex flex-col justify-between"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                <Github className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-bold text-lg">@{USERNAME}</h3>
                <p className="text-xs text-muted-foreground">GenAI & ML Engineer</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-6">
              {statCards.map(({ label, value, icon }) => (
                <div
                  key={label}
                  className="p-3 bg-secondary/30 rounded-xl border border-primary/5 flex flex-col"
                >
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1">
                    {icon} {label}
                  </div>
                  <span className="text-lg font-bold font-mono text-foreground">
                    {loading ? "..." : value}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs text-muted-foreground font-semibold">Top Languages:</span>
              <div className="flex flex-wrap gap-1.5">
                {languages.map((lang) => (
                  <span
                    key={lang}
                    className="text-[10px] bg-primary/10 text-primary border border-primary/10 px-2 py-0.5 rounded-full"
                  >
                    {lang}
                  </span>
                ))}
              </div>
              <a
                href={`https://github.com/${USERNAME}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 flex items-center gap-1.5 text-xs text-primary hover:underline"
              >
                View Profile <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </motion.div>

          {/* Real Contribution Heatmap */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glass p-6 rounded-2xl border border-primary/20 flex flex-col gap-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-primary/10">
              <h3 className="font-semibold text-sm flex items-center gap-2">
                <Github className="w-4 h-4 text-primary" /> Contribution Graph
              </h3>
              <span className="text-[10px] text-muted-foreground">Past 12 months · live from GitHub</span>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-x-auto py-2">
              {chartError ? (
                <div className="text-center text-muted-foreground text-sm py-8">
                  <Github className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>Could not load contribution graph.</p>
                  <a
                    href={`https://github.com/${USERNAME}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline text-xs mt-1 inline-block"
                  >
                    View on GitHub →
                  </a>
                </div>
              ) : (
                <img
                  src={`https://ghchart.rshah.org/1ae8cc/${USERNAME}`}
                  alt="GitHub contribution chart"
                  className="w-full max-w-[600px] rounded-md"
                  style={{ filter: "invert(1) hue-rotate(155deg) saturate(1.8) brightness(0.85)" }}
                  onError={() => setChartError(true)}
                />
              )}
            </div>

            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
              <span>Less</span>
              <div className="flex gap-[3px] items-center">
                <div className="w-[9px] h-[9px] bg-primary/10 rounded-[1px]" />
                <div className="w-[9px] h-[9px] bg-primary/30 rounded-[1px]" />
                <div className="w-[9px] h-[9px] bg-primary/60 rounded-[1px]" />
                <div className="w-[9px] h-[9px] bg-primary rounded-[1px]" />
              </div>
              <span>More</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GitHubActivity;
