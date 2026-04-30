import React, { useState } from "react";
import { Switch } from "react-native";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  return <Switch value={dark} onValueChange={() => setDark(!dark)} />;
}