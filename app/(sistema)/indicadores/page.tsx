'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { TrendingUp, PieChart as PieChartIcon, Activity, CalendarClock } from "lucide-react";
import { 
  Bar, BarChart, CartesianGrid, XAxis, YAxis, 
  PieChart, Pie, Label, 
  LineChart, Line
} from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

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
      { threshold: 0.2 } 
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visivel };
}

// ==========================================
// DADOS DOS GRÁFICOS
// ==========================================
const barChartData = [
  { mes: "Abr", previsto: 10, realizado: 11},
  { mes: "Mai", previsto: 10, realizado: 11 },
  { mes: "Jun", ativas: 7, concluidas: 3 },
  { mes: "Jul", ativas: 10, concluidas: 4 },
  { mes: "Ago", ativas: 8, concluidas: 6 },
  { mes: "Set", ativas: 12, concluidas: 7 }
]

const barChartConfig = {
  ativas: { label: "Obras Ativas", color: "#0048FF" },
  concluidas: { label: "Concluídas", color: "#0B1B40" },
} satisfies ChartConfig;

const donutChartData = [
  { categoria: "Residencial", obras: 50, fill: "#0048FF" },
  { categoria: "Comercial", obras: 15, fill: "#0B1B40" },
  { categoria: "Infraestrutura", obras: 8, fill: "#8D8D8D" },
];
const donutChartConfig = {
  obras: { label: "Total de Obras" },
  residencial: { label: "Residencial", color: "#0048FF" },
  comercial: { label: "Comercial", color: "#0B1B40" },
  infraestrutura: { label: "Infra", color: "#8D8D8D" },
} satisfies ChartConfig;

const lineChartData = [
  { mes: "Jan", previsto: 41, realizado: 37 },
  { mes: "Fev", previsto: 46, realizado: 45 },
  { mes: "Mar", previsto: 66, realizado: 61 },
  { mes: "Abr", previsto: 77, realizado: 71 },
  { mes: "Mai", previsto: 83, realizado: 78 },
  { mes: "Jun", previsto: 87, realizado: 84 },
  { mes: "Jul", previsto: 91, realizado: 93 },
  { mes: "Ago", previsto: 96, realizado: 94 },
  { mes: "Set", realizado: 100}
];
const lineChartConfig = {
  previsto: { label: "% Previsto", color: "#8D8D8D" },
  realizado: { label: "% Realizado", color: "#0048FF" },
} satisfies ChartConfig;

const ganttChartData = [
  { obra: "City Park", inicio: 2, duracao: 5 },
  { obra: "Ponte JK", inicio: 0, duracao: 8 },
  { obra: "Residencial", inicio: 5, duracao: 4 },
  { obra: "Condomínio", inicio: 7, duracao: 5 },
];
const ganttChartConfig = {
  duracao: { label: "Duração (Meses)", color: "#0B1B40" },
} satisfies ChartConfig;

