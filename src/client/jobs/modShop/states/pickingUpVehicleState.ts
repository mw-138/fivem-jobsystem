import BaseState from "@common/stateMachine/baseState";
import ModShopStateMachine, { ModShopStateEnum } from "../modShopStateMachine";
import {
  getFullStreetName,
  getRandomElement,
  getRandomNumber,
  isPlayerInVehicle,
  setBlipLabel,
  showAdvancedNotification,
  showSubtitle,
  spawnVehicle,
  teleportPlayer,
} from "@common/helpers";
import { NotificationPictures } from "@common/enums";

class VehicleEntry {
  model: string | number;
  payRate: number;

  constructor(model: string | number, payRate: number) {
    this.model = model;
    this.payRate = payRate;
  }
}

export default class PickingUpVehicleState extends BaseState<ModShopStateEnum> {
  private _state: ModShopStateMachine;
  private _blip: number;

  private _compactVehiclePayRate: number = 1;
  private _compactVehicles: VehicleEntry[] = [
    new VehicleEntry("asbo", this._compactVehiclePayRate),
    new VehicleEntry("blista", this._compactVehiclePayRate),
    new VehicleEntry("brioso", this._compactVehiclePayRate),
    new VehicleEntry("brioso2", this._compactVehiclePayRate),
    new VehicleEntry("brioso3", this._compactVehiclePayRate),
    new VehicleEntry("club", this._compactVehiclePayRate),
    new VehicleEntry("dilettante", this._compactVehiclePayRate),
    // new VehicleEntry("dilettante2", this._compactVehiclePayRate),
    new VehicleEntry("issi2", this._compactVehiclePayRate),
    new VehicleEntry("issi3", this._compactVehiclePayRate),
    new VehicleEntry("issi4", this._compactVehiclePayRate),
    new VehicleEntry("issi5", this._compactVehiclePayRate),
    new VehicleEntry("issi6", this._compactVehiclePayRate),
    new VehicleEntry("kanjo", this._compactVehiclePayRate),
    new VehicleEntry("panto", this._compactVehiclePayRate),
    new VehicleEntry("prairie", this._compactVehiclePayRate),
    new VehicleEntry("rhapsody", this._compactVehiclePayRate),
    new VehicleEntry("weevil", this._compactVehiclePayRate),
  ];

  private _sedanVehiclePayRate: number = 1;
  private _sedanVehicles: VehicleEntry[] = [
    new VehicleEntry("asea", this._sedanVehiclePayRate),
    new VehicleEntry("asea2", this._sedanVehiclePayRate),
    new VehicleEntry("asterope", this._sedanVehiclePayRate),
    new VehicleEntry("cinquemila", this._sedanVehiclePayRate),
    new VehicleEntry("cog55", this._sedanVehiclePayRate),
    // new VehicleEntry("cog552", this._sedanVehiclePayRate),
    new VehicleEntry("cognoscenti", this._sedanVehiclePayRate),
    // new VehicleEntry("cognoscenti2", this._sedanVehiclePayRate),
    new VehicleEntry("deity", this._sedanVehiclePayRate),
    new VehicleEntry("emperor", this._sedanVehiclePayRate),
    new VehicleEntry("emperor2", this._sedanVehiclePayRate),
    new VehicleEntry("emperor3", this._sedanVehiclePayRate),
    new VehicleEntry("fugitive", this._sedanVehiclePayRate),
    new VehicleEntry("glendale", this._sedanVehiclePayRate),
    new VehicleEntry("glendale2", this._sedanVehiclePayRate),
    new VehicleEntry("ingot", this._sedanVehiclePayRate),
    new VehicleEntry("intruder", this._sedanVehiclePayRate),
    // new VehicleEntry("limo2", this._sedanVehiclePayRate),
    new VehicleEntry("premier", this._sedanVehiclePayRate),
    new VehicleEntry("primo", this._sedanVehiclePayRate),
    new VehicleEntry("primo2", this._sedanVehiclePayRate),
    new VehicleEntry("regina", this._sedanVehiclePayRate),
    new VehicleEntry("rhinehart", this._sedanVehiclePayRate),
    new VehicleEntry("romero", this._sedanVehiclePayRate),
    new VehicleEntry("schafter2", this._sedanVehiclePayRate),
    // new VehicleEntry("schafter5", this._sedanVehiclePayRate),
    // new VehicleEntry("schafter6", this._sedanVehiclePayRate),
    new VehicleEntry("stafford", this._sedanVehiclePayRate),
    new VehicleEntry("stanier", this._sedanVehiclePayRate),
    new VehicleEntry("stratum", this._sedanVehiclePayRate),
    // new VehicleEntry("stretch", this._sedanVehiclePayRate),
    new VehicleEntry("superd", this._sedanVehiclePayRate),
    new VehicleEntry("surge", this._sedanVehiclePayRate),
    new VehicleEntry("tailgater", this._sedanVehiclePayRate),
    new VehicleEntry("tailgater2", this._sedanVehiclePayRate),
    new VehicleEntry("warrener", this._sedanVehiclePayRate),
    new VehicleEntry("warrener2", this._sedanVehiclePayRate),
    new VehicleEntry("washington", this._sedanVehiclePayRate),
  ];

