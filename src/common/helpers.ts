export function Delay(duration: number): Promise<any> {
  return new Promise((res) => setTimeout(res, duration, []));
}

export function getLocalCoords(): number[] {
  return GetEntityCoords(PlayerPedId(), false);
}

export function getDistanceToPoint(point: number[]): number {
  const [x, y, z] = getLocalCoords();
  const [px, py, pz] = point;
  return Vdist(x, y, z, px, py, pz);
}

export function isWithinDistanceOfPoint(
  point: number[],
  distance: number
): boolean {
  return getDistanceToPoint(point) < distance;
}

export function isWithinDistanceOfEntity(
  entity: number,
  distance: number
): boolean {
  const coords = GetEntityCoords(entity, false);
  // const [px, py, pz] = GetEntityCoords(PlayerPedId(), false);
  // const [ex, ey, ez] = coords;
  // const model = GetEntityModel(entity);
  // const [[minX, minY], [maxX, maxY]] = GetModelDimensions(model);
  // const x = ex + Math.max(maxX - minX);
  // const y = ey + Math.max(maxY - minY);
  // const z = ez;
  // const retval = [x, y, z];
  // const dist = Vdist(px, py, pz, x, y, z);
  // console.log(dist);
  return isWithinDistanceOfPoint(coords, distance);
}

export function isEntityWithinDistanceOfPoint(
  entity: number,
  target: number[],
  distance: number
): boolean {
  const [ex, ey, ez] = GetEntityCoords(entity, false);
  const [tx, ty, tz] = target;
  const dist = Vdist(ex, ey, ez, tx, ty, tz);
  return dist < distance;
}

export function isPlayerInAnyVehicle(): boolean {
  return IsPedInAnyVehicle(PlayerPedId(), true);
}

export function isPlayerInVehicle(vehicle: number): boolean {
  return IsPedInVehicle(PlayerPedId(), vehicle, true);
}

export function getPlayerVehicle(): number {
  return GetVehiclePedIsUsing(PlayerPedId());
}

export function showNotification(
  message: string,
  color: number,
  flash: boolean,
  saveToBrief: boolean
): void {
  BeginTextCommandThefeedPost("STRING");
  AddTextComponentSubstringPlayerName(message);
  ThefeedNextPostBackgroundColor(color);
  EndTextCommandThefeedPostTicker(flash, saveToBrief);
}

export function showAdvancedNotification(
  message: string,
  sender: string,
  subject: string,
  color: number,
  textureDict: string,
  iconType: number,
  saveToBrief: boolean
): void {
  BeginTextCommandThefeedPost("STRING");
  AddTextComponentSubstringPlayerName(message);
  ThefeedNextPostBackgroundColor(color);
  EndTextCommandThefeedPostMessagetext(
    textureDict,
    textureDict,
    true,
    iconType,
    sender,
    subject
  );
  EndTextCommandThefeedPostTicker(false, saveToBrief);
}

export async function showPedHeadshotNotification(
  ped: number,
  message: string
): Promise<void> {
  const handle = RegisterPedheadshot(ped);
  while (!IsPedheadshotReady(handle) || !IsPedheadshotValid(handle)) {
    await Delay(0);
  }
  const txd = GetPedheadshotTxdString(handle);
  // BeginTextCommandThefeedPost("STRING");
  // AddTextComponentSubstringPlayerName(message);
  // EndTextCommandThefeedPostAward(txd, txd, 0, 0, "FM_GEN_UNLOCK");
  showAwardNotification(message, txd, 0, 0, "FM_GEN_UNLOCK");
  UnregisterPedheadshot(handle);
}

export function showAwardNotification(
  message: string,
  textureDict: string,
  rpBonus: number,
  colorOverlay: number,
  titleLabel: string
): void {
  BeginTextCommandThefeedPost("STRING");
  AddTextComponentSubstringPlayerName(message);
  EndTextCommandThefeedPostAward(
    textureDict,
    textureDict,
    rpBonus,
    colorOverlay,
    titleLabel
  );
}

