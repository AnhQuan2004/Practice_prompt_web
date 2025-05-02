import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { categories, getTasksByCategory } from "@/utils/taskData";
import { Task } from "@/types";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface TaskSelectionProps {
  onSelectTask: (task: Task) => void;
}

const TaskSelection: React.FC<TaskSelectionProps> = ({ onSelectTask }) => {
  const [activeCategory, setActiveCategory] = React.useState(categories[0].id);

  const handleCategoryChange = (value: string) => {
    setActiveCategory(value);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-emerald-100 text-emerald-800 hover:bg-emerald-200 border-emerald-200";
      case "intermediate":
        return "bg-amber-100 text-amber-800 hover:bg-amber-200 border-amber-200";
      case "advanced":
        return "bg-rose-100 text-rose-800 hover:bg-rose-200 border-rose-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200 border-gray-200";
    }
  };

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <span className="bg-primary/10 rounded-md p-1 mr-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
            />
          </svg>
        </span>
        Select a Task
      </h2>

      <Tabs
        defaultValue={categories[0].id}
        onValueChange={handleCategoryChange}
        className="w-full"
      >
        <TabsList className="mb-6 flex flex-wrap justify-center w-full bg-secondary/30 p-1 rounded-lg">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="transition-all data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-primary relative px-4 flex-1"
            >
              {category.name}
              {activeCategory === category.id && (
                <motion.div
                  className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTabIndicator"
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {getTasksByCategory(category.id).map((task) => (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card
                    className="cursor-pointer h-full hover:bg-secondary/25 border-2 hover:border-primary/20 transition-all duration-300 hover:shadow-md group overflow-hidden"
                    onClick={() => onSelectTask(task)}
                  >
                    <CardHeader className="pb-2 relative">
                      <div className="absolute top-0 right-0 h-16 w-16 bg-primary/5 rounded-bl-full -mt-1 -mr-1 transform transition-transform group-hover:scale-110"></div>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg group-hover:text-primary transition-colors">
                          {task.title}
                        </CardTitle>
                        <Badge
                          className={`${getDifficultyColor(
                            task.difficulty
                          )} shadow-sm transition-all duration-300 group-hover:scale-105`}
                        >
                          {task.difficulty}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm text-muted-foreground leading-relaxed">
                        {task.description}
                      </CardDescription>
                    </CardContent>
                    <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default TaskSelection;
