import { writable } from 'svelte/store';
import type { ModalType } from '../component/generic/modals/PageModal.svelte';

export const modalContent = writable<ModalType | null>(null);
export const showModalContent = writable<boolean>(false);

export const deleteModelContentId = writable<number | null>(null);
export const showDeleteModalConfirmation = writable<boolean>(false);
