"use client";

import React from 'react';
import { ArrowDownRight, ArrowUpRight, Sun, Monitor, Battery, Zap, TrendingUp } from 'lucide-react';

// Realistic 14-day price data arrays (each value is relative Y)
const updates = [
  {
    icon: <Sun className="w-5 h-5 text-amber-400" />,
    iconBg: "bg-amber-500/10 border-amber-500/20",
    title: "Solar Panel Price",
    price: "₹22.50 / Watt",
    change: "- 2.5%",
    isPositive: false,
    lineColor: "#EF4444",
    fillColor: "rgba(239,68,68,0.15)",
    // 14 data points — downward trend with noise
    data: [28, 27.5, 29, 28, 27, 26, 27.5, 26.5, 25, 26, 24.5, 24, 23, 22.5],
  },
  {
    icon: <Monitor className="w-5 h-5 text-blue-400" />,
    iconBg: "bg-blue-500/10 border-blue-500/20",
    title: "Inverter Price",
    price: "₹18,500 / Unit",
    change: "+ 1.8%",
    isPositive: true,
    lineColor: "#10B981",
    fillColor: "rgba(16,185,129,0.15)",
    // Upward trend with noise
    data: [17, 17.2, 17.5, 17.1, 17.8, 17.6, 18, 17.9, 18.2, 18.0, 18.3, 18.5, 18.4, 18.5],
  },
  {
    icon: <Battery className="w-5 h-5 text-emerald-400" />,
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    title: "Battery Price",
    price: "₹11,200 / kWh",
    change: "- 0.9%",
    isPositive: false,
    lineColor: "#EF4444",
    fillColor: "rgba(239,68,68,0.15)",
    // Slightly downward with bumps
    data: [12, 11.8, 12.2, 12, 11.7, 12.1, 11.9, 11.5, 11.8, 11.6, 11.4, 11.5, 11.3, 11.2],
  },
  {
    icon: <Zap className="w-5 h-5 text-yellow-400" />,
    iconBg: "bg-yellow-500/10 border-yellow-500/20",
    title: "Module Efficiency",
    price: "22.8%",
    change: "+ 0.6%",
    isPositive: true,
    lineColor: "#10B981",
    fillColor: "rgba(16,185,129,0.15)",
    // Gradually rising
    data: [21.5, 21.6, 21.8, 21.7, 22, 21.9, 22.1, 22.2, 22.3, 22.2, 22.5, 22.6, 22.7, 22.8],
  }
];

// Build an SVG polyline path with smooth curves from data points
function buildPath(data: number[], width: number, height: number) {
  const minVal = Math.min(...data);
  const maxVal = Math.max(...data);
  const range = maxVal - minVal || 1;
  const padding = 4;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - padding - ((val - minVal) / range) * (height - padding * 2);
    return { x, y };
  });

  // Build a smooth cubic bezier path
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cp1x = prev.x + (curr.x - prev.x) / 3;
    const cp1y = prev.y;
    const cp2x = curr.x - (curr.x - prev.x) / 3;
    const cp2y = curr.y;
    d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
  }

  // Area path (closed)
  const areaD = d + ` L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

  return { linePath: d, areaPath: areaD, points };
}

export function MarketUpdateWidget() {
  const W = 200, H = 60;

  return (
    <div className="py-8 border-t border-gray-200 mt-4">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h2 className="text-xl font-black text-gray-900">Solar Market Update</h2>
        </div>
        <button className="text-[13px] font-bold text-primary hover:text-green-700 transition-colors flex items-center gap-1">
          View All Market Updates &rarr;
        </button>
      </div>

      <div className="flex overflow-x-auto snap-x snap-mandatory pb-4 gap-4 md:grid md:grid-cols-2 lg:grid-cols-4 md:overflow-x-visible md:pb-0 scrollbar-hide">
        {updates.map((item, idx) => {
          const { linePath, areaPath, points } = buildPath(item.data, W, H);
          const lastPoint = points[points.length - 1];

          return (
            <div key={idx} className="relative bg-[#0B1120] border border-white/10 rounded-2xl p-5 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group overflow-hidden w-[290px] md:w-auto shrink-0 snap-start">
              {/* Subtle glow */}
              <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 -translate-y-1/2 translate-x-1/2"
                style={{ background: item.lineColor }} />

              {/* Header row */}
              <div className="relative z-10 flex items-start justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl ${item.iconBg} border flex items-center justify-center`}>
                  {item.icon}
                </div>
                <div className={`flex items-center gap-0.5 text-xs font-black px-2 py-1 rounded-full ${item.isPositive ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                  {item.isPositive
                    ? <ArrowUpRight className="w-3 h-3" />
                    : <ArrowDownRight className="w-3 h-3" />}
                  {item.change}
                </div>
              </div>

              {/* Price info */}
              <div className="relative z-10 mb-4">
                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest mb-0.5">{item.title}</p>
                <p className="text-xl font-black text-white leading-none">{item.price}</p>
                <p className="text-[10px] text-white/30 mt-1">14-day trend</p>
              </div>

              {/* Real Sparkline Chart */}
              <div className="relative z-10 w-full" style={{ height: H }}>
                <svg
                  viewBox={`0 0 ${W} ${H}`}
                  className="w-full h-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id={`grad-${idx}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={item.lineColor} stopOpacity="0.5" />
                      <stop offset="100%" stopColor={item.lineColor} stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Grid lines */}
                  {[0.25, 0.5, 0.75].map((frac, i) => (
                    <line
                      key={i}
                      x1={0} y1={H * frac}
                      x2={W} y2={H * frac}
                      stroke="rgba(255,255,255,0.05)"
                      strokeWidth="1"
                    />
                  ))}

                  {/* Area fill */}
                  <path
                    d={areaPath}
                    fill={`url(#grad-${idx})`}
                  />

                  {/* Line */}
                  <path
                    d={linePath}
                    fill="none"
                    stroke={item.lineColor}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />

                  {/* Data dots — only at every other point, small */}
                  {points.filter((_, i) => i % 3 === 0).map((pt, i) => (
                    <circle
                      key={i}
                      cx={pt.x}
                      cy={pt.y}
                      r="2"
                      fill={item.lineColor}
                      opacity="0.6"
                    />
                  ))}

                  {/* Last point highlight dot */}
                  <circle
                    cx={lastPoint.x}
                    cy={lastPoint.y}
                    r="4"
                    fill={item.lineColor}
                    stroke="#0B1120"
                    strokeWidth="2"
                  />
                </svg>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
