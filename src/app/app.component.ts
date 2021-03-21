import { Component } from '@angular/core';  
  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
  
export class AppComponent {  
  title = 'csv-reader';  
  
  public records: any[] = [];
  public headersRow: any[] = [];
  csvReader: any;
  
  uploadListener($event: any): void {  
 
    let files = $event.srcElement.files;
      console.log("0...file info gathered : ", files);

    if (this.isValidCSVFile(files[0])) {

      //console.log("1..This is a CSV file...");
    
      let reader = new FileReader();
      reader.readAsText(files[0]);

      reader.onload = () => {

        let csvData = reader.result;
        //console.log("2...File contents read to csvData");

        let csvRecordsArray = (<string>csvData).split(/\r\n|\n/);
        //console.log("3...Seperated by general expression : ", csvRecordsArray);

        this.headersRow = this.getHeaderArray(csvRecordsArray);
        //console.log("4...Headers were identified : ", csvRecordsArray[0]);
  
        this.records = this.getDataRecordsArrayFromCSVFile(csvRecordsArray, this.headersRow); 
          console.log("5...")
      }; 
  
      reader.onerror = function () {  
        console.log('error is occured while reading file!');  
      };  
  
    } else {  
      alert("Please import valid .csv file.");  
      this.fileReset();
    }
  }
  
  getDataRecordsArrayFromCSVFile(csvRecordsArray, csvHeaders){

    csvRecordsArray.shift();

    let csvData = [];
  
    for (let index in csvRecordsArray){

      if(csvRecordsArray[index] != ""){
        
        let column = csvRecordsArray[index].split(',');

        let dataObject = {}

        for (let i in column) {
          dataObject[csvHeaders[i]] = column[i]
        }

        csvData.push(dataObject);
      }
      
    }

    return csvData;  
  }  
  
  isValidCSVFile(file: any) {  
    return file.name.endsWith(".csv");  
  }  
  
  getHeaderArray(csvRecordsArr: any) {  
    let headers = (<string>csvRecordsArr[0]).split(',');
    return headers; 
  }  
  
  fileReset() {  
    this.csvReader.nativeElement.value = "";  
    this.records = [];  
  }  
}