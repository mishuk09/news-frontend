import React, { useContext, useState } from 'react';
import { ThemeContext } from '../hooks/ThemeContext';

export default function Poll() {
  const [selected, setSelected] = useState(null);
  const { theme } = useContext(ThemeContext);

  const options = [
    { id: 'yes', label: 'হ্যাঁ' },
    { id: 'no', label: 'না' },
    { id: 'no-opinion', label: 'মতামত নেই' },
  ];

  const handleVote = () => {
    if (selected) {
      // TODO: submit vote
      console.log('Voted for:', selected);
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}   rounded  p-2  mx-auto `}>
      {/* Header */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-2">
        <h2 className="text-xl font-bold   relative inline-block">
          আজকের প্রশ্ন

        </h2>
        <a href="#" className="  font-medium hover:underline">
          ফলাফল
        </a>
      </div>

      {/* Question */}
      <p className="mt-4  text-sm ">
        নির্বাচন নিয়ে অনেক ষড়যন্ত্র হচ্ছে। বিএনপির কেন্দ্রীয় কমিটির সদস্য ও সাবেক উপমন্ত্রী এম রুহুল কুদ্দুস তালুকদারের দূর্ণীতির এই বক্তব্যের সঙ্গে আপনি কি একমত?
      </p>

      {/* Options */}
      <div className="mt-6">
        {options.map((opt) => (
          <label key={opt.id} className="flex items-center border p-2 border-gray-300 rounded mb-2 cursor-pointer">
            <input
              type="radio"
              name="poll"
              value={opt.id}
              checked={selected === opt.id}
              onChange={() => setSelected(opt.id)}
              className="form-radio h-5 w-5 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <span className="ml-3  text-sm">{opt.label}</span>
          </label>
        ))}
      </div>

      {/* Vote Button */}
      <button
        onClick={handleVote}
        // disabled={!selected}
        className="mt-4 text-white w-full bg-red-700   font-medium py-2 px-4 rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ভোট
      </button>
    </div>
  );
}
