"use client";

import { useRef } from "react";
import { Button, Group, Grid } from "@mantine/core";

const colors = {
  gray: "30",
  red: "31",
  green: "32",
  yellow: "33",
  blue: "34",
  magenta: "35",
  cyan: "36",
  white: "37",
};

export default function TextEditor() {
  const editorRef = useRef(null);

  const applyStyle = (styleType, value) => {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;
    const range = selection.getRangeAt(0);
    const span = document.createElement("span");
    
    if (styleType === "fg") {
      span.style.color = value;
      span.dataset.ansi = `\x1b[${value}m`;
    } else if (styleType === "bg") {
      span.style.backgroundColor = value;
      span.dataset.ansi = `\x1b[4${value.charAt(1)}m`;
    } else if (styleType === "bold") {
      span.style.fontWeight = "bold";
      span.dataset.ansi = "\x1b[1m";
    } else if (styleType === "underline") {
      span.style.textDecoration = "underline";
      span.dataset.ansi = "\x1b[4m";
    }
    
    span.appendChild(range.extractContents());
    range.insertNode(span);
  };

  const copyAnsiText = () => {
    const spans = editorRef.current.querySelectorAll("span");
    let ansiText = "";
    spans.forEach(span => {
      ansiText += span.dataset.ansi + span.textContent + "\x1b[0m";
    });
    navigator.clipboard.writeText(ansiText);
    alert("ANSI formatted text copied!");
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20, borderRadius: "10px", boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)", backgroundColor: "#222", color: "#ddd" }}>
      {/* Color Selection */}
      <Grid gutter="xs">
        <Grid.Col span={6}>
          <strong>Font Colour Options</strong>
          <Group>
            {Object.entries(colors).map(([key, value]) => (
              <Button
                key={key}
                style={{ backgroundColor: key, width: 35, height: 35, borderRadius: "50%" }}
                onClick={() => applyStyle("fg", key)}
              />
            ))}
          </Group>
        </Grid.Col>
        <Grid.Col span={6}>
          <strong>Background Colour Options</strong>
          <Group>
            {Object.entries(colors).map(([key, value]) => (
              <Button
                key={key}
                style={{ backgroundColor: key, width: 35, height: 35, borderRadius: "50%" }}
                onClick={() => applyStyle("bg", key)}
              />
            ))}
          </Group>
        </Grid.Col>
      </Grid>
      
      {/* Bold & Underline */}
      <Group mt="md">
        <Button onClick={() => applyStyle("bold")} style={{ background: "linear-gradient(45deg, #ff416c, #ff4b2b)", color: "white" }}>
          Bold
        </Button>
        <Button onClick={() => applyStyle("underline")} style={{ background: "linear-gradient(45deg, #36d1dc, #5b86e5)", color: "white" }}>
          Underline
        </Button>
      </Group>

      {/* Text Editor */}
      <div
        ref={editorRef}
        contentEditable
        style={{
          minHeight: "120px",
          border: "2px solid #444",
          padding: "10px",
          marginTop: "10px",
          backgroundColor: "#333",
          borderRadius: "5px",
          boxShadow: "inset 0px 0px 5px rgba(255,255,255,0.1)"
        }}
      ></div>

      {/* Copy ANSI Text Button */}
      <Group mt="md">
        <Button onClick={copyAnsiText} style={{ background: "linear-gradient(45deg, #ff9a9e, #fad0c4)", color: "black" }}>
          Copy ANSI Text
        </Button>
      </Group>
    </div>
  );
}
