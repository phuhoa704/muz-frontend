import React, { ComponentProps } from "react";
import Tilt from "react-parallax-tilt";
import { cn } from "../../../lib/utils";

type Color = "blue" | "green" | "orange" | "red" | "yellow";

interface Props extends Omit<ComponentProps<"div">, "title"> {
    color?: Color;
    icon?: React.ReactNode;
    title: React.ReactNode;
    value?: React.ReactNode;
}

export const PatternCard: React.FC<Props> = ({
    title,
    color,
    icon,
    value,
    className,
    ...props
}) => {
    return (
        <Tilt
            className={cn("h-full", className)}
            tiltReverse
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            style={{
                filter: "drop-shadow(4px 4px 6.8px #0264E852)"
            }}
        >
            <div className={cn(
                "relative flex h-full flex-col rounded-[20px] bg-card p-4 text-white"
            )}
                {...props}
            >
                
            </div>
        </Tilt>
    )
}
