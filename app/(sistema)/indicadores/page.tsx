"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp, PieChart as PieChartIcon, Activity, CalendarClock } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, PieChart, Pie, Label, LineChart, Line } from "recharts";
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// ==========================================
// A MÁGICA: HOOK DO OLHEIRO (Intersection Observer)
// ==========================================
function useVisivelNaTela() {
  const ref = useRef<HTMLDivElement>(null);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisivel(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visivel };
}

// ==========================================
// DADOS DOS GRÁFICOS
// ==========================================
const chartData = [
  { date: "Feb 1", Previsto: 60000, Realizado: 22000, Reajustado: 40000 },
  { date: "Feb 3", Previsto: 50000, Realizado: 65000, Reajustado: 35000 },
  { date: "Feb 5", Previsto: 72000, Realizado: 42000, Reajustado: 58000 },
];

const tableData = [
  {
    plan: "Previsto",
    subscribers: "1,240",
    mrr: "$4,650.00",
    churn: "2.4%",
    churnColor: "text-red-500",
    upgrades: "+38",
    lvt: "$193.75",
    colorClass: "bg-[#f59e0b]",
  },
  {
    plan: "Realizado",
    subscribers: "865",
    mrr: "$12,975.00",
    churn: "1.8%",
    churnColor: "text-red-500",
    upgrades: "+62",
    lvt: "$833.33",
    colorClass: "bg-[#0f766e]",
  },
  {
    plan: "Reajustado",
    subscribers: "214",
    mrr: "$21,400.00",
    churn: "0.9%",
    churnColor: "text-emerald-500",
    upgrades: "+14",
    lvt: "$3,555.56",
    colorClass: "bg-[#f97316]",
  },
];

const chartConfig = {
  Previsto: { label: "Previsto", color: "#f59e0b" },
  Reajustado: { label: "Reajustado", color: "#f97316" },
  Realizado: { label: "Realizado", color: "#0f766e" },
} satisfies ChartConfig;

const ProgressoData = [{ name: "Progresso", value: 78, fill: "#3b82f6" }];

const orcamentoRadialData = [
  { name: "Reajustado", valor: 120, fill: "#f59e0b" },
  { name: "Realizado", valor: 350, fill: "#10b981" },
  { name: "Previsto", valor: 450, fill: "#3b82f6" },
];

const custosMensaisData = [
  { mes: "Jan", Previsto: 100, Realizado: 90, reajustado: 0 },
  { mes: "Fev", Previsto: 120, Realizado: 130, reajustado: 10 },
  { mes: "Mar", Previsto: 150, Realizado: 145, reajustado: 5 },
  { mes: "Abr", Previsto: 110, Realizado: 110, reajustado: 25 },
];

const barChartConfig = {
  Previsto: { label: "Previsto", color: "#3b82f6" },
  Realizado: { label: "Realizado", color: "#10b981" },
  reajustado: { label: "Reajustado", color: "#f59e0b" },
};

