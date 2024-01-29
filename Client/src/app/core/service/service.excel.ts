import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root',
})
export class ExcelService {
  constructor() {}

  public async processExcelFile(file: File): Promise<any[]> {
    return new Promise<any[]>((resolve, reject) => {
      const reader: FileReader = new FileReader();

      reader.onload = (e: any) => {
        const data: any = e.target.result;
        const workbook: XLSX.WorkBook = XLSX.read(data, { type: 'binary' });

        // Assuming the first sheet contains the data
        const sheetName: string = workbook.SheetNames[0];
        const worksheet: XLSX.WorkSheet = workbook.Sheets[sheetName];

        // Parse the sheet data to array of objects
        const employees: any[] = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Assuming the first row contains headers (name, email, phone)
        const headers: string[] = employees[0];
        employees.splice(0, 1); // Remove headers row

        // Map array of values to array of objects
        const result: any[] = employees.map((employee) => {
          const obj: any = {};
          headers.forEach((header, index) => {
            obj[header] = employee[index];
          });
          return obj;
        });

        resolve(result);
      };

      reader.onerror = (error) => reject(error);

      // Read the file as binary
      reader.readAsBinaryString(file);
    });
  }
}
