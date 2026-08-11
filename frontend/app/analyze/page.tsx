"use client";

import { useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

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

    // Check file type
    if (
      selectedFile.type !== "application/pdf" &&
      !selectedFile.name.toLowerCase().endsWith(".pdf")
    ) {
      alert("Please upload a PDF file.");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
    setExtracting(true);
    setResult(null);
    setResume("");

    try {
      console.log("Reading PDF:", selectedFile.name);

      const arrayBuffer = await selectedFile.arrayBuffer();
const pdf = await pdfjsLib.getDocument({
  data: new Uint8Array(arrayBuffer),
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
          .map((item: any) => {
            if ("str" in item) {
              return item.str;
            }

            return "";
          })
          .join(" ");

        extractedText += pageText + "\n";
      }

      extractedText = extractedText.trim();

      console.log(
        "Extracted resume characters:",
        extractedText.length
      );

      if (!extractedText) {
        alert(
          "No text could be extracted from this PDF. Please make sure your PDF contains selectable text, or paste your resume manually."
        );
        return;
      }

      setResume(extractedText);

      console.log("Resume extraction successful.");
    } catch (error) {
      console.error("PDF extraction error:", error);

      setResume("");

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

      // Validate resume
      if (!resume.trim()) {
        alert(
          "Please upload a resume PDF or paste your resume."
        );
        return;
      }

      // Validate job description
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

      // ==========================================
      // API URL
      // ==========================================

      const apiUrl =
        process.env.NEXT_PUBLIC_API_URL?.trim();

      if (!apiUrl) {
        throw new Error(
          "NEXT_PUBLIC_API_URL is not configured. Please add it to your Vercel environment variables."
        );
      }

      // Remove trailing slash
      const cleanApiUrl = apiUrl.replace(/\/+$/, "");

      const endpoint = `${cleanApiUrl}/analyze`;

      console.log("Calling API:", endpoint);

      // ==========================================
      // API REQUEST
      // ==========================================

      const response = await fetch(endpoint, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          resume: resume.trim(),
          job_description: jobDescription.trim(),
        }),
      });

      console.log(
        "API status:",
        response.status
      );

      // ==========================================
      // READ RESPONSE
      // ==========================================

      let data: AnalysisResult;

      try {
        data = await response.json();
      } catch {
        throw new Error(
          `Backend returned an invalid response. HTTP status: ${response.status}`
        );
      }

      console.log(
        "API Response:",
        JSON.stringify(data, null, 2)
      );

      // ==========================================
      // HANDLE HTTP ERRORS
      // ==========================================

      if (!response.ok) {
        throw new Error(
          data?.error ||
            `API request failed with status ${response.status}`
        );
      }

      // ==========================================
      // HANDLE BACKEND ERROR
      // ==========================================

      if (data?.error) {
        throw new Error(data.error);
      }

      // ==========================================
      // SUCCESS
      // ==========================================

      setResult(data);

    } catch (error) {
      console.error(
        "Analyze error:",
        error
      );

      const message =
        error instanceof Error
          ? error.message
          : "Failed to analyze resume.";

      alert(message);

    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // UI
  // ==========================================

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

        {/* =========================
            RESUME
        ========================== */}

        <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6">

          <h2 className="text-xl font-semibold mb-4">
            Resume
          </h2>

          <input
            type="file"
            accept=".pdf,application/pdf"
            className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
            onChange={handleFileChange}
            disabled={extracting || loading}
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
            className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4 outline-none focus:border-cyan-500"
            placeholder="Upload a PDF or paste resume content..."
            disabled={extracting || loading}
          />

          {resume && (
            <p className="text-xs text-slate-500 mt-2">
              {resume.length} characters extracted
            </p>
          )}

        </div>


        {/* =========================
            JOB DESCRIPTION
        ========================== */}

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
            className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4 outline-none focus:border-cyan-500"
            placeholder="Paste job description..."
            disabled={loading}
          />

          <p className="text-xs text-slate-500 mt-2">
            {jobDescription.length} characters
          </p>

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

          {/* =========================
              SCORES
          ========================== */}

          <div className="grid md:grid-cols-3 gap-6">

            {/* ATS */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <h3>ATS Score</h3>

              <p className="text-4xl font-bold">
                {result.ats_score ?? 0}
              </p>

            </div>


            {/* Semantic */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <h3>Semantic Match</h3>

              <p className="text-4xl font-bold">
                {result.semantic_match ?? 0}
              </p>

            </div>


            {/* Technical */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <h3>Technical Score</h3>

              <p className="text-4xl font-bold">
                {result.technical_score ?? 0}
              </p>

            </div>


            {/* Career */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <h3>Career Score</h3>

              <p className="text-4xl font-bold">
                {result.career_score ?? 0}
              </p>

            </div>


            {/* Behavioral */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <h3>Behavior Score</h3>

              <p className="text-4xl font-bold">
                {result.behavioral_score ?? 0}
              </p>

            </div>


            {/* Recommendation */}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-6">

              <h3>Recommendation</h3>

              <p className="text-3xl font-bold">
                {result.recommendation ?? "N/A"}
              </p>

            </div>

          </div>


          {/* =========================
              SKILL GAP ANALYSIS
          ========================== */}

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            {/* Required */}

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Required Skills
              </h3>

              {result.required_skills?.length ? (

                <div className="space-y-2">

                  {result.required_skills.map(
                    (skill, index) => (
                      <p key={`${skill}-${index}`}>
                        • {skill}
                      </p>
                    )
                  )}

                </div>

              ) : (

                <p className="text-slate-400">
                  No skills detected
                </p>

              )}

            </div>


            {/* Matched */}

            <div className="bg-green-900/20 border border-green-700 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Matched Skills
              </h3>

              {result.matched_skills?.length ? (

                <div className="space-y-2">

                  {result.matched_skills.map(
                    (skill, index) => (
                      <p key={`${skill}-${index}`}>
                        ✅ {skill}
                      </p>
                    )
                  )}

                </div>

              ) : (

                <p className="text-slate-400">
                  No matched skills
                </p>

              )}

            </div>


            {/* Missing */}

            <div className="bg-red-900/20 border border-red-700 rounded-2xl p-6">

              <h3 className="text-xl font-semibold mb-4">
                Missing Skills
              </h3>

              {result.missing_skills?.length ? (

                <div className="space-y-2">

                  {result.missing_skills.map(
                    (skill, index) => (
                      <p key={`${skill}-${index}`}>
                        ❌ {skill}
                      </p>
                    )
                  )}

                </div>

              ) : (

                <p className="text-slate-400">
                  No missing skills
                </p>

              )}

            </div>

          </div>


          {/* =========================
              AI FEEDBACK
          ========================== */}

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