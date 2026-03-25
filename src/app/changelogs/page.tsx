'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { GitCommit, X, Calendar, User, ArrowUpRight } from 'lucide-react';
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

const REPO_OWNER = 'Cykeek';
const REPO_NAME = 'Portfolio';

export default function ChangelogsPage() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCommit, setSelectedCommit] = useState<Commit | null>(null);
  const [commitDetails, setCommitDetails] = useState<CommitFile[]>([]);
  const [loadingDetails, setLoadingDetails] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedCommit(null);
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

  const fetchCommitDetails = async (sha: string) => {
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
  };

  const handleCommitClick = async (commit: Commit) => {
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
        </motion.div>

        {loading && (
          <div className="flex items-center justify-center py-20">
            <div className="animate-pulse text-muted">Loading commits...</div>
          </div>
        )}

        {error && (
          <div className="text-red-500 py-10 text-center">{error}</div>
        )}

        {!loading && !error && (
          <div className="space-y-4">
            {commits.map((commit, index) => (
              <motion.div
                key={commit.sha}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...SPRING_WEIGHTED, delay: index * 0.05 }}
              >
                <Card 
                  className="p-6 cursor-pointer hover:border-white/20"
                  onClick={() => handleCommitClick(commit)}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                      {commit.author?.avatar_url ? (
                        <img 
                          src={commit.author.avatar_url} 
                          alt={commit.author.login}
                          className="w-full h-full rounded-full object-cover"
                        />
                      ) : (
                        <GitCommit className="w-5 h-5 text-muted" />
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 text-xs text-muted mb-2">
                        <span className="font-medium">{commit.commit.author?.name || 'Unknown'}</span>
                        <span>•</span>
                        <span>{formatDate(commit.commit.author.date)}</span>
                      </div>
                      
                      <p className="text-sm leading-relaxed line-clamp-2">
                        {commit.commit.message}
                      </p>
                      
                      <div className="flex items-center gap-2 mt-3 text-xs text-muted/50">
                        <code className="font-mono">{commit.sha.slice(0, 7)}</code>
                        <ArrowUpRight className="w-3 h-3" />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <AnimatePresence>
        {selectedCommit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setSelectedCommit(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={SPRING_WEIGHTED}
              className="relative w-full max-w-3xl max-h-[85vh] bg-[#0a0a0a] border border-white/10 rounded-md overflow-hidden flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center">
                    {selectedCommit.author?.avatar_url ? (
                      <img 
                        src={selectedCommit.author.avatar_url} 
                        alt={selectedCommit.author.login}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <GitCommit className="w-5 h-5 text-muted" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">Commit Details</h3>
                    <p className="text-xs text-muted font-mono">{selectedCommit.sha.slice(0, 7)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCommit(null)}
                  className="p-2 hover:bg-white/5 rounded-sm transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 border-b border-white/10">
                <p className="text-sm leading-relaxed">{selectedCommit.commit.message}</p>
                <div className="flex items-center gap-4 mt-4 text-xs text-muted">
                  <span className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    {selectedCommit.commit.author?.name || 'Unknown'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {formatDate(selectedCommit.commit.author.date)}
                  </span>
                </div>
              </div>

              <div data-lenis-prevent onWheel={(e) => e.stopPropagation()} className="flex-1 overflow-y-auto p-6">
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
              </div>

              <div className="p-6 border-t border-white/10">
                <a
                  href={selectedCommit.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button variant="secondary" icon="arrow">
                    View on GitHub
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}