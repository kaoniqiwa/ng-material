export enum ConditionOperator {
  /** 等于 */
  Eq = 'Eq',
  /** 大于 */
  Gt = 'Gt',
  /** 大于等于 */
  Gte = 'Gte',
  /** 小于 */
  Lt = 'Lt',
  /** 小于等于 */
  Lte = 'Lte',
  /** 包含 */
  In = 'In',
  /** 模糊查询 */
  Like = 'Like',
  /** 数组中的比较 */
  AnyEq = 'AnyEq',
  /** 不等于 */
  Ne = 'Ne',
  /** 数组中的包含 */
  AnyIn = 'AnyIn',
  /** 不包含 */
  Nin = 'Nin',
  /** 正则判断 */
  Regex = 'Regex',
  /** 全部包含 */
  All = 'All',
  /** 表示以什么开始 */
  begin = '^',
  /** 表示以什么结束 */
  end = '$',
}
