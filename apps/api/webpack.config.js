const { join } = require('path');
const { readFileSync } = require('fs');
const GeneratePackageJsonPlugin = require('generate-package-json-webpack-plugin');

const rootPackageJsonPath = join(process.cwd(), 'package.json');
const rootPackageJson = JSON.parse(
  readFileSync(rootPackageJsonPath, {
    encoding: 'utf-8',
  }),
);
const packageJson = JSON.parse(
  readFileSync(join(__dirname, 'package.json'), {
    encoding: 'utf-8',
  }),
);

module.exports = config => {
  packageJson.main = `./${config.output.filename}`;
  packageJson.license = rootPackageJson.license;
  packageJson.author = rootPackageJson.author;
  packageJson.version = rootPackageJson.version;

  const generatePackageJsonPlugin = new GeneratePackageJsonPlugin(
    packageJson,
    rootPackageJsonPath,
  );

  config.plugins.push(generatePackageJsonPlugin);

  return config;
};
