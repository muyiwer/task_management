// TODO: Create the TaskCard component
// Requirements:
// - Display task title, description, priority, due date
// - Show completion status
// - Include edit and delete buttons
// - Use proper TypeScript types
// - Apply priority color coding
// - Make it responsive

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Edit2, Trash2, CheckCircle, Clock } from "lucide-react";

export type Priority = "High" | "Medium" | "Low";

export interface TaskCardProps {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  completed: boolean;
  dueDate: Date | string;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

// Map each priority level to a tailwind color style
const priorityColors: Record<Priority, string> = {
  High: "bg-red-500 text-white", // 🔴 High = Red
  Medium: "bg-yellow-500 text-black", // 🟡 Medium = Yellow
  Low: "bg-green-500 text-white", // 🟢 Low = Green
};

export const TaskCard: React.FC<TaskCardProps> = ({
  id,
  title,
  description,
  priority,
  completed,
  dueDate,
  onEdit,
  onDelete,
}) => {
  // Format dueDate safely (accepts both Date object and string)
  const formattedDate =
    typeof dueDate === "string"
      ? new Date(dueDate).toLocaleDateString()
      : dueDate.toLocaleDateString();

  return (
    <Card className="flex flex-col justify-between h-full">
      {/* ---------- Header ---------- */}
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          {/* Task Title */}
          <CardTitle className="text-lg font-bold">{title}</CardTitle>

          {/* Priority Badge - styled dynamically from priorityColors map */}
          <span
            className={cn(
              "px-2 py-1 rounded-md text-xs font-medium",
              priorityColors[priority]
            )}
          >
            {priority}
          </span>
        </div>
        {/* Short task description */}
        <CardDescription>{description}</CardDescription>
      </CardHeader>

      {/* ---------- Content ---------- */}
      <CardContent>
        <div className="flex items-center justify-between text-sm">
          {/* Status Section */}
          <div className="flex items-center gap-1">
            {completed ? (
              // ✅ Show checkmark if completed
              <CheckCircle className="text-green-500 w-4 h-4" />
            ) : (
              // ⏳ Show clock if still pending
              <Clock className="text-gray-400 w-4 h-4" />
            )}
            <span className={completed ? "text-green-600" : "text-gray-600"}>
              {completed ? "Completed" : "Pending"}
            </span>
          </div>

          {/* Due date info */}
          <span className="text-muted-foreground">Due: {formattedDate}</span>
        </div>
      </CardContent>

      {/* ---------- Footer ---------- */}
      <CardFooter className="flex justify-end gap-2">
        {/* Edit Button - calls onEdit with task id */}
        <Button variant="secondary" size="sm" onClick={() => onEdit(id)}>
          <Edit2 className="w-4 h-4 mr-1" /> Edit
        </Button>

        {/* Delete Button - calls onDelete with task id */}
        <Button variant="destructive" size="sm" onClick={() => onDelete(id)}>
          <Trash2 className="w-4 h-4 mr-1" /> Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
