import React, { useState, useEffect, useRef } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Cell } from '../../state';
import { useActions } from '../../hooks';
import { StyledTextEditor } from './TextEditor.style';

interface TextEditorProps {
  cell: Cell;
}

export const TextEditor: React.FC<TextEditorProps> = ({ cell }) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);

  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (event.target && ref.current?.contains(event.target as Node)) return;

      setEditing(false);
    };
    document.addEventListener('click', listener, { capture: true });

    return () => {
      document.removeEventListener('click', listener, { capture: true });
    };
  }, []);

  if (editing) {
    return (
      <StyledTextEditor ref={ref}>
        <MDEditor value={cell.content} onChange={(value) => updateCell(cell.id, value || '')} />
      </StyledTextEditor>
    );
  }

  return (
    <StyledTextEditor className='card' onClick={() => setEditing(true)}>
      <div className='card-content'>
        <MDEditor.Markdown source={cell.content || '## Click to edit'} />
      </div>
    </StyledTextEditor>
  );
};
