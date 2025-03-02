import { ModeToggle } from "@/components/ui/mode-toggle";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="p-2">
      <h3 className="text-primary">Welcome!</h3>
      <ModeToggle />
    </div>
  );
}
