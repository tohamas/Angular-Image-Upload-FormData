import { Component, OnInit, ViewChild, ElementRef  } from '@angular/core';
import { HttpEventType, HttpErrorResponse } from '@angular/common/http';import { of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FileUploadServiceService } from './services/file-upload-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    files  = [];
 
        constructor( private uploadService: FileUploadServiceService ) { }

      sendFile(file) {
        const formData = new FormData();
        formData.append('file', file.data);
        console.log(file.data);
        console.log(formData);
        file.inProgress = true;
        this.uploadService.sendFormData(formData).subscribe((event: any) => {
            if (typeof (event) === 'object') {
              console.log(event.body);
            }
          });
      }


      private sendFiles() {
        this.fileUpload.nativeElement.value = '';
        this.files.forEach(file => {
          this.sendFile(file);
        });
    }

    onClick() {
        const fileUpload = this.fileUpload.nativeElement;fileUpload.onchange = () => {
        for (let index = 0; index < fileUpload.files.length; index++)
        {
         const file = fileUpload.files[index];
         this.files.push({ data: file, inProgress: false, progress: 0});
        }
          this.sendFiles();
        };
        fileUpload.click();
    }


}