import { useEffect, useRef } from "react";

/** Runs the selected page's legacy interactions from one centralized source. */
export default function usePageScript(source, page = "home") {
  const done = useRef(false);
  useEffect(() => {
    if (done.current) return;
    done.current = true;
    const marker = `/* ===== ${page.toUpperCase()} PAGE INTERACTIONS ===== */`;
    const sections = source.split(/\/\* ===== [A-Z]+ PAGE INTERACTIONS ===== \*\//);
    const markers = [...source.matchAll(/\/\* ===== ([A-Z]+) PAGE INTERACTIONS ===== \*\//g)];
    const index = markers.findIndex((match) => match[1] === page.toUpperCase());
    if (index < 0) return;
    const code = sections[index + 1] || "";
    try { (0, eval)(code); } catch (error) { console.error(`Page interaction error (${page}):`, error); }
  }, [source, page]);
}
