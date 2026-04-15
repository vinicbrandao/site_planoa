"use client";

import { useState, useMemo } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, LineChart, Line, RadialBar, RadialBarChart, PolarAngleAxis, Pie, PieChart, Cell } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

// DADOS DOS GRÁFICOS ORIGINAIS
const chartData = [
  { date: "Feb 1", Previsto: 60000, Realizado: 22000, Reajustado: 40000 },
  { date: "Feb 3", Previsto: 50000, Realizado: 65000, Reajustado: 35000 },
  { date: "Feb 5", Previsto: 72000, Realizado: 42000, Reajustado: 58000 },
  { date: "Feb 7", Previsto: 48000, Realizado: 30000, Reajustado: 45000 },
  { date: "Feb 9", Previsto: 55000, Realizado: 50000, Reajustado: 60000 },
  { date: "Feb 11", Previsto: 65000, Realizado: 70000, Reajustado: 62000 },
];

const tableData = [
  { plan: "Previsto", subscribers: "1,240", mrr: "$4,650.00", churn: "2.4%", churnColor: "text-red-500", upgrades: "+38", lvt: "$193.75", colorClass: "bg-[#f59e0b]" },
  { plan: "Realizado", subscribers: "865", mrr: "$12,975.00", churn: "1.8%", churnColor: "text-red-500", upgrades: "+62", lvt: "$833.33", colorClass: "bg-[#0f766e]" },
  { plan: "Reajustado", subscribers: "214", mrr: "$21,400.00", churn: "0.9%", churnColor: "text-emerald-500", upgrades: "+14", lvt: "$3,555.56", colorClass: "bg-[#f97316]" },
];

