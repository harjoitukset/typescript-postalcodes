import { readFileSync } from 'fs';
import path from 'path';

// you can generate the path to the CSV with the `path` module and `__dirname` variable:
const csvFile = path.join(__dirname, '..', 'postalcodes.csv');

// file can be read into a string with the readFileSync function:
let fileContents = readFileSync(csvFile, 'utf-8');

// the string can be split into lines with `split`:
let lines: string[] = fileContents.trim().split('\n');

console.log('The first 5 lines read from CSV file:');
console.table(lines.slice(0, 5));

// you can access the arguments via `process.argv` variable:
let params: string[] = process.argv;

console.log('The contents of the `process.argv` array:');
console.table(params);
