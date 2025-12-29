"use client";

import { SimpleEditor } from "@/components/tiptap-templates/simple/simple-editor";

export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Simple Editor Demo</h1>
      <SimpleEditor
        onChange={(content) => {
          console.log("Editor Content:", content);
        }}
      />
    </div>
  );
}
