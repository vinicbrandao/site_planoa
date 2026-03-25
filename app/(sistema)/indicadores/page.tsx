"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import {
  TrendingUp,
  PieChart as PieChartIcon,
  Activity,
  CalendarClock,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Label,
  LineChart,
  Line,
} from "recharts";
import { RadialBar, RadialBarChart, PolarAngleAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  { date: "Feb 1", starter: 60000, pro: 22000, enterprise: 40000 },
  { date: "Feb 3", starter: 50000, pro: 65000, enterprise: 35000 },
  { date: "Feb 5", starter: 72000, pro: 42000, enterprise: 58000 },
  { date: "Feb 7", starter: 45000, pro: 95000, enterprise: 70000 },
  { date: "Feb 9", starter: 85000, pro: 65000, enterprise: 105000 },
  { date: "Feb 11", starter: 100000, pro: 55000, enterprise: 75000 },
  { date: "Feb 13", starter: 118000, pro: 98000, enterprise: 55000 },
  { date: "Feb 15", starter: 105000, pro: 82000, enterprise: 72000 },
  { date: "Feb 17", starter: 88000, pro: 110000, enterprise: 62000 },
  { date: "Feb 19", starter: 125000, pro: 72000, enterprise: 95000 },
  { date: "Feb 21", starter: 100000, pro: 120000, enterprise: 75000 },
  { date: "Feb 23", starter: 140000, pro: 100000, enterprise: 118000 },
  { date: "Feb 25", starter: 115000, pro: 140000, enterprise: 102000 },
  { date: "Feb 27", starter: 145000, pro: 122000, enterprise: 135000 },
];

// Dados exatos extraídos da tabela da imagem
const tableData = [
  {
    plan: "Starter",
    subscribers: "1,240",
    mrr: "$4,650.00",
    churn: "2.4%",
    churnColor: "text-red-500",
    upgrades: "+38",
    lvt: "$193.75",
    colorClass: "bg-[#f59e0b]", // Laranja/Amarelo
  },
  {
    plan: "Pro",
    subscribers: "865",
    mrr: "$12,975.00",
    churn: "1.8%",
    churnColor: "text-red-500",
    upgrades: "+62",
    lvt: "$833.33",
    colorClass: "bg-[#0f766e]", // Azul/Teal Escuro
  },
  {
    plan: "Enterprise",
    subscribers: "214",
    mrr: "$21,400.00",
    churn: "0.9%",
    churnColor: "text-emerald-500",
    upgrades: "+14",
    lvt: "$3,555.56",
    colorClass: "bg-[#f97316]", // Vermelho/Laranja
  },
];
// ATENÇÃO
// Configuração das cores do gráfico
const chartConfig = {
  starter: {
    label: "Reajustado",
    color: "#f59e0b",
  },
  pro: {
    label: "Realizado",
    color: "#0f766e",
  },
  enterprise: {
    label: "Previsto",
    color: "#f97316",
  },
} satisfies ChartConfig;

// Dados para os 3 novos gráficos
const progressoData = [{ name: "Progresso", value: 78, fill: "#3b82f6" }]; // 78% Concluído

const orcamentoRadialData = [
  { name: "Reajustado", valor: 120, fill: "#f59e0b" }, // Laranja
  { name: "Realizado", valor: 350, fill: "#10b981" }, // Verde
  { name: "Previsto", valor: 450, fill: "#3b82f6" }, // Azul
];

const custosMensaisData = [
  { mes: "Jan", previsto: 100, realizado: 90, reajustado: 0 },
  { mes: "Fev", previsto: 120, realizado: 130, reajustado: 10 },
  { mes: "Mar", previsto: 150, realizado: 145, reajustado: 5 },
  { mes: "Abr", previsto: 110, realizado: 110, reajustado: 25 },
];

const barChartConfig = {
  previsto: { label: "Previsto", color: "#3b82f6" },
  realizado: { label: "Realizado", color: "#10b981" },
  reajustado: { label: "Reajustado", color: "#f59e0b" },
};

