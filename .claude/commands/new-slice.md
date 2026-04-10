Scaffold a new FSD slice. Follow these steps:

1. Ask the user which layer: `features`, `widgets`, or `shared`
2. Ask the user for the slice name (kebab-case)
3. Create the following structure under `src/{layer}/{slice-name}/`:
   - `ui/` directory (create a `.gitkeep` file inside)
   - `model/` directory (create a `.gitkeep` file inside)
   - `index.ts` with an empty comment: `// {slice-name} public API`
4. Confirm what was created

Rules to follow (from .claude/rules/fsd-architecture.md):

- Only import downward: app → widgets → features → shared
- Component files: PascalCase.tsx
- Hook files: use-kebab-case.ts
- Slice folder: kebab-case/
