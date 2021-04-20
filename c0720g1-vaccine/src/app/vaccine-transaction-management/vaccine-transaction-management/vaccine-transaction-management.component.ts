import {Component, OnInit} from '@angular/core';
import {IVaccinationTransaction} from "../../entity/IVaccinationTransaction";
import {VaccineTransactionService} from "../../service/vaccine-transaction.service"
import {IImportAndExport} from "../../entity/IImportAndExport";
import {ImportAndExportService} from "../../service/import-and-export.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vaccine-transaction-management',
  templateUrl: './vaccine-transaction-management.component.html',
  styleUrls: ['./vaccine-transaction-management.component.scss']
})
export class VaccineTransactionManagementComponent implements OnInit {
  public vaccineTransaction: IVaccinationTransaction[]
  public exports: IImportAndExport[]
  vaccineTransactionId: number
  patientName: string
  page = 0
  pageable: any;
  keyword2 = '';
  keyword3 = '';
  listVaccineType: any

  constructor(
    public transactionService: VaccineTransactionService,
    public exportService: ImportAndExportService,
    public toastrService: ToastrService
  ) {
  }

  ngOnInit(): void {
    this.getList()
  }

  /**
   * Made by Khanh lấy list giao dịch
   */
  getList() {
    this.transactionService.getListTransaction(this.page).subscribe(data => {
      this.vaccineTransaction = data.content
      this.pageable = data
    })
    this.exportService.getListExport(this.page).subscribe(data => {
      this.exports = data;
    })
    this.exportService.getListVaccineType().subscribe(data => {
      this.listVaccineType = data
    })

  }
  /**
   * Made by Khanh tìm kiếm list giao dịch bằng tên bệnh nhân, loại vắc xin
   */
  search() {
    const searchCriteria = {
      keyword2: this.keyword2,
      keyword3: this.keyword3
    }
    this.transactionService.search(searchCriteria).subscribe(data => {
      console.log(data)
      this.vaccineTransaction = data.content;
      console.log(this.vaccineTransaction);
    })
  }
  /**
   * Made by Khanh lấy id , name cần xóa
   */
  getContentDelete(id, name) {
    this.vaccineTransactionId = id
    this.patientName = name
  }
  /**
   * Made by Khanh xóa giao dịch bằng id
   */
  getMessageDelete(id: number) {
    this.transactionService.deleteById(id).subscribe(data => {
      this.ngOnInit()
      this.toastrService.success('Xóa thông tin giao dịch với bệnh nhân thành công!', 'Thông báo:');
    })

  }
  /**
   * Made by Khanh thông báo hủy
   */
  getMessageCancel() {
    this.toastrService.warning('Bạn đã chọn hủy và thông tin này không được xóa', 'Thông báo hủy.');
  }
}
