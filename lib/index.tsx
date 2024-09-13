import React, { useLayoutEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { calculateMaxFontSize, getTextPoints } from "./utils";
import styles from "./styles.module.css";

interface TextItem {
    text: string;
    textStyle: {
        color: string;
        fontFamily: string;
    };
    maxParticles: number;
}

interface AnimatedTextProps {
    texts: TextItem[];
    activeIndex: number;
}

const AnimatedText: React.FC<AnimatedTextProps> = React.memo(({ texts, activeIndex }) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [, setContainerSize] = useState<{
        width: number;
        height: number;
    } | null>(null);
    const [pointsPerText, setPointsPerText] = useState<any>(null);

    useLayoutEffect(() => {
        if (containerRef.current) {
            const { width, height } = containerRef.current.getBoundingClientRect();
            setContainerSize({ width, height });

            texts.map((text, index: number) => {
                const maxFontSize = calculateMaxFontSize(text.text, text.textStyle.fontFamily, width, height);
                const textPoints = getTextPoints(text.text, text.textStyle.fontFamily, maxFontSize, width, height);
                const currentText = text;
                const maxTotalPoints = currentText.text.replace(/\n/g, "").length * currentText.maxParticles;
                const pointStep = Math.ceil(textPoints.length / maxTotalPoints);
                const limitedPoints = textPoints.filter((_, i) => i % pointStep === 0);

                setPointsPerText((prev: any) => ({
                    ...prev,
                    [index]: limitedPoints,
                }));
            });
        }
    }, [texts]);

    return (
        <div
            ref={containerRef}
            className={styles.particleContainer}
            style={{
                width: "100%",
                height: 200,
                position: "relative",
                margin: "0 auto",
            }}>
            {pointsPerText && (
                <AnimatePresence>
                    {pointsPerText[activeIndex].map((point: any, i: number) => (
                        <Particle key={i} point={point} color={texts[activeIndex].textStyle.color} delay={i * 0.001} />
                    ))}
                </AnimatePresence>
            )}
        </div>
    );
});

const Particle = React.memo(({ point, color, delay }: { point: any; color: string; delay: number }) => (
    <motion.div
        className={styles.particle}
        initial={{ opacity: 0, x: point.x, y: point.y + 50 }}
        animate={{ opacity: 1, x: point.x, y: point.y, backgroundColor: color }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ duration: 0.3, delay }}
    />
));

AnimatedText.displayName = "AnimatedText";
Particle.displayName = "Particle";

export default AnimatedText;
