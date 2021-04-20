import {Component, OnInit} from '@angular/core';
import {VaccineService} from "../vaccine.service";
import {IVaccineDTO} from "../../entity/IVaccineDTO";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.scss']
})

export class VaccineListComponent implements OnInit {
  indexPagination: number = 1;
  totalPagination: number;
  public searchVaccine: FormGroup;
  vaccines: IVaccineDTO[] = [];
  listVaccineNotPagination: IVaccineDTO[] = [];

  constructor(private vaccineService: VaccineService) {
  }

  ngOnInit(): void {
    this.vaccineService.getAllVaccine(0).subscribe((data: IVaccineDTO[]) => {
      this.vaccines = data;
    });

    this.searchVaccine = new FormGroup({
      nameVaccine: new FormControl(''),
      typeVaccine: new FormControl(''),
      originVaccine: new FormControl(''),
      statusVaccine: new FormControl('')
    });

    this.vaccineService.getAllVaccineNotPagination().subscribe((data: IVaccineDTO[]) => {

      this.listVaccineNotPagination = data;

      if ((this.listVaccineNotPagination.length % 5) != 0) {
        this.totalPagination = (Math.round(this.listVaccineNotPagination.length / 5)) + 1;
      }
    })
  }

  search() {
    this.vaccineService.search(this.searchVaccine.value.nameVaccine, this.searchVaccine.value.typeVaccine, this.searchVaccine.value.originVaccine,
      this.searchVaccine.value.statusVaccine).subscribe((data: IVaccineDTO[]) => {
      return this.vaccines = data
    });
  }

  findPaginnation() {
    this.vaccineService.getAllVaccine((this.indexPagination * 5) - 5).subscribe((data: IVaccineDTO[]) => {
      this.vaccines = data;
    })
  }

  indexPaginationChage(value: number) {
    this.indexPagination = value;
  }

  firtPage() {
    this.indexPagination = 1;
    this.ngOnInit();
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
    }
    this.vaccineService.getAllVaccine((this.indexPagination * 5) - 5).subscribe((data: IVaccineDTO[]) => {
      this.vaccines = data;
    })
  }

  prviousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0) {
      this.indexPagination = 1;
      this.ngOnInit();
    } else {
      this.vaccineService.getAllVaccine((this.indexPagination * 5) - 5).subscribe((data: IVaccineDTO[]) => {
        this.vaccines = data;
      })
    }
  }

  lastPage() {
    this.indexPagination = this.listVaccineNotPagination.length / 5;
    this.vaccineService.getAllVaccine((this.indexPagination * 5) - 5).subscribe((data: IVaccineDTO[]) => {
      this.vaccines = data;
    })
  }
}