  private _suvVehiclePayRate: number = 1;
  private _suvVehicles: VehicleEntry[] = [
    new VehicleEntry("astron", this._suvVehiclePayRate),
    new VehicleEntry("baller", this._suvVehiclePayRate),
    new VehicleEntry("baller2", this._suvVehiclePayRate),
    new VehicleEntry("baller3", this._suvVehiclePayRate),
    new VehicleEntry("baller4", this._suvVehiclePayRate),
    new VehicleEntry("baller5", this._suvVehiclePayRate),
    new VehicleEntry("baller6", this._suvVehiclePayRate),
    new VehicleEntry("baller7", this._suvVehiclePayRate),
    new VehicleEntry("bjxl", this._suvVehiclePayRate),
    new VehicleEntry("cavalcade", this._suvVehiclePayRate),
    new VehicleEntry("cavalcade2", this._suvVehiclePayRate),
    new VehicleEntry("contender", this._suvVehiclePayRate),
    new VehicleEntry("dubsta", this._suvVehiclePayRate),
    new VehicleEntry("dubsta2", this._suvVehiclePayRate),
    new VehicleEntry("fq2", this._suvVehiclePayRate),
    new VehicleEntry("granger", this._suvVehiclePayRate),
    new VehicleEntry("granger2", this._suvVehiclePayRate),
    new VehicleEntry("gresley", this._suvVehiclePayRate),
    new VehicleEntry("habanero", this._suvVehiclePayRate),
    new VehicleEntry("huntley", this._suvVehiclePayRate),
    new VehicleEntry("issi8", this._suvVehiclePayRate),
    new VehicleEntry("iwagen", this._suvVehiclePayRate),
    new VehicleEntry("jubilee", this._suvVehiclePayRate),
    new VehicleEntry("landstalker", this._suvVehiclePayRate),
    new VehicleEntry("landstalker2", this._suvVehiclePayRate),
    new VehicleEntry("mesa", this._suvVehiclePayRate),
    new VehicleEntry("mesa2", this._suvVehiclePayRate),
    new VehicleEntry("novak", this._suvVehiclePayRate),
    new VehicleEntry("patriot", this._suvVehiclePayRate),
    // new VehicleEntry("patriot2", this._suvVehiclePayRate),
    new VehicleEntry("radi", this._suvVehiclePayRate),
    new VehicleEntry("rebla", this._suvVehiclePayRate),
    new VehicleEntry("rocoto", this._suvVehiclePayRate),
    new VehicleEntry("seminole", this._suvVehiclePayRate),
    new VehicleEntry("seminole2", this._suvVehiclePayRate),
    new VehicleEntry("serrano", this._suvVehiclePayRate),
    new VehicleEntry("squaddie", this._suvVehiclePayRate),
    new VehicleEntry("toros", this._suvVehiclePayRate),
    new VehicleEntry("xls", this._suvVehiclePayRate),
    // new VehicleEntry("xls2", this._suvVehiclePayRate),
  ];

