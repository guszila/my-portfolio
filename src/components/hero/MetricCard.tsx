import React from "react";
import { TruthfulMetric } from "@/types/developer";

interface MetricCardProps {
  metric: TruthfulMetric;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="py-4 px-1 border-t border-border/80 flex flex-col justify-between">
      <div className="flex items-baseline justify-between mb-2">
        <span className="text-[10px] font-mono text-muted/70 tracking-widest uppercase">
          {metric.label}
        </span>
        {metric.badge && (
          <span className="text-[9px] font-mono text-accent tracking-widest uppercase">
            [{metric.badge}]
          </span>
        )}
      </div>

      <div className="text-sm sm:text-base font-mono font-medium text-foreground tracking-tight mb-1.5">
        {metric.value}
      </div>

      <p className="text-xs text-muted font-sans leading-relaxed">
        {metric.detail}
      </p>
    </div>
  );
}
