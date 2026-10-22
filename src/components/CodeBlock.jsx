import { useEffect, useState } from "react";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";

// === Languages ===
import csharp from "react-syntax-highlighter/dist/cjs/languages/prism/csharp";
import sql from "react-syntax-highlighter/dist/cjs/languages/prism/sql";
import php from "react-syntax-highlighter/dist/cjs/languages/prism/php";
import css from "react-syntax-highlighter/dist/cjs/languages/prism/css";
import markup from "react-syntax-highlighter/dist/cjs/languages/prism/markup";   // HTML
import javascript from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import xml from "react-syntax-highlighter/dist/cjs/languages/prism/xml-doc";
import json from "react-syntax-highlighter/dist/cjs/languages/prism/json";

// Register languages
SyntaxHighlighter.registerLanguage("csharp", csharp);
SyntaxHighlighter.registerLanguage("sql", sql);
SyntaxHighlighter.registerLanguage("php", php);
SyntaxHighlighter.registerLanguage("css", css);
SyntaxHighlighter.registerLanguage("markup", markup);   // use language="markup" or "html"
SyntaxHighlighter.registerLanguage("html", markup);
SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("js", javascript);
SyntaxHighlighter.registerLanguage("xml", xml);
SyntaxHighlighter.registerLanguage("json", json);

// ======================================================
// Themes – designed to feel close to real editors
// ======================================================
const themes = {
  dark: {
    label: "Dark",
    // Inspired by Visual Studio Dark + VS Code Dark+
    bg: "#1E1E1E",
    text: "#D4D4D4",
    border: "#3C3C3C",
    toolbarBg: "#252526",
    // Token colors
    keyword: "#569CD6",
    control: "#C586C0",       // if, else, return, etc.
    string: "#CE9178",
    stringEscape: "#D7BA7D",
    number: "#B5CEA8",
    comment: "#6A9955",
    className: "#4EC9B0",
    function: "#DCDCAA",
    variable: "#9CDCFE",
    property: "#9CDCFE",
    operator: "#D4D4D4",
    punctuation: "#D4D4D4",
    tag: "#569CD6",
    attrName: "#9CDCFE",
    attrValue: "#CE9178",
    boolean: "#569CD6",
    builtin: "#4EC9B0",
    regex: "#D16969",
  },

  light: {
    label: "Light",
    // Inspired by Visual Studio Light
    bg: "#FFFFFF",
    text: "#000000",
    border: "#D4D4D4",
    toolbarBg: "#F3F3F3",
    keyword: "#0000FF",
    control: "#AF00DB",
    string: "#A31515",
    stringEscape: "#FF0000",
    number: "#098658",
    comment: "#008000",
    className: "#267F99",
    function: "#795E26",
    variable: "#001080",
    property: "#001080",
    operator: "#000000",
    punctuation: "#000000",
    tag: "#800000",
    attrName: "#FF0000",
    attrValue: "#0000FF",
    boolean: "#0000FF",
    builtin: "#267F99",
    regex: "#811F3F",
  },

  blue: {
    label: "Blue",
    // Clean light theme – great for printed / classroom material
    bg: "#FFFFFF",
    text: "#1E1E1E",
    border: "#B8C7E5",
    toolbarBg: "#D0D8F0",
    keyword: "#0000FF",
    control: "#AF00DB",
    string: "#A31515",
    stringEscape: "#FF0000",
    number: "#098658",
    comment: "#008000",
    className: "#267F99",
    function: "#795E26",
    variable: "#001080",
    property: "#001080",
    operator: "#000000",
    punctuation: "#000000",
    tag: "#800000",
    attrName: "#FF0000",
    attrValue: "#0000FF",
    boolean: "#0000FF",
    builtin: "#267F99",
    regex: "#811F3F",
  },
};