  private _coupeVehiclePayRate: number = 1;
  private _coupeVehicles: VehicleEntry[] = [
    new VehicleEntry("cogcabrio", this._coupeVehiclePayRate),
    new VehicleEntry("exemplar", this._coupeVehiclePayRate),
    new VehicleEntry("f620", this._coupeVehiclePayRate),
    new VehicleEntry("felon", this._coupeVehiclePayRate),
    new VehicleEntry("felon2", this._coupeVehiclePayRate),
    new VehicleEntry("jackal", this._coupeVehiclePayRate),
    new VehicleEntry("kanjosj", this._coupeVehiclePayRate),
    new VehicleEntry("oracle", this._coupeVehiclePayRate),
    new VehicleEntry("oracle2", this._coupeVehiclePayRate),
    new VehicleEntry("postlude", this._coupeVehiclePayRate),
    new VehicleEntry("previon", this._coupeVehiclePayRate),
    new VehicleEntry("sentinel", this._coupeVehiclePayRate),
    new VehicleEntry("sentinel2", this._coupeVehiclePayRate),
    new VehicleEntry("windsor", this._coupeVehiclePayRate),
    new VehicleEntry("windsor2", this._coupeVehiclePayRate),
    new VehicleEntry("zion", this._coupeVehiclePayRate),
    new VehicleEntry("zion2", this._coupeVehiclePayRate),
  ];

