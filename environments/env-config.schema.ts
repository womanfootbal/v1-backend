import * as Joi from 'joi';

export default Joi.object({
  DATABASE_URL: Joi.string().required(),
  KAKAO_REST_API_KEY: Joi.string().required(),
});
