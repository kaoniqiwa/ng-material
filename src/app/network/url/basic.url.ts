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
  /** /api/howell/ver10 */
  static get api() {
    return `/api${this.basic}`;
  }
  static get garbage_profiles() {
    return `${this.api}/garbage_profiles`;
  }
}