export function showAlert(
  message: string,
  beep: boolean,
  duration: number
): void {
  AddTextEntry("CH_ALERT", message);
  BeginTextCommandDisplayHelp("CH_ALERT");
  EndTextCommandDisplayHelp(0, false, beep, duration);
}

export function drawMarker(
  type: number,
  position: number[],
  direction: number[],
  rotation: number[],
  scale: number[],
  color: number[],
  bobUpAndDown: boolean,
  faceCamera: boolean,
  rotate: boolean
): void {
  const [px, py, pz] = position;
  const [dx, dy, dz] = direction;
  const [rx, ry, rz] = rotation;
  const [sx, sy, sz] = scale;
  const [r, g, b, a] = color;
  const p19 = 2;
  const textureDict = null;
  const textureName = null;
  const drawOnEnts = false;
  DrawMarker(
    type,
    px,
    py,
    pz,
    dx,
    dy,
    dz,
    rx,
    ry,
    rz,
    sx,
    sy,
    sz,
    r,
    g,
    b,
    a,
    bobUpAndDown,
    faceCamera,
    p19,
    rotate,
    textureDict,
    textureName,
    drawOnEnts
  );
}

export function showSubtitle(message: string, duration: number): void {
  BeginTextCommandPrint("STRING");
  AddTextComponentString(message);
  EndTextCommandPrint(duration, true);
}

export function showBusySpinner(message: string): void {
  BeginTextCommandBusyspinnerOn("STRING");
  AddTextComponentSubstringPlayerName(message);
  EndTextCommandBusyspinnerOn(5);
}

export function hideBusySpinner(): void {
  BusyspinnerOff();
}

export async function getTextInput(
  title: string,
  inputLength: number
): Promise<string> {
  AddTextEntry("CH_INPUT", title);
  DisplayOnscreenKeyboard(1, "CH_INPUT", "", "", "", "", "", inputLength);
  while (UpdateOnscreenKeyboard() === 0) {
    await Delay(0);
  }
  if (UpdateOnscreenKeyboard() !== 2) {
    const result = GetOnscreenKeyboardResult();
    await Delay(0);
    return result;
  } else {
    await Delay(0);
    return "";
  }
}

export async function teleportPlayer(
  coords: number[],
  heading: number,
  teleportWithVehicle: boolean,
  duration: number
): Promise<void> {
  const [x, y, z] = coords;
  const totalDuration = duration / 2;
  DoScreenFadeOut(totalDuration);
  await Delay(totalDuration);
  StartPlayerTeleport(
    PlayerId(),
    x,
    y,
    z,
    heading,
    teleportWithVehicle,
    true,
    false
  );
  await Delay(totalDuration);
  DoScreenFadeIn(totalDuration);
}

export async function spawnPed(
  type: number,
  model: string | number,
  position: number[],
  heading: number,
  isStationary: boolean
): Promise<number> {
  const [x, y, z] = position;
  RequestModel(model);
  while (!HasModelLoaded(model)) {
    await Delay(0);
  }
  const ped = CreatePed(type, model, x, y, z, heading, true, true);
  SetModelAsNoLongerNeeded(model);
  if (isStationary) {
    SetEntityAsMissionEntity(ped, true, true);
    SetEntityInvincible(ped, true);
    TaskSetBlockingOfNonTemporaryEvents(ped, true);
    SetPedFleeAttributes(ped, 0, false);
    SetPedCombatAttributes(ped, 17, true);
    await Delay(1000);
    FreezeEntityPosition(ped, true);
  }
  return ped;
}

export async function spawnPedInsideVehicle(
  type: number,
  model: string | number,
  vehicle: number,
  seatIndex: number
): Promise<number> {
  RequestModel(model);
  while (!HasModelLoaded(model)) {
    await Delay(0);
  }
  const ped = CreatePedInsideVehicle(
    vehicle,
    type,
    model,
    seatIndex,
    true,
    true
  );
  SetModelAsNoLongerNeeded(model);
  return ped;
}

