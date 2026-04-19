---
title: Laravel Caching: From Memory Leaks to fast APIs
description: Practical caching patterns that ship faster than your uncached endpoints.
date: 2026-04-19
readTime: 10 min
category: Dev
tags: [Laravel, Caching, Performance, Redis]
---

Laravel gets called "slow" when people skip caching patterns that work. These strategies cut API response times from seconds to milliseconds.

## Cache::remember() > Cache::put()

```php
// ❌ Wrong: Manual expiration management
Cache::put('user-posts', $posts, now()->addHour());
$posts = Cache::get('user-posts');

// ✅ Right: Automatic refresh
$posts = Cache::remember("user.{$user->id}.posts", now()->addHour(), function () use ($user) {
    return $user->posts()->with('comments')->get();
});
```

**Why**: `remember()` guarantees fresh data on cache miss. No stale data bugs.

## Cache Tags for Related Data

```php
// Tag entire user data tree
Cache::tags(['user', "user:{$user->id}"])->rememberForever("user:{$user->id}:profile", function () use ($user) {
    return $user->load(['posts', 'posts.comments']);
});

// Invalidate everything when user updates
Cache::tags(['user', "user:{$user->id}"])->flush();
```

**Result**: One `flush()` clears profile + posts + comments. No hunting cache keys.

## Route/Model Caching That Survives Production

```php
// Route caching (CLI only)
Route::middleware('cache.headers:public;max_age=3600')->get('/api/posts', function () {
    return Cache::remember('public-posts', 3600, fn() => Post::published()->get();
});

// Model query caching
Post::published()
    ->remember(3600)
    ->orderBy('published_at')
    ->get();
```

## Redis JSON for Complex Objects

```php
// Store JSON directly (faster than serialization)
Cache::store('redis')->put('dashboard-stats', json_encode($stats), 1800);

// Driver-specific: Redis JSON commands
Redis::connection()->json()->set("user:{$user->id}", '$', $user->toArray());
Redis::connection()->json()->get("user:{$user->id}");
```

## The Production Checklist

```php
// .env
CACHE_STORE=redis
REDIS_CLIENT=phpredis
SESSION_DRIVER=redis

// config/cache.php
'tags' => [
    'redis' => [
        'driver' => 'redis',
        'connection' => 'cache',
    ],
],
```

**Cache smart. Ship fast.**
