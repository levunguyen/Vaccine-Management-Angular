import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {EmployeeService} from "../employee.service";
import {ActivatedRoute, ParamMap, Route, Router} from "@angular/router";
import {IPosition} from "../../entity/IPosition";
import {PositionService} from "../../service/position.service";
import {IAccount} from "../../entity/IAccount";
import {AccountService} from "../../service/account.service";
import {IEmployee} from "../../entity/IEmployee";
import {IEmployeeDTO} from "../../entity/IEmployeeDTO";
import {IEmployeeRoleDTO} from "../../entity/IEmployeeRoleDTO";
import {RoleService} from "../../service/role.service";
import {IRole} from "../../entity/IRole";
import {AlertService} from "../alert.service";
import {birthdayValidator, checkDuplicateEmail} from "../validate";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss']
})
export class EmployeeEditComponent implements OnInit {
  employeeFormEdit: FormGroup;
  employeeId;
  accountId;
  positionId;
  positionList: IPosition[];
  accountList: IAccount[];
  roleList: IRole[];
  employee: IEmployeeRoleDTO;
  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private positionService: PositionService,
    private accountService: AccountService,
    private roleService: RoleService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    public toastr: ToastrService
  ) {
    this.positionService.findAll().subscribe(data => {
      this.positionList = data;
      console.log(data);
    });
    this.accountService.findAll().subscribe(data => {
      this.accountList = data;
      console.log(data);
    });
    this.roleService.findAll().subscribe(data => {
      this.roleList = data;
      console.log(data);
    });
  }

  ngOnInit(): void {

    // this.employeeService.getAllEmployee().subscribe(data => {
    //   this.employeeFormEdit = this.formBuilder.group({
    //     employeeId: [''],
    //     name: ['', [Validators.required, Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡù' +
    //       'úụủũưừứựửữỳýỵỷỹđ]+(\\\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$')]],
    //     dateOfBirth: ['', [Validators.required, birthdayValidator()]],
    //     idCard: [''],
    //     address: [''],
    //     phone: [''],
    //     position: [''],
    //     account: [''],
    //     role: ['']
    //   });
    // });
    this.employeeFormEdit = this.formBuilder.group({
      employeeId: [''],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợở' +
        'ỡùúụủũưừứựửữỳýỵỷỹđ]+(\\s[a-zA-Zàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđ]+)*$'),
      Validators.maxLength(40)]],
      dateOfBirth: ['', [Validators.required, birthdayValidator()]],
      idCard: ['', [Validators.required, Validators.pattern('^[0-9]{9}$')]],
      address: ['', [Validators.required, Validators.maxLength(40)]],
      phone: ['', [Validators.required, Validators.pattern('^(090|091|\\(84\\)\\+90|\\(84\\)\\+91)\\d{7}$')]],
      position: [''],
      account: [''],
      role: ['']
    });

    this.activatedRoute.paramMap.subscribe((data :ParamMap) => {
      this.employeeId = data.get('id');
      this.employeeService.findById(this.employeeId).subscribe(data => {
        this.employee = data;
        this.employeeFormEdit.patchValue(data);

      });
    });

  }
  editEmployee(){

    if (this.employeeFormEdit.invalid) {
      this.toastr.error('Vui lòng nhập đúng tất cả các trường', 'Cảnh báo:');
      return;
    }

    this.employeeService.editEmployee(this.employeeFormEdit.value).subscribe(
      () => {
        console.log(this.employeeFormEdit.value);
        this.router.navigateByUrl('/employee').then(r => this.alertService.showAlertSuccess('Chỉnh sửa thành công!'));
      }
    );
  }

}
