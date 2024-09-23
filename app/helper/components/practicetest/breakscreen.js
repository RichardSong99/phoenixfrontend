import React, { useState, useEffect, useContext } from 'react';
import { Button } from '@nextui-org/button';
import { TestContext } from '@/app/study/activetest/activetestcontext';

export const BreakScreen = () => {
    const {
        handleNextTestStage,
    } = useContext(TestContext);

    const [timeLeft, setTimeLeft] = useState(600);

    useEffect(() => {
        if (timeLeft <= 0) {
            onNext();
            return;
        }

        const timerId = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timerId); // Clean up on unmount
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-row items-center gap-5 w-full h-full bg-appleGray1 text-white justify-center">
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5">
                <div className="flex flex-col items-center gap-5 p-5 box-border">
                    <div style={{ color: "white", fontWeight: "600", fontSize: "14px" }}> Remaining Break Time:</div>
                    <div style={{ color: "white", fontWeight: "700", fontSize: "40px" }}> {minutes}:{seconds < 10 ? '0' : ''}{seconds} </div>
                    <Button onClick={handleNextTestStage} className='rounded-[25px] w-[150px] bg-appleBlue text-white'>Resume Test</Button>
                </div>
                <div className="flex flex-col gap-5 p-5 box-border w-[500px]">
                    <div>You can resume this practice test as soon as you&apos;re ready to move on.</div>

                </div>
            </div>
        </div>
    );
}