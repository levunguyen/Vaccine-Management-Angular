import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {IVaccinationTransaction} from "../../entity/IVaccinationTransaction";
import {VaccineTransactionService} from "../../service/vaccine-transaction.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-edit-vaccine-transaction',
  templateUrl: './edit-vaccine-transaction.component.html',
  styleUrls: ['./edit-vaccine-transaction.component.scss']
})
export class EditVaccineTransactionComponent implements OnInit {
  public formGroup: FormGroup;
  public transactionId: number;
  public vaccineTransaction: IVaccinationTransaction;
  defvalue = false;

  validate_message = {
    'price': [
      {type: 'required', message: "Trường này không đc để trống"},
      {type: 'pattern', message: "Trường này phải là số"}
    ],
    'quantity': [
      {type: 'required', message: "Trường này không đc để trống"},
      {type: 'pattern', message: "Trường này phải là số"}
    ]
  }

  constructor(
    private formBuilder: FormBuilder,
    private vaccineTransactionService: VaccineTransactionService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService,
  ) {
  }

  ngOnInit(): void {
    /**
     * Made by Khanh lấy thông tin giao dịch cần sửa , validate
     */
    this.activatedRoute.params.subscribe(data => {
      this.transactionId = Number(data.id)
      this.vaccineTransactionService.getVaccineTransaction(this.transactionId).subscribe(data => {
        this.vaccineTransaction = data

        this.formGroup = this.formBuilder.group({
          price: [this.vaccineTransaction.price, [Validators.required, Validators.pattern('^[0-9]+$')]],
          quantity: [this.vaccineTransaction.quantity, [Validators.required, Validators.pattern('^[0-9]+$')]]
        });
        this.defvalue = true;
      })
    })
  }
  /**
   * Made by Khanh sửa giao dịch
   */
  submit() {
    this.vaccineTransactionService.editTransaction(this.transactionId, this.formGroup.value.price, this.formGroup.value.quantity).subscribe(data => {
      this.toastrService.success('Cập nhật thành công!', 'Thông báo:');
      this.router.navigateByUrl('/vaccine-transaction-list')
    })
  }
  /**
   * Made by Khanh thông báo hủy
   */
  getMessageCancel() {
    this.toastrService.warning('Bạn đã chọn hủy và không được cập nhật', 'Thông báo hủy.');
  }

}
