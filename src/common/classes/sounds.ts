class Sound {
  name: string;
  ref: string;

  constructor(name: string, ref: string) {
    this.name = name;
    this.ref = ref;
  }

  public play(
    soundId: number = -1,
    p3: boolean = true,
    p4: number = 0,
    p5: boolean = true
  ): void {
    PlaySound(soundId, this.name, this.ref, p3, p4, p5);
  }

  public playFrontend(soundId: number = -1, p3: boolean = true): void {
    PlaySoundFrontend(soundId, this.name, this.ref, p3);
  }

  public playFromEntity(
    entity: number,
    isNetwork: boolean,
    soundId: number = -1,
    p5: number = 0
  ): void {
    PlaySoundFromEntity(soundId, this.name, entity, this.ref, isNetwork, p5);
  }

  public playFromCoord(
    x: number,
    y: number,
    z: number,
    range: number,
    isNetwork: boolean,
    soundId: number = -1,
    p8: boolean = false
  ): void {
    PlaySoundFromCoord(
      soundId,
      this.name,
      x,
      y,
      z,
      this.ref,
      isNetwork,
      range,
      p8
    );
  }
}

interface SoundCategory {
  [sound: string]: Sound;
}

interface SoundData {
  [category: string]: SoundCategory;
}

export const Sounds: SoundData = {
  DLC_EXEC_ARC_MAC_SOUNDS: {
    Crash: new Sound("Crash", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Crash_NPC: new Sound("Crash_NPC", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Trail_1: new Sound("Trail_1", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Trail_2: new Sound("Trail_2", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Trail_3: new Sound("Trail_3", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Trail_4: new Sound("Trail_4", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Turn: new Sound("Turn", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Turn_NPC: new Sound("Turn_NPC", "DLC_EXEC_ARC_MAC_SOUNDS"),
    THREE_TWO_ONE: new Sound("321", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Degenatron_Logo: new Sound("Degenatron_Logo", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Degenatron_Star: new Sound("Degenatron_Star", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Go: new Sound("Go", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Music_Game_Over: new Sound("Music_Game_Over", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Music_Win: new Sound("Music_Win", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Ready: new Sound("Ready", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Background: new Sound("Background", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Cancel: new Sound("Cancel", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Insert_Coin: new Sound("Insert_Coin", "DLC_EXEC_ARC_MAC_SOUNDS"),
    Game_Over_Blink: new Sound("Game_Over_Blink", "DLC_EXEC_ARC_MAC_SOUNDS"),
  },
  DLC_AW_Machine_Gun_Ammo_Counter_Sounds: {
    Recharging_Loop: new Sound(
      "Recharging_Loop",
      "DLC_AW_Machine_Gun_Ammo_Counter_Sounds"
    ),
    Empty_Fire_Fail: new Sound(
      "Empty_Fire_Fail",
      "DLC_AW_Machine_Gun_Ammo_Counter_Sounds"
    ),
    Out_Of_Ammo: new Sound(
      "Out_Of_Ammo",
      "DLC_AW_Machine_Gun_Ammo_Counter_Sounds"
    ),
    Recharged: new Sound("Recharged", "DLC_AW_Machine_Gun_Ammo_Counter_Sounds"),
  },
  HUD_MINI_GAME_SOUNDSET: {
    CHECKPOINT_MISSED: new Sound("CHECKPOINT_MISSED", "HUD_MINI_GAME_SOUNDSET"),
    CHECKPOINT_NORMAL: new Sound("CHECKPOINT_NORMAL", "HUD_MINI_GAME_SOUNDSET"),
    TEN_SEC_WARNING: new Sound("10_SEC_WARNING", "HUD_MINI_GAME_SOUNDSET"),
    THREE_TWO_ONE: new Sound("3_2_1", "HUD_MINI_GAME_SOUNDSET"),
    THREE_TWO_ONE_NON_RACE: new Sound(
      "3_2_1_NON_RACE",
      "HUD_MINI_GAME_SOUNDSET"
    ),
    FIVE_SEC_WARNING: new Sound("5_SEC_WARNING", "HUD_MINI_GAME_SOUNDSET"),
    CAM_PAN_DARTS: new Sound("CAM_PAN_DARTS", "HUD_MINI_GAME_SOUNDSET"),
    CHECKPOINT_AHEAD: new Sound("CHECKPOINT_AHEAD", "HUD_MINI_GAME_SOUNDSET"),
    CHECKPOINT_BEHIND: new Sound("CHECKPOINT_BEHIND", "HUD_MINI_GAME_SOUNDSET"),
    CHECKPOINT_PERFECT: new Sound(
      "CHECKPOINT_PERFECT",
      "HUD_MINI_GAME_SOUNDSET"
    ),
    CHECKPOINT_UNDER_THE_BRIDGE: new Sound(
      "CHECKPOINT_UNDER_THE_BRIDGE",
      "HUD_MINI_GAME_SOUNDSET"
    ),
    FIRST_PLACE: new Sound("FIRST_PLACE", "HUD_MINI_GAME_SOUNDSET"),
    GO: new Sound("GO", "HUD_MINI_GAME_SOUNDSET"),
    GO_NON_RACE: new Sound("GO_NON_RACE", "HUD_MINI_GAME_SOUNDSET"),
    LOOSE_MATCH: new Sound("LOOSE_MATCH", "HUD_MINI_GAME_SOUNDSET"),
    MEDAL_UP: new Sound("MEDAL_UP", "HUD_MINI_GAME_SOUNDSET"),
    TIMER_STOP: new Sound("TIMER_STOP", "HUD_MINI_GAME_SOUNDSET"),
  },
  dlc_xm_facility_entry_exit_sounds: {
    hangar_doors_loop: new Sound(
      "hangar_doors_loop",
      "dlc_xm_facility_entry_exit_sounds"
    ),
    hangar_doors_close: new Sound(
      "hangar_doors_close",
      "dlc_xm_facility_entry_exit_sounds"
    ),
    hangar_doors_limit: new Sound(
      "hangar_doors_limit",
      "dlc_xm_facility_entry_exit_sounds"
    ),
    hangar_doors_open: new Sound(
      "hangar_doors_open",
      "dlc_xm_facility_entry_exit_sounds"
    ),
    elevator_descend_loop: new Sound(
      "elevator_descend_loop",
      "dlc_xm_facility_entry_exit_sounds"
    ),
    elevator_ascend_loop: new Sound(
      "elevator_ascend_loop",
      "dlc_xm_facility_entry_exit_sounds"
    ),
  },
  GTAO_FM_Events_Soundset: {
    Timer_10s: new Sound("Timer_10s", "GTAO_FM_Events_Soundset"),
    FIVE_Seconds_To_Event_Start_Countdown: new Sound(
      "5s_To_Event_Start_Countdown",
      "GTAO_FM_Events_Soundset"
    ),
    Checkpoint_Cash_Hit: new Sound(
      "Checkpoint_Cash_Hit",
      "GTAO_FM_Events_Soundset"
    ),
    Checkpoint_Hit: new Sound("Checkpoint_Hit", "GTAO_FM_Events_Soundset"),
    Criminal_Damage_High_Value: new Sound(
      "Criminal_Damage_High_Value",
      "GTAO_FM_Events_Soundset"
    ),
    Criminal_Damage_Kill_Player: new Sound(
      "Criminal_Damage_Kill_Player",
      "GTAO_FM_Events_Soundset"
    ),
    Criminal_Damage_Low_Value: new Sound(
      "Criminal_Damage_Low_Value",
      "GTAO_FM_Events_Soundset"
    ),
    Enter_1st: new Sound("Enter_1st", "GTAO_FM_Events_Soundset"),
    Event_Message_Purple: new Sound(
      "Event_Message_Purple",
      "GTAO_FM_Events_Soundset"
    ),
    Event_Start_Text: new Sound("Event_Start_Text", "GTAO_FM_Events_Soundset"),
    Kill_List_Counter: new Sound(
      "Kill_List_Counter",
      "GTAO_FM_Events_Soundset"
    ),
    Lose_1st: new Sound("Lose_1st", "GTAO_FM_Events_Soundset"),
    Near_Miss_Counter_Reset: new Sound(
      "Near_Miss_Counter_Reset",
      "GTAO_FM_Events_Soundset"
    ),
    Object_Collect_Player: new Sound(
      "Object_Collect_Player",
      "GTAO_FM_Events_Soundset"
    ),
    Object_Collect_Remote: new Sound(
      "Object_Collect_Remote",
      "GTAO_FM_Events_Soundset"
    ),
    Object_Dropped_Remote: new Sound(
      "Object_Dropped_Remote",
      "GTAO_FM_Events_Soundset"
    ),
    OOB_Cancel: new Sound("OOB_Cancel", "GTAO_FM_Events_Soundset"),
    OOB_Start: new Sound("OOB_Start", "GTAO_FM_Events_Soundset"),
    Parcel_Vehicle_Lost: new Sound(
      "Parcel_Vehicle_Lost",
      "GTAO_FM_Events_Soundset"
    ),
    Shard_Disappear: new Sound("Shard_Disappear", "GTAO_FM_Events_Soundset"),
    OOB_Timer_Dynamic: new Sound(
      "OOB_Timer_Dynamic",
      "GTAO_FM_Events_Soundset"
    ),
    Near_Miss_Counter: new Sound(
      "Near_Miss_Counter",
      "GTAO_FM_Events_Soundset"
    ),
    Return_To_Vehicle_Timer: new Sound(
      "Return_To_Vehicle_Timer",
      "GTAO_FM_Events_Soundset"
    ),
  },
  MP_MISSION_COUNTDOWN_SOUNDSET: {
    TEN_Seconds: new Sound("10s", "MP_MISSION_COUNTDOWN_SOUNDSET"),
    FIVE_Seconds: new Sound("5s", "MP_MISSION_COUNTDOWN_SOUNDSET"),
    FIVE_Seconds2: new Sound("5S", "MP_MISSION_COUNTDOWN_SOUNDSET"),
    Oneshot_Final: new Sound("Oneshot_Final", "MP_MISSION_COUNTDOWN_SOUNDSET"),
    TEN_Seconds2: new Sound("10S", "MP_MISSION_COUNTDOWN_SOUNDSET"),
    Out_of_Bounds: new Sound("Out_of_Bounds", "MP_MISSION_COUNTDOWN_SOUNDSET"),
    Get_Back_In_Vehicle: new Sound(
      "Get_Back_In_Vehicle",
      "MP_MISSION_COUNTDOWN_SOUNDSET"
    ),
    Out_of_Bounds_Explode: new Sound(
      "Out_of_Bounds_Explode",
      "MP_MISSION_COUNTDOWN_SOUNDSET"
    ),
  },
  PLAYER_SWITCH_CUSTOM_SOUNDSET: {
    First_Person_Transition: new Sound(
      "1st_Person_Transition",
      "PLAYER_SWITCH_CUSTOM_SOUNDSET"
    ),
    Hit_In: new Sound("Hit_In", "PLAYER_SWITCH_CUSTOM_SOUNDSET"),
    Hit_out: new Sound("Hit_out", "PLAYER_SWITCH_CUSTOM_SOUNDSET"),
    Hit_Out: new Sound("Hit_Out", "PLAYER_SWITCH_CUSTOM_SOUNDSET"),
    Short_Transition_In: new Sound(
      "Short_Transition_In",
      "PLAYER_SWITCH_CUSTOM_SOUNDSET"
    ),
    Short_Transition_Out: new Sound(
      "Short_Transition_Out",
      "PLAYER_SWITCH_CUSTOM_SOUNDSET"
    ),
    HIT_OUT: new Sound("HIT_OUT", "PLAYER_SWITCH_CUSTOM_SOUNDSET"),
    Camera_Move_Loop: new Sound(
      "Camera_Move_Loop",
      "PLAYER_SWITCH_CUSTOM_SOUNDSET"
    ),
  },
  DLC_Stunt_Race_Frontend_Sounds: {
    First_Place_Gain: new Sound(
      "1st_Place_Gain",
      "DLC_Stunt_Race_Frontend_Sounds"
    ),
    First_Place_Lose: new Sound(
      "1st_Place_Lose",
      "DLC_Stunt_Race_Frontend_Sounds"
    ),
    Checkpoint: new Sound("Checkpoint", "DLC_Stunt_Race_Frontend_Sounds"),
    Checkpoint_Finish: new Sound(
      "Checkpoint_Finish",
      "DLC_Stunt_Race_Frontend_Sounds"
    ),
    Checkpoint_Lap: new Sound(
      "Checkpoint_Lap",
      "DLC_Stunt_Race_Frontend_Sounds"
    ),
    Creator_Snap: new Sound("Creator_Snap", "DLC_Stunt_Race_Frontend_Sounds"),
    Place_Gain: new Sound("Place_Gain", "DLC_Stunt_Race_Frontend_Sounds"),
    Place_Lose: new Sound("Place_Lose", "DLC_Stunt_Race_Frontend_Sounds"),
    Slipstream: new Sound("Slipstream", "DLC_Stunt_Race_Frontend_Sounds"),
  },
  DLC_HEISTS_GENERAL_FRONTEND_SOUNDS: {
    Five_Second_Timer: new Sound(
      "5_Second_Timer",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    LOCAL_PLYR_CASH_COUNTER_COMPLETE: new Sound(
      "LOCAL_PLYR_CASH_COUNTER_COMPLETE",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    LOCAL_PLYR_CASH_COUNTER_INCREASE: new Sound(
      "LOCAL_PLYR_CASH_COUNTER_INCREASE",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    Mission_Pass_Notify: new Sound(
      "Mission_Pass_Notify",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    Nav_Arrow_Ahead: new Sound(
      "Nav_Arrow_Ahead",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    Nav_Arrow_Behind: new Sound(
      "Nav_Arrow_Behind",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    Nav_Arrow_Left: new Sound(
      "Nav_Arrow_Left",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    Nav_Arrow_Right: new Sound(
      "Nav_Arrow_Right",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    On_Call_Player_Join: new Sound(
      "On_Call_Player_Join",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    REMOTE_PLYR_CASH_COUNTER_COMPLETE: new Sound(
      "REMOTE_PLYR_CASH_COUNTER_COMPLETE",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
    REMOTE_PLYR_CASH_COUNTER_INCREASE: new Sound(
      "REMOTE_PLYR_CASH_COUNTER_INCREASE",
      "DLC_HEISTS_GENERAL_FRONTEND_SOUNDS"
    ),
  },
  RESPAWN_ONLINE_SOUNDSET: {
    Accept_Ghosting_Mode: new Sound(
      "Accept_Ghosting_Mode",
      "RESPAWN_ONLINE_SOUNDSET"
    ),
    Faster_Bar_Full: new Sound("Faster_Bar_Full", "RESPAWN_ONLINE_SOUNDSET"),
    Faster_Click: new Sound("Faster_Click", "RESPAWN_ONLINE_SOUNDSET"),
    Hit: new Sound("Hit", "RESPAWN_ONLINE_SOUNDSET"),
  },
  DLC_AW_Trap_Controller_Sounds: {
    Activate_Trap: new Sound("Activate_Trap", "DLC_AW_Trap_Controller_Sounds"),
    Focus: new Sound("Focus", "DLC_AW_Trap_Controller_Sounds"),
    Go_To_Target: new Sound("Go_To_Target", "DLC_AW_Trap_Controller_Sounds"),
    Next_Trap: new Sound("Next_Trap", "DLC_AW_Trap_Controller_Sounds"),
    Previous_Trap: new Sound("Previous_Trap", "DLC_AW_Trap_Controller_Sounds"),
  },
  DLC_BTL_RB_Remix_Sounds: {
    Airhorn: new Sound("Airhorn", "DLC_BTL_RB_Remix_Sounds"),
    End_Zone_Flash: new Sound("End_Zone_Flash", "DLC_BTL_RB_Remix_Sounds"),
  },
  DLC_TG_Running_Back_Sounds: {
    Airhorn: new Sound("Airhorn", "DLC_TG_Running_Back_Sounds"),
    Cheers: new Sound("Cheers", "DLC_TG_Running_Back_Sounds"),
    Whistle: new Sound("Whistle", "DLC_TG_Running_Back_Sounds"),
  },
  DLC_APT_Apartment_SoundSet: {
    Apt_Style_Purchase: new Sound(
      "Apt_Style_Purchase",
      "DLC_APT_Apartment_SoundSet"
    ),
  },
  DLC_GR_Steal_Miniguns_Sounds: {
    Armour_Off: new Sound("Armour_Off", "DLC_GR_Steal_Miniguns_Sounds"),
    Armour_On: new Sound("Armour_On", "DLC_GR_Steal_Miniguns_Sounds"),
  },
  ASSASSINATION_MULTI: {
    ASSASSINATIONS_HOTEL_TIMER_COUNTDOWN: new Sound(
      "ASSASSINATIONS_HOTEL_TIMER_COUNTDOWN",
      "ASSASSINATION_MULTI"
    ),
  },
  HUD_FRONTEND_DEFAULT_SOUNDSET: {
    ATM_WINDOW: new Sound("ATM_WINDOW", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    BACK: new Sound("BACK", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    Back: new Sound("Back", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    CANCEL: new Sound("CANCEL", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    CONTINUE: new Sound("CONTINUE", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    continue: new Sound("continue", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    DPAD_WEAPON_SCROLL: new Sound(
      "DPAD_WEAPON_SCROLL",
      "HUD_FRONTEND_DEFAULT_SOUNDSET"
    ),
    ERROR: new Sound("ERROR", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    EXIT: new Sound("EXIT", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    HORDE_COOL_DOWN_TIMER: new Sound(
      "HORDE_COOL_DOWN_TIMER",
      "HUD_FRONTEND_DEFAULT_SOUNDSET"
    ),
    INFO: new Sound("INFO", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    LEADER_BOARD: new Sound("LEADER_BOARD", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    MP_5_SECOND_TIMER: new Sound(
      "MP_5_SECOND_TIMER",
      "HUD_FRONTEND_DEFAULT_SOUNDSET"
    ),
    MP_AWARD: new Sound("MP_AWARD", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    MP_IDLE_KICK: new Sound("MP_IDLE_KICK", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    MP_IDLE_TIMER: new Sound("MP_IDLE_TIMER", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    MP_RANK_UP: new Sound("MP_RANK_UP", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    MP_WAVE_COMPLETE: new Sound(
      "MP_WAVE_COMPLETE",
      "HUD_FRONTEND_DEFAULT_SOUNDSET"
    ),
    NAV_LEFT_RIGHT: new Sound(
      "NAV_LEFT_RIGHT",
      "HUD_FRONTEND_DEFAULT_SOUNDSET"
    ),
    NAV_UP_DOWN: new Sound("NAV_UP_DOWN", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    NO: new Sound("NO", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    OK: new Sound("OK", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    PICK_UP: new Sound("PICK_UP", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    SELECT: new Sound("SELECT", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    TOGGLE_ON: new Sound("TOGGLE_ON", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    WAYPOINT_SET: new Sound("WAYPOINT_SET", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
    YES: new Sound("YES", "HUD_FRONTEND_DEFAULT_SOUNDSET"),
  },
  DLC_EXEC_Warehouse_Upgrade_Bench_Sounds: {
    BACK: new Sound("BACK", "DLC_EXEC_Warehouse_Upgrade_Bench_Sounds"),
    CANCEL: new Sound("CANCEL", "DLC_EXEC_Warehouse_Upgrade_Bench_Sounds"),
    ERROR: new Sound("ERROR", "DLC_EXEC_Warehouse_Upgrade_Bench_Sounds"),
    NAV_UP_DOWN: new Sound(
      "NAV_UP_DOWN",
      "DLC_EXEC_Warehouse_Upgrade_Bench_Sounds"
    ),
    Purchase_Upgrade: new Sound(
      "Purchase_Upgrade",
      "DLC_EXEC_Warehouse_Upgrade_Bench_Sounds"
    ),
    SELECT: new Sound("SELECT", "DLC_EXEC_Warehouse_Upgrade_Bench_Sounds"),
  },
  HUD_AMMO_SHOP_SOUNDSET: {
    BACK: new Sound("BACK", "HUD_AMMO_SHOP_SOUNDSET"),
    ERROR: new Sound("ERROR", "HUD_AMMO_SHOP_SOUNDSET"),
    NAV: new Sound("NAV", "HUD_AMMO_SHOP_SOUNDSET"),
    WEAPON_PURCHASE: new Sound("WEAPON_PURCHASE", "HUD_AMMO_SHOP_SOUNDSET"),
    WEAPON_SELECT_ARMOR: new Sound(
      "WEAPON_SELECT_ARMOR",
      "HUD_AMMO_SHOP_SOUNDSET"
    ),
  },
  HUD_FREEMODE_SOUNDSET: {
    BACK: new Sound("BACK", "HUD_FREEMODE_SOUNDSET"),
    CANCEL: new Sound("CANCEL", "HUD_FREEMODE_SOUNDSET"),
    ERROR: new Sound("ERROR", "HUD_FREEMODE_SOUNDSET"),
    NAV_LEFT_RIGHT: new Sound("NAV_LEFT_RIGHT", "HUD_FREEMODE_SOUNDSET"),
    NAV_UP_DOWN: new Sound("NAV_UP_DOWN", "HUD_FREEMODE_SOUNDSET"),
    SELECT: new Sound("SELECT", "HUD_FREEMODE_SOUNDSET"),
  },
  HUD_FRONTEND_MP_SOUNDSET: {
    BACK: new Sound("BACK", "HUD_FRONTEND_MP_SOUNDSET"),
    SELECT: new Sound("SELECT", "HUD_FRONTEND_MP_SOUNDSET"),
  },
  JA16_Super_Mod_Garage_Sounds: {
    Banshee2_Upgrade: new Sound(
      "Banshee2_Upgrade",
      "JA16_Super_Mod_Garage_Sounds"
    ),
    SultanRS_Upgrade: new Sound(
      "SultanRS_Upgrade",
      "JA16_Super_Mod_Garage_Sounds"
    ),
  },
  dlc_h4_Prep_FC_Sounds: {
    Barge_Door: new Sound("Barge_Door", "dlc_h4_Prep_FC_Sounds"),
    Barge_Door_Glass: new Sound("Barge_Door_Glass", "dlc_h4_Prep_FC_Sounds"),
    Barge_Door_Metal: new Sound("Barge_Door_Metal", "dlc_h4_Prep_FC_Sounds"),
    Barge_Door_Metal_Bars: new Sound(
      "Barge_Door_Metal_Bars",
      "dlc_h4_Prep_FC_Sounds"
    ),
  },
  HUD_AWARDS: {
    BASE_JUMP_PASSED: new Sound("BASE_JUMP_PASSED", "HUD_AWARDS"),
    CHALLENGE_UNLOCKED: new Sound("CHALLENGE_UNLOCKED", "HUD_AWARDS"),
    GOLF_NEW_RECORD: new Sound("GOLF_NEW_RECORD", "HUD_AWARDS"),
    LOSER: new Sound("LOSER", "HUD_AWARDS"),
    OTHER_TEXT: new Sound("OTHER_TEXT", "HUD_AWARDS"),
    PROPERTY_PURCHASE: new Sound("PROPERTY_PURCHASE", "HUD_AWARDS"),
    RACE_PLACED: new Sound("RACE_PLACED", "HUD_AWARDS"),
    RANK_UP: new Sound("RANK_UP", "HUD_AWARDS"),
    TENNIS_POINT_WON: new Sound("TENNIS_POINT_WON", "HUD_AWARDS"),
    UNDER_THE_BRIDGE: new Sound("UNDER_THE_BRIDGE", "HUD_AWARDS"),
    WIN: new Sound("WIN", "HUD_AWARDS"),
    COLLECTED: new Sound("COLLECTED", "HUD_AWARDS"),
    PEYOTE_COMPLETED: new Sound("PEYOTE_COMPLETED", "HUD_AWARDS"),
    SIGN_DESTROYED: new Sound("SIGN_DESTROYED", "HUD_AWARDS"),
  },
  GTAO_Dancing_Sounds: {
    Beat_Pulse_Default: new Sound("Beat_Pulse_Default", "GTAO_Dancing_Sounds"),
  },
  DLC_BTL_TP_Remix_Juggernaut_Player_Sounds: {
    Become_Attacker: new Sound(
      "Become_Attacker",
      "DLC_BTL_TP_Remix_Juggernaut_Player_Sounds"
    ),
    Become_JN: new Sound(
      "Become_JN",
      "DLC_BTL_TP_Remix_Juggernaut_Player_Sounds"
    ),
  },
  DLC_IE_JN_Player_Sounds: {
    Become_Attacker: new Sound("Become_Attacker", "DLC_IE_JN_Player_Sounds"),
    Become_JN: new Sound("Become_JN", "DLC_IE_JN_Player_Sounds"),
  },
  dlc_xm_sls_Sounds: {
    Become_Hunted: new Sound("Become_Hunted", "dlc_xm_sls_Sounds"),
    Become_Slasher: new Sound("Become_Slasher", "dlc_xm_sls_Sounds"),
  },
  dlc_xm_hata_Sounds: {
    Become_Target: new Sound("Become_Target", "dlc_xm_hata_Sounds"),
    Enemy_Killed_1p: new Sound("Enemy_Killed_1p", "dlc_xm_hata_Sounds"),
    Enemy_Killed_3p: new Sound("Enemy_Killed_3p", "dlc_xm_hata_Sounds"),
    No_Longer_Target: new Sound("No_Longer_Target", "dlc_xm_hata_Sounds"),
    Team_Killed_1p: new Sound("Team_Killed_1p", "dlc_xm_hata_Sounds"),
    Team_Killed_3p: new Sound("Team_Killed_3p", "dlc_xm_hata_Sounds"),
  },
  WastedSounds: {
    Bed: new Sound("Bed", "WastedSounds"),
    MP_Flash: new Sound("MP_Flash", "WastedSounds"),
    MP_Impact: new Sound("MP_Impact", "WastedSounds"),
    ScreenFlash: new Sound("ScreenFlash", "WastedSounds"),
    TextHit: new Sound("TextHit", "WastedSounds"),
  },
  DLC_HEIST_HACKING_SNAKE_SOUNDS: {
    Beep_Green: new Sound("Beep_Green", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Beep_Red: new Sound("Beep_Red", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Click: new Sound("Click", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Crash: new Sound("Crash", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Failure: new Sound("Failure", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Goal: new Sound("Goal", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Lester_Laugh_Phone: new Sound(
      "Lester_Laugh_Phone",
      "DLC_HEIST_HACKING_SNAKE_SOUNDS"
    ),
    Power_Down: new Sound("Power_Down", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Start: new Sound("Start", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Success: new Sound("Success", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Turn: new Sound("Turn", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Background: new Sound("Background", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
    Trail_Custom: new Sound("Trail_Custom", "DLC_HEIST_HACKING_SNAKE_SOUNDS"),
  },
  dlc_xm_silo_laser_hack_sounds: {
    Blue_Target_Explode: new Sound(
      "Blue_Target_Explode",
      "dlc_xm_silo_laser_hack_sounds"
    ),
    Fail: new Sound("Fail", "dlc_xm_silo_laser_hack_sounds"),
    Hit_Mirror: new Sound("Hit_Mirror", "dlc_xm_silo_laser_hack_sounds"),
    Node_Release: new Sound("Node_Release", "dlc_xm_silo_laser_hack_sounds"),
    Node_Select: new Sound("Node_Select", "dlc_xm_silo_laser_hack_sounds"),
    Pass: new Sound("Pass", "dlc_xm_silo_laser_hack_sounds"),
    Red_Target_Explode: new Sound(
      "Red_Target_Explode",
      "dlc_xm_silo_laser_hack_sounds"
    ),
    Background: new Sound("Background", "dlc_xm_silo_laser_hack_sounds"),
    Cursor_Move: new Sound("Cursor_Move", "dlc_xm_silo_laser_hack_sounds"),
    Blue_Target_Charge: new Sound(
      "Blue_Target_Charge",
      "dlc_xm_silo_laser_hack_sounds"
    ),
    Red_Target_Charge: new Sound(
      "Red_Target_Charge",
      "dlc_xm_silo_laser_hack_sounds"
    ),
    Rotate_Mirror: new Sound("Rotate_Mirror", "dlc_xm_silo_laser_hack_sounds"),
  },
  MP_LOBBY_SOUNDS: {
    BOATS_PLANES_HELIS_BOOM: new Sound(
      "BOATS_PLANES_HELIS_BOOM",
      "MP_LOBBY_SOUNDS"
    ),
    CAR_BIKE_WHOOSH: new Sound("CAR_BIKE_WHOOSH", "MP_LOBBY_SOUNDS"),
    Whoosh_1s_L_to_R: new Sound("Whoosh_1s_L_to_R", "MP_LOBBY_SOUNDS"),
    Whoosh_1s_R_to_L: new Sound("Whoosh_1s_R_to_L", "MP_LOBBY_SOUNDS"),
  },
  DLC_SR_TR_Bomb_Player_Sounds: {
    Bomb_Collect: new Sound("Bomb_Collect", "DLC_SR_TR_Bomb_Player_Sounds"),
  },
  DLC_AW_PTB_Sounds: {
    Bomb_Collected: new Sound("Bomb_Collected", "DLC_AW_PTB_Sounds"),
    Bomb_Passed: new Sound("Bomb_Passed", "DLC_AW_PTB_Sounds"),
    Bomb_Countdown: new Sound("Bomb_Countdown", "DLC_AW_PTB_Sounds"),
  },
  DLC_SM_Bomb_Bay_Bombs_Sounds: {
    bomb_deployed: new Sound("bomb_deployed", "DLC_SM_Bomb_Bay_Bombs_Sounds"),
    bombs_empty: new Sound("bombs_empty", "DLC_SM_Bomb_Bay_Bombs_Sounds"),
  },
  GTAO_Speed_Convoy_Soundset: {
    Bomb_Disarmed: new Sound("Bomb_Disarmed", "GTAO_Speed_Convoy_Soundset"),
    Arming_Countdown: new Sound(
      "Arming_Countdown",
      "GTAO_Speed_Convoy_Soundset"
    ),
  },
  dlc_vw_body_disposal_sounds: {
    boot_pop: new Sound("boot_pop", "dlc_vw_body_disposal_sounds"),
    car_crushed: new Sound("car_crushed", "dlc_vw_body_disposal_sounds"),
  },
  GTAO_Biker_FM_Soundset: {
    Boss_Message_Orange: new Sound(
      "Boss_Message_Orange",
      "GTAO_Biker_FM_Soundset"
    ),
  },
  GTAO_Boss_Goons_FM_Soundset: {
    Boss_Message_Orange: new Sound(
      "Boss_Message_Orange",
      "GTAO_Boss_Goons_FM_Soundset"
    ),
    Goon_Paid_Small: new Sound(
      "Goon_Paid_Small",
      "GTAO_Boss_Goons_FM_Soundset"
    ),
    Goon_Paid_Large: new Sound(
      "Goon_Paid_Large",
      "GTAO_Boss_Goons_FM_Soundset"
    ),
  },
  DLC_SM_VEHWA_Player_Sounds: {
    Bounds_Timer_Pulse: new Sound(
      "Bounds_Timer_Pulse",
      "DLC_SM_VEHWA_Player_Sounds"
    ),
    Bounds_Timer_Reset: new Sound(
      "Bounds_Timer_Reset",
      "DLC_SM_VEHWA_Player_Sounds"
    ),
  },
  GTAO_Script_Doors_Faded_Screen_Sounds: {
    Bunker_Hatch: new Sound(
      "Bunker_Hatch",
      "GTAO_Script_Doors_Faded_Screen_Sounds"
    ),
    Garage_Door_Close: new Sound(
      "Garage_Door_Close",
      "GTAO_Script_Doors_Faded_Screen_Sounds"
    ),
    Garage_Door_Open: new Sound(
      "Garage_Door_Open",
      "GTAO_Script_Doors_Faded_Screen_Sounds"
    ),
  },
  DLC_PRISON_BREAK_HEIST_SOUNDS: {
    Bus_Schedule_Pickup: new Sound(
      "Bus_Schedule_Pickup",
      "DLC_PRISON_BREAK_HEIST_SOUNDS"
    ),
  },
  DLC_Biker_Computer_Sounds: {
    Business_Restart: new Sound(
      "Business_Restart",
      "DLC_Biker_Computer_Sounds"
    ),
    Business_Shutdown: new Sound(
      "Business_Shutdown",
      "DLC_Biker_Computer_Sounds"
    ),
    Click_Back: new Sound("Click_Back", "DLC_Biker_Computer_Sounds"),
    Click_Cancel: new Sound("Click_Cancel", "DLC_Biker_Computer_Sounds"),
    Click_Fail: new Sound("Click_Fail", "DLC_Biker_Computer_Sounds"),
    Click_Special: new Sound("Click_Special", "DLC_Biker_Computer_Sounds"),
    Exit: new Sound("Exit", "DLC_Biker_Computer_Sounds"),
  },
  DLC_GR_Disruption_Logistics_Sounds: {
    Business_Restart: new Sound(
      "Business_Restart",
      "DLC_GR_Disruption_Logistics_Sounds"
    ),
    Business_Shutdown: new Sound(
      "Business_Shutdown",
      "DLC_GR_Disruption_Logistics_Sounds"
    ),
    Click_Fail: new Sound("Click_Fail", "DLC_GR_Disruption_Logistics_Sounds"),
    Click_Link: new Sound("Click_Link", "DLC_GR_Disruption_Logistics_Sounds"),
    Click_Special: new Sound(
      "Click_Special",
      "DLC_GR_Disruption_Logistics_Sounds"
    ),
    Exit: new Sound("Exit", "DLC_GR_Disruption_Logistics_Sounds"),
  },
  MP_PROPERTIES_ELEVATOR_DOORS: {
    BUTTON: new Sound("BUTTON", "MP_PROPERTIES_ELEVATOR_DOORS"),
    CLOSED: new Sound("CLOSED", "MP_PROPERTIES_ELEVATOR_DOORS"),
    CLOSING: new Sound("CLOSING", "MP_PROPERTIES_ELEVATOR_DOORS"),
    FAKE_ARRIVE: new Sound("FAKE_ARRIVE", "MP_PROPERTIES_ELEVATOR_DOORS"),
    OPENED: new Sound("OPENED", "MP_PROPERTIES_ELEVATOR_DOORS"),
    OPENING: new Sound("OPENING", "MP_PROPERTIES_ELEVATOR_DOORS"),
  },
  Phone_Soundset_Franklin: {
    Camera_Shoot: new Sound("Camera_Shoot", "Phone_Soundset_Franklin"),
  },
  GTAO_Exec_SecuroServ_Warehouse_PC_Sounds: {
    Cancel: new Sound("Cancel", "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds"),
    Confirm: new Sound("Confirm", "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds"),
    Error: new Sound("Error", "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds"),
    Login: new Sound("Login", "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds"),
    Mouse_Click: new Sound(
      "Mouse_Click",
      "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds"
    ),
    Sell: new Sound("Sell", "GTAO_Exec_SecuroServ_Warehouse_PC_Sounds"),
  },
  HUD_FRONTEND_CLOTHESSHOP_SOUNDSET: {
    CANCEL: new Sound("CANCEL", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET"),
    ERROR: new Sound("ERROR", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET"),
    NAV_UP_DOWN: new Sound("NAV_UP_DOWN", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET"),
    SELECT: new Sound("SELECT", "HUD_FRONTEND_CLOTHESSHOP_SOUNDSET"),
  },
  HUD_LIQUOR_STORE_SOUNDSET: {
    CANCEL: new Sound("CANCEL", "HUD_LIQUOR_STORE_SOUNDSET"),
    ERROR: new Sound("ERROR", "HUD_LIQUOR_STORE_SOUNDSET"),
    NAV_UP_DOWN: new Sound("NAV_UP_DOWN", "HUD_LIQUOR_STORE_SOUNDSET"),
    PURCHASE: new Sound("PURCHASE", "HUD_LIQUOR_STORE_SOUNDSET"),
    SELECT: new Sound("SELECT", "HUD_LIQUOR_STORE_SOUNDSET"),
  },
  dlc_xm_orbital_cannon_sounds: {
    cannon_active: new Sound("cannon_active", "dlc_xm_orbital_cannon_sounds"),
    inactive_fire_fail: new Sound(
      "inactive_fire_fail",
      "dlc_xm_orbital_cannon_sounds"
    ),
    menu_back: new Sound("menu_back", "dlc_xm_orbital_cannon_sounds"),
    menu_reset: new Sound("menu_reset", "dlc_xm_orbital_cannon_sounds"),
    menu_select: new Sound("menu_select", "dlc_xm_orbital_cannon_sounds"),
    menu_up_down: new Sound("menu_up_down", "dlc_xm_orbital_cannon_sounds"),
    pan_loop: new Sound("pan_loop", "dlc_xm_orbital_cannon_sounds"),
    cannon_activating_loop: new Sound(
      "cannon_activating_loop",
      "dlc_xm_orbital_cannon_sounds"
    ),
    cannon_charge_fire_loop: new Sound(
      "cannon_charge_fire_loop",
      "dlc_xm_orbital_cannon_sounds"
    ),
    background_loop: new Sound(
      "background_loop",
      "dlc_xm_orbital_cannon_sounds"
    ),
    zoom_out_loop: new Sound("zoom_out_loop", "dlc_xm_orbital_cannon_sounds"),
  },
  DLC_SM_Countermeasures_Sounds: {
    chaff_cooldown: new Sound(
      "chaff_cooldown",
      "DLC_SM_Countermeasures_Sounds"
    ),
    chaff_empty: new Sound("chaff_empty", "DLC_SM_Countermeasures_Sounds"),
    flares_empty: new Sound("flares_empty", "DLC_SM_Countermeasures_Sounds"),
  },
  DLC_AW_Frontend_Sounds: {
    Checkpoint: new Sound("Checkpoint", "DLC_AW_Frontend_Sounds"),
    Checkpoint_Buzz: new Sound("Checkpoint_Buzz", "DLC_AW_Frontend_Sounds"),
    Checkpoint_Finish: new Sound("Checkpoint_Finish", "DLC_AW_Frontend_Sounds"),
    Checkpoint_Lap: new Sound("Checkpoint_Lap", "DLC_AW_Frontend_Sounds"),
    Countdown_1: new Sound("Countdown_1", "DLC_AW_Frontend_Sounds"),
    Countdown_2: new Sound("Countdown_2", "DLC_AW_Frontend_Sounds"),
    Countdown_3: new Sound("Countdown_3", "DLC_AW_Frontend_Sounds"),
    Countdown_GO: new Sound("Countdown_GO", "DLC_AW_Frontend_Sounds"),
    Finish_Default: new Sound("Finish_Default", "DLC_AW_Frontend_Sounds"),
    Finish_Win: new Sound("Finish_Win", "DLC_AW_Frontend_Sounds"),
    Start: new Sound("Start", "DLC_AW_Frontend_Sounds"),
  },
  DLC_sum20_Open_Wheel_Racing_Sounds: {
    Checkpoint: new Sound("Checkpoint", "DLC_sum20_Open_Wheel_Racing_Sounds"),
    Checkpoint_Finish: new Sound(
      "Checkpoint_Finish",
      "DLC_sum20_Open_Wheel_Racing_Sounds"
    ),
    Checkpoint_Lap: new Sound(
      "Checkpoint_Lap",
      "DLC_sum20_Open_Wheel_Racing_Sounds"
    ),
    health_lost: new Sound("health_lost", "DLC_sum20_Open_Wheel_Racing_Sounds"),
    tyre_health_warning: new Sound(
      "tyre_health_warning",
      "DLC_sum20_Open_Wheel_Racing_Sounds"
    ),
  },
  FM_Events_Sasquatch_Sounds: {
    Checkpoint_Beast_Hit: new Sound(
      "Checkpoint_Beast_Hit",
      "FM_Events_Sasquatch_Sounds"
    ),
    Frontend_Beast_Fade_Screen: new Sound(
      "Frontend_Beast_Fade_Screen",
      "FM_Events_Sasquatch_Sounds"
    ),
    Frontend_Beast_Freeze_Screen: new Sound(
      "Frontend_Beast_Freeze_Screen",
      "FM_Events_Sasquatch_Sounds"
    ),
    Frontend_Beast_Text_Hit: new Sound(
      "Frontend_Beast_Text_Hit",
      "FM_Events_Sasquatch_Sounds"
    ),
    Frontend_Beast_Transform_Back: new Sound(
      "Frontend_Beast_Transform_Back",
      "FM_Events_Sasquatch_Sounds"
    ),
    Radar_Beast_Blip: new Sound(
      "Radar_Beast_Blip",
      "FM_Events_Sasquatch_Sounds"
    ),
  },
  GTAO_Shepherd_Sounds: {
    Checkpoint_Teammate: new Sound(
      "Checkpoint_Teammate",
      "GTAO_Shepherd_Sounds"
    ),
  },
  DLC_H3_Arcade_Laptop_Sounds: {
    Click_Back: new Sound("Click_Back", "DLC_H3_Arcade_Laptop_Sounds"),
    Click_Fail: new Sound("Click_Fail", "DLC_H3_Arcade_Laptop_Sounds"),
    Click_Link: new Sound("Click_Link", "DLC_H3_Arcade_Laptop_Sounds"),
    Click_Special: new Sound("Click_Special", "DLC_H3_Arcade_Laptop_Sounds"),
    Exit: new Sound("Exit", "DLC_H3_Arcade_Laptop_Sounds"),
  },
  GTAO_SMG_Hangar_Computer_Sounds: {
    Click_Back: new Sound("Click_Back", "GTAO_SMG_Hangar_Computer_Sounds"),
    Click_Fail: new Sound("Click_Fail", "GTAO_SMG_Hangar_Computer_Sounds"),
    Click_Link: new Sound("Click_Link", "GTAO_SMG_Hangar_Computer_Sounds"),
    Click_Special: new Sound(
      "Click_Special",
      "GTAO_SMG_Hangar_Computer_Sounds"
    ),
    Exit: new Sound("Exit", "GTAO_SMG_Hangar_Computer_Sounds"),
    Show_Overview_Menu: new Sound(
      "Show_Overview_Menu",
      "GTAO_SMG_Hangar_Computer_Sounds"
    ),
    Show_Sell_Menu: new Sound(
      "Show_Sell_Menu",
      "GTAO_SMG_Hangar_Computer_Sounds"
    ),
    Show_Source_Menu: new Sound(
      "Show_Source_Menu",
      "GTAO_SMG_Hangar_Computer_Sounds"
    ),
  },
  WEB_NAVIGATION_SOUNDS_PHONE: {
    CLICK_BACK: new Sound("CLICK_BACK", "WEB_NAVIGATION_SOUNDS_PHONE"),
    Click_Fail: new Sound("Click_Fail", "WEB_NAVIGATION_SOUNDS_PHONE"),
    Click_Special: new Sound("Click_Special", "WEB_NAVIGATION_SOUNDS_PHONE"),
  },
  DLC_H3_Tracker_App_Sounds: {
    Close: new Sound("Close", "DLC_H3_Tracker_App_Sounds"),
    Launch: new Sound("Launch", "DLC_H3_Tracker_App_Sounds"),
    Signal_Loop: new Sound("Signal_Loop", "DLC_H3_Tracker_App_Sounds"),
  },
  DLC_APT_YACHT_DOOR_SOUNDS: {
    Closed: new Sound("Closed", "DLC_APT_YACHT_DOOR_SOUNDS"),
    CLOSED: new Sound("CLOSED", "DLC_APT_YACHT_DOOR_SOUNDS"),
    LIMIT: new Sound("LIMIT", "DLC_APT_YACHT_DOOR_SOUNDS"),
    PUSH: new Sound("PUSH", "DLC_APT_YACHT_DOOR_SOUNDS"),
  },
  dlc_btl_club_open_transition_crowd_sounds: {
    club_crowd_transition: new Sound(
      "club_crowd_transition",
      "dlc_btl_club_open_transition_crowd_sounds"
    ),
  },
  dlc_btl_fm_th_sounds: {
    clue_complete_shard: new Sound(
      "clue_complete_shard",
      "dlc_btl_fm_th_sounds"
    ),
    item_found: new Sound("item_found", "dlc_btl_fm_th_sounds"),
  },
  dlc_xm_fm_th_sounds: {
    clue_complete_shard: new Sound(
      "clue_complete_shard",
      "dlc_xm_fm_th_sounds"
    ),
    item_found: new Sound("item_found", "dlc_xm_fm_th_sounds"),
  },
  dlc_ch_hidden_collectibles_sk_sounds: {
    clue_seen: new Sound("clue_seen", "dlc_ch_hidden_collectibles_sk_sounds"),
    killer_down: new Sound(
      "killer_down",
      "dlc_ch_hidden_collectibles_sk_sounds"
    ),
  },
  dlc_vw_tracking_chips_sounds: {
    collect_chips_handed: new Sound(
      "collect_chips_handed",
      "dlc_vw_tracking_chips_sounds"
    ),
  },
  DLC_sum20_BB_Captured_Sounds: {
    collect_part: new Sound("collect_part", "DLC_sum20_BB_Captured_Sounds"),
  },
  DLC_IE_PL_Player_Sounds: {
    Collect_Pickup: new Sound("Collect_Pickup", "DLC_IE_PL_Player_Sounds"),
    Drop_Pickup: new Sound("Drop_Pickup", "DLC_IE_PL_Player_Sounds"),
    Score_Down: new Sound("Score_Down", "DLC_IE_PL_Player_Sounds"),
    Score_Up: new Sound("Score_Up", "DLC_IE_PL_Player_Sounds"),
    Countdown_To_Win: new Sound("Countdown_To_Win", "DLC_IE_PL_Player_Sounds"),
  },
  dlc_sum20_yacht_missions_ah_sounds: {
    collect_water: new Sound(
      "collect_water",
      "dlc_sum20_yacht_missions_ah_sounds"
    ),
  },
  DLC_SM_CND_Player_Sounds: {
    Condemned: new Sound("Condemned", "DLC_SM_CND_Player_Sounds"),
    Uncondemned: new Sound("Uncondemned", "DLC_SM_CND_Player_Sounds"),
    Condemned_Heartbeat: new Sound(
      "Condemned_Heartbeat",
      "DLC_SM_CND_Player_Sounds"
    ),
  },
  DLC_HEIST_PLANNING_BOARD_SOUNDS: {
    Continue_Accepted: new Sound(
      "Continue_Accepted",
      "DLC_HEIST_PLANNING_BOARD_SOUNDS"
    ),
    Continue_Appears: new Sound(
      "Continue_Appears",
      "DLC_HEIST_PLANNING_BOARD_SOUNDS"
    ),
    Highlight_Accept: new Sound(
      "Highlight_Accept",
      "DLC_HEIST_PLANNING_BOARD_SOUNDS"
    ),
    Highlight_Cancel: new Sound(
      "Highlight_Cancel",
      "DLC_HEIST_PLANNING_BOARD_SOUNDS"
    ),
    Highlight_Error: new Sound(
      "Highlight_Error",
      "DLC_HEIST_PLANNING_BOARD_SOUNDS"
    ),
    Highlight_Move: new Sound(
      "Highlight_Move",
      "DLC_HEIST_PLANNING_BOARD_SOUNDS"
    ),
    Map_Roll_Down: new Sound(
      "Map_Roll_Down",
      "DLC_HEIST_PLANNING_BOARD_SOUNDS"
    ),
    Map_Roll_Up: new Sound("Map_Roll_Up", "DLC_HEIST_PLANNING_BOARD_SOUNDS"),
    Paper_Shuffle: new Sound(
      "Paper_Shuffle",
      "DLC_HEIST_PLANNING_BOARD_SOUNDS"
    ),
    Paper_Stick: new Sound("Paper_Stick", "DLC_HEIST_PLANNING_BOARD_SOUNDS"),
    Pen_Tick: new Sound("Pen_Tick", "DLC_HEIST_PLANNING_BOARD_SOUNDS"),
    Zoom_In: new Sound("Zoom_In", "DLC_HEIST_PLANNING_BOARD_SOUNDS"),
    Zoom_Left: new Sound("Zoom_Left", "DLC_HEIST_PLANNING_BOARD_SOUNDS"),
    Zoom_Out: new Sound("Zoom_Out", "DLC_HEIST_PLANNING_BOARD_SOUNDS"),
    Zoom_Right: new Sound("Zoom_Right", "DLC_HEIST_PLANNING_BOARD_SOUNDS"),
  },
  DLC_SR_TR_General_Sounds: {
    Countdown_1: new Sound("Countdown_1", "DLC_SR_TR_General_Sounds"),
    Countdown_2: new Sound("Countdown_2", "DLC_SR_TR_General_Sounds"),
    Countdown_3: new Sound("Countdown_3", "DLC_SR_TR_General_Sounds"),
    Countdown_GO: new Sound("Countdown_GO", "DLC_SR_TR_General_Sounds"),
  },
  DLC_AW_Arena_Spin_Wheel_Game_Frontend_Sounds: {
    Countdown_Timer_Bleep: new Sound(
      "Countdown_Timer_Bleep",
      "DLC_AW_Arena_Spin_Wheel_Game_Frontend_Sounds"
    ),
    Countdown_Timer_Bleep_Red: new Sound(
      "Countdown_Timer_Bleep_Red",
      "DLC_AW_Arena_Spin_Wheel_Game_Frontend_Sounds"
    ),
    Wheel_Spin_Start: new Sound(
      "Wheel_Spin_Start",
      "DLC_AW_Arena_Spin_Wheel_Game_Frontend_Sounds"
    ),
  },
  DLC_Biker_Burn_Assets_Sounds: {
    Counter_Tick: new Sound("Counter_Tick", "DLC_Biker_Burn_Assets_Sounds"),
  },
  DLC_IE_Vip_Stockpile_Sounds: {
    Crate_Destroy_Remote: new Sound(
      "Crate_Destroy_Remote",
      "DLC_IE_Vip_Stockpile_Sounds"
    ),
    Crate_Pickup_Remote: new Sound(
      "Crate_Pickup_Remote",
      "DLC_IE_Vip_Stockpile_Sounds"
    ),
  },
  GTAO_Biker_Modes_Soundset: {
    Crates_Blipped: new Sound("Crates_Blipped", "GTAO_Biker_Modes_Soundset"),
    Deliver_Item: new Sound("Deliver_Item", "GTAO_Biker_Modes_Soundset"),
    Enter_1st: new Sound("Enter_1st", "GTAO_Biker_Modes_Soundset"),
    Generic_Negative_Event: new Sound(
      "Generic_Negative_Event",
      "GTAO_Biker_Modes_Soundset"
    ),
    Generic_Positive_Event: new Sound(
      "Generic_Positive_Event",
      "GTAO_Biker_Modes_Soundset"
    ),
    Lose_1st: new Sound("Lose_1st", "GTAO_Biker_Modes_Soundset"),
    Pickup_Standard: new Sound("Pickup_Standard", "GTAO_Biker_Modes_Soundset"),
    Pickup_Briefcase: new Sound(
      "Pickup_Briefcase",
      "GTAO_Biker_Modes_Soundset"
    ),
    Blip_Pickup: new Sound("Blip_Pickup", "GTAO_Biker_Modes_Soundset"),
    Enemy_Pickup_Briefcase: new Sound(
      "Enemy_Pickup_Briefcase",
      "GTAO_Biker_Modes_Soundset"
    ),
  },
  GTAO_Magnate_Boss_Modes_Soundset: {
    Crates_Blipped: new Sound(
      "Crates_Blipped",
      "GTAO_Magnate_Boss_Modes_Soundset"
    ),
    Enter_1st: new Sound("Enter_1st", "GTAO_Magnate_Boss_Modes_Soundset"),
    Lose_1st: new Sound("Lose_1st", "GTAO_Magnate_Boss_Modes_Soundset"),
    Pickup_Briefcase: new Sound(
      "Pickup_Briefcase",
      "GTAO_Magnate_Boss_Modes_Soundset"
    ),
  },
  DLC_H4_Submarine_Crush_Depth_Sounds: {
    Crush: new Sound("Crush", "DLC_H4_Submarine_Crush_Depth_Sounds"),
    Creaking_Loop: new Sound(
      "Creaking_Loop",
      "DLC_H4_Submarine_Crush_Depth_Sounds"
    ),
    Warning_Alarm_Loop: new Sound(
      "Warning_Alarm_Loop",
      "DLC_H4_Submarine_Crush_Depth_Sounds"
    ),
  },
  DLC_Dmod_Prop_Editor_Sounds: {
    Cycle_Item: new Sound("Cycle_Item", "DLC_Dmod_Prop_Editor_Sounds"),
    Delete_Placed_Prop: new Sound(
      "Delete_Placed_Prop",
      "DLC_Dmod_Prop_Editor_Sounds"
    ),
    Load_Scene: new Sound("Load_Scene", "DLC_Dmod_Prop_Editor_Sounds"),
    Place_Prop_Fail: new Sound(
      "Place_Prop_Fail",
      "DLC_Dmod_Prop_Editor_Sounds"
    ),
    Place_Prop_Success: new Sound(
      "Place_Prop_Success",
      "DLC_Dmod_Prop_Editor_Sounds"
    ),
    Reset_Prop_Position: new Sound(
      "Reset_Prop_Position",
      "DLC_Dmod_Prop_Editor_Sounds"
    ),
    Save_Scene: new Sound("Save_Scene", "DLC_Dmod_Prop_Editor_Sounds"),
    Select_Placed_Prop: new Sound(
      "Select_Placed_Prop",
      "DLC_Dmod_Prop_Editor_Sounds"
    ),
    Elevation_Loop: new Sound("Elevation_Loop", "DLC_Dmod_Prop_Editor_Sounds"),
    Move_Loop: new Sound("Move_Loop", "DLC_Dmod_Prop_Editor_Sounds"),
    Rotate_Loop: new Sound("Rotate_Loop", "DLC_Dmod_Prop_Editor_Sounds"),
  },
  DLC_Biker_LostAndDamned_Sounds: {
    DayBreak_Stinger: new Sound(
      "DayBreak_Stinger",
      "DLC_Biker_LostAndDamned_Sounds"
    ),
    NightFall_Stinger: new Sound(
      "NightFall_Stinger",
      "DLC_Biker_LostAndDamned_Sounds"
    ),
    Timer_To_Day: new Sound("Timer_To_Day", "DLC_Biker_LostAndDamned_Sounds"),
    Timer_To_Night: new Sound(
      "Timer_To_Night",
      "DLC_Biker_LostAndDamned_Sounds"
    ),
  },
  HUD_DEATHMATCH_SOUNDSET: {
    DELETE: new Sound("DELETE", "HUD_DEATHMATCH_SOUNDSET"),
    EDIT: new Sound("EDIT", "HUD_DEATHMATCH_SOUNDSET"),
  },
  In_And_Out_Attacker_Sounds: {
    Deliver: new Sound("Deliver", "In_And_Out_Attacker_Sounds"),
    Dropped: new Sound("Dropped", "In_And_Out_Attacker_Sounds"),
    Friend_Pick_Up: new Sound("Friend_Pick_Up", "In_And_Out_Attacker_Sounds"),
    Player_Pick_Up: new Sound("Player_Pick_Up", "In_And_Out_Attacker_Sounds"),
  },
  HUD_FRONTEND_MP_COLLECTABLE_SOUNDS: {
    Deliver_Pick_Up: new Sound(
      "Deliver_Pick_Up",
      "HUD_FRONTEND_MP_COLLECTABLE_SOUNDS"
    ),
    Dropped: new Sound("Dropped", "HUD_FRONTEND_MP_COLLECTABLE_SOUNDS"),
    Enemy_Deliver: new Sound(
      "Enemy_Deliver",
      "HUD_FRONTEND_MP_COLLECTABLE_SOUNDS"
    ),
    Enemy_Pick_Up: new Sound(
      "Enemy_Pick_Up",
      "HUD_FRONTEND_MP_COLLECTABLE_SOUNDS"
    ),
    Friend_Deliver: new Sound(
      "Friend_Deliver",
      "HUD_FRONTEND_MP_COLLECTABLE_SOUNDS"
    ),
    Friend_Pick_Up: new Sound(
      "Friend_Pick_Up",
      "HUD_FRONTEND_MP_COLLECTABLE_SOUNDS"
    ),
  },
  dlc_vw_table_games_frontend_sounds: {
    DLC_VW_BET_MAX: new Sound(
      "DLC_VW_BET_MAX",
      "dlc_vw_table_games_frontend_sounds"
    ),
    DLC_VW_BET_UP: new Sound(
      "DLC_VW_BET_UP",
      "dlc_vw_table_games_frontend_sounds"
    ),
    DLC_VW_CONTINUE: new Sound(
      "DLC_VW_CONTINUE",
      "dlc_vw_table_games_frontend_sounds"
    ),
    DLC_VW_ERROR_MAX: new Sound(
      "DLC_VW_ERROR_MAX",
      "dlc_vw_table_games_frontend_sounds"
    ),
    DLC_VW_RULES: new Sound(
      "DLC_VW_RULES",
      "dlc_vw_table_games_frontend_sounds"
    ),
    DLC_VW_WIN_CHIPS: new Sound(
      "DLC_VW_WIN_CHIPS",
      "dlc_vw_table_games_frontend_sounds"
    ),
  },
  DOCKS_HEIST_FINALE_2B_SOUNDS: {
    Door_Open: new Sound("Door_Open", "DOCKS_HEIST_FINALE_2B_SOUNDS"),
  },
  DLC_GR_Bunker_Door_Sounds: {
    Door_Open_Limit: new Sound("Door_Open_Limit", "DLC_GR_Bunker_Door_Sounds"),
  },
  DLC_SM_Hangar_Door_Sounds: {
    Door_Open_Limit: new Sound("Door_Open_Limit", "DLC_SM_Hangar_Door_Sounds"),
  },
  DLC_XM_Silo_Secret_Door_Sounds: {
    Door_Open_Limit: new Sound(
      "Door_Open_Limit",
      "DLC_XM_Silo_Secret_Door_Sounds"
    ),
  },
  DLC_BTL_Break_In_Sounds: {
    download_complete: new Sound(
      "download_complete",
      "DLC_BTL_Break_In_Sounds"
    ),
    download_start: new Sound("download_start", "DLC_BTL_Break_In_Sounds"),
  },
  DLC_HEIST_FLEECA_SOUNDSET: {
    Drill_Pin_Break: new Sound("Drill_Pin_Break", "DLC_HEIST_FLEECA_SOUNDSET"),
  },
  DLC_IE_PL_Enemy_Sounds: {
    Drop_Pickup: new Sound("Drop_Pickup", "DLC_IE_PL_Enemy_Sounds"),
    Score_Down: new Sound("Score_Down", "DLC_IE_PL_Enemy_Sounds"),
    Score_Up: new Sound("Score_Up", "DLC_IE_PL_Enemy_Sounds"),
  },
  DLC_IE_PL_Team_Sounds: {
    Drop_Pickup: new Sound("Drop_Pickup", "DLC_IE_PL_Team_Sounds"),
    Score_Down: new Sound("Score_Down", "DLC_IE_PL_Team_Sounds"),
    Score_Up: new Sound("Score_Up", "DLC_IE_PL_Team_Sounds"),
    Countdown_To_Win: new Sound("Countdown_To_Win", "DLC_IE_PL_Team_Sounds"),
  },
  In_And_Out_Defender_Sounds: {
    Dropped: new Sound("Dropped", "In_And_Out_Defender_Sounds"),
    Enemy_Deliver: new Sound("Enemy_Deliver", "In_And_Out_Defender_Sounds"),
    Enemy_Pick_Up: new Sound("Enemy_Pick_Up", "In_And_Out_Defender_Sounds"),
  },
  dlc_ch_heist_finale_sounds: {
    emp_activate: new Sound("emp_activate", "dlc_ch_heist_finale_sounds"),
    power_on: new Sound("power_on", "dlc_ch_heist_finale_sounds"),
  },
  DLC_AW_EMP_Sounds: {
    EMP_vehicle_affected: new Sound(
      "EMP_vehicle_affected",
      "DLC_AW_EMP_Sounds"
    ),
  },
  CB_RADIO_SFX: {
    End_Squelch: new Sound("End_Squelch", "CB_RADIO_SFX"),
    Start_Squelch: new Sound("Start_Squelch", "CB_RADIO_SFX"),
    Background_Loop: new Sound("Background_Loop", "CB_RADIO_SFX"),
  },
  DLC_Lowrider_Relay_Race_Sounds: {
    Enter_Area: new Sound("Enter_Area", "DLC_Lowrider_Relay_Race_Sounds"),
    Out_Of_Area: new Sound("Out_Of_Area", "DLC_Lowrider_Relay_Race_Sounds"),
  },
  GTAO_ImpExp_Enter_Exit_Garage_Sounds: {
    Enter_On_Foot: new Sound(
      "Enter_On_Foot",
      "GTAO_ImpExp_Enter_Exit_Garage_Sounds"
    ),
    Exit_In_Vehicle: new Sound(
      "Exit_In_Vehicle",
      "GTAO_ImpExp_Enter_Exit_Garage_Sounds"
    ),
  },
  DLC_Biker_SYG_Sounds: {
    Enter_Zone: new Sound("Enter_Zone", "DLC_Biker_SYG_Sounds"),
    Leave_Zone: new Sound("Leave_Zone", "DLC_Biker_SYG_Sounds"),
    Enemy_In_Zone: new Sound("Enemy_In_Zone", "DLC_Biker_SYG_Sounds"),
  },
  DLC_Biker_Mission_Wall_Sounds: {
    ERROR: new Sound("ERROR", "DLC_Biker_Mission_Wall_Sounds"),
    Highlight_Accept: new Sound(
      "Highlight_Accept",
      "DLC_Biker_Mission_Wall_Sounds"
    ),
    Highlight_Back: new Sound(
      "Highlight_Back",
      "DLC_Biker_Mission_Wall_Sounds"
    ),
    Highlight_Error: new Sound(
      "Highlight_Error",
      "DLC_Biker_Mission_Wall_Sounds"
    ),
    Highlight_Move_Left_Right: new Sound(
      "Highlight_Move_Left_Right",
      "DLC_Biker_Mission_Wall_Sounds"
    ),
    Highlight_Move_Up_Down: new Sound(
      "Highlight_Move_Up_Down",
      "DLC_Biker_Mission_Wall_Sounds"
    ),
  },
  Low2_Super_Mod_Garage_Sounds: {
    Faction3_Upgrade: new Sound(
      "Faction3_Upgrade",
      "Low2_Super_Mod_Garage_Sounds"
    ),
  },
  EXILE_1: {
    Falling_Crates: new Sound("Falling_Crates", "EXILE_1"),
    Altitude_Warning: new Sound("Altitude_Warning", "EXILE_1"),
  },
  FAMILY1_BOAT: {
    FAMILY_1_CAR_BREAKDOWN: new Sound("FAMILY_1_CAR_BREAKDOWN", "FAMILY1_BOAT"),
    FAMILY_1_CAR_BREAKDOWN_ADDITIONAL: new Sound(
      "FAMILY_1_CAR_BREAKDOWN_ADDITIONAL",
      "FAMILY1_BOAT"
    ),
  },
  Feed_Message_Sounds: {
    FestiveGift: new Sound("FestiveGift", "Feed_Message_Sounds"),
  },
  DLC_SM_STPI_Enemy_Sounds: {
    Flag_Collected: new Sound("Flag_Collected", "DLC_SM_STPI_Enemy_Sounds"),
    Flag_Delivered: new Sound("Flag_Delivered", "DLC_SM_STPI_Enemy_Sounds"),
    Flag_Dropped: new Sound("Flag_Dropped", "DLC_SM_STPI_Enemy_Sounds"),
  },
  DLC_SM_STPI_Player_Sounds: {
    Flag_Collected: new Sound("Flag_Collected", "DLC_SM_STPI_Player_Sounds"),
    Flag_Delivered: new Sound("Flag_Delivered", "DLC_SM_STPI_Player_Sounds"),
    Flag_Dropped: new Sound("Flag_Dropped", "DLC_SM_STPI_Player_Sounds"),
  },
  DLC_XM17_IAA_Deluxos_Sounds: {
    Flight_Unlock: new Sound("Flight_Unlock", "DLC_XM17_IAA_Deluxos_Sounds"),
    Hover_Unlock: new Sound("Hover_Unlock", "DLC_XM17_IAA_Deluxos_Sounds"),
  },
  FAMILY_5_SOUNDS: {
    FLYING_STREAM_END_INSTANT: new Sound(
      "FLYING_STREAM_END_INSTANT",
      "FAMILY_5_SOUNDS"
    ),
    MICHAEL_LONG_SCREAM: new Sound("MICHAEL_LONG_SCREAM", "FAMILY_5_SOUNDS"),
  },
  HintCamSounds: {
    FocusIn: new Sound("FocusIn", "HintCamSounds"),
    FocusOut: new Sound("FocusOut", "HintCamSounds"),
  },
  formation_flying_blips_soundset: {
    formation_active: new Sound(
      "formation_active",
      "formation_flying_blips_soundset"
    ),
    formation_inactive: new Sound(
      "formation_inactive",
      "formation_flying_blips_soundset"
    ),
  },
  dlc_hei4_hidden_collectibles_sounds: {
    gadget_pistol_shard: new Sound(
      "gadget_pistol_shard",
      "dlc_hei4_hidden_collectibles_sounds"
    ),
    shotgun_shard: new Sound(
      "shotgun_shard",
      "dlc_hei4_hidden_collectibles_sounds"
    ),
  },
  dlc_xm_aqo_sounds: {
    Gain_Point: new Sound("Gain_Point", "dlc_xm_aqo_sounds"),
    Goal_Reached: new Sound("Goal_Reached", "dlc_xm_aqo_sounds"),
  },
  GTAO_Script_Doors_Sounds: {
    Generic_Door_Closed: new Sound(
      "Generic_Door_Closed",
      "GTAO_Script_Doors_Sounds"
    ),
    Garage_Door_Close_Loop: new Sound(
      "Garage_Door_Close_Loop",
      "GTAO_Script_Doors_Sounds"
    ),
    Garage_Door_Open_Loop: new Sound(
      "Garage_Door_Open_Loop",
      "GTAO_Script_Doors_Sounds"
    ),
  },
  DLC_XM17_Silo_Pred_Sounds: {
    Goggles_Update: new Sound("Goggles_Update", "DLC_XM17_Silo_Pred_Sounds"),
  },
  DLC_SR_TR_Gun_Player_Sounds: {
    Gun_Collect: new Sound("Gun_Collect", "DLC_SR_TR_Gun_Player_Sounds"),
  },
  DLC_IE_SVM_Voltic2_Hacking_Sounds: {
    Hack_Complete: new Sound(
      "Hack_Complete",
      "DLC_IE_SVM_Voltic2_Hacking_Sounds"
    ),
    Hack_Start: new Sound("Hack_Start", "DLC_IE_SVM_Voltic2_Hacking_Sounds"),
    Hack_Stop: new Sound("Hack_Stop", "DLC_IE_SVM_Voltic2_Hacking_Sounds"),
    Hack_Loop: new Sound("Hack_Loop", "DLC_IE_SVM_Voltic2_Hacking_Sounds"),
  },
  dlc_xm_deluxos_hacking_Hacking_Sounds: {
    Hack_Complete: new Sound(
      "Hack_Complete",
      "dlc_xm_deluxos_hacking_Hacking_Sounds"
    ),
    Hack_Start: new Sound(
      "Hack_Start",
      "dlc_xm_deluxos_hacking_Hacking_Sounds"
    ),
    Hack_Stop: new Sound("Hack_Stop", "dlc_xm_deluxos_hacking_Hacking_Sounds"),
    Hack_Loop: new Sound("Hack_Loop", "dlc_xm_deluxos_hacking_Hacking_Sounds"),
  },
  DLC_sum20_Business_Battle_AC_Sounds: {
    Hack_Fail: new Sound("Hack_Fail", "DLC_sum20_Business_Battle_AC_Sounds"),
    Hack_Success: new Sound(
      "Hack_Success",
      "DLC_sum20_Business_Battle_AC_Sounds"
    ),
  },
  DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS: {
    Hack_Failed: new Sound(
      "Hack_Failed",
      "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS"
    ),
    Hack_Success: new Sound(
      "Hack_Success",
      "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS"
    ),
    Pin_Bad: new Sound("Pin_Bad", "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS"),
    Pin_Centred: new Sound(
      "Pin_Centred",
      "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS"
    ),
    Pin_Good: new Sound("Pin_Good", "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS"),
    Pin_Movement: new Sound(
      "Pin_Movement",
      "DLC_HEIST_BIOLAB_PREP_HACKING_SOUNDS"
    ),
  },
  DLC_GR_Steal_Railguns_Sounds: {
    Hack_Success: new Sound("Hack_Success", "DLC_GR_Steal_Railguns_Sounds"),
  },
  Phone_SoundSet_Michael: {
    Hang_Up: new Sound("Hang_Up", "Phone_SoundSet_Michael"),
    Put_Away: new Sound("Put_Away", "Phone_SoundSet_Michael"),
  },
  DLC_AW_Arena_Office_Planning_Wall_Sounds: {
    Highlight_Accept: new Sound(
      "Highlight_Accept",
      "DLC_AW_Arena_Office_Planning_Wall_Sounds"
    ),
    Highlight_Back: new Sound(
      "Highlight_Back",
      "DLC_AW_Arena_Office_Planning_Wall_Sounds"
    ),
    Highlight_Move_Up_Down: new Sound(
      "Highlight_Move_Up_Down",
      "DLC_AW_Arena_Office_Planning_Wall_Sounds"
    ),
  },
  RESPAWN_SOUNDSET: {
    Hit: new Sound("Hit", "RESPAWN_SOUNDSET"),
  },
  LONG_PLAYER_SWITCH_SOUNDS: {
    Hit_1: new Sound("Hit_1", "LONG_PLAYER_SWITCH_SOUNDS"),
  },
  BARRY_02_SOUNDSET: {
    HOORAY: new Sound("HOORAY", "BARRY_02_SOUNDSET"),
  },
  Safe_Minigame_Sounds: {
    Idcnput_Code_Enter_Correct_Final: new Sound(
      "Idcnput_Code_Enter_Correct_Final",
      "Safe_Minigame_Sounds"
    ),
    Input_Code_Down: new Sound("Input_Code_Down", "Safe_Minigame_Sounds"),
    Input_Code_Enter_Correct: new Sound(
      "Input_Code_Enter_Correct",
      "Safe_Minigame_Sounds"
    ),
    Input_Code_Enter_Wrong: new Sound(
      "Input_Code_Enter_Wrong",
      "Safe_Minigame_Sounds"
    ),
    Input_Code_Up: new Sound("Input_Code_Up", "Safe_Minigame_Sounds"),
  },
  DLC_Biker_SL_Sounds: {
    In_Range: new Sound("In_Range", "DLC_Biker_SL_Sounds"),
    Lose_First: new Sound("Lose_First", "DLC_Biker_SL_Sounds"),
    Out_Of_Range: new Sound("Out_Of_Range", "DLC_Biker_SL_Sounds"),
    R2_Boost: new Sound("R2_Boost", "DLC_Biker_SL_Sounds"),
    Take_First: new Sound("Take_First", "DLC_Biker_SL_Sounds"),
    Teammate_Checkpoint: new Sound(
      "Teammate_Checkpoint",
      "DLC_Biker_SL_Sounds"
    ),
    Slipstream_Follower: new Sound(
      "Slipstream_Follower",
      "DLC_Biker_SL_Sounds"
    ),
    Slipstream_Leader: new Sound("Slipstream_Leader", "DLC_Biker_SL_Sounds"),
  },
  dlc_ch_heist_finale_laser_drill_sounds: {
    laser_pin_break: new Sound(
      "laser_pin_break",
      "dlc_ch_heist_finale_laser_drill_sounds"
    ),
  },
  dlc_xm_stealavg_sounds: {
    lights_on: new Sound("lights_on", "dlc_xm_stealavg_sounds"),
  },
  GTAO_APT_DOOR_DOWNSTAIRS_GENERIC_SOUNDS: {
    LIMIT: new Sound("LIMIT", "GTAO_APT_DOOR_DOWNSTAIRS_GENERIC_SOUNDS"),
    PUSH: new Sound("PUSH", "GTAO_APT_DOOR_DOWNSTAIRS_GENERIC_SOUNDS"),
    Push: new Sound("Push", "GTAO_APT_DOOR_DOWNSTAIRS_GENERIC_SOUNDS"),
    SWING_SHUT: new Sound(
      "SWING_SHUT",
      "GTAO_APT_DOOR_DOWNSTAIRS_GENERIC_SOUNDS"
    ),
  },
  GTAO_APT_DOOR_DOWNSTAIRS_GLASS_SOUNDS: {
    LIMIT: new Sound("LIMIT", "GTAO_APT_DOOR_DOWNSTAIRS_GLASS_SOUNDS"),
    PUSH: new Sound("PUSH", "GTAO_APT_DOOR_DOWNSTAIRS_GLASS_SOUNDS"),
    SWING_SHUT: new Sound(
      "SWING_SHUT",
      "GTAO_APT_DOOR_DOWNSTAIRS_GLASS_SOUNDS"
    ),
  },
  GTAO_APT_DOOR_DOWNSTAIRS_WOOD_SOUNDS: {
    LIMIT: new Sound("LIMIT", "GTAO_APT_DOOR_DOWNSTAIRS_WOOD_SOUNDS"),
    PUSH: new Sound("PUSH", "GTAO_APT_DOOR_DOWNSTAIRS_WOOD_SOUNDS"),
    SWING_SHUT: new Sound("SWING_SHUT", "GTAO_APT_DOOR_DOWNSTAIRS_WOOD_SOUNDS"),
  },
  GTAO_APT_DOOR_ROOF_METAL_SOUNDS: {
    LIMIT: new Sound("LIMIT", "GTAO_APT_DOOR_ROOF_METAL_SOUNDS"),
    PUSH: new Sound("PUSH", "GTAO_APT_DOOR_ROOF_METAL_SOUNDS"),
    SWING_SHUT: new Sound("SWING_SHUT", "GTAO_APT_DOOR_ROOF_METAL_SOUNDS"),
  },
  DLC_GR_MOC_Computer_Sounds: {
    Log_In: new Sound("Log_In", "DLC_GR_MOC_Computer_Sounds"),
    Logout: new Sound("Logout", "DLC_GR_MOC_Computer_Sounds"),
    Select_Mission_Are_You_Sure: new Sound(
      "Select_Mission_Are_You_Sure",
      "DLC_GR_MOC_Computer_Sounds"
    ),
    Select_Mission_Cancel: new Sound(
      "Select_Mission_Cancel",
      "DLC_GR_MOC_Computer_Sounds"
    ),
    Select_Mission_Launch: new Sound(
      "Select_Mission_Launch",
      "DLC_GR_MOC_Computer_Sounds"
    ),
    Select_Mission_Unavailable: new Sound(
      "Select_Mission_Unavailable",
      "DLC_GR_MOC_Computer_Sounds"
    ),
    Select_Mission_Unavailable_OK: new Sound(
      "Select_Mission_Unavailable_OK",
      "DLC_GR_MOC_Computer_Sounds"
    ),
  },
  GTAO_Exec_SecuroServ_Computer_Sounds: {
    Logout: new Sound("Logout", "GTAO_Exec_SecuroServ_Computer_Sounds"),
    Navigate: new Sound("Navigate", "GTAO_Exec_SecuroServ_Computer_Sounds"),
    Popup_Cancel: new Sound(
      "Popup_Cancel",
      "GTAO_Exec_SecuroServ_Computer_Sounds"
    ),
    Popup_Confirm_Fail: new Sound(
      "Popup_Confirm_Fail",
      "GTAO_Exec_SecuroServ_Computer_Sounds"
    ),
    Popup_Confirm_Success: new Sound(
      "Popup_Confirm_Success",
      "GTAO_Exec_SecuroServ_Computer_Sounds"
    ),
    Sell: new Sound("Sell", "GTAO_Exec_SecuroServ_Computer_Sounds"),
  },
  DLC_IE_VV_General_Sounds: {
    Lose_Powerup: new Sound("Lose_Powerup", "DLC_IE_VV_General_Sounds"),
    Steal_Powerup: new Sound("Steal_Powerup", "DLC_IE_VV_General_Sounds"),
    Wasted: new Sound("Wasted", "DLC_IE_VV_General_Sounds"),
  },
  CELEBRATION_SOUNDSET: {
    LOSER: new Sound("LOSER", "CELEBRATION_SOUNDSET"),
    ROUND_ENDING_STINGER_CUSTOM: new Sound(
      "ROUND_ENDING_STINGER_CUSTOM",
      "CELEBRATION_SOUNDSET"
    ),
    SCREEN_FLASH: new Sound("SCREEN_FLASH", "CELEBRATION_SOUNDSET"),
    WINNER: new Sound("WINNER", "CELEBRATION_SOUNDSET"),
  },
  DLC_Exec_TP_SoundSet: {
    Losing_Team_Shard: new Sound("Losing_Team_Shard", "DLC_Exec_TP_SoundSet"),
    Transform_Local_Player: new Sound(
      "Transform_Local_Player",
      "DLC_Exec_TP_SoundSet"
    ),
    Transform_Loser_Local_Player: new Sound(
      "Transform_Loser_Local_Player",
      "DLC_Exec_TP_SoundSet"
    ),
    Winning_Team_Shard: new Sound("Winning_Team_Shard", "DLC_Exec_TP_SoundSet"),
  },
  Lowrider_Super_Mod_Garage_Sounds: {
    Lowrider_Upgrade: new Sound(
      "Lowrider_Upgrade",
      "Lowrider_Super_Mod_Garage_Sounds"
    ),
  },
  DLC_Low2_Ibi_Sounds: {
    Match_End: new Sound("Match_End", "DLC_Low2_Ibi_Sounds"),
    Match_Start: new Sound("Match_Start", "DLC_Low2_Ibi_Sounds"),
    Score: new Sound("Score", "DLC_Low2_Ibi_Sounds"),
    Carrying: new Sound("Carrying", "DLC_Low2_Ibi_Sounds"),
  },
  Phone_SoundSet_Default: {
    Menu_Accept: new Sound("Menu_Accept", "Phone_SoundSet_Default"),
  },
  DLC_SUM20_HIDDEN_COLLECTIBLES: {
    movie_prop: new Sound("movie_prop", "DLC_SUM20_HIDDEN_COLLECTIBLES"),
  },
  DLC_sum20_hidden_collectible_sounds: {
    movie_prop_reward_cut_roar: new Sound(
      "movie_prop_reward_cut_roar",
      "DLC_sum20_hidden_collectible_sounds"
    ),
    movie_prop_reward_cut_music: new Sound(
      "movie_prop_reward_cut_music",
      "DLC_sum20_hidden_collectible_sounds"
    ),
  },
  DLC_Biker_KQ_Sounds: {
    Next_Level_Explosive: new Sound(
      "Next_Level_Explosive",
      "DLC_Biker_KQ_Sounds"
    ),
    Next_Level_Generic: new Sound("Next_Level_Generic", "DLC_Biker_KQ_Sounds"),
    Next_Level_Gun: new Sound("Next_Level_Gun", "DLC_Biker_KQ_Sounds"),
    Next_Level_Melee: new Sound("Next_Level_Melee", "DLC_Biker_KQ_Sounds"),
    Score_Opponent: new Sound("Score_Opponent", "DLC_Biker_KQ_Sounds"),
    Score_Team: new Sound("Score_Team", "DLC_Biker_KQ_Sounds"),
  },
  MP_RADIO_SFX: {
    Off_High: new Sound("Off_High", "MP_RADIO_SFX"),
    Off_Low: new Sound("Off_Low", "MP_RADIO_SFX"),
    Retune_High: new Sound("Retune_High", "MP_RADIO_SFX"),
    Retune_Low: new Sound("Retune_Low", "MP_RADIO_SFX"),
  },
  DLC_Air_Race_Sounds_Player: {
    Orientation_Fail: new Sound(
      "Orientation_Fail",
      "DLC_Air_Race_Sounds_Player"
    ),
    Orientation_Success: new Sound(
      "Orientation_Success",
      "DLC_Air_Race_Sounds_Player"
    ),
  },
  DLC_GR_Generic_Mission_Sounds: {
    package_delivered_success: new Sound(
      "package_delivered_success",
      "DLC_GR_Generic_Mission_Sounds"
    ),
    package_delivered_success_remote: new Sound(
      "package_delivered_success_remote",
      "DLC_GR_Generic_Mission_Sounds"
    ),
  },
  DLC_HEISTS_GENERIC_SOUNDS: {
    Payment_Non_Player: new Sound(
      "Payment_Non_Player",
      "DLC_HEISTS_GENERIC_SOUNDS"
    ),
    Payment_Player: new Sound("Payment_Player", "DLC_HEISTS_GENERIC_SOUNDS"),
  },
  DLC_AW_BB_Sounds: {
    Period_Start: new Sound("Period_Start", "DLC_AW_BB_Sounds"),
  },
  DLC_H4_MM_Sounds: {
    Phone_Text_Arrive: new Sound("Phone_Text_Arrive", "DLC_H4_MM_Sounds"),
  },
  dlc_h4_heist_finale_sounds_soundset: {
    Pickup_Keyring: new Sound(
      "Pickup_Keyring",
      "dlc_h4_heist_finale_sounds_soundset"
    ),
  },
  DLC_H3_Drone_Tranq_Weapon_Sounds: {
    Pilot_Perspective_Fire: new Sound(
      "Pilot_Perspective_Fire",
      "DLC_H3_Drone_Tranq_Weapon_Sounds"
    ),
  },
  ATM_SOUNDS: {
    PIN_BUTTON: new Sound("PIN_BUTTON", "ATM_SOUNDS"),
  },
  DLC_PILOT_MP_HUD_SOUNDS: {
    Player_Collect: new Sound("Player_Collect", "DLC_PILOT_MP_HUD_SOUNDS"),
  },
  GTAO_FM_Cross_The_Line_Soundset: {
    Player_Enter_Line: new Sound(
      "Player_Enter_Line",
      "GTAO_FM_Cross_The_Line_Soundset"
    ),
    Player_Exit_Line: new Sound(
      "Player_Exit_Line",
      "GTAO_FM_Cross_The_Line_Soundset"
    ),
    Remote_Enemy_Enter_Line: new Sound(
      "Remote_Enemy_Enter_Line",
      "GTAO_FM_Cross_The_Line_Soundset"
    ),
    Remote_Friendly_Enter_Line: new Sound(
      "Remote_Friendly_Enter_Line",
      "GTAO_FM_Cross_The_Line_Soundset"
    ),
  },
  dlc_vw_hidden_collectible_sounds: {
    playing_card: new Sound("playing_card", "dlc_vw_hidden_collectible_sounds"),
    shard: new Sound("shard", "dlc_vw_hidden_collectible_sounds"),
  },
  DLC_AS_VNT_Sounds: {
    police_notification: new Sound("police_notification", "DLC_AS_VNT_Sounds"),
  },
  DLC_HEISTS_FAILED_SCREEN_SOUNDS: {
    Pre_Screen_Stinger: new Sound(
      "Pre_Screen_Stinger",
      "DLC_HEISTS_FAILED_SCREEN_SOUNDS"
    ),
  },
  DLC_HEISTS_FINALE_SCREEN_SOUNDS: {
    Pre_Screen_Stinger: new Sound(
      "Pre_Screen_Stinger",
      "DLC_HEISTS_FINALE_SCREEN_SOUNDS"
    ),
  },
  DLC_HEISTS_PREP_SCREEN_SOUNDS: {
    Pre_Screen_Stinger: new Sound(
      "Pre_Screen_Stinger",
      "DLC_HEISTS_PREP_SCREEN_SOUNDS"
    ),
  },
  GTAO_Rappel_Sounds: {
    Rappel_Land: new Sound("Rappel_Land", "GTAO_Rappel_Sounds"),
    Rappel_Stop: new Sound("Rappel_Stop", "GTAO_Rappel_Sounds"),
    Rappel_Loop: new Sound("Rappel_Loop", "GTAO_Rappel_Sounds"),
  },
  DLC_AW_RCBandito_Mine_Sounds: {
    rc_mines_empty: new Sound("rc_mines_empty", "DLC_AW_RCBandito_Mine_Sounds"),
  },
  DLC_IO_Warehouse_Mod_Garage_Sounds: {
    Remove_Tracker: new Sound(
      "Remove_Tracker",
      "DLC_IO_Warehouse_Mod_Garage_Sounds"
    ),
  },
  DLC_SR_RS_Enemy_Sounds: {
    Reset_Win: new Sound("Reset_Win", "DLC_SR_RS_Enemy_Sounds"),
    Resurrected: new Sound("Resurrected", "DLC_SR_RS_Enemy_Sounds"),
  },
  DLC_SR_RS_Team_Sounds: {
    Reset_Win: new Sound("Reset_Win", "DLC_SR_RS_Team_Sounds"),
    Resurrected: new Sound("Resurrected", "DLC_SR_RS_Team_Sounds"),
  },
  DLC_SR_RS_Player_Sounds: {
    Resurrected: new Sound("Resurrected", "DLC_SR_RS_Player_Sounds"),
    Last_Alive: new Sound("Last_Alive", "DLC_SR_RS_Player_Sounds"),
  },
  HUD_FRONTEND_CUSTOM_SOUNDSET: {
    ROBBERY_MONEY_TOTAL: new Sound(
      "ROBBERY_MONEY_TOTAL",
      "HUD_FRONTEND_CUSTOM_SOUNDSET"
    ),
  },
  DLC_SR_TR_Rocket_Player_Sounds: {
    Rocket_Collect: new Sound(
      "Rocket_Collect",
      "DLC_SR_TR_Rocket_Player_Sounds"
    ),
  },
  DLC_BTL_SM_Remix_Soundset: {
    Round_End: new Sound("Round_End", "DLC_BTL_SM_Remix_Soundset"),
    Round_Start: new Sound("Round_Start", "DLC_BTL_SM_Remix_Soundset"),
    TIMER_RADIAL_Pulse: new Sound(
      "TIMER_RADIAL_Pulse",
      "DLC_BTL_SM_Remix_Soundset"
    ),
    TIMER_RADIAL_Reset: new Sound(
      "TIMER_RADIAL_Reset",
      "DLC_BTL_SM_Remix_Soundset"
    ),
  },
  DLC_LOW2_Sumo_Soundset: {
    Round_End: new Sound("Round_End", "DLC_LOW2_Sumo_Soundset"),
    Round_Start: new Sound("Round_Start", "DLC_LOW2_Sumo_Soundset"),
  },
  POWER_PLAY_General_Soundset: {
    Round_Start_Blade: new Sound(
      "Round_Start_Blade",
      "POWER_PLAY_General_Soundset"
    ),
    Wasted: new Sound("Wasted", "POWER_PLAY_General_Soundset"),
  },
  GTAO_Heists_HUD_Sounds: {
    Scope_Spot_POI: new Sound("Scope_Spot_POI", "GTAO_Heists_HUD_Sounds"),
  },
  MissionFailedSounds: {
    ScreenFlash: new Sound("ScreenFlash", "MissionFailedSounds"),
  },
  dlc_ch_hidden_collectibles_sj_sounds: {
    shard: new Sound("shard", "dlc_ch_hidden_collectibles_sj_sounds"),
  },
  GTAO_Biker_FM_Shard_Sounds: {
    Shard_Disappear: new Sound("Shard_Disappear", "GTAO_Biker_FM_Shard_Sounds"),
  },
  GTAO_Boss_Goons_FM_Shard_Sounds: {
    Shard_Disappear: new Sound(
      "Shard_Disappear",
      "GTAO_Boss_Goons_FM_Shard_Sounds"
    ),
  },
  DLC_IE_Garage_Elevator_Sounds: {
    Speech_Floor_1: new Sound(
      "Speech_Floor_1",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
    Speech_Floor_2: new Sound(
      "Speech_Floor_2",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
    Speech_Floor_3: new Sound(
      "Speech_Floor_3",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
    Elevator_Doors_Closing_Loop: new Sound(
      "Elevator_Doors_Closing_Loop",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
    Elevator_Doors_Opening_Loop: new Sound(
      "Elevator_Doors_Opening_Loop",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
    Speech_Going_Up: new Sound(
      "Speech_Going_Up",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
    Elevator_Start: new Sound(
      "Elevator_Start",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
    Elevator_Stop: new Sound("Elevator_Stop", "DLC_IE_Garage_Elevator_Sounds"),
    Elevator_Ascending_Loop: new Sound(
      "Elevator_Ascending_Loop",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
    Elevator_Descending_Loop: new Sound(
      "Elevator_Descending_Loop",
      "DLC_IE_Garage_Elevator_Sounds"
    ),
  },
  Arena_Vehicle_Mod_Shop_Sounds: {
    supermod_consumer: new Sound(
      "supermod_consumer",
      "Arena_Vehicle_Mod_Shop_Sounds"
    ),
    supermod_scifi: new Sound(
      "supermod_scifi",
      "Arena_Vehicle_Mod_Shop_Sounds"
    ),
    supermod_wasteland: new Sound(
      "supermod_wasteland",
      "Arena_Vehicle_Mod_Shop_Sounds"
    ),
  },
  DLC_VW_AS_Sounds: {
    Survival_Failed: new Sound("Survival_Failed", "DLC_VW_AS_Sounds"),
  },
  DLC_HALLOWEEN_FVJ_Sounds: {
    Swap_Sides: new Sound("Swap_Sides", "DLC_HALLOWEEN_FVJ_Sounds"),
    EMP: new Sound("EMP", "DLC_HALLOWEEN_FVJ_Sounds"),
  },
  dlc_xm_heists_iaa_morgue_sounds: {
    tag_entity: new Sound("tag_entity", "dlc_xm_heists_iaa_morgue_sounds"),
    laptop_download_loop: new Sound(
      "laptop_download_loop",
      "dlc_xm_heists_iaa_morgue_sounds"
    ),
  },
  DLC_SM_Generic_Mission_Sounds: {
    Target_Counter_Tick: new Sound(
      "Target_Counter_Tick",
      "DLC_SM_Generic_Mission_Sounds"
    ),
  },
  CAR_STEAL_2_SOUNDSET: {
    Thermal_Off: new Sound("Thermal_Off", "CAR_STEAL_2_SOUNDSET"),
    Thermal_On: new Sound("Thermal_On", "CAR_STEAL_2_SOUNDSET"),
    DISTANT_DOG_BARK: new Sound("DISTANT_DOG_BARK", "CAR_STEAL_2_SOUNDSET"),
  },
  DLC_AS_TRP_Sounds: {
    TIMER_RADIAL_Pulse: new Sound("TIMER_RADIAL_Pulse", "DLC_AS_TRP_Sounds"),
    TIMER_RADIAL_Reset: new Sound("TIMER_RADIAL_Reset", "DLC_AS_TRP_Sounds"),
  },
  BIG_SCORE_3A_SOUNDS: {
    Traffic_Control_Fail: new Sound(
      "Traffic_Control_Fail",
      "BIG_SCORE_3A_SOUNDS"
    ),
    Traffic_Control_Fail_Blank: new Sound(
      "Traffic_Control_Fail_Blank",
      "BIG_SCORE_3A_SOUNDS"
    ),
    Traffic_Control_Light_Switch_Back: new Sound(
      "Traffic_Control_Light_Switch_Back",
      "BIG_SCORE_3A_SOUNDS"
    ),
    TRAFFIC_CONTROL_MOVE_CROSSHAIR: new Sound(
      "TRAFFIC_CONTROL_MOVE_CROSSHAIR",
      "BIG_SCORE_3A_SOUNDS"
    ),
    TRAFFIC_CONTROL_BG_NOISE: new Sound(
      "TRAFFIC_CONTROL_BG_NOISE",
      "BIG_SCORE_3A_SOUNDS"
    ),
    TRAFFIC_CONTROL_CHANGE_CAM: new Sound(
      "TRAFFIC_CONTROL_CHANGE_CAM",
      "BIG_SCORE_3A_SOUNDS"
    ),
    TRAFFIC_CONTROL_TOGGLE_LIGHT: new Sound(
      "TRAFFIC_CONTROL_TOGGLE_LIGHT",
      "BIG_SCORE_3A_SOUNDS"
    ),
  },
  dlc_xm_stromberg_sounds: {
    transform_oneshot: new Sound(
      "transform_oneshot",
      "dlc_xm_stromberg_sounds"
    ),
  },
  DLC_Biker_DL_Sounds: {
    Use_Boost: new Sound("Use_Boost", "DLC_Biker_DL_Sounds"),
    Use_Bunnyhop: new Sound("Use_Bunnyhop", "DLC_Biker_DL_Sounds"),
    Use_Zoned: new Sound("Use_Zoned", "DLC_Biker_DL_Sounds"),
  },
  DLC_SR_LG_Player_Sounds: {
    Weapon_Disabled: new Sound("Weapon_Disabled", "DLC_SR_LG_Player_Sounds"),
    Weapon_Enabled: new Sound("Weapon_Enabled", "DLC_SR_LG_Player_Sounds"),
  },
  DLC_GR_Weapon_Upgrade_Soundset: {
    Weapon_Upgrade: new Sound(
      "Weapon_Upgrade",
      "DLC_GR_Weapon_Upgrade_Soundset"
    ),
  },
  dlc_vw_koth_Sounds: {
    Zone_Captured: new Sound("Zone_Captured", "dlc_vw_koth_Sounds"),
    Zone_Contested: new Sound("Zone_Contested", "dlc_vw_koth_Sounds"),
    Zone_Held: new Sound("Zone_Held", "dlc_vw_koth_Sounds"),
    Zone_Lost: new Sound("Zone_Lost", "dlc_vw_koth_Sounds"),
  },
  GTAO_Vision_Modes_SoundSet: {
    Off: new Sound("Off", "GTAO_Vision_Modes_SoundSet"),
    On: new Sound("On", "GTAO_Vision_Modes_SoundSet"),
    Switch: new Sound("Switch", "GTAO_Vision_Modes_SoundSet"),
    Nightvision_Loop: new Sound(
      "Nightvision_Loop",
      "GTAO_Vision_Modes_SoundSet"
    ),
    Thermal_Loop: new Sound("Thermal_Loop", "GTAO_Vision_Modes_SoundSet"),
  },
  dlc_xm_silo_finale_sounds: {
    launch_power_up_loop: new Sound(
      "launch_power_up_loop",
      "dlc_xm_silo_finale_sounds"
    ),
  },
  MP_CCTV_SOUNDSET: {
    Background: new Sound("Background", "MP_CCTV_SOUNDSET"),
    Pan: new Sound("Pan", "MP_CCTV_SOUNDSET"),
    Zoom: new Sound("Zoom", "MP_CCTV_SOUNDSET"),
    Change_Cam: new Sound("Change_Cam", "MP_CCTV_SOUNDSET"),
  },
  dlc_xm_IAA_Finale_sounds: {
    elevator_descend_loop: new Sound(
      "elevator_descend_loop",
      "dlc_xm_IAA_Finale_sounds"
    ),
  },
  DLC_GR_WVM_APC_Sounds: {
    Drone_View: new Sound("Drone_View", "DLC_GR_WVM_APC_Sounds"),
  },
  dlc_vw_heisters_sounds: {
    laptop_download: new Sound("laptop_download", "dlc_vw_heisters_sounds"),
  },
  DOOR_GARAGE: {
    OPENED: new Sound("OPENED", "DOOR_GARAGE"),
    OPENING: new Sound("OPENING", "DOOR_GARAGE"),
  },
  MP_PLAYER_APARTMENT: {
    DOOR_BUZZ: new Sound("DOOR_BUZZ", "MP_PLAYER_APARTMENT"),
  },
  dlc_xm_avngr_sounds: {
    Fly_Loop: new Sound("Fly_Loop", "dlc_xm_avngr_sounds"),
  },
  DLC_XM_Vehicle_Interior_Security_Camera_Sounds: {
    Background_Hum: new Sound(
      "Background_Hum",
      "DLC_XM_Vehicle_Interior_Security_Camera_Sounds"
    ),
  },
  Radio_Soundset: {
    Change_Station_Loud: new Sound("Change_Station_Loud", "Radio_Soundset"),
  },
  DLC_HEISTS_BIOLAB_FINALE_SOUNDS: {
    EMP_Blast: new Sound("EMP_Blast", "DLC_HEISTS_BIOLAB_FINALE_SOUNDS"),
  },
  DLC_TG_Dinner_Sounds: {
    Timer_10s: new Sound("Timer_10s", "DLC_TG_Dinner_Sounds"),
    Timer_5s: new Sound("Timer_5s", "DLC_TG_Dinner_Sounds"),
  },
  BIG_SCORE_SETUP_SOUNDS: {
    Camera_Hum: new Sound("Camera_Hum", "BIG_SCORE_SETUP_SOUNDS"),
    Camera_Zoom: new Sound("Camera_Zoom", "BIG_SCORE_SETUP_SOUNDS"),
  },
  SHORT_PLAYER_SWITCH_SOUND_SET: {
    out: new Sound("out", "SHORT_PLAYER_SWITCH_SOUND_SET"),
    All: new Sound("All", "SHORT_PLAYER_SWITCH_SOUND_SET"),
  },
  FBI_HEIST_FINALE_CHOPPER: {
    Heli_Crash: new Sound("Heli_Crash", "FBI_HEIST_FINALE_CHOPPER"),
  },
  POLICE_CHOPPER_CAM_SOUNDS: {
    Found_Target: new Sound("Found_Target", "POLICE_CHOPPER_CAM_SOUNDS"),
    Lost_Target: new Sound("Lost_Target", "POLICE_CHOPPER_CAM_SOUNDS"),
    Microphone: new Sound("Microphone", "POLICE_CHOPPER_CAM_SOUNDS"),
  },
  HUD_FRONTEND_WEAPONS_PICKUPS_SOUNDSET: {
    PICKUP_WEAPON_BALL: new Sound(
      "PICKUP_WEAPON_BALL",
      "HUD_FRONTEND_WEAPONS_PICKUPS_SOUNDSET"
    ),
  },
  DLC_XM17_Facility_Strike_PC_Sounds: {
    Background: new Sound("Background", "DLC_XM17_Facility_Strike_PC_Sounds"),
  },
  SAFE_CRACK_SOUNDSET: {
    SAFE_DOOR_CLOSE: new Sound("SAFE_DOOR_CLOSE", "SAFE_CRACK_SOUNDSET"),
    SAFE_DOOR_OPEN: new Sound("SAFE_DOOR_OPEN", "SAFE_CRACK_SOUNDSET"),
    TUMBLER_PIN_FALL: new Sound("TUMBLER_PIN_FALL", "SAFE_CRACK_SOUNDSET"),
    TUMBLER_PIN_FALL_FINAL: new Sound(
      "TUMBLER_PIN_FALL_FINAL",
      "SAFE_CRACK_SOUNDSET"
    ),
    TUMBLER_RESET: new Sound("TUMBLER_RESET", "SAFE_CRACK_SOUNDSET"),
    TUMBLER_TURN: new Sound("TUMBLER_TURN", "SAFE_CRACK_SOUNDSET"),
  },
  DLC_BTL_Terrobyte_Turret_Sounds: {
    Turret_Camera_Hum_Loop: new Sound(
      "Turret_Camera_Hum_Loop",
      "DLC_BTL_Terrobyte_Turret_Sounds"
    ),
  },
  DLC_Exec_Fly_Low_Sounds: {
    Altitude_Warning_Loop: new Sound(
      "Altitude_Warning_Loop",
      "DLC_Exec_Fly_Low_Sounds"
    ),
  },
  DLC_BTL_Target_Pursuit_Sounds: {
    Scanner_Loop: new Sound("Scanner_Loop", "DLC_BTL_Target_Pursuit_Sounds"),
  },
  DLC_Exec1_Buy_Sell_Sounds: {
    Delivery_Screen_Fade: new Sound(
      "Delivery_Screen_Fade",
      "DLC_Exec1_Buy_Sell_Sounds"
    ),
    Delivery_Screen_Fade_On_Foot: new Sound(
      "Delivery_Screen_Fade_On_Foot",
      "DLC_Exec1_Buy_Sell_Sounds"
    ),
  },
  DLC_Arena_CCTV_SOUNDSET: {
    Pan: new Sound("Pan", "DLC_Arena_CCTV_SOUNDSET"),
    Change_Cam: new Sound("Change_Cam", "DLC_Arena_CCTV_SOUNDSET"),
    Background: new Sound("Background", "DLC_Arena_CCTV_SOUNDSET"),
  },
  MP_SNACKS_SOUNDSET: {
    Knuckle_Crack_Hard_Cel: new Sound(
      "Knuckle_Crack_Hard_Cel",
      "MP_SNACKS_SOUNDSET"
    ),
    Knuckle_Crack_Slap_Cel: new Sound(
      "Knuckle_Crack_Slap_Cel",
      "MP_SNACKS_SOUNDSET"
    ),
    Slow_Clap_Cel: new Sound("Slow_Clap_Cel", "MP_SNACKS_SOUNDSET"),
  },
  biker_formation_sounds: {
    player_riding: new Sound("player_riding", "biker_formation_sounds"),
  },
  DLC_H4_Submarine_Sinking_Sounds: {
    Sink: new Sound("Sink", "DLC_H4_Submarine_Sinking_Sounds"),
  },
};
