import { DurationParams, PagedParams } from '../../utils/params';

export class StationProfilesParams extends PagedParams {
  /**	String[]	垃圾厢房档案ID	O	*/
  Ids?: string[];
  /**	String	垃圾厢房档案名称，支持LIKE	O	*/
  ProfileName?: string;
}

export class GetPropertiesParams extends PagedParams {
  /**	String[]	属性ID	O	*/
  Ids?: string[];
  /**	String	名称，模糊查询	O	*/
  Name?: string;
  /**	String	中文描述，模糊查询	O	*/
  Description?: string;
  /**	Int32	分类	O	*/
  Category?: number;
  /**	String	对象属性路径，模糊查询	O	*/
  Path?: string;
  /**	Boolean	是否为数组	O	*/
  IsArray?: boolean;
  /**	Boolean	是否为复杂对象	O	*/
  IsObject?: boolean;
  /**	String	数据类型(枚举值使用Int32)：	O	*/
  DataType?: string;
  /**	Boolean	是否必填项	O	*/
  Mandatory?: boolean;
  /**	String	升序排列字段，数组字段无法排序	O	*/
  Asc?: string;
  /**	String	降序排列字段，数组字段无法排序	O	*/
  Desc?: string;
}

export class GetLabelsParams extends PagedParams {
  /**	Int32[]	标签ID	O	*/
  Ids?: number[];
  /**	String	名称，模糊查询	O	*/
  Name?: string;
  /**	Int32	状态，0-正常，1-注销	O	*/
  State?: number;
  /**	Int32	类别，用于区分不同类别的标签	O	*/
  Category?: number;
  /**	String	升序排列字段，数组字段无法排序	O	*/
  Asc?: string;
  /**	String	降序排列字段，数组字段无法排序	O	*/
  Desc?: string;
}

export class GetProfileStateStatisticsParams extends DurationParams {
  /**	Int32[]	档案状态	O */
  ProfileStates?: number[];
}
