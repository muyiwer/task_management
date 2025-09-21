// TODO: Create the TaskForm component
// Requirements:
// - Form fields: title (required), description (optional), priority dropdown, due date
// - Form validation with error messages
// - Handle form submission
// - Clear form after successful submission
// - Use controlled components

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

interface TaskFormProps {
  onSubmit: (task: {
    title: string;
    description?: string;
    priority: "High" | "Medium" | "Low";
    dueDate?: string;
    completed: boolean;
  }) => void;
  onCancel?: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ onSubmit, onCancel }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const [dueDate, setDueDate] = useState("");
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: string[] = [];
    if (!title.trim()) errs.push("Title is required.");
    if (title.length > 100) errs.push("Title cannot exceed 100 characters.");
    if (description.length > 500)
      errs.push("Description cannot exceed 500 characters.");
    if (errs.length) return setErrors(errs);

    onSubmit({ title, description, priority, dueDate, completed: false });
    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setErrors([]);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add New Task</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {errors.length > 0 && (
            <div className="text-destructive text-sm space-y-1">
              {errors.map((err, idx) => (
                <p key={idx}>• {err}</p>
              ))}
            </div>
          )}
          <Input
            placeholder="Task title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {/* Priority using Radix Select */}
          <Select
            value={priority}
            onValueChange={(v) => setPriority(v as "High" | "Medium" | "Low")}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem>
              <SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>

          <Input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <div className="flex gap-2">
            <Button type="submit">Add Task</Button>
            {onCancel && (
              <Button type="button" variant="secondary" onClick={onCancel}>
                Cancel
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
