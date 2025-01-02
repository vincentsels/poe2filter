const { execSync } = require('child_process');
const { resolve } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const filePath = resolve(__dirname, 'src/buildnumber.ts');
const fileContent = readFileSync(filePath, 'utf-8');
const buildNumberMatch = fileContent.match(/export const buildNumber = (\d+);/);

if (buildNumberMatch) {
  const currentBuildNumber = parseInt(buildNumberMatch[1], 10);
  const newBuildNumber = currentBuildNumber + 1;
  const newFileContent = `export const buildNumber = ${newBuildNumber};\n`;
  writeFileSync(filePath, newFileContent, 'utf-8');
  console.log(`Build number updated to ${newBuildNumber}`);

  execSync('git add src/buildnumber.ts');
  execSync(`git commit -m "Increment build number to ${newBuildNumber}"`);
  execSync(`git tag build-${newBuildNumber}`);
  execSync(`git push origin --tags`);
  console.log(`Git commit and tag created for build number ${newBuildNumber}`);
} else {
  console.error('Build number not found in buildnumber.ts');
}
