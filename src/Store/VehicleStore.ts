import { observable, action } from 'mobx';

export class VehicleStoreClass {
    @observable VehicleInfos = {};

    @action
    ClearInfos() {
        this.VehicleInfos = {};
    }

    @action
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