export async function spawnVehicle(
  model: string | number,
  position: number[],
  heading: number
): Promise<number> {
  const [x, y, z] = position;
  RequestModel(model);
  while (!HasModelLoaded(model)) {
    await Delay(0);
  }
  const vehicle = CreateVehicle(model, x, y, z, heading, true, true);
  SetModelAsNoLongerNeeded(model);
  return vehicle;
}

export function isAreaClear(area: number[]): boolean {
  const [x, y, z] = area;
  return !IsPositionOccupied(
    x,
    y,
    z,
    2,
    false,
    true,
    true,
    false,
    false,
    0,
    false
  );
}

export function getRandomElement<T>(array: T[]): T | undefined {
  if (array.length === 0) {
    return undefined;
  }
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}

export function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomMapCoord(): number[] {
  return [
    getRandomNumber(-4000, 4000),
    getRandomNumber(-4000, 4000),
    getRandomNumber(-3000, 3000),
  ];
}

export function getRandomAreaCoord(
  x: number[],
  y: number[],
  z: number[]
): number[] {
  const [minX, maxX] = x;
  const [minY, maxY] = y;
  const [minZ, maxZ] = z;
  return [
    getRandomNumber(minX, maxX),
    getRandomNumber(minY, maxY),
    getRandomNumber(minZ, maxZ),
  ];
}

export function getRandomRoadSidePoint(area: number[]): [number[], number] {
  const [ax, ay, az] = area;
  const [retval, coords, heading] = GetClosestVehicleNodeWithHeading(
    ax,
    ay,
    az,
    1,
    3,
    0
  );
  const [x, y, z] = coords;
  const [found, coordsSide] = GetPointOnRoadSide(x, y, z, 0);
  const [cx, cy, cz] = coordsSide;
  const isNull = cx === 0 && cy === 0 && cz === 0;
  if (isNull) {
    return [[-5.82, 5.53, 71.1], 66.34];
  }
  return [coordsSide, heading];
}

export function getRandomRoadSidePointNearPlayer(
  radius: number
): [number[], number] {
  const playerCoords = getLocalCoords();
  const [px, py, pz] = playerCoords;
  const [minX, minY, minZ] = [px - radius, py - radius, pz - radius];
  const [maxX, maxY, maxZ] = [px + radius, py + radius, pz + radius];
  const randomAreaCoords = getRandomAreaCoord(
    [minX, maxX],
    [minY, maxY],
    [minZ, maxZ]
  );
  return getRandomRoadSidePoint(randomAreaCoords);
}

export function getFullStreetName(
  coords: number[],
  showCrossingRoad?: boolean
): string {
  const [x, y, z] = coords;
  const [streetName, crossingRoad] = GetStreetNameAtCoord(x, y, z);
  const streetNameStr = GetStreetNameFromHashKey(streetName);
  const crossingRoadStr = GetStreetNameFromHashKey(crossingRoad);
  if (showCrossingRoad && crossingRoad !== 0) {
    return `${streetNameStr} - ${crossingRoadStr}`;
  }
  return streetNameStr;
}

export function generateCashPayoutByDistance(
  coords: number[],
  rate: number
): number {
  const dist = getDistanceToPoint(coords);
  return Math.round(dist * rate);
}

export function showInteractMessage(label: string): void {
  showAlert(`Press ~INPUT_CONTEXT~ to ${label.toLowerCase()}`, false, -1);
}

export function wasInteractJustReleased(): boolean {
  return IsControlJustReleased(0, 38);
}

export function teleportMarker(
  type: number,
  position: number[],
  color: number[],
  targetPosition: number[],
  targetHeading: number,
  distance: number
): void {
  drawMarker(
    type,
    position,
    [0, 0, 0],
    [0, 0, 0],
    [1, 1, 1],
    color,
    false,
    false,
    false
  );
  if (isWithinDistanceOfPoint(position, distance)) {
    teleportPlayer(targetPosition, targetHeading, false, 500);
  }
}

