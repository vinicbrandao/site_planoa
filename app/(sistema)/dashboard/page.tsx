// ESSA SERÁ A PÁGINA INICIAL DO SISTEMA

'use client';

import { Suspense, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChevronDown, Filter, TrendingUp, TrendingDown, HardHat } from 'lucide-react';
import { Progress } from "@/components/ui/progress";



export default function DashboardPage() {
  const [progressValues] = useState({
    revenue: 75,
    subscriptions: 60,
    sales: 45,
    users: 80,
  });
  return (
    <Suspense fallback={null}>
      <div className="p-6 h-full flex flex-col gap-6 overflow-y-auto w-full">
      
      {/* Botão de Filtro Global */}
        <div className="w-full bg-[#0D0D1F] h-12 rounded-lg mb-8 flex items-center px-4 shadow-sm border border-gray-300">
           <span className="text-gray-200 text-sm flex items-center gap-2 cursor-pointer font-bold">
             <Filter size={18} /> Filtro Global <ChevronDown size={16} />
           </span>
        </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          
          {/* CARD 1: REVENUE */}
          <Card className="shadow-lg bg-[#0D0D1F] border border-white/10 rounded-xl flex flex-col">
            <CardHeader className="pb-2 grid grid-cols-2">
              {/* text-slate-400 para dar aquele aspecto de subtítulo no tema escuro */}
              <CardTitle className="grid grid-cols-2 text-sm font-medium text-slate-400">
                <HardHat size={16} className="grid grid-cols-1 text-gray-500" />
                Revenue
                </CardTitle>
            </CardHeader>
            <CardContent> 
              {/* text-white para o valor principal se destacar */}
              <div className="text-2xl font-bold text-white">$45,231</div>
              <div className="flex items-center pt-1 text-xs text-emerald-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+20.1% from last month</span>
              </div>
              <Progress className="mt-4 bg-white/10 [&>div]:bg-emerald-400" value={progressValues.revenue} />
            </CardContent>
          </Card>

          {/* CARD 2: SUBSCRIPTIONS */}
          <Card className="shadow-lg bg-[#0D0D1F] border border-white/10 rounded-xl flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Subscriptions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+2,350</div>
              <div className="flex items-center pt-1 text-xs text-emerald-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+180.1% from last month</span>
              </div>
              <Progress className="mt-4 bg-white/10 [&>div]:bg-blue-400" value={progressValues.subscriptions} />
            </CardContent>
          </Card>

          {/* CARD 3: SALES */}
          <Card className="shadow-lg bg-[#0D0D1F] border border-white/10 rounded-xl flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Sales</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+12,234</div>
              <div className="flex items-center pt-1 text-xs text-red-400">
                <TrendingDown className="mr-1 h-3 w-3" />
                <span>-19.5% from last month</span>
              </div>
              <Progress className="mt-4 bg-white/10 [&>div]:bg-red-400" value={progressValues.sales} />
            </CardContent>
          </Card>

          {/* CARD 4: ACTIVE USERS */}
          <Card className="shadow-lg bg-[#0D0D1F] border border-white/10 rounded-xl flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-400">Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">+573</div>
              <div className="flex items-center pt-1 text-xs text-emerald-400">
                <TrendingUp className="mr-1 h-3 w-3" />
                <span>+201 since last hour</span>
              </div>
              <Progress className="mt-4 bg-white/10 [&>div]:bg-amber-400" value={progressValues.users} />
            </CardContent>
          </Card>
        </div>

      {/* Grid Superior: Visão Geral e Detalhes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#0D0D1F] rounded-xl shadow-lg border border-white/10 p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-white mb-4">Visão Geral</h2>
          {/* O conteúdo do seu gráfico ou tabela vai aqui */}
        </div>
        
        <div className="bg-[#0D0D1F] rounded-xl shadow-lg border border-white/10 p-6 min-h-[300px]">
          <h2 className="text-lg font-semibold text-white mb-4">Detalhes</h2>
          {/* O conteúdo lateral de detalhes vai aqui */}
        </div>
      </div>

      {/* Grid Inferior: Indicadores */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-6">
        <div className="bg-[#0D0D1F] rounded-xl shadow-lg border border-white/10 p-6 min-h-[150px] flex items-center justify-center">
          <h3 className="text-md font-medium text-slate-400">Indicador 1</h3>
        </div>
        <div className="bg-[#0D0D1F] rounded-xl shadow-lg border border-white/10 p-6 min-h-[150px] flex items-center justify-center">
          <h3 className="text-md font-medium text-slate-400">Indicador 2</h3>
        </div>
        <div className="bg-[#0D0D1F] rounded-xl shadow-lg border border-white/10 p-6 min-h-[150px] flex items-center justify-center">
          <h3 className="text-md font-medium text-slate-400">Indicador 3</h3>
        </div>
      </div>

    </div>
    </Suspense>
  );
}