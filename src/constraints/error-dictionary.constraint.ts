export enum ERRORS_DICTIONARY {
  // Users
  EMAIL_EXISTED = 'Email already existed',
  USER_NOT_FOUND = 'User not found',

  // CLASS VALIDATOR
  VALIDATION_ERROR = 'ValidationError',
  //
  AUTHORIZE_ERROR = "You're not authorize",
  TOKEN_ERROR = "Token invalid",

  // Category
  CREATE_CATEGORY_ERROR = 'Create category failed',
  NOT_FOUND_ANY_CATEGORY = 'Not found any category',
  EXISTING_A_RECORD = 'Existing a record',
  UNIQUE_CONSTRAINT = 'Unique field in DB'
}
