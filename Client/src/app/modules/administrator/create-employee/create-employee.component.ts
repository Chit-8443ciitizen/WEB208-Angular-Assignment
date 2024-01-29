import { Component } from '@angular/core';
import { ExcelService } from 'src/app/core/service/service.excel';

@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent {
  constructor(private excelService: ExcelService) {}

  async onFileChange(event: any): Promise<void> {
    const file: File = event.target.files[0];

    if (file) {
      try {
        const employees: any[] = await this.excelService.processExcelFile(file);
        console.log('List of employees:', employees);

        // Now you can further process the list of employees as needed
      } catch (error) {
        console.error('Error processing Excel file:', error);
      }
    }
  }
}
