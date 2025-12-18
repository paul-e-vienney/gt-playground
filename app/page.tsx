import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia, EmptyContent } from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { GitPullRequestIcon, PlusIcon } from "lucide-react"

export default function Page() {
  return (
    <div className="flex items-center justify-center flex-1 w-full">
      <Empty className="-mt-16">
        <EmptyMedia variant="icon">
          <GitPullRequestIcon />
        </EmptyMedia>
        <EmptyHeader>
          <EmptyTitle>Your PR inbox is empty</EmptyTitle>
          <EmptyDescription>
            Create a pull request to get started and see it appear here.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button>
            <PlusIcon />
            Create PR
          </Button>
        </EmptyContent>
      </Empty>
    </div>
  );
}