import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  serverUrl: string = 'http://localhost:4004/image/upload';
  constructor(private httpClient: HttpClient) { }

  public sendFormData(formData: FormData) {
    console.log(formData);
    return this.httpClient.post<any>(this.serverUrl, formData, {
      reportProgress: true,
      observe: 'events'
    });
}
}
