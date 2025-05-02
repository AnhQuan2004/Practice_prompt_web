import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Task } from "@/types";
import {
  Lightbulb,
  Send,
  Eye,
  RotateCcw,
  Clock,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  MessageSquare,
  BookOpen,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface PromptInputProps {
  currentTask: Task;
  onSubmit: (prompt: string) => void;
  isLoading: boolean;
}

const PromptInput: React.FC<PromptInputProps> = ({
  currentTask,
  onSubmit,
  isLoading,
}) => {
  const [promptText, setPromptText] = useState("");
  const [showExample, setShowExample] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [isAutosaved, setIsAutosaved] = useState(false);
  const autosaveKey = `autosave_${currentTask.id}`;

  useEffect(() => {
    // Load autosaved content when task changes
    const saved = localStorage.getItem(autosaveKey);
    if (saved) {
      setPromptText(saved);
      setCharCount(saved.length);
    } else {
      // Clear the input if no autosave exists
      setPromptText("");
      setCharCount(0);
    }
  }, [currentTask, autosaveKey]);

  useEffect(() => {
    // Reset prompt text when task changes
    setPromptText("");
    setShowExample(false);
  }, [currentTask]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPromptText(value);
    setCharCount(value.length);

    // Autosave
    localStorage.setItem(autosaveKey, value);
    setIsAutosaved(true);

    // Reset autosave indicator after 2 seconds
    setTimeout(() => setIsAutosaved(false), 2000);
  };

  const handleClear = () => {
    if (promptText.trim()) {
      if (confirm("Are you sure you want to clear your prompt?")) {
        setPromptText("");
        setCharCount(0);
        localStorage.removeItem(autosaveKey);
        toast("Prompt cleared", {
          description: "Your prompt has been cleared from the editor",
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptText.trim() && !isLoading) {
      onSubmit(promptText.trim());
    }
  };

  const getCharCountColor = () => {
    if (charCount === 0) return "text-muted-foreground";
    if (charCount < 20) return "text-amber-500";
    if (charCount > 300) return "text-emerald-500";
    return "text-blue-500";
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-slate-100 text-slate-800";
    }
  };

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-1 space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="shadow-md border-2 border-primary/20 overflow-hidden">
            <div className="bg-primary/10 h-2"></div>
            <CardHeader className="pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-primary mr-2" />
                  <CardTitle className="text-xl text-primary">
                    Task Details
                  </CardTitle>
                </div>
                <Badge
                  className={`${getDifficultyColor(
                    currentTask.difficulty
                  )} ml-2`}
                >
                  {currentTask.difficulty}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded-md border-l-4 border-primary">
                <h3 className="font-bold text-lg mb-2">{currentTask.title}</h3>
                <p className="text-slate-700 dark:text-slate-300">
                  {currentTask.description}
                </p>
              </div>

              {currentTask.examplePrompt && (
                <div className="mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
                    onClick={() => setShowExample(!showExample)}
                  >
                    <Lightbulb className="h-4 w-4 mr-2 text-amber-500" />
                    {showExample ? "Hide Example" : "Show Example Prompt"}
                  </Button>

                  {showExample && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ duration: 0.3 }}
                      className="mt-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-md border border-amber-200 dark:border-amber-800/30"
                    >
                      <div className="flex items-start mb-2">
                        <CheckCircle2 className="h-4 w-4 text-amber-600 mt-1 mr-2" />
                        <h4 className="font-medium text-amber-800 dark:text-amber-400">
                          Example Prompt
                        </h4>
                      </div>
                      <p className="text-sm text-amber-800 dark:text-amber-300 whitespace-pre-wrap font-mono">
                        {currentTask.examplePrompt}
                      </p>
                    </motion.div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center text-lg">
              <Lightbulb className="mr-2 h-5 w-5 text-yellow-500" />
              <span>Prompt Engineering Tips</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2 items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
              <p className="text-sm">
                Be specific about your desired output format
              </p>
            </div>
            <div className="flex gap-2 items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
              <p className="text-sm">Break complex tasks into clear steps</p>
            </div>
            <div className="flex gap-2 items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
              <p className="text-sm">Provide context and constraints</p>
            </div>
            <div className="flex gap-2 items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
              <p className="text-sm">Include examples when helpful</p>
            </div>
            <div className="flex gap-2 items-start">
              <CheckCircle2 className="h-4 w-4 text-green-500 mt-1" />
              <p className="text-sm">Specify the target audience or tone</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="h-full flex flex-col shadow-md">
          <CardHeader className="pb-3 border-b">
            <CardTitle className="flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-primary" />
              Write Your Prompt
            </CardTitle>
            <CardDescription>
              Create a prompt that accomplishes the task requirements
            </CardDescription>
          </CardHeader>

          <CardContent className="flex-grow pt-5">
            <form onSubmit={handleSubmit} className="h-full flex flex-col">
              <Textarea
                className="flex-grow min-h-[300px] p-4 text-base resize-none bg-slate-50 dark:bg-slate-800/60 focus-visible:ring-primary"
                placeholder="Write your prompt here..."
                value={promptText}
                onChange={handleChange}
                disabled={isLoading}
              />
            </form>
          </CardContent>

          <CardFooter className="flex justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">
              {isAutosaved && (
                <span className="text-green-600 dark:text-green-400 flex items-center">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Saved
                </span>
              )}
              {!isAutosaved && `${promptText.length} characters`}
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={handleClear}
                disabled={!promptText.length || isLoading}
              >
                Clear
              </Button>
              <Button
                type="submit"
                onClick={handleSubmit}
                disabled={!promptText.trim() || isLoading}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                {isLoading ? "Evaluating..." : "Evaluate Prompt"}
                {isLoading ? (
                  <Sparkles className="h-4 w-4 animate-pulse" />
                ) : (
                  <ArrowRight className="h-4 w-4" />
                )}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default PromptInput;