  private _muscleVehiclePayRate: number = 1;
  private _muscleVehicles: VehicleEntry[] = [
    new VehicleEntry("blade", this._muscleVehiclePayRate),
    new VehicleEntry("brigham", this._muscleVehiclePayRate),
    new VehicleEntry("broadway", this._muscleVehiclePayRate),
    new VehicleEntry("buccaneer", this._muscleVehiclePayRate),
    new VehicleEntry("buccaneer2", this._muscleVehiclePayRate),
    new VehicleEntry("buffalo4", this._muscleVehiclePayRate),
    new VehicleEntry("buffalo5", this._muscleVehiclePayRate),
    new VehicleEntry("chino", this._muscleVehiclePayRate),
    new VehicleEntry("chino2", this._muscleVehiclePayRate),
    new VehicleEntry("clique", this._muscleVehiclePayRate),
    new VehicleEntry("clique2", this._muscleVehiclePayRate),
    new VehicleEntry("coquette3", this._muscleVehiclePayRate),
    new VehicleEntry("deviant", this._muscleVehiclePayRate),
    new VehicleEntry("dominator", this._muscleVehiclePayRate),
    // new VehicleEntry("dominator2", this._muscleVehiclePayRate),
    new VehicleEntry("dominator3", this._muscleVehiclePayRate),
    // new VehicleEntry("dominator4", this._muscleVehiclePayRate),
    // new VehicleEntry("dominator5", this._muscleVehiclePayRate),
    // new VehicleEntry("dominator6", this._muscleVehiclePayRate),
    new VehicleEntry("dominator7", this._muscleVehiclePayRate),
    new VehicleEntry("dominator8", this._muscleVehiclePayRate),
    new VehicleEntry("dominator9", this._muscleVehiclePayRate),
    new VehicleEntry("dukes", this._muscleVehiclePayRate),
    new VehicleEntry("dukes2", this._muscleVehiclePayRate),
    new VehicleEntry("dukes3", this._muscleVehiclePayRate),
    new VehicleEntry("ellie", this._muscleVehiclePayRate),
    new VehicleEntry("eudora", this._muscleVehiclePayRate),
    new VehicleEntry("faction", this._muscleVehiclePayRate),
    new VehicleEntry("faction2", this._muscleVehiclePayRate),
    new VehicleEntry("faction3", this._muscleVehiclePayRate),
    new VehicleEntry("gauntlet", this._muscleVehiclePayRate),
    // new VehicleEntry("gauntlet2", this._muscleVehiclePayRate),
    new VehicleEntry("gauntlet3", this._muscleVehiclePayRate),
    new VehicleEntry("gauntlet4", this._muscleVehiclePayRate),
    new VehicleEntry("gauntlet5", this._muscleVehiclePayRate),
    new VehicleEntry("greenwood", this._muscleVehiclePayRate),
    new VehicleEntry("hermes", this._muscleVehiclePayRate),
    new VehicleEntry("hotknife", this._muscleVehiclePayRate),
    new VehicleEntry("hustler", this._muscleVehiclePayRate),
    new VehicleEntry("impaler", this._muscleVehiclePayRate),
    // new VehicleEntry("impaler2", this._muscleVehiclePayRate),
    // new VehicleEntry("impaler3", this._muscleVehiclePayRate),
    // new VehicleEntry("impaler4", this._muscleVehiclePayRate),
    // new VehicleEntry("imperator", this._muscleVehiclePayRate),
    // new VehicleEntry("imperator2", this._muscleVehiclePayRate),
    // new VehicleEntry("imperator3", this._muscleVehiclePayRate),
    new VehicleEntry("lurcher", this._muscleVehiclePayRate),
    new VehicleEntry("manana2", this._muscleVehiclePayRate),
    new VehicleEntry("moonbeam", this._muscleVehiclePayRate),
    new VehicleEntry("moonbeam2", this._muscleVehiclePayRate),
    new VehicleEntry("nightshade", this._muscleVehiclePayRate),
    new VehicleEntry("peyote2", this._muscleVehiclePayRate),
    new VehicleEntry("phoenix", this._muscleVehiclePayRate),
    new VehicleEntry("picador", this._muscleVehiclePayRate),
    new VehicleEntry("ratloader", this._muscleVehiclePayRate),
    new VehicleEntry("ratloader2", this._muscleVehiclePayRate),
    new VehicleEntry("ruiner", this._muscleVehiclePayRate),
    new VehicleEntry("ruiner2", this._muscleVehiclePayRate),
    // new VehicleEntry("ruiner3", this._muscleVehiclePayRate),
    new VehicleEntry("ruiner4", this._muscleVehiclePayRate),
    new VehicleEntry("sabregt", this._muscleVehiclePayRate),
    new VehicleEntry("sabregt2", this._muscleVehiclePayRate),
    new VehicleEntry("slamvan", this._muscleVehiclePayRate),
    new VehicleEntry("slamvan2", this._muscleVehiclePayRate),
    new VehicleEntry("slamvan3", this._muscleVehiclePayRate),
    // new VehicleEntry("slamvan4", this._muscleVehiclePayRate),
    // new VehicleEntry("slamvan5", this._muscleVehiclePayRate),
    // new VehicleEntry("slamvan6", this._muscleVehiclePayRate),
    new VehicleEntry("stalion", this._muscleVehiclePayRate),
    // new VehicleEntry("stalion2", this._muscleVehiclePayRate),
    new VehicleEntry("tahoma", this._muscleVehiclePayRate),
    new VehicleEntry("tampa", this._muscleVehiclePayRate),
    // new VehicleEntry("tampa3", this._muscleVehiclePayRate),
    new VehicleEntry("tulip", this._muscleVehiclePayRate),
    new VehicleEntry("tulip2", this._muscleVehiclePayRate),
    new VehicleEntry("vamos", this._muscleVehiclePayRate),
    new VehicleEntry("vigero", this._muscleVehiclePayRate),
    new VehicleEntry("vigero2", this._muscleVehiclePayRate),
    new VehicleEntry("virgo", this._muscleVehiclePayRate),
    new VehicleEntry("virgo2", this._muscleVehiclePayRate),
    new VehicleEntry("virgo3", this._muscleVehiclePayRate),
    new VehicleEntry("voodoo", this._muscleVehiclePayRate),
    new VehicleEntry("voodoo2", this._muscleVehiclePayRate),
    new VehicleEntry("weevil2", this._muscleVehiclePayRate),
    new VehicleEntry("yosemite", this._muscleVehiclePayRate),
    new VehicleEntry("yosemite2", this._muscleVehiclePayRate),
  ];