// ==========================================
// TELA PRINCIPAL
// ==========================================
export default function Indicadores() {
  const totalObras = useMemo(() => donutChartData.reduce((acc, curr) => acc + curr.obras, 0), []);

  const refGraficoBarras = useVisivelNaTela();
  const refGraficoRosca = useVisivelNaTela();
  const refGraficoLinha = useVisivelNaTela();
  const refGraficoGantt = useVisivelNaTela();

  return (
    <div className="flex flex-col h-full bg-white relative w-full">

      <div className="p-8 flex-1 overflow-y-auto w-full pt-6">
        
        {/* ======================================================== */}
        {/* PRIMEIRA SESSÃO: VISÃO GERAL DO SEMESTRE (3 Colunas)     */}
        {/* ======================================================== */}
        <div className="mb-6">
          <span className="text-xl text-black border-b border-gray-400 pb-1 pr-16 inline-block font-normal">
            Visão Geral do Semestre
          </span>
        </div>

        {/* Note que aqui usamos xl:grid-cols-3 e tem o mb-12 para dar espaço para a próxima sessão */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 max-w-full  mb-12">
          
          {/* 1. GRÁFICO DE BARRAS */}
          <Card ref={refGraficoBarras.ref} className="border-black rounded-lg shadow-sm bg-gray-50 flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-200 mb-4 items-center">
              <CardTitle className="text-lg text-black flex items-center gap-2 font-bold w-full">
                <TrendingUp size={20} className="text-blue-600" /> Evolução de Obras
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm w-full">Escala ajustada de 3 em 3</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4 min-h-[250px] flex items-center justify-center">
              {refGraficoBarras.visivel && (
                <ChartContainer config={barChartConfig} className="mx-auto w-full max-h-[290px] animate-in fade-in duration-700">
                  <BarChart data={barChartData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#d1d5db" strokeDasharray="4 4" />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} tick={{ fill: '#000' }} />
                    <YAxis ticks={[0, 3, 6, 9, 12, 15, 18]} tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                    <ChartTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} content={<ChartTooltipContent />} />
                    <Bar dataKey="" fill="var(--color-ativas)" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="concluidas" fill="var(--color-concluidas)" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* 2. GRÁFICO DE ROSCA */}
          <Card ref={refGraficoRosca.ref} className="border-black rounded-lg shadow-sm bg-gray-50 flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-200 mb-4 items-center">
              <CardTitle className="text-lg text-black flex items-center gap-2 font-bold w-full">
                <PieChartIcon size={20} className="text-blue-600" /> Portfólio por Categoria
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm w-full">Distribuição atual</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4 min-h-[300px] flex items-center justify-center">
              {refGraficoRosca.visivel && (
                <ChartContainer config={donutChartConfig} className="w-full mx-auto aspect-square max-h-[250px] animate-in fade-in duration-700" >
                  <PieChart>
                    <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                    <Pie data={donutChartData} dataKey="obras" nameKey="categoria" innerRadius={70} outerRadius={100} strokeWidth={2} stroke="#f9fafb">
                      <Label content={({ viewBox }) => {
                          if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                            return (
                              <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-black text-4xl font-bold">{totalObras}</tspan>
                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-gray-500 text-sm font-medium">Obras Totais</tspan>
                              </text>
                            )
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

          {/* 3. GRÁFICO DE LINHAS */}
          <Card ref={refGraficoLinha.ref} className="border-black rounded-lg shadow-sm bg-gray-50 flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-200 mb-4 items-center">
              <CardTitle className="text-lg text-black flex items-center gap-2 font-bold w-full">
                <Activity size={20} className="text-blue-600" /> Avanço Físico (%)
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm w-full">Progresso Previsto vs Realizado</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4 min-h-[300px] flex items-center justify-center">
              {refGraficoLinha.visivel && (
                <ChartContainer config={lineChartConfig} className="mx-auto w-full max-h-[250px] animate-in fade-in duration-700">
                  <LineChart data={lineChartData} margin={{ top: 20, right: 20, left: -20, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="#d1d5db" strokeDasharray="4 4" />
                    <XAxis dataKey="mes" tickLine={false} axisLine={false} tick={{ fill: '#000' }} />
                    <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} />
                    <ChartTooltip cursor={{ stroke: '#9ca3af', strokeWidth: 1, strokeDasharray: '3 3' }} content={<ChartTooltipContent />} />
                    <Line type="monotone" dataKey="realizado" stroke="var(--color-realizado)" strokeWidth={4} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                    <Line type="monotone" dataKey="previsto" stroke="var(--color-previsto)" strokeWidth={2} strokeDasharray="5 5" dot={false} />
                  </LineChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>

        </div> 
        {/* AQUI FECHOU A PRIMEIRA GRADE! */}


        {/* ======================================================== */}
        {/* SEGUNDA SESSÃO: VISÃO GERAL DAS OBRAS (Ocupa a tela toda)*/}
        {/* ======================================================== */}
        <div className="mb-6">
          <span className="text-xl text-black border-b border-gray-400 pb-1 pr-16 inline-block font-normal">
            Visão Geral das Obras
          </span>
        </div>

        {/* Aqui usamos grid-cols-1 para o Gantt ficar comprido na horizontal */}
        <div className="grid grid-cols-1 gap-6 max-w-200 pb-24">
          
          {/* 4. GRÁFICO DE GANTT */}
          <Card ref={refGraficoGantt.ref} className="border-black rounded-lg shadow-sm bg-gray-50 flex flex-col">
            <CardHeader className="pb-4 border-b border-gray-200 mb-4 items-center">
              <CardTitle className="text-lg text-black flex items-center gap-2 font-bold w-full">
                <CalendarClock size={20} className="text-blue-600" /> Cronograma de Execução (Gantt)
              </CardTitle>
              <CardDescription className="text-gray-600 text-sm w-full">Planejamento das Obras Principais</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-4 min-h-[300px] flex items-center justify-center">
              {refGraficoGantt.visivel && (
                <ChartContainer config={ganttChartConfig} className="mx-auto w-full animate-in fade-in duration-700">
                  <BarChart layout="vertical" data={ganttChartData} margin={{ top: 0, right: 20, left: 20, bottom: 0 }}>
                    <CartesianGrid horizontal={true} vertical={false} stroke="#d1d5db" strokeDasharray="4 4" />
                    <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: '#6b7280' }} domain={[0, 12]} ticks={[0, 2, 4, 6, 8, 10, 12]} />
                    <YAxis dataKey="obra" type="category" tickLine={false} axisLine={false} tick={{ fill: '#000', fontWeight: 600 }} width={80} />
                    <ChartTooltip cursor={{ fill: 'rgba(0,0,0,0.05)' }} content={<ChartTooltipContent />} />
                    <Bar dataKey="inicio" stackId="a" fill="transparent" />
                    <Bar dataKey="duracao" stackId="a" fill="var(--color-duracao)" radius={[4, 4, 4, 4]} />
                  </BarChart>
                </ChartContainer>
              )}
            </CardContent>
          </Card>
        
        </div>
      </div>
    </div>
  );
}