const fs = require('fs');
const js = fs.readFileSync('index-bundle.js', 'utf8');

// Let's locate where da, Yo, Jo, Zo are defined
const names = ['da', 'Yo', 'Jo', 'Zo', 'OL', 'yL', 'vL', 'CL', '_L', 'DL', 'jL', 'FL', 'LL', 'gL', 'wL', 'iR', 'ts', 'ns', 'wp', 'An'];
names.forEach(name => {
  // Find "const name =" or "var name =" or "function name("
  const regex = new RegExp(`(?:const|var|let|function)\\s+${name}\\b[ =\\(]`, 'g');
  let match;
  while ((match = regex.exec(js)) !== null) {
    console.log(`\n=================== ${name} ===================`);
    console.log(js.slice(match.index, match.index + 1200));
  }
});
