import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class ImageBinaryService {
  constructor(private sanitizer: DomSanitizer) {}

  CreateBase64String(fileInput: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (fileInput.target.files && fileInput.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;
          image.onload = (rs) => {
            const imgBase64Path = e.target.result;
            resolve(imgBase64Path);
          };
        };
        reader.readAsDataURL(fileInput.target.files[0]);
      }
    });
  }

  decode(base64) {
    const image = this.sanitizer.bypassSecurityTrustResourceUrl(base64);
    return image;
  }
}
