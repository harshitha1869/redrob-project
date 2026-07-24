export async function analyzeResume(
  resume: string,
  jobDescription: string
) {
  const response = await fetch(
    "http://localhost:8000/analyze",
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

  return response.json();
}