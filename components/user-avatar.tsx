import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface UserAvatarProps {
    onClick?: () => void;
    src?: string;
    className?: string
}

const UserAvatar = ({
    onClick,
    src,
    className
} : UserAvatarProps) => {
    return (
        <Avatar 
            className={cn(
            "h-7 w-7 md:h-10 md:w-10",
            className)}
        >
            <AvatarImage src={src} onClick={onClick}/>
        </Avatar>
    );
}

export default UserAvatar;
