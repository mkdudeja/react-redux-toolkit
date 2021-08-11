export interface IServerError {
  status: boolean;
  error: string | Array<string>;
}

export interface IToggleStatus {
  id: number;
  status: number;
}

export interface IDialogConfirm {
  open: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  agreeLabel?: string;
  disagreeLabel?: string;
}
