import { EvaluationResult } from "@/types";
import { toast } from "sonner";

// Local storage keys
const API_KEY_STORAGE_KEY = "prompt_trainer_api_key";
const USER_PROGRESS_KEY = "user_progress_data";

// Hardcoded API key - Replace this with your actual OpenAI API key
const HARDCODED_API_KEY = "AIzaSyCupRmlbGTvO13fNYSUzxU0MMiXVjpgVeA";

// Type for user progress data
interface UserProgress {
  completedTasks: string[];
  averagePromptScore: number;
  averageOutputScore: number;
}

// Get API key - now returns the hardcoded key directly
export const getApiKey = (): string => {
  return HARDCODED_API_KEY;
};

// Set API key in local storage - kept for backward compatibility
export const setApiKey = (key: string): void => {
  localStorage.setItem(API_KEY_STORAGE_KEY, key);
};

// Get user progress from local storage
export const getUserProgress = (): UserProgress => {
  const stored = localStorage.getItem(USER_PROGRESS_KEY);
  if (!stored) {
    return {
      completedTasks: [],
      averagePromptScore: 0,
      averageOutputScore: 0,
    };
  }
  return JSON.parse(stored);
};

// Update user progress
export const updateUserProgress = (
  taskId: string,
  promptScore: number,
  outputScore: number
): void => {
  const progress = getUserProgress();

  // Add task to completed tasks if not already there
  if (!progress.completedTasks.includes(taskId)) {
    progress.completedTasks.push(taskId);
  }

  // Update average scores
  const totalTasks = progress.completedTasks.length;
  progress.averagePromptScore =
    (progress.averagePromptScore * (totalTasks - 1) + promptScore) / totalTasks;
  progress.averageOutputScore =
    (progress.averageOutputScore * (totalTasks - 1) + outputScore) / totalTasks;

  // Save to localStorage
  localStorage.setItem(USER_PROGRESS_KEY, JSON.stringify(progress));
};

// Mock evaluation function (in a real app, this would call an API)
export const evaluatePrompt = async (
  prompt: string,
  taskId: string
): Promise<EvaluationResult> => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Mock result
  const result: EvaluationResult = {
    prompt_score: Math.floor(Math.random() * 30) + 70, // Random score between 70-100
    output_score: Math.floor(Math.random() * 30) + 70,
    prompt_evaluation: {
      strengths: [
        "Clear objective stated at the beginning",
        "Good use of specific examples to guide the model",
        "Appropriate level of detail",
      ],
      weaknesses: [
        "Could benefit from more structured formatting",
        "Consider adding output format instructions",
      ],
    },
    output_evaluation: {
      strengths: [
        "Output follows requested information",
        "Content is relevant and well-organized",
        "Good level of detail in response",
      ],
      weaknesses: [
        "Some sections could be more concise",
        "Might include more examples or supporting evidence",
      ],
    },
    simulated_output: `Here is a simulated response to your prompt:\n\n${prompt}\n\nThis is how an AI model might respond to your prompt. The quality of this output is directly influenced by how well your prompt was constructed.`,
    improvement_suggestions: [
      "Start with a clear role definition for the AI",
      "Break down complex requests into step-by-step instructions",
      "Include examples of the desired output format",
      "Specify constraints or limitations explicitly",
    ],
    improved_prompt_example: `I want you to act as an expert ${
      prompt.includes("write") ? "writer" : "assistant"
    } who excels at ${prompt.substring(
      0,
      50
    )}...\n\nPlease follow these specific steps:\n1. First, understand the core request\n2. Then, provide a structured response\n3. Finally, summarize key points\n\nFormat your response as follows:\n- Introduction: Brief context\n- Main content: Detailed information\n- Conclusion: Summary of key points`,
  };

  // Update user progress
  updateUserProgress(taskId, result.prompt_score, result.output_score);

  return result;
};

// Store evaluation results in local storage
export const saveEvaluationResult = (
  taskId: string,
  userPrompt: string,
  result: EvaluationResult
) => {
  try {
    const historyKey = `prompt_history_${taskId}`;
    const history = JSON.parse(localStorage.getItem(historyKey) || "[]");

    history.push({
      timestamp: new Date().toISOString(),
      userPrompt,
      result,
    });

    localStorage.setItem(historyKey, JSON.stringify(history));

    // Update user progress
    updateUserProgress(taskId, result.prompt_score, result.output_score);
  } catch (error) {
    console.error("Error saving evaluation result:", error);
    toast.error(
      "We couldn't save your progress this time. Your evaluation is still available, and we'll try to save it next time!"
    );
  }
};
