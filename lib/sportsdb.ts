const BASE_URL = "https://www.thesportsdb.com/api/v1/json/3";
const ATLETICO_ID = "133729";

export interface Match {
  idEvent: string;
  strEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  dateEvent: string;
  strTime: string;
  strLeague: string;
  strLeagueBadge: string;
  strHomeTeamBadge: string;
  strAwayTeamBadge: string;
  strVenue: string;
  strStatus: string;
  strThumb: string | null;
  idHomeTeam: string;
  idAwayTeam: string;
}

export interface Player {
  idPlayer: string;
  strPlayer: string;
  strPosition: string;
  strNationality: string;
  strNumber: string;
  dateBorn: string;
  strThumb: string | null;
  strCutout: string | null;
  strRender: string | null;
  strHeight: string;
  strWage: string;
  strSigning: string;
  strStatus: string;
  strDescriptionEN: string | null;
  strTwitter: string;
  strInstagram: string;
}

async function fetchSportsDB<T>(endpoint: string): Promise<T> {
  const res = await fetch(`${BASE_URL}/${endpoint}`, {
    next: { revalidate: 3600 }, // cache for 1 hour
  });
  if (!res.ok) throw new Error(`TheSportsDB error: ${res.status}`);
  return res.json();
}

export async function getUpcomingFixtures(): Promise<Match[]> {
  const data = await fetchSportsDB<{ events: Match[] }>(
    `eventsnext.php?id=${ATLETICO_ID}`
  );
  return data.events ?? [];
}

export async function getRecentResults(): Promise<Match[]> {
  const data = await fetchSportsDB<{ results: Match[] }>(
    `eventslast.php?id=${ATLETICO_ID}`
  );
  return (data.results ?? []).reverse(); // most recent first
}

export async function getSquad(): Promise<Player[]> {
  const data = await fetchSportsDB<{ player: Player[] }>(
    `lookup_all_players.php?id=${ATLETICO_ID}`
  );
  return data.player ?? [];
}
