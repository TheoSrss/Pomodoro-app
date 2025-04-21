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
    onAbort
}: SessionActionsProps
) {

    return (
        <div className="flex flex-row gap-10 my-20">
            {isStart ? (
                <>
                    <Button onClick={onPause}>PAUSE</Button>
                    <Button onClick={onAbort}>ANNULER</Button>
                </>
            )
                :
                <Button onClick={onStart}>START</Button>
            }
        </div>)
}