  private _sportClassicVehiclePayRate: number = 1;
  private _sportClassicVehicles: VehicleEntry[] = [];

  private _sportVehiclePayRate: number = 1.5;
  private _sportVehicles: VehicleEntry[] = [
    new VehicleEntry("alpha", this._sportVehiclePayRate),
    new VehicleEntry("banshee", this._sportVehiclePayRate),
    new VehicleEntry("bestiagts", this._sportVehiclePayRate),
    new VehicleEntry("blista2", this._sportVehiclePayRate),
    new VehicleEntry("blista3", this._sportVehiclePayRate),
    new VehicleEntry("buffalo", this._sportVehiclePayRate),
    new VehicleEntry("buffalo2", this._sportVehiclePayRate),
    new VehicleEntry("buffalo3", this._sportVehiclePayRate),
    new VehicleEntry("calico", this._sportVehiclePayRate),
    new VehicleEntry("comet2", this._sportVehiclePayRate),
    new VehicleEntry("comet3", this._sportVehiclePayRate),
    new VehicleEntry("comet4", this._sportVehiclePayRate),
    new VehicleEntry("comet5", this._sportVehiclePayRate),
    new VehicleEntry("comet6", this._sportVehiclePayRate),
    new VehicleEntry("comet7", this._sportVehiclePayRate),
    new VehicleEntry("coquette", this._sportVehiclePayRate),
    new VehicleEntry("coquette4", this._sportVehiclePayRate),
    new VehicleEntry("corsita", this._sportVehiclePayRate),
    new VehicleEntry("coureur", this._sportVehiclePayRate),
    new VehicleEntry("cypher", this._sportVehiclePayRate),
    new VehicleEntry("drafter", this._sportVehiclePayRate),
    new VehicleEntry("elegy", this._sportVehiclePayRate),
    new VehicleEntry("elegy2", this._sportVehiclePayRate),
    new VehicleEntry("euros", this._sportVehiclePayRate),
    new VehicleEntry("everon2", this._sportVehiclePayRate),
    new VehicleEntry("feltzer2", this._sportVehiclePayRate),
    new VehicleEntry("flashgt", this._sportVehiclePayRate),
    new VehicleEntry("furoregt", this._sportVehiclePayRate),
    new VehicleEntry("fusilade", this._sportVehiclePayRate),
    new VehicleEntry("futo", this._sportVehiclePayRate),
    new VehicleEntry("futo2", this._sportVehiclePayRate),
    new VehicleEntry("gauntlet6", this._sportVehiclePayRate),
    new VehicleEntry("gb200", this._sportVehiclePayRate),
    new VehicleEntry("growler", this._sportVehiclePayRate),
    new VehicleEntry("hotring", this._sportVehiclePayRate),
    new VehicleEntry("imorgon", this._sportVehiclePayRate),
    new VehicleEntry("issi7", this._sportVehiclePayRate),
    new VehicleEntry("italigto", this._sportVehiclePayRate),
    new VehicleEntry("italirsx", this._sportVehiclePayRate),
    new VehicleEntry("jester", this._sportVehiclePayRate),
    new VehicleEntry("jester2", this._sportVehiclePayRate),
    new VehicleEntry("jester4", this._sportVehiclePayRate),
    new VehicleEntry("jugular", this._sportVehiclePayRate),
    new VehicleEntry("khamelion", this._sportVehiclePayRate),
    new VehicleEntry("komoda", this._sportVehiclePayRate),
    new VehicleEntry("kuruma", this._sportVehiclePayRate),
    // new VehicleEntry("kuruma2", this._sportVehiclePayRate),
    new VehicleEntry("locust", this._sportVehiclePayRate),
    new VehicleEntry("lynx", this._sportVehiclePayRate),
    new VehicleEntry("massacro", this._sportVehiclePayRate),
    new VehicleEntry("massacro2", this._sportVehiclePayRate),
    new VehicleEntry("neo", this._sportVehiclePayRate),
    new VehicleEntry("neon", this._sportVehiclePayRate),
    new VehicleEntry("ninef", this._sportVehiclePayRate),
    new VehicleEntry("ninef2", this._sportVehiclePayRate),
    new VehicleEntry("omnis", this._sportVehiclePayRate),
    new VehicleEntry("omnisegt", this._sportVehiclePayRate),
    new VehicleEntry("panthere", this._sportVehiclePayRate),
    new VehicleEntry("paragon", this._sportVehiclePayRate),
    new VehicleEntry("paragon2", this._sportVehiclePayRate),
    new VehicleEntry("pariah", this._sportVehiclePayRate),
    new VehicleEntry("penumbra", this._sportVehiclePayRate),
    new VehicleEntry("penumbra2", this._sportVehiclePayRate),
    new VehicleEntry("r300", this._sportVehiclePayRate),
    new VehicleEntry("raiden", this._sportVehiclePayRate),
    new VehicleEntry("rapidgt", this._sportVehiclePayRate),
    new VehicleEntry("rapidgt2", this._sportVehiclePayRate),
    new VehicleEntry("raptor", this._sportVehiclePayRate),
    new VehicleEntry("remus", this._sportVehiclePayRate),
    new VehicleEntry("revolter", this._sportVehiclePayRate),
    new VehicleEntry("rt3000", this._sportVehiclePayRate),
    new VehicleEntry("ruston", this._sportVehiclePayRate),
    new VehicleEntry("schafter2", this._sportVehiclePayRate),
    new VehicleEntry("schafter3", this._sportVehiclePayRate),
    new VehicleEntry("schafter4", this._sportVehiclePayRate),
    new VehicleEntry("schafter5", this._sportVehiclePayRate),
    new VehicleEntry("schlagen", this._sportVehiclePayRate),
    new VehicleEntry("schwarzer", this._sportVehiclePayRate),
    new VehicleEntry("sentinel3", this._sportVehiclePayRate),
    new VehicleEntry("sentinel4", this._sportVehiclePayRate),
    new VehicleEntry("seven70", this._sportVehiclePayRate),
    new VehicleEntry("sm722", this._sportVehiclePayRate),
    new VehicleEntry("specter", this._sportVehiclePayRate),
    new VehicleEntry("specter2", this._sportVehiclePayRate),
    new VehicleEntry("stingertt", this._sportVehiclePayRate),
    new VehicleEntry("sugoi", this._sportVehiclePayRate),
    new VehicleEntry("sultan", this._sportVehiclePayRate),
    new VehicleEntry("sultan2", this._sportVehiclePayRate),
    new VehicleEntry("sultan3", this._sportVehiclePayRate),
    new VehicleEntry("surano", this._sportVehiclePayRate),
    new VehicleEntry("tampa2", this._sportVehiclePayRate),
    new VehicleEntry("tenf", this._sportVehiclePayRate),
    new VehicleEntry("tenf2", this._sportVehiclePayRate),
    new VehicleEntry("tropos", this._sportVehiclePayRate),
    new VehicleEntry("verlierer2", this._sportVehiclePayRate),
    new VehicleEntry("vectre", this._sportVehiclePayRate),
    new VehicleEntry("veto", this._sportVehiclePayRate),
    new VehicleEntry("veto2", this._sportVehiclePayRate),
    new VehicleEntry("vstr", this._sportVehiclePayRate),
    new VehicleEntry("zr350", this._sportVehiclePayRate),
    // new VehicleEntry("zr380", this._sportVehiclePayRate),
    // new VehicleEntry("zr3802", this._sportVehiclePayRate),
    // new VehicleEntry("zr3803", this._sportVehiclePayRate),
  ];

