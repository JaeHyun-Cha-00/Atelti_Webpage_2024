"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SquadPlayer, PlayerDetail, Match } from "@/lib/footballdata";

const ATLETICO_ID = 78;

const positionColor: Record<string, string> = {
  Goalkeeper: "bg-yellow-100 text-yellow-800",
  Defender: "bg-blue-100 text-blue-800",
  Midfielder: "bg-green-100 text-green-800",
  Forward: "bg-red-100 text-red-800",
};

function getAge(dateOfBirth: string): number {
  const today = new Date();
  const birth = new Date(dateOfBirth);
  let age = today.getFullYear() - birth.getFullYear();
  const m = today.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) age--;
  return age;
}

function getFlagEmoji(nationality: string): string {
  const flags: Record<string, string> = {
    "Spain": "🇪🇸", "France": "🇫🇷", "Argentina": "🇦🇷", "Brazil": "🇧🇷",
    "Portugal": "🇵🇹", "Germany": "🇩🇪", "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "Netherlands": "🇳🇱",
    "Belgium": "🇧🇪", "Uruguay": "🇺🇾", "Slovenia": "🇸🇮", "Croatia": "🇭🇷",
    "Morocco": "🇲🇦", "Nigeria": "🇳🇬", "Mozambique": "🇲🇿", "Colombia": "🇨🇴",
    "Mexico": "🇲🇽", "Chile": "🇨🇱", "Paraguay": "🇵🇾", "Serbia": "🇷🇸",
    "Poland": "🇵🇱", "Turkey": "🇹🇷", "Czech Republic": "🇨🇿",
  };
  return flags[nationality] ?? "🌍";
}

export default function PlayerCard({
  player,
  group,
}: {
  player: SquadPlayer;
  group: string;
}) {
  const [open, setOpen] = useState(false);
  const [detail, setDetail] = useState<PlayerDetail | null>(null);
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleOpen() {
    setOpen(true);
    if (detail) return; // already fetched
    setLoading(true);
    try {
      const res = await fetch(`/api/player/${player.id}`);
      const data = await res.json();
      setDetail(data.player);
      setMatches(data.matches ?? []);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Card
        className="hover:shadow-lg transition-shadow group cursor-pointer"
        onClick={handleOpen}
      >
        <CardContent className="p-4 flex flex-col items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-2xl mb-3 group-hover:bg-primary/20 transition-colors">
            {getFlagEmoji(player.nationality)}
          </div>
          <h3 className="font-semibold text-sm mb-2 leading-tight">{player.name}</h3>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${positionColor[group] ?? "bg-gray-100 text-gray-800"}`}>
            {group}
          </span>
          <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
            <span>{player.nationality}</span>
            {player.dateOfBirth && (
              <span>· {getAge(player.dateOfBirth)} yrs</span>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-xl">
              {detail?.shirtNumber && (
                <span className="text-2xl font-bold text-muted-foreground">#{detail.shirtNumber}</span>
              )}
              {player.name}
            </DialogTitle>
          </DialogHeader>

          {loading ? (
            <div className="py-8 text-center text-muted-foreground text-sm">Loading...</div>
          ) : detail ? (
            <div className="space-y-5">
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                <span className={`text-sm px-3 py-1 rounded-full font-medium ${positionColor[group] ?? "bg-gray-100 text-gray-800"}`}>
                  {detail.position}
                </span>
                <Badge variant="outline">{detail.nationality}</Badge>
                {detail.dateOfBirth && (
                  <Badge variant="outline">{getAge(detail.dateOfBirth)} years old</Badge>
                )}
              </div>

              {/* Info */}
              <div className="grid grid-cols-2 gap-3 text-sm">
                {detail.dateOfBirth && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Date of Birth</p>
                    <p className="font-semibold">{new Date(detail.dateOfBirth).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
                  </div>
                )}
                {detail.currentTeam?.contract?.until && (
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">Contract Until</p>
                    <p className="font-semibold">{detail.currentTeam.contract.until}</p>
                  </div>
                )}
                {detail.currentTeam?.runningCompetitions?.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3 col-span-2">
                    <p className="text-xs text-muted-foreground uppercase tracking-widest mb-2">Competitions</p>
                    <div className="flex flex-wrap gap-3">
                      {detail.currentTeam.runningCompetitions.map((c) => (
                        <div key={c.name} className="flex items-center gap-1.5">
                          <Image src={c.emblem} alt={c.name} width={16} height={16} className="object-contain" />
                          <span className="text-sm">{c.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Recent Matches */}
              {matches.length > 0 && (
                <div>
                  <p className="text-sm font-bold mb-2">Recent Matches</p>
                  <div className="space-y-2">
                    {matches.map((match) => {
                      const isHome = match.homeTeam.id === ATLETICO_ID;
                      const atlScore = isHome ? match.score.fullTime.home : match.score.fullTime.away;
                      const oppScore = isHome ? match.score.fullTime.away : match.score.fullTime.home;
                      const opponent = isHome ? match.awayTeam : match.homeTeam;
                      const isWin = match.score.winner === (isHome ? "HOME_TEAM" : "AWAY_TEAM");
                      const isDraw = match.score.winner === "DRAW";

                      return (
                        <div key={match.id} className="flex items-center justify-between p-2.5 border rounded-lg text-sm">
                          <div className="flex items-center gap-2">
                            <Image src={opponent.crest} alt={opponent.name} width={20} height={20} className="object-contain" />
                            <div>
                              <p className="font-medium text-xs">vs {opponent.shortName}</p>
                              <p className="text-xs text-muted-foreground">
                                {new Date(match.utcDate).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                                {" · "}{isHome ? "H" : "A"}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-xs">{atlScore} - {oppScore}</span>
                            <Badge className={`text-xs ${isWin ? "bg-green-600" : isDraw ? "bg-gray-400" : "bg-red-600"}`}>
                              {isWin ? "W" : isDraw ? "D" : "L"}
                            </Badge>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
