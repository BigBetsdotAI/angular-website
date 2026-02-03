import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { ProblemCard } from '@/components/problems/ProblemCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { supabase, type Problem } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

type FilterState = {
  difficulty: string[];
  category: string[];
};

const difficulties = ['easy', 'medium', 'hard'];
const categories = [
  { value: 'ai_engineering', label: 'AI Engineering' },
  { value: 'data_science', label: 'Data Science' },
  { value: 'software_engineering', label: 'Software Engineering' },
];

export default function ProblemsPage() {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<FilterState>({
    difficulty: [],
    category: [],
  });
  const [solvedProblems, setSolvedProblems] = useState<Set<string>>(new Set());
  
  const { user } = useAuth();

  useEffect(() => {
    fetchProblems();
    if (user) {
      fetchProgress();
    }
  }, [user]);

  const fetchProblems = async () => {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .order('created_at', { ascending: true });

    if (!error && data) {
      setProblems(data as Problem[]);
    }
    setLoading(false);
  };

  const fetchProgress = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('user_problem_progress')
      .select('problem_id')
      .eq('user_id', user.id)
      .eq('solved', true);

    if (!error && data) {
      setSolvedProblems(new Set(data.map(p => p.problem_id)));
    }
  };

  const toggleFilter = (type: 'difficulty' | 'category', value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: prev[type].includes(value)
        ? prev[type].filter(v => v !== value)
        : [...prev[type], value],
    }));
  };

  const clearFilters = () => {
    setFilters({ difficulty: [], category: [] });
    setSearch('');
  };

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(search.toLowerCase()) ||
      problem.description.toLowerCase().includes(search.toLowerCase());
    
    const matchesDifficulty = filters.difficulty.length === 0 || 
      filters.difficulty.includes(problem.difficulty);
    
    const matchesCategory = filters.category.length === 0 || 
      filters.category.includes(problem.category);

    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const hasActiveFilters = filters.difficulty.length > 0 || filters.category.length > 0 || search.length > 0;

  return (
    <MainLayout>
      <div className="p-8 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">Problems</h1>
          <p className="text-muted-foreground">
            Practice AI Engineering and Data Science challenges
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4 mb-8"
        >
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search problems..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 bg-card border-border"
            />
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Difficulty:</span>
              {difficulties.map((diff) => (
                <Button
                  key={diff}
                  variant={filters.difficulty.includes(diff) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('difficulty', diff)}
                  className={filters.difficulty.includes(diff) 
                    ? "bg-primary text-primary-foreground" 
                    : "border-border hover:bg-card"}
                >
                  {diff.charAt(0).toUpperCase() + diff.slice(1)}
                </Button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Category:</span>
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={filters.category.includes(cat.value) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleFilter('category', cat.value)}
                  className={filters.category.includes(cat.value) 
                    ? "bg-primary text-primary-foreground" 
                    : "border-border hover:bg-card"}
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </motion.div>

        {/* Results count */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-sm text-muted-foreground">
            {filteredProblems.length} problem{filteredProblems.length !== 1 ? 's' : ''} found
          </span>
        </motion.div>

        {/* Problems list */}
        {loading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-32 bg-card rounded-xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredProblems.map((problem, index) => (
              <ProblemCard 
                key={problem.id} 
                problem={problem} 
                solved={solvedProblems.has(problem.id)}
                index={index}
              />
            ))}

            {filteredProblems.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No problems found matching your criteria.</p>
                <Button variant="link" onClick={clearFilters} className="mt-2 text-primary">
                  Clear filters
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
