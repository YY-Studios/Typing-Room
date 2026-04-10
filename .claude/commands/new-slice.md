Scaffold a new FSD slice. Follow the dev-craft project's actual conventions:

**Step 1** — Ask the user:

1. Which layer? (`features`, `widgets`, or `shared`)
2. Slice name? (kebab-case)
3. What does this slice do? (brief description to decide structure)

**Step 2** — Choose structure based on complexity:

Simple (single component or hook):

```
src/{layer}/{slice-name}/
└── ComponentName.tsx   ← directly at root, no subfolders
```

Medium (a few related files):

```
src/{layer}/{slice-name}/
├── ComponentName.tsx
└── hooks/
    └── useSliceName.ts
```

Full (complex feature with types):

```
src/{layer}/{slice-name}/
├── ui/
│   └── ComponentName.tsx
├── hooks/
│   └── useSliceName.ts
└── model/
    └── types.ts
```

**Rules:**

- Do NOT create `index.ts` barrel exports in features/ or widgets/ slices
- Only add `model/` if there are actual TypeScript types to define
- Only add `ui/` subfolder if there are multiple components
- Only import downward: app → widgets → features → shared
- Component files: PascalCase.tsx, hooks: use-kebab-case.ts

**Step 3** — Create only the files that are actually needed for the chosen structure. Do not create empty placeholder files.
