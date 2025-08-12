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
import Table from '@tiptap/extension-table'
import TableRow from '@tiptap/extension-table-row'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Code,
  Quote,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Table as TableIcon,
  Image as ImageIcon,
  Link as LinkIcon,
  Unlink,
  Palette,
  Highlighter,
  Type,
  Undo,
  Redo,
  Save
} from 'lucide-react'
import { useState } from 'react'

interface RichTextEditorProps {
  content: string
  onChange: (content: string) => void
  placeholder?: string
  className?: string
}

const MenuBar = ({ editor }: { editor: any }) => {
  const [showColorPicker, setShowColorPicker] = useState(false)
  const [showLinkInput, setShowLinkInput] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [showImageInput, setShowImageInput] = useState(false)
  const [imageUrl, setImageUrl] = useState('')

  if (!editor) {
    return null
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
      setShowImageInput(false)
    }
  }

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run()
      setLinkUrl('')
      setShowLinkInput(false)
    }
  }

  const addTable = () => {
    editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()
  }

  return (
    <div className="border-b border-slate-700 bg-slate-800 p-4 rounded-t-lg">
      <div className="flex flex-wrap items-center gap-2">
        {/* Text Formatting */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('bold') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('italic') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('underline') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('strike') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <Strikethrough size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCode().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('code') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <Code size={16} />
          </button>
        </div>

        {/* Text Alignment */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive({ textAlign: 'left' }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive({ textAlign: 'center' }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive({ textAlign: 'right' }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <AlignRight size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive({ textAlign: 'justify' }) ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <AlignJustify size={16} />
          </button>
        </div>

        {/* Lists and Blocks */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('bulletList') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('orderedList') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <ListOrdered size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('blockquote') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <Quote size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('codeBlock') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
          >
            <Code size={16} />
          </button>
        </div>

        {/* Advanced Features */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={addTable}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Insert Table"
          >
            <TableIcon size={16} />
          </button>
          <button
            onClick={() => setShowImageInput(true)}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Insert Image"
          >
            <ImageIcon size={16} />
          </button>
          <button
            onClick={() => setShowLinkInput(true)}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Insert Link"
          >
            <LinkIcon size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().unsetLink().run()}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Remove Link"
          >
            <Unlink size={16} />
          </button>
        </div>

        {/* Colors and Highlighting */}
        <div className="flex items-center gap-1 border-r border-slate-600 pr-2">
          <button
            onClick={() => setShowColorPicker(!showColorPicker)}
            className="p-2 rounded hover:bg-slate-700 text-slate-300"
            title="Text Color"
          >
            <Palette size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded hover:bg-slate-700 ${editor.isActive('highlight') ? 'bg-blue-600 text-white' : 'text-slate-300'}`}
            title="Highlight Text"
          >
            <Highlighter size={16} />
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

      {/* Color Picker */}
      {showColorPicker && (
        <div className="mt-4 p-3 bg-slate-700 rounded-lg">
          <div className="grid grid-cols-8 gap-2">
            {['#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f7f7f7', '#ffffff', '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff', '#e6b8af', '#f4cccc', '#fce5cd', '#fff2cc', '#d9ead3', '#d0e0e3', '#c9daf8', '#cfe2f3', '#d9d2e9', '#ead1dc', '#dd7e6b', '#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#a4c2f4', '#a4c2f4', '#c3c0e5', '#d5a6bd'].map((color) => (
              <button
                key={color}
                onClick={() => {
                  editor.chain().focus().setColor(color).run()
                  setShowColorPicker(false)
                }}
                className="w-6 h-6 rounded border border-slate-600 hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                title={color}
              />
            ))}
          </div>
        </div>
      )}

      {/* Link Input */}
      {showLinkInput && (
        <div className="mt-4 p-3 bg-slate-700 rounded-lg">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Enter URL..."
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            />
            <button
              onClick={setLink}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setShowLinkInput(false)}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Image Input */}
      {showImageInput && (
        <div className="mt-4 p-3 bg-slate-700 rounded-lg">
          <div className="flex gap-2">
            <input
              type="url"
              placeholder="Enter image URL..."
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="flex-1 px-3 py-2 bg-slate-600 border border-slate-500 rounded text-white placeholder-slate-400"
            />
            <button
              onClick={addImage}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
            >
              Add
            </button>
            <button
              onClick={() => setShowImageInput(false)}
              className="px-4 py-2 bg-slate-600 hover:bg-slate-500 text-white rounded transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function RichTextEditor({ content, onChange, placeholder = 'Start writing...', className = '' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Underline,
      Color,
      Highlight,
      CodeBlock,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Placeholder.configure({
        placeholder,
      }),
      Typography,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
    editorProps: {
      attributes: {
        class: 'prose prose-invert prose-slate max-w-none focus:outline-none',
      },
    },
  })

  return (
    <div className={`bg-slate-800 rounded-lg border border-slate-700 ${className}`}>
      <MenuBar editor={editor} />
      <div className="p-4">
        <EditorContent editor={editor} className="min-h-[400px] text-white" />
      </div>
    </div>
  )
}
