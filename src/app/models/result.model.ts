export class ResultModel  {
  id: number;
  systemStatus: boolean;
  isCompromised: boolean;
  isUpdated: boolean;
  currentSystemVersion: string;


  setResult(result: any) {
    this.id = result.id;
    this.systemStatus = result.systemStatus || '';
    this.isCompromised = result.isCompromised || '';
    this.isUpdated = result.isUpdated || '';
    this.currentSystemVersion = result.currentSystemVersion || '';
  }
}
