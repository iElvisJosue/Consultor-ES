import { useState } from "react";

export default function useSteps() {
  const [step, setStep] = useState("One");
  const changeStep = (e, step) => {
    e.preventDefault();
    setStep(step);
  };

  let progressWidth;

  if (step === "One") {
    progressWidth = "25%";
  }
  if (step === "Two") {
    progressWidth = "50%";
  }
  if (step === "Three") {
    progressWidth = "75%";
  }
  if (step === "Four") {
    progressWidth = "100%";
  }

  const classStep = `Main__Profile__Form--Steps ${step}`;

  return {
    progressWidth,
    classStep,
    changeStep,
  };
}
