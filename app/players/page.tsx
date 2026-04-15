import Image from "next/image";
import { getSquad, SquadPlayer } from "@/lib/footballdata";
import PlayerCard from "@/components/PlayerCard";

const GK = ["Goalkeeper"];
const DF = ["Defence", "Defender", "Centre-Back", "Right-Back", "Left-Back"];
const MF = ["Midfield", "Midfielder", "Left Midfield", "Right Midfield", "Defensive Midfield", "Central Midfield", "Attacking Midfield"];

function groupPlayers(squad: SquadPlayer[]) {
  const groups: Record<string, SquadPlayer[]> = {
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Forward: [],
  };
  for (const p of squad) {
    if (GK.includes(p.position)) groups.Goalkeeper.push(p);
    else if (DF.includes(p.position)) groups.Defender.push(p);
    else if (MF.includes(p.position)) groups.Midfielder.push(p);
    else groups.Forward.push(p);
  }
  return groups;
}

export default async function PlayersPage() {
  let teamDetail;
  try {
    teamDetail = await getSquad();
  } catch {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold mb-4">Squad</h1>
        <p className="text-muted-foreground">Unable to load squad data. Please try again later.</p>
      </div>
    );
  }

  const { squad, crest, coach } = teamDetail;
  const groups = groupPlayers(squad);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="flex items-center gap-4 mb-10">
        <Image src={crest} alt="Atlético Madrid" width={56} height={56} className="object-contain" />
        <div>
          <h1 className="text-3xl font-bold">Squad</h1>
          <p className="text-muted-foreground">
            Atlético Madrid 2025-26 · Coach: {coach.name}
          </p>
        </div>
      </div>

      {Object.entries(groups).map(([group, players]) =>
        players.length === 0 ? null : (
          <section key={group} className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
              {group}s
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {players.map((player) => (
                <PlayerCard key={player.id} player={player} group={group} />
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
