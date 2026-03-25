'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { X, Calendar, User } from 'lucide-react';
import { SPRING_WEIGHTED } from '@/lib/motion';

interface Commit {
  sha: string;
  commit: {
    message: string;
    author: {
      name: string;
      date: string;
    };
  };
  author: {
    login: string;
    avatar_url: string;
  } | null;
  html_url: string;
}

interface CommitFile {
  sha: string;
  filename: string;
  status: string;
  additions: number;
  deletions: number;
  patch?: string;
}

interface DateGroup {
  date: Date;
  dateStr: string;
  commits: Commit[];
  count: number;
  summary: string;
}

export default function ChangelogsPage() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [commitDetails, setCommitDetails] = useState<CommitFile[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [yearFilter, setYearFilter] = useState<string>('all');
  const [monthFilter, setMonthFilter] = useState<string>('all');
  const [selectedDateGroup, setSelectedDateGroup] = useState<DateGroup | null>(null);
  const [selectedCommitInGroup, setSelectedCommitInGroup] = useState<Commit | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedCommit(null);
        setSelectedDateGroup(null);
        setSelectedCommitInGroup(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    fetchCommits();
  }, []);

  const fetchCommits = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `/api/changelogs`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch commits');
      }
      
      const data = await response.json();
      setCommits(data);
    } catch {
      setError('Unable to load commits. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCommitDetails = useCallback(async (sha: string) => {
    try {
      setLoadingDetails(true);
      const response = await fetch(
        `/api/changelogs/${sha}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch commit details');
      }
      
      const data = await response.json();
      setCommitDetails(data.files || []);
    } catch {
    } finally {
      setLoadingDetails(false);
    }
  }, []);

  const handleDateGroupClick = useCallback(async (group: DateGroup) => {
    setSelectedDateGroup(group);
    setSelectedCommitInGroup(group.commits[0]);
    await fetchCommitDetails(group.commits[0].sha);
  }, []);

  const handleCommitClick = async (commit: Commit) => {
    setSelectedDateGroup(null);
    setSelectedCommitInGroup(null);
    setSelectedCommit(commit);
    await fetchCommitDetails(commit.sha);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getFileStatusColor = (status: string) => {
    switch (status) {
      case 'added':
        return 'text-green-400';
      case 'removed':
        return 'text-red-400';
      case 'modified':
        return 'text-yellow-400';
      default:
        return 'text-muted';
    }
  };

  // Get unique years from commits
  const years = ['all', ...new Set(commits.map(c => new Date(c.commit.author.date).getFullYear().toString()))];

  // Get unique months from commits based on selected year
  const getAvailableMonths = () => {
    const commitsToCheck = yearFilter === 'all' 
      ? commits 
      : commits.filter(c => new Date(c.commit.author.date).getFullYear().toString() === yearFilter);
    const monthsSet = new Set(commitsToCheck.map(c => (new Date(c.commit.author.date).getMonth() + 1).toString().padStart(2, '0')));
    return ['all', ...Array.from(monthsSet).sort()];
  };
  const months = getAvailableMonths();

  // Filter commits
  const filteredCommits = commits.filter(commit => {
    const date = new Date(commit.commit.author.date);
    const yearMatch = yearFilter === 'all' || date.getFullYear().toString() === yearFilter;
    const monthMatch = monthFilter === 'all' || (date.getMonth() + 1).toString().padStart(2, '0') === monthFilter;
    return yearMatch && monthMatch;
  });

  // Group commits by date
  const groupedCommits = filteredCommits.reduce((acc, commit) => {
    const dateKey = new Date(commit.commit.author.date).toDateString();
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(commit);
    return acc;
  }, {} as Record<string, Commit[]>);

  const dateGroups = Object.entries(groupedCommits)
    .map(([date, commits]) => ({
      date: new Date(date),
      dateStr: date,
      commits,
      count: commits.length,
      summary: commits[0].commit.message.split('\n')[0]
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-32 pb-20 px-6 md:px-12 max-w-6xl mx-auto">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={SPRING_WEIGHTED}
          className="mb-16"
        >
          <h1 className="text-heading mb-4">Changelogs</h1>
          <p className="text-muted max-w-xl">
            A history of all changes, updates, and improvements made to this portfolio.
          </p>
          <div className="flex flex-wrap items-center gap-6 mt-8">
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold tracking-widest text-muted uppercase mr-2 self-center">Year</span>
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => { setYearFilter(year); setMonthFilter("all"); }}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                    yearFilter === year
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 text-muted border-white/10 hover:border-white/20'
                  }`}
                >
                  {year === 'all' ? 'All' : year}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              <span className="text-[10px] font-bold tracking-widest text-muted uppercase mr-2 self-center">Month</span>
              {months.map((month) => (
                <button
                  key={month}
                  onClick={() => setMonthFilter(month)}
                  className={`px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase transition-all duration-300 border ${
                    monthFilter === month
                      ? 'bg-white text-black border-white'
                      : 'bg-white/5 text-muted border-white/10 hover:border-white/20'
                  }`}
                >
                  {month === 'all' ? 'All' : new Date(`2024-${month}-01`).toLocaleDateString('en-US', { month: 'short' })}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-muted">Loading commits...</div>
          </div>
        )}

        {error && (
          <div className="text-red-500 py-10 text-center">{error}</div>
        )}

        {!loading && !error && dateGroups.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dateGroups.map((group, index) => (
              <motion.div
                key={group.dateStr}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...SPRING_WEIGHTED, delay: index * 0.05 }}
              >
                <Card 
                  className="p-6 cursor-pointer hover:border-white/20"
                  onClick={() => handleDateGroupClick(group)}
                >
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold tracking-tight">
                        {group.date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="px-2 py-1 bg-white/5 rounded-sm text-[10px] font-bold text-muted">
                        {group.count} {group.count === 1 ? 'commit' : 'commits'}
                      </span>
                    </div>
                    <p className="text-sm text-muted line-clamp-2">{group.summary}</p>
                    <div className="flex items-center gap-2 text-xs text-muted/50">
                      <span>{group.date.getFullYear()}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {!loading && !error && dateGroups.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted">No commits found for the selected filters.</p>
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedDateGroup && selectedCommitInGroup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => { setSelectedDateGroup(null); setSelectedCommitInGroup(null); }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={SPRING_WEIGHTED}
              className="relative w-full max-w-5xl max-h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-sm overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div>
                  <h3 className="text-lg font-bold tracking-tight">
                    {selectedDateGroup.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
                  </h3>
                  <p className="text-xs text-muted">{selectedDateGroup.count} commits</p>
                </div>
                <button
                  onClick={() => { setSelectedDateGroup(null); setSelectedCommitInGroup(null); }}
                  className="p-2 hover:bg-white/5 rounded-sm transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Two column layout */}
              <div className="flex flex-1 overflow-hidden">
                {/* Left: Commit list */}
                <div className="w-1/3 border-r border-white/10 overflow-y-auto p-4" data-lenis-prevent onWheel={(e) => e.stopPropagation()}>
                  <h4 className="text-[10px] font-bold tracking-widest text-muted uppercase mb-4">Commits</h4>
                  <div className="space-y-2">
                    {selectedDateGroup.commits.map((commit) => (
                      <button
                        key={commit.sha}
                        onClick={() => {
                          setSelectedCommitInGroup(commit);
                          fetchCommitDetails(commit.sha);
                        }}
                        className={`w-full p-3 rounded-sm text-left transition-colors ${
                          selectedCommitInGroup.sha === commit.sha 
                            ? 'bg-white/10 border border-white/20' 
                            : 'bg-white/[0.02] border border-white/5 hover:border-white/10'
                        }`}
                      >
                        <p className="text-sm line-clamp-2">{commit.commit.message.split('\n')[0]}</p>
                        <div className="flex items-center gap-2 mt-2 text-xs text-muted/50">
                          <code className="font-mono">{commit.sha.slice(0, 7)}</code>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Right: Commit details */}
                <div className="w-2/3 overflow-y-auto p-6" data-lenis-prevent onWheel={(e) => e.stopPropagation()}>
                  <div className="mb-6">
                    <p className="text-sm leading-relaxed">{selectedCommitInGroup.commit.message}</p>
                    <div className="flex items-center gap-4 mt-4 text-xs text-muted">
                      <span className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        {selectedCommitInGroup.commit.author?.name || 'Unknown'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {formatDate(selectedCommitInGroup.commit.author.date)}
                      </span>
                    </div>
                  </div>

                  <h4 className="text-xs font-bold tracking-widest text-muted uppercase mb-4">
                    Changed Files ({commitDetails.length})
                  </h4>
                  
                  {loadingDetails ? (
                    <div className="text-muted text-sm">Loading file changes...</div>
                  ) : commitDetails.length === 0 ? (
                    <div className="text-muted text-sm">No file changes to display</div>
                  ) : (
                    <div className="space-y-3">
                      {commitDetails.map((file) => (
                        <div 
                          key={file.filename}
                          className="p-4 bg-white/[0.02] border border-white/5 rounded-sm"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <code className="text-xs text-foreground">{file.filename}</code>
                            <div className="flex items-center gap-2 text-xs">
                              <span className="text-green-400">+{file.additions}</span>
                              <span className="text-red-400">-{file.deletions}</span>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`text-[10px] font-bold uppercase ${getFileStatusColor(file.status)}`}>
                              {file.status}
                            </span>
                          </div>
                          {file.patch && (
                            <pre className="mt-3 p-3 bg-black/30 rounded-sm overflow-x-auto text-xs font-mono text-muted">
                              {file.patch.slice(0, 500)}{file.patch.length > 500 ? '...' : ''}
                            </pre>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="mt-6 pt-6 border-t border-white/10">
                    <a
                      href={selectedCommitInGroup.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex"
                    >
                      <Button variant="secondary" icon="arrow">
                        View on GitHub
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}