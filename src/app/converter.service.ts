import { Injectable } from '@angular/core';
import * as moment from 'moment';

interface WeatherItem {
  dateTime: string;
  metar: string;
}

@Injectable()
export class ConverterService {

  downloadableFile: string;

  public async convert(files: File[]): Promise<void> {
    let items: WeatherItem[] = [];
    for (const file of files) {
      const contents = await (await this.readFileContent(file)).trim().split('\n');
      for (const line of contents) {
        if (line.startsWith('station')) {
          continue;
        }

        const cols = line.split(/[\t,]/);

        const date = moment(cols[1], 'YYYY-MM-DD HH:mm').format('YYYY/MM/DD HH:mm');
        const metar = cols[cols.length - 1];

        items.push({
          dateTime: date,
          metar
        });
      }
    }

    items = items.sort((a, b) => moment(b.dateTime).isBefore(moment(a.dateTime)) ? 1 : -1);

    this.downloadableFile = items.map(i => `${i.dateTime}\n${i.metar}\n`).join('\n');
    console.log(this.downloadableFile);
  }

  private readFileContent(file: File): Promise<string> {
    return new Promise<string>((resolve, reject) => {
        if (!file) {
            resolve('');
        }

        const reader = new FileReader();

        reader.onload = (e) => {
            const text = reader.result.toString();
            resolve(text);

        };

        reader.readAsText(file);
    });
}
}
