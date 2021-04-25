import {Inject, Injectable} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from '@angular/fire/database';
import {Data} from "../dto/data";

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  imageDetailList: AngularFireList<any>;
  fileList: any[];
  dataSet: Data = {
    id: '',
    url: ''
  };
  msg = 'error';

  constructor(@Inject(AngularFireDatabase) private firebase: AngularFireDatabase) {
  }

  getImageDetailList() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(id, url) {
    this.dataSet = {
      id,
      url
    };
    this.imageDetailList.push(this.dataSet);
  }

  getImage(value) {
    this.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.fileList = list.map(item => {
          return item.payload.val();
        });
        this.fileList.forEach(element => {
          if (element.id === value) {
            this.msg = element.url;
          }
        });
        if (this.msg === 'error') {
          alert('No record found');
        } else {
          window.open(this.msg);
          this.msg = 'error';
        }
      }
    );
  }
}
