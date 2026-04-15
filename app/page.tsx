import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Placeholder news — will be replaced by X API
const latestNews = [
  {
    id: "1",
    category: "Match Report",
    title: "Atlético Madrid 2-0 Sevilla: Griezmann and Morata fire Atleti to comfortable win",
    excerpt: "Antoine Griezmann opened the scoring in the 23rd minute before Álvaro Morata sealed the three points late on at the Metropolitano.",
    time: "2 hours ago",
    author: "@Atleti",
  },
  {
    id: "2",
    category: "Interview",
    title: "Simeone: 'The players gave everything tonight — the fans deserve this'",
    excerpt: "Diego Simeone praised his squad after a dominant home performance, highlighting the team's defensive discipline and clinical finishing.",
    time: "3 hours ago",
    author: "@MarcaAtleti",
  },
  {
    id: "3",
    category: "Stats",
    title: "Griezmann reaches 14 La Liga goals — leads Atleti's scoring charts this season",
    excerpt: "The French forward continues his remarkable form, sitting top of Atlético's goal contributions with 14 goals and 8 assists in all competitions.",
    time: "5 hours ago",
    author: "@AS_Atletico",
  },
  {
    id: "4",
    category: "Preview",
    title: "Derby week: What to expect from El Derbi Madrileño at the Metropolitano",
    excerpt: "Atlético host rivals Real Madrid on Sunday in what could be a defining fixture in the La Liga title race. Here's everything you need to know.",
    time: "1 day ago",
    author: "@Atleti",
  },
  {
    id: "5",
    category: "Transfer",
    title: "Oblak contract extension talks underway — club legend set to stay in Madrid",
    excerpt: "Atlético Madrid are in advanced discussions with Jan Oblak over a new deal, with both parties keen to continue their long-standing partnership.",
    time: "1 day ago",
    author: "@mundodeportivo",
  },
];

const categoryColor: Record<string, string> = {
  "Match Report": "bg-red-100 text-red-700",
  "Interview": "bg-blue-100 text-blue-700",
  "Stats": "bg-green-100 text-green-700",
  "Preview": "bg-yellow-100 text-yellow-700",
  "Transfer": "bg-purple-100 text-purple-700",
};

// Upcoming match
const nextMatch = {
  date: "Sun, Apr 17",
  time: "22:00 CET",
  opponent: "Real Madrid",
  competition: "La Liga",
  venue: "Metropolitano",
};

export default function HomePage() {
  const [featured, ...rest] = latestNews;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Next Match Banner */}
      <div className="bg-primary text-primary-foreground rounded-xl p-4 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-white/70 uppercase tracking-widest">Next Match</span>
          <span className="font-bold text-lg">Atlético Madrid vs {nextMatch.opponent}</span>
          <Badge className="bg-white text-primary text-xs">{nextMatch.competition}</Badge>
        </div>
        <div className="text-sm text-white/80 flex items-center gap-3">
          <span>📅 {nextMatch.date}</span>
          <span>🕙 {nextMatch.time}</span>
          <span>🏟️ {nextMatch.venue}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Main News Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">Latest News</h2>
            <Link href="/news" className="text-sm text-primary font-medium hover:underline">
              All news →
            </Link>
          </div>

          {/* Featured Story */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer group border-l-4 border-l-primary">
            <CardContent className="p-6">
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[featured.category]}`}>
                {featured.category}
              </span>
              <h3 className="text-xl font-bold mt-3 mb-2 group-hover:text-primary transition-colors leading-snug">
                {featured.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{featured.excerpt}</p>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                <span>{featured.author}</span>
                <span>·</span>
                <span>{featured.time}</span>
              </div>
            </CardContent>
          </Card>

          {/* Other Stories */}
          <div className="space-y-3">
            {rest.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow cursor-pointer group">
                <CardContent className="p-4 flex gap-4">
                  <div className="flex-1">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[post.category]}`}>
                      {post.category}
                    </span>
                    <h3 className="font-semibold text-sm mt-2 mb-1 group-hover:text-primary transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>·</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Links */}
          <div>
            <h2 className="text-xl font-bold mb-4">Explore</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { href: "/schedule", icon: "📅", label: "Schedule" },
                { href: "/players", icon: "👤", label: "Squad" },
                { href: "/history", icon: "🏆", label: "History" },
                { href: "/news", icon: "📰", label: "All News" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="flex flex-col items-center gap-2 p-4 border rounded-xl hover:border-primary hover:shadow-md transition-all text-center group"
                >
                  <span className="text-2xl">{item.icon}</span>
                  <span className="text-sm font-medium group-hover:text-primary">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Club Motto */}
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-6 text-center">
              <p className="text-xs uppercase tracking-widest text-white/60 mb-2">Club Motto</p>
              <p className="text-lg font-bold italic">&ldquo;El Atleti nunca se rinde&rdquo;</p>
              <p className="text-sm text-white/70 mt-1">Atleti never surrenders.</p>
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
}
