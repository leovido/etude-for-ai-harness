# Graph Report - etude-for-ai-harness  (2026-08-16)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 273 nodes · 353 edges · 41 communities (15 shown, 26 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 3 edges (avg confidence: 0.6)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `7c288284`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 27
- Community 28
- Community 29
- Community 30
- Community 31
- Community 32
- Community 33
- Community 34
- Community 35
- Community 36
- Community 37
- Community 38

## God Nodes (most connected - your core abstractions)
1. `expo` - 14 edges
2. `scripts` - 10 edges
3. `run_platform()` - 8 edges
4. `ThemedView()` - 7 edges
5. `useThemeColor()` - 7 edges
6. `ThemedText()` - 6 edges
7. `expo-router` - 6 edges
8. `audit.sh script` - 6 edges
9. `run-apps.sh script` - 6 edges
10. `adaptiveIcon` - 5 edges

## Surprising Connections (you probably didn't know these)
- `TabLayout()` --indirect_call--> `HapticTab()`  [INFERRED]
  app/(tabs)/_layout.tsx → components/haptic-tab.tsx
- `ParallaxScrollView()` --calls--> `useThemeColor()`  [EXTRACTED]
  components/parallax-scroll-view.tsx → hooks/use-theme-color.ts
- `plugins` --extends--> `expo-router`  [EXTRACTED]
  app.json → package.json
- `run-apps.sh script` --calls--> `warn()`  [EXTRACTED]
  run-apps.sh → verify-common.sh
- `ThemedText()` --calls--> `useThemeColor()`  [EXTRACTED]
  components/themed-text.tsx → hooks/use-theme-color.ts

## Import Cycles
- None detected.

## Communities (41 total, 26 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.10
Nodes (21): styles, styles, TabLayout(), styles, HapticTab(), ParallaxScrollView(), Props, styles (+13 more)

### Community 1 - "Community 1"
Cohesion: 0.09
Nodes (29): API_BASE_URL, AVAILABLE_BALANCE_EUR, AVAILABLE_BALANCE_GBP, baseActivities, createPayout(), generateAllActivities(), generateMockActivity(), generateNewActivities() (+21 more)

### Community 2 - "Community 2"
Cohesion: 0.08
Nodes (22): reactCompiler, typedRoutes, expo, experiments, icon, ios, name, newArchEnabled (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-expo, jest, jest-expo, msw, devDependencies, eslint, eslint-config-expo (+13 more)

### Community 4 - "Community 4"
Cohesion: 0.20
Nodes (7): check_critical(), check_recommended(), fail(), header(), pass(), audit.sh script, warn()

### Community 5 - "Community 5"
Cohesion: 0.13
Nodes (14): main, name, private, scripts, android, ios, lint, reset-project (+6 more)

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (12): kill_tree(), run_platform(), scan_log_for_errors(), run-apps.sh script, wait_for_boot(), fail(), info(), ok() (+4 more)

### Community 7 - "Community 7"
Cohesion: 0.24
Nodes (5): RootLayout(), handlers, server, server, useMSW()

### Community 8 - "Community 8"
Cohesion: 0.18
Nodes (10): expo-env.d.ts, expo/tsconfig.base, .expo/types/**/*.ts, **/*.ts, **/*.tsx, compilerOptions, paths, strict (+2 more)

### Community 10 - "Community 10"
Cohesion: 0.22
Nodes (9): backgroundColor, backgroundImage, foregroundImage, monochromeImage, adaptiveIcon, edgeToEdgeEnabled, package, predictiveBackGestureEnabled (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.22
Nodes (9): expo-constants, dependencies, expo-constants, react, @react-native-async-storage/async-storage, react-native-screens, react, @react-native-async-storage/async-storage (+1 more)

## Knowledge Gaps
- **108 isolated node(s):** `Props`, `ThemedTextProps`, `ThemedViewProps`, `IconMapping`, `IconSymbolName` (+103 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **26 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `expo-router` connect `Community 2` to `Community 0`, `Community 7`?**
  _High betweenness centrality (0.428) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Community 11` to `Community 2`, `Community 5`, `Community 14`, `Community 15`, `Community 16`, `Community 17`, `Community 18`, `Community 19`, `Community 20`, `Community 21`, `Community 22`, `Community 23`, `Community 24`, `Community 25`, `Community 27`, `Community 28`, `Community 29`, `Community 30`, `Community 31`, `Community 32`, `Community 33`, `Community 34`, `Community 35`, `Community 36`, `Community 37`, `Community 38`?**
  _High betweenness centrality (0.418) - this node is a cross-community bridge._
- **Why does `expo-router` connect `Community 2` to `Community 11`?**
  _High betweenness centrality (0.323) - this node is a cross-community bridge._
- **What connects `Props`, `ThemedTextProps`, `ThemedViewProps` to the rest of the system?**
  _108 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09815078236130868 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.09411764705882353 - nodes in this community are weakly interconnected._
- **Should `Community 2` be split into smaller, more focused modules?**
  _Cohesion score 0.08 - nodes in this community are weakly interconnected._