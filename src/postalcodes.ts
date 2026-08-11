// The `fs` module in Node.js provides an API for interacting with the file system:
import { readFileSync } from 'fs';

/*
 * Read the contents of the CSV file into a string:
 */
let fileContents: string = readFileSync('postalcodes.csv', 'utf-8').trim();


/*
 * Each postal code is on a separate line in the CSV file. We can split the contents of the
 * file into an array of lines using the `split` method:
 */
let lines: string[] = fileContents.split('\n');


/*
 * Next, we take (slice) the first 5 lines from the CSV file and log them to the console
 * using `console.table`. The `table` method is similar to `log`, but it has a nicer
 * formatting for arrays:
 */
console.log('The first 5 lines read from CSV file:');
console.table(lines.slice(0, 5));


/*
 * In Node.js, the command-line arguments are stored in the `process.argv` array. The first
 * two elements of the array are the paths to the Node.js executable and the script file
 * being run. The rest of the elements are the arguments passed to the script.
 *
 * Try to give some extra arguments when running the script, and you should see them in the
 * table output.
 */
let params: string[] = process.argv;

console.log('The contents of the `process.argv` array:');
console.table(params);