  private _superVehiclePayRate: number = 2;
  private _superVehicles: VehicleEntry[] = [
    new VehicleEntry("adder", this._superVehiclePayRate),
    new VehicleEntry("autarch", this._superVehiclePayRate),
    new VehicleEntry("banshee2", this._superVehiclePayRate),
    new VehicleEntry("bullet", this._superVehiclePayRate),
    new VehicleEntry("champion", this._superVehiclePayRate),
    new VehicleEntry("cheetah", this._superVehiclePayRate),
    new VehicleEntry("cyclone", this._superVehiclePayRate),
    new VehicleEntry("deveste", this._superVehiclePayRate),
    new VehicleEntry("emerus", this._superVehiclePayRate),
    new VehicleEntry("entityxf", this._superVehiclePayRate),
    new VehicleEntry("entity2", this._superVehiclePayRate),
    new VehicleEntry("entity3", this._superVehiclePayRate),
    new VehicleEntry("fmj", this._superVehiclePayRate),
    new VehicleEntry("furia", this._superVehiclePayRate),
    new VehicleEntry("gp1", this._superVehiclePayRate),
    new VehicleEntry("ignus", this._superVehiclePayRate),
    new VehicleEntry("infernus", this._superVehiclePayRate),
    new VehicleEntry("italigtb", this._superVehiclePayRate),
    new VehicleEntry("italigtb2", this._superVehiclePayRate),
    new VehicleEntry("krieger", this._superVehiclePayRate),
    new VehicleEntry("le7b", this._superVehiclePayRate),
    new VehicleEntry("lm87", this._superVehiclePayRate),
    new VehicleEntry("nero", this._superVehiclePayRate),
    new VehicleEntry("nero2", this._superVehiclePayRate),
    new VehicleEntry("osiris", this._superVehiclePayRate),
    new VehicleEntry("penetrator", this._superVehiclePayRate),
    new VehicleEntry("pfister811", this._superVehiclePayRate),
    new VehicleEntry("prototipo", this._superVehiclePayRate),
    new VehicleEntry("reaper", this._superVehiclePayRate),
    new VehicleEntry("s80", this._superVehiclePayRate),
    new VehicleEntry("sc1", this._superVehiclePayRate),
    // new VehicleEntry("scramjet", this._superVehiclePayRate),
    new VehicleEntry("sheava", this._superVehiclePayRate),
    new VehicleEntry("sultanrs", this._superVehiclePayRate),
    new VehicleEntry("t20", this._superVehiclePayRate),
    new VehicleEntry("taipan", this._superVehiclePayRate),
    new VehicleEntry("tempesta", this._superVehiclePayRate),
    new VehicleEntry("tezeract", this._superVehiclePayRate),
    new VehicleEntry("thrax", this._superVehiclePayRate),
    new VehicleEntry("tigon", this._superVehiclePayRate),
    new VehicleEntry("torero2", this._superVehiclePayRate),
    new VehicleEntry("turismor", this._superVehiclePayRate),
    new VehicleEntry("tyrant", this._superVehiclePayRate),
    new VehicleEntry("tyrus", this._superVehiclePayRate),
    new VehicleEntry("vacca", this._superVehiclePayRate),
    new VehicleEntry("vagner", this._superVehiclePayRate),
    // new VehicleEntry("vigilante", this._superVehiclePayRate),
    new VehicleEntry("virtue", this._superVehiclePayRate),
    new VehicleEntry("visione", this._superVehiclePayRate),
    new VehicleEntry("voltic", this._superVehiclePayRate),
    // new VehicleEntry("voltic2", this._superVehiclePayRate),
    new VehicleEntry("xa21", this._superVehiclePayRate),
    new VehicleEntry("zeno", this._superVehiclePayRate),
    new VehicleEntry("zentorno", this._superVehiclePayRate),
    new VehicleEntry("zorrusso", this._superVehiclePayRate),
  ];

