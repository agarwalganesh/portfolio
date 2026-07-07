import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Trash2, Info, Brain } from "lucide-react";

interface Point {
  x: number; // 0 to 1
  y: number; // 0 to 1
  label: 0 | 1; // 0: Red (Class A), 1: Blue (Class B)
}

const PRESETS: Record<string, Point[]> = {
  separable: [
    { x: 0.2, y: 0.3, label: 0 },
    { x: 0.25, y: 0.2, label: 0 },
    { x: 0.3, y: 0.4, label: 0 },
    { x: 0.35, y: 0.25, label: 0 },
    { x: 0.4, y: 0.45, label: 0 },
    { x: 0.7, y: 0.75, label: 1 },
    { x: 0.75, y: 0.8, label: 1 },
    { x: 0.8, y: 0.7, label: 1 },
    { x: 0.85, y: 0.85, label: 1 },
    { x: 0.9, y: 0.65, label: 1 },
  ],
  moons: [
    { x: 0.25, y: 0.45, label: 0 },
    { x: 0.35, y: 0.35, label: 0 },
    { x: 0.45, y: 0.35, label: 0 },
    { x: 0.55, y: 0.45, label: 0 },
    { x: 0.65, y: 0.6, label: 0 },
    { x: 0.4, y: 0.7, label: 1 },
    { x: 0.5, y: 0.8, label: 1 },
    { x: 0.6, y: 0.8, label: 1 },
    { x: 0.7, y: 0.7, label: 1 },
    { x: 0.8, y: 0.55, label: 1 },
  ],
  circle: [
    { x: 0.5, y: 0.5, label: 0 },
    { x: 0.48, y: 0.52, label: 0 },
    { x: 0.52, y: 0.48, label: 0 },
    { x: 0.5, y: 0.45, label: 0 },
    { x: 0.2, y: 0.2, label: 1 },
    { x: 0.8, y: 0.2, label: 1 },
    { x: 0.2, y: 0.8, label: 1 },
    { x: 0.8, y: 0.8, label: 1 },
    { x: 0.5, y: 0.15, label: 1 },
    { x: 0.5, y: 0.85, label: 1 },
    { x: 0.15, y: 0.5, label: 1 },
    { x: 0.85, y: 0.5, label: 1 },
  ],
};

