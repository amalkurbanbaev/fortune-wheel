import { useRef, useState } from "react";

import { animated, useSpring } from "@react-spring/konva";
import Konva from "konva";
import { Arc, Layer, RegularPolygon, Stage, Text } from "react-konva";

import { cn } from "@/lib/utils";
import { type Prize } from "@/mocks";

import { Button } from "../ui/button";

interface WheelOfFortuneProps {
  prizes: Prize[];
}

const config = {
  mass: 2, // Масса влияет на ускорение и замедление анимации
  tension: 420, // Сила натяжения пружины. Чем выше значение, тем быстрее пружина возвращается в положение покоя.
  friction: 320, // Сила трения. Чем выше значение, тем быстрее пружина останавливается.
  clamp: false, // Если true, анимация завершится, как только достигнет целевого значения.
  precision: 0.5, // Точность остановки анимации.
};

export function WheelOfFortune({ prizes }: WheelOfFortuneProps) {
  const [isLoading, setIsLoading] = useState(false);

  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0); // Начальное положение
  const [finalRotation, setFinalRotation] = useState(0); // Финальное вращение
  const [idx, setIdx] = useState<number | null>(null);

  const segments = prizes.length;
  const anglePerSegment = 360 / segments;

  const [springProps, api] = useSpring(() => ({
    rotation: currentRotation,
    onStart: () => {
      setIsSpinning(true);
    },
    config,
    onRest: () => {
      setIsSpinning(false);
      // Обновляем текущее вращение после завершения анимации
      setCurrentRotation((currentRotation + finalRotation) % 360);
    },
  }));

  const handleSpin = () => {
    if (isSpinning) return;

    setIsLoading(true);

    mockApiCall().then((res) => {
      const sectorIndex = res - 1;
      setIdx(sectorIndex);
      setIsLoading(false);

      const targetAngle = sectorIndex * anglePerSegment;

      const offset = -(anglePerSegment / 2);

      const newFinalRotation = 360 * 4 + (offset - targetAngle);

      setFinalRotation(newFinalRotation);

      api.start({
        from: { rotation: currentRotation },
        to: { rotation: currentRotation + newFinalRotation },
        reset: true,
      });
    });
  };

  return (
    <div className="relative size-[400px]">
      <div className="absolute right-0 top-0">
        {idx !== null && (
          <>
            idx = {idx}, id = {idx + 1}
          </>
        )}
      </div>
      <Stage
        width={400}
        height={400}
        className={cn("transition-all", isLoading ? "scale-95 animate-pulse" : "scale-100")}
      >
        <Layer>
          <animated.Group ref={wheelRef} x={200} y={200} rotation={springProps.rotation}>
            {prizes.map((prize, index) => {
              const startAngle = anglePerSegment * index - 90;
              return (
                <Arc
                  key={prize.id}
                  innerRadius={0}
                  outerRadius={200}
                  angle={anglePerSegment}
                  rotation={startAngle}
                  fill={prize.color}
                  stroke="black"
                  strokeWidth={2}
                />
              );
            })}
            {prizes.map((prize, index) => {
              const angle = anglePerSegment * index + anglePerSegment / 2 - 90;
              const radians = Konva.getAngle(angle);
              const x = Math.cos(radians) * 150;
              const y = Math.sin(radians) * 150;

              return (
                <Text
                  key={prize.id}
                  x={x}
                  y={y}
                  text={prize.name}
                  fontSize={16}
                  fill="black"
                  align="center"
                  verticalAlign="middle"
                  offsetX={15}
                  offsetY={0}
                  rotation={angle + 90}
                />
              );
            })}
          </animated.Group>
          <RegularPolygon
            x={200}
            y={0}
            sides={3}
            radius={20}
            fill="red"
            stroke="black"
            strokeWidth={2}
            shadowColor="white"
            shadowEnabled
            shadowOffsetY={1}
            shadowBlur={5}
            rotation={180}
          />
        </Layer>
      </Stage>

      <Button
        style={{
          position: "absolute",
          bottom: "-20%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={handleSpin}
        disabled={isSpinning}
      >
        Spin
      </Button>
    </div>
  );
}

const mockApiCall = async (): Promise<number> => {
  return new Promise<number>((resolve) => {
    setTimeout(() => {
      const randomNumber = Math.floor(Math.random() * 6) + 1;
      resolve(randomNumber);
    }, 30); // Эмулируем задержку в 1 секунду
  });
};
