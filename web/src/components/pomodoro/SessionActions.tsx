import React from "react";
import { Button } from "../ui/button";
import { Pause, Play, Square } from "lucide-react";

type SessionActionsProps = {
    isStart: boolean;
    isPause: boolean;
    onStart: () => void;
    onPause: () => void;
    onAbort: () => void;
};

export function SessionActions({
    isStart,
    isPause,
    onStart,
    onPause,
    onAbort,
}: SessionActionsProps) {
    return (
        <div className="mb-10 w-full flex justify-center">
            {isStart ? (
                <div className="flex flex-row gap-4 sm:gap-6 md:gap-10 w-fit">
                    <Button className="w-auto" onClick={onPause}>
                        {isPause ? <Pause /> : <Play />}
                        PAUSE
                    </Button>
                    <Button className="w-auto" onClick={onAbort}>
                        <Square />
                        STOP
                    </Button>
                </div>
            ) : (
                <Button className="w-auto px-10" onClick={onStart}>
                    START
                </Button>
            )}
        </div>
    );
}