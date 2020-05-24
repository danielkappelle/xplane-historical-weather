import { Component } from '@angular/core';
import { ConverterService } from './converter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  files: File[] = [];
  rwxFile: boolean;

  constructor(
    private converter: ConverterService
  ) { }

  public fileChanged(e) {
    console.log(e.target.files);
    this.files = [...this.files, ...e.target.files];
  }

  public removeFile(file: File): void {
    const idx = this.files.indexOf(file);
    this.files.splice(idx, 1);
  }

  public async convert(): Promise<void> {
    await this.converter.convert(this.files);
    this.rwxFile = true;
  }

  public download(): void {
    const blob = new Blob([this.converter.downloadableFile], { type: 'text/rwx' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.download = 'custom_weather.rwx';
    anchor.href = url;
    anchor.click();
  }
}
