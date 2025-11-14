import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { ThemeContext } from "../hooks/ThemeContext";

export default function Poll() {
  const { theme } = useContext(ThemeContext);
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState(false);
  const [message, setMessage] = useState("");

  const API_BASE = "https://news-backend-user.onrender.com/questionPool/question";

  // Fetch latest question
  const fetchLatestQuestion = async () => {
    try {
      const res = await axios.get(API_BASE);
      const questions = res.data;
      if (questions.length > 0) {
        // Sort by creation date and get latest
        const latest = questions.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        )[0];
        setQuestion(latest);
      }
    } catch (err) {
      console.error("Error fetching question:", err);
      setMessage("❌ প্রশ্ন লোড করা যায়নি");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLatestQuestion();
  }, []);

  const handleVote = async () => {
    if (!selected || !question) return;
    setVoting(true);
    setMessage("");

    try {
      await axios.post(`${API_BASE}/${question._id}/vote/${selected}`);
      setMessage("✅ আপনার ভোটটি গৃহীত হয়েছে!");
      // Refresh updated vote counts
      fetchLatestQuestion();
    } catch (err) {
      console.error(err);
      setMessage("❌ ভোট দিতে ব্যর্থ হয়েছেন। আবার চেষ্টা করুন।");
    } finally {
      setVoting(false);
    }
  };

  if (loading) {
    return (
      <div
        className= " rounded p-4 text-center"
      >
        <p className="text-gray-500">লোড হচ্ছে...</p>
      </div>
    );
  }

  if (!question) {
    return (
      <div
        className={`${theme === "dark" ? "dark-bg-color" : "bg-white"
          } rounded p-4 text-center`}
      >
        <p className="text-gray-500">কোন প্রশ্ন পাওয়া যায়নি।</p>
      </div>
    );
  }

  return (
    <div
      className={`${theme === "dark" ? "dark-bg-color text-white" : "bg-white text-gray-800"
        } rounded py-3 px-4 mx-auto shadow`}
    >
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <h2 className="text-2xl font-bold relative inline-block">আজকের প্রশ্ন</h2>
        <a href="/pool-result" target="_blank" className="font-medium hover:underline">
          ফলাফল
        </a>
      </div>

      {/* Question */}
      <p className="mt-4 text-xl   text-justify leading-tight">
        {question.questionText}
      </p>

      {/* Options */}
      <div className="mt-6">
        {question.options.map((opt) => (
          <label
            key={opt._id}
            className="flex items-center border p-2 border-gray-300 rounded mb-2 cursor-pointer hover:[var(--hover-bg)]"
          >
            <input
              type="radio"
              name="poll"
              value={opt._id}
              checked={selected === opt._id}
              onChange={() => setSelected(opt._id)}
              className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm">{opt.text}</span>
          </label>
        ))}
      </div>

      {/* Vote Button */}
      <button
        onClick={handleVote}
        disabled={!selected || voting}
        className="mt-4 text-white w-full bg-red-700 font-medium py-2 px-4 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {voting ? "ভোট পাঠানো হচ্ছে..." : "ভোট দিন"}
      </button>

      {/* Message */}
      {message && (
        <p className="mt-3 text-center text-sm font-medium text-gray-700">
          {message}
        </p>
      )}
    </div>
  );
}
