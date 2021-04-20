import {Component, OnInit} from '@angular/core';
import {VaccinationHistoryService} from "../../service/vaccination-history.service";
import {IVaccinationHistoryFeedbackDTO} from "../../dto/IVaccinationHistoryFeedbackDTO";
import {ActivatedRoute, ParamMap, Router, Routes} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IVaccinationHistorySendFeedbackDTO} from "../../dto/IVaccinationHistorySendFeedbackDTO";
import {ToastrService} from "ngx-toastr";
import {TokenStorageService} from "../../service/token-storage.service";

@Component({
  selector: 'app-vaccination-history-feedback',
  templateUrl: './vaccination-history-feedback.component.html',
  styleUrls: ['./vaccination-history-feedback.component.scss']
})
export class VaccinationHistoryFeedbackComponent implements OnInit {
  vaccinationHistoryFeedback: IVaccinationHistoryFeedbackDTO;
  formGroup: FormGroup;
  vaccinationHistoryId;
  accountEmail: string;
  isSubmited = false;
  constructor(
    private vaccinationHistoryService: VaccinationHistoryService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private toast: ToastrService,
    private tokenStorageService : TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.getAccountEmail();
    this.formGroup = this.formBuilder.group({
      afterStatus: ['', [Validators.required, Validators.maxLength(40),
        Validators.pattern('^[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ,;-]+(\\s[a-zA-ZàáạảãâầấậẩẫăằắặẳẵèéẹẻẽêềếệểễìíịỉĩòóọỏõôồốộổỗơờớợởỡùúụủũưừứựửữỳýỵỷỹđÀÁẠẢÃÂẦẤẬẨẪĂẰẮẶẲẴÈÉẸẺẼÊỀẾỆỂỄÌÍỊỈĨÒÓỌỎÕÔỒỐỘỔỖƠỜỚỢỞỠÙÚỤỦŨƯỪỨỰỬỮỲÝỴỶỸĐ,;-]+)*$'),

      ]]
    });
    this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      this.vaccinationHistoryService.findByIdVaccinationHistory(paramMap.get('id')).subscribe((data: IVaccinationHistoryFeedbackDTO) => {
        this.vaccinationHistoryId = paramMap.get('id');
        this.vaccinationHistoryFeedback = data;
      });
      this.vaccinationHistoryService.findByAfterStatus(paramMap.get('id')).subscribe((data: IVaccinationHistorySendFeedbackDTO) => {
        this.formGroup.patchValue(data);

      });
    });
  }

  getAccountEmail() {
    if (this.tokenStorageService.getToken()) {
      const user = this.tokenStorageService.getUser();
      this.accountEmail = this.tokenStorageService.getUser().email;
    }
  }
  update() {
    if (this.formGroup.invalid){
      this.toast.error("Vui lòng nhập thông tin!");
    }else{
      this.isSubmited = true;
      this.vaccinationHistoryService.updateFeedback(this.vaccinationHistoryId, this.formGroup.value).subscribe( data => {
        this.vaccinationHistoryService.sendMailFeedbackForAdmin(this.formGroup.value.afterStatus, this.accountEmail).subscribe(data =>{
          this.router.navigateByUrl('/vaccination-history/' + this.vaccinationHistoryFeedback.patientId).then(r => this.toast.success("Cảm ơn bạn đã gửi phản hồi đến chúng tôi!"));
        });
      });

    }
  }

  validation_messages = {
    'afterStatus': [
      {
        type: 'required', message: 'Vui lòng không được để trống!'
      },
      {
        type: 'maxlength', message: 'Vui lòng nhập tối đa 40 kí tự!'
      },
      {
        type: 'pattern', message: 'Phản hồi không được chứa kí tự đặc biệt!'
      }
    ],
  }
}
