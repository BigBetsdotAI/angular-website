import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Tag, Calendar, User, ArrowRight } from "lucide-react";
import { RevealOnScroll } from "@/components/RevealOnScroll";

const categories = [
  "All Posts",
  "Artificial Intelligence",
  "Cloud Computing",
  "SaaS",
  "Mobile Development",
  "Cybersecurity",
  "Development",
];

const blogPosts = [
  {
    id: 1,
    title: "The Future of AI in Software Development",
    excerpt:
      "Explore how artificial intelligence is transforming the way we build and deploy software applications.",
    category: "Artificial Intelligence",
    author: "John Smith",
    date: "Jan 10, 2026",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
  },
  {
    id: 2,
    title: "Cloud Migration Best Practices for Enterprises",
    excerpt:
      "A comprehensive guide to successfully migrating your enterprise infrastructure to the cloud.",
    category: "Cloud Computing",
    author: "Sarah Johnson",
    date: "Jan 8, 2026",
    featured: true,
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&h=400&fit=crop",
  },
  {
    id: 3,
    title: "Building Scalable SaaS Applications",
    excerpt:
      "Learn the key principles and architectures for building software-as-a-service products that scale.",
    category: "SaaS",
    author: "Mike Chen",
    date: "Jan 5, 2026",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
  },
  {
    id: 4,
    title: "Mobile App Development Trends in 2026",
    excerpt:
      "Discover the latest trends shaping the future of mobile application development.",
    category: "Mobile Development",
    author: "Emily Davis",
    date: "Jan 3, 2026",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600&h=400&fit=crop",
  },
  {
    id: 5,
    title: "Cybersecurity Essentials for Startups",
    excerpt:
      "Protect your startup from cyber threats with these essential security practices.",
    category: "Cybersecurity",
    author: "Alex Thompson",
    date: "Dec 28, 2025",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&h=400&fit=crop",
  },
  {
    id: 6,
    title: "Modern JavaScript Frameworks Comparison",
    excerpt:
      "An in-depth comparison of React, Vue, and Angular for your next web project.",
    category: "Development",
    author: "Chris Wilson",
    date: "Dec 25, 2025",
    featured: false,
    image:
      "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
  },
];

const Blog = () => {
  const [activeCategory, setActiveCategory] = useState("All Posts");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory =
      activeCategory === "All Posts" || post.category === activeCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredPosts = filteredPosts.filter((post) => post.featured);
  const regularPosts = filteredPosts.filter((post) => !post.featured);

  return (
    <div className="min-h-screen bg-background">
      <Navbar alwaysOpaque />

      {/* Hero Section */}
      {/* Hero Section */}
      <RevealOnScroll>
        <section className="bg-gradient-to-r from-primary via-primary to-blue-600 dark:from-blue-900 dark:via-blue-800 dark:to-blue-950 py-20 md:py-28">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Tech Insights & Trends
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Stay ahead with the latest in technology, development practices,
              and industry insights
            </p>
          </div>
        </section>
      </RevealOnScroll>

      {/* Filter Section */}
      <RevealOnScroll>
        <section className="py-8 bg-white dark:bg-card border-t-4 border-t-primary border-b border-b-gray-200 dark:border-b-gray-700">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-10 w-40 bg-white dark:bg-background border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                />
              </div>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={activeCategory === category ? "default" : "outline"}
                  className={`flex items-center gap-2 ${
                    activeCategory === category
                      ? "bg-primary text-white"
                      : "bg-white dark:bg-background border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                  onClick={() => setActiveCategory(category)}
                >
                  <Tag className="w-4 h-4" />
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </section>
      </RevealOnScroll>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <RevealOnScroll>
          <section className="py-16 bg-gray-50 dark:bg-muted/10">
            <div className="container mx-auto px-4">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Featured <span className="text-primary">Articles</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mt-3">
                  Our most popular and insightful articles
                </p>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {featuredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group border border-transparent dark:border-border"
                  >
                    <div className="relative overflow-hidden">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-4 left-4 bg-primary text-white text-sm font-medium px-4 py-1 rounded-md">
                        Featured
                      </span>
                    </div>
                    <div className="p-6">
                      <span className="text-sm text-primary font-medium">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {post.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {post.date}
                          </span>
                        </div>
                        <Button
                          variant="ghost"
                          className="text-primary hover:text-primary/80 p-0"
                        >
                          Read More <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </RevealOnScroll>
      )}

      {/* All Articles */}
      <RevealOnScroll>
        <section className="py-16 bg-white dark:bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                Latest <span className="text-primary">Articles</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mt-3">
                Explore our collection of tech articles and tutorials
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white dark:bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 group border border-transparent dark:border-border"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <span className="text-sm text-primary font-medium">
                      {post.category}
                    </span>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mt-2 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary/80 p-0 text-sm"
                      >
                        Read More <ArrowRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </RevealOnScroll>

      <Footer />
    </div>
  );
};

export default Blog;
