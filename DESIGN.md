---
name: Agentor
description: A calm cloud workspace for deploying capable AI agents.
colors:
  agent-blue: "#427ef6"
  agent-blue-deep: "#286de9"
  cloud-pale: "#eaf5fd"
  paper: "#f9f9f9"
  surface: "#ffffff"
  ink: "#111827"
  muted-ink: "#4b5563"
  hairline: "#eef3f8"
typography:
  display:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "72px"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "48px"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "-0.04em"
  title:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "24px"
    fontWeight: 600
    lineHeight: 1.35
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "-0.02em"
  label:
    fontFamily: "Urbanist, sans-serif"
    fontSize: "14px"
    fontWeight: 500
    lineHeight: 1.4
rounded:
  control: "14px"
  container: "16px"
  feature: "26px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "16px"
  md: "24px"
  lg: "48px"
components:
  button-primary:
    backgroundColor: "{colors.agent-blue}"
    textColor: "{colors.surface}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.control}"
    padding: "0 20px"
    height: "48px"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.container}"
    padding: "18px"
---

# Design System: Agentor

## Overview

**Creative North Star: "The Cloud Operations Console"**

Agentor feels like powerful infrastructure made unusually calm. A cool, nearly white field supports cloud-blue atmospheric panels, compact operational readouts, and generous editorial spacing. The system balances technical credibility with a friendly softness: controls feel precise, while broad radii and diffuse depth prevent the interface from becoming severe.

The visual system is intentionally low-noise. Blue marks agency and action; neutral surfaces hold dense product information; diagrams and live-status patterns provide the technical texture. Responsive layouts keep the same hierarchy while converting multi-column systems into a single vertical narrative.

**Key Characteristics:**

- Urbanist-led geometric typography with tight display tracking.
- Cool paper, white surfaces, and one high-confidence blue accent.
- Broad atmospheric fields paired with compact, believable operational UI.
- Diffuse ambient elevation and fine dotted textures.
- Sticky, stateful product demonstrations rather than decorative motion.

## Colors

The palette is cool, bright, and restrained: blue carries action while neutrals preserve clarity.

### Primary

- **Agent Blue:** The action color for primary buttons, active states, status graphics, and brand marks.
- **Agent Blue Deep:** The lower stop used to give primary controls quiet dimensionality.

### Neutral

- **Cool Paper:** The application field behind every section.
- **Clear Surface:** Cards, chips, the navigation shell, and operational panels.
- **Near-Black Ink:** Display headings and high-priority labels.
- **Slate Ink:** Supporting copy and secondary labels.
- **Cloud Hairline:** Dividers and low-contrast component borders.
- **Cloud Pale:** Soft blue panels, selected contexts, and diagram atmospheres.

**The Blue Means Agency Rule.** Reserve Agent Blue for brand identity, actions, active states, and live system signals; large reading surfaces remain neutral or pale.

## Typography

**Display Font:** Urbanist (with sans-serif fallback)  
**Body Font:** Urbanist (with sans-serif fallback)

**Character:** Urbanist supplies rounded geometric forms without losing technical clarity. Tight tracking gives large headings authority; body copy stays open and conversational.

### Hierarchy

- **Display** (600, 72px desktop / 48px mobile, 1.1): Hero statements only, constrained to a deliberate line break.
- **Headline** (600, 48px desktop / 36px mobile, 1.4): Section propositions and major transitions.
- **Title** (600, 24px, 1.35): Feature, process, and plan names.
- **Body** (400, 16–18px, 1.45–1.6): Product explanation, capped to readable centered or card-width measures.
- **Label** (500, 12–16px): Navigation, controls, chips, status, and compact metadata.

**The Tight-at-Scale Rule.** Use negative tracking on display and title roles; never simulate hierarchy with all-caps or arbitrary weight jumps.

## Layout

Desktop surfaces use a centered 1200px content shell with 24px page gutters. The hero, workflow demonstration, and closing panel expand beyond that shell to create chapter breaks. Feature and pricing grids use 18px gaps; card internals follow an 8/16/24px rhythm.

At 700px and below, navigation collapses to a 64px mobile bar, all grids become one column, and headline roles step down to 36px while the hero remains 48px. Wide operational interfaces intentionally clip inside their rounded stage rather than shrinking into illegibility.

**The Stage-and-Instrument Rule.** Broad atmospheric sections establish context; compact white instruments carry the product detail.

## Elevation & Depth

Depth is ambient rather than structural. White surfaces use low-opacity, long-blur shadows; the primary button adds a controlled blue glow and subtle inset highlight. Dotted fields and overlapping circular diagrams provide depth before stronger shadows are introduced.

### Shadow Vocabulary

- **Ambient Surface:** `0 8px 22px rgba(15,23,42,.035)` for navigation and quiet cards.
- **Operational Card:** `0 8px 20px rgba(15,23,42,.055)` for items inside demonstrations.
- **Agent Glow:** `0 2px 12px rgba(40,109,233,.45)` for the primary action.

**The Diffuse-Only Rule.** Shadows may lift or focus a surface, but never create hard offset edges.

## Shapes

Controls use gently curved 14px corners, compact surfaces use 15–16px, and large chapter panels use 24–28px. Pills are reserved for labels, status, toggles, and compact selection. Circular forms represent agents, integrations, and state nodes; borders remain hairline and low contrast.

## Components

### Buttons

- **Shape:** Compact rounded control (14px) with a 48px minimum height.
- **Primary:** White label on Agent Blue with a restrained blue glow.
- **Hover / Focus:** Lift 2px on hover; use a translucent blue 3px focus ring with 3px offset.
- **Secondary:** White surface, near-black text, and diffuse neutral depth.

### Chips

- **Style:** White pill, slate label, fine neutral border, and a small circular blue signal when semantic emphasis is needed.
- **State:** Selected segmented controls use a white surface over a cloud-pale track.

### Cards / Containers

- **Corner Style:** Compact cards use 14–16px; large stages use 24–28px.
- **Background:** White for information; cloud-pale or blue atmospheric fields for demonstrations.
- **Shadow Strategy:** Ambient and low opacity; dotted texture may establish depth without increasing shadow strength.
- **Border:** Hairline neutral borders only inside operational UI.
- **Internal Padding:** 18–24px for cards and 12–16px for compact rows.

### Navigation

The desktop navigation is a white three-zone shell: brand left, links centered, primary action right. It compacts after scroll. Mobile uses a flush 64px bar with the brand and a three-line menu control.

### Agent Demonstration

Agent demonstrations combine a pale atmospheric stage, white operational cards, live-status green, tiny dotted fields, and drawn SVG utility icons. The workflow chapter remains sticky while its numbered agent state changes with scroll progress.

## Do's and Don'ts

### Do:

- **Do** reserve the strongest blue for actions, active state, and agency.
- **Do** use Urbanist across product and marketing surfaces to keep one visual voice.
- **Do** pair broad atmospheric panels with precise white operational components.
- **Do** preserve readable UI scale and clip staged demos on narrow screens.

### Don't:

- **Don't** introduce warm cream grounds, dark slate themes, or unrelated accent hues.
- **Don't** use hard offset shadows, gradient text, or decorative side stripes.
- **Don't** substitute Unicode glyphs for interface icons; use consistent inline SVG geometry.
- **Don't** spread pill shapes to ordinary cards or large content containers.
