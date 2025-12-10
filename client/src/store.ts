import { atom } from 'jotai';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
  dueDate?: string;
}

export const youtubeUrlAtom = atom<string>('');
export const isPlayingAtom = atom<boolean>(false);
export const volumeAtom = atom<number>(0.5);

export const notesAtom = atom<string>('# My Capstone Project\n\n## Chapter 1: Introduction\n\nStart drafting your introduction here...\n\n## Tasks\n- [ ] Define problem statement\n- [ ] Review related literature');

export const tasksAtom = atom<Task[]>([
  { id: '1', text: 'Submit Chapter 1 Draft', completed: false, dueDate: '2025-12-15' },
  { id: '2', text: 'Design Database Schema', completed: true },
  { id: '3', text: 'Setup React Project', completed: false },
]);

// AI/Tools State
export const aiLoadingAtom = atom<boolean>(false);
export const aiResultAtom = atom<string | null>(null);

export const referenceTypeAtom = atom<'APA' | 'MLA' | 'IEEE'>('APA');
export const referenceResultAtom = atom<string | null>(null);

export const grammarTextAtom = atom<string>('');
export const grammarResultAtom = atom<string | null>(null);

export const searchQueryAtom = atom<string>('');
export const searchResultsAtom = atom<any[]>([]);

export const definitionWordAtom = atom<string>('');
export const definitionResultAtom = atom<any | null>(null);

export const codeSnippetAtom = atom<string>('');
export const codeResultAtom = atom<string | null>(null);

export const diagramPromptAtom = atom<string>('');
export const diagramResultAtom = atom<string | null>(null);