  private _motorcycleVehiclePayRate: number = 1;
  private _motorcycleVehicles: VehicleEntry[] = [];

  private _offRoadVehiclePayRate: number = 1;
  private _offRoadVehicles: VehicleEntry[] = [];

  private _vanVehiclePayRate: number = 1;
  private _vanVehicles: VehicleEntry[] = [];

  private _southSideVehicles: VehicleEntry[] = [
    ...this._compactVehicles,
    ...this._sedanVehicles,
    ...this._muscleVehicles,
  ];
  private _vinewoodVehicles: VehicleEntry[] = [
    ...this._sportVehicles,
    ...this._sportClassicVehicles,
    ...this._superVehicles,
    ...this._muscleVehicles,
  ];

  private _southSideVehicleSpawns: [number[], number, VehicleEntry[]][] = [
    [[-38.57, -1445.95, 31.49], 179.44, this._southSideVehicles],
    [[-24.19, -1437.72, 30.65], 177.94, this._southSideVehicles],
  ];
  private _vinewoodVehicleSpawns: [number[], number, VehicleEntry[]][] = [
    [[353.67, 437.3, 146.72], 303.97, this._vinewoodVehicles],
    [[320.73, 495.72, 152.49], 284.52, this._vinewoodVehicles],
    [[172.95, 483.48, 142.42], 356.65, this._vinewoodVehicles],
    [[114.05, 496.8, 147.15], 194.97, this._vinewoodVehicles],
    [[90.25, 486.42, 147.66], 205.4, this._vinewoodVehicles],
    [[13.22, 547.12, 176.03], 94.65, this._vinewoodVehicles],
    [[-74.46, 495.49, 144.48], 3.46, this._vinewoodVehicles],
    [[-352.43, 475.47, 112.81], 308.99, this._vinewoodVehicles],
    [[-320.47, 432.36, 109.71], 9.85, this._vinewoodVehicles],
    [[-391.74, 432.35, 112.28], 244.37, this._vinewoodVehicles],
    [[-399.22, 520.51, 120.75], 357.24, this._vinewoodVehicles],
    [[-408.28, 559.94, 124.37], 150.46, this._vinewoodVehicles],
    [[-470.06, 542.28, 120.8], 355.76, this._vinewoodVehicles],
    [[-519.72, 574.99, 120.98], 279.38, this._vinewoodVehicles],
    [[-483.78, 597.3, 126.66], 92.69, this._vinewoodVehicles],
    [[-575.8, 497.95, 106.3], 11.47, this._vinewoodVehicles],
    [[-584.81, 526.32, 107.45], 212.89, this._vinewoodVehicles],
    [[-629.54, 516.92, 109.63], 188.55, this._vinewoodVehicles],
    [[-687.49, 501.17, 110.05], 202.49, this._vinewoodVehicles],
    [[-715.57, 495.52, 109.28], 200.21, this._vinewoodVehicles],
  ];

