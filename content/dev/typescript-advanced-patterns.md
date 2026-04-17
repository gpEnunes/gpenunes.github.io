---
title: TypeScript patterns I wish I'd learned sooner
description: The three TypeScript techniques that changed how I write Vue and Laravel API code.
date: 2026-04-06
readTime: 5 min read
category: TypeScript
tags: [TypeScript, Vue, Architecture]
---

TypeScript has a reputation for being verbose. That reputation is usually earned by people writing TypeScript the wrong way.

## Discriminated unions for API responses

Instead of checking `if (response.error)` everywhere, model the success and failure states explicitly. The compiler tells you when you've missed a case.

## Generic composables in Vue

A typed `useFetch<T>` composable that knows what it returns is worth ten hours of runtime debugging. The investment is 20 lines of setup.

## Zod at the boundary

Validate every API response with Zod at the fetch layer. After that, everything inside your app is typed and trusted. No more `as any` escapes.

These three patterns alone eliminated 80% of the runtime errors in the last project I refactored.
