// Importing fs with promises
import fs from 'fs/promises';

// Reading file with promises
fs.readFile('./test.txt', 'utf8')
    .then((data) => console.log(data))
    .catch((err) => console.log(err));

// Reading file with async/await
const readFile = async () => {
    try {
        const data = await fs.readFile('./test.txt', 'utf8');
        console.log(data);
    } catch (error) {
        console.log(error);
    }
};

// Writing file with async/await
const writeFile = async () => {
    try {
        await fs.writeFile('./test.txt', 'Hello, I am writing to this file');
        console.log('File written to...');
    } catch (error) {
        console.log(error);
    }
};

// Invoking the functions
writeFile();
readFile();
