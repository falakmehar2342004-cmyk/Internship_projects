import Modal from './Modal';
import Button from './Button';

// Ask for confirmation before a destructive demo action, such as removing a device.
export default function ConfirmDialog({ open, title, message, onCancel, onConfirm }) {
  return <Modal open={open} title={title} onClose={onCancel}>
    <p className="modal-message">{message}</p>
    <div className="modal-actions"><Button variant="secondary" onClick={onCancel}>Cancel</Button><Button onClick={onConfirm}>Confirm</Button></div>
  </Modal>;
}
