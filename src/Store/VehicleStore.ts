import { makeAutoObservable, observable, computed } from 'mobx';

export class VehicleStoreClass {
    private VehicleInfos = {};

    ClearInfos() {
        this.VehicleInfos = {};
    }

    SaveInfos(Infos: any) {
        this.VehicleInfos = Infos;
    }

    get GetInfos() {
        return this.VehicleInfos;
    }
}

let VehicleStoreVariable = new VehicleStoreClass();
export function VehicleStoreFunction() {
    if (VehicleStoreVariable) return VehicleStoreVariable;
};