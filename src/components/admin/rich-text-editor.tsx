'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import Underline from '@tiptap/extension-underline'
import Color from '@tiptap/extension-color'
import Highlight from '@tiptap/extension-highlight'
import CodeBlock from '@tiptap/extension-code-block'
import { Table, TableRow, TableCell, TableHeader } from '@tiptap/extension-table'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import { 
  Bold, 
  Italic, 
  Strikethrough, 
  Code, 
  Heading1, 
  Heading2, 
  List, 
  ListOrdered, 
  Quote, 
  Undo, 
  Redo,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Link as LinkIcon,
  Image as ImageIcon,
  Palette,
  Highlighter,
  Table as TableIcon,
  Type,
  Underline as UnderlineIcon
} from 'lucide-react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
}

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline cursor-pointer'
        }
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph']
      }),
      Underline,
      Color,
      Highlight,
      CodeBlock,
      Table.configure({
        resizable: true,
        HTMLAttributes: {
          class: 'border-collapse border border-slate-600'
        }
      }),
      TableRow,
      TableCell.configure({
        HTMLAttributes: {
          class: 'border border-slate-600 p-2'
        }
      }),
      TableHeader.configure({
        HTMLAttributes: {
          class: 'border border-slate-600 p-2 bg-slate-700 font-bold'
        }
      }),
      Placeholder.configure({
        placeholder
      }),
      Typography
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    }
  })

  if (!editor) {
    return null
  }

  const addImage = () => {
    const url = window.prompt('Enter image URL:')
    if (url) {
      editor.chain().focus().setImage({ src: url }).run()
    }
  }

  const addLink = () => {
    const url = window.prompt('Enter URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  const addRow = () => {
    editor.chain().focus().addRowAfter().run()
  }

  const addColumn = () => {
    editor.chain().focus().addColumnAfter().run()
  }

  const deleteRow = () => {
    editor.chain().focus().deleteRow().run()
  }

  const deleteColumn = () => {
    editor.chain().focus().deleteColumn().run()
  }

  const deleteTable = () => {
    editor.chain().focus().deleteTable().run()
  }

  return (
    <div className="border border-slate-600 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-slate-800 border-b border-slate-600 p-2 flex flex-wrap gap-1">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('strike') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('code') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Inline Code"
          >
            <Code size={16} />
          </button>
        </div>

        {/* Headings */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('heading', { level: 1 }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Heading 1"
          >
            <Heading1 size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('heading', { level: 2 }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Heading 2"
          >
            <Heading2 size={16} />
          </button>
        </div>

        {/* Lists */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Ordered List"
          >
            <ListOrdered size={16} />
          </button>
        </div>

        {/* Block Elements */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Quote"
          >
            <Quote size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('codeBlock') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Code Block"
          >
            <Code size={16} />
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Justify"
          >
            <AlignJustify size={16} />
          </button>
        </div>

        {/* Media & Links */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={addLink}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Add Link"
          >
            <LinkIcon size={16} />
          </button>
          <button
            onClick={addImage}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Add Image"
          >
            <ImageIcon size={16} />
          </button>
        </div>

        {/* Colors & Highlighting */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => {
              const color = window.prompt('Enter color (e.g., #ff0000, red):')
              if (color) {
                editor.chain().focus().setColor(color).run()
              }
            }}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Text Color"
          >
            <Palette size={16} />
          </button>
          <button
            onClick={() => {
              const color = window.prompt('Enter highlight color (e.g., #ffff00, yellow):')
              if (color) {
                editor.chain().focus().toggleHighlight({ color }).run()
              }
            }}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('highlight') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Highlight"
          >
            <Highlighter size={16} />
          </button>
        </div>

        {/* Tables */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={addTable}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Insert Table"
          >
            <TableIcon size={16} />
          </button>
          <button
            onClick={addRow}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Add Row"
          >
            <Type size={16} />
          </button>
          <button
            onClick={addColumn}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Add Column"
          >
            <Type size={16} />
          </button>
          <button
            onClick={deleteRow}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Delete Row"
          >
            <Type size={16} />
          </button>
          <button
            onClick={deleteColumn}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Delete Column"
          >
            <Type size={16} />
          </button>
          <button
            onClick={deleteTable}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Delete Table"
          >
            <Type size={16} />
          </button>
        </div>

        {/* History */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => editor.chain().focus().undo().run()}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Undo"
          >
            <Undo size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().redo().run()}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Redo"
          >
            <Redo size={16} />
          </button>
        </div>
      </div>

      {/* Editor Content */}
      <div className="bg-slate-900 min-h-[400px]">
        <EditorContent 
          editor={editor} 
          className="prose prose-invert prose-slate max-w-none p-4 focus:outline-none"
        />
      </div>
    </div>
  )
}
