
import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
    // Initialize from localStorage or default to light
    const [theme, setTheme] = useState(
        () => localStorage.getItem('theme') || 'light'
    );

    // Whenever theme changes, update <html> attribute and localStorage
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Toggle function
    const toggleTheme = () =>
        setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}
