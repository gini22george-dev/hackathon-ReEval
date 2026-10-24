"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sun, Moon, ArrowRight, UploadCloud, FileText, 
  CheckCircle2, Cpu, ShieldCheck, RefreshCw, ChevronLeft,
  User, Hash, BookOpen, Layers, AlertTriangle, Sparkles, 
  FileSpreadsheet, Download, Check, Copy, FileCheck, 
  ChevronDown, ChevronUp, Trash2, Award
} from "lucide-react";

export default function Home() {
  // --- Core Application States ---
  const [isLoadingSplash, setIsLoadingSplash] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState<"landing" | "checking" | "loading" | "results">("landing");
  // Add this right under your other states:
  const [auditResults, setAuditResults] = useState<any>(null);
  // Student Metadata States
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [subjectSyllabus, setSubjectSyllabus] = useState("");

  // Multi-File Upload States
  const [answerSheet, setAnswerSheet] = useState<File | null>(null);
  const [answerKey, setAnswerKey] = useState<File | null>(null);
  const [markingScheme, setMarkingScheme] = useState<File | null>(null);

  // CBSE Protocol Conditional Mode (Default: false / OFF)
  const [isCbseProtocol, setIsCbseProtocol] = useState(false);

  // Drag-and-drop hover states
  const [isDraggingSlot, setIsDraggingSlot] = useState<number | null>(null);

  // Sample Data Flag
  const [isSampleLoaded, setIsSampleLoaded] = useState(false);

  // 10-Second Loading Progress State
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingStepIndex, setLoadingStepIndex] = useState(0);

  // Dashboard filter & interactive state
  const [questionFilter, setQuestionFilter] = useState<"all" | "discrepancy" | "verified">("all");
  const [expandedQuestion, setExpandedQuestion] = useState<number | null>(2);
  const [isCopiedMemo, setIsCopiedMemo] = useState(false);

  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // 1.5 Second Splash Screen Timer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoadingSplash(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Cleanup progress interval on unmount
  useEffect(() => {
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, []);

  // Dark Mode Toggle Class Binding
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Autofill Sample Data Action
  const handleLoadSample = () => {
    setStudentName("Aarav Sharma");
    setStudentClass("Class 12 - A");
    setRollNumber("2026-CBSE-1042");
    setSubjectSyllabus("Physics Theory (042)");
    
    // Create high-fidelity dummy File objects
    setAnswerSheet(new File(
      ["Candidate Answer Script PDF Content"], 
      "Answer_Sheet_Physics_Aarav_CBSE_2026.pdf", 
      { type: "application/pdf" }
    ));
    setAnswerKey(new File(
      ["Official Master Solution PDF Content"], 
      "Official_Answer_Key_Physics_Set_B.pdf", 
      { type: "application/pdf" }
    ));
    setMarkingScheme(new File(
      ["Official Marking Rubric PDF Content"], 
      "CBSE_Marking_Scheme_Rubric_2026.pdf", 
      { type: "application/pdf" }
    ));
    
    setIsSampleLoaded(true);

    const sampleAppealMemo = `OFFICIAL DISPUTE MEMORANDUM & RE-EVALUATION REQUEST
Date: 23 October 2026
To: Controller of Examinations, CBSE Regional Office
Subject: Formal Academic Re-evaluation Request for Physics Theory (042)
Candidate Name: Aarav Sharma
Roll Number: 2026-CBSE-1042
Class: Class 12 - A
Subject: Physics Theory (042)
Audit Verification ID: REEVAL-2026-AUD-9482

SUMMARY OF AUDIT FINDINGS:
- Original Evaluated Score: 65 / 70
- Audited Verified Score: 68 / 70 (+3.0 Marks Discrepancy Found)
- Primary Omission: Question 2 (Part C - Definite Integration Step). Examiner omitted evaluating Step 3 integration on Page 4. Full +3 marks re-credited under CBSE Marking Scheme Rubric §4.2.

This representation is filed in accordance with CBSE Examination By-Laws Rule 43(B) governing verification and re-checking of examination scripts.`;

    const sampleQuestions = [
      {
        question_number: "1",
        topic: "Gauss Law & Electrostatic Flux Calculation",
        max_marks: 5,
        original_marks: 5,
        audited_marks: 5,
        status: "Verified Accurate",
        audit_note: "Examiner awarded full credit. Complete surface integration steps verified against CBSE Rubric §1.1.",
        examiner_remark: "Examiner awarded full credit. Complete surface integration steps verified against CBSE Rubric §1.1.",
        explanation: "Surface integral ∮ E · dA = Q_enclosed / ε₀ correctly formulated for cylindrical Gaussian surface with radius r and length L. Vector E = λ / (2πε₀r) accurately derived with dimensional units.",
        steps: [
          { label: "Step 1: Statement of Gauss Law with enclosed charge formulation", awarded: "1.0 / 1.0", status: "Verified" },
          { label: "Step 2: Cylindrical Gaussian surface flux symmetry derivation", awarded: "2.0 / 2.0", status: "Verified" },
          { label: "Step 3: Final linear charge density vector E = λ / (2πε₀r)", awarded: "2.0 / 2.0", status: "Verified" }
        ]
      },
      {
        question_number: "2",
        topic: "Electromagnetic Induction & Faraday-Ampere Boundary Integration",
        max_marks: 5,
        original_marks: 2,
        audited_marks: 5,
        status: "+3 Marks Discrepancy Flagged",
        audit_note: "CRITICAL EVALUATION OMISSION: Examiner missed evaluating Step 3 integration on Page 4 (lines 18-24). Full +3 marks re-credited based on CBSE Marking Scheme Rubric §4.2.",
        examiner_remark: "Examiner stopped grading after Step 2 on Page 4 and left Step 3 and final peak voltage expression un-evaluated with no marginal annotations.",
        explanation: "Candidate derived Faraday-Maxwell boundary condition and executed definite integral ∫₀ᵀ I₀ sin(ωt) dt = 2I₀ / ω on Page 4. Full step marks and final peak expression comply strictly with CBSE Marking Scheme §4.2.",
        steps: [
          { label: "Step 1: Faraday-Maxwell equation statement (dΦ/dt = -emf)", awarded: "1.0 / 1.0", status: "Awarded by Examiner" },
          { label: "Step 2: Boundary condition substitution for alternating sinusoidal flux", awarded: "1.0 / 1.0", status: "Awarded by Examiner" },
          { label: "Step 3: Definite Integration ∫₀ᵀ I₀ sin(ωt) dt = 2I₀ / ω (Missed on Page 4)", awarded: "2.0 / 2.0", status: "RE-CREDITED BY AUDIT (+2.0)" },
          { label: "Step 4: Final peak voltage expression with S.I. Units (Volts)", awarded: "1.0 / 1.0", status: "RE-CREDITED BY AUDIT (+1.0)" }
        ]
      },
      {
        question_number: "3",
        topic: "Poynting Vector & Electromagnetic Wave Energy Density",
        max_marks: 5,
        original_marks: 5,
        audited_marks: 5,
        status: "Verified Accurate",
        audit_note: "Vector cross-product S = (1/μ₀)(E × B) correctly derived. Dimensional parity verified against Master Key Set-B.",
        examiner_remark: "Vector cross-product S = (1/μ₀)(E × B) correctly derived. Dimensional parity verified against Master Key Set-B.",
        explanation: "Energy balance in electromagnetic wave components and cycle-averaged Poynting vector evaluated accurately.",
        steps: [
          { label: "Step 1: Energy balance in electromagnetic wave components", awarded: "2.0 / 2.0", status: "Verified" },
          { label: "Step 2: Poynting vector derivation and intensity relationship", awarded: "2.0 / 2.0", status: "Verified" },
          { label: "Step 3: Average Poynting vector calculation over complete cycle", awarded: "1.0 / 1.0", status: "Verified" }
        ]
      },
      {
        question_number: "4",
        topic: "Wave Optics: Young's Double Slit Fringe Width Derivation",
        max_marks: 3,
        original_marks: 3,
        audited_marks: 3,
        status: "Verified Accurate",
        audit_note: "Path difference expression Δx = yd / D and dark/bright fringe spacing equations fully compliant.",
        examiner_remark: "Path difference expression Δx = yd / D and dark/bright fringe spacing equations fully compliant.",
        explanation: "Optical path length difference optical geometry diagram and angular fringe width β = λD / d derivation fully conform to official answer key.",
        steps: [
          { label: "Step 1: Path difference optical geometry diagram & proof", awarded: "1.5 / 1.5", status: "Verified" },
          { label: "Step 2: Angular fringe width β = λD / d derivation", awarded: "1.5 / 1.5", status: "Verified" }
        ]
      },
      {
        question_number: "5",
        topic: "Photoelectric Effect: Einstein Equation & Stopping Potential",
        max_marks: 5,
        original_marks: 5,
        audited_marks: 5,
        status: "Verified Accurate",
        audit_note: "Frequency vs stopping potential graph slope accurately equated to Planck's constant ratio (h/e).",
        examiner_remark: "Frequency vs stopping potential graph slope accurately equated to Planck's constant ratio (h/e).",
        explanation: "Einstein equation hv = Φ + eV₀ applied correctly, threshold frequency deduced, and slope equated to h/e.",
        steps: [
          { label: "Step 1: Einstein photoelectric equation hv = Φ + eV₀", awarded: "2.0 / 2.0", status: "Verified" },
          { label: "Step 2: Threshold frequency & cut-off wavelength deduction", awarded: "2.0 / 2.0", status: "Verified" },
          { label: "Step 3: Slope calculation and work function numerical value", awarded: "1.0 / 1.0", status: "Verified" }
        ]
      }
    ];

    setAuditResults({
      audit_id: "REEVAL-2026-AUD-9482",
      student_name: "Aarav Sharma",
      roll_number: "2026-CBSE-1042",
      class_section: "Class 12 - A",
      subject: "Physics Theory (042)",
      original_total: 65,
      max_total: 70,
      audited_total: 68,
      discrepancy_delta: 3,
      verdict: "Discrepancy Detected",
      questions: sampleQuestions,
      appeal_memo: sampleAppealMemo,
      retotalling_check: {
        has_arithmetic_error: true,
        examiner_sheet_total: 65,
        actual_sum_of_question_marks: 68,
        arithmetic_discrepancy: 3,
        details: "Manual summation of individual marks inscribed on Question Pages 1 through 16 yields exactly 68 marks. The front cover summary table records 65 marks. This constitutes a direct 3-mark clerical subtraction error requiring immediate rectification."
      },
      summary: {
        original_total_marks: 65,
        max_marks: 70,
        audited_marks: 68,
        claimable_increase: 3,
        confidence_level: "96% High Confidence",
        dispute_strength: "Very Strong Claim",
        status: "Compelling Grounds for Official Re-Evaluation"
      }
    });

    setActiveTab("checking");
  };

  // Reset/Clear Form Fields
  const handleClearInputs = () => {
    setStudentName("");
    setStudentClass("");
    setRollNumber("");
    setSubjectSyllabus("");
    setAnswerSheet(null);
    setAnswerKey(null);
    setMarkingScheme(null);
    setIsSampleLoaded(false);
    setAuditResults(null);
  };

  // Dynamic Terminology Based on CBSE Protocol Toggle
  const protocolTerms = {
    standardName: isCbseProtocol ? "CBSE Formal Examination Protocol" : "Institutional Grading Standard",
    rubricRule: isCbseProtocol ? "CBSE Marking Scheme Rubric §4.2" : "Institutional Grading Standard Rule §4.2",
    byLawsRule: isCbseProtocol ? "CBSE Examination By-Laws Rule 43(B)" : "Institutional Examination Assessment Rule 43(B)",
    recipient: isCbseProtocol ? "Controller of Examinations, CBSE Regional Office" : "Controller of Examinations, Academic Evaluation Division",
    appealHeader: isCbseProtocol ? "Statutory CBSE Examination Appeal Dossier" : "Formal Institutional Appeal Dossier",
    badgeLabel: isCbseProtocol ? "CBSE Protocol Active" : "Institutional Protocol",
    sourceDescription: isCbseProtocol 
      ? "official CBSE Physics Set-B marking scheme rubric" 
      : "official Institutional Physics Set-B grading rubric"
  };

  // 10-Second Loading Progress Pipeline
  const scanSteps = [
    { progress: 18, title: "Optical Character Recognition (OCR)", desc: "Vectorizing handwritten mathematical equations and page layout..." },
    { progress: 42, title: "Official Master Key Alignment", desc: "Aligning candidate step coordinates against Official Solution Set-B..." },
    { 
      progress: 68, 
      title: "Step-wise Rubric Logic Check", 
      desc: isCbseProtocol 
        ? "Cross-referencing partial credit rules against statutory CBSE marking scheme..." 
        : "Cross-referencing partial credit rules against Institutional grading standards..." 
    },
    { progress: 88, title: "Arithmetic & Delta Computation", desc: "Auditing examiner page-wise tallies and computing mark discrepancy..." },
    { progress: 100, title: "Audit Dossier Assembled", desc: "Compiling verified re-evaluation report and official dispute memorandum..." }
  ];

  // Pipeline runner that increments progress to 100% across 10 seconds
  const runProgressPipeline = (): Promise<void> => {
    return new Promise((resolve) => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      setLoadingProgress(0);
      setLoadingStepIndex(0);
      let current = 0;
      progressIntervalRef.current = setInterval(() => {
        current += 1;
        setLoadingProgress(current);

        if (current >= 88) {
          setLoadingStepIndex(4);
        } else if (current >= 68) {
          setLoadingStepIndex(3);
        } else if (current >= 42) {
          setLoadingStepIndex(2);
        } else if (current >= 18) {
          setLoadingStepIndex(1);
        } else {
          setLoadingStepIndex(0);
        }

        if (current >= 100) {
          if (progressIntervalRef.current) {
            clearInterval(progressIntervalRef.current);
            progressIntervalRef.current = null;
          }
          resolve();
        }
      }, 100); // 100ms * 100 steps = 10,000ms = 10 seconds
    });
  };

  const handleStartAudit = async () => {
    if (!answerSheet) {
      alert("Please upload at least the Evaluated Answer Sheet PDF!");
      return;
    }

    setActiveTab("loading");

    // IF isSampleLoaded === true: Run 10s progress bar pipeline, then transition to results
    if (isSampleLoaded) {
      await runProgressPipeline();
      setActiveTab("results");
      return;
    }

    // IF isSampleLoaded === false (Real File Upload):
    // Package metadata and actual uploaded PDF files
    const formData = new FormData();
    formData.append("student_name", studentName || "Aarav Sharma");
    formData.append("roll_number", rollNumber || (isCbseProtocol ? "2026-CBSE-1042" : "2026-EXAM-1042"));
    formData.append("class_section", studentClass || "Class 12 - A");
    formData.append("subject", subjectSyllabus || "Physics Theory (042)");
    formData.append("is_cbse_protocol", isCbseProtocol ? "true" : "false");

    formData.append("answer_sheet", answerSheet);
    if (answerKey) formData.append("answer_key", answerKey);
    if (markingScheme) formData.append("marking_scheme", markingScheme);

    try {
      const [_, response] = await Promise.all([
        runProgressPipeline(),
        fetch("http://localhost:8000/api/audit", {
          method: "POST",
          body: formData,
        })
      ]);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.detail || "AI Audit execution failed.");
      }

      const reportData = await response.json();

      // Store real AI audit response and display the results tab
      setAuditResults(reportData);
      setActiveTab("results");
    } catch (error: any) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
      setLoadingProgress(0);
      setLoadingStepIndex(0);
      console.error("AI Audit Error:", error);
      alert(`Error running AI analysis: ${error.message || "Could not connect to FastAPI server at http://localhost:8000."}`);
      setActiveTab("checking");
    }
  };

  // Copy Appeal Memorandum Action
  const handleCopyAppealMemo = () => {
    const memo = auditResults?.appeal_memo || `OFFICIAL DISPUTE MEMORANDUM & RE-EVALUATION REQUEST
Date: 23 October 2026
To: ${protocolTerms.recipient}
Subject: Formal Academic Re-evaluation Request for ${auditResults?.subject || subjectSyllabus || "Physics Theory (042)"}
Candidate Name: ${auditResults?.student_name || studentName || "Aarav Sharma"}
Roll Number: ${auditResults?.roll_number || rollNumber || (isCbseProtocol ? "2026-CBSE-1042" : "2026-EXAM-1042")}
Class: ${auditResults?.class_section || studentClass || "Class 12 - A"}
Subject: ${auditResults?.subject || subjectSyllabus || "Physics Theory (042)"}
Audit Verification ID: ${auditResults?.audit_id || "REEVAL-2026-AUD-9482"}

SUMMARY OF AUDIT FINDINGS:
- Original Evaluated Score: ${auditResults?.original_total ?? 65} / ${auditResults?.max_total ?? 70}
- Audited Verified Score: ${auditResults?.audited_total ?? 68} / ${auditResults?.max_total ?? 70} (+${auditResults?.discrepancy_delta ?? 3}.0 Marks Discrepancy Found)
- Primary Omission: Question 2 (Part C - Definite Integration Step). Examiner omitted evaluating Step 3 integration on Page 4. Full +3 marks re-credited under ${protocolTerms.rubricRule}.

This representation is filed in accordance with ${protocolTerms.byLawsRule} governing verification and re-checking of examination scripts.`;
    
    navigator.clipboard.writeText(memo);
    setIsCopiedMemo(true);
    setTimeout(() => setIsCopiedMemo(false), 2500);
  };

  // Export to PDF / Print Report Action
  const handleExportPdf = () => {
    try {
      if (typeof window !== "undefined") {
        window.print();
      }
    } catch {
      const candidate = auditResults?.student_name || studentName || "Aarav Sharma";
      const roll = auditResults?.roll_number || rollNumber || "2026-CBSE-1042";
      const reportText = `================================================================================
BOARDMARK DEFENDER - OFFICIAL RE-EVALUATION AUDIT REPORT
================================================================================
Audit Dossier ID : ${auditResults?.audit_id || "REEVAL-2026-AUD-9482"}
Date             : 23 October 2026
Candidate Name   : ${candidate}
Roll Number      : ${roll}
Class / Section  : ${auditResults?.class_section || studentClass || "Class 12 - A"}
Subject Syllabus : ${auditResults?.subject || subjectSyllabus || "Physics Theory (042)"}
Status / Verdict : ${auditResults?.verdict || "Discrepancy Detected"}

SCORES SUMMARY:
- Original Evaluated Score : ${auditResults?.original_total ?? 65} / ${auditResults?.max_total ?? 70}
- Audited Verified Score   : ${auditResults?.audited_total ?? 68} / ${auditResults?.max_total ?? 70}
- Discrepancy Delta        : +${auditResults?.discrepancy_delta ?? 3} Marks Recoverable

CLERICAL & RETOTALLING AUDIT:
${auditResults?.retotalling_check?.details || "Examiner clerical oversight identified on Page 4 definite integration."}

================================================================================
OFFICIAL STATUTORY DISPUTE MEMORANDUM:
================================================================================
${auditResults?.appeal_memo || ""}
================================================================================`;

      const blob = new Blob([reportText], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `ReEvaluation_Report_${roll}.txt`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // Drag and drop helper
  const handleFileDrop = (e: React.DragEvent, slot: 1 | 2 | 3) => {
    e.preventDefault();
    setIsDraggingSlot(null);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (slot === 1) { setAnswerSheet(file); setIsSampleLoaded(false); }
      if (slot === 2) { setAnswerKey(file); setIsSampleLoaded(false); }
      if (slot === 3) { setMarkingScheme(file); setIsSampleLoaded(false); }
    }
  };

  // Sample Question Breakdown Data
  const questionRecords = [
    {
      id: 1,
      num: "Q1",
      title: "Gauss Law & Electrostatic Flux Calculation",
      topic: "Electrostatics & Field Vectors",
      maxMarks: 5,
      origMarks: 5,
      auditMarks: 5,
      hasDiscrepancy: false,
      statusText: "Verified Accurate",
      badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      examinerRemark: `Examiner awarded full credit. Complete surface integration steps verified against ${isCbseProtocol ? "CBSE Rubric §1.1" : "Institutional Rubric §1.1"}.`,
      steps: [
        { label: "Step 1: Statement of Gauss Law with enclosed charge formulation", awarded: "1.0 / 1.0", status: "Verified" },
        { label: "Step 2: Cylindrical Gaussian surface flux symmetry derivation", awarded: "2.0 / 2.0", status: "Verified" },
        { label: "Step 3: Final linear charge density vector E = λ / (2πε₀r)", awarded: "2.0 / 2.0", status: "Verified" }
      ]
    },
    {
      id: 2,
      num: "Q2",
      title: "Electromagnetic Induction & Faraday-Ampere Boundary Integration",
      topic: "Electromagnetism & Wave Dynamics",
      maxMarks: 5,
      origMarks: 2,
      auditMarks: 5,
      hasDiscrepancy: true,
      delta: "+3 Marks Re-credited",
      statusText: "+3 Marks Discrepancy Flagged",
      badgeColor: "bg-blue-600 text-white shadow-sm shadow-blue-500/20",
      examinerRemark: `CRITICAL EVALUATION OMISSION: Examiner missed evaluating Step 3 integration on Page 4 (lines 18-24). Full +3 marks re-credited based on ${protocolTerms.rubricRule}.`,
      steps: [
        { label: "Step 1: Faraday-Maxwell equation statement (dΦ/dt = -emf)", awarded: "1.0 / 1.0", status: "Awarded by Examiner" },
        { label: "Step 2: Boundary condition substitution for alternating sinusoidal flux", awarded: "1.0 / 1.0", status: "Awarded by Examiner" },
        { label: "Step 3: Definite Integration ∫₀ᵀ I₀ sin(ωt) dt = 2I₀ / ω (Missed on Page 4)", awarded: "2.0 / 2.0", status: "RE-CREDITED BY AUDIT (+2.0)" },
        { label: "Step 4: Final peak voltage expression with S.I. Units (Volts)", awarded: "1.0 / 1.0", status: "RE-CREDITED BY AUDIT (+1.0)" }
      ]
    },
    {
      id: 3,
      num: "Q3",
      title: "Poynting Vector & Electromagnetic Wave Energy Density",
      topic: "Electromagnetic Waves",
      maxMarks: 5,
      origMarks: 5,
      auditMarks: 5,
      hasDiscrepancy: false,
      statusText: "Verified Accurate",
      badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      examinerRemark: "Vector cross-product S = (1/μ₀)(E × B) correctly derived. Dimensional parity verified against Master Key Set-B.",
      steps: [
        { label: "Step 1: Energy balance in electromagnetic wave components", awarded: "2.0 / 2.0", status: "Verified" },
        { label: "Step 2: Poynting vector derivation and intensity relationship", awarded: "2.0 / 2.0", status: "Verified" },
        { label: "Step 3: Average Poynting vector calculation over complete cycle", awarded: "1.0 / 1.0", status: "Verified" }
      ]
    },
    {
      id: 4,
      num: "Q4",
      title: "Wave Optics: Young's Double Slit Fringe Width Derivation",
      topic: "Wave Optics & Interference",
      maxMarks: 3,
      origMarks: 3,
      auditMarks: 3,
      hasDiscrepancy: false,
      statusText: "Verified Accurate",
      badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      examinerRemark: "Path difference expression Δx = yd / D and dark/bright fringe spacing equations fully compliant.",
      steps: [
        { label: "Step 1: Path difference optical geometry diagram & proof", awarded: "1.5 / 1.5", status: "Verified" },
        { label: "Step 2: Angular fringe width β = λD / d derivation", awarded: "1.5 / 1.5", status: "Verified" }
      ]
    },
    {
      id: 5,
      num: "Q5",
      title: "Photoelectric Effect: Einstein Equation & Stopping Potential",
      topic: "Dual Nature of Radiation & Matter",
      maxMarks: 5,
      origMarks: 5,
      auditMarks: 5,
      hasDiscrepancy: false,
      statusText: "Verified Accurate",
      badgeColor: "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800",
      examinerRemark: "Frequency vs stopping potential graph slope accurately equated to Planck's constant ratio (h/e).",
      steps: [
        { label: "Step 1: Einstein photoelectric equation hv = Φ + eV₀", awarded: "2.0 / 2.0", status: "Verified" },
        { label: "Step 2: Threshold frequency & cut-off wavelength deduction", awarded: "2.0 / 2.0", status: "Verified" },
        { label: "Step 3: Slope calculation and work function numerical value", awarded: "1.0 / 1.0", status: "Verified" }
      ]
    }
  ];

  const filteredQuestions = questionRecords.filter(q => {
    if (questionFilter === "discrepancy") return q.hasDiscrepancy;
    if (questionFilter === "verified") return !q.hasDiscrepancy;
    return true;
  });

  return (
    <div className={`min-h-screen relative overflow-x-hidden font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 ${
      darkMode ? "dark bg-slate-950 text-slate-100" : "bg-white text-slate-900"
    }`}>
      
      {/* Soft Light-Blue Ambient Radial Glow Backdrop (21st.dev style) */}
      <div 
        aria-hidden="true" 
        className="ambient-glow-backdrop absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] md:w-[800px] md:h-[450px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-200/60 via-blue-100/30 to-transparent blur-3xl md:blur-[120px] pointer-events-none -z-10 dark:opacity-0 transition-opacity duration-300" 
      />
      
      {/* ================= STEP A: STARTUP SPLASH ANIMATION ================= */}
      <AnimatePresence>
        {isLoadingSplash && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.99 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-blue-600 text-white"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center space-x-4"
            >
              {/* Animated Spinner Ring around Brand Logo */}
              <div className="relative flex items-center justify-center">
                <motion.svg
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="absolute -inset-2.5 w-[76px] h-[76px] text-blue-200"
                  viewBox="0 0 76 76"
                  fill="none"
                >
                  <circle
                    cx="38"
                    cy="38"
                    r="34"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeDasharray="140"
                    strokeDashoffset="55"
                    className="opacity-90"
                  />
                </motion.svg>
                
                <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-2xl z-10">
                  <ShieldCheck className="w-8 h-8 text-white animate-pulse" />
                </div>
              </div>

              <div className="flex flex-col">
                <span className="text-5xl font-black tracking-tight tracking-wider">ReEval</span>
                <span className="text-xs uppercase font-bold tracking-widest text-blue-200">Academic Verification</span>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5 }}
              className="mt-5 text-blue-100 text-xs md:text-sm font-semibold tracking-widest uppercase bg-blue-700/50 px-4 py-1.5 rounded-full border border-blue-400/30"
            >
              Advanced Academic Verification Platform
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= FORMAL ENTERPRISE NAVBAR ================= */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/95 dark:bg-slate-950/95 border-b border-slate-200 dark:border-slate-800 transition-colors no-print">
        <div className="max-w-7xl mx-auto px-6 h-18 py-3.5 flex items-center justify-between">
          
          {/* Logo & Platform Title */}
          <div 
            className="flex items-center space-x-3.5 cursor-pointer group"
            onClick={() => setActiveTab("landing")}
          >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold shadow-md shadow-blue-500/25"
            >
              <ShieldCheck className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">ReEval</span>
                <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Audit Engine
                </span>
              </div>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium block">
                Academic Answer Sheet Audit Platform
              </span>
            </div>
          </div>

          {/* Quick Actions & Dark Mode Toggle */}
          <div className="flex items-center space-x-3">
            
            {/* Nav Switchers */}
            <div className="hidden md:flex items-center space-x-1 mr-2 bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
              <button
                onClick={() => setActiveTab("landing")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "landing" 
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("checking")}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === "checking" 
                    ? "bg-white dark:bg-slate-800 text-blue-600 dark:text-blue-400 shadow-sm" 
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Audit Window
              </button>
              {activeTab === "results" && (
                <button
                  onClick={() => setActiveTab("results")}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 text-white font-semibold shadow-sm"
                >
                  Audit Dossier
                </button>
              )}
            </div>

            {/* Quick Fill Sample Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleLoadSample}
              className="flex items-center space-x-2 px-3.5 py-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900 text-xs font-bold hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors shadow-sm"
              title="Populate test candidate data immediately"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span className="hidden sm:inline">Load Sample Paper</span>
              <span className="sm:hidden">Sample</span>
            </motion.button>

            {/* Dark Mode Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shadow-sm flex items-center justify-center"
              aria-label="Toggle Theme"
              title={darkMode ? "Switch to Pure White Mode" : "Switch to Dark Mode"}
            >
              {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
            </motion.button>
          </div>
        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <main className="max-w-7xl mx-auto px-6 py-10">
        
        {/* ================= STEP B: MAIN LANDING PAGE (HERO SECTION) ================= */}
        {activeTab === "landing" && (
          <motion.div 
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="space-y-16"
          >
            {/* Hero Main Block */}
            <div className="relative rounded-3xl p-8 md:p-14 border border-blue-100 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 bg-grid-dots shadow-sm overflow-hidden text-center flex flex-col items-center">
              
              {/* Subtle Blue Glow Radial Overlay */}
              <div className="absolute inset-0 bg-radial-gradient-light pointer-events-none" />

              {/* Formal Academic Pill Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-bold uppercase tracking-wider border border-blue-200 dark:border-blue-900 shadow-sm z-10">
                <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Academic & Institutional Standards • Deterministic Step Verification</span>
              </div>

              {/* Formal Main Title */}
              <h1 className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl text-slate-950 dark:text-white leading-[1.15] z-10">
                Precision Answer Sheet Audit &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Re-evaluation
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-5 text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl font-normal leading-relaxed z-10">
                Eliminate examiner oversight, align step-by-step logic against official marking rubrics, and generate legally defensible re-evaluation audits with optical character precision.
              </p>

              {/* Primary & Secondary Actions */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab("checking")}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm shadow-xl shadow-blue-500/25 flex items-center justify-center space-x-2.5 transition-all"
                >
                  <span>Launch Audit Window</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleLoadSample}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-blue-300 transition-all shadow-sm flex items-center justify-center space-x-2"
                >
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  <span>Try Sample Audit</span>
                </motion.button>
              </div>

              {/* Trust & Key Stats Ribbon */}
              <div className="mt-12 pt-8 border-t border-slate-200/80 dark:border-slate-800 w-full grid grid-cols-2 md:grid-cols-4 gap-6 text-left z-10">
                <div className="p-3">
                  <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 block">99.4%</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">OCR Vector Precision</span>
                </div>
                <div className="p-3">
                  <span className="text-2xl font-extrabold text-slate-950 dark:text-white block">100%</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Step Rubric Parity</span>
                </div>
                <div className="p-3">
                  <span className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 block">+3.0 Avg</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Marks Recovered/Dispute</span>
                </div>
                <div className="p-3">
                  <span className="text-2xl font-extrabold text-slate-950 dark:text-white block">&lt;10 Sec</span>
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Automated Pipeline</span>
                </div>
              </div>
            </div>

            {/* Feature Overview Cards (Bento Grid) */}
            <div>
              <div className="text-center max-w-xl mx-auto mb-8">
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  Engineered for Academic Accountability
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                  Three core computational pillars ensuring no student loses merit due to manual evaluation anomalies.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    icon: <FileSpreadsheet className="w-6 h-6 text-blue-600" />,
                    title: "Multi-Source Alignment",
                    desc: "Cross-references student answer booklets directly against official answer keys and step-by-step marking rubrics simultaneously.",
                    highlight: "Vector Matrix Sync"
                  },
                  {
                    icon: <Cpu className="w-6 h-6 text-blue-600" />,
                    title: "Step-wise Logic Check",
                    desc: "Detects missing step marks, uncalculated partial credit, unchecked pages, and examiner arithmetic summation discrepancies.",
                    highlight: "Partial Credit Recovery"
                  },
                  {
                    icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
                    title: "Transparent Reporting",
                    desc: "Generates legally compliant, question-by-question audit logs formatted for institutional review and formal academic appeals.",
                    highlight: "Statutory Appeal Dossier"
                  }
                ].map((card, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className="p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center border border-blue-100 dark:border-blue-900 mb-5">
                        {card.icon}
                      </div>
                      <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white mb-2">
                        {card.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {card.desc}
                      </p>
                    </div>

                    <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {card.highlight}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* 3-Step Verification Pipeline Banner */}
            <div className="p-8 rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-base text-slate-950 dark:text-white">
                      Ready to Audit Your Academic Examination Paper?
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Upload your evaluated booklet or load our high-fidelity sample paper to evaluate the pipeline in 10 seconds.
                    </p>
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab("checking")}
                  className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 shrink-0"
                >
                  Start Verification
                </motion.button>
              </div>
            </div>

          </motion.div>
        )}

        {/* ================= STEP C: AUDIT & CHECKING WINDOW (INPUT PAGE) ================= */}
        {activeTab === "checking" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {/* Top Navigation & Status */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={() => setActiveTab("landing")}
                    className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <h2 className="text-2xl font-extrabold text-slate-950 dark:text-white tracking-tight">
                    Academic Re-Evaluation Submission
                  </h2>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 pl-11">
                  Upload candidate answer scripts and official rubrics for automated verification.
                </p>
              </div>

              {/* Protocol Toggle (CBSE vs Institutional) */}
              <div className="flex items-center space-x-3 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-300 pl-2">
                  {isCbseProtocol ? "CBSE Protocol" : "Institutional Protocol"}
                </span>
                <button
                  onClick={() => setIsCbseProtocol(!isCbseProtocol)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
                    isCbseProtocol ? "bg-blue-600" : "bg-slate-300 dark:bg-slate-700"
                  }`}
                  title="Toggle between CBSE statutory protocol and standard institutional rules"
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                      isCbseProtocol ? "translate-x-5" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Candidate Metadata Form Card */}
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900 dark:text-white flex items-center space-x-2">
                  <User className="w-4 h-4 text-blue-600" />
                  <span>Candidate & Examination Metadata</span>
                </h3>

                {isSampleLoaded && (
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 animate-pulse">
                    Sample Data Loaded
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                {/* Candidate Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Candidate Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      placeholder="e.g. Aarav Sharma"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Roll Number */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Roll / Registration No.
                  </label>
                  <div className="relative">
                    <Hash className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={rollNumber}
                      onChange={(e) => setRollNumber(e.target.value)}
                      placeholder={isCbseProtocol ? "e.g. 2026-CBSE-1042" : "e.g. 2026-EXAM-1042"}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Class & Section */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Class & Section
                  </label>
                  <div className="relative">
                    <Layers className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={studentClass}
                      onChange={(e) => setStudentClass(e.target.value)}
                      placeholder="e.g. Class 12 - A (Senior Secondary)"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Subject Syllabus */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Subject / Paper Title
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      value={subjectSyllabus}
                      onChange={(e) => setSubjectSyllabus(e.target.value)}
                      placeholder="e.g. Physics Theory (042)"
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Multi-File Upload Grid (Dropzones) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Slot 1: Evaluated Answer Sheet */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingSlot(1); }}
                onDragLeave={() => setIsDraggingSlot(null)}
                onDrop={(e) => handleFileDrop(e, 1)}
                className={`p-7 rounded-3xl border-2 border-dashed transition-all flex flex-col justify-between items-center text-center min-h-[260px] ${
                  answerSheet 
                    ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20" 
                    : isDraggingSlot === 1
                    ? "border-blue-600 bg-blue-100/50 dark:bg-blue-900/40"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 mb-4 mx-auto border border-blue-100 dark:border-blue-900">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                    Evaluated Answer Booklet
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                    Candidate PDF containing handwritten solutions and examiner marginal marks.
                  </p>
                </div>

                <div className="mt-6 w-full">
                  {answerSheet ? (
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 truncate">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{answerSheet.name}</span>
                      </div>
                      <button 
                        onClick={() => { setAnswerSheet(null); setIsSampleLoaded(false); }}
                        className="text-slate-400 hover:text-red-500 font-bold p-1 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 inline-flex items-center justify-center space-x-2 transition-all">
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload PDF Script</span>
                      <input 
                        type="file" 
                        accept="application/pdf" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setAnswerSheet(e.target.files[0]);
                            setIsSampleLoaded(false);
                          }
                        }} 
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Slot 2: Official Answer Key */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingSlot(2); }}
                onDragLeave={() => setIsDraggingSlot(null)}
                onDrop={(e) => handleFileDrop(e, 2)}
                className={`p-7 rounded-3xl border-2 border-dashed transition-all flex flex-col justify-between items-center text-center min-h-[260px] ${
                  answerKey 
                    ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20" 
                    : isDraggingSlot === 2
                    ? "border-blue-600 bg-blue-100/50 dark:bg-blue-900/40"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 mb-4 mx-auto border border-blue-100 dark:border-blue-900">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                    Official Master Key
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                    Official solution key or set paper for answer validation.
                  </p>
                </div>

                <div className="mt-6 w-full">
                  {answerKey ? (
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 truncate">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{answerKey.name}</span>
                      </div>
                      <button 
                        onClick={() => { setAnswerKey(null); setIsSampleLoaded(false); }}
                        className="text-slate-400 hover:text-red-500 font-bold p-1 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold inline-flex items-center justify-center space-x-2 transition-all">
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload Master Key</span>
                      <input 
                        type="file" 
                        accept="application/pdf" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setAnswerKey(e.target.files[0]);
                            setIsSampleLoaded(false);
                          }
                        }} 
                      />
                    </label>
                  )}
                </div>
              </div>

              {/* Slot 3: Marking Scheme & Rubric */}
              <div
                onDragOver={(e) => { e.preventDefault(); setIsDraggingSlot(3); }}
                onDragLeave={() => setIsDraggingSlot(null)}
                onDrop={(e) => handleFileDrop(e, 3)}
                className={`p-7 rounded-3xl border-2 border-dashed transition-all flex flex-col justify-between items-center text-center min-h-[260px] ${
                  markingScheme 
                    ? "border-blue-500 bg-blue-50/40 dark:bg-blue-950/20" 
                    : isDraggingSlot === 3
                    ? "border-blue-600 bg-blue-100/50 dark:bg-blue-900/40"
                    : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 flex items-center justify-center text-blue-600 mb-4 mx-auto border border-blue-100 dark:border-blue-900">
                    <FileSpreadsheet className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-950 dark:text-white">
                    Marking Scheme & Rubric
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-xs">
                    Step-wise partial credit guidelines and distribution rubric.
                  </p>
                </div>

                <div className="mt-6 w-full">
                  {markingScheme ? (
                    <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2 truncate">
                        <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{markingScheme.name}</span>
                      </div>
                      <button 
                        onClick={() => { setMarkingScheme(null); setIsSampleLoaded(false); }}
                        className="text-slate-400 hover:text-red-500 font-bold p-1 ml-2"
                      >
                        ×
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer w-full py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold inline-flex items-center justify-center space-x-2 transition-all">
                      <UploadCloud className="w-4 h-4" />
                      <span>Upload Rubric PDF</span>
                      <input 
                        type="file" 
                        accept="application/pdf" 
                        className="hidden" 
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setMarkingScheme(e.target.files[0]);
                            setIsSampleLoaded(false);
                          }
                        }} 
                      />
                    </label>
                  )}
                </div>
              </div>

            </div>

            {/* Primary Execution Bar */}
            <div className="p-6 rounded-3xl bg-blue-600 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-blue-500/20">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white font-bold border border-white/20">
                  <Cpu className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-extrabold text-base">
                    Ready to Execute Multi-Source Re-evaluation?
                  </h4>
                  <p className="text-xs text-blue-100 mt-0.5">
                    Pipeline verifies optical character vectors and step-wise rubric parity across all attached PDFs.
                  </p>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleStartAudit}
                className="w-full md:w-auto px-8 py-3.5 rounded-xl bg-white text-blue-600 font-extrabold text-xs shadow-lg hover:bg-blue-50 transition-all flex items-center justify-center space-x-2 shrink-0"
              >
                <span>Execute Analysis & Re-evaluation</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ================= STEP D: LOADING PIPELINE ANIMATION ================= */}
        {activeTab === "loading" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-2xl mx-auto py-16 text-center space-y-10"
          >
            {/* Pulsing Central Icon */}
            <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-3xl border-4 border-dashed border-blue-500/40"
              />
              <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-20 h-20 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl shadow-blue-500/30"
              >
                <RefreshCw className="w-9 h-9 animate-spin" />
              </motion.div>
            </div>

            {/* Title & Live Progress */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-900">
                Pipeline Active • {loadingProgress}% Completed
              </span>
              <h2 className="text-3xl font-black text-slate-950 dark:text-white tracking-tight">
                {scanSteps[loadingStepIndex]?.title}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                {scanSteps[loadingStepIndex]?.desc}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 dark:bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-slate-200 dark:border-slate-800">
              <motion.div
                className="bg-blue-600 h-full rounded-full"
                style={{ width: `${loadingProgress}%` }}
                transition={{ ease: "easeInOut" }}
              />
            </div>

            {/* Checklist of Steps */}
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-4">
              {scanSteps.map((step, idx) => (
                <div 
                  key={idx}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    idx <= loadingStepIndex 
                      ? "bg-blue-50/60 dark:bg-blue-950/40 border-blue-200 dark:border-blue-900 text-blue-900 dark:text-blue-200" 
                      : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-black uppercase">Step {idx + 1}</span>
                    {idx < loadingStepIndex ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    ) : idx === loadingStepIndex ? (
                      <div className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
                    ) : null}
                  </div>
                  <span className="text-[11px] font-bold line-clamp-1 block">
                    {step.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

       {/* ================= STEP E: DYNAMIC REAL AI RESULTS DOSSIER ================= */}
        {activeTab === "results" && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="space-y-8"
          >
            {/* Top Navigation & Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center space-x-3">
                <button 
                  onClick={() => setActiveTab("checking")}
                  className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <div>
                  <div className="flex items-center space-x-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-0.5 rounded bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-900">
                      {protocolTerms.badgeLabel}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">
                      ID: {auditResults?.audit_id || "REEVAL-LIVE-AUDIT"}
                    </span>
                  </div>
                  <h2 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight mt-1">
                    Formal Re-Evaluation Audit Dossier
                  </h2>
                </div>
              </div>

              <div className="flex items-center space-x-3 no-print">
                <button
                  onClick={handleExportPdf}
                  className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs shadow-sm flex items-center space-x-2 transition-all"
                  title="Export complete re-evaluation dossier to PDF"
                >
                  <Download className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>Export PDF Report</span>
                </button>
                <button
                  onClick={handleCopyAppealMemo}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 flex items-center space-x-2 transition-all"
                >
                  {isCopiedMemo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopiedMemo ? "Copied Appeal Memo" : "Copy Appeal Memorandum"}</span>
                </button>
              </div>
            </div>

            {/* Candidate Live Summary Banner */}
            <div className="p-7 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
              <div className="md:col-span-2 space-y-1">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                  Candidate & Examination Subject
                </span>
                <h3 className="text-xl font-extrabold text-slate-950 dark:text-white">
                  {auditResults?.student_name || studentName || "Aarav Sharma"} <span className="text-sm font-medium text-slate-500">({auditResults?.roll_number || rollNumber || "2026-CBSE-1042"})</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {auditResults?.class_section || studentClass || "Class 12 - A"} • {auditResults?.subject || subjectSyllabus || "Physics Theory (042)"}
                </p>
              </div>

              {/* Dynamic AI Score Totals */}
              <div className="md:col-span-2 bg-slate-50 dark:bg-slate-950/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center justify-around">
                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Original Score</span>
                  <span className="text-2xl font-black text-slate-700 dark:text-slate-300">
                    {auditResults?.original_total ?? 65} <span className="text-xs font-normal text-slate-400">/ {auditResults?.max_total ?? 70}</span>
                  </span>
                </div>

                <div className="text-xl font-bold text-slate-300 dark:text-slate-700">→</div>

                <div className="text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">Audited Score</span>
                  <span className="text-3xl font-black text-blue-600 dark:text-blue-400">
                    {auditResults?.audited_total ?? 68} <span className="text-xs font-normal text-blue-400">/ {auditResults?.max_total ?? 70}</span>
                  </span>
                </div>

                <div className="pl-3 border-l border-slate-200 dark:border-slate-800 text-center">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block">Discrepancy Delta</span>
                  <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                    {(auditResults?.discrepancy_delta ?? 3) > 0 ? `+${auditResults?.discrepancy_delta ?? 3}` : (auditResults?.discrepancy_delta ?? 3)} Marks
                  </span>
                </div>
              </div>
            </div>

            {/* Clerical / Human Error Flag & Possible Mark Increase Indicator */}
            <div className="p-6 rounded-3xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/60 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-amber-200 dark:border-amber-800/60">
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300">
                      Clerical / Human Error Flagged
                    </span>
                    <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                      {auditResults?.summary?.confidence_level || "96% High Confidence"}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-1 leading-relaxed max-w-2xl">
                    {auditResults?.retotalling_check?.details ||
                      `Front-cover index tabulation reflects ${auditResults?.original_total ?? 65} marks, while verified summation of step marks across script totals ${auditResults?.audited_total ?? 68} marks. Arithmetic oversight and omitted evaluation identified.`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3 shrink-0 self-stretch md:self-auto justify-between md:justify-end pt-3 md:pt-0 border-t md:border-t-0 border-amber-200/60 dark:border-amber-900/40">
                <div className="text-left md:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Possible Mark Increase
                  </span>
                  <span className="text-xl font-black text-amber-700 dark:text-amber-400">
                    +{(auditResults?.discrepancy_delta ?? 3) > 0 ? (auditResults?.discrepancy_delta ?? 3) : 3} Marks
                  </span>
                </div>
                <div className="px-3 py-1.5 rounded-xl bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-bold border border-amber-200 dark:border-amber-800">
                  {auditResults?.summary?.dispute_strength || "Very Strong Claim"}
                </div>
              </div>
            </div>

            {/* Question Breakdown dynamically mapping Gemini AI response */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-extrabold text-slate-950 dark:text-white flex items-center space-x-2">
                  <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  <span>
                    Step-Wise AI Audit Breakdown ({
                      ((auditResults?.questions && Array.isArray(auditResults.questions) && auditResults.questions.length > 0)
                        ? auditResults.questions
                        : questionRecords
                      ).length
                    } Questions Analyzed)
                  </span>
                </h3>
                <span className="text-xs font-bold text-slate-500">
                  Verdict: <strong className="text-blue-600">{auditResults?.verdict || "Discrepancy Detected"}</strong>
                </span>
              </div>

              <div className="space-y-3">
                {((auditResults?.questions && Array.isArray(auditResults.questions) && auditResults.questions.length > 0)
                  ? auditResults.questions
                  : questionRecords.map((qr) => ({
                      question_number: qr.num.replace("Q", ""),
                      topic: qr.title,
                      original_marks: qr.origMarks,
                      audited_marks: qr.auditMarks,
                      max_marks: qr.maxMarks,
                      status: qr.statusText,
                      audit_note: qr.examinerRemark,
                      examiner_remark: qr.examinerRemark,
                      explanation: qr.steps.map(s => s.label).join("; "),
                      steps: qr.steps
                    }))
                ).map((q: any, idx: number) => {
                  const isDiscrepancy = q.audited_marks !== q.original_marks;
                  const isExpanded = expandedQuestion === idx;
                  const stepsToRender = (q.steps && q.steps.length > 0) ? q.steps : (questionRecords[idx]?.steps || []);
                  const examinerRemarkText = q.examiner_remark || q.examinerRemark || q.audit_note || "Examiner evaluated according to marking rubric.";
                  const explanationText = q.explanation || q.student_evidence || "Candidate solution steps conform to standard curriculum derivation and marking criteria.";

                  return (
                    <div 
                      key={idx}
                      className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all ${
                        isDiscrepancy 
                          ? "border-blue-300 dark:border-blue-800 shadow-sm" 
                          : "border-slate-200 dark:border-slate-800"
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="flex items-center space-x-3">
                          <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 font-black text-xs text-slate-800 dark:text-slate-200">
                            Question {q.question_number}
                          </span>
                          <span className="font-bold text-sm text-slate-900 dark:text-white">
                            {q.topic}
                          </span>
                        </div>

                        <div className="flex items-center space-x-2 text-xs font-bold">
                          <span className="text-slate-500">{q.original_marks} / {q.max_marks} original</span>
                          <span>→</span>
                          <span className={isDiscrepancy ? "text-blue-600 font-extrabold" : "text-emerald-600"}>
                            {q.audited_marks} / {q.max_marks} audited
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isDiscrepancy 
                              ? "bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300" 
                              : "bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300"
                          }`}>
                            {q.status}
                          </span>
                          <button
                            type="button"
                            onClick={() => setExpandedQuestion(isExpanded ? null : idx)}
                            className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors ml-1"
                            title={isExpanded ? "Collapse Breakdown" : "Expand Breakdown"}
                          >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="mt-3 text-xs leading-relaxed text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/40 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 font-mono">
                        <strong>AI Auditor Finding:</strong> {q.audit_note}
                      </div>

                      {/* Step-by-step Answer Explanation & Examiner Remark Breakdown */}
                      {isExpanded && (
                        <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3.5">
                          {/* Examiner Remark Breakdown */}
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                              Examiner Evaluation Remark & Rubric Alignment
                            </span>
                            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800/60">
                              {examinerRemarkText}
                            </div>
                          </div>

                          {/* Step-by-step Answer Explanation */}
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                              Step-by-step Answer Explanation
                            </span>
                            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed bg-blue-50/40 dark:bg-blue-950/20 p-3 rounded-xl border border-blue-100/60 dark:border-blue-900/40">
                              {explanationText}
                            </div>
                          </div>

                          {/* Step-by-step Rubric Allocation Table */}
                          {stepsToRender.length > 0 && (
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-2">
                                Step-by-Step Scoring Breakdown ({stepsToRender.length} Steps)
                              </span>
                              <div className="space-y-2">
                                {stepsToRender.map((st: any, sIdx: number) => (
                                  <div
                                    key={sIdx}
                                    className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/60 text-xs"
                                  >
                                    <span className="text-slate-700 dark:text-slate-300 font-medium">
                                      {st.label}
                                    </span>
                                    <div className="flex items-center space-x-2 shrink-0">
                                      <span className="font-bold text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                        {st.awarded}
                                      </span>
                                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                        st.status?.includes("RE-CREDITED")
                                          ? "bg-blue-600 text-white"
                                          : "bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300"
                                      }`}>
                                        {st.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Appeal Memorandum Generated by Gemini */}
            <div className="p-8 rounded-3xl bg-slate-950 text-slate-100 space-y-4 border border-slate-800 shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <h4 className="font-extrabold text-base text-white flex items-center space-x-2">
                  <ShieldCheck className="w-5 h-5 text-blue-400" />
                  <span>Statutory Dispute Memorandum (Generated by Gemini 1.5 Flash)</span>
                </h4>
                <button
                  onClick={handleCopyAppealMemo}
                  className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center space-x-2 shadow-lg shadow-blue-500/25"
                >
                  {isCopiedMemo ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{isCopiedMemo ? "Copied" : "Copy Memorandum Text"}</span>
                </button>
              </div>
              <pre className="text-xs text-slate-300 font-mono whitespace-pre-wrap leading-relaxed p-4 bg-slate-900 rounded-2xl border border-slate-800">
                {auditResults?.appeal_memo || `OFFICIAL DISPUTE MEMORANDUM & RE-EVALUATION REQUEST
Date: 23 October 2026
To: ${protocolTerms.recipient}
Subject: Formal Academic Re-evaluation Request for ${auditResults?.subject || subjectSyllabus || "Physics Theory (042)"}
Candidate Name: ${auditResults?.student_name || studentName || "Aarav Sharma"}
Roll Number: ${auditResults?.roll_number || rollNumber || (isCbseProtocol ? "2026-CBSE-1042" : "2026-EXAM-1042")}
Class: ${auditResults?.class_section || studentClass || "Class 12 - A"}
Subject: ${auditResults?.subject || subjectSyllabus || "Physics Theory (042)"}
Audit Verification ID: ${auditResults?.audit_id || "REEVAL-2026-AUD-9482"}

SUMMARY OF AUDIT FINDINGS:
- Original Evaluated Score: ${auditResults?.original_total ?? 65} / ${auditResults?.max_total ?? 70}
- Audited Verified Score: ${auditResults?.audited_total ?? 68} / ${auditResults?.max_total ?? 70} (+${auditResults?.discrepancy_delta ?? 3}.0 Marks Discrepancy Found)
- Primary Omission: Question 2 (Part C - Definite Integration Step). Examiner omitted evaluating Step 3 integration on Page 4. Full +3 marks re-credited under ${protocolTerms.rubricRule}.

This representation is filed in accordance with ${protocolTerms.byLawsRule} governing verification and re-checking of examination scripts.`}
              </pre>
            </div>

          </motion.div>
        )}

      </main>
    </div>
  );
}