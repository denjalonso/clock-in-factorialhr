# Clock in factorialhr

This is a Cypress "test" that allows you to quickly clock in every day in current month except on weends.

Steps:

1. clone this repo
2. `npm install`
3. Copy and rename "cypress.test.env.json" to "cypress.env.json" and fill it
4. Run `npm run cy:run` in headless mode or `npm run cy:open` in browser mode.
5. Watch it all run!

Woo!

## MacOs automator

[On login](https://github.com/denjalonso/dotfiles/tree/master/on-login) runs `npm run cy:run`:

1. Open Automator
2. Add `cd ~/code/to-clock-factorialhr && ~/n/bin/npm run cy:run` to run-on-login-script.app


