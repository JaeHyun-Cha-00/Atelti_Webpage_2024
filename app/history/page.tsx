import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const timeline = [
  {
    year: "1903",
    title: "Club Founded",
    description: "Atlético Madrid was founded on April 26, 1903 by Basque students living in Madrid as a branch of Athletic Club de Bilbao.",
  },
  {
    year: "1939",
    title: "First La Liga Title",
    description: "After rebuilding following the Spanish Civil War, Atlético claimed their first La Liga title in the 1939-40 season.",
  },
  {
    year: "1974",
    title: "European Cup Final",
    description: "Atlético reached the European Cup final, facing Bayern Munich in a memorable two-legged tie that put them on Europe's biggest stage.",
  },
  {
    year: "1996",
    title: "La Liga & Copa del Rey Double",
    description: "One of the club's most celebrated seasons — Atlético won both La Liga and the Copa del Rey, completing a historic domestic double.",
  },
  {
    year: "2014",
    title: "La Liga Champions",
    description: "Under Diego Simeone, Atlético stunned Barcelona and Real Madrid to clinch La Liga — one of the greatest upsets in Spanish football history.",
  },
  {
    year: "2018",
    title: "UEFA Europa League Winners",
    description: "Atlético lifted the Europa League trophy after a dominant 3-0 victory over Marseille in Lyon.",
  },
  {
    year: "2021",
    title: "La Liga Champions",
    description: "Luis Suárez's decisive contributions fired Atlético to another La Liga title in the 2020-21 season, edging out Real Madrid on the final day.",
  },
];

const trophies = [
  { name: "La Liga", count: 11 },
  { name: "Copa del Rey", count: 10 },
  { name: "UEFA Europa League", count: 3 },
  { name: "UEFA Super Cup", count: 3 },
  { name: "FIFA Club World Cup Runner-up", count: 1 },
];

export default function HistoryPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">Club History</h1>
        <p className="text-muted-foreground">From 1903 to today — the story of Atlético Madrid</p>
      </div>

      {/* Trophy Cabinet */}
      <section className="mb-14">
        <h2 className="text-xl font-bold mb-4">Trophy Cabinet</h2>
        <div className="flex flex-wrap gap-3">
          {trophies.map((trophy) => (
            <div key={trophy.name} className="flex items-center gap-2 bg-primary/10 rounded-full px-4 py-2">
              <span className="text-lg">🏆</span>
              <span className="font-medium text-sm">{trophy.name}</span>
              <Badge className="bg-primary text-white text-xs">{trophy.count}x</Badge>
            </div>
          ))}
        </div>
      </section>

      {/* Timeline */}
      <section>
        <h2 className="text-xl font-bold mb-6">Key Moments</h2>
        <div className="relative border-l-2 border-primary/30 pl-6 space-y-8">
          {timeline.map((item) => (
            <div key={item.year} className="relative">
              <div className="absolute -left-[29px] w-4 h-4 rounded-full bg-primary border-2 border-white shadow" />
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-primary text-white">{item.year}</Badge>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
