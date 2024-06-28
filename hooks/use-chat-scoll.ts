import { use, useEffect, useState } from 'react';
type ChatScollProps = {
    chatRef: React.RefObject<HTMLDivElement>;
    bottomRef: React.RefObject<HTMLDivElement>;
    shoudldLoadMore: boolean;
    loadMore: () => void;
    count: number;
}

export const useChatScoll =  ({
    chatRef,
    bottomRef,
    shoudldLoadMore,
    loadMore,
    count
}: ChatScollProps) => {
    const [hasInitialized, setHasInitialized] = useState(false);

    useEffect(() => {
        const topDiv = chatRef?.current;

        const handleScroll = () => {
            const scollTop = topDiv?.scrollTop;
            
            if(scollTop === 0 && shoudldLoadMore) {
                loadMore();
            }

            topDiv?.addEventListener('scroll', handleScroll);

            return () => {
                topDiv?.removeEventListener('scroll', handleScroll);
            }
        }
    }, [shoudldLoadMore, loadMore, chatRef])

    useEffect(() => {
        const bottomDiv = bottomRef?.current;
        const topDiv = chatRef?.current;

        const shoudlAutoScoll = () => {
            if(!hasInitialized && bottomDiv) {
                setHasInitialized(true);
                return true;
            }

            if(!topDiv) {
                return false;
            }

            const distanceFromBottom = topDiv.scrollHeight - topDiv.scrollTop - topDiv.clientHeight;

            return distanceFromBottom <= 100;
        }

        if(shoudlAutoScoll()) {
            setTimeout(() => {
                bottomRef?.current?.scrollIntoView({ behavior: 'smooth' });
            }, 100)
        }
    }, [bottomRef, chatRef, count, hasInitialized])
}
