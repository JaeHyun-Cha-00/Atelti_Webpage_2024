import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockPosts = [
  {
    id: "1",
    author: "Atletico de Madrid",
    handle: "@Atleti",
    content: "⚽ Full time! Atlético Madrid 2-0 Sevilla. Goals from Griezmann and Morata seal a perfect night at the Metropolitano. #AúpaAtleti",
    time: "2 hours ago",
    likes: 4200,
    retweets: 1100,
    category: "Match Report",
  },
  {
    id: "2",
    author: "Marca Atletico",
    handle: "@MarcaAtleti",
    content: "🔴⚪ Simeone post-match: 'The players gave absolutely everything tonight. The fans make this club what it is.' #Atletico",
    time: "3 hours ago",
    likes: 980,
    retweets: 230,
    category: "Interview",
  },
  {
    id: "3",
    author: "AS Atletico",
    handle: "@AS_Atletico",
    content: "📊 Griezmann hits 14 La Liga goals this season — top scorer in the Atleti squad. Still operating at the very highest level. #Griezmann",
    time: "5 hours ago",
    likes: 3100,
    retweets: 780,
    category: "Stats",
  },
  {
    id: "4",
    author: "Atletico de Madrid",
    handle: "@Atleti",
    content: "🏟️ Derby week is here. Atlético vs Real Madrid at the Metropolitano on Sunday. Get behind the team. #DerbyMadrileno",
    time: "1 day ago",
    likes: 7800,
    retweets: 2400,
    category: "Preview",
  },
  {
    id: "5",
    author: "Mundo Deportivo",
    handle: "@mundodeportivo",
    content: "🔴 Atlético in talks to extend Jan Oblak's contract. The Slovenian shot-stopper looks set to remain in Madrid beyond 2026.",
    time: "1 day ago",
    likes: 2300,
    retweets: 560,
    category: "Transfer",
  },
  {
    id: "6",
    author: "Atletico de Madrid",
    handle: "@Atleti",
    content: "💪 Training ground update — the squad is sharp and focused ahead of the Champions League quarter-final. #UCL #AúpaAtleti",
    time: "2 days ago",
    likes: 5600,
    retweets: 1200,
    category: "Training",
  },
];

const categoryColor: Record<string, string> = {
  "Match Report": "bg-red-100 text-red-700",
  "Interview": "bg-blue-100 text-blue-700",
  "Stats": "bg-green-100 text-green-700",
  "Preview": "bg-yellow-100 text-yellow-700",
  "Transfer": "bg-purple-100 text-purple-700",
  "Training": "bg-gray-100 text-gray-700",
};

function formatNumber(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1) + "k";
  return n.toString();
}

export default function NewsPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">News</h1>
        <p className="text-muted-foreground">Latest Atlético Madrid updates from X</p>
      </div>

      <div className="space-y-4">
        {mockPosts.map((post) => (
          <Card key={post.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-lg">
                    🐦
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{post.author}</p>
                    <p className="text-xs text-muted-foreground">{post.handle}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${categoryColor[post.category]}`}>
                    {post.category}
                  </span>
                  <span className="text-xs text-muted-foreground">{post.time}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed mb-3">{post.content}</p>
              <div className="flex items-center gap-4 text-muted-foreground text-xs">
                <span>🔁 {formatNumber(post.retweets)}</span>
                <span>❤️ {formatNumber(post.likes)}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 rounded-xl text-center">
        <p className="text-sm text-muted-foreground">
          Placeholder data — live X posts will appear here once the API key is configured.
        </p>
      </div>
    </div>
  );
}
