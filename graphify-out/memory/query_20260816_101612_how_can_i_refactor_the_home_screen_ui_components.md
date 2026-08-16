---
type: "explain"
date: "2026-08-16T10:16:12.413000+00:00"
question: "how can I refactor the Home Screen UI Components?"
contributor: "graphify"
source_nodes: ["ThemedView()", "ThemedText()", "useThemeColor()", "MerchantHome()", "ActivityListModal", "RecentActivity", "useMerchant()", "selectRecentActivity()"]
---

# Q: how can I refactor the Home Screen UI Components?

## Answer

Home Screen UI Components (community 0, cohesion 0.06) is a low-cohesion grab-bag, not one cohesive module. It bundles 4 distinct groups: (1) theming primitives ThemedView/ThemedText/useThemeColor/theme.ts - already top god-nodes used across every other community, (2) Expo template boilerplate collapsible.tsx/parallax-scroll-view.tsx/icon-symbol.tsx/haptic-tab.tsx, (3) the actual home screen feature - MerchantHome + ActivityListModal (well-built compound component) + RecentActivity, (4) data layer useMerchant()/selectRecentActivity that already cross-links to Merchant API Client & Tests and Mock Activity Data & API Types communities. Recommended split: extract theming primitives into a dedicated theme/design-system module; move Expo boilerplate into a shared ui-primitives layer; keep MerchantHome+ActivityListModal+RecentActivity together as the real home-screen feature slice; colocate useMerchant/selectRecentActivity with the API client/mock-data modules they already depend on to raise cohesion.

## Source Nodes

- ThemedView()
- ThemedText()
- useThemeColor()
- MerchantHome()
- ActivityListModal
- RecentActivity
- useMerchant()
- selectRecentActivity()