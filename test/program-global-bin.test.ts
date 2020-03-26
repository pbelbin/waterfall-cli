/* eslint-env jest */

// Dependencies
const runProgram = require('./run-program');
const path = require('path');
const { exec } = require('child_process');

// Link this program
beforeAll(() => {
	return new Promise((resolve, reject) => {
		const programPath = path.join(__dirname, 'programs', 'global-bin');

		exec(`yarn --cwd "${programPath}" link`, (error) => {
			if (error) {
				reject();
				return;
			}

			resolve();
		});
	});
}, 20000);

// Tests
describe('Built-in abilities', () => {
	test('Displays version', () => {
		return runProgram('global-bin --version').then(({ stdout }) => {
			expect(stdout).toContain('global-bin: 1.2.3');
		});
	});
});

// Uninstall this program
afterAll(() => {
	return new Promise((resolve, reject) => {
		const programPath = path.join(__dirname, 'programs', 'global-bin');

		exec(`yarn --cwd "${programPath}" unlink`, (error) => {
			if (error) {
				reject();
				return;
			}

			resolve();
		});
	});
}, 20000);
