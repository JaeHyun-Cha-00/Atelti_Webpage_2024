import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getUpcomingFixtures, getRecentResults, Match } from "@/lib/footballdata";

const ATLETICO_ID = 78;

function formatDate(utcDate: string) {
  const date = new Date(utcDate);
  return {
    date: date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" }),
    time: date.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }) + " UTC",
  };
}

function MatchRow({ match }: { match: Match }) {
  const isHome = match.homeTeam.id === ATLETICO_ID;
  const atleti = isHome ? match.homeTeam : match.awayTeam;
  const opponent = isHome ? match.awayTeam : match.homeTeam;

  const { score } = match;
  const hasResult = score.fullTime.home !== null && score.fullTime.away !== null;
  const atlScore = isHome ? score.fullTime.home : score.fullTime.away;
  const oppScore = isHome ? score.fullTime.away : score.fullTime.home;

  const isWin = hasResult && score.winner === (isHome ? "HOME_TEAM" : "AWAY_TEAM");
  const isDraw = hasResult && score.winner === "DRAW";

  const { date, time } = formatDate(match.utcDate);

  return (
    <div className="flex items-center justify-between p-4 border rounded-xl bg-white hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        {/* Date */}
        <div className="text-center min-w-[80px]">
          <p className="text-xs font-medium">{date}</p>
          <p className="text-xs text-muted-foreground">{time}</p>
        </div>

        {/* Teams */}
        <div className="flex items-center gap-3">
          <Image src={atleti.crest} alt={atleti.name} width={28} height={28} className="object-contain" />
          <span className="font-semibold text-sm hidden sm:block">{atleti.shortName}</span>
          <span className="text-muted-foreground text-sm">vs</span>
          <Image src={opponent.crest} alt={opponent.name} width={28} height={28} className="object-contain" />
          <span className="font-semibold text-sm">{opponent.shortName}</span>
        </div>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2">
          {match.competition.emblem && (
            <Image src={match.competition.emblem} alt={match.competition.name} width={20} height={20} className="object-contain" />
          )}
          <Badge variant="outline" className="text-xs">{match.competition.name}</Badge>
        </div>
        <span className={`text-xs font-medium ${isHome ? "text-primary" : "text-gray-500"}`}>
          {isHome ? "H" : "A"}
        </span>
        {hasResult ? (
          <div className="flex items-center gap-2">
            <span className="font-bold text-sm">{atlScore} - {oppScore}</span>
            <Badge className={isWin ? "bg-green-600" : isDraw ? "bg-gray-400" : "bg-red-600"}>
              {isWin ? "W" : isDraw ? "D" : "L"}
            </Badge>
          </div>
        ) : (
          <Badge variant="outline">Upcoming</Badge>
        )}
      </div>
    </div>
  );
}

export default async function SchedulePage() {
  let upcoming: Match[] = [];
  let recent: Match[] = [];
  let error = false;

  try {
    [upcoming, recent] = await Promise.all([
      getUpcomingFixtures(),
      getRecentResults(),
    ]);
  } catch {
    error = true;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Match Schedule</h1>
        <p className="text-muted-foreground">Fixtures and results for Atlético Madrid</p>
      </div>

      {error && (
        <div className="p-6 border rounded-xl bg-yellow-50 text-yellow-800 text-sm">
          API key not configured. Add your <code className="font-mono">FOOTBALL_DATA_API_KEY</code> to <code className="font-mono">.env.local</code> to see live fixtures.
        </div>
      )}

      {upcoming.length > 0 && (
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4">Upcoming Fixtures</h2>
          <div className="space-y-3">
            {upcoming.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}

      {recent.length > 0 && (
        <section>
          <h2 className="text-xl font-bold mb-4">Recent Results</h2>
          <div className="space-y-3">
            {recent.map((match) => (
              <MatchRow key={match.id} match={match} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
