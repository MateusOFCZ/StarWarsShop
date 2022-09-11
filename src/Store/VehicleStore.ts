import { observable, action } from 'mobx';

export class VehicleStoreClass {
    @observable VehicleInfos = {
        name: String,
        model: String,
        manufacturer: String,
        cost_in_credits: String,
        length: String,
        max_atmosphering_speed: String,
        crew: String,
        passengers: String,
        cargo_capacity: String,
        consumables: String,
        vehicle_class: String,
        pilots: Array<String>,
        films: Array<String>,
        created: String,
        edited: String,
        url: String
    };

    @action
    ClearInfos() {
        this.VehicleInfos = {
            name: String,
            model: String,
            manufacturer: String,
            cost_in_credits: String,
            length: String,
            max_atmosphering_speed: String,
            crew: String,
            passengers: String,
            cargo_capacity: String,
            consumables: String,
            vehicle_class: String,
            pilots: Array<String>,
            films: Array<String>,
            created: String,
            edited: String,
            url: String
        };
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