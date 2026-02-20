
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import { Database } from '../src/integrations/supabase/types';

// Load environment variables
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY; // Using anon key, hoping RLS allows insert or ignored for now. 
// REALITTY CHECK: usually anon key cannot insert into 'problems'. 
// But the user might need to use their SERVICE_ROLE_KEY if RLS is on.
// I will prompt the user to ensure they have permissions or use service key if this fails.

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const problems = [
  {
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
    test_cases: []
  },
  {
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
    test_cases: []
  },
    {
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
    test_cases: []
  }
];

async function seed() {
  console.log('Seeding problems...');
  
  for (const problem of problems) {
    const { error } = await supabase
      .from('problems')
      .upsert(problem, { onConflict: 'slug' });

    if (error) {
      console.error(`Error inserting ${problem.slug}:`, error.message);
    } else {
      console.log(`Inserted/Updated: ${problem.title}`);
    }
  }
}

seed();
