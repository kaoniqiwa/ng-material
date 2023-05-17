
export class SideNavConfig {
  title!: string;
  id!: string;
  path!: string;
  icon?: string;
  children?: Array<SideNavConfig>;
  CanNavigate?: boolean;
  hideChildren?: boolean;
  hideSelf?: boolean;
}
