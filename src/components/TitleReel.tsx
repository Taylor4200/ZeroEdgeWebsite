'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion';

const FINAL_TEXT = 'ZeroEdgeStudios';

type Src = { id: string; ch: string };
type Pick = { srcId: string; from: string; isGhost: boolean };

export default function TitleReel({
  className = '',
  tagline = 'Designing unique stories to seize every edge',
  holdTaglineMs = 900,
  explodeSec = 1.1,
  hoverMs = 700,
  stepMs = 120,
  landSec = 0.55,
  fadeSpeed = 0.3, // How quickly unused letters fade (0.1 = very fast, 1.0 = slow)
}: {
  className?: string;
  tagline?: string;
  holdTaglineMs?: number;
  explodeSec?: number;
  hoverMs?: number;
  stepMs?: number;
  landSec?: number;
  fadeSpeed?: number;
}) {
  const reduced = useReducedMotion();

  type Phase = 'tagline' | 'explode' | 'hover' | 'recall' | 'done';
  const [phase, setPhase] = useState<Phase>('tagline');
  const [recallIndex, setRecallIndex] = useState(-1);
  const [hasPlayed, setHasPlayed] = useState(false);
  const hasPlayedRef = useRef(false);

  // Check if animation has already played this session
  useEffect(() => {
    // const hasPlayedBefore = sessionStorage.getItem('titleReelPlayed');
    // if (hasPlayedBefore) {
    //   setHasPlayed(true);
    //   setPhase('done');
    //   hasPlayedRef.current = true;
    // }
  }, []);

  const words = useMemo(() => tagline.split(/(\s+)/), [tagline]);
  const sourceLetters: Src[] = useMemo(() => {
    let i = 0;
    return tagline.split('').map((ch) => ({ id: `src-${i++}`, ch }));
  }, [tagline]);

  const explodeVectors = useMemo(() => {
    const rnd = (a: number, b: number) => Math.random() * (b - a) + a;
    // Calculate safe zone - ensure scattered text stays above the ZeroEdgeStudios typing area
    // The ZeroEdgeStudios text is positioned at center, so we need to stay well above it
    const safeZoneTop = -300; // Minimum Y position to stay above the typing area
    const safeZoneBottom = -150; // Maximum Y position (closer to top)
    
    return Object.fromEntries(
      sourceLetters.map(({ id }) => [
        id,
        {
          x: Math.round(rnd(-200, 200)),
          y: Math.round(rnd(safeZoneTop, safeZoneBottom)), // Stay within safe zone
          r: Math.round(rnd(-90, 90)),
          s: rnd(0.75, 1.35),
        },
      ])
    ) as Record<string, { x: number; y: number; r: number; s: number }>;
  }, [sourceLetters]);

  // Memoize hover positions to ensure they're static (and pixel-snapped)
  const hoverPositions = useMemo(() => {
    return Object.fromEntries(
      sourceLetters.map(({ id }) => [
        id,
        {
          x: Math.round(explodeVectors[id].x),
          y: Math.round(explodeVectors[id].y),
          rotateZ: Math.round(explodeVectors[id].r),
          scale: 1,
        },
      ])
    ) as Record<string, { x: number; y: number; rotateZ: number; scale: number }>;
  }, [explodeVectors, sourceLetters]);

  const picks: Pick[] = useMemo(() => {
    const tgt = FINAL_TEXT.toLowerCase();
    const src = sourceLetters.map((s) => ({ ...s, low: s.ch.toLowerCase() }));
    const used = new Set<string>();
    const out: Pick[] = [];
    for (const t of tgt) {
      const hit = src.find((s) => !used.has(s.id) && s.low === t);
      if (hit) {
        used.add(hit.id);
        out.push({ srcId: hit.id, from: hit.ch, isGhost: false });
      } else {
        out.push({ srcId: `ghost-${t}-${Math.random().toString(36).slice(2)}`, from: t.toUpperCase(), isGhost: true });
      }
    }
    return out;
  }, [sourceLetters]);

  const neededIds = useMemo(() => new Set(picks.filter((p) => !p.isGhost).map((p) => p.srcId)), [picks]);
  const srcToTargetIdx = useMemo(() => {
    const m = new Map<string, number>();
    picks.forEach((p, i) => { if (!p.isGhost) m.set(p.srcId, i); });
    return m;
  }, [picks]);

  useEffect(() => {
    if (phase !== 'tagline' || hasPlayedRef.current) return;
    const t = setTimeout(() => setPhase('explode'), holdTaglineMs);
    return () => clearTimeout(t);
  }, [phase, holdTaglineMs]);

  useEffect(() => {
    if (phase !== 'explode' || hasPlayedRef.current) return;
    const t = setTimeout(() => setPhase('hover'), explodeSec * 1000);
    return () => clearTimeout(t);
  }, [phase, explodeSec]);

  useEffect(() => {
    if (phase !== 'hover' || hasPlayedRef.current) return;
    const t = setTimeout(() => setPhase('recall'), hoverMs);
    return () => clearTimeout(t);
  }, [phase, hoverMs]);

  const typingIntervalRef = useRef<number | null>(null);
  useEffect(() => {
    if (phase !== 'recall' || hasPlayedRef.current) return;
    setRecallIndex(-1);
    let i = -1;
    typingIntervalRef.current = window.setInterval(() => {
      i += 1;
      setRecallIndex(i);
      if (i >= FINAL_TEXT.length - 1) {
        if (typingIntervalRef.current) {
          clearInterval(typingIntervalRef.current);
          typingIntervalRef.current = null;
        }
        const fin = window.setTimeout(() => {
          setPhase('done');
          // Mark as played in sessionStorage
          // sessionStorage.setItem('titleReelPlayed', 'true');
          // hasPlayedRef.current = true;
        }, landSec * 1000 + 150);
        return () => clearTimeout(fin);
      }
    }, stepMs);
    return () => {
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
        typingIntervalRef.current = null;
      }
    };
  }, [phase, stepMs, landSec]);

  const fadeProgress = Math.min(1, Math.max(0, (recallIndex + 1) / FINAL_TEXT.length));

  // Early return after all hooks are called
  if (reduced || hasPlayedRef.current) {
    return (
      <div className={`flex justify-center text-[clamp(36px,8vw,104px)] font-extrabold leading-none text-white ${className}`} aria-label={FINAL_TEXT}>
        <span style={{ filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.25))' }}>
          <span className="block">ZeroEdge</span>
          <span className="block -mt-2">Studios</span>
        </span>
      </div>
    );
  }

  return (
    <LayoutGroup>
      {/* Sizer to reserve height and prevent layout shift during phase changes */}
      <div className={`relative w-full ${className}`}>
        <div
          aria-hidden
          className="opacity-0 pointer-events-none select-none flex justify-center"
        >
          <div className="text-[clamp(36px,8vw,104px)] font-extrabold leading-none">
            <span className="block">ZeroEdge</span>
            <span className="block -mt-2">Studios</span>
          </div>
        </div>

        {/* Overlay the animated content to keep container height constant */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="pointer-events-none relative w-full h-full">
            {/* Tagline/scatter layer — always centered, independent of final title */}
            <div className="absolute inset-0 grid place-items-center">
              {phase !== 'done' && (
                <motion.div
                  className="flex flex-wrap justify-center text-5xl font-semibold tracking-[0.01em] text-[color:var(--muted)] whitespace-pre-wrap leading-none -translate-y-4"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {(() => {
                    let letterIndex = 0;
                    return words.map((chunk, wi) => {
                      if (/\s+/.test(chunk)) {
                        return <span key={`space-${wi}`} style={{ whiteSpace: 'pre' }}>{chunk}</span>;
                      }
                      const letters = chunk.split('').map((ch) => {
                        const id = `src-${letterIndex++}`;
                        const vec = explodeVectors[id];
                        const isNeeded = neededIds.has(id);
                        const tgtIdx = srcToTargetIdx.get(id) ?? -1;
                        const handedOff = phase === 'recall' && tgtIdx >= 0 && recallIndex >= tgtIdx;
                        const willHandoffNow = phase === 'recall' && tgtIdx >= 0 && recallIndex === tgtIdx;

                        let anim: any = {};
                        let opacity = 1;

                        if (phase === 'explode') {
                          anim = { x: vec.x, y: vec.y, rotateZ: vec.r, scale: 1 };
                        } else if (phase === 'hover') {
                          anim = hoverPositions[id];
                          opacity = isNeeded ? 1 : 0.95;
                        } else if (phase === 'recall') {
                          // Use exact same position as hover - NO MOVEMENT
                          anim = hoverPositions[id];
                          if (!isNeeded) {
                            // Unused letters fade away smoothly with easing
                            const fadeAmount = Math.min(1, fadeProgress / fadeSpeed);
                            opacity = Math.max(0, 1 - (fadeAmount * fadeAmount)); // Quadratic easing for smoother fade
                          } else if (handedOff) {
                            // fade out only; do not scale to avoid pixel shift
                            anim = hoverPositions[id];
                            opacity = 0;
                          } else {
                            // Needed letters stay prominent
                            opacity = 1;
                          }
                          
                          // Additional safety: if letter is too close to typing area, fade it out faster
                          if (hoverPositions[id]?.y > -200) {
                            opacity = Math.min(opacity, 0.3);
                          }
                        }

                        return (
                          <motion.span
                            key={id}
                            className="inline-block will-change-transform"
                            animate={{ ...anim, opacity }}
                            transition={{
                              duration: phase === 'explode' ? explodeSec : 0.3,
                              ease: [0.25, 0.1, 0.25, 1],
                            }}
                            style={{ color: 'inherit' }}
                          >
                            {ch}
                          </motion.span>
                        );
                      });
                      return <span key={`word-${wi}`} className="inline-flex">{letters}</span>;
                    });
                  })()}
                </motion.div>
              )}
            </div>

            {/* Final title layer — independently centered above */}
            {(phase === 'recall' || phase === 'done') && (
              <div className="absolute inset-0 grid place-items-center z-10">
                <motion.div
                  className={"flex flex-col justify-center text-[clamp(36px,8vw,104px)] font-extrabold leading-none text-white"}
                  aria-label={FINAL_TEXT}
                >
                  <div className="flex justify-center">
                    {FINAL_TEXT.split('').slice(0, 8).map((char, i) => {
                      if (!char) return null;
                      const pick = picks[i];
                      const active = recallIndex >= i || phase === 'done';
                      const layoutId = pick?.isGhost ? undefined : pick?.srcId;

                      return (
                        <span key={`slot-${i}`} className="inline-block">
                          {active ? (
                            <motion.span
                              layoutId={layoutId}
                              initial={
                                pick?.isGhost
                                  ? { opacity: 0, y: -160, scale: 1.06, rotateX: 90 }
                                  : { opacity: 1, rotateX: 90 }
                              }
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                rotateX: 0,
                                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.25))',
                              }}
                              transition={{
                                type: 'spring', stiffness: 520, damping: 32, mass: 0.7,
                                duration: phase === 'done' ? 0 : landSec,
                              }}
                              style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
                            >
                              {FINAL_TEXT[i]}
                            </motion.span>
                          ) : (
                            <span style={{ visibility: 'hidden' }}>{FINAL_TEXT[i]}</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                  <div className="flex justify-center -mt-2">
                    {FINAL_TEXT.split('').slice(8).map((char, i) => {
                      if (!char) return null;
                      const actualIndex = i + 8;
                      const pick = picks[actualIndex];
                      const active = recallIndex >= actualIndex || phase === 'done';
                      const layoutId = pick?.isGhost ? undefined : pick?.srcId;

                      return (
                        <span key={`slot-${actualIndex}`} className="inline-block">
                          {active ? (
                            <motion.span
                              layoutId={layoutId}
                              initial={
                                pick?.isGhost
                                  ? { opacity: 0, y: -160, scale: 1.06, rotateX: 90 }
                                  : { opacity: 1, rotateX: 90 }
                              }
                              animate={{
                                opacity: 1,
                                y: 0,
                                scale: 1,
                                rotateX: 0,
                                filter: 'drop-shadow(0 0 10px rgba(255,255,255,0.25))',
                              }}
                              transition={{
                                type: 'spring', stiffness: 520, damping: 32, mass: 0.7,
                                duration: phase === 'done' ? 0 : landSec,
                              }}
                              style={{ transformStyle: 'preserve-3d', display: 'inline-block' }}
                            >
                              {FINAL_TEXT[actualIndex]}
                            </motion.span>
                          ) : (
                            <span style={{ visibility: 'hidden' }}>{FINAL_TEXT[actualIndex]}</span>
                          )}
                        </span>
                      );
                    })}
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </LayoutGroup>
  );
}
