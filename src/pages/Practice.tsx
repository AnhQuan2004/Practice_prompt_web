import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ProgressTracker from "@/components/ProgressTracker";
import TaskSelection from "@/components/TaskSelection";
import PromptInput from "@/components/PromptInput";
import ResultsDisplay from "@/components/ResultsDisplay";
import { evaluatePrompt } from "@/utils/evaluationService";
import { Task, EvaluationResult } from "@/types";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const Practice = () => {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [result, setResult] = useState<EvaluationResult | null>(null);

  const handleTaskSelect = (task: Task) => {
    setSelectedTask(task);
    setResult(null);
  };

  const handlePromptSubmit = async (promptText: string) => {
    if (!selectedTask) return;

    setPrompt(promptText);
    setIsEvaluating(true);

    try {
      const evaluationResult = await evaluatePrompt(
        promptText,
        selectedTask.id
      );
      setResult(evaluationResult);
    } catch (error) {
      console.error("Error evaluating prompt:", error);
      // Handle error (show toast, etc.)
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleReset = () => {
    setResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <main className="container mx-auto px-4 py-8">
        {/* Progress Tracker Section */}
        <ProgressTracker />

        {/* Back to Tasks Button - when a task is selected or result is showing */}
        {(selectedTask || result) && (
          <div className="mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSelectedTask(null);
                setResult(null);
              }}
              className="flex items-center gap-2 hover:bg-slate-100"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Tasks
            </Button>
          </div>
        )}

        {/* Task Selection */}
        {!selectedTask && !result && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <TaskSelection onSelectTask={handleTaskSelect} />
          </motion.div>
        )}

        {/* Prompt Input */}
        {selectedTask && !result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <PromptInput
              currentTask={selectedTask}
              onSubmit={handlePromptSubmit}
              isLoading={isEvaluating}
            />
          </motion.div>
        )}

        {/* Results Display */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <ResultsDisplay result={result} onReset={handleReset} />
          </motion.div>
        )}
      </main>
    </div>
  );
};

export default Practice;
