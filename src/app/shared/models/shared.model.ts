import { IDialogConfirm } from "../interfaces";

export class DialogConfirmModel implements IDialogConfirm {
  open = false;
  title = "";
  message = "";
  onConfirm = () => {};
}
