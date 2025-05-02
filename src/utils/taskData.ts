import { Task } from "@/types";

// Define category types
export interface Category {
  id: string;
  name: string;
  description?: string;
}

// Define available categories
export const categories: Category[] = [
  {
    id: "creative-writing",
    name: "Creative Writing",
    description:
      "Tasks focused on creative content generation and storytelling",
  },
  {
    id: "code-generation",
    name: "Code Generation",
    description: "Tasks for generating code and technical solutions",
  },
  {
    id: "business-content",
    name: "Business Content",
    description: "Tasks for creating professional and business-related content",
  },
  {
    id: "data-analysis",
    name: "Data Analysis",
    description: "Tasks focused on data interpretation and reporting",
  },
  {
    id: "personal-assistance",
    name: "Personal Assistance",
    description: "Tasks for everyday helpful responses and personal assistance",
  },
];

// Sample tasks data
const tasks: Task[] = [
  // Creative Writing Tasks
  {
    id: "story-creation",
    title: "Short Story Creation",
    description:
      "Write a prompt that generates an engaging short story with specific themes and character types.",
    category: "creative-writing",
    difficulty: "beginner",
    examplePrompt:
      "I want you to write a short story about a traveler who discovers a hidden village in the mountains. The story should include an elder character with a secret, a magical artifact, and a moral lesson about responsibility. The tone should be mystical but not childish, appropriate for young adults. The story should be between 500-800 words and include vivid sensory descriptions of the mountain environment.",
  },
  {
    id: "poetry-composition",
    title: "Poetry Composition",
    description:
      "Create a prompt that generates thoughtful poetry in a specific style or about a particular theme.",
    category: "creative-writing",
    difficulty: "intermediate",
    examplePrompt:
      "Write a sonnet (14 lines with an ABAB CDCD EFEF GG rhyme scheme) about the changing of seasons from winter to spring. Incorporate themes of renewal, hope, and the passage of time. Use vivid natural imagery and metaphors that connect the seasonal change to human experience. The tone should be contemplative and the language should have a lyrical quality with careful attention to rhythm and meter.",
  },
  {
    id: "character-development",
    title: "Character Development",
    description:
      "Design a prompt that creates detailed and compelling fictional character profiles.",
    category: "creative-writing",
    difficulty: "advanced",
    examplePrompt:
      "Create a comprehensive character profile for the protagonist of a psychological thriller novel set in a small coastal town. The character should have a complex backstory involving a traumatic childhood event that still affects them, a unique profession that will be integral to the plot, and a moral ambiguity that makes readers question their motivations. Include details about their physical appearance, speech patterns, major psychological traits, key relationships, internal conflicts, and external goals. Also describe how their character might evolve through the course of the story.",
  },

  // Code Generation Tasks
  {
    id: "function-creation",
    title: "Function Creation",
    description:
      "Write a prompt that generates clean, efficient code for a specific programming function.",
    category: "code-generation",
    difficulty: "beginner",
    examplePrompt:
      "Write a JavaScript function that takes an array of numbers as input and returns a new array containing only the prime numbers from the original array. The function should use modern ES6+ syntax and include comprehensive error handling for invalid inputs. Please include comments explaining the logic and approach. Also provide 3 example use cases with different inputs and expected outputs to demonstrate the function's behavior.",
  },
  {
    id: "algorithm-explanation",
    title: "Algorithm Explanation",
    description:
      "Create a prompt that generates clear explanations of complex algorithms with examples.",
    category: "code-generation",
    difficulty: "intermediate",
  },
  {
    id: "api-development",
    title: "API Development",
    description:
      "Design a prompt that generates specifications and code for a RESTful API.",
    category: "code-generation",
    difficulty: "advanced",
  },

  // Business Content Tasks
  {
    id: "marketing-copy",
    title: "Marketing Copy",
    description:
      "Craft a prompt that generates compelling marketing copy for products or services.",
    category: "business-content",
    difficulty: "beginner",
  },
  {
    id: "business-plan",
    title: "Business Plan",
    description:
      "Create a prompt that generates structured business plans for various types of ventures.",
    category: "business-content",
    difficulty: "intermediate",
  },
  {
    id: "market-analysis",
    title: "Market Analysis",
    description:
      "Design a prompt that produces insightful market analysis reports for specific industries.",
    category: "business-content",
    difficulty: "advanced",
  },

  // Data Analysis Tasks
  {
    id: "data-interpretation",
    title: "Data Interpretation",
    description:
      "Create a prompt that generates interpretations and insights from provided data sets.",
    category: "data-analysis",
    difficulty: "beginner",
  },
  {
    id: "visualization-planning",
    title: "Visualization Planning",
    description:
      "Design a prompt that suggests appropriate data visualization approaches for various data types.",
    category: "data-analysis",
    difficulty: "intermediate",
  },
  {
    id: "predictive-analysis",
    title: "Predictive Analysis",
    description:
      "Craft a prompt that produces predictive analysis models based on historical data patterns.",
    category: "data-analysis",
    difficulty: "advanced",
  },

  // Personal Assistance Tasks
  {
    id: "meal-planning",
    title: "Meal Planning",
    description:
      "Write a prompt that generates personalized meal plans based on dietary requirements and preferences.",
    category: "personal-assistance",
    difficulty: "beginner",
  },
  {
    id: "learning-plan",
    title: "Learning Plan",
    description:
      "Create a prompt that develops structured learning plans for acquiring new skills or knowledge.",
    category: "personal-assistance",
    difficulty: "intermediate",
  },
  {
    id: "life-optimization",
    title: "Life Optimization",
    description:
      "Design a prompt that provides comprehensive life optimization strategies for specific goals.",
    category: "personal-assistance",
    difficulty: "advanced",
  },
];

// Function to get tasks by category
export const getTasksByCategory = (categoryId: string): Task[] => {
  return tasks.filter((task) => task.category === categoryId);
};

// Function to get a task by id
export const getTaskById = (taskId: string): Task | undefined => {
  return tasks.find((task) => task.id === taskId);
};
