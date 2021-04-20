import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {EmployeeService} from "../../service/employee.service";
import {checkDateOfBirth} from "../../common/validateBirthDay";
import {ToastrService} from "ngx-toastr";
import {IPosition} from "../../entity/IPosition";
import {IRole} from "../../entity/IRole";
import {ShowMessage} from "../../common/show-message";

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.scss']
})
/** LuyenNT code
 */
export class EmployeeCreateComponent implements OnInit {
  public positionList: IPosition[];
  public roleList: IRole[];
  employeeForm: FormGroup;
  public check = false;
  public checkPhoneDuplicate = false;
  private error: string;

  constructor(private router: Router,
              private employeeService: EmployeeService,
              private toastrService: ToastrService,
              private showMessage: ShowMessage) {
  }

  validation_messages = {
    name: [
      {type: 'required', message: 'Vui lòng nhập tên'},
      {type: 'maxlength', message: 'Vui lòng nhập tên > 40.'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số'}
    ],
    dateOfBirth: [
      {type: 'required', message: 'Vui lòng nhập ngày sinh'},
      {type: 'checkAge', message: 'Tuổi phải từ 18 đến 50'}
    ],
    idCard: [
      {type: 'required', message: 'Vui lòng nhập CMND'},
      {type: 'pattern', message: 'CMND phải đúng định dạng XXXXXXXXX'},
    ],
    guardian: [
      {type: 'required', message: 'Vui lòng nhập địa chỉ'},
    ],
    phone: [
      {type: 'required', message: 'Vui lòng nhập số điện thoại'},
      {
        type: 'pattern',
        message: 'Vui lòng nhập số địa thoại đúng định dạng 090xxxxxxx or 091xxxxxxx or (84) + 90xxxxxxx or (84) + 91xxxxxxx'
      }
    ],
    address: [
      {type: 'required', message: 'Vui lòng nhập địa chỉ'}
    ],
    position: [
      {type: 'required', message: 'Vui lòng chọn chức vụ'},
    ],
    account: [
      {type: 'required', message: 'Vui lòng nhập quyền truy cập'},
    ],
  };


  ngOnInit(): void {
    this.getList();
    this.employeeForm = new FormGroup(
      {
        name: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'), Validators.maxLength(40)]),
        dateOfBirth: new FormControl('', [Validators.required, checkDateOfBirth]),
        idCard: new FormControl('', [Validators.required, Validators.pattern('^\\d{9}$')]),
        address: new FormControl('', [Validators.required, Validators.maxLength(40)]),
        phone: new FormControl('', [Validators.required, Validators.pattern('^(090|091|\\(\\+84\\)90|\\(\\+84\\)91)\\d{7}$')]),
        position: new FormControl('', Validators.required),
        account: new FormControl('', Validators.required)
      }
    )
  }

  getList() {
    this.employeeService.getListPositionAndRole().subscribe(data => {
      console.log(data[0]);
      this.positionList = data[0];
      this.roleList = data[1];

    }, error => console.log(error));
  }

  create() {
    if (this.employeeForm.invalid) {
      this.check = true;
      this.showMessage.showMessageCreateError();
      return;
    } else {
      this.employeeService.createEmployee(this.employeeForm.value).subscribe(data => {
        if (data != null) {
          console.log(data[0]);
          this.error = data[0].defaultMessage;
          this.toastrService.error(this.error, 'Message');
        } else {
          console.log("thành côbng");
          this.toastrService.success('Thêm thành công!', 'Message');
          this.router.navigateByUrl('employee');

        }

      }, error => console.log(error));
    }
  };


}
