import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, 
  Send, 
  ChevronLeft, 
  Terminal,
  FileCode,
  Info,
  Clock,
  MemoryStick
} from 'lucide-react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CodeEditor } from '@/components/code-editor/CodeEditor';
import { DifficultyBadge } from '@/components/ui/difficulty-badge';
import { CategoryBadge } from '@/components/ui/category-badge';
import { StatusBadge } from '@/components/ui/status-badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase, type Problem, type Submission } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export default function ProblemDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [output, setOutput] = useState('');
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [activeTab, setActiveTab] = useState('description');
  
  const { user } = useAuth();

  useEffect(() => {
    if (slug) {
      fetchProblem();
    }
  }, [slug]);

  useEffect(() => {
    if (problem && user) {
      fetchSubmissions();
    }
  }, [problem, user]);

  const fetchProblem = async () => {
    const { data, error } = await supabase
      .from('problems')
      .select('*')
      .eq('slug', slug)
      .maybeSingle();

    if (error) {
      toast.error('Failed to load problem');
    } else if (data) {
      setProblem(data as Problem);
      setCode(data.starter_code);
    }
    setLoading(false);
  };

  const fetchSubmissions = async () => {
    if (!problem || !user) return;
    
    const { data, error } = await supabase
      .from('submissions')
      .select('*')
      .eq('user_id', user.id)
      .eq('problem_id', problem.id)
      .order('created_at', { ascending: false })
      .limit(10);

    if (!error && data) {
      setSubmissions(data as Submission[]);
    }
  };

  const handleRun = async () => {
    setRunning(true);
    setOutput('Running code...\n');
    
    // Simulate code execution (in production, this would call a secure backend)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setOutput(`>>> Running solution...\n\nNote: Code execution requires a Python backend.\nIn production, your code would run in a secure sandbox.\n\n[Simulated Output]\nParsing dataset...\nTraining model...\nEvaluating on test set...\n\nMetric: ${problem?.evaluation_metric.toUpperCase()}\nScore: 0.85`);
    setRunning(false);
  };

  const handleSubmit = async () => {
    if (!user) {
      toast.error('Please sign in to submit solutions');
      return;
    }

    if (!problem) return;

    setSubmitting(true);
    
    // In production, this would send code to a secure backend for evaluation
    const { error } = await supabase
      .from('submissions')
      .insert({
        user_id: user.id,
        problem_id: problem.id,
        code,
        status: 'pending',
      });

    if (error) {
      toast.error('Failed to submit solution');
    } else {
      toast.success('Solution submitted successfully!');
      fetchSubmissions();
    }
    
    setSubmitting(false);
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-pulse text-muted-foreground">Loading problem...</div>
        </div>
      </MainLayout>
    );
  }

  if (!problem) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center h-screen">
          <p className="text-muted-foreground mb-4">Problem not found</p>
          <Link to="/problems">
            <Button variant="outline">
              <ChevronLeft className="w-4 h-4 mr-2" />
              Back to Problems
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="h-screen flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <Link to="/problems">
              <Button variant="ghost" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Problems
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-foreground">{problem.title}</h1>
              <div className="flex items-center gap-2 mt-1">
                <DifficultyBadge difficulty={problem.difficulty} />
                <CategoryBadge category={problem.category} />
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={handleRun}
              disabled={running}
              className="border-border"
            >
              <Play className="w-4 h-4 mr-2" />
              {running ? 'Running...' : 'Run'}
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting || !user}
              className="bg-gradient-primary hover:opacity-90"
            >
              <Send className="w-4 h-4 mr-2" />
              {submitting ? 'Submitting...' : 'Submit'}
            </Button>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left panel - Problem description */}
          <div className="w-1/2 border-r border-border overflow-hidden flex flex-col">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
              <TabsList className="px-4 pt-4 bg-transparent justify-start gap-2">
                <TabsTrigger value="description" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <Info className="w-4 h-4 mr-2" />
                  Description
                </TabsTrigger>
                <TabsTrigger value="submissions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  <FileCode className="w-4 h-4 mr-2" />
                  Submissions
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="flex-1 overflow-auto p-6 m-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="prose prose-invert max-w-none"
                >
                  <p className="text-muted-foreground mb-6">{problem.description}</p>
                  
                  <div className="bg-card rounded-xl p-6 border border-border">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Instructions</h3>
                    <div className="text-sm text-muted-foreground whitespace-pre-wrap">
                      {problem.instructions}
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">Metric:</span>
                      <span className="font-mono text-primary">{problem.evaluation_metric.toUpperCase()}</span>
                    </div>
                    {problem.target_threshold && (
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-foreground">Target:</span>
                        <span className="font-mono text-primary">{"< "}{problem.target_threshold}</span>
                      </div>
                    )}
                  </div>
                </motion.div>
              </TabsContent>

              <TabsContent value="submissions" className="flex-1 overflow-auto p-6 m-0">
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {!user ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground mb-4">Sign in to view your submissions</p>
                      <Link to="/login">
                        <Button className="bg-gradient-primary">Sign In</Button>
                      </Link>
                    </div>
                  ) : submissions.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">No submissions yet</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {submissions.map((submission) => (
                        <div
                          key={submission.id}
                          className="p-4 rounded-lg border border-border bg-card"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <StatusBadge status={submission.status} />
                            <span className="text-xs text-muted-foreground">
                              {new Date(submission.created_at).toLocaleString()}
                            </span>
                          </div>
                          {submission.score && (
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Score: {submission.score}</span>
                              {submission.runtime_ms && (
                                <span className="flex items-center gap-1">
                                  <Clock className="w-3 h-3" />
                                  {submission.runtime_ms}ms
                                </span>
                              )}
                              {submission.memory_kb && (
                                <span className="flex items-center gap-1">
                                  <MemoryStick className="w-3 h-3" />
                                  {(submission.memory_kb / 1024).toFixed(1)}MB
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right panel - Code editor and output */}
          <div className="w-1/2 flex flex-col overflow-hidden">
            {/* Code editor */}
            <div className="flex-1 overflow-hidden">
              <CodeEditor
                value={code}
                onChange={setCode}
                language="python"
              />
            </div>

            {/* Output panel */}
            <div className="h-48 border-t border-border flex flex-col">
              <div className="px-4 py-2 border-b border-border flex items-center gap-2">
                <Terminal className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">Output</span>
              </div>
              <div className="flex-1 overflow-auto p-4 bg-editor-background">
                <pre className="text-sm font-mono text-muted-foreground whitespace-pre-wrap">
                  {output || 'Run your code to see the output here...'}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
