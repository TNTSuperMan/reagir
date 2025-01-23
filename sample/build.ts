import { build } from "bun";

build({
    entrypoints: ["./sample/sample.ts"],
    outdir: "./sample",
    minify: true,
    naming: "sample.js"
})