import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import './sweetAlert.css';

const baseConfig = {
  background: '#13151f',
  color: '#ffffff',
  confirmButtonColor: '#7c3aed',
  cancelButtonColor: '#2a2f42',
  buttonsStyling: true,
};

export function showSuccess(title, text = '') {
  return Swal.fire({
    ...baseConfig,
    icon: 'success',
    title,
    text,
    timer: 2200,
    showConfirmButton: false,
  });
}

export function showError(title, text = '') {
  return Swal.fire({
    ...baseConfig,
    icon: 'error',
    title,
    text,
    confirmButtonText: 'OK',
  });
}

export async function showConfirm({
  title,
  text = '',
  confirmText = 'Yes',
  cancelText = 'Cancel',
  icon = 'warning',
}) {
  const result = await Swal.fire({
    ...baseConfig,
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
    reverseButtons: true,
  });

  return result.isConfirmed;
}
