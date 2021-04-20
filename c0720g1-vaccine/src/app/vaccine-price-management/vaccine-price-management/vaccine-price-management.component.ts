import {Component, OnInit} from '@angular/core';
import {IImportAndExport} from '../../entity/IImportAndExport';
import {ImportAndExportService} from '../../service/import-and-export.service';
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-vaccine-price-management',
  templateUrl: './vaccine-price-management.component.html',
  styleUrls: ['./vaccine-price-management.component.scss']
})
export class VaccinePriceManagementComponent implements OnInit {
  public exports: IImportAndExport[];
  public vaccineId: number
  keyword2 = '';
  keyword3 = '';
  vaccineType: any;
  origin: any;
  page = 0;
  pageable: any;
  check = "disable"


  constructor(
    public exportService: ImportAndExportService,
    private toastrService: ToastrService

) {
  }

  ngOnInit(): void {
    this.getList()
  }
  /**
   * Made by Khanh lấy list export , list loại văc xin, list nước sản xuất
   */
  getList() {
    this.exportService.getListExport(this.page).subscribe(data => {
      this.exports = data.content;
      this.pageable = data;
    });
    this.exportService.getListVaccineType().subscribe(data => {
      this.vaccineType = data
    })
    this.exportService.getListOrigin().subscribe(data => {
      console.log(data)
      this.origin = data
    })
  }
  /**
   * Made by Khanh tìm kiếm
   */
  search() {
    const searchCriteria = {
      keyword2: this.keyword2,
      keyword3: this.keyword3,
    }
    this.exportService.search(searchCriteria).subscribe(data => {
      this.exports = data.content;
      console.log(this.exports);
    })
  }

}
