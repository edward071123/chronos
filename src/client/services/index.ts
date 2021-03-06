import * as httpUtil from '../util/http-util';

// shift
export function getShifts(opts: any): Promise<any> {
  return httpUtil.get(`/api/v1/shiftbymonth/${opts.year}/${opts.month}`);
}
export function getShift(opts: any): Promise<any> {
  return httpUtil.get(`/api/v1/shift/${opts.year}/${opts.month}/${opts.stationid}/${opts.workerid}`);
}
export function postShift(opts: object): Promise<any> {
  return httpUtil.post('/api/v1/shift', opts);
}

export function getShiftsByMonth(opts: any): Promise<any> {
  const startId = (parseInt(opts.page) * parseInt(opts.count) - parseInt(opts.count)) + 1;
  return httpUtil.get(`/api/v1/shift1/${opts.year}/${opts.month}/${opts.area}/${startId}/${opts.count}`);
}

export function deleteShift(opts: object): Promise<any> {
  console.log(opts);
  return httpUtil.del('/api/v1/shift', opts);
}

// stations
export function getAllStations(): Promise<any> {
  return httpUtil.get(`/api/v1/station`);
}
export function getStations(opts: string): Promise<any> {
  return httpUtil.get(`/api/v1/station/area/${opts}`);
}
export function getOneStation(opts: any): Promise<any> {
  return httpUtil.get(`/api/v1/station/${opts.stationId}`);
}
export function postStation(opts: object): Promise<any> {
  return httpUtil.post('/api/v1/station', opts);
}
export function putStation(opts: object): Promise<any> {
  return httpUtil.put('/api/v1/station', opts);
}
export function deleteStation(opts: object): Promise<any> {
  return httpUtil.del('/api/v1/station', opts);
}

// worker
export function getWorkers(): Promise<any> {
  return httpUtil.get('/api/v1/worker');
}
export function getSearchWorkers(opts: any): Promise<any> {
  return httpUtil.postQuery('/api/v1/worker/search', opts);
}
export function postWorker(opts: object): Promise<any> {
  return httpUtil.post('/api/v1/worker', opts);
}
export function putWorker(opts: object): Promise<any> {
  return httpUtil.put('/api/v1/worker', opts);
}
export function deleteWorker(opts: object): Promise<any> {
  return httpUtil.del('/api/v1/worker', opts);
}

// count
export function getCounts(opts: any): Promise<any> {
  return httpUtil.get(`/api/v1/count/${opts.year}/${opts.month}`);
}

export function getCountByWorker(opts: any): Promise<any> {
  return httpUtil.get(`/api/v1/countbyworker/${opts.year}/${opts.month}/${opts.worker}`);
}
