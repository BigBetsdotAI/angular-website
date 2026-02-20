import { Problem } from '@/lib/supabase';

// Helper to calculate reading time or other stats if needed, 
// for now just raw data matching the DB schema.

export const localProblems: Problem[] = [
  {
    id: 'local-1',
    title: 'System Design: URL Shortener',
    slug: 'system-design-url-shortener',
    difficulty: 'medium',
    category: 'software_engineering',
    description: `## Problem Description
Design a scalable URL shortening service like bit.ly or tinyurl.

### Requirements
1.  Given a long URL, return a unique short URL.
2.  When the short URL is accessed, redirect to the original long URL.
3.  Users should optionally be able to define a custom alias.
4.  Links should expire after a default timespan, but users can specify a longer expiration time.

### Traffic Estimates
-   Write: 100M URLs generated per month.
-   Read: 10B clicks per month.
-   Read/Write ratio: 100:1.

### Key Challenges
-   Handling high read traffic (100:1 ratio).
-   Generating unique, collision-free keys.
-   Handling redirects efficiently.
`,
    instructions: `### Instructions
1.  Define the database schema (SQL or NoSQL) to store mappings.
2.  Explain your algorithm for generating short keys (e.g., Base62 encoding, UUID, Key Generation Service).
3.  Discuss caching strategies (Redis/Memcached) to reduce database load.
4.  Write a Python class \`URLShortener\` with methods \`shorten(url, alias=None)\` and \`get_original_url(short_key)\`.
`,
    starter_code: `class URLShortener:
    def __init__(self):
        # Initialize your database/storage mock here
        self.url_map = {}

    def shorten(self, original_url: str, alias: str = None) -> str:
        """
        Generates a short key for the given URL.
        If alias is provided, uses it if available.
        Returns the short key (e.g., "abc1234").
        """
        # TODO: Implement logic
        pass

    def get_original_url(self, short_key: str) -> str:
        """
        Retrieves the original URL for the given short key.
        Returns None if key does not exist.
        """
        # TODO: Implement logic
        pass
`,
    evaluation_metric: 'functional_correctness',
    test_cases: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_daily: false,
    daily_date: null,
    dataset_url: null,
    target_threshold: null
  },
  {
    id: 'local-2',
    title: 'Implement LRU Cache',
    slug: 'lru-cache-implementation',
    difficulty: 'hard',
    category: 'software_engineering',
    description: `## Problem Description
Design and implement a data structure for a **Least Recently Used (LRU) Cache**. It should support the following operations:

-   \`get(key)\`: Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
-   \`put(key, value)\`: Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a \`capacity\`.

### Example
\`\`\`python
lru = LRUCache(2)
lru.put(1, 1)
lru.put(2, 2)
lru.get(1)    # returns 1
lru.put(3, 3) # evicts key 2
lru.get(2)    # returns -1 (not found)
lru.put(4, 4) # evicts key 1
lru.get(1)    # returns -1 (not found)
lru.get(3)    # returns 3
lru.get(4)    # returns 4
\`\`\`
`,
    instructions: `### Instructions
1.  Implement the \`LRUCache\` class.
2.  Both \`get\` and \`put\` must run in **O(1)** average time complexity.
3.  Use appropriate data structures (e.g., hash map + doubly linked list).
`,
    starter_code: `class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        # TODO: Initialize data structures

    def get(self, key: int) -> int:
        # TODO: Implement get O(1)
        return -1

    def put(self, key: int, value: int) -> None:
        # TODO: Implement put O(1)
        pass
`,
    evaluation_metric: 'correctness',
    test_cases: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_daily: false,
    daily_date: null,
    dataset_url: null,
    target_threshold: null
  },
  {
    id: 'local-3',
    title: 'Rate Limiter',
    slug: 'rate-limiter',
    difficulty: 'medium',
    category: 'software_engineering',
    description: `## Problem Description
Design a **Rate Limiter** that limits the number of requests a user can make to an API within a given time window.

### Requirements
-   Limit: 5 requests per 10 seconds.
-   If a request comes in and the limit is exceeded, return \`False\`.
-   If the request is allowed, return \`True\`.
`,
    instructions: `### Instructions
1.  Implement the \`RateLimiter\` class.
2.  You can use the sliding window log, token bucket, or fixed window counter algorithm.
3.  Assume this runs on a single machine for this exercise (though in real life it would be distributed).
`,
    starter_code: `import time

class RateLimiter:
    def __init__(self, limit: int, window_seconds: int):
        self.limit = limit
        self.window_seconds = window_seconds
        # TODO: Initialize storage

    def is_allowed(self, user_id: str) -> bool:
        """
        Returns True if request is allowed, False otherwise.
        """
        # TODO: Implement rate limiting logic
        return True
`,
    evaluation_metric: 'accuracy',
    test_cases: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_daily: false,
    daily_date: null,
    dataset_url: null,
    target_threshold: null
  },
  {
    id: 'local-4',
    title: 'Merge Intervals',
    slug: 'merge-intervals',
    difficulty: 'medium',
    category: 'software_engineering',
    description: `## Problem Description
Given an array of intervals where \`intervals[i] = [start_i, end_i]\`, merge all overlapping intervals, and return an array of the non-overlapping intervals that cover all the intervals in the input.

### Example 1
**Input:** \`intervals = [[1,3],[2,6],[8,10],[15,18]]\`
**Output:** \`[[1,6],[8,10],[15,18]]\`
**Explanation:** Since intervals [1,3] and [2,6] overlap, merge them into [1,6].

### Example 2
**Input:** \`intervals = [[1,4],[4,5]]\`
**Output:** \`[[1,5]]\`
**Explanation:** Intervals [1,4] and [4,5] are considered overlapping.
`,
    instructions: `### Instructions
1.  Sort the intervals by their start time.
2.  Iterate through the sorted intervals and merge them if they overlap.
3.  Return the merged list.
`,
    starter_code: `def merge(intervals: list[list[int]]) -> list[list[int]]:
    """
    Merges overlapping intervals.
    """
    # TODO: Implement logic
    pass
`,
    evaluation_metric: 'correctness',
    test_cases: [],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    is_daily: false,
    daily_date: null,
    dataset_url: null,
    target_threshold: null
  }
];
