import { Component, OnInit } from '@angular/core';
import {IVaccinationHistory} from "../../entity/IVaccinationHistory";
import {VaccinationHistoryService} from "../../service/vaccination-history.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-center-periodic-vaccination',
  templateUrl: './center-periodic-vaccination.component.html',
  styleUrls: ['./center-periodic-vaccination.component.scss']
})
/** LuyenNT code
 */
export class CenterPeriodicVaccinationComponent implements OnInit {

  public vaccinationHistoryList: IVaccinationHistory[];
  public name = '';
  public status = '';
  public page = 0;
  public pageable : any;
  public formGroup : FormGroup;
  constructor(private vaccinationHistoryService: VaccinationHistoryService ) { }

  getListPeriodicVaccination(){
    this.vaccinationHistoryService.getListPeriodicVaccination(this.page).subscribe(data => {
      this.vaccinationHistoryList = data.content;
      this.pageable = data;
      console.log(data);
    }, error =>
      this.vaccinationHistoryList = []
    );
  }
  searchPeriodicVaccination(){
    this.vaccinationHistoryService.searchPeriodicVaccination(this.page,this.name,this.status).subscribe(data => {
      this.vaccinationHistoryList = data.content;
      this.pageable = data;
      console.log(data);
    }, error =>
    this.vaccinationHistoryList = []
    );
  }
  validation_messages = {
    name: [
      {type: 'pattern', message: 'Không được nhập ký tự đặt biệt hoặc số'}
    ]
  }
  ngOnInit(): void {
    this.getListPeriodicVaccination();
    this.formGroup = new FormGroup(
      {
        name: new FormControl('', [Validators.pattern('^[a-zA-Z\'-\'\\sáàảãạăâắằấầặẵẫậéèẻ ẽẹếềểễệóêòỏõọôốồổỗộ ơớờởỡợíìỉĩịđùúủũụưứ� �ửữựÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠ ƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼ� ��ỀỂỄỆỈỊỌỎỐỒỔỖỘỚỜỞ ỠỢỤỨỪỬỮỰỲỴÝỶỸửữựỵ ỷỹ]*$'), Validators.maxLength(40)]),

      }
    )
  }

}