  private _basePayout: number = 20;

  onEnter = async (): Promise<void> => {
    this._state = <ModShopStateMachine>this._stateMachine;

    const [vehicleSpawn, vehicleHeading, vehicleList] = getRandomElement([
      ...this._southSideVehicleSpawns,
      ...this._vinewoodVehicleSpawns,
    ]);

    showAdvancedNotification(
      `You have a vehicle to pick up.~n~Location: ${getFullStreetName(
        vehicleSpawn,
        true
      )}`,
      "LS Customs",
      "Vehicle Pickup",
      2,
      NotificationPictures.CHAR_LS_CUSTOMS,
      8,
      true
    );

    const randomVehicleEntry = getRandomElement(vehicleList);
    this._state.cashPayout += this._basePayout * randomVehicleEntry.payRate;

    const vehicle = await spawnVehicle(
      randomVehicleEntry.model,
      vehicleSpawn,
      vehicleHeading
    );
    SetVehicleDirtLevel(vehicle, getRandomNumber(0, 15));
    this._state.pickupVehicle = vehicle;
    this._state.pickupVehicleCoords = vehicleSpawn;

    const [x, y, z] = vehicleSpawn;
    this._blip = AddBlipForCoord(x, y, z);
    SetBlipRoute(this._blip, true);

    // SetPedIntoVehicle(PlayerPedId(), vehicle, -1);
  };

  onExit = (): void => {
    if (DoesBlipExist(this._blip)) {
      SetBlipRoute(this._blip, false);
      RemoveBlip(this._blip);
    }
  };

  onUpdate = (): void => {
    const inVehicle = isPlayerInVehicle(this._state.pickupVehicle);
    showSubtitle("Pickup ~y~vehicle~w~", 1000);
    if (inVehicle) {
      this._stateMachine.setState(ModShopStateEnum.DropOffVehicle);
    }
  };
}
