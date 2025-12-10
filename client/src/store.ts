import { atom } from 'jotai';

export interface Task {
  id: string;
  text: string;
  completed: boolean;
}

export const youtubeUrlAtom = atom<string>('');
export const isPlayingAtom = atom<boolean>(false);
export const volumeAtom = atom<number>(0.5);

export const notesAtom = atom<string>('# My Study Notes\n\n- [ ] Review lecture slides\n- [ ] Draft outline for project\n\nStart typing here...');

export const tasksAtom = atom<Task[]>([
  { id: '1', text: 'Research for Physics paper', completed: false },
  { id: '2', text: 'Email professor about deadline', completed: true },
  { id: '3', text: 'Read Chapter 4', completed: false },
]);

// AI/Tools State
export const aiLoadingAtom = atom<boolean>(false);
export const aiResultAtom = atom<string | null>(null); // For Abstract

export const referenceTypeAtom = atom<'APA' | 'MLA' | 'Chicago'>('APA');
export const referenceResultAtom = atom<string | null>(null);

export const grammarTextAtom = atom<string>('');
export const grammarResultAtom = atom<string | null>(null);

export const searchQueryAtom = atom<string>('');
export const searchResultsAtom = atom<any[]>([]);

export const definitionWordAtom = atom<string>('');
export const definitionResultAtom = atom<any | null>(null);
