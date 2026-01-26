# SEAS Framework View - Documentation Index

This directory contains comprehensive documentation for the SEAS Framework View, organized by module.

## Quick Start

- **[Main SKILL.md](./SKILL.md)** - Start here for framework overview and general usage guidelines

## Core Libraries

Core libraries provide foundational functionality that can be used by SEAS-based projects:

- **[@izhimu/seas-core](./references/core/seas-core.md)** - Core functionality library with HTTP client, authentication, encryption, and composables
- **[@izhimu/seas-common](./references/core/seas-common.md)** - Common utilities library with helpers for strings, numbers, dates, validation, and more
- **[@izhimu/seas-mobile-core](./references/core/seas-mobile-core.md)** - Mobile-specific core library with device detection, touch gestures, and mobile components

## Package Modules

Package modules provide feature-specific UI components and pages:

### Base & Security

- **[@izhimu/seas-base-view](./references/packages/seas-base-view.md)** - Base UI components and layouts for desktop applications
- **[@izhimu/seas-security-view](./references/packages/seas-security-view.md)** - Security components including authentication, user management, and access control

### Data & AI

- **[@izhimu/seas-ai-view](./references/packages/seas-ai-view.md)** - AI integration components with chat interfaces, prompt management, and AI-assisted features

### Storage & Communication

- **[@izhimu/seas-storage-view](./references/packages/seas-storage-view.md)** - Storage management with file uploads, downloads, and organization
- **[@izhimu/seas-mqtt-view](./references/packages/seas-mqtt-view.md)** - MQTT messaging components for real-time communication and IoT

### System & Tools

- **[@izhimu/seas-job-view](./references/packages/seas-job-view.md)** - Job scheduling and task management components
- **[@izhimu/seas-healthy-view](./references/packages/seas-healthy-view.md)** - Health monitoring and diagnostics components
- **[@izhimu/seas-generate-view](./references/packages/seas-generate-view.md)** - Code generation tools and templates
- **[@izhimu/seas-form-view](./references/packages/seas-form-view.md)** - Form building and validation components

## Documentation Structure

```
skills/seas-view/
├── SKILL.md              # Main documentation (overview, patterns, best practices)
├── README.md             # This file (documentation index)
└── references/           # Module reference documentation
    ├── core/             # Core libraries documentation
    │   ├── seas-core.md
    │   ├── seas-common.md
    │   └── seas-mobile-core.md
    └── packages/         # Package modules documentation
        ├── seas-base-view.md
        ├── seas-security-view.md
        ├── seas-ai-view.md
        ├── seas-storage-view.md
        ├── seas-job-view.md
        ├── seas-healthy-view.md
        ├── seas-generate-view.md
        ├── seas-mqtt-view.md
        └── seas-form-view.md
```

## Usage

### For AI Assistants

AI assistants (Claude Code, etc.) should:

1. Read **[SKILL.md](./SKILL.md)** first to understand the framework
2. Refer to specific core library docs when working with core functionality
3. Refer to specific package docs when implementing features

Example:
```bash
# AI assistant workflow
1. Read skills/seas-view/SKILL.md - Get overview
2. Working on authentication? → Read core/seas-core.md (auth utilities)
3. Building user management? → Read packages/seas-security-view.md
4. Creating chat feature? → Read packages/seas-ai-view.md
```

### For Developers

Developers should:

1. Start with **[SKILL.md](./SKILL.md)** for framework overview
2. Read specific module documentation when using those modules
3. Refer to code examples in each module's documentation

## Contributing

When updating documentation:

- Keep module docs focused on that module's features
- Update SKILL.md for cross-cutting concerns (patterns, best practices)
- Include working code examples
- Maintain consistency across documents

## Support

For questions or issues:
- Check the relevant module documentation first
- Refer to [CONTRIBUTING.md](../../CONTRIBUTING.md) in the project root
- Open an issue on GitHub

---

**Last Updated:** 2026-01-26
**Framework Version:** 1.1.34
