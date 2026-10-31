const confirmRoot = document.getElementById('confirm-dialog-root');
if (!confirmRoot) {
    const el = document.createElement('div');
    el.id = 'confirm-dialog-root';
    document.body.appendChild(el);
}

export const ConfirmDialogContainer = () => null;
