## Why

The SEAS framework currently lacks comprehensive AI assistant documentation (Agent SKILLS) to guide Claude Code and other AI agents in effectively using the framework. This creates a gap where AI assistants cannot provide optimal support for developers working with SEAS, limiting productivity and increasing the learning curve for new developers adopting the framework.

## What Changes

- Create a new `seas-view` skill documentation in `skills/seas-view/` following Agent SKILLS specification format
- Document the SEAS framework architecture, including:
  - **Core libraries** (`core/`): Reusable core libraries that can be depended upon by projects using the SEAS framework
  - **Package modules** (`packages/`): Feature-specific modules containing UI pages and components, also available as dependencies
- Provide comprehensive usage guidelines for framework features
- Document development standards and best practices
- Include examples of common development tasks and patterns

## Capabilities

### New Capabilities
- `seas-view-skill`: Comprehensive skill documentation covering SEAS framework usage, architecture (core and packages structure), features, and development standards

### Modified Capabilities
- None (this is new documentation, no existing spec changes)

## Impact

- **New Documentation**: `skills/seas-view/SKILL.md` file following Agent SKILLS frontmatter format
- **AI Assistant Integration**: Enables Claude Code and other AI agents to understand and assist with SEAS framework development
- **Developer Experience**: Improves onboarding and productivity for developers using AI assistants with SEAS
- **No Code Changes**: Documentation-only change, no impact on existing codebase functionality
