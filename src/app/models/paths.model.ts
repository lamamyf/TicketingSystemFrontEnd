import {FormControl} from "@angular/forms";

export class PathsModel  {
  id: number;
  paths: Array<FormControl>;
  os: boolean;


  setResult(paths: any) {
    this.id = paths.id;
    this.os = paths.os || '';
    this.paths = paths.paths || '';
  }
}
