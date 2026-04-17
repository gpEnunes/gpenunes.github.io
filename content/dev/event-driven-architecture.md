---
title: What I learned building an Event-Driven system in Laravel
description: After building LeadFlow on EDA principles, here's what I wish I had known from the start.
date: 2026-04-10
readTime: 6 min read
tags: [Laravel, PHP, Architecture, EDA]
---

Event-Driven Architecture sounds intimidating until you realise you've been doing a version of it all along with model observers and jobs. The difference is intent and structure.

## The core idea

Instead of services calling each other directly, they emit events. Other services react. The emitter doesn't care who's listening — this is the key insight.

## What worked well in Laravel

- **Queued listeners** kept the API response times under 50ms
- **Atomic locks** on scoring rules prevented race conditions under load
- **Append-only events table** gave us a perfect audit trail for free

## What I'd do differently

Design your event schema before writing a single line of code. Once events are in production, changing their shape is painful.
