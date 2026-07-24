# Catalyst
### The Catalyst for Your Growth.

---

# Overview

Catalyst is a modern student productivity web application designed to help students organize their academic life in one place.

The project focuses on productivity, organization, consistency and motivation while maintaining an aesthetic SaaS-like interface.

This project is built completely using:

- HTML5
- CSS3
- Vanilla JavaScript

No frontend frameworks (React, Vue, Angular etc.)

Python may be used later only for AI or backend integration.

---

# Design Philosophy

Minimal.

Modern.

Professional.

Aesthetic.

Smooth animations.

Glassmorphism (used carefully).

Dark Theme First.

Responsive.

Accessible.

Fast.

---

# Tech Stack

Frontend

- HTML5
- CSS3
- Vanilla JavaScript

Future

- Python (AI features)
- Flask/FastAPI (if backend is needed)

---

# Folder Structure

```
Catalyst/

assets/

css/
│
├── pages/
│   ├── landing.css
│   ├── auth.css
│   ├── dashboard.css
│   ├── planner.css
│   ├── timer.css
│   ├── analytics.css
│   ├── notes.css
│   ├── leaderboard.css
│   ├── community.css
│   ├── profile.css
│   └── settings.css
│
├── variables.css
├── reset.css
├── base.css
├── layout.css
├── animations.css
├── utilities.css
├── components.css

js/

analytics.js
animations.js
app.js
auth.js
dashboard.js
navbar.js
notes.js
planner.js
profile.js
settings.js
theme.js
timer.js
utils.js

assets/

analytics.html
auth.html
community.html
dashboard.html
leaderboard.html
notes.html
planner.html
profile.html
settings.html
timer.html

PROJECT_ARCHITECTURE.md
Catalyst_Prototype_Overview.txt
```

---

# Assets Structure

```
assets/

avatars/
fonts/
icons/
illustrations/
images/
logos/
svg/
```

---

# Pages

## Landing

Purpose

Introduce Catalyst.

Contains

- Hero
- Features
- Screenshots
- Testimonials
- CTA
- Footer

---

## Authentication

Combined Login & Signup page.

Uses JavaScript to switch between login and signup instead of separate pages.

---

## Dashboard

Student overview.

Contains

- Welcome Card
- Daily Progress
- Today's Tasks
- Upcoming Exams
- XP
- Streak
- AI Suggestions
- Quick Actions

---

## Planner

Task management.

Contains

- Calendar
- Subject Planner
- Tasks
- Deadlines
- Priority Labels

---

## Timer

Pomodoro Timer.

Contains

- Focus Timer
- Short Break
- Long Break
- Session History

---

## Notes

Digital notebook.

Contains

- Subject Notes
- Search
- Categories
- Pin Notes

---

## Analytics

Productivity analytics.

Contains

- Charts
- Weekly Progress
- Monthly Progress
- Heatmap
- Study Hours
- Completion %

---

## Community

Future feature.

Contains

- Discussion
- Study Groups
- Resources
- Shared Notes

---

## Leaderboard

Gamification.

Contains

- XP Ranking
- Friends
- Weekly Rankings
- Monthly Rankings

---

## Profile

Contains

- Avatar
- Personal Information
- Achievements
- XP
- Statistics

---

## Settings

Contains

- Theme Switch
- Notifications
- Account
- Privacy
- Preferences

---

# CSS Architecture

variables.css

Contains

- Colors
- Typography
- Radius
- Shadows
- Gradients
- Spacing
- Transitions

---

reset.css

Browser reset.

---

base.css

Global styling.

- body
- headings
- paragraphs
- global defaults

---

layout.css

Contains ONLY layout utilities.

Examples

- container
- flex
- grid
- stack
- cluster
- gap
- width
- height
- positioning

No page-specific layouts.

---

animations.css

Contains

- Fade
- Slide
- Scale
- Float
- Pulse
- Spin
- Gradient
- Keyframes

---

utilities.css

Contains helper classes.

Examples

- hidden
- shadow
- rounded
- opacity
- cursor
- text helpers
- background helpers

---

components.css

Contains all reusable components.

Examples

- Buttons
- Cards
- Forms
- Inputs
- Navbar
- Sidebar
- Modal
- Dropdown
- Toast
- Tooltip
- Accordion
- Tabs
- Calendar
- Progress Bars
- AI Chat
- Notifications
- Achievement Cards
- XP Cards
- Leaderboard Cards

---

pages/

Contains page-specific styling only.

---

# Theme

Dark Theme is the default.

Light Theme is available through a switch.

Theme is controlled through CSS variables.

---

# Font

Primary Font

Plus Jakarta Sans

---

# Naming Convention

CSS

Use kebab-case.

Examples

```
hero-card

study-card

xp-progress

dashboard-grid
```

JavaScript

Use camelCase.

Examples

```
loadTheme()

toggleSidebar()

updateDashboard()
```

HTML

Use semantic tags whenever possible.

---

# Design Rules

Use CSS Variables.

Never hardcode colors.

Keep animations smooth.

Maintain consistent spacing.

Prefer reusable components.

No inline CSS.

No inline JavaScript.

---

# Color Palette

Primary

#6D5EF8

Primary Hover

#5B4AF3

Accent

#00D4FF

Background

#0B0F1A

Surface

#131A29

Surface Secondary

#1B2435

Surface Hover

#252F44

Text

#F8FAFC

Secondary Text

#CBD5E1

Muted Text

#94A3B8

Border

#2D3748

Success

#22C55E

Warning

#F59E0B

Danger

#EF4444

Info

#3B82F6

---

# Core Features

- Dashboard
- Planner
- Notes
- Pomodoro Timer
- Analytics
- Community
- Leaderboard
- Profile
- Settings
- Theme Switching
- Gamification
- AI Assistant (Future)

---

# Development Principles

Build reusable components.

Avoid duplicated code.

Write clean, readable HTML.

Keep JavaScript modular.

Design mobile-first where practical.

Focus on maintainability over shortcuts.

---

# Project Motto

The Catalyst for Your Growth.