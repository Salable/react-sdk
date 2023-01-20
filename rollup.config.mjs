import typescript from 'rollup-plugin-typescript2';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import cleaner from 'rollup-plugin-cleaner';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import json from 'rollup-plugin-json';
import dotenv from 'dotenv';
import packageJson from './package.json' assert { type: 'json' };

dotenv.config();

const config = {
  input: './packages/index.ts',
  output: [
    {
      file: packageJson.main,
      format: 'cjs',
      sourcemap: true,
    },
    {
      file: packageJson.module,
      format: 'esm',
      sourcemap: true,
    },
  ],
  external: ['react', 'react-dom'],
  plugins: [
    json(),
    peerDepsExternal(),
    cleaner({
      targets: ['./dist'],
    }),
    resolve({
      moduleDirectories: ['packages'],
    }),
    commonjs(),
    typescript({
      tsconfig: 'tsconfig.json',
    })
  ],
};

export default config;
