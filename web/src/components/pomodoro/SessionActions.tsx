import React from "react";
import { Button } from "../ui/button";

type SessionActionsProps = {
    isStart: boolean;
    onStart: () => void;
    onPause: () => void;
    onAbort: () => void;
};

export function SessionActions({
    isStart,
    onStart,
    onPause,
    onAbort,
}: SessionActionsProps) {
    return (
        <div className="mb-10 w-full flex justify-center">
            {isStart ? (
                <div className="flex flex-row gap-4 sm:gap-6 md:gap-10 w-fit">
                    <Button className="w-auto px-8" onClick={onPause}>
                        PAUSE
                    </Button>
                    <Button className="w-auto px-8" onClick={onAbort}>
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