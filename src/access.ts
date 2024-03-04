/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: InitialState | undefined) {
  const { loginUser } = initialState ?? {};
  return {
    // 如果loginUser存在，且用户角色为 'admin'，说明该用户是管理员
    canUser: loginUser,
    canAdmin: loginUser?.userRole === 'admin',
  };
}
