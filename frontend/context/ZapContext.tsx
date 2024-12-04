"use client"

import { createContext } from "react";

export const ZapContext = createContext({
    availableTriggers: [],
    availableActions: [],
  });