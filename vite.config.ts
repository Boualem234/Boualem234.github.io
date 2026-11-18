import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Site utilisateur GitHub Pages (boualem234.github.io) : servi à la racine.
export default defineConfig({
  plugins: [react()],
  base: "/",
  build: {
    rolldownOptions: {
      output: {
        // Dépendances dans des fichiers séparés : mises en cache d'un déploiement à l'autre.
        codeSplitting: {
          groups: [
            { name: "react", test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/, priority: 2 },
            { name: "motion", test: /node_modules[\\/](motion|motion-dom|motion-utils|framer-motion|lenis)[\\/]/, priority: 1 },
          ],
        },
      },
    },
  },
});
