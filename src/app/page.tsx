import FormControl from "@/components/app_components/form_control";
import { BackGround } from "@/components/nurui/background";

export default function Home() {
  return (
    <div>
      <BackGround>
        <FormControl />
      </BackGround>
    </div>
  );
}

/**
 * refresh lại trang sau khi có token và gọi hàm get để lấy token
 * reload trang lưu/ k lưu thì xóa user trong db và xóa token luôn + chuyển hướng về page 
 * k cho click button k đang tạo user
 */
