"use client";

import React from "react";
import { DitherCursor, DitherCursorProps } from "@/components/interaction/DitherCursor";

/**
 * InteractiveBackground provides the unified background canvas layer,
 * powered by the custom DitherCursor interaction system.
 */
export function InteractiveBackground(props: DitherCursorProps) {
  return <DitherCursor {...props} />;
}
