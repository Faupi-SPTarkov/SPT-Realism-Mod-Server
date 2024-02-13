import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { Utils } from "src/utils/utils";
import { ILogger } from "../../types/models/spt/utils/ILogger";
import { Arrays } from "../utils/arrays";
import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";

export class AttachmentBase {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private arrays: Arrays, private modConf, private utils: Utils) { }

    itemDB(): Record<string, ITemplateItem> {
        return this.tables.templates.items;
    }

    public loadAttCompat() {

        const tacDevices = [
            "57fd23e32459772d0805bcf1",
            "544909bb4bdc2d6f028b4577",
            "5d10b49bd7ad1a1a560708b0",
            "5c06595c0db834001a66af6c",
            "5a7b483fe899ef0016170d15",
            "61605d88ffa6e502ac5e7eeb",
            "5c5952732e2216398b5abda2",
            "644a3df63b0b6f03e101e065"
        ]

        const cantedMountConfWeaps: string[] = [
            "5926bb2186f7744b1c6c6e60",
            "5d2f0d8048f0356c925bc3b0",
            "5e00903ae9dc277128008b87",
            "5de7bd7bfd6b4e6e2276dc25"
        ];

        const buffertubes = [
            "5649be884bdc2d79388b4577",
            "5c0faeddd174af02a962601f",
            "5c793fb92e221644f31bfb64",
            "5c793fc42e221600114ca25d"
        ];

        const slots = [
            "mod_stock_000",
            "mod_stock_004",
            "mod_stock_002",
            "mod_stock_001",
        ];

        let stockSlot = {
            "_name": "name",
            "_id": "id",
            "_parent": "parent",
            "_props": {
                "filters": [
                    {
                        "Shift": 0,
                        "Filter": []
                    }
                ]
            },
            "_required": false,
            "_mergeSlotWithChildren": true,
            "_proto": "55d30c4c4bdc2db4468b457e"
        };

        let stocksArr = [];

        let defaultStocks = this.itemDB()["5649be884bdc2d79388b4577"]._props.Slots[0]._props.filters[0].Filter;
        for (let stock in defaultStocks) {
            if (defaultStocks[stock] !== "5d4406a8a4b9361e4f6eb8b7" && defaultStocks[stock] !== "5d44069ca4b9361ebd26fc37") {
                stocksArr.push(defaultStocks[stock]);
            }
        }

        for (let bf in buffertubes) {
            this.itemDB()[buffertubes[bf]]._props.Slots = [];
            for (let slot in slots) {
                let newStockSlot = { ...stockSlot };
                newStockSlot._name = slots[slot];
                newStockSlot._id = this.utils.genId();
                newStockSlot._parent = buffertubes[bf];
                newStockSlot._props.filters[0].Filter = stocksArr;
                if (slots[slot] === "mod_stock_000") {
                    newStockSlot._mergeSlotWithChildren = true;
                }
                else {
                    newStockSlot._mergeSlotWithChildren = false;
                }
                this.itemDB()[buffertubes[bf]]._props.Slots.push(newStockSlot);
            }
        }

        for (let stock in stocksArr) {
            this.itemDB()[stocksArr[stock]]._props.ConflictingItems = stocksArr;
        }

        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (serverItem._parent === "55818a104bdc2db9688b4569" || serverItem._parent === "55818a304bdc2db5418b457d" || serverItem._parent === "55818b224bdc2dde698b456f") {
                for (let slot in serverItem._props.Slots) {
                    let compatItems = serverItem._props.Slots[slot]._props.filters[0].Filter;
                    if (compatItems.includes("5649a2464bdc2d91118b45a8")) {
                        serverItem._props.Slots[slot]._props.filters[0].Filter = tacDevices.concat(compatItems);
                    }
                }
            }

            if (serverItem._parent === "55818a304bdc2db5418b457d") {
                for (let slot in serverItem._props.Slots) {
                    if (serverItem._props.Slots[slot]._name === "mod_sight_rear") {
                        let compatItems = serverItem._props.Slots[slot]._props.filters[0].Filter;
                        let canted = ["5649a2464bdc2d91118b45a8"];
                        serverItem._props.Slots[slot]._props.filters[0].Filter = canted.concat(compatItems);
                    }
                }
            }

            if (serverItem._id === "64748cb8de82c85eaf0a273a" || serverItem._id === "5580223e4bdc2d1c128b457f") {
                serverItem._props.Slots[0]._props.filters[0].Filter = [
                    "5580169d4bdc2d9d138b4585",
                    "55d447bb4bdc2d892f8b456f",
                    "611a30addbdd8440277441dc",
                    "64748d02d1c009260702b526"
                ];
            }


            for (let item in cantedMountConfWeaps) {
                if (serverItem._id === cantedMountConfWeaps[item]) {
                    serverItem._props.ConflictingItems.push("5649a2464bdc2d91118b45a8");
                }
            }
            if (serverItem._props.weapClass === "pistol") {
                serverItem._props.ConflictingItems.push("5649a2464bdc2d91118b45a8");
            }

            // if(serverItem._id === "622b3d5cf9cfc87d675d2de9"){
            //     let scopes = serverItem._props.Slots[0]._props.filters[0].Filter;
            //     for(let scope in scopes)
            //     {
            //         serverItem._props.Slots[2]._props.filters[0].Filter.push(scopes[scope]);
            //     }
            // }
        }
    }

    public loadAttRequirements() {


        let requiredMods = [
            "5b31163c5acfc400153b71cb",
            "58d2664f86f7747fec5834f6",
            "5c7d55f52e221644f31bff6a",
            "58d39d3d86f77445bb794ae7",
            "577d128124597739d65d0e56",
            "5a33b2c9c4a282000c5a9511",
            "5cc70102e4a949035e43ba74",
            "5cf7acfcd7f00c1084477cf2",
            "5b363dea5acfc4771e1c5e7e",
            "5b363e1b5acfc4771e1c5e80",
            "59bffc1f86f77435b128b872",
            "5de8f237bbaf010b10528a70",
            "5e21ca18e4d47f0da15e77dd",
            "5cf79389d7f00c10941a0c4d",
            "5cf79599d7f00c10875d9212",
            "5cf67cadd7f00c065a5abab7",
            "5cf67a1bd7f00c06585fb6f3",
            "615d8e9867085e45ef1409c6",
            "5fc4b992187fea44d52edaa9",
            "5fc4b97bab884124df0cd5e3",
            "5c4eec9b2e2216398b5aaba2",
            "6171407e50224f204c1da3c5",
            "61713cc4d8e3106d9806c109",
            "618a75c9a3884f56c957ca1b",
            "615d8da4d3a39d50044c10e8",
            "615d8d878004cc50514c3233",
            "616584766ef05c2ce828ef57",
            "616554fe50224f204c1da2aa",
            "609a4b4fe2ff132951242d04",
            "58d39b0386f77443380bf13c",
            "5c7d560b2e22160bc12c6139",
            "5c86592b2e2216000e69e77c",
            "5c6162682e22160010261a2b",
            "5c90c3622e221601da359851",
            "5c61627a2e22160012542c55",
            "5c61a40d2e2216001403158d",
            "5bfebc5e0db834001a6694e5",
            "5c1cdd302e221602b3137250",
            "5c064c400db834001d23f468",
            "5bbdb811d4351e45020113c7",
            "5bc5a372d4351e44f824d17f",
            "5b3f7bf05acfc433000ecf6b",
            "5b3f7c005acfc4704b4a1de8",
            "5b3b99265acfc4704b4a1afb",
            "5b3b6dc75acfc47a8773fb1e",
            "5b2389515acfc4771e1be0c0",
            "5aa66a9be5b5b0214e506e89",
            "5aa66c72e5b5b00016327c93",
            "591ee00d86f774592f7b841e",
            "5a33bab6c4a28200741e22f8",
            "5649a2464bdc2d91118b45a8",
            "57d17e212459775a1179a0f5",
            "59db7eed86f77461f8380365",
            "5a1ead28fcdbcb001912fa9f",
            "5a32aa0cc4a28232996e405f",
            "57acb6222459771ec34b5cb0",
            "57acb6222459771ec34b5cb0",
            "57c69dd424597774c03b7bbc",
            "5a27b3d0c4a282000d721ec1",
            "5a7ad4af51dfba0013379717",
            "5a7ad55551dfba0015068f42",
            "5a7b4900e899ef197b331a2a",
            "5b3a08b25acfc4001754880c",
            "5cc7015ae4a949001152b4c6",
            "5cde7b43d7f00c000d36b93e",
            "5d024f5cd7ad1a04a067e91a",
            "5d0a29ead7ad1a0026013f27",
            "5d0a29fed7ad1a002769ad08",
            "5dff77c759400025ea5150cf",
            "5d7b6bafa4b93652786f4c76",
            "5dff8db859400025ea5150d4",
            "5df35e970b92095fd441e4d2",
            "5e569a0156edd02abe09f27d",
            "5e569a2e56edd02abe09f280",
            "5eeb2ff5ea4f8b73c827350b",
            "5ef5d994dfbc9f3c660ded95",
            "5ef369b08cef260c0642acaf",
            "618b9682a3884f56c957ca78",
            "618ba92152ecee1505530bd3",
            "5addbfe15acfc4001a5fc58b",
            "5a37ca54c4a282000d72296a",
            "55d48a634bdc2d8b2f8b456a",
            "5addbfef5acfc400185c2857",
            "5a33b652c4a28232996e407c",
            "5d2c770c48f0354b4a07c100",
            "5d2c772c48f0355d95672c25",
            "5926dad986f7741f82604363",
            "5b7be47f5acfc400170e2dd2",
            "5b7be4895acfc400170e2dd5",
            "5a0abb6e1526d8000a025282",
            "5dfe14f30b92095fd441edaf",
            "57ffb0062459777a045af529",
            "5f2aa49f9b44de6b1b4e68d4",
            "5aaf8e43e5b5b00015693246",
            "5827272a24597748c74bdeea",
            "58272b392459774b4c7b3ccd",
            "5a16b93dfcdbcbcae6687261",
            "5c066ef40db834001966a595",
            "5c11046cd174af02a012e42b",
            "5c0695860db834001b735461",
            "5a16b8a9fcdbcb00165aa6ca",
            "641dc35e19604f20c800be18"
        ];


        for (let i in this.itemDB()) {
            let serverItem = this.itemDB()[i];
            if (requiredMods.includes(serverItem._id)) {
                serverItem._props.Slots[0]._botRequired = serverItem._props.Slots[0]._required;
                serverItem._props.Slots[0]._botRequired = true;
            }
            if (serverItem._id === "5cf78496d7f00c065703d6ca"
                || serverItem._id === "618bab21526131765025ab3f"
                || serverItem._id === "618b9643526131765025ab35") {
                serverItem._props.Slots[0]._botRequired = serverItem._props.Slots[0]._required;
                serverItem._props.Slots[0]._botRequired = true;
                serverItem._props.Slots[1]._botRequired = serverItem._props.Slots[1]._required;
                serverItem._props.Slots[1]._botRequired = true;
            }
            if (serverItem._id === "5a71e22f8dc32e00094b97f4"
                || serverItem._id === "5a71e4f48dc32e001207fb26") {
                serverItem._props.Slots[2]._botRequired = serverItem._props.Slots[2]._required;
                serverItem._props.Slots[2]._botRequired = true;
            }
            if (serverItem._id === "615d8dbd290d254f5e6b2ed6") {
                serverItem._props.Slots[3]._botRequired = serverItem._props.Slots[3]._required;
                serverItem._props.Slots[3]._botRequired = true;
            }
            if (serverItem._id === "5a16b93dfcdbcbcae6687261") {
                serverItem._props.Slots[0]._botRequired = serverItem._props.Slots[0]._required;
                serverItem._props.Slots[0]._botRequired = true;
            }
        }
        if (this.modConf.logEverything == true) {
            this.logger.info("Attatchment Base Loaded");
        }
    }
}