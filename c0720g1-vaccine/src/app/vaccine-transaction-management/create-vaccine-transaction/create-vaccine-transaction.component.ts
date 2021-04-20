import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {VaccineTransactionService} from "../../service/vaccine-transaction.service";
import {ActivatedRoute, Router} from "@angular/router";
import {IVaccinationHistory} from "../../entity/IVaccinationHistory";
import {VaccinationHistoryService} from "../../service/vaccination-history.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-create-vaccine-transaction',
  templateUrl: './create-vaccine-transaction.component.html',
  styleUrls: ['./create-vaccine-transaction.component.scss']
})
export class CreateVaccineTransactionComponent implements OnInit {
  public vaccineTransaction: any

  public vaccineHistoryList: IVaccinationHistory[];

  public vaccineHistoryService: VaccinationHistoryService

  public idVaccineHistory: number

  public formRegister: FormGroup;
  public  nameVaccine: string;
  public  id= '';
  public  vaccineType: string;
  public  date: string;

  public check = false;
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
    private vaccineTransactionService: VaccineTransactionService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.formRegister = this.fb.group({
      id: [null],
      name: [''],
      nameVaccine:[null],
      vaccineType: [null],
      date: [''],
      price: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      quantity: ['', [Validators.required, Validators.pattern('^[0-9]+$')]]
    })
    this.vaccineTransactionService.getListVaccineHistory().subscribe(data => {
      this.vaccineHistoryList = data;

      console.log(data)
      console.log(data)
    })
  }

  submit() {
    this.vaccineTransactionService.createTransaction(this.formRegister.value.id, this.formRegister.value.price, this.formRegister.value.quantity).subscribe(data => {
      this.toastrService.success('Thêm mới thành công!', 'Thông báo:');
      this.router.navigateByUrl('/vaccine-transaction-list')
    })
  }


  searchInfo(id) {
    this.vaccineTransactionService.getNamePatient(id).subscribe(data => {
      // this.formRegister.patchValue(data);
      // console.log(data.vaccination.vaccine.vaccineType.name);
      console.log(data)

      this.formRegister.get('vaccineType').patchValue(data.vaccination.vaccine.vaccineType.name);
      this.formRegister.get('id').patchValue(data.vaccinationHistoryId);
      this.formRegister.get('date').patchValue(data.vaccination.date);
      this.nameVaccine = data.vaccination.vaccine.name;
      this.vaccineType = data.vaccination.vaccine.vaccineType.name;
      this.date = data.vaccination.date
      this.id = data.vaccinationHistoryId;
    })

  }

  getMessageCancel() {
    this.toastrService.warning('Bạn đã chọn hủy và không được thêm mới', 'Thông báo hủy.');
  }
}
