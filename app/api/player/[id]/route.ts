import { NextResponse } from "next/server";
import { getPlayerDetail, getPlayerMatches } from "@/lib/footballdata";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const playerId = Number(id);

  try {
    const [player, matches] = await Promise.all([
      getPlayerDetail(playerId),
      getPlayerMatches(playerId),
    ]);
    return NextResponse.json({ player, matches });
  } catch {
    return NextResponse.json({ error: "Player not found" }, { status: 404 });
  }
}
