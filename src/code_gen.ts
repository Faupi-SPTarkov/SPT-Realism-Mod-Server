import { ITemplateItem } from "@spt-aki/models/eft/common/tables/ITemplateItem";
import { IDatabaseTables } from "@spt-aki/models/spt/server/IDatabaseTables";
import { ILogger } from "@spt-aki/models/spt/utils/ILogger";
import { Arrays } from "./arrays";
import { Helper } from "./helper";


const magazineJSON = require("../db/bots/loadouts/magazines.json");



const MuzzleDeviceTemplates = require("../db/templates/attatchments/MuzzleDeviceTemplates.json");
const BarrelTemplates = require("../db/templates/attatchments/BarrelTemplates.json");
const MountTemplates = require("../db/templates/attatchments/MountTemplates.json");
const ReceiverTemplates = require("../db/templates/attatchments/ReceiverTemplates.json");
const StockTemplates = require("../db/templates/attatchments/StockTemplates.json");
const ChargingHandleTemplates = require("../db/templates/attatchments/ChargingHandleTemplates.json");
const ScopeTemplates = require("../db/templates/attatchments/ScopeTemplates.json");
const IronSightTemplates = require("../db/templates/attatchments/IronSightTemplates.json");
const MagazineTemplates = require("../db/templates/attatchments/MagazineTemplates.json");
const AuxiliaryModTemplates = require("../db/templates/attatchments/AuxiliaryModTemplates.json");
const ForegripTemplates = require("../db/templates/attatchments/ForegripTemplates.json");
const PistolGripTemplates = require("../db/templates/attatchments/PistolGripTemplates.json");
const GasblockTemplates = require("../db/templates/attatchments/GasblockTemplates.json");
const HandguardTemplates = require("../db/templates/attatchments/HandguardTemplates.json");
const FlashlightLaserTemplates = require("../db/templates/attatchments/FlashlightLaserTemplates.json");
const UncategorizedModTemplates = require("../db/templates/attatchments/UncategorizedModTemplates.json");

const AssaultRifleTemplates = require("../db/templates/weapons/AssaultRifleTemplates.json");
const AssaultCarbineTemplates = require("../db/templates/weapons/AssaultCarbineTemplates.json");
const MachinegunTemplates = require("../db/templates/weapons/MachinegunTemplates.json");
const MarksmanRifleTemplates = require("../db/templates/weapons/MarksmanRifleTemplates.json");
const PistolTemplates = require("../db/templates/weapons/PistolTemplates.json");
const ShotgunTemplates = require("../db/templates/weapons/ShotgunTemplates.json");
const SMGTemplates = require("../db/templates/weapons/SMGTemplates.json");
const SniperRifleTemplates = require("../db/templates/weapons/SniperRifleTemplates.json");
const SpecialWeaponTemplates = require("../db/templates/weapons/SpecialWeaponTemplates.json");
const GrenadeLauncherTemplates = require("../db/templates/weapons/GrenadeLauncherTemplates.json");
const UncategorizedWeaponTemplates = require("../db/templates/weapons/UncategorizedWeaponTemplates.json");


export class CodeGen {

    constructor(private logger: ILogger, private tables: IDatabaseTables, private modConf, private helper: Helper, private arrays: Arrays) { }

    public globalDB = this.tables.globals.config;
    public itemDB = this.tables.templates.items;

