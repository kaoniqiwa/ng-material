export class BasicUrl {
  static get basic() {
    return '/howell/ver10';
  }

  /** /howell/ver10/data_service */
  static get data() {
    return `${this.basic}/data_service`;
  }
  /** /howell/ver10/data_service/user_system */
  static get user() {
    return `${this.data}/user_system`;
  }
}
