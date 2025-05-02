import React from "react";
import { Progress } from "@/components/ui/progress";
import { getUserProgress } from "@/utils/evaluationService";
import { motion } from "framer-motion";
import { Trophy, Target, FileCheck, TrendingUp } from "lucide-react";

const ProgressTracker: React.FC = () => {
  const progress = getUserProgress();
  const completedCount = progress.completedTasks?.length || 0;
  const promptScore = Math.round(progress.averagePromptScore || 0);
  const outputScore = Math.round(progress.averageOutputScore || 0);

  const getScoreColorClass = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-amber-500";
    return "text-rose-500";
  };

  const getProgressColorClass = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-amber-500";
    return "bg-rose-500";
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 shadow-lg rounded-xl p-6 mb-8 border border-slate-200 dark:border-slate-700"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary/10 p-2 rounded-lg">
          <TrendingUp className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-xl font-bold">Your Progress</h3>
      </div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6"
        variants={container}
      >
        <motion.div
          className="bg-secondary/30 dark:bg-slate-700/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="rounded-full bg-blue-100 dark:bg-blue-900/30 p-3">
            <FileCheck className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
              Tasks Completed
            </p>
            <p className="text-3xl font-bold">{completedCount}</p>
          </div>
        </motion.div>

        <motion.div
          className="bg-secondary/30 dark:bg-slate-700/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="rounded-full bg-violet-100 dark:bg-violet-900/30 p-3">
            <Target className="h-6 w-6 text-violet-600 dark:text-violet-400" />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Prompt Score
              </p>
              <p
                className={`text-3xl font-bold ${getScoreColorClass(
                  promptScore
                )}`}
              >
                {promptScore}
              </p>
            </div>
            <Progress
              value={promptScore}
              className="h-2 mt-2 bg-slate-200 dark:bg-slate-700"
              indicatorClassName={getProgressColorClass(promptScore)}
            />
          </div>
        </motion.div>

        <motion.div
          className="bg-secondary/30 dark:bg-slate-700/40 p-5 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700 flex items-center gap-4"
          variants={item}
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="rounded-full bg-amber-100 dark:bg-amber-900/30 p-3">
            <Trophy className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="w-full">
            <div className="flex justify-between items-center">
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Output Score
              </p>
              <p
                className={`text-3xl font-bold ${getScoreColorClass(
                  outputScore
                )}`}
              >
                {outputScore}
              </p>
            </div>
            <Progress
              value={outputScore}
              className="h-2 mt-2 bg-slate-200 dark:bg-slate-700"
              indicatorClassName={getProgressColorClass(outputScore)}
            />
          </div>
        </motion.div>
      </motion.div>

      {completedCount === 0 && (
        <motion.div
          className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border border-dashed border-slate-300 dark:border-slate-600"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-slate-600 dark:text-slate-400 font-medium flex items-center justify-center gap-2">
            <span role="img" aria-label="sparkles">
              ✨
            </span>
            Complete tasks to see your progress statistics
            <span role="img" aria-label="sparkles">
              ✨
            </span>
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ProgressTracker;