    public magsToJSON() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._parent === "5448bc234bdc2d3c308b4569" || serverItem._parent === "610720f290b75a49ff2e5e25") {
                let fileItem = magazineJSON[i];
                magazineJSON[i] = this.doAssignJSONMagazine(fileItem);
                this.helper.saveToJSONFile(magazineJSON, '/db/bots/loadouts/magazines.json');
            }
        }
    }

    public weapTempaltesCodeGen() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.RecolDispersion) {
                if (serverItem._props.weapClass === "assaultCarbine") {
                    this.weapWriteToFile(AssaultCarbineTemplates, "AssaultCarbineTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "assaultRifle") {
                    this.weapWriteToFile(AssaultRifleTemplates, "AssaultRifleTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "smg") {
                    this.weapWriteToFile(SMGTemplates, "SMGTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "machinegun") {
                    this.weapWriteToFile(MachinegunTemplates, "MachinegunTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "marksmanRifle") {

                    this.weapWriteToFile(MarksmanRifleTemplates, "MarksmanRifleTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "sniperRifle") {
                    this.weapWriteToFile(SniperRifleTemplates, "SniperRifleTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "pistol") {
                    this.weapWriteToFile(PistolTemplates, "PistolTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "shotgun") {
                    this.weapWriteToFile(ShotgunTemplates, "ShotgunTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "specialWeapon") {
                    this.weapWriteToFile(SpecialWeaponTemplates, "SpecialWeaponTemplates", i, serverItem)
                }
                if (serverItem._props.weapClass === "grenadeLauncher") {
                    this.weapWriteToFile(GrenadeLauncherTemplates, "GrenadeLauncherTemplates", i, serverItem)
                }
            }
        }
    }

    public attTemplatesCodeGen() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                for (let key in this.arrays.mod_types) {
                    if (serverItem._parent === this.arrays.mod_types[key]) {
                        if (this.arrays.mod_types[key] === "550aa4bf4bdc2dd6348b456b" ||
                            this.arrays.mod_types[key] === "550aa4dd4bdc2dc9348b4569" ||
                            this.arrays.mod_types[key] === "550aa4cd4bdc2dd8348b456c"
                        ) {
                            let id = "muzzle"
                            this.modWriteToFile(MuzzleDeviceTemplates, "MuzzleDeviceTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "555ef6e44bdc2de9068b457e") {
                            let id = "barrel"
                            this.modWriteToFile(BarrelTemplates, "BarrelTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818b224bdc2dde698b456f") {
                            let id = "mount"
                            this.modWriteToFile(MountTemplates, "MountTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818a304bdc2db5418b457d") {
                            let id = "receiver"
                            this.modWriteToFile(ReceiverTemplates, "ReceiverTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818a594bdc2db9688b456a") {
                            let id = "stock"
                            this.modWriteToFile(StockTemplates, "StockTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818a6f4bdc2db9688b456b") {
                            let id = "charging"
                            this.modWriteToFile(ChargingHandleTemplates, "ChargingHandleTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818acf4bdc2dde698b456b" ||
                            this.arrays.mod_types[key] === "55818ad54bdc2ddc698b4569" ||
                            this.arrays.mod_types[key] === "55818add4bdc2d5b648b456f" ||
                            this.arrays.mod_types[key] === "55818ae44bdc2dde698b456c" ||
                            this.arrays.mod_types[key] === "55818aeb4bdc2ddc698b456a"
                        ) {
                            let id = "scope"
                            this.modWriteToFile(ScopeTemplates, "ScopeTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818ac54bdc2d5b648b456e") {
                            let id = "irons"
                            this.modWriteToFile(IronSightTemplates, "IronSightTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "5448bc234bdc2d3c308b4569" ||
                            this.arrays.mod_types[key] === "610720f290b75a49ff2e5e25" ||
                            this.arrays.mod_types[key] === "627a137bf21bc425b06ab944"
                        ) {
                            let id = "magazine"
                            this.modWriteToFile(MagazineTemplates, "MagazineTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "5a74651486f7744e73386dd1" ||
                            this.arrays.mod_types[key] === "55818afb4bdc2dde698b456d"
                        ) {
                            let id = "aux"
                            this.modWriteToFile(AuxiliaryModTemplates, "AuxiliaryModTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818af64bdc2d5b648b4570") {
                            let id = "foregrip"
                            this.modWriteToFile(ForegripTemplates, "ForegripTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818a684bdc2ddd698b456d") {
                            let id = "pistolgrip"
                            this.modWriteToFile(PistolGripTemplates, "PistolGripTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "56ea9461d2720b67698b456f") {
                            let id = "gasblock"
                            this.modWriteToFile(GasblockTemplates, "GasblockTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818a104bdc2db9688b4569") {
                            let id = "handguard"
                            this.modWriteToFile(HandguardTemplates, "HandguardTemplates", i, serverItem, id);
                        }
                        if (this.arrays.mod_types[key] === "55818b084bdc2d5b648b4571" ||
                            this.arrays.mod_types[key] === "55818b164bdc2ddc698b456c"
                        ) {
                            let id = "flashlight"
                            this.modWriteToFile(FlashlightLaserTemplates, "FlashlightLaserTemplates", i, serverItem, id);
                        }
                    }
                }
            }
        }
    }

    private modWriteToFile(filePathObj: object, filePathStr: string, index: string, serverItem: ITemplateItem, ID: string) {
        let fileItem = filePathObj[index];

        filePathObj[index] = this.assignJSONToMod(serverItem, fileItem, ID)

        this.helper.saveToJSONFile(filePathObj, `db/templates/attatchments/${filePathStr}.json`);
    }

    private weapWriteToFile(filePathObj: object, filePathStr: string, index: string, serverItem: ITemplateItem) {
        let fileItem = filePathObj[index];

        filePathObj[index] = this.assignJSONToWeap(serverItem, fileItem)

        this.helper.saveToJSONFile(filePathObj, `db/templates/weapons/${filePathStr}.json`);
    }

    private assignJSONToWeap(serverItem: ITemplateItem, fileItem: any) {

        //new items properties can be added, and  property values can be replaced, by delcaring them in this if statement
        if (fileItem) {
            // fileItem.HeatFactor = serverItem._props.HeatFactor; You need to give it a value. If you set it to the server item's propety value, the new property will only appear if the server mod has that property
            fileItem;
            return fileItem;
        }

        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let WeapType = "";
        let BaseTorque = 0;
        let HasShoulderContact = false;
        let Ergonomics = serverItem._props.Ergonomics
        let VerticalRecoil = serverItem._props.RecoilForceUp;
        let HorizontalRecoil = serverItem._props.RecoilForceBack;
        let Dispersion = serverItem._props.RecolDispersion;
        let CameraRecoil = serverItem._props.CameraRecoil;
        let CameraSnap = serverItem._props.CameraSnap;
        let Convergence = serverItem._props.Convergence;
        let RecoilAngle = serverItem._props.RecoilAngle;
        let BaseMalfunctionChance = serverItem._props.BaseMalfunctionChance;
        let HeatFactorGun = serverItem._props.HeatFactorGun;
        let HeatFactorByShot = serverItem._props.HeatFactorByShot;
        let CoolFactorGun = serverItem._props.CoolFactorGun;
        let CoolFactorGunMods = serverItem._props.CoolFactorGunMods;
        let AllowOverheat = serverItem._props.AllowOverheat;
        let CenterOfImpact = serverItem._props.CenterOfImpact;
        let HipAccuracyRestorationDelay = serverItem._props.HipAccuracyRestorationDelay;
        let HipAccuracyRestorationSpeed = serverItem._props.HipAccuracyRestorationSpeed;
        let HipInnaccuracyGain = serverItem._props.HipInnaccuracyGain;
        let ShotgunDispersion = serverItem._props.shotgunDispersion;
        let Velocity = serverItem._props.Velocity;

        let item = {
            ItemID,
            Name,
            WeapType,
            BaseTorque,
            HasShoulderContact,
            Ergonomics,
            VerticalRecoil,
            HorizontalRecoil,
            Dispersion,
            CameraRecoil,
            CameraSnap,
            Convergence,
            RecoilAngle,
            BaseMalfunctionChance,
            HeatFactorGun,
            HeatFactorByShot,
            CoolFactorGun,
            CoolFactorGunMods,
            AllowOverheat,
            CenterOfImpact,
            HipAccuracyRestorationDelay,
            HipAccuracyRestorationSpeed,
            HipInnaccuracyGain,
            ShotgunDispersion,
            Velocity
        };
        return item;

    }



    private assignJSONToMod(serverItem: ITemplateItem, fileItem: any, ID: string) {

        //new items properties can be added, and  property values can be replaced, by delcaring them in this if statement
        if (fileItem) {
            // fileItem.HeatFactor = serverItem._props.HeatFactor; You need to give it a value. If you set it to the server item's propety value, the new property will only appear if the server mod has that property
        //    if(serverItem._props?.Recoil !== undefined){
        //     fileItem.VerticalRecoil = serverItem._props.Recoil;
        //     fileItem.HorizontalRecoil = serverItem._props.Recoil;
        //    }
            fileItem;
            return fileItem;
        }

        let ItemID = serverItem._id;
        let Name = serverItem._name;
        let ModType = "";
        let VerticalRecoil = serverItem._props.Recoil;
        let HorizontalRecoil = serverItem._props.Recoil;
        let Dispersion = 0;
        let CameraRecoil = 0;
        let AutoROF = 0;
        let SemiROF = 0;
        let ModMalfunctionChance = 0;
        let ReloadSpeed = 0;
        let AimSpeed = 0;
        let DrawSpeed = 0;
        let Length = 0;
        let CanCylceSubs = false;
        let RecoilAngle = 0;
        let Ergonomics = serverItem._props.Ergonomics
        let Accuracy = serverItem._props.Accuracy
        let CenterOfImpact = serverItem._props.CenterOfImpact
        let HeatFactor = serverItem._props.HeatFactor
        let CoolFactor = serverItem._props.CoolFactor
        let MagMalfunctionChance = serverItem._props.MalfunctionChance
        let LoadUnloadModifier = serverItem._props.LoadUnloadModifier
        let CheckTimeModifier = serverItem._props.CheckTimeModifier
        let DurabilityBurnModificator = serverItem._props.DurabilityBurnModificator;
        let HasShoulderContact = serverItem._props.HasShoulderContact;
        let BlocksFolding = serverItem._props.BlocksFolding;
        let Velocity = serverItem._props.Velocity;

        if (ID === "muzzle") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                CameraRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                CanCylceSubs,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                Velocity,
                RecoilAngle
            };
            return item;
        }

        if (ID === "barrel") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                Length,
                Accuracy,
                CenterOfImpact,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator,
                Velocity
            };
            return item;
        }
        if (ID === "mount") {
            let item = {
                ItemID,
                Name,
                ModType,
                Ergonomics,
                Accuracy
            };
            return item;
        }
        if (ID === "receiver") {
            let item = {
                ItemID,
                Name,
                ModType,
                ModMalfunctionChance,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator
            };
            return item;
        }
        if (ID === "charging") {
            let item = {
                ItemID,
                Name,
                ModType,
                ReloadSpeed
            };
            return item;
        }
        if (ID === "scope" || ID === "irons") {
            let item = {
                ItemID,
                Name,
                ModType,
                AimSpeed,
                Accuracy
            };
            return item;
        }
        if (ID === "magazine") {
            let item = {
                ItemID,
                Name,
                ModType,
                ReloadSpeed,
                Ergonomics,
                MagMalfunctionChance,
                LoadUnloadModifier,
                CheckTimeModifier
            };
            return item;
        }
        if (ID === "aux") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                AimSpeed,
                ReloadSpeed,
                Ergonomics,
                Accuracy
            };
            return item;
        }
        if (ID === "foregrip" || ID === "pistolgrip") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AimSpeed,
                DrawSpeed,
                Ergonomics,
                Accuracy
            };
            return item;
        }
        if (ID === "stock") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                CameraRecoil,
                AimSpeed,
                DrawSpeed,
                Ergonomics,
                Accuracy,
                HasShoulderContact,
                BlocksFolding
            };
            return item;
        }
        if (ID === "gasblock") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                CanCylceSubs,
                Accuracy,
                HeatFactor,
                CoolFactor,
                DurabilityBurnModificator
            };
            return item;
        }
        if (ID === "handguard") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                AimSpeed,
                DrawSpeed,
                Length,
                Ergonomics,
                Accuracy,
                HeatFactor,
                CoolFactor
            };
            return item;
        }
        if (ID === "flashlight") {
            let item = {
                ItemID,
                Name,
                ModType
            };
            return item;
        }
        if (ID === "unknown") {
            let item = {
                ItemID,
                Name,
                ModType,
                VerticalRecoil,
                HorizontalRecoil,
                Dispersion,
                CameraRecoil,
                AutoROF,
                SemiROF,
                ModMalfunctionChance,
                ReloadSpeed,
                AimSpeed,
                DrawSpeed,
                Length,
                CanCylceSubs,
                Ergonomics,
                Accuracy,
                CenterOfImpact,
                HeatFactor,
                CoolFactor,
                MagMalfunctionChance,
                LoadUnloadModifier,
                CheckTimeModifier,
                DurabilityBurnModificator,
                HasShoulderContact,
                BlocksFolding,
                Velocity,
                RecoilAngle
            };
            return item;
        }
    }

    private doAssignJSONMagazine(fileItem: any) {
        if (fileItem) {
            fileItem
            return fileItem;
        }

        let item = {
            "cartridges": []
        }

        return item;
    }

    public pushModsToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                for (let i in MuzzleDeviceTemplates) {
                    let fileItem = MuzzleDeviceTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in BarrelTemplates) {
                    let fileItem = BarrelTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in MountTemplates) {
                    let fileItem = MountTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in ReceiverTemplates) {
                    let fileItem = ReceiverTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in StockTemplates) {
                    let fileItem = StockTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in ChargingHandleTemplates) {
                    let fileItem = ChargingHandleTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in ScopeTemplates) {
                    let fileItem = ScopeTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in IronSightTemplates) {
                    let fileItem = IronSightTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in MagazineTemplates) {
                    let fileItem = MagazineTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in AuxiliaryModTemplates) {
                    let fileItem = AuxiliaryModTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in ForegripTemplates) {
                    let fileItem = ForegripTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in PistolGripTemplates) {
                    let fileItem = PistolGripTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in GasblockTemplates) {
                    let fileItem = GasblockTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in HandguardTemplates) {
                    let fileItem = HandguardTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in FlashlightLaserTemplates) {
                    let fileItem = FlashlightLaserTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
                for (let i in AuxiliaryModTemplates) {
                    let fileItem = AuxiliaryModTemplates[i];
                    this.modPusherHelper(serverItem, fileItem);
                }
            }
        }
        this.logger.info("Pushed Mod Stats to server");
    }

    public pushWeaponsToServer() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.RecolDispersion) {
                for (let i in AssaultRifleTemplates) {
                    let fileItem = AssaultRifleTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in AssaultCarbineTemplates) {
                    let fileItem = AssaultCarbineTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in MachinegunTemplates) {
                    let fileItem = MachinegunTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in MarksmanRifleTemplates) {
                    let fileItem = MarksmanRifleTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in PistolTemplates) {
                    let fileItem = PistolTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in ShotgunTemplates) {
                    let fileItem = ShotgunTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in SMGTemplates) {
                    let fileItem = SMGTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in SniperRifleTemplates) {
                    let fileItem = SniperRifleTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in SpecialWeaponTemplates) {
                    let fileItem = SpecialWeaponTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
                for (let i in GrenadeLauncherTemplates) {
                    let fileItem = GrenadeLauncherTemplates[i];
                    this.weapPusherHelper(serverItem, fileItem);
                }
            }
        }
        this.logger.info("Pushed Weapon Stats to server");
    }

    public pushToAllMods() {
        for (let i in this.itemDB) {
            let serverItem = this.itemDB[i];
            if (serverItem._props.ToolModdable == true || serverItem._props.ToolModdable == false) {
                var array = ["undefined", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "false", "0"]
                var serverConfItems = serverItem._props.ConflictingItems;
                var combinedArr = array.concat(serverConfItems)
                serverItem._props.ConflictingItems = combinedArr;
            }
        }
    }

    public modPusherHelper(serverItem: any, fileItem: any) {
        if (serverItem._id === fileItem.ItemID) {
            serverItem._props.Ergonomics = fileItem.Ergonomics;
            serverItem._props.Accuracy = fileItem.Accuracy;
            serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
            serverItem._props.HeatFactor = fileItem.HeatFactor;
            serverItem._props.CoolFactor = fileItem.CoolFactor;
            serverItem._props.MalfunctionChance = fileItem.MagMalfunctionChance;
            serverItem._props.LoadUnloadModifier = fileItem.LoadUnloadModifier;
            serverItem._props.CheckTimeModifier = fileItem.CheckTimeModifier;
            serverItem._props.DurabilityBurnModificator = fileItem.DurabilityBurnModificator;
            serverItem._props.HasShoulderContact = fileItem.HasShoulderContact;
            serverItem._props.BlocksFolding = fileItem.BlocksFolding;
            serverItem._props.Velocity = fileItem.Velocity;

            var serverConfItems = serverItem._props.ConflictingItems;
            var modPropertyValues = [fileItem?.ModType?.toString() || "undefined", fileItem?.VerticalRecoil?.toString() || "0", fileItem?.HorizontalRecoil?.toString() || "0", fileItem?.Dispersion?.toString() || "0", fileItem?.CameraRecoil?.toString() || "0",
            fileItem?.AutoROF?.toString() || "0", fileItem?.SemiROF?.toString() || "0", fileItem?.ModMalfunctionChance?.toString() || "0", fileItem?.ReloadSpeed?.toString() || "0", fileItem?.AimSpeed?.toString() || "0", fileItem?.DrawSpeed?.toString() || "0", 
            fileItem?.Length?.toString() || "0", fileItem?.CanCylceSubs?.toString() || "false", fileItem?.RecoilAngle?.toString() || "0"];

            for (let j in modPropertyValues) {
                serverConfItems[j] = modPropertyValues[j];
            }
        }
    }

    public weapPusherHelper(serverItem: any, fileItem: any) {
        if (serverItem._id === fileItem.ItemID) {
            serverItem._props.Ergonomics = fileItem.Ergonomics;
            serverItem._props.VerticalRecoil = fileItem.VerticalRecoil;
            serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
            serverItem._props.HeatFactor = fileItem.HeatFactor;
            serverItem._props.HorizontalRecoil = fileItem.HorizontalRecoil;
            serverItem._props.Dispersion = fileItem.Dispersion;
            serverItem._props.CameraRecoil = fileItem.CameraRecoil;
            serverItem._props.CameraSnap = fileItem.CameraSnap;
            serverItem._props.Convergence = fileItem.Convergence;
            serverItem._props.RecoilAngle = fileItem.RecoilAngle;
            serverItem._props.BaseMalfunctionChance = fileItem.BaseMalfunctionChance;
            serverItem._props.HeatFactorGun = fileItem.HeatFactorGun;
            serverItem._props.HeatFactorByShot = fileItem.HeatFactorByShot;
            serverItem._props.CoolFactorGun = fileItem.CoolFactorGun;
            serverItem._props.CoolFactorGunMods = fileItem.CoolFactorGunMods;
            serverItem._props.AllowOverheat = fileItem.AllowOverheat;
            serverItem._props.CenterOfImpact = fileItem.CenterOfImpact;
            serverItem._props.HipAccuracyRestorationDelay = fileItem.HipAccuracyRestorationDelay;
            serverItem._props.HipAccuracyRestorationSpeed = fileItem.HipAccuracyRestorationSpeed;
            serverItem._props.HipInnaccuracyGain = fileItem.HipInnaccuracyGain;
            serverItem._props.ShotgunDispersion = fileItem.ShotgunDispersion;
            serverItem._props.Velocity = fileItem.Velocity;

            var serverConfItems = serverItem._props.ConflictingItems;
            var weapPropertyValues = [fileItem?.WeapType?.toString() || "undefined", fileItem?.BaseTorque?.toString() || "0", fileItem?.HasShoulderContact?.toString() || "false", ""];
         
            for (let j in weapPropertyValues) {
                serverConfItems[j] = weapPropertyValues[j];
            }
        }
    }
}