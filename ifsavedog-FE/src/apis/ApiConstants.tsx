export enum ENDPOINT {
  // AUTH
  LOGIN = 'api/auth/signin',
  SIGNUP = 'api/auth/signup',
  EMAIL_AUTH = 'api/auth/email-auth',
  VERIFY_EMAIL_CODE = 'api/auth/verify-emailcode',

  // Shelter
  CREATE_SHELTER = 'api/shelter',

  // MyPage
  GET_MY_SHELTER = 'api/user/my-shelter',

  //
  DOG = 'api/dog',
  FOLLOW_DOG_LIST = 'api/dog/follow',

  POSTLIST_DOG = 'api/post/dog',

  FOLLOW = 'api/follow',

  SHELTER_DONATION_LIST = 'api/donations/shelters',
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
