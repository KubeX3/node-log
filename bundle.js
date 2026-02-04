import esbuild from 'esbuild';

esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.js',
  bundle: true,
  platform: 'node',
  format: 'esm',
  packages: 'external',
  target: ['ES2022'],
  sourcemap: false,
  minify: true,

}).then(() => {
  console.log('Bundled successfully');
  
}).catch((err) => {
  console.error(err);
  process.exit(1);
});