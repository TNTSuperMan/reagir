import { build } from "bun";

const b = (format: "esm" | "cjs" | "iife") => build({
    entrypoints: ["./src/index.ts"],
    format,
    minify: true,
    outdir: "dist",
    naming: `reagir.${format}.js`
})
b("esm")
b("cjs")