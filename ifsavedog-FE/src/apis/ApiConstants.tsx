export enum ENDPOINT {
  // AUTH
  LOGIN = 'api/auth/signin',
  SIGNUP = 'api/auth/signup',
  EMAIL_AUTH = 'api/auth/email-auth',
  VERIFY_EMAIL_CODE = 'api/auth/verify-emailcode',

  // Shelter
  CREATE_SHELTER = 'api/shelter',
  UPDATE_SHELTER_PROFILE_IMAGE = 'api/shelter/profile-img',

  // MyPage
  GET_MY_SHELTER = 'api/user/my-shelter',
  UPDATE_USER_PROFILE_IMAGE = 'api/user/profile-img',

  //
  DOG = 'api/dog',
  FOLLOW_DOG_LIST = 'api/dog/follow',
  SHELTER_DOG_LIST = 'api/dog/shelter',

  POSTLIST_DOG = 'api/post/dog',

  FOLLOW = 'api/follow',

  SHELTER_DONATION_LIST = 'api/donations/shelters',

  // Post
  POST = 'api/post',
  POST_LIKE = 'api/post/like',
}

export enum HTTP_STATUS {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  CONFLICT = 409,
  CONTENT_TOO_LARGE = 413,
  INTERNAL_SERVER_ERROR = 500,
}
