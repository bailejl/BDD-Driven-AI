# Process to Upgrade

This was an 5 year old app needing update before begin using AI on it for new development. This process is a good example of how to use Claude Code to update an out-of-date app. It is based on using AI as a partner and planner.

The process heavily asks AI for feedback and recommendations, which helps the engineer think about what to do next. Then work with AI to come up with a plan before unleashing it to upgrade the app.

## The Interaction with AI

- Set up `CLAUDE.md` with the init command
- Alter it to include `https://github.com/bdfinst/medium-download/blob/master/CLAUDE.md?plain=1` & modify it for this repo
- Have AI verify `CLAUDE.md`, ensure the repo is good based on the quality gate in the file and fix anything.

This creates the baseline for the process to be used by AI before upgrade.

- Have AI create a plan to upgrade.
  - Ask "Create UPGRADE_PLANS.md and put the remaining items needing upgrades. Also, create a plan for each to be upgrade, so an AI agent can do the work."
    - I asked it to create a plan to do the work in parallel, which it did. But interdependencies caused too many problem. So, it is skipped here.
  - Worked through the plan. had to stop it a few times to make minor corrections.
    - Unit tests were hanging, so had to tell AI not to let it run more than 20 seconds and to fix it if it fails.
- Once upgrade to Node and all the software is complete and all quality checks are passing, then commit and push

With the code and test upgraded to the latest, it is time to convert from WebDriver IO/Cucumber to Playwright/Playwright-BDD.

- Here are the prompts given to AI to make the change:
  - "Come up with a plan to move from WDIO to Playwright, while keeping Cucumber, feature files, step definitions and other support test code."
  - "I want all code written in TypeScript and not JavaScript. Update the e2e test code."
- There were various issues with the upgrade, Cucumber was causing issues, so I had to change to Playwright-BDD
  - "Let come up with a plan to use Playwright-BDD with Typescript, which will replace cucumber"
- Installed Playwright MCP, so AI could fix the tests automatically
- I had to make the Data Manager a Playwright fixture, so it would work with Playwright's parallel execution
- Then I asked AI to fix the remaining issues
  - "Can you fix the failing e2e tests, except the one tagged with \"BrokenScenario\"?"
- Commit and push the changes

With the bulk of the code and tests updated, time to ensure things are good.

- "Is there any unneeded code, config and other files from the migration and tech change? There seems to be some under features."
- "Review the project for anything needing removed liked unused files or empty folders."
- "You are a well-known code reviewer. You have a critical eye to find better ways to write code. take a look at this project and identify want should be changed and why."
  - Update the plan to make sure it take into account this is a demo proof of concept app, not a real prod system
- "Look at the CLaude.md file and compare it to the project. Highlight any issues and why."
- Refine Claude.md, as I go to ensure AI has the right guidelines
- "What eslint add-ons should we use based on the code in the project?"
  - "Do all of them, except eslint-plugin-jsx-a11y, as this is a training app."
  - Have AI fix the lint issues

At this point, the repo was removed from the fork chain and renamed. Shift focus on making the Concise Declarative Gherkin tests are good for AI to use.

- "Look at the feature files in `features` and navigate the website to identify things you do not understand between the two. For example, do you know the URL for the `personal information` section mentioned in this Gherkin Step (they navigate the \"personal information\" section of the form)? Put all your identified items in a markdown file in the `design` folder."
- "Right now, Employment and Citizenship are on the same page. Need to exist on their own pages. So, create a new page for Citizenship and put it between employment page and the Financial Information page. The Page will be of similar design to other pages, so it is just moving parts out of one into another page.  Also, update the url paths to be more descriptive. /user/form/page2 will become user/form/employment. /user/form/user3 will become /user/form/financial. Follow the pattern for the rest, expect leave /user/form/ as-is. "
  - Claude Code's content filtering policy had issues with some of the words in the files, which severed the connection.
    - I had Claude create the structure and I manually copied the code over to complete the work
- After the changes worked, I asked "Look at the feature files in `features` and navigate the website to identify things you do not understand between the two. For example, do you know the URL for the `personal information` section mentioned in this Gherkin Step (they navigate the \"personal information\" section of the form)? Update the file /Users/jlb/repos/BDD-Driven-AI/design/gherkin-implementation-gaps.md with your findings."

With the plan, I decided to add Mega Linter to give the AI more feedback and guardrails before continuing.

- After running it, I had it look at the logs
  - "Take a look at the file /Users/jlb/repos/BDD-Driven-AI/megalinter-reports/megalinter.log and come up with a plan to address the issues in the file. Put your plan in `tmp/megalinter-plan.md`."
- Setting up Mega Linter was a cycle of there are issues, configure the linter, fix issues, and repeat until it works
  - Some linters were disabled due to technical issues
- Make sure claude.md is correct, then commit and push

After adding Mega Linter, I added GitHub MCP. Now it is time to work on the Gherkin Implementation Gaps.

- "Review `tmp/gherkin-implementation-gaps.md` and compare it to the contents of features. Then update as needed."
- It picked up a bad practice, so I prompted and will add it to `./playwright-guidance.md` later, so AI will not do this again
  - "Modify any place you have `toHaveURL` in `features/step-definitions/login.playwright.steps.ts`, replace it with a check to see if the page is viewable. This \"viewable\" function will come from the page object, which will validate one or more page elements are visible."
- As AI progresses through `tmp/gherkin-implementation-gaps.md`. I ask AI to do the same review and update the same file.
  - "Take a look at the everything under `features` and this doc `design/bdd-and-gherkin-guidance.md`. Then highlight any issues, which would prevent you from implementing code and tests based on  a new feature file and other artifacts, as context. Put your thoughts in `tmp/gherkin-implementation-gaps.md`."
  - Then have AI do what it can until, I have to take action or it is acceptable

At this point, the code is good enough to begin the scenarios to see if BDD-driven AI will work.
