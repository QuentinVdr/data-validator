import { runTests } from '../tests/test-runner';

async function main() {
    try {
        await runTests();
    } catch (error) {
        console.error('Error running tests:', error);
        process.exit(1);
    }
}

main();