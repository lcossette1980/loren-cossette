"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect } from "react";

interface PostEditorProps {
  content: string;
  onChange: (html: string) => void;
  onImageUpload: () => Promise<string | null>;
}

function ToolbarButton({
  onClick,
  active,
  children,
  title,
}: {
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`px-2.5 py-1.5 text-xs font-mono rounded transition-colors ${
        active
          ? "bg-bg-secondary text-accent-cyan"
          : "text-text-secondary hover:text-text-primary hover:bg-bg-secondary"
      }`}
    >
      {children}
    </button>
  );
}

export function PostEditor({ content, onChange, onImageUpload }: PostEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: {
          HTMLAttributes: {
            class: "bg-bg-secondary rounded-lg p-4 font-mono text-sm my-4 overflow-x-auto",
          },
        },
        heading: {
          levels: [2, 3],
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg max-w-full my-4",
        },
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-accent-cyan underline underline-offset-2",
        },
      }),
      Placeholder.configure({
        placeholder: "Start writing your post...",
      }),
    ],
    content,
    onUpdate: ({ editor: ed }) => {
      onChange(ed.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose-editor outline-none min-h-[400px] px-5 py-4",
      },
    },
    // Prevent SSR hydration issues
    immediatelyRender: false,
  });

  // Sync external content changes (e.g., when loading initial data)
  useEffect(() => {
    if (editor && content && editor.getHTML() !== content) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) {
    return (
      <div className="bg-bg-tertiary border border-border-default rounded-lg min-h-[460px] flex items-center justify-center">
        <span className="text-text-muted text-sm">Loading editor...</span>
      </div>
    );
  }

  async function handleImageUpload() {
    const url = await onImageUpload();
    if (url && editor) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }

  function handleLink() {
    if (!editor) return;
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL:", previousUrl || "https://");

    if (url === null) return;

    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor
      .chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }

  return (
    <div className="border border-border-default rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-0.5 px-2 py-2 border-b border-border-default bg-bg-secondary/50">
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
          title="Bold"
        >
          B
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
          title="Italic"
        >
          I
        </ToolbarButton>

        <span className="w-px h-5 bg-border-default mx-1" />

        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          H2
        </ToolbarButton>
        <ToolbarButton
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          H3
        </ToolbarButton>

        <span className="w-px h-5 bg-border-default mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
          title="Bullet List"
        >
          UL
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
          title="Ordered List"
        >
          OL
        </ToolbarButton>

        <span className="w-px h-5 bg-border-default mx-1" />

        <ToolbarButton
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
          title="Blockquote"
        >
          &ldquo;&rdquo;
        </ToolbarButton>
        <ToolbarButton
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
          title="Code Block"
        >
          {"</>"}
        </ToolbarButton>

        <span className="w-px h-5 bg-border-default mx-1" />

        <ToolbarButton onClick={handleLink} active={editor.isActive("link")} title="Link">
          Link
        </ToolbarButton>
        <ToolbarButton onClick={handleImageUpload} title="Insert Image">
          Img
        </ToolbarButton>
      </div>

      {/* Editor content */}
      <div className="bg-bg-tertiary text-text-primary">
        <EditorContent editor={editor} />
      </div>

      {/* Editor styles */}
      <style jsx global>{`
        .prose-editor h2 {
          font-size: 1.5rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 0.75rem;
          color: var(--text-primary);
        }
        .prose-editor h3 {
          font-size: 1.25rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        .prose-editor p {
          margin-bottom: 0.75rem;
          line-height: 1.75;
          color: var(--text-secondary);
        }
        .prose-editor ul,
        .prose-editor ol {
          padding-left: 1.5rem;
          margin-bottom: 0.75rem;
          color: var(--text-secondary);
        }
        .prose-editor ul {
          list-style-type: disc;
        }
        .prose-editor ol {
          list-style-type: decimal;
        }
        .prose-editor li {
          margin-bottom: 0.25rem;
        }
        .prose-editor blockquote {
          border-left: 3px solid var(--accent-cyan);
          padding-left: 1rem;
          margin: 1rem 0;
          color: var(--text-muted);
          font-style: italic;
        }
        .prose-editor img {
          border-radius: 0.5rem;
          max-width: 100%;
          margin: 1rem 0;
        }
        .prose-editor a {
          color: var(--accent-cyan);
          text-decoration: underline;
          text-underline-offset: 2px;
        }
        .prose-editor code {
          background: var(--bg-secondary);
          padding: 0.15rem 0.4rem;
          border-radius: 0.25rem;
          font-family: var(--font-mono);
          font-size: 0.875rem;
        }
        .prose-editor pre code {
          background: none;
          padding: 0;
        }
        .prose-editor .is-editor-empty:first-child::before {
          content: attr(data-placeholder);
          float: left;
          color: var(--text-muted);
          pointer-events: none;
          height: 0;
        }
      `}</style>
    </div>
  );
}
