import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { HttpService } from 'kudi-service/http.service';
import { HttpClient } from '@angular/common/http';

class DataTablesResponse {
  data: any[];
  draw: number;
  recordsFiltered: number;
  recordsTotal: number;
}

@Component({
  selector: 'app-datas-table',
  templateUrl: './datas-table.component.html',
  styleUrls: ['./datas-table.component.css']
})
export class DatasTableComponent implements OnInit, OnChanges {

  @Input() dataUrl: string;
  @Input() columnNames: string[];
  @Input() dataObject: object;

  dtOptions: DataTables.Settings = {};
  response: Object[];
  keys: string[] = [];
  
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 2,
      serverSide: true,
      processing: true,
      ajax: (dataTablesParameters: any, callback) => {
        this.http
          .post<DataTablesResponse>(
            changes.dataUrl.currentValue,
            dataTablesParameters
          ).subscribe(resp => {
            if(resp) {
              this.response = resp.data;
              callback({
                recordsTotal: resp.recordsTotal,
                recordsFiltered: resp.recordsFiltered,
                data: []
              });
            }
          });
      },
      columns: this.genereteColumns(changes.dataObject.currentValue)
      };
  }

  private genereteColumns(className : object) : Array<object> {
    let columns = [];
    let extract = Object.getOwnPropertyNames(className);
    for(let key of extract){
      columns.push({data: key});
      this.keys.push(key);
    }
    return columns;
  }

}
