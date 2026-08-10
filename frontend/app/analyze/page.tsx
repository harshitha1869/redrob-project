"use client";

import { useState } from "react";

export default function Analyze() {
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
const handleAnalyze = async () => {
  try {
    console.log("Analyze button clicked");

    setLoading(true);

    const response = await fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/analyze`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume,
          job_description: jobDescription,
        }),
      }
    );

    const data = await response.json();

    console.log("API Response:", data);

    setResult(data);
  } catch (error) {
    console.error("ERROR:", error);
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            AI Resume Analysis
          </h1>

          <p className="text-slate-400 mt-4">
            Upload your resume and compare it against any job description using AI.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
           <h2 className="text-xl font-semibold mb-4">
  Resume
</h2>

<input
  type="file"
  accept=".pdf"
  className="mb-4 w-full rounded-lg border border-slate-700 bg-slate-900 p-3"
  onChange={(e) =>
    setFile(e.target.files?.[0] || null)
  }
/>
            <textarea
              value={resume}
              onChange={(e) => setResume(e.target.value)}
              rows={12}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4"
              placeholder="Paste resume content..."
            />
          </div>

          <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl p-6">
            <h2 className="text-xl font-semibold mb-4">
              Job Description
            </h2>

            <textarea
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              rows={12}
              className="w-full rounded-xl bg-slate-900 border border-slate-700 p-4"
              placeholder="Paste job description..."
            />
          </div>

        </div>

        <div className="flex justify-center mt-8">
          <button
            onClick={handleAnalyze}
            className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 hover:scale-105 transition"
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
        </div>

        {result && (
  <>
    <div className="grid md:grid-cols-3 gap-6 mt-12">

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

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Required Skills
              </h3>

              {result.required_skills?.length ? (
                result.required_skills.map((skill: string) => (
                  <p key={skill}>• {skill}</p>
                ))
              ) : (
                <p>No skills detected</p>
              )}
            </div>

            <div className="bg-green-900/20 border border-green-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Matched Skills
              </h3>

              {result.matched_skills?.length ? (
                result.matched_skills.map((skill: string) => (
                  <p key={skill}>✅ {skill}</p>
                ))
              ) : (
                <p>No matched skills</p>
              )}
            </div>

            <div className="bg-red-900/20 border border-red-700 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">
                Missing Skills
              </h3>

              {result.missing_skills?.length ? (
                result.missing_skills.map((skill: string) => (
                  <p key={skill}>❌ {skill}</p>
                ))
              ) : (
                <p>No missing skills</p>
              )}
            </div>
            {/* AI Resume Feedback */}
<div className="mt-8">
  <div className="bg-white/5 backdrop-blur-lg border border-cyan-500 rounded-3xl p-8">
    <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">
      🤖 AI Resume Feedback
    </h2>

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

                    </div>
    </>
)}
      </div>
    </main>
  );
}