// ==========================================
// TELA PRINCIPAL
// ==========================================
export default function Indicadores() {
  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        
        {/* CABEÇALHO DA SESSÃO */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xl text-white border-b border-white/20 pb-1 pr-16 inline-block font-normal uppercase tracking-wide">
            Status do Pipeline ETL
          </span>
          <button className="text-sm font-medium text-blue-400 border border-blue-400/30 px-4 py-1.5 rounded-md hover:bg-blue-500/10 transition-colors uppercase">
            Ver Topologia
          </button>
        </div>

        {/* SUPER CARD: GRÁFICO + EVENTOS + TABELA LARGURA MÁXIMA    */}
        <Card className="p-0 w-full max-w-full shadow-lg bg-[#0D0D1F] border border-white/10 text-white rounded-xl mb-12 overflow-hidden flex flex-col">
          {/* PARTE SUPERIOR DO CARD (Dividido em Gráfico e Eventos) */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 p-6 md:p-8">
            
            {/* LADO ESQUERDO: GRÁFICO (Ocupa 2 Colunas) */}
            <div className="xl:col-span-2 flex flex-col p-0">
              <CardHeader className="p-0 pb-6">
                <CardTitle className="text-4xl font-bold tracking-tight text-white">
                  Acompanhamento Físico
                </CardTitle>
                <CardDescription className="text-base font-medium text-slate-400 mt-2">
                  Período - Jan/26
                </CardDescription>
                <div className="flex items-center gap-2 text-sm mt-3">
                  <span className="text-emerald-400 font-semibold flex items-center">
                    + 0,7% (3,5%)
                  </span>
                  <span className="text-slate-500">comparando Dez/25</span>
                  <span className="text-red-400 font-semibold flex items-center">
                    (2,8%)
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-0 mt-2 flex flex-col flex-1">
                <div className="h-[350px] w-full">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart accessibilityLayer data={chartData} margin={{ left: -20, right: 12, top: 20, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={12} tick={{ fill: "#94a3b8" }} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={12} tickFormatter={(value) => `$${value / 1000}k`} tick={{ fill: "#94a3b8" }} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent className="bg-[#1e1e2d] border-slate-800 text-white" />} />
                      <ChartLegend content={<ChartLegendContent />} verticalAlign="top" align="center" iconType="square" />
                      <Line dataKey="Previsto" type="natural" stroke="var(--color-Previsto)" strokeWidth={2} dot={false} animationDuration={5000} />
                      <Line dataKey="Realizado" type="natural" stroke="var(--color-Realizado)" strokeWidth={2} dot={false} animationDuration={5000} />
                      <Line dataKey="Reajustado" type="natural" stroke="var(--color-Reajustado)" strokeWidth={2} dot={false} animationDuration={5000} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>
            <Table className="w-full grid-span-1">
              <TableHeader>
                <TableRow className="hover:bg-transparent border-b border-white/20">
                  <TableHead className="w-[200px] text-slate-300 font-semibold">Indicadores</TableHead>
                  <TableHead className="text-center text-slate-300 font-semibold">Subscribers</TableHead>
                  <TableHead className="text-center text-slate-300 font-semibold">MRR</TableHead>
                  <TableHead className="text-center text-slate-300 font-semibold">Churn</TableHead>
                  <TableHead className="text-center text-slate-300 font-semibold">Upgrades</TableHead>
                  <TableHead className="text-right text-slate-300 font-semibold">LTV</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tableData.map((row) => (
                  <TableRow key={row.plan} className="border-white/10 hover:bg-white/10 transition-colors text-slate-200">
                    <TableCell className="font-medium flex items-center gap-3">
                      <div className={`h-6 w-1 rounded-full ${row.colorClass}`} />
                      {row.plan}
                    </TableCell>
                    <TableCell className="text-center">{row.subscribers}</TableCell>
                    <TableCell className="text-center">{row.mrr}</TableCell>
                    <TableCell className={`text-center ${row.churnColor}`}>{row.churn}</TableCell>
                    <TableCell className="text-center text-emerald-400">{row.upgrades}</TableCell>
                    <TableCell className="text-right">{row.lvt}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>

            {/* LADO DIREITO: EVENTOS */}
            {/* Note a borda esquerda (xl:border-l) para criar uma divisória sutil entre o gráfico e os eventos */}
            <div className="xl:col-span-1 flex flex-col border-t xl:border-t-0 xl:border-l border-white/10 pt-8 xl:pt-0 xl:pl-8">
              <h2 className="text-lg font-bold text-white uppercase tracking-wider mb-6">Eventos em Fila</h2>
              <div className="flex flex-col space-y-4 overflow-y-auto pr-2">
                
                {/* Item 1 */}
                <div className="bg-[#1a1a2e] border border-white/10 border-l-4 border-l-blue-500 rounded-md p-4 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer">
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide">TX_9482_SYNC</h4>
                    <p className="text-slate-400 text-xs mt-1 font-medium uppercase">AWS REDSHIFT SINK</p>
                  </div>
                  <span className="text-blue-400 text-xs font-black uppercase tracking-wider">Pending</span>
                </div>

                {/* Item 2 */}
                <div className="bg-[#1a1a2e] border border-white/10 border-l-4 border-l-slate-500 rounded-md p-4 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer">
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide">TX_9481_SYNC</h4>
                    <p className="text-slate-400 text-xs mt-1 font-medium uppercase">MONGODB ATLAS</p>
                  </div>
                  <span className="text-slate-400 text-xs font-black uppercase tracking-wider">Waiting</span>
                </div>

                {/* Item 3 */}
                <div className="bg-[#1a1a2e] border border-white/10 border-l-4 border-l-emerald-500 rounded-md p-4 flex justify-between items-center hover:bg-white/5 transition-colors cursor-pointer">
                  <div>
                    <h4 className="text-white font-bold text-sm tracking-wide">TX_9480_COMPLETE</h4>
                    <p className="text-slate-400 text-xs mt-1 font-medium uppercase">S3 STORAGE</p>
                    <p>ola</p>
                  </div>
                  <span className="text-emerald-400 text-xs font-black uppercase tracking-wider">Done</span>
                </div>

              <CardContent className="p-0 flex items-center justify-center h-[200px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <RadialBarChart
                    data={orcamentoRadialData}
                    innerRadius="30%"
                    outerRadius="100%"
                    barSize={10}
                    startAngle={90}
                    endAngle={-270}
                  >
                    <RadialBar
                      background={{ fill: "#1e293b" }}
                      dataKey="valor"
                      cornerRadius={10}
                    />
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent className="bg-[#1e1e2d] border-slate-800 text-white" />
                      }
                    />
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>

              </div>
            </div>
          </div>


        </Card>

        {/* ======================================================== */}
        {/* SEGUNDA SESSÃO: GRADE COM OS 3 NOVOS GRÁFICOS            */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-full mt-6">
          
          {/* 1. RADIAL CHART - Progresso */}
          <Card className="p-4 shadow-none bg-transparent border-slate-800 flex flex-col items-center justify-center">
            <CardHeader className="p-0 mb-4 text-center">
              <CardTitle className="text-lg font-medium text-slate-300">Progresso Geral</CardTitle>
              <CardDescription className="text-xs text-slate-500">Avanço físico da obra</CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-center h-[200px] w-full">
              <ChartContainer config={{ Progresso: { label: "Progresso", color: "#3b82f6" } }} className="h-full w-full">
                <RadialBarChart data={ProgressoData} innerRadius="75%" outerRadius="100%" startAngle={90} endAngle={-270}>
                  <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                  <RadialBar background={{ fill: "#1e293b" }} dataKey="value" cornerRadius={10} />
                  <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-3xl font-bold">
                    {ProgressoData[0].value}%
                  </text>
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 2. RADIAL CHART - Volume Orçado */}
          <Card className="p-4 shadow-none bg-transparent border-slate-800 flex flex-col items-center justify-center">
            <CardHeader className="p-0 mb-2 text-center">
              <CardTitle className="text-lg font-medium text-slate-300">Volume Orçado</CardTitle>
              <CardDescription className="text-xs text-slate-500">Previsto x Realizado x Reajuste</CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-center h-[220px] w-full">
              <ChartContainer config={barChartConfig} className="h-full w-full">
                <RadialBarChart data={orcamentoRadialData} innerRadius="30%" outerRadius="100%" barSize={12} startAngle={90} endAngle={-270}>
                  <RadialBar background={{ fill: "#1e293b" }} dataKey="valor" cornerRadius={10} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent className="bg-[#1e1e2d] border-slate-800 text-white" />} />
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 3. BAR CHART - Custos Mensais */}
          <Card className="p-4 shadow-none bg-transparent border-slate-800 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-medium text-slate-300">Medições Mensais</CardTitle>
              <CardDescription className="text-xs text-slate-500">Histórico de custos (R$ k)</CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-1 h-[200px] w-full">
              <ChartContainer config={barChartConfig} className="h-full w-full">
                <BarChart data={custosMensaisData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                  <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="3 3" />
                  <XAxis dataKey="mes" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <YAxis tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                  <ChartTooltip cursor={{ fill: "#1e293b", opacity: 0.4 }} content={<ChartTooltipContent className="bg-[#1e1e2d] border-slate-800 text-white" />} />
                  <ChartLegend content={<ChartLegendContent />} className="mt-2 text-slate-300 text-xs" />
                  <Bar dataKey="Previsto" stackId="a" fill="var(--color-Previsto)" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="Realizado" stackId="a" fill="var(--color-Realizado)" />
                  <Bar dataKey="reajustado" stackId="a" fill="var(--color-reajustado)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  );
}