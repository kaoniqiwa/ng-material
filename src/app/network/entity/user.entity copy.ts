// import { Transform } from 'class-transformer';
// import { IModel } from 'src/app/common/interfaces/model.interface';
// import { Gender } from 'src/app/enum/gender.enum';
// import { UserState } from 'src/app/enum/user-state.enum';
// import { UserType } from 'src/app/enum/user-type.enum';

// import { transformDateTime } from './transform.model';
// export class User implements IModel {
//   /**	String	唯一标识符	M	R */
//   Id!: string;
//   /**	String	用户名	M	RW */
//   Username!: string;
//   /**	String	密码	O	W */
//   Password?: string;
//   /**	String	密码HASH值	O	W */
//   PasswordHash?: string;
//   /**	String	密码SALT值	O	W */
//   PasswordSalt?: string;
//   /**	String	名字	O	RW */
//   FirstName?: string;
//   /**	String	姓	O	RW */
//   LastName?: string;
//   /**	Int32	性别	O	RW */
//   Gender?: Gender;
//   /**	String	手机号码	O	RW */
//   MobileNo?: string;
//   /**	String	邮箱	O	RW */
//   Email?: string;
//   /**	String	描述信息	O	RW */
//   Note?: string;
//   /**	DateTime	过期时间	M	RW */
//   @Transform(transformDateTime)
//   ExpiredTime!: Date;
//   /**	DateTime	创建时间	M	R */
//   @Transform(transformDateTime)
//   CreateTime!: Date;
//   /**	DateTime	更新时间	M	R */
//   @Transform(transformDateTime)
//   UpdateTime!: Date;
//   /**	Int32	0-正常	M	R */
//   State!: UserState;
//   /**	String	微信OpenID	O	RW */
//   OpenId?: string;
//   /**	String	服务器ID	O	R */
//   ServerId?: string;
//   /**	Boolean	是否可以分配微信子用户	O	R */
//   CanCreateWeChatUser?: boolean;
//   /**	String	创建者	O	R */
//   CreatorId?: string;
//   /**	Int32[]	停止推送的事件类型	O	RW */
//   OffEvents?: number[];
//   /** 用户类型 */
//   UserType!: UserType;
// }
