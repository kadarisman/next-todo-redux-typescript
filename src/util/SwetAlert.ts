import Swal, { SweetAlertResult } from 'sweetalert2'

export const ShowAlert = (title: string, message: string, type: 'success' | 'error' | 'warning' | 'info') => {
  Swal.fire({
    title: title,
    text: message,
    icon: type,
    confirmButtonText: 'Ok'
  })
}

export const ShowConfirm = (title: string, message: string, confirmText: string, cancelText: string): Promise<SweetAlertResult> => {
  return Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText,
  })
}

export const ShowWarningAlert = (title: string, message: string): void => {
  Swal.fire({
    icon: 'warning',
    title: title,
    text: message,
  })
}