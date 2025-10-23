import swal from "sweetalert"
import { toast } from "react-toastify"


const showSwal=(title,icon,buttons)=>{
    swal({title,icon,buttons})
}



function handleApiErrorContact(status) {
  if (!status) {
    toast.error("مشکل در اتصال به سرور")
    return
  }

//   const status = error.response.status

  switch (status) {
    case 400:
      toast.warning("یمیل یا شماره موبایل  معتبر نیست")
      break
    case 401:
      toast.error("ابتدا وارد حساب کاربری شوید")
      break
    case 403:
      toast.error("ایمیل و تلفن خود را, وارد کنید")
      break
    case 404:
      toast.warning("فیلد ها رو پر کنید")
      break
      case 422:
      toast.error("این کاربر یافت نشد")
    case 500:
      toast.error("خطای سرور، دوباره تلاش کنید")
      break
      case 201:
      toast.success("پیام شما ارسال شد")
      break
    default:
      toast.error("خطای ناشناخته‌ای رخ داد")
  }
}

function deletePFW(status) {
  if (status===200) {
    toast.success('محصول با موفقیت حذف شد',{
      onClose:()=>{
        location.reload()
      }
    })
  }else{
    toast.error('شما قادر به انجام این عملیات نیستید')
  }
}





export {showSwal,handleApiErrorContact,deletePFW}