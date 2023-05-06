// 后行断言+捕获+量词+非捕获
export const ValidPathExp =
  /(?<=\/[\w-]+?\/[\w-]+?\/)(?<first>[\w-]*)(?:\/(?<second>[\w-]*))?(?:\/(?<third>[\w-]*))?(?:\/(?<forth>[\w-]*))?\/?/;
