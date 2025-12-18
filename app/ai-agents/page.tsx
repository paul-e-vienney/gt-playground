"use client"

import {
  PromptInput,
  PromptInputTextarea,
} from "@/components/ui/prompt-input"
import { PromptSuggestion } from "@/components/ui/prompt-suggestion"
import { Button } from "@/components/ui/button"
import { ArrowUpIcon, PaperclipIcon } from "lucide-react"
import { useState } from "react"

export default function AIAgentsPage() {
  const [value, setValue] = useState("")

  const handleSubmit = () => {
    if (value.trim()) {
      console.log("Submitting:", value)
      setValue("")
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    setValue(suggestion)
  }

  return (
    <div className="flex items-center justify-center flex-1 w-full px-4">
      <div className="w-full max-w-2xl -mt-16">
        <h1 className="text-2xl font-semibold mb-6 text-center">Create your first pull request</h1>
        <PromptInput
          value={value}
          onValueChange={setValue}
          onSubmit={handleSubmit}
          className="flex flex-col [&>div]:rounded-2xl"
        >
          <PromptInputTextarea placeholder="Type a message..." />
          <div className="flex items-center justify-end gap-2 mt-2">
            <Button
              size="icon"
              variant="ghost"
              className="rounded-full h-8 w-8 shrink-0"
            >
              <PaperclipIcon className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              className="rounded-full h-8 w-8 shrink-0"
              onClick={handleSubmit}
              disabled={!value.trim()}
            >
              <ArrowUpIcon className="h-4 w-4" />
            </Button>
          </div>
        </PromptInput>
        <div className="flex flex-wrap gap-2 mt-3 justify-center">
          <PromptSuggestion 
            onClick={() => handleSuggestionClick("Create a new AI agent")}
            className="px-6"
          >
            Create a new AI agent
          </PromptSuggestion>
          <PromptSuggestion 
            onClick={() => handleSuggestionClick("Review pull requests")}
            className="px-6"
          >
            Review pull requests
          </PromptSuggestion>
          <PromptSuggestion 
            onClick={() => handleSuggestionClick("Automate code review")}
            className="px-6"
          >
            Automate code review
          </PromptSuggestion>
        </div>
      </div>
    </div>
  );
}