export function drawText2d(
  x: number,
  y: number,
  scale: number,
  text: string,
  r: number,
  g: number,
  b: number,
  a: number
): void {
  SetTextFont(0);
  SetTextProportional(false);
  SetTextScale(scale, scale);
  SetTextColour(r, g, b, a);
  SetTextDropShadow();
  SetTextEdge(1, 0, 0, 0, 255);
  SetTextOutline();
  SetTextEntry("STRING");
  AddTextComponentString(text);
  DrawText(x, y);
}

export function drawText3d(
  x: number,
  y: number,
  z: number,
  text: string,
  textColor: number[] = [255, 255, 255, 215],
  fillColor: number[] = [41, 11, 41, 68]
): void {
  const [onScreen, sx, sy] = World3dToScreen2d(x, y, z);
  const [px, py, pz] = GetGameplayCamCoords();
  const [tr, tg, tb, ta] = textColor;
  const [fr, fg, fb, fa] = fillColor;

  SetTextScale(0.35, 0.35);
  SetTextFont(4);
  SetTextProportional(true);
  SetTextColour(tr, tg, tb, ta);
  SetTextEntry("STRING");
  SetTextCentre(true);
  AddTextComponentString(text);
  DrawText(sx, sy);
  const factor = text.length / 370;
  DrawRect(sx, sy + 0.0125, 0.015 + factor, 0.03, fr, fg, fb, fa);
}

export async function startProgressBar(
  label: string,
  duration: number,
  bgColor: number[] = [0, 0, 0, 150],
  fillColor: number[] = [255, 0, 0, 255],
  textColor: number[] = [255, 255, 255, 255]
): Promise<boolean> {
  return new Promise((resolve) => {
    const progressUpdateInterval = 10;
    const totalIterations = duration / progressUpdateInterval;
    let currentIteration = 0;
    let progress = 0;
    let rectProgress = 0;

    const [x, y] = [0.5, 0.9];
    const [w, h] = [0.2, 0.02];
    const [bg_r, bg_g, bg_b, bg_a] = bgColor;
    const [fill_r, fill_g, fill_b, fill_a] = fillColor;
    const [text_r, text_g, text_b, text_a] = textColor;

    const progressTick = setTick(() => {
      const progressWidth = w * rectProgress;
      DrawRect(x, y, w, h, bg_r, bg_g, bg_b, bg_a);
      DrawRect(x, y, progressWidth, h, fill_r, fill_g, fill_b, fill_a);
      drawText2d(
        x - w / 2,
        y - h / 2,
        0.25,
        label,
        text_r,
        text_g,
        text_b,
        text_a
      );

      // const width = w; // / 2;
      // console.log(width);
      // DrawRect(x, y, w, h, 0, 0, 0, 255);
      // DrawRect(x - 0.05, y, width, h, 255, 0, 0, 150);
    });

    const updateProgressBar = () => {
      currentIteration++;
      progress = Math.round((currentIteration / totalIterations) * 100);
      rectProgress = progress / 100;

      if (currentIteration >= totalIterations) {
        clearTick(progressTick);
        clearInterval(intervalId);
        resolve(true);
      }
    };

    const intervalId = setInterval(updateProgressBar, progressUpdateInterval);
  });
}

export function setBlipLabel(blip: number, label: string): void {
  const textEntry = `BLIP_TEXT_ENTRY_${blip}`;
  AddTextEntry(textEntry, label);
  BeginTextCommandSetBlipName(textEntry);
  AddTextComponentSubstringBlipName(blip);
  EndTextCommandSetBlipName(blip);
}

export function randomEnumKey(enumeration: any): string {
  const keys = Object.keys(enumeration).filter(
    (k) => !(Math.abs(Number.parseInt(k)) + 1)
  );
  const enumKey = keys[Math.floor(Math.random() * keys.length)];
  return enumKey;
}

export function randomEnumValue(enumeration: any): any {
  return enumeration[randomEnumKey(enumeration)];
}

export function breakOffVehicleWheel(
  vehicle: number,
  wheelIndex: number,
  leaveDebrisTrail: boolean,
  deleteWheel: boolean,
  unknownFlag: boolean,
  putOnFire: boolean
): void {
  Citizen.invokeNative(
    "0xA274CADB",
    vehicle,
    wheelIndex,
    leaveDebrisTrail,
    deleteWheel,
    unknownFlag,
    putOnFire
  );
}

