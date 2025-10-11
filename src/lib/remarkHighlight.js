import { visit } from "unist-util-visit";

export default function remarkHighlight() {
  const regex = /==([^=\n]+)==/g; // kein Zeilenumbruch, simpel & schnell
  return (tree) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent) return;
      // Nicht innerhalb von Code/Inline-Code/HTML
      if (parent.type === "link" || parent.type === "inlineCode" || parent.type === "html") return;
      if (parent.type === "code") return;

      const value = node.value;
      let match, last = 0;
      const parts = [];
      while ((match = regex.exec(value)) !== null) {
        if (match.index > last) parts.push({ type: "text", value: value.slice(last, match.index) });
        parts.push({ type: "html", value: `<mark class="md-hl">${match[1]}</mark>` });
        last = match.index + match[0].length;
      }
      if (!parts.length) return;
      if (last < value.length) parts.push({ type: "text", value: value.slice(last) });
      parent.children.splice(index, 1, ...parts);
    });
  };
}