function makeSyntaxStyle(themeName) {
  const t = themes[themeName];

  return {
    'pre[class*="language-"]': {
      background: t.bg,
      color: t.text,
      margin: 0,
      padding: "18px 20px",
      fontSize: "14px",
      lineHeight: 1.7,
      overflowX: "auto",
      fontFamily: '"Cascadia Code", "Cascadia Mono", Consolas, "Courier New", monospace',
    },
    'code[class*="language-"]': {
      background: "transparent",
      color: t.text,
      fontFamily: '"Cascadia Code", "Cascadia Mono", Consolas, "Courier New", monospace',
    },

    // Comments
    comment: { color: t.comment, fontStyle: "italic" },
    prolog: { color: t.comment },
    doctype: { color: t.comment },
    cdata: { color: t.comment },

    // Keywords & control flow
    keyword: { color: t.keyword },
    "keyword.control": { color: t.control },
    "keyword.operator": { color: t.operator },

    // Strings & numbers
    string: { color: t.string },
    "string.escape": { color: t.stringEscape },
    char: { color: t.string },
    number: { color: t.number },
    boolean: { color: t.boolean },
    constant: { color: t.number },

    // Functions, classes, variables
    function: { color: t.function },
    "function-variable": { color: t.function },
    "class-name": { color: t.className },
    "class-name.class-name": { color: t.className },
    builtin: { color: t.builtin },
    variable: { color: t.variable },
    property: { color: t.property },
    "property-access": { color: t.property },

    // HTML / XML / Markup
    tag: { color: t.tag },
    "tag.tag": { color: t.tag },
    "attr-name": { color: t.attrName },
    "attr-value": { color: t.attrValue },
    "attr-value.punctuation": { color: t.punctuation },

    // Operators & punctuation
    operator: { color: t.operator },
    punctuation: { color: t.punctuation },
    "punctuation.definition": { color: t.punctuation },

    // Regex
    regex: { color: t.regex },

    // Misc
    important: { color: t.keyword, fontWeight: "bold" },
    entity: { color: t.className },
    url: { color: t.string },
  };
}

export default function CodeBlock({
  code,
  language = "javascript",
  initialTheme = "blue",
}) {
  const [theme, setTheme] = useState(initialTheme);
  const [loaded, setLoaded] = useState(false);

  // Restore preference
  useEffect(() => {
    try {
      const saved = localStorage.getItem("guide-code-theme");
      if (saved && themes[saved]) {
        setTheme(saved);
      }
    } catch {
      // ignore
    }
    setLoaded(true);
  }, []);

  // Save preference
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem("guide-code-theme", theme);
    } catch {
      // ignore
    }
  }, [theme, loaded]);

  const selected = themes[theme];

  // Normalize some common language aliases
  const lang = language === "html" ? "markup" : language;

  return (
    <section
      className={`guide-code guide-code--${theme}`}
      style={{
        border: `1px solid ${selected.border}`,
        borderRadius: 8,
        overflow: "hidden",
        margin: "16px 0 28px",
        boxShadow: theme === "dark" ? "0 2px 8px rgba(0,0,0,0.3)" : "0 1px 4px rgba(0,0,0,0.08)",
      }}
    >
      {/* Toolbar */}
      <div
        className="guide-code__toolbar"
        style={{
          display: "flex",
          gap: 6,
          padding: "8px 10px",
          background: selected.toolbarBg,
          borderBottom: `1px solid ${selected.border}`,
        }}
      >
        {Object.entries(themes).map(([key, item]) => (
          <button
            key={key}
            type="button"
            aria-pressed={theme === key}
            onClick={() => setTheme(key)}
            style={{
              flex: 1,
              padding: "7px 12px",
              border: 0,
              borderRadius: 20,
              cursor: "pointer",
              fontSize: 13.5,
              fontWeight: theme === key ? 600 : 400,
              color: theme === "dark" ? "#CCCCCC" : "#333333",
              background:
                theme === key
                  ? theme === "dark"
                    ? "#3E3E42"
                    : "#FFFFFF"
                  : "transparent",
              boxShadow: theme === key && theme !== "dark" ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
              transition: "all 0.15s ease",
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Code */}
      <SyntaxHighlighter
        language={lang}
        style={makeSyntaxStyle(theme)}
        showLineNumbers={false}
        wrapLongLines={false}
        customStyle={{ margin: 0 }}
      >
        {code.trimEnd()}
      </SyntaxHighlighter>
    </section>
  );
}