export function shuffleArray<T>(array: T[]): T[] {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

export function getRandomElementsWithoutDuplicates<T>(
  sourceArray: T[],
  count: number
): T[] {
  if (count > sourceArray.length) {
    throw new Error(
      "Cannot request more elements than available in the source array."
    );
  }

  const shuffledArray = shuffleArray(sourceArray);
  return shuffledArray.slice(0, count);
}

export function getRandomItemsFromArray<T>(array: T[]): T[] {
  const randomCount = Math.floor(Math.random() * array.length) + 1;
  const randomItems = array.slice(0, randomCount);
  return randomItems;
}

export async function playAnimation(
  ped: number,
  dict: string,
  name: string,
  blendInSpeed: number = 8,
  blendOutSpeed: number = 8,
  duration: number = -1,
  flag: number = 0,
  playbackRate: number = 1,
  lockX: boolean = false,
  lockY: boolean = false,
  lockZ: boolean = false
): Promise<void> {
  RequestAnimDict(dict);
  while (!HasAnimDictLoaded(dict)) {
    await Delay(0);
  }
  TaskPlayAnim(
    ped,
    dict,
    name,
    blendInSpeed,
    blendOutSpeed,
    duration,
    flag,
    playbackRate,
    lockX,
    lockY,
    lockZ
  );
}

export function applyVehicleMod(
  vehicle: number,
  modType: number,
  mod: number | boolean
): void {
  SetVehicleModKit(vehicle, 0);
  if (typeof mod === "number") {
    SetVehicleMod(vehicle, modType, mod, false);
  } else {
    ToggleVehicleMod(vehicle, modType, mod);
  }
}

export function oneOrMoreVehicleDoorsDamaged(vehicle: number): boolean {
  const maxDoors = GetNumberOfVehicleDoors(vehicle);
  for (let index = 0; index < maxDoors; index++) {
    if (IsVehicleDoorDamaged(vehicle, index)) {
      return true;
    }
  }
  return false;
}

export function isNearWheel(
  vehicle: number,
  boneName: string
): [boolean, number[]] {
  const coords = GetWorldPositionOfEntityBone(
    vehicle,
    GetEntityBoneIndexByName(vehicle, boneName)
  );
  return [isWithinDistanceOfPoint(coords, 1), coords];
}

export function isNearFrontLeftWheel(
  vehicle: number
): [boolean, number[], number] {
  const [nearWheel, wheel] = isNearWheel(vehicle, "wheel_lf");
  return [nearWheel, wheel, 0];
}

export function isNearFrontRightWheel(
  vehicle: number
): [boolean, number[], number] {
  const [nearWheel, wheel] = isNearWheel(vehicle, "wheel_rf");
  return [nearWheel, wheel, 1];
}

export function isNearBackLeftWheel(
  vehicle: number
): [boolean, number[], number] {
  const [nearWheel, wheel] = isNearWheel(vehicle, "wheel_lr");
  return [nearWheel, wheel, 2];
}

export function isNearBackRightWheel(
  vehicle: number
): [boolean, number[], number] {
  const [nearWheel, wheel] = isNearWheel(vehicle, "wheel_rr");
  return [nearWheel, wheel, 3];
}

export function getNearestWheel(vehicle: number): [boolean, number[], number] {
  const [nearBackLeftWheel, backLeftWheelCoords, backLeftWheelIndex] =
    isNearBackLeftWheel(vehicle);
  const [nearBackRightWheel, backRightWheelCoords, backRightWheelIndex] =
    isNearBackRightWheel(vehicle);
  const [nearFrontLeftWheel, frontLeftWheelCoords, frontLeftWheelIndex] =
    isNearFrontLeftWheel(vehicle);
  const [nearFrontRightWheel, frontRightWheelCoords, frontRightWheelIndex] =
    isNearFrontRightWheel(vehicle);

  if (nearBackLeftWheel) {
    return [true, backLeftWheelCoords, backLeftWheelIndex];
  } else if (nearBackRightWheel) {
    return [true, backRightWheelCoords, backRightWheelIndex];
  } else if (nearFrontLeftWheel) {
    return [true, frontLeftWheelCoords, frontLeftWheelIndex];
  } else if (nearFrontRightWheel) {
    return [true, frontRightWheelCoords, frontRightWheelIndex];
  } else {
    return [false, [0, 0, 0], -1];
  }
}

export function setRandomVehicleMod(vehicle: number, type: number): void {
  const maxMods = GetNumVehicleMods(vehicle, type);
  SetVehicleModKit(vehicle, 0);
  SetVehicleMod(vehicle, type, getRandomNumber(1, maxMods - 1), false);
}

export function getHoodOffset(entity: number): number[] {
  const [minDim, maxDim] = GetModelDimensions(GetEntityModel(entity));
  return GetOffsetFromEntityInWorldCoords(entity, 0, maxDim[1] + 0.5, 0);
}

export function isNearHoodOfVehicle(
  entity: number,
  distance: number = 1
): boolean {
  const offset = getHoodOffset(entity);
  const playerCoords = GetEntityCoords(PlayerPedId(), false);
  const dist = GetDistanceBetweenCoords(
    offset[0],
    offset[1],
    offset[2],
    playerCoords[0],
    playerCoords[1],
    playerCoords[2],
    false
  );
  return dist <= distance;
}

export function getTrunkOffset(entity: number): number[] {
  const [minDim, maxDim] = GetModelDimensions(GetEntityModel(entity));
  return GetOffsetFromEntityInWorldCoords(entity, 0, minDim[1] - 0.5, 0);
}

export function isNearTrunkOfVehicle(
  entity: number,
  distance: number = 1
): boolean {
  const offset = getTrunkOffset(entity);
  const playerCoords = GetEntityCoords(PlayerPedId(), false);
  const dist = GetDistanceBetweenCoords(
    offset[0],
    offset[1],
    offset[2],
    playerCoords[0],
    playerCoords[1],
    playerCoords[2],
    false
  );
  return dist <= distance;
}

export function isVehicleDoorOpen(entity: number, doorIndex: number): boolean {
  return GetVehicleDoorAngleRatio(entity, doorIndex) >= 0.1;
}

export function setVehicleDoorsOpen(
  vehicle: number,
  doorIndexes: number[],
  loose: boolean,
  openInstantly: boolean
): void {
  doorIndexes.forEach((doorIndex) =>
    SetVehicleDoorOpen(vehicle, doorIndex, loose, openInstantly)
  );
}

export function setVehicleDoorsShut(
  vehicle: number,
  doorIndexes: number[],
  closeInstantly: boolean
): void {
  doorIndexes.forEach((doorIndex) =>
    SetVehicleDoorShut(vehicle, doorIndex, closeInstantly)
  );
}

// export function addCoords(...args: number[]): number[] {
//   let x = 0;
//   let y = 0;
//   let z = 0;

//   for (const arg in args) {
//     x += arg[0];
//     y += arg[1];
//     z += arg[2];
//   }

//   return [x, y, z];
// }

export function getVehicleFirstEmptySeat(vehicle: number): number | undefined {
  const model = GetEntityModel(vehicle);
  const maxSeats = GetVehicleModelNumberOfSeats(model);
  for (let index = -1; index < maxSeats; index++) {
    if (IsVehicleSeatFree(vehicle, index)) {
      return index;
    }
  }
  return undefined;
}

export function hexToRgb(hex: string): number[] | null {
  const hexRegex = /^#(?:[0-9a-fA-F]{3}){1,2}$/;
  if (!hexRegex.test(hex)) {
    return null;
  }

  hex = hex.slice(1);

  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((char) => char.repeat(2))
      .join("");
  }

  const bigint = parseInt(hex, 16);

  const red = (bigint >> 16) & 255;
  const green = (bigint >> 8) & 255;
  const blue = bigint & 255;

  return [red, green, blue];
}
