import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSquad } from "@/lib/sportsdb";

const positionColor: Record<string, string> = {
  "Goalkeeper": "bg-yellow-100 text-yellow-800",
  "Centre-Back": "bg-blue-100 text-blue-800",
  "Left-Back": "bg-blue-100 text-blue-800",
  "Right-Back": "bg-blue-100 text-blue-800",
  "Defender": "bg-blue-100 text-blue-800",
  "Defensive Midfield": "bg-green-100 text-green-800",
  "Central Midfield": "bg-green-100 text-green-800",
  "Left Midfield": "bg-green-100 text-green-800",
  "Right Midfield": "bg-green-100 text-green-800",
  "Attacking Midfield": "bg-green-100 text-green-800",
  "Midfielder": "bg-green-100 text-green-800",
  "Left Winger": "bg-red-100 text-red-800",
  "Right Winger": "bg-red-100 text-red-800",
  "Centre-Forward": "bg-red-100 text-red-800",
  "Forward": "bg-red-100 text-red-800",
};

function getPositionColor(position: string): string {
  return positionColor[position] ?? "bg-gray-100 text-gray-800";
}

function getAge(dateBorn: string): number {
  const today = new Date();
  const birth = new Date(dateBorn);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

export default async function PlayersPage() {
  const players = await getSquad();

  const grouped: Record<string, typeof players> = {
    Goalkeeper: [],
    Defender: [],
    Midfielder: [],
    Forward: [],
  };

  for (const p of players) {
    if (!p.strStatus || p.strStatus !== "Active") continue;
    const pos = p.strPosition ?? "";
    if (pos.includes("Goalkeeper")) grouped.Goalkeeper.push(p);
    else if (pos.includes("Back") || pos === "Defender") grouped.Defender.push(p);
    else if (pos.includes("Midfield")) grouped.Midfielder.push(p);
    else grouped.Forward.push(p);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Squad</h1>
        <p className="text-muted-foreground">Atlético Madrid 2024-25 season squad</p>
      </div>

      {Object.entries(grouped).map(([group, list]) =>
        list.length === 0 ? null : (
          <section key={group} className="mb-10">
            <h2 className="text-lg font-bold mb-4 text-muted-foreground uppercase tracking-widest text-sm">
              {group}s
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {list.map((player) => (
                <Card key={player.idPlayer} className="hover:shadow-lg transition-shadow group cursor-pointer">
                  <CardContent className="p-4 flex flex-col items-center text-center">
                    {/* Player image */}
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-primary/10 mb-3 flex items-center justify-center">
                      {player.strCutout || player.strThumb ? (
                        <Image
                          src={(player.strCutout ?? player.strThumb)!}
                          alt={player.strPlayer}
                          width={80}
                          height={80}
                          className="object-cover w-full h-full"
                        />
                      ) : (
                        <span className="text-3xl">👤</span>
                      )}
                    </div>

                    {player.strNumber && (
                      <p className="text-xs text-muted-foreground mb-1">#{player.strNumber}</p>
                    )}
                    <h3 className="font-semibold text-sm mb-2 leading-tight">{player.strPlayer}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${getPositionColor(player.strPosition)}`}>
                      {player.strPosition}
                    </span>
                    <div className="flex items-center gap-2 mt-2">
                      <p className="text-xs text-muted-foreground">{player.strNationality}</p>
                      {player.dateBorn && (
                        <p className="text-xs text-muted-foreground">· {getAge(player.dateBorn)} yrs</p>
                      )}
                    </div>
                    {player.strSigning && (
                      <Badge variant="outline" className="mt-2 text-xs">{player.strSigning}</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )
      )}
    </div>
  );
}
