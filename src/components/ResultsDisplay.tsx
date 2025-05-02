import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Clipboard,
  CheckCheck,
  ThumbsUp,
  ThumbsDown,
  ArrowUpRight,
} from "lucide-react";
import { EvaluationResult } from "@/types";

interface ResultsDisplayProps {
  result: EvaluationResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return "text-green-500";
    if (score >= 70) return "text-blue-500";
    if (score >= 50) return "text-yellow-500";
    return "text-red-500";
  };

  const getProgressColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 70) return "bg-blue-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          className="text-slate-500 hover:text-slate-700"
          onClick={onReset}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Try Another Prompt
        </Button>

        <div className="flex space-x-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            <span className="text-sm font-medium mr-2">Prompt Score:</span>
            <span
              className={`text-sm font-bold ${getScoreColor(
                result.prompt_score
              )}`}
            >
              {result.prompt_score}
            </span>
          </div>
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
            <span className="text-sm font-medium mr-2">Output Score:</span>
            <span
              className={`text-sm font-bold ${getScoreColor(
                result.output_score
              )}`}
            >
              {result.output_score}
            </span>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="prompt">Prompt Analysis</TabsTrigger>
          <TabsTrigger value="output">Output Analysis</TabsTrigger>
          <TabsTrigger value="improvement">Improvements</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Evaluation Summary</CardTitle>
              <CardDescription>
                Your prompt has been analyzed based on clarity, specificity, and
                effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Prompt Score</span>
                  <span
                    className={`text-sm font-bold ${getScoreColor(
                      result.prompt_score
                    )}`}
                  >
                    {result.prompt_score}/100
                  </span>
                </div>
                <Progress
                  value={result.prompt_score}
                  className="h-2"
                  indicatorClassName={getProgressColor(result.prompt_score)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How well your prompt is structured and articulated
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Output Score</span>
                  <span
                    className={`text-sm font-bold ${getScoreColor(
                      result.output_score
                    )}`}
                  >
                    {result.output_score}/100
                  </span>
                </div>
                <Progress
                  value={result.output_score}
                  className="h-2"
                  indicatorClassName={getProgressColor(result.output_score)}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  How effective the output would be based on your prompt
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <Card className="border-green-100 bg-green-50/50 dark:bg-green-900/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-green-700 dark:text-green-400 flex items-center">
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.prompt_evaluation.strengths.map(
                        (strength, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                            <span className="text-sm">{strength}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-amber-100 bg-amber-50/50 dark:bg-amber-900/10">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base text-amber-700 dark:text-amber-400 flex items-center">
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {result.prompt_evaluation.weaknesses.map(
                        (weakness, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <XCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                            <span className="text-sm">{weakness}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Prompt Analysis Tab */}
        <TabsContent value="prompt" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Prompt Analysis</CardTitle>
              <CardDescription>
                Detailed review of your prompt's structure and effectiveness
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center text-green-600">
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Strengths
                </h3>
                <ul className="space-y-2 pl-6 list-disc">
                  {result.prompt_evaluation.strengths.map((strength, idx) => (
                    <li key={idx} className="text-sm">
                      {strength}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2 flex items-center text-amber-600">
                  <XCircle className="mr-2 h-4 w-4" />
                  Weaknesses
                </h3>
                <ul className="space-y-2 pl-6 list-disc">
                  {result.prompt_evaluation.weaknesses.map((weakness, idx) => (
                    <li key={idx} className="text-sm">
                      {weakness}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Output Analysis Tab */}
        <TabsContent value="output" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Output Analysis</CardTitle>
              <CardDescription>
                Evaluation of how an AI model would likely respond to your
                prompt
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-md border border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-medium">Simulated Output</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 gap-1"
                    onClick={() => copyToClipboard(result.simulated_output)}
                  >
                    {copied ? (
                      <>
                        <CheckCheck className="h-4 w-4" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Clipboard className="h-4 w-4" />
                        <span>Copy</span>
                      </>
                    )}
                  </Button>
                </div>
                <div className="whitespace-pre-wrap text-sm text-muted-foreground">
                  {result.simulated_output}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center text-green-600">
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Output Strengths
                  </h3>
                  <ul className="space-y-2 pl-6 list-disc">
                    {result.output_evaluation.strengths.map((strength, idx) => (
                      <li key={idx} className="text-sm">
                        {strength}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="text-sm font-medium mb-2 flex items-center text-amber-600">
                    <XCircle className="mr-2 h-4 w-4" />
                    Output Weaknesses
                  </h3>
                  <ul className="space-y-2 pl-6 list-disc">
                    {result.output_evaluation.weaknesses.map(
                      (weakness, idx) => (
                        <li key={idx} className="text-sm">
                          {weakness}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Improvement Tab */}
        <TabsContent value="improvement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Improvement Suggestions</CardTitle>
              <CardDescription>
                Ways to enhance your prompt for better results
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">
                  Recommended Improvements
                </h3>
                <ul className="space-y-2">
                  {result.improvement_suggestions.map((suggestion, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <ArrowUpRight className="h-4 w-4 text-blue-500 mt-0.5" />
                      <span className="text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-medium mb-2 flex justify-between">
                  <span>Improved Prompt Example</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 gap-1"
                    onClick={() =>
                      copyToClipboard(result.improved_prompt_example)
                    }
                  >
                    {copied ? "Copied!" : "Copy"}
                  </Button>
                </h3>
                <div className="bg-blue-50 dark:bg-blue-900/10 p-4 rounded-md border border-blue-100 dark:border-blue-800/30 whitespace-pre-wrap text-sm">
                  {result.improved_prompt_example}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={onReset} className="w-full">
                Try a New Prompt
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </motion.div>
  );
};

export default ResultsDisplay;
