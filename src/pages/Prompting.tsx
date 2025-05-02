import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Check } from "lucide-react";

const Prompting = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-indigo-600">
            Become a Prompt Engineering Expert
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Practice your AI prompting skills with real-time feedback. Write
            better prompts, get better results.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 px-8"
          >
            <Link to="/practice" className="gap-2">
              Start Training Now <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2">Choose a Task</h3>
              <p className="text-gray-600">
                Select from a variety of prompt engineering challenges across
                different difficulty levels.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2">Write Your Prompt</h3>
              <p className="text-gray-600">
                Craft your prompt in the editor with helpful guidance and
                examples available.
              </p>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-sm">
              <div className="bg-purple-100 text-purple-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Get Detailed Feedback
              </h3>
              <p className="text-gray-600">
                Receive AI-powered analysis on your prompt's effectiveness with
                scores and improvement tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Practice Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Practice Prompt Engineering?
          </h2>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="flex gap-4 items-start">
              <div className="bg-green-100 text-green-700 rounded-full p-2 flex-shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Save Time and Resources
                </h3>
                <p className="text-gray-600">
                  Well-crafted prompts get better results with fewer iterations,
                  saving you time and API costs.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-green-100 text-green-700 rounded-full p-2 flex-shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Improve AI Output Quality
                </h3>
                <p className="text-gray-600">
                  Learn to guide AI to produce more relevant, accurate, and
                  useful responses.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="bg-green-100 text-green-700 rounded-full p-2 flex-shrink-0">
                <Check className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold">
                  Develop a Valuable Skill
                </h3>
                <p className="text-gray-600">
                  Prompt engineering is becoming an essential skill in today's
                  AI-driven workplace.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Link to="/practice" className="gap-2">
                Start Your First Challenge <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Prompting;
