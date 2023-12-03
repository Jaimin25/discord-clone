import { ModeToggle } from "@/components/mode_toggle";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <UserButton afterSignOutUrl="/" />
            <ModeToggle />
        </div>
    );
}
