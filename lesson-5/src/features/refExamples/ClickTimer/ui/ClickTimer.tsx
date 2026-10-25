import { Button, Card } from "@shared/ui";
import { useRef, useState } from "react";
import type { ClickData } from "../model/types";
import styles from "./ClickTimer.module.css";
import {
    clickCounterLabel,
    clickTimerCardTitle,
    emptyListMessageText,
    updateScreenBtn,
    updateTimeBtn
} from "./constants";
import { afterLabel, beforeLabel, diffLabel } from "@/shared/constants";

export const ClickTimer = () => {
    const prevCountRef = useRef<ClickData>({
        startTime: undefined,
        clickCount: 0,
        timeList: [],
    });

    const handleIncrement = () => {
        const previous = prevCountRef.current.startTime;
        const next = Date.now();

        prevCountRef.current.clickCount += 1;
        if (prevCountRef.current
            && !prevCountRef.current.startTime) {
            prevCountRef.current.startTime = next;
        }

        const diff = previous ? next - previous : next;
        console.log(`${clickCounterLabel}: ${prevCountRef.current.clickCount}`);
        console.log(`${beforeLabel}: ${previous}, ${afterLabel}: ${next}, ${diffLabel}: +${diff}`);

        // Вычисляем разницу в секундах (c округлением вниз)
        const firstTime = previous
            ? new Date(Number(previous)).toLocaleTimeString()
            : previous;
        const lastTime = new Date(Number(next)).toLocaleTimeString();
        const diffInSecond = previous
            ? Math.floor((next - Number(previous)) / 1000)
            : Math.floor(((next)) / 1000);
        console.log(`${beforeLabel}: ${firstTime}, ${afterLabel}: ${lastTime}, ${diffLabel}: +${diffInSecond} (сек.)`);
        console.log("--------------------------------------");
        prevCountRef.current.timeList.push(lastTime);
    };

    const [, forceUpdate] = useState({});
    const handleForceUpdate = () => {
        forceUpdate({});
    };

    return (
        <Card title={clickTimerCardTitle}>

            <div className={styles.controls}>
                <Button onClick={handleIncrement} variant="primary">
                    {updateTimeBtn}
                </Button>
                <div className={styles.renderBadge}>{prevCountRef.current.clickCount}
                </div>
                <Button onClick={handleForceUpdate} variant="secondary">
                    {updateScreenBtn}
                </Button>
            </div>
            <div>{prevCountRef
                && prevCountRef.current
                && prevCountRef.current.timeList
                && prevCountRef.current.timeList.length
                ? prevCountRef.current.timeList?.map((elem: string, index) => {
                    return <div className={styles.timestamp}>{`${index + 1}) ${elem}`}</div>
                })
                : `${emptyListMessageText} "${updateScreenBtn}"`}</div>

        </Card>
    );
};
