## Overview
A fintech mobile app written in React Native, TypeScript and Expo.
The project uses a mock server. 
All the types required for server responses are available in `types/api.ts`.

## Tech stack
- Node 24
- React Native 0.81.5 with Expo 54, new architecture.
- Git
- Use `pnpm` as a package manager
- Programming languages: TypeScript, Swift, Kotlin
- iOS: no SPM, only Cocoapods
- Android: Gradle

## Environment
The Node version is in the `.nvmrc` file in the root of the folder.
To install, run the following command:

```bash
pnpm install
```

For iOS, you can use the `xcrun` and `xcodebuild` commands.
To simplify it, you can simply run the script `run-apps.sh`.
Only use the above if you require building a new scheme, run dedicated iOS tests, etc.

For Android, use `adb` for the emulator, and `./gradlew` for builds, or `./run-apps.sh --skip-ios`. 

You can find an `.env` file in the root of the project, containing the GitHub token for `gh`. This will allow you to push, pull, and manage GitHub ops.
Never commit secrets.

## Verify your work (feedback loop)
There are a few steps to verify your work.
1. `./verify.sh` full verification with checks and running the apps. Run this only when the feature or task if complete. Check your `PROGRESS.md` file and run when the task is DONE.
2. `./verify.sh --lint-only` (script runs lint + typecheck + test (skips apps))
Run -> Fix -> Commit -> Green
Run the script before every commit and fix any errors if any. Once green, continue
very commit must be passing green: lint, test, typecheck. 

When running the full verification script, make sure the builds are successful.
Fix any errors and rerun the `./verify.sh` script. 

## React Native software best practices
- Use React Compound components pattern for UI.
- Tests. Everything must have its own passing unit test file for each function. Cover happy and unhappy paths. Ignore edge cases unless you're told to write them.
- Soft software principles: `docs/software-principles.md`

## PROGRESS
Keep track of your progress in an `PROGRESS.md` file.
Leave a trail of what you have worked on in a TODO list.
Include work that is left as well. This will allow other agents to pick up the work.
Here is the criteria for updating the file above:
For all the task statuses, state concisely the reasoning of completion.
- DONE: when the feature or task is completed in code + `verify.sh` green.
- IN PROGRESS: feature or task has started by an agent. There will be a trail of this and the work completed so far. Every task will be broken down when it can be broken down into smaller, manageable pieces of work. Take a vertical slicing approach, where you work only on a specific layer, commit, then move on to the next layer. e.g. biometrics require creating an Expo module, iOS/Android code, TS layer, etc. Break this task down into micro tasks. iOS/Android code can be split into 2 tasks. TS layer could be 3 tasks, depending on architecture and codebase.
- BLOCKED: when there are missing API keys, network connection issues, or the task cannot be completed because it requires certain features, components, code, that do not exist. Make a note of what's missing, and create a description of what needs doing. When there is a failing build from running any script, mark as blocked.

## Tools
You are allowed to use:
- Environment scripts (./gradlew, adb, xcrun, xcodebuild)
- `pnpm`
- `git`
- Bash
- `./verify.sh`
- `rg`
- `gh` (requires a token)
- `npx`
