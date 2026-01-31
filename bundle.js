const esbuild = require('esbuild');

esbuild.build({
  entryPoints: ['src/index.ts'], // Express main process entry
  outfile: 'dist/index.js',
  bundle: true,
  platform: 'node',
  external: [], // keep native deps external
  target: ['ES2023'],
  sourcemap: false,
  minify: true,

}).then(() => {
  console.log('Bundled successfully');

}).catch((err) => {
  console.error(err);
  process.exit(1);
});