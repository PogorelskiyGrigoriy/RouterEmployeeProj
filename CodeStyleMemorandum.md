📜 Smart Code & UI Memorandum (Flat Architecture)
Objective: Ensure code maintainability, strict typing, and global accessibility (i18n/RTL) within the Chakra UI 3 ecosystem.

🛠 1. Engineering & Clean Code (Logic)
1.1. Component Structure
Definition: Use arrow functions only: export const ComponentName = ({ ...Props }) => { ... }.

Exports: Named Exports only. Strictly no export default.

Hoisting Prevention: Move static data (schemas, default values, constants) outside the component body.

Props: Define interface Props at the top of the file. Use destructuring in function arguments.

1.2. Naming & Logic
Events: Use on[Event] for props (callbacks) and handle[Event] for internal implementations.

Early Return: Handle errors/loading/null states first: if (!data) return <NullComponent />.

Simplicity (KISS): Prioritize readability over complex abstractions.

Barrel Exports: Use index.ts in module folders as the only public API (entry point).

1.3. Standardized Imports (Order)
External: react, react-router, lucide-react, etc.

UI Layer: @chakra-ui/react, @/components/ui.

Project Components: @/components/....

Business Logic: hooks, store, services.

Data & Utils: @/models, @/config, @/utils.

🎨 2. UI, Responsive & Localization (Chakra UI 3)
2.1. Responsive Design (Mobile-First)
Syntax: Always use object syntax for responsive props: width={{ base: "full", md: "container.xl" }}.

Containerization: Wrap page content strictly within <Container maxW="6xl">.

Zero Inline Styles: No style={{...}}. Use Chakra system props only (mt, p, bg).

2.2. Semantic Theming & Tokens
Tokens: Hardcoded colors (e.g., gray.200) are forbidden.

Standard Tokens: Use fg.emphasized (text), bg.panel (surface), border.subtle (borders), bg.canvas (page background).

Grid Consistency: Use Chakra spacing tokens only (gap="4", p="6").

2.3. Internationalization (i18n) & RTL Support
Logical Properties: Physical directions (Left/Right) are strictly forbidden.

ml/mr ➔ ms/me (margin-start/end).

pl/pr ➔ ps/pe (padding-start/end).

borderLeft ➔ borderStart.

textAlign="left" ➔ textAlign="start".

Layout: UI must work seamlessly in both LTR (EN, RU) and RTL (HE).

Flexibility: Avoid fixed width for text elements; use px padding and minW to accommodate translation length variances.

Instruction for AI Agent: Strictly adhere to these rules when generating or analyzing code. If a proposed solution violates the memorandum (e.g., uses ml instead of ms), proactively correct it before outputting.