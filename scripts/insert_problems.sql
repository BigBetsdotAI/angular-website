INSERT INTO problems (
        id,
        title,
        slug,
        description,
        category,
        difficulty,
        instructions,
        starter_code,
        evaluation_metric,
        created_at,
        updated_at
    )
VALUES (
        '101',
        'System Design: URL Shortener',
        'system-design-url-shortener',
        '## Problem Description\nDesign a scalable URL shortening service like bit.ly or tinyurl.\n\n### Requirements\n1.  Given a long URL, return a unique short URL.\n2.  When the short URL is accessed, redirect to the original long URL.\n3.  Users should optionally be able to define a custom alias.\n4.  Links should expire after a default timespan, but users can specify a longer expiration time.\n\n### Traffic Estimates\n-   Write: 100M URLs generated per month.\n-   Read: 10B clicks per month.\n-   Read/Write ratio: 100:1.\n\n### Key Challenges\n-   Handling high read traffic (100:1 ratio).\n-   Generating unique, collision-free keys.\n-   Handling redirects efficiently.',
        'software_engineering',
        'medium',
        '### Instructions\n1.  Define the database schema (SQL or NoSQL) to store mappings.\n2.  Explain your algorithm for generating short keys (e.g., Base62 encoding, UUID, Key Generation Service).\n3.  Discuss caching strategies (Redis/Memcached) to reduce database load.\n4.  Write a Python class `URLShortener` with methods `shorten(url, alias=None)` and `get_original_url(short_key)`.',
        'class URLShortener:\n    def __init__(self):\n        # Initialize your database/storage mock here\n        self.url_map = {}\n\n    def shorten(self, original_url: str, alias: str = None) -> str:\n        """\n        Generates a short key for the given URL.\n        If alias is provided, uses it if available.\n        Returns the short key (e.g., "abc1234").\n        """\n        # TODO: Implement logic\n        pass\n\n    def get_original_url(self, short_key: str) -> str:\n        """\n        Retrieves the original URL for the given short key.\n        Returns None if key does not exist.\n        """\n        # TODO: Implement logic\n        pass',
        'functional_correctness',
        NOW(),
        NOW()
    ),
    (
        '102',
        'Implement LRU Cache',
        'lru-cache-implementation',
        '## Problem Description\nDesign and implement a data structure for a **Least Recently Used (LRU) Cache**. It should support the following operations:\n\n-   `get(key)`: Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.\n-   `put(key, value)`: Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.\n\nThe cache is initialized with a `capacity`.\n\n### Example\n```python\nlru = LRUCache(2)\nlru.put(1, 1)\nlru.put(2, 2)\nlru.get(1)    # returns 1\nlru.put(3, 3) # evicts key 2\nlru.get(2)    # returns -1 (not found)\nlru.put(4, 4) # evicts key 1\nlru.get(1)    # returns -1 (not found)\nlru.get(3)    # returns 3\nlru.get(4)    # returns 4\n```',
        'software_engineering',
        'hard',
        '### Instructions\n1.  Implement the `LRUCache` class.\n2.  Both `get` and `put` must run in **O(1)** average time complexity.\n3.  Use appropriate data structures (e.g., hash map + doubly linked list).',
        'class LRUCache:\n    def __init__(self, capacity: int):\n        self.capacity = capacity\n        # TODO: Initialize data structures\n\n    def get(self, key: int) -> int:\n        # TODO: Implement get O(1)\n        return -1\n\n    def put(self, key: int, value: int) -> None:\n        # TODO: Implement put O(1)\n        pass',
        'correctness',
        NOW(),
        NOW()
    ),
    (
        '103',
        'Rate Limiter',
        'rate-limiter',
        '## Problem Description\nDesign a **Rate Limiter** that limits the number of requests a user can make to an API within a given time window.\n\n### Requirements\n-   Limit: 5 requests per 10 seconds.\n-   If a request comes in and the limit is exceeded, return `False`.\n-   If the request is allowed, return `True`.',
        'software_engineering',
        'medium',
        '### Instructions\n1.  Implement the `RateLimiter` class.\n2.  You can use the sliding window log, token bucket, or fixed window counter algorithm.\n3.  Assume this runs on a single machine for this exercise (though in real life it would be distributed).',
        'import time\n\nclass RateLimiter:\n    def __init__(self, limit: int, window_seconds: int):\n        self.limit = limit\n        self.window_seconds = window_seconds\n        # TODO: Initialize storage\n\n    def is_allowed(self, user_id: str) -> bool:\n        """\n        Returns True if request is allowed, False otherwise.\n        """\n        # TODO: Implement rate limiting logic\n        return True',
        'accuracy',
        NOW(),
        NOW()
    );