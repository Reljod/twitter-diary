import { writable } from 'svelte/store';
import type { ModalType } from '../component/generic/modals/PageModal.svelte';

export const modalContent = writable<ModalType | null>(null);
