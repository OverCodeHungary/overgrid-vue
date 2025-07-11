export interface OverGridActionButton {
  /**
   * The title of the button.
   */
  title?: string

  /**
   * The icon of the button. You can use any valid FontAwesome icon class here. For example, 'fas fa-edit'.
   */
  icon?: string

  /**
   * The test value attribute of the button. If set, the button will have a test value attribute with this value to make e2e testing easier.
   */
  testValueAttribute?: string

  /**
   * The class list of the button. You can set multiple classes here. For example, 'btn btn-primary'.
   */
  classList?: string

  /**
   * The variant of the button. You can use any of the variants defined in OverGridBtn.vue. For example, 'primary', 'secondary', 'danger', etc.
   */
  variant?: string

  /**
   * If true, the button is a dropdown button. If false, the button is a normal button.
   */
  dropdowned?: boolean

  /**
   * If true, the button is disabled. If false, the button is enabled.
   */
  disabled?: boolean

  /**
   * The function that is called when the button is clicked. You can access the full record object while you define buttons in the OperationsFormatterConfigType.buttons function.
   */
  action?: Function
}