const MLPlayground = () => {
  const [points, setPoints] = useState<Point[]>(PRESETS.separable);
  const [activeLabel, setActiveLabel] = useState<0 | 1>(0); // 0 = Red, 1 = Blue
  const [algorithm, setAlgorithm] = useState<"knn" | "perceptron" | "stump">("knn");
  const [kValue, setKValue] = useState<number>(3);
  const [weights, setWeights] = useState<number[]>([0.1, -0.2, 0.3]); // bias, w1, w2

  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Run training loop for Perceptron
  const runPerceptronTraining = useCallback(() => {
    setWeights((current) => {
      const newWeights = [...current];
      const lr = 0.1;
      for (let i = 0; i < 50; i++) {
        for (const p of points) {
          const target = p.label === 1 ? 1 : -1;
          const sum = newWeights[0] + newWeights[1] * p.x + newWeights[2] * p.y;
          const pred = sum >= 0 ? 1 : -1;

          if (pred !== target) {
            newWeights[0] += lr * target;
            newWeights[1] += lr * target * p.x;
            newWeights[2] += lr * target * p.y;
          }
        }
      }
      return newWeights;
    });
  }, [points]);

  useEffect(() => {
    if (algorithm === "perceptron") {
      runPerceptronTraining();
    }
  }, [algorithm, runPerceptronTraining]);

  // Render classification boundary map
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear Canvas
    ctx.clearRect(0, 0, width, height);

    // 1. Draw Decision Boundary background grid (resolution 4px blocks)
    const gridSize = 4;
    for (let x = 0; x < width; x += gridSize) {
      for (let y = 0; y < height; y += gridSize) {
        const normX = x / width;
        const normY = y / height;
        let prediction = 0.5; // default neutral

        if (points.length > 0) {
          if (algorithm === "knn") {
            // KNN Classification
            const distances = points.map((p) => {
              const dx = p.x - normX;
              const dy = p.y - normY;
              return { dist: dx * dx + dy * dy, label: p.label };
            });

            distances.sort((a, b) => a.dist - b.dist);
            const nearest = distances.slice(0, Math.min(kValue, distances.length));
            const blueCount = nearest.filter((n) => n.label === 1).length;
            prediction = blueCount / nearest.length;
          } else if (algorithm === "perceptron") {
            // Perceptron boundary
            const score = weights[0] + weights[1] * normX + weights[2] * normY;
            prediction = score >= 0 ? 1 : 0;
          } else if (algorithm === "stump") {
            // Decision Stump (simple split on X or Y axis)
            // Best split X = 0.5 or Y = 0.5 depending on distribution
            const meanX = points.reduce((acc, p) => acc + p.x, 0) / points.length;
            prediction = normX > meanX ? 1 : 0;
          }
        }

        // Color based on prediction
        // Red is prediction closer to 0, Blue is prediction closer to 1
        const r = Math.floor((1 - prediction) * 60 + 10);
        const g = Math.floor(10);
        const b = Math.floor(prediction * 60 + 10);

        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fillRect(x, y, gridSize, gridSize);
      }
    }

    // 2. Draw Points
    points.forEach((p) => {
      const cx = p.x * width;
      const cy = p.y * height;

      // Outer glow rings
      ctx.beginPath();
      ctx.arc(cx, cy, 10, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 0 ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)";
      ctx.fill();

      // Main point circle
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 0 ? "rgb(239, 68, 68)" : "rgb(59, 130, 246)";
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 1.5;
      ctx.fill();
      ctx.stroke();
    });

  }, [points, algorithm, kValue, weights]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    setPoints([...points, { x, y, label: activeLabel }]);
  };

  const loadPreset = (presetName: string) => {
    setPoints(PRESETS[presetName] || []);
    if (algorithm === "perceptron") {
      setWeights([0.1, -0.2, 0.3]);
    }
  };

  const clearCanvas = () => {
    setPoints([]);
  };

  return (
    <section id="ml-playground" className="py-24 relative overflow-hidden bg-background">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">
            ML <span className="text-gradient">Playground</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interact with core machine learning classification models. Draw points on the canvas to see decision boundaries update instantly in real time.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Controls Box */}
          <div className="lg:col-span-1 glass p-6 rounded-2xl border border-primary/20 flex flex-col gap-6">
            <div>
              <h3 className="text-lg font-semibold flex items-center gap-2 mb-2">
                <Brain className="w-5 h-5 text-primary" /> Configuration
              </h3>
              <p className="text-xs text-muted-foreground">Select drawing class, presets, or algorithm controls.</p>
            </div>

            {/* Class Selector */}
            <div>
              <label className="text-sm font-medium block mb-2 text-muted-foreground">Drawing Target Class</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setActiveLabel(0)}
                  className={`flex-1 py-2 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeLabel === 0
                      ? "bg-red-500/20 text-red-400 border-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.2)]"
                      : "bg-secondary/40 text-muted-foreground border-transparent"
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-red-500 inline-block" />
                  Class A (Red)
                </button>
                <button
                  onClick={() => setActiveLabel(1)}
                  className={`flex-1 py-2 px-4 rounded-xl border text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                    activeLabel === 1
                      ? "bg-blue-500/20 text-blue-400 border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.2)]"
                      : "bg-secondary/40 text-muted-foreground border-transparent"
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full bg-blue-500 inline-block" />
                  Class B (Blue)
                </button>
              </div>
            </div>

            {/* Algorithm Selector */}
            <div>
              <label className="text-sm font-medium block mb-2 text-muted-foreground">Classifier Model</label>
              <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value as "knn" | "perceptron" | "stump")}
                className="w-full bg-secondary text-foreground text-sm border-none rounded-xl px-4 py-2.5 focus:ring-1 focus:ring-primary focus:outline-none"
              >
                <option value="knn">K-Nearest Neighbors (KNN)</option>
                <option value="perceptron">Perceptron Classifier</option>
                <option value="stump">Decision Stump Splitter</option>
              </select>
            </div>

            {/* Dynamic Controls based on algorithm */}
            {algorithm === "knn" && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                <label className="text-sm font-medium flex justify-between mb-2 text-muted-foreground">
                  <span>Number of Neighbors (K)</span>
                  <span className="text-primary font-bold">{kValue}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="9"
                  step="2"
                  value={kValue}
                  onChange={(e) => setKValue(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
                />
              </motion.div>
            )}

            {algorithm === "perceptron" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={runPerceptronTraining}
                  className="w-full py-2 bg-primary text-primary-foreground font-semibold rounded-xl text-sm flex items-center justify-center gap-2 hover:bg-primary/95 transition-all"
                >
                  <Play className="w-4 h-4" /> Train Model Epochs
                </button>
                <div className="p-3 bg-secondary/30 rounded-xl border border-primary/5 text-xs font-mono space-y-1">
                  <div className="text-muted-foreground font-semibold mb-1">Model Parameters:</div>
                  <div>Bias (w0) : {weights[0].toFixed(3)}</div>
                  <div>W1 (x-axis): {weights[1].toFixed(3)}</div>
                  <div>W2 (y-axis): {weights[2].toFixed(3)}</div>
                </div>
              </motion.div>
            )}

            {/* Presets */}
            <div>
              <label className="text-sm font-medium block mb-2 text-muted-foreground">Configuration Presets</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => loadPreset("separable")}
                  className="text-xs bg-secondary/50 hover:bg-primary/20 px-3 py-1.5 rounded-full border border-primary/5"
                >
                  Line Separable
                </button>
                <button
                  onClick={() => loadPreset("moons")}
                  className="text-xs bg-secondary/50 hover:bg-primary/20 px-3 py-1.5 rounded-full border border-primary/5"
                >
                  Interlocking Moons
                </button>
                <button
                  onClick={() => loadPreset("circle")}
                  className="text-xs bg-secondary/50 hover:bg-primary/20 px-3 py-1.5 rounded-full border border-primary/5"
                >
                  Concentric Rings
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-auto pt-4 border-t border-primary/10 flex gap-4">
              <button
                onClick={clearCanvas}
                className="flex-1 py-2 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <Trash2 className="w-4 h-4" /> Clear canvas
              </button>
              <button
                onClick={() => setPoints(PRESETS.separable)}
                className="flex-1 py-2 border border-primary/30 text-primary hover:bg-primary/10 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>
            </div>
          </div>

          {/* Interactive Canvas Box */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="relative w-full aspect-square max-w-[450px] sm:max-w-[500px] border border-primary/20 rounded-2xl overflow-hidden shadow-2xl glass p-1 select-none cursor-crosshair">
              <canvas
                ref={canvasRef}
                width={500}
                height={500}
                onClick={handleCanvasClick}
                className="w-full h-full rounded-xl bg-[#080d0a]"
              />
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-4">
              <Info className="w-3.5 h-3.5 text-primary" />
              <span>Click on the dark panel grid above to add points. Real-time inference renders in background contours.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MLPlayground;