// DADOS DO GRÁFICO DE BARRAS
const obrasData2026 = [
  { month: "Jan/26", previsto: 1, realizado: 1, textPrevisto: "1%", textRealizado: "2%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Fev/26", previsto: 2, realizado: 2, textPrevisto: "2%", textRealizado: "2%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Mar/26", previsto: 2, realizado: 2, textPrevisto: "2%", textRealizado: "3%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Abr/26", previsto: 3, realizado: 3, textPrevisto: "3%", textRealizado: "2%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Mai/26", previsto: 3, realizado: 3, textPrevisto: "3%", textRealizado: "3%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Jun/26", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "3%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Jul/26", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "4%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Ago/26", previsto: 5, realizado: 5, textPrevisto: "5%", textRealizado: "4%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Set/26", previsto: 5, realizado: 5, textPrevisto: "5%", textRealizado: "5%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Out/26", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "5%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Nov/26", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "5%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
  { month: "Dez/26", previsto: 3, realizado: 3, textPrevisto: "3%", textRealizado: "4%", bgFill: "rgba(29, 78, 216, 0.5)", fgFill: "#3b82f6" },
];

const obrasData2027 = [
  { month: "Jan/27", previsto: 1, realizado: 1, textPrevisto: "1%", textRealizado: "2%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Fev/27", previsto: 2, realizado: 2, textPrevisto: "2%", textRealizado: "3%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Mar/27", previsto: 2, realizado: 2, textPrevisto: "2%", textRealizado: "3%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Abr/27", previsto: 3, realizado: 3, textPrevisto: "3%", textRealizado: "2%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Mai/27", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "3%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Jun/27", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Jul/27", previsto: 5, realizado: 5, textPrevisto: "5%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Ago/27", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "5%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Set/27", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "5%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Out/27", previsto: 3, realizado: 3, textPrevisto: "3%", textRealizado: "5%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Nov/27", previsto: 3, realizado: 3, textPrevisto: "3%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
  { month: "Dez/27", previsto: 2, realizado: 2, textPrevisto: "2%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#8b5cf6" },
];

const obrasData2028 = [
  { month: "Jan/28", previsto: 2, realizado: 2, textPrevisto: "2%", textRealizado: "2%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Fev/28", previsto: 2, realizado: 2, textPrevisto: "2%", textRealizado: "2%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Mar/28", previsto: 3, realizado: 3, textPrevisto: "3%", textRealizado: "3%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Abr/28", previsto: 3, realizado: 3, textPrevisto: "3%", textRealizado: "3%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Mai/28", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Jun/28", previsto: 4, realizado: 4, textPrevisto: "4%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Jul/28", previsto: 5, realizado: 0, textPrevisto: "5%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Ago/28", previsto: 4, realizado: 0, textPrevisto: "4%", textRealizado: "5%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Set/28", previsto: 3, realizado: 0, textPrevisto: "3%", textRealizado: "5%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Out/28", previsto: 3, realizado: 0, textPrevisto: "3%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Nov/28", previsto: 2, realizado: 0, textPrevisto: "2%", textRealizado: "4%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
  { month: "Dez/28", previsto: 2, realizado: 0, textPrevisto: "2%", textRealizado: "3%", bgFill: "rgba(109, 40, 217, 0.5)", fgFill: "#EC4899" },
];
  const dadosPorAno = {
  "2026": obrasData2026,
  "2027": obrasData2027, // Substitua pelas suas variáveis reais
  "2028": obrasData2028,
}


const activityData = [
  { day: "Sun", percent: 65, label: "10%" },
  { day: "Mon", percent: 75, label: "13%" },
  { day: "Tue", percent: 90, label: "17%" },
  { day: "Wed", percent: 85, label: "16%" },
  { day: "Thu", percent: 80, label: "14%" },
  { day: "Fri", percent: 95, label: "22%" },
  { day: "Sat", percent: 85, label: "18%" },
];

const chartConfig = {
  Previsto: { label: "Previsto", color: "#f59e0b" },
  Reajustado: { label: "Reajustado", color: "#f97316" },
  Realizado: { label: "Realizado", color: "#0f766e" },
} satisfies ChartConfig;



const gaugeData = [{ value: 84, fill: "#3b82f6" }];

// SHAPE CUSTOMIZADO: renderiza barra de fundo (Previsto) + barra da frente (Realizado) sobrepostas

const DoubleBar = (props: any) => {
  const { x, y, width, height, payload } = props;
  if (!payload || height <= 0) return null;

  const bgW = width;
  const bgX = x;
  const fgW = Math.round(bgW * 0.58);
  const fgX = bgX + (bgW - fgW) / 2;
  const fgH = Math.round(height * (payload.realizado / payload.previsto)) || 0;
  const fgY = y + height - fgH;

  return (
    <g>
      <rect x={bgX} y={y} width={bgW} height={height} rx={4} ry={4} fill={payload.bgFill} />
      <text x={bgX + bgW / 2} y={y - 10} textAnchor="middle" fill="white" fontSize={13} fontWeight="bold">
        {payload.textPrevisto}
      </text>
      <rect x={fgX} y={fgY} width={fgW} height={fgH} rx={4} ry={4} fill={payload.fgFill} />
      {fgH > 15 && (
        <text x={fgX + fgW / 2} y={fgY + fgH / 2} textAnchor="middle" dominantBaseline="central" fill="white" fontSize={14} fontWeight="bold">
          {payload.textRealizado}
        </text>
      )}
    </g>
  );
};

export function CardMensal() {
  // 1. Estado para controlar o ano selecionado
  const [anoSelecionado, setAnoSelecionado] = useState<"2026" | "2028">("2028");
  
  // 2. Pega os dados baseados no ano
  const dadosAtuais = dadosPorAno[anoSelecionado];

  // 3. Lógica para calcular a % total do ano
  const porcentagemConcluida = useMemo(() => {
    const totalPrevisto = dadosAtuais.reduce((acc, curr) => acc + (curr.previsto || 0), 0);
    const totalRealizado = dadosAtuais.reduce((acc, curr) => acc + (curr.realizado || 0), 0);
    
    if (totalPrevisto === 0) return 0;
    
    const porcentagem = (totalRealizado / totalPrevisto) * 100;
    return Number(porcentagem.toFixed(2));
  }, [dadosAtuais]);

  // 4. Prepara os dados para a Pizza baseada no cálculo acima
  const pieChartData = [
    { name: "Concluído", value: porcentagemConcluida, fill: "#EC4899" }, // Parte Rosa
    { name: "Restante", value: 100 - porcentagemConcluida, fill: "url(#stripes-pattern)" }, // Textura
  ];

  return (
<Card className="p-0 w-full max-w-6xl mx-auto shadow-lg bg-[#0D0D1F] border border-white/10 text-white rounded-xl mb-12 overflow-hidden flex flex-col">
      <div className="grid grid-cols-1 xl:grid-cols-3 p-0">
        
        {/* LADO ESQUERDO: GRÁFICO DE BARRAS (Ocupa 2 colunas) */}
        <div className="xl:col-span-2 flex flex-col p-6 pr-6">
          <div className="flex justify-between items-center mb-2 relative">
            <h3 className="text-xl font-medium text-slate-300">Mensal</h3>
            
            {/* Legenda "Quadrados" */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-[#4c2889] rounded-[2px]" />
                <span className="text-sm text-slate-200 font-medium">Prevista</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-3 bg-[#EC4899] rounded-[2px]" />
                <span className="text-sm text-slate-200 font-medium">Realizada</span>
              </div>
            </div>

            {/* Filtro Select */}
            <Select value={anoSelecionado} onValueChange={(value: "2026" | "2027" | "2028") => setAnoSelecionado(value)}>
              <SelectTrigger className="w-[98px] bg-[#1A1A2E] border-white/10 text-white font-bold text-lg h-9 cursor-pointer z-10">
                <SelectValue placeholder="Ano" />
              </SelectTrigger>
              <SelectContent className="bg-[#1A1A2E] border-white/10 text-white cursor-pointer">
                <SelectItem className="cursor-pointer" value="2026">2026</SelectItem>
                <SelectItem className="cursor-pointer" value="2027">2027</SelectItem>
                <SelectItem className="cursor-pointer" value="2028">2028</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gráfico de Barras em si */}
          <div className="h-[250px] w-full mt-4">
            <ChartContainer config={chartConfig} className="h-full w-full">
              <BarChart accessibilityLayer data={dadosAtuais} barCategoryGap="50%" margin={{ top: 40, right: 10, left: 10, bottom: 0 }}>
                <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis dataKey="month" tickLine={false} tickMargin={10} axisLine={{ stroke: "#475569", strokeWidth: 2 }} tick={{ fill: "#94a3b8", fontSize: 11, fontWeight: 500 }} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent className="bg-[#1e1e2d] border-slate-800 text-white"/>} />
                <Bar dataKey="previsto" barSize={50} shape={<DoubleBar />} isAnimationActive={true} />
              </BarChart>
            </ChartContainer>
          </div>
        </div>

        {/* LADO DIREITO: GRÁFICO DE PIZZA (Ocupa 1 coluna) */}
        {/* CORREÇÃO 1: Classes da div ajustadas para se comportar como coluna do grid */}
        <div className="xl:col-span-1 flex flex-col items-center justify-start border-t xl:border-t-0 xl:border-l border-white/10 p-6 bg-[#0B0B19]">
          
          {/* CORREÇÃO 2: Título com a mesma formatação do "Mensal" */}
          <h3 className="text-xl font-medium text-slate-300 mb-6 w-full text-left">
            Porcentagem Mensal Concluída:
          </h3>
          
          <div className="relative w-[180px] h-[180px] flex items-center justify-center mt-2">
            
            {/* O Padrão SVG que cria a Textura de Listras roxas */}
            <svg width="0" height="0">
              <defs>
                <pattern id="stripes-pattern" width="8" height="8" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
                  <rect width="8" height="8" fill="#1e103c" />
                  <line x1="0" y1="0" x2="0" y2="8" stroke="#4c2889" strokeWidth="4" />
                </pattern>
              </defs>
            </svg>
            
            <ChartContainer config={{}} className="h-full w-full">
              <PieChart>
                <Pie data={pieChartData} cx="50%" cy="50%" innerRadius={0} outerRadius={80} dataKey="value" stroke="none" startAngle={90} endAngle={-270} isAnimationActive={true}>
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
              </PieChart>
            </ChartContainer>
            
            {/* O Valor em texto sobrepondo o gráfico */}
            <div className="absolute font-bold text-white text-xl tracking-tight z-10" style={{ transform: 'translateY(15px)' }}>
              {porcentagemConcluida.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}%
            </div>
          </div>
        </div>

      </div>
    </Card>
  );
};

export default function Indicadores() {
  // ATENÇÃO!!
  const [anoSelecionado, setAnoSelecionado] = useState<"2026" | "2027" | "2028">("2026")

  // 2. Selecionamos os dados corretos com base no estado
  const dadosAtuais = dadosPorAno[anoSelecionado]

  // 3. Lógica para calcular a % total do ano
  const porcentagemConcluida = useMemo(() => {
    const totalPrevisto = dadosAtuais.reduce((acc, curr) => acc + (curr.previsto || 0), 0);
    const totalRealizado = dadosAtuais.reduce((acc, curr) => acc + (curr.realizado || 0), 0);
      
    if (totalPrevisto === 0) return 0;
      
    const porcentagem = (totalRealizado / totalPrevisto) * 100;
    return Number(porcentagem.toFixed(2));
  }, [dadosAtuais]);

  // 4. Prepara os dados para a Pizza baseada no cálculo acima
  const pieChartData = [
    { name: "Concluído", value: porcentagemConcluida, fill: "#EC4899" }, // Parte Rosa
    { name: "Restante", value: 100 - porcentagemConcluida, fill: "url(#stripes-pattern)" }, // Textura
  ];
  return (
    <div className="flex flex-col h-full bg-[#080818] relative w-full items-center">
      <div className="p-8 flex-1 overflow-y-auto w-full pt-6 max-w-7xl">
        
        {/* CABEÇALHO (INTACTO) */}
        <div className="mb-6 flex justify-between items-center">
          <span className="text-xl text-white border-b border-white/20 pb-1 pr-16 inline-block font-normal uppercase tracking-wide">
            Exemplo de Indicadores - Dashboard Fictício
          </span>
          <button className="text-sm font-medium text-blue-400 border border-blue-400/30 px-4 py-1.5 rounded-md hover:bg-blue-500/10 transition-colors uppercase">
            Exemplo
          </button>
        </div>

        {/* SUPER CARD PRINCIPAL 1 (INTACTO) */}
        <Card className="p-0 w-full max-w-6xl mx-auto shadow-lg bg-[#0D0D1F] border border-white/10 text-white rounded-xl mb-6 overflow-hidden flex flex-col">
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 p-6">
            
            <div className="xl:col-span-2 flex flex-col p-0">
              <CardHeader className="p-0 pb-4">
                <CardTitle className="text-2xl font-bold tracking-tight text-white">
                  Acompanhamento Físico
                </CardTitle>
                <CardDescription className="text-sm font-medium text-slate-400 mt-1">
                  Período - Jan/26
                </CardDescription>
                <div className="flex items-center gap-2 text-sm mt-2">
                  <span className="text-emerald-400 font-semibold">+ 0,7% (3,5%)</span>
                  <span className="text-slate-500">comparando Dez/25</span>
                  <span className="text-red-400 font-semibold">(2,8%)</span>
                </div>
              </CardHeader>

              <CardContent className="p-0 mt-2 flex flex-col flex-1">
                <div className="h-[250px] w-full">
                  <ChartContainer config={chartConfig} className="h-full w-full">
                    <LineChart accessibilityLayer data={chartData} margin={{ left: -20, right: 12, top: 10, bottom: 0 }}>
                      <CartesianGrid vertical={false} stroke="#1e293b" strokeDasharray="3 3" />
                      <XAxis dataKey="date" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                      <YAxis tickLine={false} axisLine={false} tickMargin={8} tickFormatter={(value) => `$${value / 1000}k`} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                      <ChartTooltip cursor={false} content={<ChartTooltipContent className="bg-[#1e1e2d] border-slate-800 text-white" />} />
                      <ChartLegend content={<ChartLegendContent />} verticalAlign="top" align="center" iconType="square" />
                      <Line dataKey="Previsto" type="natural" stroke="var(--color-Previsto)" strokeWidth={2} dot={false} />
                      <Line dataKey="Realizado" type="natural" stroke="var(--color-Realizado)" strokeWidth={2} dot={false} />
                      <Line dataKey="Reajustado" type="natural" stroke="var(--color-Reajustado)" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ChartContainer>
                </div>
              </CardContent>

              <Table className="w-full p-0 mt-6 mb-0 border-t border-white/10">
                <TableHeader>
                  <TableRow className="hover:bg-transparent border-b border-white/20">
                    <TableHead className="py-2 text-xs text-slate-300 font-semibold">Indicadores</TableHead>
                    <TableHead className="py-2 text-center text-xs text-slate-300 font-semibold">Subscribers</TableHead>
                    <TableHead className="py-2 text-center text-xs text-slate-300 font-semibold">mrr</TableHead>
                    <TableHead className="py-2 text-center text-xs text-slate-300 font-semibold">Churn</TableHead>
                    <TableHead className="py-2 text-center text-xs text-slate-300 font-semibold">Upgrades</TableHead>
                    <TableHead className="py-2 text-right text-xs text-slate-300 font-semibold">LTV</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.map((row) => (
                    <TableRow key={row.plan} className="border-white/10 hover:bg-white/10 transition-colors text-slate-200">
                      <TableCell className="py-2 text-sm font-medium flex items-center gap-2">
                        <div className={`h-4 w-1 rounded-full ${row.colorClass}`} />
                        {row.plan}
                      </TableCell>
                      <TableCell className="py-2 text-sm text-center">{row.subscribers}</TableCell>
                      <TableCell className="py-2 text-sm text-center">{row.mrr}</TableCell>
                      <TableCell className={`py-2 text-sm text-center ${row.churnColor}`}>{row.churn}</TableCell>
                      <TableCell className="py-2 text-sm text-center text-emerald-400">{row.upgrades}</TableCell>
                      <TableCell className="py-2 text-sm text-right">{row.lvt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="xl:col-span-1 flex flex-col items-center justify-center border-t xl:border-t-0 xl:border-l border-white/10 pt-6 xl:pt-0 xl:pl-6">
              <h3 className="text-base font-bold text-white uppercase tracking-widest mb-1 text-center">
                Eficiência Local
              </h3>
              <p className="text-[10px] text-slate-500 mb-4 uppercase tracking-tighter text-center">
                Performance do Pipeline Atual
              </p>
              <div className="h-[200px] w-full flex items-center justify-center relative">
                <ChartContainer config={chartConfig} className="h-full w-full">
                  <RadialBarChart
                    data={gaugeData}
                    startAngle={180}
                    endAngle={0}
                    innerRadius="80%"
                    outerRadius="120%"
                    cx="50%"
                    cy="75%"
                  >
                    <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                    <RadialBar background={{ fill: "#1e293b" }} dataKey="value" cornerRadius={10} />
                    <g>
                      <text x="50%" y="60%" textAnchor="middle" dominantBaseline="middle" className="fill-white text-4xl font-black">
                        {gaugeData[0].value}%
                      </text>
                      <text x="50%" y="72%" textAnchor="middle" dominantBaseline="middle" className="fill-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        Eficiência
                      </text>
                    </g>
                  </RadialBarChart>
                </ChartContainer>
              </div>
              <div className="grid grid-cols-2 gap-3 w-full mt-2">
                <div className="bg-white/5 p-2 rounded-lg border border-white/10 text-center">
                  <p className="text-[10px] text-slate-500 uppercase">Uptime</p>
                  <p className="text-emerald-400 text-sm font-bold">99.9%</p>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/10 text-center">
                  <p className="text-[10px] text-slate-500 uppercase">Latência</p>
                  <p className="text-blue-400 text-sm font-bold">24ms</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
        <CardMensal />
    </div>
  </div>
  );
};