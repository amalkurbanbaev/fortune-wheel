/* eslint-disable @typescript-eslint/ban-ts-comment -- known issue, https://github.com/pmndrs/react-spring/issues/1784  */
import { useCallback, useEffect, useRef, useState } from "react";

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
  mass: 22, // Масса влияет на ускорение и замедление анимации
  tension: 120, // Сила натяжения пружины. Чем выше значение, тем быстрее пружина возвращается в положение покоя.
  friction: 110, // Сила трения. Чем выше значение, тем быстрее пружина останавливается.
  clamp: false, // Если true, анимация завершится, как только достигнет целевого значения.
  precision: 0.5, // Точность остановки анимации.
};

export function WheelOfFortune({ prizes }: WheelOfFortuneProps) {
  const [isLoading, setIsLoading] = useState(false);
  const wheelRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [currentRotation, setCurrentRotation] = useState(0); // Начальное положение
  const [finalRotation, setFinalRotation] = useState(0); // Финальное вращение

  const [multiplier, setMultiplier] = useState<number | null>(null);
  const [displayedPrize, setDisplayedPrize] = useState<number>(0);
  const segments = prizes.length;
  const anglePerSegment = 360 / segments;

  const idx = useRef<number | null>(null);

  const calculateFinalPrize = useCallback(() => {
    if (idx.current) {
      const basePrize = prizes[idx.current].value; // Предполагается, что у каждого приза есть поле value
      const randomMultiplier = getRandomInt(1, 5);

      const finalAmount = basePrize * randomMultiplier;
      setMultiplier(randomMultiplier > 1 ? randomMultiplier : null);

      animatePrize(finalAmount);
    }
  }, [idx, prizes]);

  // const [idx, setIdx] = useState<number | null>(null);

  const animatePrize = (targetValue: number) => {
    let currentValue = 0;
    const duration = 1000; // Уменьшили продолжительность анимации до 0.5 секунды
    const steps = 20; // Количество шагов анимации
    const stepValue = targetValue / steps;
    const stepTime = duration / steps;

    const step = () => {
      if (currentValue < targetValue) {
        currentValue += stepValue;
        setDisplayedPrize(Math.min(Math.floor(currentValue), targetValue)); // Округляем значение до целого числа и устанавливаем максимум
        setTimeout(step, stepTime);
      }
    };

    step();
  };

  const [springProps, api] = useSpring(() => ({
    rotation: currentRotation,
    onStart: () => {
      setIsSpinning(true);
    },
    config,
    onRest: () => {
      setIsSpinning(false);
      setCurrentRotation((currentRotation + finalRotation) % 360);
      calculateFinalPrize();
    },
  }));

  const handleSpin = () => {
    if (isSpinning) return;

    setIsLoading(true);
    setMultiplier(null);
    setDisplayedPrize(0);

    mockApiCall().then((res) => {
      const sectorIndex = res - 1;
      setIsLoading(false);
      // setIdx(sectorIndex);

      idx.current = sectorIndex;
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

  const [stageSize, setStageSize] = useState({ width: 250, height: 250 });

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth - 128; // Учитываем отступы 16px с каждой стороны
      const size = Math.min(screenWidth, 400); // Максимум 400 пикселей
      setStageSize({ width: size, height: size });
    };

    handleResize(); // Устанавливаем начальный размер
    window.addEventListener("resize", handleResize); // Обновляем при изменении размера экрана

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-4 px-4 pb-6">
      <div className="relative flex w-full grow items-center justify-center">
        <div className="relative rounded-full ring-[30px] ring-orange-500 ring-offset-2 ring-offset-orange-700">
          <Stage
            width={stageSize.width} // Уменьшаем размер колеса
            height={stageSize.height}
            className={cn("transition-all", isLoading ? "scale-95 animate-pulse" : "scale-100")}
          >
            <Layer>
              {/* // eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
              {/* @ts-ignore */}
              <animated.Group
                ref={wheelRef}
                x={stageSize.width / 2}
                y={stageSize.height / 2}
                rotation={springProps.rotation}
                className="hidden"
              >
                {prizes.map((prize, index) => {
                  const startAngle = anglePerSegment * index - 90;

                  const color = index % 2 === 0 ? "rgba(164,116,73)" : "rgba(164,116,73, 0.5)";
                  return (
                    <Arc
                      key={prize.id}
                      innerRadius={20}
                      outerRadius={stageSize.width / 2}
                      angle={anglePerSegment}
                      rotation={startAngle}
                      fill={color}
                      stroke="black"
                      strokeWidth={2}
                    />
                  );
                })}
                {prizes.map((prize, index) => {
                  const angle = anglePerSegment * index + anglePerSegment / 2 - 90;
                  const radians = Konva.getAngle(angle);
                  const x = Math.cos(radians) * (stageSize.width / 2.7);
                  const y = Math.sin(radians) * (stageSize.height / 2.7);

                  const color = index % 2 === 0 ? "black" : "white";

                  return (
                    <Text
                      key={prize.id}
                      x={x}
                      y={y}
                      text={prize.name}
                      fontSize={16}
                      fill={color}
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
                x={stageSize.width / 2}
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
        </div>
      </div>

      {multiplier && (
        <div className="mt-4 text-center animate-in slide-in-from-bottom">
          <h2>Выигрыш умножен на {multiplier}x!</h2>
          <div className="text-4xl font-bold">{displayedPrize}$</div>
        </div>
      )}

      <Button className="h-14 w-full" onClick={handleSpin} disabled={isSpinning}>
        Roll!
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

function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
