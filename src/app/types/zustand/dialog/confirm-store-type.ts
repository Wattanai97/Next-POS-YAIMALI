export type ConfirmStoreType = {
  isOpen: boolean;
  message: string;
  onConfirm: (() => void) | null;
  onCancel: (() => void) | null;
  open: (message: string, onConfirm: () => void, onCancel?: () => void) => void;
  close: () => void;
};

export interface NotesConfirmStoreType {
  isOpen: boolean;
  message: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  open: (message: string) => void;
  close: () => void;
  opennotes: (message: string, onConfirm: () => void) => void;
}