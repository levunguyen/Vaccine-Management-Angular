import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ImportAndExportService} from "../../service/import-and-export.service";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-import-and-export',
  templateUrl: './import-and-export.component.html',
  styleUrls: ['./import-and-export.component.scss']
})
export class ImportAndExportComponent implements OnInit {
  public vaccine: any;
  public name;
  public input;
  public nameType;
  public maintenance;
  public age;
  public quantity;
  public licenseCode;
  public origin;
  public expired;
  public dayReceive;
  public formExportVaccine: FormGroup;
  idVaccine: number;

  constructor(
    private importAndExportService: ImportAndExportService,
    public formBuilder: FormBuilder,
    public activatedRoute: ActivatedRoute,
    private router: Router,
    public toastr: ToastrService
  ) { }

  validation_messages = {
    quantityExport: [
      {type: 'required', message: 'Vui lòng nhập số lượng cần xuất'},
      {type: 'min', message: 'Số luọng cần xuất phải lớn hơn 0.'},
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc chữ'}
    ]
  }
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((data: ParamMap) =>{
      this.idVaccine = Number(data.get('vaccineId'));
    });
    // console.log(this.idVaccine);
    this.formExportVaccine = this.formBuilder.group({
      quantityExport: ['', [Validators.required, Validators.min(0), Validators.pattern('^\\d+$')]]
    });

    this.importAndExportService.findVaccineById(this.idVaccine).subscribe(data => {
      this.vaccine = data;
      this.name = this.vaccine.name;
      this.nameType = this.vaccine.vaccineType.name;
      this.maintenance = this.vaccine.maintenance;
      this.age = this.vaccine.age;
      this.quantity = this.vaccine.quantity;
      this.licenseCode = this.vaccine.licenseCode;
      this.origin = this.vaccine.origin;
      this.expired = this.vaccine.expired;
      this.dayReceive = this.vaccine.dayReceive;

      console.log(this.vaccine);
    })

  }

  export(value): void {
    console.log(value);
    this.importAndExportService.exportVaccine(this.idVaccine, value).subscribe(data => {
      this.router.navigateByUrl('vaccine-list');
      this.toastr.success("Xuất kho thành công","Thông báo: ")
    }, error => {
      this.router.navigateByUrl('vaccine-list');
      this.toastr.error("Số Lượng Xuất Lớn Hơn Số Lượng Trong Kho")
    })
  }

  onSubmit() {

  }

}
