import React from "react";
import { TruthfulMetric } from "@/types/developer";
import { Badge } from "@/components/ui/Badge";

interface MetricCardProps {
  metric: TruthfulMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="p-4 rounded-lg bg-[#0e1422]/70 workbench-border workbench-border-hover transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
          {metric.label}
        </span>
        {metric.badge && (
          <Badge variant="outline" size="sm">
            {metric.badge}
          </Badge>
        )}
      </div>

      <div className="text-base font-semibold text-white tracking-tight font-mono mb-1">
        {metric.value}
      </div>

      <p className="text-xs text-slate-400 font-sans leading-relaxed">
        {metric.detail}
      </p>
    </div>
  );
}
