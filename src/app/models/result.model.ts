export class ResultModel  {
  id: number;
  systemStatus: boolean;
  isCompromised: boolean;
  isUpdated: boolean;


  setResult(result: any) {
    this.id = result.id;
    this.systemStatus = result.systemStatus || '';
    this.isCompromised = result.isCompromised || '';
    this.isUpdated = result.isUpdated || '';
  }
}
