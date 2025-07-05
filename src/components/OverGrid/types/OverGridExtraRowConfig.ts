export interface OverGridExtraRowConfig {
  /**
   * If true, the extra row is active. If false, the extra row is disabled.
   */
  active: boolean
  /**
   * Determines the user can open more than one extra row at the same time. If false, the user can open only one extra row at a time (close the other when open a new one).
   */
  multiOpen: boolean
  /**
   * Ths extraRow slot gets the full record object of the "parent". You can define extra fields here that you want to pass to the slot.
   */
  extraSlotParams: object
}
