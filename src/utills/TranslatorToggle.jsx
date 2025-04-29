import React, { useState } from 'react';

export default function TranslatorToggle({ initialText }) {
    const [text, setText] = useState(initialText);
    const [isTranslated, setIsTranslated] = useState(false);
    const [error, setError] = useState(null);

    // Vite will expose any env var prefixed with VITE_
    const API_KEY = import.meta.env.VITE_GOOGLE_TRANSLATE_KEY;
    const ENDPOINT = `https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`;

    const handleToggle = async () => {
        setError(null);

        if (!isTranslated) {
            try {
                const res = await fetch(ENDPOINT, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify({
                        q: [initialText],    // ← note the array
                        target: 'en',
                        format: 'text',
                    }),
                });

                const json = await res.json();

                if (!res.ok) {
                    // API returned an error payload
                    console.error('Translate API error:', json.error);
                    setError(json.error?.message || 'Translation failed');
                    return;
                }

                const translated = json.data.translations[0]?.translatedText;
                if (!translated) {
                    setError('No translation received');
                    return;
                }

                setText(translated);
            } catch (fetchErr) {
                console.error('Network error:', fetchErr);
                setError('Network error, please try again');
            }
        } else {
            // revert to original
            setText(initialText);
        }

        setIsTranslated(!isTranslated);
    };

    return (
        <div className="max-w-xl mx-auto p-4">
            <p className="mb-4 text-gray-800">{text}</p>

            {error && (
                <div className="mb-2 text-red-600 font-medium">
                    {error}
                </div>
            )}

            <button
                onClick={handleToggle}
                className={`
          inline-block px-4 py-2
          bg-blue-600 hover:bg-blue-700
          text-white font-semibold rounded-lg
          transition-colors duration-200
        `}
            >
                {isTranslated ? 'View Original' : 'Translate to English'}
            </button>
        </div>
    );
}
