"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist";

type AnalysisResult = {
  ats_score?: number;
  semantic_match?: number;
  technical_score?: number;
  career_score?: number;
  behavioral_score?: number;
  required_skills?: string[];
  matched_skills?: string[];
  missing_skills?: string[];
  recommendation?: string;
  ai_feedback?: string;
  error?: string;
};

export default function Analyze() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);

  // ==========================================
  // PDF TEXT EXTRACTION
  // ==========================================

  const handleFileChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFile = e.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    if (selectedFile.type !== "application/pdf") {
      alert("Please upload a PDF file.");
      return;
    }

    setFile(selectedFile);
    setExtracting(true);
    setResult(null);

    try {
      console.log("Reading PDF:", selectedFile.name);

      const arrayBuffer = await selectedFile.arrayBuffer();

      const pdf = await pdfjsLib.getDocument({
        data: arrayBuffer,
        disableWorker: true,
      }).promise;

      console.log("PDF pages:", pdf.numPages);

      let extractedText = "";

      for (
        let pageNumber = 1;
        pageNumber <= pdf.numPages;
        pageNumber++
      ) {
        const page = await pdf.getPage(pageNumber);

        const textContent = await page.getTextContent();

        const pageText = textContent.items
          .map((item: any) => item.str || "")
          .join(" ");

        extractedText += pageText + "\n";
      }

      extractedText = extractedText.trim();

      console.log(
        "Extracted resume characters:",
        extractedText.length
      );

      console.log(
        "Extracted resume:",
        extractedText
      );

      if (!extractedText) {
        alert(
          "No text could be extracted from this PDF. Please paste your resume manually."
        );
        return;
      }

      setResume(extractedText);

    } catch (error) {
      console.error("PDF extraction error:", error);

      alert(
        "Failed to read the PDF. Please paste your resume manually."
      );
    } finally {
      setExtracting(false);
    }
  };

  // ==========================================
  // ANALYZE RESUME
  // ==========================================

  const handleAnalyze = async () => {
    try {
      console.log("Analyze button clicked");

      if (!resume.trim()) {
        alert(
          "Please upload a resume PDF or paste your resume."
        );
        return;
      }

      if (!jobDescription.trim()) {
        alert(
          "Please enter the job description."
        );
        return;
      }

      setLoading(true);
      setResult(null);

      console.log(
        "Resume characters:",
        resume.length
      );

      console.log(
        "Job description characters:",
        jobDescription.length
      );

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL;

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured."
        );
      }

      const response = await fetch(
        `${apiUrl}/analyze`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resume: resume,
            job_description: jobDescription,
          }),
        }
      );

      const data = await response.json();

      console.log(
        "API Response:",
        JSON.stringify(data, null, 2)
      );

      if (!response.ok) {
        throw new Error(
          data.error ||
          `API request failed: ${response.status}`
        );
      }

      if (data.error) {
        throw new Error(data.error);
      }

      setResult(data);

    } catch (error) {
      console.error("ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Failed to analyze resume."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* =========================
          HEADER
      ========================== */}

      <div className="text-center mb-12">

        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          AI Resume Analysis
        </h1>

        <p className="text-slate-400 mt-4">
          Upload your resume and compare it against any
          job description using AI.
        </p>

      </div>


      {/* =========================
          INPUT SECTION
      ========================== */}

      <div className="grid md:grid-cols-2 gap-8">

        {/* Resume */}

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Resume
          </h2>

          <input
            type="file"
            accept=".pdf,application/pdf"
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            onChange={handleFileChange}
          />

          {file && (
            <p className="text-sm text-cyan-400 mb-3">
              Selected: {file.name}
            </p>
          )}

          {extracting && (
            <p className="text-sm text-yellow-400 mb-3">
              Extracting resume text...
            </p>
          )}

          <textarea
            value={resume}
            onChange={(e) =>
              setResume(e.target.value)
            }
            rows={12}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4"
            placeholder="Upload a PDF or paste resume content..."
          />

          {resume && (
            <p className="text-xs text-slate-500 mt-2">
              {resume.length} characters extracted
            </p>
          )}

        </div>


        {/* Job Description */}

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Job Description
          </h2>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(e.target.value)
            }
            rows={12}
            className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4"
            placeholder="Paste job description..."
          />

        </div>

      </div>


      {/* =========================
          ANALYZE BUTTON
      ========================== */}

      <div className="flex justify-center mt-8">

        <button
          onClick={handleAnalyze}
          disabled={loading || extracting}
          className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {extracting
            ? "Reading Resume..."
            : loading
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>

      </div>


      {/* =========================
          RESULTS
      ========================== */}

      {result && !result.error && (

        <div className="mt-12">

          {/* Scores */}

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3>ATS Score</h3>
              <p className="text-4xl font-bold">
                {result.ats_score}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3>Semantic Match</h3>
              <p className="text-4xl font-bold">
                {result.semantic_match}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3>Technical Score</h3>
              <p className="text-4xl font-bold">
                {result.technical_score}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3>Career Score</h3>
              <p className="text-4xl font-bold">
                {result.career_score}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3>Behavior Score</h3>
              <p className="text-4xl font-bold">
                {result.behavioral_score}
              </p>
            </div>

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6">
              <h3>Recommendation</h3>
              <p className="text-3xl font-bold">
                {result.recommendation}
              </p>
            </div>

          </div>


          {/* Skill Gap Analysis */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            {/* Required */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Required Skills
              </h3>

              {result.required_skills?.length ? (
                result.required_skills.map(
                  (skill) => (
                    <p key={skill}>
                      • {skill}
                    </p>
                  )
                )
              ) : (
                <p>No skills detected</p>
              )}

            </div>


            {/* Matched */}

            <div className="bg-green-900/20 border border-green-700 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Matched Skills
              </h3>

              {result.matched_skills?.length ? (
                result.matched_skills.map(
                  (skill) => (
                    <p key={skill}>
                      ✅ {skill}
                    </p>
                  )
                )
              ) : (
                <p>No matched skills</p>
              )}

            </div>


            {/* Missing */}

            <div className="bg-red-900/20 border border-red-700 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Missing Skills
              </h3>

              {result.missing_skills?.length ? (
                result.missing_skills.map(
                  (skill) => (
                    <p key={skill}>
                      ❌ {skill}
                    </p>
                  )
                )
              ) : (
                <p>No missing skills</p>
              )}

            </div>

          </div>


          {/* AI Feedback */}

          <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">

            <h3 className="text-xl font-semibold mb-4">
              AI Resume Feedback
            </h3>

            {result.ai_feedback ? (
              <div className="whitespace-pre-wrap text-slate-300 leading-8">
                {result.ai_feedback}
              </div>
            ) : (
              <p className="text-slate-500">
                No AI feedback available.
              </p>
            )}

          </div>

        </div>
      )}

    </div>
  );
}