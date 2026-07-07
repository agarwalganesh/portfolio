import { useState } from "react";
import { motion } from "framer-motion";
import { ShieldCheck, AlertTriangle, ShieldAlert, Sparkles, Brain, Check } from "lucide-react";

export const CreditRiskDemo = () => {
  const [creditScore, setCreditScore] = useState<number>(650);
  const [income, setIncome] = useState<number>(55000);
  const [debtRatio, setDebtRatio] = useState<number>(35);

  // Compute mock logistic regression risk score
  // Normalize parameters
  const normCredit = (creditScore - 300) / 550; // 0 to 1
  const normIncome = Math.min(income / 150000, 1); // 0 to 1
  const normDebt = debtRatio / 100; // 0 to 1

  // z value
  const z = 2.0 - 5.5 * normCredit - 2.5 * normIncome + 4.5 * normDebt;
  const probability = 1 / (1 + Math.exp(-z));
  const pct = Math.round(probability * 100);

  let riskCategory: "Low" | "Medium" | "High" = "Medium";
  let color = "text-yellow-400";
  let bg = "bg-yellow-500/10 border-yellow-500/20";
  let Icon = AlertTriangle;

  if (pct < 35) {
    riskCategory = "Low";
    color = "text-emerald-400";
    bg = "bg-emerald-500/10 border-emerald-500/20";
    Icon = ShieldCheck;
  } else if (pct > 70) {
    riskCategory = "High";
    color = "text-rose-400";
    bg = "bg-rose-500/10 border-rose-500/20";
    Icon = ShieldAlert;
  }

  return (
    <div className="glass p-5 rounded-xl border border-primary/10 bg-secondary/20 flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-primary/5">
        <h4 className="text-sm font-semibold flex items-center gap-1.5 text-primary">
          <Brain className="w-4 h-4" /> Credit Risk Inference Simulator
        </h4>
        <span className="text-[10px] text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full">XGBoost Model</span>
      </div>

      <div className="space-y-4">
        {/* Credit Score Slider */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Credit Score (FICO)</span>
            <span className="font-semibold">{creditScore}</span>
          </div>
          <input
            type="range"
            min="300"
            max="850"
            value={creditScore}
            onChange={(e) => setCreditScore(parseInt(e.target.value))}
            className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Annual Income Slider */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Annual Income ($)</span>
            <span className="font-semibold">${income.toLocaleString()}</span>
          </div>
          <input
            type="range"
            min="10000"
            max="150000"
            step="5000"
            value={income}
            onChange={(e) => setIncome(parseInt(e.target.value))}
            className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Debt-to-Income Slider */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Debt-to-Income (DTI %)</span>
            <span className="font-semibold">{debtRatio}%</span>
          </div>
          <input
            type="range"
            min="5"
            max="95"
            value={debtRatio}
            onChange={(e) => setDebtRatio(parseInt(e.target.value))}
            className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Output Metric */}
      <div className={`mt-2 p-3.5 rounded-xl border flex items-center justify-between ${bg} transition-all`}>
        <div className="flex items-center gap-2.5">
          <Icon className={`w-5 h-5 ${color} animate-pulse`} />
          <div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Computed Risk Level</div>
            <div className={`text-base font-bold ${color}`}>{riskCategory} Risk</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-[10px] text-muted-foreground">Probability Index</div>
          <div className="text-lg font-mono font-bold text-foreground">{pct}%</div>
        </div>
      </div>
    </div>
  );
};

export const MentalHealthDemo = () => {
  const [studyHours, setStudyHours] = useState<number>(6);
  const [sleepHours, setSleepHours] = useState<number>(7);
  const [screenTime, setScreenTime] = useState<number>(4);

  // Compute overthinking classifications
  // Rules based on input combinations mimicking a Random Forest model
  let overthinkingLevel: "None" | "Moderate" | "High" = "None";
  let color = "text-emerald-400";
  let bg = "bg-emerald-500/10 border-emerald-500/20";
  let tip = "Optimal balance. Keep maintaining healthy routines!";

  const netStress = studyHours * 1.5 + screenTime * 1.2 - sleepHours * 2.0;

  if (netStress > 6) {
    overthinkingLevel = "High";
    color = "text-rose-400";
    bg = "bg-rose-500/10 border-rose-500/20";
    tip = "Warning: High screen/study load relative to sleep. Prioritize rest.";
  } else if (netStress > 1) {
    overthinkingLevel = "Moderate";
    color = "text-yellow-400";
    bg = "bg-yellow-500/10 border-yellow-500/20";
    tip = "Mild imbalance. Try reducing screen time or stepping outside.";
  }

  return (
    <div className="glass p-5 rounded-xl border border-primary/10 bg-secondary/20 flex flex-col gap-4">
      <div className="flex items-center justify-between pb-3 border-b border-primary/5">
        <h4 className="text-sm font-semibold flex items-center gap-1.5 text-primary">
          <Brain className="w-4 h-4" /> Mental Health Classifier Simulator
        </h4>
        <span className="text-[10px] text-muted-foreground bg-primary/10 px-2 py-0.5 rounded-full">RF Classifier</span>
      </div>

      <div className="space-y-4">
        {/* Study Hours */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Study & Work Time (Hrs/day)</span>
            <span className="font-semibold">{studyHours} hrs</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={studyHours}
            onChange={(e) => setStudyHours(parseInt(e.target.value))}
            className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Sleep Hours */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Sleep Duration (Hrs/day)</span>
            <span className="font-semibold">{sleepHours} hrs</span>
          </div>
          <input
            type="range"
            min="2"
            max="12"
            value={sleepHours}
            onChange={(e) => setSleepHours(parseInt(e.target.value))}
            className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>

        {/* Screen Time */}
        <div>
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-muted-foreground">Entertainment Screen Time (Hrs/day)</span>
            <span className="font-semibold">{screenTime} hrs</span>
          </div>
          <input
            type="range"
            min="0"
            max="15"
            value={screenTime}
            onChange={(e) => setScreenTime(parseInt(e.target.value))}
            className="w-full h-1 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
          />
        </div>
      </div>

      {/* Output Metric */}
      <div className={`mt-2 p-3.5 rounded-xl border flex flex-col gap-1.5 ${bg} transition-all`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className={`w-4 h-4 ${color} animate-pulse`} />
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Overthinking Level</span>
          </div>
          <span className={`text-sm font-bold ${color}`}>{overthinkingLevel}</span>
        </div>
        <p className="text-[11px] text-muted-foreground leading-normal">{tip}</p>
      </div>
    </div>
  );
};
