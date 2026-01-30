## Context

The SEAS Framework View is a monorepo-based Vue 3 frontend framework with modular architecture. Currently, there is no standardized documentation for AI assistants (like Claude Code) to understand and effectively work with the framework.

**Current State:**
- Framework exists in monorepo structure with `core/` and `packages/` directories
- Some documentation exists (README.md, CONTRIBUTING.md) but not AI-assistant optimized
- No Agent SKILLS specification file exists
- AI assistants lack context about framework architecture, conventions, and best practices

**Constraints:**
- Must follow Agent SKILLS specification format with YAML frontmatter
- Documentation should be self-contained and comprehensive
- No code changes allowed - documentation-only change
- Must align with existing development standards documented in CONTRIBUTING.md

**Stakeholders:**
- AI assistants (Claude Code, etc.) that help developers work with SEAS
- Developers using AI assistants for SEAS framework development
- Framework maintainers who need to keep documentation synchronized

## Goals / Non-Goals

**Goals:**
- Create a comprehensive Agent SKILLS documentation file that AI assistants can use to understand SEAS framework
- Document framework architecture (core libraries vs package modules) clearly
- Provide concrete examples and patterns for common development tasks
- Enable AI assistants to generate code that follows SEAS conventions
- Reduce learning curve for developers using AI assistants with SEAS

**Non-Goals:**
- Modifying existing framework code or architecture
- Creating new automated tooling or scripts
- Documenting internal implementation details of components (only usage patterns)
- Replacing existing developer-facing documentation (README.md, CONTRIBUTING.md)
- Creating tutorial content (this is reference documentation for AI agents)

## Decisions

### Decision 1: Use Agent SKILLS specification format
**Rationale:** The Agent SKILLS format (with YAML frontmatter) is the emerging standard for AI assistant documentation. It provides structured metadata that AI agents can parse and understand efficiently.

**Alternatives considered:**
- Markdown without frontmatter - Less structured, harder for AI agents to parse
- JSON/YAML only - Less human-readable for developers who want to review
- Custom schema - Would require custom parsing logic

### Decision 2: Single comprehensive SKILL.md file
**Rationale:** A single file is easier to maintain and ensures consistency. AI agents can load one file to get complete context about SEAS framework.

**Alternatives considered:**
- Multiple files per topic - More modular but harder to keep synchronized
- Separate architecture vs usage docs - Would create artificial separation

### Decision 3: Structure documentation by capability areas
**Rationale:** Organizing by capabilities (architecture, tech stack, workflows, etc.) aligns with how AI agents think and how developers work. This structure mirrors the spec requirements.

**Alternatives considered:**
- Alphabetical reference - Harder to follow for workflows
- Quick start vs reference - Doesn't match how AI agents query information

### Decision 4: Include concrete code examples
**Rationale:** AI agents learn from patterns. Examples showing proper TypeScript interfaces, Vue component structure, and Pinia store usage help agents generate correct code.

**Alternatives considered:**
- Pure documentation without examples - Less actionable for AI agents
- Links to external docs - Would require AI agents to fetch multiple files

### Decision 5: Document both desktop and mobile patterns
**Rationale:** SEAS supports both desktop (Naive UI) and mobile (Vant) components. AI assistants need to understand both to avoid generating incompatible code.

**Alternatives considered:**
- Desktop only - Would break mobile workflows
- Separate skills - Would create fragmentation and inconsistency

### Decision 6: Emphasize dependency and workspace patterns
**Rationale:** The monorepo structure with workspace dependencies (`workspace:*`) is critical for AI agents to understand. Misunderstanding this leads to incorrect import statements and dependency issues.

**Alternatives considered:**
- Generic dependency documentation - Would miss workspace-specific patterns
- Assume agents understand pnpm workspaces - Not all AI agents have this context

## Risks / Trade-offs

### Risk: Documentation drift from actual implementation
**Mitigation:** The SKILL.md should focus on stable patterns and conventions rather than implementation details that change frequently. Use general examples that remain valid across versions.

### Risk: Information overload reducing effectiveness
**Mitigation:** Structure documentation with clear sections and use descriptive headers. AI agents can query specific sections without loading entire file. Use WHEN/THEN scenarios for clarity.

### Risk: AI agents misapplying patterns to wrong context
**Mitigation:** Include clear guidance on when to use specific patterns. Distinguish between core library usage and package module usage explicitly.

### Trade-off: Comprehensive vs concise documentation
**Decision:** Lean toward comprehensive with clear structure. AI agents can parse large files efficiently; completeness is more important than brevity for reference material.

### Trade-off: Examples for all scenarios vs representative examples
**Decision:** Provide representative examples that cover key patterns rather than exhaustive examples for every possible scenario. This keeps documentation maintainable while still useful.

## Migration Plan

This is a new documentation file with no migration required.

**Deployment steps:**
1. Create `skills/seas-view/` directory (if not exists)
2. Write `SKILL.md` file with all sections
3. Validate YAML frontmatter is properly formatted
4. Test by having AI agent read and parse the file
5. Commit and version with the framework

**Rollback strategy:**
- Simply delete the `skills/seas-view/SKILL.md` file if issues arise
- No code changes mean rollback is risk-free

## Open Questions

1. **Should the SKILL.md include version-specific information?**
   - **Resolution:** Document current stable patterns. Avoid version-specific details that change frequently. Reference package.json versions as examples but note these are current versions.

2. **How should updates to the SKILL.md be managed?**
   - **Resolution:** Include in CHANGELOG when framework patterns change significantly. Treat as part of framework API documentation.

3. **Should we include troubleshooting scenarios?**
   - **Resolution:** Yes, as specified in the requirements. Include common issues and their solutions to help AI agents assist with debugging.

4. **Should the skill document internal framework APIs or just usage patterns?**
   - **Resolution:** Focus on usage patterns and developer-facing APIs. Internal implementation details are out of scope and create maintenance burden.

5. **How to handle differences between packages?**
   - **Resolution:** Document common patterns shared across packages. Note package-specific variations where they exist, but emphasize consistency.