// ==========================================
// TELA PRINCIPAL
// ==========================================
export default function Indicadores() {
  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full">
      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        {/* ======================================================== */}
        {/* PRIMEIRA SESSÃO: VISÃO GERAL DO SEMESTRE (3 Colunas)     */}
        {/* ======================================================== */}
        <div className="mb-6">
          <span className="text-xl text-white border-b border-white/20 pb-1 pr-16 inline-block font-normal">
            Visão Geral do Semestre
          </span>
        </div>
        {/* Note que aqui usamos xl:grid-cols-3 (botei 1 por enquanto) e tem o mb-12 para dar espaço para a próxima sessão */}
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-6 max-w-full mb-12">
          <Card className="w-full max-w-full p-4 shadow-none bg-transparent border-slate-800 text-white">
            <CardHeader className="pb-2">
              <CardDescription className="text-base font-medium text-slate-400">
                SaaS revenue metrics
              </CardDescription>
              <CardTitle className="text-4xl font-bold tracking-tight text-white">
                $39,025.00
              </CardTitle>
              <div className="flex items-center gap-2 text-sm mt-1">
                <span className="text-emerald-400 font-semibold flex items-center">
                  +$1,840.00 (4.9%)
                </span>
                <span className="text-slate-500">vs last month</span>
              </div>
            </CardHeader>

            <CardContent className="mt-6 flex flex-col gap-10">
              {/* GRÁFICO */}
              <div className="h-[350px] w-full">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <LineChart
                    accessibilityLayer
                    data={chartData}
                    margin={{ left: -20, right: 12, top: 20, bottom: 0 }}
                  >
                    {/* Ajuste da cor da grade para ficar sutil no fundo escuro */}
                    <CartesianGrid
                      vertical={false}
                      stroke="#1e293b"
                      strokeDasharray="3 3"
                    />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      tick={{ fill: "#94a3b8" }} // Cor do texto dos eixos (slate-400)
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={12}
                      tickFormatter={(value) => `$${value / 1000}k`}
                      tick={{ fill: "#94a3b8" }}
                    />
                    {/* O Tooltip do shadcn herda o tema, mas se precisar forçar o escuro, a classe 'dark' no wrapper resolve */}
                    <ChartTooltip
                      cursor={false}
                      content={
                        <ChartTooltipContent className="bg-[#1e1e2d] border-slate-800 text-white" />
                      }
                    />
                    <ChartLegend
                      content={<ChartLegendContent />}
                      verticalAlign="top"
                      align="right"
                      iconType="square"
                    />
                    <Line
                      dataKey="starter"
                      type="natural"
                      stroke="var(--color-starter)"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={5000}
                    />
                    <Line
                      dataKey="pro"
                      type="natural"
                      stroke="var(--color-pro)"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={5000}
                    />
                    <Line
                      dataKey="enterprise"
                      type="natural"
                      stroke="var(--color-enterprise)"
                      strokeWidth={2}
                      dot={false}
                      animationDuration={5000}
                    />
                  </LineChart>
                </ChartContainer>
              </div>

              {/* TABELA DE DADOS */}
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b-2 border-slate-800">
                    <TableHead className="w-[200px] text-slate-300 font-semibold">
                      Plan
                    </TableHead>
                    <TableHead className="text-center text-slate-300 font-semibold">
                      Subscribers
                    </TableHead>
                    <TableHead className="text-center text-slate-300 font-semibold">
                      MRR
                    </TableHead>
                    <TableHead className="text-center text-slate-300 font-semibold">
                      Churn
                    </TableHead>
                    <TableHead className="text-center text-slate-300 font-semibold">
                      Upgrades
                    </TableHead>
                    <TableHead className="text-right text-slate-300 font-semibold">
                      LTV
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow
                      key={row.plan}
                      className="border-slate-800/50 hover:bg-slate-800/30 text-slate-200"
                    >
                      <TableCell className="font-medium flex items-center gap-3">
                        <div
                          className={`h-6 w-1 rounded-full ${row.colorClass}`}
                        />
                        {row.plan}
                      </TableCell>
                      <TableCell className="text-center">
                        {row.subscribers}
                      </TableCell>
                      <TableCell className="text-center">{row.mrr}</TableCell>
                      <TableCell className={`text-center ${row.churnColor}`}>
                        {row.churn}
                      </TableCell>
                      <TableCell className="text-center text-emerald-400">
                        {row.upgrades}
                      </TableCell>
                      <TableCell className="text-right">{row.lvt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
        {/* === GRADE COM OS 3 NOVOS GRÁFICOS === */}
        <div className="flex flex-grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mt-6">
          {/* 1. RADIAL CHART - LABEL (Progresso Físico) */}
          <Card className="p-4 shadow-none bg-transparent border-slate-800 flex flex-col items-center justify-center">
            <CardHeader className="p-0 mb-4 text-center">
              <CardTitle className="text-lg font-medium text-slate-300">
                Progresso Geral
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Avanço físico da obra
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-center h-[200px] w-full">
              <ChartContainer
                config={{ progresso: { label: "Progresso", color: "#3b82f6" } }}
                className="h-full w-full"
              >
                <RadialBarChart
                  data={progressoData}
                  innerRadius="75%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={-270}
                >
                  <PolarAngleAxis
                    type="number"
                    domain={[0, 100]}
                    angleAxisId={0}
                    tick={false}
                  />
                  <RadialBar
                    background={{ fill: "#1e293b" }}
                    dataKey="value"
                    cornerRadius={10}
                  />
                  {/* O texto centralizado no meio do círculo */}
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="fill-white text-3xl font-bold"
                  >
                    {progressoData[0].value}%
                  </text>
                </RadialBarChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* 2. RADIAL CHART - STACKED (Distribuição) */}
          <Card className="p-4 shadow-none bg-transparent border-slate-800 flex flex-col items-center justify-center">
            <CardHeader className="p-0 mb-2 text-center">
              <CardTitle className="text-lg font-medium text-slate-300">
                Volume Orçado
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Previsto x Realizado x Reajuste
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex items-center justify-center h-[220px] w-full">
              <ChartContainer config={barChartConfig} className="h-full w-full">
                <RadialBarChart
                  data={orcamentoRadialData}
                  innerRadius="30%"
                  outerRadius="100%"
                  barSize={12}
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
          </Card>

          {/* 3. BAR CHART - STACKED + LEGEND (Custos Mensais) */}
          <Card className="p-4 shadow-none bg-transparent border-slate-800 flex flex-col">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg font-medium text-slate-300">
                Medições Mensais
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Histórico de custos (R$ k)
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 flex-1 h-[200px] w-full">
              <ChartContainer config={barChartConfig} className="h-full w-full">
                <BarChart
                  data={custosMensaisData}
                  margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
                >
                  <CartesianGrid
                    vertical={false}
                    stroke="#1e293b"
                    strokeDasharray="3 3"
                  />
                  <XAxis
                    dataKey="mes"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tick={{ fill: "#94a3b8", fontSize: 12 }}
                  />
                  <ChartTooltip
                    cursor={{ fill: "#1e293b", opacity: 0.4 }}
                    content={
                      <ChartTooltipContent className="bg-[#1e1e2d] border-slate-800 text-white" />
                    }
                  />
                  <ChartLegend
                    content={<ChartLegendContent />}
                    className="mt-2 text-slate-300 text-xs"
                  />
                  <Bar
                    dataKey="previsto"
                    stackId="a"
                    fill="var(--color-previsto)"
                    radius={[0, 0, 4, 4]}
                  />
                  <Bar
                    dataKey="realizado"
                    stackId="a"
                    fill="var(--color-realizado)"
                  />
                  <Bar
                    dataKey="reajustado"
                    stackId="a"
                    fill="var(--color-reajustado)"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
