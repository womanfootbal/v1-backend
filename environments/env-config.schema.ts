import * as Joi from 'joi';

export default Joi.object({
  DATABASE_URL: Joi.string().required(),
  KAKAO_REST_API_KEY: Joi.string().required(),
  OAUTH_URL: Joi.string().required(),
  ACCESS_TOKEN_SECRET_KEY: Joi.string().required(),
  ACCESS_TOKEN_EXPIRATION_TIME: Joi.string().required(),
  REFRESH_TOKEN_SECRET_KEY: Joi.string().required(),
  REFRESH_TOKEN_EXPIRATION_TIME: Joi.string().required(),
});
