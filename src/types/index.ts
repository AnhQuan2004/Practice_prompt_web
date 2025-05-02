// Task interface for the prompt engineering tasks
export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  examplePrompt?: string;
}

// Evaluation interface for feedback on prompts
export interface EvaluationResult {
  prompt_score: number;
  output_score: number;
  prompt_evaluation: {
    strengths: string[];
    weaknesses: string[];
  };
  output_evaluation: {
    strengths: string[];
    weaknesses: string[];
  };
  simulated_output: string;
  improvement_suggestions: string[];
  improved_prompt_example: string;
}

// User profile interface
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "user" | "premium" | "admin";
  tasksCompleted: number;
  averageScore: number;
  badges: string[];
  joinDate: string;
}

// Settings interface
export interface Settings {
  theme: "light" | "dark" | "system";
  apiKey: string;
  modelPreference: string;
  notifications: boolean;
}
